import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactCTATier } from "@/components/sections/contact/ContactCTATier";
import { HubsAndHours } from "@/components/sections/contact/HubsAndHours";
import { FullCoverageList } from "@/components/sections/contact/FullCoverageList";
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
    <>
      <ContactHero locale={locale} />
      <ContactCTATier locale={locale} />
      <HubsAndHours locale={locale} />
      <FullCoverageList locale={locale} />
      <QuotePrepGuide locale={locale} />
      <OperationalFAQ locale={locale} />
      <CTABand locale={locale} tone="darker" />
    </>
  );
}
