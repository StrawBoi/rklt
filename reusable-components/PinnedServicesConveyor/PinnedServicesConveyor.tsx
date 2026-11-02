"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./pinned-services.css";
import { PinnedServicesConveyorProps, ServiceSlideItem, NavGroup } from "./types";

export const PinnedServicesConveyor: React.FC<PinnedServicesConveyorProps> = ({
  slides,
  groups,
  direction = "ltr",
  className = "",
  catalogLink,
  quoteText = "Request a Quote",
  whatsappNumber,
  defaultWhatsappMsg,
}) => {
  const isRtl = direction === "rtl";
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  const rootRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLElement | null>>([]);
  const fillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const motionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const count = slides.length;

  const defaultGroups = useMemo<NavGroup[]>(() => {
    if (groups && groups.length > 0) return groups;
    if (slides.length >= 6) {
      return [
        { label: isRtl ? "المسارات الدولية" : "INTERNATIONAL FREIGHT", indexes: [0, 1] },
        { label: isRtl ? "الخدمات الإقليمية والحدودية" : "REGIONAL LOGISTICS", indexes: [2, 3] },
        { label: isRtl ? "القدرات المتخصصة" : "SPECIALIZED CAPABILITIES", indexes: [4, 5] },
      ];
    }
    return [
      { label: isRtl ? "المسارات الدولية" : "INTERNATIONAL FREIGHT", indexes: [0, 1] },
      { label: isRtl ? "الخدمات الإقليمية" : "REGIONAL LOGISTICS", indexes: [2, 3] },
    ];
  }, [groups, isRtl, slides.length]);

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        defaultWhatsappMsg || (isRtl ? "مرحباً، أود الاستفسار عن خدمات الشحن." : "Hello, I would like to inquire about freight services.")
      )}`
    : "#contact";

  const goTo = (index: number) => {
    const el = stepRefs.current[index];
    if (!el) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 960;
    if (isMobile) {
      setMobileExpanded(index);
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    const focalOffset = window.innerHeight * 0.36;
    const y = el.getBoundingClientRect().top + window.scrollY - focalOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const toggleMobileAccordion = (index: number) => {
    setMobileExpanded((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (val: number) => {
      const active = Math.max(0, Math.min(count - 1, Math.round(val)));
      setActiveIndex(active);

      const isMobile = window.innerWidth <= 960;
      if (isMobile) return;

      // 1. Single Active Hardware Decoder Policy + Curtain Wipe
      for (let s = 0; s < count; s++) {
        const slide = slideRefs.current[s];
        const vid = mediaRefs.current[s];
        if (!slide) continue;

        if (vid) {
          if (vid instanceof HTMLVideoElement) {
            if (s === active && !isReduced) {
              if (vid.paused) vid.play().catch(() => {});
            } else {
              if (!vid.paused) vid.pause();
            }
          }
        }

        if (isReduced) {
          slide.style.clipPath = "none";
          slide.style.opacity = s === active ? "1" : "0";
          slide.style.zIndex = s === active ? "20" : "1";
          if (vid) vid.style.transform = "none";
          continue;
        }

        if (s === 0) {
          if (val < 0.12) {
            slide.style.clipPath = "inset(0 0 0% 0)";
            slide.style.opacity = "1";
            slide.style.zIndex = "10";
            if (vid) vid.style.transform = "scale(1.0)";
          } else if (val <= 0.82) {
            const p = (val - 0.12) / 0.7;
            slide.style.clipPath = "inset(0 0 0% 0)";
            slide.style.opacity = (1 - 0.25 * p).toFixed(3);
            slide.style.zIndex = "10";
            if (vid) vid.style.transform = `scale(${(1.0 - 0.04 * p).toFixed(3)})`;
          } else {
            slide.style.opacity = "0";
            slide.style.zIndex = "1";
          }
        } else {
          // Visual anticipation: image initiates wipe ~0.08 progress earlier (~100ms visual lead)
          const startHandover = s - 1 + 0.08;
          const endHandover = s - 1 + 0.78;

          if (val < startHandover) {
            slide.style.clipPath = "inset(0 0 100% 0)";
            slide.style.opacity = "0";
            slide.style.zIndex = "1";
          } else if (val <= endHandover) {
            const p = (val - startHandover) / (endHandover - startHandover);
            const clipPct = (100 - p * 100).toFixed(2);
            slide.style.clipPath = `inset(0 0 ${clipPct}% 0)`;
            slide.style.opacity = "1";
            slide.style.zIndex = String(10 + s);
            if (vid) vid.style.transform = `scale(${(1.15 - 0.15 * p).toFixed(3)})`;
          } else if (s === count - 1 || val < s + 0.08) {
            slide.style.clipPath = "inset(0 0 0% 0)";
            slide.style.opacity = "1";
            slide.style.zIndex = String(10 + s);
            if (vid) vid.style.transform = "scale(1.0)";
          } else {
            const outP = Math.min(1, (val - (s + 0.08)) / 0.7);
            slide.style.clipPath = "inset(0 0 0% 0)";
            slide.style.opacity = (1 - 0.25 * outP).toFixed(3);
            slide.style.zIndex = String(10 + s);
            if (vid) vid.style.transform = `scale(${(1.0 - 0.04 * outP).toFixed(3)})`;
          }
        }
      }

      // 2. Right Stage Section Collapse / Parallax
      for (let s = 0; s < count; s++) {
        const motion = motionRefs.current[s];
        if (!motion) continue;

        if (isReduced) {
          motion.style.transform = "none";
          motion.style.opacity = s === active ? "1" : "0.28";
          continue;
        }

        const delta = val - s;
        if (delta > 0.05) {
          const p = Math.min(1, (delta - 0.05) / 0.85);
          motion.style.transform = `translate3d(0, ${(-48 * p).toFixed(1)}px, 0)`;
          motion.style.opacity = (1 - 0.72 * p).toFixed(3);
        } else if (delta < -0.05) {
          const p = Math.min(1, (-delta - 0.05) / 0.85);
          motion.style.transform = `translate3d(0, ${(32 * p).toFixed(1)}px, 0)`;
          motion.style.opacity = (1 - 0.72 * p).toFixed(3);
        } else {
          motion.style.transform = "translate3d(0, 0, 0)";
          motion.style.opacity = "1";
        }
      }

      // 3. Left Sticky Navigation Indicators
      const isDay = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "day";
      for (let s = 0; s < count; s++) {
        const fill = fillRefs.current[s];
        const label = labelRefs.current[s];
        const isCurrent = s === active;
        if (fill) {
          fill.style.opacity = isCurrent ? "1" : "0";
          fill.style.transform = isCurrent ? "translate3d(0, 0%, 0)" : "translate3d(0, 102%, 0)";
        }
        if (label) {
          if (isDay) {
            label.style.color = isCurrent ? "#ffffff" : "rgba(9, 26, 33, 0.72)";
          } else {
            label.style.color = isCurrent ? "#0d0f12" : "rgba(255, 255, 255, 0.72)";
          }
          label.style.fontWeight = isCurrent ? "700" : "500";
        }
      }

      // 4. Dynamic background color interpolation towards subsequent section
      if (rootRef.current && count >= 5) {
        if (isDay) {
          if (val <= 3.0) {
            rootRef.current.style.backgroundColor = "rgb(244, 239, 230)";
          } else {
            const p = Math.min(1, Math.max(0, (val - 3.0) / (count - 1 - 3.0)));
            const r = Math.round(244 - (244 - 237) * p);
            const g = Math.round(239 - (239 - 230) * p);
            const b = Math.round(230 - (230 - 216) * p);
            rootRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        } else {
          if (val <= 3.0) {
            rootRef.current.style.backgroundColor = "rgb(13, 15, 18)";
          } else {
            const p = Math.min(1, Math.max(0, (val - 3.0) / (count - 1 - 3.0)));
            const r = Math.round(13 - (13 - 9) * p);
            const g = Math.round(15 - (15 - 11) * p);
            const b = Math.round(18 - (18 - 14) * p);
            rootRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          }
        }
      }
    };

    // Cached measurement to avoid layout thrashing
    let cachedTops: number[] = [];
    const measureTops = () => {
      const isMobile = window.innerWidth <= 960;
      if (isMobile) {
        cachedTops = [];
        return;
      }
      const focalOffset = window.innerHeight * 0.36;
      const scrollY = window.scrollY;
      cachedTops = stepRefs.current.map((el) => {
        if (!el) return 0;
        return el.getBoundingClientRect().top + scrollY - focalOffset;
      });
    };

    const calcProgress = (): number => {
      const isMobile = window.innerWidth <= 960;
      if (isMobile) return 0;
      if (cachedTops.length === 0) measureTops();

      const scrollY = window.scrollY;

      for (let s = 0; s < count; s++) {
        const top = cachedTops[s] ?? 0;
        const el = stepRefs.current[s];
        const nextTop =
          cachedTops[s + 1] ?? (top + (el ? el.offsetHeight : window.innerHeight * 0.85));

        if (scrollY >= top && scrollY < nextTop) {
          const segH = Math.max(1, nextTop - top);
          return Math.max(0, Math.min(count - 1, s + (scrollY - top) / segH));
        }
        if (s === count - 1 && scrollY >= top) {
          return count - 1;
        }
      }
      return 0;
    };

    const loop = () => {
      const target = targetRef.current;
      const diff = target - currentRef.current;
      if (Math.abs(diff) > 0.001) {
        currentRef.current += 0.22 * diff;
        render(currentRef.current);
        rafRef.current = requestAnimationFrame(loop);
      } else {
        currentRef.current = target;
        render(currentRef.current);
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      targetRef.current = calcProgress();
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const onResize = () => {
      measureTops();
      onScroll();
    };

    measureTops();
    targetRef.current = calcProgress();
    currentRef.current = targetRef.current;
    render(currentRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return (
    <section ref={rootRef} className={`psc-command ${className}`} dir={direction}>
      <div className="psc-command__grid">
        {/* 1. LEFT COLUMN: Sticky Nav */}
        <nav className="psc-nav" aria-label="Services Navigation">
          {defaultGroups.map((group) => (
            <div key={group.label} className="psc-nav__group">
              <div className="psc-kicker">{group.label}</div>
              {group.indexes.map((idx) => {
                const s = slides[idx];
                if (!s) return null;
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-current={isCurrent ? "step" : undefined}
                    onClick={() => goTo(idx)}
                  >
                    <span
                      ref={(el) => {
                        fillRefs.current[idx] = el;
                      }}
                      className="psc-nav__fill"
                      aria-hidden="true"
                    />
                    <span
                      ref={(el) => {
                        labelRefs.current[idx] = el;
                      }}
                      className="psc-nav__label"
                    >
                      {s.numeral} {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}

          {catalogLink ? (
            <div className="psc-nav__catalog">
              <a href={catalogLink.href} className="psc-nav__catalog-link">
                <span>{catalogLink.label}</span>
                <span>→</span>
              </a>
            </div>
          ) : null}
        </nav>

        {/* 2. CENTER COLUMN: Borderless Pinned Video Stage */}
        <div className="psc-rail">
          <div className="psc-shot-stage">
            <div className="psc-shot-reel">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  ref={(el) => {
                    slideRefs.current[idx] = el;
                  }}
                  className={`psc-shot-slide ${idx === activeIndex ? "is-active" : ""}`}
                >
                  {s.video ? (
                    <video
                      ref={(el) => {
                        mediaRefs.current[idx] = el;
                      }}
                      className="psc-shot"
                      src={s.video}
                      poster={s.photo}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload={idx === 0 ? "auto" : "metadata"}
                    />
                  ) : (
                    <img
                      ref={(el) => {
                        mediaRefs.current[idx] = el;
                      }}
                      className="psc-shot"
                      src={s.photo}
                      alt={s.title}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN: Content Stage */}
        <div className="psc-stage">
          <div className="psc-step">
            {slides.map((slide, idx) => {
              const nextIdx = (idx + 1) % count;
              const nextSlide = slides[nextIdx];
              const isMobileOpen = mobileExpanded === idx;

              return (
                <section
                  key={slide.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  data-step-index={idx}
                  className={`${idx === activeIndex ? "is-on" : ""} ${
                    isMobileOpen ? "is-mobile-open" : "is-mobile-closed"
                  }`}
                >
                  {/* Mobile Accordion Header */}
                  <button
                    type="button"
                    className="psc-mobile-toggle"
                    onClick={() => toggleMobileAccordion(idx)}
                    aria-expanded={isMobileOpen}
                  >
                    <div className="psc-mobile-toggle__left">
                      <span className="psc-step__numeral">{slide.numeral}</span>
                      <h3 className="psc-mobile-toggle__title">{slide.title}</h3>
                    </div>
                    <span className="psc-mobile-toggle__icon" aria-hidden="true">
                      {isMobileOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    ref={(el) => {
                      motionRefs.current[idx] = el;
                    }}
                    className="psc-stage-motion"
                  >
                    <div className="psc-step__head-row">
                      <span className="psc-step__numeral">
                        {slide.numeral} · {slide.category}
                      </span>
                    </div>

                    <h2>{slide.title}</h2>
                    {slide.tagline ? <p className="psc-step__tagline">{slide.tagline}</p> : null}

                    {/* Mobile Inline Media */}
                    <div className="psc-mobile-img-box">
                      {slide.video ? (
                        <video
                          src={slide.video}
                          poster={slide.photo}
                          muted
                          playsInline
                          loop
                          autoPlay={isMobileOpen}
                          preload="none"
                        />
                      ) : (
                        <img
                          src={slide.photo}
                          alt={slide.title}
                          loading="lazy"
                        />
                      )}
                    </div>

                    <p className="psc-step__body">{slide.description}</p>

                    {slide.features && slide.features.length > 0 ? (
                      <div className="psc-step__chips">
                        {slide.features.map((feat) => (
                          <span key={feat} className="psc-step__chip">
                            {feat}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Actions: Luxury Outline Pill */}
                    <div className="psc-step__actions">
                      <a className="psc-step__cta" href={slide.ctaHref || whatsappHref}>
                        <span>{slide.ctaText || quoteText}</span>
                      </a>
                      {catalogLink ? (
                        <a className="psc-step__catalog-btn" href={catalogLink.href}>
                          <span>{catalogLink.label}</span>
                          <span>→</span>
                        </a>
                      ) : null}
                    </div>

                    {/* Next Peek Button */}
                    <button
                      type="button"
                      className="psc-peek"
                      onClick={() => goTo(nextIdx)}
                    >
                      {isRtl
                        ? `${nextSlide.numeral} · ${nextSlide.title} ←`
                        : `${nextSlide.numeral} · ${nextSlide.title} →`}
                    </button>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
