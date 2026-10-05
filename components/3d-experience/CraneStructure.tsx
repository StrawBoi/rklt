/**
 * CraneStructure - Overhead crane model for 3D scene
 * Loads and manages the crane structure geometry
 */

'use client';

import { useEffect, useRef } from 'react';

export interface CraneStructureProps {
  position?: { x: number; y: number; z: number };
  onLoad?: (crane: any) => void;
}

export function CraneStructure({
  position = { x: 0, y: 10, z: 0 },
  onLoad
}: CraneStructureProps) {
  const craneRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let crane: any = null;

    const loadCrane = async () => {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

        // Setup loaders
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        // Try to load crane model
        try {
          const gltf = await new Promise<any>((resolve, reject) => {
            gltfLoader.load(
              '/models/crane-overhead.glb',
              resolve,
              undefined,
              reject
            );
          });

          if (!mounted) return;
          crane = gltf.scene;
        } catch (error) {
          console.warn('Failed to load crane model, using fallback');
          crane = createFallbackCrane(THREE);
        }

        // Set position
        crane.position.set(position.x, position.y, position.z);

        // Configure materials and shadows
        crane.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Ensure metallic material for crane
            if (child.material) {
              child.material.metalness = 0.7;
              child.material.roughness = 0.5;
            }
          }
        });

        craneRef.current = crane;
        onLoad?.(crane);
      } catch (error) {
        console.error('Error loading crane:', error);
      }
    };

    loadCrane();

    return () => {
      mounted = false;
      if (crane) {
        crane.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      }
    };
  }, [position.x, position.y, position.z, onLoad]);

  return null;
}

/**
 * Create fallback crane structure when model fails to load
 */
function createFallbackCrane(THREE: any): any {
  const group = new THREE.Group();

  // Crane beam (horizontal)
  const beamGeometry = new THREE.BoxGeometry(15, 0.5, 0.5);
  const beamMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.7,
    roughness: 0.5
  });
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  beam.position.y = 0;
  group.add(beam);

  // Vertical supports
  const supportGeometry = new THREE.CylinderGeometry(0.3, 0.3, 10, 16);
  const supportMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.7,
    roughness: 0.5
  });

  const leftSupport = new THREE.Mesh(supportGeometry, supportMaterial);
  leftSupport.position.set(-7, -5, 0);
  group.add(leftSupport);

  const rightSupport = new THREE.Mesh(supportGeometry, supportMaterial);
  rightSupport.position.set(7, -5, 0);
  group.add(rightSupport);

  // Spreader (cable attachment point)
  const spreaderGeometry = new THREE.BoxGeometry(3, 0.3, 2);
  const spreaderMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    metalness: 0.8,
    roughness: 0.4
  });
  const spreader = new THREE.Mesh(spreaderGeometry, spreaderMaterial);
  spreader.position.y = -1;
  spreader.name = 'spreader'; // Name for cable attachment
  group.add(spreader);

  return group;
}

/**
 * Get crane spreader position (for cable attachment)
 */
export function getSpreaderPosition(crane: any): { x: number; y: number; z: number } | null {
  if (!crane) return null;

  // Find spreader in crane hierarchy
  let spreader: any = null;
  crane.traverse((child: any) => {
    if (child.name === 'spreader' || child.name?.includes('spreader')) {
      spreader = child;
    }
  });

  if (spreader) {
    const worldPosition = new (THREE as any).Vector3();
    spreader.getWorldPosition(worldPosition);
    return {
      x: worldPosition.x,
      y: worldPosition.y,
      z: worldPosition.z
    };
  }

  // Fallback: return crane position
  return {
    x: crane.position.x,
    y: crane.position.y - 1,
    z: crane.position.z
  };
}
