"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { Icon, IconName } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ServicesExtendedProps {
  locale: Locale;
}

export const ServicesExtended: React.FC<ServicesExtendedProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.extended : servicesContentEn.extended;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section
      id="extended"
      className="scroll-mt-28 py-20 md:py-28 bg-role-dock border-b border-role-line"
    >
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-14 space-y-3">
            <Eyebrow tone="ember" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-role-muted leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div>
            {content.items.map((item) => (
              <div
                key={item.numeral}
                className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-role-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr_auto]"
              >
                <Numeral size="sm" tone="terracotta" className="text-role-text">
                  {item.numeral}
                </Numeral>
                <div>
                  <h3 className="font-display font-bold text-lg text-role-text mb-2">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-sm text-role-muted leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold text-role-muted">
                    {isAr ? "متوفر ضمن العقود اللوجستية" : "Available in logistics scopes"}
                  </p>
                </div>
                <Icon name={item.icon as IconName} size={20} className="text-role-text" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
