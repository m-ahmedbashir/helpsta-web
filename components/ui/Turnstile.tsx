'use client';

import { useState } from 'react';
import { Turnstile as ReactTurnstile } from '@marsidev/react-turnstile';

interface TurnstileProps {
  sitekey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  className?: string;
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
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Debug logging
  const debugLog = (message: string, data?: any) => {
    console.log(`[Turnstile] ${message}`, data || '');
  };

  const handleVerify = (token: string) => {
    debugLog('Turnstile verification successful', { token: `${token.substring(0, 20)}...` });
    setError('');
    setIsLoading(false);
    onVerify(token);
  };

  const handleError = (error: any) => {
    const errorMessage = typeof error === 'string' ? error : 'Verification failed';
    debugLog('Turnstile error occurred:', errorMessage);
    setError(errorMessage);
    setIsLoading(false);
    onError?.();
  };

  const handleExpire = () => {
    debugLog('Turnstile token expired');
    setError('Verification expired. Please try again.');
    setIsLoading(true);
    onExpire?.();
  };

  const handleLoad = () => {
    debugLog('Turnstile widget loaded successfully');
    setIsLoading(false);
    setError('');
  };

  // Validate sitekey
  if (!sitekey || sitekey === 'your_site_key_here') {
    return (
      <div className={`turnstile-container ${className}`}>
        <div className="turnstile-error text-red-600 text-sm p-3 bg-red-50 rounded-md border border-red-200">
          <strong>Configuration Error:</strong> Invalid or missing Turnstile site key.
          <details className="mt-2">
            <summary className="cursor-pointer text-xs">Debug Info</summary>
            <div className="text-xs mt-1 font-mono">
              <div>Site Key: {sitekey || 'Not provided'}</div>
              <div>Environment: {process.env.NODE_ENV}</div>
              <div>Please check your .env.local file and ensure NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY is set correctly.</div>
            </div>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className={`turnstile-container ${className}`}>
      <ReactTurnstile
        siteKey={sitekey}
        onSuccess={handleVerify}
        onError={handleError}
        onExpire={handleExpire}
        onLoad={handleLoad}
        options={{
          theme,
          size,
          action: 'contact-form',
          cData: 'helpsta-contact'
        }}
        className="turnstile-widget"
      />
      
      {error && (
        <div className="turnstile-error text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-md border border-red-200">
          <strong>Verification Error:</strong> {error}
          <div className="text-xs mt-1 text-gray-600">
            Please refresh the page and try again.
          </div>
        </div>
      )}
      
      {isLoading && !error && (
        <div className="turnstile-loading text-gray-600 text-sm p-3 bg-gray-50 rounded-md border border-gray-200">
          Loading security verification...
        </div>
      )}
    </div>
  );
}