"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";

interface CoverageTeaserProps {
  locale: Locale;
}

export interface CorridorData {
  id: string;
  numeral: string;
  numeralAr: string;
  routeFrom: string;
  routeFromAr: string;
  routeTo: string;
  routeToAr: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  distance: string;
  distanceAr: string;
  transitTime: string;
  transitTimeAr: string;
  schedule: string;
  scheduleAr: string;
  checkpoints: string[];
  checkpointsAr: string[];
  photo: string;
  dayPhoto: string;
}

export const CORRIDORS: CorridorData[] = [
  {
    id: "maritime-aqaba",
    numeral: "01",
    numeralAr: "٠١",
    routeFrom: "AQABA",
    routeFromAr: "العقبة",
    routeTo: "AMMAN",
    routeToAr: "عمّان",
    name: "The Maritime Gateway Corridor",
    nameAr: "بوابة البحر الأحمر وميناء العقبة",
    tagline:
      "Direct container haulage connecting Port of Aqaba to Amman and national dry depots with zero dwell time.",
    taglineAr:
      "نقل الحاويات المباشر من أرصفة ميناء العقبة إلى مستودعات عمّان والموانئ الجافة دون انتظار.",
    distance: "335 KM",
    distanceAr: "٣٣٥ كم",
    transitTime: "4–6 HOURS",
    transitTimeAr: "٤–٦ ساعات",
    schedule: "Daily Scheduled Convoys",
    scheduleAr: "قوافل يومية منتظمة",
    checkpoints: ["Aqaba Port Terminal", "Al-Qweira Weigh Station", "Amman Customs Depot"],
    checkpointsAr: ["محطة حاويات العقبة", "محطة موازين القويرة", "جمرك عمّان الرئيسي"],
    photo: "/assets/services/sea.jpg",
    dayPhoto: "/assets/services/sea-day.jpg",
  },
  {
    id: "gcc-artery",
    numeral: "02",
    numeralAr: "٠٢",
    routeFrom: "AMMAN",
    routeFromAr: "عمّان",
    routeTo: "RIYADH & GCC",
    routeToAr: "الرياض والخليج",
    name: "The GCC Overland Artery",
    nameAr: "شريان التجارة البري إلى الخليج العربي",
    tagline:
      "Heavy-duty cross-border road freight connecting Jordan with Saudi Arabia, UAE, and GCC industrial cities.",
    taglineAr:
      "شحن بري عابر للحدود يربط موانئ ومستودعات الأردن بالمملكة العربية السعودية والإمارات والمدن الصناعية.",
    distance: "1,450 KM",
    distanceAr: "١,٤٥٠ كم",
    transitTime: "48–72 HOURS",
    transitTimeAr: "٤٨–٧٢ ساعة",
    schedule: "3 Departures Weekly",
    scheduleAr: "٣ رحلات أسبوعية مجدولة",
    checkpoints: ["Al-Omari Border", "Al-Haditha Port of Entry", "Riyadh Dry Port", "Dubai JAFZA"],
    checkpointsAr: ["حدود العمري", "منفذ الحديثة", "ميناء الرياض الجاف", "جبل علي دبي"],
    photo: "/assets/services/land.jpg",
    dayPhoto: "/assets/services/land-day.jpg",
  },
  {
    id: "iraq-gateway",
    numeral: "03",
    numeralAr: "٠٣",
    routeFrom: "JORDAN",
    routeFromAr: "الأردن",
    routeTo: "BAGHDAD",
    routeToAr: "بغداد والعراق",
    name: "The Northern Levant & Iraq Gateway",
    nameAr: "بوابة المشرق العربي والعراق",
    tagline:
      "Dedicated transit lane via Karameh / Trebil with seamless bonded security and expedited border processing.",
    taglineAr:
      "خط شحن وترانزيت استراتيجي عبر منفذ الكرامة / طريبيل مع حراسة جمركية موثوقة وتسريع المعاملات.",
    distance: "890 KM",
    distanceAr: "٨٩٠ كم",
    transitTime: "24–36 HOURS",
    transitTimeAr: "٢٤–٣٦ ساعة",
    schedule: "Every 48 Hours",
    scheduleAr: "رحلة كل ٤٨ ساعة",
    checkpoints: ["Zarqa Free Zone", "Karameh Border", "Trebil Customs Port", "Baghdad Depot"],
    checkpointsAr: ["المنطقة الحرة بالزرقاء", "حدود الكرامة", "منفذ طريبيل", "مستودع بغداد"],
    photo: "/assets/services/project.jpg",
    dayPhoto: "/assets/services/project-day.jpg",
  },
  {
    id: "air-express",
    numeral: "04",
    numeralAr: "٠٤",
    routeFrom: "QAIA",
    routeFromAr: "مطار علياء",
    routeTo: "GLOBAL SKY",
    routeToAr: "الوجهات العالمية",
    name: "The Global Air Bridge Corridor",
    nameAr: "جسر الشحن الجوي العالمي",
    tagline:
      "Time-critical and cold-chain air cargo dispatch via Queen Alia International Airport cargo terminal to world destinations.",
    taglineAr:
      "شحن جوي سريع ومبرد عبر مجمع الشحن بمطار الملكة علياء الدولي إلى وجهات الشحن العالمية.",
    distance: "GLOBAL",
    distanceAr: "عالمي",
    transitTime: "12–24 HOURS",
    transitTimeAr: "١٢–٢٤ ساعة",
    schedule: "Continuous Scheduled Flights",
    scheduleAr: "رحلات جوية على مدار الساعة",
    checkpoints: ["QAIA Customs Ramp", "RJ Cargo Apron", "Global Destination Hub"],
    checkpointsAr: ["جمرك المطار", "ساحة الملكية للشحن", "محطة الوصول الدولية"],
    photo: "/assets/services/air.jpg",
    dayPhoto: "/assets/services/air-day.jpg",
  },
];

export const CoverageTeaser: React.FC<CoverageTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-linked subtle progression across the 4 monumental rows on desktop
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, idx) => {
        if (!row) return;
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 42%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="network"
      ref={sectionRef}
      className="rklt-minimal-map-track relative py-28 lg:py-36 overflow-hidden transition-colors duration-700"
      aria-label={isAr ? "ممرات الترانزيت الإقليمية" : "Regional Transit Corridors"}
    >
      {/* =====================================================================
          FULL-BLEED DUOTONE CORRIDOR WASH STILLS (Cross-fades with active row)
          ===================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {CORRIDORS.map((corridor, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={corridor.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={corridor.photo}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-center [html[data-theme=day]_&]:hidden opacity-[0.16] grayscale-[35%] contrast-125"
              />
              <img
                src={corridor.dayPhoto}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-center hidden [html[data-theme=day]_&]:block opacity-[0.11] grayscale-[45%] contrast-110"
              />
            </div>
          );
        })}
        {/* Soft vignette veil so monumental typography commands 100% clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1b22] via-[#0c1b22]/75 to-[#0c1b22] [html[data-theme=day]_&]:from-[#faf7f2] [html[data-theme=day]_&]:via-[#faf7f2]/82 [html[data-theme=day]_&]:to-[#faf7f2]" />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Quiet Section Heading (Zero Eyebrows, Zero Dots) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 lg:pb-20 border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-[1.04] max-w-2xl">
            {isAr
              ? "شريان الترانزيت المباشر عبر الأردن والمشرق والخليج."
              : "Direct transit arteries across Jordan, the Levant, and the GCC."}
          </h2>
          <p className="text-base sm:text-lg text-white/60 [html[data-theme=day]_&]:text-[#2d5661] max-w-md leading-relaxed">
            {isAr
              ? "قوافل مجدولة تحت الرصاص الجمركي تربط ميناء العقبة ومطار الملكة علياء بالمراكز الصناعية الإقليمية."
              : "Scheduled bonded convoys linking Port of Aqaba and Queen Alia International Airport with regional industrial hubs."}
          </p>
        </div>

        {/* ===================================================================
            OPTION A: MONUMENTAL TYPOGRAPHIC CORRIDOR ROWS
            =================================================================== */}
        <div className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
          {CORRIDORS.map((corridor, idx) => {
            const isActive = activeIndex === idx;
            const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              isAr
                ? `مرحباً، أود الاستفسار عن الشحن عبر مسار ${corridor.nameAr}`
                : `Hello, I'd like to inquire about dispatch on ${corridor.name}`
            )}`;

            return (
              <div
                key={corridor.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className="group py-10 sm:py-12 lg:py-14 cursor-pointer transition-colors duration-500"
              >
                {/* Monumental Origin —————— Destination Split-Flap Row */}
                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 sm:gap-6 lg:gap-10">
                  {/* Numeral + Origin */}
                  <div className="flex items-baseline gap-3 sm:gap-6 lg:gap-8 shrink-0">
                    <span
                      className={`font-display font-bold text-base sm:text-xl transition-colors duration-500 ${
                        isActive
                          ? "text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]"
                          : "text-white/25 [html[data-theme=day]_&]:text-[#091a21]/25"
                      }`}
                    >
                      {isAr ? corridor.numeralAr : corridor.numeral}
                    </span>
                    <span
                      className={`font-display font-black text-3xl sm:text-5xl lg:text-7xl xl:text-[5.25rem] tracking-tighter leading-none uppercase transition-colors duration-500 ${
                        isActive
                          ? "text-white [html[data-theme=day]_&]:text-[#091a21]"
                          : "text-white/30 [html[data-theme=day]_&]:text-[#091a21]/30 group-hover:text-white/60 [html[data-theme=day]_&]:group-hover:text-[#091a21]/60"
                      }`}
                    >
                      {isAr ? corridor.routeFromAr : corridor.routeFrom}
                    </span>
                  </div>

                  {/* Expanding Brass Horizon Datum Line + Inline Distance / SLA */}
                  <div className="flex-1 flex flex-col items-start lg:items-center justify-center min-w-[120px] px-0 lg:px-2">
                    <div
                      className={`font-mono text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-500 mb-2 ${
                        isActive
                          ? "opacity-100 translate-y-0 text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      {isAr
                        ? `${corridor.distanceAr} · ${corridor.transitTimeAr}`
                        : `${corridor.distance} · ${corridor.transitTime}`}
                    </div>
                    <div className="w-full h-[1px] bg-white/15 [html[data-theme=day]_&]:bg-black/15 relative overflow-hidden">
                      <div
                        className={`h-full bg-[#e2b34a] [html[data-theme=day]_&]:bg-[#a87318] transition-all duration-700 ease-out ${
                          isActive ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="shrink-0">
                    <span
                      className={`font-display font-black text-3xl sm:text-5xl lg:text-7xl xl:text-[5.25rem] tracking-tighter leading-none uppercase transition-colors duration-500 ${
                        isActive
                          ? "text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]"
                          : "text-white/30 [html[data-theme=day]_&]:text-[#091a21]/30 group-hover:text-white/60 [html[data-theme=day]_&]:group-hover:text-[#091a21]/60"
                      }`}
                    >
                      {isAr ? corridor.routeToAr : corridor.routeTo}
                    </span>
                  </div>
                </div>

                {/* Expandable Editorial Narrative & Waypoints (Unboxed, Pure Whitespace) */}
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 pt-8 lg:pt-10"
                      : "grid-rows-[0fr] opacity-0 pt-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pl-0 sm:pl-12 lg:pl-14">
                      <div className="lg:col-span-6 space-y-2">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white [html[data-theme=day]_&]:text-[#091a21]">
                          {isAr ? corridor.nameAr : corridor.name}
                        </h3>
                        <p className="text-base text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed max-w-xl">
                          {isAr ? corridor.taglineAr : corridor.tagline}
                        </p>
                      </div>

                      <div className="lg:col-span-4 text-xs font-mono text-white/55 [html[data-theme=day]_&]:text-[#091a21]/60 space-y-1">
                        <div className="text-white/85 [html[data-theme=day]_&]:text-[#091a21] font-semibold">
                          {isAr ? corridor.scheduleAr : corridor.schedule}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {(isAr ? corridor.checkpointsAr : corridor.checkpoints).map(
                            (cp, cpIdx, arr) => (
                              <React.Fragment key={cp}>
                                <span>{cp}</span>
                                {cpIdx < arr.length - 1 && <span className="opacity-35">—</span>}
                              </React.Fragment>
                            )
                          )}
                        </div>
                      </div>

                      <div className="lg:col-span-2 flex lg:justify-end items-center gap-6">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] font-bold hover:underline"
                        >
                          <span>{isAr ? "جدولة شحنة" : "Dispatch"}</span>
                          <Icon name="arrow-right" size={13} />
                        </a>
                        <Link
                          href={`/${locale}/corridors#${corridor.id}`}
                          className="text-xs font-mono text-white/45 [html[data-theme=day]_&]:text-[#091a21]/50 hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors"
                        >
                          {isAr ? "الممر" : "Dossier"}
                        </Link>
                      </div>
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
