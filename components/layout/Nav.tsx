"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface NavProps {
  locale: Locale;
  className?: string;
  group?: "start" | "end";
}

export const Nav: React.FC<NavProps> = ({ locale, className, group = "start" }) => {
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
      href: `/${locale}/corridors`,
      label: locale === "ar" ? "المسارات والحدود" : "Corridors",
      exact: false,
    },
    {
      href: `/${locale}/about`,
      label: locale === "ar" ? "من نحن" : "About",
      exact: false,
    },
    {
      href: `/${locale}/tracking`,
      label: locale === "ar" ? "تتبع الشحنات" : "Tracking",
      exact: false,
    },
    {
      href: `/${locale}/contact`,
      label: locale === "ar" ? "اتصل بنا" : "Contact",
      exact: false,
    },
  ];

  const links = group === "start" ? navItems.slice(0, 3) : navItems.slice(3);

  const isActive = (itemHref: string, exact: boolean) => {
    if (!pathname) return false;
    if (exact) {
      return pathname === itemHref || pathname === `${itemHref}/`;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <nav
      className={cn("hidden md:flex h-full items-center gap-8 lg:gap-10", className)}
      aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
    >
      {links.map((item) => {
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex h-full items-center text-[0.9375rem] font-semibold transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue-400 focus-visible:ring-offset-2",
              active ? "text-gold" : "text-sand-100/80 hover:text-sand-100"
            )}
          >
            <span>{item.label}</span>
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-gold origin-center transition-transform duration-500 ease-confident",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
};
