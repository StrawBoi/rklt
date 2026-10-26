"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface HubsAndHoursProps {
  locale: Locale;
}

export const HubsAndHours: React.FC<HubsAndHoursProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.hubs : contactContentEn.hubs;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-field border-b border-role-line">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-14 space-y-3">
            <Eyebrow tone="ember" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {content.locations.map((loc, idx) => (
              <div
                key={idx}
                className={`border-role-line py-8 md:px-10 ${
                  idx === 0 ? "border-t-0 pt-0 md:ps-0" : "border-t md:border-s md:border-t-0 md:pt-0"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="map-pin" size={20} className="mt-1 text-role-text" />
                    <div>
                      <h3 className="font-display font-bold text-xl text-role-text">
                        {loc.city}
                      </h3>
                      <p className="text-xs text-role-muted font-medium">
                        {loc.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-role-muted">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-role-text w-20 flex-shrink-0">
                        {isAr ? "العنوان:" : "Address:"}
                      </span>
                      <span>{loc.address}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-role-text w-20 flex-shrink-0">
                        {isAr ? "الدوام:" : "Hours:"}
                      </span>
                      <span>{loc.hours}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-role-text w-20 flex-shrink-0">
                        {isAr ? "الهاتف:" : "Phone:"}
                      </span>
                      <a
                        href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                        className="text-role-text hover:underline dir-ltr font-medium"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[11px] font-semibold text-role-muted">
                  {isAr ? "فريق العمليات متواجد ميدانياً" : "On-ground operations active"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
