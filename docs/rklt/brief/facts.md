# Facts

Source of truth for copy and claims. Drawn from `content/site.ts` and the English page files on 6 Oct 2026. Reuse these. Do not extend them.

Arabic strings below are the ones already in the repo. The Arabic headline has not had a separate editorial review (`docs/rklt/status.md`).

## Identity

| Fact | Value | Source |
|---|---|---|
| Brand | RKLT | `content/site.ts` |
| Legal name | ربوع الخير لنقل وشحن البضائع | `content/site.ts` |
| English tagline | Million of miles. Million of smiles. | `content/site.ts` |
| Arabic tagline | أميال لا تُحصى. ابتسامات لا تُعد. | `content/site.ts` |
| Sub-tagline EN / AR | From your place. To any place. / من مكانك إلى أي مكان. | `content/site.ts` |
| Years | 30+ (number 30) | `content/site.ts` |
| Bases | Amman and Aqaba, Jordan | `content/site.ts` |

Home `h1` as shipped on 11 Oct 2026:

- EN: Sea, air, and land.
- AR: البحر والجو والبر. The Arabic line needs native review.

Band under that line, same date:

- EN: Freight through Aqaba and Amman.
- AR: شحن عبر العقبة وعمّان. The Arabic band needs native review.

The longer lines “Sea, air, and land through Aqaba and Amman.” and “البحر والجو والبر عبر العقبة وعمّان.” were the h1 until 8 Oct 2026.

## Contact

| Channel | Value |
|---|---|
| Phone / WhatsApp | +962 7 9532 0624 |
| Operations email | operations@rklt.ltd |
| General email | info@rklt.ltd |
| Hours | Sunday – Thursday, 8:00 AM – 6:00 PM (GMT+3) |
| Emergency line in copy | 24/7 cargo monitoring and emergency response |

WhatsApp text is split in the repo. Do not invent a third wording.

- Home hero (`HeroSection`): EN “Hello RKLT team, I would like to inquire about cargo shipping.” AR “مرحباً ربوع الخير، أرغب في الاستفسار عن خدمات الشحن والنقل.”
- Header, footer, mobile nav, contact: `siteConfig.whatsappDefaultMsgEn` / `Ar` (“freight shipping services” / “مرحباً فريق ربوع الخير، أود الاستفسار عن خدمات الشحن والنقل.”).

Primary button label: “Discuss your shipment”. Secondary: “Explore all services”.

## What the business says it does

Freight forwarding across four pillars. Names and anchors already on the site:

| Order | id | EN | AR control | Code |
|---|---|---|---|---|
| 01 | sea | Sea freight. FCL, LCL, reefer, through Aqaba and ocean lanes. | الشحن البحري | AQB |
| 02 | air | Air freight through Queen Alia International Airport (AMM) and global hubs. | الشحن الجوي | AMM |
| 03 | land | In-land transport and cross-border trucking across Jordan into the GCC and Levant. | الشحن البري | none |
| 04 | customs | Customs clearance and brokerage. | التخليص الجمركي | none |

Extended offers already listed, numerals 05–13: chartering, container logistics, reefer and cold chain, project and heavy-lift, dedicated trailers, intermodal, marine consultancy, technical asset management, digital cargo coordination. Wording lives in `content/en/services.ts`. Do not add a fourteenth.

Handover steps already on the home page: route and spec consultation, documentation and pre-clearance, multimodal movement, direct delivery and handover.

Values: Reliability, Speed, Safety, Professionalism.

## Places already named

Do not add ports, borders, or airlines that are not in this list.

- Jordan: Aqaba Port, Aqaba Container Terminal, Amman, Zarqa Free Zone, Irbid, Queen Alia International Airport.
- Overland: Saudi Arabia, UAE, Kuwait, Iraq; borders named in contact copy as Omari / Haditha and Karameh / Trebil.
- Sea lanes named in contact copy: Jeddah, Port Said, Piraeus, Genoa, and European ports; Asia calls named as Shanghai, Ningbo, Singapore, Mumbai.
- Air calls named in contact copy: Frankfurt, Dubai, London, Chicago.
- Coverage codes on the home page: AQB, AMM, GCC, GLB.

## Claims already printed

These sentences exist. Quote or shorten them. Do not add numbers, client names, or stronger guarantees.

- Heritage “since the 1990s” and the timeline periods 1990s, 2000s, 2010s, Present (`content/en/about.ts`).
- About-page credential titles: licensed customs brokerage, chamber of commerce registered, maritime forwarding authorization, commercial credentials. License numbers stay unprinted. The page already says documents are available on request.
- Contact copy says an average WhatsApp reply under 15 minutes during operating hours. Do not change that figure.
- Services copy mentions GPS-monitored routes, transit insurance, JFDA, and Standards & Metrology. Do not add new compliance bodies.

## Locales and routes

- Locales: `en`, `ar`.
- Routes: `/[locale]`, `/[locale]/about`, `/[locale]/services`, `/[locale]/contact`.

## Copy rules

- Write from this file and the content modules. If a fact is missing, say it is missing.
- Do not invent clients, results, testimonials, awards, tonnage, or license numbers.
- Generated pictures are atmosphere. Alt text must not say the frame is a photograph of Aqaba, the RKLT fleet, or RKLT staff.
