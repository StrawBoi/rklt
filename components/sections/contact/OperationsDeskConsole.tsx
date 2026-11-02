"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";

interface OperationsDeskConsoleProps {
  locale: Locale;
}

const MODES = [
  { id: "sea", en: "Sea Freight", ar: "شحن بحري" },
  { id: "air", en: "Air Cargo", ar: "شحن جوي" },
  { id: "land", en: "Overland", ar: "نقل بري" },
  { id: "customs", en: "Clearance (Lic #412)", ar: "تخليص جمركي (٤١٢)" },
] as const;

export const OperationsDeskConsole: React.FC<OperationsDeskConsoleProps> = ({
  locale,
}) => {
  const isAr = locale === "ar";
  const [selectedMode, setSelectedMode] = useState<string>("sea");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fail">(
    "idle"
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          origin: data.get("origin"),
          destination: data.get("destination"),
          cargo: data.get("cargo"),
          mode: selectedMode,
          locale,
        }),
      });
      setStatus(response.ok ? "done" : "fail");
    } catch {
      setStatus("fail");
    }
  }

  const directWhatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً ربوع الخير، أرغب في استشارة فورية مع مكتب إدارة العمليات والشحن."
      : "Hello RKLT operations desk, I would like to consult on an urgent freight inquiry."
  )}`;

  return (
    <section
      id="operations-console"
      className="py-16 md:py-24 border-b border-role-line transition-colors duration-300"
      style={{ backgroundColor: "var(--role-field)" }}
    >
      <Container>
        {/* Section Proclamation */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {isAr
                ? "مكتب إدارة العمليات والشحن الميداني المباشر"
                : "FREIGHT OPERATIONS & DISPATCH COMMAND CONSOLE"}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight rklt-bento-heading">
            {isAr ? (
              <>
                اتصال مباشر بكوادر العمليات <br />
                <span className="text-[#e2b34a]">في عمّان وميناء العقبة والمنافذ.</span>
              </>
            ) : (
              <>
                Direct Institutional Dispatch <br />
                <span className="text-[#e2b34a]">
                  Amman HQ & Aqaba Maritime Quayside.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed rklt-bento-lead max-w-3xl">
            {isAr
              ? "أرسل تفاصيل الشحنة عبر النموذج الميداني لتلقي تسعيرة وجدول زمني خلال ساعتين، أو تواصل فوراً عبر قنوات الهاتف والواتساب المباشرة مع ضباط العمليات."
              : "Transmit consignment parameters directly to our duty brokers for a comprehensive rate and transit confirmation within 2 hours, or connect instantly with on-duty operations managers."}
          </p>
        </div>

        {/* Split-Screen Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Interactive Dispatch Form */}
          <div className="lg:col-span-7 rounded-2xl border border-role-line bg-role-dock p-6 sm:p-10 shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-role-line pb-4">
              <div>
                <span className="font-mono text-xs text-[#e2b34a] font-bold uppercase tracking-wider block">
                  {isAr ? "إيداع مذكرة شحن ميدانية" : "TRANSMIT CONSIGNMENT NOTE"}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-role-text">
                  {isAr
                    ? "طلب تسعيرة وتنسيق مسار مخصص"
                    : "Rapid Freight Rate & Protocol Inquiry"}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#e2b34a]">
                <span className="w-2 h-2 rounded-full bg-[#e2b34a] animate-pulse" />
                <span>{isAr ? "استجابة < ساعتين" : "< 2hr SLA"}</span>
              </div>
            </div>

            {status === "done" ? (
              <div className="p-8 text-center space-y-4 border border-[#e2b34a]/30 rounded-xl bg-[#e2b34a]/5">
                <div className="w-12 h-12 rounded-full bg-[#e2b34a]/20 text-[#e2b34a] flex items-center justify-center mx-auto">
                  <Icon name="check" size={24} />
                </div>
                <h4 className="font-display text-xl font-bold text-role-text">
                  {isAr
                    ? "تم استلام مذكرة الشحنة بنجاح"
                    : "Consignment Note Registered"}
                </h4>
                <p className="text-sm text-role-muted max-w-md mx-auto">
                  {isAr
                    ? "يقوم ضابط العمليات المختص بدراسة المسار الجمركي وإعداد عرض السعر وسيتواصل معكم فوراً."
                    : "Our duty operations officer is calculating optimal routing and statutory tariffs. You will receive an official confirmation shortly."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="font-mono text-xs text-[#e2b34a] underline mt-2 inline-block"
                >
                  {isAr ? "إرسال مذكرة شحنة أخرى" : "Transmit another consignment"}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Freight Mode Selector */}
                <div className="space-y-2">
                  <span className="font-mono text-xs text-role-muted uppercase tracking-wider block">
                    {isAr ? "واسطة النقل والخدمة المطلوبة:" : "Consignment Mode:"}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MODES.map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSelectedMode(mode.id)}
                        className={`p-2.5 rounded-lg border text-xs font-mono font-bold transition-all text-center ${
                          selectedMode === mode.id
                            ? "bg-[#e2b34a]/15 border-[#e2b34a] text-[#e2b34a]"
                            : "border-role-line bg-role-field text-role-text hover:border-role-action"
                        }`}
                      >
                        {isAr ? mode.ar : mode.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-role-muted block">
                      {isAr ? "اسم المرسل / الشركة" : "Shipper / Company Name"} *
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={isAr ? "شركة الاتحاد للصناعات..." : "Acme Industrial Logistics Ltd."}
                      className="w-full p-3 rounded-lg border border-role-line bg-role-field text-sm text-role-text placeholder:text-role-muted/60 focus:outline-none focus:border-[#e2b34a]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-role-muted block">
                      {isAr ? "طبيعة البضاعة ونوعها" : "Cargo Classification"} *
                    </label>
                    <input
                      name="cargo"
                      required
                      placeholder={isAr ? "أدوية مبردة، قطع غيار، بضائع عامة..." : "Pharma, Heavy Machinery, FMCG..."}
                      className="w-full p-3 rounded-lg border border-role-line bg-role-field text-sm text-role-text placeholder:text-role-muted/60 focus:outline-none focus:border-[#e2b34a]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-role-muted block">
                      {isAr ? "ميناء أو بلد المنشأ" : "Port / Origin City"} *
                    </label>
                    <input
                      name="origin"
                      required
                      placeholder={isAr ? "ميناء شنغهاي / فرانكفورت..." : "Port of Rotterdam / Shanghai..."}
                      className="w-full p-3 rounded-lg border border-role-line bg-role-field text-sm text-role-text placeholder:text-role-muted/60 focus:outline-none focus:border-[#e2b34a]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-role-muted block">
                      {isAr ? "الوجهة النهائية وموقع التسليم" : "Destination / Delivery City"} *
                    </label>
                    <input
                      name="destination"
                      required
                      placeholder={isAr ? "عمّان (سحاب) / الرياض..." : "Amman (Sahab Zone) / Riyadh..."}
                      className="w-full p-3 rounded-lg border border-role-line bg-role-field text-sm text-role-text placeholder:text-role-muted/60 focus:outline-none focus:border-[#e2b34a]"
                    />
                  </div>
                </div>

                {status === "fail" && (
                  <p className="text-xs font-mono text-rose-500">
                    {isAr
                      ? "تعذر إرسال المذكرة عبر النظام. يرجى استخدام زر الواتساب المباشر بالأسفل."
                      : "Unable to dispatch consignment note online. Please use direct WhatsApp below."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 px-6 rounded-xl rklt-bento-btn text-sm font-black flex items-center justify-center gap-2 transition-transform duration-200"
                >
                  <Icon name="file-text" size={16} />
                  <span>
                    {status === "sending"
                      ? isAr
                        ? "جارٍ إيداع المذكرة..."
                        : "Registering Manifest..."
                      : isAr
                      ? "إيداع مذكرة الشحنة رسميّاً"
                      : "Transmit Consignment Note"}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Operational Stations & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Operations Duty Badge */}
            <div className="p-5 rounded-2xl border border-role-line bg-role-dock space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-role-line pb-3">
                <span className="font-mono text-xs font-bold text-[#e2b34a] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e2b34a] animate-pulse" />
                  <span>
                    {isAr ? "برج المراقبة والعمليات الميدانية" : "DUTY DISPATCH STATUS"}
                  </span>
                </span>
                <span className="font-mono text-xs text-role-muted">
                  UTC+3 · ACTIVE
                </span>
              </div>

              {/* Direct Priority Phone & WhatsApp */}
              <div className="space-y-3">
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-role-line bg-role-field hover:border-role-action transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#e2b34a]/15 text-[#e2b34a] flex items-center justify-center">
                      <Icon name="phone" size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-role-muted block">
                        {isAr ? "الخط الهاتفي المباشر للعمليات" : "Priority Operations Line"}
                      </span>
                      <span className="font-mono text-sm font-bold text-role-text dir-ltr block">
                        {siteConfig.phone}
                      </span>
                    </div>
                  </div>
                  <Icon name="arrow-up-right" size={16} className="text-role-muted" />
                </a>

                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#e2b34a]/40 bg-[#e2b34a]/10 hover:border-[#e2b34a] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#e2b34a] text-black flex items-center justify-center">
                      <Icon name="whatsapp" size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[#e2b34a] font-bold block">
                        {isAr ? "محادثة فورية (أسرع استجابة)" : "Direct WhatsApp Dispatch Desk"}
                      </span>
                      <span className="font-mono text-sm font-black text-role-text dir-ltr block">
                        {siteConfig.phone}
                      </span>
                    </div>
                  </div>
                  <Icon name="arrow-up-right" size={16} className="text-[#e2b34a]" />
                </a>
              </div>
            </div>

            {/* Two Physical Hub Cards */}
            <div className="p-5 rounded-2xl border border-role-line bg-role-dock space-y-4 shadow-xl">
              <span className="font-mono text-xs font-bold text-role-text uppercase tracking-wider block border-b border-role-line pb-2">
                {isAr ? "المراكز التشغيلية المرخصة:" : "LICENSED REGIONAL DESKS:"}
              </span>

              {/* Station 1: Amman HQ */}
              <div className="p-3.5 rounded-xl border border-role-line bg-role-field space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-role-text">
                    {isAr ? "عمّان · المقر الرئيسي" : "Amman · Commercial HQ"}
                  </span>
                  <span className="font-mono text-[11px] text-[#e2b34a]">
                    License #412
                  </span>
                </div>
                <p className="text-xs text-role-muted">
                  {isAr
                    ? "شارع الملك حسين، مجمع المدينة التجاري، عمّان"
                    : "King Hussein Street, Al-Madina Center, Amman"}
                </p>
                <span className="font-mono text-[11px] text-role-muted block">
                  {isAr ? "السبت – الخميس: ٠٨:٣٠ – ١٧:٣٠" : "Sat–Thu: 08:30 – 17:30"}
                </span>
              </div>

              {/* Station 2: Aqaba Maritime */}
              <div className="p-3.5 rounded-xl border border-role-line bg-role-field space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-role-text">
                    {isAr ? "العقبة · رصيف الميناء (ACT)" : "Aqaba · Quayside Berth ACT"}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400">
                    24/7 Ops
                  </span>
                </div>
                <p className="text-xs text-role-muted">
                  {isAr
                    ? "محطة حاويات ميناء العقبة، مجمع الملاحة والجمارك"
                    : "Aqaba Container Terminal, Port Customs Complex"}
                </p>
                <span className="font-mono text-[11px] text-role-muted block">
                  {isAr ? "عمليات الميدان: على مدار الساعة" : "Field Operations: 24/7/365"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
