import React from "react";
import { Locale } from "@/lib/i18n";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { Icon, IconName } from "@/components/primitives/Icon";

interface ServicesExtendedProps {
  locale: Locale;
}

export const ServicesExtended: React.FC<ServicesExtendedProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.extended : servicesContentEn.extended;

  return (
    <section id="extended" className="scroll-mt-28 py-20 md:py-28 bg-ink-950 border-b border-ink-800">
      <Container>
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm md:text-base text-sand-300/80 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 9 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item) => (
            <div
              key={item.numeral}
              className="p-6 md:p-8 rounded-lg bg-ink-900 border border-ink-800 hover:border-ink-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-ink-800">
                  <Numeral size="sm" tone="terracotta">
                    {item.numeral}
                  </Numeral>
                  <div className="p-2 rounded bg-ink-800 text-terracotta-400">
                    <Icon name={item.icon as IconName} size={20} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-sand-100 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-sand-300/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-ink-800/60 text-[11px] font-semibold text-terracotta-400/90 flex items-center justify-between">
                <span>{isAr ? "متوفر ضمن العقود اللوجستية" : "Available in logistics scopes"}</span>
                <span className="rtl-flip">→</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
