"use client";

import React, { useRef, useState } from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Icon } from "@/components/primitives/Icon";
import { HeroIntro } from "@/components/sections/home/HeroIntro";
import { useHeroIntro } from "@/components/sections/home/useHeroIntro";

interface HeroSectionProps {
  locale: Locale;
}

const CRANE_ALT = {
  en: "A crane hook and chains lifting a cargo container",
  ar: "خطاف رافعة وسلاسل ترفع حاوية شحن",
} as const;

const SCROLL = { en: "Scroll", ar: "تمرير" } as const;

export const HeroSection: React.FC<HeroSectionProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const copy = isAr ? homeContentAr.hero : homeContentEn.hero;
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr ? siteConfig.whatsappDefaultMsgAr : siteConfig.whatsappDefaultMsgEn
  )}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [introOn, setIntroOn] = useState(true);

  useHeroIntro(rootRef, {
    onDone: () => setIntroOn(false),
  });

  return (
    <div className="corridor-underlap" ref={rootRef}>
      <section data-hero data-header-overlay className="corridor-port corridor-crane-hero">
        <div className="rklt-crane-arc" aria-hidden="true" />
        <div className="rklt-crane-slot">
          <div className="rklt-crane-rig" data-crane>
            <span className="rklt-crane-shade" data-crane-shade aria-hidden="true" />
            <h1 className="rklt-crane-copy">
              <span className="rklt-crane-name" dir="ltr">
                <span className="rklt-crane-paint" data-crane-line>
                  <span>RKLT</span>
                  <span className="rklt-crane-laser" data-crane-laser aria-hidden="true" />
                </span>
              </span>
            </h1>
            <img
              className="rklt-crane"
              src="/assets/hero/crane-container.webp"
              alt={isAr ? CRANE_ALT.ar : CRANE_ALT.en}
              width={2000}
              height={1642}
              draggable={false}
              fetchPriority="high"
            />
          </div>
        </div>
        <div className="rklt-crane-foot">
          <div className="rklt-crane-brief">
            <p className="rklt-crane-brief-title">{copy.copyLead}</p>
            <a className="rklt-crane-cta" href={`/${locale}/services`}>
              {copy.ctaServices}
            </a>
          </div>
          <a className="rklt-crane-scroll" href="#credibility">
            <span>{isAr ? SCROLL.ar : SCROLL.en}</span>
            <span className="rklt-crane-scroll-line" aria-hidden="true" />
          </a>
          <div className="rklt-crane-modes">
            <p className="rklt-crane-modes-line">{copy.blurb}</p>
            <a className="rklt-crane-cta" href={whatsappHref}>
              <Icon name="whatsapp" size={16} />
              {copy.ctaPrimary}
            </a>
          </div>
        </div>
      </section>
      {introOn ? <HeroIntro skipLabel={isAr ? "تخطّي" : "Skip"} /> : null}
    </div>
  );
};
