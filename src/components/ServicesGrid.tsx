import { useEffect, useState } from 'react';

type ServiceItem = {
  title: string;
  description: string;
  icon: 'installation' | 'maintenance' | 'panel' | 'renovation' | 'ev';
};

type ServicesGridProps = {
  heading: string;
  items: ServiceItem[];
};

const iconClasses = 'h-6 w-6 text-cyan-400';

const ServiceIcon = ({ icon }: { icon: ServiceItem['icon'] }) => {
  if (icon === 'installation') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M6 18h12M8 18V8.8a1 1 0 0 1 .52-.88l3-1.65a1 1 0 0 1 .96 0l3 1.65a1 1 0 0 1 .52.88V18" />
        <path d="M12 6v12M10 12h4" />
      </svg>
    );
  }
  if (icon === 'maintenance') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M3 21l6.4-6.4m0 0a4 4 0 0 0 5.66 0l5.65-5.66a4 4 0 0 0-5.65-5.65l-.71.7 2.12 2.12-1.41 1.42-2.13-2.13-.7.71a4 4 0 0 0 0 5.66z" />
      </svg>
    );
  }
  if (icon === 'panel') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    );
  }
  if (icon === 'renovation') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
        <path d="M4 20h16M6 20V9l6-5 6 5v11" />
        <path d="M10.5 14h3l-1.8 4.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClasses}>
      <path d="M7 4h10l2 7H5l2-7zM6 11v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6" />
      <path d="M12 2v5M10 5h4" />
    </svg>
  );
};

const ServicesGrid = ({ heading, items }: ServicesGridProps) => {
  const [visible, setVisible] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    setVisible(items.map(() => false));
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisible((current) => {
              if (current[index]) {
                return current;
              }
              const next = [...current];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );

    const targets = document.querySelectorAll<HTMLElement>('[data-service-card]');
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [items.length]);

  return (
    <section className="bg-slate-950 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold text-slate-50">{heading}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              data-service-card
              data-index={index}
              className={`group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] ${
                visible[index] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="mb-4 inline-flex rounded-xl border border-slate-800 bg-slate-950/80 p-3 transition-colors duration-300 group-hover:border-cyan-400/70">
                <ServiceIcon icon={item.icon} />
              </div>
              <h3 className="text-xl font-bold text-slate-50">{item.title}</h3>
              <p className="mt-3 text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
