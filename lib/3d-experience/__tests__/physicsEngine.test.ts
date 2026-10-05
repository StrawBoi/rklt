/**
 * Unit tests for PhysicsEngine
 * Tests damped harmonic motion, amplitude control, and physics parameters
 */

import {
  ContainerPhysicsEngine,
  createPhysicsEngine,
  DEFAULT_PHYSICS_CONFIG,
  type PhysicsConfig
} from '../physicsEngine';

describe('PhysicsEngine', () => {
  let engine: ContainerPhysicsEngine;

  beforeEach(() => {
    engine = new ContainerPhysicsEngine();
  });

  describe('Initialization', () => {
    test('should initialize with default config', () => {
      expect(engine.getAmplitude()).toBe(DEFAULT_PHYSICS_CONFIG.amplitude);
      expect(engine.getFrequency()).toBe(DEFAULT_PHYSICS_CONFIG.frequency);
      expect(engine.getDampingRatio()).toBe(DEFAULT_PHYSICS_CONFIG.dampingRatio);
    });

    test('should accept custom config', () => {
      const customConfig: Partial<PhysicsConfig> = {
        amplitude: 1.0,
        frequency: 0.6,
        dampingRatio: 0.08
      };

      const customEngine = new ContainerPhysicsEngine(customConfig);

      expect(customEngine.getAmplitude()).toBe(1.0);
      expect(customEngine.getFrequency()).toBe(0.6);
      expect(customEngine.getDampingRatio()).toBe(0.08);
    });

    test('should initialize sway angles to zero', () => {
      expect(engine.swayAngleX).toBe(0);
      expect(engine.swayAngleZ).toBe(0);
    });
  });

  describe('Update and Motion', () => {
    test('should update sway angles on update', () => {
      engine.update(0.1); // 100ms

      expect(engine.swayAngleX).not.toBe(0);
      expect(engine.swayAngleZ).not.toBe(0);
    });

    test('should produce angles within expected range', () => {
      // Run simulation for 2 seconds
      for (let i = 0; i < 20; i++) {
        engine.update(0.1);

        const swayDegrees = engine.getSwayDegrees();

        // Amplitude is 1.5°, so max should be around 1.5°
        expect(Math.abs(swayDegrees.x)).toBeLessThanOrEqual(2.0);
        expect(Math.abs(swayDegrees.z)).toBeLessThanOrEqual(2.0);
      }
    });

    test('should have X and Z motion out of phase', () => {
      engine.update(0.5);

      const swayDegrees = engine.getSwayDegrees();

      // X and Z should not be identical (90° phase difference)
      expect(swayDegrees.x).not.toBe(swayDegrees.z);
    });

    test('should exhibit damping over time', () => {
      const amplitudes: number[] = [];

      // Collect amplitude samples over time
      for (let i = 0; i < 50; i++) {
        engine.update(0.1);
        const swayDegrees = engine.getSwayDegrees();
        const amplitude = Math.sqrt(swayDegrees.x ** 2 + swayDegrees.z ** 2);
        amplitudes.push(amplitude);
      }

      // Later amplitudes should generally be smaller (damping)
      const earlyAvg = amplitudes.slice(0, 10).reduce((a, b) => a + b) / 10;
      const lateAvg = amplitudes.slice(-10).reduce((a, b) => a + b) / 10;

      expect(lateAvg).toBeLessThan(earlyAvg);
    });
  });

  describe('Amplitude Control', () => {
    test('should set amplitude to zero', () => {
      engine.setAmplitude(0);
      engine.update(0.1);

      expect(engine.getSwayDegrees().x).toBe(0);
      expect(engine.getSwayDegrees().z).toBe(0);
    });

    test('should update amplitude during simulation', () => {
      engine.setAmplitude(2.0);
      engine.update(0.1);

      const highAmplitude = engine.getSwayDegrees();

      engine.reset();
      engine.setAmplitude(0.5);
      engine.update(0.1);

      const lowAmplitude = engine.getSwayDegrees();

      // Higher amplitude should produce larger angles
      expect(Math.abs(highAmplitude.x)).toBeGreaterThan(Math.abs(lowAmplitude.x));
    });

    test('should clamp amplitude to valid range', () => {
      engine.setAmplitude(-1.0);
      expect(engine.getAmplitude()).toBe(0);

      engine.setAmplitude(5.0);
      expect(engine.getAmplitude()).toBe(2.0); // Max clamped to 2.0
    });

    test('should reduce amplitude linearly for scroll', () => {
      // Simulate scroll reducing amplitude from 2.0 to 0
      const scrollProgress = [0, 0.25, 0.5, 0.75, 1.0];
      const expectedAmplitudes = [2.0, 1.5, 1.0, 0.5, 0.0];

      scrollProgress.forEach((progress, index) => {
        const amplitude = 2.0 * (1 - progress);
        engine.setAmplitude(amplitude);
        expect(engine.getAmplitude()).toBeCloseTo(expectedAmplitudes[index], 1);
      });
    });
  });

  describe('Frequency and Damping', () => {
    test('should update frequency', () => {
      engine.setFrequency(0.8);
      expect(engine.getFrequency()).toBe(0.8);
    });

    test('should clamp frequency to valid range', () => {
      engine.setFrequency(0.05);
      expect(engine.getFrequency()).toBe(0.1); // Min clamped

      engine.setFrequency(2.0);
      expect(engine.getFrequency()).toBe(1.0); // Max clamped
    });

    test('should update damping ratio', () => {
      engine.setDampingRatio(0.15);
      expect(engine.getDampingRatio()).toBe(0.15);
    });

    test('should clamp damping ratio to valid range', () => {
      engine.setDampingRatio(0.005);
      expect(engine.getDampingRatio()).toBe(0.01); // Min clamped

      engine.setDampingRatio(1.0);
      expect(engine.getDampingRatio()).toBe(0.5); // Max clamped
    });

    test('should oscillate faster with higher frequency', () => {
      const lowFreqEngine = new ContainerPhysicsEngine({ frequency: 0.3 });
      const highFreqEngine = new ContainerPhysicsEngine({ frequency: 0.8 });

      let lowFreqZeroCrossings = 0;
      let highFreqZeroCrossings = 0;
      let prevLowX = 0;
      let prevHighX = 0;

      // Count zero crossings over 10 seconds
      for (let i = 0; i < 100; i++) {
        lowFreqEngine.update(0.1);
        highFreqEngine.update(0.1);

        const lowX = lowFreqEngine.swayAngleX;
        const highX = highFreqEngine.swayAngleX;

        if (prevLowX * lowX < 0) lowFreqZeroCrossings++;
        if (prevHighX * highX < 0) highFreqZeroCrossings++;

        prevLowX = lowX;
        prevHighX = highX;
      }

      expect(highFreqZeroCrossings).toBeGreaterThan(lowFreqZeroCrossings);
    });
  });

  describe('Reset Functionality', () => {
    test('should reset time and angles', () => {
      engine.update(1.0);
      expect(engine.swayAngleX).not.toBe(0);

      engine.reset();
      expect(engine.swayAngleX).toBe(0);
      expect(engine.swayAngleZ).toBe(0);
    });

    test('should maintain config after reset', () => {
      engine.setAmplitude(1.8);
      engine.setFrequency(0.7);

      engine.reset();

      expect(engine.getAmplitude()).toBe(1.8);
      expect(engine.getFrequency()).toBe(0.7);
    });
  });

  describe('Helper Functions', () => {
    test('should detect swaying', () => {
      engine.setAmplitude(0.05);
      expect(engine.isSwaying(0.1)).toBe(false);

      engine.setAmplitude(0.5);
      expect(engine.isSwaying(0.1)).toBe(true);
    });

    test('should return sway in degrees', () => {
      engine.update(0.5);
      const swayDegrees = engine.getSwayDegrees();

      expect(typeof swayDegrees.x).toBe('number');
      expect(typeof swayDegrees.z).toBe('number');
    });
  });

  describe('Factory Function', () => {
    test('should create engine with createPhysicsEngine', () => {
      const engine = createPhysicsEngine();
      expect(engine).toBeInstanceOf(ContainerPhysicsEngine);
    });

    test('should pass config to factory function', () => {
      const engine = createPhysicsEngine({ amplitude: 1.2 });
      expect(engine.getAmplitude()).toBe(1.2);
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero delta time', () => {
      engine.update(0);
      expect(engine.swayAngleX).toBe(0);
      expect(engine.swayAngleZ).toBe(0);
    });

    test('should handle very small delta time', () => {
      engine.update(0.001);
      expect(engine.swayAngleX).toBeDefined();
      expect(engine.swayAngleZ).toBeDefined();
    });

    test('should handle large delta time', () => {
      engine.update(10.0); // 10 seconds
      const swayDegrees = engine.getSwayDegrees();

      // Should still be within bounds
      expect(Math.abs(swayDegrees.x)).toBeLessThan(5.0);
      expect(Math.abs(swayDegrees.z)).toBeLessThan(5.0);
    });
  });
});
