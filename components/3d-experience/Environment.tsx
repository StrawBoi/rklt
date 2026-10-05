/**
 * Environment - Scene environment with ocean, ships, and aircraft
 * Creates maritime and aviation context for the logistics scene
 */

'use client';

import { useEffect, useRef } from 'react';
import type { DeviceCapabilityLevel } from '@/lib/3d-experience/deviceDetector';

export interface EnvironmentProps {
  capability: DeviceCapabilityLevel;
  onLoad?: () => void;
}

export function Environment({ capability, onLoad }: EnvironmentProps) {
  const oceanRef = useRef<any>(null);
  const shipsRef = useRef<any[]>([]);
  const aircraftRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let ocean: any = null;
    let ships: any[] = [];
    let aircraft: any = null;

    const createEnvironment = async () => {
      try {
        const THREE = await import('three');

        // Create ocean surface
        ocean = createOcean(THREE);
        oceanRef.current = ocean;

        // Create ship silhouettes
        ships = createShips(THREE);
        shipsRef.current = ships;

        // Create aircraft (only for high capability)
        if (capability === 'high') {
          aircraft = createAircraft(THREE);
          aircraftRef.current = aircraft;
        }

        if (mounted) {
          onLoad?.();
        }
      } catch (error) {
        console.error('Error creating environment:', error);
      }
    };

    createEnvironment();

    // Animation loop for ocean
    let animationId: number;
    const animate = () => {
      if (oceanRef.current && oceanRef.current.material.uniforms) {
        oceanRef.current.material.uniforms.time.value += 0.016; // ~60fps
      }

      if (aircraftRef.current) {
        // Animate aircraft position
        aircraftRef.current.position.x += 0.05;
        if (aircraftRef.current.position.x > 100) {
          aircraftRef.current.position.x = -100;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);

      if (ocean) {
        ocean.geometry?.dispose();
        ocean.material?.dispose();
      }

      ships.forEach((ship) => {
        ship.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });

      if (aircraft) {
        aircraft.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      }
    };
  }, [capability, onLoad]);

  return null;
}

/**
 * Create animated ocean surface
 */
function createOcean(THREE: any): any {
  const geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
  
  // Custom shader for animated waves
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x0b2027) } // ink-950
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        
        vec3 pos = position;
        float elevation = sin(pos.x * 0.5 + time) * 0.3 +
                         sin(pos.y * 0.3 + time * 0.7) * 0.2;
        pos.z = elevation;
        vElevation = elevation;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vec3 finalColor = color + vec3(vElevation * 0.1);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide
  });

  const ocean = new THREE.Mesh(geometry, material);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.y = -5;
  ocean.receiveShadow = true;

  return ocean;
}

/**
 * Create ship silhouettes in the distance
 */
function createShips(THREE: any): any[] {
  const ships: any[] = [];

  // Create 3 simple ship silhouettes
  for (let i = 0; i < 3; i++) {
    const shipGroup = new THREE.Group();

    // Hull (simple box)
    const hullGeometry = new THREE.BoxGeometry(8, 3, 2);
    const hullMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c5a66,
      metalness: 0.5,
      roughness: 0.8
    });
    const hull = new THREE.Mesh(hullGeometry, hullMaterial);
    hull.position.y = 1;
    shipGroup.add(hull);

    // Superstructure
    const superGeometry = new THREE.BoxGeometry(2, 2, 1.5);
    const superMaterial = new THREE.MeshStandardMaterial({
      color: 0x163842,
      metalness: 0.4,
      roughness: 0.7
    });
    const superstructure = new THREE.Mesh(superGeometry, superMaterial);
    superstructure.position.set(-2, 3, 0);
    shipGroup.add(superstructure);

    // Position ships in the distance
    shipGroup.position.set(
      -50 + i * 40,
      -3,
      -60 - i * 10
    );
    shipGroup.rotation.y = Math.PI / 2;

    ships.push(shipGroup);
  }

  return ships;
}

/**
 * Create aircraft flying across the sky
 */
function createAircraft(THREE: any): any {
  const aircraftGroup = new THREE.Group();

  // Fuselage
  const fuselageGeometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 16);
  const fuselageMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.3
  });
  const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
  fuselage.rotation.z = Math.PI / 2;
  aircraftGroup.add(fuselage);

  // Wings
  const wingGeometry = new THREE.BoxGeometry(8, 0.1, 1.5);
  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    metalness: 0.7,
    roughness: 0.4
  });
  const wings = new THREE.Mesh(wingGeometry, wingMaterial);
  aircraftGroup.add(wings);

  // Tail
  const tailGeometry = new THREE.BoxGeometry(0.1, 1.5, 1);
  const tail = new THREE.Mesh(tailGeometry, wingMaterial);
  tail.position.set(-2, 0.5, 0);
  aircraftGroup.add(tail);

  // Position high in the sky, far away
  aircraftGroup.position.set(-80, 40, -40);
  aircraftGroup.scale.setScalar(0.5);

  return aircraftGroup;
}

/**
 * Get ocean reference for external access
 */
export function getOceanRef(envRef: React.RefObject<any>): any {
  return envRef.current;
}
