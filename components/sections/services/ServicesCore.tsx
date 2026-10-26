"use client";

import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Numeral } from "@/components/primitives/Numeral";
import { Button } from "@/components/primitives/Button";
import { Icon, IconName } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ServicesCoreProps {
  locale: Locale;
}

function ServiceStill({ id, name }: { id: string; name: string }) {
  const [ok, setOk] = React.useState(true);
  if (!ok) return null;
  return (
    <div className="relative aspect-[16/9] h-full min-h-[16rem] w-full lg:aspect-auto lg:min-h-[22rem]">
      <Image
        src={`/assets/services/${id}.jpg`}
        alt={name}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover object-center"
        onError={() => setOk(false)}
      />
    </div>
  );
}

export const ServicesCore: React.FC<ServicesCoreProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.core : servicesContentEn.core;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section id="core" className="py-20 md:py-28 bg-role-field border-b border-role-line">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="mb-14 space-y-3">
            <Eyebrow tone="terracotta" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
          </div>

          <div>
            {content.services.map((svc, idx) => {
              const pictureEnd = idx % 2 === 1;
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
                  className="scroll-mt-28 border-t border-role-line py-12 first:border-t-0 first:pt-0"
                >
                  <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                    <div className={pictureEnd ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"}>
                      <ServiceStill id={svc.id} name={svc.name} />
                    </div>
                    <div
                      className={
                        pictureEnd
                          ? "space-y-4 p-8 md:p-12 lg:col-span-7 lg:order-1"
                          : "space-y-4 p-8 md:p-12 lg:col-span-7"
                      }
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-role-line">
                        <Numeral size="lg" tone="terracotta">
                          {svc.numeral}
                        </Numeral>
                        <div className="p-3 rounded-md bg-role-dock text-role-text">
                          <Icon name={svc.icon as IconName} size={28} />
                        </div>
                      </div>

                      <h3 className="font-display font-extrabold text-2xl md:text-3xl text-role-text leading-tight">
                        {svc.name}
                      </h3>

                      <p className="text-xs uppercase font-bold tracking-wider text-role-muted">
                        {svc.tagline}
                      </p>

                      <p className="text-sm md:text-base text-role-text leading-relaxed">
                        {svc.description}
                      </p>

                      <h4 className="text-xs font-bold uppercase tracking-eyebrow text-role-muted">
                        {isAr ? "الميزات والقدرات التشغيلية:" : "Key Operational Capabilities:"}
                      </h4>
                      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {svc.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-xs text-role-muted leading-normal"
                          >
                            <span className="text-role-action flex-shrink-0 mt-0.5">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
