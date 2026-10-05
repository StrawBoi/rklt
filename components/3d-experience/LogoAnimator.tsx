/**
 * LogoAnimator - 2-second animated logo paint reveal
 * Uses GSAP for stroke-dashoffset animation with sequential letter reveals
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { type Locale } from '@/lib/3d-experience/localization';
import { SkipControl } from './SkipControl';

interface LogoAnimatorProps {
  locale: Locale;
  onComplete: () => void;
  onSkip?: () => void;
}

export function LogoAnimator({ locale, onComplete, onSkip }: LogoAnimatorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<any>(null);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (!svgRef.current || isSkipped) return;

    let gsap: any;
    let timeline: any;

    const initAnimation = async () => {
      try {
        // Dynamic import GSAP
        gsap = (await import('gsap')).default;

        // Get all letter paths
        const letterR = svgRef.current?.querySelector('.letter-r path');
        const letterK = svgRef.current?.querySelector('.letter-k path');
        const letterL = svgRef.current?.querySelector('.letter-l path');
        const letterT = svgRef.current?.querySelector('.letter-t path');

        if (!letterR || !letterK || !letterL || !letterT) {
          console.error('Logo paths not found');
          onComplete();
          return;
        }

        // Calculate path lengths for dasharray
        const paths = [letterR, letterK, letterL, letterT] as SVGPathElement[];
        paths.forEach((path) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length.toString();
          path.style.strokeDashoffset = length.toString();
          path.style.fill = 'transparent';
        });

        // Create GSAP timeline
        timeline = gsap.timeline({
          onComplete: () => {
            setTimeout(() => {
              if (!isSkipped) {
                onComplete();
              }
            }, 300); // 300ms pause before transition
          }
        });

        timelineRef.current = timeline;

        // Animate R letter (0 - 0.5s)
        timeline.to(letterR, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 0);
        timeline.to(letterR, {
          fill: '#C77B4C', // terracotta-500
          duration: 0.2,
          ease: 'power2.out'
        }, 0.7);

        // Animate K letter (0.5 - 1.0s)
        timeline.to(letterK, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 0.5);
        timeline.to(letterK, {
          fill: '#C77B4C',
          duration: 0.2,
          ease: 'power2.out'
        }, 1.2);

        // Animate L letter (1.0 - 1.5s)
        timeline.to(letterL, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 1.0);
        timeline.to(letterL, {
          fill: '#C77B4C',
          duration: 0.2,
          ease: 'power2.out'
        }, 1.7);

        // Animate T letter (1.5 - 2.0s)
        timeline.to(letterT, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 1.5);
        timeline.to(letterT, {
          fill: '#C77B4C',
          duration: 0.2,
          ease: 'power2.out'
        }, 2.2);
      } catch (error) {
        console.error('Failed to initialize logo animation:', error);
        onComplete();
      }
    };

    initAnimation();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [onComplete, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    onSkip?.();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950">
      {/* RKLT Logo SVG */}
      <svg
        ref={svgRef}
        width="400"
        height="120"
        viewBox="0 0 400 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[80vw]"
      >
        {/* R Letter */}
        <g className="letter-r">
          <path
            d="M30 100V20h35c14 0 24 10 24 22 0 8-5 15-12 18l14 40h-18l-14-35h-12v35H30z M47 55h18c5 0 8-3 8-8s-3-8-8-8H47v16z"
            stroke="#C77B4C"
            strokeWidth="2"
            fill="transparent"
          />
        </g>

        {/* K Letter */}
        <g className="letter-k">
          <path
            d="M120 100V20h17v30l24-30h20l-27 33 30 47h-20l-20-33-7 7v26h-17z"
            stroke="#C77B4C"
            strokeWidth="2"
            fill="transparent"
          />
        </g>

        {/* L Letter */}
        <g className="letter-l">
          <path
            d="M220 100V20h17v63h35v17h-52z"
            stroke="#C77B4C"
            strokeWidth="2"
            fill="transparent"
          />
        </g>

        {/* T Letter */}
        <g className="letter-t">
          <path
            d="M300 100V37h-20V20h57v17h-20v63h-17z"
            stroke="#C77B4C"
            strokeWidth="2"
            fill="transparent"
          />
        </g>
      </svg>

      {/* Skip Control */}
      <SkipControl locale={locale} onClick={handleSkip} />
    </div>
  );
}
