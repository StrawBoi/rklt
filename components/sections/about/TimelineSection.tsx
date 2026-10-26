"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface TimelineSectionProps {
  locale: Locale;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.timeline : aboutContentEn.timeline;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-field border-b border-role-line">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-14 space-y-3">
            <Eyebrow tone="terracotta" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
          </div>

          <div className="rklt-split rklt-split-4">
            {content.events.map((ev, idx) => (
              <div key={ev.period}>
                <span className="font-numeral text-2xl md:text-3xl font-extrabold text-role-action block mb-3">
                  {ev.period}
                </span>
                <h3 className="font-display font-bold text-lg text-role-text mb-2">
                  {ev.title}
                </h3>
                <p className="text-sm text-role-muted leading-relaxed">{ev.desc}</p>
                <p className="mt-4 text-[11px] font-semibold text-role-muted">
                  {isAr ? `المحطة ${idx + 1}` : `Milestone 0${idx + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
