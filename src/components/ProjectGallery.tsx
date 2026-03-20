import { useEffect, useState } from 'react';

type GalleryProject = {
  title: string;
  sector: string;
  location: string;
  summary: string;
  beforeImage: string;
  afterImage: string;
};

type ProjectGalleryProps = {
  heading: string;
  projects: GalleryProject[];
};

const ProjectGallery = ({ heading, projects }: ProjectGalleryProps) => {
  const [visible, setVisible] = useState<boolean[]>(() => projects.map(() => false));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setVisible(projects.map(() => false));
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const index = Number(entry.target.getAttribute('data-gallery-index'));
          setVisible((current) => {
            if (current[index]) {
              return current;
            }
            const next = [...current];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    const cards = document.querySelectorAll<HTMLElement>('[data-gallery-card]');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projects.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <>
      <section id="projects" className="bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-50 md:text-4xl">{heading}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-gallery-card
                data-gallery-index={index}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] ${
                  visible[index] ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <button type="button" className="block w-full text-left" onClick={() => setActiveIndex(index)}>
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={project.beforeImage} alt={`${project.title} before`} className="h-44 w-full object-cover" loading="lazy" />
                      <span className="absolute left-2 top-2 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-50">Before</span>
                    </div>
                    <div className="relative">
                      <img src={project.afterImage} alt={`${project.title} after`} className="h-44 w-full object-cover" loading="lazy" />
                      <span className="absolute left-2 top-2 rounded-full bg-cyan-400/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">After</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-50">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{project.sector} · {project.location}</p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm text-slate-200">{project.summary}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-[0_0_40px_rgba(15,23,42,0.8)] animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-50">{activeProject.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{activeProject.sector} · {activeProject.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-400 transition-all duration-300 hover:border-cyan-400/70 hover:text-slate-50"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <img src={activeProject.beforeImage} alt={`${activeProject.title} before`} className="h-64 w-full object-cover md:h-80" />
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <img src={activeProject.afterImage} alt={`${activeProject.title} after`} className="h-64 w-full object-cover md:h-80" />
              </div>
            </div>
            <p className="mt-5 text-slate-300">{activeProject.summary}</p>
          </div>
          <button type="button" aria-label="Close lightbox" className="absolute inset-0 -z-10 cursor-default" onClick={() => setActiveIndex(null)} />
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
