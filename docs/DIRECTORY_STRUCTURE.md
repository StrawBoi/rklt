# Directory Structure & Component Matrix

[<- Back to Documentation Index](./README.md)

This document provides a complete sitemap of the production codebase, detailing component responsibilities and content pipelines.

---

## 1. Directory Tree Overview

```
.
├── app/
│   ├── [locale]/
│   │   ├── about/page.tsx             # Institutional Heritage, Standards & Governance
│   │   ├── contact/page.tsx           # 24/7 Operations Desk & Intake Console
│   │   ├── corridors/page.tsx         # Strategic Transit Corridors & Cross-Border Lanes
│   │   ├── services/page.tsx          # Full Specialized Freight & Customs Catalog
│   │   ├── tracking/
│   │   │   ├── layout.tsx             # Dedicated tracking console layout
│   │   │   └── page.tsx               # Enterprise Consignment Tracking Interface
│   │   ├── layout.tsx                 # Master localized layout shell (Header, Main, Footer)
│   │   └── page.tsx                   # Operational Homepage (5 Depth Strata)
│   ├── api/
│   │   └── note/route.ts              # Intake dispatch & note transmission endpoint
│   ├── globals.css                    # Production design system tokens & animations
│   ├── layout.tsx                     # Root document HTML shell
│   ├── robots.ts                      # Dynamic SEO robots directives
│   └── sitemap.ts                     # Dynamic multi-locale XML sitemap generator
│
├── components/
│   ├── layout/
│   │   ├── BrandLogo.tsx              # Institutional vector wordmark with anchor link
│   │   ├── CTABand.tsx                # Interactive 3-stage cargo intake console
│   │   ├── Footer.tsx                 # Monumental 4-column institutional footer
│   │   ├── Header.tsx                 # Sticky blur navigation bar with scroll auto-hide
│   │   ├── HeaderShell.tsx            # Adaptive glassmorphism background shell
│   │   ├── LocaleHtmlAttributes.tsx   # Pre-paint theme & direction injector
│   │   ├── MobileNav.tsx              # Full-screen responsive drawer navigation
│   │   ├── PageTransitionCurtain.tsx  # Smooth page transition curtain
│   │   └── ThemeToggle.tsx            # Day/Night theme switcher button
│   │
│   ├── motion/
│   │   ├── DepthLayerController.tsx   # Z-axis stratum veil orchestration
│   │   └── usePayPalScrollMotion.ts   # Tactile staggered entrance reveals
│   │
│   ├── primitives/
│   │   ├── Button.tsx                 # Polymorphic institutional CTA button
│   │   ├── Container.tsx              # Standardized max-width layout wrapper
│   │   └── Icon.tsx                   # High-precision SVG icon registry
│   │
│   ├── sections/
│   │   ├── about/                     # About page sections (Heritage, Governance, Values, Credentials)
│   │   ├── contact/                   # Contact page sections (Hero, Operations Desk, Quote Guide, FAQ)
│   │   ├── corridors/                 # Transit corridors console and strategic maps
│   │   ├── home/                      # Homepage sections (Hero, Credibility, Services, HowItWorks, Corridors, CTA)
│   │   └── services/                  # Services page sections (Hero, Bento, Fleet Ledger, Customs Protocol)
│   │
│   └── seo/
│       └── JsonLd.tsx                 # Structured data schemas for Google Search
│
├── content/
│   ├── ar/                            # Arabic localized content dictionaries
│   ├── en/                            # English localized content dictionaries
│   └── site.ts                        # Global site metadata, phone numbers, customs license
│
├── docs/                              # Complete platform engineering documentation
├── lib/                               # Core utilities (i18n routing, SEO helpers)
├── public/                            # Static web assets (photography, video loops, vector icons)
├── middleware.ts                      # Edge routing & locale detection middleware
├── next.config.mjs                    # Next.js compiler & asset optimization config
└── tailwind.config.ts                 # Tailwind design token configuration
```

---

## 2. Active Component Matrix

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| **`HeroSection`** | `components/sections/home/HeroSection.tsx` | Full-bleed harbor backdrop, container crane suspension, and coordinate telemetry. |
| **`CredibilityStrip`** | `components/sections/home/CredibilityStrip.tsx` | High-impact operational statistics (30+ Years, License #412, 100% Bonded). |
| **`ServiceTeaserGrid`** | `components/sections/home/ServiceTeaserGrid.tsx` | United Carriers 6-service scroll catalog with pinned media stage and mobile accordion. |
| **`HowItWorks`** | `components/sections/home/HowItWorks.tsx` | 4-step cargo custody lifecycle from booking to inland destination clearance. |
| **`CoverageTeaser`** | `components/sections/home/CoverageTeaser.tsx` | Minimalist line-drawn transit corridor map through Aqaba, Amman, GCC & Levant. |
| **`ServiceCTA`** | `components/sections/home/ServiceCTA.tsx` | Concentric radar rings, "PARTNER UP" editorial display, and magnetic custody seal. |
| **`CTABand`** | `components/layout/CTABand.tsx` | Real-time intake manifest generator with origin/destination/cargo selectors. |
| **`Header`** | `components/layout/Header.tsx` | Institutional navigation bar with scroll threshold auto-hide and theme toggle. |
| **`Footer`** | `components/layout/Footer.tsx` | 24/7 operations status ribbon, customs license verification, and legal disclaimers. |
