import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { Numeral } from "@/components/primitives/Numeral";
import { Icon } from "@/components/primitives/Icon";

interface HeroSectionProps {
  locale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.hero : homeContentEn.hero;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً ربوع الخير، أرغب في الاستفسار عن خدمات الشحن والنقل."
      : "Hello RKLT team, I would like to inquire about cargo shipping."
  )}`;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-8 pb-20 overflow-hidden bg-ink-900">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brandblue-500/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left rtl:lg:text-right">
            <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-sand-100">
              <span className="block">{content.titleLine1}</span>
              <span className="block text-terracotta-400 font-extrabold">
                {content.titleLine2}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-sand-100/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {content.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href={whatsappUrl}
                external
                variant="primary"
                size="lg"
                icon={<Icon name="whatsapp" size={20} />}
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                {content.ctaPrimary}
              </Button>

              <Button
                href={`/${locale}/services`}
                variant="outline"
                surface="dark"
                size="lg"
                icon={<Icon name="arrow-right" size={18} />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {content.ctaSecondary}
              </Button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-sand-300/80 font-medium border-t border-ink-800">
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-terracotta-400" />
                <span>{isAr ? "مرخص في ميناء العقبة" : "Licensed at Aqaba Port"}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-terracotta-400" />
                <span>{isAr ? "متابعة مباشرة 24/7" : "Direct 24/7 Operations"}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-terracotta-400" />
                <span>{isAr ? "نقل بري وجوي وبحري" : "Sea, Air & Land Corridors"}</span>
              </span>
            </div>
          </div>

          {/* Visual column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-lg overflow-hidden border border-ink-700 bg-ink-800/80 shadow-2xl group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-950">
                <Image
                  src="/assets/rklt-hero.jpg"
                  alt={
                    isAr
                      ? "شحن بحري وبري وجوي — شركة ربوع الخير لنقل وشحن البضائع"
                      : "RKLT Multimodal Cargo — Sea, Land and Air Freight Logistics"
                  }
                  fill
                  priority
                  className="object-cover object-center filter saturate-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-confident"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              </div>

              {/* Bottom badge on visual */}
              <div className="p-6 bg-ink-950/95 border-t border-ink-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-terracotta-300 uppercase tracking-wider block">
                    {isAr ? "الاعتماد والخبرة" : "Operational Standard"}
                  </span>
                  <span className="text-sm font-bold text-sand-100">
                    {isAr ? "أكثر من 30 عاماً من الثقة الميدانية" : "30+ Years of Verified Heritage"}
                  </span>
                </div>
                <div className="text-right rtl:text-left">
                  <Numeral size="md" tone="terracotta">
                    30+
                  </Numeral>
                </div>
              </div>
            </div>

            {/* Floating stamp tag */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 rtl:-left-auto rtl:-right-5 bg-terracotta-500 text-ink-950 p-4 rounded-md shadow-glow items-center gap-3">
              <Icon name="shield-check" size={24} />
              <div className="text-xs font-bold leading-tight">
                <div>{isAr ? "نقل موثوق" : "Trusted Handover"}</div>
                <div className="opacity-80 font-normal">
                  {isAr ? "من مكانك إلى أي مكان" : "From Source to Destination"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
