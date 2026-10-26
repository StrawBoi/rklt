"use client";

import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { useInViewOnce } from "./useInViewOnce";

interface StoryTeaserProps {
  locale: Locale;
}

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.storyTeaser : homeContentEn.storyTeaser;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-field border-b border-role-line">
      <Container>
        <div
          ref={revealRef}
          className="rklt-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow tone="terracotta" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight leading-tight">
              {content.title}
            </h2>

            <div className="space-y-4 text-sm md:text-base text-role-muted leading-relaxed">
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
                className="text-role-text border-role-line hover:border-role-action hover:text-role-text"
              >
                {content.ctaText}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[16/10] bg-role-dock">
              <Image
                src="/world/about/night/poster.jpg"
                alt={isAr ? "رصيف هادئ عند الغسق" : "Quiet quay at dusk"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>

            <blockquote className="border-s-2 border-role-action ps-4">
              <p className="font-display font-bold text-lg text-role-text italic">
                {isAr
                  ? "«الخدمة اللوجستية الممتازة تجعل النقل سلساً، والشراكة الحقيقية تجعل الثقة دائمة.»"
                  : '"Good logistics is invisible. Good partnerships are not."'}
              </p>
              <footer className="text-xs text-role-muted font-semibold mt-2">
                {isAr ? "قيادة ربوع الخير اللوجستية" : "RKLT Leadership Team"}
              </footer>
            </blockquote>

            <div className="flex items-center justify-between border-t border-role-line pt-4 text-xs text-role-muted">
              <span>{isAr ? "التواجد: العقبة وعمّان" : "Hubs: Aqaba & Amman"}</span>
              <span className="font-numeral text-base text-role-text font-bold">
                Est. 1990s
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
