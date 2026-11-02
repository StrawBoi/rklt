# Reusable Architectural Motion Components

This directory contains standalone, production-grade React & CSS components developed for luxury freight, industrial logistics, and high-precision brand showcases.

They are built to eliminate synthetic "AI-generated" tropes (no fake HUD brackets, no sci-fi codes, no generic cartoonish cards) in favor of **tactile, physical editorial depth**, **60fps hardware-accelerated scroll synchronization**, and **full bilingual LTR & RTL parity**.

---

## 📦 What's Inside

| Component | Description | Key Features |
| :--- | :--- | :--- |
| **`PinnedServicesConveyor`** | Pinned 3-column architectural video & service stage | Single active GPU decoder loop, 9:16 borderless media, collapsing copy, responsive mobile accordion |
| **`PrecisionExecutionGallery`** | 4-column Swiss precision lifecycle gallery | 4:5 portrait editorial imagery, floating architectural numerals, hover elevation, GSAP entrance |
| **`ArchitecturalBridge`** | Typographic proclamation seam | Hairline brass separator, micro-caps tracking, seamless transition out of pinned sections |
| **`HeritageHallmark`** | Balanced architectural seal divider | Minimalist pill badge with balanced hairlines, customizable dates and milestones |

---

## 🚀 How to Use in Another Project

### 1. Copy the Directory
Copy the entire `reusable-components/` folder directly into your new React or Next.js project:
```bash
cp -r reusable-components/ your-nextjs-app/src/components/
```

### 2. Dependencies
These components require `gsap` for smooth scroll triggers (or fall back gracefully to reduced motion):
```bash
npm install gsap
npm install -D @types/gsap
```

### 3. Usage Example (Next.js App Router or Pages Router)

```tsx
import {
  PinnedServicesConveyor,
  ArchitecturalBridge,
  PrecisionExecutionGallery,
  HeritageHallmark
} from "@/reusable-components";

export default function ServicesPage() {
  const slides = [
    {
      id: "sea",
      numeral: "01",
      category: "MARITIME LOGISTICS",
      title: "Sea Freight & Ocean Cargo",
      tagline: "Dependable ocean connections through world ocean lanes.",
      description: "Coordinated containerized freight, non-containerized cargo, and project shipping.",
      features: ["Full Container Load (FCL)", "Reefer Temperature Management", "Direct Alliance Bookings"],
      photo: "/assets/services/sea.jpg",
      video: "/assets/services/sea.mp4",
      ctaText: "Request a Quote",
      ctaHref: "/contact"
    },
    // ... add more slides
  ];

  const steps = [
    {
      numeral: "01",
      phase: "Phase 01 · Route & Spec",
      title: "Route Discovery",
      description: "Analyzing cargo specifications, timeline, and customs prerequisites.",
      tags: ["Carrier Selection", "Feasibility", "Spec Analysis"],
      photo: "/assets/process/route.webp"
    },
    // ... add more steps
  ];

  return (
    <main>
      {/* 1. Pinned Video/Photo Conveyor */}
      <PinnedServicesConveyor slides={slides} direction="ltr" />

      {/* 2. Transitional Proclamation Bridge */}
      <ArchitecturalBridge
        proclamation="FROM MANIFEST TO MANDATE · THE OPERATIONAL DISCIPLINE BEHIND EVERY CONSIGNMENT"
        direction="ltr"
      />

      {/* 3. 4-Column Precision Gallery */}
      <PrecisionExecutionGallery
        eyebrow="02 · OPERATIONAL LIFECYCLE"
        title="How we move your cargo without friction."
        subtitle="A proven workflow refined over 30 years to eliminate port delays."
        steps={steps}
        direction="ltr"
      />

      {/* 4. Heritage Hallmark Handover */}
      <HeritageHallmark
        startYear="1994"
        endYear="2024"
        label="THIRTY YEARS OF RECORDED CUSTODY"
        direction="ltr"
      />
    </main>
  );
}
```

---

## ⚙️ Media Asset Standards for Best Results

### Video Assets (for `PinnedServicesConveyor`)
- **Aspect Ratio**: 9:16 portrait vertical (1080 × 1920 recommended).
- **Duration**: 6 to 10 second seamless loops.
- **Codec**: AVC1 / H.264 (Baseline or Main profile) for universal hardware playback.
- **Compression**: Use Handbrake or ffmpeg with CRF 22–24 (~3MB to 6MB per file) to prevent mobile bandwidth saturation.
- **Poster Fallback**: Always provide a high-resolution JPG/WebP poster (`poster={s.photo}`). This eliminates black-box flash on load and provides 0ms Cumulative Layout Shift (CLS).

### Photography Assets (for `PrecisionExecutionGallery`)
- **Aspect Ratio**: 4:5 vertical portrait (1200 × 1500 recommended).
- **Format**: Modern WebP with fallback JPG.
- **Composition**: Real, physical, editorial photography with balanced contrast. Avoid cartoonish AI renders or overly complex sci-fi overlays.

---

## 🛡️ Performance & Accessibility Guarantees

1. **Single Active GPU Decoder Loop**: The scroll engine tracks active viewports using `requestAnimationFrame`. Only the active slide plays; inactive slides pause immediately.
2. **Zero Layout Thrashing**: Section offsets are measured and cached on mount/resize, eliminating costly `getBoundingClientRect()` flushes on high-speed scroll.
3. **Accessibility (`prefers-reduced-motion`)**:
   Automatically detects user OS reduced-motion settings, disabling video playback and GSAP scrubs, smoothly falling back to high-res static editorial photography.
4. **Bilingual Parity**: Native `dir="ltr"` and `dir="rtl"` support with layout mirroring and typographic alignment.
