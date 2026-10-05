/**
 * PhysicsEngine - Simulates realistic container sway with damped harmonic motion
 * Uses damped pendulum physics: θ''(t) + 2ζω₀θ'(t) + ω₀²θ(t) = 0
 */

export interface PhysicsConfig {
  amplitude: number;        // degrees (0.5 - 2.0)
  dampingRatio: number;     // unitless (0.05 - 0.15)
  frequency: number;        // Hz (0.3 - 0.8)
  initialPhaseX: number;    // radians
  initialPhaseZ: number;    // radians
}

export interface PhysicsEngine {
  swayAngleX: number;       // radians
  swayAngleZ: number;       // radians
  update(deltaTime: number): void;
  setAmplitude(amplitude: number): void;
  getDampingRatio(): number;
  reset(): void;
}

/**
 * Default physics configuration for realistic container sway
 */
export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  amplitude: 1.5,           // 1.5 degrees
  dampingRatio: 0.1,        // 10% damping
  frequency: 0.5,           // 0.5 Hz (2 second period)
  initialPhaseX: 0,         // Start at 0
  initialPhaseZ: Math.PI / 2  // 90° out of phase for circular motion
};

/**
 * Container physics engine using damped harmonic oscillator
 * Models container as a damped pendulum suspended by cables
 */
export class ContainerPhysicsEngine implements PhysicsEngine {
  private config: PhysicsConfig;
  private time: number = 0;
  public swayAngleX: number = 0;
  public swayAngleZ: number = 0;

  constructor(config: Partial<PhysicsConfig> = {}) {
    this.config = {
      ...DEFAULT_PHYSICS_CONFIG,
      ...config
    };
  }

  /**
   * Update physics simulation
   * @param deltaTime - Time since last update in seconds
   */
  update(deltaTime: number): void {
    this.time += deltaTime;

    const omega = 2 * Math.PI * this.config.frequency;
    const damping = Math.exp(-this.config.dampingRatio * omega * this.time);

    // Damped sinusoidal motion in X direction
    const swayDegreesX =
      this.config.amplitude *
      damping *
      Math.sin(omega * this.time + this.config.initialPhaseX);

    // Damped sinusoidal motion in Z direction (90° out of phase)
    const swayDegreesZ =
      this.config.amplitude *
      damping *
      Math.sin(omega * this.time + this.config.initialPhaseZ);

    // Convert degrees to radians for Three.js
    this.swayAngleX = this.degreesToRadians(swayDegreesX);
    this.swayAngleZ = this.degreesToRadians(swayDegreesZ);
  }

  /**
   * Set new amplitude (used during scroll to reduce sway)
   * @param amplitude - New amplitude in degrees
   */
  setAmplitude(amplitude: number): void {
    this.config.amplitude = Math.max(0, Math.min(amplitude, 2.0));
  }

  /**
   * Get current damping ratio
   */
  getDampingRatio(): number {
    return this.config.dampingRatio;
  }

  /**
   * Reset physics simulation to initial state
   */
  reset(): void {
    this.time = 0;
    this.swayAngleX = 0;
    this.swayAngleZ = 0;
  }

  /**
   * Get current amplitude
   */
  getAmplitude(): number {
    return this.config.amplitude;
  }

  /**
   * Get current frequency
   */
  getFrequency(): number {
    return this.config.frequency;
  }

  /**
   * Set frequency
   * @param frequency - New frequency in Hz (0.3 - 0.8 recommended)
   */
  setFrequency(frequency: number): void {
    this.config.frequency = Math.max(0.1, Math.min(frequency, 1.0));
  }

  /**
   * Set damping ratio
   * @param dampingRatio - New damping ratio (0.05 - 0.15 recommended)
   */
  setDampingRatio(dampingRatio: number): void {
    this.config.dampingRatio = Math.max(0.01, Math.min(dampingRatio, 0.5));
  }

  /**
   * Convert degrees to radians
   */
  private degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert radians to degrees
   */
  private radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Get current sway angles in degrees (for debugging)
   */
  getSwayDegrees(): { x: number; z: number } {
    return {
      x: this.radiansToDegrees(this.swayAngleX),
      z: this.radiansToDegrees(this.swayAngleZ)
    };
  }

  /**
   * Check if container is swaying (amplitude > threshold)
   */
  isSwaying(threshold: number = 0.1): boolean {
    return this.config.amplitude > threshold;
  }
}

/**
 * Create a physics engine with custom config
 */
export function createPhysicsEngine(config?: Partial<PhysicsConfig>): PhysicsEngine {
  return new ContainerPhysicsEngine(config);
}
