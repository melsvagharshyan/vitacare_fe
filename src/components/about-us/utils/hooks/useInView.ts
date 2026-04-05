import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useInView<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  rootMargin: string,
  threshold: number = 0
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, rootMargin, threshold]);

  return isInView;
}
