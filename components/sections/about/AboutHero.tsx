import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { PageStill } from "@/components/sections/PageStill";
import { PageInquiry } from "@/components/sections/PageInquiry";

interface AboutHeroProps {
  locale: Locale;
}

function HeroCopy({
  content,
  locale,
}: {
  content: { eyebrow: string; title: string; subtitle: string };
  locale: Locale;
}) {
  return (
    <div className="max-w-4xl space-y-6">
      <Eyebrow tone="ember" className="text-role-muted">
        {content.eyebrow}
      </Eyebrow>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-role-text tracking-tight leading-tight">
        {content.title}
      </h1>
      <p className="text-base sm:text-lg text-role-muted leading-relaxed max-w-3xl">
        {content.subtitle}
      </p>
      <div className="pt-2">
        <PageInquiry locale={locale} />
      </div>
    </div>
  );
}

export const AboutHero: React.FC<AboutHeroProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.hero : aboutContentEn.hero;
  const alt = isAr
    ? "أجواء ميناء خلف قصة ربوع الخير"
    : "Port atmosphere behind the RKLT story";

  return (
    <PageStill
      nightSrc="/world/about/night/poster.jpg"
      daySrc="/world/about/day/poster.jpg"
      alt={alt}
    >
      <HeroCopy content={content} locale={locale} />
    </PageStill>
  );
};
