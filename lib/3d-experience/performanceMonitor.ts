/**
 * PerformanceMonitor - Tracks FPS and triggers adaptive degradation
 * Monitors frame rate and reduces complexity when performance drops
 */

export type ComplexityLevel = 'high' | 'medium' | 'low';

export interface PerformanceMetrics {
  averageFPS: number;
  minFPS: number;
  maxFPS: number;
  frameCount: number;
  dropCount: number;
}

export interface PerformanceMonitor {
  recordFrame(): void;
  getMetrics(): PerformanceMetrics;
  getCurrentComplexity(): ComplexityLevel;
  shouldDegrade(): boolean;
  reset(): void;
}

export interface PerformanceConfig {
  targetFPS: number;
  lowFPSThreshold: number;
  consecutiveDropsBeforeDegrade: number;
  sampleSize: number;
}

export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  targetFPS: 60,
  lowFPSThreshold: 24,
  consecutiveDropsBeforeDegrade: 180, // 3 seconds at 60fps
  sampleSize: 60
};

/**
 * Performance monitor implementation
 */
export class FramePerformanceMonitor implements PerformanceMonitor {
  private config: PerformanceConfig;
  private frameTimes: number[] = [];
  private lastFrameTime: number = performance.now();
  private consecutiveLowFPS: number = 0;
  private currentComplexity: ComplexityLevel = 'high';
  private frameCount: number = 0;
  private dropCount: number = 0;

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      ...DEFAULT_PERFORMANCE_CONFIG,
      ...config
    };
  }

  /**
   * Record a frame and calculate FPS
   */
  recordFrame(): void {
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Add frame time to buffer
    this.frameTimes.push(deltaTime);

    // Keep buffer size limited
    if (this.frameTimes.length > this.config.sampleSize) {
      this.frameTimes.shift();
    }

    this.frameCount++;

    // Calculate current FPS
    const currentFPS = 1000 / deltaTime;

    // Check if FPS is below threshold
    if (currentFPS < this.config.lowFPSThreshold) {
      this.consecutiveLowFPS++;
      this.dropCount++;
    } else {
      this.consecutiveLowFPS = 0;
    }

    // Log degradation trigger
    if (this.shouldDegrade()) {
      console.warn(
        `[PerformanceMonitor] Low FPS detected: ${currentFPS.toFixed(1)} fps ` +
        `(${this.consecutiveLowFPS} consecutive frames below ${this.config.lowFPSThreshold})`
      );
    }
  }

  /**
   * Get performance metrics
   */
  getMetrics(): PerformanceMetrics {
    if (this.frameTimes.length === 0) {
      return {
        averageFPS: 0,
        minFPS: 0,
        maxFPS: 0,
        frameCount: this.frameCount,
        dropCount: this.dropCount
      };
    }

    // Calculate FPS from frame times
    const fpsValues = this.frameTimes.map((dt) => 1000 / dt);

    const averageFPS = fpsValues.reduce((sum, fps) => sum + fps, 0) / fpsValues.length;
    const minFPS = Math.min(...fpsValues);
    const maxFPS = Math.max(...fpsValues);

    return {
      averageFPS: Math.round(averageFPS),
      minFPS: Math.round(minFPS),
      maxFPS: Math.round(maxFPS),
      frameCount: this.frameCount,
      dropCount: this.dropCount
    };
  }

  /**
   * Get current complexity level
   */
  getCurrentComplexity(): ComplexityLevel {
    return this.currentComplexity;
  }

  /**
   * Check if performance should degrade
   */
  shouldDegrade(): boolean {
    return this.consecutiveLowFPS >= this.config.consecutiveDropsBeforeDegrade;
  }

  /**
   * Trigger degradation to lower complexity
   */
  degrade(): boolean {
    if (this.currentComplexity === 'high') {
      this.currentComplexity = 'medium';
      this.consecutiveLowFPS = 0;
      console.log('[PerformanceMonitor] Degraded to medium complexity');
      return true;
    } else if (this.currentComplexity === 'medium') {
      this.currentComplexity = 'low';
      this.consecutiveLowFPS = 0;
      console.log('[PerformanceMonitor] Degraded to low complexity');
      return true;
    }
    return false;
  }

  /**
   * Reset monitor state
   */
  reset(): void {
    this.frameTimes = [];
    this.lastFrameTime = performance.now();
    this.consecutiveLowFPS = 0;
    this.frameCount = 0;
    this.dropCount = 0;
  }

  /**
   * Set complexity level manually
   */
  setComplexity(level: ComplexityLevel): void {
    this.currentComplexity = level;
  }

  /**
   * Get consecutive low FPS count
   */
  getConsecutiveLowFPS(): number {
    return this.consecutiveLowFPS;
  }

  /**
   * Check if performance is stable
   */
  isStable(): boolean {
    const metrics = this.getMetrics();
    return metrics.averageFPS >= this.config.targetFPS * 0.9; // 90% of target
  }

  /**
   * Get performance grade
   */
  getPerformanceGrade(): 'excellent' | 'good' | 'fair' | 'poor' {
    const metrics = this.getMetrics();
    const { averageFPS } = metrics;

    if (averageFPS >= 55) return 'excellent';
    if (averageFPS >= 40) return 'good';
    if (averageFPS >= 24) return 'fair';
    return 'poor';
  }

  /**
   * Export metrics for analytics
   */
  exportMetrics(): {
    averageFPS: number;
    complexity: ComplexityLevel;
    dropRate: number;
    grade: string;
  } {
    const metrics = this.getMetrics();
    const dropRate = this.frameCount > 0 ? this.dropCount / this.frameCount : 0;

    return {
      averageFPS: metrics.averageFPS,
      complexity: this.currentComplexity,
      dropRate: Math.round(dropRate * 100) / 100,
      grade: this.getPerformanceGrade()
    };
  }
}

/**
 * Create a performance monitor instance
 */
export function createPerformanceMonitor(
  config?: Partial<PerformanceConfig>
): PerformanceMonitor {
  return new FramePerformanceMonitor(config);
}

/**
 * Apply complexity degradation to scene
 */
export function applyComplexityDegradation(
  complexity: ComplexityLevel,
  sceneObjects: {
    renderer?: any;
    physics?: any;
    environment?: any;
  }
): void {
  const { renderer, physics, environment } = sceneObjects;

  switch (complexity) {
    case 'high':
      // Full quality
      if (renderer) {
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
      if (physics) {
        physics.setFrequency(0.5);
      }
      break;

    case 'medium':
      // Reduced quality
      if (renderer) {
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      }
      if (physics) {
        physics.setFrequency(0.3); // Slower physics updates
      }
      // Hide aircraft
      if (environment?.aircraft) {
        environment.aircraft.visible = false;
      }
      break;

    case 'low':
      // Minimal quality - should trigger 2D fallback
      if (renderer) {
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(1);
      }
      if (physics) {
        physics.setAmplitude(0); // Stop physics
      }
      console.log('[Performance] Triggering 2D fallback');
      break;
  }
}
