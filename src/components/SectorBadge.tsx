export type SectorKey = 'residential' | 'commercial' | 'industrial';

type SectorBadgeProps = {
  sector: SectorKey;
  label: string;
  muted?: boolean;
};

const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide';

const activeClasses: Record<SectorKey, string> = {
  residential: 'border-blue-400/55 bg-blue-500/10 text-blue-300',
  commercial: 'border-cyan-400/55 bg-cyan-500/10 text-cyan-300',
  industrial: 'border-amber-400/55 bg-amber-500/10 text-amber-300',
};

const mutedClasses: Record<SectorKey, string> = {
  residential: 'border-slate-700 bg-slate-950/70 text-slate-500',
  commercial: 'border-slate-700 bg-slate-950/70 text-slate-500',
  industrial: 'border-slate-700 bg-slate-950/70 text-slate-500',
};

export const resolveSectorKey = (value: string): SectorKey => {
  const normalized = value.toLowerCase();
  if (normalized.includes('resid')) return 'residential';
  if (normalized.includes('comer') || normalized.includes('commerc')) return 'commercial';
  return 'industrial';
};

const SectorBadge = ({ sector, label, muted = false }: SectorBadgeProps) => {
  const tone = muted ? mutedClasses[sector] : activeClasses[sector];
  return <span className={`${baseClasses} ${tone}`}>{label}</span>;
};

export default SectorBadge;
