# Spec: services page

Status: approved to write 5 Oct 2026. Planning only. This file does not authorize application code.

Parent: `docs/rklt/direction.md`, `docs/rklt/specs/visual-system.md`, `docs/rklt/specs/about.md`, `docs/rklt/brief/tech.md`. The closing-band notes below cite `home-scroll-narrative`, now in `docs/rklt/archive/`. Use the archive only for that band’s existing behavior. Do not build its camera chapters.

## Purpose

Restyle `/en/services` and `/ar/services` as a catalog in the same instrument: one still, the four core offers, the nine extended offers, and the existing inquiry actions. No second camera.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Type on a flat field, no hero image | Rejected. Inner pages are still plus type. |
| B | One static 16:9 poster, then the current catalog on role surfaces | **Chosen.** Same lighter page as about. |
| C | A pinned world per freight mode | Rejected. The home hero already tells that story. |

## Behavior

### Order

Keep this order:

1. Hero
2. Core (`#core`, with `#sea`, `#air`, `#land`, `#customs`)
3. Extended (`#extended`)
4. Advisory
5. Closing band (already specified in `home-scroll-narrative`)

Routes and metadata in `app/[locale]/services/page.tsx` stay.

Home cards open `/services#sea`, `#air`, `#land`, and `#customs`. Those ids stay, each with `scroll-mt-28`, so the sticky header does not cover the title. `#extended` keeps `scroll-mt-28` as well.

### Words and actions

Use `servicesContentEn` and `servicesContentAr` as written. Do not add a service, a feature line, a rate, or a certification.

The hero does not currently render `hero.ctaQuick`. Leave that field unused. Do not add a button for it in this spec.

Keep the labels and messages that live in the components:

| Place | English | Arabic |
|---|---|---|
| Hero jump | Sea Freight | الشحن البحري |
| Hero jump | Air Freight | الشحن الجوي |
| Hero jump | In-Land Transport | الشحن البري |
| Hero jump | Customs Clearance | التخليص الجمركي |
| Hero jump | Extended (9) | القدرات الموسعة (9) |
| Core inquiry | Inquire About This Service | طلب تسعيرة لهذه الخدمة |
| Core WhatsApp | `Hello RKLT team, I would like to inquire about: ${name}` | `مرحباً ربوع الخير، أرغب في الاستفسار عن خدمة: ${name}` |
| Advisory WhatsApp | `Hello RKLT team, I would like logistics advisory for a custom cargo route.` | `مرحباً ربوع الخير، أرغب في استشارة لوجستية لمسار شحن مخصص.` |

Each core inquiry and the advisory action still open `https://wa.me/` with `siteConfig.whatsappNumber` and that message. Hero jumps stay on-page hashes:

| Label | `href` |
|---|---|
| Sea Freight | `#sea` |
| Air Freight | `#air` |
| In-Land Transport | `#land` |
| Customs Clearance | `#customs` |
| Extended (9) | `#extended` |

### Hero still

| | Night | Day |
|---|---|---|
| File | `/world/services/night/poster.webp` | `/world/services/day/poster.webp` |
| Frame | 1920×1080, sRGB | Same kind of place, day grade |
| Budget | ≤ 400 KB | ≤ 400 KB |

Atmosphere only: corridors, hulls, airside, or road, with no readable logos, documents, or faces presented as staff. Alt, if the image is shown:

- en: `Freight corridor atmosphere`
- ar: `أجواء ممر شحن`

If a skin’s file is missing, the hero is type on the field. Do not reuse the about poster or a home equirectangular still, and do not invert the night file.

Desktop: the poster fills a band of at least `70vh`. Eyebrow, `h1`, subtitle, and the five jumps sit on the lower start corner. Night type uses an ink scrim. Day type uses a sand scrim.

Mobile: 16:9 poster, then the type and jumps on the field. The `h1` does not sit on the photograph.

### Sections

| Section | Surface | Notes |
|---|---|---|
| Hero | Poster, or field if the poster is absent | One `h1`. Five jumps |
| Core | Field | Four panels in `01`–`04` order. Numeral, existing icon, name, tagline, description, feature list, inquiry |
| Extended | Dock | Nine panels, `05`–`13`, existing icons. No inquiry button unless one already exists (it does not) |
| Advisory | Panel on dock | Existing title, subtitle, and WhatsApp action |
| Closing band | Overlay | Unchanged |

Core panels stay one per row. From `lg`, the numeral and inquiry sit in a five-column start group and the description plus features in the remaining seven. Under `lg`, that stack is numeral, name, inquiry, then description.

### Reveal

Reuse `components/sections/home/useInViewOnce.ts` if it exists. Do not add a second observer or a GSAP timeline.

## Visual direction

This page is a rate sheet, not a second film. The jumps read as an instrument index. Core numerals are Big Shoulders in the action role. Feature lists use the text and muted roles. The inquiry control is the action fill with an ink label. Extended panels are quieter: numeral, icon, title, sentence.

No new hue. Hover is a veil and a line shift, as in `visual-system`.

## Allowed files

| Path | Allowed change |
|---|---|
| `components/sections/services/ServicesHero.tsx` | Poster, scrim, role tokens. Jumps stay |
| `components/sections/services/ServicesCore.tsx` | Role tokens and the shared reveal |
| `components/sections/services/ServicesExtended.tsx` | Same |
| `components/sections/services/ServicesAdvisory.tsx` | Same |
| `public/world/services/**` | The two posters only, if produced in the same task |
| `components/sections/home/useInViewOnce.ts` | Reuse. Create it only if it does not exist yet |

Do not, under this spec:

- Edit `content/**` or the services page metadata.
- Edit the home world, about sections, or `CTABand` again.
- Add a package.

## Dependencies

No new packages. No Three.js and no GSAP on this page.

## Mobile

- Poster, then type, then wrapping jumps, then stacked core panels, then a one-column extended list.
- Extended may be two columns from `md` and three from `lg`, matching a readable catalog. It must not become a horizontal scroller.
- No pin.

## Reduced motion

- The poster does not move.
- Sections are visible without waiting for in-view.
- No video.

## Acceptance checks

1. `/en/services` and `/ar/services` keep their current metadata and section order.
2. The `h1` is the existing hero title. The five jumps still go to `#sea`, `#air`, `#land`, `#customs`, and `#extended`.
3. Those targets still sit below the sticky header when jumped from the home page or from the hero.
4. Core still lists the current four services and their feature lines, each with the current WhatsApp inquiry.
5. Extended still lists nine items, numerals `05` through `13`, with no new card and no new button.
6. Advisory still opens the current advisory WhatsApp message.
7. With both posters present, the skin selects its file. With a poster missing, the hero is type on the field.
8. At 390px the heading sits under the poster, and the extended list is not a horizontal scroll.
9. Reduced motion does not animate the poster or hide sections until scroll.
10. No canvas and no new service claim appears.
11. The closing band still matches `home-scroll-narrative`.

## Exclusions

- Home, about, and contact restyles.
- A camera, a pin, or a looping plate.
- Rendering `hero.ctaQuick`, adding rates, or adding license numbers.
- Implementation in this planning session.

## Next spec

`contact`, after approval. Not started here.
