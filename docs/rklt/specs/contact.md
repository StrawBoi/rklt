# Spec: contact page

Status: approved to write 5 Oct 2026. Planning only. This file does not authorize application code.

Parent: `docs/rklt/direction.md`, `docs/rklt/specs/visual-system.md`, `docs/rklt/specs/services.md`, `docs/rklt/brief/tech.md`. The closing-band notes below cite `home-scroll-narrative`, now in `docs/rklt/archive/`. Use the archive only for that band’s existing behavior. Do not build its camera chapters.

## Purpose

Restyle `/en/contact` and `/ar/contact` as the operations desk in the same instrument: one still, the three existing channels, the hubs, the coverage list, the quote checklist, and the visible answers. No form and no second camera.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Type on a flat field, no hero image | Rejected. Inner pages are still plus type. |
| B | One static 16:9 poster, then the current desk on role surfaces | **Chosen.** Same lighter page as about and services. |
| C | A map, a quote form, and a pinned world | Rejected. The page already reaches people by WhatsApp, phone, and email. |

## Behavior

### Order

Keep this order:

1. Hero
2. Channels (`#reach-us`)
3. Hubs and hours
4. Coverage (`#coverage`)
5. Quote checklist
6. Answers
7. Closing band (already specified in `home-scroll-narrative`)

Routes and metadata in `app/[locale]/contact/page.tsx` stay.

`#coverage` keeps `scroll-mt-28`. The home coverage link opens `/{locale}/contact#coverage`, and the sticky header must not cover that title. `#reach-us` stays.

There is no form on this page. Do not add one. Do not add a map.

### Words and actions

Use `contactContentEn` and `contactContentAr` as written. Do not add a city, a border, a reply-time promise, or a license.

Keep the heading that lives in the channel component and is not in the content file:

| Place | English | Arabic |
|---|---|---|
| Channel heading | Connect with Our Operations Desk | اختر القناة الأنسب لك |

Channel actions, in order:

| Channel | Opens |
|---|---|
| WhatsApp | `https://wa.me/${siteConfig.whatsappNumber}` with `whatsappDefaultMsgEn` or `whatsappDefaultMsgAr` |
| Phone | `tel:${siteConfig.phoneClean}` |
| Email | `mailto:${siteConfig.email}` |

Hub phone links stay `tel:` plus that location’s phone with spaces removed. The visible numbers stay the ones already in the content and in `siteConfig`.

The four answers stay visible. Do not collapse them into an accordion.

### Hero still

| | Night | Day |
|---|---|---|
| File | `/world/contact/night/poster.webp` | `/world/contact/day/poster.webp` |
| Frame | 1920×1080, sRGB | Same kind of place, day grade |
| Budget | ≤ 400 KB | ≤ 400 KB |

Atmosphere only: a desk, a dock light, or a quiet corridor. No readable documents, no logos, and no face presented as staff. Alt, if the image is shown:

- en: `Operations desk atmosphere`
- ar: `أجواء مكتب العمليات`

If a skin’s file is missing, the hero is type on the field. Do not reuse the about or services poster, and do not invert the night file.

Desktop: the poster fills a band of at least `70vh`. Eyebrow, `h1`, and subtitle sit on the lower start corner. Night type uses an ink scrim. Day type uses a sand scrim.

Mobile: 16:9 poster, then the type on the field. The `h1` does not sit on the photograph.

### Sections

| Section | Surface | Notes |
|---|---|---|
| Hero | Poster, or field if the poster is absent | One `h1` |
| Channels | Dock | Three panels. WhatsApp is the action fill with ink text. Phone and email stay panels |
| Hubs | Field | Amman, then Aqaba, with the existing role, address, hours, and phone |
| Coverage | Dock | Six regions in the current order |
| Quote checklist | Field | Four items. A checklist, not inputs |
| Answers | Dock | Four questions, answers shown |
| Closing band | Overlay | Unchanged |

### Reveal

Reuse `components/sections/home/useInViewOnce.ts` if it exists. Do not add a second observer or a GSAP timeline.

## Visual direction

The page is a desk: a climate band, then three ways to reach a person, then where and when, then where cargo goes, then what to have ready, then the answers. Numerals are not required. The WhatsApp panel is the one action fill. Phone and email are secondary.

No new hue. The coverage names read as a list of corridors, with the existing detail under each name.

## Allowed files

| Path | Allowed change |
|---|---|
| `components/sections/contact/ContactHero.tsx` | Poster, scrim, role tokens |
| `components/sections/contact/ContactCTATier.tsx` | Role tokens and the shared reveal. Links stay |
| `components/sections/contact/HubsAndHours.tsx` | Same |
| `components/sections/contact/FullCoverageList.tsx` | Same. `#coverage` stays |
| `components/sections/contact/QuotePrepGuide.tsx` | Same |
| `components/sections/contact/OperationalFAQ.tsx` | Same |
| `public/world/contact/**` | The two posters only, if produced in the same task |
| `components/sections/home/useInViewOnce.ts` | Reuse. Create it only if it does not exist yet |

Do not, under this spec:

- Edit `content/**` or the contact page metadata.
- Edit the home world, about, services, or `CTABand` again.
- Add a package, a form library, or a map embed.

## Dependencies

No new packages. No Three.js and no GSAP on this page.

## Mobile

- Poster, then type, then the three channels stacked, then hubs, coverage, the checklist, and the answers.
- Channels may be three columns from `md`. Coverage and answers may be two columns from `md`.
- No pin and no horizontal scroll.
- Phone and WhatsApp targets remain real links, not buttons that do nothing.

## Reduced motion

- The poster does not move.
- Sections are visible without waiting for in-view.
- No video.

## Acceptance checks

1. `/en/contact` and `/ar/contact` keep their current metadata and section order.
2. The `h1` is the existing hero title.
3. WhatsApp, phone, and email open the current destinations. Hub phones still dial the location number.
4. `#coverage` still clears the sticky header when opened from the home page.
5. Hubs, six coverage regions, four checklist items, and four answers show the current sentences. Answers are visible without a click.
6. With both posters present, the skin selects its file. With a poster missing, the hero is type on the field.
7. At 390px the heading sits under the poster, and the channels stack.
8. Reduced motion does not animate the poster or hide sections until scroll.
9. No form, map, canvas, or new claim appears.
10. The closing band still matches `home-scroll-narrative`.

## Exclusions

- Home, about, and services restyles.
- A camera, a pin, a looping plate, or a contact form.
- New offices, new corridors, and new reply-time claims.
- Implementation in this planning session.

## Next

The page specs agreed for this planning chat are complete. Implementation belongs to a later chat, one spec at a time, and still needs an explicit request.
