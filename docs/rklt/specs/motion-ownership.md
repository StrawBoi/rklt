# Spec: motion ownership

Status: the one-writer rule is in force. The camera playhead below is stale as of 6 Oct 2026. Read `docs/rklt/brief/tech.md` and `docs/rklt/rejected.md` first. This file does not authorize a scroll camera.

Parent: `docs/rklt/direction.md`, `docs/rklt/brief/tech.md`.

## Purpose

Define which system is allowed to move what, so later hero, scroll, and page specs do not stack engines. This is a contract. It does not design the home world, generate media, or restyle the site.

## Chosen approach

Three options were compared in planning:

| | Approach | Decision |
|---|---|---|
| A | GSAP + Motion + optional Lenis + R3F | Rejected. Extra engines without a proven gap. |
| B | CSS + GSAP + existing Three.js | **Chosen.** Matches the installed stack and the locked camera. |
| C | Motion-first, GSAP only for the old pin | Rejected. Fights the scroll-driven world. |

## Behavior

### Who owns motion

| Owner | May animate | Must not |
|---|---|---|
| CSS / Tailwind | Hover, focus, active, sticky header, simple opacity/transform fades that are not part of a directed timeline | Scroll pins, camera, video `currentTime`, Three object properties, multi-step sequences |
| GSAP + ScrollTrigger | Intros, pinned chapters, the scroll playhead, type and SVG choreography, DOM values that must stay in sync with the world | Per-frame shader uniforms; continuous pointer smoothing inside the render loop; the same CSS hover the stylesheet already owns |
| Three.js render loop | Applying the GSAP-authored camera pose each frame, shader uniforms, video-texture updates, damped pointer offset if a later spec allows it | Authoring chapter timing; driving React state every frame; a second timeline beside GSAP |

### Playhead

- Scroll is the source of narrative time on the home world.
- GSAP ScrollTrigger is the only playhead that writes chapter progress, camera targets, plate opacity, and synced type.
- The Three loop reads those targets and applies them. It does not invent a parallel progress value.
- Pointer, if used later, is a damped offset on top of the scroll pose. It is disabled when it would fight a pinned chapter. It is not a second story.
- Video plates loop on their own clock. They are not scrubbed to scroll in v1. Scroll changes which plate is visible and where the camera looks.

### State

- Scroll position, pointer position, frame time, camera angles, and video time stay in refs, GSAP, or Three objects.
- React state is for phase and capability only: ready, reduced-motion, error, locale, skip. Not for values that change every frame.

### One property, one writer

- A property has one writer for its lifetime on that screen.
- Examples that are forbidden: CSS `transform` and GSAP `transform` on the same node; GSAP and the render loop both writing `camera.rotation`; a video element both scrubbed by GSAP and advanced by `requestVideoFrameCallback` for the same timeline.
- Handoff is allowed only at a boundary (intro ends, reduced-motion takes over) and must kill the previous writer.

### Lifecycle

Every GSAP timeline, ScrollTrigger, listener, video element, and Three loop:

- Starts after the node or renderer exists.
- Is reverted or cancelled on unmount and on locale/layout changes that destroy the trigger.
- Does not leak across client navigations.

### Intro

If a later spec adds an intro that blocks the page, it must expose a visible skip and an Escape path, then hand the playhead to scroll. This spec does not design that intro. The current logo-paint crane intro is not the redesign intro.

## Visual direction

Motion should feel weighted and instrumental: short, confident moves; no bounce, no elastic UI, no decorative parallax on every card.

| Surface | Motion character |
|---|---|
| World camera | Slow yaw / pitch / dolly tied to chapters. No continuous spin. |
| Plates | Crossfade or opacity only. Loops are ambient (water, steam, lights), not whip-pans. |
| Type | Opacity and small translate, sequenced on the same playhead as the camera. |
| UI chrome | CSS, 150–250ms, existing `ease-confident` / `ease-standard`. No timeline. |
| Numerals | May count or reveal only inside a GSAP chapter. Not a CSS infinite pulse. |

Lane B climate (ink, sand, terracotta, brand blue) is defined in `direction.md`. Color, type scale, and photography rules belong to `visual-system`, not here.

## Allowed files

Implementing **this contract alone** does not require editing the site. A later chat may touch only:

| Path | Allowed change |
|---|---|
| `docs/rklt/specs/motion-ownership.md` | This spec |
| `docs/rklt/status.md` | Status line only |

Feature specs that follow may name their own files. They may not add libraries listed under exclusions. Shared cleanup or `prefers-reduced-motion` helpers, if extracted, must be justified by a second consumer and listed in that feature’s spec before they are created.

Do not, under this spec:

- Edit `components/3d-experience/**` (crane prototype stays until `home-hero` replaces it).
- Edit routes, content, metadata, forms, or analytics.
- Add dependencies.

## Dependencies

| Package | Status |
|---|---|
| `gsap` (already installed, includes ScrollTrigger) | Allowed |
| `three` (already installed) | Allowed for the world only |
| Tailwind / CSS | Allowed |
| `@gsap/react` | Not required. Dynamic `import()` plus explicit cleanup is enough unless a later spec shows a cleanup bug. |
| `motion` / Framer Motion | Out |
| `lenis` | Out |
| `lottie` / `dotlottie` | Out |
| `@react-three/fiber`, `@react-three/drei`, `@react-spring/three` | Out |
| `@react-spring/web` | Out |

No new packages for this spec.

## Mobile

- Below `md` (768px): no pinned multi-chapter camera unless `home-hero` later proves a short pin is stable.
- Default mobile world: one still, optional single muted loop plate, type in document flow.
- No desktop equirectangular video and no user-facing 360 MP4 on phones.
- Touch scroll stays native. No custom scroll hijack.
- Hover-only effects must have a non-hover resting state.

## Reduced motion

When `prefers-reduced-motion: reduce` matches:

- No camera animation, no pin that traps the user, no autoplay video, no looping plate.
- Show a static atmosphere still and the same information as the motion version.
- CSS transitions longer than a simple color/opacity hover should be reduced to near-instant (`transition: none` or under 50ms) for decorative movement.
- Do not block the page on an intro.

Also treat `saveData` or a later device-tier “low” the same as reduced motion for video and WebGL motion, even if the user did not set reduced motion. Exact tier rules belong to `home-hero`. This spec only requires that low tier cannot start a second motion engine.

## Acceptance checks

A later implementation chat can mark this contract satisfied only if all of the following hold:

1. No new animation dependency was added.
2. Search of the redesign code shows CSS, GSAP, and the Three loop as the only writers, and no property is written by two of them at once.
3. Scroll progress, pointer, and frame time are not stored in `useState` / `useReducer`.
4. With reduced motion on, the home world does not move the camera and does not autoplay video.
5. At `390px` width, the page scrolls with native scroll and does not pin a long 3D chapter.
6. Leaving the page disposes ScrollTriggers, cancels animation frames, and pauses or removes video elements.
7. Arabic layout changes overlay alignment only. It does not mirror the world camera to fake RTL.
8. The boxed crane is not extended to satisfy this contract.

## Exclusions

- Visual system, color, type scale, and component restyle.
- Asset generation, file naming, codecs, and equirectangular resolution (`generated-media-pipeline`).
- Hero composition, chapter copy, and camera shot list (`home-hero`, `home-scroll-narrative`).
- Rebuilding or “upgrading” the current crane scene.
- Sitewide smooth scroll (Lenis) or `scroll-behavior: smooth` on the narrative page.
- Scrubbing a long video via `currentTime` as the v1 camera.
- Shipping a 360 MP4 as the world.
- Route transitions, shared-element page changes, and gesture libraries.
- Lottie logos, loaders, or icons.
- Copy, claims, contacts, metadata, and analytics changes.
- Implementation in this planning session.

## Next spec

`visual-system`, after approval. Not started here.
