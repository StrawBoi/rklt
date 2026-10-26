# Dribbble motion references — analysis brief

Planning only. No application changes. Inspected 17 Oct 2026.

Six Dribbble uploads (MP4/WebM). Parent Dribbble shot pages were not identified; analysis is from frame review of each file (~39s, 3s, 28s, 23s, 19s, ~4s). One URL was listed twice (same file).

Shared lens (from your criteria):

| Criterion | What to look for |
|---|---|
| Creativity | Unexpected metaphor, scale, or layout—not decoration without a job |
| Hierarchy | One focal point per beat; type, color, and motion agree on what matters |
| Storytelling | Each beat answers “what is this / why should I care / what next?” |
| Visual coherence | One asset language (photo **or** 3D **or** flat illustration), one accent system, repeated geometry |

RKLT constraints (from `docs/rklt/direction.md`, `brief/facts.md`, `rejected.md`): verified copy only; WhatsApp primary; GSAP + existing Three allowed; no new packages without approval; do not caption generated media as RKLT operations or ACT photography.

---

## Index

| # | Asset | Duration | Subject (working title) | Primary lesson |
|---|---|---|---|---|
| A | [44495623 MP4](https://cdn.dribbble.com/userupload/44495623/file/ba1e8f0672fc0abfd7f1d9851fde4a06.mp4) | ~39s | **Trackora** logistics marketing site | Full-site narrative: cinematic hero → trust → product pillars → content |
| B | [47533273 MP4](https://cdn.dribbble.com/userupload/47533273/file/aa5f8ec27341650eceaf80f98822faec.mp4) | ~3s | **Cargo Track** dashboard transition | One-shot UI morph: product detail ↔ chapter title |
| C | [47763837 MP4](https://cdn.dribbble.com/userupload/47763837/file/ae215d01904910fb69b1f4397ce2b281.mp4) | ~28s | **Influence Pro Trading** (+ scroll into case-study grid) | Industrial hero + strict design system across sections |
| D | [47626406 MP4](https://cdn.dribbble.com/userupload/47626406/file/0ea8d9d7149199f0cd1a93da86e81cfd.mp4) | ~23s | Supply-chain landing (containers + testimonials) | Still photography animated: parallax, masks, scroll reveals |
| E | [44481910 WebM](https://cdn.dribbble.com/userupload/44481910/file/fa00b680173606ab32f5383510bccc0a.webm) | ~19s | **Garpix Load System** (mobile) | Frame-to-frame hero asset swap (truck variants → pallet) |
| F | [48343063 MP4](https://cdn.dribbble.com/userupload/48343063/file/8f0a9442f212b4ff2ce98c12c7d0ed41.mp4) | ~4s | **Lightweight JSON** feature card | Split panel + metaphor animation anchors one idea |

---

## A — Trackora (full marketing site)

**URL:** https://cdn.dribbble.com/userupload/44495623/file/ba1e8f0672fc0abfd7f1d9851fde4a06.mp4

### What it is

A scroll-capture or screen recording of a complete SaaS-style logistics site: hero with live-action container ship, partner logo strip, testimonial band, three “solution” cards with custom icons, blog/insights, FAQ accordion. Fictional brand **Trackora**; copy centers tracking, unified dashboard, and global freight.

### Hierarchy

1. **Hero:** H1 “Precision in Every Shipment” over full-bleed ship; primary control is a tracking field (functional hierarchy—not decorative).
2. **Trust:** Monochrome partner logos (FedEx, DHL, etc.)—secondary, horizontal rhythm.
3. **Product story:** “OUR SOLUTIONS” + H2, then three equal cards with pastel fields (Control / Cost / Speed). Icons are large; tags and one-line outcomes sit below.
4. **Depth content:** Blog band, FAQ—tertiary, typographic.

### Storytelling arc

Problem (complex global shipping) → capability (track + operate) → proof (logos, quotes) → pillars (three benefits) → education (blog) → objection handling (FAQ). Each chapter changes **background energy** (cinematic → white → pastel tiles) while keeping the same sans family and navy accent.

### Visual coherence

- **Photo world:** Real ship, real water; UI is glassy white/navy on top.
- **Illustration world:** 3D-ish icons share outline weight, orange/blue accents, and card corner radius.
- **Rule:** Never mix photo and icon at the same scale in one card; photo is full-bleed sections only.

### Motion (inferred from scroll capture)

Likely scroll-linked fades and section entrances—not a single hero gimmick. Pace is **editorial**: hold on hero, then clean cuts to white fields.

### What to borrow for RKLT

- **Chapter structure** under the hero: credibility → four modes (sea/air/land/customs) as **distinct color fields** with one line each—not a tracking portal.
- **One functional primary** in hero (for RKLT: WhatsApp / discuss shipment), not a fake track field.
- **FAQ pattern** for customs/licensing questions without printing license numbers on the page.

### What to leave behind

- Invented partner logos and “customers say” quotes (violates RKLT facts ceiling unless verified).
- Email/demo gates and dashboard chrome implying a product RKLT does not ship.

### Feasibility (RKLT stack)

**High** for layout and scroll reveals (GSAP). **Medium** for ship hero (licensed or abstract plate—not mislabeled operations photo).

---

## B — Cargo Track dashboard transition (~3s)

**URL:** https://cdn.dribbble.com/userupload/47533273/file/aa5f8ec27341650eceaf80f98822faec.mp4

### What it is

A **single transition beat** on a fleet/shipment dashboard: detailed UI with 3D orange truck, maps, KPI sparklines → truck scales up and becomes typographic chapter label **“Cargo Truck”** on a dark field, then resolves back to UI. Total runtime ~3 seconds.

### Hierarchy

During transition, **typography temporarily outranks UI chrome**—the product name becomes the environment. Data panels defer until the title beat completes.

### Storytelling

Signals a **mode change**: from “inspect this asset” to “chapter: road freight” (or similar). Narrative is spatial, not textual.

### Visual coherence

Orange truck color = orange status chips, map route, and CTA accents. The transition preserves hue so the brain reads continuity.

### Motion mechanics

- Scale + depth (truck moves toward camera).
- UI panels slide/fade off-stage.
- Oversized display type (condensed grotesque) crosses the fold.
- Reverse or cut back to dashboard—**one-time** per navigation event, not a loop.

### RKLT use cases

- Route change: `/services` → `#land` with a **one-shot** handover (container, aircraft silhouette, or customs stamp)—not a permanent loader.
- Home section handoff: hero plate → “Sea” chapter using the same terracotta/blue accent from `visual-system.md`.

### Feasibility

**Medium.** Needs designed keyframes + `prefers-reduced-motion` static fallback (show section title, skip scale). No new libraries if GSAP owns the timeline.

---

## C — Influence Pro Trading (system + scroll)

**URL:** https://cdn.dribbble.com/userupload/47763837/file/ae215d01904910fb69b1f4397ce2b281.mp4  
*(listed twice in your message—same file.)*

### What it is

~28s showcase. Opens on **INFLUENCE PRO TRADING**: low-angle **orange crane** against pale sky; massive white condensed type; minimal nav. Later beats include brokerage FAQ (orange/navy, grid on charcoal), and a **case studies** grid (“Simplify your supply chain…”) with tagged project cards (air freight, supply chain, regions).

### Hierarchy

- **Hero:** Type and crane share the frame; type wins by size, crane wins by color temperature.
- **FAQ:** Orange callout (“STILL HAVE DOUBTS?”) vs navy headline; numbered accordion rows.
- **Case studies:** Eyebrow → H2 + supporting paragraph → asymmetric card grid.

### Storytelling

Industrial **strength** metaphor (crane) for a trading/brokerage brand—then proof via cases and FAQ. Same story as RKLT (heavy industry, corridors) without copying trading copy.

### Visual coherence (why you flagged this early)

- **One hero asset** (crane/orange) recurs as accent across FAQ, buttons, and grid tags.
- **Typography:** Single condensed family at extreme weights; uppercase for authority.
- **Grid discipline:** Charcoal outer field + light inner panel repeats between sections.

This is the closest reference to “RKLT word + port/industrial asset + terracotta/orange family” in your set.

### Motion (inferred)

Slow hero parallax on crane; scroll brings structured panels over grid background; case cards likely stagger in. Coherence depends on **shared grid lines** staying registered while content swaps.

### Complexity (your “might be complicated” note)

| Hard part | Why |
|---|---|
| Multi-section scroll with one continuous grid | Layout + animation coupling; breakpoints multiply |
| Photography + type interpenetration | Needs art-directed crops per locale (EN/AR) |
| Case-study grid | RKLT must not invent clients—would need verified stories or abstract “lanes” instead |

### RKLT translation (approved direction)

- **Steal:** Orange/ink/sand pairing; one industrial silhouette; FAQ/handover structure; case grid **as corridors or modes**, not fake client logos.
- **Avoid:** Fictional case titles; implying RKLT is a commodity trader vs forwarder.

### Feasibility

**Low–medium** for full scroll system; **medium–high** for hero + one following band with shared grid.

---

## D — Container photography scroll (supply-chain landing)

**URL:** https://cdn.dribbble.com/userupload/47626406/file/0ea8d9d7149199f0cd1a93da86e81cfd.mp4

### What it is

~23s. Opens on **stacked orange containers** (low angle, complementary blue sky)—image **moves** (parallax / Ken Burns). Testimonial cards slide over (names + corporate logos—treat as placeholder). Hero block: “Customer experiences that inspire trust” on container photography with Learn More / Contact.

### Hierarchy

1. **Emotional still** (containers) — attention.
2. **Social proof row** — credibility (problematic if logos/names are fake).
3. **Centered message + dual CTA** — conversion.

### Storytelling

“Physical world of freight” → “people trust us” → “talk to us.” Motion sells **scale and texture** when copy is static.

### Visual coherence

Rust orange containers echo accent red/orange on CTA. Photo grain and directional light are consistent across beats—no flat icons in the same section.

### Motion techniques (typical for this pattern)

- Scroll-driven **translate/scale** on stills (not full video).
- **Masked text** reveals.
- Card carousel with horizontal drift and opacity.

### RKLT fit

Strong for **home credibility band** or **services hero** using **paired stills** (day/night skins) already in `visual-system.md`. Animate plates RKLT already owns—do not substitute mislabeled Aqaba ops shots.

### Feasibility

**High** with GSAP ScrollTrigger-style patterns (if already in project patterns) or transform-only CSS; respect reduced motion.

---

## E — Garpix Load System (mobile frame transitions)

**URL:** https://cdn.dribbble.com/userupload/44481910/file/fa00b680173606ab32f5383510bccc0a.webm

### What it is

~19s phone mock on dark navy. **Garpix Load System**: 3D **orange/yellow truck** with visible load in trailer; hero copy in Russian; CTAs for trial and demo. Across the timeline the **hero asset swaps**: semi-truck variants → **pallet of boxes** (same lighting rig).

### Hierarchy

Logo + product name → explanatory paragraph → **dominant 3D asset** → text CTAs. The asset is the proof.

### Storytelling

“Optimization” told by **changing the object** (vehicle → packed pallet) without rewriting the paragraph.

### Visual coherence

One render pipeline: same floor reflection, same key light, same orange brand on truck and logo cube.

### Motion mechanics

- **Crossfade or morph** between pre-rendered frames (likely image sequence or short clips).
- Subtle **idle** rotation on truck.
- Mobile-first vertical rhythm.

### RKLT use cases

- Swap hero object by **mode** (container stack → aircraft → truck) on services anchors.
- Evening/day **paired frames** as transition pairs (align with night/day rule in direction).

### Feasibility

**Medium** if assets are pre-rendered stills or short loops; **low** for real-time 3D on mobile unless budgeted in `brief/tech.md`. RKLT already has Three behind a flag—not required for this pattern.

---

## F — Lightweight JSON (metaphor component)

**URL:** https://cdn.dribbble.com/userupload/48343063/file/8f0a9442f212b4ff2ce98c12c7d0ed41.mp4

### What it is

~4s feature vignette. Split layout: **ochre panel** with “Lightweight **JSON** format”; grey field with **flat crane** lifting a container in the same yellow. Crane cables and container move slightly.

### Hierarchy

Bold keyword (**JSON**) vs supporting words; illustration supports but does not compete.

### Storytelling

Abstract tech benefit via **logistics metaphor** (crane = handling, container = payload). One sentence worth of meaning.

### Visual coherence

Single flat illustration style; fill color matches panel exactly.

### Motion

Small **transform** on crane arm + container (loop-friendly). Could run once on scroll-into-view.

### RKLT use cases

- **Four handover steps** or **customs** explainer: one icon + one verb each.
- **WhatsApp handover**: stamp/seal animation on terracotta field.

### Feasibility

**High** (SVG + GSAP). Best **bounded** motion unit in the set—good template for “component that delivers an idea.”

---

## Cross-reference matrix

| Technique | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| Scroll narrative | ● | | ● | ● | | |
| One-shot page/idea transition | | ● | | | ● | |
| Photo as hero | ● | | ● | ● | | |
| 3D / pre-render hero | | ● | | | ● | |
| Flat metaphor loop | | | | | | ● |
| Strict grid / design system | ● | ● | ● | | | ● |
| Fictional social proof | ● | | | ● | | |

---

## Suggested learning order (for joint review)

1. **F** — smallest unit; defines motion component grammar.
2. **B** — one-shot transition recipe (duration, easing, reduced-motion).
3. **D** — animate existing stills without new 3D.
4. **E** — asset-swap storytelling for sea/air/land.
5. **A** — full page rhythm and section types.
6. **C** — full visual system ambition; scope down for RKLT v1.

---

## Open questions for you

1. Which **one beat** should RKLT prototype first: hero handoff (B), still parallax (D), mode swap (E), or explainer card (F)?
2. For **C**, do you want the **full grid world** or only hero + one inner band?
3. Should partner/case grids stay **abstract** (corridors, modes) per `brief/facts.md`?

---

## Uncertainties

- Dribbble shot titles, authors, and intended interaction (click vs scroll) were not verified.
- Exact easing and scroll coupling were inferred from still frames, not measured.
- Testimonial names and logos in **A** and **D** are presentation placeholders; not RKLT-safe.
