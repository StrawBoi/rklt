import React from "react";
import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { OperationsDeskConsole } from "@/components/sections/contact/OperationsDeskConsole";
import { QuotePrepGuide } from "@/components/sections/contact/QuotePrepGuide";
import { OperationalFAQ } from "@/components/sections/contact/OperationalFAQ";
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
    path: "/contact",
    titleEn: "Contact Amman & Aqaba Freight Operations Desk | RKLT Jordan",
    titleAr: "اتصل بمكتب عمليات عمّان وميناء العقبة | ربوع الخير لنقل وشحن البضائع (RKLT)",
    descriptionEn:
      "Connect 24/7 with RKLT licensed customs brokers (#412) and freight dispatchers in Amman and Port of Aqaba via WhatsApp (+962 79 532 0624), phone, or email.",
    descriptionAr:
      "تواصل على مدار الساعة مع فريق التخليص الجمركي (ترخيص 412) وإدارة الشحن في عمّان وميناء العقبة عبر واتساب (+962 79 532 0624) أو الهاتف أو البريد الإلكتروني.",
  });
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  return (
    <DepthLayerController>
      <div data-depth-stratum="1" className="rklt-depth-stratum z-[10]">
        <div data-depth-inner>
          <ContactHero locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="2" className="rklt-depth-stratum rklt-depth-overlayer z-[20]">
        <div data-depth-inner>
          <OperationsDeskConsole locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="3" className="rklt-depth-stratum rklt-depth-overlayer z-[30]">
        <div data-depth-inner>
          <QuotePrepGuide locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="4" className="rklt-depth-stratum rklt-depth-overlayer z-[40]">
        <div data-depth-inner>
          <OperationalFAQ locale={locale} />
        </div>
        <div data-depth-veil className="rklt-depth-veil" aria-hidden="true" />
      </div>

      <div data-depth-stratum="5" className="rklt-depth-stratum rklt-depth-overlayer z-[50]">
        <div data-depth-inner>
          <CTABand locale={locale} tone="darker" />
        </div>
      </div>
    </DepthLayerController>
  );
}
