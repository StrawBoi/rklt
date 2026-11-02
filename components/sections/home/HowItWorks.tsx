"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";

interface HowItWorksProps {
  locale: Locale;
}

const STILLS = ["route", "documents", "movement", "handover"] as const;

export const HowItWorks: React.FC<HowItWorksProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.howItWorks : homeContentEn.howItWorks;

  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionTrackRef = useRef<HTMLElement>(null);
  const horizontalViewportRef = useRef<HTMLDivElement>(null);
  const horizontalStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = sectionTrackRef.current;
    const strip = horizontalStripRef.current;
    const viewport = horizontalViewportRef.current;
    if (!track || !strip || !viewport) return;

    const isMobile = window.innerWidth < 1024;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reduceMotion) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const stripWidth = strip.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        return Math.max(0, stripWidth - viewportWidth);
      };

      gsap.to(strip, {
        x: () => (isAr ? getScrollAmount() : -getScrollAmount()),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const idx = Math.min(3, Math.floor(p * 4));
            setActiveStep(idx);
          },
        },
      });
    }, sectionTrackRef);

    return () => ctx.revert();
  }, [isAr]);

  return (
    <section
      ref={sectionTrackRef}
      id="process"
      aria-label={content.title}
      className="precision-corridor relative lg:h-[300vh] border-t border-white/10 [html[data-theme=day]_&]:border-black/10"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen w-full flex flex-col justify-between overflow-hidden py-20 lg:py-20">
        {/* Quiet, Open Editorial Header */}
        <Container size="wide" className="w-full shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 lg:pb-14">
            <div className="max-w-2xl">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-[1.08]">
                {content.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-white/60 [html[data-theme=day]_&]:text-[#2d5661] max-w-md leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </Container>

        {/* Open Architectural Horizontal Sequence (Zero SaaS Cards) */}
        <div
          ref={horizontalViewportRef}
          className="relative w-full flex-1 flex items-center overflow-hidden"
        >
          <div
            ref={horizontalStripRef}
            className="flex flex-col lg:flex-row items-start gap-16 lg:gap-28 xl:gap-36 px-6 sm:px-10 lg:px-[8vw] w-full lg:w-max pt-6 lg:pt-12"
          >
            {content.steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const photo = `/assets/process/${STILLS[idx]}.webp`;

              return (
                <article
                  key={step.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative w-full lg:w-[680px] xl:w-[760px] shrink-0 transition-opacity duration-500 max-lg:!opacity-100 ${
                    isActive ? "opacity-100" : "opacity-55 hover:opacity-90"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Monumental Numeral & Unboxed Editorial Copy */}
                    <div className="md:col-span-6 space-y-6">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter leading-none transition-colors duration-500 max-lg:!text-[#e2b34a] max-lg:[html[data-theme=day]_&]:!text-[#a87318] ${
                            isActive
                              ? "text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]"
                              : "text-white/20 [html[data-theme=day]_&]:text-[#091a21]/20"
                          }`}
                        >
                          {step.step}
                        </span>
                        <span
                          className={`h-[1px] flex-1 transition-colors duration-500 max-lg:!bg-[#e2b34a]/50 max-lg:[html[data-theme=day]_&]:!bg-[#a87318]/50 ${
                            isActive
                              ? "bg-[#e2b34a]/50 [html[data-theme=day]_&]:bg-[#a87318]/50"
                              : "bg-white/10 [html[data-theme=day]_&]:bg-black/10"
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="space-y-4 pt-2">
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-base sm:text-[17px] text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Quiet Architectural Still (Wash Treatment, Sharp 4px Corners) */}
                    <div className="md:col-span-6">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#061217] [html[data-theme=day]_&]:bg-[#eae4d8]">
                        <img
                          src={photo}
                          alt={step.title}
                          loading="lazy"
                          className={`w-full h-full object-cover object-center transition-all duration-700 max-lg:!opacity-80 max-lg:!scale-100 max-lg:!grayscale-[15%] ${
                            isActive
                              ? "opacity-75 [html[data-theme=day]_&]:opacity-85 scale-100 grayscale-[15%]"
                              : "opacity-35 [html[data-theme=day]_&]:opacity-45 scale-[1.03] grayscale-[70%]"
                          }`}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#051014]/60 via-transparent to-transparent [html[data-theme=day]_&]:from-[#091a21]/20"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
