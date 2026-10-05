import React from "react";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";

interface HowItWorksProps {
  locale: Locale;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.howItWorks : homeContentEn.howItWorks;

  return (
    <section className="py-20 md:py-28 bg-ink-950 border-b border-ink-800">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Eyebrow tone="ember" className="justify-center">
            {content.eyebrow}
          </Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-sm md:text-base text-sand-300/80 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {content.steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 md:p-8 rounded-lg bg-ink-900 border border-ink-800 hover:border-ink-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink-800">
                  <span className="text-[10px] font-bold uppercase tracking-eyebrow text-sand-300/60">
                    {isAr ? `المرحلة ${idx + 1}` : `Phase ${idx + 1}`}
                  </span>
                  <Numeral size="md" tone="terracotta">
                    {step.step}
                  </Numeral>
                </div>

                <h3 className="font-display font-bold text-lg text-sand-100 mb-3">
                  {step.title}
                </h3>

                <p className="text-xs md:text-sm text-sand-300/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-ink-800/60 flex items-center gap-2 text-xs text-terracotta-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                <span>{isAr ? "إشراف ميداني مستمر" : "Active oversight"}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
