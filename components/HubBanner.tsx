'use client';

import React from 'react';

interface HubBannerProps {
  activeTab: 'workflow' | 'evals';
  onSelectTab: (tab: 'workflow' | 'evals') => void;
}

export const HubBanner: React.FC<HubBannerProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Patient-Centric Heading */}
      <div className="flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-sm shrink-0">
          <span className="material-symbols-outlined text-on-primary-container text-[22px]">
            favorite
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
              MediMatch AI
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-body-sm bg-tertiary/10 text-tertiary font-semibold">
              Personalized Trial Matching
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Find actively recruiting clinical trials tailored to your specific diagnosis and treatments.
          </span>
        </div>
      </div>

      {/* Mode Switcher Tabs - Easy wording */}
      <div className="inline-flex p-1 bg-surface-container rounded-lg self-center">
        <button
          type="button"
          onClick={() => onSelectTab('workflow')}
          className={`px-space-md py-1.5 rounded-md font-body-sm text-[13px] transition-all flex items-center gap-1.5 ${
            activeTab === 'workflow'
              ? 'shadow-sm bg-surface-container-lowest text-primary font-semibold'
              : 'font-medium text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">search</span>
          Find Matching Trials
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('evals')}
          className={`px-space-md py-1.5 rounded-md font-body-sm text-[13px] transition-all flex items-center gap-1.5 ${
            activeTab === 'evals'
              ? 'shadow-sm bg-surface-container-lowest text-primary font-semibold'
              : 'font-medium text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">verified</span>
          Accuracy &amp; Standards
        </button>
      </div>

      {/* Right Trust & Privacy Status (No technical latency) */}
      <div className="flex items-center gap-space-sm self-end md:self-center">
        <div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="font-body-sm text-[12px] text-on-surface font-medium">
            Confidential &amp; Private
          </span>
        </div>
      </div>
    </div>
  );
};
