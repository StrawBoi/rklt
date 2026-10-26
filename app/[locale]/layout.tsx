import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale, isRtl, Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleHtmlAttributes } from "@/components/layout/LocaleHtmlAttributes";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "ربوع الخير لنقل وشحن البضائع | RKLT. أميال لا تُحصى. ابتسامات لا تُعد."
      : "RKLT | Maritime, Air & Land Freight Logistics. Million of miles. Million of smiles.",
    description: isAr
      ? "ربوع الخير لنقل وشحن البضائع. خبرة تتجاوز 30 عاماً في الشحن البحري والجوي والبري، والتخليص الجمركي في العقبة وعمّان وحول العالم."
      : "RKLT (Rubu' Al-Khair). 30+ years of dependable sea, air, and land freight forwarding and customs clearance across Jordan and global trade routes.",
    alternates: {
      canonical: `https://rklt.ltd/${locale}`,
      languages: {
        en: "https://rklt.ltd/en",
        ar: "https://rklt.ltd/ar",
      },
    },
    openGraph: {
      title: isAr
        ? "ربوع الخير لنقل وشحن البضائع | RKLT"
        : "RKLT | Freight Forwarding & Logistics",
      description: isAr
        ? "أكثر من 30 عاماً من الريادة في الشحن البحري والبري والجوي والتخليص الجمركي."
        : "Over 30 years of dependable sea, air, and land freight forwarding and customs clearance in Jordan.",
      url: `https://rklt.ltd/${locale}`,
      siteName: "RKLT",
      images: [
        {
          url: "/assets/rklt-visual-board.jpg",
          width: 1200,
          height: 630,
          alt: "RKLT Freight Forwarding",
        },
      ],
      locale: isAr ? "ar_JO" : "en_US",
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={dir} className="flex-1 flex flex-col w-full">
      <LocaleHtmlAttributes locale={locale} />
      <Header locale={locale} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
