"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { Icon, IconName } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface ContactCTATierProps {
  locale: Locale;
}

export const ContactCTATier: React.FC<ContactCTATierProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.ctaTier : contactContentEn.ctaTier;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section id="reach-us" className="py-16 md:py-24 bg-role-dock border-b border-role-line">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="mb-10 max-w-2xl">
            <Eyebrow tone="terracotta" className="mb-3 text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-role-text">
              {isAr ? "اختر القناة الأنسب لك" : "Connect with Our Operations Desk"}
            </h2>
          </div>

          <div>
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

              return (
                <div
                  key={ch.id}
                  className={
                    ch.isPrimary
                      ? "bg-role-action px-6 py-8 text-role-on md:px-10"
                      : "flex flex-col gap-6 border-t border-role-line py-8 md:flex-row md:items-center md:justify-between"
                  }
                >
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <Icon name={ch.icon as IconName} size={20} />
                      {ch.isPrimary ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {isAr ? "الأسرع رداً" : "Fastest Response"}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">{ch.title}</h3>
                    <p className="font-sans font-bold text-lg mb-2 dir-ltr">{ch.primaryText}</p>
                    <p className={`text-sm leading-relaxed ${ch.isPrimary ? "text-role-on/80" : "text-role-muted"}`}>
                      {ch.secondaryText}
                    </p>
                  </div>
                  <div className={ch.isPrimary ? "pt-6" : ""}>
                    <Button
                      href={actionHref}
                      external={isExternal}
                      variant={ch.isPrimary ? "primary" : "outline"}
                      surface="dark"
                      size="md"
                      className={
                        ch.isPrimary
                          ? "bg-role-on text-role-action hover:bg-role-on"
                          : "text-role-text border-role-line hover:border-role-action hover:text-role-text"
                      }
                      icon={<Icon name={ch.icon as IconName} size={18} />}
                      iconPosition="left"
                    >
                      {ch.ctaLabel}
                    </Button>
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
