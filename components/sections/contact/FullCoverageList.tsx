import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";

interface FullCoverageListProps {
  locale: Locale;
}

export const FullCoverageList: React.FC<FullCoverageListProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.coverage : contactContentEn.coverage;

  return (
    <section id="coverage" className="scroll-mt-28 py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm md:text-base text-sand-300/80 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.regions.map((reg, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-lg bg-ink-950 border border-ink-800 hover:border-ink-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-ink-800 text-terracotta-400">
                    <Icon name="globe" size={18} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-sand-100">
                    {reg.name}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-sand-300/90 leading-relaxed">
                  {reg.detail}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-ink-800/80 text-[11px] font-semibold text-terracotta-400/90 flex items-center justify-between">
                <span>{isAr ? "شحن مجدول منتظم" : "Regular schedule"}</span>
                <span className="rtl-flip">→</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
