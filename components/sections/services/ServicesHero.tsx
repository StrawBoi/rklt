import React from "react";
import { Locale } from "@/lib/i18n";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { PageStill } from "@/components/sections/PageStill";
import { PageInquiry } from "@/components/sections/PageInquiry";

interface ServicesHeroProps {
  locale: Locale;
}

function HeroCopy({
  content,
  anchors,
  locale,
}: {
  content: { eyebrow: string; title: string; subtitle: string };
  anchors: { href: string; label: string }[];
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
      <div className="pt-2 flex flex-wrap gap-2.5">
        {anchors.map((anchor) => (
          <a
            key={anchor.href}
            href={anchor.href}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-role-line text-role-text hover:border-role-action"
          >
            {anchor.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.hero : servicesContentEn.hero;
  const alt = isAr ? "أجواء ممر شحن" : "Freight corridor atmosphere";
  const anchors = [
    { href: "#sea", label: isAr ? "الشحن البحري" : "Sea Freight" },
    { href: "#air", label: isAr ? "الشحن الجوي" : "Air Freight" },
    { href: "#land", label: isAr ? "الشحن البري" : "In-Land Transport" },
    { href: "#customs", label: isAr ? "التخليص الجمركي" : "Customs Clearance" },
    { href: "#extended", label: isAr ? "القدرات الموسعة (9)" : "Extended (9)" },
  ];

  return (
    <PageStill
      nightSrc="/world/services/night/poster.jpg"
      daySrc="/world/services/day/poster.jpg"
      alt={alt}
    >
      <HeroCopy content={content} anchors={anchors} locale={locale} />
    </PageStill>
  );
};
