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
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
          {content.eyebrow}
        </span>
      </div>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-role-text tracking-tight leading-tight">
        {content.title}
      </h1>
      <p className="text-base sm:text-lg text-role-muted leading-relaxed max-w-3xl">
        {content.subtitle}
      </p>

      {/* Institutional Credentials Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-lg border border-role-line bg-black/30 backdrop-blur-sm">
          <span className="font-mono text-xs text-[#e2b34a] font-bold block">
            {isAr ? "التأسيس والانطلاق" : "Founded"}
          </span>
          <span className="font-mono text-lg font-black text-role-text">
            {isAr ? "عام ١٩٩٤" : "1994 (32+ Yrs)"}
          </span>
        </div>
        <div className="p-3 rounded-lg border border-role-line bg-black/30 backdrop-blur-sm">
          <span className="font-mono text-xs text-[#e2b34a] font-bold block">
            {isAr ? "الترخيص الجمركي" : "Customs Charter"}
          </span>
          <span className="font-mono text-lg font-black text-role-text">
            {isAr ? "رقم ٤١٢ مرخص" : "License #412"}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-lg border border-role-line bg-black/30 backdrop-blur-sm">
          <span className="font-mono text-xs text-[#e2b34a] font-bold block">
            {isAr ? "سلسلة الحفظ" : "Chain of Custody"}
          </span>
          <span className="font-mono text-lg font-black text-role-text">
            {isAr ? "١٠٠٪ معتمد" : "100% Bonded"}
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
      daySrc="/world/about/day/poster.jpg"
      alt={alt}
    >
      <HeroCopy content={content} locale={locale} />
    </PageStill>
  );
};
