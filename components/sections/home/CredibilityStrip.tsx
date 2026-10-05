import React from "react";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Numeral } from "@/components/primitives/Numeral";
import { Icon, IconName } from "@/components/primitives/Icon";

interface CredibilityStripProps {
  locale: Locale;
}

export const CredibilityStrip: React.FC<CredibilityStripProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.credibility : homeContentEn.credibility;

  const valueIcons: IconName[] = ["shield-check", "clock", "shield", "globe"];

  return (
    <section className="bg-ink-950 border-y border-ink-800 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* 30+ Years Stat Card */}
          <div className="lg:col-span-4 p-6 md:p-8 rounded-lg bg-ink-900 border border-ink-700/80 flex flex-col justify-center">
            <span className="text-xs uppercase font-bold tracking-eyebrow text-terracotta-400 mb-2">
              {isAr ? "سجل الإنجاز والخبرة" : "Operational Track Record"}
            </span>
            <div className="flex items-baseline gap-3 my-2">
              <Numeral size="xl" tone="terracotta">
                {content.experienceNumber}
              </Numeral>
              <span className="text-base md:text-lg font-bold text-sand-100 leading-snug">
                {content.experienceLabel}
              </span>
            </div>
            <p className="text-xs text-sand-300/80 pt-2 border-t border-ink-800">
              {content.experienceDetail}
            </p>
          </div>

          {/* 4 Values Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.values.map((v, i) => (
              <div
                key={v.title}
                className="p-5 rounded-md bg-ink-900/60 border border-ink-800/90 hover:border-ink-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-ink-800 text-terracotta-400">
                    <Icon name={valueIcons[i]} size={18} />
                  </div>
                  <h3 className="font-display font-bold text-base text-sand-100">
                    {v.title}
                  </h3>
                </div>
                <p className="text-xs text-sand-300/80 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
