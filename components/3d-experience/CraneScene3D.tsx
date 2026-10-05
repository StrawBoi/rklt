/**
 * CraneScene3D - Main 3D scene component
 * Integrates all 3D systems: scene, camera, lighting, physics, containers, crane, cables, environment
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { DeviceCapabilityLevel } from '@/lib/3d-experience/deviceDetector';
import type { Locale } from '@/lib/3d-experience/localization';
import {
  createSceneManager,
  createCameraController,
  createLighting,
  createPhysicsEngine,
  createCableSystem,
  getRandomContainerType,
  getContainerSpec
} from '@/lib/3d-experience';

export interface CraneScene3DProps {
  locale: Locale;
  deviceCapability: DeviceCapabilityLevel;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export function CraneScene3D({
  locale,
  deviceCapability,
  onReady,
  onError
}: CraneScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let scene: any = null;
    let THREE: any = null;

    // Core systems
    let sceneManager: any = null;
    let cameraController: any = null;
    let lighting: any = null;
    let physicsEngine: any = null;
    let cableSystem: any = null;

    // 3D objects
    let container: any = null;
    let crane: any = null;
    let environment: any = null;
    let clock: any = null;

    const initialize = async () => {
      try {
        // Import Three.js
        THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

        if (!mounted || !containerRef.current) return;

        // Initialize scene manager
        sceneManager = createSceneManager();
        await sceneManager.initialize(containerRef.current, deviceCapability);
        scene = sceneManager.scene;

        // Initialize camera
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        cameraController = createCameraController();
        await cameraController.initialize(width, height);

        // Initialize lighting
        const enableShadows = deviceCapability === 'high';
        lighting = createLighting();
        await lighting.initialize(enableShadows);
        lighting.addToScene(scene);

        // Initialize physics engine
        physicsEngine = createPhysicsEngine({
          amplitude: 1.5,
          frequency: 0.5,
          dampingRatio: 0.1
        });

        // Initialize cable system
        cableSystem = createCableSystem();
        cableSystem.initialize(THREE);
        cableSystem.addToScene(scene);

        // Load container
        const containerType = getRandomContainerType();
        const containerSpec = getContainerSpec(containerType);
        container = await loadContainer(THREE, GLTFLoader, DRACOLoader, containerSpec);
        scene.add(container);

        // Load crane
        crane = await loadCrane(THREE, GLTFLoader, DRACOLoader);
        scene.add(crane);

        // Create environment
        environment = await createEnvironment(THREE, deviceCapability);
        if (environment.ocean) scene.add(environment.ocean);
        environment.ships?.forEach((ship: any) => scene.add(ship));
        if (environment.aircraft) scene.add(environment.aircraft);

        // Create clock for animation
        clock = new THREE.Clock();

        // Store scene reference
        sceneRef.current = {
          sceneManager,
          cameraController,
          lighting,
          physicsEngine,
          cableSystem,
          container,
          crane,
          environment,
          containerSpec,
          clock
        };

        if (mounted) {
          setIsInitialized(true);
          onReady?.();
        }

        // Start animation loop
        startAnimationLoop();
      } catch (error) {
        console.error('Failed to initialize CraneScene3D:', error);
        if (mounted) {
          onError?.(error as Error);
        }
      }
    };

    const startAnimationLoop = () => {
      const animate = () => {
        if (!mounted || !sceneRef.current) return;

        const {
          sceneManager,
          cameraController,
          physicsEngine,
          cableSystem,
          container,
          crane,
          environment,
          containerSpec,
          clock
        } = sceneRef.current;

        // Update physics
        const deltaTime = clock.getDelta();
        physicsEngine.update(deltaTime);

        // Apply physics to container
        container.rotation.x = physicsEngine.swayAngleX;
        container.rotation.z = physicsEngine.swayAngleZ;

        // Update cables
        const spreaderPosition = getSpreaderPosition(crane);
        if (spreaderPosition) {
          cableSystem.updateCableGeometry(
            container.position,
            container.rotation,
            containerSpec.width,
            containerSpec.length,
            spreaderPosition
          );
        }

        // Update environment
        if (environment.ocean?.material?.uniforms) {
          environment.ocean.material.uniforms.time.value += deltaTime;
        }

        if (environment.aircraft) {
          environment.aircraft.position.x += 0.05;
          if (environment.aircraft.position.x > 100) {
            environment.aircraft.position.x = -100;
          }
        }

        // Render scene
        sceneManager.render(cameraController.camera);

        animationIdRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      sceneRef.current.cameraController.updateAspect(width, height);
      sceneRef.current.cameraController.updateFOV(width, height);
      sceneRef.current.sceneManager.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    initialize();

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);

      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Dispose all resources
      if (sceneRef.current) {
        sceneRef.current.cableSystem?.dispose();
        sceneRef.current.sceneManager?.dispose();
        sceneRef.current.cameraController?.dispose();
        sceneRef.current.lighting?.dispose();
      }
    };
  }, [locale, deviceCapability, onReady, onError]);

  return (
    <div
      ref={containerRef}
      className="crane-scene-container fixed inset-0 z-10"
      style={{ minHeight: '100vh' }}
    />
  );
}

/**
 * Load container model
 */
async function loadContainer(
  THREE: any,
  GLTFLoader: any,
  DRACOLoader: any,
  spec: any
): Promise<any> {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  try {
    const gltf = await new Promise<any>((resolve, reject) => {
      gltfLoader.load(spec.modelUrl, resolve, undefined, reject);
    });

    const container = gltf.scene;
    container.position.set(0, 0, 0);

    // Configure materials
    container.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return container;
  } catch (error) {
    console.warn('Failed to load container, using fallback');
    return createFallbackContainer(THREE, spec);
  }
}

/**
 * Create fallback container
 */
function createFallbackContainer(THREE: any, spec: any): any {
  const geometry = new THREE.BoxGeometry(spec.width, spec.height, spec.length);
  const material = new THREE.MeshStandardMaterial({
    color: spec.color,
    metalness: 0.3,
    roughness: 0.7
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

/**
 * Load crane model
 */
async function loadCrane(
  THREE: any,
  GLTFLoader: any,
  DRACOLoader: any
): Promise<any> {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  try {
    const gltf = await new Promise<any>((resolve, reject) => {
      gltfLoader.load('/models/crane-overhead.glb', resolve, undefined, reject);
    });

    const crane = gltf.scene;
    crane.position.set(0, 10, 0);

    crane.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return crane;
  } catch (error) {
    console.warn('Failed to load crane, using fallback');
    return createFallbackCrane(THREE);
  }
}

/**
 * Create fallback crane
 */
function createFallbackCrane(THREE: any): any {
  const group = new THREE.Group();

  // Beam
  const beamGeometry = new THREE.BoxGeometry(15, 0.5, 0.5);
  const beamMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.7,
    roughness: 0.5
  });
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  beam.position.y = 10;
  group.add(beam);

  // Spreader
  const spreaderGeometry = new THREE.BoxGeometry(3, 0.3, 2);
  const spreaderMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    metalness: 0.8,
    roughness: 0.4
  });
  const spreader = new THREE.Mesh(spreaderGeometry, spreaderMaterial);
  spreader.position.y = 9;
  spreader.name = 'spreader';
  group.add(spreader);

  return group;
}

/**
 * Get spreader position from crane
 */
function getSpreaderPosition(crane: any): { x: number; y: number; z: number } | null {
  if (!crane) return null;

  let spreader: any = null;
  crane.traverse((child: any) => {
    if (child.name === 'spreader' || child.name?.includes('spreader')) {
      spreader = child;
    }
  });

  if (spreader) {
    return {
      x: crane.position.x,
      y: crane.position.y - 1,
      z: crane.position.z
    };
  }

  return { x: 0, y: 9, z: 0 };
}

/**
 * Create environment
 */
async function createEnvironment(THREE: any, capability: DeviceCapabilityLevel): Promise<any> {
  // Ocean
  const oceanGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
  const oceanMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x0b2027) }
    },
    vertexShader: `
      uniform float time;
      varying float vElevation;
      void main() {
        vec3 pos = position;
        float elevation = sin(pos.x * 0.5 + time) * 0.3 + sin(pos.y * 0.3 + time * 0.7) * 0.2;
        pos.z = elevation;
        vElevation = elevation;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying float vElevation;
      void main() {
        vec3 finalColor = color + vec3(vElevation * 0.1);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide
  });

  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.y = -5;
  ocean.receiveShadow = true;

  // Ships
  const ships = [];
  for (let i = 0; i < 3; i++) {
    const shipGroup = new THREE.Group();
    const hullGeometry = new THREE.BoxGeometry(8, 3, 2);
    const hullMaterial = new THREE.MeshStandardMaterial({ color: 0x2c5a66 });
    const hull = new THREE.Mesh(hullGeometry, hullMaterial);
    shipGroup.add(hull);
    shipGroup.position.set(-50 + i * 40, -3, -60 - i * 10);
    ships.push(shipGroup);
  }

  // Aircraft (high capability only)
  let aircraft = null;
  if (capability === 'high') {
    aircraft = new THREE.Group();
    const fuselageGeometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 16);
    const fuselageMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
    fuselage.rotation.z = Math.PI / 2;
    aircraft.add(fuselage);
    aircraft.position.set(-80, 40, -40);
    aircraft.scale.setScalar(0.5);
  }

  return { ocean, ships, aircraft };
}
