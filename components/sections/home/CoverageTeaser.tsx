import React from "react";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ArrowLink } from "@/components/primitives/ArrowLink";
import { Icon } from "@/components/primitives/Icon";

interface CoverageTeaserProps {
  locale: Locale;
}

export const CoverageTeaser: React.FC<CoverageTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.coverageTeaser : homeContentEn.coverageTeaser;

  return (
    <section className="py-20 md:py-28 bg-ink-950">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight leading-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-sand-300/80 leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div>
            <ArrowLink
              href={`/${locale}/contact#coverage`}
              tone="terracotta"
              direction="right"
            >
              {content.cta}
            </ArrowLink>
          </div>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.hubs.map((hub) => (
            <div
              key={hub.code}
              className="p-6 rounded-lg bg-ink-900 border border-ink-800 hover:border-terracotta-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-numeral text-sm font-bold text-terracotta-400 px-2 py-0.5 rounded bg-terracotta-500/10 border border-terracotta-500/20">
                  {hub.code}
                </span>
                <Icon name="globe" size={18} className="text-sand-300/60" />
              </div>

              <h3 className="font-display font-bold text-lg text-sand-100 mb-1">
                {hub.name}
              </h3>
              <p className="text-xs text-sand-300/80">{hub.type}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
