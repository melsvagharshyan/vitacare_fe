import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useInlineSvg(containerRef: RefObject<HTMLDivElement | null>, svgUrl: string) {
  const [svgLoaded, setSvgLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const controller = new AbortController();

    fetch(svgUrl, { signal: controller.signal })
      .then(res => res.text())
      .then(svgText => {
        if (cancelled) return;

        container.innerHTML = svgText;

        const svgEl = container.querySelector('svg') as SVGSVGElement | null;
        if (svgEl) {
          // Ensure the SVG scales to fit the container without cropping.
          svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          svgEl.style.width = '100%';
          svgEl.style.height = '100%';
          svgEl.style.display = 'block';
        }

        setSvgLoaded(true);
      })
      .catch(() => {
        // Swallow fetch errors to avoid breaking the whole page.
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [containerRef, svgUrl]);

  return svgLoaded;
}
