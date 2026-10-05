import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { Button } from "@/components/primitives/Button";
import { Icon, IconName } from "@/components/primitives/Icon";

interface ServicesCoreProps {
  locale: Locale;
}

export const ServicesCore: React.FC<ServicesCoreProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.core : servicesContentEn.core;

  return (
    <section id="core" className="py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="mb-14 space-y-3">
          <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
        </div>

        <div className="space-y-12">
          {content.services.map((svc) => {
            const whatsappMsg = isAr
              ? `مرحباً ربوع الخير، أرغب في الاستفسار عن خدمة: ${svc.name}`
              : `Hello RKLT team, I would like to inquire about: ${svc.name}`;
            const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              whatsappMsg
            )}`;

            return (
              <div
                key={svc.id}
                id={svc.id}
                className="scroll-mt-28 p-8 md:p-12 rounded-lg bg-ink-950 border border-ink-700/80 hover:border-ink-600 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number, Title, Tagline */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-ink-800">
                      <Numeral size="lg" tone="terracotta">
                        {svc.numeral}
                      </Numeral>
                      <div className="p-3 rounded-md bg-ink-800 text-terracotta-400">
                        <Icon name={svc.icon as IconName} size={28} />
                      </div>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl md:text-3xl text-sand-100 leading-tight">
                      {svc.name}
                    </h3>

                    <p className="text-xs uppercase font-bold tracking-wider text-terracotta-300">
                      {svc.tagline}
                    </p>

                    <div className="pt-4">
                      <Button
                        href={whatsappUrl}
                        external
                        variant="primary"
                        size="sm"
                        icon={<Icon name="whatsapp" size={16} />}
                        iconPosition="left"
                      >
                        {isAr ? "طلب تسعيرة لهذه الخدمة" : "Inquire About This Service"}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Narrative + Features */}
                  <div className="lg:col-span-7 space-y-6 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-ink-800 lg:pl-8 rtl:lg:pl-0 rtl:lg:pr-8">
                    <p className="text-sm md:text-base text-sand-100/90 leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-eyebrow text-sand-300/80 mb-3">
                        {isAr ? "الميزات والقدرات التشغيلية:" : "Key Operational Capabilities:"}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {svc.features.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-sand-300/90 leading-normal"
                          >
                            <span className="text-terracotta-400 flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
