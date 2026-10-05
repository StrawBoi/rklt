import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { Icon, IconName } from "@/components/primitives/Icon";

interface ContactCTATierProps {
  locale: Locale;
}

export const ContactCTATier: React.FC<ContactCTATierProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.ctaTier : contactContentEn.ctaTier;

  return (
    <section id="reach-us" className="py-16 md:py-24 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Eyebrow tone="terracotta" className="justify-center mb-3">
            {content.eyebrow}
          </Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-sand-100">
            {isAr ? "اختر القناة الأنسب لك" : "Connect with Our Operations Desk"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`p-8 rounded-lg flex flex-col justify-between transition-all ${
                  ch.isPrimary
                    ? "bg-ink-950 border-2 border-terracotta-500 shadow-glow"
                    : "bg-ink-950/80 border border-ink-700/80 hover:border-ink-600"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-md ${
                        ch.isPrimary
                          ? "bg-terracotta-500 text-ink-950"
                          : "bg-ink-800 text-terracotta-400"
                      }`}
                    >
                      <Icon name={ch.icon as IconName} size={24} />
                    </div>
                    {ch.isPrimary && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-300 bg-terracotta-500/20 px-2.5 py-1 rounded">
                        {isAr ? "الأسرع رداً" : "Fastest Response"}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-xl text-sand-100 mb-2">
                    {ch.title}
                  </h3>

                  <p className="font-sans font-bold text-lg text-terracotta-400 mb-2 dir-ltr">
                    {ch.primaryText}
                  </p>

                  <p className="text-xs text-sand-300/80 leading-relaxed">
                    {ch.secondaryText}
                  </p>
                </div>

                <div className="pt-8">
                  <Button
                    href={actionHref}
                    external={isExternal}
                    variant={ch.isPrimary ? "primary" : "outline"}
                    surface="dark"
                    size="md"
                    className="w-full justify-center"
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
      </Container>
    </section>
  );
};
