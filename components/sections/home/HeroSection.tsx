"use client";

import React, { useEffect, useRef, useState } from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Icon } from "@/components/primitives/Icon";
import { HeroIntro } from "@/components/sections/home/HeroIntro";
import { useHeroIntro } from "@/components/sections/home/useHeroIntro";
import { createCraneDrop } from "@/components/sections/home/craneDrop";

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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.closest<HTMLElement>(".rklt-hero-stage");
    const section = root.querySelector<HTMLElement>(".corridor-crane-hero");
    const rig = root.querySelector<HTMLElement>("[data-crane]");
    const cred = document.getElementById("credibility");
    const shade = root.querySelector<HTMLElement>("[data-crane-shade]");
    const copyEl = root.querySelector<HTMLElement>(".rklt-crane-copy");
    const backdrop = root.querySelector<HTMLElement>(".corridor-crane-backdrop");

    if (!stage || !section || !rig || !cred) return;

    return createCraneDrop({
      stage,
      section,
      rig,
      cred,
      shade,
      copy: copyEl,
      backdrop,
    });
  }, []);

  return (
    <div className="corridor-underlap" ref={rootRef}>
      <div className="corridor-crane-backdrop" aria-hidden="true">
        <div className="rklt-crane-arc" aria-hidden="true" />
        <span className="rklt-backdrop-dim" aria-hidden="true" />
        {/* Cinematic Harbor Stage: Horizon Sky, 3-Band Perspective Ocean & Right-Quay Port */}
        <div className="rklt-harbor-stage" data-hero-depth aria-hidden="true">
          <div className="rklt-harbor-sky">
            <img
              src="/assets/hero/layers/sky.png"
              alt=""
              width={1536}
              height={1024}
              className="rklt-sky-img"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Bottom Photo Layer: Unveils bottom-to-top and settles at bottom of hero */}
          <div className="rklt-harbor-plate" data-harbor-plate>
            {/* Left Open Ocean */}
            <div className="rklt-harbor-ocean">
              <img
                src="/assets/hero/layers/ocean.png"
                alt=""
                width={1536}
                height={1024}
                className="rklt-ocean-img"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Right Quay Port & Ship */}
            <div className="rklt-harbor-port">
              <img
                src="/assets/hero/layers/ship.png"
                alt=""
                width={1536}
                height={1024}
                className="rklt-harbor-ship"
                loading="eager"
                decoding="async"
              />
              <img
                src="/assets/hero/layers/port.png"
                alt=""
                width={1536}
                height={1024}
                className="rklt-harbor-quay"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Atmospheric Depth Veil: Softens background high-contrast distractions */}
            <div className="rklt-harbor-veil" aria-hidden="true" />
          </div>

          {/* Center Focal Scrim: Isolates and elevates the container as the undisputed hero element */}
          <div className="rklt-container-focus-scrim" aria-hidden="true" />
        </div>
      </div>
      <section data-hero data-header-overlay className="corridor-port corridor-crane-hero">
        <div className="rklt-crane-slot">
          <div className="rklt-crane-rig" data-crane>
            <h1 className="rklt-crane-copy">
              <span className="rklt-crane-name" dir="ltr">
                <span className="rklt-crane-paint" data-crane-line>
                  <span>RKLT</span>
                  <span className="rklt-crane-laser" data-crane-laser aria-hidden="true" />
                </span>
              </span>
            </h1>

            {/* 30+ Years Operational Counter Behind Crane Chains */}
            <div className="rklt-crane-years" data-crane-years aria-hidden="true">
              <div className="rklt-crane-years-row" dir="ltr">
                <span className="rklt-crane-years-num" data-crane-years-num>
                  0
                </span>
                <span className="rklt-crane-years-plus" data-crane-years-plus>
                  +
                </span>
              </div>
              <div className="rklt-crane-years-meta">
                <span className="rklt-crane-years-label">
                  {isAr
                    ? "عاماً من الريادة والاعتماد اللوجستي"
                    : "YEARS OF OPERATIONAL MASTERY"}
                </span>
                <span className="rklt-crane-years-sub">
                  {isAr
                    ? "سجل وطني مرخص · تأسست عام ١٩٩٤"
                    : "EST. 1994 · JORDAN CUSTOMS LICENSE #412"}
                </span>
              </div>
            </div>

            {/* Crane Container Body: Scales 15% towards user + Parallaxes down on scroll */}
            <div className="rklt-crane-body" data-crane-body>
              <span className="rklt-crane-shade" data-crane-shade aria-hidden="true" />
              <img
                className="rklt-crane"
                src="/assets/hero/crane-container.webp"
                alt={isAr ? CRANE_ALT.ar : CRANE_ALT.en}
                width={2000}
                height={1642}
                draggable={false}
                fetchPriority="high"
              />
              <div className="rklt-container-base" data-container-base aria-hidden="true">
                <span className="rklt-base-lock is-start" />
                <span className="rklt-base-lock is-end" />
                <span className="rklt-base-line" />
              </div>
            </div>
          </div>
        </div>
        <div className="rklt-crane-foot">
          <div className="rklt-crane-brief">
            <p className="rklt-crane-brief-title">{copy.copyLead}</p>
          </div>
          <a className="rklt-crane-scroll" href="#credibility">
            <span>{isAr ? SCROLL.ar : SCROLL.en}</span>
            <span className="rklt-crane-scroll-line" aria-hidden="true" />
          </a>
          <div className="rklt-crane-modes">
            <p className="rklt-crane-modes-line">{copy.blurb}</p>
          </div>
        </div>
      </section>
      {introOn ? <HeroIntro skipLabel={isAr ? "تخطّي" : "Skip"} /> : null}
    </div>
  );
};
