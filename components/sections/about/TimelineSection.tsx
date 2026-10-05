import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface TimelineSectionProps {
  locale: Locale;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.timeline : aboutContentEn.timeline;

  return (
    <section className="py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.events.map((ev, idx) => (
            <div
              key={ev.period}
              className="p-6 md:p-8 rounded-lg bg-ink-950 border border-ink-800 hover:border-ink-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-numeral text-2xl md:text-3xl font-extrabold text-terracotta-400 block mb-3">
                  {ev.period}
                </span>

                <h3 className="font-display font-bold text-lg text-sand-100 mb-2">
                  {ev.title}
                </h3>

                <p className="text-xs md:text-sm text-sand-300/80 leading-relaxed">
                  {ev.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-ink-800/80 text-[11px] font-semibold text-sand-300/60">
                {isAr ? `المحطة ${idx + 1}` : `Milestone 0${idx + 1}`}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
