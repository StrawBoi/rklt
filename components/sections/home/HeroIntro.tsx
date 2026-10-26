"use client";

/**
 * Full-screen preloader curtain. Six equal panels, the RKLT mark,
 * and a skip control. GSAP owns the motion; this file is structure only.
 */
import React from "react";

const BARS = [0, 1, 2, 3, 4, 5];

interface HeroIntroProps {
  skipLabel: string;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ skipLabel }) => {
  return (
    <div className="rklt-intro">
      <div className="rklt-intro-bars" aria-hidden="true">
        {BARS.map((index) => (
          <div className="rklt-intro-bar" data-intro-bar key={index}>
            {index > 0 ? <span className="rklt-intro-seam" data-intro-seam /> : null}
          </div>
        ))}
      </div>

      <div className="rklt-intro-stage">
        <div className="rklt-intro-logo" data-intro-logo dir="ltr">
          <div className="rklt-intro-word">
            <span>RKLT</span>
            <svg className="rklt-intro-chevron" viewBox="0 0 18 22" aria-hidden="true">
              <path d="M1.2 1.2 L16.4 11 L1.2 20.8 Z" />
            </svg>
          </div>
          <span className="rklt-intro-rule" data-intro-rule />
        </div>
      </div>

      <svg className="rklt-intro-defs" aria-hidden="true" focusable="false">
        <filter id="rklt-intro-exposure" x="-30%" y="-40%" width="160%" height="180%" colorInterpolationFilters="sRGB">
          <feColorMatrix
            data-exposure
            type="matrix"
            values="0.4 0 0 0 0  0 0.4 0 0 0  0 0 0.4 0 0  0 0 0 1 0"
          />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#e2b34a" floodOpacity="0.28" />
        </filter>
      </svg>

      <button type="button" className="rklt-intro-skip" data-intro-skip>
        {skipLabel}
      </button>
    </div>
  );
};
