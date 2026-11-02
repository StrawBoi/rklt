"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ServicesAdvisoryProps {
  locale: Locale;
}

export const ServicesAdvisory: React.FC<ServicesAdvisoryProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.advisory : servicesContentEn.advisory;
  const revealRef = useInViewOnce<HTMLDivElement>();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً ربوع الخير، أرغب في استشارة لوجستية لمسار شحن مخصص."
      : "Hello RKLT team, I would like logistics advisory for a custom cargo route."
  )}`;

  return (
    <section className="py-20 md:py-24 bg-[#0c141c] [html[data-theme=day]_&]:bg-[#ebe3d3] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
      <Container>
        <div
          ref={revealRef}
          className="rklt-reveal flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
        >
          <div className="space-y-3 max-w-2xl">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white [html[data-theme=day]_&]:text-[#091a21]">
              {content.title}
            </h3>
            <p className="text-base text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              href={whatsappUrl}
              external
              variant="primary"
              size="md"
              icon={<Icon name="whatsapp" size={18} />}
              iconPosition="left"
            >
              {content.cta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
