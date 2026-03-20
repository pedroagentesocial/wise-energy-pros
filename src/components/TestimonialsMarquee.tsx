import { memo, useMemo } from 'react';

type ReviewItem = {
  name: string;
  quote: string;
  avatar: string;
  location?: string;
};

type TestimonialsMarqueeProps = {
  heading: string;
  sourceLabel: string;
  location: string;
  items: ReviewItem[];
  speedSeconds?: number;
};

const TestimonialsMarquee = ({ heading, sourceLabel, location, items, speedSeconds = 46 }: TestimonialsMarqueeProps) => {
  const safeSpeedSeconds = Math.min(Math.max(speedSeconds, 20), 120);
  const trackGroups = useMemo(() => [items, items], [items]);

  return (
    <section className="bg-slate-950 py-16 md:py-20">
      <div className="container mx-auto px-6 opacity-0 translate-y-4" data-reveal>
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-50 md:mb-10 md:text-4xl">{heading}</h2>
      </div>
      <div
        className="group/reviews relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      >
        <div
          className="reviews-track flex w-max [animation-play-state:running] group-hover/reviews:[animation-play-state:paused]"
          style={{ animationDuration: `${safeSpeedSeconds}s` }}
        >
          {trackGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="flex shrink-0 gap-4 px-4 md:gap-6 md:px-6">
              {group.map((item, index) => (
                <article
                  key={`${item.name}-${groupIndex}-${index}`}
                  className="w-[268px] shrink-0 rounded-2xl border border-slate-800/90 bg-gradient-to-br from-slate-900/78 via-slate-900/62 to-slate-950/72 p-4 shadow-[0_12px_34px_rgba(2,6,23,0.34)] backdrop-blur-md transition-all duration-400 ease-out hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-[0_18px_42px_rgba(34,211,238,0.14)] sm:w-[288px] md:w-[332px] md:p-5 xl:w-[360px]"
                  aria-hidden={groupIndex === 1}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 md:gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        loading="lazy"
                        className="h-10 w-10 rounded-full border border-slate-700 object-cover md:h-11 md:w-11"
                      />
                      <div>
                        <p className="text-sm font-bold tracking-tight text-slate-50 md:text-base">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.location ?? location}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/70 px-2 py-1">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-50 text-[11px] font-bold leading-none">
                        <span className="text-[#4285F4]">G</span>
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{sourceLabel}</span>
                    </span>
                  </div>
                  <p className="mt-3.5 text-sm leading-relaxed text-slate-300 antialiased md:mt-4 md:text-[15px]">“{item.quote}”</p>
                  <div className="mt-3.5 flex items-center justify-between md:mt-4">
                    <div className="text-amber-400">★★★★★</div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-50 text-[12px] font-bold leading-none">
                        <span className="text-[#4285F4]">G</span>
                      </span>
                      <span>{sourceLabel}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TestimonialsMarquee);
