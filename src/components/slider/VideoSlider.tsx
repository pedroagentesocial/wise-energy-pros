import { useEffect, useRef, useState } from 'react';
import { useSliderController } from './useSliderController';

export type VideoSliderSlide = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  video: string;
  poster: string;
};

type VideoSliderProps = {
  lang: string;
  slides: VideoSliderSlide[];
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
  autoplayIntervalMs?: number;
};

const VideoSlider = ({
  lang,
  slides,
  ariaLabel,
  previousLabel,
  nextLabel,
  goToLabel,
  autoplayIntervalMs = 6000,
}: VideoSliderProps) => {
  const [usePosterOnly, setUsePosterOnly] = useState(false);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const { activeIndex, goTo, onKeyDown, setIsHovering } = useSliderController({
    totalSlides: slides.length,
    autoplayIntervalMs,
    autoplayEnabled: !lowPerformanceMode,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px), (prefers-reduced-motion: reduce)');
    const navWithConnection = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
      deviceMemory?: number;
    };
    const connection = navWithConnection.connection;
    const updateMode = () => {
      const mobileOrReduced = mediaQuery.matches;
      const saveData = Boolean(connection?.saveData);
      const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');
      const lowMemory = typeof navWithConnection.deviceMemory === 'number' && navWithConnection.deviceMemory <= 4;
      const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
      const lowPerf = mobileOrReduced || saveData || slowConnection || lowMemory || lowCpu;
      setLowPerformanceMode(lowPerf);
      setUsePosterOnly(lowPerf);
    };
    updateMode();
    mediaQuery.addEventListener('change', updateMode);
    connection?.addEventListener?.('change', updateMode);
    return () => {
      mediaQuery.removeEventListener('change', updateMode);
      connection?.removeEventListener?.('change', updateMode);
    };
  }, []);

  useEffect(() => {
    if (usePosterOnly) {
      videoRefs.current.forEach((video) => {
        video?.pause();
      });
      return;
    }
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, [activeIndex, usePosterOnly]);

  const preloadIndexes = lowPerformanceMode
    ? [activeIndex]
    : [activeIndex, (activeIndex + 1) % Math.max(slides.length, 1)];

  return (
    <section
      className="group/slider relative isolate flex min-h-[100svh] items-center overflow-hidden bg-slate-950"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={`${slide.title}-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-hidden={index !== activeIndex}
          >
            {usePosterOnly ? (
              <img
                src={slide.poster}
                alt={slide.title}
                className={`h-full w-full object-cover transition-transform ${lowPerformanceMode ? 'duration-300' : 'duration-1000'} ${
                  lowPerformanceMode ? 'scale-100' : index === activeIndex ? 'scale-105' : 'scale-100'
                }`}
                loading={index === activeIndex ? 'eager' : 'lazy'}
                decoding="async"
              />
            ) : (
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                className={`h-full w-full object-cover transition-transform ${lowPerformanceMode ? 'duration-300' : 'duration-1000'} ${
                  lowPerformanceMode ? 'scale-100' : index === activeIndex ? 'scale-105' : 'scale-100'
                }`}
                poster={slide.poster}
                preload={index === activeIndex ? 'metadata' : 'none'}
                autoPlay={index === activeIndex}
                muted
                loop
                playsInline
                onPlay={(event) => {
                  if (index !== activeIndex) {
                    event.currentTarget.pause();
                  }
                }}
              >
                {preloadIndexes.includes(index) && (
                  <source src={slide.video} type="video/mp4" />
                )}
              </video>
            )}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/88 via-slate-950/72 to-slate-900/78"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.22),_transparent_42%)]"></div>
      <div className={`pointer-events-none absolute inset-0 bg-slate-950/15 ${lowPerformanceMode ? '' : 'backdrop-blur-[1.5px]'}`}></div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        {slides.map((slide, index) => (
          <div
            key={`content-${slide.title}-${index}`}
            className={`transition-all ${lowPerformanceMode ? 'duration-300 ease-out' : 'duration-700'} ${
              index === activeIndex
                ? 'translate-y-0 opacity-100'
                : lowPerformanceMode
                ? 'pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0'
                : 'pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 translate-y-4 opacity-0'
            }`}
            aria-hidden={index !== activeIndex}
          >
            <h1 className={`mx-auto max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-50 transition-all ${
              lowPerformanceMode ? 'duration-300' : 'duration-700'
            } ${index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} sm:text-5xl md:text-7xl`}>
              {slide.title}
            </h1>
            <p className={`mx-auto mt-6 max-w-3xl text-base text-slate-300 transition-all ${
              lowPerformanceMode ? 'duration-300' : 'duration-700 delay-100'
            } ${index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} sm:text-lg md:text-xl`}>
              {slide.subtitle}
            </p>
            <div className={`mt-10 transition-all ${lowPerformanceMode ? 'duration-300' : 'duration-700 delay-150'} ${
              index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}>
              <a
                href={`/${lang}${slide.href}`}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-slate-50 ring-1 ring-blue-400/40 shadow-[0_0_26px_rgba(37,99,235,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(34,211,238,0.45)]"
              >
                {slide.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => goTo(activeIndex - 1, true)}
        className={`absolute left-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/75 text-slate-100 shadow-[0_0_20px_rgba(2,6,23,0.35)] transition-all ${
          lowPerformanceMode ? 'duration-200' : 'duration-300'
        } hover:scale-105 hover:border-cyan-400/70 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 md:left-6 md:h-14 md:w-14 md:opacity-0 md:group-hover/slider:opacity-100 md:group-focus-within/slider:opacity-100`}
      >
        <span aria-hidden="true" className="text-2xl leading-none">‹</span>
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => goTo(activeIndex + 1, true)}
        className={`absolute right-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/75 text-slate-100 shadow-[0_0_20px_rgba(2,6,23,0.35)] transition-all ${
          lowPerformanceMode ? 'duration-200' : 'duration-300'
        } hover:scale-105 hover:border-cyan-400/70 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 md:right-6 md:h-14 md:w-14 md:opacity-0 md:group-hover/slider:opacity-100 md:group-focus-within/slider:opacity-100`}
      >
        <span aria-hidden="true" className="text-2xl leading-none">›</span>
      </button>

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/55 px-2 py-1.5 backdrop-blur-sm transition-all duration-300 md:bottom-8">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.title}-${index}`}
            type="button"
            aria-label={`${goToLabel} ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => goTo(index, true)}
            className={`inline-flex h-6 items-center justify-center rounded-full px-1.5 transition-all ${
              lowPerformanceMode ? 'duration-200' : 'duration-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
              index === activeIndex ? 'w-11' : 'w-7'
            }`}
          >
            <span
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-400/70 group-hover/slider:bg-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default VideoSlider;
