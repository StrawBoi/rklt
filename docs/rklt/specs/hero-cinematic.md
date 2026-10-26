# Spec: hero (cinematic rehaul)

Status: **live first screen as of 12 Oct 2026.** Built timing and assets are recorded in `docs/rklt/decisions.md` (12 Oct 2026 — Cinematic hero built) and override the timeline table below where they differ.  
Design reference: [Figma Make — Design hero section](https://www.figma.com/make/ztAHEbInOUYiK2LZNayh7a/Design-hero-section) (Version 6 baseline; this spec refines it).  
Parent: `docs/rklt/direction.md`, `docs/rklt/brief/facts.md`, `docs/rklt/brief/tech.md`, `docs/rklt/rejected.md`.  
Supersedes at build time: `docs/rklt/specs/hero.md` (cargo cutout frame).

## Purpose

Open the site like a **single cinematic shot**: a full-bleed night port atmosphere, cream and gold type, one calm preparation moment, then a **quiet** hero that reads **professional freight**, not a glowing app card.

Keep what worked in Figma Make (bilingual layout, port mood, staggered reveal, **one continuous SVG stroke** draw). Remove what hurt premium (permanent neon frame, busy metadata, stock logos, quote-first CTA, pure black void).

## Design intent

| Keep | Drop or change |
|---|---|
| Night port photography as atmosphere | Inset “picture in iPad” with persistent outer glow |
| “Million of miles.” / “Million of smiles.” hierarchy | “GLOBAL FREIGHT FORWARDING” and vague location chips |
| Gold on the **second** headline line only | Gold on every control and border |
| One-time **preparation** stroke (SVG) | Stroke that stays loud after load |
| EN / AR, RTL mirror for type | Mirroring the photograph |
| WhatsApp as primary action | “Request a quote” as the dominant button |
| `01`–`03` mode index **below** the hero fold | Mode rail competing with the headline |

Trust comes from **restraint**: fewer elements, navy field (not AMOLED), matte gold, no readable competitor marks on the plate.

## Visual system (hero scope)

These tokens apply to the rehaul. They align with [rklt.ltd](https://www.rklt.ltd) and replace terracotta / teal ink **on the hero and global chrome when the rehaul lands**.

| Token | Hex | Role |
|---|---|---|
| `field` | `#06102A` | Page and header base (navy). Not `#000000` except inside photo grade. |
| `text` | `#F4F1EA` | Headlines and body on dark |
| `text-muted` | `#F4F1EA` at 72–82% opacity | Supporting line |
| `gold` | `#B8965A` | Matte accent: rules, chevron, stroke (base) |
| `gold-bright` | `#D4AF37` | Second headline line, phone link emphasis |
| `gold-soft` | `#F3D27A` | Arabic lockup beside logo only if needed |
| `on-gold` | `#06102A` | Label on filled gold button |
| `scrim` | `linear-gradient(90deg, rgba(6,16,42,0.92) 0%, rgba(6,16,42,0.55) 42%, transparent 68%)` | LTR; mirror for RTL |

**Gold rule:** no multi-layer outer bloom, no `filter: drop-shadow` stacks on the stroke. If glow is used at all, a **single** soft shadow at ≤ 8% opacity on the stroke only during the first 1.5s, then **off**.

**Photography:** atmosphere only. No readable vessel operator names, no faces, no documents, no “this is our crane” implication. Alt text does not claim Aqaba photography or RKLT operations.

## Layout

### Desktop (`lg` and up)

- **Full-bleed** hero: image covers the viewport below the header (min height `100svh` minus header).
- **Type column** on the start side: max width ~32rem, padding from the grid (`px-6` / `lg:px-12`), vertically centered or slightly above center.
- **Image** bleeds to all edges; subject weight may sit opposite the type column.
- **Header:** sticky, `field` at full opacity (no blur-only bar). Logo RKLT + gold chevron + Arabic legal name. Nav: Home, Services, About, Contact (existing routes). Language toggle. **No** SEA / AIR / LAND in the header for v1 of this spec (modes return in the section below the hero).

### Tablet / mobile

- Same full-bleed image; stronger **bottom** scrim so type stays ≥ 4.5:1.
- Type stack **above** the fold; image may crop taller.
- Primary CTA full width; secondary phone as text link under or beside.
- **No scroll pin.** Native touch scroll.

### Arabic

- Mirror column and alignment. **Do not** mirror the photograph.

## Content hierarchy (exactly four levels on the hero)

| Level | EN | AR | Notes |
|---|---|---|---|
| Eyebrow | Freight through Aqaba and Amman. | شحن عبر العقبة وعمّان. | Small caps, tracked. From `brief/facts.md`. Needs native review. |
| Headline line 1 | Million of miles. | أميال لا تُحصى. | Cream, display weight |
| Headline line 2 | Million of smiles. | ابتسامات لا تُعد. | `gold-bright` only |
| Supporting | One sentence max from facts ceiling | Match EN factually | Default EN: use existing site heritage tone in one line, or `site` sub-tagline only if it fits one line |

**Off this screen:** `30+`, service cards, mode numerals, customs, extended catalog, second CTA competing with WhatsApp.

### Actions

| Control | EN | AR | Behavior |
|---|---|---|---|
| Primary | Discuss your shipment | تحدث مع فريق الشحن | WhatsApp — hero wording from `brief/facts.md` |
| Secondary | Explore all services | استكشف كافة الخدمات | Link to `/{locale}/services` |
| Tertiary | +962 7 9532 0624 | same | `tel:` link, muted gold or cream, not a second pill |

Optional quote dialog (Figma Make): **not on v1** unless the user adds it in a later decision. WhatsApp stays the only filled gold button.

## Motion: “Preparation” (Tier 1)

**Tier:** GSAP only for stroke and staged text. CSS for hover/focus. **One writer per property.**

The sequence should feel like **lights coming up on a set**, not a product demo.

### Properties and owners

| Element | Writer | Property |
|---|---|---|
| Hero plate | GSAP or CSS once | `opacity` |
| SVG stroke | GSAP | `stroke-dashoffset` (and optionally `opacity` in exit) |
| Eyebrow, headlines, support, CTAs | GSAP | `opacity`, `translateY` (max 12px) |
| Header | CSS or single GSAP fade | `opacity` |

Do not animate `clip-path` on this hero. Do not pin scroll.

### Timeline (reduced motion off, `md` and up)

Total about **2.0s** to settled state.

| Time (s) | What happens |
|---|---|
| 0.0 | Field navy visible. Header at opacity 1 (or fades 0→1 by 0.4). |
| 0.0–0.7 | Port plate opacity 0 → 1, ease `power2.out`. |
| 0.15–1.25 | **One** SVG rounded rect traces the hero viewport inset by ~24px (`rx` ~24–32). Stroke **3px**, color `gold`, **matte** (no bloom). `stroke-dashoffset` animates full perimeter once. |
| 1.25–1.7 | Stroke opacity 1 → **0** (or 0.12 if a hairline remnant is desired — default **fade to 0** for maximum professionalism). |
| 0.75–1.5 | Stagger 0.08s: eyebrow → line 1 → line 2 → support → primary → secondary. `translateY` 12px → 0, `opacity` 0 → 1, ease `power3.out`. |
| 1.7+ | **Settled:** no visible frame. Only type, scrim, and image. |

Below `md`: skip stroke draw; plate at opacity 1; text stagger shortened to 0.4s total or static.

### `prefers-reduced-motion: reduce`

- Full layout visible immediately.
- Stroke either **omitted** or shown at **completed** state at **0% opacity** (prefer omitted).
- No stagger.

### Professionalism checks (animation)

- No loop on the stroke.
- No pulse on gold.
- No bounce easing.
- Stroke must not remain at full opacity after 1.7s.
- Do not block interaction past 1.0s (buttons may be clickable while text finishes).

## Figma Make alignment

Use Version 6’s **continuous SVG path** and stagger idea. Change in Figma before build:

1. Expand image to **full bleed**; remove persistent outer glow on the frame.
2. Apply **Preparation** exit: stroke fades out after draw.
3. Replace stock port if **any** logo or vessel name is readable.
4. Swap primary CTA to **Discuss your shipment** / WhatsApp.
5. Move `01 SEA / 02 AIR / 03 LAND` to the **next** section (credibility or service teasers).
6. Field `#06102A`, not pure black.

## Typography (rehaul note)

Figma Make used Montserrat; the repo still ships Archivo. **For this spec:** match Figma in Make; **at implementation**, either add Montserrat with approval or map styles to Archivo with the same sizes and weights. Record the font choice in `decisions.md` when build starts.

Numerals for `01`–`03` below the fold: Big Shoulders (existing) on dark.

## Allowed files (at build)

`components/sections/home/HeroSection.tsx`, new `useHeroPreparation.ts` (or equivalent), `app/globals.css`, `tailwind.config.ts`, `content/en/home.ts`, `content/ar/home.ts`, `public/assets/hero/` (new still(s)), `components/layout/Header.tsx` / `BrandLogo.tsx` if tokens and chevron color change, and docs updated by that build.

Do not remount `Experience3DRoot` or extend crane files for this spec.

## Acceptance checks

1. `/en` and `/ar`: full-bleed port, navy field, headline is tagline pair from facts (two lines, second line gold).
2. Eyebrow is the Aqaba / Amman freight line, not generic marketing.
3. Primary action is WhatsApp with the **hero** message from `brief/facts.md`.
4. At `md`+, preparation stroke runs once and **does not** remain a glowing frame after ~1.7s.
5. Below `md` and under reduced motion, no stroke gimmick; content is readable.
6. No readable competitor logos on the hero image.
7. `30+` and mode index are not on the hero viewport.
8. One GSAP timeline (or one stroke tween + one stagger) owns the hero intro; CSS does not share `transform` on the same nodes.

## Out of scope (this spec)

- Night / day skin pairs for the new hero (v1 is **night only** on the first screen; day skin can follow in `visual-system.md` rehaul).
- Quote dialog and form fields.
- Replacing inner pages or home sections below the hero (separate specs).
