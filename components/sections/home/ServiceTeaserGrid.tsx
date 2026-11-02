"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/primitives/Icon";
import { DotMatrixIcon } from "./DotMatrixIcon";

interface ServiceTeaserGridProps {
  locale: Locale;
}

interface Slide {
  key: string;
  numeral: string;
  numeralAr: string;
  label: string;
  category: string;
  title: string;
  tagline?: string;
  body: string;
  features?: string[];
  photo: string;
  dayPhoto: string;
  video?: string;
}

interface IntroCard {
  id: string;
  numeral: string;
  numeralAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  slaTag: string;
  slaTagAr: string;
  src: string;
  daySrc: string;
  motionSrc: string;
}

const INTRO_CARDS: IntroCard[] = [
  {
    id: "sea",
    numeral: "01",
    numeralAr: "٠١",
    title: "Sea Freight",
    titleAr: "الشحن البحري",
    subtitle: "PORT OF AQABA & OCEAN LANES",
    subtitleAr: "ميناء العقبة والممرات البحرية",
    slaTag: "ACT · FCL / LCL",
    slaTagAr: "محطة العقبة · FCL/LCL",
    src: "/assets/services/sea.jpg",
    daySrc: "/assets/services/sea-day.jpg",
    motionSrc: "/assets/services/sea-motion.mp4",
  },
  {
    id: "air",
    numeral: "02",
    numeralAr: "٠٢",
    title: "Air Freight",
    titleAr: "الشحن الجوي",
    subtitle: "QUEEN ALIA TERMINAL (AMM)",
    subtitleAr: "محطة الشحن بمطار الملكة علياء",
    slaTag: "QAIA · 12–24H SLA",
    slaTagAr: "مطار علياء · ١٢–٢٤ ساعة",
    src: "/assets/services/air.jpg",
    daySrc: "/assets/services/air-day.jpg",
    motionSrc: "/assets/services/air-motion.mp4",
  },
  {
    id: "land",
    numeral: "03",
    numeralAr: "٠٣",
    title: "In-Land Transport",
    titleAr: "النقل البري",
    subtitle: "CROSS-BORDER BONDED FLEET",
    subtitleAr: "أسطول النقل البري والترانزيت",
    slaTag: "GCC & IRAQ · BONDED",
    slaTagAr: "الخليج والعراق · ترانزيت",
    src: "/assets/services/land.jpg",
    daySrc: "/assets/services/land-day.jpg",
    motionSrc: "/assets/services/land-motion.mp4",
  },
  {
    id: "customs",
    numeral: "04",
    numeralAr: "٠٤",
    title: "Customs Clearance",
    titleAr: "التخليص الجمركي",
    subtitle: "LICENSED BROKERAGE #412",
    subtitleAr: "ترخيص التخليص الجمركي ٤١٢",
    slaTag: "ASYCUDA · LIC #412",
    slaTagAr: "أسيكودا · ترخيص ٤١٢",
    src: "/assets/services/customs.jpg",
    daySrc: "/assets/services/customs-day.jpg",
    motionSrc: "/assets/services/cargo-motion.mp4",
  },
];

export const ServiceTeaserGrid: React.FC<ServiceTeaserGridProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const home = isAr ? homeContentAr : homeContentEn;
  const services = isAr ? servicesContentAr : servicesContentEn;

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  const gridWrapRef = useRef<HTMLDivElement>(null);
  const logisWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const decoCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const introCardVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // The Services Command Center Wrapper (scales up PayPal-style into full width)
  const mainCommandWrapRef = useRef<HTMLDivElement>(null);

  const serviceImgItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const serviceImgInnerRefs = useRef<(HTMLElement | null)[]>([]);
  const contentItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navBgGroup1Ref = useRef<HTMLDivElement>(null);
  const navBgGroup2Ref = useRef<HTMLDivElement>(null);
  const sweepLineRef = useRef<HTMLDivElement>(null);

  const slides = useMemo<Slide[]>(() => {
    const short = new Map(home.servicesTeaser.items.map((item) => [item.id, item.title]));

    return services.core.services.map((service, idx) => {
      const category = isAr
        ? idx < 2
          ? "المسارات الدولية"
          : idx < 4
          ? "الخدمات الإقليمية والحدودية"
          : "القدرات المتخصصة"
        : idx < 2
        ? "INTERNATIONAL FREIGHT"
        : idx < 4
        ? "REGIONAL LOGISTICS"
        : "SPECIALIZED CAPABILITIES";

      return {
        key: service.id,
        numeral: service.numeral,
        numeralAr: ["٠١", "٠٢", "٠٣", "٠٤", "٠٥", "٠٦"][idx] || service.numeral,
        label: short.get(service.id) ?? service.name,
        category,
        title: service.name,
        tagline: service.tagline,
        body: service.description,
        features: service.features?.slice(0, 3),
        photo: `/assets/services/${service.id}.jpg`,
        dayPhoto: `/assets/services/${service.id}-day.jpg`,
        video:
          service.id === "sea"
            ? "/assets/services/sea-motion.mp4"
            : service.id === "air"
            ? "/assets/services/air-motion.mp4"
            : service.id === "land"
            ? "/assets/services/land-motion.mp4"
            : service.id === "customs"
            ? "/assets/services/cargo-motion.mp4"
            : service.id === "reefer"
            ? "/assets/services/reefer-motion.mp4"
            : undefined,
      };
    });
  }, [home, services, isAr]);

  const groups = useMemo(() => {
    return isAr
      ? [
          { label: "المسارات الدولية والحدودية", indexes: [0, 1, 2, 3] },
          { label: "القدرات المتخصصة والحلول", indexes: [4, 5] },
        ]
      : [
          { label: "CORE SERVICES", indexes: [0, 1, 2, 3] },
          { label: "INTEGRATED SOLUTIONS", indexes: [4, 5] },
        ];
  }, [isAr]);

  const count = slides.length;
  const quote = isAr ? "احجز شحنتك الآن" : "START YOUR SHIPMENT";
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr ? siteConfig.whatsappDefaultMsgAr : siteConfig.whatsappDefaultMsgEn
  )}`;

  // Option B: Only play the single intro tile video that the user is actively hovering over
  const handleCardHoverEnter = (idx: number) => {
    setHoveredCardIdx(idx);
    introCardVideoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  };

  const handleCardHoverLeave = () => {
    setHoveredCardIdx(null);
    introCardVideoRefs.current.forEach((v) => {
      if (v) v.pause();
    });
  };

  const scrollToService = (index: number) => {
    const isMobile = window.innerWidth <= 991;
    if (isMobile) {
      setMobileExpanded(index);
      const el = contentItemRefs.current[index];
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }

    const item = contentItemRefs.current[index];
    if (!item) return;

    const cardTopOffset = Math.max(90, Math.round(window.innerHeight * 0.14));
    const y = item.getBoundingClientRect().top + window.scrollY - cardTopOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const toggleMobileAccordion = (index: number) => {
    setMobileExpanded((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    // GPU performance optimization: only play video for the active catalog slide
    serviceImgInnerRefs.current.forEach((el, i) => {
      if (el instanceof HTMLVideoElement) {
        if (i === activeIndex) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 991;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || reduceMotion) return;

    // 1. SCROLL-DRIVEN HEADLINE REVEAL
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll<HTMLSpanElement>(".uc-scrub-word");
      if (words.length > 0) {
        const headlineTl = gsap.timeline({
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.0,
          },
        });

        headlineTl.fromTo(
          words,
          {
            opacity: 0.12,
            y: 24,
            rotateX: -26,
            scale: 0.94,
            filter: "blur(4px)",
            transformOrigin: isAr ? "100% 50%" : "0% 50%",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.22,
            duration: 0.5,
            ease: "power2.out",
          }
        );

        if (logisWrapRef.current) {
          const sub = logisWrapRef.current.querySelector<HTMLElement>(".uc-logis-sub");
          const subRule = logisWrapRef.current.querySelector<HTMLElement>(".uc-logis-sub-rule");
          if (sub) {
            headlineTl.fromTo(
              sub,
              { opacity: 0.12, y: 18 },
              { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
              "-=0.2"
            );
          }
          if (subRule) {
            headlineTl.fromTo(
              subRule,
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.45, ease: "power2.out" },
              "<"
            );
          }
        }
      }
    }

    const ctx = gsap.context(() => {
      // 2. FLOATING PRINT-SEQUENCE REVEAL FOR THE 4 TEASER TILES
      // Unmasks top-to-bottom like a subtle manifest print sequence with gentle floating lift
      const decoCards = decoCardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (decoCards.length > 0) {
        gsap.fromTo(
          decoCards,
          {
            y: 22,
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.09,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".uc-intro-cards-row",
              start: "top 88%",
              end: "top 48%",
              scrub: 0.5,
            },
          }
        );
      }

      // 2B. PAYPAL-STYLE SCROLL SCALE-UP STARTING directly with the SERVICES COMMAND CENTER
      // Starts as an inset architectural monolith (86% width, sharp 10px corners) and expands
      // to 100% full-bleed viewport width as it locks in for the 6-service scroll catalog
      if (mainCommandWrapRef.current) {
        gsap.fromTo(
          mainCommandWrapRef.current,
          {
            width: "86%",
            borderRadius: "10px",
          },
          {
            width: "100%",
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: mainCommandWrapRef.current,
              start: "top 92%",
              end: "top 16%",
              scrub: 0.45,
            },
          }
        );
      }

      // 3. CATALOG PINNED MEDIA WIPE & SCROLL SYNCHRONIZATION
      const serviceImgs = serviceImgItemRefs.current.filter(Boolean) as HTMLDivElement[];
      const serviceInnerImgs = serviceImgInnerRefs.current.filter(Boolean) as HTMLElement[];
      const contentItems = contentItemRefs.current.filter(Boolean) as HTMLDivElement[];

      const cardTopCatalog = Math.max(90, Math.round(window.innerHeight * 0.14));
      const cardH = 340;
      const topTrigger = cardTopCatalog;
      const bottomTrigger = cardTopCatalog + cardH;
      const midTrigger = cardTopCatalog + cardH / 2;

      contentItems.forEach((item, idx) => {
        const isFirst = idx === 0;
        const targetImg = serviceImgs[idx];
        const innerImg = serviceInnerImgs[idx];
        const prevInnerImg = idx > 0 ? serviceInnerImgs[idx - 1] : null;

        // Toggle active index for left nav & LED icon
        ScrollTrigger.create({
          trigger: item,
          start: `top top+=${midTrigger}px`,
          end: `bottom top+=${midTrigger}px`,
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(idx);
              updateNavPolygonPill(idx);
            }
          },
        });

        // Guillotine unmask synchronized with scrolling content item
        if (!isFirst && targetImg) {
          const itemTl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: `top top+=${bottomTrigger}px`,
              end: `top top+=${topTrigger}px`,
              scrub: true,
            },
          });

          // Clip-path unmask from bottom
          itemTl.fromTo(
            targetImg,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", ease: "none" },
            0
          );

          // Incoming media scales up
          if (innerImg) {
            itemTl.fromTo(
              innerImg,
              { scale: 0.88 },
              { scale: 1.0, ease: "none" },
              0
            );
          }

          // Outgoing previous media scales down
          if (prevInnerImg) {
            itemTl.to(
              prevInnerImg,
              { scale: 0.94, ease: "none" },
              0
            );
          }

          // Laser sweep line across picture
          if (sweepLineRef.current) {
            itemTl.fromTo(
              sweepLineRef.current,
              { top: "100%", opacity: 1 },
              { top: "0%", opacity: 0, ease: "none" },
              0
            );
          }
        }
      });
    }, gridWrapRef);

    const updateNavPolygonPill = (activeIdx: number) => {
      const isGroup1 = activeIdx < 4;
      const groupCount = isGroup1 ? 4 : 2;
      const itemOffset = isGroup1 ? activeIdx : activeIdx - 4;

      const topPct = (itemOffset / groupCount) * 100;
      const botPct = ((itemOffset + 1) / groupCount) * 100;

      if (isGroup1 && navBgGroup1Ref.current) {
        gsap.to(navBgGroup1Ref.current, {
          clipPath: `polygon(0% ${topPct}%, 100% ${topPct}%, 100% ${botPct}%, 0% ${botPct}%)`,
          duration: 0.35,
          ease: "power2.out",
        });
        if (navBgGroup2Ref.current) {
          gsap.to(navBgGroup2Ref.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.25,
          });
        }
      } else if (!isGroup1 && navBgGroup2Ref.current) {
        gsap.to(navBgGroup2Ref.current, {
          clipPath: `polygon(0% ${topPct}%, 100% ${topPct}%, 100% ${botPct}%, 0% ${botPct}%)`,
          duration: 0.35,
          ease: "power2.out",
        });
        if (navBgGroup1Ref.current) {
          gsap.to(navBgGroup1Ref.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.25,
          });
        }
      }
    };

    return () => {
      ctx.revert();
    };
  }, [count, isAr]);

  return (
    <section id="services" ref={gridWrapRef} className="uc-service-root" aria-label={home.servicesTeaser.title}>
      {/* =========================================================================
          PART A: LIGHT/HONED INTRO WITH WORD-SCRUB HEADLINE & 4 FLOATING WASH TEASERS
          ========================================================================= */}
      <div ref={logisWrapRef} className="uc-service-logis-wrap">
        <div className="uc-service-container uc-logis-grid">
          {/* Animated Headline */}
          <div className="uc-logis-title">
            <h2 ref={headlineRef} className="uc-headline-display">
              <span className="uc-headline-fill">
                {home.servicesTeaser.title.split(" ").map((word, wIdx, arr) => {
                  const isAccent = isAr
                    ? wIdx <= 1 || wIdx === arr.length - 1
                    : wIdx === 0 || wIdx >= arr.length - 2;

                  return (
                    <span
                      key={wIdx}
                      className={`uc-scrub-word ${isAccent ? "is-accent" : ""}`}
                    >
                      {word}{" "}
                    </span>
                  );
                })}
              </span>
            </h2>
          </div>

          {/* Lead Paragraph Text */}
          <div className="uc-logis-sub">
            <span className="uc-logis-sub-rule" aria-hidden="true" />
            <p>{home.servicesTeaser.subtitle}</p>
          </div>
        </div>

        {/* =====================================================================
            4 FLOATING PRINT-SEQUENCE TEASER TILES (ATMOSPHERIC WASH + HOVER MOTION)
            * Pictures act as a subtle background wash behind typography until
              hovered, keeping them a true Teaser rather than the whole story. *
            ===================================================================== */}
        <div className="uc-service-container mt-6 lg:mt-8">
          <div
            className="uc-intro-cards-row"
            onMouseLeave={handleCardHoverLeave}
          >
            {INTRO_CARDS.map((card, idx) => {
              const isHovered = hoveredCardIdx === idx;
              const isDimmed = hoveredCardIdx !== null && hoveredCardIdx !== idx;

              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    decoCardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleCardHoverEnter(idx)}
                  onClick={() => scrollToService(idx)}
                  className={`uc-intro-card cursor-pointer group ${
                    isHovered ? "is-spotlight" : ""
                  } ${isDimmed ? "is-dimmed" : ""}`}
                >
                  {/* Top Print-Registration Line */}
                  <span className="uc-print-reg-line" aria-hidden="true" />

                  <div className="uc-intro-card-inner">
                    {/* Atmospheric Wash Media Layer (Low opacity duotone wash by default, blooms on hover) */}
                    <div className="uc-intro-wash-media" aria-hidden="true">
                      <Image
                        src={card.src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className={`object-cover [html[data-theme=day]_&]:hidden transition-all duration-500 ${
                          isHovered ? "opacity-0 scale-105" : "uc-wash-still scale-100"
                        }`}
                      />
                      <Image
                        src={card.daySrc}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className={`object-cover hidden [html[data-theme=day]_&]:block transition-all duration-500 ${
                          isHovered ? "opacity-0 scale-105" : "uc-wash-still scale-100"
                        }`}
                      />

                      {/* Single-Spotlight Hover Video Wash */}
                      <video
                        ref={(el) => {
                          introCardVideoRefs.current[idx] = el;
                        }}
                        src={card.motionSrc}
                        poster={card.daySrc}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                          isHovered ? "opacity-55 scale-105" : "opacity-0 pointer-events-none"
                        }`}
                      />

                      {/* Wash Gradient Veil so typography always commands primary hierarchy */}
                      <div className="uc-intro-wash-scrim" />
                    </div>

                    {/* Foreground Architectural Telemetry & Teaser Content */}
                    <div className="uc-intro-card-foreground">
                      <div className="flex items-center justify-between gap-2">
                        <span className="uc-badge-num">
                          {isAr ? card.numeralAr : card.numeral}
                        </span>
                      </div>

                      <div className="mt-auto pt-8">
                        <div className="flex items-end justify-between gap-2">
                          <div>
                            <h4 className="uc-intro-card-title">
                              {isAr ? card.titleAr : card.title}
                            </h4>
                            <p className="uc-intro-card-sub">
                              {isAr ? card.subtitleAr : card.subtitle}
                            </p>
                          </div>
                          <span className="uc-intro-arrow">
                            <Icon name="arrow-right" size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART B: PAYPAL-STYLE SCROLL-SCALING SERVICES COMMAND CENTER
          * Starts inset (86% width, sharp 10px corners) and scales to full-screen
            100% width as the user scrolls into the 3-column command catalog *
          ========================================================================= */}
      <div className="w-full flex justify-center">
        <div
          ref={mainCommandWrapRef}
          className="uc-service-main-wrap on-dark mx-auto"
        >
          <div className="uc-service-container uc-main-grid">
            {/* ===================================================================
                COLUMN 1 (COLS 1–4): LEFT STICKY NAVIGATION WITH SLIDING PILL
                =================================================================== */}
            <nav className="uc-service-resum" aria-label="Services Navigation">
              <div className="uc-service-resum-inner">
                {groups.map((group, gIdx) => (
                  <div key={group.label} className="uc-resum-group">
                    <div className="uc-resum-items-wrap">
                      <div className="uc-resum-items">
                        {group.indexes.map((idx) => {
                          const slide = slides[idx];
                          const isCurrent = activeIndex === idx;
                          return (
                            <button
                              key={slide.key}
                              ref={(el) => {
                                navItemRefs.current[idx] = el;
                              }}
                              type="button"
                              className={`uc-resum-btn ${isCurrent ? "is-active" : ""}`}
                              onClick={() => scrollToService(idx)}
                              aria-current={isCurrent ? "step" : undefined}
                            >
                              <span className="uc-resum-btn-txt">
                                {isAr ? slide.numeralAr : slide.numeral} {slide.label}
                              </span>
                              <span className="uc-resum-btn-line" />
                            </button>
                          );
                        })}
                      </div>
                      {/* Sliding Polygon Pill Background */}
                      <div
                        ref={gIdx === 0 ? navBgGroup1Ref : navBgGroup2Ref}
                        className="uc-resum-bg-pill"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))}

                {/* Catalog Link */}
                <div className="uc-resum-catalog">
                  <Link href={`/${locale}/services`} className="uc-catalog-link">
                    <span>{isAr ? "+٧ قدرات متخصصة في الدليل" : "+7 specialized capabilities"}</span>
                    <Icon name="arrow-right" size={13} />
                  </Link>
                </div>
              </div>
            </nav>

            {/* ===================================================================
                COLUMN 2 (COLS 5–8): PINNED STICKY PHOTO STAGE (INSIDE CATALOG)
                =================================================================== */}
            <div className="uc-service-img-cms hidden lg:block" aria-hidden="true">
              <div className="uc-service-img-list">
                {slides.map((s, idx) => (
                  <div
                    key={s.key}
                    ref={(el) => {
                      serviceImgItemRefs.current[idx] = el;
                    }}
                    className="uc-service-img-item"
                    style={{
                      zIndex: idx + 1,
                      clipPath: idx === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                    }}
                  >
                    {s.video ? (
                      <video
                        ref={(el) => {
                          serviceImgInnerRefs.current[idx] = el;
                        }}
                        className="uc-service-media"
                        src={s.video}
                        poster={s.dayPhoto || s.photo}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload={idx === 0 ? "auto" : "metadata"}
                      />
                    ) : (
                      <>
                        <img
                          ref={(el) => {
                            serviceImgInnerRefs.current[idx] = el;
                          }}
                          className="uc-service-media [html[data-theme=day]_&]:hidden"
                          src={s.photo}
                          alt={s.title}
                          loading="lazy"
                        />
                        <img
                          className="uc-service-media hidden [html[data-theme=day]_&]:block"
                          src={s.dayPhoto || s.photo}
                          alt={s.title}
                          loading="lazy"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Luminous Laser Command Line Border Sweep */}
              <div
                ref={sweepLineRef}
                className="uc-service-sweep-line"
                aria-hidden="true"
              />
            </div>

            {/* ===================================================================
                COLUMN 3 (COLS 9–16): RIGHT SCROLLING SERVICE CONTENT ITEMS
                =================================================================== */}
            <div className="uc-service-content-col">
              <div className="uc-service-content-list">
                {slides.map((slide, idx) => {
                  const isCurrent = activeIndex === idx;
                  const isMobileOpen = mobileExpanded === idx;

                  return (
                    <div
                      key={slide.key}
                      ref={(el) => {
                        contentItemRefs.current[idx] = el;
                      }}
                      className={`uc-service-item ${isCurrent ? "is-active" : ""}`}
                    >
                      {/* Top Guillotine Divider Line */}
                      <div className="uc-service-divider" />

                      {/* Mobile Accordion Header (<991px) */}
                      <button
                        type="button"
                        className="uc-mobile-header"
                        onClick={() => toggleMobileAccordion(idx)}
                        aria-expanded={isMobileOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-brass-400">
                            {isAr ? slide.numeralAr : slide.numeral}
                          </span>
                          <h3 className="font-display font-bold text-lg uc-mobile-title">{slide.title}</h3>
                        </div>
                        <span className="text-xl uc-mobile-toggle">{isMobileOpen ? "−" : "+"}</span>
                      </button>

                      <div className={`uc-item-inner ${isMobileOpen ? "is-open-mobile" : ""}`}>
                        {/* Item Head: Title, Subtitle, and Dot-Matrix LED Icon */}
                        <div className="uc-item-head">
                          <div className="uc-item-head-left">
                            <h3 className="uc-service-title">{slide.title}</h3>
                            {slide.tagline && <p className="uc-service-sub">{slide.tagline}</p>}
                          </div>

                          {/* HIGH-TECH DOT-MATRIX LED PICTOGRAM */}
                          <div className="uc-item-head-ic" aria-hidden="true">
                            <DotMatrixIcon type={slide.key} size={54} accent={isCurrent} />
                          </div>
                        </div>

                        {/* Mobile Inline Video/Photo */}
                        <div className="uc-mobile-media-box">
                          {slide.video ? (
                            <video
                              src={slide.video}
                              poster={slide.dayPhoto || slide.photo}
                              muted
                              playsInline
                              loop
                              autoPlay={isMobileOpen}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={slide.dayPhoto || slide.photo}
                              alt={slide.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Item Body: Description */}
                        <p className="uc-service-body">{slide.body}</p>

                        {/* Bottom CTA Action Row */}
                        <div className="uc-item-actions">
                          <a className="uc-action-btn" href={whatsappHref}>
                            <span>{quote}</span>
                          </a>
                          <Link className="uc-action-link" href={`/${locale}/services`}>
                            <span>{home.servicesTeaser.viewAll}</span>
                            <Icon name="arrow-right" size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
