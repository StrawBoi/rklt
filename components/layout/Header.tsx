"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { BrandLogo } from "./BrandLogo";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { HeaderShell } from "./HeaderShell";
import { cn } from "@/lib/cn";

interface HeaderProps {
  locale: Locale;
}

type MegaTabKey = "services" | "corridors" | "about" | null;

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const pathname = usePathname();
  const [activeMega, setActiveMega] = useState<MegaTabKey>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isAr ? siteConfig.whatsappDefaultMsgAr : siteConfig.whatsappDefaultMsgEn
  )}`;

  // Close mega menu on route change
  useEffect(() => {
    setActiveMega(null);
  }, [pathname]);

  const handleOpenMega = (key: MegaTabKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMega(key);
  };

  const handleCloseMegaDelayed = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 160);
  };

  const isActiveRoute = (href: string, exact = false) => {
    if (!pathname) return false;
    if (exact) return pathname === href || pathname === `${href}/`;
    return pathname.startsWith(href);
  };

  return (
    <HeaderShell>
      <div
        className="rklt-floating-nav-wrap"
        onMouseLeave={handleCloseMegaDelayed}
      >
        {/* ===================================================================
            FLOATING ROUNDED NAV BAR CONTAINER (8PX PADDING, TRANSLUCENT BLUR)
            =================================================================== */}
        <div
          className={cn(
            "rklt-header-plate",
            activeMega && "is-mega-open"
          )}
        >
          {/* Left / Start Cluster */}
          <div className="rklt-header-start">
            <div className="rklt-nav-logo-pill">
              <BrandLogo locale={locale} className="rklt-header-logo" />
            </div>

            <nav
              className="hidden md:flex items-center gap-1"
              aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}
            >
              {/* Home */}
              <Link
                href={`/${locale}`}
                onMouseEnter={() => handleOpenMega(null)}
                className={cn(
                  "rklt-nav-pill-item",
                  isActiveRoute(`/${locale}`, true) && "is-active"
                )}
              >
                <span>{isAr ? "الرئيسية" : "Home"}</span>
              </Link>

              {/* Services (Mega Menu Trigger) */}
              <Link
                href={`/${locale}/services`}
                onMouseEnter={() => handleOpenMega("services")}
                onFocus={() => handleOpenMega("services")}
                aria-expanded={activeMega === "services"}
                className={cn(
                  "rklt-nav-pill-item has-mega",
                  (isActiveRoute(`/${locale}/services`) || activeMega === "services") && "is-active"
                )}
              >
                <span>{isAr ? "الخدمات" : "Services"}</span>
                <svg
                  className={cn(
                    "w-3.5 h-3.5 opacity-60 transition-transform duration-300",
                    activeMega === "services" && "rotate-180 opacity-100 text-[#e2b34a]"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* Corridors (Mega Menu Trigger) */}
              <Link
                href={`/${locale}/corridors`}
                onMouseEnter={() => handleOpenMega("corridors")}
                onFocus={() => handleOpenMega("corridors")}
                aria-expanded={activeMega === "corridors"}
                className={cn(
                  "rklt-nav-pill-item has-mega",
                  (isActiveRoute(`/${locale}/corridors`) || activeMega === "corridors") && "is-active"
                )}
              >
                <span>{isAr ? "المسارات والحدود" : "Corridors"}</span>
                <svg
                  className={cn(
                    "w-3.5 h-3.5 opacity-60 transition-transform duration-300",
                    activeMega === "corridors" && "rotate-180 opacity-100 text-[#e2b34a]"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* About (Mega Menu Trigger) */}
              <Link
                href={`/${locale}/about`}
                onMouseEnter={() => handleOpenMega("about")}
                onFocus={() => handleOpenMega("about")}
                aria-expanded={activeMega === "about"}
                className={cn(
                  "rklt-nav-pill-item has-mega",
                  (isActiveRoute(`/${locale}/about`) || activeMega === "about") && "is-active"
                )}
              >
                <span>{isAr ? "من نحن" : "Company"}</span>
                <svg
                  className={cn(
                    "w-3.5 h-3.5 opacity-60 transition-transform duration-300",
                    activeMega === "about" && "rotate-180 opacity-100 text-[#e2b34a]"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* Tracking */}
              <Link
                href={`/${locale}/tracking`}
                onMouseEnter={() => handleOpenMega(null)}
                className={cn(
                  "rklt-nav-pill-item",
                  isActiveRoute(`/${locale}/tracking`) && "is-active"
                )}
              >
                <span>{isAr ? "تتبع الشحنات" : "Tracking"}</span>
              </Link>

              {/* Contact */}
              <Link
                href={`/${locale}/contact`}
                onMouseEnter={() => handleOpenMega(null)}
                className={cn(
                  "rklt-nav-pill-item",
                  isActiveRoute(`/${locale}/contact`) && "is-active"
                )}
              >
                <span>{isAr ? "اتصل بنا" : "Contact"}</span>
              </Link>
            </nav>
          </div>

          {/* Right / End Cluster */}
          <div className="rklt-header-end">
            <div className="hidden md:flex items-center gap-1.5">
              <LanguageToggle currentLocale={locale} />
              <ThemeToggle locale={locale} />
              <span className="rklt-header-cta ms-1.5">
                <Button
                  href={whatsappUrl}
                  external
                  variant="primary"
                  size="sm"
                  icon={<Icon name="whatsapp" size={15} />}
                  iconPosition="left"
                  className="text-navy-950 !rounded-[6px] font-bold"
                >
                  {isAr ? "تواصل معنا" : "Start Conversation"}
                </Button>
              </span>
            </div>
            <MobileNav locale={locale} />
          </div>
        </div>

        {/* ===================================================================
            FLUSH-WIDTH MULTI-COLUMN MEGA MENU PANEL (NESTED ROUNDED CORNERS)
            =================================================================== */}
        <div
          onMouseEnter={() => {
            if (closeTimerRef.current) {
              clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }
          }}
          className={cn(
            "rklt-mega-menu-panel",
            activeMega ? "is-open" : "is-closed"
          )}
          aria-hidden={!activeMega}
        >
          <div className="rklt-mega-menu-inner">
            {/* ---------------------------------------------------------------
                MEGA MENU 1: SERVICES (4 COLUMNS)
                --------------------------------------------------------------- */}
            {activeMega === "services" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Col 1 (3 cols): International Freight */}
                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">01</span>
                    <span>{isAr ? "الشحن الدولي" : "INTERNATIONAL FREIGHT"}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Link href={`/${locale}/services#sea`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "الشحن البحري (ميناء العقبة)" : "Sea Freight · Port of Aqaba"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "حاويات كاملة FCL ومجزأة LCL عبر محطة حاويات العقبة ACT" : "FCL, LCL & breakbulk operations at Aqaba Container Terminal"}
                      </p>
                    </Link>
                    <Link href={`/${locale}/services#air`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "الشحن الجوي (مطار الملكة علياء)" : "Air Freight · QAIA (AMM)"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "شحن جوي سريع ومناولة أرضية مباشرة على مدار الساعة" : "Time-critical IATA air cargo & apron clearance"}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Col 2 (3 cols): Regional & Cross-Border */}
                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">02</span>
                    <span>{isAr ? "العمليات الإقليمية والجمركية" : "REGIONAL & BROKERAGE"}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Link href={`/${locale}/services#land`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "النقل البري والترانزيت" : "Overland & Bonded Fleet"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "أسطول شاحنات ثقيلة إلى السعودية والعراق والخليج" : "Direct FTL/LTL trucking across Jordan, KSA, Iraq & GCC"}
                      </p>
                    </Link>
                    <Link href={`/${locale}/services#customs`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "التخليص الجمركي (#٤١٢)" : "Customs Clearance (#412)"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "تمثيل جمركي مرخص عبر نظام أسيكودا العالمي" : "Statutory ASYCUDA World valuation & tariff classification"}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Col 3 (3 cols): Specialized Capabilities */}
                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">03</span>
                    <span>{isAr ? "القدرات المتخصصة" : "SPECIALIZED SOLUTIONS"}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Link href={`/${locale}/services#reefer`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "سلاسل التبريد والمجمدات" : "Cold Chain & Reefer"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "نقل مبرد للأدوية والأغذية (-٢٥° إلى +١٥° مئوية)" : "Thermal-monitored logistics (-25°C to +15°C) for pharma & food"}
                      </p>
                    </Link>
                    <Link href={`/${locale}/services#project`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "شحن المشاريع والحمولات الثقيلة" : "Project & Heavy Lift Cargo"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "لوبوي، مرافقة أمنية، ومعدات الطاقة والبنية التحتية" : "Out-of-gauge (OOG), lowbed convoys & industrial machinery"}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Col 4 (3 cols): Featured Operations Card */}
                <div className="lg:col-span-3 rklt-mega-feature-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#e2b34a]/20 text-[#e2b34a] font-bold">
                      {isAr ? "ترخيص جمركي #٤١٢" : "LICENSE #412 · ACTIVE"}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h4 className="font-display font-bold text-base mb-1.5">
                    {isAr ? "مكتب عمليات العقبة وعمّان" : "Aqaba & Amman Dispatch"}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed mb-4">
                    {isAr
                      ? "تخليص مسبق قبل وصول الباخرة بـ ٤٨ ساعة لتجنب الغرامات والأرضيات."
                      : "48-hour pre-arrival manifest clearance at Aqaba Container Terminal with zero demurrage."}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-current/10">
                    <Link
                      href={`/${locale}/services`}
                      className="text-xs font-mono font-bold text-[#e2b34a] hover:underline"
                    >
                      {isAr ? "استعرض كافة الخدمات ←" : "Full Services Catalog →"}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                MEGA MENU 2: CORRIDORS & BORDERS (4 COLUMNS)
                --------------------------------------------------------------- */}
            {activeMega === "corridors" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">COR-01</span>
                    <span>{isAr ? "الشريان البحري الوطني" : "MARITIME ARTERY"}</span>
                  </div>
                  <Link href={`/${locale}/corridors#maritime-aqaba`} className="rklt-mega-link group mt-3 block">
                    <div className="rklt-mega-link-title">
                      <span>{isAr ? "العقبة ← عمّان والمناطق الحرة" : "Aqaba Port → Amman & Zarqa"}</span>
                      <span className="rklt-mega-arrow">→</span>
                    </div>
                    <p className="rklt-mega-link-sub">
                      {isAr ? "٣٣٥ كم · ٤–٦ ساعات · قوافل يومية بالرصاص الجمركي" : "335 KM · 4–6 Hours SLA · Daily bonded convoys via Highway 15"}
                    </p>
                  </Link>
                </div>

                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">COR-02</span>
                    <span>{isAr ? "ممر الخليج والسعودية" : "GCC & KSA OVERLAND"}</span>
                  </div>
                  <Link href={`/${locale}/corridors#gcc-artery`} className="rklt-mega-link group mt-3 block">
                    <div className="rklt-mega-link-title">
                      <span>{isAr ? "الأردن ← السعودية والإمارات" : "Amman → Riyadh, Dammam & Dubai"}</span>
                      <span className="rklt-mega-arrow">→</span>
                    </div>
                    <p className="rklt-mega-link-sub">
                      {isAr ? "معبر العمري / الحديثة · مطابقة سابر و SASO · ٤٨–٧٢ ساعة" : "Via Al-Omari / Al-Haditha border · Saber/SASO compliant · 48–72h"}
                    </p>
                  </Link>
                </div>

                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">COR-03</span>
                    <span>{isAr ? "بوابة العراق والمشرق" : "LEVANT & IRAQ GATEWAY"}</span>
                  </div>
                  <Link href={`/${locale}/corridors#iraq-gateway`} className="rklt-mega-link group mt-3 block">
                    <div className="rklt-mega-link-title">
                      <span>{isAr ? "الأردن ← بغداد وأربيل" : "Jordan → Baghdad & Erbil"}</span>
                      <span className="rklt-mega-arrow">→</span>
                    </div>
                    <p className="rklt-mega-link-sub">
                      {isAr ? "معبر الكرامة / طريبيل · ترانزيت معلق مؤمّن · ٢٤–٣٦ ساعة" : "Via Karameh / Trebil border plaza · Bonded security · 24–36h"}
                    </p>
                  </Link>
                </div>

                <div className="lg:col-span-3 rklt-mega-feature-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#e2b34a]/20 text-[#e2b34a] font-bold">
                      {isAr ? "حالة المنافذ الحدودية" : "BORDER STATUS · LIVE"}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h4 className="font-display font-bold text-base mb-1.5">
                    {isAr ? "دليل المنافذ والعبور الإقليمي" : "Regional Border Protocols"}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed mb-4">
                    {isAr
                      ? "تغطية ميدانية في العقبة، العمري، الكرامة، جابر، والمنطقة الحرة بالزرقاء."
                      : "Direct customs representation at ACT Aqaba, Al-Omari, Karameh/Trebil, Jaber, and Zarqa Free Zone."}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-current/10">
                    <Link
                      href={`/${locale}/corridors`}
                      className="text-xs font-mono font-bold text-[#e2b34a] hover:underline"
                    >
                      {isAr ? "خريطة المسارات الكاملة ←" : "Explore All Corridors →"}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------
                MEGA MENU 3: COMPANY / ABOUT (4 COLUMNS)
                --------------------------------------------------------------- */}
            {activeMega === "about" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">EST. 1994</span>
                    <span>{isAr ? "الإرث المؤسسي" : "HERITAGE & GOVERNANCE"}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Link href={`/${locale}/about`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "قصة ربوع الخير (RKLT)" : "30+ Years of Custody"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "ثلاثة عقود من الموثوقية في النقل والتخليص الجمركي في الأردن" : "Three decades of family-led operational discipline in Jordan"}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">LIC #412</span>
                    <span>{isAr ? "التراخيص والاعتمادات" : "STATUTORY CREDENTIALS"}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Link href={`/${locale}/about#credentials`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "الاعتمادات الرسمية" : "Official Licenses & Memberships"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "دائرة الجمارك الأردنية (#٤١٢)، نقابة أصحاب شركات التخليص، و FIATA" : "Jordan Customs License #412, JLA & FIATA freight standards"}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-3 rklt-mega-col-card">
                  <div className="rklt-mega-col-header">
                    <span className="rklt-mega-badge">HUBS</span>
                    <span>{isAr ? "المقرات الميدانية" : "JORDAN OPERATIONS"}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Link href={`/${locale}/contact`} className="rklt-mega-link group">
                      <div className="rklt-mega-link-title">
                        <span>{isAr ? "مكاتب عمّان والعقبة" : "Amman HQ & Aqaba Port"}</span>
                        <span className="rklt-mega-arrow">→</span>
                      </div>
                      <p className="rklt-mega-link-sub">
                        {isAr ? "فرق ميدانية دائمة في المقر الرئيسي بعمّان وبوابة ميناء العقبة" : "Direct field offices at Amman 7th Circle & Port of Aqaba"}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-3 rklt-mega-feature-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#e2b34a]/20 text-[#e2b34a] font-bold">
                      {isAr ? "متابعة مباشرة" : "LIVE TELEMETRY"}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base mb-1.5">
                    {isAr ? "بوابة تتبع الشحنات" : "Consignment Tracking Portal"}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed mb-4">
                    {isAr
                      ? "تتبع حالة البيان الجمركي وموقع الشاحنة خطوة بخطوة."
                      : "Check real-time customs manifest clearance and convoy GPS checkpoints."}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-current/10">
                    <Link
                      href={`/${locale}/tracking`}
                      className="text-xs font-mono font-bold text-[#e2b34a] hover:underline"
                    >
                      {isAr ? "افتح بوابة التتبع ←" : "Open Tracking Terminal →"}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderShell>
  );
};
