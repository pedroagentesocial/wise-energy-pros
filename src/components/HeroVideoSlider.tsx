import VideoSlider, { type VideoSliderSlide } from './slider/VideoSlider';

type HeroVideoSliderProps = {
  lang: string;
  slides: VideoSliderSlide[];
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
  autoplayIntervalMs?: number;
};

const HeroVideoSlider = ({
  lang,
  slides,
  ariaLabel,
  previousLabel,
  nextLabel,
  goToLabel,
  autoplayIntervalMs = 6000,
}: HeroVideoSliderProps) => {
  return (
    <VideoSlider
      lang={lang}
      slides={slides}
      ariaLabel={ariaLabel}
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      goToLabel={goToLabel}
      autoplayIntervalMs={autoplayIntervalMs}
    />
  );
};

export default HeroVideoSlider;
