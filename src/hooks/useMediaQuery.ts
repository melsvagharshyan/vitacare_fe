import { useState, useEffect } from 'react';

/**
 * Optimized media query hook that prevents unnecessary re-renders
 * Uses a single listener per query to share across components
 */
const mediaQueryCache = new Map<string, MediaQueryList>();
const mediaQueryListeners = new Map<string, Set<(matches: boolean) => void>>();

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;

    // Get or create MediaQueryList
    let mq = mediaQueryCache.get(query);
    if (!mq) {
      mq = window.matchMedia(query);
      mediaQueryCache.set(query, mq);
    }

    return mq.matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get or create MediaQueryList
    let mq = mediaQueryCache.get(query);
    if (!mq) {
      mq = window.matchMedia(query);
      mediaQueryCache.set(query, mq);
    }

    const updateMatches = (e: MediaQueryListEvent) => {
      // Notify all listeners for this query
      const listeners = mediaQueryListeners.get(query);
      if (listeners) {
        listeners.forEach(listener => listener(e.matches));
      }
    };

    // Add this component's setter to listeners
    if (!mediaQueryListeners.has(query)) {
      mediaQueryListeners.set(query, new Set());
    }
    mediaQueryListeners.get(query)!.add(setMatches);

    // Only add event listener if this is the first component using this query
    if (mediaQueryListeners.get(query)!.size === 1) {
      // Use addEventListener for better browser support
      if (mq.addEventListener) {
        mq.addEventListener('change', updateMatches);
      } else {
        // Fallback for older browsers
        mq.addListener(updateMatches);
      }
    }

    return () => {
      const listeners = mediaQueryListeners.get(query);
      if (listeners) {
        listeners.delete(setMatches);
        // Remove event listener if no more components are using this query
        if (listeners.size === 0) {
          if (mq.removeEventListener) {
            mq.removeEventListener('change', updateMatches);
          } else {
            // Fallback for older browsers
            mq.removeListener(updateMatches);
          }
        }
      }
    };
  }, [query]);

  return matches;
}
