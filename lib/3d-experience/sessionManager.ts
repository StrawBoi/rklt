/**
 * SessionManager - Manages session tracking for 3D experience intro animation
 * Uses sessionStorage to track whether user has seen the intro in current browser session
 */

interface SessionManager {
  hasSeenIntro(): boolean;
  markIntroSeen(): void;
  clearIntroFlag(): void;
}

const SESSION_KEY = 'rklt_intro_shown';

export const sessionManager: SessionManager = {
  /**
   * Check if user has already seen intro in this session
   */
  hasSeenIntro: () => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      // sessionStorage unavailable (private browsing, etc.)
      return false;
    }
  },

  /**
   * Mark that user has seen the intro in this session
   */
  markIntroSeen: () => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Silent fail if sessionStorage unavailable
    }
  },

  /**
   * Clear the intro flag (for testing or manual reset)
   */
  clearIntroFlag: () => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Silent fail if sessionStorage unavailable
    }
  }
};
