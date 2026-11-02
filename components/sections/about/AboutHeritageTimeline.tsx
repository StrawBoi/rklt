"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";

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
    image: "/assets/hero/corridor/port-night.jpg",
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
      className="py-20 md:py-28 border-b border-role-line transition-colors duration-300"
      style={{ backgroundColor: "var(--role-field)" }}
    >
      <Container>
        {/* Section Proclamation */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {isAr
                ? "السجل التاريخي والمسيرة المؤسسية ١٩٩٤–٢٠٢٦"
                : "INSTITUTIONAL HERITAGE & ARCHIVAL LEDGER 1994–2026"}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight rklt-bento-heading">
            {isAr ? (
              <>
                أكثر من ثلاثة عقود من الريادة <br />
                <span className="text-[#e2b34a]">في الملاحة والنقل والتخليص الجمركي.</span>
              </>
            ) : (
              <>
                Over Three Decades of <br />
                <span className="text-[#e2b34a]">
                  Maritime, Overland & Customs Mastery.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed rklt-bento-lead max-w-3xl">
            {isAr
              ? "من مكتب بحري أولي على أرصفة ميناء العقبة عام ١٩٩٤ إلى شبكة لوجستية إقليمية متكاملة تخدم كبرى الشركات الصناعية والدوائية والتجارية في الأردن والشرق الأوسط."
              : "From an initial quayside customs brokerage desk at the Port of Aqaba in 1994 to a turnkey multimodal logistics network serving major industrial, pharmaceutical, and commercial enterprises across the region."}
          </p>
        </div>

        {/* Milestone Selector Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {HERITAGE_MILESTONES.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`p-4 text-start rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isActive
                    ? "bg-[#e2b34a]/10 border-[#e2b34a] shadow-lg"
                    : "border-role-line hover:border-role-action bg-role-dock"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-black text-[#e2b34a]">
                    {isAr ? item.yearAr : item.year}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-[#e2b34a] animate-pulse" : "bg-role-muted/40"
                    }`}
                  />
                </div>
                <div>
                  <span className="font-display text-sm font-bold block text-role-text">
                    {isAr ? item.titleAr : item.title}
                  </span>
                  <span className="font-mono text-[11px] text-role-muted block mt-1">
                    {isAr ? item.tagAr : item.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card */}
        <div className="mt-8 rounded-2xl border border-role-line bg-role-dock p-6 sm:p-10 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Story Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black px-3 py-1 rounded bg-[#e2b34a]/15 text-[#e2b34a] border border-[#e2b34a]/30">
                  {isAr ? m.yearAr : m.year} · {isAr ? m.tagAr : m.tag}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black text-role-text">
                {isAr ? m.titleAr : m.title}
              </h3>

              <p className="text-sm sm:text-base text-role-text leading-relaxed">
                {isAr ? m.descAr : m.desc}
              </p>

              {/* Verified Operational Milestones */}
              <div className="space-y-2.5 pt-2">
                <span className="font-mono text-xs font-bold text-[#e2b34a] uppercase tracking-wider block">
                  {isAr
                    ? "أبرز الإنجازات والاعتمادات في هذه الحقبة:"
                    : "OPERATIONAL MILESTONES & CAPABILITIES:"}
                </span>
                <div className="space-y-2 text-xs sm:text-sm text-role-muted">
                  {(isAr ? m.highlights.ar : m.highlights.en).map(
                    (hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5">
                        <span className="text-[#e2b34a] font-black mt-0.5">✓</span>
                        <span className="text-role-text">{hl}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Archival Frame & Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden border border-role-line bg-black/40">
                <Image
                  src={m.image}
                  alt={isAr ? m.titleAr : m.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-inline-start-3 inset-inline-end-3 flex items-center justify-between text-[11px] font-mono text-white/80">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md">
                    {isAr ? m.imageTagAr : m.imageTag}
                  </span>
                  <span className="text-[#e2b34a] font-bold">RKLT ARCHIVE</span>
                </div>
              </div>

              {/* Metric Card */}
              <div className="p-4 rounded-xl border border-role-line bg-role-field flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-role-muted block">
                    {isAr ? m.metricLabelAr : m.metricLabel}
                  </span>
                  <span className="font-mono text-2xl font-black text-[#e2b34a]">
                    {isAr ? m.metricAr : m.metric}
                  </span>
                </div>
                <Icon name="shield-check" size={24} className="text-[#e2b34a]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
