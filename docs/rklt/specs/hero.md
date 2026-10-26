# Spec: hero

Status: live first screen as of 11 Oct 2026. Replaces The cut.

Parent: `docs/rklt/direction.md`. `docs/rklt/specs/home-first-screen.md` stays the record of the 6 Oct desk.

## Purpose

One full-screen frame. The huge line is the modes. A terracotta band under it says the job. A container cutout crosses the line once and stops.

## Behavior

The field is ink. The headline is centered and huge. The existing tagline sits small under it, two lines. Nothing in the type animates.

The container is a transparent cutout with its shadow in the file. On a wide screen it is about 70% of the viewport width and crosses the middle of the headline. CSS sets `top`, `left`, `margin-left`, and width only. GSAP is the only writer of `transform` on that node. It drops from above the screen to that rest, once, about 1.25 seconds, `power3.out`.

Below `md` the container is already at rest. No pin. Touch scroll stays native.

`prefers-reduced-motion: reduce` shows the finished frame and does not tween.

Arabic changes alignment only. The cutout does not mirror. In RTL the travel starts from the inline-start edge.

Night and day are separate files. Do not invert one grade into the other.

| Skin | Cutout |
|---|---|
| Day | `/assets/hero/container-day.png` |
| Night | `/assets/hero/container-night.png` |

Alt text is atmosphere. It does not say the frame is Aqaba, the fleet, or staff.

The band is terracotta. The sentence is centered. Both buttons are full width inside a narrow stack so each label stays one line. The WhatsApp button uses an ink fill so it stays readable on terracotta. The services button opens `/{locale}/services`.

## Words

| Locale | Headline | Band |
|---|---|---|
| en | Sea, air, and land. | Freight through Aqaba and Amman. |
| ar | البحر والجو والبر. | شحن عبر العقبة وعمّان. |

The Arabic headline and the Arabic band need native review. The tagline and both button labels stay as they were, including the live Arabic primary label. The hero WhatsApp message is unchanged.

The mode tabs, mode sentences, numerals, and AQB / AMM are off this screen. 30+ stays in credibility.

## Allowed files

`components/sections/home/HeroSection.tsx`, `components/sections/home/useHeroCargo.ts`, `content/en/home.ts`, `content/ar/home.ts`, `public/assets/hero/container-day.png`, `public/assets/hero/container-night.png`, and the docs this build updates.

## Acceptance checks

1. `/en` and `/ar` show one frame, not two columns. The headline is the short line above. The tagline is the existing two lines.
2. The band sentence is the table above. The primary button is the live label, ink on terracotta.
3. The services button opens `/{locale}/services`. There are no mode tabs.
4. At `md` and up, the container drops from above the headline, crosses it, and stops. CSS does not set `transform` on that node.
5. Below `md`, and under reduced motion, the container is already at rest.
6. Arabic does not mirror the cutout.
7. `30+` is not on this screen.
