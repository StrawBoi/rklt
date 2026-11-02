"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";

interface AboutHeritageTimelineProps {
  locale: Locale;
}

interface HeritageMilestone {
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
  dayImage: string;
  imageTag: string;
  imageTagAr: string;
  highlights: { en: string[]; ar: string[] };
}

const HERITAGE_MILESTONES: HeritageMilestone[] = [
  {
    year: "1994",
    yearAr: "١٩٩٤",
    tag: "FOUNDATION & MARITIME",
    tagAr: "التأسيس والريادة البحرية",
    title: "Port of Aqaba Maritime Clearance Desk",
    titleAr: "تأسيس مكتب التخليص البحري بميناء العقبة",
    desc: "Established licensed customs brokerage and container clearance operations at Jordan's sole maritime gateway. Direct quayside coordination with the Jordan Customs Directorate, managing incoming containerized breakbulk and dry goods.",
    descAr: "انطلاق أعمال التخليص الجمركي وإدارة بوالص الشحن عبر ميناء العقبة البحري، بتنسيق ميداني مباشر مع دائرة الجمارك الأردنية لإدارة الحاويات والبضائع العامة.",
    metric: "License #412",
    metricAr: "ترخيص ٤١٢",
    metricLabel: "Statutory Brokerage Charter",
    metricLabelAr: "الاعتماد الجمركي الرسمي",
    image: "/world/about/night/poster.jpg",
    dayImage: "/assets/hero/corridor/charter-day.jpg",
    imageTag: "PORT OF AQABA QUAYSIDE · ARCHIVAL 1994",
    imageTagAr: "أرصفة ميناء العقبة · سجل تاريخي ١٩٩٤",
    highlights: {
      en: [
        "First dedicated operational office on Aqaba Port quayside",
        "Direct liaison with Jordan Customs Directorate",
        "Manual manifest registration before early digital systems",
      ],
      ar: [
        "المكتب الميداني الأول على رصيف ميناء العقبة",
        "تنسيق مباشر مع كوادر الجمارك والموانئ",
        "إدارة وتدقيق بوالص الشحن البحري للخطوط الملاحية",
      ],
    },
  },
  {
    year: "2003",
    yearAr: "٢٠٠٣",
    tag: "OVERLAND EXPANSION",
    tagAr: "التوسع البري الإقليمي",
    title: "GCC Cross-Border Overland Corridors",
    titleAr: "تدشين شرايين النقل البري لدول الخليج",
    desc: "Expanded into heavy cross-border haulage connecting Aqaba and Amman to Saudi Arabia, UAE, and Levant industrial zones. Established scheduled daily convoys via Al-Omari and Al-Haditha border posts with TIR Carnet guarantees.",
    descAr: "التوسع في أسطول النقل البري الثقيل لربط موانئ الأردن بالمملكة العربية السعودية ودول الخليج العربي، وتسيير قوافل منتظمة يومياً عبر منفذ العمري/الحديثة وفق نظام TIR.",
    metric: "14+ Corridors",
    metricAr: "١٤+ مساراً",
    metricLabel: "Overland Transit Routes",
    metricLabelAr: "شرايين نقل برية معتمدة",
    image: "/assets/services/land.jpg",
    dayImage: "/assets/services/land-day.jpg",
    imageTag: "OVERLAND FLEET · AMMAN & AQABA 2003",
    imageTagAr: "أسطول النقل البري · عمّان والعقبة ٢٠٠٣",
    highlights: {
      en: [
        "Standardized TIR Carnet transit operations for cross-border haulage",
        "Permanent clearing stations at Al-Omari and Al-Haditha",
        "Heavy industrial machinery transport contracts for regional mega-projects",
      ],
      ar: [
        "اعتماد دفاتر النقل البري الدولي (TIR) لتسهيل العبور",
        "تأسيس مكاتب تخليص دائمة بمنفذ العمري ومنفذ الحديثة",
        "عقود نقل المعدات الثقيلة للمشاريع الصناعية الكبرى",
      ],
    },
  },
  {
    year: "2018",
    yearAr: "٢٠١٨",
    tag: "AIR INTEGRATION",
    tagAr: "التكامل الجوي السريع",
    title: "Queen Alia Air Cargo Village Station",
    titleAr: "افتتاح محطة الشحن بمطار الملكة علياء الدولي",
    desc: "Integrated scheduled air cargo handling and charter logistics via Queen Alia International Airport (AMM) with immediate border clearance upon flight touchdown, serving pharmaceuticals, urgent electronics, and express consignments.",
    descAr: "دمج خدمات الشحن الجوي والرحلات المجدولة والعارضة عبر قرية الشحن بمطار الملكة علياء الدولي بعمّان، مع تقديم خدمة التخليص المسبق فور هبوط الطائرة للبضائع الطبية والمستعجلة.",
    metric: "4–8 Hours",
    metricAr: "٤–٨ ساعات",
    metricLabel: "Touchdown-to-Release SLA",
    metricLabelAr: "زمن الإفراج فور الهبوط",
    image: "/assets/services/air.jpg",
    dayImage: "/assets/services/air-day.jpg",
    imageTag: "AIR CARGO FREIGHT · QAIA 2018",
    imageTagAr: "محطة الشحن الجوي · مطار الملكة علياء ٢٠١٨",
    highlights: {
      en: [
        "Pre-clearance ASYCUDA processing while cargo is mid-air",
        "Temperature-controlled airside tarmac transfer protocols",
        "Specialized vaults for high-value and vulnerable air cargo",
      ],
      ar: [
        "المعالجة الجمركية المسبقة بأسيكودا والشحنة في الجو",
        "بروتوكولات النقل المبرد المباشر من ساحة الطيران",
        "خزائن فائقة الأمان للبضائع الحساسة وعالية القيمة",
      ],
    },
  },
  {
    year: "2026",
    yearAr: "٢٠٢٦",
    tag: "MODERN CUSTODY",
    tagAr: "الريادة الرقمية وسلاسل التبريد",
    title: "Bonded Digital Custody & Active Reefer Fleet",
    titleAr: "منظومة الحفظ الجمركي المعلق والأسطول المبرد",
    desc: "Turnkey multimodal logistics: certified pharmaceutical cold chains (-25°C to +15°C), real-time IoT GPS telemetry, cryptographic lead seal verification, and bonded quayside storage under unified institutional custody.",
    descAr: "منظومة لوجستية متكاملة متعددة الوسائط: سلاسل تبريد دوائية معتمدة (-٢٥° إلى +١٥°)، تتبع رقمي فوري للشاحنات بتقنية IoT، ورصاص جمركي رسمي تحت مسؤولية مؤسسية موحدة.",
    metric: "100% Bonded",
    metricAr: "١٠٠٪ معتمد",
    metricLabel: "Chain of Custody Guarantee",
    metricLabelAr: "ضمان سلسلة الحفظ الجمركي",
    image: "/assets/services/reefer.jpg",
    dayImage: "/assets/services/reefer-day.jpg",
    imageTag: "ACTIVE REEFER FLEET · LEVANT 2026",
    imageTagAr: "أسطول النقل المبرد · المشرق العربي ٢٠٢٦",
    highlights: {
      en: [
        "Carrier Transicold & Thermo King active cold-chain reefers",
        "Real-time dual-sensor IoT temperature telemetry with 0.0°C excursion",
        "Direct API integration with Jordan Customs ASYCUDA and port systems",
      ],
      ar: [
        "حاويات مبردة حديثة من Carrier Transicold و Thermo King",
        "مراقبة حرارية لحظية عبر حساسات IoT لمنع أي انحراف حراري",
        "ربط رقمي مباشر بمنظومة الجمارك الأردنية (أسيكودا) وسلطة الموانئ",
      ],
    },
  },
];

export const AboutHeritageTimeline: React.FC<AboutHeritageTimelineProps> = ({
  locale,
}) => {
  const isAr = locale === "ar";
  const [activeIdx, setActiveIdx] = useState(0);

  const m = HERITAGE_MILESTONES[activeIdx];

  return (
    <section
      id="heritage"
      className="py-24 md:py-32 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#f7f3eb] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300"
    >
      <Container>
        {/* Architectural Header */}
        <div className="max-w-4xl mb-16 space-y-5">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-white [html[data-theme=day]_&]:text-[#091a21]">
            {isAr ? (
              <>
                أكثر من ثلاثة عقود من الريادة <br />
                <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  في الملاحة والنقل والتخليص الجمركي.
                </span>
              </>
            ) : (
              <>
                Over Three Decades of <br />
                <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  Maritime, Overland & Customs Mastery.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-white/65 [html[data-theme=day]_&]:text-[#2d5661] max-w-3xl">
            {isAr
              ? "من مكتب بحري أولي على أرصفة ميناء العقبة عام ١٩٩٤ إلى شبكة لوجستية إقليمية متكاملة تخدم كبرى الشركات الصناعية والدوائية والتجارية في الأردن والشرق الأوسط."
              : "From an initial quayside customs brokerage desk at the Port of Aqaba in 1994 to a turnkey multimodal logistics network serving major industrial, pharmaceutical, and commercial enterprises across the region."}
          </p>
        </div>

        {/* Architectural Era Selector Ledger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-white/12 [html[data-theme=day]_&]:border-black/12 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10">
          {HERITAGE_MILESTONES.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`p-6 text-start transition-colors duration-200 flex flex-col justify-between gap-4 ${
                  isActive
                    ? "bg-[#c89b3c]/[0.1] border-b-2 border-b-[#c89b3c]"
                    : "hover:bg-white/[0.02] [html[data-theme=day]_&]:hover:bg-black/[0.02]"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                    {isAr ? item.yearAr : item.year}
                  </span>
                  <span className="font-mono text-[10px] text-white/45 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <span className="font-display text-sm sm:text-base font-bold block text-white [html[data-theme=day]_&]:text-[#091a21]">
                    {isAr ? item.titleAr : item.title}
                  </span>
                  <span className="font-mono text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block mt-1">
                    {isAr ? item.tagAr : item.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sharp Nested Milestone Frame */}
        <div className="mt-10 rounded-[8px] p-1.5 border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02]">
          <div className="rounded-[4px] border border-white/8 [html[data-theme=day]_&]:border-black/8 bg-[#0b131a] [html[data-theme=day]_&]:bg-[#fbf9f4] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Story Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-baseline gap-4 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-4">
                  <span className="font-numeral text-4xl sm:text-5xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] leading-none">
                    {isAr ? m.yearAr : m.year}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/55 [html[data-theme=day]_&]:text-[#2d5661]">
                    {isAr ? m.tagAr : m.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-black text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight">
                  {isAr ? m.titleAr : m.title}
                </h3>

                <p className="text-base text-white/75 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                  {isAr ? m.descAr : m.desc}
                </p>

                {/* Verified Operational Milestones */}
                <div className="space-y-3 pt-4 border-t border-white/10 [html[data-theme=day]_&]:border-black/10">
                  <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-[0.16em] block">
                    {isAr
                      ? "أبرز الإنجازات والاعتمادات في هذه الحقبة"
                      : "OPERATIONAL MILESTONES & CAPABILITIES"}
                  </span>
                  <div className="space-y-2.5 text-sm text-white/80 [html[data-theme=day]_&]:text-[#091a21]">
                    {(isAr ? m.highlights.ar : m.highlights.en).map(
                      (hl, hIdx) => (
                        <div key={hIdx} className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-[#c89b3c]">—</span>
                          <span>{hl}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Archival Frame & Unboxed Metric */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative aspect-[16/11] rounded-[4px] overflow-hidden border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-black/50">
                  <Image
                    src={m.image}
                    alt={isAr ? m.titleAr : m.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105 [html[data-theme=day]_&]:hidden"
                  />
                  <Image
                    src={m.dayImage}
                    alt={isAr ? m.titleAr : m.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="hidden object-cover transition-transform duration-700 hover:scale-105 [html[data-theme=day]_&]:block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 inset-inline-start-4 inset-inline-end-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span>{isAr ? m.imageTagAr : m.imageTag}</span>
                    <span className="text-[#e2b34a] font-bold">RKLT ARCHIVE</span>
                  </div>
                </div>

                {/* Unboxed Metric Ledger */}
                <div className="border-t border-b border-white/12 [html[data-theme=day]_&]:border-black/12 py-4 flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/55 [html[data-theme=day]_&]:text-[#2d5661]">
                    {isAr ? m.metricLabelAr : m.metricLabel}
                  </span>
                  <span className="font-numeral text-3xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                    {isAr ? m.metricAr : m.metric}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
