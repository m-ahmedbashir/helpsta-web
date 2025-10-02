'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollToSection } from './useScrollToSection';

interface UseHashScrollOnLoadOptions {
  /**
   * Whether the page/content is currently loading
   */
  isLoading: boolean;
  
  /**
   * Delay before attempting to scroll (in ms)
   * @default 300
   */
  scrollDelay?: number;
  
  /**
   * Maximum number of scroll attempts
   * @default 5
   */
  maxAttempts?: number;
  
  /**
   * Whether to enable debug logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Hook that handles scrolling to hash fragments after content loading is complete.
 * Works with both timer-based and API-based loading states.
 */
export function useHashScrollOnLoad(options: UseHashScrollOnLoadOptions) {
  const {
    isLoading,
    scrollDelay = 300,
    maxAttempts = 5,
    debug = false
  } = options;

  const [hasScrolledToHash, setHasScrolledToHash] = useState(false);
  const attemptedHashRef = useRef<string>('');
  const { scrollToSection } = useScrollToSection();

  const log = (message: string, ...args: any[]) => {
    if (debug) {
      console.log(`[useHashScrollOnLoad] ${message}`, ...args);
    }
  };

  // Handle hash scrolling after loading completes
  useEffect(() => {
    if (!isLoading && !hasScrolledToHash) {
      const hash = window.location.hash;
      
      // Skip if no hash or we already attempted this hash
      if (!hash || attemptedHashRef.current === hash) {
        return;
      }

      attemptedHashRef.current = hash;
      log(`Attempting to scroll to hash: ${hash}`);
      
      // Robust scroll function that retries until successful
      const attemptScroll = (attempt: number = 1) => {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        
        log(`Scroll attempt ${attempt} for "${targetId}":`, element);
        
        if (element && (window as any).scrollToElement) {
          log(`Successfully found element and scroll function, scrolling...`);
          const success = scrollToSection(hash, { updateHash: false });
          if (success) {
            setHasScrolledToHash(true);
            return;
          }
        }
        
        // Retry if element not found and we haven't exceeded max attempts
        if (attempt < maxAttempts) {
          const retryDelay = Math.min(attempt * 500, 2000); // Cap at 2 seconds
          setTimeout(() => attemptScroll(attempt + 1), retryDelay);
        } else {
          log(`Failed to scroll to ${hash} after ${attempt} attempts`);
        }
      };
      
      // Start first attempt after content has time to render
      setTimeout(() => attemptScroll(), scrollDelay);
    }
  }, [isLoading, hasScrolledToHash, scrollToSection, scrollDelay, maxAttempts]);

  // Reset scroll state when hash changes (for navigation between sections)
  useEffect(() => {
    const handleHashChange = () => {
      log('Hash changed, resetting scroll state');
      setHasScrolledToHash(false);
      attemptedHashRef.current = '';
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reset when loading state changes back to true (for re-loading scenarios)
  useEffect(() => {
    if (isLoading) {
      setHasScrolledToHash(false);
      attemptedHashRef.current = '';
      log('Loading state changed to true, resetting scroll state');
    }
  }, [isLoading]);

  return {
    hasScrolledToHash,
    /**
     * Manually trigger hash scrolling (useful for edge cases)
     */
    triggerHashScroll: () => {
      setHasScrolledToHash(false);
      attemptedHashRef.current = '';
    }
  };
}