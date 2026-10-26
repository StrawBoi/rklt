"use client";

import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface StoryNarrativeProps {
  locale: Locale;
}

export const StoryNarrative: React.FC<StoryNarrativeProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.story : aboutContentEn.story;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-field border-b border-role-line">
      <Container>
        <div
          ref={revealRef}
          className="rklt-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow tone="terracotta" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight leading-tight">
              {content.title}
            </h2>

            <div className="space-y-5 text-sm md:text-base text-role-muted leading-relaxed">
              {content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6">
              <blockquote className="p-6 rounded-lg border border-role-line bg-role-panel border-s-4 border-s-role-action">
                <p className="font-display font-bold text-lg md:text-xl text-role-text italic">
                  {content.quote.text}
                </p>
                <footer className="text-xs font-semibold text-role-muted mt-2">
                  {content.quote.author}
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-role-dock">
              <Image
                src="/world/about/night/poster.jpg"
                alt={isAr ? "رصيف هادئ عند الغسق" : "Quiet quay at dusk"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-role-line pt-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-eyebrow text-role-muted block mb-1">
                  {isAr ? "الريادة المتواصلة" : "Operational Continuity"}
                </span>
                <span className="text-sm font-semibold text-role-text">
                  {isAr
                    ? "ثلاثة عقود من الوجود الميداني في الأردن"
                    : "Three Decades of Continuous On-Ground Service"}
                </span>
              </div>
              <Numeral size="lg" tone="terracotta">
                30+
              </Numeral>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
