import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale, isRtl, Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleHtmlAttributes } from "@/components/layout/LocaleHtmlAttributes";
import { PageTransitionCurtain } from "@/components/layout/PageTransitionCurtain";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  return buildPageMetadata({
    locale,
    path: "",
    titleEn: "RKLT | Maritime, Air & Land Freight Logistics · Jordan Customs License #412",
    titleAr: "ربوع الخير لنقل وشحن البضائع | RKLT · شحن بحري وجوي وبري وتخليص جمركي بالأردن",
    descriptionEn:
      "RKLT (Rubu' Al-Khair). 30+ years of licensed sea, air, and land freight forwarding and customs clearance (#412) at Port of Aqaba, Amman, QAIA, and GCC/Iraq corridors.",
    descriptionAr:
      "ربوع الخير لنقل وشحن البضائع (RKLT). خبرة تتجاوز 30 عاماً في الشحن البحري والجوي والبري والتخليص الجمركي المرخص (412) في ميناء العقبة وعمّان والمنطقة الحرة والخليج.",
  });
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
      <JsonLd locale={locale} />
      <PageTransitionCurtain locale={locale} />
      <Header locale={locale} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
