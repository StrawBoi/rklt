import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale as Locale,
    path: "/tracking",
    titleEn: "Consignment & Customs Manifest Tracking Radar | RKLT Jordan",
    titleAr: "تتبع الشحنات والبيانات الجمركية | ربوع الخير لنقل وشحن البضائع (RKLT)",
    descriptionEn:
      "Track ocean containers (ACT Aqaba), air cargo AWBs (QAIA AMM), reefer cold-chain telemetry, and ASYCUDA customs clearance milestones across Jordan and the GCC.",
    descriptionAr:
      "تتبع مسار الحاويات البحرية في ميناء العقبة، بوالص الشحن الجوي بمطار الملكة علياء، الشاحنات المبردة، وحالة البيان الجمركي خطوة بخطوة.",
  });
}

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
