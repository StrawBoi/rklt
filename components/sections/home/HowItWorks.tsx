"use client";

import React, { useState, useRef, useEffect } from "react";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { usePayPalScrollMotion } from "@/components/motion/usePayPalScrollMotion";

interface HowItWorksProps {
  locale: Locale;
}

const STILLS = ["route", "documents", "movement", "handover"] as const;

interface StepDetailedMeta {
  numeralEn: string;
  numeralAr: string;
  phaseEn: string;
  phaseAr: string;
  slaEn: string;
  slaAr: string;
  statutoryEn: string;
  statutoryAr: string;
  checkpointEn: string;
  checkpointAr: string;
  tagsEn: string[];
  tagsAr: string[];
}

const STEP_DETAILS: StepDetailedMeta[] = [
  {
    numeralEn: "01",
    numeralAr: "٠١",
    phaseEn: "Route & Spec Consultation",
    phaseAr: "تحليل المسار والمواصفات",
    slaEn: "< 2 Hours Evaluation",
    slaAr: "< ساعتين للتقييم",
    statutoryEn: "HS Tariff Classification & Import License Audit",
    statutoryAr: "تصنيف بنود التعرفة وتدقيق أذونات الاستيراد",
    checkpointEn: "Operations Command Desk · Amman",
    checkpointAr: "مكتب إدارة العمليات · عمّان",
    tagsEn: ["Carrier Selection", "Route Feasibility", "Spec Analysis"],
    tagsAr: ["اختيار الناقل", "دراسة المسار", "فحص المواصفات"],
  },
  {
    numeralEn: "02",
    numeralAr: "٠٢",
    phaseEn: "Documentation & Pre-Clearance",
    phaseAr: "التوثيق والتخليص المسبق",
    slaEn: "48h Prior Manifest Indexing",
    slaAr: "إيداع المانيفست قبل ٤٨ ساعة",
    statutoryEn: "Jordan Customs ASYCUDA Electronic Registration",
    statutoryAr: "التسجيل الإلكتروني بنظام أسيكودا الجمركي",
    checkpointEn: "Aqaba Port Brokerage Office (License #412)",
    checkpointAr: "مكتب التخليص بميناء العقبة (ترخيص ٤١٢)",
    tagsEn: ["Bill of Lading", "Pre-Clearance", "Exemption Audit"],
    tagsAr: ["بوالص الشحن", "التخليص المسبق", "تدقيق الإعفاءات"],
  },
  {
    numeralEn: "03",
    numeralAr: "٠٣",
    phaseEn: "Multimodal Movement",
    phaseAr: "النقل متعدد الوسائط",
    slaEn: "Continuous GPS & Thermal Sync",
    slaAr: "متابعة حرارية وجغرافية متواصلة",
    statutoryEn: "Customs Lead Seal & Bonded Transit Corridor",
    statutoryAr: "تثبيت الرصاص الجمركي والعبور المعلق",
    checkpointEn: "Desert Highway & Cross-Border Ports",
    checkpointAr: "الطريق الصحراوي والمنافذ الحدودية",
    tagsEn: ["Port Quay Handover", "Bonded Corridor", "Milestone Tracking"],
    tagsAr: ["مناولة الرصيف", "ترانزيت جمركي", "متابعة حية"],
  },
  {
    numeralEn: "04",
    numeralAr: "٠٤",
    phaseEn: "Direct Delivery & Handover",
    phaseAr: "التسليم الموثق والاستلام",
    slaEn: "Immediate Digital POD",
    slaAr: "إثبات استلام رقمي فوري",
    statutoryEn: "Formal Customs Release & Consignee Sign-Off",
    statutoryAr: "الإفراج الجمركي النهائي وبراءة الذمة",
    checkpointEn: "Consignee Warehouse Nationwide",
    checkpointAr: "مستودعات العميل في كافة المحافظات",
    tagsEn: ["Warehouse Offload", "Digital POD", "Consignee Sign-Off"],
    tagsAr: ["تفريغ المستودعات", "إثبات استلام POD", "اعتماد الحيازة"],
  },
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.howItWorks : homeContentEn.howItWorks;
  const [activeStep, setActiveStep] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left?: number; right?: number; width?: number }>({});

  usePayPalScrollMotion(rootRef, {
    headerSelector: "[data-motion='header']",
    itemsSelector: ".how-tab-btn",
    stageSelector: "[data-motion='stage']",
    lineSelector: "[data-motion='line']",
  });

  useEffect(() => {
    const activeEl = tabRefs.current[activeStep];
    if (activeEl) {
      if (isAr) {
        // RTL positioning
        const parent = activeEl.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const elRect = activeEl.getBoundingClientRect();
          const right = parentRect.right - elRect.right;
          setPillStyle({ right, width: elRect.width });
        }
      } else {
        // LTR positioning
        setPillStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
      }
    }
  }, [activeStep, isAr]);

  const activeMeta = STEP_DETAILS[activeStep] || STEP_DETAILS[0];
  const activeStepData = content.steps[activeStep] || content.steps[0];
  const activePhoto = `/assets/process/${STILLS[activeStep]}.webp`;

  return (
    <section
      ref={rootRef}
      className="precision-corridor border-t border-white/10 [html[data-theme=day]_&]:border-black/10 py-24 md:py-32"
      id="process"
      aria-label={content.title}
    >
      {/* 1. Lead-in Architectural Bridge from Services */}
      <div className="precision-bridge">
        <div className="precision-bridge__line" data-motion="line" aria-hidden="true" />
        <p className="precision-bridge__proclamation">
          {isAr
            ? "من رصيف التحميل إلى تمام الاستلام · الانضباط التشغيلي الذي يحكم كل شحنة عبر الأردن"
            : "FROM BERTH DISPATCH TO DESTINATION HANDOVER · 30 YEARS OF CONTINUOUS OPERATIONAL DISCIPLINE"}
        </p>
      </div>

      <Container size="wide">
        {/* 2. Section Header with Staggered Entrance */}
        <header
          data-motion="header"
          className="precision-corridor__head text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="precision-corridor__title font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight">
            {content.title}
          </h2>
          <p className="precision-corridor__subtitle text-sm sm:text-base text-white/60 [html[data-theme=day]_&]:text-[#2d5661] max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </header>

        {/* 3. Interactive Phase Selector Ribbon (PayPal-Style Fluid Segmented Tabs) */}
        <div className="how-ribbon-container grid grid-cols-2 md:grid-cols-4 gap-2 border border-white/10 [html[data-theme=day]_&]:border-black/10 p-2 rounded-[6px] bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02] mb-12 relative">
          {/* Fluid Sliding Active Indicator Pill */}
          {pillStyle.width ? (
            <span
              className="how-sliding-pill"
              style={{
                width: pillStyle.width,
                ...(pillStyle.left !== undefined ? { left: pillStyle.left } : {}),
                ...(pillStyle.right !== undefined ? { right: pillStyle.right } : {}),
              }}
              aria-hidden="true"
            />
          ) : null}

          {content.steps.map((step, idx) => {
            const meta = STEP_DETAILS[idx] || STEP_DETAILS[0];
            const isActive = idx === activeStep;
            const numeral = isAr ? meta.numeralAr : meta.numeralEn;
            const phaseTitle = isAr ? meta.phaseAr : meta.phaseEn;

            return (
              <button
                key={step.step}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`how-tab-btn p-4 text-start rounded-[4px] relative ${
                  isActive
                    ? "text-white [html[data-theme=day]_&]:text-[#091a21] font-bold"
                    : "text-white/60 hover:text-white [html[data-theme=day]_&]:text-[#2d5661] [html[data-theme=day]_&]:hover:text-[#091a21]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      isActive
                        ? "text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]"
                        : "text-white/40 [html[data-theme=day]_&]:text-[#2d5661]/60"
                    }`}
                  >
                    PHASE {numeral}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/10 [html[data-theme=day]_&]:bg-black/5 font-semibold text-white/80 [html[data-theme=day]_&]:text-[#091a21]">
                    {isAr ? meta.slaAr : meta.slaEn}
                  </span>
                </div>
                <p className="text-sm font-bold truncate text-white [html[data-theme=day]_&]:text-[#091a21]">
                  {phaseTitle}
                </p>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-4 h-0.5 bg-[#e2b34a] [html[data-theme=day]_&]:bg-[#b88a38] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Active Phase Architectural Showcase (Two-Column Split Stage with Fluid Transitions) */}
        <div
          data-motion="stage"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 [html[data-theme=day]_&]:border-black/10 rounded-2xl p-6 sm:p-10 bg-white/[0.02] [html[data-theme=day]_&]:bg-white shadow-2xl backdrop-blur-sm"
        >
          {/* Left Column: Visual Viewport with Keyed Crossfade Media & Watermark */}
          <div
            key={`media-${activeStep}`}
            className="how-stage-media lg:col-span-6 relative aspect-[16/11] rounded-xl overflow-hidden border border-white/15 [html[data-theme=day]_&]:border-black/10 bg-black/60 shadow-xl group"
          >
            <img
              src={activePhoto}
              alt={activeStepData.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Giant Architectural Watermark */}
            <span className="absolute top-4 inset-inline-start-6 font-display font-black text-6xl sm:text-7xl text-white/20 select-none pointer-events-none">
              {isAr ? activeMeta.numeralAr : activeMeta.numeralEn}
            </span>

            {/* Bottom In-Frame Metadata Ribbon */}
            <div className="absolute bottom-4 inset-x-6 z-10 flex items-center justify-between text-xs font-mono">
              <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[#e2b34a] border border-[#e2b34a]/30 font-bold uppercase tracking-wider">
                {isAr ? activeMeta.phaseAr : activeMeta.phaseEn}
              </span>
              <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 border border-white/10">
                {isAr ? activeMeta.slaAr : activeMeta.slaEn}
              </span>
            </div>
          </div>

          {/* Right Column: Keyed Narrative & Statutory Audit Ledger with Cascade */}
          <div
            key={`narrative-${activeStep}`}
            className="how-stage-narrative lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#e2b34a] [html[data-theme=day]_&]:bg-[#a87318] animate-pulse" />
                <span>
                  {isAr ? "بروتوكول سلسلة الحفظ الجمركي" : "CHAIN OF CUSTODY PROTOCOL"}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white [html[data-theme=day]_&]:text-[#091a21]">
                {activeStepData.title}
              </h3>
              <p className="text-white/70 [html[data-theme=day]_&]:text-[#2d5661] text-sm sm:text-base leading-relaxed">
                {activeStepData.desc}
              </p>
            </div>

            {/* Telemetry Detail Boxes */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 [html[data-theme=day]_&]:bg-black/[0.03] [html[data-theme=day]_&]:border-black/10 flex items-start gap-3 text-xs transition-all hover:border-[#e2b34a]/40 [html[data-theme=day]_&]:hover:border-[#b88a38]/40">
                <Icon name="shield-check" size={18} className="text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono uppercase font-bold text-white/50 [html[data-theme=day]_&]:text-[#2d5661]/70 block mb-0.5">
                    {isAr ? "المتطلب النظامي والترخيص:" : "STATUTORY COMPLIANCE:"}
                  </span>
                  <span className="font-semibold text-white/90 [html[data-theme=day]_&]:text-[#091a21]">
                    {isAr ? activeMeta.statutoryAr : activeMeta.statutoryEn}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 [html[data-theme=day]_&]:bg-black/[0.03] [html[data-theme=day]_&]:border-black/10 flex items-start gap-3 text-xs transition-all hover:border-[#e2b34a]/40 [html[data-theme=day]_&]:hover:border-[#b88a38]/40">
                <Icon name="map-pin" size={18} className="text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono uppercase font-bold text-white/50 [html[data-theme=day]_&]:text-[#2d5661]/70 block mb-0.5">
                    {isAr ? "نقطة التدقيق الميدانية:" : "PHYSICAL CHECKPOINT:"}
                  </span>
                  <span className="font-semibold text-white/90 [html[data-theme=day]_&]:text-[#091a21]">
                    {isAr ? activeMeta.checkpointAr : activeMeta.checkpointEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Operational Tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              {(isAr ? activeMeta.tagsAr : activeMeta.tagsEn).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] border border-white/10 text-white/80 [html[data-theme=day]_&]:bg-black/5 [html[data-theme=day]_&]:border-black/10 [html[data-theme=day]_&]:text-[#091a21] transition-transform hover:-translate-y-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Network Transit Hallmark Handover */}
        <div className="precision-hallmark mt-16" aria-hidden="true">
          <span className="precision-hallmark__line" data-motion="line" />
          <div className="precision-hallmark__badge">
            <span className="precision-hallmark__num">{isAr ? "شبكة الممرات" : "TRANSIT NETWORK"}</span>
            <span className="precision-hallmark__dot">·</span>
            <span className="precision-hallmark__label">
              {isAr ? "ربط مباشر بين ميناء العقبة والمحافظات والخليج" : "DIRECT LEVANT, GCC & IRAQ TRANSIT CORRIDORS"}
            </span>
            <span className="precision-hallmark__dot">·</span>
            <span className="precision-hallmark__num">{isAr ? "العقبة ← عمّان" : "AQABA → AMMAN"}</span>
          </div>
          <span className="precision-hallmark__line" data-motion="line" />
        </div>
      </Container>
    </section>
  );
};
