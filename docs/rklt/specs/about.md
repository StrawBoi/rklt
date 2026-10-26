# Spec: about page

Status: approved to write 5 Oct 2026. Planning only. This file does not authorize application code.

Parent: `docs/rklt/direction.md`, `docs/rklt/specs/visual-system.md`, `docs/rklt/brief/tech.md`. The closing-band notes below cite `home-scroll-narrative`, now in `docs/rklt/archive/`. Use the archive only for that band’s existing behavior. Do not build its camera chapters.

## Purpose

Restyle `/en/about` and `/ar/about` as a lighter page in the same instrument: one still, then the existing story, values, timeline, and credentials. No second camera.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Type on a flat field, no image in the hero | Rejected. Inner pages are still plus type. |
| B | One static 16:9 poster behind the hero, then the current sections on role surfaces | **Chosen.** A document with climate, not a second world. |
| C | Reuse the home equirectangular camera | Rejected. The pin belongs on the home page only. |

## Behavior

### Order

Keep this order:

1. Hero
2. Story
3. Values
4. Timeline
5. Credentials
6. Closing band (already specified in `home-scroll-narrative`)

Routes, metadata titles, and descriptions stay as they are in `app/[locale]/about/page.tsx`.

### Words

Use `aboutContentEn` and `aboutContentAr` as written. Do not add a milestone, a license number, a certificate image, or another quotation.

Keep the strings that already live in the components and are not in the content files:

| Place | English | Arabic |
|---|---|---|
| Story figure eyebrow | Operational Continuity | الريادة المتواصلة |
| Story figure line | Three Decades of Continuous On-Ground Service | ثلاثة عقود من الوجود الميداني في الأردن |
| Story figure numeral | 30+ | 30+ |
| Story image alt | RKLT Maritime & Cargo Operational Identity | الهوية الملاحية واللوجستية لشركة ربوع الخير |

The story image stays `/assets/rklt-visual-board.jpg`.

The quotation stays the one in `story.quote`, attributed as it is now. It is not given a new author, a portrait, or a client name.

Credentials stay the four badges and the note. They are not illustrated with seals, and no license number is invented to fill them.

### Hero still

A poster may sit behind the hero. It is not a WebGL scene and not a video.

| | Night | Day |
|---|---|---|
| File | `/world/about/night/poster.webp` | `/world/about/day/poster.webp` |
| Frame | 1920×1080, sRGB | Same place, day grade |
| Budget | ≤ 400 KB | ≤ 400 KB |

The poster follows the media rules: atmosphere, no readable logos or documents, no face presented as staff, alt text that does not call it a photograph of Aqaba or of RKLT. Suggested alt, both locales required if the image is shown:

- en: `Port atmosphere behind the RKLT story`
- ar: `أجواء ميناء خلف قصة ربوع الخير`

If either file is missing, or the skin’s file is missing, the hero is type on the field surface. Do not crop a home equirectangular still into this frame, and do not invert the night poster.

Desktop: the poster fills a band of at least `70vh`. The eyebrow, `h1`, and subtitle sit on the lower start corner. Night type sits on an ink scrim. Day type sits on a sand scrim. The scrim is a band, not a veil over the whole picture.

Mobile: the poster is a 16:9 block, then the type sits on the field under it. Do not put the `h1` on top of the photograph.

### Sections

| Section | Surface | Notes |
|---|---|---|
| Hero | Poster, or field if the poster is absent | One `h1` |
| Story | Field | Two columns from `lg`: text, then the existing image and 30+ figure. Stacked under `lg`, text first |
| Values | Dock | Four panels, numerals `01`–`04` (Arabic numerals in Arabic). Keep `arabicTitle` where the component already shows it |
| Timeline | Field | Four periods in order: `1990s`, `2000s`, `2010s`, `Present`, and their Arabic strings |
| Credentials | Dock | Four panels plus the existing note |
| Closing band | Overlay | Unchanged from the home narrative spec |

Timeline is the editorial beat: the period is a Big Shoulders mark, then the existing title and sentence. A quiet line may connect the four panels from `lg`. It is not scrubbed.

### Reveal

Same rule as the home sections. Reuse `components/sections/home/useInViewOnce.ts` if that hook exists. Do not add a second observer. GSAP is not used on this page.

## Visual direction

About reads as a record: a climate band, then prose, then four values, then four dates, then four credentials. Headings stay Archivo or Cairo. Periods and the 30+ figure stay Big Shoulders in the action role when large. Small labels use text or muted.

The action fill is not a body color. The quotation’s edge uses the action role. The page does not introduce a new hue.

## Allowed files

| Path | Allowed change |
|---|---|
| `components/sections/about/AboutHero.tsx` | Poster, scrim, role tokens |
| `components/sections/about/StoryNarrative.tsx` | Role tokens and the shared reveal |
| `components/sections/about/ValuesExpanded.tsx` | Same |
| `components/sections/about/TimelineSection.tsx` | Same |
| `components/sections/about/CredentialsModule.tsx` | Same |
| `public/world/about/**` | The two posters only, if they are produced in the same task |
| `components/sections/home/useInViewOnce.ts` | Reuse. Create it only if the home narrative has not yet |

Do not, under this spec:

- Edit `app/[locale]/about/page.tsx` except to pass an existing prop. Section order and metadata stay.
- Edit `content/**`.
- Edit the home world, the crane, or `CTABand` again.
- Add a package.

## Dependencies

No new packages. No Three.js and no GSAP on this page.

## Mobile

- Poster, then type, then stacked sections.
- Values and credentials stay one column under `md` and two from `md`.
- Timeline stays one column under `md`, two from `md`, four from `lg`.
- The timeline rule is omitted under `lg`.
- No pin and no horizontal scroll.

## Reduced motion

- The poster does not move.
- Sections are visible without waiting for in-view.
- No video.

## Acceptance checks

1. `/en/about` and `/ar/about` keep their current metadata and section order.
2. The `h1` is the existing hero title in that locale.
3. Story, values, timeline, and credentials show the current sentences, including the four periods in order.
4. The story image is still `/assets/rklt-visual-board.jpg` with its current alt. The 30+ figure and its two lines remain.
5. With both posters present, night and day show the matching file. With a poster missing, the hero is type on the field and the page still renders.
6. At 390px the heading sits under the poster, not on it.
7. Reduced motion does not animate the poster or hide sections until scroll.
8. No canvas, ScrollTrigger, or new quotation appears.
9. Credentials do not show a license number or a seal that is not already in the content.
10. The closing band still matches `home-scroll-narrative`.

## Exclusions

- Home hero and home sections.
- Services and contact page restyles.
- A camera, a pin, a looping plate, or an equirectangular still on this page.
- New claims, new dates, and new certificates.
- Implementation in this planning session.

## Next spec

`services`, after approval. Not started here.
