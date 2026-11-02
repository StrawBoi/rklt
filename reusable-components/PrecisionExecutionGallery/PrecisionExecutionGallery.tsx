"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./precision-gallery.css";
import { PrecisionExecutionGalleryProps } from "./types";

export const PrecisionExecutionGallery: React.FC<PrecisionExecutionGalleryProps> = ({
  eyebrow = "02 · OPERATIONAL LIFECYCLE",
  title,
  subtitle,
  steps,
  direction = "ltr",
  className = "",
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const gallery = galleryRef.current;
    if (!root || !gallery) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const head = root.querySelector<HTMLElement>(".peg-head");
      if (head) {
        gsap.fromTo(
          head,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: head,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = gallery.querySelectorAll<HTMLElement>("[data-peg-card]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gallery,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const all = root.querySelectorAll<HTMLElement>(".peg-head, [data-peg-card]");
      all.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className={`peg-corridor ${className}`} dir={direction}>
      <div className="peg-container">
        {/* Head */}
        <header className="peg-head">
          {eyebrow ? (
            <div className="peg-kicker">
              <span>{eyebrow}</span>
            </div>
          ) : null}
          <h2 className="peg-title">{title}</h2>
          {subtitle ? <p className="peg-subtitle">{subtitle}</p> : null}
        </header>

        {/* 4-Column Grid */}
        <div ref={galleryRef} className="peg-gallery">
          {steps.map((step, idx) => (
            <article
              key={step.id || step.numeral || idx}
              data-peg-card
              className="peg-card"
            >
              <div className="peg-card__viewport">
                <img
                  src={step.photo}
                  alt={step.title}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  className="peg-card__img"
                />
                <div className="peg-card__overlay" aria-hidden="true" />
                <span className="peg-card__numeral" aria-hidden="true">
                  {step.numeral}
                </span>
              </div>

              <div className="peg-card__content">
                <div className="peg-card__phase">
                  <span>{step.phase}</span>
                </div>
                <h3 className="peg-card__title">{step.title}</h3>
                <p className="peg-card__desc">{step.description}</p>

                {step.tags && step.tags.length > 0 ? (
                  <div className="peg-card__tags">
                    {step.tags.map((tag) => (
                      <span key={tag} className="peg-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
