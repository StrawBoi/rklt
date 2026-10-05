/**
 * Error handling system for 3D experience
 * Provides graceful fallback handling for various error scenarios
 */

'use client';

import React from 'react';
import { Locale, LOCALIZED_CONTENT } from './localization';

export enum ErrorType {
  WEBGL_NOT_SUPPORTED = 'WEBGL_NOT_SUPPORTED',
  ASSET_LOAD_FAILED = 'ASSET_LOAD_FAILED',
  THREE_JS_INIT_FAILED = 'THREE_JS_INIT_FAILED',
  GSAP_INIT_FAILED = 'GSAP_INIT_FAILED',
  RENDER_ERROR = 'RENDER_ERROR',
  UNKNOWN = 'UNKNOWN'
}

export interface Experience3DError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  shouldFallback: boolean;
}

export class Experience3DErrorHandler {
  private errors: Experience3DError[] = [];
  private locale: Locale = 'en';

  constructor(locale: Locale = 'en') {
    this.locale = locale;
  }

  /**
   * Handle an error and return action recommendation
   */
  handle(
    errorType: ErrorType,
    originalError?: Error
  ): { shouldFallback: boolean; message: string } {
    const message = this.getErrorMessage(errorType);

    const error: Experience3DError = {
      type: errorType,
      message,
      originalError,
      shouldFallback: true
    };

    this.errors.push(error);
    this.logError(error);

    return {
      shouldFallback: error.shouldFallback,
      message
    };
  }

  /**
   * Log error to console and optionally to analytics
   */
  logError(error: Experience3DError): void {
    const prefix = '[3D Experience Error]';
    console.error(`${prefix} ${error.type}: ${error.message}`);

    if (error.originalError) {
      console.error(`${prefix} Original error:`, error.originalError);
    }

    // Could emit to analytics service here
    this.emitAnalyticsEvent('experience_3d_error', {
      errorType: error.type,
      message: error.message
    });
  }

  /**
   * Activate fallback to standard hero section
   */
  activateFallback(): void {
    console.warn('[3D Experience] Activating fallback to standard content');
    this.emitAnalyticsEvent('fallback_activated', {
      errorCount: this.errors.length,
      lastError: this.errors[this.errors.length - 1]?.type
    });
  }

  /**
   * Get localized error message
   */
  private getErrorMessage(errorType: ErrorType): string {
    const content = LOCALIZED_CONTENT[this.locale];

    switch (errorType) {
      case ErrorType.WEBGL_NOT_SUPPORTED:
        return 'WebGL is not supported by your browser';
      case ErrorType.ASSET_LOAD_FAILED:
        return 'Failed to load 3D assets';
      case ErrorType.THREE_JS_INIT_FAILED:
        return 'Failed to initialize 3D rendering library';
      case ErrorType.GSAP_INIT_FAILED:
        return 'Failed to initialize animation library';
      case ErrorType.RENDER_ERROR:
        return 'Error during 3D rendering';
      default:
        return content.errorMessage;
    }
  }

  /**
   * Emit analytics event
   */
  private emitAnalyticsEvent(eventName: string, data: any): void {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, data);
      }
    } catch (error) {
      // Silent fail for analytics
    }
  }

  /**
   * Get all errors encountered
   */
  getErrors(): Experience3DError[] {
    return [...this.errors];
  }

  /**
   * Clear error history
   */
  clearErrors(): void {
    this.errors = [];
  }
}

/**
 * React Error Boundary for 3D experience
 */
export class Experience3DErrorBoundary extends React.Component<
  { children: React.ReactNode; locale: Locale },
  { hasError: boolean }
> {
  private errorHandler: Experience3DErrorHandler;

  constructor(props: { children: React.ReactNode; locale: Locale }) {
    super(props);
    this.state = { hasError: false };
    this.errorHandler = new Experience3DErrorHandler(props.locale);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.errorHandler.handle(ErrorType.RENDER_ERROR, error);
    console.error('3D Experience Error Boundary caught:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>{LOCALIZED_CONTENT[this.props.locale]?.errorMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
