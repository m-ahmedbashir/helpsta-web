'use client';

import { useEffect, useRef, useState } from 'react';

interface TurnstileProps {
  sitekey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  className?: string;
}

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

export function Turnstile({
  sitekey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal',
  className = ''
}: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => {
        console.error('Failed to load Turnstile script');
        onError?.();
      };
      document.head.appendChild(script);
    };

    loadTurnstile();
  }, [onError]);

  useEffect(() => {
    if (isLoaded && ref.current && !widgetId) {
      const id = window.turnstile.render(ref.current, {
        sitekey,
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        theme,
        size,
      });
      setWidgetId(id);
    }

    return () => {
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [isLoaded, sitekey, onVerify, onError, onExpire, theme, size, widgetId]);

  const reset = () => {
    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  };

  const getResponse = () => {
    if (widgetId && window.turnstile) {
      return window.turnstile.getResponse(widgetId);
    }
    return '';
  };

  // Expose methods via ref
  useEffect(() => {
    if (ref.current) {
      (ref.current as any).reset = reset;
      (ref.current as any).getResponse = getResponse;
    }
  }, [widgetId]);

  return (
    <div 
      ref={ref} 
      className={`turnstile-widget ${className}`}
      data-testid="turnstile"
    />
  );
}