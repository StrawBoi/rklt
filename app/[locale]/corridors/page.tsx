import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { CTABand } from "@/components/layout/CTABand";
import { CorridorConsole } from "@/components/sections/corridors/CorridorConsole";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = params.locale === "ar";
  return {
    title: isAr
      ? "المنافذ والمسارات الحدودية | ربوع الخير (RKLT)"
      : "Regional Corridors & Border Protocols | RKLT",
    description: isAr
      ? "دليل المنافذ والمسارات الجمركية في الأردن والخليج: ميناء العقبة، منفذ العمري، منفذ الكرامة، ومطار الملكة علياء."
      : "Comprehensive operational directory of regional trade corridors, border crossings, and customs protocols managed by RKLT in Jordan and the GCC.",
  };
}

export default function CorridorsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const isAr = locale === "ar";

  return (
    <main className="rklt-corridors-page min-h-screen transition-colors duration-300">
      {/* 1. Architectural Page Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-role-line overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e2b34a]/[0.04] via-transparent to-transparent pointer-events-none" />

        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
                {isAr
                  ? "دليل المنافذ والحدود والبروتوكولات الجمركية"
                  : "OPERATIONAL BORDER & CORRIDOR DIRECTORY"}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight rklt-corridor-heading">
              {isAr ? (
                <>
                  من أرصفة ميناء العقبة <br />
                  <span className="text-[#e2b34a]">
                    إلى عمق الخليج والمشرق العربي.
                  </span>
                </>
              ) : (
                <>
                  From Aqaba Quayside <br />
                  <span className="text-[#e2b34a]">
                    to the GCC and Levant Corridors.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base md:text-xl leading-relaxed max-w-3xl rklt-corridor-lead">
              {isAr
                ? "دليل تشغيلي متكامل يوضح إجراءات العبور الجمركي، أوقات التخليص، والمتطلبات النظامية عبر المنافذ الحدودية والموانئ والمطارات التي تشغلها ربوع الخير يومياً."
                : "An authoritative operational guide to customs clearance protocols, transit schedules, and statutory documentation across the critical seaports, dry borders, and airports managed by RKLT."}
            </p>

            {/* Quick Metric Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-role-line">
              <div className="space-y-1">
                <span className="font-mono text-xs text-role-muted block">
                  {isAr ? "المنافذ المباشرة" : "Managed Nodes"}
                </span>
                <span className="font-mono text-2xl font-black text-role-text">
                  {isAr ? "٤ منافذ رئيسية" : "4 Primary Hubs"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-role-muted block">
                  {isAr ? "متوسط التخليص الجمركي" : "Clearance Average"}
                </span>
                <span className="font-mono text-2xl font-black text-[#e2b34a]">
                  {isAr ? "< ٢٤ ساعة" : "< 24 Hours"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-role-muted block">
                  {isAr ? "الترخيص الجمركي" : "Customs License"}
                </span>
                <span className="font-mono text-2xl font-black text-role-text">
                  {isAr ? "رقم ٤١٢ مرخص" : "License #412"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-role-muted block">
                  {isAr ? "سلسلة الحفظ الجمركي" : "Custody Model"}
                </span>
                <span className="font-mono text-2xl font-black text-role-text">
                  {isAr ? "١٠٠٪ معتمد" : "100% Bonded"}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Corridor Console Section */}
      <section className="py-20 md:py-28">
        <Container>
          <CorridorConsole locale={locale} />
        </Container>
      </section>

      {/* 3. Executive Mandate CTA */}
      <CTABand locale={locale} tone="darker" />
    </main>
  );
}
