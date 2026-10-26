"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP writes the thread, the claim, the count, the plus, the description
 * that follows the settled years, and the value rise.
 * Reduced motion writes nothing, so 30+ and the copy stay settled.
 */
export function useCredibilityMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      gsap.fromTo(
        q("[data-cred-thread]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "top 35%", scrub: 0.6 },
        }
      );

      gsap.fromTo(
        q("[data-cred-value]"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: q("[data-cred-values]")[0], start: "top 85%", once: true },
        }
      );

      const claim = q("[data-cred-claim]")[0] as HTMLElement | undefined;
      const detail = q("[data-cred-detail]")[0] as HTMLElement | undefined;
      const countEl = q("[data-cred-count]")[0] as HTMLElement | undefined;
      const plus = q("[data-cred-plus]")[0] as HTMLElement | undefined;
      if (claim && detail && countEl && plus) {
        const counter = { n: 0 };
        countEl.textContent = "0";
        gsap.set(claim, { autoAlpha: 0, y: 16 });
        gsap.set(detail, { autoAlpha: 0, y: 18 });
        gsap.set(plus, { autoAlpha: 0 });
        const sequence = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        });
        sequence.to(claim, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" });
        sequence.to(
          counter,
          {
            n: 30,
            duration: 0.9,
            ease: "power3.out",
            onUpdate: () => {
              countEl.textContent = String(Math.round(counter.n));
            },
          },
          "-=0.12"
        );
        sequence.to(plus, { autoAlpha: 1, duration: 0.22, ease: "power2.out" });
        sequence.to(detail, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "+=0.08");
      }
    });

    return () => mm.revert();
  }, [rootRef]);
}
