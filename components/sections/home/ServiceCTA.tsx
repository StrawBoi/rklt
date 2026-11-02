"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { siteConfig } from "@/content/site";

interface ServiceCTAProps {
  locale: Locale;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً، أود بدء العمل معكم والاستفسار عن خدمات وحلول الشحن والتخليص."
      : "Hello RKLT team, I would like to work with you and explore freight options."
  )}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const badge = badgeRef.current;
    const rings = ringsRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Headline entrance on scroll into view
      if (headline) {
        gsap.fromTo(
          headline.querySelectorAll(".rklt-cta-word"),
          { opacity: 0, y: 36, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // 2. Continuous subtle radial breathing of the rings
      if (rings) {
        gsap.to(rings.querySelectorAll(".rklt-concentric-ring"), {
          scale: 1.035,
          opacity: "+=0.08",
          transformOrigin: "center center",
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.4,
            from: "center",
          },
        });
      }

      // 3. Floating magnetic badge hover physics
      if (badge) {
        // Subtle floating idle motion
        gsap.to(badge, {
          y: -8,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Mouse parallax magnet effect
        const xTo = gsap.quickTo(badge, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(badge, "y", { duration: 0.4, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          // Scale down distance to create realistic magnetic attraction
          xTo(relX * 0.06);
          yTo(relY * 0.06);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rklt-service-cta relative w-full overflow-hidden py-32 md:py-48 flex items-center justify-center transition-colors duration-500"
      aria-label={isAr ? "دعوة للعمل وبدء الشحن" : "Call to Action"}
    >
      {/* =========================================================================
          BACKGROUND CONCENTRIC HARMONIC RINGS
          Inspired by United Carriers signature radiating circles
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <svg
          ref={ringsRef}
          viewBox="0 0 1600 1200"
          className="w-[180vw] max-w-[2000px] h-auto shrink-0 select-none opacity-85 transition-opacity"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle radial gradient fill overlay */}
          <radialGradient id="ctaAura" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.04" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.02" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <circle cx="800" cy="600" r="580" fill="url(#ctaAura)" className="text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]" />

          {/* Concentric rings of varying diameters */}
          {[130, 240, 360, 480, 600, 720, 850, 990].map((radius, index) => (
            <circle
              key={radius}
              cx="800"
              cy="600"
              r={radius}
              stroke="currentColor"
              strokeWidth={index % 2 === 0 ? "1" : "0.75"}
              strokeDasharray={index % 3 === 1 ? "4 8" : undefined}
              className="rklt-concentric-ring text-black/15 [html[data-theme=night]_&]:text-white/12 transition-colors duration-300"
              style={{
                opacity: Math.max(0.2, 0.95 - index * 0.09),
              }}
            />
          ))}

          {/* Crosshair / Axis ticks for authentic logistics telemetry */}
          <line x1="150" y1="600" x2="1450" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12" className="text-black/10 [html[data-theme=night]_&]:text-white/10" />
          <line x1="800" y1="50" x2="800" y2="1150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12" className="text-black/10 [html[data-theme=night]_&]:text-white/10" />
        </svg>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT & MAGNETIC BUTTON
          ========================================================================= */}
      <Container size="wide" className="relative z-10">
        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* FLOATING MAGNETIC CTA BUTTON (WORK WITH US) */}
          <a
            ref={badgeRef}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isAr ? "ابدأ معنا عبر واتساب" : "Work with us via WhatsApp"}
            className="rklt-magnetic-badge group absolute -top-12 md:-top-16 -left-4 sm:left-4 md:-left-12 lg:-left-20 z-20 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center text-white font-display font-black tracking-wider uppercase text-center p-3 shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f25f22 0%, #e0470b 100%)",
            }}
          >
            {/* Outer pulsating ring */}
            <span className="absolute inset-0 rounded-full border border-[#f25f22] animate-ping opacity-25 pointer-events-none" />

            <span className="text-xs sm:text-sm md:text-base leading-tight font-extrabold tracking-wide drop-shadow-sm select-none">
              {isAr ? (
                <>
                  ابدأ
                  <br />
                  معنا
                </>
              ) : (
                <>
                  WORK
                  <br />
                  WITH US
                </>
              )}
            </span>
            <span className="mt-1 text-xs opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
              ↗
            </span>
          </a>

          {/* MAIN PROMINENT DISPLAY HEADLINE */}
          <h2
            ref={headlineRef}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#091a21] [html[data-theme=night]_&]:text-white uppercase leading-[1.05] sm:leading-[1.02] mb-6 sm:mb-8"
          >
            {isAr ? (
              <>
                <span className="rklt-cta-word inline-block mr-3">جاهز</span>
                <span className="rklt-cta-word inline-block mr-3">لنقل</span>
                <span className="rklt-cta-word inline-block mr-3">شحناتك</span>
                <br className="hidden sm:inline" />
                <span className="rklt-cta-word inline-block mr-3 text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]">
                  بذكاء
                </span>
                <span className="rklt-cta-word inline-block">وثقة؟</span>
              </>
            ) : (
              <>
                <span className="rklt-cta-word inline-block mr-3 md:mr-5">READY</span>
                <span className="rklt-cta-word inline-block mr-3 md:mr-5">TO</span>
                <span className="rklt-cta-word inline-block">MOVE</span>
                <br className="hidden sm:inline" />
                <span className="rklt-cta-word inline-block text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]">
                  SMARTER?
                </span>
              </>
            )}
          </h2>

          {/* EDITORIAL REASSURING SUBTEXT */}
          <p className="max-w-xl text-base sm:text-lg md:text-xl text-[#2d5661] [html[data-theme=night]_&]:text-white/75 font-normal leading-relaxed mb-10">
            {isAr
              ? "نحن هنا لمساعدتك على تنمية أعمالك دون تعقيد. لا مراكز اتصال مبهمة. فقط خبراء لوجستيون جاهزون لخدمتك فوراً."
              : "We are here to help you grow without hassle. No call centres. No runaround. Just experienced people ready to help."}
          </p>

          {/* SECONDARY ACTION BUTTONS & TRUST BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-3.5 rounded-full bg-[#091a21] text-white [html[data-theme=night]_&]:bg-white [html[data-theme=night]_&]:text-[#091a21] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              {isAr ? "طلب تسعيرة رسمية" : "Request Formal Quote"}
            </Link>

            <a
              href={`tel:${siteConfig.phoneClean}`}
              className="px-6 py-3.5 rounded-full border border-black/15 [html[data-theme=night]_&]:border-white/20 text-[#091a21] [html[data-theme=night]_&]:text-white font-bold uppercase tracking-wider hover:border-black/30 [html[data-theme=night]_&]:hover:border-white/40 transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>

          {/* Operational Trust Signals */}
          <div className="mt-14 pt-8 border-t border-black/10 [html[data-theme=night]_&]:border-white/10 w-full flex flex-wrap items-center justify-center gap-6 sm:gap-12 font-mono text-xs text-[#091a21]/60 [html[data-theme=night]_&]:text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span>{isAr ? "إدارة شحنات مباشرة دون وسطاء" : "Direct Dispatch · Zero Brokers"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span>{isAr ? "مرخص تخليص جمركي رقم ٤١٢" : "Licensed Customs Broker #412"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span>{isAr ? "موانئ العقبة ومطار عمّان" : "Aqaba Port & AMM Terminals"}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
