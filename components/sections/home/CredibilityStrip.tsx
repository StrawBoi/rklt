"use client";

import React, { useRef } from "react";
import { Locale } from "@/lib/i18n";
import { homeContentEn } from "@/content/en/home";
import { homeContentAr } from "@/content/ar/home";
import { Container } from "@/components/primitives/Container";
import { useCredibilityMotion } from "./useCredibilityMotion";

interface CredibilityStripProps {
  locale: Locale;
}

export const CredibilityStrip: React.FC<CredibilityStripProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const content = isAr ? homeContentAr.credibility : homeContentEn.credibility;
  const rootRef = useRef<HTMLElement>(null);

  useCredibilityMotion(rootRef);

  return (
    <section id="credibility" ref={rootRef} className="rklt-credibility" aria-labelledby="credibility-title">
      <Container>
        <span data-cred-thread aria-hidden="true" className="rklt-cred-thread" />

        <div className="rklt-cred-grid">
          <div>
            <h2 id="credibility-title" className="rklt-cred-label" data-cred-claim>
              {content.experienceLabel}
            </h2>
            <p dir="ltr" className="rklt-cred-number">
              <span data-cred-count>{content.experienceNumber}</span>
              <span className="rklt-cred-plus" data-cred-plus>
                +
              </span>
            </p>
          </div>

          <div className="rklt-cred-copy">
            <p className="rklt-cred-detail" data-cred-detail>
              {content.experienceDetail}
            </p>
          </div>
        </div>

        <ul data-cred-values className="rklt-cred-values">
          {content.values.map((v) => (
            <li key={v.title} data-cred-value className="rklt-cred-value">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
