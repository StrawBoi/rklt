"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface QuotePrepGuideProps {
  locale: Locale;
}

export const QuotePrepGuide: React.FC<QuotePrepGuideProps> = ({ locale }) => {
  const content = locale === "ar" ? contactContentAr.quoteGuide : contactContentEn.quoteGuide;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-field border-b border-role-line">
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

          <div className="rklt-split rklt-split-4">
            {content.items.map((item, idx) => (
              <div key={idx}>
                <span className="font-numeral text-xl text-role-action font-bold block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-base text-role-text mb-2">
                  {item.label}
                </h3>
                <p className="text-xs text-role-muted leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
