import { useState } from 'react';

type HomeAgeOption = 'pre-1990' | '1990-2010' | 'post-2010';
type IssueOption = 'flickering' | 'tripping' | 'warm-panel' | 'outlet-loss';
type RiskLevel = 'Low' | 'Medium' | 'High';

const ageOptions: Array<{ value: HomeAgeOption; label: string }> = [
  { value: 'pre-1990', label: 'Built before 1990' },
  { value: '1990-2010', label: 'Built 1990–2010' },
  { value: 'post-2010', label: 'Built after 2010' },
];

const issueOptions: Array<{ value: IssueOption; label: string }> = [
  { value: 'flickering', label: 'Flickering lights' },
  { value: 'tripping', label: 'Frequent breaker trips' },
  { value: 'warm-panel', label: 'Warm or buzzing panel' },
  { value: 'outlet-loss', label: 'Intermittent outlet failure' },
];

const riskCopy: Record<RiskLevel, string> = {
  High: 'Your profile indicates elevated probability of overload, conductor fatigue, or compliance gaps. Immediate professional diagnostics are recommended.',
  Medium: 'Your profile indicates developing reliability issues that may impact safety and future load expansion. Schedule a targeted corrective evaluation.',
  Low: 'Your profile indicates stable conditions, but annual NEC-aligned verification is still recommended to protect long-term performance.',
};

const riskAccent: Record<RiskLevel, string> = {
  High: 'text-cyan-400',
  Medium: 'text-blue-500',
  Low: 'text-slate-50',
};

const calculateRisk = (homeAge: HomeAgeOption, issues: IssueOption[]): RiskLevel => {
  let score = 0;
  if (homeAge === 'pre-1990') score += 3;
  if (homeAge === '1990-2010') score += 1;
  score += issues.length * 2;
  if (issues.includes('warm-panel')) score += 2;
  if (score >= 6) return 'High';
  if (score >= 3) return 'Medium';
  return 'Low';
};

const ElectricalHealthCheck = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [homeAge, setHomeAge] = useState<HomeAgeOption | null>(null);
  const [issues, setIssues] = useState<IssueOption[]>([]);
  const [risk, setRisk] = useState<RiskLevel | null>(null);

  const onSelectAge = (age: HomeAgeOption) => {
    setHomeAge(age);
    setStep(2);
  };

  const onToggleIssue = (issue: IssueOption) => {
    setIssues((previous) =>
      previous.includes(issue) ? previous.filter((item) => item !== issue) : [...previous, issue]
    );
  };

  const onCalculate = () => {
    if (!homeAge) return;
    setRisk(calculateRisk(homeAge, issues));
    setStep(3);
  };

  const onReset = () => {
    setStep(1);
    setHomeAge(null);
    setIssues([]);
    setRisk(null);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-md">
      <div className="mb-8 grid grid-cols-3 gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <div className={`rounded-lg border px-3 py-2 text-center ${step >= 1 ? 'border-blue-600 text-slate-50' : 'border-slate-800'}`}>Profile</div>
        <div className={`rounded-lg border px-3 py-2 text-center ${step >= 2 ? 'border-blue-600 text-slate-50' : 'border-slate-800'}`}>Indicators</div>
        <div className={`rounded-lg border px-3 py-2 text-center ${step >= 3 ? 'border-blue-600 text-slate-50' : 'border-slate-800'}`}>Assessment</div>
      </div>

      {step === 1 && (
        <div>
          <h3 className="mb-3 text-2xl font-bold text-slate-50">Step 1: Select Property Build Era</h3>
          <p className="mb-5 text-slate-400">Older electrical architecture usually carries higher modernization priority under current NEC expectations.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelectAge(option.value)}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-slate-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/70 hover:bg-slate-900"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="mb-3 text-2xl font-bold text-slate-50">Step 2: Flag Electrical Symptoms</h3>
          <p className="mb-5 text-slate-400">Select all observed issues. Multiple active symptoms usually indicate compounding load or distribution weaknesses.</p>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {issueOptions.map((option) => {
              const isActive = issues.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => onToggleIssue(option.value)}
                  className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-blue-600 bg-blue-600/20 text-slate-50'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-cyan-400/70 hover:text-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={onCalculate}
            className="w-full rounded-full bg-blue-600 px-8 py-3.5 font-bold text-slate-50 shadow-[0_0_24px_rgba(37,99,235,0.55)] transition-all duration-300 hover:bg-blue-500"
          >
            Generate Risk Assessment
          </button>
        </div>
      )}

      {step === 3 && risk && (
        <div className="animate-accordion-down rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-center">
          <h3 className="mb-2 text-2xl font-bold text-slate-50">
            Risk Assessment:{' '}
            <span className={riskAccent[risk]}>
              {risk}
            </span>
          </h3>
          <p className="mx-auto mb-7 max-w-xl text-slate-400">{riskCopy[risk]}</p>
          <a
            href="#book-consultation"
            className="inline-flex rounded-full bg-blue-600 px-8 py-3.5 font-bold text-slate-50 shadow-[0_0_24px_rgba(37,99,235,0.55)] transition-all duration-300 hover:bg-blue-500"
          >
            Book a Certified US Electrical Professional
          </a>
          <div>
            <button onClick={onReset} className="mt-5 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-50">
              Restart Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectricalHealthCheck;
