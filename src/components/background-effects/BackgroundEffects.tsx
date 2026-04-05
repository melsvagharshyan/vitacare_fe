import { memo, useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '~/hooks/useMediaQuery';

const BackgroundEffects = memo(() => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    let rafId: number | null = null;

    const updateHeight = () => {
      const newHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      );

      setDocumentHeight(prev => {
        if (Math.abs(newHeight - prev) > 50) return newHeight;
        return prev;
      });
    };

    updateHeight();

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateHeight);
    };

    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      if (scrollTimeout !== undefined) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateHeight);
      }, 500);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeout !== undefined) clearTimeout(scrollTimeout);
    };
  }, [isMobile]);

  const allBlobs = useMemo(
    () => [
      {
        id: 1,
        size: 'w-32 h-32 md:w-[400px] md:h-[400px]',
        position: 'top-0 right-0 md:top-[-200px]',
        delay: 2,
        duration: 25,
        xRange: 35,
        yRange: 35,
        color: 'rgb(148 163 184 / 0.35)',
      },
      {
        id: 2,
        size: 'w-32 h-32 md:w-[400px] md:h-[400px]',
        position: 'bottom-0 left-0 md:bottom-[-200px]',
        delay: 4,
        duration: 30,
        xRange: 45,
        yRange: 45,
        color: 'rgb(148 163 184 / 0.3)',
      },
      {
        id: 3,
        size: 'w-40 h-40 sm:w-44 sm:h-44 md:w-56 md:h-56',
        position: 'top-16 right-2 sm:top-20 sm:right-5 md:right-12 lg:right-24',
        delay: 3.2,
        duration: 24,
        xRange: 28,
        yRange: 28,
        imageUrl: 'https://creatix.tech/_next/static/media/about-capsule.b0c9b2f7.png',
      },
      {
        id: 4,
        size: 'w-40 h-40 sm:w-44 sm:h-44 md:w-60 md:h-60',
        position: 'bottom-24 left-2 sm:bottom-20 sm:left-5 md:left-5',
        delay: 2.8,
        duration: 26,
        xRange: 32,
        yRange: 32,
        imageUrl: 'https://creatix.tech/_next/static/media/contact-capsule-left-bg.3808e886.png',
      },
    ],
    []
  );

  const blobs = useMemo(() => {
    if (isMobile) {
      return allBlobs.filter((blob, index) => index < 4 || blob.id === 13);
    }
    return allBlobs;
  }, [isMobile, allBlobs]);

  const getMotionProps = (blob: (typeof blobs)[0]) => {
    const isImageBlob = 'imageUrl' in blob;

    if (isMobile && !isImageBlob) {
      return { animate: undefined, transition: undefined };
    }

    const x = [
      Math.sin(0) * blob.xRange,
      Math.sin(Math.PI / 2) * blob.xRange,
      Math.sin(Math.PI) * blob.xRange,
      Math.sin((3 * Math.PI) / 2) * blob.xRange,
      Math.sin(2 * Math.PI) * blob.xRange,
    ];
    const y = [
      Math.cos(0) * blob.yRange,
      Math.cos(Math.PI / 2) * blob.yRange,
      Math.cos(Math.PI) * blob.yRange,
      Math.cos((3 * Math.PI) / 2) * blob.yRange,
      Math.cos(2 * Math.PI) * blob.yRange,
    ];
    const scale = [1, 1.1, 0.9, 1.1, 1];

    const rotate: number[] = isImageBlob ? [0, 360] : [0, 14, -12, 10, 0];

    const rotateDuration = isImageBlob
      ? Math.max(blob.duration * 3, 36)
      : blob.duration;

    return {
      animate: { x, y, scale, rotate },
      transition: {
        delay: blob.delay,
        repeat: Infinity,
        x: { duration: blob.duration, ease: 'easeInOut' },
        y: { duration: blob.duration, ease: 'easeInOut' },
        scale: { duration: blob.duration, ease: 'easeInOut' },
        rotate: {
          duration: rotateDuration,
          ease: isImageBlob ? 'linear' : 'easeInOut',
          repeat: Infinity,
        },
      },
    };
  };

  const containerStyle = useMemo(() => {
    const fullDoc =
      isMobile && documentHeight > 0 ? `${documentHeight}px` : undefined;
    return {
      height: fullDoc ?? '100vh',
      minHeight: fullDoc ?? '100vh',
    };
  }, [isMobile, documentHeight]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[15] overflow-hidden"
      style={{
        ...containerStyle,
        position: 'fixed',
        left: 0,
        right: 0,
        width: '100%',
      }}
    >
      {blobs.map(blob => {
        const { animate, transition } = getMotionProps(blob);
        const isImageBlob = 'imageUrl' in blob;

        if (isImageBlob) {
          return (
            <motion.img
              key={blob.id}
              src={blob.imageUrl}
              alt=""
              aria-hidden
              draggable={false}
              loading="eager"
              className={`absolute ${blob.size} ${blob.position} origin-center object-contain select-none [filter:drop-shadow(0_14px_36px_rgb(15_23_42_/_0.2))]`}
              style={{
                willChange: isMobile ? 'auto' : 'transform',
                opacity: isMobile ? 0.92 : 1,
              }}
              animate={animate}
              transition={transition}
            />
          );
        }

        return (
          <motion.div
            key={blob.id}
            className={`absolute ${blob.size} ${blob.position} origin-center rounded-full blur-[80px] md:blur-[200px] opacity-70`}
            style={{
              backgroundColor: blob.color,
              willChange: isMobile ? 'auto' : 'transform',
            }}
            animate={animate}
            transition={transition}
          />
        );
      })}
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';

export default BackgroundEffects;
