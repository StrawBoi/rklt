import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";

interface CredentialsModuleProps {
  locale: Locale;
}

export const CredentialsModule: React.FC<CredentialsModuleProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.credentials : aboutContentEn.credentials;

  return (
    <section className="py-20 md:py-28 bg-ink-950">
      <Container>
        <div className="max-w-3xl mb-14 space-y-3">
          <Eyebrow tone="ember">{content.eyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-sand-100 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm md:text-base text-sand-300/80 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 4 Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {content.badges.map((b) => (
            <div
              key={b.title}
              className="p-6 rounded-lg bg-ink-900 border border-ink-800 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-md bg-ink-800 text-terracotta-400 w-fit mb-4">
                  <Icon name="shield-check" size={24} />
                </div>

                <h3 className="font-display font-bold text-base text-sand-100 mb-2">
                  {b.title}
                </h3>

                <p className="text-xs text-sand-300/80 leading-relaxed">
                  {b.detail}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-ink-800 text-[11px] font-semibold text-terracotta-400/90 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                <span>{isAr ? "ساري ومعتمد" : "Active & Verified"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Official verification disclaimer banner */}
        <div className="p-4 rounded-md bg-ink-900/60 border border-ink-800 text-xs text-sand-300/80 flex items-center gap-3">
          <Icon name="file-text" size={18} className="text-terracotta-400 flex-shrink-0" />
          <span>{content.note}</span>
        </div>
      </Container>
    </section>
  );
};
