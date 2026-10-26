"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { aboutContentEn } from "@/content/en/about";
import { aboutContentAr } from "@/content/ar/about";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { useInViewOnce } from "@/components/sections/home/useInViewOnce";

interface CredentialsModuleProps {
  locale: Locale;
}

export const CredentialsModule: React.FC<CredentialsModuleProps> = ({
  locale,
}) => {
  const isAr = locale === "ar";
  const content = isAr ? aboutContentAr.credentials : aboutContentEn.credentials;
  const revealRef = useInViewOnce<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-role-dock">
      <Container>
        <div ref={revealRef} className="rklt-reveal">
          <div className="max-w-3xl mb-14 space-y-3">
            <Eyebrow tone="ember" className="text-role-muted">
              {content.eyebrow}
            </Eyebrow>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-role-text tracking-tight">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-role-muted leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {content.badges.map((b, idx) => (
              <div
                key={b.title}
                className={`border-role-line py-8 md:px-10 ${
                  idx === 0 ? "border-t-0 pt-0" : "border-t"
                } ${idx % 2 === 0 ? "md:ps-0" : "md:border-s"} ${
                  idx < 2 ? "md:border-t-0 md:pt-0" : ""
                }`}
              >
                <Icon name="shield-check" size={22} className="mb-4 text-role-text" />
                <h3 className="font-display font-bold text-lg text-role-text mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-role-muted leading-relaxed">{b.detail}</p>
                <p className="mt-4 text-[11px] font-semibold text-role-muted">
                  {isAr ? "ساري ومعتمد" : "Active & Verified"}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 flex items-start gap-3 border-t border-role-line pt-6 text-sm text-role-muted">
            <Icon name="file-text" size={18} className="mt-0.5 flex-shrink-0 text-role-text" />
            <span>{content.note}</span>
          </p>
        </div>
      </Container>
    </section>
  );
};
