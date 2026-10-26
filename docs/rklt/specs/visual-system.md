# Spec: visual system

Status: pigments, roles, and skins are in force. Camera and plate sentences below are stale as of 6 Oct 2026. Read `docs/rklt/direction.md`, `docs/rklt/rejected.md`, and `docs/rklt/brief/tech.md` first. This file does not authorize a scroll camera.

Parent: `docs/rklt/direction.md`, `docs/rklt/brief/tech.md`.

## Purpose

Define two skins — night port and day manifest — from the existing ink, sand, terracotta, and brand-blue pigments. Components use roles and surface tones, so light and dark stay consistent with contrast, focus, and state rules.

This spec does not design the home world, generate plates, or restyle every section.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Light and dark chrome, hero always night | Rejected. The page and the world would read as different times of day. |
| B | Night port and day manifest, shared roles, paired plates | **Chosen.** One instrument, two kinds of light. |
| C | Flip the current palette | Rejected. Terracotta and the current blue fail as small text on sand. |

## Behavior

### Skins

| Skin | `data-theme` | Climate |
|---|---|---|
| Night port | `night` | Ink field, sand type, sodium and LED atmosphere |
| Day manifest | `day` | Sand field, ink type, sea haze and high sun |

Both skins use the same hue family. A skin changes which tone of a hue is allowed to do which job.

### How the skin is chosen

1. A saved choice in `localStorage` under `rklt-theme` (`night` or `day`) wins.
2. Otherwise follow `prefers-color-scheme`.
3. If that cannot be read, use `night`.
4. A blocking script in the root layout sets `data-theme` on `<html>` before first paint. A client effect after hydration is not enough.
5. Set `color-scheme` to `dark` or `light` with the skin so native controls match.
6. The choice is site-wide. Locale does not change it. RTL does not change it.

### Theme control

- A control sits next to the language control in the desktop header and in the mobile nav.
- It shows the skin it will switch to, with a visible name (Night / Day, and Arabic equivalents). Icon-only is allowed if the accessible name is still those words.
- Activating it writes `rklt-theme`, updates `data-theme`, and does not navigate.
- The control is available at every breakpoint.

### World grade

- The scroll camera from `direction.md` stays. The grade follows the skin.
- Night plates: fog, sodium, LED, dusk.
- Day plates: haze, high sun, paper-colored air, the same kind of place.
- Plates are pairs. CSS `filter: invert` and hue-rotate on photography or video are forbidden.
- A chapter that has only a night plate stays night until a day plate exists. The chrome around it may still be day.
- Plate authoring, filenames, and codecs belong to `generated-media-pipeline`.

### States

Hover and press are a veil on the same surface (about 8% and 12% of the on-surface color). They are not a new hue.

Disabled controls stay in place, drop to a muted role, and use `not-allowed`. Do not communicate disabled only by a gray that disappears on one skin.

Focus is a 2px ring with a 2px offset, using the focus role, visible on both skins. Remove the default outline only when this ring replaces it.

### Motion of the theme change

The skin swap is instant. A color crossfade is optional and must be off under `prefers-reduced-motion: reduce`.

## Visual direction

### Pigments (source, already in the site)

| Pigment | Steps in use |
|---|---|
| Ink | `#0B2027` field night, `#0E2B33`, `#163842`, `#1E4650`, `#2C5A66` |
| Sand | `#F7F1E7` field day and night type, `#EDE3D3`, `#DCCBB0` |
| Terracotta | `#E0A05B` and `#D89162` as action fills; `#C77B4C` and `#A9663D` are not small text on sand |
| Brand blue | `#5B98DC` signal on night; `#1A5694` signal text on day |

Do not add a second accent hue.

### Roles

| Role | Night | Day | Measured against its surface |
|---|---|---|---|
| Field | `#0B2027` | `#F7F1E7` | — |
| Text | `#F7F1E7` | `#0B2027` | 15.0:1 |
| Muted | `#DCCBB0` | `#1E4650` | 10.6:1 night, 9.1:1 day |
| Action fill | `#E0A05B` | `#E0A05B` | — |
| On-action | `#0B2027` | `#0B2027` | 7.5:1 on `#E0A05B` |
| Signal | `#5B98DC` | `#1A5694` | 5.6:1 on ink, 6.7:1 on sand |
| Focus | `#F7F1E7` | `#0B2027` | Must stay ≥ 3:1 against the adjacent surface |
| Line | ink lifted, low opacity | `#DCCBB0` | Separates surfaces; not used as text |

`#D89162` may replace `#E0A05B` as the action fill. Ink on it is 6.5:1. `#C77B4C` on sand is 2.9:1 and must not be text or a small control label. `#5B98DC` on sand is 2.7:1. `#2E7CD1` on sand is 3.8:1, so it may be a large mark only.

Body text and control labels target **4.5:1**. Large type (about 24px, or 19px bold) and non-text UI boundaries target **3:1**.

### Surfaces

Each skin has four tones. New UI uses these roles, not raw `ink-*` or `sand-*` utilities, once a page spec adopts the system.

| Tone | Night | Day | Used for |
|---|---|---|---|
| Field | `#0B2027` | `#F7F1E7` | Page |
| Dock | `#0E2B33` | `#EDE3D3` | Section band |
| Panel | `#163842` | a step lighter than dock, warm, not pure white | Cards, form wells |
| Overlay | `#0E2B33` at full opacity, or `#163842` | `#F7F1E7` at full opacity | Header, menus, dialogs |

Night separates tones by lifting ink and using a quiet line. Day separates them by a warmer step and a soft shadow (`0 8px 24px` at low ink alpha is the existing shadow; keep it on day panels only).

The sticky header uses the overlay tone. A bar that is only backdrop-blur over the world is not enough for type contrast.

Type that sits on the world uses a scrim role (ink gradient at night, a lighter ink wash if day type must sit on a bright plate). The scrim is part of the world frame, specified in `home-hero`. This spec requires that the scrim exist so text still meets the ratios above.

### Type

Unchanged families: Archivo and Cairo for UI and body, Big Shoulders for numerals and codes. Theme does not swap fonts.

### Selection

Selection uses the action fill with ink text so the highlight matches the button pairing.

## Allowed files

A later implementation of **tokens and the theme control only** may touch:

| Path | Allowed change |
|---|---|
| `tailwind.config.ts` | Semantic colors pointing at the roles |
| `app/globals.css` | Role variables for `night` and `day` |
| `app/layout.tsx` | Blocking theme script, `data-theme`, `color-scheme` |
| `components/layout/Header.tsx` | Place the control beside language |
| `components/layout/MobileNav.tsx` | Same control |
| `components/layout/ThemeToggle.tsx` | New control, colocated with the language control |
| `docs/rklt/direction.md` | The day/night amendment already made with this spec |
| `docs/rklt/status.md` | Status line |

Do not, under this spec:

- Restyle home, about, services, or contact sections.
- Edit the crane / `components/3d-experience/**`.
- Change copy, routes, metadata, forms, or analytics.
- Add a theme package.

Page specs adopt the roles when those pages are redesigned. Until then, existing `ink` / `sand` / `terracotta` / `brandblue` classes may remain.

## Dependencies

No new packages. Theme state is `data-theme`, `localStorage`, and `prefers-color-scheme`.

## Mobile

- Same roles at every breakpoint.
- The theme control stays reachable in the mobile nav.
- Overlay surfaces stay opaque. Do not thin them out on small screens to “save” the video.
- Day and night plates still follow the mobile media rule in `direction.md`: one still, optional short loop. This spec does not ship a second heavy plate to phones.

## Reduced motion

- Skin swap has no animated crossfade.
- Reduced motion does not force a skin. Night and day both remain available.
- Reduced motion stills follow the active skin’s grade when a matching still exists.

## Acceptance checks

1. First load with no saved choice matches the OS scheme, and a saved `rklt-theme` wins on the next load without a flash of the other skin.
2. The control in the header and the mobile nav switches the skin without a route change.
3. Body text on field is sand on `#0B2027` at night and ink on `#F7F1E7` by day.
4. Action controls use an `#E0A05B` or `#D89162` fill with `#0B2027` label on both skins.
5. Signal text on day is `#1A5694` on sand. `#5B98DC` and `#2E7CD1` are not used as small text on sand.
6. Focus shows a 2px ring and offset on both skins for header controls and form fields.
7. Header and menu surfaces are the overlay tone, not a transparent blur over video.
8. No generated plate is inverted with CSS to fake the other skin.
9. `prefers-reduced-motion: reduce` swaps skins instantly.
10. Arabic layout does not change roles or pigments.

## Exclusions

- Shot list, camera path, and chapter copy (`home-hero`, `home-scroll-narrative`).
- File names, resolution, and codecs for paired plates (`generated-media-pipeline`).
- A third skin, a high-contrast extra theme, or per-section themes.
- Pure white `#FFFFFF` or pure black `#000000` as page fields.
- Terracotta as a second body-text color on sand.
- Restyling existing sections inside this spec’s implementation.
- New fonts, icon sets, or component libraries.
- Implementation in this planning session.

## Next spec

`generated-media-pipeline`, after approval. Not started here.
