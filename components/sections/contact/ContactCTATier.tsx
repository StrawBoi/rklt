"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Icon, IconName } from "@/components/primitives/Icon";

interface ContactCTATierProps {
  locale: Locale;
}

export const ContactCTATier: React.FC<ContactCTATierProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.ctaTier : contactContentEn.ctaTier;

  return (
    <section id="reach-us" className="py-20 md:py-28 rklt-bento-section transition-colors duration-300">
      <Container>
        <div className="mb-12 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {content.eyebrow}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight rklt-bento-heading">
            {isAr ? "قنوات التواصل المباشرة مع مكتب العمليات" : "Direct Channels to Our Operations Desk"}
          </h2>

          <p className="text-base sm:text-lg rklt-bento-lead leading-relaxed">
            {isAr
              ? "اختر القناة الأنسب لك لتنسيق مسارات الشحن، الاستفسار عن التعرفة الجمركية، أو المتابعة الميدانية."
              : "Select your preferred dispatch channel to coordinate freight routing, request customs rate estimates, or monitor active shipments."}
          </p>
        </div>

        {/* Bento Grid Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {content.channels.map((ch) => {
            let actionHref = "";
            let isExternal = false;

            if (ch.type === "whatsapp") {
              const msg = isAr
                ? siteConfig.whatsappDefaultMsgAr
                : siteConfig.whatsappDefaultMsgEn;
              actionHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                msg
              )}`;
              isExternal = true;
            } else if (ch.type === "phone") {
              actionHref = `tel:${siteConfig.phoneClean}`;
              isExternal = true;
            } else if (ch.type === "email") {
              actionHref = `mailto:${siteConfig.email}`;
            }

            const isPrimary = ch.isPrimary;
            const colSpan = isPrimary ? "md:col-span-12 lg:col-span-6" : "md:col-span-6 lg:col-span-3";

            return (
              <div
                key={ch.id}
                className={`rklt-bento-card ${colSpan} flex flex-col justify-between rounded-2xl p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-2xl ${
                  isPrimary ? "border-[#e2b34a]/30" : ""
                }`}
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#e2b34a]/15 text-[#e2b34a] flex items-center justify-center">
                        <Icon name={ch.icon as IconName} size={18} />
                      </div>
                      {isPrimary ? (
                        <span className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider font-bold uppercase rklt-bento-tag">
                          {isAr ? "الأسرع استجابة" : "Fastest Response"}
                        </span>
                      ) : null}
                    </div>

                    {isPrimary ? (
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#e2b34a]">
                        <span className="w-2 h-2 rounded-full bg-[#e2b34a] animate-pulse" />
                        <span>{isAr ? "< ١٥ دقيقة" : "< 15 min avg"}</span>
                      </div>
                    ) : null}
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl rklt-bento-card-title">
                    {ch.title}
                  </h3>

                  <p className="font-mono font-bold text-base sm:text-lg text-[#e2b34a] dir-ltr">
                    {ch.primaryText}
                  </p>

                  <p className="text-xs sm:text-sm rklt-bento-desc leading-relaxed">
                    {ch.secondaryText}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t rklt-bento-card-footer">
                  <a
                    href={actionHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isPrimary ? "rklt-bento-btn" : "rklt-tracking-pill-btn"
                    }`}
                  >
                    <Icon name={ch.icon as IconName} size={16} />
                    <span>{ch.ctaLabel}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
