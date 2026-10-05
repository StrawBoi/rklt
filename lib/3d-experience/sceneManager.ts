/**
 * SceneManager - Manages Three.js scene, renderer, and core 3D infrastructure
 * Handles initialization, disposal, and rendering configuration
 */

import type { DeviceCapabilityLevel } from './deviceDetector';

export interface SceneConfig {
  antialias: boolean;
  alpha: boolean;
  powerPreference: 'high-performance' | 'low-power' | 'default';
  enableShadows: boolean;
  pixelRatioMax: number;
  fogColor: number;
  fogNear: number;
  fogFar: number;
}

export interface SceneManager {
  scene: any; // THREE.Scene
  renderer: any; // THREE.WebGLRenderer
  canvas: HTMLCanvasElement | null;
  initialize(container: HTMLElement, capability: DeviceCapabilityLevel): Promise<void>;
  setSize(width: number, height: number): void;
  render(camera: any): void;
  dispose(): void;
}

/**
 * Get scene configuration based on device capability
 */
export function getSceneConfig(capability: DeviceCapabilityLevel): SceneConfig {
  switch (capability) {
    case 'high':
      return {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        enableShadows: true,
        pixelRatioMax: 2,
        fogColor: 0x0b2027, // ink-950
        fogNear: 30,
        fogFar: 100
      };

    case 'medium':
      return {
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        enableShadows: false,
        pixelRatioMax: 1.5,
        fogColor: 0x0b2027,
        fogNear: 30,
        fogFar: 100
      };

    default: // low or reduced-motion
      return {
        antialias: false,
        alpha: true,
        powerPreference: 'default',
        enableShadows: false,
        pixelRatioMax: 1,
        fogColor: 0x0b2027,
        fogNear: 30,
        fogFar: 100
      };
  }
}

/**
 * Three.js scene manager implementation
 */
export class ThreeSceneManager implements SceneManager {
  public scene: any = null;
  public renderer: any = null;
  public canvas: HTMLCanvasElement | null = null;
  private config: SceneConfig | null = null;
  private THREE: any = null;

  async initialize(
    container: HTMLElement,
    capability: DeviceCapabilityLevel
  ): Promise<void> {
    try {
      // Dynamic import Three.js
      this.THREE = await import('three');

      // Get config based on capability
      this.config = getSceneConfig(capability);

      // Create scene
      this.scene = new this.THREE.Scene();
      this.scene.background = new this.THREE.Color(this.config.fogColor);

      // Add fog
      this.scene.fog = new this.THREE.Fog(
        this.config.fogColor,
        this.config.fogNear,
        this.config.fogFar
      );

      // Create renderer
      this.renderer = new this.THREE.WebGLRenderer({
        antialias: this.config.antialias,
        alpha: this.config.alpha,
        powerPreference: this.config.powerPreference
      });

      // Set pixel ratio (capped for performance)
      const pixelRatio = Math.min(
        window.devicePixelRatio,
        this.config.pixelRatioMax
      );
      this.renderer.setPixelRatio(pixelRatio);

      // Set size
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.renderer.setSize(width, height);

      // Enable shadows if configured
      if (this.config.enableShadows) {
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.THREE.PCFSoftShadowMap;
      }

      // Set output encoding for better colors
      this.renderer.outputEncoding = this.THREE.sRGBEncoding;

      // Get canvas
      this.canvas = this.renderer.domElement;

      // Append to container
      container.appendChild(this.canvas);
    } catch (error) {
      console.error('Failed to initialize SceneManager:', error);
      throw error;
    }
  }

  setSize(width: number, height: number): void {
    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }

  render(camera: any): void {
    if (this.renderer && this.scene && camera) {
      this.renderer.render(this.scene, camera);
    }
  }

  dispose(): void {
    // Dispose all scene objects
    if (this.scene) {
      this.scene.traverse((object: any) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat: any) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      this.scene.clear();
    }

    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();

      // Remove canvas from DOM
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
    }

    this.scene = null;
    this.renderer = null;
    this.canvas = null;
    this.config = null;
    this.THREE = null;
  }

  /**
   * Add object to scene
   */
  add(object: any): void {
    if (this.scene) {
      this.scene.add(object);
    }
  }

  /**
   * Remove object from scene
   */
  remove(object: any): void {
    if (this.scene) {
      this.scene.remove(object);
    }
  }

  /**
   * Get scene background color
   */
  getBackgroundColor(): number {
    return this.config?.fogColor || 0x0b2027;
  }

  /**
   * Check if shadows are enabled
   */
  areShadowsEnabled(): boolean {
    return this.config?.enableShadows || false;
  }
}

/**
 * Create a scene manager instance
 */
export function createSceneManager(): SceneManager {
  return new ThreeSceneManager();
}
