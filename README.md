# RKLT · Rubu' Al-Khair for Transport & Shipping

> **Jordan Customs Brokerage License #412 · Established 1994**  
> Institutional Sea, Air, and Land Freight Logistics across Aqaba, Amman, and Strategic GCC Trade Corridors.

---
 
## Overview

**RKLT (Rubu' Al-Khair for Transport & Shipping)** is a licensed Jordanian logistics house with over three decades of operational mastery. Headquartered in Amman with primary maritime dispatch operations at the Port of Aqaba and air cargo clearance at Queen Alia International Airport (AMM), RKLT delivers statutory customs brokerage, multimodal freight forwarding, temperature-controlled reefer chains, and bonded cross-border heavy transit.

This repository contains the production source code for the **RKLT Digital Platform**, engineered with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **GSAP 3** scroll physics.

---

## Platform Features

- **Bilingual Architecture**: First-class English (`en`) and Arabic (`ar`) internationalization with bidirectional layout support (`dir="rtl"`).
- **Cinematic Harbor Hero**: Seamless, unified harbor backdrop with GSAP-powered container suspension and dynamic Aqaba-to-Amman GPS coordinate calculation.
- **Mutual Exclusivity Typography**: Perfectly synchronized scroll transitions between brand mark (`RKLT`) and operational legacy (`30+ Years`).
- **United Carriers Pinned Catalog**: 6-service interactive command center with physical photo/video guillotine unmasking and responsive mobile accordion.
- **5-Layer Z-Axis Depth Journey**: Physical curtain over-scroll transitions that guide the user deeper into company capabilities.
- **Interactive Intake Console**: Real-time cargo manifest builder generating direct WhatsApp and email dispatches to the senior operations desk.
- **Dual-Skin Design Tokens**: Obsidian Maritime Night mode and Warm Sand Alabaster Day mode with zero-FOUC pre-paint theme injection.

---

## Technical Documentation Suite

Complete technical documentation is located in the [`docs/`](./docs/README.md) directory:

- [**Platform Architecture**](./docs/ARCHITECTURE.md): Next.js 14 App Router, routing, server vs. client boundaries, and SEO metadata.
- [**Design System**](./docs/DESIGN_SYSTEM.md): Dual-skin color palettes, typography hierarchy, and the Nested Corner Radius formula ($R_{\text{inner}} = R_{\text{outer}} - P$).
- [**Animation Engine**](./docs/ANIMATION_ENGINE.md): GSAP 3 timeline architecture, ScrollTrigger scrub synchronization, and performance optimizations.
- [**Directory Structure & Sitemap**](./docs/DIRECTORY_STRUCTURE.md): Codebase tree, active component matrix, and content dictionaries.
- [**Deployment & Operations**](./docs/DEPLOYMENT.md): Build verification, environment variables, and hosting targets.

---

## Getting Started

### Prerequisites
- Node.js `18.18.0` or higher
- npm `9.0.0` or higher

### Installation & Local Development
```bash
# Clone the repository
git clone https://github.com/StrawBoi/Rklt.git
cd Rklt

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/ar](http://localhost:3000/ar) in your browser.

### Production Build Verification
```bash
npm run build
```

---

## License & Operational Inquiries

- **Customs Brokerage**: Licensed under Jordan Customs Authority License #412.
- **Operations Desk**: +962 7 9532 0624 · [operations@rklt.jo](mailto:operations@rklt.jo)
- **Copyright**: &copy; 2026 [Ahmed Mostafa](https://www.linkedin.com/in/ahmed-mmostafa/). All rights reserved.
