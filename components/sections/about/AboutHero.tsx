import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface AboutHeroProps {
  locale: Locale;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.hero : aboutContentEn.hero;

  return (
    <section className="pt-16 pb-14 md:pt-20 md:pb-16 bg-ink-950 border-b border-ink-800">
      <Container>
        <div className="max-w-4xl space-y-6">
          <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-sand-100 tracking-tight leading-tight">
            {content.title}
          </h1>

          <p className="text-base sm:text-lg text-sand-300/90 leading-relaxed max-w-3xl">
            {content.subtitle}
          </p>
        </div>
      </Container>
    </section>
  );
};
