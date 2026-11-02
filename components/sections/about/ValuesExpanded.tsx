"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ValuesExpandedProps {
  locale: Locale;
}

export const ValuesExpanded: React.FC<ValuesExpandedProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.values : aboutContentEn.values;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#f7f3eb] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-[1.06]">
              {content.title}
            </h2>
            <p className="text-base md:text-lg text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/12 [html[data-theme=day]_&]:border-black/12">
            {content.items.map((val, idx) => (
              <div
                key={val.numeral}
                className={`border-white/10 [html[data-theme=day]_&]:border-black/10 py-10 md:px-10 ${
                  idx === 0 ? "border-t-0" : "border-t"
                } ${idx % 2 === 0 ? "md:ps-0" : "md:border-s"} ${
                  idx < 2 ? "md:border-t-0" : ""
                }`}
              >
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span className="font-numeral text-4xl sm:text-5xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] leading-none">
                    {val.numeral}
                  </span>
                  <span className="font-arabic text-base font-bold text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                    {val.arabicTitle}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white [html[data-theme=day]_&]:text-[#091a21] mb-3">
                  {val.title}
                </h3>
                <p className="text-sm sm:text-base text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
