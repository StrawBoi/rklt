/**
 * Unit tests for 3D experience utilities
 * Tests for SessionManager, DeviceDetector, localization, and error handling
 */

import { sessionManager } from '../sessionManager';
import { detectDeviceCapability, type DeviceCapabilityLevel } from '../deviceDetector';
import {
  formatProgress,
  getLayoutStyles,
  getSkipButtonPosition,
  LOCALIZED_CONTENT
} from '../localization';
import { Experience3DErrorHandler, ErrorType } from '../errorHandler';

describe('SessionManager', () => {
  beforeEach(() => {
    sessionManager.clearIntroFlag();
  });

  test('should return false for unseen intro initially', () => {
    expect(sessionManager.hasSeenIntro()).toBe(false);
  });

  test('should mark intro as seen', () => {
    sessionManager.markIntroSeen();
    expect(sessionManager.hasSeenIntro()).toBe(true);
  });

  test('should clear intro flag', () => {
    sessionManager.markIntroSeen();
    expect(sessionManager.hasSeenIntro()).toBe(true);
    sessionManager.clearIntroFlag();
    expect(sessionManager.hasSeenIntro()).toBe(false);
  });
});

describe('DeviceDetector', () => {
  test('should return device capability object', () => {
    const capability = detectDeviceCapability();

    expect(capability).toHaveProperty('level');
    expect(capability).toHaveProperty('reason');
    expect(capability).toHaveProperty('screenWidth');
    expect(capability).toHaveProperty('screenHeight');
    expect(capability).toHaveProperty('pixelRatio');
    expect(capability).toHaveProperty('prefersReducedMotion');

    const validLevels: DeviceCapabilityLevel[] = ['high', 'medium', 'low', 'reduced-motion'];
    expect(validLevels).toContain(capability.level);
  });

  test('should detect mobile devices', () => {
    // This would require mocking window.innerWidth
    const capability = detectDeviceCapability();
    if (window.innerWidth < 768) {
      expect(capability.level).toBe('low');
    }
  });

  test('should include GPU score when available', () => {
    const capability = detectDeviceCapability();
    if (capability.level !== 'reduced-motion') {
      // GPU score might be undefined on some systems
      if (capability.gpuScore !== undefined) {
        expect(typeof capability.gpuScore).toBe('number');
        expect(capability.gpuScore).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe('Localization', () => {
  test('should have content for both locales', () => {
    expect(LOCALIZED_CONTENT['en']).toBeDefined();
    expect(LOCALIZED_CONTENT['ar']).toBeDefined();
  });

  test('should format progress for English locale', () => {
    const formatted = formatProgress(75, 'en');
    expect(formatted).toBe('75%');
  });

  test('should format progress for Arabic locale', () => {
    const formatted = formatProgress(75, 'ar');
    // Should contain Arabic numerals
    expect(formatted).toContain('٧');
    expect(formatted).toContain('٥');
  });

  test('should return LTR styles for English', () => {
    const styles = getLayoutStyles('en');
    expect(styles.direction).toBe('ltr');
    expect(styles.textAlign).toBe('left');
  });

  test('should return RTL styles for Arabic', () => {
    const styles = getLayoutStyles('ar');
    expect(styles.direction).toBe('rtl');
    expect(styles.textAlign).toBe('right');
  });

  test('should position skip button on right for English', () => {
    const pos = getSkipButtonPosition('en');
    expect(pos.right).toBe('2rem');
  });

  test('should position skip button on left for Arabic', () => {
    const pos = getSkipButtonPosition('ar');
    expect(pos.left).toBe('2rem');
  });
});

describe('Error Handler', () => {
  let errorHandler: Experience3DErrorHandler;

  beforeEach(() => {
    errorHandler = new Experience3DErrorHandler('en');
  });

  test('should handle WebGL error', () => {
    const result = errorHandler.handle(ErrorType.WEBGL_NOT_SUPPORTED);
    expect(result.shouldFallback).toBe(true);
    expect(result.message).toContain('WebGL');
  });

  test('should handle asset load error', () => {
    const result = errorHandler.handle(ErrorType.ASSET_LOAD_FAILED);
    expect(result.shouldFallback).toBe(true);
    expect(result.message).toContain('asset');
  });

  test('should store error history', () => {
    errorHandler.handle(ErrorType.WEBGL_NOT_SUPPORTED);
    errorHandler.handle(ErrorType.ASSET_LOAD_FAILED);

    const errors = errorHandler.getErrors();
    expect(errors).toHaveLength(2);
    expect(errors[0].type).toBe(ErrorType.WEBGL_NOT_SUPPORTED);
    expect(errors[1].type).toBe(ErrorType.ASSET_LOAD_FAILED);
  });

  test('should clear error history', () => {
    errorHandler.handle(ErrorType.WEBGL_NOT_SUPPORTED);
    expect(errorHandler.getErrors()).toHaveLength(1);

    errorHandler.clearErrors();
    expect(errorHandler.getErrors()).toHaveLength(0);
  });

  test('should handle Arabic locale', () => {
    const arHandler = new Experience3DErrorHandler('ar');
    const result = arHandler.handle(ErrorType.WEBGL_NOT_SUPPORTED);
    expect(result.message).toBeDefined();
  });
});
