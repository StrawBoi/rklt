# Spec: home first screen

Status: superseded on 8 Oct 2026 by `docs/rklt/specs/hero.md`. This file records the desk that shipped on 6 Oct 2026. Do not build from it. Camera C stays rejected.

Parent: `docs/rklt/direction.md`. Skins follow `docs/rklt/specs/visual-system.md`. `docs/rklt/archive/home-hero.md` is not a parent.

## Purpose

Replace the mounted crane and the current photo-card hero with the operations desk from `direction.md`. One screen: what RKLT moves, where it moves, and the control that reaches a person.

The six sections under the hero stay as they are until their own spec.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | Scroll camera, plates, and a pinned world | Rejected. `home-hero.md` is historical. |
| B | Two columns, four controls, one still, CSS swap | **Chosen.** Direction 1, locked 5 Oct 2026. |
| C | Keep the boxed crane | Rejected. Three.js stays installed and is not the hero. |

## Behavior

### What the visitor sees

Desktop (`lg` and up) is two columns. The text column is first in the DOM. The still is the second column. There is one `h1`.

1. Headline, from `hero.headline` in the locale content.
2. Secondary line: the existing `hero.titleLine1` and `hero.titleLine2`, read as one line. English remains “Million of miles. Million of smiles.”
3. Primary button: the existing `hero.ctaPrimary`, to the WhatsApp URL already built in `HeroSection`.
4. Secondary button: the existing `hero.ctaSecondary`. Its `href` is `/{locale}/services#{anchor}` for the selected mode.
5. Four controls, in this order: Sea, Air, Land, Customs.
6. One still. Big Shoulders shows the mode numeral and, where the table below has a code, that code.

The eyebrow, the current hero subtitle, the three proof lines (“Licensed at Aqaba Port”, “Direct 24/7 Operations”, “Sea, Air & Land Corridors”, and the Arabic strings beside them), the “30+” stamp, and the “Trusted Handover” stamp leave this screen. `30+` stays in the credibility section. Do not print a license number.

### Words

Add only `hero.headline` to the home content files. Do not rewrite any other field.

| Locale | `hero.headline` |
|---|---|
| `en` | Sea, air, and land through Aqaba and Amman. |
| `ar` | البحر والجو والبر عبر العقبة وعمّان. |

The English line is the locked headline. The Arabic line uses the mode words and the two cities already in the home and site copy. It is not a new claim.

The secondary line is the existing tagline split, including the Arabic strings already in `hero.titleLine1` and `hero.titleLine2`.

The mode sentence is the existing `servicesTeaser.items[].desc` for that `id`. Do not write a shorter line.

| Order | `id` | English control | Arabic control | Numeral | Code | Sentence |
|---|---|---|---|---|---|---|
| 1 | `sea` | Sea | الشحن البحري | `01` / `٠١` | `AQB` | Existing sea `desc` |
| 2 | `air` | Air | الشحن الجوي | `02` / `٠٢` | `AMM` | Existing air `desc` |
| 3 | `land` | Land | الشحن البري | `03` / `٠٣` | none | Existing land `desc` |
| 4 | `customs` | Customs | التخليص الجمركي | `04` / `٠٤` | none | Existing customs `desc` |

English control names are the four words in `direction.md`. Arabic control names are the jump labels already on the services hero. Numerals are the ones already on `servicesTeaser.items`. `AQB` and `AMM` are the coverage codes already on the home page: Aqaba for sea, Amman for air. Land and customs do not gain a code.

The first mode is `sea` on each load. Do not store the mode.

WhatsApp keeps the message already in `HeroSection`:

- en: `Hello RKLT team, I would like to inquire about cargo shipping.`
- ar: `مرحباً ربوع الخير، أرغب في الاستفسار عن خدمات الشحن والنقل.`

The number stays `siteConfig.whatsappNumber`.

### Still

The still is atmosphere for the selected mode. Alt text does not call it an RKLT operation, a photograph of Aqaba, or a staff portrait.

| Mode | English alt | Arabic alt |
|---|---|---|
| `sea` | Sea corridor atmosphere | أجواء ممر بحري |
| `air` | Air corridor atmosphere | أجواء ممر جوي |
| `land` | Land corridor atmosphere | أجواء ممر بري |
| `customs` | Customs desk atmosphere | أجواء مكتب تخليص |

Every mode starts on `/assets/rklt-hero.jpg`. This task does not add image files. A later media task may point a mode at its own file. Until that file is in the map, the fallback stays. Do not generate a stand-in. Do not invert a frame to fake night or day.

If `document.documentElement.dataset.theme` is `day` and that mode has a day file in the map, use the day file. Otherwise use the night entry, which is the fallback above. Absent `data-theme` uses the night entry. This screen does not add the theme control.

Request the active mode’s URL only. The first paint requests the sea fallback and may mark it priority. The other modes are requested when selected. Do not preload four copies of the same fallback.

Remove the current `duration-700` hover scale on this image. The still does not zoom.

### Swap

The selected control sets `aria-pressed`, swaps the sentence, the still’s alt, the numeral, the code (or removes it), and the services `href`. One mode is selected. The controls are `button` elements in a group, not links.

The swap is instant. No opacity crossfade, no GSAP, no `localStorage`.

`prefers-reduced-motion: reduce` changes nothing about the swap, because there is no motion to remove. There is no intro, no camera, and no video.

### Page composition

`app/[locale]/page.tsx` renders `HeroSection` and does not render `Experience3DRoot`. Leave `components/3d-experience/**` in the repository. Do not import it from the home page.

`HeroSection` is the client boundary for this screen, because the mode is React state. The page stays a server component. Mode is a phase. Do not store scroll, pointer, or frame time in state.

## Visual direction

The screen stays on the current ink, sand, and terracotta utilities. Role tokens from `visual-system` are not required here. Do not restyle the sections below.

The numeral and the corridor code use the existing `Numeral` component. The code is left-to-right in both locales. The still is not mirrored in Arabic. Arabic type uses Cairo through the existing RTL layout.

The headline is the `h1`. The secondary line is text, not a second display line in the action color. The primary button keeps the current action treatment. The secondary button stays an outline. Controls show which one is pressed by the existing action color on the label, not by a new hue.

## Allowed files

| Path | Allowed change |
|---|---|
| `components/sections/home/HeroSection.tsx` | The desk: headline, tagline, buttons, four controls, one still |
| `app/[locale]/page.tsx` | Mount `HeroSection` only. Remove the 3D branch from this page |
| `content/en/home.ts` | Add `hero.headline` only |
| `content/ar/home.ts` | Add `hero.headline` only |
| `docs/rklt/status.md` | Status line |

Do not, under this spec:

- Edit `components/3d-experience/**`.
- Edit credibility, service teasers, how it works, story, coverage, or `CTABand`.
- Edit routes, metadata, analytics, `content/site.ts`, or services content.
- Add a package, a font, or an image file.

## Dependencies

No new packages. No GSAP and no Three.js on this screen.

## Mobile

Below `lg`, the order is headline, secondary line, buttons, controls, then the still. Buttons are full width. Controls wrap onto new lines. WhatsApp stays the first button in that row. It is not fixed and it does not cover the controls.

Below `sm`, omit the still. From `sm` to just under `lg`, the still is a 4:3 block under the controls. From `lg` up, it is the second column.

## Reduced motion

The swap stays instant. The still does not move. No autoplay.

## Acceptance checks

1. `/en` and `/ar` show `HeroSection`. `Experience3DRoot` is not mounted. The crane files are still in the repo.
2. The `h1` is the headline in the table above. The secondary line is the existing tagline for that locale.
3. WhatsApp opens `https://wa.me/` with `siteConfig.whatsappNumber` and the message already in `HeroSection`.
4. Sea is pressed on first load. The services button opens `/{locale}/services#sea`. Air, Land, and Customs open `#air`, `#land`, and `#customs`.
5. Changing a control changes the sentence to that teaser’s existing `desc`, the numeral, and the code. Land and customs show no code. `AQB` and `AMM` stay left-to-right in Arabic.
6. The first request loads `/assets/rklt-hero.jpg` only. Another mode’s URL is requested only after that control is pressed, and only if its map entry differs from the fallback.
7. The image has no 700ms hover scale. The still is not mirrored in Arabic.
8. Below `sm`, the still is absent and the four controls remain in the document under the buttons. At `lg`, the still is the second column.
9. Reduced motion adds no intro and no animated swap.
10. The proof lines, the 30+ stamp, and the Trusted Handover stamp are gone from this screen. Credibility below still shows `30+`. No license number appears.
11. Sections under the hero are unchanged.

## Exclusions

- Night and day token work (`visual-system`).
- Restyling the six sections under the hero.
- New still files, generated plates, and equirectangular video.
- A camera, a pin, a form, a vessel table, or an email gate.
- Deleting `components/3d-experience/**`.
- Implementation inside the task that writes this file.

## Next

Implementation of this file, when asked. Then the six home sections, after that spec is confirmed.
