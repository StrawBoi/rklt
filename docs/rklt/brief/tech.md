# Tech brief

Engineering limits for ideas and for implementation. Checked against `package.json` on 6 Oct 2026.

## Stack

| Piece | What is installed |
|---|---|
| App | Next.js 14 App Router, React 18, TypeScript |
| Style | Tailwind 3 |
| Motion | `gsap` ^3.12 (ScrollTrigger ships with GSAP) |
| 3D | `three` 0.160. `@types/three` is dev-only. No `@react-three/fiber` |
| Icons | `lucide-react` |
| Scripts | `dev`, `build`, `start`, `lint` |

Not installed, and not allowed until a spec and an approval: Motion, Framer Motion, Lenis, Lottie, R3F, drei, React Spring, `@gsap/react`.

The crane files in `components/3d-experience/` are not mounted. Do not extend them to satisfy a new idea.

## Who may animate

| Owner | May | Must not |
|---|---|---|
| CSS / Tailwind | Hover, focus, sticky header, the current mode swap, simple opacity or transform fades | Scroll pins, camera poses, video `currentTime`, Three properties, multi-step sequences |
| GSAP + ScrollTrigger | Directed timelines, pins, type or SVG choreography, DOM values that must stay in sync | Per-frame shader uniforms; the same property CSS already writes |
| Three.js render loop | Applying a pose GSAP authored, shader uniforms, video textures, a damped pointer if a spec allows it | Inventing a second timeline; writing React state every frame |

One property has one writer. CSS `transform` and GSAP `transform` do not share a node. GSAP and the render loop do not both write `camera.rotation`.

Scroll position, pointer, frame time, camera angles, and video time stay in refs, GSAP, or Three objects. React state is for phase only: ready, reduced motion, error, locale.

Clean up timelines, ScrollTriggers, listeners, video elements, and animation frames on unmount and on locale changes.

## Tiers for an idea

Every animation idea names one tier.

| Tier | Means | Allowed to propose |
|---|---|---|
| 0 | CSS only | Yes |
| 1 | GSAP and/or the installed Three.js | Yes. Using Three is not permission to remount the crane |
| 2 | A package that is not installed | Yes, flagged as an approval request. It is not a plan |

## Hero and pages as built

- First screen: `HeroSection`. Four modes, one still, CSS swap. No GSAP on that swap.
- `Experience3DRoot` is not mounted.
- Home sections under it use role surfaces and one CSS reveal.
- About, services, and contact heroes are type on the field until both night and day posters for that page exist.

A new hero idea replaces this only after a spec is approved. Until then, implementation follows `docs/rklt/specs/home-first-screen.md`.

## Media

- Runtime image generation inside the site is out. No API keys in the repo.
- A still loads for the first view. Further frames load when needed. Do not eager-load a set of large images.
- Night and day are separate files. Do not invert a grade.
- Video is silent, has a poster still, and is not created when `prefers-reduced-motion: reduce` matches. Treat `saveData` the same way for video and WebGL motion.
- Do not caption atmosphere as proof of an RKLT operation. No readable logos, port names, bills of lading, container codes, or competitor marks. No identifiable face presented as staff.
- The historical 4096×2048 equirectangular budgets in `docs/rklt/archive/generated-media-pipeline.md` applied to the retired camera. Do not reuse them as the default. A new spec sets pixel size and file weight for the idea that was approved.

## Layout

- Desktop hero columns are optional. A full-bleed first screen is allowed. Below the wide layout, the headline and buttons stack, and the picture sits with them or drops if it will not fit. Buttons are full width on that stacked layout.
- WhatsApp stays in the button row. It does not float over the controls.
- Below `md` (768px): no pinned multi-chapter scene unless a spec shows a short pin is stable. Touch scroll stays native.
- Arabic (Cairo, RTL) changes alignment only. It does not mirror a still, a video, or a camera.

## Reduced motion

- No camera animation, no pin that traps the page, no autoplay, no looping plate.
- The same information as the motion version stays visible.
- Decorative transitions drop to none, or under 50ms.
- Do not block the page on an intro. If a later spec adds one, it needs a visible skip and an Escape path.

## Checks

Discover scripts from `package.json`. After a code change, run the relevant ones. Do not claim a check passed unless it was executed. `lint` and `build` are the project scripts. There is no test script.
