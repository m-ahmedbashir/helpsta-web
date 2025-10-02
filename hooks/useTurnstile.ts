import { useCallback, useRef } from 'react';

interface UseTurnstileReturn {
  resetTurnstile: () => void;
  getTurnstileResponse: () => string;
}

export function useTurnstile(): UseTurnstileReturn {
  const turnstileRef = useRef<HTMLDivElement>(null);

  const resetTurnstile = useCallback(() => {
    if (turnstileRef.current && (turnstileRef.current as any).reset) {
      (turnstileRef.current as any).reset();
    }
  }, []);

  const getTurnstileResponse = useCallback(() => {
    if (turnstileRef.current && (turnstileRef.current as any).getResponse) {
      return (turnstileRef.current as any).getResponse();
    }
    return '';
  }, []);

  return {
    resetTurnstile,
    getTurnstileResponse,
  };
}