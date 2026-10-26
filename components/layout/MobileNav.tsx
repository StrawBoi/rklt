"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { siteConfig } from "@/content/site";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  locale: Locale;
}

export const MobileNav: React.FC<MobileNavProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { href: `/${locale}`, label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: `/${locale}/services`, label: locale === "ar" ? "الخدمات" : "Services" },
    { href: `/${locale}/about`, label: locale === "ar" ? "من نحن" : "About" },
    { href: `/${locale}/contact`, label: locale === "ar" ? "اتصل بنا" : "Contact" },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-role-text hover:text-role-action"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <Icon name={isOpen ? "close" : "menu"} size={24} />
      </button>

      {/* Scrim Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink-950/80"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
        <div
        data-rklt-overlay
        className={cn(
          "fixed top-0 bottom-0 z-50 w-4/5 max-w-sm bg-role-overlay text-role-text border-role-line p-6 flex flex-col justify-between transition-transform duration-300",
          locale === "ar"
            ? "right-0 border-l translate-x-full"
            : "left-0 border-r -translate-x-full",
          isOpen && "translate-x-0"
        )}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-role-line">
            <span className="font-display font-extrabold text-2xl text-role-text">
              RKLT
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-role-text hover:text-role-action"
              aria-label="Close menu"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-bold py-2 px-3 rounded",
                    active
                      ? "text-role-text bg-role-panel"
                      : "text-role-text rklt-veil"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-role-line flex items-center justify-between gap-3">
            <span className="text-xs text-role-muted uppercase tracking-wider font-semibold">
              {locale === "ar" ? "اللغة" : "Language"}
            </span>
            <div className="flex items-center gap-2">
              <LanguageToggle currentLocale={locale} />
              <ThemeToggle locale={locale} />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-role-line">
          <Button
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              locale === "ar"
                ? siteConfig.whatsappDefaultMsgAr
                : siteConfig.whatsappDefaultMsgEn
            )}`}
            external
            variant="primary"
            className="w-full justify-center"
            icon={<Icon name="whatsapp" size={18} />}
            iconPosition="left"
          >
            {locale === "ar" ? "محادثة واتساب" : "WhatsApp Chat"}
          </Button>

          <Button
            href={`tel:${siteConfig.phoneClean}`}
            external
            variant="outline"
            surface="dark"
            className="w-full justify-center"
            icon={<Icon name="phone" size={16} />}
            iconPosition="left"
          >
            {siteConfig.phone}
          </Button>
        </div>
      </div>
    </div>
  );
};
