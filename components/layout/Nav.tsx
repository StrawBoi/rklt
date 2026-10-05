"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface NavProps {
  locale: Locale;
  className?: string;
}

export const Nav: React.FC<NavProps> = ({ locale, className }) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: `/${locale}`,
      label: locale === "ar" ? "الرئيسية" : "Home",
      exact: true,
    },
    {
      href: `/${locale}/services`,
      label: locale === "ar" ? "الخدمات" : "Services",
      exact: false,
    },
    {
      href: `/${locale}/about`,
      label: locale === "ar" ? "من نحن" : "About",
      exact: false,
    },
    {
      href: `/${locale}/contact`,
      label: locale === "ar" ? "اتصل بنا" : "Contact",
      exact: false,
    },
  ];

  const isActive = (itemHref: string, exact: boolean) => {
    if (!pathname) return false;
    if (exact) {
      return pathname === itemHref || pathname === `${itemHref}/`;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <nav
      className={cn("hidden md:flex items-center gap-7 lg:gap-9", className)}
      aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
    >
      {navItems.map((item) => {
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative py-2 text-sm font-semibold transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue-400 focus-visible:ring-offset-2",
              active ? "text-terracotta-300" : "text-sand-100/90 hover:text-terracotta-300"
            )}
          >
            <span>{item.label}</span>
            {active ? (
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 bg-terracotta-500 rounded-full"
                aria-hidden="true"
              />
            ) : (
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 bg-terracotta-500/0 scale-x-0 transition-transform duration-200 origin-center group-hover:scale-x-100 group-hover:bg-terracotta-500/60"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
