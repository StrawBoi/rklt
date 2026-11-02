"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionCurtainProps {
  locale: string;
}

export function PageTransitionCurtain({ locale }: PageTransitionCurtainProps) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "entering" | "holding" | "leaving">("idle");
  const previousPathnameRef = useRef(pathname);
  const isAr = locale === "ar";
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }, []);

  // When pathname changes (route transition completed)
  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      
      // Ensure page is at top upon route arrival
      window.scrollTo({ top: 0, behavior: "instant" });

      // If we were already covering or if user used back/forward
      setPhase("holding");
      clearTimers();

      // Buffer time for heavy visual assets to initialize without layout flicker
      const holdTimer = setTimeout(() => {
        setPhase("leaving");
        const exitTimer = setTimeout(() => {
          setPhase("idle");
        }, 380);
        timerRef.current.push(exitTimer);
      }, 220);

      timerRef.current.push(holdTimer);
    }
  }, [pathname, clearTimers]);

  // Intercept internal link clicks to trigger smooth transition curtain
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Don't intercept if modified click, middle click, or default prevented
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target || !target.href) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external, tel, mailto, whatsapp, or pure hash anchors
      if (
        href.startsWith("http") && !href.startsWith(window.location.origin) ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("https://wa.me") ||
        href.startsWith("#") ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      // Check if target is a different pathname
      try {
        const targetUrl = new URL(target.href);
        if (targetUrl.origin === window.location.origin) {
          const currentPath = window.location.pathname;
          const newPath = targetUrl.pathname;
          
          if (newPath !== currentPath) {
            // Initiate gentle entry curtain
            clearTimers();
            setPhase("entering");
          }
        }
      } catch {
        // Fallback: let standard browser navigation handle it
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      clearTimers();
    };
  }, [clearTimers]);

  if (phase === "idle") return null;

  return (
    <div
      className={`rklt-page-curtain phase-${phase}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Top Precision Laser Beam */}
      <div className="rklt-curtain-laser" />

      {/* Center Architectural Hallmark */}
      <div className="rklt-curtain-core">
        <div className="rklt-curtain-pulse" />
        <span className="rklt-curtain-brand">RKLT</span>
        <div className="rklt-curtain-meta">
          <span className="rklt-curtain-node" />
          <span className="rklt-curtain-label">
            {isAr ? "مسار العبور · ربوع الخير" : "TRANSIT CORRIDOR · DIRECT"}
          </span>
        </div>
      </div>
    </div>
  );
}
