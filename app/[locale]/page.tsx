import React from "react";
import { Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { CredibilityStrip } from "@/components/sections/home/CredibilityStrip";
import { ServiceTeaserGrid } from "@/components/sections/home/ServiceTeaserGrid";
import { ServiceCTA } from "@/components/sections/home/ServiceCTA";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { CoverageTeaser } from "@/components/sections/home/CoverageTeaser";
import { CTABand } from "@/components/layout/CTABand";
import { DepthLayerController } from "@/components/motion/DepthLayerController";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <DepthLayerController>
      {/* LAYER 1: THE HORIZON & BERTH (External Arrival & 30+ Years Foundation) */}
      <div data-depth-stratum="1" className="rklt-depth-stratum z-[10]">
        <div data-depth-inner className="rklt-hero-stage">
          <HeroSection locale={locale} />
          <CredibilityStrip locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 2: THE CAPABILITIES (Services Atrium & Command Vault) */}
      <div data-depth-stratum="2" className="rklt-depth-stratum rklt-depth-overlayer z-[20]">
        <div data-depth-inner>
          <ServiceTeaserGrid locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 3: THE METHOD (How We Move Your Cargo — 90° Datum Turn) */}
      <div data-depth-stratum="3" className="rklt-depth-stratum rklt-depth-overlayer z-[30]">
        <div data-depth-inner>
          <HowItWorks locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 4: THE TERRITORY (Direct Transit Corridors — Option A) */}
      <div data-depth-stratum="4" className="rklt-depth-stratum rklt-depth-overlayer z-[40]">
        <div data-depth-inner>
          <CoverageTeaser locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 5: THE INNER SANCTUM ("Let's Partner Up" — Datum Thread Terminates into Seal) */}
      <div data-depth-stratum="5" className="rklt-depth-stratum rklt-depth-overlayer z-[50]">
        <div data-depth-inner>
          <ServiceCTA locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 6: THE DIRECT OPERATIONS DESK (Manifest Intake) */}
      <div data-depth-stratum="6" className="rklt-depth-stratum rklt-depth-overlayer z-[60]">
        <div data-depth-inner>
          <CTABand locale={locale} tone="darker" />
        </div>
      </div>
    </DepthLayerController>
  );
}
