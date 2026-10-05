/**
 * ScrollOrchestrator - GSAP ScrollTrigger integration for container descent
 * Coordinates scroll-driven animations and scene transitions
 */

'use client';

import { useEffect, useRef } from 'react';

export interface ScrollOrchestratorProps {
  sceneRef: React.RefObject<any>;
  onScrollComplete?: () => void;
}

export function ScrollOrchestrator({
  sceneRef,
  onScrollComplete
}: ScrollOrchestratorProps) {
  const timelineRef = useRef<any>(null);
  const scrollTriggerRef = useRef<any>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    let gsap: any;
    let ScrollTrigger: any;
    let mounted = true;

    const initializeScrollTrigger = async () => {
      try {
        // Dynamic import GSAP
        gsap = (await import('gsap')).default;
        ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;

        if (!mounted) return;

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        const {
          container,
          physicsEngine,
          sceneManager
        } = sceneRef.current;

        if (!container) {
          console.warn('Container not ready for scroll orchestration');
          return;
        }

        // Create timeline with ScrollTrigger
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.crane-scene-container',
            start: 'top top',
            end: '+=100vh', // One viewport height
            scrub: 1, // Smooth scrubbing
            pin: true, // Pin scene while scrolling
            anticipatePin: 1,
            onUpdate: (self: any) => {
              // Update physics amplitude based on scroll progress
              if (physicsEngine) {
                const amplitude = 2.0 * (1 - self.progress);
                physicsEngine.setAmplitude(amplitude);
              }
            },
            onLeave: () => {
              console.log('[ScrollOrchestrator] Scroll complete');
              onScrollComplete?.();
            }
          }
        });

        timelineRef.current = timeline;

        // Animate container descent
        timeline.to(
          container.position,
          {
            y: -15, // Descend 15 meters
            ease: 'power2.out',
            duration: 1
          },
          0
        );

        // Fade scene opacity
        timeline.to(
          '.crane-scene-container',
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut'
          },
          0.7 // Start at 70% progress
        );

        // Store ScrollTrigger reference
        scrollTriggerRef.current = ScrollTrigger;

        console.log('[ScrollOrchestrator] Initialized');
      } catch (error) {
        console.error('Failed to initialize ScrollOrchestrator:', error);
      }
    };

    initializeScrollTrigger();

    return () => {
      mounted = false;

      // Kill timeline and ScrollTrigger
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.getAll().forEach((trigger: any) => {
          trigger.kill();
        });
      }
    };
  }, [sceneRef, onScrollComplete]);

  return null;
}

/**
 * Optimize scroll performance with CSS containment and GPU hints
 */
export function applyScrollOptimizations(container: HTMLElement): void {
  if (!container) return;

  // GPU acceleration
  container.style.transform = 'translateZ(0)';
  container.style.willChange = 'transform, opacity';

  // CSS containment
  container.style.contain = 'layout style paint';

  // Reserve space to prevent layout shift
  container.style.minHeight = '100vh';
}

/**
 * Remove scroll optimizations when done
 */
export function removeScrollOptimizations(container: HTMLElement): void {
  if (!container) return;

  container.style.willChange = 'auto';
}

/**
 * Hook for scroll-based animations
 */
export function useScrollAnimation(
  callback: (progress: number) => void,
  dependencies: any[] = []
): void {
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;
          const progress = Math.min(scrollY / viewportHeight, 1);

          callback(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, dependencies);
}
