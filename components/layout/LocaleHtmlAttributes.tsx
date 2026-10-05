"use client";

import { useEffect } from "react";
import { Locale, isRtl } from "@/lib/i18n";

export function LocaleHtmlAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
