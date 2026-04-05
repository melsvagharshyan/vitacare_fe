import { useEffect, useRef, useState } from 'react';

const DEFAULT_FALLBACK_HEIGHT = 72;
const TOP_THRESHOLD = 24;
const HIDE_THRESHOLD = 56;
const SHOW_THRESHOLD = -28;

export function useHeaderState() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(DEFAULT_FALLBACK_HEIGHT);
  const fixedHeaderContentRef = useRef<HTMLDivElement>(null);

  const ticking = useRef(false);
  const showTopBarRef = useRef(true);
  const lastScrollY = useRef(0);
  const scrollAccum = useRef(0);

  useEffect(() => {
    const updateState = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      lastScrollY.current = current;

      if (current <= TOP_THRESHOLD) {
        scrollAccum.current = 0;
        if (!showTopBarRef.current) {
          showTopBarRef.current = true;
          setShowTopBar(true);
        }
        ticking.current = false;
        return;
      }

      scrollAccum.current += delta;

      let shouldShow = showTopBarRef.current;
      if (scrollAccum.current >= HIDE_THRESHOLD) {
        shouldShow = false;
        scrollAccum.current = 0;
      } else if (scrollAccum.current <= SHOW_THRESHOLD) {
        shouldShow = true;
        scrollAccum.current = 0;
      }

      if (showTopBarRef.current !== shouldShow) {
        showTopBarRef.current = shouldShow;
        setShowTopBar(shouldShow);
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(updateState);
      }
    };

    lastScrollY.current = window.scrollY;
    updateState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const element = fixedHeaderContentRef.current;
    if (!element) return;

    const updateHeight = () => {
      setHeaderHeight(element.getBoundingClientRect().height);
    };

    updateHeight();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return { showTopBar, headerHeight, fixedHeaderContentRef };
}
