/**
 * SkipControl - Button to skip logo animation
 * Positioned in bottom-right (EN) or bottom-left (AR)
 * Responds to click and ESC key
 */

'use client';

import React, { useEffect } from 'react';
import { getLocalizedContent, getSkipButtonPosition, type Locale } from '@/lib/3d-experience/localization';

interface SkipControlProps {
  locale: Locale;
  onClick: () => void;
}

export function SkipControl({ locale, onClick }: SkipControlProps) {
  const content = getLocalizedContent(locale);
  const position = getSkipButtonPosition(locale);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  return (
    <button
      onClick={onClick}
      className="fixed z-50 px-6 py-3 text-terracotta-300 hover:text-terracotta-400 
                 transition-colors duration-200 opacity-90 hover:opacity-100
                 border border-terracotta-500/30 rounded-lg
                 backdrop-blur-sm bg-ink-950/50 hover:bg-ink-900/60
                 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 focus:ring-offset-ink-950"
      style={position}
      aria-label={content.skipButton}
    >
      <span className="text-sm font-medium">{content.skipButton}</span>
      <span className="ml-2 text-xs opacity-70">(ESC)</span>
    </button>
  );
}
