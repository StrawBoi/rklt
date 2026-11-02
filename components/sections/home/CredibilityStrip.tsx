"use client";

import React, { useRef } from "react";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { useCredibilityMotion } from "./useCredibilityMotion";

interface CredibilityStripProps {
  locale: Locale;
}

interface FoundationPillar {
  code: string;
  badge: string;
  title: string;
  tagline: string;
}

const PILLARS_EN: FoundationPillar[] = [
  {
    code: "01",
    badge: "RECORDED CHAIN",
    title: "CUSTODY",
    tagline: "Unbroken Chain of Custody",
  },
  {
    code: "02",
    badge: "CUSTOMS BROKERAGE",
    title: "CLEARANCE",
    tagline: "Jordan Customs License #412",
  },
  {
    code: "03",
    badge: "REGIONAL CORRIDORS",
    title: "ROUTING",
    tagline: "Bonded Multimodal Routes",
  },
  {
    code: "04",
    badge: "ASSIGNED OFFICER",
    title: "DIRECT DESK",
    tagline: "Single Dedicated Senior Lead",
  },
];

const PILLARS_AR: FoundationPillar[] = [
  {
    code: "٠١",
    badge: "سلسلة عهدة مسجّلة",
    title: "الأمانة",
    tagline: "سلسلة عهدة مغلقة وموثقة",
  },
  {
    code: "٠٢",
    badge: "وساطة جمركية مرخّصة",
    title: "التخليص",
    tagline: "ترخيص جمركي رسمي #٤١٢",
  },
  {
    code: "٠٣",
    badge: "شبكة الممرات الإقليمية",
    title: "المسارات",
    tagline: "ممرات برية وبحرية ممتدة",
  },
  {
    code: "٠٤",
    badge: "ضابط عمليات مخصص",
    title: "مكتب مباشر",
    tagline: "ضابط عمليات خاص معني بشحنتك",
  },
];

/**
 * Direction 1: The Foundation Bedrock Girder
 * The 30-year operational weight of RKLT rests upon these 4 structural pillars.
 * Positioned horizontally as the architectural foundation directly beneath the landed container.
 * Zero generic boxes; left/right flanks remain completely open for cinematic scale.
 */
export const CredibilityStrip: React.FC<CredibilityStripProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const pillars = isAr ? PILLARS_AR : PILLARS_EN;
  const rootRef = useRef<HTMLElement>(null);

  useCredibilityMotion(rootRef);

  return (
    <section
      id="credibility"
      ref={rootRef}
      className="rklt-credibility rklt-credibility--bedrock"
      aria-label={isAr ? "الركائز التشغيلية" : "Operational Pillars"}
    >
      <div className="rklt-bedrock-stage">
        <Container className="rklt-bedrock-container">
          <div className="rklt-bedrock-girder" data-bedrock-girder>
            {/* 4 Sovereign Architectural Pillars */}
            <div className="rklt-bedrock-grid">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="rklt-bedrock-pillar"
                  data-bedrock-pillar
                >
                  <div className="rklt-pillar-header" dir="ltr">
                    <span className="rklt-pillar-num">{item.code}</span>
                  </div>
                  <h3 className="rklt-pillar-title">
                    {item.title}
                  </h3>
                  <p className="rklt-pillar-tagline">
                    {item.tagline}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
};
