"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { useInViewOnce } from "./useInViewOnce";

interface StoryTeaserProps {
  locale: Locale;
}

interface LedgerMilestone {
  year: string;
  yearAr: string;
  tag: string;
  tagAr: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  metric: string;
  metricAr: string;
  metricLabel: string;
  metricLabelAr: string;
  image: string;
  imageTag: string;
  imageTagAr: string;
}

const MILESTONES: LedgerMilestone[] = [
  {
    year: "1994",
    yearAr: "١٩٩٤",
    tag: "FOUNDATION",
    tagAr: "التأسيس والانطلاق",
    title: "Port of Aqaba Maritime Desk",
    titleAr: "مكتب الملاحة بميناء العقبة",
    desc: "Established licensed customs brokerage and container clearance operations at Jordan's maritime gateway. Direct quayside coordination with the Jordan Customs Directorate.",
    descAr: "تأسيس أعمال التخليص الجمركي وإدارة بوالص الشحن البحري عبر الميناء البحري الرئيسي للأردن، بتنسيق ميداني مباشر مع دائرة الجمارك الأردنية.",
    metric: "1st Desk",
    metricAr: "المكتب الأول",
    metricLabel: "Aqaba Port Quayside",
    metricLabelAr: "أرصفة ميناء العقبة",
    image: "/world/about/night/poster.jpg",
    imageTag: "ARCHIVAL RECORD · PORT OF AQABA",
    imageTagAr: "سجل أرشيفي · ميناء العقبة",
  },
  {
    year: "2003",
    yearAr: "٢٠٠٣",
    tag: "OVERLAND EXPANSION",
    tagAr: "التوسع الإقليمي",
    title: "GCC Overland Transport Corridors",
    titleAr: "شريان النقل البري لدول الخليج",
    desc: "Launched heavy-haulage fleet connecting Aqaba and Amman to Saudi Arabia, UAE, and Levant hubs. Established scheduled daily convoys via Al-Omari and Al-Haditha.",
    descAr: "إطلاق أسطول مقطورات ثقيلة يربط موانئ الأردن بالمملكة العربية السعودية والإمارات والشرق الأوسط، مع تسيير قوافل يومية عبر منفذ العمري والحديثة.",
    metric: "14+ Corridors",
    metricAr: "١٤+ مساراً",
    metricLabel: "Cross-Border Transit Routes",
    metricLabelAr: "مسارات عبور إقليمية",
    image: "/assets/hero/corridor/port-night.jpg",
    imageTag: "OVERLAND HUB · AMMAN & AQABA",
    imageTagAr: "مركز النقل البري · عمّان والعقبة",
  },
  {
    year: "2018",
    yearAr: "٢٠١٨",
    tag: "AIR CARGO",
    tagAr: "التكامل الجوي",
    title: "Queen Alia Air Cargo Station",
    titleAr: "محطة الشحن بمطار الملكة علياء",
    desc: "Integrated scheduled air cargo handling and charter logistics via Queen Alia International Airport (AMM) with immediate border clearance upon flight touchdown.",
    descAr: "دمج خدمات الشحن الجوي السريع والرحلات المجدولة والعارضة عبر مطار الملكة علياء الدولي بعمّان مع تخليص جمركي فوري فور هبوط الطائرة.",
    metric: "24/7 Desk",
    metricAr: "٢٤/٧ تشغيل",
    metricLabel: "Airside AMM Operations",
    metricLabelAr: "عمليات ساحة مطار AMM",
    image: "/assets/services/air.jpg",
    imageTag: "AIR CARGO FREIGHT · QAIA",
    imageTagAr: "محطة الشحن الجوي · مطار الملكة علياء",
  },
  {
    year: "2026",
    yearAr: "٢٠٢٦",
    tag: "MODERN CUSTODY",
    tagAr: "الريادة الرقمية",
    title: "Bonded Digital Custody & Reefer Fleet",
    titleAr: "إدارة الحفظ الجمركي والأسطول المبرد",
    desc: "Turnkey multimodal logistics: certified pharmaceutical cold chains, real-time GPS telemetry, and bonded quayside storage under unified institutional custody.",
    descAr: "منظومة لوجستية متكاملة متعددة الوسائط: سلاسل تبريد دوائية معتمدة، تتبع رقمي فوري للشاحنات، وحفظ جمركي معتمد تحت مسؤولية مؤسسية موحدة.",
    metric: "100% Bonded",
    metricAr: "١٠٠٪ معتمد",
    metricLabel: "Chain of Custody Guarantee",
    metricLabelAr: "ضمان سلسلة الحفظ الجمركي",
    image: "/assets/services/reefer.jpg",
    imageTag: "ACTIVE REEFER FLEET · LEVANT",
    imageTagAr: "أسطول النقل المبرد · المشرق العربي",
  },
];

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.storyTeaser : homeContentEn.storyTeaser;
  const revealRef = useInViewOnce<HTMLDivElement>();
  const [activeIdx, setActiveIdx] = useState(0);

  const m = MILESTONES[activeIdx];

  return (
    <section id="heritage" className="relative py-24 md:py-32 bg-[#090b0e] text-white border-t border-white/10 overflow-hidden">
      {/* Decorative vertical architectural line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-white/20 to-transparent" aria-hidden="true" />

      <Container>
        <div ref={revealRef} className="rklt-reveal space-y-12">
          {/* Section Head: Clean, Architectural */}
          <div className="max-w-3xl">

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4">
              {content.title}
            </h2>

            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              {content.paragraphs[0]}
            </p>
          </div>

          {/* Interactive Milestone Ledger Scrubber */}
          <div className="border border-white/10 rounded-lg p-2 bg-white/[0.02]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {MILESTONES.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`relative p-3.5 sm:p-4 text-start rounded transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg border border-white/20"
                        : "hover:bg-white/5 text-white/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-mono text-xs uppercase tracking-wider ${isActive ? "text-amber-400 font-bold" : "text-white/40"}`}>
                        {isAr ? item.tagAr : item.tag}
                      </span>
                      <span className={`font-mono text-base sm:text-lg font-extrabold ${isActive ? "text-white" : "text-white/60"}`}>
                        {isAr ? item.yearAr : item.year}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm font-semibold truncate ${isActive ? "text-white" : "text-white/70"}`}>
                      {isAr ? item.titleAr : item.title}
                    </p>
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-4 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Details & Archival Plate Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Details & Key Metric */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-4xl sm:text-5xl font-black text-amber-400/90 tracking-tight">
                  {isAr ? m.yearAr : m.year}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {isAr ? m.titleAr : m.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {isAr ? m.descAr : m.desc}
                </p>
              </div>

              {/* Verified Institutional Metric Box */}
              <div className="flex items-center gap-4 p-4 rounded bg-white/[0.03] border border-white/10">
                <div className="p-3 rounded bg-amber-400/10 text-amber-400">
                  <Icon name="shield-check" size={24} />
                </div>
                <div>
                  <p className="font-mono text-xl sm:text-2xl font-black text-white">
                    {isAr ? m.metricAr : m.metric}
                  </p>
                  <p className="text-xs text-white/50 font-medium">
                    {isAr ? m.metricLabelAr : m.metricLabel}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  <span>{content.ctaText}</span>
                  <Icon name="arrow-right" size={16} />
                </Link>

                <span className="text-xs text-white/40 font-mono">
                  {isAr ? "ترخيص جمركي أردني رقم ٤١٢" : "Jordan Customs License #412"}
                </span>
              </div>
            </div>

            {/* Right Column: High-Res Archival Plate */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded overflow-hidden border border-white/15 bg-black shadow-2xl">
                <Image
                  key={m.image}
                  src={m.image}
                  alt={isAr ? m.titleAr : m.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-all duration-700 ease-out"
                />

                {/* In-Frame Archival Metadata Tag */}
                <div className="absolute bottom-3 inset-inline-end-3 z-10 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/90">
                  <span>{isAr ? m.imageTagAr : m.imageTag}</span>
                </div>
              </div>

              {/* Clean Executive Quote */}
              <blockquote className="border-s-2 border-amber-400/80 ps-4 py-1 text-xs sm:text-sm text-white/70 italic">
                {isAr
                  ? "«الخدمة اللوجستية الممتازة تجعل النقل سلساً، والشراكة الحقيقية تجعل الثقة دائمة.»"
                  : '"Good logistics is invisible. Good partnerships are not."'}
                <footer className="text-[11px] text-white/40 font-medium not-italic mt-1">
                  {isAr ? "قيادة ربوع الخير للخدمات اللوجستية" : "RKLT Executive Operations Desk"}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
