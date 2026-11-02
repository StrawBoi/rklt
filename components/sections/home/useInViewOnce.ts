"use client";

import { useEffect, useRef } from "react";

export interface UseInViewOnceOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInViewOnce<T extends HTMLElement>(options?: UseInViewOnceOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.setAttribute("data-inview", "true");
      return;
    }

    const threshold = options?.threshold ?? 0.08;
    const rootMargin = options?.rootMargin ?? "0px 0px -8% 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.setAttribute("data-inview", "true");
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}
