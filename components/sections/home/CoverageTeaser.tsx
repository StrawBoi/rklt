"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ArrowLink } from "@/components/primitives/ArrowLink";
import { Numeral } from "@/components/primitives/Numeral";
import { useInViewOnce } from "./useInViewOnce";

interface CoverageTeaserProps {
  locale: Locale;
}

export const CoverageTeaser: React.FC<CoverageTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.coverageTeaser : homeContentEn.coverageTeaser;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-dock">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3 max-w-2xl">
              <Eyebrow tone="ember" className="text-role-muted">
                {content.eyebrow}
              </Eyebrow>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-sm md:text-base text-role-muted leading-relaxed">
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

          <div className="grid grid-cols-1 border-t border-role-line sm:grid-cols-2 lg:grid-cols-4">
            {content.hubs.map((hub) => (
              <div
                key={hub.code}
                className="border-b border-role-line py-8 sm:pe-8 lg:border-b-0 lg:border-s lg:px-8 lg:py-2 lg:first:border-s-0 lg:first:ps-0"
              >
                <Numeral size="lg" tone="terracotta" dir="ltr">
                  {hub.code}
                </Numeral>
                <h3 className="font-display font-bold text-lg text-role-text mt-4 mb-1">
                  {hub.name}
                </h3>
                <p className="text-sm text-role-muted">{hub.type}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
