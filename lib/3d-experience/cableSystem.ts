/**
 * CableSystem - Inverse kinematics for crane cables
 * Renders four cables connecting crane spreader to container corners
 */

export interface CableConfig {
  diameter: number;
  segments: number;
  color: number;
  metalness: number;
  roughness: number;
}

export const DEFAULT_CABLE_CONFIG: CableConfig = {
  diameter: 0.1,
  segments: 8,
  color: 0x4a5568,
  metalness: 0.8,
  roughness: 0.6
};

export interface CableSystem {
  cables: any[]; // THREE.Mesh[]
  initialize(THREE: any): void;
  updateCableGeometry(
    containerPosition: { x: number; y: number; z: number },
    containerRotation: { x: number; y: number; z: number },
    containerWidth: number,
    containerLength: number,
    spreaderPosition: { x: number; y: number; z: number }
  ): void;
  addToScene(scene: any): void;
  dispose(): void;
}

/**
 * Three.js cable system implementation
 */
export class ThreeCableSystem implements CableSystem {
  public cables: any[] = [];
  private THREE: any = null;
  private config: CableConfig;

  constructor(config: Partial<CableConfig> = {}) {
    this.config = {
      ...DEFAULT_CABLE_CONFIG,
      ...config
    };
  }

  initialize(THREE: any): void {
    this.THREE = THREE;

    // Create four cables (one for each container corner)
    for (let i = 0; i < 4; i++) {
      const cable = this.createCable();
      this.cables.push(cable);
    }
  }

  /**
   * Create a single cable mesh
   */
  private createCable(): any {
    const geometry = new this.THREE.CylinderGeometry(
      this.config.diameter / 2,
      this.config.diameter / 2,
      1, // Initial height (will be scaled)
      this.config.segments,
      this.config.segments
    );

    // Rotate to point upward initially
    geometry.rotateX(Math.PI / 2);

    const material = new this.THREE.MeshStandardMaterial({
      color: this.config.color,
      metalness: this.config.metalness,
      roughness: this.config.roughness
    });

    const cable = new this.THREE.Mesh(geometry, material);
    cable.castShadow = true;

    return cable;
  }

  /**
   * Update cable geometry using inverse kinematics
   */
  updateCableGeometry(
    containerPosition: { x: number; y: number; z: number },
    containerRotation: { x: number; y: number; z: number },
    containerWidth: number,
    containerLength: number,
    spreaderPosition: { x: number; y: number; z: number }
  ): void {
    if (!this.THREE || this.cables.length === 0) return;

    // Calculate container corners in local space
    const halfWidth = containerWidth / 2;
    const halfLength = containerLength / 2;

    const localCorners = [
      new this.THREE.Vector3(-halfWidth, 0, -halfLength), // Front-left
      new this.THREE.Vector3(halfWidth, 0, -halfLength),  // Front-right
      new this.THREE.Vector3(-halfWidth, 0, halfLength),  // Back-left
      new this.THREE.Vector3(halfWidth, 0, halfLength)    // Back-right
    ];

    // Create container transformation matrix
    const containerMatrix = new this.THREE.Matrix4();
    containerMatrix.makeRotationFromEuler(
      new this.THREE.Euler(
        containerRotation.x,
        containerRotation.y,
        containerRotation.z,
        'XYZ'
      )
    );
    containerMatrix.setPosition(
      containerPosition.x,
      containerPosition.y,
      containerPosition.z
    );

    // Spreader position vector
    const spreaderVec = new this.THREE.Vector3(
      spreaderPosition.x,
      spreaderPosition.y,
      spreaderPosition.z
    );

    // Update each cable
    localCorners.forEach((localCorner, index) => {
      // Transform corner to world space
      const worldCorner = localCorner.clone();
      worldCorner.applyMatrix4(containerMatrix);

      // Calculate cable direction and length
      const direction = worldCorner.clone().sub(spreaderVec);
      const length = direction.length();

      const cable = this.cables[index];

      // Position cable at spreader
      cable.position.copy(spreaderVec);

      // Point cable toward container corner
      cable.lookAt(worldCorner);

      // Rotate to align with cable geometry
      cable.rotateX(Math.PI / 2);

      // Scale cable to match distance
      cable.scale.set(1, 1, length);

      // Hide cable if too short (container reached spreader)
      const MIN_CABLE_LENGTH = 0.5;
      cable.visible = length >= MIN_CABLE_LENGTH;
    });
  }

  addToScene(scene: any): void {
    if (scene) {
      this.cables.forEach((cable) => {
        scene.add(cable);
      });
    }
  }

  dispose(): void {
    this.cables.forEach((cable) => {
      if (cable.geometry) cable.geometry.dispose();
      if (cable.material) cable.material.dispose();
    });
    this.cables = [];
    this.THREE = null;
  }

  /**
   * Get cable at index
   */
  getCable(index: number): any {
    return this.cables[index];
  }

  /**
   * Get all cables
   */
  getCables(): any[] {
    return [...this.cables];
  }

  /**
   * Set cable visibility
   */
  setCableVisibility(index: number, visible: boolean): void {
    if (this.cables[index]) {
      this.cables[index].visible = visible;
    }
  }

  /**
   * Set all cables visibility
   */
  setAllCablesVisibility(visible: boolean): void {
    this.cables.forEach((cable) => {
      cable.visible = visible;
    });
  }

  /**
   * Update cable color
   */
  setCableColor(color: number): void {
    this.cables.forEach((cable) => {
      if (cable.material) {
        cable.material.color.setHex(color);
      }
    });
  }
}

/**
 * Create a cable system instance
 */
export function createCableSystem(config?: Partial<CableConfig>): CableSystem {
  return new ThreeCableSystem(config);
}
