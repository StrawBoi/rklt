/**
 * Container Specifications - Dimensions and types for all container models
 * Based on ISO standard shipping container specifications
 */

export type ContainerType =
  | '20ft'
  | '40ft'
  | 'reefer'
  | 'refrigerated'
  | 'roro'
  | 'project';

export interface ContainerSpec {
  id: ContainerType;
  name: string;
  length: number; // meters
  width: number; // meters
  height: number; // meters
  modelUrl: string;
  hasRefrigerationUnit: boolean;
  isOversized: boolean;
  color: number; // Base color
  description: string;
}

/**
 * Container specifications for all types
 */
export const CONTAINER_SPECS: Record<ContainerType, ContainerSpec> = {
  '20ft': {
    id: '20ft',
    name: '20ft Standard',
    length: 6.1,
    width: 2.4,
    height: 2.6,
    modelUrl: '/models/container-20ft.glb',
    hasRefrigerationUnit: false,
    isOversized: false,
    color: 0x3a7ca5,
    description: 'Standard 20-foot ISO container'
  },
  '40ft': {
    id: '40ft',
    name: '40ft Standard',
    length: 12.2,
    width: 2.4,
    height: 2.6,
    modelUrl: '/models/container-40ft.glb',
    hasRefrigerationUnit: false,
    isOversized: false,
    color: 0xc77b4c,
    description: 'Standard 40-foot ISO container'
  },
  reefer: {
    id: 'reefer',
    name: 'Reefer 20ft',
    length: 6.1,
    width: 2.4,
    height: 2.9, // Higher due to cooling unit
    modelUrl: '/models/container-reefer.glb',
    hasRefrigerationUnit: true,
    isOversized: false,
    color: 0x5b98dc,
    description: 'Refrigerated 20ft container with cooling unit'
  },
  refrigerated: {
    id: 'refrigerated',
    name: 'Refrigerated 40ft',
    length: 12.2,
    width: 2.4,
    height: 2.9,
    modelUrl: '/models/container-refrigerated.glb',
    hasRefrigerationUnit: true,
    isOversized: false,
    color: 0x2e7cd1,
    description: 'Refrigerated 40ft container with cooling unit'
  },
  roro: {
    id: 'roro',
    name: 'RoRo Container',
    length: 12.2,
    width: 2.4,
    height: 2.6,
    modelUrl: '/models/container-roro.glb',
    hasRefrigerationUnit: false,
    isOversized: false,
    color: 0xa9663d,
    description: 'Roll-on/Roll-off container for vehicles'
  },
  project: {
    id: 'project',
    name: 'Project Cargo',
    length: 15.0,
    width: 3.5,
    height: 3.5,
    modelUrl: '/models/container-project.glb',
    hasRefrigerationUnit: false,
    isOversized: true,
    color: 0xd89162,
    description: 'Oversized project cargo with specialized rigging'
  }
};

/**
 * Get random container type
 */
export function getRandomContainerType(): ContainerType {
  const types: ContainerType[] = ['20ft', '40ft', 'reefer', 'refrigerated', 'roro', 'project'];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

/**
 * Get container spec by type
 */
export function getContainerSpec(type: ContainerType): ContainerSpec {
  return CONTAINER_SPECS[type];
}

/**
 * Get all container types
 */
export function getAllContainerTypes(): ContainerType[] {
  return Object.keys(CONTAINER_SPECS) as ContainerType[];
}

/**
 * Calculate container volume in cubic meters
 */
export function getContainerVolume(spec: ContainerSpec): number {
  return spec.length * spec.width * spec.height;
}

/**
 * Check if container type has refrigeration
 */
export function hasRefrigeration(type: ContainerType): boolean {
  return CONTAINER_SPECS[type].hasRefrigerationUnit;
}

/**
 * Get container corner positions (for cable attachment)
 */
export function getContainerCorners(spec: ContainerSpec): {
  frontLeft: { x: number; z: number };
  frontRight: { x: number; z: number };
  backLeft: { x: number; z: number };
  backRight: { x: number; z: number };
} {
  const halfWidth = spec.width / 2;
  const halfLength = spec.length / 2;

  return {
    frontLeft: { x: -halfWidth, z: -halfLength },
    frontRight: { x: halfWidth, z: -halfLength },
    backLeft: { x: -halfWidth, z: halfLength },
    backRight: { x: halfWidth, z: halfLength }
  };
}
