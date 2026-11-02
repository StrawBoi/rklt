import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
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
  const isAr = locale === "ar";
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-role-text tracking-tight leading-[1.06]">
        {content.title}
      </h1>
      <p className="text-base sm:text-lg text-role-muted leading-relaxed max-w-3xl">
        {content.subtitle}
      </p>

      {/* Unboxed Architectural Credentials Ledger */}
      <div className="grid grid-cols-3 border-t border-b border-role-line py-5 gap-6">
        <div>
          <span className="font-numeral text-2xl sm:text-3xl font-light text-[#c89b3c] block leading-none">
            {isAr ? "١٩٩٤" : "1994"}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-role-muted block mt-1.5">
            {isAr ? "التأسيس والانطلاق" : "Founded (30+ Yrs)"}
          </span>
        </div>
        <div className="border-s border-role-line ps-6">
          <span className="font-numeral text-2xl sm:text-3xl font-light text-role-text block leading-none">
            #412
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-role-muted block mt-1.5">
            {isAr ? "الترخيص الجمركي" : "Customs Charter"}
          </span>
        </div>
        <div className="border-s border-role-line ps-6">
          <span className="font-numeral text-2xl sm:text-3xl font-light text-role-text block leading-none">
            100%
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-role-muted block mt-1.5">
            {isAr ? "سلسلة الحفظ المعلق" : "Bonded Custody"}
          </span>
        </div>
      </div>

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
      daySrc="/assets/hero/corridor/charter-day.jpg"
      alt={alt}
    >
      <HeroCopy content={content} locale={locale} />
    </PageStill>
  );
};
