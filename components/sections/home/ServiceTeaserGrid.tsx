import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { Card } from "@/components/primitives/Card";
import { Icon, IconName } from "@/components/primitives/Icon";
import { ArrowLink } from "@/components/primitives/ArrowLink";

interface ServiceTeaserGridProps {
  locale: Locale;
}

export const ServiceTeaserGrid: React.FC<ServiceTeaserGridProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.servicesTeaser : homeContentEn.servicesTeaser;

  return (
    <section className="py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight leading-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-sand-300/90 leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div>
            <ArrowLink
              href={`/${locale}/services`}
              tone="terracotta"
              direction="right"
            >
              {content.viewAll}
            </ArrowLink>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item) => (
            <Card
              key={item.id}
              surface="dark"
              interactive
              href={`/${locale}/services#${item.anchor}`}
              className="flex flex-col justify-between h-full min-h-[300px] border border-ink-700/80 hover:border-terracotta-500/60"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-ink-700/60">
                  <Numeral size="sm" tone="terracotta">
                    {item.numeral}
                  </Numeral>
                  <div className="p-2.5 rounded bg-ink-700/50 text-terracotta-400 group-hover:bg-terracotta-500 group-hover:text-ink-950 transition-colors">
                    <Icon name={item.icon as IconName} size={20} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-sand-100 mt-6 mb-3 group-hover:text-terracotta-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-sand-300/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-semibold text-terracotta-400">
                <span>{isAr ? "تفاصيل الخدمة" : "Service details"}</span>
                <span className="rtl-flip transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
