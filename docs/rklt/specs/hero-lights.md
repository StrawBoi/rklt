# Home hero: word behind the plate

Status: live first screen as of 14 Oct 2026. Supersedes the traveling word and the lamp sequence.

## The moment

A first visit opens on the field and the word alone. RKLT is the same shipment-button gold on both plates. The hero is one screen tall in both languages, and the photograph covers it from the top. The three lines sit under the day word, which is the lower of the two, and above the two buttons. “Freight forwarding” and “Sea, Air & Land” are the large lines, in Archivo Display at extrabold. Arabic uses Cairo, larger than the Latin lines, with an open line-height, in that same band, on a quiet grey panel. The color is cream `#F4F1EA`, full strength, on both plates. “Request a quote” opens WhatsApp. “Discover our services” scrolls to the services block, the section after the credibility strip. Each button is solid gold until a diagonal between 65% and 75%, then hollow. Hover fills the hollow side with that same gold, a deeper body under a light sheen, so the button becomes one colour. Reduced motion fills it at once. A bright gold rule under the letters fills as the active plate and its cut decode, then stays. Sky and port fade in together, about 700ms, the port still covering the lower edge. The header and the buttons arrive with the picture. Escape or Skip finishes at once. A later visit in the same browser, and reduced motion, open on the finished plate with the rule already there. As the page scrolls, the hero holds for one screen. The photograph eases upward as one image, and the next section rises over it until the photograph is covered. The letters stay inside the photograph. On a phone the drift is shorter. Reduced motion skips the hold. The three lines are the page heading.

## Scenes

The theme toggle picks the plate (`data-theme` on `html`). There is no clock.

| Theme | Plate |
|---|---|
| day | Design 3, `public/assets/hero/plates/day.jpg` |
| night | The evening photograph, `public/assets/hero/plates/evening.jpg` |

The evening master is 6144×4096. The crop keeps the horizon with Design 3. Neither plate has a lights-off twin, so the lamp sequence does not run. Plates are atmosphere. Alt text names objects, never an RKLT operation or Aqaba.

## The word

- Four letters, `dir="ltr"` in both languages, then the same gold triangle as the header mark. Both plates use the same gold sheen, `#e8c56a` to `#e2b34a` to `#c4922e`. Weight 800, a little tracking. A tight shadow, `drop-shadow(0 1px 2px rgba(6, 16, 42, 0.55))`, sits around the letters and the triangle. No rim, no second copy.
- On a first visit the line is drawn one stroke at a time, then the letters and the triangle fill the same color, so the line disappears into the letter. The night word is higher than the day word so the port hides the same part of the letters on both plates.
- The signature is one solid rule, `#e2b34a`, the width of the letters, sitting just under them. On a first visit GSAP draws it with `scaleX` while the letters and the triangle fill. After that the logo is already complete. The port covers it where the port covers the letters.
- The foreground cuts are `day-fore.png` and `evening-fore.png`. They share the plate's crop, so the phone position (`72% 50%` below 768px) still lines up.
- No fade on the word itself. On scroll the photograph eases upward as one image, sky plate and port cut together, and the letters stay inside it. The next section covers that picture over one screen. Reduced motion does not hold or drift.
- First visit is `data-rklt-intro="hold"`, set before paint when `rklt-hero-seen` is absent and motion is allowed. GSAP then fades `.rklt-hero-still` and `.rklt-hero-fore` together. CSS holds the header and `.rklt-hero-actions` and brings them back when the hold ends. CSS does not transition the plate opacity.
- Reduced motion and every later visit show the finished plate immediately, including the rule. The same four letters stay in frame on the phone crop.
- The header's own RKLT is hidden while the header sits over the hero.
- The next section is unchanged. The word does not park beside `30+`.

## Ownership

- CSS: the plate images, the word's place, color, and shadow, the hidden start of the plate and the cut, and the header-word hide. CSS does not transition the plate opacity.
- `useHeroArrival`: stroke dash, then fill, of each `.rklt-hero-cut`. The stroke ends the same color as the fill. scaleX of `.rklt-hero-rule-fill`, then opacity of `.rklt-hero-still` and `.rklt-hero-fore`. It does not write the shadow, the header, the buttons, or the scroll transforms.
- `useHeroScroll`: transform of `.rklt-hero-plate` while the hold is on screen. The sky and the port cut share that element. It does not write the letters on their own, or opacity.
- `useCredibilityMotion`: the gold thread and the credibility reveal. It does not touch the word.
