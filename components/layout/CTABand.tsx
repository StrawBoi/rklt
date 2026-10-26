"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface CTABandProps {
  locale: Locale;
  tone?: "dark" | "darker";
  className?: string;
}

export const CTABand: React.FC<CTABandProps> = ({
  locale,
  className,
}) => {
  const isArabic = locale === "ar";
  const revealRef = useInViewOnce<HTMLDivElement>();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isArabic
      ? "مرحباً ربوع الخير، أرغب في الحصول على تسعيرة شحن وتفاصيل الخدمات."
      : "Hello RKLT team, I would like to request a freight quote and route advice."
  )}`;

  return (
    <section
      className={cn(
        "relative py-16 md:py-24 border-t border-role-line overflow-hidden bg-role-overlay text-role-text",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-role-action/10 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center max-w-4xl">
        <div ref={revealRef} className="rklt-reveal">
          <Eyebrow tone="ember" className="justify-center mb-4 text-role-muted">
            {isArabic ? "تواصل مباشر دون تعقيد" : "Direct & Responsive Logistics"}
          </Eyebrow>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-role-text mb-6 leading-tight">
            {isArabic ? (
              <>
                جاهز لنقل شحنتك <span className="text-role-action">بثقة وأمان؟</span>
              </>
            ) : (
              <>
                Ready to move cargo with <span className="text-role-action">certainty?</span>
              </>
            )}
          </h2>

          <p className="text-base md:text-lg text-role-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            {isArabic
              ? "تواصل مباشرة مع فريق العمليات في الأردن عبر واتساب أو الهاتف. استجابة سريعة، استشارات جمركية دقيقة، ومتابعة لكل خطوة في مسار الشحنة."
              : "Connect directly with our cargo operations desk in Jordan via WhatsApp, call, or email. Fast response, verified customs guidance, and dedicated handover at every port."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={whatsappUrl}
              external
              variant="primary"
              size="lg"
              icon={<Icon name="whatsapp" size={20} />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              {isArabic ? "محادثة واتساب فورية" : "Start on WhatsApp"}
            </Button>

            <Button
              href={`tel:${siteConfig.phoneClean}`}
              external
              variant="outline"
              surface="dark"
              size="lg"
              icon={<Icon name="phone" size={18} />}
              iconPosition="left"
              className="w-full sm:w-auto text-role-text border-role-line hover:border-role-action hover:text-role-text"
            >
              {siteConfig.phone}
            </Button>

            <Button
              href={`mailto:${siteConfig.email}`}
              variant="ghost"
              size="md"
              icon={<Icon name="mail" size={16} />}
              iconPosition="left"
              className="w-full sm:w-auto text-role-text hover:text-role-text"
            >
              {isArabic ? "إرسال بريد إلكتروني" : "Send Email"}
            </Button>
          </div>

          <p className="text-xs text-role-muted mt-8">
            {isArabic
              ? "أوقات العمل: الأحد – الخميس 8:00 ص – 6:00 م · دعم الطوارئ والمتابعة متاح 24/7"
              : "Operating hours: Sun – Thu 8:00 AM – 6:00 PM (GMT+3) · Emergency cargo monitoring 24/7"}
          </p>
        </div>
      </Container>
    </section>
  );
};
