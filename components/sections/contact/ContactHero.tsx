import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { PageStill } from "@/components/sections/PageStill";
import { PageInquiry } from "@/components/sections/PageInquiry";

interface ContactHeroProps {
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

export const ContactHero: React.FC<ContactHeroProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.hero : contactContentEn.hero;
  const alt = isAr ? "أجواء مكتب العمليات" : "Operations desk atmosphere";

  return (
    <PageStill
      nightSrc="/world/contact/night/poster.jpg"
      daySrc="/world/contact/day/poster.jpg"
      alt={alt}
    >
      <HeroCopy content={content} locale={locale} />
    </PageStill>
  );
};
