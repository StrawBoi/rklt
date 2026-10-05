import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";

interface StoryNarrativeProps {
  locale: Locale;
}

export const StoryNarrative: React.FC<StoryNarrativeProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.story : aboutContentEn.story;

  return (
    <section className="py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight leading-tight">
              {content.title}
            </h2>

            <div className="space-y-5 text-sm md:text-base text-sand-300/90 leading-relaxed">
              {content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6">
              <blockquote className="p-6 rounded-md bg-ink-950 border-l-4 rtl:border-l-0 rtl:border-r-4 border-terracotta-500">
                <p className="font-display font-bold text-lg md:text-xl text-sand-100 italic">
                  {content.quote.text}
                </p>
                <footer className="text-xs font-semibold text-terracotta-300 mt-2">
                  — {content.quote.author}
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-ink-950 border border-ink-700/80 shadow-2xl">
              <Image
                src="/assets/rklt-visual-board.jpg"
                alt={
                  isAr
                    ? "الهوية الملاحية واللوجستية لشركة ربوع الخير"
                    : "RKLT Maritime & Cargo Operational Identity"
                }
                fill
                className="object-cover object-top filter saturate-[0.8] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
            </div>

            <div className="p-6 rounded-lg bg-ink-950 border border-ink-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-eyebrow text-terracotta-400 block mb-1">
                  {isAr ? "الريادة المتواصلة" : "Operational Continuity"}
                </span>
                <span className="text-sm font-semibold text-sand-100">
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
