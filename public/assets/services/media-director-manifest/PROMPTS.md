# RKLT Media Director Manifest: Prompts & Dual-Skin Production Guide

## 1. Executive Strategic Guidance: Unified Video vs. Dual Decoder

### The Performance Reality
- **Browser Video Pipeline**: WebKit (Safari iOS/macOS) and Chromium enforce strict hardware video decoder limits (typically 2 to 3 active hardware decoders). 
- **The Pitfall of Dual Videos (Day vs. Night)**: Loading separate sets of 6 videos for Day and 6 videos for Night (12 video streams) triggers severe decoder thrashing, frame drops during rapid scrolling, and heavy battery drain on mobile devices.
- **The Solution (The Luxury Architectural Standard)**:
  1. **Videos (Motion MP4s)**: Maintain **ONE unified set of 9:16 vertical MP4s** graded in **Golden Hour / Warm Dusk Afternoon / High-Contrast Magic Hour**. Warm directional sunlight against steel containers and aircraft fuselages creates natural warmth that integrates seamlessly with both:
     - **Night Obsidian (`#0d0f12`)**: High dynamic range, deep shadows pop against dark background.
     - **Day Travertine (`#f4efe6`)**: Warm amber sunlight harmonizes with limestone sand tones.
  2. **Stills / Posters**: Can optionally use dedicated Day and Night photographic pairs, loaded via `<picture>` with zero CPU/GPU decoder penalty.

---

## 2. Motion Video Prompts for Added Subservices (Veo 2 / Omni / Sora)

### Service 05: Reefer & Cold-Chain Logistics (`reefer.mp4`)
- **Aspect Ratio**: `9:16` (Vertical, 1080x1920 or 2160x3840)
- **Target Filename**: `public/assets/services/reefer.mp4`
- **Duration**: 4 to 6 seconds seamless looping or slow motion
- **Prompt**:
  > **Cinematic 9:16 vertical video, 35mm master prime lens, 60fps.** A pristine modern white refrigerated semi-trailer truck with a front-mounted Thermo King refrigeration unit driving smoothly along an expansive desert mountain highway in Jordan during late golden hour dusk. The camera tracks smoothly from a low three-quarter angle. Faint, subtle cold vapor mist wisps quietly from the top aerodynamic vents into the dry desert air. A digital micro-LED temperature indicator on the unit glows subtly in cold ice-blue reading `-20°C`. Warm amber sunset light rakes across the clean, ribbed white metallic panels of the trailer. Deep navy mountain silhouettes and clear twilight sky in the background. Ultra-realistic commercial cinematography, 8k resolution, documentary industrial authenticity, zero synthetic AI distortion, zero fake HUD or text overlays.

---

### Service 06: Project Cargo & Heavy-Lift Freight (`project.mp4`)
- **Aspect Ratio**: `9:16` (Vertical, 1080x1920 or 2160x3840)
- **Target Filename**: `public/assets/services/project.mp4`
- **Duration**: 4 to 6 seconds seamless looping or slow motion
- **Prompt**:
  > **Cinematic 9:16 vertical video, anamorphic lens, 60fps.** An immense industrial gas turbine rotor mounted on a heavy-duty 12-axle Goldhofer hydraulic modular trailer being transported at a slow, controlled crawl through a rocky desert pass near Aqaba. The camera performs a slow cinematic pedestal tilt-up from the heavy multi-wheel bogies to the massive cylindrical steel machinery secured by heavy yellow tensioning chains and turnbuckles. An escort pilot truck in front flashes rhythmic amber strobe beacons reflecting off the asphalt. Soft dust kicks up gently around the rear axles. Late afternoon golden sunlight glints off the polished steel and industrial machinery. Photorealistic high-end commercial documentary, immense sense of weight and architectural scale, ultra-detailed mechanical textures, no synthetic AI artifacts, no cartoonish elements.

---

## 3. Dual-Skin Photo Prompts Catalog (Day vs. Night for Gemini / Imagen 3 / Nano Banana)

Use these prompts to generate matching pairs of stills with identical compositions, altering only the time of day and atmospheric lighting.

### 01 · Sea Freight & Ocean Cargo (`sea-day.jpg` / `sea-night.jpg`)
- **Day Prompt**:
  > **Architectural 9:16 vertical photograph, Hasselblad H6D-100c, 50mm lens.** A massive ultra-large container ship berthed at the Aqaba Container Terminal quay during bright, crystal-clear Mediterranean morning daylight. Giant red and white ship-to-shore gantry cranes tower overhead against a brilliant azure sky. Thousands of neatly stacked shipping containers in crisp maritime blue, terracotta, and evergreen. Turquoise Red Sea water gently lapping the concrete pier with sharp water reflections. Clean natural daylight, sharp architectural details, high-end commercial logistics photography.
- **Night / Dusk Prompt (Current live look)**:
  > **Architectural 9:16 vertical photograph, Hasselblad H6D-100c, 50mm lens, long exposure.** The stern and container stacks of an immense container ship berthed at the Port of Aqaba at deep twilight dusk. Warm golden floodlights along the quay illuminate the steel hull and container bays. High industrial gantry cranes silhouetted against a deep indigo twilight sky. Calm dark water reflecting amber and gold port lanterns.

---

### 02 · Air Freight & Cargo Charter (`air-day.jpg` / `air-night.jpg`)
- **Day Prompt**:
  > **Architectural 9:16 vertical photograph, 85mm lens, f/5.6.** A Boeing 777 freighter aircraft on the tarmac at Queen Alia International Airport Amman under crisp midday desert sunlight. The main deck cargo door is open with a heavy-duty hydraulic cargo high-loader elevating an air freight pallet covered in protective thermal foil. Ground crew in high-visibility vests coordinating loading. Clean concrete apron, distant desert hills under heat haze, bright realistic commercial aviation photography.
- **Night / Dusk Prompt (Current live look)**:
  > **Architectural 9:16 vertical photograph, 85mm lens, f/2.8.** A cargo freighter aircraft on the apron at Queen Alia International Airport at dusk. Cool xenon airport floodlights illuminate the aircraft fuselage and ground loading elevator. The glowing control tower in the deep navy distance. Warm interior cargo hold illumination contrasting against the twilight blue sky.

---

### 03 · In-Land Transport & Cross-Border Fleet (`land-day.jpg` / `land-night.jpg`)
- **Day Prompt**:
  > **Commercial 9:16 vertical photograph, 35mm lens, f/8.** A modern heavy-duty Mercedes-Benz Actros prime mover pulling a 40-foot shipping container traversing the desert highway between Aqaba and Amman. Bright clear morning sun illuminating the asphalt highway and red sandstone cliffs of Wadi Rum in the background. Crisp shadows under the wheels, clean highway perspective stretching to the horizon, ultra-sharp detail.
- **Night / Dusk Prompt (Current live look)**:
  > **Commercial 9:16 vertical photograph, 35mm lens, f/2.8.** A long-haul semi-truck moving at dusk along the desert highway, headlights cutting through twilight. Amber side-marker lights running along the trailer chassis. Red taillight trails in long exposure. Dark desert silhouettes under a purple and deep blue evening sky.

---

### 04 · Customs Clearance & Port Forwarding (`customs-day.jpg` / `customs-night.jpg`)
- **Day Prompt**:
  > **Documentary 9:16 vertical photograph, 50mm lens.** The modern customs checkpoint inspection gate at the Aqaba Special Economic Zone (ASEZA). Shipping container trucks passing through automated digital clearance canopies with overhead scanner gantries. Jordanian customs officers inspecting manifests on tablets. Bright natural sunlight casting clean geometric shadows on the concrete inspection bay.
- **Night / Dusk Prompt (Current live look)**:
  > **Documentary 9:16 vertical photograph, 50mm lens, f/2.0.** The customs gate and bonded warehouse terminal illuminated by industrial sodium and LED floodlights at night. Trucks lined up neatly under illuminated gantry booths. Rich amber and cobalt lighting contrast, reflective safety markings on barriers, professional logistics security atmosphere.

---

### 05 · Reefer & Cold-Chain Logistics (`reefer-day.jpg` / `reefer-night.jpg`)
- **Day Prompt**:
  > **Commercial 9:16 vertical photograph, 50mm lens.** A sparkling clean white refrigerated trailer parked at an elevated cold-storage loading dock during bright morning daylight. The dock shelter is sealed tightly against the trailer door to maintain the thermal envelope. Clean stainless steel refrigeration unit, bright Mediterranean sunlight, pristine pharmaceutical hygiene aesthetic.
- **Night / Dusk Prompt**:
  > **Commercial 9:16 vertical photograph, 50mm lens.** A refrigerated semi-trailer parked at dusk with cool blue LED lighting illuminating the temperature-control monitoring display. Amber sunset glow fading on the horizon, rich metallic textures, subtle condensation and frost detail on cooling valves.

---

### 06 · Project Cargo & Heavy Lift (`project-day.jpg` / `project-night.jpg`)
- **Day Prompt**:
  > **Industrial 9:16 vertical photograph, wide-angle 24mm tilt-shift lens.** A massive heavy-lift lowboy trailer transporting an oversized pre-fabricated industrial refinery column under bright daytime desert skies. Yellow hydraulic multi-axle modular transporters with multiple heavy wheels on clean desert tarmac. High contrast, monumental engineering scale, realistic industrial documentary.
- **Night / Dusk Prompt**:
  > **Industrial 9:16 vertical photograph, 35mm lens, f/2.8.** An oversized industrial transformer transport at dusk with safety escort vehicles, flashing amber warning beacons, and heavy spotlight illumination on the steel rigging chains. Rich twilight gradient in the background.

---

## 4. File Structure Recommendation

```
public/assets/services/
├── sea.mp4                  <- Unified high-contrast golden-hour/dusk video (single decoder)
├── air.mp4
├── land.mp4
├── customs.mp4
├── reefer.mp4               <- (To be generated using Prompt in Section 2)
├── project.mp4              <- (To be generated using Prompt in Section 2)
│
├── day/                     <- Optional dedicated daylight stills
│   ├── sea.jpg
│   ├── air.jpg
│   ├── land.jpg
│   ├── customs.jpg
│   ├── reefer.jpg
│   └── project.jpg
│
└── night/                   <- Dedicated dusk/night stills
    ├── sea.jpg
    ├── air.jpg
    ├── land.jpg
    ├── customs.jpg
    ├── reefer.jpg
    └── project.jpg
```
