"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface CredentialsModuleProps {
  locale: Locale;
}

export const CredentialsModule: React.FC<CredentialsModuleProps> = ({
  locale,
}) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.credentials : aboutContentEn.credentials;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-[#0c141c] [html[data-theme=day]_&]:bg-[#ebe3d3] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
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
            {content.badges.map((b, idx) => (
              <div
                key={b.title}
                className={`border-white/10 [html[data-theme=day]_&]:border-black/10 py-10 md:px-10 ${
                  idx === 0 ? "border-t-0" : "border-t"
                } ${idx % 2 === 0 ? "md:ps-0" : "md:border-s"} ${
                  idx < 2 ? "md:border-t-0" : ""
                }`}
              >
                <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block mb-4 leading-none">
                  0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-xl text-white [html[data-theme=day]_&]:text-[#091a21] mb-2.5">
                  {b.title}
                </h3>
                <p className="text-sm sm:text-base text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                  {b.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 flex items-start gap-3 border-t border-white/12 [html[data-theme=day]_&]:border-black/12 pt-6 text-sm text-white/60 [html[data-theme=day]_&]:text-[#2d5661]">
            <Icon name="file-text" size={18} className="mt-0.5 flex-shrink-0 text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]" />
            <span>{content.note}</span>
          </p>
        </div>
      </Container>
    </section>
  );
};
