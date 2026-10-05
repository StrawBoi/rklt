/**
 * CameraController - Manages camera configuration and responsive FOV
 * Adapts camera based on viewport size for optimal viewing
 */

export interface CameraConfig {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: { x: number; y: number; z: number };
}

export interface CameraController {
  camera: any; // THREE.PerspectiveCamera
  initialize(width: number, height: number): Promise<void>;
  updateAspect(width: number, height: number): void;
  updateFOV(width: number, height: number): void;
  getCamera(): any;
  dispose(): void;
}

/**
 * Get FOV based on viewport width
 */
export function getFOVForViewport(width: number, height: number): number {
  // Mobile: < 768px → FOV 60°
  if (width < 768) {
    return 60;
  }

  // Tablet: 768-1024px → FOV 75°
  if (width < 1024) {
    return 75;
  }

  // Desktop: > 1024px → FOV 85°
  return 85;
}

/**
 * Get container scale adjustment for landscape mobile
 */
export function getContainerScale(width: number, height: number): number {
  // Landscape mobile: height < 600px → 80% scale
  if (height < 600) {
    return 0.8;
  }
  return 1.0;
}

/**
 * Default camera configuration for overhead crane view
 */
export const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  fov: 75,
  aspect: 16 / 9,
  near: 0.1,
  far: 1000,
  position: { x: 0, y: 25, z: 15 }
};

/**
 * Three.js camera controller implementation
 */
export class ThreeCameraController implements CameraController {
  public camera: any = null;
  private THREE: any = null;

  async initialize(width: number, height: number): Promise<void> {
    try {
      // Dynamic import Three.js
      this.THREE = await import('three');

      // Calculate FOV based on viewport
      const fov = getFOVForViewport(width, height);
      const aspect = width / height;

      // Create perspective camera
      this.camera = new this.THREE.PerspectiveCamera(
        fov,
        aspect,
        DEFAULT_CAMERA_CONFIG.near,
        DEFAULT_CAMERA_CONFIG.far
      );

      // Set position for overhead crane view
      this.camera.position.set(
        DEFAULT_CAMERA_CONFIG.position.x,
        DEFAULT_CAMERA_CONFIG.position.y,
        DEFAULT_CAMERA_CONFIG.position.z
      );

      // Look at origin (where container will be)
      this.camera.lookAt(0, 0, 0);
    } catch (error) {
      console.error('Failed to initialize CameraController:', error);
      throw error;
    }
  }

  updateAspect(width: number, height: number): void {
    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  updateFOV(width: number, height: number): void {
    if (this.camera) {
      const newFOV = getFOVForViewport(width, height);
      this.camera.fov = newFOV;
      this.camera.updateProjectionMatrix();
    }
  }

  getCamera(): any {
    return this.camera;
  }

  dispose(): void {
    this.camera = null;
    this.THREE = null;
  }

  /**
   * Set camera position
   */
  setPosition(x: number, y: number, z: number): void {
    if (this.camera) {
      this.camera.position.set(x, y, z);
    }
  }

  /**
   * Make camera look at point
   */
  lookAt(x: number, y: number, z: number): void {
    if (this.camera && this.THREE) {
      this.camera.lookAt(new this.THREE.Vector3(x, y, z));
    }
  }

  /**
   * Get current FOV
   */
  getFOV(): number {
    return this.camera?.fov || 75;
  }

  /**
   * Get current aspect ratio
   */
  getAspect(): number {
    return this.camera?.aspect || 16 / 9;
  }
}

/**
 * Create a camera controller instance
 */
export function createCameraController(): CameraController {
  return new ThreeCameraController();
}
