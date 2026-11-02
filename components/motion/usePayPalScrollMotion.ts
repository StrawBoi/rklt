"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UsePayPalScrollMotionOptions {
  headerSelector?: string;
  itemsSelector?: string;
  stageSelector?: string;
  lineSelector?: string;
  stagger?: number;
}

/**
 * PayPal-inspired Scroll Reveal & Micro-Motion Hook:
 * - Fluid, physics-based entrance reveals (`cubic-bezier(0.16, 1, 0.3, 1)`)
 * - Staggered emergence of typography and split containers
 * - Automatic cleanup and prefers-reduced-motion compliance
 */
export function usePayPalScrollMotion(
  rootRef: RefObject<HTMLElement | null>,
  options: UsePayPalScrollMotionOptions = {}
) {
  const {
    headerSelector = "[data-motion='header']",
    itemsSelector = "[data-motion='item']",
    stageSelector = "[data-motion='stage']",
    lineSelector = "[data-motion='line']",
    stagger = 0.08,
  } = options;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Line expansion if present
      const lines = root.querySelectorAll<HTMLElement>(lineSelector);
      if (lines.length) {
        gsap.fromTo(
          lines,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Section Header elements reveal
      const headerElements = root.querySelectorAll<HTMLElement>(
        `${headerSelector} > *`
      );
      if (headerElements.length) {
        gsap.fromTo(
          headerElements,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Staggered Items (Cards / Buttons)
      const items = root.querySelectorAll<HTMLElement>(itemsSelector);
      if (items.length) {
        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: items[0] || root,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Main Stage (Split container / Dashboard / Terminal)
      const stages = root.querySelectorAll<HTMLElement>(stageSelector);
      if (stages.length) {
        gsap.fromTo(
          stages,
          { y: 36, opacity: 0, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stages[0] || root,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      mm.revert();
    };
  }, [rootRef, headerSelector, itemsSelector, stageSelector, lineSelector, stagger]);
}
