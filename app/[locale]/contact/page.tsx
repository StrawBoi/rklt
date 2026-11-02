import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { OperationsDeskConsole } from "@/components/sections/contact/OperationsDeskConsole";
import { QuotePrepGuide } from "@/components/sections/contact/QuotePrepGuide";
import { OperationalFAQ } from "@/components/sections/contact/OperationalFAQ";
import { CTABand } from "@/components/layout/CTABand";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr
      ? "اتصل بنا | ربوع الخير لنقل وشحن البضائع (RKLT)"
      : "Contact Us | RKLT Freight Operations Desk",
    description: isAr
      ? "تواصل مباشرة مع فريق إدارة الشحن والعمليات اللوجستية في الأردن عبر واتساب، الهاتف، أو البريد الإلكتروني."
      : "Connect directly with RKLT freight operations in Amman and Aqaba via WhatsApp, telephone, or email.",
  };
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <main className="rklt-contact-page min-h-screen transition-colors duration-300">
      {/* Editorial Page Hero */}
      <ContactHero locale={locale} />

      {/* Tier 1: Direct Operations Desk Console */}
      <OperationsDeskConsole locale={locale} />

      {/* Tier 2: Quote Preparation & Cargo Checklist */}
      <QuotePrepGuide locale={locale} />

      {/* Tier 3: Operational Protocol FAQ */}
      <OperationalFAQ locale={locale} />

      {/* Executive Mandate CTA Band */}
      <CTABand locale={locale} tone="darker" />
    </main>
  );
}
