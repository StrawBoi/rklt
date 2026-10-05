import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";

interface ValuesExpandedProps {
  locale: Locale;
}

export const ValuesExpanded: React.FC<ValuesExpandedProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.values : aboutContentEn.values;

  return (
    <section className="py-20 md:py-28 bg-ink-950 border-b border-ink-800">
      <Container>
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm md:text-base text-sand-300/80 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.items.map((val) => (
            <div
              key={val.numeral}
              className="p-8 rounded-lg bg-ink-900 border border-ink-800 hover:border-terracotta-500/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-ink-800">
                  <Numeral size="md" tone="terracotta">
                    {val.numeral}
                  </Numeral>
                  <span className="font-arabic text-sm font-semibold text-sand-300/70">
                    {val.arabicTitle}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-sand-100 mb-3">
                  {val.title}
                </h3>

                <p className="text-sm text-sand-300/90 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-ink-800/60 flex items-center gap-2 text-xs font-semibold text-terracotta-400">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                <span>{isAr ? "معيار تشغيلي إلزامي" : "Mandatory Operational Standard"}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
