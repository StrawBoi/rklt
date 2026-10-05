import React from "react";
import { Locale } from "@/lib/i18n";
import { contactContentEn } from "@/content/en/contact";
import { contactContentAr } from "@/content/ar/contact";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";

interface HubsAndHoursProps {
  locale: Locale;
}

export const HubsAndHours: React.FC<HubsAndHoursProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? contactContentAr.hubs : contactContentEn.hubs;

  return (
    <section className="py-20 md:py-28 bg-ink-950 border-b border-ink-800">
      <Container>
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.locations.map((loc, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-ink-900 border border-ink-800 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded bg-ink-800 text-terracotta-400">
                    <Icon name="map-pin" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-sand-100">
                      {loc.city}
                    </h3>
                    <p className="text-xs text-terracotta-300 font-medium">
                      {loc.role}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-ink-800 space-y-3 text-xs text-sand-300/90">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-sand-100 w-20 flex-shrink-0">
                      {isAr ? "العنوان:" : "Address:"}
                    </span>
                    <span>{loc.address}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-sand-100 w-20 flex-shrink-0">
                      {isAr ? "الدوام:" : "Hours:"}
                    </span>
                    <span>{loc.hours}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-sand-100 w-20 flex-shrink-0">
                      {isAr ? "الهاتف:" : "Phone:"}
                    </span>
                    <a
                      href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                      className="text-terracotta-400 hover:underline dir-ltr font-medium"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-ink-800 text-[11px] font-semibold text-terracotta-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isAr ? "فريق العمليات متواجد ميدانياً" : "On-ground operations active"}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
