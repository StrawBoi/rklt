import React from "react";
import { Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { Experience3DRoot } from "@/components/3d-experience";
import { CredibilityStrip } from "@/components/sections/home/CredibilityStrip";
import { ServiceTeaserGrid } from "@/components/sections/home/ServiceTeaserGrid";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { StoryTeaser } from "@/components/sections/home/StoryTeaser";
import { CoverageTeaser } from "@/components/sections/home/CoverageTeaser";
import { CTABand } from "@/components/layout/CTABand";

// Feature flag for 3D experience (set to true to enable)
const ENABLE_3D_EXPERIENCE = true;

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <>
      {ENABLE_3D_EXPERIENCE ? (
        <Experience3DRoot locale={locale} />
      ) : (
        <HeroSection locale={locale} />
      )}
      <CredibilityStrip locale={locale} />
      <ServiceTeaserGrid locale={locale} />
      <HowItWorks locale={locale} />
      <StoryTeaser locale={locale} />
      <CoverageTeaser locale={locale} />
      <CTABand locale={locale} tone="darker" />
    </>
  );
}
