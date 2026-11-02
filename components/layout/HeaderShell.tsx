"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const isHome = (pathname: string | null) => !!pathname && /^\/(en|ar)\/?$/.test(pathname);

/**
 * Sets `data-over`, `data-scrolled`, `data-hidden`, and `data-ink` on the floating header shell.
 * Hides the navbar smoothly as soon as the user starts scrolling so it never overlaps
 * the hero 30+ counter or pinned stages, and reveals it when returning to the top.
 */
export const HeaderShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const overlay = document.querySelector<HTMLElement>("[data-header-overlay]");
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY || document.documentElement.scrollTop || 0;

      // Track whether page has started scrolling
      const scrolledState = y > 18 ? "true" : "false";
      if (header.dataset.scrolled !== scrolledState) {
        header.dataset.scrolled = scrolledState;
      }

      // Hide navbar as soon as the user starts scrolling so it never overlaps the 30+ counter
      const hiddenState = y > 16 ? "true" : "false";
      if (header.dataset.hidden !== hiddenState) {
        header.dataset.hidden = hiddenState;
      }

      if (overlay) {
        const hold = overlay.closest<HTMLElement>(".rklt-hero-hold, .corridor-underlap");
        const next = hold?.nextElementSibling ?? null;
        const covered = !!next && next.getBoundingClientRect().top <= header.offsetHeight + 24;
        const over = !covered && overlay.getBoundingClientRect().bottom > header.offsetHeight + 24;
        const state = over ? "true" : "false";
        if (header.dataset.over !== state) header.dataset.over = state;
      } else if (header.dataset.over !== "false") {
        header.dataset.over = "false";
      }

      const probe = header.offsetHeight + 24;
      const overlaps = (id: string) => {
        const section = document.querySelector(id);
        if (!section) return false;
        const box = section.getBoundingClientRect();
        return box.top < probe && box.bottom > 8;
      };
      let ink: "light" | "dark" = "dark";
      if (overlaps("#credibility") || overlaps("#services")) {
        ink = "light";
      }
      if (header.dataset.ink !== ink) header.dataset.ink = ink;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      data-over={isHome(pathname) ? "true" : "false"}
      data-scrolled="false"
      data-hidden="false"
      className="rklt-header fixed top-0 inset-x-0 z-50 w-full"
    >
      {children}
    </header>
  );
};
