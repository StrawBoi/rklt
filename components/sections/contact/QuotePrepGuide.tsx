import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface QuotePrepGuideProps {
  locale: Locale;
}

export const QuotePrepGuide: React.FC<QuotePrepGuideProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.quoteGuide : contactContentEn.quoteGuide;

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-ink-900 border border-ink-800"
            >
              <span className="font-numeral text-xl text-terracotta-400 font-bold block mb-2">
                0{idx + 1}
              </span>
              <h3 className="font-display font-bold text-base text-sand-100 mb-2">
                {item.label}
              </h3>
              <p className="text-xs text-sand-300/80 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
