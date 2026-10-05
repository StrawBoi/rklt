import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface ServicesHeroProps {
  locale: Locale;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.hero : servicesContentEn.hero;

  const anchors = [
    { href: "#sea", label: isAr ? "الشحن البحري" : "Sea Freight" },
    { href: "#air", label: isAr ? "الشحن الجوي" : "Air Freight" },
    { href: "#land", label: isAr ? "الشحن البري" : "In-Land Transport" },
    { href: "#customs", label: isAr ? "التخليص الجمركي" : "Customs Clearance" },
    { href: "#extended", label: isAr ? "القدرات الموسعة (9)" : "Extended (9)" },
  ];

  return (
    <section className="pt-16 pb-14 md:pt-20 md:pb-16 bg-ink-950 border-b border-ink-800">
      <Container>
        <div className="max-w-4xl space-y-6">
          <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-sand-100 tracking-tight leading-tight">
            {content.title}
          </h1>

          <p className="text-base sm:text-lg text-sand-300/90 leading-relaxed max-w-3xl">
            {content.subtitle}
          </p>

          {/* In-page anchor jump pills */}
          <div className="pt-4 flex flex-wrap gap-2.5">
            {anchors.map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-ink-800 border border-ink-700 text-sand-100/90 hover:border-terracotta-500 hover:text-terracotta-300 transition-colors"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
