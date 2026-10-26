"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface FullCoverageListProps {
  locale: Locale;
}

export const FullCoverageList: React.FC<FullCoverageListProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.coverage : contactContentEn.coverage;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section
      id="coverage"
      className="scroll-mt-28 py-20 md:py-28 bg-role-dock border-b border-role-line"
    >
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-14 space-y-3">
            <Eyebrow tone="terracotta" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-role-muted leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div>
            {content.regions.map((reg, idx) => (
              <div key={idx} className="border-t border-role-line py-8 first:border-t-0 first:pt-0">
                <h3 className="font-display font-bold text-xl text-role-text mb-2">
                  {reg.name}
                </h3>
                <p className="max-w-3xl text-sm text-role-muted leading-relaxed">
                  {reg.detail}
                </p>
                <p className="mt-3 text-[11px] font-semibold text-role-muted">
                  {isAr ? "شحن مجدول منتظم" : "Regular schedule"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
