import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/primitives/Container";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "@/components/primitives/Icon";
import { Divider } from "@/components/primitives/Divider";

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
    <footer className="bg-ink-950 text-sand-100 border-t border-ink-800 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo locale={locale} variant="footer" />
            <p className="text-sm text-sand-300/80 max-w-sm pt-2 leading-relaxed">
              {isArabic
                ? "ربوع الخير لنقل وشحن البضائع. خبرة تتجاوز 30 عاماً في خدمات الشحن البحري، الجوي، والبري، والتخليص الجمركي في الأردن والشرق الأوسط والعالم."
                : "Rubu' Al-Khair for Transport & Shipping (RKLT). Over 30 years of dependable sea, air, and land freight forwarding and customs operations across Jordan, the Levant, and international routes."}
            </p>
            <div className="pt-2">
              <span className="font-numeral text-2xl text-gold font-bold">
                {siteConfig.yearsExperience}
              </span>
              <span className="text-xs text-sand-300 ml-2 rtl:ml-0 rtl:mr-2 uppercase tracking-wider">
                {isArabic ? "عاماً من الخبرة والالتزام" : "Years of Operational Heritage"}
              </span>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-eyebrow text-gold">
              {isArabic ? "خدمات الشحن" : "Freight Services"}
            </h4>
            <ul className="space-y-2 text-sm text-sand-100/80">
              <li>
                <Link
                  href={`/${locale}/services#sea`}
                  className="hover:text-gold transition-colors"
                >
                  {isArabic ? "الشحن البحري" : "Sea Freight"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#air`}
                  className="hover:text-gold transition-colors"
                >
                  {isArabic ? "الشحن الجوي" : "Air Freight"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#land`}
                  className="hover:text-gold transition-colors"
                >
                  {isArabic ? "الشحن البري" : "In-Land Transport"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#customs`}
                  className="hover:text-gold transition-colors"
                >
                  {isArabic ? "التخليص الجمركي" : "Customs Clearance"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services#extended`}
                  className="text-xs text-gold hover:underline inline-flex items-center gap-1"
                >
                  <span>{isArabic ? "القدرات الموسعة (9 خدمات)" : "Extended Capabilities (9)"}</span>
                  <span className="rtl-flip">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-eyebrow text-gold">
              {isArabic ? "التواصل المباشر" : "Direct Contact"}
            </h4>
            <ul className="space-y-2.5 text-sm text-sand-100/80">
              <li className="flex items-center gap-2.5">
                <Icon name="phone" size={16} className="text-gold" />
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="hover:text-gold transition-colors font-medium dir-ltr"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="whatsapp" size={16} className="text-gold" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors font-medium"
                >
                  WhatsApp: {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" size={16} className="text-gold" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-sand-300">
                <Icon name="map-pin" size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? siteConfig.headquarters.addressAr
                    : siteConfig.headquarters.addressEn}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copper Hairline Divider */}
        <Divider variant="copper" className="my-6" />

        {/* Legal & Meta Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-300/70 pt-2">
          <p>
            © {currentYear} {siteConfig.name}.{" "}
            <span className="font-arabic font-semibold">{siteConfig.legalName}</span>.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p className="text-center sm:text-right">
            {isArabic ? siteConfig.arabicTagline : siteConfig.englishTagline}
          </p>
        </div>
      </Container>
    </footer>
  );
};
