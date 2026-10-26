"use client";

import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CRANE_SRC = "/assets/hero/crane-container.webp";

interface UseHeroIntroOptions {
  onDone: () => void;
}

/**
 * One timeline:
 * 1. Exposure sweep on the RKLT mark while the crane image decodes.
 * 2. Seam lines appear, then the five bars lift center-out.
 * 3. The curtains and the crane rise together and ease out as one.
 * 4. The crane drops under its own weight, kisses past the rest, and settles.
 *    The shadow flares at the contact, then eases back.
 * 5. RKLT, the hero lines, the buttons, and the header appear with that drop.
 * GSAP is the only writer of transform on the bars, the crane, and the shade,
 * and the only writer of clip-path on the wordmark.
 */
export function useHeroIntro(
  rootRef: RefObject<HTMLElement | null>,
  { onDone }: UseHeroIntroOptions
) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || reduce) {
      document.documentElement.classList.remove("rklt-intro-lock");
      onDoneRef.current();
      return;
    }

    const bars = Array.from(root.querySelectorAll<HTMLElement>("[data-intro-bar]"));
    const seams = Array.from(root.querySelectorAll<HTMLElement>("[data-intro-seam]"));
    const logo = root.querySelector<HTMLElement>("[data-intro-logo]");
    const matrix = root.querySelector<SVGFEColorMatrixElement>("[data-exposure]");
    const markRule = root.querySelector<HTMLElement>("[data-intro-rule]");
    const crane = root.querySelector<HTMLElement>("[data-crane]");
    const skipBtn = root.querySelector<HTMLButtonElement>("[data-intro-skip]");
    const heading = root.querySelector<HTMLElement>("h1");
    const section = root.querySelector<HTMLElement>("section");
    const copy = root.querySelector<HTMLElement>(".rklt-crane-copy");
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-crane-line]"));
    const laser = root.querySelector<HTMLElement>("[data-crane-laser]");
    const foot = root.querySelector<HTMLElement>(".rklt-crane-foot");
    const shade = root.querySelector<HTMLElement>("[data-crane-shade]");
    const header = document.querySelector<HTMLElement>("header");

    if (!bars.length || !logo || !matrix || !crane) {
      document.documentElement.classList.remove("rklt-intro-lock");
      onDoneRef.current();
      return;
    }

    const html = document.documentElement;
    html.classList.add("rklt-intro-lock");
    html.setAttribute("data-intro-live", "");
    gsap.registerPlugin(ScrollTrigger);

    let finished = false;
    let cancelled = false;
    let fade: gsap.core.Tween | null = null;
    let drift: gsap.core.Tween | null = null;
    const timers: number[] = [];
    const frozen: HTMLElement[] = [];

    const freeze = (node: Element | null) => {
      if (!(node instanceof HTMLElement) || node.hasAttribute("inert")) return;
      node.setAttribute("inert", "");
      frozen.push(node);
    };
    const thaw = () => {
      frozen.forEach((node) => node.removeAttribute("inert"));
      frozen.length = 0;
    };

    freeze(document.querySelector("header"));
    freeze(document.querySelector("footer"));
    freeze(section);
    document.querySelectorAll("main > *").forEach((node) => {
      if (node !== root && !node.contains(root)) freeze(node);
    });

    const applyExposure = (t: number) => {
      const clamped = Math.max(0, Math.min(1, t));
      let exposure: number;
      let bias: number;
      if (clamped < 0.4) {
        const k = 1 - Math.pow(1 - clamped / 0.4, 3);
        exposure = 0.4 + (1.85 - 0.4) * k;
        bias = 0.1 * k;
      } else {
        const u = (clamped - 0.4) / 0.6;
        const k = u * u * (3 - 2 * u);
        exposure = 1.85 + (1 - 1.85) * k;
        bias = 0.1 * (1 - k);
      }
      const e = exposure.toFixed(4);
      const b = bias.toFixed(4);
      matrix.setAttribute(
        "values",
        `${e} 0 0 0 ${b} 0 ${e} 0 0 ${b} 0 0 ${e} 0 ${b} 0 0 0 1 0`
      );
    };

    bars.forEach((bar) => bar.classList.add("is-lift"));
    crane.classList.add("is-lift");

    gsap.set(bars, { yPercent: 0, force3D: true });
    const measureRise = () => {
      const previous = crane.style.transform;
      crane.style.transform = "none";
      const box = crane.getBoundingClientRect();
      crane.style.transform = previous;
      if (box.height < 2) return window.innerHeight;
      return Math.max(0, window.innerHeight - box.top);
    };
    gsap.set(crane, { y: measureRise(), force3D: true });
    if (shade) gsap.set(shade, { opacity: 0, scale: 0.46, y: 48, force3D: true });
    if (lines.length) gsap.set(lines, { clipPath: "inset(0% 100% 0% 0%)" });
    if (copy) gsap.set(copy, { opacity: 1 });
    if (foot) gsap.set(foot, { opacity: 0, y: 28 });
    if (header) gsap.set(header, { opacity: 0 });
    if (markRule) gsap.set(markRule, { scaleX: 0, transformOrigin: "50% 50%" });

    const exposure = { t: 0 };
    const logoTl = gsap.timeline();
    logoTl.to(
      exposure,
      {
        t: 1,
        duration: 1.05,
        ease: "none",
        onUpdate: () => applyExposure(exposure.t),
      },
      0
    );
    if (markRule) {
      logoTl.to(markRule, { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.22);
    }

    const finish = () => {
      if (finished) return;
      finished = true;
      logoTl.kill();
      const intro = root.querySelector(".rklt-intro");
      if (heading && intro?.contains(document.activeElement)) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      crane.classList.remove("is-lift");
      thaw();
      html.classList.remove("rklt-intro-lock");
      html.removeAttribute("data-intro-live");
      gsap.set(crane, { clearProps: "transform" });
      gsap.set([copy, foot, header, shade].filter(Boolean), {
        clearProps: "opacity,transform",
      });
      if (lines.length) gsap.set(lines, { clearProps: "clipPath" });
      if (laser) gsap.set(laser, { clearProps: "transform,opacity,visibility" });
      const fading = root.querySelectorAll<HTMLElement>(
        ".rklt-crane-brief-title, .rklt-crane-modes-line"
      );
      if (fading.length && section) {
        fade = gsap.fromTo(
          fading,
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "clamp(top top)",
              end: "+=32%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
      const stage = section?.closest(".rklt-hero-stage");
      if (stage) {
        drift = gsap.fromTo(
          crane,
          { y: 0 },
          {
            y: () => Math.round(window.innerHeight * -0.09),
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
      onDoneRef.current();
    };

    const exitTl = gsap.timeline({ paused: true, onComplete: finish });
    if (seams.length) {
      exitTl.to(seams, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
    }
    exitTl.to(logo, { opacity: 0, y: -28, duration: 0.42, ease: "power2.in" }, 0.14);
    const riseEase = "power2.out";
    const riseDuration = 1.22;
    const riseAt = 0.3;
    const settleAt = riseAt + riseDuration;
    const dropDuration = 0.4;
    const reboundAt = settleAt + dropDuration;
    exitTl.to(
      bars,
      {
        yPercent: -110,
        duration: riseDuration,
        ease: riseEase,
        stagger: { each: 0.1, from: "center" },
        force3D: true,
      },
      riseAt
    );
    exitTl.fromTo(
      crane,
      { y: () => measureRise() },
      {
        y: -78,
        duration: riseDuration,
        ease: riseEase,
        force3D: true,
        immediateRender: false,
      },
      riseAt
    );
    exitTl.to(
      crane,
      { y: 16, duration: dropDuration, ease: "power2.in", force3D: true },
      settleAt
    );
    exitTl.to(
      crane,
      { y: 0, duration: 0.68, ease: "power3.out", force3D: true },
      reboundAt
    );
    if (lines.length) {
      exitTl.fromTo(
        lines,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.62, ease: "power2.out" },
        settleAt
      );
    }
    if (laser && lines[0]) {
      exitTl.fromTo(
        laser,
        { x: -28, autoAlpha: 1 },
        {
          x: () => lines[0].offsetWidth + 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.inOut",
          immediateRender: false,
        },
        settleAt
      );
    }
    if (shade) {
      exitTl.to(
        shade,
        { opacity: 0.45, scale: 0.72, y: 18, duration: dropDuration, ease: "power2.in", force3D: true },
        settleAt
      );
      exitTl.to(
        shade,
        { opacity: 1, scale: 1.16, y: 0, duration: 0.18, ease: "power3.out", force3D: true },
        reboundAt
      );
      exitTl.to(
        shade,
        { scale: 1, duration: 0.5, ease: "power2.out", force3D: true },
        reboundAt + 0.18
      );
    }
    exitTl.call(() => section?.classList.add("is-landed"), [], reboundAt);
    if (header) {
      exitTl.to(header, { opacity: 1, duration: 0.55, ease: "power2.out" }, settleAt);
    }
    if (foot) {
      exitTl.to(foot, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, settleAt);
    }

    const requestSkip = () => {
      if (finished) return;
      exitTl.progress(1);
    };

    const onSkipClick = (event: Event) => {
      event.preventDefault();
      requestSkip();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      requestSkip();
    };

    skipBtn?.addEventListener("click", onSkipClick);
    window.addEventListener("keydown", onKey);
    skipBtn?.focus({ preventScroll: true });

    const decode = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        const done = () => resolve();
        img.onload = () => {
          const pending = img.decode?.();
          if (pending) pending.then(done).catch(done);
          else done();
        };
        img.onerror = done;
        img.src = src;
      });

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    void Promise.race([Promise.all([wait(1050), decode(CRANE_SRC)]), wait(3200)]).then(() => {
      if (cancelled || finished) return;
      gsap.set(crane, { y: measureRise(), force3D: true });
      exitTl.play();
    });

    return () => {
      cancelled = true;
      finished = true;
      timers.forEach((id) => window.clearTimeout(id));
      skipBtn?.removeEventListener("click", onSkipClick);
      window.removeEventListener("keydown", onKey);
      logoTl.kill();
      exitTl.kill();
      fade?.scrollTrigger?.kill();
      fade?.kill();
      drift?.scrollTrigger?.kill();
      drift?.kill();
      thaw();
      html.classList.remove("rklt-intro-lock");
      html.removeAttribute("data-intro-live");
    };
  }, [rootRef]);
}
