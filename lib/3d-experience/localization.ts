/**
 * Localization utilities for 3D experience
 * Supports English and Arabic (RTL) layouts
 */

export type Locale = 'en' | 'ar';

export interface LocalizedContent {
  skipButton: string;
  loadingProgress: string;
  errorMessage: string;
}

export const LOCALIZED_CONTENT: Record<Locale, LocalizedContent> = {
  en: {
    skipButton: 'Skip Intro',
    loadingProgress: 'Loading...',
    errorMessage: 'Unable to load 3D experience. Showing standard content.'
  },
  ar: {
    skipButton: 'تخطي المقدمة',
    loadingProgress: 'جاري التحميل...',
    errorMessage: 'تعذر تحميل تجربة الرسومات ثلاثية الأبعاد. عرض محتوى قياسي.'
  }
};

/**
 * Get localized content for the given locale
 */
export function getLocalizedContent(locale: Locale): LocalizedContent {
  return LOCALIZED_CONTENT[locale] || LOCALIZED_CONTENT['en'];
}

/**
 * Format progress number with locale-specific numerals
 * Converts 0-100 to Arabic-Indic numerals for Arabic locale
 */
export function formatProgress(progress: number, locale: Locale): string {
  const percentage = Math.round(progress);

  if (locale === 'ar') {
    return convertToArabicNumerals(percentage.toString()) + '%';
  }

  return percentage + '%';
}

/**
 * Convert English numerals to Arabic-Indic numerals
 * 0→٠, 1→١, 2→٢, etc.
 */
function convertToArabicNumerals(text: string): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return text.replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
}

/**
 * Get layout styles based on locale (RTL support)
 */
export function getLayoutStyles(locale: Locale): React.CSSProperties {
  if (locale === 'ar') {
    return {
      direction: 'rtl',
      textAlign: 'right'
    };
  }

  return {
    direction: 'ltr',
    textAlign: 'left'
  };
}

/**
 * Get positioning for skip button based on locale
 */
export function getSkipButtonPosition(locale: Locale): React.CSSProperties {
  if (locale === 'ar') {
    return {
      bottom: '2rem',
      left: '2rem'
    };
  }

  return {
    bottom: '2rem',
    right: '2rem'
  };
}
