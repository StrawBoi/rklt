"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Icon, IconName } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ServicesExtendedProps {
  locale: Locale;
}

export const ServicesExtended: React.FC<ServicesExtendedProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.extended : servicesContentEn.extended;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section
      id="extended"
      className="scroll-mt-28 py-24 md:py-32 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#f7f3eb] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300"
    >
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

          <div className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
            {content.items.map((item) => (
              <div
                key={item.numeral}
                className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-6 py-10"
              >
                <div className="md:col-span-2">
                  <span className="font-numeral text-4xl sm:text-5xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] leading-none">
                    {item.numeral}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white [html[data-theme=day]_&]:text-[#091a21]">
                    {item.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                  <Icon
                    name={item.icon as IconName}
                    size={20}
                    className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
