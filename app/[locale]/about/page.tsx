import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutHeritageTimeline } from "@/components/sections/about/AboutHeritageTimeline";
import { GovernanceBento } from "@/components/sections/about/GovernanceBento";
import { ValuesExpanded } from "@/components/sections/about/ValuesExpanded";
import { CredentialsModule } from "@/components/sections/about/CredentialsModule";
import { ServiceCTA } from "@/components/sections/home/ServiceCTA";
import { CTABand } from "@/components/layout/CTABand";
import { DepthLayerController } from "@/components/motion/DepthLayerController";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale as Locale,
    path: "/about",
    titleEn: "About RKLT | 30+ Years of Licensed Jordan Customs & Freight Heritage (#412)",
    titleAr: "من نحن | ربوع الخير لنقل وشحن البضائع (RKLT) · خبرة منذ 1994 وترخيص 412",
    descriptionEn:
      "Established in 1994, RKLT (Rubu' Al-Khair) holds Jordan Customs Brokerage License #412, delivering institutional sea, air, and land logistics across Amman and Aqaba.",
    descriptionAr:
      "تأسست شركة ربوع الخير لنقل وشحن البضائع عام 1994 بترخيص جمركي رقم 412، وتقدم أعلى معايير الالتزام في الشحن والتخليص الجمركي في عمّان والعقبة.",
  });
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <DepthLayerController>
      <div data-depth-stratum="1" className="rklt-depth-stratum z-[10]">
        <div data-depth-inner>
          <AboutHero locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="2" className="rklt-depth-stratum rklt-depth-overlayer z-[20]">
        <div data-depth-inner>
          <AboutHeritageTimeline locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="3" className="rklt-depth-stratum rklt-depth-overlayer z-[30]">
        <div data-depth-inner>
          <GovernanceBento locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="4" className="rklt-depth-stratum rklt-depth-overlayer z-[40]">
        <div data-depth-inner>
          <ValuesExpanded locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="5" className="rklt-depth-stratum rklt-depth-overlayer z-[50]">
        <div data-depth-inner>
          <CredentialsModule locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="6" className="rklt-depth-stratum rklt-depth-overlayer z-[60]">
        <div data-depth-inner>
          <ServiceCTA locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="7" className="rklt-depth-stratum rklt-depth-overlayer z-[70]">
        <div data-depth-inner>
          <CTABand locale={locale} tone="darker" />
        </div>
      </div>
    </DepthLayerController>
  );
}
