"use client";

import React, { useState, useRef } from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { usePayPalScrollMotion } from "@/components/motion/usePayPalScrollMotion";

interface CTABandProps {
  locale: Locale;
  tone?: "dark" | "darker";
  className?: string;
}

export const CTABand: React.FC<CTABandProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const rootRef = useRef<HTMLElement>(null);

  const [origin, setOrigin] = useState("aqaba");
  const [destination, setDestination] = useState("amman");
  const [mode, setMode] = useState("sea");
  const [isManifestPulsing, setIsManifestPulsing] = useState(false);

  usePayPalScrollMotion(rootRef, {
    headerSelector: "[data-motion='header']",
    stageSelector: "[data-motion='stage']",
  });

  const triggerPulse = () => {
    setIsManifestPulsing(true);
    setTimeout(() => setIsManifestPulsing(false), 450);
  };

  const handleSelectOrigin = (val: string) => {
    setOrigin(val);
    triggerPulse();
  };

  const handleSelectDestination = (val: string) => {
    setDestination(val);
    triggerPulse();
  };

  const handleSelectMode = (val: string) => {
    setMode(val);
    triggerPulse();
  };

  const ORIGINS = [
    { id: "aqaba", code: "AQB-ACT", label: "Aqaba Port (ACT)", labelAr: "ميناء العقبة (ACT)" },
    { id: "amman", code: "AMM-HUB", label: "Amman Inland Depot", labelAr: "مستودعات عمّان" },
    { id: "qaia", code: "AMM-QAIA", label: "Queen Alia Airport (AMM)", labelAr: "مطار الملكة علياء (AMM)" },
    { id: "global", code: "INTL-PORT", label: "Global Ocean Hub", labelAr: "ميناء شحن دولي" },
  ];

  const DESTINATIONS = [
    { id: "amman", code: "AMM-DEST", label: "Amman / Nationwide", labelAr: "عمّان وكافة المحافظات" },
    { id: "ksa", code: "KSA-RUH", label: "Saudi Arabia (Riyadh / Jeddah)", labelAr: "السعودية (الرياض / جدة)" },
    { id: "gcc", code: "UAE-DXB", label: "UAE & Arabian Gulf", labelAr: "الإمارات والخليج العربي" },
    { id: "iraq", code: "IRQ-BGW", label: "Iraq (Baghdad / Basra)", labelAr: "العراق (بغداد / البصرة)" },
  ];

  const MODES = [
    { id: "sea", code: "FCL-LCL", label: "Ocean Freight FCL/LCL", labelAr: "شحن بحري (حاويات كاملة ومشتركة)" },
    { id: "land", code: "BND-TRK", label: "Bonded Road Haulage", labelAr: "نقل بري وشاحنات معلقة" },
    { id: "air", code: "EXP-AIR", label: "Air Cargo Express Priority", labelAr: "شحن جوي سريع فائق الأولوية" },
    { id: "reefer", code: "RF-COLD", label: "Reefer Cold Chain (-25°C to +15°C)", labelAr: "شحن مبرد مضبوط حرارياً" },
    { id: "project", code: "HVY-OOG", label: "Heavy Lift & Project Cargo", labelAr: "شحن مشاريع ومعدات ثقيلة" },
  ];

  const currentOrigin = ORIGINS.find((o) => o.id === origin) || ORIGINS[0];
  const currentDest = DESTINATIONS.find((d) => d.id === destination) || DESTINATIONS[0];
  const currentMode = MODES.find((m) => m.id === mode) || MODES[0];

  const manifestRef = `RKLT-EXP-${currentOrigin.code}-${currentDest.code}`;

  const formattedMsg = isAr
    ? `مرحباً ربوع الخير، أرغب في تسعيرة وتنسيق جمركي فوري:\n- المانيفست المبدئي: ${manifestRef}\n- مسار الانطلاق: ${currentOrigin.labelAr} (${currentOrigin.code})\n- الوجهة النهائية: ${currentDest.labelAr} (${currentDest.code})\n- وسيلة الشحن: ${currentMode.labelAr}\nيرجى التواصل لترتيب المتطلبات.`
    : `Hello RKLT operations desk, I would like to request freight rates and customs intake:\n- Initial Manifest: ${manifestRef}\n- Origin: ${currentOrigin.label} (${currentOrigin.code})\n- Destination: ${currentDest.label} (${currentDest.code})\n- Cargo Mode: ${currentMode.label}\nPlease advise on transit schedule and rates.`;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(formattedMsg)}`;

  return (
    <section
      ref={rootRef}
      id="intake"
      className="relative py-24 md:py-32 bg-[#05080b] text-white border-t border-white/10 [html[data-theme=day]_&]:bg-[#fbf9f4] [html[data-theme=day]_&]:text-[#091a21] [html[data-theme=day]_&]:border-black/10 overflow-hidden transition-colors duration-300"
    >
      <Container size="wide">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header with Staggered Entrance */}
          <div data-motion="header" className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight leading-tight">
              {isAr ? (
                <>
                  وجّه شحنتك <span className="text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">بدقة وثقة مؤسسية.</span>
                </>
              ) : (
                <>
                  Command your freight with <span className="text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">institutional certainty.</span>
                </>
              )}
            </h2>

            <p className="text-white/60 [html[data-theme=day]_&]:text-[#2d5661] text-base md:text-lg leading-relaxed">
              {isAr
                ? "حدد مسار شحنتك وطبيعتها لإرسال مانيفست أولي فوري إلى مكتب العمليات. استجابة رسمية خلال ساعتين وتنسيق مباشر مع وسطاء جمركيين مرخصين."
                : "Configure your initial cargo parameters below to transmit directly to our senior operations desk. Guaranteed 2-hour formal proposal response with licensed brokerage review."}
            </p>
          </div>

          {/* Interactive Terminal Dispatch Grid */}
          <div
            data-motion="stage"
            className="border border-white/10 [html[data-theme=day]_&]:border-black/10 rounded-2xl p-6 sm:p-10 bg-white/[0.02] [html[data-theme=day]_&]:bg-white shadow-2xl space-y-10"
          >
            {/* 3 Configuration Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Origin Node */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661]/70 font-bold block">
                  {isAr ? "١. نقطة الانطلاق أو الميناء" : "1. ORIGIN PORT / HUB"}
                </label>
                <div className="space-y-2">
                  {ORIGINS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => handleSelectOrigin(o.id)}
                      className={`ctaband-chip w-full p-3 text-xs font-semibold rounded-lg border text-start flex items-center justify-between ${
                        origin === o.id
                          ? "bg-white text-black border-white shadow-md font-bold [html[data-theme=day]_&]:bg-[#091a21] [html[data-theme=day]_&]:text-white [html[data-theme=day]_&]:border-[#091a21]"
                          : "bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/5 hover:text-white [html[data-theme=day]_&]:bg-black/[0.02] [html[data-theme=day]_&]:text-[#2d5661] [html[data-theme=day]_&]:border-black/10 [html[data-theme=day]_&]:hover:bg-black/[0.04] [html[data-theme=day]_&]:hover:text-[#091a21]"
                      }`}
                    >
                      <span>{isAr ? o.labelAr : o.label}</span>
                      <span className="font-mono text-[10px] opacity-60">{o.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Destination Node */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661]/70 font-bold block">
                  {isAr ? "٢. الوجهة النهائية" : "2. FINAL DESTINATION"}
                </label>
                <div className="space-y-2">
                  {DESTINATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleSelectDestination(d.id)}
                      className={`ctaband-chip w-full p-3 text-xs font-semibold rounded-lg border text-start flex items-center justify-between ${
                        destination === d.id
                          ? "bg-white text-black border-white shadow-md font-bold [html[data-theme=day]_&]:bg-[#091a21] [html[data-theme=day]_&]:text-white [html[data-theme=day]_&]:border-[#091a21]"
                          : "bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/5 hover:text-white [html[data-theme=day]_&]:bg-black/[0.02] [html[data-theme=day]_&]:text-[#2d5661] [html[data-theme=day]_&]:border-black/10 [html[data-theme=day]_&]:hover:bg-black/[0.04] [html[data-theme=day]_&]:hover:text-[#091a21]"
                      }`}
                    >
                      <span>{isAr ? d.labelAr : d.label}</span>
                      <span className="font-mono text-[10px] opacity-60">{d.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Cargo Specification */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661]/70 font-bold block">
                  {isAr ? "٣. وسيلة الشحن والمواصفات" : "3. CARGO SPECIFICATION / MODE"}
                </label>
                <div className="space-y-2">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectMode(m.id)}
                      className={`ctaband-chip w-full p-3 text-xs font-semibold rounded-lg border text-start flex items-center justify-between ${
                        mode === m.id
                          ? "bg-[#e2b34a] text-[#051014] border-[#e2b34a] shadow-md font-extrabold [html[data-theme=day]_&]:bg-[#a87318] [html[data-theme=day]_&]:text-white [html[data-theme=day]_&]:border-[#a87318]"
                          : "bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/5 hover:text-white [html[data-theme=day]_&]:bg-black/[0.02] [html[data-theme=day]_&]:text-[#2d5661] [html[data-theme=day]_&]:border-black/10 [html[data-theme=day]_&]:hover:bg-black/[0.04] [html[data-theme=day]_&]:hover:text-[#091a21]"
                      }`}
                    >
                      <span>{isAr ? m.labelAr : m.label}</span>
                      <span className="font-mono text-[10px] opacity-60">{m.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Split-Flap Departure Board Telemetry Screen with PayPal-Style Confirmation Pulse */}
            <div
              className={`p-5 sm:p-6 rounded-xl bg-black/50 [html[data-theme=day]_&]:bg-[#ede6d8] border border-white/10 [html[data-theme=day]_&]:border-black/10 space-y-4 font-mono transition-all ${
                isManifestPulsing ? "manifest-pulse-active border-[#e2b34a]/60 [html[data-theme=day]_&]:border-[#a87318]/60" : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-3 text-xs">
                <div className="flex items-center gap-2 text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] font-bold">
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isManifestPulsing
                        ? "bg-[#34d399] animate-ping"
                        : "bg-[#e2b34a] [html[data-theme=day]_&]:bg-[#a87318] animate-pulse"
                    }`}
                  />
                  <span>{isAr ? "رمز المانيفست المبدئي:" : "INITIAL MANIFEST RECORD:"}</span>
                  <span className="text-white [html[data-theme=day]_&]:text-[#091a21] px-2 py-0.5 rounded bg-white/10 [html[data-theme=day]_&]:bg-black/5 font-mono">
                    {manifestRef}
                  </span>
                </div>
                <div className="text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                  JORDAN CUSTOMS LICENSE #412
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-white/40 [html[data-theme=day]_&]:text-[#2d5661]/60 block mb-1">
                    {isAr ? "نقطة الانطلاق" : "Origin Gateway"}
                  </span>
                  <p className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold">
                    {isAr ? currentOrigin.labelAr : currentOrigin.label}
                  </p>
                </div>
                <div>
                  <span className="text-white/40 [html[data-theme=day]_&]:text-[#2d5661]/60 block mb-1">
                    {isAr ? "الوجهة والتسليم" : "Final Destination"}
                  </span>
                  <p className="text-white [html[data-theme=day]_&]:text-[#091a21] font-bold">
                    {isAr ? currentDest.labelAr : currentDest.label}
                  </p>
                </div>
                <div>
                  <span className="text-white/40 [html[data-theme=day]_&]:text-[#2d5661]/60 block mb-1">
                    {isAr ? "طبيعة الشحنة" : "Cargo Classification"}
                  </span>
                  <p className="text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] font-bold">
                    {isAr ? currentMode.labelAr : currentMode.label}
                  </p>
                </div>
                <div>
                  <span className="text-white/40 [html[data-theme=day]_&]:text-[#2d5661]/60 block mb-1">
                    {isAr ? "زمن الاستجابة" : "Formal Response SLA"}
                  </span>
                  <p className="text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] font-bold">
                    {isAr ? "< ساعتين عمل" : "< 2 Hours Guaranteed"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Action Dispatch Row with Luxury PayPal Sheen Sweep Button */}
            <div className="border-t border-white/10 [html[data-theme=day]_&]:border-black/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-start">
                <p className="text-xs font-mono uppercase tracking-wider text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318] font-bold">
                  {isAr ? "تنسيق مباشر مع مدير العمليات المرخص بالميناء والحدود" : "DIRECT REVIEW BY LICENSED BROKERAGE DESK"}
                </p>
                <p className="text-xs text-white/50 [html[data-theme=day]_&]:text-[#2d5661]">
                  {isAr
                    ? "إيداع مسبق للمانيفست وإصدار أذونات العبور الرسمية."
                    : "Pre-arrival manifest indexing with official customs transit permits."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen-effect w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#e2b34a] [html[data-theme=day]_&]:bg-[#b88a38] text-[#051014] [html[data-theme=day]_&]:text-white text-sm font-extrabold hover:bg-[#f0c35e] [html[data-theme=day]_&]:hover:bg-[#9e7427] transition-all shadow-lg"
                >
                  <Icon name="whatsapp" size={18} />
                  <span>{isAr ? "إرسال الطلب عبر واتساب فوري" : "Transmit Manifest via WhatsApp"}</span>
                </a>

                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 [html[data-theme=day]_&]:border-black/20 text-white [html[data-theme=day]_&]:text-[#091a21] text-sm font-semibold hover:bg-white/10 [html[data-theme=day]_&]:hover:bg-black/5 transition-all hover:-translate-y-0.5"
                >
                  <Icon name="phone" size={16} />
                  <span>{siteConfig.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
