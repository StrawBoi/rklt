# Implementation Plan: Premium 3D Animated Logistics Experience

## Overview

This implementation plan converts the premium 3D animated logistics experience design into actionable coding tasks. The feature integrates sophisticated Three.js-powered 3D crane scenes with GSAP-driven scroll animations into the existing RKLT Next.js website, providing an immersive visual showcase of multimodal logistics capabilities.

## Tasks

- [ ] 1. Project setup and dependencies
  - Install Three.js (≥0.160.0), GSAP (≥3.12.0), and related loaders
  - Configure Next.js dynamic imports for client-only 3D components
  - Set up TypeScript types for Three.js and GSAP
  - Create base directory structure: `components/3d-experience/`
  - _Requirements: 20.1, 20.2, 14.1, 14.2_

- [ ] 2. Core utility systems
  - [ ] 2.1 Implement SessionManager utility
    - Create `sessionManager` object with `hasSeenIntro()`, `markIntroSeen()`, `clearIntroFlag()` methods
    - Use sessionStorage with key "rklt_intro_shown"
    - Handle graceful fallback when sessionStorage unavailable
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [ ] 2.2 Implement DeviceDetector system
    - Create `detectDeviceCapability()` function returning capability level and metadata
    - Check `prefers-reduced-motion` media query first
    - Detect screen width thresholds (mobile < 768px, tablet 768-1024px, desktop > 1024px)
    - Implement GPU benchmarking with WebGL triangle rendering test
    - Return capability object with level ('high', 'medium', 'low', 'reduced-motion')
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ] 2.3 Create localization utilities
    - Define `LocalizedContent` interface for UI strings
    - Create `LOCALIZED_CONTENT` object with English and Arabic translations
    - Implement `getLocalizedContent(locale)` function
    - Implement `formatProgress(progress, locale)` for Arabic-Indic numerals
    - Implement `getLayoutStyles(locale)` for RTL layout adjustments
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [ ] 2.4 Implement error handling system
    - Create `ErrorType` enum with all error scenarios
    - Implement `Experience3DErrorHandler` class with `handle()`, `logError()`, `activateFallback()` methods
    - Add localized error messages for English and Arabic
    - Implement retry logic for asset loading with exponential backoff
    - Create React ErrorBoundary component for 3D experience
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [ ] 3. Checkpoint - Verify utilities work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Asset loading system
  - [ ] 4.1 Implement AssetLoader class
    - Create `AssetLoader` interface with `load()` and `dispose()` methods
    - Set up GLTFLoader with DRACOLoader for model compression
    - Set up TextureLoader for texture loading
    - Implement progress tracking callback that fires for each loaded asset
    - Implement priority-based loading (logo → crane → container → textures)
    - Add 10-second timeout with automatic fallback to 2D mode on failure
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ]* 4.2 Write unit tests for AssetLoader
    - Test progress callback fires with correct percentages
    - Test priority loading order is maintained
    - Test error handling when asset fails to load
    - Test dispose() clears all loaded assets
    - _Requirements: 9.1, 9.2, 9.3, 9.6_

- [ ] 5. Loading screen component
  - [ ] 5.1 Create LoadingScreen component
    - Display animated RKLT logo pulsing at 1-second intervals
    - Show progress bar filling from 0% to 100% width
    - Display percentage text updating every 100ms
    - Support localized progress text (EN/AR with Arabic-Indic numerals)
    - Apply RTL layout for Arabic locale
    - Fade out over 400ms with easeInOut when loading completes
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_

- [ ] 6. Logo animation component
  - [ ] 6.1 Create LogoAnimator component
    - Create SVG with RKLT letters as separate path elements
    - Calculate path lengths using `getTotalLength()` for dasharray setup
    - Implement GSAP timeline animating R → K → L → T sequentially
    - Use stroke-dashoffset technique for paint reveal effect
    - Apply fill color (terracotta-500) with 200ms delay after stroke
    - Render on full-screen overlay with ink-950 background
    - Call `sessionManager.markIntroSeen()` and `onComplete` callback when finished
    - Dispose GSAP timeline on unmount
    - _Requirements: 1.1, 1.2, 24.1, 24.2, 24.3, 24.4, 24.5_
  
  - [ ] 6.2 Create SkipControl component
    - Position in bottom-right (bottom-left for Arabic) at 90% opacity
    - Display localized text ("Skip Intro" / "تخطي المقدمة")
    - Handle click event to call `onSkip` callback
    - Add ESC key listener to trigger skip
    - Fade out over 200ms when animation completes naturally
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 6.3 Write integration tests for LogoAnimator
    - Test logo animation completes and marks sessionStorage
    - Test skip button triggers immediate transition
    - Test ESC key triggers skip
    - Test onComplete callback is called after animation
    - _Requirements: 1.1, 1.2, 1.3, 3.2, 3.3_

- [ ] 7. Physics engine for container sway
  - [ ] 7.1 Implement PhysicsEngine class
    - Define `PhysicsConfig` interface (amplitude, dampingRatio, frequency, initialPhases)
    - Implement `ContainerPhysicsEngine` with damped harmonic motion equations
    - Calculate `swayAngleX` and `swayAngleZ` using sinusoidal motion with exponential damping
    - Convert degrees to radians for Three.js compatibility
    - Implement `setAmplitude()` method for scroll-based amplitude reduction
    - Use amplitude range 0.5° to 2.0°, damping ratio 0.05-0.15
    - _Requirements: 4.2, 4.3, 4.4, 6.3, 23.1_
  
  - [ ]* 7.2 Write unit tests for PhysicsEngine
    - Test `update(deltaTime)` produces angles within -2° to +2°
    - Test `setAmplitude(0)` results in zero sway
    - Test damping reduces amplitude over time
    - Test frequency affects oscillation period correctly
    - _Requirements: 4.2, 4.4_

- [ ] 8. 3D scene infrastructure
  - [ ] 8.1 Create SceneManager class
    - Initialize Three.js Scene, WebGLRenderer with high-performance settings
    - Configure renderer with antialias (high capability only), alpha, powerPreference
    - Set pixel ratio capped at Math.min(devicePixelRatio, 2)
    - Enable/disable shadows based on device capability
    - Add fog with color ink-950, near 30, far 100
    - Implement `dispose()` method to clean up geometries, materials, textures, renderer
    - _Requirements: 4.1, 4.5, 4.6, 12.1, 12.2_
  
  - [ ] 8.2 Create CameraController class
    - Create PerspectiveCamera with responsive FOV (60° mobile, 75° tablet, 85° desktop)
    - Position camera at (0, 25, 15) for overhead crane view
    - Handle viewport resize with aspect ratio updates
    - Reduce container scale by 20% when viewport height < 600px (landscape mobile)
    - _Requirements: 4.1, 16.1, 16.2, 16.3, 16.4, 16.5_
  
  - [ ] 8.3 Create lighting configuration
    - Add AmbientLight with color 0xffffff, intensity 0.4
    - Add DirectionalLight with color 0xffffff, intensity 0.8, position (10, 20, 10)
    - Enable shadow casting for DirectionalLight (high capability only)
    - _Requirements: 12.4_

- [ ] 9. Container 3D models
  - [ ] 9.1 Create Container component
    - Define `CONTAINER_SPECS` with dimensions for all six types (20ft, 40ft, reefer, refrigerated, roro, project)
    - Randomly select container type on load with equal probability
    - Load appropriate GLTF model using AssetLoader
    - Apply PBR metallic-roughness materials
    - Add surface details: corrugation ridges (normal maps), corner castings, identification markings
    - Apply weathering effects with 30% intensity
    - Display company markings "RKLT" and appropriate ISO codes
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 25.1, 25.2, 25.3, 25.4, 25.5_
  
  - [ ] 9.2 Create container material system
    - Load texture atlas (container-atlas.webp) for diffuse maps
    - Load normal map (container-normal.webp) for surface detail
    - Configure texture minFilter, magFilter, anisotropy for quality
    - Generate mipmaps for distance performance
    - Use sRGBEncoding for diffuse, LinearEncoding for normal
    - _Requirements: 25.1, 25.2, 25.3_

- [ ] 10. Crane structure and environment
  - [ ] 10.1 Create CraneStructure component
    - Load crane-overhead.glb model using AssetLoader
    - Position crane structure for overhead perspective view
    - Optimize geometry by merging static meshes with BufferGeometryUtils
    - _Requirements: 4.1_
  
  - [ ] 10.2 Create Environment component
    - Create ocean surface with animated wave motion using custom shader
    - Add time-based animation to ocean material uniforms
    - Add subtle ship silhouettes in distant background
    - Add animated aircraft flying across sky (desktop high capability only)
    - Apply atmospheric fog effect with distance-based density
    - Position sun at 45-degree angle for optimal container lighting
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 11. Cable system with inverse kinematics
  - [ ] 11.1 Create CableSystem class
    - Create four cable meshes using CylinderBufferGeometry (0.1m diameter, 8 segments)
    - Apply metallic material with color #4A5568, metalness 0.8, roughness 0.6
    - Calculate four container corner positions (front-left, front-right, back-left, back-right)
    - Implement `updateCableGeometry()` function with inverse kinematics
    - Transform container corners to world space using matrixWorld
    - Position and scale cables to connect spreader to container corners
    - Ensure cables stay taut (hide if length < MIN_CABLE_LENGTH)
    - _Requirements: 4.3, 23.1, 23.2, 23.3, 23.4, 23.5_

- [ ] 12. Checkpoint - Verify 3D scene renders correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. CraneScene3D main component
  - [ ] 13.1 Implement CraneScene3D component
    - Initialize Three.js scene using SceneManager
    - Set up camera using CameraController
    - Add lighting configuration
    - Load and add CraneStructure, Container, Environment to scene
    - Initialize PhysicsEngine with default config
    - Initialize CableSystem with four cables
    - Create animation loop with requestAnimationFrame
    - Update physics engine on each frame and apply rotation to container
    - Update cable geometry based on container position
    - Update ocean animation time uniform
    - Call renderer.render(scene, camera) on each frame
    - Implement cleanup on unmount (dispose scene, cancel animation frame)
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 12.1, 12.2, 12.3_
  
  - [ ]* 13.2 Write integration tests for CraneScene3D
    - Test scene initializes successfully with all components
    - Test container swaying produces visible rotation
    - Test cables adjust angles when container moves
    - Test disposal cleans up all resources
    - _Requirements: 4.1, 4.3, 4.5_

- [ ] 14. Performance monitoring system
  - [ ] 14.1 Create PerformanceMonitor class
    - Record frame time on each `recordFrame()` call
    - Store last 60 frame times in circular buffer
    - Calculate average FPS from frame time samples
    - Track consecutive low FPS counts (< 24fps)
    - Trigger degradation after 3 consecutive seconds below threshold
    - Implement complexity levels: 'high' (60fps, full features) → 'medium' (30fps, no shadows) → 'low' (2D fallback)
    - Log degradation events to console
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ] 14.2 Apply complexity degradation
    - High → Medium: reduce physics to 30fps, disable shadows, reduce ocean resolution
    - Medium → Low: dispose 3D resources, switch to HeroSection fallback
    - _Requirements: 8.2, 8.3_
  
  - [ ]* 14.3 Write performance benchmark tests
    - Verify desktop (high) maintains ≥60fps for 10 seconds
    - Verify tablet (medium) maintains ≥30fps for 10 seconds
    - Verify monitor triggers degradation when FPS < 24 for 3 seconds
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 15. Scroll orchestration with GSAP
  - [ ] 15.1 Create ScrollOrchestrator component
    - Register GSAP ScrollTrigger plugin
    - Create GSAP timeline with ScrollTrigger targeting crane scene container
    - Set trigger start: "top top", end: "+=100vh" (one viewport height)
    - Enable scrub: 1 for smooth scroll-linked animation
    - Enable pin: true to pin scene during scroll
    - Animate container position.y from 0 to -15 meters with easeOutCubic
    - Reduce physics amplitude from 2.0° to 0° linearly during descent
    - Fade scene opacity from 1 to 0 at 70% progress
    - Dispose 3D resources when scroll leaves trigger area
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 13.1, 13.3_
  
  - [ ] 15.2 Optimize scroll performance
    - Use CSS will-change: 'transform, opacity' on scene container
    - Apply transform: translateZ(0) for GPU layer promotion
    - Use contain: 'layout style paint' for CSS containment
    - Throttle scroll events using requestAnimationFrame
    - Add passive: true to scroll event listeners
    - Reserve min-height: 100vh to prevent cumulative layout shift
    - _Requirements: 13.4, 22.1, 22.2, 22.3, 22.4, 22.5_
  
  - [ ]* 15.3 Write integration tests for scroll behavior
    - Test scroll progress 0 → container at y=0
    - Test scroll progress 1 → container at y=-15
    - Test scroll progress 0.5 → sway amplitude = 1.0°
    - Test scroll progress 1 → scene opacity = 0
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 16. Motion-reduced fallback experience
  - [ ] 16.1 Create MotionReducedExperience component
    - Display static RKLT logo for 1 second
    - Show static overhead crane photograph instead of 3D scene
    - Use simple fade transitions for scroll interactions
    - _Requirements: 10.2, 10.3, 10.4_

- [ ] 17. Experience3DRoot orchestrator
  - [ ] 17.1 Implement Experience3DRoot component
    - Mark as 'use client' for client-side rendering
    - Initialize state: hasSeenIntro, deviceCapability, loadingProgress, isReady, error
    - Check sessionStorage using sessionManager.hasSeenIntro()
    - Detect device capability using detectDeviceCapability()
    - Return HeroSection fallback if capability is 'low'
    - Return MotionReducedExperience if capability is 'reduced-motion'
    - Dynamically import Three.js and GSAP using Promise.all
    - Show LoadingScreen while assets loading
    - Render LogoAnimator on first visit (hasSeenIntro = false)
    - Render CraneScene3D on returning visit (hasSeenIntro = true)
    - Pass locale prop to all child components
    - Wrap in Experience3DErrorBoundary
    - _Requirements: 1.1, 1.4, 2.1, 7.2, 7.3, 7.4, 10.1, 10.2, 19.1, 20.1, 20.3_
  
  - [ ]* 17.2 Write integration tests for Experience3DRoot
    - Test first visit + high capability → renders LogoAnimator
    - Test returning visit + high capability → renders CraneScene3D directly
    - Test low capability → renders HeroSection fallback
    - Test prefers-reduced-motion → renders MotionReducedExperience
    - _Requirements: 1.1, 1.4, 2.1, 7.2, 7.3, 10.1_

- [ ] 18. Homepage integration
  - [ ] 18.1 Integrate Experience3DRoot into homepage
    - Use next/dynamic to import Experience3DRoot with ssr: false
    - Add loading component showing LoadingScreen
    - Replace HeroSection with Experience3DRoot in app/[locale]/page.tsx
    - Pass locale from params.locale to Experience3DRoot
    - Keep HeroSection available as fallback component
    - _Requirements: 20.1, 20.2, 20.3, 20.6_
  
  - [ ] 18.2 Configure Next.js for optimization
    - Add webpack alias for Three.js: 'three/build/three.module.js'
    - Configure splitChunks to separate Three.js and GSAP into their own bundles
    - Add cache headers for /models/ and /textures/ paths (7-day cache)
    - Enable gzip compression
    - _Requirements: 15.1, 15.2, 15.3, 18.1, 18.2_

- [ ] 19. Analytics and tracking
  - [ ] 19.1 Create EventTracker utility
    - Define `AnalyticsEvent` interface and `TRACKED_EVENTS` object
    - Implement `trackEvent()` function that emits to window.gtag if available
    - Track: logo_animation_start, logo_animation_complete, logo_animation_skipped, crane_scene_loaded, fallback_activated, performance_degradation
    - _Requirements: 21.1_
  
  - [ ] 19.2 Create MetricsCollector class
    - Record deviceCapability, gpuScore, averageFPS, assetLoadTime, bundleSize
    - Calculate initialLoadTime and timeToInteractive from Performance API
    - Implement `sendMetrics()` to emit performance data to analytics
    - _Requirements: 21.2, 21.3, 21.4_
  
  - [ ] 19.3 Integrate analytics into components
    - Emit logo_animation_start when LogoAnimator mounts
    - Emit logo_animation_complete when animation finishes
    - Emit logo_animation_skipped when user skips
    - Emit crane_scene_loaded when CraneScene3D ready
    - Emit fallback_activated when error handler activates fallback
    - Emit performance_degradation when PerformanceMonitor degrades
    - _Requirements: 21.1, 21.5_

- [ ] 20. 3D assets creation and optimization
  - [ ] 20.1 Create or source 3D models
    - Create/source crane-overhead.glb model
    - Create/source container models: 20ft, 40ft, reefer, refrigerated, roro, project cargo
    - Apply Draco compression to achieve 40%+ size reduction
    - Target sizes: crane 180KB, containers 85-110KB each
    - _Requirements: 9.4, 9.5_
  
  - [ ] 20.2 Create texture assets
    - Create container texture atlas (diffuse map) as WebP
    - Create container normal map as WebP
    - Create ocean normal map as JPG
    - Target sizes: container-atlas 120KB, container-normal 95KB, ocean-normal 65KB
    - _Requirements: 15.4, 25.2, 25.3_
  
  - [ ] 20.3 Set up public assets directory
    - Create /public/models/ directory with all GLTF models
    - Create /public/textures/ directory with all texture files
    - Create /public/draco/ directory with Draco decoder WASM files
    - Verify cache headers are applied correctly
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [ ] 21. Responsive design refinements
  - [ ] 21.1 Implement responsive camera adjustments
    - Add viewport resize listener to CameraController
    - Update camera FOV based on window.innerWidth
    - Update camera aspect ratio on resize
    - Scale container by 0.8x when height < 600px
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_
  
  - [ ] 21.2 Test on multiple devices
    - Verify mobile (< 768px) shows 2D fallback or reduced complexity
    - Verify tablet (768-1024px) runs at 30fps with medium complexity
    - Verify desktop (> 1024px) runs at 60fps with full features
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 16.1, 16.2, 16.3_

- [ ] 22. Checkpoint - Full integration test
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 23. Bundle size optimization
  - [ ] 23.1 Analyze bundle sizes
    - Run `npm run build` with bundle analyzer enabled
    - Verify Experience3DRoot chunk ≤ 35KB gzipped
    - Verify Three.js chunk ≤ 120KB gzipped
    - Verify GSAP chunk ≤ 45KB gzipped
    - Verify total 3D experience ≤ 250KB gzipped
    - _Requirements: 15.1, 15.2, 15.5_
  
  - [ ] 23.2 Optimize if bundle exceeds targets
    - Implement tree-shaking for unused Three.js modules
    - Use dynamic imports for optional features
    - Minimize texture sizes further if needed
    - _Requirements: 15.1, 15.5, 15.6_

- [ ] 24. Accessibility compliance
  - [ ] 24.1 Test reduced motion support
    - Enable prefers-reduced-motion in browser settings
    - Verify 3D scene not rendered
    - Verify static logo shown for 1 second
    - Verify static crane photo shown instead of 3D
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ] 24.2 Test keyboard navigation
    - Verify ESC key skips logo animation
    - Verify Tab key focuses skip button
    - Verify focus indicators visible
    - _Requirements: 3.3_

- [ ] 25. Performance and quality assurance
  - [ ] 25.1 Run automated test suite
    - Execute all unit tests for utilities, physics, asset loader
    - Execute all integration tests for components and transitions
    - Execute performance benchmarks for FPS targets
    - Verify all tests pass
  
  - [ ] 25.2 Manual device testing
    - Test on iPhone (mobile - should show fallback or low complexity)
    - Test on iPad (tablet - should run 30fps medium complexity)
    - Test on MacBook/Windows desktop (should run 60fps full complexity)
    - Test in Chrome, Firefox, Safari
    - Test with slow 3G network throttling
  
  - [ ] 25.3 Visual regression testing
    - Capture screenshots of LogoAnimator at 0%, 50%, 100%
    - Capture CraneScene3D initial render
    - Capture container at different sway angles
    - Capture scene at scroll progress 0%, 50%, 100%
    - Verify no unexpected visual changes
  
  - [ ] 25.4 Accessibility audit
    - Run axe or Lighthouse accessibility scan
    - Verify WCAG 2.1 AA compliance
    - Verify screen reader compatibility
    - Verify reduced motion handling
  
  - [ ] 25.5 Performance audit
    - Run Lighthouse performance audit
    - Verify Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS = 0
    - Verify bundle size targets met
    - Verify 60fps maintained on desktop

- [ ] 26. Final checkpoint and deployment preparation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property-based testing is not applicable for this feature as it primarily involves UI rendering, 3D visualization, and external systems (Three.js, WebGL, GSAP)
- Testing strategy focuses on unit tests for component logic, integration tests for scene behavior, performance benchmarks for FPS/bundle targets, and visual regression tests for rendering output
- Checkpoints ensure incremental validation throughout implementation
- 3D assets (models and textures) may need to be created or sourced from external vendors if not available
- The implementation is designed to progressively enhance the existing HeroSection with graceful fallbacks
- All components respect multi-language support (EN/AR) including RTL layout

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4"] },
    { "id": 2, "tasks": ["4.1", "5.1", "7.1", "8.1", "8.2", "8.3"] },
    { "id": 3, "tasks": ["4.2", "6.1", "6.2", "7.2", "9.1", "9.2", "10.1", "10.2", "11.1", "14.1"] },
    { "id": 4, "tasks": ["6.3", "13.1", "14.2", "16.1", "19.1", "19.2", "20.1", "20.2", "20.3"] },
    { "id": 5, "tasks": ["13.2", "14.3", "15.1", "15.2", "17.1"] },
    { "id": 6, "tasks": ["15.3", "17.2", "18.1", "18.2", "19.3", "21.1"] },
    { "id": 7, "tasks": ["21.2", "23.1"] },
    { "id": 8, "tasks": ["23.2", "24.1", "24.2"] },
    { "id": 9, "tasks": ["25.1", "25.2", "25.3", "25.4", "25.5"] }
  ]
}
```
