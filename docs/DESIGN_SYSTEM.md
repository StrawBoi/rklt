# Design System & Visual Language

[<- Back to Documentation Index](./README.md)

This specification defines the visual philosophy, typography hierarchy, color tokens, and geometric construction principles behind the RKLT brand interface.

---

## 1. Visual Philosophy: Institutional Logistics Mastery

RKLT does not look like a lightweight tech startup or a generic template. It is designed to convey **30+ years of institutional weight, sovereign legal authorization (Jordan Customs Brokerage License #412), and physical harbor precision**.

Key visual tenets:
1. **Physical Engineering Feel**: Monolithic cards, steel cables, laser alignment guides, and container corner castings.
2. **Atmospheric Cinematic Immersion**: High-contrast, authentic photography of container vessels, Red Sea cargo docks, and desert transit corridors.
3. **Restraint & Dignity**: Elimination of frivolous AI "glowing bubbles" or toyish icons in favor of structured data ribbons, dot-matrix LED indicators, and crisp geometric seals.

---

## 2. Color Palette & Dual-Skin Tokens

The interface features two synchronized palettes: **Night Mode** (Obsidian Maritime) and **Day Mode** (Warm Sand Alabaster).

### Core Token Palette

| Token Role | Night Mode (`data-theme="night"`) | Day Mode (`data-theme="day"`) | Notes |
| :--- | :--- | :--- | :--- |
| **Surface Base** | `#05080b` / `#091117` | `#fbf9f4` / `#f3ede2` | Deep Red Sea harbor vs. Gulf desert stone |
| **Monolith Vault** | `#0c141c` / `#101e26` | `#ebe3d3` / `#e2d6c1` | Embedded technical surfaces |
| **Sovereign Brass** | `#e2b34a` (Luminous Amber) | `#a87318` (Burnished Ochre) | Customs license seal, active indicators |
| **Rule / Grid Line**| `rgba(255, 255, 255, 0.08)` | `rgba(9, 26, 33, 0.08)` | Architectural grid lines |
| **Laser Accent** | `rgba(226, 179, 74, 0.35)` | `rgba(168, 115, 24, 0.35)` | Alignment sweeps and borders |
| **Primary Text** | `#ffffff` / `#f4f6f8` | `#091a21` (Navy Slate) | High contrast, maximum legibility |
| **Secondary Text**| `#8a99a8` / `#6c7c8c` | `#2d5661` / `#4d6b75` | Supporting technical meta |

---

## 3. Typography Architecture

Three distinct typefaces are paired to establish a clear hierarchy:

```
[ Big Shoulders Display / Cairo Black ]  ->  Monumental Titles, Numerals, Strata
[ Archivo Display / Cairo Bold ]        ->  Section Headings, Service Titles
[ Archivo / Cairo Regular ]             ->  Editorial Body Text, Specifications
[ JetBrains Mono / Space Mono ]         ->  GPS Coordinates, Customs License, SLA Tags
```

### Font Configurations
1. **Latin Headlines**: `Archivo Display` (Heavy industrial sans-serif with geometric density).
2. **Monumental Numerals**: `Big Shoulders Display` (Condensed, high-impact tabular figures).
3. **Arabic Typography**: `Cairo` (Geometric Kufic modern sans with precise baseline balance in both regular and black display cuts).
4. **Data & Technical Metadata**: `font-mono` (Tabular figures for container numbers, coordinates, and license numbers).

---

## 4. The Nested Corner Radius Formula

To maintain strict visual harmony across nested containers, every border-radius is calculated mathematically based on internal padding:

$$R_{\text{inner}} = R_{\text{outer}} - P$$

Where:
- $R_{\text{outer}}$ is the radius of the outer container.
- $P$ is the uniform padding between the outer and inner frames.
- $R_{\text{inner}}$ is the radius of the nested content element.

### Standard Implementations

| Component | $R_{\text{outer}}$ | Padding ($P$) | $R_{\text{inner}}$ | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| **Terminal Dispatch Console** | `10px` | `4px` | `6px` | Crisp institutional instrument enclosure |
| **Catalog Pinned Media Frame** | `8px` | `4px` | `4px` | Sharp chiseled harbor stage |
| **Standard Monolith Card** | `6px` | `2px` | `4px` | Flush architectural paneling |

---

## 5. Depth Layers & Z-Axis Strata

The application implements a **5-Layer Depth Journey** that symbolizes the user's progression from the external horizon into the core operations desk of the company:

1. **Stratum 1 (The Horizon & Berth)**: The Port of Aqaba, container crane, and foundational 30-year operational mark.
2. **Stratum 2 (The Capabilities)**: Services Atrium and Pinned 6-Service Command Center.
3. **Stratum 3 (The Method)**: "How We Move Your Cargo" technical 90° transit blueprint.
4. **Stratum 4 (The Territory)**: Strategic transit corridors linking Jordan to Saudi Arabia, Iraq, and GCC.
5. **Stratum 5 (The Inner Sanctum)**: Direct intake terminal and "Seal of Custody" executive partner desk.
