# RKLT design references

Planning only. No application changes. Inspected 5 Oct 2026.

This file records live references and three directions. On 5 Oct 2026 the user approved direction 1. `docs/rklt/direction.md` now matches that approval. The climate camera in direction 2 is retired.

## Brief

Verified from `content/en/home.ts`, `content/en/services.ts`, `content/en/about.ts`, `content/en/contact.ts`, `content/site.ts`, and `components/sections/home/HeroSection.tsx`.

| Fact | Source |
|---|---|
| Legal name | ربوع الخير لنقل وشحن البضائع. Public brand: RKLT. |
| Job | Freight forwarding: sea (FCL, LCL, reefer), air via Queen Alia (AMM), inland and cross-border road, customs brokerage. Extended catalog includes charter, project and heavy-lift, cold chain, consultancy. |
| Places named in copy | Amman desk, Port of Aqaba / Aqaba Container Terminal, Queen Alia, GCC and Levant corridors, Red Sea and Mediterranean lanes, Asia origins, air links named as Frankfurt, Dubai, London, Chicago. |
| Buyer the copy implies | A company that needs a shipment quoted and moved. Contact is a person: WhatsApp and phone `+962 7 9532 0624`, email `operations@rklt.ltd`. There is no web quote form. |
| Proof the site is allowed to show | 30+ years, licensed Jordanian brokerage, Chamber registration, maritime forwarding at ACT. License numbers are offered on request, not printed. |
| Locales | `en` and `ar`. Fonts already loaded: Archivo, Big Shoulders Display, Cairo. |
| Stack already installed | Next 14, Tailwind, GSAP 3.12, Three 0.160. No Motion, Lenis, Lottie, or R3F. |

The current English hero headline is “Million of miles. / Million of smiles.” The sentence that names the job sits in the subtitle: “RKLT moves cargo across sea, air, and land…” Primary action is a WhatsApp link labeled “Discuss your shipment.” The right column is a bordered photo card (`/assets/rklt-hero.jpg`) with a “30+” numeral and a terracotta “Trusted Handover” stamp. A separate Three.js crane scene exists behind `ENABLE_3D_EXPERIENCE`. `direction.md` already marks that crane as out.

Assumptions, not verified claims: the first-time visitor is an importer, exporter, or project shipper comparing Jordanian forwarders, often on a phone, and the successful visit ends in a WhatsApp or phone conversation with origin, destination, and cargo ready. The site does not name client industries the way a competitor does. Do not invent them.

## How the references were viewed

Desktop was the browser window. Phone checks used a 390×844 CSS viewport. Captured screenshots of that layout were often a narrow column inside a wider window; width was confirmed with `document.documentElement.clientWidth === 390` on MASA, SkyCargo, and the earth map. One interaction was attempted on each site. Pages that did not open are listed under uncertainties. No conversion rates or load times were measured.

## Comparison

| Site | Role | What was inspected | Useful decision | Decision to leave behind |
|---|---|---|---|---|
| [MASA Logistics](https://masalogisticsltd.com/) | Similar: Jordan forwarder, Amman and Aqaba | Home, services menu, 390px home | The H1 names the trade and the subtitle names sea, air, land, customs, and warehouses in one sentence | The services menu covers the headline, and the nav lists more lanes than a first visit can use |
| [Flexport](https://www.flexport.com/) | Similar: ocean, air, trucking, customs | Home hero, services menu, trust band, 390px hero | A five-column services menu separates forwarding from a software product | The hero is an email field plus a fake signed-in dashboard (“Hello, Thomas!”) and a chat panel covers both on a phone |
| [deugro](https://deugro.com/) | Similar: project and heavy-lift forwarding | Home, `/services/`, mobile menu | A full-bleed photograph of an actual move (wind components; later a module on the vessel Rotra Vente) with three actions: Tracking, Contact, Newsletter | The H1 is “designed. delivered. deugro.” The forwarding sentence starts under the photograph. On a phone the round buttons sit on the first paragraph |
| [APM Terminals Aqaba](https://www.apmterminals.com/en/aqaba) | Adjacent: the terminal RKLT’s copy names | Terminal home, vessel schedule, 390px schedule | Track & Trace (import availability, export booking, vessel schedule) is the first tool, not a slogan | Two navigation bars, a logo collage, and a 51-row table. At 390px the table becomes “Swipe Left for Global Navigation” |
| [Emirates SkyCargo](https://www.skycargo.com/) | Adjacent: air cargo, including pharma and fresh | Home hero, service-card row, fleet block, 390px fleet block | Five tasks in one row: Track, Flight Schedule, Check Availability, Fuel Index, Portal Login | The first screen is a “10 years of pharma” campaign. Track Now could not be clicked because the sticky header covered the link |
| [earth.nullschool.net](https://earth.nullschool.net/) | Unconventional: a climate instrument | Globe, control menu, Ocean mode, 390px | The page is the instrument: date, source, scale, and a mode change from Air/Wind to Ocean/Currents | At 390px the control panel covers the map. Labels are `hPa`, `HTSGW`, `SSTA`. There is no sentence for a shipper |

## References

### 1. MASA Logistics — similar service

URL: https://masalogisticsltd.com/

Views: desktop home; services menu opened; phone home at 390px. Arabic and Chinese are in the language control. Those locales were not opened.

The H1 is “Global Freight Forwarding — Engineered Around Your Business.” The paragraph under it says sea, air, and land, in-house customs, and the company’s own consolidation warehouses. A line map marks Jordan, Saudi Arabia, UAE, China, and the USA. Chips read Air, Sea, Land, Projects, Customs. Further down, the page names who it ships for (importers, e-commerce sellers, manufacturers, automotive parts, construction) and prints registration numbers, including Companies Control Department No. 73052 and ISO 9001 certificate JO62549A. Those numbers are MASA’s, not a pattern RKLT can copy without its own documents.

The services menu is a two-column list (Freight, Transit, Specialized, Import & Export) that covers the H1 and the map while it is open. At 390px the headline, quote button, and mode chips stack, the map leaves the first screen, and a green WhatsApp button sits on the chips. An “Open menu” button and a language pill are in the header. The menu itself was not opened on the phone.

Adapt the first sentence and the named corridor. Avoid the menu that hides the sentence, and avoid printing a client-type list RKLT has not verified.

### 2. Flexport — similar service

URL: https://www.flexport.com/

Views: desktop home; services menu; a scroll into the trust band; phone hero at 390px. Cookies were accepted so the menu could be opened. The tracking portal behind Sign in was not entered.

The H1 is “AI-powered logistics for the real world,” over a photograph of a container ship. The action is “Enter your email” and “Request a demo.” Under that, a product frame shows “Hello, Thomas!”, “766” shipments, and a map with aircraft markers. The services menu is five labeled columns: Technology, Customs, Freight Forwarding, Financial Services, Fulfillment. Ocean, air, and trucking sit in the forwarding column, separate from the software.

On the trust band, the heading “Trusted by the world’s leading brands” was faint when the screenshot was taken, consistent with a fade still in progress. A chat panel (“Hi there. How can we help you today?”) covered the lower right. At 390px that same panel covers the headline, the email field, and the demo button. A “766” count is only partly visible underneath. The promo line “2026 Fall Technology Release” wraps so that “Watch” is cut.

Adapt the separation of “what we move” from “the tool you log into.” RKLT has no portal to demo and no permission to invent a signed-in shipment count. Avoid an email gate. The existing conversion is WhatsApp and the phone number.

### 3. deugro — similar service

URL: https://deugro.com/ and https://deugro.com/services/

Views: desktop home; services page reached from the nav; phone home; phone menu opened.

The home H1 is “designed. delivered. deugro.” set in white on an aerial of wind-turbine sections on trailers. The paragraph that says “freight forwarding and project logistics” begins below the image. Three pills — Tracking, Contact, Newsletter — sit on the bottom edge. Services is a real URL. Its header photograph is a heavy module on a vessel with “ROTRA VENTE” readable on the hull, and the page is a grid of blue tiles: Project Freight Forwarding, Air Freight, Ocean Freight, and others. The home photograph and the services photograph are different frames. An autoplaying carousel on the home page was not confirmed.

At 390px the photograph crops to a square, the three pills become circles overlapping the first lines of body copy, and a cookie control covers the second paragraph. The menu button switches to a close icon. Company and Services are black type (`rgb(0, 0, 0)`) on a transparent background, positioned over the photograph, with child items collapsed behind “Expand child menu.”

Adapt one photograph of a move, with the service name in the same view as the picture. Avoid a brand line that withholds “freight forwarding” until the next block, and avoid floating buttons that land on the paragraph. deugro can show project photography because that is the work it publishes. RKLT must not caption a generated frame as an RKLT operation.

### 4. APM Terminals Aqaba — adjacent

URL: https://www.apmterminals.com/en/aqaba and https://www.apmterminals.com/track-and-trace/vessel-schedule?terminal=JOAQJ

Views: terminal home; cookie banner dismissed with “Essential only”; Vessel Schedule opened; phone view of that schedule.

The home has two bars: a global APM Terminals bar (Select Location, Global Menu, Login) and a local bar (My Dashboard, About Us, Services, E-Tools, Practical Information, Procurement, News Room, Contact, search, English). The first content is a crane photograph, the ACT logo, and a Track & Trace card with Import availability, Export Booking Enquiry, and Vessel Schedule. A second photograph has the Levant paragraph overlaid on it. There is no single marketing H1 in that first screen.

Vessel Schedule is a filter (Africa & Middle East, Jordan, Aqaba Container Terminal) and a table titled “Vessel Schedule (51).” Columns include vessel name, status, scheduled arrival, arrival time, scheduled departure, departure time, cargo cutoff, reefer cutoff, hazardous cutoff, and berth. Actual times are orange pills and estimated times are blue pills. Rows visible were already “Closed,” including CSPC JUPITER and KOTA SABAS. Those figures belong to the terminal. They are not RKLT volumes.

At 390px the filters stack, a vertical “Take our Survey” tab overlaps them, and the table is replaced by the line “Swipe Left for Global Navigation.” The colour legend is clipped.

Adapt a short list of tasks a shipper can finish: call, WhatsApp, and the four facts to have ready (origin, cargo, mode, special requirements), which `content/en/contact.ts` already lists. Avoid a vessel grid. RKLT does not operate the terminal system, and the grid does not survive a phone.

### 5. Emirates SkyCargo — adjacent

URL: https://www.skycargo.com/

Views: desktop hero; scroll to the service-card row and the fleet block; phone view of the fleet block at 390px. Track Now was not opened. The network map was present in the accessibility tree (station search, zoom, and more than 150 buttons named only “Marker”) and was not in the viewport that was captured.

The hero is a Dubai skyline, a freighter, and the campaign “10 years of pharma / 1 million+ shipments through Dubai,” with a red Learn More button. Under it, five cards: Track Shipments, Flight Schedule, Check Availability, Fuel Index, Portal Login. The next block is a 777 photograph beside “Our Fleet,” with a claim of 260 wide-bodied aircraft and 12 freighters. The page exposes several level-1 headings (Shipping Services, Why Emirates SkyCargo, Latest News, Our Global Network).

A click on Track Now was intercepted by a span in the sticky header. At 390px the fleet photograph and the “Our Fleet” copy stack in one card, which is readable. The five tasks remain a horizontal strip; in the captured scroll position only “Track Now” and “Plan Now” were visible at the top edge.

Adapt the idea that tracking, schedules, and contact are peer actions, not five products. RKLT’s peer actions are already WhatsApp, phone, and email. Avoid a campaign statistic (“1 million+ shipments”) and avoid a map of stations RKLT does not staff. The accessibility name “Marker” on every pin is a reason not to ship an unlabeled map.

### 6. earth.nullschool.net — unconventional

URL: https://earth.nullschool.net/

Views: desktop globe; menu opened; Ocean mode selected; phone view at 390px after that mode change.

The first screen is a globe on black, with particle animation running and a single control, “earth,” at the lower left. Opening it shows Date (2026-10-05), Data, Source, a colour scale, and rows for Control, Mode, Animate, Height, Overlay, and Projection. Projection includes Orthographic and Equirectangular. Air / Wind / Surface was selected. Choosing Ocean changed the mode tab immediately, showed “Downloading…,” and left the data line on “Wind @ Surface” until the new field arrived. The later phone view read “Ocean Currents @ 5 m below Surface,” source “Global Ocean Physics Analysis and Forecast / CMEMS.”

At 390px the globe is a corner crop (the eastern Mediterranean and the Red Sea were in frame) and the control panel covers the rest. Abbreviations in that panel include `hPa`, `HTSGW`, `SSTA`, and `BAA`.

Adapt the discipline of one live value with its source and its scale, and a mode switch that changes the picture. Reject the globe as the page. A shipper who needs Aqaba to Amman cannot act on hectopascals, and the phone layout spends the screen on the controls.

## Three directions

Shared constraints for all three: keep the routes, the verified copy, WhatsApp and phone as the conversion, EN/AR, and the installed stack. Do not add a package. Do not invent clients, tonnage, or a portal. Generated pictures stay atmosphere, not evidence.

### 1. Corridor desk — recommended

Influences: MASA’s first sentence and named lanes; ACT’s short task list; SkyCargo’s row of peer actions, reduced to the three channels RKLT actually has.

Hero: one screen, type on the left, a still on the right. The H1 states the job and the place in the existing words, for example the subtitle’s “sea, air, and land” plus Amman and Aqaba, instead of leading with “Million of miles. Million of smiles.” That tagline can remain as a secondary line if the copy is not being rewritten. Four chips — Sea, Air, Land, Customs — match the four core services and the anchors already on `/services`. The primary button stays “Discuss your shipment” to WhatsApp. The secondary button stays “Explore all services.”

Typography: Archivo for the sentence, Big Shoulders for `01–04`, `AQB`, `AMM`, and `30+`, Cairo for Arabic. The current terracotta-on-ink pairing stays. No new face.

Section sequence, same blocks as the current home: hero, credibility (30+ and the four values), four service teasers, the four-step handover, heritage, coverage codes, contact band. The services page stays a catalog with the existing anchors. Contact stays channels, hubs, the four quote facts, and the FAQ.

Signature interaction: choosing Sea, Air, Land, or Customs swaps the still, the one-line description, and the anchor. One property moves. CSS handles the swap. GSAP is only needed if the swap must be a timed sequence. The Three crane does not participate.

Mobile: the same stack at 390px, buttons full width, chips that wrap instead of a horizontal strip, WhatsApp in the button row rather than a floating control on top of the chips. The still can drop below the buttons or be omitted. Reduced motion: no crossfade.

Implementation cost: low. It is a composition change in the existing hero and section components, plus stills. No new dependency.

Performance risks: four hero images if all are eager. Load the first, and the other three on selection. The current hover scale on `rklt-hero.jpg` (`duration-700`) should not also be animated by GSAP.

Strongest trade-off: the page will read as a desk, not as a film. Distinctiveness has to come from the numerals, the corridor codes, and the ink/sand/terracotta field. A generic gold-on-cream layout like MASA’s would erase that. The locked climate camera in `direction.md` would be dropped as the homepage structure.

### 2. Climate camera

Influences: deugro’s full-bleed photograph of a move; earth.nullschool’s mode switch and its refusal to put a brochure column beside the picture. This is the direction already locked in `direction.md` (lane B, camera C).

Hero: a full-viewport still or equirectangular plate, type and `AQB` / `30+` as an overlay, a scrim under the type. Chapters for sea, air, land, and handover move the camera. The crane scene stays retired.

Typography: the same three families. Big Shoulders is the instrument. Body type does not sit on the plate without the scrim. deugro’s white H1 works on a dark hull and fails when the photograph is pale; the scrim is the fix.

Section sequence: the same six home sections after the world, restyled to the same field so the page does not change websites under the hero. Inner pages use a still and type, not a second camera. That split is already in the specs.

Signature interaction: scroll moves yaw, pitch, or dolly through GSAP ScrollTrigger into the Three camera. Pointer orbit stays off while a chapter is pinned. One playhead.

Mobile: one still, no camera move, no video, as the hero spec already says for viewports below `md`. Reduced motion: the same locked still. The earth map at 390px is the caution: a control layer plus a world does not both fit.

Implementation cost: high. New plates, a new hero composition, and a scroll timeline. The installed Three and GSAP can do it. A 360 video file is not required for this direction and should not be added.

Performance risks: a pinned scroll plus a video texture plus a React state update of the same camera will stutter. Plates must be sized for the viewport. Generating frames and captioning them as Aqaba or as staff is the brand risk already written in `direction.md`.

Strongest trade-off: the world can be remembered and still fail the first question. deugro’s H1 never says freight forwarding. earth.nullschool never says what to do. If this direction stays, the overlay sentence has to do MASA’s job in the first screen, and the camera must not run on the phone.

### 3. Manifest timetable — unconventional

Influences: ACT’s schedule, stripped to rows RKLT can stand behind; earth.nullschool’s labeled reading (value, source, unit) applied to a handover rather than to weather.

Hero: no photograph as the main object. The first screen is a four-row manifest using the existing steps in `home.ts`: 01 Route & Spec Consultation, 02 Documentation & Pre-Clearance, 03 Multimodal Movement, 04 Direct Delivery & Handover. Each row has a code (`AQB`, `AMM`, `GCC`), a one-line action, and the WhatsApp button aligned to the row the visitor is asking about. Coverage hubs already use those codes.

Typography: Big Shoulders for the step index and the codes, Archivo for the action, Cairo in Arabic. The page should look like a document on the sand field, with ink rules, not like a dashboard widget.

Section sequence: manifest hero, then the four service rows (sea, air, land, customs) as the same kind of row, then values, then the heritage timeline that already exists on About, then contact. The photo card and the crane both leave the hero.

Signature interaction: the active row expands the sentence and shows the matching contact fact (what to have ready). CSS grid and one GSAP height tween, or CSS only. No map, no particle field, no live vessel feed.

Mobile: each step is already a row, so it does not need the ACT pattern of swiping a 12-column table. The phone page is a list. Reduced motion: rows are open or static, not animated.

Implementation cost: low to medium. Mostly layout and type in the current sections. The risk is content, not WebGL: a row that implies a live cutoff time would be false, because RKLT does not publish a vessel schedule.

Performance risks: small, unless someone later embeds the ACT table or a map. Do not.

Strongest trade-off: a visitor who expected a logistics photograph gets a document. That is distinctive next to MASA’s globe and deugro’s aerial, and it is easy to maintain. It will feel austere if the only colour is a spreadsheet grid. Terracotta is reserved for the WhatsApp row and the current step, or the page becomes a form.

## Recommendation

Approved 5 Oct 2026. Direction 1 is the lock. See `docs/rklt/direction.md`.

The first screen has to answer who the company moves cargo for and how to start, because that is the gap in the current H1 and the failure shared by deugro’s slogan, Flexport’s demo account, and SkyCargo’s pharma campaign. MASA puts the job in the first paragraph and names Amman, Aqaba, and the modes. RKLT can do that with copy it already has, the four anchors it already has, and the WhatsApp button it already has.

Direction 2 is the more distinctive picture and the one already locked. It costs a plate pipeline and a scroll camera, and the references that pursue that picture postpone the sentence. Direction 3 is the cheapest distinctive system and the one least likely to be mistaken for a template, and it asks a shipper to read a document before seeing a place.

The trade-off of the recommendation: RKLT will not have a scroll-driven world as the signature. The identity has to be carried by type, codes, and one still that changes with the mode. If that is too close to a brochure, the revision is direction 2 with MASA’s sentence locked to the first screen and the camera forbidden below the `md` breakpoint — not a fourth concept.

## Uncertainties

- The live domain was not opened in the browser. The current-site description is from the repository components and content.
- MASA’s Arabic and Chinese pages were not opened. RTL behaviour of the references is unverified. RKLT’s own Arabic layout was not re-checked in a browser for this pass.
- Flexport’s logo row was captured mid-fade. The settled state of that band was not recorded.
- deugro’s change of photograph between home and `/services/` was observed. A timed carousel on the home page was not confirmed.
- SkyCargo’s Track Now click was blocked by the sticky header. The tracking tool was not inspected. The network map was not in the captured viewport.
- earth.nullschool’s Ocean click updated the controls before the data line. Frame rate and payload were not measured.
- ACT’s TEU headlines and vessel rows are the terminal’s published operations. They are not available as RKLT proof.
- No reference’s traffic, conversion, or speed claims are repeated here as facts.

## Decisions

1. Approved. Direction 1 replaces the camera lock in `docs/rklt/direction.md`.
2. Approved. The hero leads with the job and the place. “Million of miles. Million of smiles.” is the secondary line.
3. Open. License numbers stay unprinted until a real number is supplied.
4. Approved as structure. One still per mode. Until those stills exist, the current hero photo is the fallback. Generated frames stay unlabeled as real operations.
