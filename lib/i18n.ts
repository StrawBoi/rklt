export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function isRtl(locale: string): boolean {
  return locale === "ar";
}

export function getLocaleDirection(locale: string): "ltr" | "rtl" {
  return isRtl(locale) ? "rtl" : "ltr";
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  if (!pathname) return `/${targetLocale}`;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${targetLocale}`;
  }
  if (isValidLocale(segments[0])) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }
  return `/${targetLocale}/${segments.join("/")}`;
}
