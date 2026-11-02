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
  src: string;
  daySrc: string;
  motionSrc?: string;
}

const INTRO_CARDS: IntroCard[] = [
  {
    id: "sea",
    numeral: "01",
    numeralAr: "٠١",
    title: "Sea Freight",
    titleAr: "الشحن البحري",
    subtitle: "PORT OF AQABA & GLOBAL OCEAN LANES",
    subtitleAr: "ميناء العقبة والممرات البحرية العالمية",
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
    subtitle: "QUEEN ALIA CARGO TERMINAL (AMM)",
    subtitleAr: "محطة الشحن بمطار الملكة علياء",
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
    subtitle: "OVERLAND CROSS-BORDER FLEET",
    subtitleAr: "أسطول النقل البري والعبور الحدودي",
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
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  const gridWrapRef = useRef<HTMLDivElement>(null);
  const logisWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const decoCardRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    // Autoplay intro motion videos when mounted
    const introVids = document.querySelectorAll<HTMLVideoElement>(".uc-intro-cards-row video");
    introVids.forEach((v) => {
      v.play().catch(() => {});
    });
  }, []);

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

    if (isMobile || reduceMotion) return;

    const ctx = gsap.context(() => {
      // 2. STAGGERED INTRO CARDS ENTRANCE
      const decoCards = decoCardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (decoCards.length > 0) {
        gsap.fromTo(
          decoCards,
          { y: 40, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".uc-intro-cards-row",
              start: "top 90%",
              end: "top 50%",
              scrub: 0.6,
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
          PART A: LIGHT/HONED INTRO WITH WORD-SCRUB HEADLINE & 4 FLAT PREVIEW CARDS
          ========================================================================= */}
      <div ref={logisWrapRef} className="uc-service-logis-wrap">
        <div className="uc-service-container uc-logis-grid">
          {/* Animated Headline with Our Own Words */}
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

          {/* Lead Paragraph Text on Bottom Left */}
          <div className="uc-logis-sub">
            <span className="uc-logis-sub-rule" aria-hidden="true" />
            <p>{home.servicesTeaser.subtitle}</p>
          </div>
        </div>

        {/* 4 Clean Flat Preview Cards (Inside the Intro Flow, No Cross-Section Flying) */}
        <div className="uc-service-container mt-12 lg:mt-16">
          <div className="uc-intro-cards-row">
            {INTRO_CARDS.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => {
                  decoCardRefs.current[idx] = el;
                }}
                className="uc-intro-card cursor-pointer group"
                onClick={() => scrollToService(idx)}
              >
                <div className="uc-intro-card-media-wrap">
                  {card.motionSrc ? (
                    <video
                      src={card.motionSrc}
                      poster={card.daySrc}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <Image
                        src={card.src}
                        alt={isAr ? card.titleAr : card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover [html[data-theme=day]_&]:hidden group-hover:scale-105 transition-transform duration-500"
                      />
                      <Image
                        src={card.daySrc}
                        alt={isAr ? card.titleAr : card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover hidden [html[data-theme=day]_&]:block group-hover:scale-105 transition-transform duration-500"
                      />
                    </>
                  )}
                  <div className="uc-intro-card-badge">
                    <span className="uc-badge-num">{isAr ? card.numeralAr : card.numeral}</span>
                  </div>
                </div>
                <div className="uc-intro-card-meta">
                  <h4 className="uc-intro-card-title">{isAr ? card.titleAr : card.title}</h4>
                  <p className="uc-intro-card-sub">{isAr ? card.subtitleAr : card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART B: 3-COLUMN CATALOG (STICKY NAV + PINNED MEDIA STAGE + SCROLLING CONTENT)
          ========================================================================= */}
      <div className="uc-service-main-wrap on-dark">
        <div className="uc-service-container uc-main-grid">
          {/* =====================================================================
              COLUMN 1 (COLS 1–4): LEFT STICKY NAVIGATION WITH SLIDING PILL
              ===================================================================== */}
          <nav className="uc-service-resum" aria-label="Services Navigation">
            <div className="uc-service-resum-inner">
              {groups.map((group, gIdx) => (
                <div key={group.label} className="uc-resum-group">
                  <p className="uc-resum-kicker">{group.label}</p>
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

          {/* =====================================================================
              COLUMN 2 (COLS 5–8): PINNED STICKY PHOTO STAGE (INSIDE CATALOG)
              * NEVER BLEEDS OR OVERLAPS ACROSS SECTIONS *
              ===================================================================== */}
          <div className="uc-service-img-cms" aria-hidden="true">
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

          {/* =====================================================================
              COLUMN 3 (COLS 9–16): RIGHT SCROLLING SERVICE CONTENT ITEMS
              ===================================================================== */}
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
                          <span className="uc-item-category">
                            {isAr ? slide.numeralAr : slide.numeral} · {slide.category}
                          </span>
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

                      {/* Item Body: Description & Operational Feature Chips */}
                      <p className="uc-service-body">{slide.body}</p>

                      {slide.features && slide.features.length > 0 && (
                        <div className="uc-service-chips">
                          {slide.features.map((feat) => (
                            <span key={feat} className="uc-chip">
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}

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
    </section>
  );
};
