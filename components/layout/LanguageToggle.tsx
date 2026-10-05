"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface LanguageToggleProps {
  currentLocale: Locale;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLocale,
  className,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const targetLocale: Locale = currentLocale === "en" ? "ar" : "en";
  const label = targetLocale === "ar" ? "العربية" : "English";

  const handleToggle = () => {
    const nextPath = switchLocalePath(pathname || `/${currentLocale}`, targetLocale);
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
    try {
      localStorage.setItem("NEXT_LOCALE", targetLocale);
    } catch {
      // ignore
    }
    router.push(nextPath);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border border-sand-300/30 text-sand-100 hover:border-terracotta-500 hover:text-terracotta-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue-400",
        currentLocale === "ar" ? "font-sans" : "font-arabic",
        className
      )}
      aria-label={`Switch language to ${label}`}
    >
      <span>{label}</span>
    </button>
  );
};
