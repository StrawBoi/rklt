# RKLT status

Last updated 12 Oct 2026. The **live** first screen is still the cargo frame in `docs/rklt/specs/hero.md`. The approved **rehaul** spec is `docs/rklt/specs/hero-cinematic.md` (Figma Make baseline; build pending). Home, about, services, and contact use the night and day roles. Inner heroes are type on the field until both posters for that page exist. The crane is not mounted.

## Read first

`docs/rklt/rejected.md`, `docs/rklt/brief/facts.md`, `docs/rklt/brief/tech.md`, `docs/rklt/direction.md`, `docs/rklt/decisions.md`.

## Documents

| File | State |
|---|---|
| `docs/rklt/direction.md` | Authority. Hero is Open. Camera C stays rejected. |
| `docs/rklt/decisions.md` | Dated log. Hero reopened 6 Oct 2026. |
| `docs/rklt/rejected.md` | Closed ideas. Do not re-propose. |
| `docs/rklt/brief/facts.md` | Verified claims and copy ceiling. |
| `docs/rklt/brief/tech.md` | Stack, motion owners, tiers, media rules. |
| `docs/rklt/ideas/` | Site and hero cards approved. Hero promoted to `specs/hero.md`. |
| `docs/rklt/creative-room.md` | Cheat sheet. Next step is the site pass. |
| `docs/rklt/design-references.md` | Research. Direction 1 approved 5 Oct 2026. Not a spec. |
| `docs/rklt/specs/motion-ownership.md` | One-writer rule in force. Camera playhead is stale. |
| `docs/rklt/specs/visual-system.md` | Tokens and the theme control are in the site. Camera sentences are stale. |
| `docs/rklt/specs/hero.md` | Live first screen until rehaul build. Full-bleed cargo frame. |
| `docs/rklt/specs/hero-cinematic.md` | Approved rehaul. Full-bleed port, preparation stroke, navy/gold. Not in code yet. |
| `docs/rklt/specs/home-first-screen.md` | Superseded by `hero.md`. |
| `docs/rklt/archive/home-hero.md` | Archived. Pinned camera. Do not build. |
| `docs/rklt/archive/home-scroll-narrative.md` | Archived as a camera narrative. Six home sections remain the content order. |
| `docs/rklt/archive/generated-media-pipeline.md` | Archived. 360° plates. Do not use those budgets by default. |
| `docs/rklt/specs/about.md` | Implemented. One still when both posters exist; otherwise type on the field. |
| `docs/rklt/specs/services.md` | Implemented. Catalog, anchors, and the current WhatsApp inquiries. |
| `docs/rklt/specs/contact.md` | Implemented. Channels, hubs, coverage, checklist, and visible answers. No form. |

## Product facts (do not invent beyond these)

See `docs/rklt/brief/facts.md`. Short form:

- Freight forwarding: sea, air, land, customs.
- Heritage claimed in existing copy: 30+ years, Jordan (Amman and Aqaba), Aqaba port / Queen Alia corridors, GCC/Levant language as already written.
- Contacts and legal name live in `content/site.ts`.
- Locales: `en`, `ar`.

## Current site (as built)

- Next 14, React 18, Tailwind, Archivo / Big Shoulders / Cairo.
- Installed motion/3D: `gsap@^3.12.0`, `three@0.160.0`. No Motion, Lenis, Lottie, R3F, React Spring, `@gsap/react`.
- Home first screen is `HeroSection`: four mode controls, one still, WhatsApp. `Experience3DRoot` is not mounted. The crane files remain in `components/3d-experience/`.
- Rest of home: credibility (dock), service teasers (field), how it works (dock), story (field), coverage (dock), closing band (overlay). Same copy and destinations. One CSS reveal. Cards sit on the panel role.
- The closing band is shared and uses the overlay role on every page.
- About: hero, story, values, timeline, credentials, then the closing band. Same sentences. Story image is `/assets/rklt-visual-board.jpg`.
- Services: hero, four core offers, nine extended offers, advisory, then the closing band. Anchors `#sea`, `#air`, `#land`, `#customs`, and `#extended` keep `scroll-mt-28`.
- Contact: hero, three channels, Amman and Aqaba, six coverage regions, four checklist items, four visible answers, then the closing band. `#coverage` keeps `scroll-mt-28`. No form and no map.

## Decisions locked

- Premium redesign of the existing site, not a greenfield stack.
- **5 Oct 2026:** the user approved the operations-desk first screen. Lane B’s scroll camera is retired.
- **6 Oct 2026:** the user reopened the hero for exploration. The operations desk stays the live page until a replacement spec is approved. Camera C was not revived.
- Headline on the live page leads with sea, air, and land through Aqaba and Amman. “Million of miles. Million of smiles.” is the secondary line.
- Four controls — Sea, Air, Land, Customs — swap one still and one sentence. CSS only, until a new hero spec says otherwise.
- WhatsApp stays the primary action. No email gate, no portal, no vessel table.
- Current crane stays out. Three.js stays installed. A new scene may be proposed. This crane may not be rebuilt.
- Stills are atmosphere, not proof of operations. License numbers stay unprinted.
- Skins: night port and day manifest remain. Paired frames, no CSS invert.
- New libraries need a spec and approval.

## Next

The brief and the creative room are in place. Specialists live in `.cursor/agents/`. The workflow is `.cursor/skills/rklt-creative-room/`. No idea card has been run. Posters for about, services, and contact are still unproduced.

## Risks

- Generated “Aqaba/operations” can look fake or legally risky if treated as real.
- Four hero images will be heavy if all are eager. Load three on selection.
- `visual-system.md` and `motion-ownership.md` still contain camera paragraphs. The status lines mark them stale. A sentence-level rewrite has not been done.
- Home hero English WhatsApp text differs from `siteConfig`. Both are recorded in `brief/facts.md`. Neither was changed.
- The Arabic headline is assembled from existing mode words and the two cities. It has not been reviewed as published copy.

## Out of scope until specced

- Implementing a new hero from an idea card.
- Inner-page WebGL worlds.
- Rewriting claims beyond the approved headline structure. License numbers stay unprinted.
- Package adds.
- Generating posters. Until both night and day files exist for a page, that hero stays type on the field.
