'use client';

import React from 'react';

interface StepperNavProps {
  currentStep: number;
  maxStepVisible: number;
  onSelectStep: (step: number) => void;
  matchesCount?: number;
}

export const StepperNav: React.FC<StepperNavProps> = ({
  currentStep,
  maxStepVisible,
  onSelectStep,
  matchesCount = 4,
}) => {
  const allSteps = [
    {
      num: 1,
      title: 'Your Details',
      icon: 'description',
    },
    {
      num: 2,
      title: 'Your Health Profile',
      icon: 'medical_services',
    },
    {
      num: 3,
      title: `Matching Trials (${matchesCount})`,
      icon: 'travel_explore',
    },
    {
      num: 4,
      title: 'Eligibility Check',
      icon: 'verified_user',
    },
  ];

  // Only show steps up to maxStepVisible (progressive disclosure)
  const visibleSteps = allSteps.filter((s) => s.num <= maxStepVisible);

  // Dynamic grid columns based on number of visible steps
  const gridClass =
    visibleSteps.length === 1
      ? 'grid-cols-1'
      : visibleSteps.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : visibleSteps.length === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-2 md:grid-cols-4';

  return (
    <div
      className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-space-md transition-all"
      id="workflow-stepper-container"
    >
      <div className={`w-full grid ${gridClass} gap-space-sm`}>
        {visibleSteps.map((step) => {
          const isActive = currentStep === step.num;
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => onSelectStep(step.num)}
              className={`flex items-center gap-space-sm p-space-sm rounded-lg transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-surface-container-lowest/20' : 'bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`font-headline-sm text-[13px] truncate leading-tight ${
                    isActive ? 'font-semibold' : 'font-medium'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
