/**
 * PremiumHeroExperience - 2.5D SVG animation with parallax
 * Beautiful, performant, and doesn't require 3D models
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/3d-experience/localization';
import { sessionManager } from '@/lib/3d-experience';

export interface PremiumHeroExperienceProps {
  locale: Locale;
}

export function PremiumHeroExperience({ locale }: PremiumHeroExperienceProps) {
  const [phase, setPhase] = useState<'loading' | 'logo' | 'hero'>('loading');
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Check if intro was seen
    const hasSeenIntro = sessionManager.hasSeenIntro();
    
    if (hasSeenIntro) {
      setPhase('hero');
    } else {
      // Show logo animation first
      setPhase('logo');
      setTimeout(() => {
        sessionManager.markIntroSeen();
        setPhase('hero');
      }, 2500); // 2.5 seconds
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  const containerY = Math.min(scrollY * 0.5, 200);
  const craneY = Math.min(scrollY * 0.3, 150);
  const cloudY = Math.min(scrollY * 0.1, 50);
  const opacity = Math.max(1 - scrollY / 500, 0);

  if (phase === 'loading') {
    return <LoadingState />;
  }

  if (phase === 'logo') {
    return <LogoAnimation locale={locale} />;
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-ink-900 via-ink-800 to-ink-950"
      style={{ opacity }}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brandblue-400/20 to-transparent" />
        
        {/* Clouds with parallax */}
        <div
          className="absolute top-20 left-0 w-full"
          style={{ transform: `translateY(${cloudY}px)` }}
        >
          <Cloud className="absolute top-0 left-[10%] opacity-30" size="large" />
          <Cloud className="absolute top-20 right-[15%] opacity-20" size="medium" />
          <Cloud className="absolute top-40 left-[60%] opacity-25" size="small" />
        </div>

        {/* Ocean/port background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl">
          {/* Animated container with crane */}
          <div
            className="mb-12 relative"
            style={{ transform: `translateY(${containerY}px)` }}
          >
            <AnimatedContainer />
          </div>

          {/* Text content */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-terracotta-500 mb-6 animate-fade-in">
            RKLT
          </h1>
          <p className="text-xl md:text-2xl text-sand-200 mb-4 animate-fade-in-delay-1">
            {locale === 'ar'
              ? 'حلول لوجستية عالمية متكاملة'
              : 'Global Integrated Logistics Solutions'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-sand-300 animate-fade-in-delay-2">
            <span className="flex items-center gap-2">
              <Ship className="w-5 h-5" />
              {locale === 'ar' ? 'الشحن البحري' : 'Sea Freight'}
            </span>
            <span className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              {locale === 'ar' ? 'الشحن الجوي' : 'Air Freight'}
            </span>
            <span className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              {locale === 'ar' ? 'الخدمات اللوجستية' : 'Logistics'}
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 mx-auto border-2 border-sand-300/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-sand-300/50 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated crane with parallax */}
      <div
        className="absolute top-20 right-[10%] opacity-40"
        style={{ transform: `translateY(${craneY}px)` }}
      >
        <CraneSilhouette />
      </div>
    </div>
  );
}

/**
 * Animated container with subtle movement
 */
function AnimatedContainer() {
  return (
    <div className="relative w-64 h-40 mx-auto">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Container body */}
        <rect
          x="10"
          y="40"
          width="180"
          height="70"
          fill="#C77B4C"
          stroke="#A9663D"
          strokeWidth="2"
          className="animate-float"
        />
        
        {/* Container details - vertical lines */}
        {[30, 50, 70, 90, 110, 130, 150, 170].map((x) => (
          <line
            key={x}
            x1={x}
            y1="40"
            x2={x}
            y2="110"
            stroke="#A9663D"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}

        {/* Corner castings */}
        <rect x="8" y="38" width="6" height="6" fill="#4A5568" />
        <rect x="186" y="38" width="6" height="6" fill="#4A5568" />
        <rect x="8" y="106" width="6" height="6" fill="#4A5568" />
        <rect x="186" y="106" width="6" height="6" fill="#4A5568" />

        {/* RKLT branding */}
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fill="#FFF"
          fontSize="24"
          fontWeight="bold"
          opacity="0.9"
        >
          RKLT
        </text>

        {/* Cables */}
        <line x1="40" y1="0" x2="30" y2="40" stroke="#4A5568" strokeWidth="2" opacity="0.6" className="animate-sway" />
        <line x1="160" y1="0" x2="170" y2="40" stroke="#4A5568" strokeWidth="2" opacity="0.6" className="animate-sway-reverse" />
      </svg>
    </div>
  );
}

/**
 * Crane silhouette for background
 */
function CraneSilhouette() {
  return (
    <svg width="200" height="300" viewBox="0 0 200 300" className="opacity-50">
      {/* Crane beam */}
      <rect x="0" y="50" width="200" height="8" fill="#FFD700" opacity="0.3" />
      {/* Tower */}
      <rect x="180" y="50" width="10" height="200" fill="#FFD700" opacity="0.3" />
      {/* Diagonal support */}
      <line x1="180" y1="50" x2="140" y2="250" stroke="#FFD700" strokeWidth="6" opacity="0.2" />
    </svg>
  );
}

/**
 * Cloud component
 */
function Cloud({ className, size }: { className?: string; size: 'small' | 'medium' | 'large' }) {
  const scale = size === 'large' ? 1.5 : size === 'medium' ? 1 : 0.7;
  
  return (
    <svg
      width={120 * scale}
      height={60 * scale}
      viewBox="0 0 120 60"
      className={className}
    >
      <ellipse cx="30" cy="35" rx="25" ry="20" fill="#FFF" opacity="0.1" />
      <ellipse cx="60" cy="30" rx="30" ry="25" fill="#FFF" opacity="0.1" />
      <ellipse cx="90" cy="35" rx="25" ry="20" fill="#FFF" opacity="0.1" />
    </svg>
  );
}

/**
 * Icon components
 */
function Ship({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 20l8-8V4l4 3v5l8 8" />
      <path d="M2 20h20" />
    </svg>
  );
}

function Plane({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 22l7-17 7 7 7-7" />
      <path d="M16 16l-3-3" />
    </svg>
  );
}

function Truck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="6" width="13" height="10" rx="1" />
      <path d="M14 6h4l3 4v6h-2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </svg>
  );
}

/**
 * Loading state
 */
function LoadingState() {
  return (
    <div className="fixed inset-0 bg-ink-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-terracotta-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sand-300 text-sm">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Logo animation
 */
function LogoAnimation({ locale }: { locale: Locale }) {
  return (
    <div className="fixed inset-0 bg-ink-950 flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold text-terracotta-500 animate-scale-in">
          RKLT
        </h1>
        <div className="mt-4 w-48 h-1 bg-terracotta-500 mx-auto animate-expand" />
      </div>
    </div>
  );
}
