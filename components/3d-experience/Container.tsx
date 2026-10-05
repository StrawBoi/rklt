/**
 * Container - 3D container model with PBR materials
 * Renders shipping container with realistic materials and weathering
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContainerType, ContainerSpec } from '@/lib/3d-experience/containerSpecs';
import { getContainerSpec, getRandomContainerType } from '@/lib/3d-experience/containerSpecs';

export interface ContainerProps {
  type?: ContainerType;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: number;
  onLoad?: (container: any) => void;
}

export function Container({
  type,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  scale = 1,
  onLoad
}: ContainerProps) {
  const containerRef = useRef<any>(null);
  const [selectedType] = useState<ContainerType>(type || getRandomContainerType());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let container: any = null;

    const loadContainer = async () => {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

        const spec = getContainerSpec(selectedType);

        // Setup loaders
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        // Load model (or create fallback if not found)
        try {
          const gltf = await new Promise<any>((resolve, reject) => {
            gltfLoader.load(
              spec.modelUrl,
              resolve,
              undefined,
              reject
            );
          });

          if (!mounted) return;

          container = gltf.scene;
        } catch (error) {
          console.warn(`Failed to load container model: ${spec.modelUrl}, using fallback`);
          
          // Create fallback container geometry
          container = createFallbackContainer(THREE, spec);
        }

        // Set position, rotation, scale
        container.position.set(position.x, position.y, position.z);
        container.rotation.set(rotation.x, rotation.y, rotation.z);
        container.scale.setScalar(scale);

        // Apply PBR materials to all meshes
        container.traverse((child: any) => {
          if (child.isMesh) {
            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;

            // Apply or enhance material
            if (!child.material || child.material.type === 'MeshBasicMaterial') {
              child.material = createContainerMaterial(THREE, spec);
            } else {
              // Enhance existing material
              child.material.metalness = 0.3;
              child.material.roughness = 0.7;
            }
          }
        });

        containerRef.current = container;
        setIsLoaded(true);
        onLoad?.(container);
      } catch (error) {
        console.error('Error loading container:', error);
      }
    };

    loadContainer();

    return () => {
      mounted = false;
      if (container) {
        container.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      }
    };
  }, [selectedType, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, scale, onLoad]);

  // This component doesn't render JSX - it manages a Three.js object
  // The actual rendering happens through the parent's Three.js scene
  return null;
}

/**
 * Create fallback container when model fails to load
 */
function createFallbackContainer(THREE: any, spec: ContainerSpec): any {
  const geometry = new THREE.BoxGeometry(spec.width, spec.height, spec.length);
  const material = createContainerMaterial(THREE, spec);
  const mesh = new THREE.Mesh(geometry, material);

  // Add corner details (simple cubes at corners)
  const cornerSize = 0.15;
  const cornerGeometry = new THREE.BoxGeometry(cornerSize, cornerSize, cornerSize);
  const cornerMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    metalness: 0.8,
    roughness: 0.4
  });

  const corners = [
    { x: spec.width / 2, y: spec.height / 2, z: spec.length / 2 },
    { x: -spec.width / 2, y: spec.height / 2, z: spec.length / 2 },
    { x: spec.width / 2, y: spec.height / 2, z: -spec.length / 2 },
    { x: -spec.width / 2, y: spec.height / 2, z: -spec.length / 2 },
    { x: spec.width / 2, y: -spec.height / 2, z: spec.length / 2 },
    { x: -spec.width / 2, y: -spec.height / 2, z: spec.length / 2 },
    { x: spec.width / 2, y: -spec.height / 2, z: -spec.length / 2 },
    { x: -spec.width / 2, y: -spec.height / 2, z: -spec.length / 2 }
  ];

  const group = new THREE.Group();
  group.add(mesh);

  corners.forEach((corner) => {
    const cornerMesh = new THREE.Mesh(cornerGeometry, cornerMaterial);
    cornerMesh.position.set(corner.x, corner.y, corner.z);
    group.add(cornerMesh);
  });

  return group;
}

/**
 * Create PBR material for container
 */
function createContainerMaterial(THREE: any, spec: ContainerSpec): any {
  return new THREE.MeshStandardMaterial({
    color: spec.color,
    metalness: 0.3,
    roughness: 0.7,
    // Add slight emissive for depth
    emissive: spec.color,
    emissiveIntensity: 0.05
  });
}

/**
 * Get container reference (for external access)
 */
export function useContainerRef() {
  return useRef<any>(null);
}
