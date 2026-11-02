"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Direction 1 Dynamic Footer Reveal Motion:
 * Hoists up dynamically from beneath the bottom of the viewport as the container descends,
 * locks into place with cushioned hydraulic docking, maintains rock-solid stability,
 * and transitions seamlessly into services.
 */
export function useCredibilityMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const girder = root.querySelector<HTMLElement>("[data-bedrock-girder]");
      const pillars = Array.from(
        root.querySelectorAll<HTMLElement>("[data-bedrock-pillar]")
      );

      if (!girder) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Phase 1: Dynamic Footer Reveal (Hoists up smoothly from beneath the bottom)
      tl.fromTo(
        girder,
        {
          yPercent: 125,
          opacity: 0,
          scale: 0.98,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.34,
          ease: "power3.out",
        },
        0
      );

      // Staggered upward unmasking of the 4 foundation pillars
      if (pillars.length) {
        tl.fromTo(
          pillars,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.26,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.08
        );
      }

      // Phase 2: Stable Resting Bedrock while reading
      tl.to(girder, { yPercent: 0, opacity: 1, duration: 0.43 }, 0.34);

      // Phase 3: Dynamic elevator exit into services
      tl.to(
        girder,
        {
          yPercent: -45,
          opacity: 0,
          duration: 0.23,
          ease: "power2.in",
        },
        0.77
      );
    });

    return () => {
      mm.revert();
    };
  }, [rootRef]);
}
