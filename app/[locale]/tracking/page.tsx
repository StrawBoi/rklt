"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";
import { CTABand } from "@/components/layout/CTABand";
import { DepthLayerController } from "@/components/motion/DepthLayerController";

interface ConsignmentRecord {
  id: string;
  trackingNo: string;
  type: string;
  typeAr: string;
  mode: "ocean" | "air" | "land" | "reefer";
  origin: string;
  originAr: string;
  destination: string;
  destinationAr: string;
  vesselOrFlight: string;
  containerOrAwb: string;
  status: "in-transit" | "customs-cleared" | "delivered";
  statusLabel: string;
  statusLabelAr: string;
  eta: string;
  etaAr: string;
  telemetry: {
    gpsCoords: string;
    speed: string;
    corridorName: { en: string; ar: string };
    customsSeal: string;
    customsLic: string;
    tempActual?: string;
    tempSetpoint?: string;
    tempStatus?: { en: string; ar: string };
  };
  milestones: {
    title: string;
    titleAr: string;
    location: string;
    locationAr: string;
    timestamp: string;
    timestampAr: string;
    completed: boolean;
    current: boolean;
  }[];
}

const DEMO_RECORDS: Record<string, ConsignmentRecord> = {
  "RKLT-AQB-2026-8841": {
    id: "1",
    trackingNo: "RKLT-AQB-2026-8841",
    type: "Reefer FCL Container · Pharmaceutical Cold-Chain",
    typeAr: "حاوية مبردة كاملة (FCL) · شحنة أدوية وسلاسل تبريد",
    mode: "reefer",
    origin: "Port of Rotterdam (NLRTM)",
    originAr: "ميناء روتردام (هولندا)",
    destination: "Amman Central Cold Depots",
    destinationAr: "مستودعات عمّان المركزية المبردة",
    vesselOrFlight: "CMA CGM ANTOINE DE SAINT EXUPERY · V.088",
    containerOrAwb: "TGHU-992014-8 (40ft High-Cube Reefer)",
    status: "in-transit",
    statusLabel: "In Bonded Cold Transit to Amman",
    statusLabelAr: "في مسار النقل المبرد المعلق إلى عمّان",
    eta: "Today · 16:30 EET",
    etaAr: "اليوم · ١٦:٣٠ بتوقيت الأردن",
    telemetry: {
      gpsCoords: "29.8142° N, 35.1205° E · Desert Highway KM 142",
      speed: "74 KM/H (Normal Highway Cruise)",
      corridorName: {
        en: "Aqaba → Desert Highway → Amman Dry Port",
        ar: "العقبة ← الطريق الصحراوي السريع ← جمرك عمّان",
      },
      customsSeal: "JO-CUSTOMS-AQB-99412-BONDED",
      customsLic: "License #412 Brokerage Unit",
      tempActual: "-21.4°C",
      tempSetpoint: "-22.0°C",
      tempStatus: { en: "OPTIMAL · ZERO EXCURSION", ar: "مثالي · بدون أي انحراف حراري" },
    },
    milestones: [
      {
        title: "Manifest Submitted & ASYCUDA Indexing",
        titleAr: "إيداع المانيفست والتسجيل الإلكتروني المسبق بأسيكودا",
        location: "Aqaba Port Operations Desk",
        locationAr: "مكتب عمليات ميناء العقبة",
        timestamp: "Yesterday, 08:30",
        timestampAr: "أمس، ٠٨:٣٠",
        completed: true,
        current: false,
      },
      {
        title: "Vessel Discharge & Quayside Terminal In-Gate",
        titleAr: "تفريغ الباخرة واستلام الحاوية برصيف الميناء",
        location: "Aqaba Container Terminal (ACT)",
        locationAr: "محطة حاويات العقبة (ACT)",
        timestamp: "Yesterday, 14:15",
        timestampAr: "أمس، ١٤:١٥",
        completed: true,
        current: false,
      },
      {
        title: "JFDA Priority Testing & Customs Seal Verification",
        titleAr: "فحص الغذاء والدواء وتثبيت الرصاص الجمركي",
        location: "Aqaba Customs Examination Yard",
        locationAr: "ساحة المعاينة الجمركية بالعقبة",
        timestamp: "Today, 06:45",
        timestampAr: "اليوم، ٠٦:٤٥",
        completed: true,
        current: false,
      },
      {
        title: "Dispatched in Bonded Cold-Chain Convoy",
        titleAr: "انطلاق القافلة المبردة بنظام الحفظ الجمركي المعلق",
        location: "Desert Highway Corridor · En Route Amman",
        locationAr: "الطريق الصحراوي السريع · في الطريق إلى عمّان",
        timestamp: "Today, 10:30",
        timestampAr: "اليوم، ١٠:٣٠",
        completed: false,
        current: true,
      },
      {
        title: "Final Warehouse Handover & Proof of Delivery",
        titleAr: "التسليم النهائي بالمستودع وتوقيع براءة الذمة",
        location: "Amman Consignee Cold Storage Hub",
        locationAr: "مستودعات العميل النهائية بعمّان",
        timestamp: "Pending Arrival",
        timestampAr: "في انتظار الوصول",
        completed: false,
        current: false,
      },
    ],
  },
  "AMM-AWB-99420": {
    id: "2",
    trackingNo: "AMM-AWB-99420",
    type: "Air Cargo Express Priority · Industrial Spare Parts",
    typeAr: "شحن جوي سريع فائق الأولوية · قطع غيار صناعية",
    mode: "air",
    origin: "Frankfurt CargoCity (FRA)",
    originAr: "مطار فرانكفورت الدولي (ألمانيا)",
    destination: "Sahab Industrial Estate, Amman",
    destinationAr: "مدينة سحاب الصناعية، عمّان",
    vesselOrFlight: "Royal Jordanian Cargo RJ-126",
    containerOrAwb: "AWB 512-8839-2041",
    status: "customs-cleared",
    statusLabel: "Airside Customs Cleared",
    statusLabelAr: "أنجز التخليص الجمركي بمطار الملكة علياء",
    eta: "Ready for Consignee Collection",
    etaAr: "جاهزة للتسليم الفوري",
    telemetry: {
      gpsCoords: "31.7226° N, 35.9932° E · QAIA Air Cargo Village",
      speed: "0 KM/H (Secured Bonded Staging)",
      corridorName: {
        en: "Airside Terminal → QAIA Bonded Logistics Vault",
        ar: "ساحة الطيران ← مستودعات الشحن المعلقة بمطار AMM",
      },
      customsSeal: "JO-CUSTOMS-AMM-44102-AIR",
      customsLic: "License #412 Brokerage Unit",
    },
    milestones: [
      {
        title: "Flight Touchdown & Airside Transfer",
        titleAr: "هبوط الطائرة والنقل المباشر لساحة الشحن",
        location: "Queen Alia International Airport (AMM)",
        locationAr: "مطار الملكة علياء الدولي (عمّان)",
        timestamp: "Today, 04:20",
        timestampAr: "اليوم، ٠٤:٢٠",
        completed: true,
        current: false,
      },
      {
        title: "Pre-Clearance Verification & Duty Settlement",
        titleAr: "مطابقة التخليص المسبق ودفع الرسوم الجمركية",
        location: "AMM Air Cargo Customs Hall",
        locationAr: "صالة جمارك الشحن الجوي بمطار AMM",
        timestamp: "Today, 06:15",
        timestampAr: "اليوم، ٠٦:١٥",
        completed: true,
        current: false,
      },
      {
        title: "Airside Gate-Out & Terminal Release",
        titleAr: "الإفراج الجمركي وخروج الشحنة من المطار",
        location: "AMM Bonded Logistics Area",
        locationAr: "منطقة الشحن الجوي المعلقة بمطار AMM",
        timestamp: "Today, 08:00",
        timestampAr: "اليوم، ٠٨:٠٠",
        completed: true,
        current: true,
      },
      {
        title: "Consignee Delivery Handover",
        titleAr: "التسليم لمندوب العميل واستلام الوثائق",
        location: "Sahab Industrial Facility",
        locationAr: "الموقع الصناعي بسحاب",
        timestamp: "Pending Gate-Out",
        timestampAr: "في انتظار الاستلام",
        completed: false,
        current: false,
      },
    ],
  },
  "MSK-410298-KSA": {
    id: "3",
    trackingNo: "MSK-410298-KSA",
    type: "Cross-Border Overland Convoy · Construction Materials",
    typeAr: "قافلة شحن بري عابرة للحدود · مواد إنشائية وصناعية",
    mode: "land",
    origin: "Aqaba Port Logistics Zone",
    originAr: "منطقة العقبة اللوجستية",
    destination: "Riyadh Industrial City 2 (KSA)",
    destinationAr: "مدينة الرياض الصناعية الثانية (السعودية)",
    vesselOrFlight: "Convoy KSA-TRK-09",
    containerOrAwb: "Trailer Fleet JY-8821 / JY-8822",
    status: "delivered",
    statusLabel: "Successfully Delivered & Offloaded",
    statusLabelAr: "تم التسليم وتفريغ الحمولة بنجاح",
    eta: "Delivered",
    etaAr: "تم التسليم",
    telemetry: {
      gpsCoords: "24.6012° N, 46.8530° E · Riyadh Industrial Depot",
      speed: "0 KM/H (Mission Completed)",
      corridorName: {
        en: "Aqaba → Al-Omari / Haditha Border → Riyadh Artery",
        ar: "العقبة ← منفذ العمري / الحديثة ← طريق الرياض",
      },
      customsSeal: "ZATCA-HADITHA-8102-VERIFIED",
      customsLic: "License #412 Overland Transit Desk",
    },
    milestones: [
      {
        title: "Convoy Loading & Transit Manifest Issuance",
        titleAr: "تحميل القافلة وإصدار مانيفست العبور",
        location: "Aqaba Central Yards",
        locationAr: "ساحات العقبة المركزية",
        timestamp: "Oct 25, 14:00",
        timestampAr: "٢٥ أكتوبر، ١٤:٠٠",
        completed: true,
        current: false,
      },
      {
        title: "Border Transit & Saber Compliance Verified",
        titleAr: "مطابقة منصة سابر والعبور عبر جمرك الحديثة",
        location: "Al-Omari / Al-Haditha Border Post",
        locationAr: "منفذ العمري / الحديثة الجمركي",
        timestamp: "Oct 26, 11:00",
        timestampAr: "٢٦ أكتوبر، ١١:٠٠",
        completed: true,
        current: false,
      },
      {
        title: "Cross-Border Highway Convoy Transit",
        titleAr: "العبور عبر طريق الرياض الدولي المباشر",
        location: "Saudi Highway Network",
        locationAr: "شبكة الطرق السريعة السعودية",
        timestamp: "Oct 27, 09:30",
        timestampAr: "٢٧ أكتوبر، ٠٩:٣٠",
        completed: true,
        current: false,
      },
      {
        title: "Consignment Handover & Sealed Unloading",
        titleAr: "التسليم النهائي وتفريغ الحاويات",
        location: "Riyadh Distribution Depot",
        locationAr: "مستودع التوزيع بالرياض",
        timestamp: "Oct 27, 18:45",
        timestampAr: "٢٧ أكتوبر، ١٨:٤٥",
        completed: true,
        current: false,
      },
    ],
  },
};

export default function TrackingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const isAr = locale === "ar";

  const [inputVal, setInputVal] = useState("RKLT-AQB-2026-8841");
  const [activeRecordKey, setActiveRecordKey] =
    useState<string>("RKLT-AQB-2026-8841");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const record = DEMO_RECORDS[activeRecordKey];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim().toUpperCase();
    if (DEMO_RECORDS[clean]) {
      setActiveRecordKey(clean);
      setErrorMsg("");
    } else {
      setErrorMsg(
        isAr
          ? "لم يتم العثور على شحنة بهذا الرقم. يرجى تجربة أحد الأرقام التجريبية أدناه أو التواصل مع مكتب العمليات."
          : "Consignment identifier not recognized. Please select one of the verified demo consignments below or contact our operations desk."
      );
    }
  };

  const selectDemo = (key: string) => {
    setInputVal(key);
    setActiveRecordKey(key);
    setErrorMsg("");
  };

  const copyTrackingNo = () => {
    if (!record) return;
    navigator.clipboard?.writeText(record.trackingNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DepthLayerController>
      {/* LAYER 1: Architectural Search Header with Custom Quayside Photography */}
      <div data-depth-stratum="1" className="rklt-depth-stratum z-[10]">
        <div data-depth-inner>
          <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#fbf9f4] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 overflow-hidden transition-colors duration-300">
            {/* Full-Bleed Custom Quayside Photography (Night & Day) */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              <Image
                src="/assets/hero/lights/night-lit.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-45 scale-[1.01] [html[data-theme=day]_&]:hidden"
              />
              <Image
                src="/assets/hero/lights/day-lit.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="hidden object-cover object-center opacity-35 scale-[1.01] [html[data-theme=day]_&]:block"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b0f]/95 via-[#070b0f]/78 to-[#070b0f]/45 [html[data-theme=day]_&]:from-[#fbf9f4]/95 [html[data-theme=day]_&]:via-[#fbf9f4]/82 [html[data-theme=day]_&]:to-[#fbf9f4]/50" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b0f]/80 via-transparent to-[#070b0f] [html[data-theme=day]_&]:from-[#fbf9f4]/75 [html[data-theme=day]_&]:via-transparent [html[data-theme=day]_&]:to-[#fbf9f4]" />
            </div>

            <Container className="relative z-10 max-w-4xl space-y-6">
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-white [html[data-theme=day]_&]:text-[#091a21]">
                {isAr ? (
                  <>
                    تتبع مسار شحنتك <br />
                    <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                      بشفافية ودقة متناهية.
                    </span>
                  </>
                ) : (
                  <>
                    Track Cargo Milestones with <br />
                    <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                      Quayside Chain of Custody.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base md:text-lg leading-relaxed max-w-2xl text-white/65 [html[data-theme=day]_&]:text-[#2d5661]">
                {isAr
                  ? "أدخل رقم بوليصة الشحن (B/L)، رقم الحاوية، أو بوليصة الشحن الجوي (AWB) لمتابعة حالة الشحنة ومراحل التخليص الجمركي خطوة بخطوة."
                  : "Enter your Bill of Lading, Container ID, or Airway Bill to view live operational checkpoints, customs pre-clearance status, and transit progress."}
              </p>

              {/* Sharp Nested Search Frame */}
              <form onSubmit={handleSearch} className="max-w-3xl pt-4">
                <div className="rounded-[8px] p-1.5 border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02] shadow-2xl">
                  <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-[4px] bg-[#0b131a] [html[data-theme=day]_&]:bg-white border border-white/8 [html[data-theme=day]_&]:border-black/8">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder={
                        isAr
                          ? "أدخل رقم البوليصة أو الحاوية..."
                          : "Enter B/L, Container ID or AWB..."
                      }
                      className="w-full bg-transparent px-4 py-3 text-sm font-mono text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/40 [html[data-theme=day]_&]:placeholder:text-black/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-[4px] bg-[#c89b3c] hover:bg-[#d8ab4c] text-[#050a0e] text-xs font-mono uppercase tracking-wider font-extrabold shrink-0 flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      <Icon name="search" size={15} />
                      <span>{isAr ? "تتبع الآن" : "Track Manifest"}</span>
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-500 font-mono mt-3 text-start">
                    {errorMsg}
                  </p>
                )}

                {/* Quick Demo Index */}
                <div className="pt-5 flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider">
                    {isAr ? "شحنات للمعاينة:" : "Sample Manifests:"}
                  </span>
                  {Object.keys(DEMO_RECORDS).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectDemo(key)}
                      className={`px-3 py-1.5 rounded-[4px] border transition-colors ${
                        activeRecordKey === key
                          ? "border-[#c89b3c] bg-[#c89b3c]/15 text-[#c89b3c] font-bold"
                          : "border-white/12 [html[data-theme=day]_&]:border-black/12 text-white/70 [html[data-theme=day]_&]:text-[#091a21] hover:border-[#c89b3c]/60"
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </form>
            </Container>
          </section>
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 2: Active Consignment Overview & Telemetry Ledger */}
      {record && (
        <div data-depth-stratum="2" className="rklt-depth-stratum rklt-depth-overlayer z-[20]">
          <div data-depth-inner>
            <section className="py-24 md:py-32 bg-[#0c141c] [html[data-theme=day]_&]:bg-[#ebe3d3] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
              <Container className="max-w-5xl">
                <div className="rounded-[8px] p-1.5 border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02] shadow-2xl">
                  <div className="rounded-[4px] border border-white/8 [html[data-theme=day]_&]:border-black/8 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#fbf9f4] p-6 sm:p-10 space-y-10">
                    {/* Header Status Row */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-6">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block mb-1.5">
                          {isAr ? "معرف الشحنة المعتمد" : "VERIFIED CONSIGNMENT IDENTIFIER"}
                        </span>
                        <div className="flex items-center gap-3">
                          <h2 className="font-mono text-2xl sm:text-4xl font-black text-white [html[data-theme=day]_&]:text-[#091a21]">
                            {record.trackingNo}
                          </h2>
                          <button
                            type="button"
                            onClick={copyTrackingNo}
                            className="p-2 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/12 text-white/60 [html[data-theme=day]_&]:text-[#2d5661] hover:text-[#c89b3c] transition-colors"
                            title="Copy Tracking ID"
                          >
                            <Icon name="copy" size={14} />
                          </button>
                          {copied && (
                            <span className="text-xs font-mono text-[#c89b3c]">
                              {isAr ? "تم النسخ" : "Copied"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/65 [html[data-theme=day]_&]:text-[#2d5661] mt-1.5">
                          {isAr ? record.typeAr : record.type}
                        </p>
                      </div>

                      <div className="text-start md:text-end space-y-1">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block">
                          {isAr ? record.statusLabelAr : record.statusLabel}
                        </span>
                        <span className="font-mono text-xs text-white/55 [html[data-theme=day]_&]:text-[#2d5661] block">
                          {isAr ? "الموعد المقدر: " : "ETA Window: "}
                          <strong className="text-white [html[data-theme=day]_&]:text-[#091a21]">
                            {isAr ? record.etaAr : record.eta}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Unboxed Route & Vessel Ledger */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10 text-xs font-mono">
                      <div className="py-4 sm:px-4 first:sm:ps-0">
                        <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block mb-1 uppercase">
                          {isAr ? "ميناء الانطلاق" : "Origin Port"}
                        </span>
                        <span className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold">
                          {isAr ? record.originAr : record.origin}
                        </span>
                      </div>
                      <div className="py-4 sm:px-4">
                        <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block mb-1 uppercase">
                          {isAr ? "الوجهة النهائية" : "Destination Hub"}
                        </span>
                        <span className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold">
                          {isAr ? record.destinationAr : record.destination}
                        </span>
                      </div>
                      <div className="py-4 sm:px-4">
                        <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block mb-1 uppercase">
                          {isAr ? "الباخرة / الرحلة" : "Vessel / Flight"}
                        </span>
                        <span className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold truncate block">
                          {record.vesselOrFlight}
                        </span>
                      </div>
                      <div className="py-4 sm:px-4 last:sm:pe-0">
                        <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block mb-1 uppercase">
                          {isAr ? "رقم الحاوية / البوليصة" : "Container / AWB"}
                        </span>
                        <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] font-bold">
                          {record.containerOrAwb}
                        </span>
                      </div>
                    </div>

                    {/* Live Telemetry & GPS Ledger */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-[0.16em]">
                          {isAr
                            ? "٠١ / بيانات الملاحة والرصد الميداني اللحظي"
                            : "01 / LIVE OPERATIONAL TELEMETRY & CUSTODY SEAL"}
                        </span>
                        <span className="font-mono text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                          {record.telemetry.customsLic}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10 divide-y sm:divide-y-0 sm:divide-x rtl:divide-x-reverse divide-white/10 [html[data-theme=day]_&]:divide-black/10 text-xs font-mono">
                        <div className="py-4 sm:px-4 first:sm:ps-0 space-y-1">
                          <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block text-[11px] uppercase">
                            {isAr ? "إحداثيات الموقع الحالي" : "Current GPS Coordinates"}
                          </span>
                          <span className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold block truncate">
                            {record.telemetry.gpsCoords}
                          </span>
                        </div>
                        <div className="py-4 sm:px-4 space-y-1">
                          <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block text-[11px] uppercase">
                            {isAr ? "حالة السرعة والحركة" : "Transit Velocity"}
                          </span>
                          <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] font-bold block">
                            {record.telemetry.speed}
                          </span>
                        </div>
                        <div className="py-4 sm:px-4 last:sm:pe-0 space-y-1">
                          <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block text-[11px] uppercase">
                            {isAr ? "الرصاص الجمركي المعتمد" : "Customs Lead Seal"}
                          </span>
                          <span className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold block truncate">
                            {record.telemetry.customsSeal}
                          </span>
                        </div>
                      </div>

                      {/* Reefer Thermal Log */}
                      {record.mode === "reefer" && record.telemetry.tempActual && (
                        <div className="border-s-2 border-[#c89b3c] ps-5 py-2 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-wider">
                              {isAr
                                ? "سجل الحرارة للحاوية المبردة (Carrier Transicold)"
                                : "ACTIVE REEFER THERMAL DATA LOG (CARRIER TRANSICOLD)"}
                            </span>
                            <span className="font-mono text-xs text-white [html[data-theme=day]_&]:text-[#091a21] font-bold">
                              {isAr
                                ? record.telemetry.tempStatus?.ar
                                : record.telemetry.tempStatus?.en}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-6 text-xs font-mono">
                            <div>
                              <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block text-[11px]">
                                {isAr ? "الحرارة الحالية" : "Current Reading"}
                              </span>
                              <span className="font-numeral text-2xl font-light text-white [html[data-theme=day]_&]:text-[#091a21]">
                                {record.telemetry.tempActual}
                              </span>
                            </div>
                            <div>
                              <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block text-[11px]">
                                {isAr ? "نقطة الضبط" : "Setpoint"}
                              </span>
                              <span className="font-numeral text-2xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                                {record.telemetry.tempSetpoint}
                              </span>
                            </div>
                            <div>
                              <span className="text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block text-[11px]">
                                {isAr ? "الانحراف الحراري" : "Excursion"}
                              </span>
                              <span className="font-numeral text-2xl font-light text-white [html[data-theme=day]_&]:text-[#091a21]">
                                0.0°C
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 5-Stage Unboxed Milestone Progression Ledger */}
                    <div className="space-y-4 pt-2">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                        {isAr
                          ? "٠٢ / سجل المحطات ونقاط التفتيش الميدانية"
                          : "02 / OPERATIONAL CHECKPOINT TIMELINE & CHAIN OF CUSTODY"}
                      </h3>

                      <div className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-t border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
                        {record.milestones.map((m, idx) => (
                          <div
                            key={m.title}
                            className={`py-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline ${
                              m.current
                                ? "bg-[#c89b3c]/[0.07] -mx-4 px-4"
                                : ""
                            }`}
                          >
                            <div className="md:col-span-2 flex items-baseline gap-3">
                              <span
                                className={`font-numeral text-2xl font-light ${
                                  m.completed || m.current
                                    ? "text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]"
                                    : "text-white/30 [html[data-theme=day]_&]:text-black/30"
                                }`}
                              >
                                0{idx + 1}
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                                {m.completed
                                  ? isAr
                                    ? "مكتمل"
                                    : "VERIFIED"
                                  : m.current
                                  ? isAr
                                    ? "جاري التنفيذ"
                                    : "ACTIVE"
                                  : isAr
                                  ? "قادم"
                                  : "PENDING"}
                              </span>
                            </div>

                            <div className="md:col-span-6">
                              <h4
                                className={`font-display text-base font-bold ${
                                  m.current
                                    ? "text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]"
                                    : "text-white [html[data-theme=day]_&]:text-[#091a21]"
                                }`}
                              >
                                {isAr ? m.titleAr : m.title}
                              </h4>
                              <p className="text-xs text-white/60 [html[data-theme=day]_&]:text-[#2d5661] mt-0.5">
                                {isAr ? m.locationAr : m.location}
                              </p>
                            </div>

                            <div className="md:col-span-4 md:text-end">
                              <span className="font-mono text-xs text-white/60 [html[data-theme=day]_&]:text-[#2d5661]">
                                {isAr ? m.timestampAr : m.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Support Callout */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <span className="text-white/55 [html[data-theme=day]_&]:text-[#2d5661] font-mono">
                        {isAr
                          ? "هل تحتاج لتعديل مسار الشحنة أو الاستفسار عن المعاملة الجمركية؟"
                          : "Need expedited delivery instructions or customs clearance consultation?"}
                      </span>

                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                          `Hello RKLT, I am inquiring about tracking manifest: ${record.trackingNo}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[4px] bg-[#c89b3c] text-[#050a0e] font-mono uppercase tracking-wider font-bold hover:bg-[#d8ab4c] transition-colors"
                      >
                        <Icon name="whatsapp" size={14} />
                        <span>
                          {isAr ? "محادثة مسؤول الشحنة" : "Liaison with Shipment Officer"}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          </div>
          <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
        </div>
      )}

      {/* LAYER 3: Executive Mandate CTA */}
      <div data-depth-stratum="3" className="rklt-depth-stratum rklt-depth-overlayer z-[30]">
        <div data-depth-inner>
          <CTABand locale={locale} tone="darker" />
        </div>
      </div>
    </DepthLayerController>
  );
}
