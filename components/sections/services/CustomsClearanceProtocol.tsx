"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";

interface CustomsClearanceProtocolProps {
  locale: Locale;
}

interface ClearanceStage {
  step: string;
  code: string;
  title: { en: string; ar: string };
  timeline: { en: string; ar: string };
  desc: { en: string; ar: string };
  checkpoints: { en: string[]; ar: string[] };
  authority: { en: string; ar: string };
  photo: string;
  dayPhoto: string;
}

const CLEARANCE_STAGES: ClearanceStage[] = [
  {
    step: "01",
    code: "ASYCUDA-EDI",
    title: {
      en: "Pre-Arrival Manifest Filing & Electronic Indexing",
      ar: "الإيداع المسبق للمانيفست والربط بأسيكودا",
    },
    timeline: { en: "48h Pre-Berth", ar: "٤٨ ساعة قبل الرسو" },
    desc: {
      en: "Direct electronic integration with Jordan Customs ASYCUDA World system. Manifest data, bill of lading, and commercial invoices are pre-indexed before the vessel arrives in Aqaba.",
      ar: "ربط إلكتروني مباشر بنظام أسيكودا العالمي التابع لدائرة الجمارك الأردنية، لإيداع بيانات المانيفست وبوالص الشحن والفواتير قبل وصول الباخرة لمياه العقبة.",
    },
    checkpoints: {
      en: [
        "Automated validation of Bill of Lading (B/L) & packing lists",
        "Harmonized System (HS) tariff classification review",
        "Commercial invoice certification via local chamber of commerce",
        "Pre-determination of tariff duties and statutory fees",
      ],
      ar: [
        "التدقيق الإلكتروني لبوالص الشحن البحري وقوائم التعبئة",
        "مراجعة بنود التعريفة الجمركية وفق النظام المنسق (HS Code)",
        "تصديق الفواتير التجارية لدى الغرفة التجارية والصناعية",
        "الاحتساب التقديري المسبق للرسوم الجمركية والضرائب",
      ],
    },
    authority: {
      en: "Jordan Customs Directorate · Aqaba Customs Center",
      ar: "دائرة الجمارك الأردنية · مركز جمرك العقبة",
    },
    photo: "/assets/services/previews/customs-desk.webp",
    dayPhoto: "/assets/services/previews/customs-desk.webp",
  },
  {
    step: "02",
    code: "JFDA-JSMO",
    title: {
      en: "Statutory Lab Approvals & Regulatory Release",
      ar: "الفحوصات المخبرية وأذونات الغذاء والدواء",
    },
    timeline: { en: "4–12 Hours", ar: "٤–١٢ ساعة" },
    desc: {
      en: "Dedicated liaison officers manage physical sampling, quarantine permits, and laboratory testing with the Jordan Food & Drug Administration (JFDA) and Jordan Standards & Metrology (JSMO).",
      ar: "متابعة ميدانية حثيثة مع المؤسسة العامة للغذاء والدواء ومؤسسة المواصفات والمقاييس لسحب العينات المخبرية وإصدار الموافقات الفنية وتصاريح الإفراج الصحي.",
    },
    checkpoints: {
      en: [
        "Fast-track cold sampling for pharmaceuticals and medical supplies",
        "Phytosanitary inspection for agricultural and grain shipments",
        "Industrial standard conformity certificates (JSMO verification)",
        "Automated digital upload of lab clearance to customs manifest",
      ],
      ar: [
        "سحب عينات مبرد سريع للأدوية والمستلزمات الطبية",
        "الفحص الزراعي والحجر النباتي والبيطري للشحنات الغذائية",
        "مطابقة شهادات الجودة والمواصفات الصناعية الأردنية",
        "الرفع الرقمي الفوري لنتائج المختبرات على البيان الجمركي",
      ],
    },
    authority: {
      en: "Jordan Food & Drug Administration (JFDA) & JSMO Labs",
      ar: "المؤسسة العامة للغذاء والدواء ومؤسسة المواصفات",
    },
    photo: "/assets/services/previews/customs-permit.webp",
    dayPhoto: "/assets/services/previews/customs-permit.webp",
  },
  {
    step: "03",
    code: "CUSTOMS-SEAL",
    title: {
      en: "Bonded Inspection & Cryptographic Lead Sealing",
      ar: "المعاينة الجمركية وتثبيت الرصاص الرسمي",
    },
    timeline: { en: "2–4 Hours", ar: "٢–٤ ساعات" },
    desc: {
      en: "Physical yard inspection or drive-through non-intrusive container X-ray scanning. Verified customs lead seals are affixed for bonded highway custody to Amman dry ports.",
      ar: "المعاينة الفعلية في ساحات الحاويات أو عبر أجهزة المسح الإشعاعي السريع (X-Ray)، وتثبيت الرصاص الجمركي المعتمد لمسار النقل المعلق إلى مستودعات العاصمة.",
    },
    checkpoints: {
      en: [
        "Non-intrusive high-energy X-ray container inspection",
        "Physical tally comparison against indexed invoice manifest",
        "Serial lead seal registration on the official customs convoy sheet",
        "Bonded transit escort authorization issuance",
      ],
      ar: [
        "المسح الإشعاعي عالي الدقة دون تفريغ الحاوية",
        "المطابقة الميدانية لمحتويات الحاوية مع الفاتورة المعتمدة",
        "تسجيل أرقام الرصاص الجمركي على كشف القافلة الرسمي",
        "إصدار أمر النقل الجمركي المعلق (Bonded Transit Permit)",
      ],
    },
    authority: {
      en: "Aqaba Container Terminal (ACT) Customs Yard",
      ar: "ساحة المعاينة بمحطة حاويات ميناء العقبة",
    },
    photo: "/assets/services/Customs 619.jpg",
    dayPhoto: "/assets/services/customs-day.jpg",
  },
  {
    step: "04",
    code: "GATE-OUT",
    title: {
      en: "Duty Settlement & Inland Green-Lane Release",
      ar: "تسوية الرسوم وخروج الشحنة للمستودعات",
    },
    timeline: { en: "Immediate Release", ar: "إفراج فوري" },
    desc: {
      en: "Electronic duty payment settlement through the central banking gateway. Gate-out release issued for immediate delivery to the consignee’s distribution warehouse or industrial plant.",
      ar: "تسديد الرسوم الجمركية والضرائب إلكترونياً عبر الربط البنكي الموحد، وإصدار أمر الخروج الفوري للشاحنات باتجاه مستودعات ومصانع العميل.",
    },
    checkpoints: {
      en: [
        "Direct electronic tax and duty payment reconciliation",
        "Official Customs Release Note (Green Lane Exit Stamp)",
        "Terminal gate pass issuance and driver dispatch sheet",
        "Digital archiving of full clearance binder for audit records",
      ],
      ar: [
        "تسوية الرسوم والضرائب عبر نظام الدفع الجمركي الإلكتروني",
        "إصدار إذن التسليم وخروج الشاحنة عبر المسار الأخضر",
        "تصريح الخروج من بوابة الميناء مع كشف السائق",
        "أرشفة رقمية متكاملة لملف التخليص لغايات التدقيق المحاسبي",
      ],
    },
    authority: {
      en: "RKLT Customs Brokerage Unit · License #412",
      ar: "فريق التخليص الجمركي لشركة ربوع الخير · رخصة ٤١٢",
    },
    photo: "/assets/services/previews/customs-agency.webp",
    dayPhoto: "/assets/services/previews/customs-agency.webp",
  },
];

export const CustomsClearanceProtocol: React.FC<
  CustomsClearanceProtocolProps
> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const stage = CLEARANCE_STAGES[activeStageIdx];

  const getCustomsInquiryUrl = () =>
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      isAr
        ? "مرحباً ربوع الخير، أرغب في استشارة وتوكيل التخليص الجمركي لشحنة جديدة (رخصة ٤١٢)."
        : "Hello RKLT team, I would like to consult on customs clearance and ASYCUDA indexing for an upcoming shipment."
    )}`;

  return (
    <section
      id="customs-protocol"
      className="py-24 md:py-32 bg-[#0c141c] [html[data-theme=day]_&]:bg-[#ebe3d3] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300"
    >
      <Container>
        {/* Architectural Header */}
        <div className="max-w-4xl mb-16 space-y-5">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-white [html[data-theme=day]_&]:text-[#091a21]">
            {isAr ? (
              <>
                منظومة التخليص الجمركي المعتمدة <br />
                <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  لدى دائرة الجمارك الأردنية (رخصة ٤١٢).
                </span>
              </>
            ) : (
              <>
                Statutory Customs Protocol <br />
                <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  Jordan Customs Directorate License #412.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-white/65 [html[data-theme=day]_&]:text-[#2d5661] max-w-3xl">
            {isAr
              ? "إجراءات تخليص نظامية مسبقة تضمن خروج البضائع خلال ٢٤ إلى ٤٨ ساعة، مع تقليص غرامات التأخير وأرضيات الموانئ عبر كوادرنا المرخصة والمقيمة ميدانياً في ميناء العقبة والمنافذ الحدودية."
              : "End-to-end statutory brokerage and ASYCUDA World electronic processing. We eliminate port demurrage and expedite sanitary release through permanent licensed brokerage desks at Aqaba and all borders."}
          </p>
        </div>

        {/* 4-Stage Architectural Ledger Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/12 [html[data-theme=day]_&]:border-black/12 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10">
          {CLEARANCE_STAGES.map((item, idx) => {
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStageIdx(idx)}
                className={`p-6 text-start transition-colors duration-200 flex flex-col justify-between gap-4 ${
                  isActive
                    ? "bg-[#c89b3c]/[0.1] border-b-2 border-b-[#c89b3c]"
                    : "hover:bg-white/[0.02] [html[data-theme=day]_&]:hover:bg-black/[0.02]"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                    {item.step}
                  </span>
                  <span className="font-mono text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider">
                    {isAr ? item.timeline.ar : item.timeline.en}
                  </span>
                </div>
                <div>
                  <span className="font-display text-base font-bold block text-white [html[data-theme=day]_&]:text-[#091a21]">
                    {isAr ? item.title.ar : item.title.en}
                  </span>
                  <span className="font-mono text-[11px] text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block mt-1.5 tracking-wider">
                    {item.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sharp Nested Stage Breakdown */}
        <div className="mt-10 rounded-[8px] p-1.5 border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02]">
          <div className="rounded-[4px] border border-white/8 [html[data-theme=day]_&]:border-black/8 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#fbf9f4] p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-widest">
                    {stage.step} / {stage.code}
                  </span>
                  <span className="font-mono text-xs text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                    — {isAr ? stage.authority.ar : stage.authority.en}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight">
                  {isAr ? stage.title.ar : stage.title.en}
                </h3>
              </div>

              <div className="text-end">
                <span className="text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block font-mono uppercase tracking-wider">
                  {isAr ? "الجدول الزمني المعتاد" : "Standard Clearance Window"}
                </span>
                <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  {isAr ? stage.timeline.ar : stage.timeline.en}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-base sm:text-lg text-white/75 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                  {isAr ? stage.desc.ar : stage.desc.en}
                </p>

                {/* Unboxed Hairline Verification Checkpoints */}
                <div className="space-y-4 pt-2">
                  <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-[0.16em] block">
                    {isAr
                      ? "نقاط التحقق والامتثال الإجرائي في هذه المرحلة"
                      : "MANDATORY STATUTORY CHECKPOINTS & VERIFICATIONS"}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10">
                    {(isAr ? stage.checkpoints.ar : stage.checkpoints.en).map(
                      (cp, cpIdx) => (
                        <div
                          key={cpIdx}
                          className="py-4 sm:px-4 first:sm:ps-0 last:sm:pe-0 flex items-baseline gap-3"
                        >
                          <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                            0{cpIdx + 1}
                          </span>
                          <span className="text-sm text-white/85 [html[data-theme=day]_&]:text-[#091a21] font-medium leading-relaxed">
                            {cp}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Clearance Stage Photograph */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] rounded-[4px] overflow-hidden border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-black/50">
                  <Image
                    src={stage.photo}
                    alt={isAr ? stage.title.ar : stage.title.en}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105 [html[data-theme=day]_&]:hidden"
                  />
                  <Image
                    src={stage.dayPhoto}
                    alt={isAr ? stage.title.ar : stage.title.en}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="hidden object-cover transition-transform duration-700 hover:scale-105 [html[data-theme=day]_&]:block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 inset-inline-start-4 inset-inline-end-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span>{stage.code}</span>
                    <span className="text-[#e2b34a] font-bold">LICENSE #412</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 [html[data-theme=day]_&]:border-black/10">
              <span className="text-xs text-white/55 [html[data-theme=day]_&]:text-[#2d5661] font-mono">
                {isAr
                  ? "ترخيص جمركي رقم ٤١٢ ساري ومعتمد لدى دائرة الجمارك الأردنية."
                  : "Licensed customs brokerage entity verified by Jordan Customs Directorate."}
              </span>

              <a
                href={getCustomsInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#c89b3c] text-[#050a0e] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#d8ab4c] transition-colors"
              >
                <Icon name="whatsapp" size={16} />
                <span>
                  {isAr ? "توكيل التخليص الجمركي لشحنتك" : "Engage Customs Brokerage Desk"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
