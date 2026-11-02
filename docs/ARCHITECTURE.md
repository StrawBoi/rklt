# Platform Architecture

[<- Back to Documentation Index](./README.md)

This document provides a technical deep-dive into the architectural foundations of the RKLT web platform.

---

## 1. High-Level Architecture Overview

The RKLT web application is built on **Next.js 14** using the **App Router** paradigm. It leverages static-site generation (SSG) with incremental dynamic revalidation, delivering sub-second first-byte performance while serving global logistics clients in both English and Arabic.

```
                          [ Client Browser ]
                                  |
                        [ Next.js Middleware ]
                      (Locale Detection & Path Rewrites)
                                  |
                +-----------------+-----------------+
                |                                   |
         /[locale] (en)                      /[locale] (ar)
         (LTR Execution)                     (RTL Execution)
                |                                   |
    +-----------+-----------+           +-----------+-----------+
    | Server Component Tree |           | Server Component Tree |
    | (Metadata, JSON-LD)   |           | (Metadata, JSON-LD)   |
    +-----------+-----------+           +-----------+-----------+
                |                                   |
    +-----------+-----------+           +-----------+-----------+
    | Client Hydration Root |           | Client Hydration Root |
    | (GSAP, Depth Motion)  |           | (GSAP, Depth Motion)  |
    +-----------------------+           +-----------------------+
```

---

## 2. Bilingual Internationalization (i18n)

### Route Architecture
All page routes reside under the dynamic `app/[locale]/` directory:
- `app/[locale]/page.tsx`: Operational Homepage
- `app/[locale]/services/page.tsx`: Specialized Logistics & Customs Catalog
- `app/[locale]/corridors/page.tsx`: Strategic Transit Corridors (Aqaba, GCC, Levant)
- `app/[locale]/about/page.tsx`: Institutional Heritage, Standards & Governance
- `app/[locale]/contact/page.tsx`: 24/7 Dispatch Console & Customs Intake
- `app/[locale]/tracking/page.tsx`: Enterprise Consignment Tracking Console

### Middleware Routing & Redirection
The edge middleware ([`middleware.ts`](file:///c:/Users/Ahmed/OneDrive/Rklt/middleware.ts)) evaluates incoming requests:
1. Validates whether the root request includes a valid locale prefix (`/en` or `/ar`).
2. If omitted, detects user browser preferences via `Accept-Language` headers and rewrites to `/en` or `/ar`.
3. Bypasses static assets (`/assets/*`, `/_next/*`, `/favicon.ico`, `/robots.txt`, `/sitemap.xml`).

### Bidirectional Layout Engine (RTL / LTR)
- Arabic is treated as a **first-class citizen**, not an afterthought translation.
- When `locale === "ar"`, the root element injects `dir="rtl"` and `lang="ar"`.
- Layout components employ logical CSS properties (`padding-inline`, `margin-inline`, `inset-inline-start`) and Tailwind arbitrary variant selectors (`[dir=rtl]`) for directional transforms, icons, and radar graticules.

---

## 3. Server vs. Client Boundary Strategy

Performance and SEO dictate a strict separation between Server Components and Client Components:

### Server Components (`async Page`, Layouts)
- **Zero Client JavaScript Cost**: Page shells, static text content, and initial layout hierarchies are rendered on the server.
- **Search Engine Optimization**: Every page statically emits localized OpenGraph cards, Twitter cards, canonical tags, and Google-compliant schema markups via [`buildPageMetadata()`](file:///c:/Users/Ahmed/OneDrive/Rklt/lib/seo.ts).
- **Structured Data**: Injects validated JSON-LD schemas ([`JsonLd.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/seo/JsonLd.tsx)) for `Organization`, `Service`, `BreadcrumbList`, and `FAQPage`.

### Client Components (`"use client"`)
Client boundaries are restricted to interactive motion and stateful UI:
1. **Interactive Animation Stages**:
   - [`HeroSection.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/sections/home/HeroSection.tsx) (Crane hydraulic settlement & berth coordinates)
   - [`ServiceTeaserGrid.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/sections/home/ServiceTeaserGrid.tsx) (Pinned 6-service media unmasking)
   - [`DepthLayerController.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/motion/DepthLayerController.tsx) (Z-axis stratum veil orchestration)
2. **Interactive Form Consoles**:
   - [`CTABand.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/layout/CTABand.tsx) (Live cargo configuration dispatch)
   - [`OperationsDeskConsole.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/sections/contact/OperationsDeskConsole.tsx) (Direct WhatsApp & dispatch transmission)

---

## 4. State & Theme Management

The platform features a zero-runtime-cost dark/light mode engine:
- Persisted in `localStorage` under key `rklt-theme`.
- Handled synchronously prior to browser paint via an inline script in [`LocaleHtmlAttributes.tsx`](file:///c:/Users/Ahmed/OneDrive/Rklt/components/layout/LocaleHtmlAttributes.tsx) to prevent Flash of Unstyled Content (FOUC).
- Theme toggle is managed via data attributes on `<html>`: `data-theme="night"` vs `data-theme="day"`.
- CSS tokens automatically adapt across backgrounds, borders, typography, and SVG overlays.
