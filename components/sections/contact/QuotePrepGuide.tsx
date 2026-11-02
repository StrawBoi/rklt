"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface QuotePrepGuideProps {
  locale: Locale;
}

export const QuotePrepGuide: React.FC<QuotePrepGuideProps> = ({ locale }) => {
  const content = locale === "ar" ? contactContentAr.quoteGuide : contactContentEn.quoteGuide;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-[#0c141c] [html[data-theme=day]_&]:bg-[#ebe3d3] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-[1.08]">
              {content.title}
            </h2>
            <p className="text-base md:text-lg text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/12 [html[data-theme=day]_&]:border-black/12">
            {content.items.map((item, idx) => (
              <div
                key={idx}
                className="pt-8 pb-6 md:px-6 first:md:ps-0 last:md:pe-0 border-b md:border-b-0 md:border-e border-white/10 [html[data-theme=day]_&]:border-black/10 last:border-none"
              >
                <span className="font-numeral text-4xl md:text-5xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block mb-4 leading-none">
                  0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-lg text-white [html[data-theme=day]_&]:text-[#091a21] mb-2.5">
                  {item.label}
                </h3>
                <p className="text-sm text-white/60 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
