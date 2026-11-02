"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./architectural-bridge.css";

export interface ArchitecturalBridgeProps {
  proclamation: string;
  direction?: "ltr" | "rtl";
  className?: string;
}

export const ArchitecturalBridge: React.FC<ArchitecturalBridgeProps> = ({
  proclamation,
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
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { autoAlpha: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className={`arch-bridge ${className}`} dir={direction}>
      <div className="arch-bridge__line" aria-hidden="true" />
      <p className="arch-bridge__proclamation">{proclamation}</p>
    </div>
  );
};
