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
  const orbitRef = useRef<SVGGElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً ربوع الخير، نود بدء شراكة استراتيجية والتنسيق لخدمات الشحن واللوجستيات."
      : "Hello RKLT team, let's partner up to manage our freight, clearance, and supply chain."
  )}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const btn = magneticBtnRef.current;
    const headline = headlineRef.current;
    const rings = ringsRef.current;
    const orbit = orbitRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Headline & Content Scroll Reveal
      if (headline) {
        const lines = headline.querySelectorAll(".service-cta-line");
        gsap.fromTo(
          lines,
          { opacity: 0, y: 44, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );
      }

      // 2. Concentric Radar Rings Breathing & Expansion on Scroll
      if (rings) {
        const circles = rings.querySelectorAll(".rklt-radar-circle");
        gsap.fromTo(
          circles,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );

        // Continuous harmonic radial breathing
        gsap.to(circles, {
          scale: "+=0.025",
          transformOrigin: "50% 50%",
          duration: 4.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.35,
            from: "center",
          },
        });
      }

      // 3. Seal of Custody Orbiting Micro-Typography Continuous Rotation
      if (orbit) {
        gsap.to(orbit, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }

      // 4. Floating Button Entrance Animation
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0, opacity: 0, rotate: -20 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    // 5. Interactive Magnetic Mouse Physics on the Badge
    const handleMouseMove = (e: MouseEvent) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
      const magnetRadius = 220; // magnetic pull field

      if (dist < magnetRadius) {
        const pull = (1 - dist / magnetRadius) * 0.42;
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

  const orbitingTextEn = "· RKLT FREIGHT NETWORK · EST. 1994 · LICENSED BROKER #412 ";
  const orbitingTextAr = "· شبكة ربوع الخير اللوجستية · تأسست ١٩٩٤ · ترخيص ٤١٢ ";

  return (
    <section
      ref={sectionRef}
      className="rklt-service-cta relative w-full overflow-hidden py-24 sm:py-32 lg:py-40 transition-colors duration-500"
      aria-label={isAr ? "فلنبدأ شراكتنا" : "Let's partner up"}
    >
      {/* =========================================================================
          BACKGROUND MARITIME RADAR & AZIMUTH GRATICULE
          Signature RKLT touch: Navigational radar telemetry & gateway coordinates
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0" aria-hidden="true">
        <svg
          ref={ringsRef}
          viewBox="0 0 1400 1400"
          className="w-[160vw] max-w-[1400px] h-[160vw] max-h-[1400px] select-none opacity-90 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="radarFadeMask" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <mask id="radarConcentricMask">
              <rect width="1400" height="1400" fill="url(#radarFadeMask)" />
            </mask>
          </defs>

          <g mask="url(#radarConcentricMask)">
            {/* Concentric Radar Rings */}
            {[140, 230, 330, 440, 560, 690, 830, 980, 1140].map((radius, idx) => (
              <circle
                key={idx}
                cx="700"
                cy="700"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={idx % 2 === 0 ? "1" : "0.75"}
                strokeDasharray={idx === 2 || idx === 5 ? "4 8" : undefined}
                className="rklt-radar-circle text-white/[0.08] [html[data-theme=day]_&]:text-black/[0.09] transition-colors"
              />
            ))}

            {/* Nautical Crosshair Axes */}
            <line x1="120" y1="700" x2="1280" y2="700" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 10" className="text-white/10 [html[data-theme=day]_&]:text-black/10" />
            <line x1="700" y1="120" x2="700" y2="1280" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 10" className="text-white/10 [html[data-theme=day]_&]:text-black/10" />

            {/* Subtle Cardinal Degrees & Port GPS Coordinates */}
            <text x="700" y="80" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" className="text-white/30 [html[data-theme=day]_&]:text-black/30 uppercase tracking-widest">
              000° · NORTH LEVANT CORRIDOR
            </text>
            <text x="700" y="1330" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" className="text-white/30 [html[data-theme=day]_&]:text-black/30 uppercase tracking-widest">
              180° · AQABA RED SEA GATEWAY (29.53° N, 35.00° E)
            </text>
            <text x="70" y="704" textAnchor="start" fontSize="10" fontFamily="monospace" fill="currentColor" className="text-white/30 [html[data-theme=day]_&]:text-black/30 uppercase tracking-widest">
              270° · MEDITERRANEAN
            </text>
            <text x="1330" y="704" textAnchor="end" fontSize="10" fontFamily="monospace" fill="currentColor" className="text-white/30 [html[data-theme=day]_&]:text-black/30 uppercase tracking-widest">
              090° · GCC & ARABIAN GULF (31.95° N, 35.93° E)
            </text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          MAIN EDITORIAL CONTENT & RKLT SEAL OF CUSTODY MAGNETIC BADGE
          ========================================================================= */}
      <Container size="wide" className="relative z-10">
        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* =====================================================================
              SIGNATURE RKLT "SEAL OF CUSTODY" MAGNETIC BADGE
              Dual-tone metallic brass & ember seal with orbiting micro-typography
              ===================================================================== */}
          <a
            ref={magneticBtnRef}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rklt-seal-badge group"
            aria-label={isAr ? "ابدأ الشراكة معنا عبر واتساب" : "Partner with RKLT via WhatsApp"}
          >
            {/* Ambient Pulsing Radar Aura */}
            <span className="rklt-seal-aura" aria-hidden="true" />

            {/* Orbiting Micro-Typography SVG Ring */}
            <svg
              viewBox="0 0 200 200"
              className="rklt-seal-orbit-svg"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="rkltSealPath"
                  d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                />
              </defs>
              <g ref={orbitRef} className="rklt-seal-orbit-g">
                <text
                  className="rklt-seal-orbit-text"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="0.18em"
                  fill="currentColor"
                >
                  <textPath href="#rkltSealPath" startOffset="0%">
                    {isAr ? orbitingTextAr : orbitingTextEn}
                  </textPath>
                </text>
              </g>
            </svg>

            {/* Central Solid Seal Core with Chamfered Brass Rim */}
            <div className="rklt-seal-core">
              <span className="rklt-seal-text">
                {isAr ? (
                  <>
                    <span>ابدأ</span>
                    <span>الشراكة</span>
                  </>
                ) : (
                  <>
                    <span>PARTNER</span>
                    <span>WITH US</span>
                  </>
                )}
              </span>
              <span className="rklt-seal-arrow" aria-hidden="true">
                <Icon name="whatsapp" size={15} />
              </span>
            </div>
          </a>

          {/* MASSIVE HERO DISPLAY HEADLINE */}
          <h2
            ref={headlineRef}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[0.98] text-white [html[data-theme=day]_&]:text-[#091a21] uppercase mb-6"
          >
            {isAr ? (
              <>
                <span className="service-cta-line block">فلنبدأ</span>
                <span className="service-cta-line block text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">
                  شراكتنا.
                </span>
              </>
            ) : (
              <>
                <span className="service-cta-line block">LET&apos;S</span>
                <span className="service-cta-line block text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">
                  PARTNER UP.
                </span>
              </>
            )}
          </h2>

          {/* EDITORIAL REASSURING SUBTITLE */}
          <p className="max-w-xl text-base sm:text-lg md:text-xl text-white/75 [html[data-theme=day]_&]:text-[#2d5661] font-sans font-medium leading-relaxed mb-10">
            {isAr
              ? "دقة، سرعة، وموثوقية في كل ميل."
              : "Precision, speed and reliability in every mile."}
          </p>

          {/* SECONDARY ACTION BUTTONS & TRUST BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono mb-12">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-[4px] bg-white text-[#091a21] [html[data-theme=day]_&]:bg-[#091a21] [html[data-theme=day]_&]:text-white font-bold uppercase tracking-wider hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-lg"
            >
              <Icon name="whatsapp" size={15} />
              <span>{isAr ? "بدء محادثة واتساب" : "Start Conversation"}</span>
            </a>

            <a
              href={`tel:${siteConfig.phoneClean}`}
              className="px-6 py-3.5 rounded-[4px] border border-white/20 [html[data-theme=day]_&]:border-black/15 text-white [html[data-theme=day]_&]:text-[#091a21] font-bold uppercase tracking-wider hover:border-white/40 [html[data-theme=day]_&]:hover:border-black/30 transition-colors inline-flex items-center gap-2"
            >
              <Icon name="phone" size={14} />
              <span>{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
