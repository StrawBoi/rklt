# Hero handoff — 14 Oct 2026

Built the same day. The live screen is `docs/rklt/specs/hero-lights.md`. This file is the critique that led there, not a second brief.

Read this before changing the home hero. It is a brief for the next session, not an approval to build. Critique first. Modify the idea until it is feasible. Stop and wait for "build".

Authority for what is live: `docs/rklt/specs/hero-lights.md`. Facts ceiling: `docs/rklt/brief/facts.md`. Closed ideas: `docs/rklt/rejected.md`.

## What is built

The first screen opens on navy. An RKLT mark ignites in the centre, then fades. The unlit port becomes readable, then four light groups come on about a second apart: port, ship, truck with the customs gate, aircraft. At night and dusk the brightest pixels in a group lead. By day each group is an even crossfade, because a brightness threshold bands the sky.

The visitor's clock picks the scene before first paint (`app/layout.tsx`, `data-hero-time`): day 06–16, dusk 16–19, night otherwise. The theme toggle still controls the rest of the site, not the hero.

Plates live in `public/assets/hero/lights/`. Day is 3840×2160 for both plates (`Design 3.png` lit, `Design.png` dark in `art/hero-lights/source/`). Dusk's dark plate is 3840 (`Design 1.png`); its lit plate is the original 1280 frame scaled up. Night is 1280×720 for both. Rebuild with `art/hero-lights/layers.py` via Blender's Python. Regions in that file are normalised, so a sharper master of the same composition drops in.

Files: `components/sections/home/HeroSection.tsx`, `useHeroLights.ts`, `useHeroPreparation.ts`, `app/layout.tsx`, `app/globals.css`.

On 14 Oct the hero copy was taken off the screen so the scene can be judged alone. The headline remains a visually hidden `h1`. The eyebrow, buttons, phone, and the left scrim are gone. The centre ignition mark, the skip control, and the gold cue remain. The header WhatsApp button still appears once the hero scrolls away. Copy is unchanged in `content/en/home.ts` and `content/ar/home.ts`. WhatsApp is still the primary action and must return when the design settles. This hold is not a decision to drop it.

## The missing logic

Three scenes were built. Only one of them is the idea.

The idea is a dark field and practical lights switching on in order. That exists at night, and partly at dusk. Day has no lamps. It is two photographs dissolving, which is why it had to be a plain crossfade. RKLT's stated hours are Sun–Thu 08:00–18:00 GMT+3, so a visitor in those hours always gets day: the version where the idea does not happen.

Night is the theme that stands out. Dusk is the only other candidate, because the sky still has colour and the lamps still read, but its lit plate is the soft 1280 image. Day should not survive a critique unless the critique can say what "lights coming on" means in sunlight without becoming a dissolve.

## What the next session does

Critique. Do not implement the mark below, and do not add a scene, until the critique is agreed.

1. Argue for one hero scene. The recommendation on the table is night, used at every hour. The theme toggle keeps running the rest of the site. Dusk may be argued as the single scene instead. Keeping all three needs a reason that survives the business-hours problem above.
2. Then critique the mark below. Change it where it fights the scene, the sequence, or the rules. Present one direction. At most one alternate. Stop.

## The mark to critique

The user wants the RKLT wordmark in the centre of the first screen, as an object in the scene rather than a title on top of it.

- It sits further back than the mountains, so the ridge is in front of it.
- R and K are fully visible, in the sky above the ridge.
- A bit of L and a bit of T stand behind the hills and are cut by the ridge.
- The letters are hollow or faded, not a solid white title. They should feel distant.
- It is the Latin mark in both languages. Do not mirror it in Arabic.

Feasible reading: one large wordmark centred on the horizon, RK clear in the sky, the ridge crossing the lower part of L and the right side of T. The mountains already occupy the right half of the frame, so a centred wordmark can meet them there. Confirm that against the actual ridge before placing it. Do not guess the overlap.

Keep it feasible by changing these, if the critique agrees:

- Paint it as an SVG or text layer over the plate, masked by the mountain silhouette. Do not bake it into the photograph. The plates will be replaced, and a baked word cannot fade or sit in depth.
- The mask is per scene only if more than one scene survives. One scene needs one mask.
- "Hollow or faded" is a treatment of that layer: a hairline or a low, even opacity. Not a second animation system.
- The mark that ignites at the start and then disappears is a different object. Decide whether the distant mark replaces it, or whether the ignition mark resolves into the distant one. Two RKLT marks on screen together fails.
- It stays `dir="ltr"`. Reduced motion shows the final occluded mark with no move. Phones crop the port toward x 0.72, so the overlap has to be checked at that crop, not only at 16:9.
- No new package. GSAP already owns the mark's opacity. The Three loop does not write it.

## Plates still missing

Night has no 4K pair. Dusk has no 4K lit plate. The other files in `art/hero-lights/source/` are a different 3:2 camera. The two "clone" files are duplicates of each other, and the two "enhance" files are duplicates of each other. None has a lights-off twin that registers, so none of them can join the sequence. A usable replacement is two frames of one unchanged composition, lights off and lights on.
