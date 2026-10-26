# RKLT overnight list

Loop: every 25 minutes. Do the next open item only. Do not commit. Do not recompress art masters. Do not mount `components/3d-experience`.

## 1. Analysis — done, first pass

Checked imports against `app/` and section components.

Unused on the live pages, safe to remove in item 2:

- `components/sections/home/PlaceLine.tsx` — replaced by the credibility strip, nothing imports it.
- `components/sections/home/useStepsRule.ts` — nothing imports it.

Parked, do not delete:

- `components/3d-experience/**` and `lib/3d-experience/**` — not mounted. Leave the tree.

Alts:

- Process stills and sea offering stills use `alt=""` because the step title or the link label is next to the picture. Keep that.
- `ServicesCore` also uses an empty alt. Check that the service name is in the same card before changing it.

Not yet checked: every `href` against real routes, TypeScript compile, and CSS rules with no matching class (`.rklt-cred-kicker` is leftover). Item 2 should run `npx tsc --noEmit` and remove only the two files above plus dead CSS that nothing references.

## 2. Clear and refactor — done

Removed `PlaceLine.tsx`, `useStepsRule.ts`, and the unused `.rklt-cred-kicker` rules. `ServicesCore` now passes the service name as the still alt. `npx tsc --noEmit` is clean for the live app. Remaining errors are only inside `components/3d-experience` and `lib/3d-experience` (Jest globals, a THREE global, one null canvas). That tree stays parked and was not edited.

## 3. UI / UX audit — done

Read the live sections. Nothing was restyled.

The hero is the only place that uses `.rklt-crane-cta` for a quote or a page link. Everywhere else still uses `components/primitives/Button.tsx`: gold metal fill (`rklt-gold-metal`), terracotta outline, ghost, blue focus ring (`brandblue-400`), rounded corners, `font-sans`. The crane button is flat ink or sand, a short gold underline, gold focus outline, no border.

Places still on the old button:

- Header quote and the mobile menu (WhatsApp plus phone).
- Home story (“about” outline) and the closing band (WhatsApp gold, phone outline, mail ghost).
- Services, about, and contact heroes via `PageInquiry` (small gold WhatsApp).
- Each service on the services page, plus the advisory block.
- Contact channel cards and the note form submit.

Home, section by section:

- Hero: crane buttons, sand type, gold only as the underline and the intro wordmark. Keep.
- Credibility: gold numeral, sand body on ink. No button. Keep.
- Service doors: open card uses the crane link. Arrow controls are `.rklt-service-nav-btn`, which is correct for a control. Offering previews are picture links, not buttons. Air, land, and customs are still text until stills arrive.
- Process: stills and display titles, no button. Keep.
- Story and coverage: display titles match. Story’s outline button does not.
- Closing band: three old button variants on one dark band.

Type: display headings are consistent (`font-display`, tight, 3xl to 6xl). Body stays Archivo or Cairo. The old button forces `font-sans font-bold` and can sit next to a crane link that does not. Arabic heroes use the same tight tracking as English; the crane rule is that Arabic changes face and alignment only.

Contrast to watch when the system is applied later: a sand door border on the day cream field is faint; gold metal text on a gold button needs the existing `text-role-on` pairing; the blue focus ring is the odd color on both skins.

## 4. Optimization — done

Measured the shipped files. Art masters were not recompressed.

| File | Size |
| --- | --- |
| `public/assets/hero/crane-container.webp` | 297 KB |
| Process stills (4) | 134–155 KB each, about 586 KB together |
| Sea offering stills (5) | 47–60 KB each, about 265 KB together |

The crane is the only image preloaded, which is right: it is on the first frame. Process and offering stills load with their sections.

Intro cost, after hydration: six bars, three crane moves, three shadow moves, the laser, the word clip, the header fade, and the foot fade. Reduced motion returns before any of that. Skip and Escape jump the timeline to the end. After the intro finishes, two scroll triggers remain: the brief fade and the crane drift. Credibility adds three (scrub, values, the count). The process adds one trigger per still, four in total. The parked 3D tree has its own ScrollTrigger and is not mounted.

Nothing here is heavy enough to recompress. If a later pass needs weight, the process stills are the only group worth a quality trim, and only the WebP copies.

## 5. Design-system plan — done, not applied

Rules, taken from the hero:

- One action: `.rklt-crane-cta`. Ink fill and sand type by day, sand fill and ink type by night, short gold underline, gold focus outline. No gold fill, no terracotta border, no blue ring, no rounded metal button.
- One display face: Archivo Display for English headings. Cairo for Arabic, with normal tracking and no uppercase. The RKLT word stays left-to-right.
- One numeral face: Big Shoulders, gold `#E2B34A`, for counts and step numbers only.
- Gold is a line, a numeral, or the intro wordmark. Sand is the page and the type on ink. Ink is the page at night and the type on sand.

Per page, when this is applied later:

- Home: story link and the three closing-band actions become crane buttons. Header quote and the mobile WhatsApp link do too. Phone and mail stay crane buttons, not outline and ghost. Credibility, doors, previews, and process stay as they are.
- Services: `PageInquiry`, each service WhatsApp link, and the advisory link become crane buttons. Service names stay display type. Offering stills stay picture links.
- About: `PageInquiry` becomes a crane button. Timeline and values keep display headings and sand or ink body. No new gold fills.
- Contact: hero inquiry, channel cards, and the note-form submit become crane buttons. The form fields stay as they are. Hours and the coverage list keep the body face.

Do this in one pass so a page never shows both buttons. Leave the intro logo SVG, the crane art, and the door layout alone.

## 6. Remaining offering prompts — done below

Sea is wired. Air, land, and customs are wired except three stills that were not in the source folder: `AirExpress.png`, `LandHaul.png`, and `CustomsBefore.png`. Those three cards stay text until the files arrive. Same style as the sea row: photoreal, 3:2, no logos, no readable words, no posed people.

### Air

`AirExpress.png` — A wide 3:2 still of a freight aircraft hold at night, a dark container on a loader, Queen Alia apron lights. No airline marks, no readable text.

`AirHub.png` — A wide 3:2 still of a cargo terminal at dusk, one dark container on a dolly, the terminal building soft behind it. No signage that can be read.

`AirCare.png` — A wide 3:2 still of a temperature-controlled air container with a small data probe on the door, cool interior light. No labels with words.

`AirDoor.png` — A wide 3:2 still of a dark container leaving an airport gate on a trailer, runway lights behind. No plates, no logos.

`AirClear.png` — A wide 3:2 still of a cargo document and a headset on a dark desk, an aircraft window glow in the background. No readable sentences.

### Land

`LandHaul.png` — A wide 3:2 still of a dark container on a trailer on the road from the sea toward the hills, late light. No truck branding, no plates.

`LandBorder.png` — A wide 3:2 still of the same trailer paused at a desert border yard, one dark container, long shadows. No flags with readable text, no faces.

`LandTrailer.png` — A wide 3:2 still of a flatbed and a box trailer side by side, one carrying machinery under a cover, the other a dark container. No logos.

`LandRoute.png` — A wide 3:2 still of a cab at dawn on an empty highway, a small map light on the dash, the container only partly in frame. No readable screens.

`LandConvoy.png` — A wide 3:2 still of two container trailers in a loose line on a night road, tail lights only. No company names.

### Customs

`CustomsDesk.png` — A wide 3:2 still of a broker’s dark desk at a port office, a stamp, a cream file, a window onto containers. No readable words.

`CustomsCode.png` — A wide 3:2 still of a tariff book edge and a single cream form, a pencil, shallow focus. No readable lines.

`CustomsPermit.png` — A wide 3:2 still of two overlapping certificates with a red seal and a brass clip. No readable sentences.

`CustomsAgency.png` — A wide 3:2 still of a sealed sample box and a clipboard on a steel table, laboratory-quiet light. No labels with words.

`CustomsBefore.png` — A wide 3:2 still of paperwork ready on a clipboard in the foreground and a ship still out at sea through the window. No readable text.

When the files are in `art/hero-lights/source`, crop them the same way as the sea previews and wire them by service.
