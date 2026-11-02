"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { servicesContentEn } from "@/content/en/services";
import { servicesContentAr } from "@/content/ar/services";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";

interface ServicesBentoGridProps {
  locale: Locale;
}

interface PreviewThumb {
  src: string;
  labelEn: string;
  labelAr: string;
}

interface ServiceMeta {
  metric: { en: string; ar: string };
  metricLabel: { en: string; ar: string };
  nightImg: string;
  dayImg: string;
  video?: string;
  previews?: PreviewThumb[];
  colSpan: string;
}

const SERVICE_EXTRAS: Record<string, ServiceMeta> = {
  sea: {
    metric: { en: "15,000+ TEU", ar: "١٥,٠٠٠+ حاوية" },
    metricLabel: { en: "Annual Volume Handled", ar: "حجم الشحن السنوي" },
    nightImg: "/assets/services/sea.jpg",
    dayImg: "/assets/services/sea-day.jpg",
    video: "/assets/services/sea-motion.mp4",
    previews: [
      { src: "/assets/services/previews/fcl.webp", labelEn: "FCL & LCL", labelAr: "حاويات كاملة ومجمعة" },
      { src: "/assets/services/previews/lading.webp", labelEn: "B/L Custody", labelAr: "بوالص الشحن" },
      { src: "/assets/services/previews/booking.webp", labelEn: "Direct Slot", labelAr: "حجز الخطوط" },
      { src: "/assets/services/previews/door.webp", labelEn: "Quay to Door", labelAr: "من الرصيف للمستودع" },
    ],
    colSpan: "lg:col-span-7",
  },
  air: {
    metric: { en: "4–8 Hours", ar: "٤–٨ ساعات" },
    metricLabel: { en: "Touchdown Clearance", ar: "التخليص فور الهبوط" },
    nightImg: "/assets/services/air.jpg",
    dayImg: "/assets/services/air-day.jpg",
    video: "/assets/services/air-motion.mp4",
    previews: [
      { src: "/assets/services/previews/air-hub.webp", labelEn: "QAIA Air Hub", labelAr: "قرية الشحن الجوي" },
      { src: "/assets/services/previews/air-clear.webp", labelEn: "Tarmac Release", labelAr: "إفراج جمركي فوري" },
      { src: "/assets/services/previews/air-care.webp", labelEn: "High-Value Care", labelAr: "عناية خاصة" },
      { src: "/assets/services/previews/air-door.webp", labelEn: "Express Delivery", labelAr: "توصيل سريع" },
    ],
    colSpan: "lg:col-span-5",
  },
  land: {
    metric: { en: "24–48h GCC", ar: "٢٤–٤٨ ساعة للخليج" },
    metricLabel: { en: "Scheduled Transit", ar: "مواعيد عبور مجدولة" },
    nightImg: "/assets/services/land.jpg",
    dayImg: "/assets/services/land-day.jpg",
    video: "/assets/services/land-motion.mp4",
    previews: [
      { src: "/assets/services/previews/land-border.webp", labelEn: "Border Desk", labelAr: "مكاتب الحدود" },
      { src: "/assets/services/previews/land-convoy.webp", labelEn: "Bonded Fleet", labelAr: "قوافل معلقة" },
      { src: "/assets/services/previews/land-route.webp", labelEn: "GCC Routes", labelAr: "مسارات الخليج" },
      { src: "/assets/services/previews/land-trailer.webp", labelEn: "Heavy Trailers", labelAr: "مقطورات حديثة" },
    ],
    colSpan: "lg:col-span-5",
  },
  customs: {
    metric: { en: "License #412", ar: "ترخيص جمركي ٤١٢" },
    metricLabel: { en: "Jordan Customs Directorate", ar: "دائرة الجمارك الأردنية" },
    nightImg: "/assets/services/Customs 619.jpg",
    dayImg: "/assets/services/customs-day.jpg",
    video: "/assets/services/cargo-motion.mp4",
    previews: [
      { src: "/assets/services/previews/customs-desk.webp", labelEn: "ASYCUDA EDI", labelAr: "ربط أسيكودا" },
      { src: "/assets/services/previews/customs-code.webp", labelEn: "HS Tariff Audit", labelAr: "تدقيق التعرفة" },
      { src: "/assets/services/previews/customs-permit.webp", labelEn: "JFDA & JSMO", labelAr: "الغذاء والمواصفات" },
      { src: "/assets/services/previews/customs-agency.webp", labelEn: "Quayside Representation", labelAr: "تمثيل ميداني" },
    ],
    colSpan: "lg:col-span-7",
  },
  reefer: {
    metric: { en: "-25°C to +15°C", ar: "-٢٥° إلى +١٥° م" },
    metricLabel: { en: "Calibrated Thermal Zones", ar: "نطاقات حرارية معايرة" },
    nightImg: "/assets/services/reefer.jpg",
    dayImg: "/assets/services/reefer-day.jpg",
    video: "/assets/services/reefer-motion.mp4",
    previews: [
      { src: "/assets/services/previews/reefer.webp", labelEn: "Active Cold-Chain", labelAr: "تبريد نشط مستمر" },
      { src: "/assets/services/previews/fcl.webp", labelEn: "Genset Plug-in", labelAr: "مولدات طاقة مدمجة" },
    ],
    colSpan: "lg:col-span-6",
  },
  project: {
    metric: { en: "Up to 500 Tons", ar: "حتى ٥٠٠ طن" },
    metricLabel: { en: "Modular Hydraulic Axles", ar: "مقطورات هيدروليكية معيارية" },
    nightImg: "/assets/services/project.jpg",
    dayImg: "/assets/services/project-day.jpg",
    video: "/assets/services/project.mp4",
    previews: [
      { src: "/assets/services/previews/land-trailer.webp", labelEn: "Low-Bed Axles", labelAr: "لوبد ومحاور ثقيلة" },
      { src: "/assets/services/previews/land-convoy.webp", labelEn: "Route Escort", labelAr: "مرافقة هندسية" },
    ],
    colSpan: "lg:col-span-6",
  },
};

export const ServicesBentoGrid: React.FC<ServicesBentoGridProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? servicesContentAr.core : servicesContentEn.core;
  const services = content.services;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
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
    <section
      id="capabilities-bento"
      className="py-24 md:py-32 rklt-bento-section transition-colors duration-300"
    >
      <Container>
        {/* Architectural Header */}
        <div className="max-w-3xl mb-16 space-y-5">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] rklt-bento-heading">
            {content.title}
          </h2>

          <p className="text-base sm:text-lg rklt-bento-lead leading-relaxed">
            {isAr
              ? "منظومة متكاملة من ٦ ركائز تشغيلية توفر حلول الشحن متعدد الوسائط، التخليص الجمركي، وحفظ سلاسل التبريد والأحمال الهندسية."
              : "An integrated suite of 6 core logistics capabilities engineered for multimodal freight, statutory customs clearance, cold-chain compliance, and heavy engineering projects."}
          </p>
        </div>

        {/* Sharp Nested Architectural Grid with Custom Photography & Motion Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((svc, idx) => {
            const extra = SERVICE_EXTRAS[svc.id] || {
              metric: { en: "100%", ar: "١٠٠٪" },
              metricLabel: { en: "Operational Coverage", ar: "تغطية تشغيلية" },
              nightImg: "/assets/services/sea.jpg",
              dayImg: "/assets/services/sea-day.jpg",
              colSpan: "lg:col-span-6",
            };

            return (
              <div
                key={svc.id}
                id={svc.id}
                className={`rklt-bento-card group ${extra.colSpan} flex flex-col justify-between overflow-hidden relative rounded-[8px] p-1.5 transition-all duration-300`}
              >
                <div className="relative flex-1 flex flex-col justify-between overflow-hidden rounded-[4px] bg-[#070d12] [html[data-theme=day]_&]:bg-[#fbf9f4] border border-white/8 [html[data-theme=day]_&]:border-black/8">
                  {/* Top Custom Photography & Motion Showcase Banner */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
                    <Image
                      src={extra.nightImg}
                      alt={svc.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105 [html[data-theme=day]_&]:hidden"
                    />
                    <Image
                      src={extra.dayImg}
                      alt={svc.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="hidden object-cover object-center transition-transform duration-700 group-hover:scale-105 [html[data-theme=day]_&]:block"
                    />

                    {extra.video && (
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={extra.video}
                        poster={extra.nightImg}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-95 transition-opacity duration-500"
                      />
                    )}

                    {/* Subtle Bottom Gradient Weld */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d12] via-[#070d12]/25 to-transparent [html[data-theme=day]_&]:from-[#fbf9f4] [html[data-theme=day]_&]:via-transparent" />

                    {/* Floating Architectural Numeral & Metric Overlay */}
                    <div className="absolute bottom-4 inset-inline-start-6 inset-inline-end-6 flex items-end justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-numeral text-3xl sm:text-4xl font-light text-[#e2b34a] [html[data-theme=day]_&]:text-[#9a701e] leading-none drop-shadow">
                          {svc.numeral}
                        </span>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white [html[data-theme=day]_&]:text-[#091a21] drop-shadow-sm">
                          {svc.name}
                        </h3>
                      </div>

                      <div className="text-end shrink-0 hidden sm:block">
                        <span className="font-mono text-base sm:text-lg font-bold text-[#e2b34a] [html[data-theme=day]_&]:text-[#9a701e] block leading-none">
                          {isAr ? extra.metric.ar : extra.metric.en}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/75 [html[data-theme=day]_&]:text-[#1c3a44] block mt-1">
                          {isAr ? extra.metricLabel.ar : extra.metricLabel.en}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body: Editorial Copy, Sub-Capability Previews & Specification Lines */}
                  <div className="relative z-10 p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="font-medium text-sm sm:text-base rklt-bento-tagline">
                        {svc.tagline}
                      </p>
                      <p className="text-sm rklt-bento-desc leading-relaxed">
                        {svc.description}
                      </p>

                      {/* Sub-Capability Custom Stills Strip */}
                      {extra.previews && extra.previews.length > 0 && (
                        <div className="pt-2">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {extra.previews.map((thumb, tIdx) => (
                              <div
                                key={tIdx}
                                className="group/thumb relative aspect-[16/10] rounded-[4px] overflow-hidden border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-black/40"
                              >
                                <Image
                                  src={thumb.src}
                                  alt={isAr ? thumb.labelAr : thumb.labelEn}
                                  fill
                                  sizes="160px"
                                  className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                <span className="absolute bottom-1.5 inset-inline-start-2 inset-inline-end-2 font-mono text-[10px] font-bold text-white/95 truncate">
                                  {isAr ? thumb.labelAr : thumb.labelEn}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-white/8 [html[data-theme=day]_&]:border-black/8">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                          {svc.features.map((feature, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-baseline gap-2.5 rklt-bento-feature"
                            >
                              <span className="font-mono text-[10px] text-[#c89b3c]">—</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer: Clean Architectural Action Link */}
                    <div className="pt-5 border-t rklt-bento-card-footer flex items-center justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-widest rklt-bento-metric-label">
                        {isAr ? extra.metric.ar : extra.metric.en}
                      </span>

                      <a
                        href={getQuoteLink(svc.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 rklt-bento-btn"
                      >
                        <Icon name="whatsapp" size={14} />
                        <span>{isAr ? "طلب تسعيرة فورية" : "Inquire via Desk"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
