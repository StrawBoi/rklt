import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { BrandLogo } from "./BrandLogo";
import { Nav } from "./Nav";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { HeaderShell } from "./HeaderShell";

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    locale === "ar"
      ? siteConfig.whatsappDefaultMsgAr
      : siteConfig.whatsappDefaultMsgEn
  )}`;

  return (
    <HeaderShell>
      <div className="rklt-header-plate">
        <div className="rklt-header-start">
          <BrandLogo locale={locale} className="rklt-header-logo" />
          <Nav locale={locale} group="start" />
        </div>
        <div className="rklt-header-end">
          <Nav locale={locale} group="end" />
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle currentLocale={locale} />
            <ThemeToggle locale={locale} />
            <span className="rklt-header-cta ms-2">
              <Button
                href={whatsappUrl}
                external
                variant="primary"
                size="sm"
                icon={<Icon name="whatsapp" size={16} />}
                iconPosition="left"
                className="text-navy-950"
              >
                {locale === "ar" ? "تواصل معنا" : "Start Conversation"}
              </Button>
            </span>
          </div>
          <MobileNav locale={locale} />
        </div>
      </div>
    </HeaderShell>
  );
};
