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

export interface NetworkNode {
  id: string;
  x: number;
  y: number;
  label: string;
  labelAr: string;
}

export interface CorridorData {
  id: string;
  code: string;
  numeral: string;
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
  protocol: string;
  protocolAr: string;
  checkpoints: string[];
  checkpointsAr: string[];
  nodeIds: string[];
  svgPath: string;
}

// Master Network Waypoints (Levant & GCC)
export const ALL_NETWORK_NODES: NetworkNode[] = [
  { id: "aqaba", x: 140, y: 390, label: "Aqaba (ACT)", labelAr: "العقبة (ACT)" },
  { id: "highway", x: 190, y: 290, label: "Desert Highway", labelAr: "الطريق الصحراوي" },
  { id: "amman", x: 240, y: 190, label: "Amman Hub", labelAr: "عمّان اللوجستية" },
  { id: "qaia", x: 220, y: 220, label: "QAIA Terminal", labelAr: "مطار الملكة علياء" },
  { id: "haditha", x: 330, y: 230, label: "Al-Omari / Haditha", labelAr: "العمري / الحديثة" },
  { id: "riyadh", x: 440, y: 310, label: "Riyadh Hub", labelAr: "الرياض" },
  { id: "dubai", x: 530, y: 360, label: "Dubai Transit", labelAr: "دبي" },
  { id: "trebil", x: 340, y: 140, label: "Karameh / Trebil", labelAr: "الكرامة / طريبيل" },
  { id: "baghdad", x: 440, y: 110, label: "Baghdad Depot", labelAr: "بغداد" },
  { id: "erbil", x: 470, y: 55, label: "Erbil Terminal", labelAr: "أربيل" },
  { id: "sky", x: 150, y: 70, label: "Global Skyways", labelAr: "الممرات الجوية" },
];

export const CORRIDORS: CorridorData[] = [
  {
    id: "maritime-aqaba",
    code: "COR-01",
    numeral: "01",
    routeFrom: "AQABA",
    routeFromAr: "العقبة",
    routeTo: "AMMAN",
    routeToAr: "عمّان",
    name: "The Maritime Gateway Corridor",
    nameAr: "بوابة البحر الأحمر وميناء العقبة",
    tagline: "Direct container haulage connecting Port of Aqaba to Amman and national dry depots with zero dwell time.",
    taglineAr: "نقل الحاويات المباشر من أرصفة ميناء العقبة إلى مستودعات عمّان والموانئ الجافة دون انتظار.",
    distance: "335 KM",
    distanceAr: "٣٣٥ كم",
    transitTime: "4–6 Hours",
    transitTimeAr: "٤–٦ ساعات",
    schedule: "Daily Scheduled Convoys",
    scheduleAr: "قوافل يومية منتظمة",
    protocol: "Bonded manifest transit under direct Jordan Customs seal",
    protocolAr: "نقل بضائع تحت الوضع المعلق برصاص جمركي مباشر",
    checkpoints: ["Aqaba Port Terminal Gate", "Al-Qweira Weigh Station", "Amman Customs Depot"],
    checkpointsAr: ["بوابة محطة حاويات العقبة", "محطة موازين القويرة", "مركز جمرك عمّان الرئيسي"],
    nodeIds: ["aqaba", "highway", "amman"],
    svgPath: "M 140 390 L 190 290 L 240 190",
  },
  {
    id: "gcc-artery",
    code: "COR-02",
    numeral: "02",
    routeFrom: "AMMAN",
    routeFromAr: "عمّان",
    routeTo: "GCC & RIYADH",
    routeToAr: "الخليج والرياض",
    name: "The GCC Overland Artery",
    nameAr: "شريان التجارة البري إلى الخليج العربي",
    tagline: "Heavy-duty cross-border road freight connecting Jordan with Saudi Arabia, UAE, and GCC industrial cities.",
    taglineAr: "شحن بري عابر للحدود يربط موانئ ومستودعات الأردن بالمملكة العربية السعودية والإمارات والمدن الصناعية.",
    distance: "1,450 KM",
    distanceAr: "١,٤٥٠ كم",
    transitTime: "48–72 Hours",
    transitTimeAr: "٤٨–٧٢ ساعة",
    schedule: "3 Departures Weekly",
    scheduleAr: "٣ رحلات أسبوعية مجدولة",
    protocol: "Saber & SASO compliant clearance via Al-Haditha border post",
    protocolAr: "مطابقة منصة سابر والمواصفات السعودية عبر منفذ الحديثة",
    checkpoints: ["Al-Omari Border Post (JO)", "Al-Haditha Port of Entry (KSA)", "Riyadh Dry Port", "Dubai JAFZA"],
    checkpointsAr: ["مركز حدود العمري (الأردن)", "منفذ الحديثة الجمركي (السعودية)", "ميناء الرياض الجاف", "جبل علي (دبي)"],
    nodeIds: ["amman", "haditha", "riyadh", "dubai"],
    svgPath: "M 240 190 L 330 230 L 440 310 L 530 360",
  },
  {
    id: "iraq-gateway",
    code: "COR-03",
    numeral: "03",
    routeFrom: "JORDAN",
    routeFromAr: "الأردن",
    routeTo: "IRAQ & BAGHDAD",
    routeToAr: "العراق وبغداد",
    name: "The Northern Levant & Iraq Gateway",
    nameAr: "بوابة المشرق العربي والعراق",
    tagline: "Dedicated transit lane via Karameh / Trebil with seamless bonded security and expedited border processing.",
    taglineAr: "خط شحن وترانزيت استراتيجي عبر منفذ الكرامة / طريبيل مع حراسة جمركية موثوقة وتسريع المعاملات.",
    distance: "890 KM",
    distanceAr: "٨٩٠ كم",
    transitTime: "24–36 Hours",
    transitTimeAr: "٢٤–٣٦ ساعة",
    schedule: "Every 48 Hours",
    scheduleAr: "رحلة كل ٤٨ ساعة",
    protocol: "Direct convoy clearance at Karameh / Trebil unified customs plaza",
    protocolAr: "تخليص قوافل موحد ومباشر في ساحة جمرك الكرامة / طريبيل",
    checkpoints: ["Zarqa Free Zone Plaza", "Karameh Border (JO)", "Trebil Customs Port (IQ)", "Baghdad Depot", "Erbil Terminal"],
    checkpointsAr: ["المنطقة الحرة بالزرقاء", "مركز حدود الكرامة (الأردن)", "منفذ طريبيل (العراق)", "مستودع بغداد", "محطة أربيل"],
    nodeIds: ["amman", "trebil", "baghdad", "erbil"],
    svgPath: "M 240 190 L 340 140 L 440 110 L 470 55",
  },
  {
    id: "air-express",
    code: "COR-04",
    numeral: "04",
    routeFrom: "QAIA (AMM)",
    routeFromAr: "مطار الملكة علياء",
    routeTo: "GLOBAL SKY",
    routeToAr: "الوجهات العالمية",
    name: "The Global Air Bridge Corridor",
    nameAr: "جسر الشحن الجوي العالمي",
    tagline: "Time-critical and cold-chain air cargo dispatch via Queen Alia International Airport cargo terminal to world destinations.",
    taglineAr: "شحن جوي سريع ومبرد عبر مجمع الشحن بمطار الملكة علياء الدولي إلى وجهات الشحن العالمية.",
    distance: "Global Skyways",
    distanceAr: "ممرات جوية عالمية",
    transitTime: "12–24 Hours",
    transitTimeAr: "١٢–٢٤ ساعة",
    schedule: "Continuous Scheduled Flights",
    scheduleAr: "رحلات جوية مجدولة على مدار الساعة",
    protocol: "IATA certified cold-chain and temperature-monitored pharmaceutical lanes",
    protocolAr: "إجراءات معتمدة من IATA لسلاسل التبريد والأدوية والمواد الحساسة",
    checkpoints: ["QAIA Cargo Customs Ramp", "Royal Jordanian Cargo Apron", "Global Destination Terminal"],
    checkpointsAr: ["رمبة شحن جمرك المطار", "ساحة الملكية الأردنية للشحن", "مطار الوصول الدولي"],
    nodeIds: ["qaia", "sky"],
    svgPath: "M 220 220 Q 185 145, 150 70",
  },
];

export const CoverageTeaser: React.FC<CoverageTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const textCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const active = CORRIDORS[activeIndex] || CORRIDORS[0];

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? `مرحباً، أود الاستفسار عن الشحن عبر مسار ${active.nameAr} (${active.code})`
      : `Hello, I'd like to inquire about dispatch on ${active.name} (${active.code})`
  )}`;

  // GSAP ScrollTrigger to pin the stage and scrub smoothly through the corridors
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          const rawIdx = Math.min(3, Math.floor(p * 4));
          setActiveIndex(rawIdx);
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  // Smooth editorial text reveal when active corridor changes
  useEffect(() => {
    textCardRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === activeIndex) {
        gsap.killTweensOf(el);
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" });
      }
    });
  }, [activeIndex]);

  // Clean stroke animation for the active line passing through the points
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.fromTo(
        pathRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  // Click milestone to jump to that phase
  const jumpToPhase = (targetIdx: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = track.offsetHeight - window.innerHeight;
    const targetProgress = (targetIdx + 0.35) / 4;
    const targetScrollY = trackTop + targetProgress * scrollDistance;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section
      id="network"
      ref={trackRef}
      className="rklt-minimal-map-track relative h-[380vh] transition-colors duration-500"
    >
      {/* =========================================================================
          PINNED STAGE (CLEAN & MINIMAL, NO BOXED BACKGROUNDS)
          ========================================================================= */}
      <div
        ref={pinnedStageRef}
        className="rklt-minimal-pinned-stage sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 sm:py-8 lg:py-10"
      >
        <Container size="wide" className="h-full flex flex-col justify-between">
          {/* Top Minimal Navigation Bar */}
          <div className="flex items-center justify-between border-b border-black/10 [html[data-theme=night]_&]:border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a] font-bold">
                {isAr ? "ممرات الترانزيت المباشرة" : "TRANSIT CORRIDORS"}
              </span>
            </div>

            {/* Minimal Corridor Links */}
            <nav className="flex items-center gap-5 sm:gap-8 font-mono text-xs">
              {CORRIDORS.map((c, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => jumpToPhase(idx)}
                    className={`transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a] font-bold border-b border-current pb-0.5"
                        : "text-[#091a21]/40 [html[data-theme=night]_&]:text-white/40 hover:text-[#091a21] [html[data-theme=night]_&]:hover:text-white"
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="hidden md:inline ml-1.5 [dir=rtl]:mr-1.5 [dir=rtl]:ml-0">
                      {isAr ? c.routeToAr : c.routeTo}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Master 2-Column Minimal Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto flex-1 py-4">
            {/* ===================================================================
                COLUMN 1: THE CLEAN MINIMAL MAP (JUST A LINE PASSING TO POINTS)
                * NO BOXED BACKGROUND, NO FRAMES, NO COMPLEX RADAR *
                =================================================================== */}
            <div className="lg:col-span-7 relative w-full flex items-center justify-center">
              <div className="w-full max-w-[560px] aspect-[4/3] relative">
                <svg
                  viewBox="0 0 600 450"
                  className="w-full h-full overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="minimalLineDay" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a87318" />
                      <stop offset="100%" stopColor="#c58e2a" />
                    </linearGradient>
                    <linearGradient id="minimalLineNight" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#e2b34a" />
                      <stop offset="100%" stopColor="#ffd978" />
                    </linearGradient>
                  </defs>

                  {/* 1. Subtle Inactive Background Dots & Secondary Routes */}
                  {CORRIDORS.map((c) => {
                    const isCurrent = c.id === active.id;
                    if (isCurrent) return null;
                    return (
                      <path
                        key={`inactive-${c.id}`}
                        d={c.svgPath}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeDasharray="3 4"
                        className="text-black/10 [html[data-theme=night]_&]:text-white/10 transition-opacity duration-300"
                      />
                    );
                  })}

                  {/* 2. THE ACTIVE LINE PASSING TO THE WAYPOINTS */}
                  <path
                    ref={pathRef}
                    key={`active-line-${active.id}`}
                    d={active.svgPath}
                    fill="none"
                    stroke="url(#minimalLineDay)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="[html[data-theme=night]_&]:stroke-[url(#minimalLineNight)]"
                  />

                  {/* 3. All Network Waypoint Points & Clean Minimal Labels */}
                  {ALL_NETWORK_NODES.map((node) => {
                    const isWayPoint = active.nodeIds.includes(node.id);

                    return (
                      <g
                        key={node.id}
                        className={`transition-all duration-400 ${
                          isWayPoint ? "opacity-100" : "opacity-25"
                        }`}
                      >
                        {/* Outer subtle halo for active point */}
                        {isWayPoint && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-[#a87318]/30 [html[data-theme=night]_&]:text-[#e2b34a]/30"
                          />
                        )}

                        {/* Core Waypoint Dot */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isWayPoint ? 4 : 2.5}
                          fill="currentColor"
                          className={
                            isWayPoint
                              ? "text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]"
                              : "text-black/40 [html[data-theme=night]_&]:text-white/40"
                          }
                        />

                        {/* Minimalist Waypoint Label */}
                        <text
                          x={node.x}
                          y={node.y - 10}
                          textAnchor="middle"
                          fill="currentColor"
                          fontSize="9.5"
                          fontFamily="monospace"
                          fontWeight={isWayPoint ? "700" : "500"}
                          className={
                            isWayPoint
                              ? "text-[#091a21] [html[data-theme=night]_&]:text-white"
                              : "text-black/30 [html[data-theme=night]_&]:text-white/30"
                          }
                        >
                          {isAr ? node.labelAr : node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* ===================================================================
                COLUMN 2: CLEAN EDITORIAL SCROLL-REVEAL TEXT
                * NO BOXED CARDS, NO CONTAINER BACKGROUNDS *
                =================================================================== */}
            <div className="lg:col-span-5 relative w-full min-h-[380px] flex items-center">
              <div className="relative w-full">
                {CORRIDORS.map((corridor, idx) => {
                  const isCurrent = activeIndex === idx;

                  return (
                    <div
                      key={corridor.id}
                      ref={(el) => {
                        textCardRefs.current[idx] = el;
                      }}
                      className={`w-full transition-all duration-300 ${
                        isCurrent
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none absolute inset-0"
                      }`}
                    >
                      {/* Step Kicker */}
                      <div className="flex items-center gap-3 font-mono text-xs text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a] font-bold uppercase tracking-widest mb-2">
                        <span>{corridor.code}</span>
                        <span className="opacity-40">/</span>
                        <span className="opacity-70">
                          {idx + 1} OF {CORRIDORS.length}
                        </span>
                      </div>

                      {/* Route Direction */}
                      <div
                        className="font-mono text-sm font-semibold tracking-wider text-[#091a21]/60 [html[data-theme=night]_&]:text-white/60 mb-2"
                        dir="ltr"
                      >
                        <span>{isAr ? corridor.routeFromAr : corridor.routeFrom}</span>
                        <span className="mx-2 text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]">
                          {isAr ? "←" : "→"}
                        </span>
                        <span>{isAr ? corridor.routeToAr : corridor.routeTo}</span>
                      </div>

                      {/* Display Title */}
                      <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#091a21] [html[data-theme=night]_&]:text-white tracking-tight leading-tight mb-4">
                        {isAr ? corridor.nameAr : corridor.name}
                      </h3>

                      {/* Editorial Paragraph */}
                      <p className="text-sm sm:text-base text-[#2d5661] [html[data-theme=night]_&]:text-white/70 leading-relaxed mb-6">
                        {isAr ? corridor.taglineAr : corridor.tagline}
                      </p>

                      {/* Clean Telemetry Specs (No Box) */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#091a21]/80 [html[data-theme=night]_&]:text-white/80 py-3 border-y border-black/10 [html[data-theme=night]_&]:border-white/10 mb-6">
                        <div>
                          <span className="opacity-40 block text-[10px] uppercase">{isAr ? "المسافة" : "Distance"}</span>
                          <span className="font-bold text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a]">
                            {isAr ? corridor.distanceAr : corridor.distance}
                          </span>
                        </div>
                        <div>
                          <span className="opacity-40 block text-[10px] uppercase">{isAr ? "زمن العبور" : "Transit SLA"}</span>
                          <span className="font-bold">{isAr ? corridor.transitTimeAr : corridor.transitTime}</span>
                        </div>
                        <div>
                          <span className="opacity-40 block text-[10px] uppercase">{isAr ? "الجدول" : "Schedule"}</span>
                          <span className="font-bold">{isAr ? corridor.scheduleAr : corridor.schedule}</span>
                        </div>
                      </div>

                      {/* Checkpoint Flow */}
                      <div className="mb-6 font-mono text-xs">
                        <span className="text-[10px] text-black/40 [html[data-theme=night]_&]:text-white/40 uppercase tracking-widest block mb-1.5">
                          {isAr ? "مسار العبور والمنافذ" : "Route Waypoints"}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#091a21]/70 [html[data-theme=night]_&]:text-white/70">
                          {(isAr ? corridor.checkpointsAr : corridor.checkpoints).map((cp, cIdx, arr) => (
                            <React.Fragment key={cIdx}>
                              <span>{cp}</span>
                              {cIdx < arr.length - 1 && (
                                <span className="opacity-30">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Clean Minimal Dispatch Link */}
                      <div className="flex items-center gap-6 pt-2">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#a87318] [html[data-theme=night]_&]:text-[#e2b34a] hover:underline"
                        >
                          <Icon name="whatsapp" size={14} />
                          <span>{isAr ? "طلب شحن عبر الممر" : "Dispatch on Corridor"}</span>
                          <span aria-hidden="true">→</span>
                        </a>

                        <Link
                          href={`/${locale}/corridors#${corridor.id}`}
                          className="text-xs font-mono text-black/50 [html[data-theme=night]_&]:text-white/50 hover:text-black [html[data-theme=night]_&]:hover:text-white transition-colors"
                        >
                          {isAr ? "تفاصيل الممر" : "Corridor Dossier"}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Minimal Bottom Progress Track */}
          <div className="w-full pt-4 border-t border-black/10 [html[data-theme=night]_&]:border-white/10 flex items-center justify-between gap-4 font-mono text-[11px] text-black/40 [html[data-theme=night]_&]:text-white/40">
            <span>{isAr ? "مرر للتنقل بين الممرات" : "Scroll to scrub corridor routes"}</span>
            <div className="flex-1 max-w-xs h-[2px] bg-black/10 [html[data-theme=night]_&]:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#a87318] [html[data-theme=night]_&]:bg-[#e2b34a] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
        </Container>
      </div>
    </section>
  );
};
