import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/primitives/Container";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "@/components/primitives/Icon";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const currentYear = new Date().getFullYear();
  const isArabic = locale === "ar";

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    isArabic ? siteConfig.whatsappDefaultMsgAr : siteConfig.whatsappDefaultMsgEn
  )}`;

  return (
    <footer className="rklt-footer-reveal relative bg-[#040608] text-white border-t border-white/10 [html[data-theme=day]_&]:bg-[#ece6d9] [html[data-theme=day]_&]:text-[#091a21] [html[data-theme=day]_&]:border-black/10 pt-20 pb-12 overflow-hidden transition-colors duration-300">
      {/* Monumental Typographic Watermark in Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[22vw] text-white/[0.02] [html[data-theme=day]_&]:text-black/[0.03] select-none pointer-events-none leading-none tracking-tighter"
        aria-hidden="true"
      >
        RKLT
      </div>

      <Container size="wide" className="relative z-10">
        {/* Top Operational Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-12 border-b border-white/10 [html[data-theme=day]_&]:border-black/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#e2b34a] animate-pulse" />
            <span className="text-white/80 [html[data-theme=day]_&]:text-[#091a21] font-bold uppercase tracking-wider">
              {isArabic
                ? "مكتب العمليات اللوجستية بالعقبة وعمّان: متاح على مدار الساعة (UTC+3)"
                : "AQABA & AMMAN FREIGHT OPERATIONS DESK · 24/7 ACTIVE DISPATCH (UTC+3)"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 [html[data-theme=day]_&]:bg-black/5 [html[data-theme=day]_&]:border-black/10 text-[#e2b34a] font-bold">
            <Icon name="shield-check" size={14} />
            <span>
              {isArabic ? "ترخيص جمركي رسمي رقم ٤١٢" : "JORDAN CUSTOMS BROKERAGE LICENSE #412"}
            </span>
          </div>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo locale={locale} variant="footer" />
            <p className="text-sm text-white/60 [html[data-theme=day]_&]:text-[#2d5661] max-w-sm pt-2 leading-relaxed">
              {isArabic
                ? "ربوع الخير لنقل وشحن البضائع. خبرة تتجاوز 30 عاماً في خدمات الشحن البحري، الجوي، والبري، والتخليص الجمركي المعتمد في الأردن والشرق الأوسط والعالم."
                : "Rubu' Al-Khair for Transport & Shipping (RKLT). Over 30 years of verified sea, air, and land freight forwarding and statutory customs clearance across Jordan, the GCC, and world trade corridors."}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 [html[data-theme=day]_&]:text-emerald-700 [html[data-theme=day]_&]:bg-emerald-50 [html[data-theme=day]_&]:border-emerald-200 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
              >
                <Icon name="whatsapp" size={14} />
                <span>{isArabic ? "مكتب العمليات عبر واتساب" : "WhatsApp Operations"}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-white/5 border border-white/10 [html[data-theme=day]_&]:bg-black/5 [html[data-theme=day]_&]:border-black/10 text-white/80 [html[data-theme=day]_&]:text-[#091a21] text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <Icon name="phone" size={13} />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">
              {isArabic ? "خدمات الشحن" : "Freight Services"}
            </h4>
            <ul className="space-y-2 text-sm text-white/70 [html[data-theme=day]_&]:text-[#2d5661]">
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "الشحن البحري (حاويات)" : "Ocean & Container Freight"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "الشحن الجوي السريع" : "Air Freight Express"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "النقل البري والترانزيت" : "Cross-Border Trucking"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "التخليص الجمركي (ترخيص ٤١٢)" : "Customs Clearance (#412)"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "الشحن المبرد وسلاسل التبريد" : "Reefer & Cold Chain"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Trade Corridors */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">
              {isArabic ? "الممرات اللوجستية" : "Trade Corridors"}
            </h4>
            <ul className="space-y-2 text-sm text-white/70 [html[data-theme=day]_&]:text-[#2d5661]">
              <li>
                <Link href={`/${locale}/corridors`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "ميناء العقبة (ACT)" : "Port of Aqaba (ACT)"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/corridors`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "مطار الملكة علياء (AMM)" : "Queen Alia Cargo (AMM)"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/corridors`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "السعودية والخليج العربي" : "Jordan–Saudi Corridor"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/corridors`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "ترانزيت العراق (الكرامة)" : "Iraq Transit (Karameh)"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/corridors`} className="hover:text-white [html[data-theme=day]_&]:hover:text-[#091a21] transition-colors">
                  {isArabic ? "المنطقة الحرة بالزرقاء" : "Zarqa Free Zone Hub"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e2b34a] [html[data-theme=day]_&]:text-[#a87318]">
              {isArabic ? "المكاتب والعمليات" : "Operations & Licensing"}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70 [html[data-theme=day]_&]:text-[#2d5661]">
              <li className="flex items-center gap-2">
                <Icon name="phone" size={14} className="text-[#e2b34a] flex-shrink-0" />
                <span dir="ltr">{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="mail" size={14} className="text-[#e2b34a] flex-shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-white/50 [html[data-theme=day]_&]:text-[#2d5661]/80">
                <Icon name="map-pin" size={16} className="text-[#e2b34a] flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? siteConfig.headquarters.addressAr
                    : siteConfig.headquarters.addressEn}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline & Legal Row */}
        <div className="pt-8 border-t border-white/10 [html[data-theme=day]_&]:border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 [html[data-theme=day]_&]:text-[#2d5661]/60 font-mono">
          <p>
            © {currentYear}{" "}
            <a
              href="https://www.linkedin.com/in/ahmed-mmostafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 [html[data-theme=day]_&]:text-[#091a21] hover:text-[#e2b34a] [html[data-theme=day]_&]:hover:text-[#a87318] underline underline-offset-4 transition-colors"
            >
              Ahmed Mostafa
            </a>
            . {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/corridors`} className="hover:text-[#e2b34a] transition-colors">
              {isArabic ? "دليل المنافذ والحدود" : "Corridors"}
            </Link>
            <span>·</span>
            <Link href={`/${locale}/tracking`} className="hover:text-[#e2b34a] transition-colors">
              {isArabic ? "تتبع الشحنات" : "Consignment Tracking"}
            </Link>
            <span>·</span>
            <Link href={`/${locale}/contact`} className="hover:text-[#e2b34a] transition-colors">
              {isArabic ? "طلب تسعيرة" : "Request Rate"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
