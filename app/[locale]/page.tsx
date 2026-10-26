import React from "react";
import { Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServiceTeaserGrid } from "@/components/sections/home/ServiceTeaserGrid";
import { CredibilityStrip } from "@/components/sections/home/CredibilityStrip";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { StoryTeaser } from "@/components/sections/home/StoryTeaser";
import { CoverageTeaser } from "@/components/sections/home/CoverageTeaser";
import { CTABand } from "@/components/layout/CTABand";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <>
      <div className="rklt-hero-stage">
        <HeroSection locale={locale} />
        <CredibilityStrip locale={locale} />
      </div>
      <ServiceTeaserGrid locale={locale} />
      <HowItWorks locale={locale} />
      <StoryTeaser locale={locale} />
      <CoverageTeaser locale={locale} />
      <CTABand locale={locale} tone="darker" />
    </>
  );
}
