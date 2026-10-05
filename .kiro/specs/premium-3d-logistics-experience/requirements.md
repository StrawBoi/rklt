# Requirements Document

## Introduction

This document specifies the requirements for a premium 3D animated logistics experience to be integrated into the existing RKLT website. The feature will provide a high-impact, immersive visual introduction showcasing RKLT's multimodal logistics capabilities through sophisticated 3D animations and scroll-driven interactions. The experience must balance visual excellence with performance, providing adaptive animations based on device capabilities while maintaining the existing site's multi-language support and accessibility standards.

## Glossary

- **3D_Experience_System**: The complete premium animated logistics experience including logo animation, 3D scenes, and scroll interactions
- **Logo_Animator**: Component responsible for the 2-second RKLT logo paint animation
- **Crane_Scene**: The overhead crane view with suspended container showing physics-based motion
- **Container_Model**: 3D representation of shipping containers (20ft, 40ft, reefer, refrigerated, roro, project cargo)
- **Session_Manager**: Browser-based session tracking system using sessionStorage
- **Animation_Controller**: System that manages animation playback, performance monitoring, and adaptive complexity
- **Hero_Section**: The primary landing area containing the main 3D crane scene
- **Scroll_Orchestrator**: System coordinating scroll-driven animations and scene transitions
- **Device_Detector**: System identifying device capabilities to determine animation complexity level
- **Skip_Control**: User interface element allowing users to bypass intro animations
- **Physics_Engine**: System simulating realistic container sway and cable dynamics
- **Transition_Manager**: System handling smooth visual transitions between animation sequences
- **Asset_Loader**: System managing progressive loading and optimization of 3D assets
- **Motion_Reducer**: System providing fallback experiences for users with reduced-motion preferences

## Requirements

### Requirement 1: First-Visit Logo Animation

**User Story:** As a first-time visitor, I want to see an impressive animated logo introduction, so that I immediately understand RKLT's premium positioning.

#### Acceptance Criteria

1. WHEN a user visits the site for the first time in a browser session, THE Logo_Animator SHALL display a 2-second RKLT logo paint animation
2. WHEN the logo animation completes, THE Transition_Manager SHALL seamlessly transition to the Hero_Section within 300ms
3. THE Session_Manager SHALL record the logo animation view in sessionStorage with key "rklt_intro_shown"
4. WHEN a user has seen the logo animation in the current session, THE 3D_Experience_System SHALL skip directly to the Hero_Section on subsequent page loads
5. THE Logo_Animator SHALL render at 60fps on desktop devices and 30fps on mobile devices

### Requirement 2: Session-Aware Experience

**User Story:** As a returning visitor within the same session, I want to skip the intro animation, so that I can access content quickly.

#### Acceptance Criteria

1. WHEN the Session_Manager detects "rklt_intro_shown" in sessionStorage, THE 3D_Experience_System SHALL bypass the Logo_Animator
2. WHEN a user navigates between pages within the site, THE 3D_Experience_System SHALL not replay the logo animation
3. WHEN a user closes the browser and returns in a new session, THE Logo_Animator SHALL play again on first visit
4. THE Session_Manager SHALL use sessionStorage (not localStorage) for intro tracking
5. WHEN sessionStorage is unavailable, THE 3D_Experience_System SHALL skip the logo animation and proceed to Hero_Section

### Requirement 3: Skip Intro Control

**User Story:** As a user viewing the logo animation, I want the ability to skip it, so that I can access content immediately if desired.

#### Acceptance Criteria

1. WHEN the Logo_Animator is playing, THE Skip_Control SHALL be visible in the bottom-right corner with 90% opacity
2. WHEN a user clicks the Skip_Control, THE Animation_Controller SHALL immediately halt the logo animation and transition to Hero_Section
3. WHEN a user presses the Escape key during logo animation, THE Animation_Controller SHALL skip to Hero_Section
4. THE Skip_Control SHALL display localized text ("Skip Intro" in English, "تخطي المقدمة" in Arabic)
5. WHEN the logo animation completes naturally, THE Skip_Control SHALL fade out over 200ms

### Requirement 4: Overhead Crane Scene with Physics

**User Story:** As a visitor, I want to see a realistic overhead crane with a suspended container, so that I understand RKLT's physical logistics operations.

#### Acceptance Criteria

1. THE Crane_Scene SHALL render an overhead perspective view showing crane infrastructure and suspended Container_Model
2. THE Physics_Engine SHALL simulate subtle container sway with amplitude between 0.5 and 2 degrees
3. WHEN the container is swaying, THE Physics_Engine SHALL animate visible cables connecting the crane to the container
4. THE Physics_Engine SHALL calculate sway based on realistic damping coefficients (damping ratio between 0.05 and 0.15)
5. THE Crane_Scene SHALL render at minimum 60fps on desktop devices with dedicated GPUs
6. THE Container_Model SHALL display accurate shipping container proportions (20ft: 6.1m × 2.4m × 2.6m, 40ft: 12.2m × 2.4m × 2.6m)

### Requirement 5: Container Model Variety

**User Story:** As a visitor exploring the scene, I want to see different container types, so that I understand the variety of cargo RKLT handles.

#### Acceptance Criteria

1. THE 3D_Experience_System SHALL support rendering of six container types: standard 20ft, standard 40ft, reefer, refrigerated, roro, and project cargo
2. WHEN displaying a reefer or refrigerated container, THE Container_Model SHALL include visible cooling unit details
3. WHEN displaying project cargo, THE Container_Model SHALL show oversized dimensions or specialized rigging
4. THE Crane_Scene SHALL randomly select one container type per page load with equal probability distribution
5. THE Container_Model SHALL use physically-based rendering (PBR) materials for realistic surface appearance

### Requirement 6: Scroll-Driven Container Descent

**User Story:** As a visitor scrolling down, I want the container to descend smoothly, so that I experience a fluid transition from 3D scene to content sections.

#### Acceptance Criteria

1. WHEN a user scrolls down from Hero_Section, THE Scroll_Orchestrator SHALL move the Container_Model downward proportional to scroll progress
2. THE Scroll_Orchestrator SHALL complete container descent animation when scroll reaches 100vh (one viewport height)
3. WHILE the container is descending, THE Physics_Engine SHALL reduce sway amplitude from 2 degrees to 0 degrees linearly
4. WHEN container descent completes, THE Transition_Manager SHALL fade the Crane_Scene opacity to 0 over 400ms
5. THE Scroll_Orchestrator SHALL use easing function "easeOutCubic" for smooth deceleration

### Requirement 7: Device-Adaptive Animation Complexity

**User Story:** As a mobile user, I want the site to load quickly with appropriate animations, so that I don't experience poor performance or excessive data usage.

#### Acceptance Criteria

1. THE Device_Detector SHALL identify device type as "desktop", "tablet", or "mobile" based on screen width and GPU capabilities
2. WHEN Device_Detector identifies a mobile device, THE 3D_Experience_System SHALL disable 3D rendering and use 2D fallback animations
3. WHEN Device_Detector identifies a tablet, THE Animation_Controller SHALL reduce physics simulation frame rate to 30fps
4. WHEN Device_Detector identifies a desktop with dedicated GPU, THE 3D_Experience_System SHALL enable full 3D experience at 60fps
5. THE Device_Detector SHALL perform GPU capability detection using WebGL performance metrics
6. WHEN GPU benchmark score is below threshold of 30fps for 1000 triangles, THE 3D_Experience_System SHALL fallback to 2D mode

### Requirement 8: Performance Monitoring and Degradation

**User Story:** As a user on any device, I want the site to maintain smooth performance, so that my browsing experience remains responsive.

#### Acceptance Criteria

1. THE Animation_Controller SHALL monitor frame rate every 1000ms during animation playback
2. WHEN average frame rate drops below 24fps for 3 consecutive seconds, THE Animation_Controller SHALL reduce animation complexity by one level
3. THE Animation_Controller SHALL support three complexity levels: "high" (full physics + 60fps), "medium" (simplified physics + 30fps), "low" (2D fallback)
4. WHEN complexity is reduced, THE Animation_Controller SHALL log the change to browser console
5. THE 3D_Experience_System SHALL maintain UI responsiveness with main thread blocking not exceeding 16ms per frame

### Requirement 9: Progressive Asset Loading

**User Story:** As a visitor, I want the page to display quickly while 3D assets load, so that I'm not waiting on a blank screen.

#### Acceptance Criteria

1. THE Asset_Loader SHALL display a loading progress indicator while 3D models and textures are loading
2. WHEN 3D assets are loading, THE Asset_Loader SHALL show percentage complete from 0% to 100%
3. THE Asset_Loader SHALL prioritize loading in this order: logo assets, crane structure, container model, environment textures
4. WHEN critical assets (logo, crane, container) reach 70% loaded, THE Animation_Controller SHALL begin the experience
5. THE Asset_Loader SHALL use compression for 3D models (glTF with Draco compression) to reduce file size by minimum 40%
6. WHEN assets fail to load after 10 seconds, THE 3D_Experience_System SHALL fallback to 2D mode automatically

### Requirement 10: Reduced Motion Accessibility

**User Story:** As a user with motion sensitivity, I want animations to respect my preferences, so that I can use the site comfortably.

#### Acceptance Criteria

1. WHEN browser prefers-reduced-motion setting is enabled, THE Motion_Reducer SHALL disable all 3D animations
2. WHEN Motion_Reducer is active, THE Logo_Animator SHALL display the static RKLT logo for 1 second instead of animating
3. WHEN Motion_Reducer is active, THE Crane_Scene SHALL display a static overhead photograph instead of 3D scene
4. WHEN Motion_Reducer is active, THE Scroll_Orchestrator SHALL use simple fade transitions instead of animated descents
5. THE Motion_Reducer SHALL check prefers-reduced-motion on every page load

### Requirement 11: Multi-Language Support Integration

**User Story:** As an Arabic-speaking visitor, I want the 3D experience to respect language direction, so that text and UI elements appear correctly.

#### Acceptance Criteria

1. WHEN site locale is "ar", THE Skip_Control SHALL display "تخطي المقدمة" in Arabic script
2. WHEN site locale is "ar", THE Skip_Control SHALL position in bottom-left corner instead of bottom-right
3. THE Asset_Loader progress indicator SHALL display percentage numbers using Arabic-Indic numerals when locale is "ar"
4. WHEN site locale is "ar", THE Logo_Animator SHALL render "RKLT" text right-to-left if text animation includes directional reveals
5. THE 3D_Experience_System SHALL retrieve locale from Next.js params.locale

### Requirement 12: Scene Environment and Context

**User Story:** As a visitor, I want to see maritime and aviation context in the 3D scene, so that I understand RKLT's multimodal capabilities.

#### Acceptance Criteria

1. THE Crane_Scene SHALL include an ocean surface with animated wave motion in the background
2. THE Crane_Scene SHALL include subtle ship silhouettes visible in the distant background
3. WHERE Device_Detector identifies desktop with high GPU capability, THE Crane_Scene SHALL include animated aircraft flying across the sky
4. THE Crane_Scene SHALL use realistic lighting with sun position at 45-degree angle for optimal container visibility
5. THE Crane_Scene SHALL apply atmospheric fog effect with density increasing with distance

### Requirement 13: Seamless Section Transitions

**User Story:** As a visitor scrolling through the site, I want smooth transitions from 3D experience to content sections, so that the experience feels cohesive.

#### Acceptance Criteria

1. WHEN container descent animation completes, THE Transition_Manager SHALL reveal the first content section (CredibilityStrip) using fade-in over 600ms
2. THE Scroll_Orchestrator SHALL maintain scroll position during 3D-to-content transition
3. WHEN transitioning to content sections, THE 3D_Experience_System SHALL dispose of 3D resources to free memory
4. THE Transition_Manager SHALL ensure zero layout shift (CLS = 0) during transitions
5. WHEN scroll direction reverses upward, THE 3D_Experience_System SHALL not re-initialize the 3D scene

### Requirement 14: Three.js and GSAP Integration

**User Story:** As a developer, I want to use industry-standard animation libraries, so that the implementation is maintainable and performant.

#### Acceptance Criteria

1. THE 3D_Experience_System SHALL use Three.js version 0.160.0 or higher for 3D rendering
2. THE Scroll_Orchestrator SHALL use GSAP version 3.12.0 or higher with ScrollTrigger plugin
3. THE Physics_Engine SHALL calculate container sway using Three.js animation loop at 60fps
4. THE Transition_Manager SHALL use GSAP timeline for coordinating multi-element animations
5. THE 3D_Experience_System SHALL implement Three.js WebGLRenderer with powerPreference set to "high-performance"

### Requirement 15: Bundle Size Optimization

**User Story:** As a visitor on a limited connection, I want the site to load efficiently, so that I can access content quickly without excessive data usage.

#### Acceptance Criteria

1. THE 3D_Experience_System JavaScript bundle SHALL not exceed 250KB gzipped
2. THE Asset_Loader SHALL lazy-load Three.js and GSAP libraries only when 3D experience is enabled
3. WHEN Device_Detector determines 2D fallback mode, THE 3D_Experience_System SHALL not load Three.js library
4. THE Container_Model 3D assets SHALL use texture atlasing to combine multiple textures into single files
5. THE 3D_Experience_System SHALL implement code-splitting with dynamic imports for 3D modules
6. THE Asset_Loader SHALL use next/dynamic with ssr:false for 3D components

### Requirement 16: Responsive Design Adaptation

**User Story:** As a visitor on any screen size, I want the 3D experience to adapt appropriately, so that I see an optimized view for my device.

#### Acceptance Criteria

1. WHEN viewport width is below 768px, THE Crane_Scene camera SHALL use closer field of view (FOV 60 degrees) to emphasize container
2. WHEN viewport width is between 768px and 1024px, THE Crane_Scene camera SHALL use standard FOV (75 degrees)
3. WHEN viewport width exceeds 1024px, THE Crane_Scene camera SHALL use wider FOV (85 degrees) to show full crane context
4. THE Crane_Scene SHALL adjust camera aspect ratio when viewport is resized
5. WHEN viewport height is less than 600px (landscape mobile), THE Crane_Scene SHALL reduce container scale by 20%

### Requirement 17: Loading Screen Experience

**User Story:** As a visitor waiting for assets to load, I want an engaging loading screen, so that I understand progress and remain engaged.

#### Acceptance Criteria

1. THE Asset_Loader SHALL display the loading screen immediately on page load before any 3D initialization
2. THE Asset_Loader loading screen SHALL include animated RKLT logo icon pulsing at 1-second intervals
3. WHEN assets are loading, THE Asset_Loader SHALL display progress bar filling from 0% to 100% width
4. THE Asset_Loader SHALL display percentage text below progress bar updating every 100ms
5. WHEN loading completes, THE Asset_Loader loading screen SHALL fade out over 400ms with easeInOut timing

### Requirement 18: Cache and Repeat Visit Optimization

**User Story:** As a returning visitor in a new session, I want previously loaded 3D assets to load from cache, so that subsequent visits are faster.

#### Acceptance Criteria

1. THE Asset_Loader SHALL set cache-control headers for 3D model files to cache for 7 days
2. THE Asset_Loader SHALL set cache-control headers for texture files to cache for 7 days
3. THE Asset_Loader SHALL use content-based hashing in filenames for cache busting on updates
4. WHEN 3D assets are cached, THE Asset_Loader SHALL load them from browser cache instead of network
5. THE Asset_Loader SHALL verify cached asset integrity using ETags

### Requirement 19: Error Handling and Fallback

**User Story:** As a visitor experiencing technical issues, I want the site to gracefully handle errors, so that I can still access content even if 3D features fail.

#### Acceptance Criteria

1. WHEN Three.js initialization fails, THE 3D_Experience_System SHALL log error to console and activate Motion_Reducer fallback
2. WHEN WebGL is unsupported, THE Device_Detector SHALL immediately activate 2D fallback mode
3. WHEN a 3D asset fails to load after 3 retry attempts, THE Asset_Loader SHALL proceed with default placeholder geometry
4. IF any runtime error occurs in 3D rendering, THEN THE 3D_Experience_System SHALL dispose of 3D context and show 2D fallback
5. THE 3D_Experience_System SHALL display user-friendly error message in current locale when fallback is activated

### Requirement 20: Integration with Existing Site Architecture

**User Story:** As a developer maintaining the site, I want the 3D experience to integrate cleanly with existing code, so that it doesn't disrupt current functionality.

#### Acceptance Criteria

1. THE 3D_Experience_System SHALL integrate as a new component in the existing Next.js page structure
2. THE 3D_Experience_System SHALL respect existing locale routing patterns (app/[locale]/page.tsx)
3. WHEN 3D experience is disabled or unavailable, THE existing HeroSection component SHALL render as fallback
4. THE 3D_Experience_System SHALL use existing utility functions (cn for className merging, font variables)
5. THE 3D_Experience_System SHALL maintain existing color theme tokens (ink-*, sand-*, terracotta-*, brandblue-*)
6. THE 3D_Experience_System SHALL not modify existing components (CredibilityStrip, ServiceTeaserGrid, etc.)

### Requirement 21: Analytics and Performance Tracking

**User Story:** As a product owner, I want to track 3D experience usage and performance, so that I can make data-driven optimization decisions.

#### Acceptance Criteria

1. THE 3D_Experience_System SHALL emit custom events for: logo_animation_start, logo_animation_complete, logo_animation_skipped, crane_scene_loaded, fallback_activated
2. THE Animation_Controller SHALL record average frame rate and report to analytics on session end
3. THE Device_Detector SHALL report detected device category and GPU capability to analytics
4. THE Asset_Loader SHALL report total asset load time and bundle size to analytics
5. THE 3D_Experience_System SHALL integrate with existing analytics infrastructure without requiring new dependencies

### Requirement 22: Scroll Performance Optimization

**User Story:** As a visitor scrolling through the page, I want smooth scrolling without lag, so that my navigation feels responsive.

#### Acceptance Criteria

1. THE Scroll_Orchestrator SHALL use requestAnimationFrame for scroll position sampling
2. THE Scroll_Orchestrator SHALL throttle scroll event handlers to maximum 60Hz execution rate
3. THE Scroll_Orchestrator SHALL use CSS transform3d for GPU-accelerated container movement
4. WHEN scroll animation is active, THE Scroll_Orchestrator SHALL use will-change CSS hints for animated properties
5. THE Scroll_Orchestrator SHALL remove will-change hints when animations complete to conserve GPU memory

### Requirement 23: Crane Cable Physics Simulation

**User Story:** As a visitor viewing the crane scene, I want to see realistic cable behavior, so that the scene feels authentic and grounded.

#### Acceptance Criteria

1. THE Physics_Engine SHALL render four cables connecting crane spreader to container corners
2. WHEN container sways, THE Physics_Engine SHALL calculate cable angles using inverse kinematics
3. THE Physics_Engine SHALL render cables as cylinders with 0.1m diameter
4. THE Physics_Engine SHALL apply metallic material to cables with roughness value 0.6
5. WHEN container reaches maximum sway angle, THE Physics_Engine SHALL ensure cables remain taut (no slack curves)

### Requirement 24: Logo Paint Animation Details

**User Story:** As a first-time visitor, I want the logo animation to feel premium and polished, so that I perceive RKLT as a high-quality service provider.

#### Acceptance Criteria

1. THE Logo_Animator SHALL reveal "RKLT" letters sequentially from left to right over 2 seconds
2. THE Logo_Animator SHALL use stroke-dashoffset technique for smooth paint effect
3. WHEN a letter finishes painting, THE Logo_Animator SHALL apply fill color (terracotta-500) with 200ms delay
4. THE Logo_Animator SHALL use easeInOutQuad easing for natural motion
5. THE Logo_Animator SHALL render on dark background (ink-950) for maximum contrast

### Requirement 25: Container Texture and Material Realism

**User Story:** As a visitor viewing the container, I want it to look realistic, so that I trust RKLT's professional presentation.

#### Acceptance Criteria

1. THE Container_Model SHALL use PBR metallic-roughness workflow for material definition
2. THE Container_Model SHALL include surface details: corrugation ridges, corner castings, and identification markings
3. THE Container_Model SHALL use normal maps for surface detail without excessive polygon count
4. THE Container_Model SHALL apply weathering effects (rust spots, paint wear) with 30% intensity
5. THE Container_Model SHALL display appropriate company markings and international shipping codes

