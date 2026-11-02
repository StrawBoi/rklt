import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";

const BASE_URL = "https://rklt.ltd";

interface PageSeoOptions {
  locale: Locale;
  path: string; // e.g. "", "/services", "/corridors", "/about", "/tracking", "/contact"
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keywordsEn?: string[];
  keywordsAr?: string[];
}

const DEFAULT_KEYWORDS_EN = [
  "RKLT",
  "Rubu Al-Khair",
  "Rami Kalouti Logistics",
  "Jordan freight forwarder",
  "Aqaba customs clearance",
  "Jordan Customs License 412",
  "Port of Aqaba container transport",
  "Aqaba Container Terminal ACT logistics",
  "Amman customs broker",
  "Queen Alia Airport air cargo AMM",
  "Jordan to Saudi Arabia trucking",
  "Al-Omari Al-Haditha border clearance",
  "Jordan to Iraq bonded transit Karameh Trebil",
  "Zarqa Free Zone logistics",
  "cold chain reefer transport Jordan",
];

const DEFAULT_KEYWORDS_AR = [
  "ربوع الخير لنقل وشحن البضائع",
  "رامي كلوتي",
  "RKLT",
  "تخليص جمركي العقبة",
  "شركة شحن في الأردن",
  "تخليص جمركي عمّان",
  "ترخيص جمركي 412",
  "ميناء العقبة شحن حاويات",
  "محطة حاويات العقبة ACT",
  "شحن بري للسعودية والعراق",
  "حدود العمري الحديثة",
  "حدود الكرامة طريبيل",
  "الشحن الجوي مطار الملكة علياء",
  "المنطقة الحرة الزرقاء",
  "نقل مبرد الأردن",
];

export function buildPageMetadata({
  locale,
  path,
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  keywordsEn = [],
  keywordsAr = [],
}: PageSeoOptions): Metadata {
  const isAr = locale === "ar";
  const cleanPath = path === "/" ? "" : path;
  const canonicalUrl = `${BASE_URL}/${locale}${cleanPath}`;
  const title = isAr ? titleAr : titleEn;
  const description = isAr ? descriptionAr : descriptionEn;
  const keywords = isAr
    ? [...DEFAULT_KEYWORDS_AR, ...keywordsAr]
    : [...DEFAULT_KEYWORDS_EN, ...keywordsEn];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Ahmed Mostafa", url: "https://www.linkedin.com/in/ahmed-mmostafa/" }],
    creator: "Ahmed Mostafa (https://www.linkedin.com/in/ahmed-mmostafa/)",
    publisher: "RKLT",
    category: "Logistics & Customs Brokerage",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-JO": `${BASE_URL}/en${cleanPath}`,
        "ar-JO": `${BASE_URL}/ar${cleanPath}`,
        en: `${BASE_URL}/en${cleanPath}`,
        ar: `${BASE_URL}/ar${cleanPath}`,
        "x-default": `${BASE_URL}/en${cleanPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: isAr ? "ربوع الخير لنقل وشحن البضائع (RKLT)" : "RKLT Freight & Customs Logistics",
      images: [
        {
          url: `${BASE_URL}/assets/rklt-visual-board.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isAr ? "ar_JO" : "en_US",
      alternateLocale: isAr ? ["en_US"] : ["ar_JO"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/assets/rklt-visual-board.jpg`],
    },
    other: {
      "geo.region": "JO",
      "geo.placename": "Amman, Aqaba, Jordan",
      "geo.position": "31.9539;35.9106",
      ICBM: "31.9539, 35.9106",
    },
  };
}
