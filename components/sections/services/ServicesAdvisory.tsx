import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";

interface ServicesAdvisoryProps {
  locale: Locale;
}

export const ServicesAdvisory: React.FC<ServicesAdvisoryProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.advisory : servicesContentEn.advisory;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً ربوع الخير، أرغب في استشارة لوجستية لمسار شحن مخصص."
      : "Hello RKLT team, I would like logistics advisory for a custom cargo route."
  )}`;

  return (
    <section className="py-16 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="p-8 md:p-12 rounded-lg bg-ink-800/80 border border-ink-700 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center md:text-left rtl:md:text-right">
            <h3 className="font-display font-bold text-2xl text-sand-100">
              {content.title}
            </h3>
            <p className="text-sm text-sand-300/90 leading-relaxed">
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
