"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";
import { CTABand } from "@/components/layout/CTABand";

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
          : "Consignment identifier not recognized. Please click one of the verified demo consignments below or contact our operations desk."
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
    <main className="rklt-tracking-page min-h-screen transition-colors duration-300">
      {/* 1. Header Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 border-b border-role-line overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e2b34a]/[0.03] via-transparent to-transparent pointer-events-none" />

        <Container className="max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {isAr
                ? "منظومة تتبع مسار الشحنات والبيانات الجمركية"
                : "CONSIGNMENT & MILESTONE TRACKING RADAR"}
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight rklt-tracking-heading">
            {isAr ? (
              <>
                تتبع مسار شحنتك <br />
                <span className="text-[#e2b34a]">بشفافية ودقة متناهية.</span>
              </>
            ) : (
              <>
                Track Cargo Milestones with <br />
                <span className="text-[#e2b34a]">
                  Quayside Chain of Custody.
                </span>
              </>
            )}
          </h1>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto rklt-tracking-lead">
            {isAr
              ? "أدخل رقم بوليصة الشحن (B/L)، رقم الحاوية، أو بوليصة الشحن الجوي (AWB) لمتابعة حالة الشحنة ومراحل التخليص الجمركي خطوة بخطوة."
              : "Enter your Bill of Lading, Container ID, or Airway Bill to view live operational checkpoints, customs pre-clearance status, and transit progress."}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl rklt-tracking-searchbox shadow-xl backdrop-blur-md">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  isAr
                    ? "أدخل رقم البوليصة أو الحاوية..."
                    : "Enter B/L, Container ID or AWB..."
                }
                className="w-full bg-transparent px-4 py-3 text-sm font-mono rklt-tracking-input placeholder-current opacity-70 focus:opacity-100 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl rklt-bento-btn text-sm font-extrabold shrink-0 flex items-center justify-center gap-2 transition-transform duration-200"
              >
                <Icon name="search" size={16} />
                <span>{isAr ? "تتبع الآن" : "Track Manifest"}</span>
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-mono mt-3 text-start">
                {errorMsg}
              </p>
            )}

            {/* Quick Demo Pickers */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-role-muted font-mono">
                {isAr ? "شحنات تجريبية للمعاينة:" : "Demo Consignments:"}
              </span>
              {Object.keys(DEMO_RECORDS).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectDemo(key)}
                  className={`font-mono px-2.5 py-1 rounded transition-colors rklt-tracking-pill-btn ${
                    activeRecordKey === key ? "is-active" : ""
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </form>
        </Container>
      </section>

      {/* 2. Active Consignment Overview & Telemetry Radar */}
      {record && (
        <section className="py-20 md:py-28">
          <Container className="max-w-5xl space-y-10">
            {/* Main Spec Card */}
            <div className="rklt-tracking-card rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 transition-all duration-300">
              {/* Header Status Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-role-line pb-6">
                <div>
                  <span className="font-mono text-xs text-role-muted block mb-1">
                    {isAr ? "معرف الشحنة المعتمد" : "VERIFIED CONSIGNMENT IDENTIFIER"}
                  </span>
                  <div className="flex items-center gap-3">
                    <h2 className="font-mono text-2xl sm:text-3xl font-black text-role-text">
                      {record.trackingNo}
                    </h2>
                    <button
                      type="button"
                      onClick={copyTrackingNo}
                      className="p-1.5 rounded-lg border border-role-line hover:border-role-action text-role-muted hover:text-role-text transition-colors"
                      title="Copy Tracking ID"
                    >
                      <Icon name="copy" size={14} />
                    </button>
                    {copied && (
                      <span className="text-xs font-mono text-emerald-400">
                        {isAr ? "تم النسخ!" : "Copied!"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-role-muted mt-1">
                    {isAr ? record.typeAr : record.type}
                  </p>
                </div>

                <div className="text-start md:text-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e2b34a]/15 border border-[#e2b34a]/30 text-[#e2b34a] text-xs font-mono font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#e2b34a] animate-pulse" />
                    <span>{isAr ? record.statusLabelAr : record.statusLabel}</span>
                  </div>
                  <span className="font-mono text-xs text-role-muted block">
                    {isAr ? "الموعد المقدر: " : "ETA Window: "}
                    <strong className="text-role-text">
                      {isAr ? record.etaAr : record.eta}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl rklt-tracking-route-box text-xs font-mono border border-role-line bg-role-dock">
                <div>
                  <span className="text-role-muted block mb-1">
                    {isAr ? "ميناء الانطلاق" : "Origin Port"}
                  </span>
                  <span className="text-role-text font-bold">
                    {isAr ? record.originAr : record.origin}
                  </span>
                </div>
                <div>
                  <span className="text-role-muted block mb-1">
                    {isAr ? "الوجهة النهائية" : "Destination Hub"}
                  </span>
                  <span className="text-role-text font-bold">
                    {isAr ? record.destinationAr : record.destination}
                  </span>
                </div>
                <div>
                  <span className="text-role-muted block mb-1">
                    {isAr ? "الباخرة / الرحلة" : "Vessel / Flight"}
                  </span>
                  <span className="text-role-text font-bold truncate block">
                    {record.vesselOrFlight}
                  </span>
                </div>
                <div>
                  <span className="text-role-muted block mb-1">
                    {isAr ? "رقم الحاوية / البوليصة" : "Container / AWB"}
                  </span>
                  <span className="text-[#e2b34a] font-bold">
                    {record.containerOrAwb}
                  </span>
                </div>
              </div>

              {/* Live Telemetry & GPS Radar Banner */}
              <div className="p-5 rounded-xl border border-role-line bg-role-field space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#e2b34a] uppercase tracking-wider flex items-center gap-2">
                    <Icon name="radio" size={14} className="animate-pulse" />
                    <span>
                      {isAr
                        ? "بيانات الملاحة والرصد الميداني اللحظي (GPS Telemetry):"
                        : "LIVE OPERATIONAL TELEMETRY & ROUTE RADAR:"}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-role-muted">
                    {record.telemetry.customsLic}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg border border-role-line bg-role-dock space-y-1">
                    <span className="text-role-muted block text-[11px]">
                      {isAr ? "إحداثيات الموقع الحالي" : "Current GPS Coordinates"}
                    </span>
                    <span className="text-role-text font-bold block truncate">
                      {record.telemetry.gpsCoords}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-role-line bg-role-dock space-y-1">
                    <span className="text-role-muted block text-[11px]">
                      {isAr ? "حالة السرعة والحركة" : "Transit Velocity"}
                    </span>
                    <span className="text-[#e2b34a] font-bold block">
                      {record.telemetry.speed}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-role-line bg-role-dock space-y-1">
                    <span className="text-role-muted block text-[11px]">
                      {isAr ? "الرصاص الجمركي المعتمد" : "Customs Lead Seal"}
                    </span>
                    <span className="text-emerald-400 font-bold block truncate">
                      {record.telemetry.customsSeal}
                    </span>
                  </div>
                </div>

                {/* If Reefer Cargo, display Cold-Chain Datalogger HUD */}
                {record.mode === "reefer" && record.telemetry.tempActual && (
                  <div className="p-4 rounded-lg border border-[#e2b34a]/30 bg-[#e2b34a]/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#e2b34a] uppercase tracking-wider flex items-center gap-2">
                        <Icon name="reefer" size={14} />
                        <span>
                          {isAr
                            ? "مؤشرات درجة حرارة الحاوية المبردة (Cold-Chain Telemetry):"
                            : "ACTIVE REEFER THERMAL DATA LOG (CARRIER TRANSICOLD):"}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400 font-bold">
                        {isAr
                          ? record.telemetry.tempStatus?.ar
                          : record.telemetry.tempStatus?.en}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
                      <div>
                        <span className="text-role-muted block text-[11px]">
                          {isAr ? "درجة الحرارة الحالية" : "Current Reading"}
                        </span>
                        <span className="text-lg font-black text-role-text">
                          {record.telemetry.tempActual}
                        </span>
                      </div>
                      <div>
                        <span className="text-role-muted block text-[11px]">
                          {isAr ? "نقطة الضبط المبرمجة" : "Calibrated Setpoint"}
                        </span>
                        <span className="text-lg font-black text-[#e2b34a]">
                          {record.telemetry.tempSetpoint}
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-role-muted block text-[11px]">
                          {isAr ? "سجل الانحراف الحراري" : "Thermal Excursion"}
                        </span>
                        <span className="text-xs font-bold text-emerald-400">
                          {isAr ? "٠.٠° م (مطابق تماماً)" : "0.0°C (100% Compliant)"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5-Stage Milestone Progression Ladder */}
              <div className="space-y-6 pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-role-muted border-b border-role-line pb-3">
                  {isAr
                    ? "سجل المحطات ونقاط التفتيش الميدانية"
                    : "OPERATIONAL CHECKPOINT TIMELINE & CHAIN OF CUSTODY"}
                </h3>

                <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:inset-inline-start-4 before:w-0.5 rklt-tracking-milestone-line">
                  {record.milestones.map((m, idx) => (
                    <div key={m.title} className="relative flex items-start gap-4">
                      {/* Milestone Dot */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-mono text-xs font-bold border transition-all ${
                          m.completed
                            ? "bg-[#e2b34a] text-[#051014] border-[#e2b34a]"
                            : m.current
                            ? "bg-[#051014] text-[#e2b34a] border-[#e2b34a] animate-pulse ring-4 ring-[#e2b34a]/20"
                            : "bg-[#051014]/40 text-current opacity-40 border-current"
                        }`}
                      >
                        {m.completed ? "✓" : `0${idx + 1}`}
                      </div>

                      {/* Content Box */}
                      <div
                        className={`flex-1 p-4 rounded-xl rklt-tracking-milestone-card border border-role-line bg-role-dock transition-all ${
                          m.current ? "is-active shadow-md border-[#e2b34a]/50" : ""
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4
                            className={`text-sm font-bold ${
                              m.current ? "text-[#e2b34a]" : "text-role-text"
                            }`}
                          >
                            {isAr ? m.titleAr : m.title}
                          </h4>
                          <span className="font-mono text-xs text-role-muted">
                            {isAr ? m.timestampAr : m.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-role-muted">
                          {isAr ? m.locationAr : m.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Support Callout */}
              <div className="pt-4 border-t border-role-line flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-role-muted font-mono">
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg rklt-bento-btn font-semibold transition-colors"
                >
                  <Icon name="whatsapp" size={14} />
                  <span>
                    {isAr ? "محادثة مسؤول الشحنة" : "Liaison with Shipment Officer"}
                  </span>
                </a>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 3. Executive Mandate CTA */}
      <CTABand locale={locale} tone="darker" />
    </main>
  );
}
