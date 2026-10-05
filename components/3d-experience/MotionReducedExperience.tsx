/**
 * MotionReducedExperience - Accessible static experience for users with motion sensitivity
 * Respects prefers-reduced-motion setting with minimal animations
 */

'use client';

import React, { useEffect, useState } from 'react';
import type { Locale } from '@/lib/3d-experience/localization';
import { getLocalizedContent } from '@/lib/3d-experience/localization';

export interface MotionReducedExperienceProps {
  locale: Locale;
  onComplete?: () => void;
}

export function MotionReducedExperience({
  locale,
  onComplete
}: MotionReducedExperienceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const content = getLocalizedContent(locale);

  useEffect(() => {
    // Show static logo for 1 second
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return <StaticHeroSection locale={locale} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950">
      {/* Static RKLT Logo */}
      <div className="text-center">
        <svg
          width="400"
          height="120"
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[80vw]"
        >
          {/* R */}
          <path
            d="M30 100V20h35c14 0 24 10 24 22 0 8-5 15-12 18l14 40h-18l-14-35h-12v35H30z M47 55h18c5 0 8-3 8-8s-3-8-8-8H47v16z"
            fill="#C77B4C"
          />
          {/* K */}
          <path
            d="M120 100V20h17v30l24-30h20l-27 33 30 47h-20l-20-33-7 7v26h-17z"
            fill="#C77B4C"
          />
          {/* L */}
          <path
            d="M220 100V20h17v63h35v17h-52z"
            fill="#C77B4C"
          />
          {/* T */}
          <path
            d="M300 100V37h-20V20h57v17h-20v63h-17z"
            fill="#C77B4C"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Static hero section with overhead crane photo
 */
function StaticHeroSection({ locale }: { locale: Locale }) {
  return (
    <div className="relative w-full min-h-screen bg-ink-950 flex items-center justify-center">
      {/* Static overhead crane image placeholder */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-b from-ink-800 to-ink-950" />
        
        {/* Simple SVG illustration of crane */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Crane beam */}
          <rect
            x="200"
            y="200"
            width="800"
            height="20"
            fill="#FFD700"
            opacity="0.4"
          />
          
          {/* Left support */}
          <rect
            x="250"
            y="220"
            width="15"
            height="300"
            fill="#FFD700"
            opacity="0.4"
          />
          
          {/* Right support */}
          <rect
            x="935"
            y="220"
            width="15"
            height="300"
            fill="#FFD700"
            opacity="0.4"
          />
          
          {/* Container */}
          <rect
            x="500"
            y="400"
            width="200"
            height="120"
            fill="#C77B4C"
            opacity="0.5"
          />
          
          {/* Cables */}
          <line
            x1="550"
            y1="220"
            x2="520"
            y2="400"
            stroke="#4A5568"
            strokeWidth="2"
            opacity="0.3"
          />
          <line
            x1="650"
            y1="220"
            x2="680"
            y2="400"
            stroke="#4A5568"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-terracotta-500 mb-6">
          RKLT
        </h1>
        <p className="text-xl md:text-2xl text-sand-200 mb-8">
          {locale === 'ar'
            ? 'حلول لوجستية عالمية متكاملة'
            : 'Global Integrated Logistics Solutions'}
        </p>
        <p className="text-sm text-sand-300 opacity-70">
          {locale === 'ar'
            ? 'الشحن البحري • الشحن الجوي • الخدمات اللوجستية'
            : 'Sea Freight • Air Freight • Logistics Services'}
        </p>
      </div>
    </div>
  );
}
