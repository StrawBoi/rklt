import React from "react";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { BrandLogo } from "./BrandLogo";
import { Nav } from "./Nav";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";

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
    <header className="sticky top-0 z-40 w-full bg-ink-900/95 backdrop-blur-md border-b border-ink-700/60 transition-all">
      <Container className="flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <BrandLogo locale={locale} />

        {/* Center / Desktop Nav */}
        <Nav locale={locale} />

        {/* Actions: Language Toggle + WhatsApp button */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle currentLocale={locale} />
          <Button
            href={whatsappUrl}
            external
            variant="primary"
            size="sm"
            icon={<Icon name="whatsapp" size={16} />}
            iconPosition="left"
          >
            {locale === "ar" ? "تواصل معنا" : "Start Conversation"}
          </Button>
        </div>

        {/* Mobile Nav Button */}
        <MobileNav locale={locale} />
      </Container>
    </header>
  );
};
