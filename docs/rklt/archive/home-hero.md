# Spec: home hero

Status: archived 6 Oct 2026. Do not implement. The hero was reopened for a new treatment; this camera was not. Authority is `docs/rklt/direction.md` and `docs/rklt/rejected.md`.

Parent: `docs/rklt/direction.md`, `docs/rklt/specs/motion-ownership.md`, `docs/rklt/specs/visual-system.md`, `docs/rklt/specs/generated-media-pipeline.md`.

## Purpose

Replace the boxed crane and the photo-card hero with one instrument: a full-viewport world, a scroll-driven camera, and the existing hero words over a scrim.

The sections under the world (credibility, services, how it works, story, coverage, CTA) stay as they are until `home-scroll-narrative`.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Cinematic still plus type, no camera | Rejected for this hero. The locked direction is a camera through a world. |
| B | Equirectangular stills, looping plates, GSAP camera on desktop | **Chosen.** Matches camera C and the media manifest. |
| C | Rebuild a realistic crane | Rejected. The crane prototype is not mounted. |

## Behavior

### What the visitor sees

The world fills the viewport under the sticky header. The header stays the opaque overlay from `visual-system`. The world is not a card and not a two-column photo.

The heading, subtitle, and actions stay on screen for the whole hero. They are the existing `hero` strings for the locale. Do not write a new headline, and do not swap the `h1` as the camera moves.

| Piece | Source |
|---|---|
| Eyebrow, title, subtitle, primary and secondary actions, 30+ badge | `homeContentEn.hero` / `homeContentAr.hero` |
| Primary action | Existing WhatsApp link and message from `siteConfig` |
| Secondary action | `/{locale}/services` |
| Chapter `sea`, `air`, `land` | Titles and numerals from `servicesTeaser.items` with those ids |
| Chapter `handover` | Title and step label from `howItWorks.steps[3]` (`Direct Delivery & Handover` / `التسليم والاستلام الموثق`) |

A chapter rail lists all four labels in the DOM for the whole hero. On desktop the active chapter is marked as scroll progresses. The rail is not a second heading.

There is no blocking intro, no logo-paint gate, and no `rklt_intro_shown` session. The page is usable on first paint. No skip control.

### Desktop camera (`md` and up, motion allowed)

One pinned region. Native scroll. GSAP ScrollTrigger is the only playhead.

- `start: "top top"`
- `end: "+=400vh"` (about one viewport of scrub per chapter)
- `pin: true`, `scrub: 1`, `anticipatePin: 1`
- Pin releases into the existing sections below. It does not cover them.

GSAP writes targets only: yaw, pitch, field of view, still mix, active chapter id. The Three.js loop applies yaw, pitch, and field of view. It does not invent progress. Chapter id may enter React state when it changes (four times), not every frame.

Pointer orbit is off during the pin.

Shot list, forward view at yaw `0` (the center of the equirectangular still):

| Chapter | Progress | Yaw | Pitch | Field of view |
|---|---|---|---|---|
| `sea` | 0.00–0.25 | 0° → 18° | 0° → −4° | 62° → 58° |
| `air` | 0.25–0.50 | 18° → 70° | −4° → 6° | 58° → 64° |
| `land` | 0.50–0.75 | 70° → 130° | 6° → 0° | 64° → 56° |
| `handover` | 0.75–1.00 | 130° → 200° | 0° → −6° | 56° → 50° |

The incoming still mixes in across the last tenth of the previous chapter. One plate may play, and only for the active chapter, looping on its own clock. Pause it when its chapter is not active and when the hero is off screen.

A theme change swaps the grade’s textures and plate without resetting yaw. If that chapter’s `day` is `null`, keep the night still.

### When the world cannot run

Use the existing `HeroSection` photo card, unchanged, if `public/world/manifest.json` is missing or has no night still. Do not invent a placeholder scene.

### Canvas and access

The canvas is `aria-hidden`. The heading, actions, chapter rail, and (on the static path) the still’s manifest `alt` carry the information. Do not announce scrub ticks with a live region.

Arabic flips the overlay alignment. It does not mirror the camera or the still.

## Visual direction

The first view is climate plus the existing words, set like an instrument panel: eyebrow, two title lines, subtitle, actions, the 30+ numeral, and the four-step rail.

The type block sits in the lower start corner (left in LTR, right in RTL) on a scrim:

| Skin | Type | Scrim under the type |
|---|---|---|
| Night | Sand `#F7F1E7` | Ink gradient, heavier at the bottom |
| Day | Ink `#0B2027` | Sand gradient, heavier at the bottom |

The scrim is a band behind the words, not a veil over the whole world. Words must still clear the contrast roles in `visual-system` (body 4.5:1 against the scrim, not against the raw plate).

Actions use the action fill (`#E0A05B` or `#D89162`) with an ink label. The secondary action is the line role, not a second accent.

The rail uses Big Shoulders for numerals and the existing titles in Archivo or Cairo. The active step may shift opacity. It does not bounce.

## Allowed files

A later implementation of this hero may touch:

| Path | Allowed change |
|---|---|
| `app/[locale]/page.tsx` | Render the new hero instead of `Experience3DRoot` and instead of the photo card when the manifest exists |
| `components/sections/home/HomeHero.tsx` | Server composition: copy, actions, rail, scrim |
| `components/sections/home/HomeWorld.tsx` | Client canvas, GSAP pin, Three.js loop. Smallest `"use client"` boundary |
| `public/world/**` | Only if a plate or still is missing and the media spec’s files are being added in the same task |
| `docs/rklt/status.md` | Status line |

Do not, under this spec:

- Edit `components/3d-experience/**` except to stop the page from mounting it.
- Restyle credibility, services, how it works, story, coverage, or the CTA band.
- Change hero copy, WhatsApp destinations, routes, metadata, or analytics.
- Add a package.

`HeroSection.tsx` stays in the repo as the fallback.

## Dependencies

`gsap` (ScrollTrigger) and `three`, already installed. No `@react-three/fiber`, Motion, Lenis, or Lottie.

## Mobile

Below `md` (768px):

- No pin and no Three.js loop.
- One mobile still (`still-mobile.webp`) for `sea`, full width, with the same copy, actions, scrim, and the four labels in document flow.
- At most one `plate-mobile` if the manifest has it, `saveData` is off, and motion is allowed. Otherwise the still only.
- Do not download the 4096 still or a desktop plate.

## Reduced motion

`prefers-reduced-motion: reduce`, and a later low tier treated the same way:

- No camera move, no pin, no video element, no WebGL loop.
- The still for the active skin (night still if day is missing).
- The same heading, actions, and four labels.

## Acceptance checks

1. Desktop first view shows the world and the existing hero title, not the crane and not the photo card, when the manifest has a night still.
2. Scrubbing the pin runs the shot list in order: sea, air, land, handover. Yaw does not reset when the skin changes.
3. The `h1` does not change during the scrub. All four chapter labels are in the DOM at rest.
4. Primary action opens the existing WhatsApp thread. Secondary action goes to `/{locale}/services`.
5. One plate at a time, silent, not scrubbed. It pauses off chapter and off screen.
6. At 390px width the page uses native scroll, a mobile still, and no pinned canvas.
7. With reduced motion, the still does not move and no video plays.
8. Night type sits on an ink scrim; day type sits on a sand scrim.
9. Arabic aligns the overlay to the start edge and does not mirror the world.
10. A missing manifest renders the current `HeroSection`. Leaving the page disposes the ScrollTrigger, the animation frame, and the video.
11. Sections below the hero are still the current components.

## Exclusions

- Redesign of the home sections under the world (`home-scroll-narrative`).
- Inner pages.
- New claims, client names, or captions that call the plates real RKLT photography.
- A blocking intro, skip button, or session gate.
- Pointer-driven orbit, Lenis, scrubbed `currentTime`, and a 360 MP4 world.
- Crane repair, R3F, and any new dependency.
- Implementation in this planning session.

## Next spec

`home-scroll-narrative`, after approval. Not started here.
