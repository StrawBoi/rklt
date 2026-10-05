import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface OperationalFAQProps {
  locale: Locale;
}

export const OperationalFAQ: React.FC<OperationalFAQProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.faq : contactContentEn.faq;

  return (
    <section className="py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-ink-950 border border-ink-800/90"
            >
              <h3 className="font-display font-bold text-lg text-sand-100 mb-3">
                {item.question}
              </h3>
              <p className="text-xs md:text-sm text-sand-300/80 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
