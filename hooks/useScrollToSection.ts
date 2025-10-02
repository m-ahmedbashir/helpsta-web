'use client';

import { useCallback } from 'react';

/**
 * Hook for smooth scrolling to sections using Lenis or fallback
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((
    target: string | HTMLElement,
    options: {
      offset?: number;
      duration?: number;
      updateHash?: boolean;
    } = {}
  ) => {
    const {
      offset = -80,
      duration = 1.5,
      updateHash = true
    } = options;

    // Use the global scroll function if available
    if ((window as any).scrollToElement) {
      const success = (window as any).scrollToElement(target, { offset, duration });
      
      // Update URL hash if requested and successful
      if (success && updateHash) {
        let hash = '';
        if (typeof target === 'string') {
          hash = target.startsWith('#') ? target : `#${target}`;
        } else if (target.id) {
          hash = `#${target.id}`;
        }
        
        if (hash) {
          history.pushState(null, '', hash);
        }
      }
      
      return success;
    }

    // Fallback implementation
    let element: HTMLElement | null = null;
    let hash = '';

    if (typeof target === 'string') {
      if (target.startsWith('#')) {
        hash = target;
        element = document.getElementById(target.slice(1));
      } else {
        element = document.getElementById(target);
        hash = `#${target}`;
      }
    } else {
      element = target;
      hash = element.id ? `#${element.id}` : '';
    }

    if (!element) {
      console.warn(`[useScrollToSection] Element not found: ${target}`);
      return false;
    }

    // Fallback to native scroll
    console.log(`[useScrollToSection] Using native scroll to: ${element.id}`);
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementTop + offset,
      behavior: 'smooth'
    });

    // Update URL hash if requested
    if (updateHash && hash) {
      history.pushState(null, '', hash);
    }

    return true;
  }, []);

  const scrollToHash = useCallback((hash: string, delay = 0) => {
    setTimeout(() => {
      scrollToSection(hash);
    }, delay);
  }, [scrollToSection]);

  return {
    scrollToSection,
    scrollToHash,
  };
}