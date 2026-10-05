/**
 * LoadingScreen - Displays loading progress for 3D assets
 * Features animated RKLT logo pulse and progress bar
 */

'use client';

import React, { useEffect, useState } from 'react';
import { formatProgress, type Locale } from '@/lib/3d-experience/localization';

interface LoadingScreenProps {
  progress: number;
  locale: Locale;
  onComplete?: () => void;
}

export function LoadingScreen({ progress, locale, onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !isFadingOut) {
      setIsFadingOut(true);
      
      // Fade out after 400ms, then trigger onComplete
      const fadeTimeout = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 400);

      return () => clearTimeout(fadeTimeout);
    }
  }, [progress, isFadingOut, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-950 transition-opacity duration-400 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionTimingFunction: 'ease-in-out' }}
    >
      {/* Animated RKLT Logo */}
      <div className="mb-8">
        <RKLTLogo />
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 md:w-96">
        {/* Progress Bar */}
        <div className="h-1 w-full bg-sand-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div
          className="mt-4 text-center text-sand-300 font-mono text-sm"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          {formatProgress(progress, locale)}
        </div>
      </div>
    </div>
  );
}

/**
 * Animated RKLT Logo with pulsing effect
 */
function RKLTLogo() {
  return (
    <div className="animate-pulse-slow">
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-terracotta-500"
      >
        {/* R */}
        <path
          d="M8 32V8h10c4 0 7 3 7 6.5 0 2.5-1.5 4.5-3.5 5.5L26 32h-5l-4-11h-4v11H8z"
          fill="currentColor"
        />
        <path
          d="M13 13h5c1.5 0 2.5-1 2.5-2.5S19.5 8 18 8h-5v5z"
          fill="currentColor"
        />

        {/* K */}
        <path
          d="M35 32V8h5v9l7-9h6l-8 10 9 14h-6l-6-10-2 2v8h-5z"
          fill="currentColor"
        />

        {/* L */}
        <path
          d="M63 32V8h5v19h10v5H63z"
          fill="currentColor"
        />

        {/* T */}
        <path
          d="M87 32V13h-6V8h17v5h-6v19h-5z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

// Add custom animation to tailwind if needed
// In tailwind.config.ts, add:
// animation: {
//   'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
// }
