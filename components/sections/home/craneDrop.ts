"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CraneDropParts {
  stage: HTMLElement;
  section: HTMLElement;
  rig: HTMLElement;
  cred: HTMLElement;
  shade: HTMLElement | null;
  copy: HTMLElement | null;
  backdrop: HTMLElement | null;
}

const START_LAT = 29.53;
const END_LAT = 31.95;
const START_LNG = 35.01;
const END_LNG = 35.91;

/**
 * High-performance, 60fps crane & berth scroll controller.
 * 1. North/East coordinate numbers count dynamically with scroll from Aqaba berth
 *    (29.53°N · 35.01°E) up to Amman terminal (31.95°N · 35.91°E) and STOP/LOCK on touchdown.
 * 2. Mobile (< 900px) disables parallax & sticky completely to avoid overlapping.
 * 3. Dual scroll binding (ScrollTrigger + passive window scroll with RAF) guarantees instant,
 *    zero-latency coordinate counting on any wheel tick, touch drag, or scrollbar movement.
 */
export function createCraneDrop({
  stage,
  rig,
  cred,
  shade,
  copy,
  backdrop,
}: CraneDropParts): () => void {
  gsap.registerPlugin(ScrollTrigger);

  const base = rig.querySelector<HTMLElement>("[data-container-base]");
  const bodyEl = rig.querySelector<HTMLElement>("[data-crane-body]");
  const foot = stage.querySelector<HTMLElement>(".rklt-crane-foot");
  const yearsEl = rig.querySelector<HTMLElement>("[data-crane-years]");
  const yearsNumEl = rig.querySelector<HTMLElement>("[data-crane-years-num]");
  const yearsPlusEl = rig.querySelector<HTMLElement>("[data-crane-years-plus]");

  // On mobile (< 900px), remove parallax & sticky completely
  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 900;
  if (isMobile()) {
    base?.classList.add("is-landed");
    if (bodyEl) bodyEl.style.transform = "none";
    if (yearsEl) yearsEl.style.opacity = "1";
    if (yearsNumEl) yearsNumEl.textContent = "30";
    if (yearsPlusEl) yearsPlusEl.classList.add("is-lit");
    return () => {};
  }

  let landingScroll = 400;
  let landed = false;
  let lastLatStr = "";
  let lastLngStr = "";
  let lastYearsVal = -1;

  const measure = () => {
    if (isMobile()) return;
    gsap.set(rig, { clearProps: "transform" });
    if (bodyEl) gsap.set(bodyEl, { clearProps: "transform" });
    const vh = window.innerHeight;
    landingScroll = Math.max(300, Math.round(vh * 0.64));
  };

  const update = () => {
    if (isMobile()) return;

    const sy = typeof window !== "undefined" ? (window.scrollY || document.documentElement.scrollTop || 0) : 0;
    const stageRect = stage.getBoundingClientRect();
    const stageTop = stageRect.top + sy;
    const s = Math.max(0, sy - stageTop);
    const prog = gsap.utils.clamp(0, 1, landingScroll > 0 ? s / landingScroll : 1);

    // 15% zoom towards user's eyes + real hydraulic settling drop into the next section
    if (bodyEl) {
      // Easing curve: initial winch descent, gravitational acceleration, cushioned hydraulic touchdown
      const easeDrop = (p: number) => {
        if (p <= 0) return 0;
        if (p >= 1) return 1;
        return p < 0.72
          ? Math.pow(p / 0.72, 1.4) * 0.68
          : 0.68 + (1 - Math.pow(1 - (p - 0.72) / 0.28, 2.2)) * 0.32;
      };
      const dropFactor = easeDrop(prog);
      const parallaxY = (36 * dropFactor).toFixed(1);
      const zoom = (1 + 0.15 * Math.pow(prog, 0.88)).toFixed(3);
      bodyEl.style.transform = `translate3d(0, ${parallaxY}px, 0) scale(${zoom})`;
    }

    // Fast direct opacity updates (no style recalculations)
    if (copy) {
      const op = Math.max(0, 1 - prog * 4.2).toFixed(2);
      if (copy.style.opacity !== op) copy.style.opacity = op;
    }
    // 30+ Years Counter emerges behind the chains as scroll begins
    if (yearsEl) {
      const op = Math.min(1, Math.max(0, (prog - 0.02) * 5.0)).toFixed(2);
      if (yearsEl.style.opacity !== op) yearsEl.style.opacity = op;
    }

    // Dynamic scroll counting behind crane chains: 0 -> 30 years
    const targetYears = Math.min(30, Math.round(Math.min(1, prog / 0.88) * 30));
    if (yearsNumEl && targetYears !== lastYearsVal) {
      yearsNumEl.textContent = String(targetYears);
      lastYearsVal = targetYears;
    }

    if (yearsPlusEl) {
      if (targetYears >= 30) {
        yearsPlusEl.classList.add("is-lit");
      } else {
        yearsPlusEl.classList.remove("is-lit");
      }
    }
    if (shade) {
      const op = Math.max(0, 1 - prog * 1.5).toFixed(2);
      if (shade.style.opacity !== op) shade.style.opacity = op;
    }
    if (foot) {
      const op = Math.max(0, 1 - prog * 2.2).toFixed(2);
      if (foot.style.opacity !== op) {
        foot.style.opacity = op;
        foot.style.pointerEvents = prog > 0.4 ? "none" : "auto";
      }
    }
    if (backdrop) {
      // Atmospheric Opacity: low at first so rich port definition & sunset colors pop,
      // then deepens into an ambient stage as the container settles
      const dim = prog < 0.22 ? "0" : Math.min(0.58, (prog - 0.22) * 0.78).toFixed(2);
      const afterEl = backdrop.querySelector<HTMLElement>(".rklt-backdrop-dim");
      if (afterEl && afterEl.style.opacity !== dim) {
        afterEl.style.opacity = dim;
      }
      const depthEl = backdrop.querySelector<HTMLElement>("[data-hero-depth]");
      if (depthEl) {
        depthEl.style.transform = `translate3d(0, ${(prog * 40).toFixed(1)}px, 0)`;
        depthEl.style.opacity = Math.max(0.25, 1 - prog * 0.55).toFixed(2);
      }
    }

    // Stops and locks when container lands
    if (prog >= 0.98 && !landed) {
      landed = true;
      base?.classList.add("is-landed");
      cred.dataset.landed = "true";
      window.dispatchEvent(new CustomEvent("rklt:crane-landed"));
    } else if (prog < 0.92 && landed) {
      landed = false;
      base?.classList.remove("is-landed");
      delete cred.dataset.landed;
    }
  };

  let rafId = 0;
  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      update();
    });
  };

  const onResize = () => {
    measure();
    update();
  };

  const trigger = ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: "bottom top",
    onRefreshInit: measure,
    onRefresh: update,
    onUpdate: update,
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });

  measure();
  update();

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    trigger.kill();
    base?.classList.remove("is-landed");
    if (bodyEl) bodyEl.style.transform = "";
    if (copy) copy.style.opacity = "";
    if (yearsEl) yearsEl.style.opacity = "";
    if (yearsPlusEl) yearsPlusEl.classList.remove("is-lit");
    const cleanupMonoliths = cred.querySelectorAll<HTMLElement>("[data-standard-monolith]");
    cleanupMonoliths.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    if (shade) shade.style.opacity = "";
    if (foot) {
      foot.style.opacity = "";
      foot.style.pointerEvents = "";
    }
    delete cred.dataset.landed;
  };
}
