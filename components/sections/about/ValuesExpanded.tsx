"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ValuesExpandedProps {
  locale: Locale;
}

export const ValuesExpanded: React.FC<ValuesExpandedProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.values : aboutContentEn.values;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-dock border-b border-role-line">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-14 space-y-3">
            <Eyebrow tone="ember" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-role-muted leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {content.items.map((val, idx) => (
              <div
                key={val.numeral}
                className={`border-role-line py-8 md:px-10 ${
                  idx === 0 ? "border-t-0 pt-0" : "border-t"
                } ${idx % 2 === 0 ? "md:ps-0" : "md:border-s"} ${
                  idx < 2 ? "md:border-t-0 md:pt-0" : ""
                }`}
              >
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <Numeral size="md" tone="terracotta">
                    {val.numeral}
                  </Numeral>
                  <span className="font-arabic text-sm font-semibold text-role-muted">
                    {val.arabicTitle}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-role-text mb-3">
                  {val.title}
                </h3>
                <p className="text-sm text-role-muted leading-relaxed">{val.desc}</p>
                <p className="mt-4 text-xs font-semibold text-role-muted">
                  {isAr ? "معيار تشغيلي إلزامي" : "Mandatory Operational Standard"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
