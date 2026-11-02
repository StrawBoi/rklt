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

type DraftState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  cargo: string;
  notes: string;
};

export const OperationsDeskConsole: React.FC<OperationsDeskConsoleProps> = ({
  locale,
}) => {
  const isAr = locale === "ar";
  const [selectedMode, setSelectedMode] = useState<string>("sea");
  const [status, setStatus] = useState<
    "idle" | "sending" | "done" | "unconfigured" | "fail"
  >("idle");
  const [refCode, setRefCode] = useState<string>("");
  const [lastDraft, setLastDraft] = useState<DraftState | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: DraftState = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      origin: String(data.get("origin") || ""),
      destination: String(data.get("destination") || ""),
      cargo: String(data.get("cargo") || ""),
      notes: String(data.get("notes") || ""),
    };
    setLastDraft(payload);
    setStatus("sending");

    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          mode: selectedMode,
          locale,
        }),
      });
      const json = await response.json().catch(() => ({}));
      if (json?.ref) setRefCode(json.ref);

      if (response.ok) {
        setStatus("done");
      } else if (response.status === 503 || json?.error === "unconfigured") {
        setStatus("unconfigured");
      } else {
        setStatus("fail");
      }
    } catch {
      setStatus("fail");
    }
  }

  const directWhatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr
      ? "مرحباً ربوع الخير، أرغب في استشارة فورية مع مكتب إدارة العمليات والشحن."
      : "Hello RKLT operations desk, I would like to consult on an urgent freight inquiry."
  )}`;

  const buildMailtoHref = () => {
    if (!lastDraft) return `mailto:${siteConfig.email}`;
    const subject = `[${refCode || "RKLT-INQ"}] ${selectedMode.toUpperCase()} — ${lastDraft.origin} to ${lastDraft.destination}`;
    const body = [
      `Name: ${lastDraft.name}`,
      lastDraft.company ? `Company: ${lastDraft.company}` : null,
      `Email: ${lastDraft.email}`,
      `Phone: ${lastDraft.phone}`,
      `Mode: ${selectedMode.toUpperCase()}`,
      `Origin: ${lastDraft.origin}`,
      `Destination: ${lastDraft.destination}`,
      `Cargo: ${lastDraft.cargo}`,
      lastDraft.notes ? `Notes:\n${lastDraft.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="operations-console"
      className="py-20 md:py-32 bg-[#070d12] [html[data-theme=day]_&]:bg-[#f5f0e6] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300"
    >
      <Container>
        {/* Architectural Header */}
        <div className="max-w-4xl mb-16 space-y-5">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-white [html[data-theme=day]_&]:text-[#091a21]">
            {isAr ? (
              <>
                اتصال مباشر بكوادر العمليات <br />
                <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  في عمّان وميناء العقبة والمنافذ.
                </span>
              </>
            ) : (
              <>
                Direct Institutional Dispatch <br />
                <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                  Amman HQ & Aqaba Maritime Quayside.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-white/65 [html[data-theme=day]_&]:text-[#2d5661] max-w-3xl">
            {isAr
              ? "أرسل تفاصيل الشحنة عبر النموذج الميداني لتلقي تسعيرة وجدول زمني رسمي عبر البريد الإلكتروني خلال ساعتين، أو تواصل فوراً مع ضباط العمليات."
              : "Transmit consignment parameters directly to our duty brokers for a formal rate and transit confirmation by email within 2 hours, or connect directly with on-duty operations managers."}
          </p>
        </div>

        {/* Split-Screen Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): Sharp Nested Architectural Form Frame */}
          <div className="lg:col-span-7 rounded-[8px] p-1.5 border border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02] shadow-2xl">
            <div className="rounded-[4px] border border-white/8 [html[data-theme=day]_&]:border-black/8 bg-[#0b131a] [html[data-theme=day]_&]:bg-[#fbf9f4] p-6 sm:p-10 space-y-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-5">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white [html[data-theme=day]_&]:text-[#091a21] tracking-tight">
                  {isAr
                    ? "طلب تسعيرة وتنسيق مسار مخصص"
                    : "Consignment Rate & Dispatch Intake"}
                </h3>
                <span className="font-mono text-xs text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] tracking-widest uppercase">
                  {isAr ? "استجابة رسمية < ساعتين" : "SLA < 2 HOURS"}
                </span>
              </div>

              {status === "done" ? (
                <div className="p-8 space-y-5 border border-[#c89b3c]/40 rounded-[4px] bg-[#c89b3c]/[0.05]">
                  <div className="flex items-center justify-between border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#c89b3c]">
                      {isAr ? "تم قيد مذكرة الشحنة" : "MANIFEST DISPATCH REGISTERED"}
                    </span>
                    {refCode && (
                      <span className="font-mono text-xs font-bold text-white [html[data-theme=day]_&]:text-[#091a21]">
                        {refCode}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white [html[data-theme=day]_&]:text-[#091a21]">
                    {isAr
                      ? "تم إرسال مذكرة الشحنة إلى مكتب العمليات"
                      : "Consignment Note Transmitted to Operations Desk"}
                  </h4>
                  <p className="text-sm text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                    {isAr
                      ? "يقوم ضابط العمليات المختص بمراجعة المسار الجمركي وإعداد عرض السعر الرسمي وسيتم الرد مباشرة على بريدكم الإلكتروني."
                      : "Our duty operations officer is reviewing the customs tariff and corridor schedule. A formal proposal will be sent directly to your email address."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="font-mono text-xs text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] underline pt-2 inline-block"
                  >
                    {isAr ? "إرسال مذكرة شحنة أخرى" : "Transmit another consignment"}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Freight Mode Selector */}
                  <div className="space-y-2.5">
                    <label className="font-mono text-[11px] text-white/55 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-[0.16em] block">
                      {isAr ? "واسطة النقل والخدمة المطلوبة" : "01 / Transport Mode"}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {MODES.map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedMode(mode.id)}
                          className={`py-3 px-3 rounded-[4px] border text-xs font-mono font-bold transition-all text-center ${
                            selectedMode === mode.id
                              ? "bg-[#c89b3c] border-[#c89b3c] text-[#050a0e]"
                              : "border-white/12 [html[data-theme=day]_&]:border-black/12 bg-white/[0.02] [html[data-theme=day]_&]:bg-black/[0.02] text-white/80 [html[data-theme=day]_&]:text-[#091a21] hover:border-[#c89b3c]/60"
                          }`}
                        >
                          {isAr ? mode.ar : mode.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Identity Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "الاسم الكامل / المسؤول *" : "Contact Name *"}
                      </label>
                      <input
                        name="name"
                        required
                        placeholder={isAr ? "م. طارق المجالي" : "Tariq Al-Majali"}
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "اسم الشركة / المؤسسة" : "Company / Organization"}
                      </label>
                      <input
                        name="company"
                        placeholder={isAr ? "شركة الاتحاد للصناعات..." : "Levant Industrial Group"}
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "البريد الإلكتروني الرسمي *" : "Work Email Address *"}
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="procurement@company.com"
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c] dir-ltr"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+962 79 000 0000"
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c] dir-ltr"
                      />
                    </div>
                  </div>

                  {/* Routing & Cargo Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/8 [html[data-theme=day]_&]:border-black/8">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "ميناء أو بلد المنشأ *" : "Port / Origin City *"}
                      </label>
                      <input
                        name="origin"
                        required
                        placeholder={isAr ? "ميناء شنغهاي / روتردام..." : "Port of Rotterdam / Shanghai..."}
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "الوجهة النهائية وموقع التسليم *" : "Destination / Delivery City *"}
                      </label>
                      <input
                        name="destination"
                        required
                        placeholder={isAr ? "عمّان (سحاب) / الرياض / بغداد..." : "Amman (Sahab) / Riyadh / Baghdad..."}
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "طبيعة البضاعة، عدد الحاويات أو الوزن *" : "Cargo Commodity, Container Type & Weight *"}
                      </label>
                      <input
                        name="cargo"
                        required
                        placeholder={
                          isAr
                            ? "مثال: ٢ حاوية 40ft HC، معدات صناعية، ١٨ طن..."
                            : "e.g. 2x 40ft HC, Industrial Machinery, 18 MT (HS 8479)..."
                        }
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                        {isAr ? "ملاحظات إضافية (تاريخ الشحن المتوقع / متطلبات خاصة)" : "Additional Manifest Notes (Target ETD / Special Permits)"}
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder={
                          isAr
                            ? "تاريخ الشحن المتوقع، شروط التسليم (FOB / CIF / EXW)، أو أي متطلبات تخليص خاصة..."
                            : "Incoterms (FOB / CIF / EXW), target vessel ETD, temperature set-point, or JSMO/JFDA clearance requirements..."
                        }
                        className="w-full p-3.5 rounded-[4px] border border-white/12 [html[data-theme=day]_&]:border-black/15 bg-black/30 [html[data-theme=day]_&]:bg-white text-sm text-white [html[data-theme=day]_&]:text-[#091a21] placeholder:text-white/30 [html[data-theme=day]_&]:placeholder:text-black/35 focus:outline-none focus:border-[#c89b3c] resize-y"
                      />
                    </div>
                  </div>

                  {(status === "unconfigured" || status === "fail") && (
                    <div className="p-4 rounded-[4px] border border-[#c89b3c]/50 bg-[#c89b3c]/10 space-y-3">
                      <p className="text-xs font-mono text-white [html[data-theme=day]_&]:text-[#091a21]">
                        {isAr
                          ? "تم تجهيز مذكرة الشحنة. يمكنك إرسالها فوراً عبر برنامج البريد الإلكتروني لديك أو عبر واتساب المباشر:"
                          : "Your consignment note is ready. Dispatch immediately via your email client or direct WhatsApp:"}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={buildMailtoHref()}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#c89b3c] text-[#050a0e] font-mono text-xs font-bold"
                        >
                          <Icon name="mail" size={14} />
                          <span>{isAr ? "إرسال عبر البريد الإلكتروني" : "Dispatch via Email Client"}</span>
                        </a>
                        <a
                          href={directWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-white/20 [html[data-theme=day]_&]:border-black/20 text-white [html[data-theme=day]_&]:text-[#091a21] font-mono text-xs font-bold"
                        >
                          <Icon name="whatsapp" size={14} />
                          <span>{isAr ? "إرسال عبر واتساب" : "Dispatch via WhatsApp"}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 px-6 rounded-[4px] bg-[#c89b3c] hover:bg-[#d8ab4c] text-[#050a0e] text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors duration-200"
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
          </div>

          {/* Right Column (5 cols): Open Editorial Stations & Direct Channels */}
          <div className="lg:col-span-5 space-y-10 lg:pt-2">
            {/* Direct Priority Channels */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-white/12 [html[data-theme=day]_&]:border-black/12 pb-3">
                <span className="font-mono text-xs font-bold text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-[0.18em]">
                  {isAr ? "قنوات الاتصال الفوري" : "DIRECT PRIORITY CHANNELS"}
                </span>
                <span className="font-mono text-xs text-white/45 [html[data-theme=day]_&]:text-[#2d5661]">
                  UTC+3 · AMMAN / AQABA
                </span>
              </div>

              <div className="divide-y divide-white/10 [html[data-theme=day]_&]:divide-black/10 border-b border-white/10 [html[data-theme=day]_&]:border-black/10">
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="py-4 flex items-center justify-between group"
                >
                  <div>
                    <span className="font-mono text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                      {isAr ? "الخط الهاتفي المباشر للعمليات" : "Priority Operations Line"}
                    </span>
                    <span className="font-mono text-lg font-bold text-white [html[data-theme=day]_&]:text-[#091a21] group-hover:text-[#c89b3c] transition-colors dir-ltr block mt-0.5">
                      {siteConfig.phone}
                    </span>
                  </div>
                  <Icon name="arrow-up-right" size={18} className="text-white/40 group-hover:text-[#c89b3c] transition-colors" />
                </a>

                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 flex items-center justify-between group"
                >
                  <div>
                    <span className="font-mono text-[11px] text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] uppercase tracking-wider font-bold block">
                      {isAr ? "مكتب واتساب للعمليات الفورية" : "Direct WhatsApp Dispatch Desk"}
                    </span>
                    <span className="font-mono text-lg font-bold text-white [html[data-theme=day]_&]:text-[#091a21] group-hover:text-[#c89b3c] transition-colors dir-ltr block mt-0.5">
                      {siteConfig.phone}
                    </span>
                  </div>
                  <Icon name="arrow-up-right" size={18} className="text-[#c89b3c]" />
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="py-4 flex items-center justify-between group"
                >
                  <div>
                    <span className="font-mono text-[11px] text-white/50 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-wider block">
                      {isAr ? "البريد الرسمي لإيداع المستندات" : "Direct Manifest & Brokerage Email"}
                    </span>
                    <span className="font-mono text-base font-bold text-white [html[data-theme=day]_&]:text-[#091a21] group-hover:text-[#c89b3c] transition-colors dir-ltr block mt-0.5">
                      {siteConfig.email}
                    </span>
                  </div>
                  <Icon name="arrow-up-right" size={18} className="text-white/40 group-hover:text-[#c89b3c] transition-colors" />
                </a>
              </div>
            </div>

            {/* Open Editorial Regional Stations */}
            <div className="space-y-6">
              <div className="border-b border-white/12 [html[data-theme=day]_&]:border-black/12 pb-3">
                <span className="font-mono text-xs font-bold text-white/60 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-[0.18em]">
                  {isAr ? "المراكز التشغيلية المرخصة" : "LICENSED REGIONAL DESKS"}
                </span>
              </div>

              <div className="space-y-6">
                {/* Station 01: Amman HQ */}
                <div className="grid grid-cols-12 gap-4 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 pb-6">
                  <div className="col-span-3">
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] leading-none block">
                      01
                    </span>
                    <span className="font-mono text-[10px] text-white/45 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-widest mt-1 block">
                      LIC #412
                    </span>
                  </div>
                  <div className="col-span-9 space-y-1.5">
                    <h4 className="font-display font-bold text-lg text-white [html[data-theme=day]_&]:text-[#091a21]">
                      {isAr ? "عمّان · المقر الرئيسي" : "Amman · Commercial HQ"}
                    </h4>
                    <p className="text-sm text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                      {isAr
                        ? "شارع الملك حسين، مجمع المدينة التجاري، عمّان"
                        : "King Hussein Street, Al-Madina Center, Amman"}
                    </p>
                    <span className="font-mono text-xs text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block pt-1">
                      {isAr ? "السبت – الخميس: ٠٨:٣٠ – ١٧:٣٠" : "Sat–Thu: 08:30 – 17:30"}
                    </span>
                  </div>
                </div>

                {/* Station 02: Aqaba Maritime */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] leading-none block">
                      02
                    </span>
                    <span className="font-mono text-[10px] text-white/45 [html[data-theme=day]_&]:text-[#2d5661] uppercase tracking-widest mt-1 block">
                      24/7 ACT
                    </span>
                  </div>
                  <div className="col-span-9 space-y-1.5">
                    <h4 className="font-display font-bold text-lg text-white [html[data-theme=day]_&]:text-[#091a21]">
                      {isAr ? "العقبة · رصيف الميناء (ACT)" : "Aqaba · Quayside Berth ACT"}
                    </h4>
                    <p className="text-sm text-white/65 [html[data-theme=day]_&]:text-[#2d5661] leading-relaxed">
                      {isAr
                        ? "محطة حاويات ميناء العقبة، مجمع الملاحة والجمارك"
                        : "Aqaba Container Terminal, Port Customs Complex"}
                    </p>
                    <span className="font-mono text-xs text-white/45 [html[data-theme=day]_&]:text-[#2d5661] block pt-1">
                      {isAr ? "عمليات الميدان: على مدار الساعة" : "Field Operations: 24/7/365"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
