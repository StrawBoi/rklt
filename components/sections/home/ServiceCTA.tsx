"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";

interface ServiceCTAProps {
  locale: Locale;
}

export const ServiceCTA: React.FC<ServiceCTAProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً، أود التنسيق مع فريق ربوع الخير بخصوص متطلبات الشحن واللوجستيات."
      : "Hello, I would like to consult with RKLT regarding our freight and logistics requirements."
  )}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const btn = magneticBtnRef.current;
    const headline = headlineRef.current;
    const rings = ringsRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Headline & Content Scroll Reveal
      if (headline) {
        const lines = headline.querySelectorAll(".service-cta-line");
        gsap.fromTo(
          lines,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );
      }

      // 2. Concentric Rings Breathing & Expansion on Scroll
      if (rings) {
        const circles = rings.querySelectorAll("circle");
        gsap.fromTo(
          circles,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );

        // Continuous subtle harmonic breathing
        gsap.to(circles, {
          scale: "+=0.03",
          transformOrigin: "50% 50%",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.4,
            from: "center",
          },
        });
      }

      // 3. Floating Button Entrance Animation
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0, opacity: 0, rotate: -15 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    // 4. Interactive Magnetic Mouse Physics on the Button
    const handleMouseMove = (e: MouseEvent) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
      const magnetRadius = 180; // active magnetic pull radius

      if (dist < magnetRadius) {
        const pull = (1 - dist / magnetRadius) * 0.45;
        const deltaX = (e.clientX - btnCenterX) * pull;
        const deltaY = (e.clientY - btnCenterY) * pull;

        gsap.to(btn, {
          x: deltaX,
          y: deltaY,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    const handleMouseLeave = () => {
      if (!btn) return;
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rklt-service-cta relative w-full overflow-hidden py-24 sm:py-32 lg:py-44 transition-colors duration-500"
      aria-label={isAr ? "جاهز لنقل شحناتك بذكاء؟" : "Ready to move smarter?"}
    >
      {/* Top Cadence Ruler Transition Indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-25" aria-hidden="true">
        <span className="w-[1px] h-3.5 bg-current" />
        <span className="w-[1px] h-3.5 bg-current" />
        <span className="w-[1px] h-3.5 bg-current" />
      </div>

      {/* =========================================================================
          BACKGROUND CONCENTRIC HARMONIC RINGS (UNITED CARRIERS SIGNATURE WAVE)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <svg
          ref={ringsRef}
          viewBox="0 0 1400 1400"
          className="w-[160vw] max-w-[1400px] h-[160vw] max-h-[1400px] opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="ringFadeMask" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <mask id="concentricMask">
              <rect width="1400" height="1400" fill="url(#ringFadeMask)" />
            </mask>
          </defs>

          <g mask="url(#concentricMask)">
            {[140, 220, 310, 410, 520, 640, 770, 910, 1060].map((radius, idx) => (
              <circle
                key={idx}
                cx="700"
                cy="700"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={idx % 2 === 0 ? "1" : "0.75"}
                strokeDasharray={idx === 3 || idx === 6 ? "4 6" : undefined}
                className="text-black/[0.08] [html[data-theme=night]_&]:text-white/[0.08] transition-colors"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT & MAGNETIC BUTTON
          ========================================================================= */}
      <Container size="wide" className="relative z-10">
        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* FLOATING MAGNETIC CTA BUTTON (WORK WITH US) */}
          <a
            ref={magneticBtnRef}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rklt-magnetic-badge group"
            aria-label={isAr ? "ابدأ التعاقد معنا عبر واتساب" : "Work with us via WhatsApp"}
          >
            <span className="rklt-magnetic-badge-inner">
              <span className="rklt-badge-text">
                {isAr ? (
                  <>
                    <span>ابدأ</span>
                    <span>معنا</span>
                  </>
                ) : (
                  <>
                    <span>WORK</span>
                    <span>WITH US</span>
                  </>
                )}
              </span>
              <span className="rklt-badge-arrow">
                <Icon name="whatsapp" size={16} />
              </span>
            </span>
          </a>

          {/* MASSIVE HERO HEADLINE */}
          <h2
            ref={headlineRef}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[0.98] text-[#091a21] [html[data-theme=night]_&]:text-white uppercase mb-8"
          >
            {isAr ? (
              <>
                <span className="service-cta-line block">جاهز لنقل</span>
                <span className="service-cta-line block">شحناتك</span>
                <span className="service-cta-line block text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]">
                  بذكاء؟
                </span>
              </>
            ) : (
              <>
                <span className="service-cta-line block">READY TO</span>
                <span className="service-cta-line block">MOVE</span>
                <span className="service-cta-line block text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]">
                  SMARTER?
                </span>
              </>
            )}
          </h2>

          {/* EDITORIAL SUBTITLE */}
          <p className="max-w-xl text-base sm:text-lg text-[#2d5661] [html[data-theme=night]_&]:text-white/70 leading-relaxed font-sans mb-10">
            {isAr
              ? "نحن هنا لمساعدتكم على تنمية أعمالكم دون عناء أو انتظار. لا مراكز اتصال آلية، بل خبراء نقل وتخليص جمركي متمرسون ومستعدون للمساعدة فوراً."
              : "We are here to help you grow without hassle. No call centres. No runaround. Just experienced freight specialists ready to help."}
          </p>

          {/* Direct Communication Badges / Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono uppercase tracking-wider text-[#091a21]/60 [html[data-theme=night]_&]:text-white/50 border-t border-black/10 [html[data-theme=night]_&]:border-white/10 pt-8 w-full max-w-lg">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span>{isAr ? "استجابة فورية" : "Direct Dispatch"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span>{isAr ? "تخليص جمركي مرخص ٤١٢" : "Licensed Broker #412"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span>{isAr ? "موانئ العقبة والمطار" : "Aqaba & AMM Hubs"}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
