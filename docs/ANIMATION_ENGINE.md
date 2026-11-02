# Animation Engine & Motion Architecture

[<- Back to Documentation Index](./README.md)

This specification details the motion engineering, GSAP 3 scroll mechanics, and physics controllers powering the RKLT interface.

---

## 1. Engine Core & Architecture

The motion system is built on **GSAP 3** and **ScrollTrigger**, engineered for sustained 60fps performance across modern displays.

### Performance & GPU Directives
- **Sub-pixel Hardware Acceleration**: All motion runs via `translate3d()` and `scale()`, bypassing browser repaint cycles.
- **Scroll Throttling**: Scroll listeners are wrapped in `requestAnimationFrame` (RAF) loop controllers to guarantee zero frame drops during aggressive wheel or touch drags.
- **Will-Change Management**: Applied selectively on active transform containers and released when idle to eliminate memory bloat.
- **Accessibility (`prefers-reduced-motion`)**: Completely disables heavy spatial shifts and parallax scaling, gracefully collapsing into clean, static layout states.

---

## 2. Cinematic Hero & Crane Settlement Engine

The hero experience is coordinated across two synchronized modules:
1. [`useHeroIntro.ts`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/sections/home/useHeroIntro.ts): Cinematic entrance and curtain lift.
2. [`craneDrop.ts`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/sections/home/craneDrop.ts): Scroll-driven container suspension, hydraulic settlement, and coordinate interpolation.

### The Unified Settlement Moment (`settleAt`)
To establish psychological visual hierarchy and eliminate chaotic staggered pops, three key visual states occur **simultaneously** at the exact container settlement moment:
1. **Hydraulic Berth Settlement**: The container drops with a natural physical rebound curve into its lock position.
2. **Atmospheric Color Fade**: The background harbor plate softly desaturates and dims (`.rklt-backdrop-dim`), directing ocular focus exclusively onto the central container.
3. **Typography & Navigation Reveal**: The primary `RKLT` brand mark, subheadings, and top navbar emerge in unified harmony.

### Mutual Exclusivity Transition: `RKLT` vs. `30+` Counter
To prevent unsightly visual overlap between the brand wordmark (`RKLT`) and the operational legacy counter (`30+`), the controller enforces three mutually exclusive scroll phases:

```
Scroll Progress (prog):
0.00 -------------- 0.12 -------------- 0.22 -------------- 1.00
[  Phase 1: RKLT   ] [ Phase 2: Buffer  ] [ Phase 3: 30+ Years  ]
(Opacity: 1.0 -> 0)   (Both Hidden)       (Opacity: 0 -> 1.0)
```

1. **Phase 1 ($0.00 \le \text{prog} < 0.12$)**:
   - `RKLT` is 100% visible at rest and gently fades out as scroll commences.
   - `30+` is strictly hidden (`opacity: 0; visibility: hidden;`).
2. **Phase 2 ($0.12 \le \text{prog} < 0.22$)**:
   - Deadzone buffer where both elements are non-visible. Zero possibility of typographic collisions.
3. **Phase 3 ($\text{prog} \ge 0.22$)**:
   - `30+` counter cleanly fades in and counts up dynamically from `0` to `30` tabular years as the container approaches berth lockdown.

---

## 3. United Carriers Pinned Services Command Center

Located in [`ServiceTeaserGrid.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/sections/home/ServiceTeaserGrid.tsx):
- **Desktop (16-Column Grid Layout)**:
  - Columns 1–4: Sticky capability selector with active laser-swept polygon pill.
  - Columns 5–8: Pinned physical photo/video stage with guillotine clip-path wipes (`clip-path: inset(100% 0 0 0)` to `inset(0% 0 0 0)`).
  - Columns 9–16: Right-scrolling narrative items featuring high-tech dot-matrix LED pictograms.
- **Mobile / Tablet (< 991px)**:
  - Pinned desktop image stage is automatically hidden (`hidden lg:block` and CSS `display: none !important`).
  - Converts into a high-touch, zero-clutter mobile accordion where each service expands its own inline media and description without overlapping other items.

---

## 4. Depth Layer Controller (Z-Axis Curtain Over-Scroll)

Located in [`DepthLayerController.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/motion/DepthLayerController.tsx):
- Manages the visual transition between consecutive depth strata.
- Utilizes subtle luminance veil fading (`.rklt-depth-veil`) across consecutive sections.
- Sections remain 100% flush with zero negative Y-axis translation on wrapper shells, guaranteeing that backgrounds and footers never split or peek through section seams.
