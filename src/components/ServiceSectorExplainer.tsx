import SectorBadge from './SectorBadge';

type SectorExplainerItem = {
  title: string;
  description: string;
  icon: 'residential' | 'commercial' | 'industrial';
  useCases: string[];
};

type ServiceSectorExplainerProps = {
  heading: string;
  intro: string;
  items: SectorExplainerItem[];
};

const iconClass = 'h-6 w-6 transition-colors duration-300';

const SectorIcon = ({ icon }: { icon: SectorExplainerItem['icon'] }) => {
  if (icon === 'residential') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" />
        <path d="M9.5 20v-4.5h5V20" />
      </svg>
    );
  }
  if (icon === 'commercial') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h2v2H8zM12 8h2v2h-2zM16 8h2v2h-2zM8 12h2v2H8zM12 12h2v2h-2zM16 12h2v2h-2zM11 20v-4h2v4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
      <path d="M4 20h16M6 20V8l6-4 6 4v12M9 20v-3h6v3M9 11h6" />
    </svg>
  );
};

const ServiceSectorExplainer = ({ heading, intro, items }: ServiceSectorExplainerProps) => {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-6 opacity-0 translate-y-4" data-reveal data-stagger-parent>
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-slate-50 to-slate-50 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.36)] md:p-10">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">{heading}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-slate-600">{intro}</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {items.map((item) => (
              <article key={item.title} className="group rounded-2xl border border-slate-200/90 bg-white p-5 backdrop-blur-md opacity-0 translate-y-3 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-[0_14px_30px_rgba(8,47,73,0.24)]" data-stagger-item>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-xl border border-slate-200 bg-white p-3 text-cyan-700 transition-all duration-300 group-hover:border-cyan-400/70 group-hover:bg-white">
                    <SectorIcon icon={item.icon} />
                  </div>
                  <SectorBadge sector={item.icon} label={item.title} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 md:text-base">{item.description}</p>
                <ul className="mt-4 space-y-2 border-t border-slate-200/80 pt-4">
                  {item.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSectorExplainer;
