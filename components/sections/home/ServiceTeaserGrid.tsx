"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/primitives/Icon";

interface ServiceTeaserGridProps {
  locale: Locale;
}

type Slide = {
  key: string;
  numeral: string;
  label: string;
  title: string;
  tagline?: string;
  body: string;
  photo: string;
  group: "core" | "extended";
};

const extendedPhotos = [
  "/assets/services/sea.jpg",
  "/assets/services/previews/fcl.webp",
  "/assets/services/previews/reefer.webp",
  "/assets/services/land.jpg",
  "/assets/services/previews/land-trailer.webp",
  "/assets/services/air.jpg",
  "/assets/services/previews/customs-desk.webp",
  "/assets/services/previews/lading.webp",
  "/assets/services/previews/booking.webp",
];

export const ServiceTeaserGrid: React.FC<ServiceTeaserGridProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const home = isAr ? homeContentAr : homeContentEn;
  const services = isAr ? servicesContentAr : servicesContentEn;
  const pinRef = useRef<HTMLElement>(null);
  const photoRefs = useRef<Array<HTMLImageElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dialRef = useRef<SVGCircleElement>(null);
  const scrollRef = useRef<ScrollTrigger | null>(null);
  const ring = 100.53;
  const [open, setOpen] = useState(0);

  const slides = useMemo<Slide[]>(() => {
    const short = new Map(home.servicesTeaser.items.map((item) => [item.id, item.title]));
    const core: Slide[] = services.core.services.map((service) => ({
      key: service.id,
      numeral: service.numeral,
      label: short.get(service.id) ?? service.name,
      title: service.name,
      tagline: service.tagline,
      body: service.description,
      photo: `/assets/services/${service.id}.jpg`,
      group: "core",
    }));
    const extended: Slide[] = services.extended.items.map((item, index) => ({
      key: `ext-${item.numeral}`,
      numeral: item.numeral,
      label: item.title,
      title: item.title,
      body: item.desc,
      photo: extendedPhotos[index] ?? "/assets/services/sea.jpg",
      group: "extended",
    }));
    return [...core, ...extended];
  }, [home, services]);

  const coreCount = services.core.services.length;
  const count = slides.length;
  const quote = home.hero.ctaPrimary;
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr ? siteConfig.whatsappDefaultMsgAr : siteConfig.whatsappDefaultMsgEn
  )}`;

  const goTo = (index: number) => {
    const next = Math.min(count - 1, Math.max(0, index));
    const scroll = scrollRef.current;
    if (!scroll) {
      setOpen(next);
      panelRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const duration = scroll.animation?.duration() ?? count;
    const fade = 0.45;
    const time = next === 0 ? 0 : Math.min(duration, next + (1 - fade) / 2);
    const progress = duration === 0 ? 0 : time / duration;
    window.scrollTo({
      top: scroll.start + (scroll.end - scroll.start) * progress,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const root = pinRef.current;
    if (!root) return;
    const photos = photoRefs.current.filter((node): node is HTMLImageElement => node !== null);
    const panels = panelRefs.current.filter((node): node is HTMLDivElement => node !== null);
    if (photos.length === 0 || photos.length !== panels.length) return;

    gsap.registerPlugin(ScrollTrigger);
    const clearPins = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const el = trigger.trigger;
        if (!(el instanceof Element)) return;
        if (el === root || root.contains(el) || el.contains(root)) trigger.kill(true);
      });
    };
    clearPins();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      while (root.parentElement?.classList.contains("pin-spacer")) {
        root.parentElement.replaceWith(root);
      }
      root.dataset.conveyorTheme = "dark";
      root.style.setProperty("--conveyor-mix", "0");
      const total = photos.length;
      const fade = 0.45;
      const masks = gsap.utils.toArray<HTMLElement>(".rklt-conveyor-mask", root);
      const timeline = gsap.timeline({ defaults: { duration: 1, ease: "none" } });

      const dial = root.querySelector<HTMLElement>(".rklt-conveyor-dial");
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "top top",
        scrub: 0.7,
        onUpdate: (self) => {
          const sample = masks[0];
          if (!sample) return;
          if (self.progress > 0.98) {
            gsap.set(masks, { y: 0 });
            if (dial) gsap.set(dial, { y: 0 });
            return;
          }
          const current = Number(gsap.getProperty(sample, "y")) || 0;
          const naturalTop = sample.getBoundingClientRect().top - current;
          const y = Math.min(0, window.innerHeight * 0.18 - naturalTop);
          gsap.set(masks, { y });
          if (!dial) return;
          const placed = sample.getBoundingClientRect();
          const sectionTop = root.getBoundingClientRect().top;
          const seam = Math.max(placed.top + placed.height / 2, sectionTop);
          const dialY = Number(gsap.getProperty(dial, "y")) || 0;
          const dialNatural = dial.getBoundingClientRect().top - dialY;
          gsap.set(dial, { y: seam - dial.offsetHeight / 2 - dialNatural });
        },
        onLeave: () => {
          gsap.set(masks, { y: 0 });
          if (dial) gsap.set(dial, { y: 0 });
        },
      });

      gsap.set(photos, {
        yPercent: 0,
        opacity: 1,
        y: (index, element) => (index === 0 ? 0 : (element as HTMLElement).offsetHeight),
      });
      gsap.set(panels, {
        yPercent: 0,
        opacity: 1,
        y: (index, element) => (index === 0 ? 0 : (element as HTMLElement).offsetHeight),
      });

      photos.forEach((photo, index) => {
        if (index === 0) return;
        const previousPhoto = photos[index - 1];
        const previousPanel = panels[index - 1];
        const panel = panels[index];
        const at = index - fade;
        timeline
          .to(previousPhoto, { y: () => -previousPhoto.offsetHeight, duration: fade }, at)
          .to(previousPanel, { y: () => -previousPanel.offsetHeight, duration: fade }, at)
          .fromTo(photo, { y: () => photo.offsetHeight }, { y: 0, duration: fade }, at)
          .fromTo(panel, { y: () => panel.offsetHeight }, { y: 0, duration: fade }, at);
      });
      timeline.set({}, {}, count);

      const pinned = ScrollTrigger.create({
        animation: timeline,
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * total}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const duration = self.animation?.duration() || total;
          const time = self.progress * duration;
          const blend = gsap.utils.clamp(0, 1, (time - (coreCount - fade)) / fade);
          root.style.setProperty("--conveyor-mix", blend.toFixed(3));
          const theme = blend > 0.72 ? "light" : "dark";
          if (root.dataset.conveyorTheme !== theme) root.dataset.conveyorTheme = theme;
          const index = Math.min(total - 1, Math.max(0, Math.floor(time + fade / 2)));
          setOpen((current) => (current === index ? current : index));
          if (dialRef.current) {
            gsap.set(dialRef.current, { strokeDashoffset: ring * (1 - self.progress) });
          }
        },
      });

      scrollRef.current = pinned;
      return () => {
        scrollRef.current = null;
        delete root.dataset.conveyorTheme;
        root.style.removeProperty("--conveyor-mix");
      };
    });

    return () => {
      scrollRef.current = null;
      mm.revert();
      clearPins();
    };
  }, [coreCount, count]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      goTo(open + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(open - 1);
    }
  };

  const coreSlides = slides.filter((slide) => slide.group === "core");
  const extendedSlides = slides.filter((slide) => slide.group === "extended");

  const renderLinks = (group: Slide[]) =>
    group.map((slide) => {
      const index = slides.findIndex((item) => item.key === slide.key);
      const active = index === open;
      return (
        <li key={slide.key}>
          <button
            type="button"
            data-active={active ? "true" : undefined}
            aria-current={active ? "true" : undefined}
            onClick={() => goTo(index)}
          >
            {slide.label}
          </button>
        </li>
      );
    });

  return (
    <section
      id="services"
      ref={pinRef}
      className="rklt-conveyor border-b border-role-line"
      aria-label={home.servicesTeaser.title}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="rklt-conveyor-layout">
        <nav className="rklt-conveyor-nav" aria-label={home.servicesTeaser.eyebrow}>
          <div>
            <p className={isAr ? undefined : "is-latin"}>{home.servicesTeaser.eyebrow}</p>
            <ul>{renderLinks(coreSlides)}</ul>
          </div>
          <div>
            <p className={isAr ? undefined : "is-latin"}>{services.extended.eyebrow}</p>
            <ul>{renderLinks(extendedSlides)}</ul>
          </div>
          <Link className="rklt-conveyor-catalog" href={`/${locale}/services`}>
            {home.servicesTeaser.viewAll}
          </Link>
        </nav>
        <div className="rklt-conveyor-list">
          {slides.map((slide, index) => (
            <article key={slide.key} className="rklt-conveyor-item" data-group={slide.group}>
              <div className="rklt-conveyor-mask">
                <img
                  ref={(node) => {
                    photoRefs.current[index] = node;
                  }}
                  className="rklt-conveyor-photo"
                  src={slide.photo}
                  alt=""
                  width={800}
                  height={1000}
                />
              </div>
              <div className="rklt-conveyor-copy">
                <div
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  className="rklt-conveyor-panel"
                  aria-hidden={index === open ? undefined : true}
                >
                  <span className="rklt-conveyor-numeral">{slide.numeral}</span>
                  <h2>{slide.title}</h2>
                  {slide.tagline ? <p className="rklt-conveyor-tagline">{slide.tagline}</p> : null}
                  <p className="rklt-conveyor-body">{slide.body}</p>
                </div>
              </div>
            </article>
          ))}
          <div className="rklt-conveyor-dial" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" />
              <circle
                ref={dialRef}
                cx="20"
                cy="20"
                r="16"
                style={{ strokeDasharray: ring, strokeDashoffset: ring }}
              />
            </svg>
          </div>
        </div>
        <a className="rklt-crane-cta rklt-conveyor-cta" href={whatsappHref}>
          <Icon name="whatsapp" size={16} />
          <span>{quote}</span>
        </a>
      </div>
    </section>
  );
};
