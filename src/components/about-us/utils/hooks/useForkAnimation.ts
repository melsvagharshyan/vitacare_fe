import { useEffect } from 'react';
import type { RefObject } from 'react';
export const FORK_IMAGE_ID = 'image1_1069_35';

// Fork moves up when the section is in view.
export const FORK_TOP_Y = -40;

// Start very near the bowl for more visible animation.
export const FORK_NEAR_BOWL_Y = 400;

export function useForkAnimation(
  svgContainerRef: RefObject<HTMLDivElement | null>,
  isInView: boolean,
  svgLoaded: boolean
) {
  useEffect(() => {
    if (!svgLoaded) return;

    const forkEl = svgContainerRef.current?.querySelector(`#${FORK_IMAGE_ID}`) as SVGElement | null;

    if (!forkEl) return;

    forkEl.style.transition = 'transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)';
    forkEl.style.willChange = 'transform';
    forkEl.style.transformOrigin = 'center';
    forkEl.style.transformBox = 'fill-box';

    forkEl.style.transform = `translateY(${isInView ? FORK_TOP_Y : FORK_NEAR_BOWL_Y}px)`;
  }, [isInView, svgLoaded, svgContainerRef]);
}
