import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";

interface StoryTeaserProps {
  locale: Locale;
}

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.storyTeaser : homeContentEn.storyTeaser;

  return (
    <section className="py-20 md:py-28 bg-ink-900 border-b border-ink-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow tone="terracotta">{content.eyebrow}</Eyebrow>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight leading-tight">
              {content.title}
            </h2>

            <div className="space-y-4 text-sm md:text-base text-sand-300/90 leading-relaxed">
              {content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4">
              <Button
                href={`/${locale}/about`}
                variant="outline"
                surface="dark"
                icon={<Icon name="arrow-right" size={18} />}
                iconPosition="right"
              >
                {content.ctaText}
              </Button>
            </div>
          </div>

          {/* Visual / Quote Card */}
          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-lg bg-ink-950 border border-ink-700/80 shadow-xl space-y-6">
              <div className="relative aspect-[16/10] rounded overflow-hidden bg-ink-800">
                <Image
                  src="/assets/rklt-operations.jpg"
                  alt={
                    isAr
                      ? "فريق وعمليات شركة ربوع الخير لنقل وشحن البضائع"
                      : "RKLT Cargo Operations & Field Logistics"
                  }
                  fill
                  className="object-cover object-center filter saturate-[0.8] contrast-[1.1]"
                />
              </div>

              <blockquote className="border-l-2 rtl:border-l-0 rtl:border-r-2 border-terracotta-500 pl-4 rtl:pl-0 rtl:pr-4">
                <p className="font-display font-bold text-lg text-sand-100 italic">
                  {isAr
                    ? "«الخدمة اللوجستية الممتازة تجعل النقل سلساً، والشراكة الحقيقية تجعل الثقة دائمة.»"
                    : '"Good logistics is invisible. Good partnerships are not."'}
                </p>
                <footer className="text-xs text-terracotta-400 font-semibold mt-2">
                  {isAr ? "— قيادة ربوع الخير اللوجستية" : "— RKLT Leadership Team"}
                </footer>
              </blockquote>

              <div className="pt-2 border-t border-ink-800 flex items-center justify-between text-xs text-sand-300/80">
                <span>{isAr ? "التواجد: العقبة وعمّان" : "Hubs: Aqaba & Amman"}</span>
                <span className="font-numeral text-base text-terracotta-400 font-bold">
                  Est. 1990s
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
