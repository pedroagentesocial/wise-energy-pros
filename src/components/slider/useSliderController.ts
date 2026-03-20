import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react';

type UseSliderControllerParams = {
  totalSlides: number;
  autoplayIntervalMs: number;
  autoplayEnabled?: boolean;
};

export const useSliderController = ({ totalSlides, autoplayIntervalMs, autoplayEnabled = true }: UseSliderControllerParams) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);

  const canAutoplay = useMemo(
    () => autoplayEnabled && !isHovering && !isInteractionPaused && totalSlides > 1,
    [autoplayEnabled, isHovering, isInteractionPaused, totalSlides]
  );

  const goTo = useCallback(
    (index: number, userInitiated = false) => {
      if (totalSlides < 1) return;
      const nextIndex = (index + totalSlides) % totalSlides;
      if (userInitiated) {
        setIsInteractionPaused(true);
      }
      setActiveIndex(nextIndex);
    },
    [totalSlides]
  );

  useEffect(() => {
    if (!canAutoplay) {
      return;
    }
    const timer = window.setInterval(() => {
      goTo(activeIndex + 1);
    }, autoplayIntervalMs);
    return () => window.clearInterval(timer);
  }, [activeIndex, autoplayIntervalMs, canAutoplay, goTo]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1, true);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1, true);
    }
  };

  return {
    activeIndex,
    goTo,
    onKeyDown,
    setIsHovering,
  };
};
