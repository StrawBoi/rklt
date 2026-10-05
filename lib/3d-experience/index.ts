/**
 * 3D Experience Utilities - Export all core systems
 */

export { sessionManager } from './sessionManager';

export { detectDeviceCapability } from './deviceDetector';
export type { DeviceCapability, DeviceCapabilityLevel } from './deviceDetector';

export {
  getLocalizedContent,
  formatProgress,
  getLayoutStyles,
  getSkipButtonPosition,
  LOCALIZED_CONTENT,
  type LocalizedContent,
  type Locale
} from './localization';

export {
  Experience3DErrorHandler,
  Experience3DErrorBoundary,
  ErrorType,
  type Experience3DError
} from './errorHandler';

export {
  AssetLoader,
  ASSET_MANIFEST,
  type AssetManifest,
  type ModelAsset,
  type TextureAsset,
  type LoadedAssets,
  type ProgressCallback
} from './assetLoader';

export {
  ContainerPhysicsEngine,
  createPhysicsEngine,
  DEFAULT_PHYSICS_CONFIG,
  type PhysicsConfig,
  type PhysicsEngine
} from './physicsEngine';

export {
  ThreeSceneManager,
  createSceneManager,
  getSceneConfig,
  type SceneConfig,
  type SceneManager
} from './sceneManager';

export {
  ThreeCameraController,
  createCameraController,
  getFOVForViewport,
  getContainerScale,
  DEFAULT_CAMERA_CONFIG,
  type CameraConfig,
  type CameraController
} from './cameraController';

export {
  ThreeLighting,
  createLighting,
  DEFAULT_LIGHTING_CONFIG,
  type LightingConfig,
  type Lighting
} from './lighting';

export {
  CONTAINER_SPECS,
  getRandomContainerType,
  getContainerSpec,
  getAllContainerTypes,
  getContainerVolume,
  hasRefrigeration,
  getContainerCorners,
  type ContainerType,
  type ContainerSpec
} from './containerSpecs';

export {
  ThreeCableSystem,
  createCableSystem,
  DEFAULT_CABLE_CONFIG,
  type CableConfig,
  type CableSystem
} from './cableSystem';

export {
  FramePerformanceMonitor,
  createPerformanceMonitor,
  applyComplexityDegradation,
  DEFAULT_PERFORMANCE_CONFIG,
  type PerformanceMonitor,
  type PerformanceConfig,
  type PerformanceMetrics,
  type ComplexityLevel
} from './performanceMonitor';
