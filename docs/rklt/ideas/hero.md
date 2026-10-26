# hero

Status: approved and built. 8 Oct 2026, evening. Authority is `docs/rklt/specs/hero.md`. The Arabic headline still needs native review.

## Attention

The eye should land on one bleeding photograph, then on a single centered line, then on the terracotta button, then follow the signal stroke off the hero toward 30+.

## Animation

**The cut.** Tier 1. GSAP is the only writer of `clip-path` on the top still and of `stroke-dashoffset` on one path. CSS writes neither. The type column does not animate.

At `lg` and up, two columns. The start column is ink. "Sea, air, and land." is centered and stays on one line, with the tagline and the button row centered under it. The end column is the photograph, bleeding off the end edge and the top. Water or sky sits over the road still. The stroke draws down through the picture, the top still clips away, the road shows, and the stroke leaves the lower edge.

Below `lg`, the headline, tagline, and full-width buttons come first, then the photograph. Below `md` there is no pin. Touch scroll stays native. The stroke continues as a rail on the start edge.

Reduced motion: the road still is shown, the clip does not run, and the stroke is already drawn. The same headline, tagline, and buttons stay visible.

Arabic swaps the columns. The stills do not mirror.

Alternates:

- **The slot** lost because the clip ends on ink and the narrow picture cramps the centered line.
- **Three shutters** lost because three pictures bring the fatigue back, and Customs is a word with no picture.

## Visual

Two stills in the photograph column, not video. The top still is open water or open sky. The still under it is an empty road. The stroke is the cut between them.

In the frame: water or sky, then arid road, warm light. Out: vehicles, cranes, structures, logos, readable documents, faces, and 30+. Alt text does not call the frame Aqaba, the fleet, or staff.

Type sits in the ink column, never on the picture. WhatsApp stays in the button row. Night and day are separate still pairs.

Prompt: Two paired wide-angle atmospheric shots. First: an expansive deep blue open water surface. Second: a vast, empty desert highway cutting straight through arid terrain. Cinematic composition, deep warm sunlight, sharp shadows. No vehicles, no structures, no people.

## Text

| Slot | EN | AR | Max | Fact |
|---|---|---|---|---|
| `hero.headline` | Sea, air, and land. | البحر والجو والبر. | 28 / 24 | Sea, air, and land, trimmed from the live h1. Arabic needs native review. |
| `hero.tagline.1` | Million of miles. | أميال لا تُحصى. | 20 | Locked tagline |
| `hero.tagline.2` | Million of smiles. | ابتسامات لا تُعد. | 20 | Locked tagline |
| `hero.cta.primary` | Discuss your shipment | تحدث مع فريق الشحن | 24 | Live primary label |
| `hero.cta.secondary` | Explore all services | استكشف كافة الخدمات | 24 | Live secondary label |
| `hero.alt` | Sea, air, and land corridor atmosphere | أجواء ممرات بحرية وجوية وبرية. | 60 | Atmosphere only. Arabic needs native review. |

Off this frame: the four tabs, the mode sentences, the numerals, AQB, AMM, the subtitle, the eyebrow, and 30+.

An unused alternate headline is "Aqaba and Amman." / "العقبة وعمّان." It also needs native review. The crops already show sea, air, and land, so the card uses the service line.

## Critique

Animation, visual, and copy all picked The cut. The line slicing one photograph is the scroll-back. The slot ends on ink. Three shutters puts three pictures up and tires the eye again. Copy added that the short line only centers cleanly once it is one line, and that the buttons need the ink column so WhatsApp never sits on the picture.

## Critic

Pass, after one revision. The first version failed **Layout** in `docs/rklt/brief/tech.md` because the desktop hero was one stacked band. The revision is two columns at `lg`. Tier 1 is honest. No new package.

## Verdict

Approve The cut as the next hero direction: a bleeding photograph in the end column, a one-line centered headline in the ink column, and a signal stroke that reveals the road still and then leaves toward 30+. Approving this card changes the site path's hero exit, because the tabs, the mode sentences, and AQB / AMM leave the first screen. It also asks for new night and day still pairs, and for the shorter headline, whose Arabic needs native review. Approval does not replace `docs/rklt/specs/hero.md` or the live page until you ask to promote it.
