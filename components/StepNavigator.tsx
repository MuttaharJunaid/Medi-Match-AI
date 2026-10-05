'use client';

import React from 'react';
import { FileText, Dna, Search, ShieldCheck, Check } from 'lucide-react';

export type WorkflowStep = 1 | 2 | 3 | 4;

interface StepNavigatorProps {
  currentStep: WorkflowStep;
  onSelectStep: (step: WorkflowStep) => void;
  maxAccessibleStep: WorkflowStep;
}

const STEPS = [
  { step: 1, label: 'Clinical Intake', sublabel: 'Patient pathology', icon: FileText },
  { step: 2, label: 'Biomarkers', sublabel: 'Gemini 3.8 Extraction', icon: Dna },
  { step: 3, label: 'Matched Trials', sublabel: 'Qdrant Cloud Hybrid', icon: Search },
  { step: 4, label: 'NLI Safety Audit', sublabel: 'Zero Hallucination Proof', icon: ShieldCheck },
];

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep,
  onSelectStep,
  maxAccessibleStep,
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2 sm:p-3 shadow-sm">
      <nav aria-label="Workflow progress" className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.step;
          const isCompleted = s.step < currentStep && s.step <= maxAccessibleStep;
          const isAccessible = s.step <= maxAccessibleStep;

          return (
            <button
              key={s.step}
              type="button"
              disabled={!isAccessible}
              onClick={() => onSelectStep(s.step as WorkflowStep)}
              className={`flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl transition text-left group ${
                isActive
                  ? 'bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 shadow-sm'
                  : isAccessible
                  ? 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent cursor-pointer'
                  : 'opacity-40 cursor-not-allowed border border-transparent'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Step {s.step}
                  </span>
                </div>
                <div
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    isActive
                      ? 'text-teal-900 dark:text-teal-200'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate hidden sm:block">
                  {s.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
