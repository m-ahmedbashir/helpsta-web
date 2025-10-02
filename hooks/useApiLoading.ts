'use client';

import { useState, useCallback } from 'react';

interface UseApiLoadingOptions {
  /**
   * Minimum loading time in milliseconds
   * Useful for UX to prevent flash loading
   * @default 1000
   */
  minLoadTime?: number;
  
  /**
   * Whether to enable debug logging
   * @default false
   */
  debug?: boolean;
}

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for managing API loading states with minimum loading time support.
 * Perfect for when you want to replace timer-based loading with real API calls.
 */
export function useApiLoading(options: UseApiLoadingOptions = {}) {
  const { minLoadTime = 1000, debug = false } = options;
  
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const log = (message: string, ...args: any[]) => {
    if (debug) {
      console.log(`[useApiLoading] ${message}`, ...args);
    }
  };

  const executeWithLoading = useCallback(async <T>(
    apiCall: () => Promise<T>,
    options?: {
      /**
       * Override the minimum loading time for this specific call
       */
      minLoadTime?: number;
    }
  ): Promise<T | null> => {
    const effectiveMinLoadTime = options?.minLoadTime ?? minLoadTime;
    
    setState({ isLoading: true, error: null });
    log('Starting API call with minimum loading time:', effectiveMinLoadTime);
    
    const startTime = Date.now();
    
    try {
      const result = await apiCall();
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, effectiveMinLoadTime - elapsed);
      
      if (remainingTime > 0) {
        log(`API call completed in ${elapsed}ms, waiting additional ${remainingTime}ms for UX`);
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      } else {
        log(`API call completed in ${elapsed}ms (exceeded minimum time)`);
      }
      
      setState({ isLoading: false, error: null });
      return result;
    } catch (error) {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, effectiveMinLoadTime - elapsed);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      log('API call failed:', errorMessage);
      setState({ isLoading: false, error: errorMessage });
      return null;
    }
  }, [minLoadTime, debug]);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null });
  }, []);

  return {
    ...state,
    executeWithLoading,
    reset
  };
}

/**
 * Example usage in your Home component:
 * 
 * ```tsx
 * export default function Home() {
 *   const { isLoading, error, executeWithLoading } = useApiLoading({
 *     minLoadTime: 2000, // Minimum 2 seconds for smooth UX
 *     debug: process.env.NODE_ENV === 'development'
 *   });
 * 
 *   useHashScrollOnLoad({ isLoading });
 * 
 *   useEffect(() => {
 *     const loadData = async () => {
 *       await executeWithLoading(async () => {
 *         const [users, partners, community] = await Promise.all([
 *           fetchUserData(),
 *           fetchPartners(),
 *           fetchCommunityData()
 *         ]);
 *         return { users, partners, community };
 *       });
 *     };
 * 
 *     loadData();
 *   }, [executeWithLoading]);
 * 
 *   // Rest of your component...
 * }
 * ```
 */