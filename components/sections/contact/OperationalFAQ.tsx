"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface OperationalFAQProps {
  locale: Locale;
}

export const OperationalFAQ: React.FC<OperationalFAQProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.faq : contactContentEn.faq;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#f7f3eb] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-[1.08]">
              {content.title}
            </h2>
          </div>

          <div className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
            {content.items.map((item, idx) => (
              <div
                key={idx}
                className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline"
              >
                <div className="lg:col-span-1">
                  <span className="font-numeral text-2xl text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] font-light">
                    0{idx + 1}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="font-display font-bold text-xl text-white [html[data-theme=day]_&]:text-[#091a21]">
                    {item.question}
                  </h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-sm sm:text-base text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
