/**
 * Lighting - Scene lighting configuration
 * Creates ambient and directional lights for realistic container illumination
 */

export interface LightingConfig {
  ambient: {
    color: number;
    intensity: number;
  };
  directional: {
    color: number;
    intensity: number;
    position: { x: number; y: number; z: number };
    castShadow: boolean;
  };
}

export interface Lighting {
  ambientLight: any; // THREE.AmbientLight
  directionalLight: any; // THREE.DirectionalLight
  initialize(enableShadows: boolean): Promise<void>;
  addToScene(scene: any): void;
  dispose(): void;
}

/**
 * Default lighting configuration
 * Sun at 45° angle for optimal container visibility
 */
export const DEFAULT_LIGHTING_CONFIG: LightingConfig = {
  ambient: {
    color: 0xffffff,
    intensity: 0.4
  },
  directional: {
    color: 0xffffff,
    intensity: 0.8,
    position: { x: 10, y: 20, z: 10 },
    castShadow: true
  }
};

/**
 * Three.js lighting implementation
 */
export class ThreeLighting implements Lighting {
  public ambientLight: any = null;
  public directionalLight: any = null;
  private THREE: any = null;

  async initialize(enableShadows: boolean): Promise<void> {
    try {
      // Dynamic import Three.js
      this.THREE = await import('three');

      // Create ambient light
      this.ambientLight = new this.THREE.AmbientLight(
        DEFAULT_LIGHTING_CONFIG.ambient.color,
        DEFAULT_LIGHTING_CONFIG.ambient.intensity
      );

      // Create directional light (sun)
      this.directionalLight = new this.THREE.DirectionalLight(
        DEFAULT_LIGHTING_CONFIG.directional.color,
        DEFAULT_LIGHTING_CONFIG.directional.intensity
      );

      // Set position
      this.directionalLight.position.set(
        DEFAULT_LIGHTING_CONFIG.directional.position.x,
        DEFAULT_LIGHTING_CONFIG.directional.position.y,
        DEFAULT_LIGHTING_CONFIG.directional.position.z
      );

      // Enable shadows if configured
      if (enableShadows) {
        this.directionalLight.castShadow = true;

        // Configure shadow properties
        this.directionalLight.shadow.mapSize.width = 2048;
        this.directionalLight.shadow.mapSize.height = 2048;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;
        this.directionalLight.shadow.camera.left = -50;
        this.directionalLight.shadow.camera.right = 50;
        this.directionalLight.shadow.camera.top = 50;
        this.directionalLight.shadow.camera.bottom = -50;
      }
    } catch (error) {
      console.error('Failed to initialize Lighting:', error);
      throw error;
    }
  }

  addToScene(scene: any): void {
    if (scene && this.ambientLight && this.directionalLight) {
      scene.add(this.ambientLight);
      scene.add(this.directionalLight);
    }
  }

  dispose(): void {
    this.ambientLight = null;
    this.directionalLight = null;
    this.THREE = null;
  }

  /**
   * Update ambient light intensity
   */
  setAmbientIntensity(intensity: number): void {
    if (this.ambientLight) {
      this.ambientLight.intensity = intensity;
    }
  }

  /**
   * Update directional light intensity
   */
  setDirectionalIntensity(intensity: number): void {
    if (this.directionalLight) {
      this.directionalLight.intensity = intensity;
    }
  }

  /**
   * Update directional light position
   */
  setDirectionalPosition(x: number, y: number, z: number): void {
    if (this.directionalLight) {
      this.directionalLight.position.set(x, y, z);
    }
  }

  /**
   * Get ambient light intensity
   */
  getAmbientIntensity(): number {
    return this.ambientLight?.intensity || 0;
  }

  /**
   * Get directional light intensity
   */
  getDirectionalIntensity(): number {
    return this.directionalLight?.intensity || 0;
  }
}

/**
 * Create a lighting instance
 */
export function createLighting(): Lighting {
  return new ThreeLighting();
}
