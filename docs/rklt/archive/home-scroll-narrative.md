# Spec: home scroll narrative

Status: archived 6 Oct 2026. Do not implement the camera chapters. The six home sections remain the content order in `docs/rklt/direction.md`. Authority is that file and `docs/rklt/rejected.md`.

Parent: `docs/rklt/direction.md`, `docs/rklt/specs/visual-system.md`, `docs/rklt/specs/motion-ownership.md`, `docs/rklt/specs/home-hero.md`.

## Purpose

Bring the home sections under the world into the same night-port and day-manifest instrument. Order, words, and destinations stay. The hero pin does not continue through these sections.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Recolor with raw ink and sand utilities only | Rejected. Day manifest would still be a night page. |
| B | Semantic surfaces, existing copy, CSS-only reveals, no second pin | **Chosen.** The camera story already happened in the hero. |
| C | A GSAP pin on every section | Rejected. It traps the reader and fights the hero pin. |

## Behavior

### Order

The home page keeps this order after the hero:

1. Credibility
2. Service teasers
3. How it works
4. Story
5. Coverage
6. Closing band

No section is added or removed. No WebGL canvas, video plate, or ScrollTrigger pin is introduced here.

### Words and destinations

Use the current locale strings. Do not rewrite them and do not add a client, a result, a tonnage, or a new quotation.

| Section | Keep | Destination |
|---|---|---|
| Credibility | `credibility` fields, plus the existing eyebrow already in the component (`Operational Track Record` / `سجل الإنجاز والخبرة`) | None |
| Services | `servicesTeaser` items, numerals, and the existing “Service details” / `تفاصيل الخدمة` line | Each card: `/{locale}/services#{anchor}`. Catalog link: `/{locale}/services` |
| How it works | `howItWorks.steps` in `01`–`04` order | None |
| Story | Both paragraphs, the existing image, its alt, the existing quotation, and the hubs line | `/{locale}/about` |
| Coverage | The four hubs and their codes `AQB`, `AMM`, `GCC`, `GLB` | `/{locale}/contact#coverage` |
| Closing band | Current WhatsApp message, phone, email, hours line | `wa.me` from `siteConfig`, `tel:` `phoneClean`, `mailto:` `email` |

The story image remains `/assets/rklt-operations.jpg`. It is not replaced by a generated world plate.

### Reading rhythm

Sections alternate surface tones so the page is a dock, then a field, then a dock:

| Section | Surface |
|---|---|
| Credibility | Dock |
| Services | Field |
| How it works | Dock |
| Story | Field |
| Coverage | Dock |
| Closing band | Overlay |

Cards and the credibility figure sit on the panel tone. Dividers use the line role. Text uses the text and muted roles. Numerals and hub codes use Big Shoulders in the action role. They are not a second body color on sand: on the day skin the numeral is the action fill only when it is large; small labels stay text or muted.

Hover and press follow `visual-system`: a veil on the same panel, plus the line shifting toward the action color. The action fill with an ink label is reserved for the primary closing action (WhatsApp). Other actions stay outline or text.

### Reveal

One shared behavior, not a timeline per section:

- When motion is allowed, a section’s content may fade and rise about 12px, once, the first time it enters the viewport.
- The trigger is a single `data-inview` flag. CSS owns the transition (about 500ms, the existing confident curve).
- GSAP does not drive these sections.
- Content is in the DOM and readable before the flag is set. The animation is not a gate.

## Visual direction

Same pigments and roles as `visual-system`. The page below the hero should feel like the instrument continuing on paper: large headings, a numeral or code, then the existing sentence. Not a brochure grid with a new illustration style.

How it works is the editorial beat. Four steps in a row on wide screens, stacked on small screens, each step a panel with its existing numeral. A quiet line may connect them on wide screens. It does not draw itself with a scrubbed timeline.

Coverage is a code rail. `AQB`, `AMM`, `GCC`, and `GLB` are the marks; the existing name and type sit under them.

The closing band is centered, on the overlay tone, with one terracotta wash behind it at low strength. The wash is decorative and `aria-hidden`. The WhatsApp control is the action fill. Phone and email are secondary.

Day and night both use these roles. Do not leave `bg-ink-950` or `text-sand-100` as the only colors, or day mode will still look like night.

## Allowed files

A later implementation may touch:

| Path | Allowed change |
|---|---|
| `components/sections/home/CredibilityStrip.tsx` | Surfaces and the one reveal flag |
| `components/sections/home/ServiceTeaserGrid.tsx` | Same |
| `components/sections/home/HowItWorks.tsx` | Same |
| `components/sections/home/StoryTeaser.tsx` | Same |
| `components/sections/home/CoverageTeaser.tsx` | Same |
| `components/layout/CTABand.tsx` | Role tokens only. This band is also used on about, services, and contact; copy and links stay, so those pages inherit the skin for this band only |
| `components/primitives/Card.tsx` | A surface that follows the active skin, if `surface="dark"` would block day mode |
| `components/primitives/Button.tsx` | Action and outline roles, if the current dark-only variants fail on sand |
| `components/primitives/Eyebrow.tsx` | Muted and action roles |
| `components/primitives/Numeral.tsx` | Action role for large numerals |
| `components/primitives/ArrowLink.tsx` | Text and action roles |
| `components/sections/home/useInViewOnce.ts` | New, only if the reveal is implemented. One hook for all five sections and the band |

Do not, under this spec:

- Edit `HomeHero`, `HomeWorld`, or `components/3d-experience/**`.
- Edit `content/**`, routes, metadata, or analytics.
- Edit about, services, or contact section files. Only the shared closing band changes there.
- Add a package.

## Dependencies

No new packages. The reveal, if built, is CSS plus `IntersectionObserver`. No GSAP, Three.js, Motion, or Lenis on these sections.

## Mobile

- Same order, same words, same destinations.
- Grids stay one column under `md`, matching the current breakpoints. How it works may stay two columns from `md` and four from `lg`.
- No horizontal scroll, no pin, no camera.
- The connecting line between steps, if present, is omitted under `md` so the stack does not draw a broken rule.
- Actions in the closing band remain full width on small screens.

## Reduced motion

- Do not set the rise. Content is visible without waiting for in-view.
- Hover color may remain. Decorative movement is instant.
- The story photograph does not zoom.

## Acceptance checks

1. After the hero, the six blocks appear in the current order, in both locales, with the current sentences.
2. Service cards still open `/{locale}/services#sea`, `#air`, `#land`, and `#customs`. The catalog link still opens `/{locale}/services`.
3. Story still opens `/{locale}/about`. Coverage still opens `/{locale}/contact#coverage`.
4. The closing band still starts the current WhatsApp thread, dials `siteConfig.phoneClean`, and emails `siteConfig.email`.
5. Night and day each show field, dock, panel, and overlay as specified. Body text meets the visual-system pairs (sand on ink at night, ink on sand by day).
6. No ScrollTrigger, canvas, or video is added by these sections.
7. With reduced motion, nothing is invisible until scroll, and nothing translates.
8. At 390px the sections stack, the step rule is absent, and the closing actions are full width.
9. About, services, and contact keep their current section layouts. Their closing band uses the same roles and the same words.
10. The story image is still `/assets/rklt-operations.jpg` with its current alt.

## Exclusions

- Hero camera, plates, and pin (`home-hero`).
- Inner-page section redesigns.
- Copy edits, new testimonials, new hub codes, and new photography.
- A map, a second 3D scene, or generated plates behind these sections.
- GSAP sequences, Lenis, and new dependencies.
- Implementation in this planning session.

## Next

Inner pages (about, services, contact), one page per spec, after the home climate is accepted. Not started here.
