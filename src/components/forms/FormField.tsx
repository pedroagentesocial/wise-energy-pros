type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  helperText?: string;
  successText?: string;
  compact?: boolean;
  type?: 'text' | 'email' | 'tel';
  textarea?: boolean;
  rows?: number;
  inputMode?: 'text' | 'numeric' | 'email';
  autoComplete?: string;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  onBlur: () => void;
  onChange: (value: string) => void;
};

export const FormField = ({
  id,
  label,
  value,
  placeholder,
  error,
  helperText,
  successText,
  compact = false,
  type = 'text',
  textarea = false,
  rows = 4,
  inputMode = 'text',
  autoComplete = 'off',
  maxLength,
  disabled = false,
  required = false,
  onBlur,
  onChange,
}: FormFieldProps) => {
  const inputClass = `w-full rounded-xl border bg-slate-950/90 px-4 text-slate-50 placeholder:text-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 ${
    compact ? 'py-2.5 text-sm' : 'py-3 text-sm'
  } ${
    error
      ? 'border-red-400/70 bg-red-500/5 focus:border-red-400/80 focus:ring-red-400/35'
      : successText
      ? 'border-cyan-400/60 focus:border-cyan-400/75 focus:ring-cyan-400/35'
      : 'border-slate-800 focus:border-cyan-400/70 focus:ring-cyan-400/30'
  } ${disabled ? 'cursor-not-allowed opacity-70' : ''} ${!disabled ? 'hover:border-slate-700' : ''}`;

  return (
    <div className="space-y-1.5">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={inputClass}
          autoComplete={autoComplete}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={`${helperText ? `${id}-helper` : ''}${error ? ` ${id}-error` : ''}`.trim() || undefined}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={inputClass}
          autoComplete={autoComplete}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={`${helperText ? `${id}-helper` : ''}${error ? ` ${id}-error` : ''}`.trim() || undefined}
          required={required}
        />
      )}
      {helperText && (
        <p id={`${id}-helper`} className="text-xs text-slate-500 transition-colors duration-300">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-300 animate-in fade-in duration-200">
          {error}
        </p>
      )}
      {!error && successText && <p className="text-xs font-medium text-cyan-400 animate-in fade-in duration-200">{successText}</p>}
    </div>
  );
};
