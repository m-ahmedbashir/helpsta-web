'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      gestureOrientation: 'vertical',
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Create a global scroll function
    const scrollToElement = (elementOrId: string | HTMLElement, options: { offset?: number; duration?: number } = {}) => {
      const { offset = -80, duration = 1.5 } = options;
      
      let element: HTMLElement | null = null;
      
      if (typeof elementOrId === 'string') {
        const id = elementOrId.startsWith('#') ? elementOrId.slice(1) : elementOrId;
        element = document.getElementById(id);
        console.log(`[SmoothScroll] Looking for element with ID: "${id}"`, {
          element,
          allElementsWithId: document.querySelectorAll(`#${id}`).length,
          documentReady: document.readyState,
          lenisReady: !!lenis
        });
      } else {
        element = elementOrId;
      }
      
      if (element) {
        console.log(`[SmoothScroll] Scrolling to element:`, {
          element,
          elementRect: element.getBoundingClientRect(),
          currentScroll: window.pageYOffset,
          offset,
          duration
        });
        
        lenis.scrollTo(element, {
          offset,
          duration,
        });
        return true;
      } else {
        console.warn(`[SmoothScroll] Element not found:`, {
          elementOrId,
          availableIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
          documentReady: document.readyState
        });
        return false;
      }
    };

    // Expose scroll function and lenis globally for debugging
    (window as any).scrollToElement = scrollToElement;
    (window as any).lenis = lenis;
    
    console.log('[SmoothScroll] Provider initialized, functions exposed to window');

    return () => {
      lenis.destroy();
      // Clean up global function
      delete (window as any).scrollToElement;
    };
  }, []);

  // Expose lenis instance for external use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenisRef.current;
    }
  }, []);

  return <>{children}</>;
}