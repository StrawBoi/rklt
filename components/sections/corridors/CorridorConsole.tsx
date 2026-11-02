"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";

interface BorderPost {
  code: string;
  name: string;
  nameAr: string;
  territory: string;
  territoryAr: string;
  badge: { en: string; ar: string };
  role: string;
  roleAr: string;
  distanceFromAmman: string;
  distanceFromAmmanAr: string;
  avgClearanceTime: string;
  avgClearanceTimeAr: string;
  nightImg: string;
  dayImg: string;
  timeline: { en: string; ar: string; stage: string }[];
  facilities: string[];
  facilitiesAr: string[];
  requirements: string[];
  requirementsAr: string[];
  hsCodes: { code: string; labelEn: string; labelAr: string }[];
}

const BORDER_POSTS: BorderPost[] = [
  {
    code: "ACT-AQJ",
    name: "Aqaba Container Terminal (ACT)",
    nameAr: "محطة حاويات ميناء العقبة (ACT)",
    territory: "Red Sea Maritime Gateway · Jordan",
    territoryAr: "المنفذ البحري الرئيسي · العقبة، الأردن",
    badge: { en: "PRIMARY DEEP-WATER PORT", ar: "الميناء البحري الرئيسي" },
    role: "Primary container gateway connecting world ocean carriers to inland Jordan and Levant destinations. Handles over 80% of Jordan's national import/export maritime volume.",
    roleAr: "بوابة الحاويات الرئيسية الرابطة بين خطوط الملاحة العالمية ومستودعات الأردن وعموم الشرق الأوسط، وتتعامل مع أكثر من ٨٠٪ من حجم التجارة البحرية الوطنية.",
    distanceFromAmman: "335 KM",
    distanceFromAmmanAr: "٣٣٥ كم",
    avgClearanceTime: "24–48 Hours",
    avgClearanceTimeAr: "٢٤–٤٨ ساعة",
    nightImg: "/assets/services/sea.jpg",
    dayImg: "/assets/services/sea-day.jpg",
    timeline: [
      { stage: "01", en: "Vessel Berth & Quayside Gantry", ar: "رسو الباخرة ورافعات الرصيف" },
      { stage: "02", en: "In-Gate Terminal ASYCUDA Logging", ar: "التسجيل الإلكتروني بالبوابة" },
      { stage: "03", en: "JFDA & Standards Labs Sampling", ar: "مختبرات الغذاء والدواء والمواصفات" },
      { stage: "04", en: "Customs Lead Seal & Convoy Dispatch", ar: "الرصاص الجمركي وانطلاق الشاحنات" },
    ],
    facilities: [
      "Deep-water container berths with Super Post-Panamax cranes",
      "Over 1,000 active reefer container plug-in monitoring points",
      "Direct bonded highway and rail links to Amman inland dry ports",
      "Integrated JFDA and Jordan Standards on-dock inspection labs",
    ],
    facilitiesAr: [
      "أرصفة مياه عميقة مجهزة برافعات حاويات عملاقة (Super Post-Panamax)",
      "أكثر من ١,٠٠٠ نقطة وصل ومراقبة للحاويات المبردة (Reefer Plugs)",
      "ربط مباشر بالطرق السريعة ومسار الشحن المباشر إلى عمّان",
      "مختبرات فحص متكاملة لمؤسسة الغذاء والدواء والمواصفات على الرصيف",
    ],
    requirements: [
      "Original Ocean Bill of Lading (B/L) or Telex Release",
      "Certified Commercial Invoice & Chamber Certificate of Origin",
      "Detailed Packing List with HS Tariff classification",
      "Prior import license for chemical or agricultural manifests",
    ],
    requirementsAr: [
      "بوليصة الشحن البحري الأصلية (B/L) أو إذن التسليم الإلكتروني (Telex)",
      "فاتورة تجارية مصدقة وشهادة منشأ معتمدة من الغرفة التجارية",
      "بيان تعبئة تفصيلي وتصنيف دقيق لبنود التعرفة الجمركية",
      "إذن استيراد مسبق للبضائع الكيماوية والزراعية المقيدة",
    ],
    hsCodes: [
      { code: "HS 8471", labelEn: "Computing Machinery", labelAr: "الآلات والأجهزة الحاسوبية" },
      { code: "HS 3004", labelEn: "Medicaments & Pharma", labelAr: "الأدوية والمستحضرات الطبية" },
      { code: "HS 3901", labelEn: "Polyethylene Polymers", labelAr: "بوليمرات الإيثيلين والبلاستيك" },
    ],
  },
  {
    code: "OMR-HDT",
    name: "Al-Omari / Al-Haditha Border",
    nameAr: "منفذ العمري / الحديثة الحدودي",
    territory: "Jordan ↔ Saudi Arabia Overland Corridor",
    territoryAr: "منفذ العبور البري بين الأردن والمملكة العربية السعودية",
    badge: { en: "PRIMARY GCC OVERLAND ARTERY", ar: "شريان العبور البري للخليج" },
    role: "The principal commercial overland artery linking Jordan, Egypt, and the Levant to Saudi Arabia, UAE, and the GCC with 24/7 dual-sided customs clearance.",
    roleAr: "الشريان البري التجاري الأهم الرابط بين الأردن والمشرق العربي والمملكة العربية السعودية ودول الخليج، مع متابعة جمركية مزدوجة على مدار الساعة.",
    distanceFromAmman: "155 KM",
    distanceFromAmmanAr: "١٥٥ كم",
    avgClearanceTime: "12–24 Hours",
    avgClearanceTimeAr: "١٢–٢٤ ساعة",
    nightImg: "/assets/services/land.jpg",
    dayImg: "/assets/services/land-day.jpg",
    timeline: [
      { stage: "01", en: "Jordan Departure In-Gate & ASYCUDA", ar: "بوابة المغادرة الأردنية والربط الجمركي" },
      { stage: "02", en: "High-Speed Drive-Through X-Ray Scan", ar: "المسح الإشعاعي السريع للشاحنات" },
      { stage: "03", en: "Saber & ZATCA Platform Synchronization", ar: "مطابقة منصة سابر وهيئة الزكاة (ZATCA)" },
      { stage: "04", en: "Saudi Overland Highway Green-Lane", ar: "المسار السريع لشبكة الطرق السعودية" },
    ],
    facilities: [
      "Dual commercial inspection platforms with drive-through X-ray scanners",
      "Temperature-controlled staging area for pharmaceutical & perishable reefers",
      "Dedicated fast-track lanes for authorized economic operators (AEO)",
      "24/7 customs brokerage dispatch stations on both Jordanian and Saudi sides",
    ],
    facilitiesAr: [
      "منصات تفتيش تجارية مزدوجة مجهزة بأجهزة مسح إشعاعي سريعة",
      "ساحات انتظار مكيفة ومجهزة للحاويات والشاحنات المبردة",
      "مسارات سريعة مخصصة للمشغلين الاقتصاديين المعتمدين (AEO)",
      "مكاتب تخليص جمركي ومتابعة ميدانية تعمل على مدار الساعة بالجهتين",
    ],
    requirements: [
      "Saber platform Certificate of Conformity (PCoC / SCoC) for Saudi imports",
      "Zakat, Tax and Customs Authority (ZATCA) electronic declaration",
      "Transit manifest with official customs lead seals",
      "Driver visa and vehicle international road transport permits",
    ],
    requirementsAr: [
      "شهادة مطابقة منصة سابر للمنتجات المتجهة للسعودية (PCoC / SCoC)",
      "بيان جمركي إلكتروني معتمد لدى هيئة الزكاة والضريبة والجمارك (ZATCA)",
      "مانيفست عبور بري برصاص جمركي رسمي سليم",
      "تأشيرات السائقين وتصاريح النقل الدولي المعتمدة للمقطورات",
    ],
    hsCodes: [
      { code: "HS 0709", labelEn: "Fresh Produce & Vegetables", labelAr: "الخضروات والفواكه الطازجة" },
      { code: "HS 6810", labelEn: "Prefabricated Concrete", labelAr: "الخرسانة والمنتجات الإنشائية" },
      { code: "HS 3808", labelEn: "Agricultural Disinfectants", labelAr: "المطهرات والمبيدات الزراعية" },
    ],
  },
  {
    code: "KRM-TRB",
    name: "Al-Karameh / Trebil Border",
    nameAr: "منفذ الكرامة / طريبيل الحدودي",
    territory: "Jordan ↔ Iraq Strategic Highway",
    territoryAr: "المنفذ الاستراتيجي البري بين الأردن والعراق",
    badge: { en: "STRATEGIC LEVANT-IRAQ HIGHWAY", ar: "شريان التجارة الإستراتيجي للعراق" },
    role: "Strategic overland conduit for industrial components, building materials, FMCG, and humanitarian trade moving into Baghdad and central Iraqi provinces.",
    roleAr: "المنفذ البري الاستراتيجي لنقل المعدات الصناعية، المواد الإنشائية، والسلع الغذائية إلى بغداد والمحافظات العراقية مع مرافقة قوافل منتظمة.",
    distanceFromAmman: "370 KM",
    distanceFromAmmanAr: "٣٧٠ كم",
    avgClearanceTime: "24–36 Hours",
    avgClearanceTimeAr: "٢٤–٣٦ ساعة",
    nightImg: "/assets/hero/road-night.jpg",
    dayImg: "/assets/hero/road-day.jpg",
    timeline: [
      { stage: "01", en: "Axle Weighbridge & Dimension Check", ar: "قبان الموازين والقياسات المحورية" },
      { stage: "02", en: "TIR Carnet Electronic Verification", ar: "مطابقة دفتر النقل الدولي (TIR Carnet)" },
      { stage: "03", en: "COSQC Quality Pre-Clearance Audit", ar: "مطابقة الفحص النوعي العراقي (COSQC)" },
      { stage: "04", en: "Baghdad Security Convoy Dispatch", ar: "انطلاق القافلة إلى بغداد والمحافظات" },
    ],
    facilities: [
      "Heavy-lift cargo inspection and axle-load measurement weighbridges",
      "Secured commercial convoy assembly area with security escort coordination",
      "Breakbulk and container transshipment handling bays",
      "Direct communication link with Amman and Baghdad customs authorities",
    ],
    facilitiesAr: [
      "قبانات موازين هيدروليكية ومنصات فحص للمعدات الثقيلة والمشاريع",
      "ساحات تجميع آمنة لقوافل الشاحنات مع تنسيق المرافقة الأمنية",
      "أرصفة مخصصة لمناقلة البضائع غير النمطية وإعادة تفريغ الحاويات",
      "ربط وتنسيق فوري بين الدوائر الجمركية في عمّان وبغداد",
    ],
    requirements: [
      "TIR Carnet documentation for guaranteed international transit",
      "Iraqi Ministry of Trade validated commercial invoices",
      "Central Organization for Standardization and Quality Control (COSQC) pre-inspection certificate",
      "Comprehensive cross-border transit cargo insurance",
    ],
    requirementsAr: [
      "دفتر النقل البري الدولي (TIR Carnet) لضمان العبور الدولي",
      "فواتير تجارية مصدقة حسب متطلبات وزارة التجارة العراقية",
      "شهادة فحص وتفتيش مسبق معتمدة (COSQC) للبضائع الخاضعة للرقابة",
      "تأمين شامل على البضائع والشاحنات العابرة للحدود",
    ],
    hsCodes: [
      { code: "HS 7214", labelEn: "Steel Reinforcing Bars", labelAr: "حديد التسليح والقضبان المعدنية" },
      { code: "HS 2523", labelEn: "Hydraulic Cement", labelAr: "الإسمنت الهيدروليكي والمواد الإنشائية" },
      { code: "HS 1905", labelEn: "Packaged Foodstuffs", labelAr: "المواد الغذائية المصنعة والمعبأة" },
    ],
  },
  {
    code: "AMM-QAIA",
    name: "Queen Alia Air Cargo Terminal",
    nameAr: "قرية الشحن الجوي بمطار الملكة علياء",
    territory: "Air Freight Village · Amman, Jordan",
    territoryAr: "محطة الشحن الجوي الدولية · عمّان، الأردن",
    badge: { en: "EXPEDITED AIR CARGO VILLAGE", ar: "قرية الشحن الجوي السريع" },
    role: "Expedited airside gateway for high-value commercial shipments, pharmaceuticals, urgent electronics, and scheduled cargo flights worldwide.",
    roleAr: "البوابة الجوية الأسرع لنقل البضائع الثمينة، الأدوية، قطع الغيار الحساسة، والشحنات العاجلة عالمياً مع تفريغ وتخليص فوري فور الهبوط.",
    distanceFromAmman: "35 KM",
    distanceFromAmmanAr: "٣٥ كم",
    avgClearanceTime: "4–8 Hours",
    avgClearanceTimeAr: "٤–٨ ساعات",
    nightImg: "/assets/services/air.jpg",
    dayImg: "/assets/services/air-day.jpg",
    timeline: [
      { stage: "01", en: "Flight Touchdown & Cargo Unload", ar: "هبوط الرحلة وتفريغ الشحنة" },
      { stage: "02", en: "Airside Bonded Tarmac Transfer", ar: "النقل المباشر لساحة الشحن المعلقة" },
      { stage: "03", en: "Pre-Arrival Electronic Clearance", ar: "المطابقة الجمركية المسبقة بأسيكودا" },
      { stage: "04", en: "Direct Bonded Truck Delivery", ar: "التسليم الفوري للشاحنات وتوزيع المصانع" },
    ],
    facilities: [
      "Certified cold-storage rooms with calibrated zones (-20°C, 2°C–8°C, 15°C–25°C)",
      "High-security vaults for valuable and vulnerable air cargo",
      "Direct airside tarmac transfer to customs bonded delivery trucks",
      "Express pre-clearance processing before flight wheels touch down",
    ],
    facilitiesAr: [
      "غرف تبريد معتمدة بدرجات حرارة مضبوطة (-٢٠°، ٢°–٨°، ١٥°–٢٥° مئوية)",
      "خزائن فائقة الأمان للبضائع عالية القيمة والمواد الحساسة",
      "نقل فوري مباشر من ساحة الطيران (Airside) إلى شاحنات التوزيع المعلقة",
      "معالجة جمركية مسبقة تبدأ قبل هبوط الطائرة لتسليم الشحنة بساعات",
    ],
    requirements: [
      "Master & House Air Waybill (MAWB / HAWB)",
      "Original Air Consignment Note & Dangerous Goods Declaration (DGR) if applicable",
      "Pre-clearance authorization issued by RKLT brokerage desk",
      "JFDA fast-track release permit for medical and perishable goods",
    ],
    requirementsAr: [
      "بوليصة الشحن الجوي الأصلية والفرعية (MAWB / HAWB)",
      "بيان وتصريح المواد الخطرة (DGR) للشحنات المصنفة إن وجدت",
      "تفويض تخليص جمركي مسبق صادر لصالح مكتب ربوع الخير",
      "موافقة الإفراج السريع من مؤسسة الغذاء والدواء للشحنات الطبية والغذائية",
    ],
    hsCodes: [
      { code: "HS 3002", labelEn: "Vaccines & Biologicals", labelAr: "اللقاحات والأمصال البيولوجية" },
      { code: "HS 8542", labelEn: "Electronic Integrated Circuits", labelAr: "الدوائر الإلكترونية المتكاملة" },
      { code: "HS 7113", labelEn: "Valuable Articles & Precious Goods", labelAr: "المعادن الثمينة والبضائع الحساسة" },
    ],
  },
];

export const CorridorConsole: React.FC<{ locale: Locale }> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeCode, setActiveCode] = useState<string>("ACT-AQJ");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activePost =
    BORDER_POSTS.find((p) => p.code === activeCode) || BORDER_POSTS[0];

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getCorridorQuote = (postName: string) =>
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      isAr
        ? `مرحباً ربوع الخير، أرغب في الاستفسار عن تنسيق مسار الشحن والتخليص عبر: ${postName}`
        : `Hello RKLT operations desk, I would like to inquire about routing and customs clearance via: ${postName}`
    )}`;

  return (
    <div className="space-y-12">
      {/* 4-Node Architectural Switcher Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/12 [html[data-theme=day]_&]:border-black/12 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10">
        {BORDER_POSTS.map((post, idx) => {
          const isActive = post.code === activeCode;
          return (
            <button
              key={post.code}
              type="button"
              onClick={() => setActiveCode(post.code)}
              className={`p-6 text-start transition-colors duration-200 flex flex-col justify-between gap-4 ${
                isActive
                  ? "bg-[#c89b3c]/[0.1] border-b-2 border-b-[#c89b3c]"
                  : "hover:bg-white/[0.02] [html[data-theme=day]_&]:hover:bg-black/[0.02]"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  0{idx + 1}
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-white [html[data-theme=day]_&]:text-[#091a21]">
                  {post.code}
                </span>
              </div>
              <div>
                <span className="font-display text-base font-bold block text-white [html[data-theme=day]_&]:text-[#091a21]">
                  {isAr ? post.nameAr : post.name}
                </span>
                <span className="font-mono text-[11px] text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block mt-1.5 uppercase tracking-wider">
                  {isAr ? post.avgClearanceTimeAr : post.avgClearanceTime}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sharp Nested Corridor Specification Console */}
      <div className="rounded-[8px] p-1.5 border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02]">
        <div className="rounded-[4px] border border-white/8 [html[data-theme=day]_&]:border-black/8 bg-[#0b131a] [html[data-theme=day]_&]:bg-[#fbf9f4] p-6 sm:p-10 space-y-10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-widest">
                  {activePost.code}
                </span>
                <span className="font-mono text-xs text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                  — {isAr ? activePost.territoryAr : activePost.territory}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight">
                {isAr ? activePost.nameAr : activePost.name}
              </h2>
            </div>

            {/* Monumental Operational SLAs */}
            <div className="flex items-center gap-8 text-end">
              <div>
                <span className="text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block font-mono uppercase tracking-wider">
                  {isAr ? "المسافة من عمّان" : "Distance to Amman"}
                </span>
                <span className="font-numeral text-3xl sm:text-4xl font-light text-white [html[data-theme=day]_&]:text-[#091a21]">
                  {isAr ? activePost.distanceFromAmmanAr : activePost.distanceFromAmman}
                </span>
              </div>
              <div className="border-s border-white/12 [html[data-theme=day]_&]:border-black/12 ps-8">
                <span className="text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block font-mono uppercase tracking-wider">
                  {isAr ? "متوسط التخليص" : "Avg. Clearance"}
                </span>
                <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  {isAr ? activePost.avgClearanceTimeAr : activePost.avgClearanceTime}
                </span>
              </div>
            </div>
          </div>

          {/* Role Description + Custom Border Hub Photography Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-white/75 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                {isAr ? activePost.roleAr : activePost.role}
              </p>

              {/* Unboxed 4-Column Checkpoint Progression Ledger */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-[0.16em] block">
                  {isAr
                    ? "٠١ / مراحل العبور والتفتيش الإجرائية المعتمدة"
                    : "01 / MANDATORY TRANSIT CHECKPOINTS & PROGRESSION"}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10">
                  {activePost.timeline.map((stage) => (
                    <div
                      key={stage.stage}
                      className="py-4 sm:px-4 first:sm:ps-0 last:sm:pe-0 space-y-1.5"
                    >
                      <span className="font-numeral text-2xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block">
                        {stage.stage}
                      </span>
                      <span className="text-sm font-medium text-white [html[data-theme=day]_&]:text-[#091a21] block leading-snug">
                        {isAr ? stage.ar : stage.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-[4px] overflow-hidden border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-black/50">
                <Image
                  src={activePost.nightImg}
                  alt={isAr ? activePost.nameAr : activePost.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105 [html[data-theme=day]_&]:hidden"
                />
                <Image
                  src={activePost.dayImg}
                  alt={isAr ? activePost.nameAr : activePost.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="hidden object-cover transition-transform duration-700 hover:scale-105 [html[data-theme=day]_&]:block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-inline-start-4 inset-inline-end-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                  <span>{activePost.code}</span>
                  <span className="text-[#e2b34a] font-bold">
                    {isAr ? activePost.badge.ar : activePost.badge.en}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Unboxed Details: Facilities vs Statutory Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-2">
            {/* Facilities Column */}
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] font-bold">
                {isAr
                  ? "٠٢ / التجهيزات الميدانية والبنية التحتية"
                  : "02 / ON-SITE FACILITIES & CAPACITIES"}
              </p>
              <ul className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 text-sm">
                {(isAr ? activePost.facilitiesAr : activePost.facilities).map(
                  (item, idx) => (
                    <li key={idx} className="py-3.5 flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#c89b3c]">—</span>
                      <span className="text-white/80 [html[data-theme=day]_&]:text-[#091a21]">
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Requirements Column */}
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] font-bold">
                {isAr
                  ? "٠٣ / الوثائق والمتطلبات الجمركية الإلزامية"
                  : "03 / MANDATORY CUSTOMS DOCUMENTATION"}
              </p>
              <ul className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 text-sm">
                {(isAr ? activePost.requirementsAr : activePost.requirements).map(
                  (item, idx) => (
                    <li key={idx} className="py-3.5 flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#c89b3c]">0{idx + 1}</span>
                      <span className="text-white/80 [html[data-theme=day]_&]:text-[#091a21]">
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Copyable HS Tariff Ledger */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-[0.16em]">
                {isAr
                  ? "٠٤ / أبرز بنود التعريفة الجمركية الشائعة عبر هذا المنفذ"
                  : "04 / PRIMARY HS TARIFF CLASSIFICATIONS (CLICK TO COPY)"}
              </span>
              {copiedCode && (
                <span className="font-mono text-xs text-[#c89b3c]">
                  {isAr ? "تم نسخ الرمز" : `Copied ${copiedCode}`}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10">
              {activePost.hsCodes.map((hs) => (
                <button
                  key={hs.code}
                  type="button"
                  onClick={() => handleCopy(hs.code)}
                  className="flex items-center justify-between py-4 sm:px-5 first:sm:ps-0 last:sm:pe-0 hover:bg-white/[0.02] [html[data-theme=day]_&]:hover:bg-black/[0.02] transition-colors text-start"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block">
                      {hs.code}
                    </span>
                    <span className="text-xs text-white/65 [html[data-theme=day]_&]:text-[#2d5661] block mt-0.5">
                      {isAr ? hs.labelAr : hs.labelEn}
                    </span>
                  </div>
                  <Icon name="copy" size={14} className="text-white/40 [html[data-theme=day]_&]:text-black/40" />
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 [html[data-theme=day]_&]:border-black/10">
            <span className="text-xs text-white/55 [html[data-theme=day]_&]:text-[#2d5661] font-mono">
              {isAr
                ? "فريق التخليص المرخص متواجد ميدانياً بالموقع على مدار الساعة (ترخيص ٤١٢)."
                : "Licensed in-house customs brokers deployed permanently on-site (License #412)."}
            </span>

            <a
              href={getCorridorQuote(isAr ? activePost.nameAr : activePost.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#c89b3c] text-[#050a0e] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#d8ab4c] transition-colors"
            >
              <Icon name="whatsapp" size={16} />
              <span>
                {isAr
                  ? `طلب تسعيرة وتنسيق عبور عبر ${activePost.code}`
                  : `Request Routing Rate for ${activePost.code}`}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
