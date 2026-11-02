"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./heritage-hallmark.css";

export interface HeritageHallmarkProps {
  startYear?: string | number;
  endYear?: string | number;
  label: string;
  direction?: "ltr" | "rtl";
  className?: string;
}

export const HeritageHallmark: React.FC<HeritageHallmarkProps> = ({
  startYear = "1994",
  endYear = "2024",
  label,
  direction = "ltr",
  className = "",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, scale: 0.96 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { autoAlpha: 1, scale: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className={`hh-hallmark ${className}`} dir={direction} aria-hidden="true">
      <span className="hh-hallmark__line" />
      <div className="hh-hallmark__badge">
        {startYear ? <span className="hh-hallmark__num">{startYear}</span> : null}
        {startYear ? <span className="hh-hallmark__dot">·</span> : null}
        <span className="hh-hallmark__label">{label}</span>
        {endYear ? <span className="hh-hallmark__dot">·</span> : null}
        {endYear ? <span className="hh-hallmark__num">{endYear}</span> : null}
      </div>
      <span className="hh-hallmark__line" />
    </div>
  );
};
