import { Locale } from "@/lib/i18n";
import { siteConfig } from "./site";
import { homeContentEn } from "./en/home";
import { homeContentAr } from "./ar/home";
import { servicesContentEn } from "./en/services";
import { servicesContentAr } from "./ar/services";
import { aboutContentEn } from "./en/about";
import { aboutContentAr } from "./ar/about";
import { contactContentEn } from "./en/contact";
import { contactContentAr } from "./ar/contact";

export function getDictionary(locale: Locale) {
  const isAr = locale === "ar";
  return {
    site: siteConfig,
    home: isAr ? homeContentAr : homeContentEn,
    services: isAr ? servicesContentAr : servicesContentEn,
    about: isAr ? aboutContentAr : aboutContentEn,
    contact: isAr ? contactContentAr : contactContentEn,
  };
}

export type Dictionary = ReturnType<typeof getDictionary>;
