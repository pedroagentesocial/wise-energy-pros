import { useEffect, useRef, useState } from 'react';

type WhyChooseItem = {
  title: string;
  description: string;
  icon: 'licensed' | 'fast' | 'technicians' | 'multiSector' | 'pricing' | 'materials' | 'satisfaction';
};

type WhyChooseGridProps = {
  heading: string;
  intro: string;
  items: WhyChooseItem[];
};

const iconClasses = 'h-6 w-6 text-cyan-300 transition-colors duration-300';

const WhyChooseIcon = ({ icon }: { icon: WhyChooseItem['icon'] }) => {
  if (icon === 'licensed') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M12 3l7 3v5c0 4.2-2.6 7.6-7 10-4.4-2.4-7-5.8-7-10V6l7-3Z" />
        <path d="m9.2 12.3 1.9 1.9 3.7-3.7" />
      </svg>
    );
  }
  if (icon === 'fast') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M4 14h5l-1 6 8-10h-5l1-6-8 10Z" />
      </svg>
    );
  }
  if (icon === 'technicians') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <circle cx="8" cy="7" r="2.5" />
        <circle cx="16" cy="7" r="2.5" />
        <path d="M3.5 20v-1.5A3.5 3.5 0 0 1 7 15h2a3.5 3.5 0 0 1 3.5 3.5V20" />
        <path d="M11.5 20v-1.5A3.5 3.5 0 0 1 15 15h2a3.5 3.5 0 0 1 3.5 3.5V20" />
      </svg>
    );
  }
  if (icon === 'pricing') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <rect x="4" y="5" width="16" height="14" rx="2.2" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    );
  }
  if (icon === 'multiSector') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M4 20h16M6 20V9l6-4 6 4v11" />
        <path d="M8 13h8M12 9v8" />
      </svg>
    );
  }
  if (icon === 'materials') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M4 14h16M6 14V7h12v7M8 14v5M16 14v5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
      <path d="M12 21s-7-3.8-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 6.2-7 10-7 10Z" />
    </svg>
  );
};

const WhyChooseGrid = ({ heading, intro, items }: WhyChooseGridProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    setVisibleCards(items.map(() => false));
    setSectionVisible(false);
  }, [items]);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;
    const timers = items.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCards((current) => {
          if (current[index]) return current;
          const next = [...current];
          next[index] = true;
          return next;
        });
      }, index * 90)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [items, sectionVisible]);

  return (
    <section ref={sectionRef} className="bg-slate-950 py-16 md:py-20">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ease-out ${
          sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <h2 className="text-center text-3xl font-bold text-slate-50 md:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-slate-400 md:text-lg">{intro}</p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className={`group rounded-2xl border border-slate-800/90 bg-slate-900/45 p-5 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/65 hover:shadow-[0_14px_30px_rgba(15,23,42,0.45)] hover:shadow-cyan-400/20 md:p-6 ${
                visibleCards[index] ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <div className="mb-4 inline-flex rounded-xl border border-slate-800 bg-slate-950/80 p-3 transition-all duration-500 ease-out group-hover:border-cyan-400/70 group-hover:bg-slate-900">
                <WhyChooseIcon icon={item.icon} />
              </div>
              <h3 className="text-lg font-bold leading-snug text-slate-50 md:text-xl">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400 md:text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseGrid;
