# Spec: generated media pipeline

Status: archived 6 Oct 2026. Do not implement equirectangular plates. Hero media follows `docs/rklt/direction.md` and `docs/rklt/brief/tech.md`.

Parent: `docs/rklt/direction.md` (camera C, paired grades), `docs/rklt/specs/visual-system.md`, `docs/rklt/specs/motion-ownership.md`.

## Purpose

Define how AI stills and short loops are made, named, and shipped so the home world can use them as atmosphere. The camera is designed in Three.js. These files are the light and weather inside that camera.

Playback, pinning, and the shot list belong to `home-hero`. This spec stops at the files and the manifest.

## Chosen approach

| | Approach | Decision |
|---|---|---|
| A | One long 2D video per chapter, scrubbed to scroll | Rejected. No 360, and scrubbing `currentTime` is fragile. |
| B | A 360 MP4 as the world | Rejected for v1. Heavy, and hard to cut into chapters. |
| C | Equirectangular stills plus short looping plates, night and day authored separately | **Chosen.** The still is the place. The plate is weather. Scroll moves the camera. |

## Behavior

### What a chapter contains

V1 chapters, in order: `sea`, `air`, `land`, `handover`. `home-hero` may rename or drop one before files are generated. The pattern below stays.

Each chapter has a **night** grade and a **day** grade.

| Piece | Required | Role |
|---|---|---|
| World still | Night: yes. Day: yes, or the chapter stays night | Equirectangular picture the camera looks through |
| Mobile still | Yes, whenever the desktop still exists | Smaller derivative of that same frame |
| Loop plate | No | Steam, water, lights, distant traffic. Loops on its own clock |
| Poster | The world still | Shown until a plate is allowed to play |

If `day` is missing, day chrome still uses the night still for that chapter. Do not invert the night file.

### Camera contract for every still

- Projection is equirectangular, aspect **2:1**.
- The horizon sits on the vertical center of the frame.
- The forward view is the horizontal center. A day/night pair of the same chapter shares that forward view, so a theme change does not jump the yaw.
- The still has no baked-in camera move. Yaw, pitch, and dolly are applied later by GSAP.

### Plates

- A plate loops. It is not scrubbed to scroll.
- No audio track.
- It is either an equirectangular loop locked to the same horizon as its still, or a flat overlay (steam, dust, light leak) that does not pretend to be the world.
- Desktop may play one plate for the active chapter. Mobile plays at most one short plate for the whole home world, and only if that file is the mobile derivative. Otherwise mobile is still-only.
- Reduced motion never creates a video element.

### Look-dev order

1. Generate `sea` night and `sea` day stills. Stop for a visual check.
2. Generate the remaining stills as pairs.
3. Generate a plate only after the still for that chapter and skin is accepted.
4. Write derivatives and `public/world/manifest.json` last.

Runtime image generation inside the site is out. Files are committed assets.

### Manifest

`public/world/manifest.json` is the only index the later hero may read.

```json
{
  "chapters": [
    {
      "id": "sea",
      "alt": {
        "en": "Night port atmosphere, sea corridor",
        "ar": "أجواء ميناء ليلي، ممر بحري"
      },
      "night": {
        "still": "/world/sea/night/still.webp",
        "stillMobile": "/world/sea/night/still-mobile.webp",
        "plate": "/world/sea/night/plate.mp4"
      },
      "day": null
    }
  ]
}
```

- `plate` may be omitted.
- `day` may be `null`.
- `alt` describes atmosphere. It must not say the frame is a photograph of Aqaba, Queen Alia, the RKLT fleet, or RKLT staff.
- English and Arabic alts ship together. The world image is not mirrored for RTL.

### Generation checklist

Every accepted frame:

- Scale, weather, and infrastructure. Dusk, fog, sodium, or LED at night. Haze and high sun by day.
- No readable logos, port names, bills of lading, container codes, or competitor marks.
- No portrait and no face that could be taken as an RKLT employee. Distant silhouettes with no readable face are allowed.
- No smiling corporate group.
- No caption burned into the picture.

## Visual direction

The stills are the climate from lane B: a working corridor, not a brochure scene and not the boxed crane.

| Chapter | Place to suggest | Keep out of the frame |
|---|---|---|
| `sea` | Hull scale, water, cranes as distant mass, containers as rhythm | A hero crane toy, a logo on a box |
| `air` | Runway haze, belly of an aircraft, ground lights | Airline livery, readable tail numbers |
| `land` | Desert road, truck as scale, dust and heat | A branded fleet, a highway sign with words |
| `handover` | Dock light, paperwork-free threshold, a container meeting the ground | Documents with text, a handshake portrait |

Night and day of one chapter are the same place at two times. They are not two different art styles.

## Files and sizes

Root: `public/world/`. Do not put these files in `public/textures/` or `public/models/` (those belong to the crane prototype).

| File | Size | Budget |
|---|---|---|
| `{chapter}/{skin}/still.webp` | 4096×2048, sRGB | ≤ 800 KB |
| `{chapter}/{skin}/still-mobile.webp` | 2048×1024, sRGB | ≤ 250 KB |
| `{chapter}/{skin}/plate.mp4` | 2048×1024 equirectangular, or 1920×1080 flat | ≤ 2.5 MB, 4–8 s |
| `{chapter}/{skin}/plate-mobile.mp4` | 1280×640 or 1280×720 | ≤ 800 KB, only if a mobile plate is kept |

Video: H.264, `yuv420p`, `+faststart`, no audio, seamless loop. JPEG is allowed only if WebP cannot hold the still under budget. WebM-only and AV1-only are out for v1.

`skin` is `night` or `day`.

## Allowed files

Producing the library, when a later chat is told to generate assets, may add:

| Path | Allowed change |
|---|---|
| `public/world/**` | Stills, plates, manifest |
| `docs/rklt/specs/generated-media-pipeline.md` | This spec |
| `docs/rklt/status.md` | Status line |

Do not, under this spec:

- Build the Three.js scene or wire GSAP.
- Edit `components/3d-experience/**`.
- Change pages, copy, metadata, or theme tokens.
- Add an npm dependency or an AI SDK key to the repo.

## Dependencies

No new packages. Encoding can happen outside the app. The site will later load the manifest and the files with Three.js textures and a muted video element, which are already available.

## Mobile

- Use `still-mobile.webp`.
- Do not download the 4096 still or a desktop plate on a narrow viewport.
- At most one mobile plate for the home world. If it is missing, show the mobile still.
- Prefers a single still when the device is on a tight data budget (`saveData` or a later low tier).

## Reduced motion

- Serve the still for the active skin (or the night still if day is missing).
- Do not set `autoplay`. Do not attach a video texture.
- The still does not pan.

## Acceptance checks

1. `public/world/manifest.json` lists only chapters that have a night still at 2:1, horizon on center.
2. Each day still shares the forward center of its night pair, or `day` is `null`.
3. Desktop stills are ≤ 800 KB and mobile stills ≤ 250 KB.
4. Any plate is H.264, silent, 4–8 seconds, and under its budget.
5. A review of the frames finds no readable logo, document, port name, or identifiable face presented as staff.
6. Manifest `alt` strings do not claim the image is a real RKLT or Aqaba photograph.
7. The reduced-motion and mobile paths can be satisfied from the manifest without the desktop video.
8. No crane-prototype texture is reused as a world plate.

## Exclusions

- Hero layout, camera keys, and pin lengths (`home-hero`).
- Scrubbing video as the playhead.
- A full 360 MP4 as the world.
- Runtime generation, and API keys in the repository.
- Inner-page posters (those pages get stills in their own specs).
- Lottie, stock libraries presented as proof, and CSS invert of a night plate.
- Implementation of the player in this planning session.

## Next spec

`home-hero`, after approval. Not started here.
