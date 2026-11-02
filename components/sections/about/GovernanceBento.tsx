"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";

interface GovernanceBentoProps {
  locale: Locale;
}

export const GovernanceBento: React.FC<GovernanceBentoProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const pillars = [
    {
      numeral: "01",
      title: {
        en: "Jordan Customs License #412",
        ar: "رخصة التخليص الجمركي المعتمدة رقم ٤١٢",
      },
      desc: {
        en: "Officially bonded and licensed by the Jordan Customs Directorate, operating dedicated customs brokerage and dispatch offices inside Aqaba Port, Amman Customs, and land border crossings.",
        ar: "مرخصون ومعتمدون رسمياً بموجب ترخيص جمركي رقم ٤١٢ لدى دائرة الجمارك الأردنية، مع مكاتب تخليص ميدانية دائمة داخل ميناء العقبة وجمرك عمّان والمنافذ الحدودية البرية.",
      },
      points: isAr
        ? ["ربط إلكتروني مباشر بمنظومة الجمارك الأردنية (أسيكودا)", "إيداع مسبق للمانيفست قبل وصول البضائع بـ ٤٨ ساعة", "معاملات الإعفاء الجمركي وقوانين تشجيع الاستثمار"]
        : ["Direct electronic integration with Jordan Customs ASYCUDA", "Pre-arrival manifest indexing 48h prior to berth", "Statutory investment exemption and tariff classification"],
      metric: { en: "License #412", ar: "ترخيص ٤١٢" },
      metricSub: { en: "Registered & Verified", ar: "ساري ومعتمد رسمياً" },
      colSpan: "lg:col-span-7",
    },
    {
      numeral: "02",
      title: {
        en: "Aqaba Container Terminal (ACT) Desks",
        ar: "التواجد الميداني بميناء العقبة (ACT)",
      },
      desc: {
        en: "Permanent physical representation at the deep-water quayside of Aqaba, synchronizing vessel discharge, container yard in-gate, and bonded highway dispatch.",
        ar: "تواجد ميداني على رصيف محطة حاويات العقبة لتنسيق عمليات التفريغ الفوري، فحص الحاويات، وربط الموانئ بأسطول النقل البري إلى عمّان والمحافظات دون تأخير.",
      },
      points: isAr
        ? ["تفريغ فوري وتنسيق حجز الخطوط الملاحية العالمية", "متابعة نقاط وصل الحاويات المبردة (Reefer Plugs)", "تقليص غرامات التأخير وأرضيات الموانئ (Demurrage)"]
        : ["Direct bookings with premier global ocean carrier alliances", "Active dockside reefer plug-in monitoring", "Proactive demurrage and port detention mitigation"],
      metric: { en: "24/7 Ops", ar: "على مدار الساعة" },
      metricSub: { en: "Quayside Coverage", ar: "تغطية ميدانية كاملة" },
      colSpan: "lg:col-span-5",
    },
    {
      numeral: "03",
      title: {
        en: "Cross-Border Levant & GCC Transit Lanes",
        ar: "شرايين العبور الإقليمي إلى الخليج والعراق",
      },
      desc: {
        en: "Seamless bonded overland transit linking Jordan to Saudi Arabia (via Al-Omari / Haditha), Iraq (via Al-Karameh / Trebil), and the GCC, backed by international road transit protocols.",
        ar: "مسارات نقل جمركي معلق وشحن بري مباشر يربط الأردن بالسعودية (عبر منفذ العمري/الحديثة) والعراق (عبر منفذ الكرامة/طريبيل) ودول الخليج العربي وفق بروتوكولات النقل الدولي.",
      },
      points: isAr
        ? ["إدارة دفاتر النقل البري الدولي (TIR Carnet)", "مطابقة منصة سابر وهيئة الزكاة والضريبة السعودية (ZATCA)", "تنسيق القوافل المرافقة أمنياً إلى بغداد والمحافظات"]
        : ["TIR Carnet management for guaranteed international transit", "Saber & ZATCA regulatory compliance for Saudi cargo", "Secured convoy coordination into Baghdad and central Iraq"],
      metric: { en: "4 Primary Hubs", ar: "٤ منافذ رئيسية" },
      metricSub: { en: "Land & Sea Corridors", ar: "شرايين برية وبحرية" },
      colSpan: "lg:col-span-5",
    },
    {
      numeral: "04",
      title: {
        en: "Statutory Lab Approvals & Cold-Chain Governance",
        ar: "الرقابة النوعية وسلامة سلاسل التبريد",
      },
      desc: {
        en: "Rigorous liaison with the Jordan Food & Drug Administration (JFDA) and Jordan Standards & Metrology (JSMO), ensuring laboratory testing, sampling, and expedited sanitary release.",
        ar: "تنسيق متكامل مع المؤسسة العامة للغذاء والدواء ومؤسسة المواصفات والمقاييس لضمان سرعة سحب العينات المخبرية وإصدار أذونات الإفراج الجمركي للبضائع الغذائية والطبية.",
      },
      points: isAr
        ? ["مسارات خضراء سريعة لفحص الأدوية والمواد الغذائية", "رقابة حرارية موثقة رقمياً للشحنات المبردة (-٢٥° إلى +١٥°)", "معاينة ميدانية وتأمين شامل على كافة الشحنات"]
        : ["Fast-track priority green lanes for medical and perishable goods", "Digital IoT temperature logs (-25°C to +15°C audit trail)", "Comprehensive all-risk cargo transit insurance coverage"],
      metric: { en: "100% Bonded", ar: "١٠٠٪ معتمد" },
      metricSub: { en: "Full Compliance", ar: "مطابقة نظامية تامة" },
      colSpan: "lg:col-span-7",
    },
  ];

  return (
    <section className="py-24 md:py-32 rklt-bento-section transition-colors duration-300">
      <Container>
        {/* Architectural Header */}
        <div className="max-w-3xl mb-16 space-y-5">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] rklt-bento-heading">
            {isAr
              ? "بنية لوجستية معتمدة قائمة على أسس تشغيلية موثقة."
              : "Institutional Logistics Built on Verified Operational Standards."}
          </h2>

          <p className="text-base sm:text-lg rklt-bento-lead leading-relaxed">
            {isAr
              ? "نعتمد في ربوع الخير على تراخيص نظامية مباشرة، تواجد ميداني دائم على أرصفة الموانئ، وبنية تحتية تضمن سرعة وسلامة عبور الشحنات عبر كافة المنافذ."
              : "Our operational foundation is anchored in direct statutory licensing, permanent quayside deployment, and verified cross-border infrastructure that eliminates logistical bottlenecks."}
          </p>
        </div>

        {/* Sharp Nested Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.numeral}
              className={`rklt-bento-card ${pillar.colSpan} flex flex-col justify-between rounded-[8px] p-1.5 transition-all duration-300`}
            >
              <div className="flex-1 flex flex-col justify-between rounded-[4px] p-6 sm:p-8 bg-black/25 [html[data-theme=day]_&]:bg-black/[0.02] border border-white/8 [html[data-theme=day]_&]:border-black/8 space-y-6">
                {/* Header */}
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] leading-none">
                      {pillar.numeral}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl rklt-bento-card-title">
                      {isAr ? pillar.title.ar : pillar.title.en}
                    </h3>
                  </div>

                  <div className="text-end shrink-0 hidden sm:block">
                    <span className="font-mono text-lg sm:text-xl font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block">
                      {isAr ? pillar.metric.ar : pillar.metric.en}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider rklt-bento-metric-label block">
                      {isAr ? pillar.metricSub.ar : pillar.metricSub.en}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base rklt-bento-desc leading-relaxed">
                  {isAr ? pillar.desc.ar : pillar.desc.en}
                </p>

                {/* Specification Lines */}
                <div className="pt-3 border-t border-white/8 [html[data-theme=day]_&]:border-black/8">
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-baseline gap-2.5 rklt-bento-feature">
                        <span className="font-mono text-xs text-[#c89b3c]">—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clean Architectural Footer */}
                <div className="pt-4 border-t rklt-bento-card-footer flex items-center justify-between text-[11px] font-mono uppercase tracking-widest">
                  <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                    {isAr ? pillar.metricSub.ar : pillar.metricSub.en}
                  </span>
                  <span className="rklt-bento-metric-label">RKLT · AQABA & AMMAN</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
