"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Icon } from "@/components/primitives/Icon";
import "./services-command.css";

interface ServicesCommandProps {
  locale: Locale;
}

/** Core features shown in the stage. The rest live behind "View full capability". */
const PREVIEW_FEATURES = 3;

const COPY = {
  en: {
    groups: [
      { label: "Freight", indexes: [0, 1, 2] },
      { label: "Clearance", indexes: [3] },
    ],
    short: ["Sea Freight", "Air Freight", "In-Land Transport", "Customs Clearance"],
    service: "Service",
    more: "View full capability",
    quote: "Request a rate",
    next: "Next",
    extended: "Specialized capabilities",
    close: "Close",
    capabilities: "Operational capabilities",
    progress: "Core services",
  },
  ar: {
    groups: [
      { label: "الشحن", indexes: [0, 1, 2] },
      { label: "التخليص", indexes: [3] },
    ],
    short: ["الشحن البحري", "الشحن الجوي", "النقل البري", "التخليص الجمركي"],
    service: "خدمة",
    more: "عرض القدرات الكاملة",
    quote: "طلب تسعيرة",
    next: "التالي",
    extended: "القدرات المتخصصة",
    close: "إغلاق",
    capabilities: "القدرات التشغيلية",
    progress: "الخدمات الأساسية",
  },
} as const;

const svcPositions: Record<string, string> = {
  sea: "center 42%",
  air: "center 36%",
  land: "center 50%",
  customs: "center center",
};

export const ServicesCommand: React.FC<ServicesCommandProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.core : servicesContentEn.core;
  const copy = isAr ? COPY.ar : COPY.en;
  const services = content.services;
  const count = services.length;

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const motionStageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shotSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabFillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tabLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ticksRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const pinnedTargetRef = useRef<{ index: number; until: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [step, setStep] = useState(0);
  const [detail, setDetail] = useState<number | null>(null);

  const quoteHref = (name: string) =>
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      isAr
        ? `مرحباً ربوع الخير، أرغب في الاستفسار عن خدمة: ${name}`
        : `Hello RKLT team, I would like to inquire about: ${name}`
    )}`;

  /* ---------- Scroll-coupled parallax engine (cloned from IntakeForm) ---------- */
  useEffect(() => {
    let rafId = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function computeScrollProgress(): number {
      const pinned = pinnedTargetRef.current;
      if (pinned && performance.now() < pinned.until) return pinned.index;

      const isCompact = window.innerWidth <= 960;
      const anchorY = isCompact ? 150 : 120;
      const tops: number[] = [];
      for (let i = 0; i < count; i++) {
        const el = sectionRefs.current[i];
        tops.push(el ? el.getBoundingClientRect().top : i * 500);
      }
      if (tops.length === 0) return 0;
      if (anchorY <= tops[0]) return 0;
      const last = tops.length - 1;
      if (anchorY >= tops[last]) return last;

      for (let i = 0; i < last; i++) {
        const c0 = tops[i];
        const c1 = tops[i + 1];
        if (anchorY >= c0 && anchorY <= c1) {
          const raw = i + (anchorY - c0) / Math.max(1, c1 - c0);
          return Math.abs(raw - Math.round(raw)) < 0.06 ? Math.round(raw) : raw;
        }
      }
      return 0;
    }

    function applyVisualProgress(p: number, reduced: boolean) {
      const rounded = Math.max(0, Math.min(count - 1, Math.round(p)));
      setStep((prev) => (prev === rounded ? prev : rounded));
      const isCompact = window.innerWidth <= 960;

      // 1. Center picture slides with parallax depth
      for (let i = 0; i < count; i++) {
        const slide = shotSlideRefs.current[i];
        if (!slide) continue;
        const delta = i - p;
        if (reduced) {
          slide.style.opacity = i === rounded ? "1" : "0";
          slide.style.transform = "none";
          continue;
        }
        if (Math.abs(delta) < 0.02) {
          slide.style.opacity = "1";
          slide.style.transform = "translate3d(0, 0%, 0) scale(1)";
          slide.style.zIndex = "25";
          continue;
        }
        if (Math.abs(delta) >= 0.98) {
          slide.style.opacity = "0";
          slide.style.transform = `translate3d(0, ${delta > 0 ? 102 : -102}%, 0)`;
          slide.style.zIndex = "1";
          continue;
        }
        const translateY = delta >= 0 ? delta * 100 : delta * 72;
        const scale = delta >= 0 ? 1 - delta * 0.04 : 1 + delta * 0.06;
        const opacity = delta >= 0 ? 1 : Math.max(0, 1 + delta * 0.9);
        slide.style.opacity = opacity.toFixed(3);
        slide.style.transform = `translate3d(0, ${translateY.toFixed(2)}%, 0) scale(${scale.toFixed(3)})`;
        slide.style.zIndex = String(delta >= 0 ? 20 - Math.round(delta * 5) : 10);
      }

      // 2. Stage sections rise from bottom to top
      for (let i = 0; i < count; i++) {
        const stage = motionStageRefs.current[i];
        const sec = sectionRefs.current[i];
        if (!stage || !sec) continue;
        if (reduced || isCompact) {
          stage.style.transform = "none";
          sec.style.opacity = "1";
          continue;
        }
        const delta = Math.max(-1.2, Math.min(1.2, i - p));
        if (Math.abs(delta) < 0.08) {
          stage.style.transform = "translate3d(0, 0px, 0) scale(1)";
          sec.style.opacity = "1";
          continue;
        }
        const yPx = delta >= 0 ? delta * 48 : delta * 24;
        const sc = 1 - Math.min(0.045, Math.abs(delta) * 0.038);
        const op = Math.max(0.32, 1 - Math.abs(delta) * 0.52);
        stage.style.transform = `translate3d(0, ${yPx.toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
        sec.style.opacity = op.toFixed(3);
      }

      // 3. Nav fill pill + label drift
      for (let i = 0; i < count; i++) {
        const fill = tabFillRefs.current[i];
        const label = tabLabelRefs.current[i];
        const delta = i - p;
        const isCurrent = i === rounded;
        if (fill) {
          fill.style.opacity = isCurrent ? "1" : "0";
          fill.style.transform = isCurrent
            ? "translate3d(0, 0%, 0)"
            : `translate3d(0, ${delta > 0 ? 102 : -102}%, 0)`;
        }
        if (label) {
          label.style.transform =
            reduced || isCompact
              ? "none"
              : `translate3d(0, ${(Math.max(-1, Math.min(1, delta)) * 3.5).toFixed(1)}px, 0)`;
        }
      }

      // 4. Scope ticks, rules, and outer scope
      const drift = (el: HTMLDivElement | null, k: number) => {
        if (el) el.style.transform = reduced ? "none" : `translate3d(0, ${(p * k).toFixed(1)}px, 0)`;
      };
      drift(ticksRef.current, -28);
      drift(rulesRef.current, -38);
      drift(scopeRef.current, -24);
    }

    function tick() {
      rafId = 0;
      const reduced = mediaReduced.matches;
      targetProgress = computeScrollProgress();
      if (reduced) {
        currentProgress = targetProgress;
        applyVisualProgress(currentProgress, true);
        return;
      }
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.002) {
        currentProgress += diff * 0.24;
        applyVisualProgress(currentProgress, false);
        rafId = window.requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        applyVisualProgress(currentProgress, false);
      }
    }

    const requestTick = () => {
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };
    const clearPin = () => {
      pinnedTargetRef.current = null;
    };

    targetProgress = computeScrollProgress();
    currentProgress = targetProgress;
    applyVisualProgress(currentProgress, mediaReduced.matches);

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
    window.addEventListener("wheel", clearPin, { passive: true });
    window.addEventListener("touchmove", clearPin, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      window.removeEventListener("wheel", clearPin);
      window.removeEventListener("touchmove", clearPin);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [count]);

  /* ---------- Tab click: eased scroll with pinned progress ---------- */
  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(count - 1, next));
      setStep(clamped);
      const target = sectionRefs.current[clamped];
      if (!target) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const anchorOffset = window.innerWidth <= 960 ? 140 : 108;
      const startY = window.scrollY;
      const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - anchorOffset);

      if (reduced || Math.abs(targetY - startY) < 4) {
        pinnedTargetRef.current = { index: clamped, until: performance.now() + 300 };
        window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
        window.dispatchEvent(new Event("scroll"));
        return;
      }

      const duration = 520;
      const startTime = performance.now();
      pinnedTargetRef.current = { index: clamped, until: startTime + duration + 350 };

      const stepScroll = (now: number) => {
        const elapsed = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const liveY = target.getBoundingClientRect().top + window.scrollY - anchorOffset;
        window.scrollTo(0, startY + (liveY - startY) * eased);
        window.dispatchEvent(new Event("scroll"));
        if (elapsed < 1) window.requestAnimationFrame(stepScroll);
      };
      window.requestAnimationFrame(stepScroll);
    },
    [count]
  );

  /* ---------- Detail panel ---------- */
  const openDetail = (index: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setDetail(index);
  };
  const closeDetail = useCallback(() => {
    setDetail(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (detail === null) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [detail, closeDetail]);

  const active = detail !== null ? services[detail] : null;

  return (
    <section id="core" className="svc-command" aria-label={content.title}>
      <header className="svc-command__head">
        <p className="svc-command__eyebrow">{content.eyebrow}</p>
        <h2 className="svc-command__title">{content.title}</h2>
      </header>

      <div className="svc-command__grid">
        {/* Left: grouped nav with sliding fill */}
        <nav className="svc-nav" aria-label={copy.progress}>
          {copy.groups.map((group) => (
            <div key={group.label} className="svc-nav__group">
              <p className="svc-kicker">{group.label}</p>
              {group.indexes.map((index) => (
                <button
                  key={services[index].id}
                  type="button"
                  aria-current={step === index ? "step" : undefined}
                  onClick={() => go(index)}
                >
                  <span
                    ref={(node) => {
                      tabFillRefs.current[index] = node;
                    }}
                    className="svc-nav__fill"
                    aria-hidden
                  />
                  <span
                    ref={(node) => {
                      tabLabelRefs.current[index] = node;
                    }}
                    className="svc-nav__label"
                  >
                    <span className="svc-nav__num">{services[index].numeral}</span>
                    {copy.short[index]}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Center: sticky reel with ticks + rules */}
        <div className="svc-rail" aria-hidden>
          <div ref={ticksRef} className="svc-ticks">
            {Array.from({ length: 26 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <div ref={rulesRef} className="svc-rules">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <figure className="svc-shot-wrap">
            <figcaption className="svc-shot-tip">
              <span className="svc-shot-tip__dot" />
              <span className="svc-shot-tip__step">
                {copy.service} {services[step].numeral} · {copy.short[step]}
              </span>
            </figcaption>
            <div className="svc-shot-reel">
              {services.map((svc, index) => (
                <div
                  key={svc.id}
                  ref={(node) => {
                    shotSlideRefs.current[index] = node;
                  }}
                  className="svc-shot-slide"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="svc-shot"
                    src={`/assets/services/${svc.id}.jpg`}
                    alt={svc.name}
                    style={{ objectPosition: svcPositions[svc.id] || "center center" }}
                  />
                </div>
              ))}
            </div>
          </figure>
        </div>

        {/* Right: core capability per service */}
        <div className="svc-stage">
          <div className="svc-step">
            {services.map((svc, index) => {
              const isLast = index === count - 1;
              return (
                <section
                  key={svc.id}
                  id={svc.id}
                  ref={(node) => {
                    sectionRefs.current[index] = node;
                  }}
                  aria-labelledby={`svc-${svc.id}`}
                >
                  <div
                    ref={(node) => {
                      motionStageRefs.current[index] = node;
                    }}
                    className="svc-stage-motion"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="svc-inline-shot"
                      src={`/assets/services/${svc.id}.jpg`}
                      alt={svc.name}
                      style={{ objectPosition: svcPositions[svc.id] || "center center" }}
                      loading="lazy"
                    />
                    <p className="svc-meta">
                      <span>{svc.numeral}</span>
                      <Icon name={svc.icon as never} size={16} />
                    </p>
                    <h3 id={`svc-${svc.id}`} className="svc-name">
                      {svc.name}
                    </h3>
                    <p className="svc-tagline">{svc.tagline}</p>

                    <ul className="svc-features">
                      {svc.features.slice(0, PREVIEW_FEATURES).map((feat) => (
                        <li key={feat}>
                          <span className="svc-features__mark" aria-hidden />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="svc-actions">
                      <button
                        type="button"
                        className="svc-btn svc-btn--solid"
                        aria-haspopup="dialog"
                        onClick={(e) => openDetail(index, e.currentTarget)}
                      >
                        {copy.more}
                        <span className="svc-btn__count">+{svc.features.length - PREVIEW_FEATURES}</span>
                      </button>
                      <a
                        className="svc-btn svc-btn--ghost"
                        href={quoteHref(svc.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="whatsapp" size={15} />
                        {copy.quote}
                      </a>
                    </div>

                    {isLast ? (
                      <a className="svc-peek" href="#extended">
                        <span className="svc-peek__hint">{copy.next}</span>
                        {copy.extended}
                      </a>
                    ) : (
                      <button type="button" className="svc-peek" onClick={() => go(index + 1)}>
                        <span className="svc-peek__hint">{copy.next}</span>
                        {copy.short[index + 1]}
                      </button>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Outer scope marks */}
        <div ref={scopeRef} className="svc-scope" aria-hidden>
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      {/* Full capability panel */}
      <div
        className={`svc-detail ${active ? "is-open" : ""}`}
        aria-hidden={!active}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDetail();
        }}
      >
        {active ? (
          <div
            className="svc-detail__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="svc-detail-title"
          >
            <div className="svc-detail__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/services/${active.id}.jpg`} alt="" />
              <button
                ref={closeRef}
                type="button"
                className="svc-detail__close"
                onClick={closeDetail}
                aria-label={copy.close}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="svc-detail__body">
              <p className="svc-meta">
                <span>{active.numeral}</span>
                <Icon name={active.icon as never} size={16} />
              </p>
              <h3 id="svc-detail-title" className="svc-detail__title">
                {active.name}
              </h3>
              <p className="svc-detail__desc">{active.description}</p>
              <p className="svc-detail__label">{copy.capabilities}</p>
              <ul className="svc-features svc-features--full">
                {active.features.map((feat) => (
                  <li key={feat}>
                    <span className="svc-features__mark" aria-hidden />
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                className="svc-btn svc-btn--solid"
                href={quoteHref(active.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={15} />
                {copy.quote}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
