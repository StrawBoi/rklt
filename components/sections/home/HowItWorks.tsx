"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

interface HowItWorksProps {
  locale: Locale;
}

const STILLS = ["route", "documents", "movement", "handover"] as const;

/**
 * GSAP is the only writer of each still's opacity and scale.
 * Reduced motion shows the finished frame.
 */
function useHandoverStills(rootRef: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const frames = root.querySelectorAll<HTMLElement>("[data-handover-still]");
      frames.forEach((frame) => {
        gsap.fromTo(
          frame,
          { autoAlpha: 0, scale: 1.06 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: frame,
              start: "top 84%",
              once: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [rootRef]);
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.howItWorks : homeContentEn.howItWorks;
  const rootRef = useRef<HTMLElement>(null);
  useHandoverStills(rootRef);

  return (
    <section ref={rootRef} className="corridor-handover">
      <Container>
        <div className="mb-12 max-w-3xl space-y-3 md:mb-16">
          <Eyebrow tone="ember" className="text-role-muted">
            {content.eyebrow}
          </Eyebrow>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-role-text md:text-5xl">
            {content.title}
          </h2>
          <p className="text-sm leading-relaxed text-role-muted md:text-base">{content.subtitle}</p>
        </div>
        <ol className="corridor-handover-grid">
          {content.steps.map((step, index) => (
            <li key={step.step} className="corridor-handover-card">
              <div className="corridor-handover-mark">
                <img
                  data-handover-still
                  src={`/assets/process/${STILLS[index]}.webp`}
                  alt=""
                  width={1600}
                  height={index === 0 ? 647 : 1067}
                />
                <span>{step.step}</span>
              </div>
              <div className="corridor-handover-copy">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};
