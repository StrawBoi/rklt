"use client";

import React, { useState } from "react";
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
      className="py-20 md:py-28 border-b border-role-line transition-colors duration-300"
      style={{ backgroundColor: "var(--role-dock)" }}
    >
      <Container>
        {/* Section Proclamation */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {isAr
                ? "بروتوكول التخليص الجمركي النظامي · رخصة ٤١٢"
                : "STATUTORY CUSTOMS BROKERAGE · LICENSE #412"}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight rklt-bento-heading">
            {isAr ? (
              <>
                منظومة التخليص الجمركي المعتمدة <br />
                <span className="text-[#e2b34a]">لدى دائرة الجمارك الأردنية.</span>
              </>
            ) : (
              <>
                Statutory Customs Protocol <br />
                <span className="text-[#e2b34a]">Jordan Customs Directorate License #412.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed rklt-bento-lead max-w-3xl">
            {isAr
              ? "إجراءات تخليص نظامية مسبقة تضمن خروج البضائع خلال ٢٤ إلى ٤٨ ساعة، مع تقليص غرامات التأخير وأرضيات الموانئ عبر كوادرنا المرخصة والمقيمة ميدانياً في ميناء العقبة والمنافذ الحدودية."
              : "End-to-end statutory brokerage and ASYCUDA World electronic processing. We eliminate port demurrage and expedite sanitary release through permanent licensed brokerage desks at Aqaba and all borders."}
          </p>
        </div>

        {/* 4-Step Interactive Progression Ladder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CLEARANCE_STAGES.map((item, idx) => {
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStageIdx(idx)}
                className={`p-4 rounded-xl border text-start transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isActive
                    ? "bg-[#e2b34a]/10 border-[#e2b34a] shadow-lg"
                    : "border-role-line hover:border-role-action bg-role-field"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-black/20 text-[#e2b34a]">
                    STAGE {item.step}
                  </span>
                  <span className="font-mono text-[11px] text-role-muted">
                    {isAr ? item.timeline.ar : item.timeline.en}
                  </span>
                </div>
                <div>
                  <span className="font-display text-sm font-bold block text-role-text">
                    {isAr ? item.title.ar : item.title.en}
                  </span>
                  <span className="font-mono text-[11px] text-[#e2b34a] block mt-1">
                    {item.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="mt-8 rounded-2xl border border-role-line bg-role-field p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-role-line pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#e2b34a]/15 text-[#e2b34a] border border-[#e2b34a]/30">
                  {stage.code}
                </span>
                <span className="font-mono text-xs text-role-muted">
                  {isAr ? stage.authority.ar : stage.authority.en}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-role-text">
                {isAr ? stage.title.ar : stage.title.en}
              </h3>
            </div>

            <div className="text-end">
              <span className="text-xs text-role-muted block font-mono">
                {isAr ? "الجدول الزمني المعتاد" : "Standard SLA"}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-[#e2b34a]">
                {isAr ? stage.timeline.ar : stage.timeline.en}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-role-text leading-relaxed">
            {isAr ? stage.desc.ar : stage.desc.en}
          </p>

          {/* Verification Checkpoints */}
          <div className="p-6 rounded-xl border border-role-line bg-role-dock space-y-4">
            <span className="font-mono text-xs font-bold text-[#e2b34a] uppercase tracking-wider block flex items-center gap-2">
              <Icon name="file-check" size={14} />
              <span>
                {isAr
                  ? "نقاط التحقق والامتثال الإجرائي في هذه المرحلة:"
                  : "MANDATORY STATUTORY CHECKPOINTS & VERIFICATIONS:"}
              </span>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-role-muted">
              {(isAr ? stage.checkpoints.ar : stage.checkpoints.en).map(
                (cp, cpIdx) => (
                  <div
                    key={cpIdx}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-role-line bg-role-field"
                  >
                    <span className="text-[#e2b34a] font-black mt-0.5">✓</span>
                    <span className="text-role-text font-medium leading-snug">
                      {cp}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-role-line">
            <div className="flex items-center gap-2 text-xs text-role-muted font-mono">
              <Icon name="shield-check" size={16} className="text-[#e2b34a]" />
              <span>
                {isAr
                  ? "ترخيص جمركي رقم ٤١٢ ساري ومعتمد لدى دائرة الجمارك الأردنية."
                  : "Licensed customs brokerage entity verified by Jordan Customs Directorate."}
              </span>
            </div>

            <a
              href={getCustomsInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold rklt-bento-btn transition-all duration-200"
            >
              <Icon name="whatsapp" size={16} />
              <span>
                {isAr ? "توكيل التخليص الجمركي لشحنتك" : "Engage Customs Brokerage Desk"}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
