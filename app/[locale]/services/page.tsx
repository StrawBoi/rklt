import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesCore } from "@/components/sections/services/ServicesCore";
import { ServicesExtended } from "@/components/sections/services/ServicesExtended";
import { ServicesAdvisory } from "@/components/sections/services/ServicesAdvisory";
import { CTABand } from "@/components/layout/CTABand";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr
      ? "خدمات الشحن واللوجستيات | ربوع الخير (RKLT)"
      : "Freight & Logistics Services | RKLT",
    description: isAr
      ? "خدمات الشحن البحري، الجوي، والبري، والتخليص الجمركي في الأردن والشرق الأوسط والعالم."
      : "Full ocean, air, and overland freight forwarding, customs clearance, and specialized logistics by RKLT.",
  };
}

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <>
      <ServicesHero locale={locale} />
      <ServicesCore locale={locale} />
      <ServicesExtended locale={locale} />
      <ServicesAdvisory locale={locale} />
      <CTABand locale={locale} tone="darker" />
    </>
  );
}
