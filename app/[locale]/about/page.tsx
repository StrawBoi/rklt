import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutHeritageTimeline } from "@/components/sections/about/AboutHeritageTimeline";
import { GovernanceBento } from "@/components/sections/about/GovernanceBento";
import { ValuesExpanded } from "@/components/sections/about/ValuesExpanded";
import { CredentialsModule } from "@/components/sections/about/CredentialsModule";
import { CTABand } from "@/components/layout/CTABand";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr
      ? "من نحن | ربوع الخير لنقل وشحن البضائع (RKLT)"
      : "About Us | RKLT Institutional Logistics Standards",
    description: isAr
      ? "البنية التشغيلية المعتمدة لشركة ربوع الخير لنقل وشحن البضائع، وقيمها المهنية وتراخيصها الجمركية في الأردن."
      : "Operational standards, verified customs licenses, and logistics governance of RKLT (Rubu' Al-Khair) in Jordan.",
  };
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <>
      <AboutHero locale={locale} />
      <AboutHeritageTimeline locale={locale} />
      <GovernanceBento locale={locale} />
      <ValuesExpanded locale={locale} />
      <CredentialsModule locale={locale} />
      <CTABand locale={locale} tone="darker" />
    </>
  );
}
