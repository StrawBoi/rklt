import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { CTABand } from "@/components/layout/CTABand";
import { CorridorConsole } from "@/components/sections/corridors/CorridorConsole";
import { CoverageTeaser } from "@/components/sections/home/CoverageTeaser";
import { ServiceCTA } from "@/components/sections/home/ServiceCTA";
import { DepthLayerController } from "@/components/motion/DepthLayerController";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale as Locale,
    path: "/corridors",
    titleEn: "Jordan Trade Corridors & Border Protocols (Aqaba, Al-Omari, Karameh) | RKLT",
    titleAr: "المنافذ والمسارات الحدودية في الأردن والخليج والعراق | ربوع الخير (RKLT)",
    descriptionEn:
      "Operational directory of Jordan trade corridors and border protocols: Port of Aqaba (ACT) to Amman, Al-Omari/Al-Haditha (KSA), Karameh/Trebil (Iraq), and QAIA Air Cargo.",
    descriptionAr:
      "دليل المنافذ والمسارات الجمركية في الأردن والخليج والعراق: ميناء العقبة، منفذ العمري/الحديثة، منفذ الكرامة/طريبيل، المنطقة الحرة بالزرقاء، ومطار الملكة علياء.",
  });
}

export default function CorridorsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const isAr = locale === "ar";

  return (
    <DepthLayerController>
      {/* LAYER 1: Architectural Page Hero with Custom Port Photography */}
      <div data-depth-stratum="1" className="rklt-depth-stratum z-[10]">
        <div data-depth-inner>
          <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#fbf9f4] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 overflow-hidden transition-colors duration-300">
            {/* Full-Bleed Custom Port Corridor Photography (Night & Day) */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              <Image
                src="/assets/hero/corridor/port-night.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-50 scale-[1.01] [html[data-theme=day]_&]:hidden"
              />
              <Image
                src="/assets/hero/corridor/port-day.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="hidden object-cover object-center opacity-35 scale-[1.01] [html[data-theme=day]_&]:block"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b0f]/95 via-[#070b0f]/75 to-[#070b0f]/45 [html[data-theme=day]_&]:from-[#fbf9f4]/95 [html[data-theme=day]_&]:via-[#fbf9f4]/82 [html[data-theme=day]_&]:to-[#fbf9f4]/50" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b0f]/80 via-transparent to-[#070b0f] [html[data-theme=day]_&]:from-[#fbf9f4]/75 [html[data-theme=day]_&]:via-transparent [html[data-theme=day]_&]:to-[#fbf9f4]" />
            </div>

            <Container className="relative z-10">
              <div className="max-w-4xl space-y-6">
                <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-white [html[data-theme=day]_&]:text-[#091a21]">
                  {isAr ? (
                    <>
                      من أرصفة ميناء العقبة <br />
                      <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                        إلى عمق الخليج والمشرق العربي.
                      </span>
                    </>
                  ) : (
                    <>
                      From Aqaba Quayside <br />
                      <span className="text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e]">
                        to the GCC and Levant Corridors.
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-base md:text-xl leading-relaxed max-w-3xl text-white/65 [html[data-theme=day]_&]:text-[#2d5661]">
                  {isAr
                    ? "دليل تشغيلي متكامل يوضح إجراءات العبور الجمركي، أوقات التخليص، والمتطلبات النظامية عبر المنافذ الحدودية والموانئ والمطارات التي تشغلها ربوع الخير يومياً."
                    : "An authoritative operational guide to customs clearance protocols, transit schedules, and statutory documentation across the critical seaports, dry borders, and airports managed by RKLT."}
                </p>

                {/* Unboxed Monumental Metric Ledger */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/12 [html[data-theme=day]_&]:border-black/12">
                  <div>
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-white [html[data-theme=day]_&]:text-[#091a21] block leading-none">
                      04
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block mt-1.5">
                      {isAr ? "المنافذ المباشرة" : "Primary Border Hubs"}
                    </span>
                  </div>
                  <div className="border-s border-white/10 [html[data-theme=day]_&]:border-black/10 ps-6">
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-[#c89b3c] [html[data-theme=day]_&]:text-[#9a701e] block leading-none">
                      &lt; 24h
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block mt-1.5">
                      {isAr ? "متوسط التخليص الجمركي" : "Clearance Average"}
                    </span>
                  </div>
                  <div className="border-s border-white/10 [html[data-theme=day]_&]:border-black/10 ps-6">
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-white [html[data-theme=day]_&]:text-[#091a21] block leading-none">
                      #412
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block mt-1.5">
                      {isAr ? "الترخيص الجمركي" : "Customs License"}
                    </span>
                  </div>
                  <div className="border-s border-white/10 [html[data-theme=day]_&]:border-black/10 ps-6">
                    <span className="font-numeral text-3xl sm:text-4xl font-light text-white [html[data-theme=day]_&]:text-[#091a21] block leading-none">
                      100%
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 [html[data-theme=day]_&]:text-[#2d5661] block mt-1.5">
                      {isAr ? "سلسلة الحفظ الجمركي" : "Bonded Custody"}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 2: Monumental Split-Flap Corridor Horizon Ledger */}
      <div data-depth-stratum="2" className="rklt-depth-stratum rklt-depth-overlayer z-[20]">
        <div data-depth-inner>
          <CoverageTeaser locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 3: Interactive Border & Statutory Protocol Console */}
      <div data-depth-stratum="3" className="rklt-depth-stratum rklt-depth-overlayer z-[30]">
        <div data-depth-inner>
          <section className="py-24 md:py-32 bg-[#0c141c] [html[data-theme=day]_&]:bg-[#ebe3d3] border-b border-white/10 [html[data-theme=day]_&]:border-black/10 transition-colors duration-300">
            <Container>
              <CorridorConsole locale={locale} />
            </Container>
          </section>
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 4: Signature Seal of Custody Partner CTA */}
      <div data-depth-stratum="4" className="rklt-depth-stratum rklt-depth-overlayer z-[40]">
        <div data-depth-inner>
          <ServiceCTA locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      {/* LAYER 5: Executive Mandate CTA */}
      <div data-depth-stratum="5" className="rklt-depth-stratum rklt-depth-overlayer z-[50]">
        <div data-depth-inner>
          <CTABand locale={locale} tone="darker" />
        </div>
      </div>
    </DepthLayerController>
  );
}
