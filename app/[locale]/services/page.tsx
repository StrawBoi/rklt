import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesBentoGrid } from "@/components/sections/services/ServicesBentoGrid";
import { FleetSpecLedger } from "@/components/sections/services/FleetSpecLedger";
import { CustomsClearanceProtocol } from "@/components/sections/services/CustomsClearanceProtocol";
import { ServicesExtended } from "@/components/sections/services/ServicesExtended";
import { ServicesAdvisory } from "@/components/sections/services/ServicesAdvisory";
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
    path: "/services",
    titleEn: "Freight & Customs Clearance Services in Jordan (Aqaba & Amman) | RKLT",
    titleAr: "خدمات الشحن البحري والجوي والبري والتخليص الجمركي في الأردن | ربوع الخير (RKLT)",
    descriptionEn:
      "Full ocean FCL/LCL at Port of Aqaba, air cargo at Queen Alia Airport (AMM), bonded overland trucking to KSA & Iraq, cold-chain reefer, and Jordan Customs License #412 clearance.",
    descriptionAr:
      "خدمات الشحن البحري عبر ميناء العقبة، الشحن الجوي بمطار الملكة علياء، النقل البري المعلق للسعودية والعراق، سلاسل التبريد، والتخليص الجمركي المرخص رقم 412.",
  });
}

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <DepthLayerController>
      <div data-depth-stratum="1" className="rklt-depth-stratum z-[10]">
        <div data-depth-inner>
          <ServicesHero locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="2" className="rklt-depth-stratum rklt-depth-overlayer z-[20]">
        <div data-depth-inner>
          <ServicesBentoGrid locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="3" className="rklt-depth-stratum rklt-depth-overlayer z-[30]">
        <div data-depth-inner>
          <FleetSpecLedger locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="4" className="rklt-depth-stratum rklt-depth-overlayer z-[40]">
        <div data-depth-inner>
          <CustomsClearanceProtocol locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="5" className="rklt-depth-stratum rklt-depth-overlayer z-[50]">
        <div data-depth-inner>
          <ServicesExtended locale={locale} />
          <ServicesAdvisory locale={locale} />
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
