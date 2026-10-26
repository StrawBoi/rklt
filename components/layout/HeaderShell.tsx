"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const isHome = (pathname: string | null) => !!pathname && /^\/(en|ar)\/?$/.test(pathname);

/**
 * Sets `data-over` while a `[data-header-overlay]` section sits under the header.
 * CSS owns every visual change that follows from it.
 */
export const HeaderShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const overlay = document.querySelector<HTMLElement>("[data-header-overlay]");
    let frame = 0;
    let lastY = window.scrollY;
    let delta = 0;

    const update = () => {
      frame = 0;
      const moved = delta;
      delta = 0;

      if (overlay) {
        const hold = overlay.closest<HTMLElement>(".rklt-hero-hold, .corridor-underlap");
        const next = hold?.nextElementSibling ?? null;
        const covered = !!next && next.getBoundingClientRect().top <= header.offsetHeight;
        const over = !covered && overlay.getBoundingClientRect().bottom > header.offsetHeight;
        const state = over ? "true" : "false";
        if (header.dataset.over !== state) header.dataset.over = state;
      } else if (header.dataset.over !== "false") {
        header.dataset.over = "false";
      }

      const locked = document.documentElement.classList.contains("rklt-intro-lock");
      if (locked || window.scrollY < 12) {
        if (header.dataset.hidden !== "false") header.dataset.hidden = "false";
      } else if (moved > 8) {
        header.dataset.hidden = "true";
      } else if (moved < -8) {
        header.dataset.hidden = "false";
      }

      const probe = header.offsetHeight;
      const overlaps = (id: string) => {
        const section = document.querySelector(id);
        if (!section) return false;
        const box = section.getBoundingClientRect();
        return box.top < probe && box.bottom > 8;
      };
      let ink: "light" | "dark" = "dark";
      if (overlaps("#credibility")) ink = "light";
      if (overlaps("#services")) {
        const theme = document.querySelector("#services")?.getAttribute("data-conveyor-theme");
        if (theme === "dark") ink = "light";
        else if (theme === "light") ink = "dark";
        else ink = document.documentElement.dataset.theme === "day" ? "dark" : "light";
      }
      if (header.dataset.ink !== ink) header.dataset.ink = ink;
    };
    const onScroll = () => {
      const y = window.scrollY;
      delta += y - lastY;
      lastY = y;
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
      className="rklt-header sticky top-0 z-40 w-full"
    >
      {children}
    </header>
  );
};
