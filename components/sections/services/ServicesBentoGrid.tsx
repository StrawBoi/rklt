"use client";

import React, { useRef, useEffect } from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";

interface ServicesBentoGridProps {
  locale: Locale;
}

interface ServiceMeta {
  badge: { en: string; ar: string };
  metric: { en: string; ar: string };
  metricLabel: { en: string; ar: string };
  video?: string;
  poster?: string;
  colSpan: string;
}

const SERVICE_EXTRAS: Record<string, ServiceMeta> = {
  sea: {
    badge: { en: "PRIMARY MARITIME", ar: "الشريان البحري الرئيسي" },
    metric: { en: "15,000+ TEU", ar: "١٥,٠٠٠+ حاوية" },
    metricLabel: { en: "Annual Volume Handled", ar: "حجم الشحن السنوي" },
    poster: "/assets/hero/corridor/port-day.jpg",
    colSpan: "lg:col-span-8",
  },
  air: {
    badge: { en: "EXPRESS PRIORITY", ar: "أولوية فائقة السرعة" },
    metric: { en: "4–8 Hours", ar: "٤–٨ ساعات" },
    metricLabel: { en: "Touchdown Clearance", ar: "التخليص فور الهبوط" },
    colSpan: "lg:col-span-4",
  },
  land: {
    badge: { en: "OVERLAND CORRIDOR", ar: "شريان النقل البري" },
    metric: { en: "24–48h GCC", ar: "٢٤–٤٨ ساعة للخليج" },
    metricLabel: { en: "Scheduled Transit", ar: "مواعيد عبور مجدولة" },
    colSpan: "lg:col-span-4",
  },
  customs: {
    badge: { en: "STATUTORY BROKERAGE", ar: "تخليص جمركي معتمد" },
    metric: { en: "License #412", ar: "ترخيص جمركي ٤١٢" },
    metricLabel: { en: "Jordan Customs Directorate", ar: "دائرة الجمارك الأردنية" },
    colSpan: "lg:col-span-8",
  },
  reefer: {
    badge: { en: "ACTIVE COLD-CHAIN", ar: "سلاسل التبريد النشطة" },
    metric: { en: "-25°C to +15°C", ar: "-٢٥° إلى +١٥° م" },
    metricLabel: { en: "Calibrated Thermal Zones", ar: "نطاقات حرارية معايرة" },
    video: "/assets/services/reefer.mp4",
    poster: "/assets/hero/corridor/port-night.jpg",
    colSpan: "lg:col-span-6",
  },
  project: {
    badge: { en: "HEAVY LIFT & OOG", ar: "الأحمال الثقيلة والمشاريع" },
    metric: { en: "Up to 500 Tons", ar: "حتى ٥٠٠ طن" },
    metricLabel: { en: "Modular Hydraulic Axles", ar: "مقطورات هيدروليكية معيارية" },
    video: "/assets/services/project.mp4",
    poster: "/assets/hero/corridor/port-day.jpg",
    colSpan: "lg:col-span-6",
  },
};

export const ServicesBentoGrid: React.FC<ServicesBentoGridProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.core : servicesContentEn.core;
  const services = content.services;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Single Active Decoder / Visibility policy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((v) => {
      if (v) observer.observe(v);
    });

    return () => observer.disconnect();
  }, []);

  const getQuoteLink = (serviceName: string) =>
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      isAr
        ? `مرحباً ربوع الخير، أود الاستفسار وطلب تسعيرة لخدمة: ${serviceName}`
        : `Hello RKLT operations desk, I would like to request a rate inquiry for: ${serviceName}`
    )}`;

  return (
    <section id="capabilities-bento" className="py-20 md:py-28 rklt-bento-section transition-colors duration-300">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {content.eyebrow}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight rklt-bento-heading">
            {content.title}
          </h2>

          <p className="text-base sm:text-lg rklt-bento-lead leading-relaxed">
            {isAr
              ? "منظومة متكاملة من ٦ ركائز تشغيلية توفر حلول الشحن متعدد الوسائط، التخليص الجمركي، وحفظ سلاسل التبريد والأحمال الهندسية."
              : "An integrated suite of 6 core logistics capabilities engineered for multimodal freight, statutory customs clearance, cold-chain compliance, and heavy engineering projects."}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((svc, idx) => {
            const extra = SERVICE_EXTRAS[svc.id] || {
              badge: { en: "SPECIALIZED", ar: "خدمة متخصصة" },
              metric: { en: "100%", ar: "١٠٠٪" },
              metricLabel: { en: "Operational Coverage", ar: "تغطية تشغيلية" },
              colSpan: "lg:col-span-6",
            };

            const hasVideo = Boolean(extra.video);

            return (
              <div
                key={svc.id}
                id={svc.id}
                className={`rklt-bento-card ${extra.colSpan} flex flex-col justify-between overflow-hidden relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl`}
              >
                {/* Background Video for Reefer and Project */}
                {hasVideo ? (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity duration-500">
                    <video
                      ref={(el) => { videoRefs.current[idx] = el; }}
                      src={extra.video}
                      poster={extra.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 rklt-bento-video-scrim" />
                  </div>
                ) : null}

                {/* Card Top: Numeral, Badge & Metric */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#e2b34a]">
                        {svc.numeral}
                      </span>
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider font-semibold uppercase rklt-bento-tag">
                        {isAr ? extra.badge.ar : extra.badge.en}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl rklt-bento-card-title pt-1">
                      {svc.name}
                    </h3>
                  </div>

                  {/* Operational Telemetry Badge */}
                  <div className="text-end shrink-0 hidden sm:block">
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#e2b34a] block">
                      {isAr ? extra.metric.ar : extra.metric.en}
                    </span>
                    <span className="font-mono text-[11px] rklt-bento-metric-label block">
                      {isAr ? extra.metricLabel.ar : extra.metricLabel.en}
                    </span>
                  </div>
                </div>

                {/* Card Middle: Description & Feature Bullets */}
                <div className="relative z-10 space-y-4 my-auto">
                  <p className="font-medium text-sm sm:text-base rklt-bento-tagline">
                    {svc.tagline}
                  </p>
                  <p className="text-sm rklt-bento-desc leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Zero-Click Feature Bullets */}
                  <div className="pt-2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      {svc.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 rklt-bento-feature">
                          <span className="text-[#e2b34a] mt-0.5 shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Action Bar */}
                <div className="relative z-10 pt-6 mt-6 border-t rklt-bento-card-footer flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#e2b34a]">
                    <span className="w-2 h-2 rounded-full bg-[#e2b34a] animate-pulse" />
                    <span>{isAr ? "جاهز للتنفيذ فوراً" : "Live Operational Capacity"}</span>
                  </div>

                  <a
                    href={getQuoteLink(svc.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs tracking-wide transition-all duration-200 rklt-bento-btn"
                  >
                    <Icon name="whatsapp" size={14} />
                    <span>{isAr ? "طلب تسعيرة فورية" : "Inquire via Desk"}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
