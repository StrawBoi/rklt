# RKLT direction

Authority as of 6 Oct 2026. Read this before any hero, motion, or media proposal.

`docs/rklt/brief/facts.md`, `docs/rklt/brief/tech.md`, `docs/rklt/rejected.md`, and `docs/rklt/decisions.md` sit beside this file. If an older spec disagrees with them, the older spec is stale on that point. Do not implement `docs/rklt/archive/`.

The home hero is **open** for a new treatment. The page that is live today stays live until a later spec is approved. Reopening the hero does not revive the scroll camera.

## Zones

| Zone | Meaning | Who changes it |
|---|---|---|
| Locked | Stays unless a dated entry in `decisions.md` says otherwise | The user |
| Open | The creative room may explore. Output is an idea card, not code | Propose, then the user approves |
| Needs approval | A package, a public URL, or a promotion from an idea card into a spec or the site | The user, explicitly |

## Locked

- Next.js App Router, the current package manager, Tailwind, GSAP, and the installed Three.js. EN and AR routes.
- URLs: `/en`, `/ar`, `/en/about`, `/en/services`, `/en/contact`, and the Arabic equivalents. Service anchors `#sea`, `#air`, `#land`, `#customs`, `#extended`. Contact anchor `#coverage`.
- Verified facts in `docs/rklt/brief/facts.md`. No invented clients, results, testimonials, license numbers, tonnage, or awards.
- Pigments and type already in the site: ink, sand, terracotta, brand blue; Archivo, Cairo, Big Shoulders. Roles in `docs/rklt/specs/visual-system.md`.
- Night and day skins. Paired frames. Do not invert one grade to fake the other.
- WhatsApp stays the primary action. No email gate, no tracking portal, no live vessel table.
- One writer per animated property. Engines and budgets are in `docs/rklt/brief/tech.md`.

## Open

The creative room may propose, within the locked list and `rejected.md`:

- A new home hero: stills, short video, 2D, or 3D, and how sea, air, land, and customs are signaled. A sequence that moves from port to sea to air to land is allowed to be proposed.
- How the home sections hand off to each other: shared color, a continuing line, a shared object, type that carries over.
- Motion whose job is to move the eye toward one thing at a time.
- Atmosphere for inner pages. Those pages stay one still plus type until a spec says otherwise. No second full-viewport world.

## Needs approval

- Any npm package that is not already installed.
- A change to a public URL, form, metadata field, or analytics call.
- Promoting `docs/rklt/ideas/<section>.md` into `docs/rklt/specs/` or into application code.
- Printing a license number, or captioning a generated frame as an RKLT operation, as Aqaba photography, or as a staff portrait.

## What is built today

The live first screen is `docs/rklt/specs/hero-lights.md` (14 Oct 2026): the theme toggle picks Design 3 or the evening plate, one RKLT word sits still behind that plate with a gold rule under it, and a first visit holds on the name until the sky and the port arrive together. `docs/rklt/hero-handoff.md` is the critique that led there. It is not a second approval. `docs/rklt/specs/hero-cinematic.md` records the still-plate hero the lamp sequence replaced. `docs/rklt/specs/home-first-screen.md` records the desk as it shipped on 6 Oct 2026.

Home order under the first screen: credibility (`30+` and the four values), four service teasers, four handover steps, heritage, coverage codes, contact band. Inner pages: about, services, contact, as specified. The crane scene is not mounted.

Implementation chats follow `docs/rklt/specs/hero-lights.md` for the first screen and the page specs for the rest.

## Motion and media that stay open with the hero

- `prefers-reduced-motion: reduce` keeps the same information, with no autoplay video and no camera move.
- A video idea needs a still fallback. Mobile must be specified in the same idea, not afterwards.
- Generated frames are atmosphere. Alt text does not claim they are proof.
- Night and day are separate frames when both skins show that mode.
- Arabic uses Cairo and the existing RTL layout. Stills and scenes do not mirror.

## What agents read, in order

1. `docs/rklt/rejected.md`
2. `docs/rklt/brief/facts.md`
3. `docs/rklt/brief/tech.md`
4. This file
5. `docs/rklt/decisions.md`
6. The live spec for the page they are touching

Idea cards go in `docs/rklt/ideas/`. A card does not authorize code.

## Document map

| File | State |
|---|---|
| `docs/rklt/direction.md` | This file. Authority. |
| `docs/rklt/decisions.md` | Dated log. |
| `docs/rklt/rejected.md` | Closed ideas. Do not re-propose. |
| `docs/rklt/brief/facts.md` | Business facts. |
| `docs/rklt/brief/tech.md` | Stack, motion, budgets. |
| `docs/rklt/ideas/` | Old room cards. A card is not code. New work uses `docs/rklt/studio.md`. |
| `.cursor/agents/` | The five specialists are retired. Studio roles live in `.cursor/skills/rklt-studio/`. |
| `docs/rklt/specs/hero-lights.md` | Live first screen as of 14 Oct 2026. |
| `docs/rklt/specs/hero-cinematic.md` | Superseded by `hero-lights.md`. Its header and credibility handoff still stand. |
| `docs/rklt/specs/hero.md` | Superseded by `hero-cinematic.md`. Record of the cargo frame. |
| `docs/rklt/specs/home-first-screen.md` | Superseded by `hero.md`. |
| `docs/rklt/specs/visual-system.md` | Pigments, roles, skins. Camera sentences in it are stale. |
| `docs/rklt/specs/motion-ownership.md` | One-writer rule. Camera playhead is stale. |
| `docs/rklt/specs/about.md`, `services.md`, `contact.md` | Page content in force. |
| `docs/rklt/archive/*` | Camera-era specs. Do not implement. |
| `docs/rklt/design-references.md` | Research from 5 Oct 2026. Not a spec. |
