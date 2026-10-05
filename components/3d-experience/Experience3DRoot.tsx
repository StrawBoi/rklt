/**
 * Experience3DRoot - Top-level orchestrator for premium 3D experience
 * Manages session, device detection, loading, and conditional rendering
 */

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  sessionManager,
  detectDeviceCapability,
  ErrorType,
  Experience3DErrorHandler,
  type Locale,
  type DeviceCapability
} from '@/lib/3d-experience';
import { LoadingScreen } from './LoadingScreen';
import { LogoAnimator } from './LogoAnimator';
import { MotionReducedExperience } from './MotionReducedExperience';

// Dynamic imports for 3D components (client-only)
const CraneScene3D = dynamic(
  () => import('./CraneScene3D').then((mod) => mod.CraneScene3D),
  { ssr: false }
);

const ScrollOrchestrator = dynamic(
  () => import('./ScrollOrchestrator').then((mod) => mod.ScrollOrchestrator),
  { ssr: false }
);

export interface Experience3DRootProps {
  locale: Locale;
  onComplete?: () => void;
}

interface Experience3DState {
  hasSeenIntro: boolean;
  deviceCapability: DeviceCapability | null;
  loadingProgress: number;
  isReady: boolean;
  error: Error | null;
  phase: 'loading' | 'logo' | 'scene' | 'fallback' | 'reduced-motion';
}

export function Experience3DRoot({ locale, onComplete }: Experience3DRootProps) {
  const [state, setState] = useState<Experience3DState>({
    hasSeenIntro: false,
    deviceCapability: null,
    loadingProgress: 0,
    isReady: false,
    error: null,
    phase: 'loading'
  });

  const [errorHandler] = useState(() => new Experience3DErrorHandler(locale));

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Check session storage
        const introShown = sessionManager.hasSeenIntro();

        // Detect device capability
        const capability = detectDeviceCapability();

        console.log('[Experience3DRoot] Device capability:', capability);

        if (!mounted) return;

        // Handle reduced motion
        if (capability.level === 'reduced-motion') {
          setState((prev) => ({
            ...prev,
            hasSeenIntro: introShown,
            deviceCapability: capability,
            phase: 'reduced-motion',
            isReady: true
          }));
          return;
        }

        // Handle low capability (2D fallback)
        if (capability.level === 'low') {
          setState((prev) => ({
            ...prev,
            hasSeenIntro: introShown,
            deviceCapability: capability,
            phase: 'fallback',
            isReady: true
          }));
          
          errorHandler.handle(ErrorType.WEBGL_NOT_SUPPORTED);
          errorHandler.activateFallback();
          return;
        }

        // Load Three.js and GSAP for capable devices
        setState((prev) => ({ ...prev, loadingProgress: 10 }));

        await Promise.all([
          import('three'),
          import('gsap'),
          import('gsap/ScrollTrigger')
        ]);

        if (!mounted) return;

        setState((prev) => ({ ...prev, loadingProgress: 50 }));

        // Simulate asset preloading
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!mounted) return;

        setState((prev) => ({
          ...prev,
          hasSeenIntro: introShown,
          deviceCapability: capability,
          loadingProgress: 100,
          isReady: true,
          phase: introShown ? 'scene' : 'logo'
        }));

        // Emit analytics
        emitAnalyticsEvent('experience_3d_initialized', {
          capability: capability.level,
          hasSeenIntro: introShown,
          gpuScore: capability.gpuScore
        });
      } catch (error) {
        console.error('[Experience3DRoot] Initialization failed:', error);
        
        if (mounted) {
          errorHandler.handle(ErrorType.THREE_JS_INIT_FAILED, error as Error);
          
          setState((prev) => ({
            ...prev,
            error: error as Error,
            phase: 'fallback',
            isReady: true
          }));
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [locale, errorHandler]);

  const handleLogoComplete = () => {
    sessionManager.markIntroSeen();
    setState((prev) => ({ ...prev, phase: 'scene' }));
    
    emitAnalyticsEvent('logo_animation_complete', {
      duration: 2000
    });
  };

  const handleLogoSkip = () => {
    emitAnalyticsEvent('logo_animation_skipped', {});
  };

  const handleSceneReady = () => {
    console.log('[Experience3DRoot] Scene ready');
  };

  const handleSceneError = (error: Error) => {
    console.error('[Experience3DRoot] Scene error:', error);
    errorHandler.handle(ErrorType.RENDER_ERROR, error);
    setState((prev) => ({ ...prev, phase: 'fallback', error }));
  };

  const handleScrollComplete = () => {
    console.log('[Experience3DRoot] Scroll complete');
    onComplete?.();
  };

  // Loading phase
  if (!state.isReady) {
    return (
      <LoadingScreen
        progress={state.loadingProgress}
        locale={locale}
      />
    );
  }

  // Reduced motion phase
  if (state.phase === 'reduced-motion') {
    return (
      <MotionReducedExperience
        locale={locale}
        onComplete={onComplete}
      />
    );
  }

  // Fallback phase (2D or error)
  if (state.phase === 'fallback' || state.error) {
    return (
      <HeroSectionFallback
        locale={locale}
        error={state.error}
      />
    );
  }

  // Logo animation phase
  if (state.phase === 'logo') {
    return (
      <LogoAnimator
        locale={locale}
        onComplete={handleLogoComplete}
        onSkip={handleLogoSkip}
      />
    );
  }

  // 3D scene phase
  if (state.phase === 'scene' && state.deviceCapability) {
    return (
      <>
        <CraneScene3D
          locale={locale}
          deviceCapability={state.deviceCapability.level}
          onReady={handleSceneReady}
          onError={handleSceneError}
        />
        <ScrollOrchestrator
          sceneRef={{ current: null }} // Will be connected via ref
          onScrollComplete={handleScrollComplete}
        />
      </>
    );
  }

  return null;
}

/**
 * Fallback hero section for low capability or errors
 */
function HeroSectionFallback({
  locale,
  error
}: {
  locale: Locale;
  error: Error | null;
}) {
  return (
    <div className="relative w-full min-h-screen bg-ink-950 flex items-center justify-center">
      <div className="text-center px-6 max-w-4xl">
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
        
        {error && (
          <p className="mt-4 text-xs text-sand-400 opacity-50">
            {locale === 'ar'
              ? 'تعذر تحميل تجربة الرسومات ثلاثية الأبعاد'
              : 'Unable to load 3D experience'}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Emit analytics event
 */
function emitAnalyticsEvent(eventName: string, data: any): void {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, data);
    }
  } catch (error) {
    // Silent fail for analytics
  }
}
