"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Orchestrates the "Depth Layer Towards the Company" scroll transitions:
 * Physical Z-Axis Curtain Over-Scroll: Outgoing section recedes gently on the Y-axis
 * and luminance during its final viewport exit while the incoming depth layer slides
 * over it with a deep architectural threshold shadow.
 * (No horizontal scale shrinking so sections remain 100% full-bleed with zero side-gutter splits.)
 */
export const DepthLayerController: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 900;
    if (reduceMotion || isMobile) return;

    const ctx = gsap.context(() => {
      // Z-Axis Curtain Over-Scroll between consecutive depth strata
      // NOTE: We use subtle luminance veil fading (no negative Y translation on the whole section
      // wrapper) so consecutive sections remain 100% flush with zero 22px gaps between them.
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth-stratum]");
      layers.forEach((layer, idx) => {
        const nextLayer = layers[idx + 1];
        if (!nextLayer) return;

        const veil = layer.querySelector<HTMLElement>("[data-depth-veil]");

        if (veil) {
          gsap.fromTo(
            veil,
            { opacity: 0 },
            {
              opacity: 0.38,
              ease: "none",
              scrollTrigger: {
                trigger: nextLayer,
                start: "top bottom",
                end: "top 15%",
                scrub: true,
              },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="rklt-depth-journey relative">
      {children}
    </div>
  );
};
