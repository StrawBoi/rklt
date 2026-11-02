"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { siteConfig } from "@/content/site";

interface FleetSpecLedgerProps {
  locale: Locale;
}

interface EquipmentSpec {
  id: string;
  code: string;
  name: { en: string; ar: string };
  category: { en: string; ar: string };
  badge: { en: string; ar: string };
  dimensions: {
    length: string;
    width: string;
    height: string;
    doorWidth: string;
    doorHeight: string;
  };
  capacity: {
    volume: string;
    maxPayload: string;
    tareWeight: string;
    maxGross: string;
  };
  features: { en: string[]; ar: string[] };
  idealFor: { en: string; ar: string };
}

const EQUIPMENT_CATALOG: EquipmentSpec[] = [
  {
    id: "20ft-dry",
    code: "20' GP",
    name: {
      en: "20ft General Purpose Standard",
      ar: "حاوية قياسية ٢٠ قدم (Standard)",
    },
    category: { en: "Ocean Freight · Intermodal", ar: "شحن بحري · متعدد الوسائط" },
    badge: { en: "HEAVY DENSITY CARGO", ar: "بضائع عالية الكثافة والوزن" },
    dimensions: {
      length: "5.898 m (19' 4\")",
      width: "2.352 m (7' 8\")",
      height: "2.393 m (7' 10\")",
      doorWidth: "2.340 m",
      doorHeight: "2.280 m",
    },
    capacity: {
      volume: "33.2 m³ (1,172 cu ft)",
      maxPayload: "28,200 kg (62,170 lbs)",
      tareWeight: "2,280 kg (5,026 lbs)",
      maxGross: "30,480 kg (67,200 lbs)",
    },
    features: {
      en: [
        "High-tensile Corten steel corrugated construction",
        "Treated marine plywood hardwood flooring",
        "28-ton ISO corner casting load-bearing certification",
        "Direct Aqaba berth-to-truck transfer compatible",
      ],
      ar: [
        "هيكل متين من حديد الكورتين المقاوم للعوامل البحرية",
        "أرضيات خشب بحري معالج لتحمل الرافعات الشوكية",
        "معتمدة لنقل حمولات تصل إلى ٢٨ طناً صافياً",
        "مطابقة لمعايير النقل المباشر من رصيف العقبة للشاحنات",
      ],
    },
    idealFor: {
      en: "Heavy mineral concentrates, industrial raw materials, bagged chemicals, dense machinery, and FMCG.",
      ar: "المواد الخام الكيميائية، المعادن الثقيلة، البضائع المعبأة بأكياس، والسلع ذات الكثافة العالية.",
    },
  },
  {
    id: "40ft-hc",
    code: "40' HC",
    name: {
      en: "40ft High-Cube Intermodal Container",
      ar: "حاوية ٤٠ قدم مرتفعة (High Cube)",
    },
    category: { en: "Ocean Freight · High Volume", ar: "شحن بحري · سعة حجمية كبرى" },
    badge: { en: "VOLUMETRIC OPTIMIZATION", ar: "مثالية للبضائع الحجمية" },
    dimensions: {
      length: "12.032 m (39' 5\")",
      width: "2.352 m (7' 8\")",
      height: "2.698 m (8' 10\")",
      doorWidth: "2.340 m",
      doorHeight: "2.585 m",
    },
    capacity: {
      volume: "76.2 m³ (2,694 cu ft)",
      maxPayload: "28,600 kg (63,052 lbs)",
      tareWeight: "3,900 kg (8,598 lbs)",
      maxGross: "32,500 kg (71,650 lbs)",
    },
    features: {
      en: [
        "Extra 30 cm (1 ft) vertical clearance over standard 40ft",
        "Optimized for 24-25 standard Euro-pallets (1200 x 800 mm)",
        "Integrated internal lashing rings every 1.2 meters",
        "Ventilated air intake valves for moisture mitigation",
      ],
      ar: [
        "ارتفاع إضافي بمقدار ٣٠ سم مقارنة بالحاوية العادية",
        "تتسع لما يصل إلى ٢٥ منصة شحن قياسية (Euro Pallets)",
        "حلقات تثبيت وتثليج داخلية كل ١.٢ متر لربط البضائع",
        "صمامات تهوية جانبية لمنع تكثف الرطوبة البحرية",
      ],
    },
    idealFor: {
      en: "Consumer electronics, retail goods, automotive components, apparel, and light-to-medium industrial goods.",
      ar: "الأجهزة الإلكترونية، قطع غيار السيارات، البضائع الاستهلاكية، والمواد التجارية الحجمية.",
    },
  },
  {
    id: "40ft-reefer",
    code: "40' REEFER",
    name: {
      en: "40ft Active High-Cube Reefer",
      ar: "حاوية مبردة نشطة ٤٠ قدم (Active Cold-Chain)",
    },
    category: { en: "Temperature-Controlled · Pharma", ar: "سلاسل تبريد · أدوية ومواد غذائية" },
    badge: { en: "-25°C TO +15°C CALIBRATED", ar: "نطاق حراري معاير من -٢٥° إلى +١٥°" },
    dimensions: {
      length: "11.583 m (38' 0\")",
      width: "2.286 m (7' 6\")",
      height: "2.544 m (8' 4\")",
      doorWidth: "2.290 m",
      doorHeight: "2.535 m",
    },
    capacity: {
      volume: "67.5 m³ (2,384 cu ft)",
      maxPayload: "29,400 kg (64,815 lbs)",
      tareWeight: "4,600 kg (10,140 lbs)",
      maxGross: "34,000 kg (74,955 lbs)",
    },
    features: {
      en: [
        "Carrier Transicold / Thermo King micro-processor cooling units",
        "Integrated dual temperature digital IoT telemetry logging",
        "T-bar aluminum aerodynamic floor for bottom-up air circulation",
        "24/7 dedicated reefer gen-set plug-in points at Aqaba ACT",
      ],
      ar: [
        "وحدات تبريد ميكروبروسيسور من Carrier Transicold و Thermo King",
        "حساسات رقمية متصلة تسجل درجات الحرارة باستمرار (IoT Log)",
        "أرضيات ألمنيوم مهواة (T-Bar) لتوزيع الهواء البارد بالتساوي",
        "وصل فوري بمولدات التبريد ومحطات الكهرباء بميناء العقبة",
      ],
    },
    idealFor: {
      en: "Pharmaceuticals, vaccines, fresh agricultural produce, frozen meat and poultry, and temperature-sensitive chemicals.",
      ar: "اللقاحات والأدوية البشرية، المنتجات الزراعية الطازجة، اللحوم والدواجن المجمدة، والكيماويات الحساسة.",
    },
  },
  {
    id: "flat-rack",
    code: "40' FLAT",
    name: {
      en: "40ft Heavy Flat Rack & Open Top",
      ar: "حاوية مسطحة للمعدات الثقيلة (Flat Rack & OOG)",
    },
    category: { en: "Project Cargo · Out of Gauge", ar: "شحن مشاريع · حمولات غير نمطية" },
    badge: { en: "UP TO 45 TONS STATIC", ar: "حمولات ثقيلة وخارجة عن القياسات" },
    dimensions: {
      length: "12.080 m (39' 7\")",
      width: "2.438 m (8' 0\")",
      height: "Collapsible End Walls",
      doorWidth: "Unrestricted Side Loading",
      doorHeight: "Over-Height Capable",
    },
    capacity: {
      volume: "Custom OOG Envelope",
      maxPayload: "45,000 kg (99,208 lbs)",
      tareWeight: "5,300 kg (11,684 lbs)",
      maxGross: "50,300 kg (110,892 lbs)",
    },
    features: {
      en: [
        "Heavy-duty reinforced longitudinal steel side beams",
        "Collapsible or fixed end walls for flush stacking",
        "Certified heavy lashing points with 5,000 kg breaking strain",
        "Specialized quayside spreader beam handling at Aqaba",
      ],
      ar: [
        "جسور فولاذية طولية مقواة لتحمل الأوزان المركزة",
        "جدران أمامية وخلفية قابلة للطي لسهولة الشحن والتخزين",
        "نقاط ربط وتثبيت معتمدة بقوة كسر تصل إلى ٥ آلاف كجم",
        "مناولة عبر رافعات وأذرع تفريغ مخصصة برصيف العقبة",
      ],
    },
    idealFor: {
      en: "Earthmoving machinery, transformers, industrial boilers, steel pipes, yachts, and oversized structural components.",
      ar: "المحولات الكهربائية، الغلايات الصناعية، الآليات الإنشائية، الأنابيب، والهياكل المعدنية الضخمة.",
    },
  },
  {
    id: "lowbed-trailer",
    code: "MULTI-AXLE",
    name: {
      en: "Multi-Axle Heavy Hydraulic Low-Bed",
      ar: "مقطورات هيدروليكية منخفضة (Low-Bed Trailer)",
    },
    category: { en: "Overland Haulage · Superload", ar: "نقل بري فائق الثقل · مقطورات خاصة" },
    badge: { en: "UP TO 120 TONS CAPACITY", ar: "طاقة نقل تصل إلى ١٢٠ طناً" },
    dimensions: {
      length: "13.6 m to 24.0 m Extendable",
      width: "3.00 m to 3.50 m with Outriggers",
      height: "0.85 m Deck Height (Ultra-Low)",
      doorWidth: "Open Platform",
      doorHeight: "Gooseneck Clearance",
    },
    capacity: {
      volume: "Unlimited Top Clearance",
      maxPayload: "120,000 kg (264,550 lbs)",
      tareWeight: "16,000 kg (35,270 lbs)",
      maxGross: "136,000 kg (299,820 lbs)",
    },
    features: {
      en: [
        "Hydraulic multi-axle steering for tight mountain hairpins",
        "Ultra-low loading deck to clear highway overpasses",
        "Official police and highway authority escort coordination",
        "Axle-weight distribution certified by Jordan Ministry of Public Works",
      ],
      ar: [
        "نظام توجيه هيدروليكي لكافة المحاور للالتفاف في المنعطفات الجبلية",
        "منصة منخفضة للغاية لتفادي جسور المشاة وخطوط الكهرباء المعلقة",
        "تنسيق المرافقة الأمنية الرسمية والدوريات على الطرق الخارجية",
        "مطابقة معايير الحمولات المحورية لوزارة الأشغال العامة الأردنية",
      ],
    },
    idealFor: {
      en: "Power generation turbines, wind turbine blades, refinery pressure vessels, and modular industrial processing plants.",
      ar: "توربينات توليد الطاقة، شفرات طاقة الرياح، أبراج التكرير، ومعدات مصانع التعدين والإنتاج الضخمة.",
    },
  },
];

export const FleetSpecLedger: React.FC<FleetSpecLedgerProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [selectedId, setSelectedId] = useState<string>("20ft-dry");

  const activeSpec =
    EQUIPMENT_CATALOG.find((item) => item.id === selectedId) ||
    EQUIPMENT_CATALOG[0];

  const getEquipmentInquiryUrl = (equipmentName: string, code: string) =>
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      isAr
        ? `مرحباً ربوع الخير، أرغب في الاستفسار وطلب تسعيرة شحن وتأمين معدة: ${equipmentName} (${code})`
        : `Hello RKLT operations desk, I would like to inquire about rate and availability for: ${equipmentName} (${code})`
    )}`;

  return (
    <section
      id="specifications"
      className="py-20 md:py-28 border-b border-role-line transition-colors duration-300"
      style={{ backgroundColor: "var(--role-field)" }}
    >
      <Container>
        {/* Section Proclamation */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full rklt-bento-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b34a]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b34a] font-bold">
              {isAr
                ? "دليل الأسطول والمواصفات الفنية المعتمدة"
                : "TECHNICAL FLEET & CONTAINER SPECIFICATIONS"}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight rklt-bento-heading">
            {isAr ? (
              <>
                المعايير الهندسية والحمولات <br />
                <span className="text-[#e2b34a]">لكافة وسائط الشحن المعتمدة.</span>
              </>
            ) : (
              <>
                Engineered Payload Specifications <br />
                <span className="text-[#e2b34a]">for Global Freight Procurement.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed rklt-bento-lead max-w-3xl">
            {isAr
              ? "بيانات هندسية دقيقة للأبعاد الداخلية، السعات الحجمية، والحمولات القصوى المعتمدة من دائرة الجمارك وسلطة الموانئ لمساعدة مديري سلاسل الإمداد على تخطيط الشحنات بدقة."
              : "Precise dimensional envelopes, cubic volumes, and tare-to-payload ratios certified under ISO and Ministry of Transport standards to optimize your consignment logistics."}
          </p>
        </div>

        {/* Equipment Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pb-6 border-b border-role-line">
          {EQUIPMENT_CATALOG.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`p-3.5 sm:p-4 text-start rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? "bg-[#e2b34a]/10 border-[#e2b34a] shadow-lg"
                    : "border-role-line hover:border-role-action bg-role-dock"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black tracking-wider px-2 py-0.5 rounded bg-black/20 text-[#e2b34a]">
                    {item.code}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-[#e2b34a] animate-pulse" : "bg-role-muted/40"
                    }`}
                  />
                </div>
                <div>
                  <span className="font-display text-xs sm:text-sm font-bold block text-role-text line-clamp-1">
                    {isAr ? item.name.ar : item.name.en}
                  </span>
                  <span className="font-mono text-[11px] text-role-muted block mt-0.5">
                    {isAr ? item.category.ar : item.category.en}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Spec Console */}
        <div className="mt-8 rounded-2xl border border-role-line bg-role-dock p-6 sm:p-10 shadow-xl space-y-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-role-line pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#e2b34a]/15 text-[#e2b34a] border border-[#e2b34a]/30">
                  {activeSpec.code}
                </span>
                <span className="font-mono text-xs text-role-muted uppercase">
                  {isAr ? activeSpec.badge.ar : activeSpec.badge.en}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-role-text">
                {isAr ? activeSpec.name.ar : activeSpec.name.en}
              </h3>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 text-end">
              <div>
                <span className="text-xs text-role-muted block font-mono">
                  {isAr ? "الحمولة الصافية القصوى" : "Max Net Payload"}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-[#e2b34a]">
                  {activeSpec.capacity.maxPayload.split("(")[0].trim()}
                </span>
              </div>
              <div className="border-s border-role-line ps-6">
                <span className="text-xs text-role-muted block font-mono">
                  {isAr ? "السعة الحجمية" : "Cubic Volume"}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-role-text">
                  {activeSpec.capacity.volume.split("(")[0].trim()}
                </span>
              </div>
            </div>
          </div>

          {/* Metric Grid: Dimensions vs Capacities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column A: Internal Dimensions */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#e2b34a] flex items-center gap-2">
                <Icon name="boxes" size={14} />
                <span>
                  {isAr
                    ? "الأبعاد الداخلية وفتحة الأبواب"
                    : "INTERNAL CLEARANCE & DOOR APERTURE"}
                </span>
              </h4>

              <div className="space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "الطول الداخلي الصافي" : "Internal Length"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.dimensions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "العرض الداخلي الصافي" : "Internal Width"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.dimensions.width}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "الارتفاع الداخلي الصافي" : "Internal Height"}
                  </span>
                  <span className="font-bold text-[#e2b34a]">
                    {activeSpec.dimensions.height}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "عرض فتحة الباب" : "Door Aperture Width"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.dimensions.doorWidth}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "ارتفاع فتحة الباب" : "Door Aperture Height"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.dimensions.doorHeight}
                  </span>
                </div>
              </div>
            </div>

            {/* Column B: Weight & Mass Distribution */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#e2b34a] flex items-center gap-2">
                <Icon name="activity" size={14} />
                <span>
                  {isAr
                    ? "أوزان الهيكل والحمولة الإجمالية"
                    : "WEIGHT ENVELOPE & TARE RATIO"}
                </span>
              </h4>

              <div className="space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "السعة الحجمية الكلية" : "Total Usable Volume"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.capacity.volume}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "الوزن الفارغ للهيكل (Tare)" : "Tare Weight (Empty)"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.capacity.tareWeight}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "الحمولة الصافية المسموحة" : "Maximum Net Payload"}
                  </span>
                  <span className="font-bold text-[#e2b34a]">
                    {activeSpec.capacity.maxPayload}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-role-line bg-role-field">
                  <span className="text-role-muted">
                    {isAr ? "الوزن الإجمالي الأقصى (MGW)" : "Max Gross Weight (MGW)"}
                  </span>
                  <span className="font-bold text-role-text">
                    {activeSpec.capacity.maxGross}
                  </span>
                </div>
              </div>

              {/* Recommended Cargo Profiles */}
              <div className="p-4 rounded-xl border border-role-line bg-role-field space-y-1.5">
                <span className="font-mono text-[11px] font-bold text-[#e2b34a] uppercase tracking-wider block">
                  {isAr ? "أفضل استخدام وتطبيقات الشحن:" : "IDEAL CARGO PROFILE:"}
                </span>
                <p className="text-xs sm:text-sm text-role-text leading-relaxed">
                  {isAr ? activeSpec.idealFor.ar : activeSpec.idealFor.en}
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Compliance Badges */}
          <div className="p-5 rounded-xl border border-role-line bg-role-field space-y-3">
            <span className="font-mono text-xs font-bold text-role-text uppercase tracking-wider block">
              {isAr
                ? "ميزات ومواصفات الأمان المعتمدة لهذه الفئة:"
                : "CERTIFIED OPERATIONAL & SAFETY FEATURES:"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-role-muted">
              {(isAr ? activeSpec.features.ar : activeSpec.features.en).map(
                (feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <span className="text-[#e2b34a] font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-role-line">
            <div className="flex items-center gap-2 text-xs text-role-muted font-mono">
              <Icon name="shield-check" size={16} className="text-[#e2b34a]" />
              <span>
                {isAr
                  ? "معاينة هندسية وفحص سلامة صادر عن سلطة ميناء العقبة والجمارك."
                  : "Certified for immediate dockside in-gate and cross-border road transit."}
              </span>
            </div>

            <a
              href={getEquipmentInquiryUrl(
                isAr ? activeSpec.name.ar : activeSpec.name.en,
                activeSpec.code
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold rklt-bento-btn transition-all duration-200"
            >
              <Icon name="whatsapp" size={16} />
              <span>
                {isAr
                  ? `طلب تسعيرة لهذه المعدة (${activeSpec.code})`
                  : `Inquire Rate for ${activeSpec.code}`}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
