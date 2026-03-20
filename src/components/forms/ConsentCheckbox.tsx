import type { ReactNode } from 'react';

type ConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
  children: ReactNode;
  tone?: 'default' | 'muted';
  disabled?: boolean;
};

export const ConsentCheckbox = ({
  checked,
  onChange,
  required = false,
  error,
  children,
  tone = 'default',
  disabled = false,
}: ConsentCheckboxProps) => {
  return (
    <label className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all duration-300 ${
      tone === 'muted' ? 'text-slate-400' : 'text-slate-300'
    } ${error ? 'border-red-400/60 bg-red-500/5' : 'border-slate-800 bg-slate-950/40'} ${disabled ? 'opacity-70' : 'hover:border-slate-700'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-600 transition-all duration-300 focus:ring-2 focus:ring-blue-500/40"
        required={required}
        disabled={disabled}
      />
      <span>{children}</span>
      {error ? <span className="sr-only">{error}</span> : null}
    </label>
  );
};
