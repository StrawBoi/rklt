import React from "react";
import { Locale } from "@/lib/i18n";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
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
  anchors: { href: string; label: string; idx: string }[];
  locale: Locale;
}) {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-role-text tracking-tight leading-[1.06]">
        {content.title}
      </h1>
      <p className="text-base sm:text-lg text-role-muted leading-relaxed max-w-3xl">
        {content.subtitle}
      </p>
      <div className="pt-2">
        <PageInquiry locale={locale} />
      </div>
      <div className="pt-6 border-t border-role-line flex flex-wrap gap-x-8 gap-y-3">
        {anchors.map((anchor) => (
          <a
            key={anchor.href}
            href={anchor.href}
            className="group inline-flex items-baseline gap-2 text-xs font-mono uppercase tracking-wider text-role-muted hover:text-role-text transition-colors"
          >
            <span className="text-[#c89b3c] font-bold">{anchor.idx}</span>
            <span className="group-hover:underline underline-offset-4">{anchor.label}</span>
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
    { idx: "01", href: "#capabilities-bento", label: isAr ? "الخدمات الأساسية الست" : "Core Capabilities" },
    { idx: "02", href: "#specifications", label: isAr ? "مواصفات الأسطول والحاويات" : "Fleet Specifications" },
    { idx: "03", href: "#customs-protocol", label: isAr ? "بروتوكول التخليص (رخصة ٤١٢)" : "Customs Protocol #412" },
    { idx: "04", href: "#extended", label: isAr ? "القدرات الموسعة" : "Extended Scope" },
  ];

  return (
    <PageStill
      nightSrc="/world/services/night/poster.jpg"
      daySrc="/assets/hero/corridor/port-day.jpg"
      alt={alt}
    >
      <HeroCopy content={content} anchors={anchors} locale={locale} />
    </PageStill>
  );
};
