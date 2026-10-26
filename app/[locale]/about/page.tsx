import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { StoryNarrative } from "@/components/sections/about/StoryNarrative";
import { ValuesExpanded } from "@/components/sections/about/ValuesExpanded";
import { TimelineSection } from "@/components/sections/about/TimelineSection";
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
      : "About Us | RKLT. 30+ Years Logistics Heritage",
    description: isAr
      ? "قصة شركة ربوع الخير لنقل وشحن البضائع، وقيمها المهنية وتاريخها الممتد لأكثر من 30 عاماً في الأردن."
      : "The heritage, values, and three decades of logistics mastery of RKLT (Rubu' Al-Khair) in Jordan and worldwide.",
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
      <StoryNarrative locale={locale} />
      <ValuesExpanded locale={locale} />
      <TimelineSection locale={locale} />
      <CredentialsModule locale={locale} />
      <CTABand locale={locale} tone="darker" />
    </>
  );
}
