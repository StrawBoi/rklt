# RKLT Platform Documentation

Welcome to the technical and architectural documentation for the **Rubu' Al-Khair for Transport & Shipping (RKLT)** digital web platform.

Established in 1994 and operating under **Jordan Customs Brokerage License #412**, RKLT is Jordan's premier institutional logistics house, commanding freight forwarding and statutory customs clearance across the Port of Aqaba, Queen Alia International Airport (AMM), Amman Inland Depots, and cross-border transit corridors into Saudi Arabia, Iraq, and the GCC.

This platform is engineered using modern institutional web standards: **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP 3** for cinematic scroll orchestration.

---

## Documentation Index

Explore the platform specifications and guides below:

1. [Platform Architecture](./ARCHITECTURE.md)
   * Next.js 14 App Router layout & routing
   * Bilingual English (`en`) & Arabic (`ar`) internationalization (i18n)
   * Bidirectional RTL (`dir="rtl"`) layout and typographic mechanics
   * Server Components vs. Client Component boundaries
   * SEO, Metadata, OpenGraph & Structured JSON-LD schemas

2. [Design System & Visual Language](./DESIGN_SYSTEM.md)
   * Institutional Maritime color tokens (Obsidian Night & Sand Alabaster Day)
   * Typography system: Archivo, Big Shoulders Display & Cairo
   * The Nested Corner Radius Formula ($R_{\text{inner}} = R_{\text{outer}} - P$)
   * Z-Axis Depth Strata (The 5-Layer Descent into Company Operations)
   * Component design patterns and micro-interactions

3. [Animation Engine & Physics](./ANIMATION_ENGINE.md)
   * GSAP 3 & ScrollTrigger timeline architecture
   * The Cinematic Harbor Hero & Crane Hydraulic Settlement
   * Mutual exclusivity scroll transition between brand (`RKLT`) & legacy (`30+`)
   * United Carriers Pinned Services Command Center
   * Hardware acceleration, GPU layers, and `prefers-reduced-motion` compliance

4. [Directory & Component Sitemap](./DIRECTORY_STRUCTURE.md)
   * Complete tree structure of the repository
   * Active component matrix and responsibilities
   * Content dictionaries (`content/en/`, `content/ar/`, `content/site.ts`)
   * Asset pipeline conventions

5. [Deployment & Operations Guide](./DEPLOYMENT.md)
   * Local development environment setup
   * Production build verification (`npm run build`)
   * Environment variable configuration
   * Deployment targets: Vercel, Node.js standalone, Docker containerization

---

## Quick Reference

| Parameter | Specification |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS + Institutional CSS Tokens |
| **Motion Engine** | GSAP 3 (ScrollTrigger, MatchMedia) |
| **Supported Locales** | English (`en`), Arabic (`ar`, RTL default) |
| **License Number** | Jordan Customs Brokerage License #412 (1994) |
| **Operations Desks** | Aqaba Terminal Port, AMM Cargo, Amman Sahab Hub |
