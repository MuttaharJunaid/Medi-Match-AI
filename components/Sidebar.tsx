'use client';

import React from 'react';

interface SidebarProps {
  activeTab: 'workflow' | 'evals';
  onSelectTab: (tab: 'workflow' | 'evals') => void;
  activeStep: number;
  onSelectStep: (step: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  activeStep,
  onSelectStep,
}) => {
  const activeClass =
    'bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]';
  const inactiveClass =
    'text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors';

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-space-lg">
        {/* Brand Header */}
        <div
          className="px-space-lg flex items-center gap-space-sm cursor-pointer"
          onClick={() => {
            onSelectTab('workflow');
            onSelectStep(1);
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-on-primary text-[20px]">
              health_and_safety
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              MediMatch AI
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Clinical Trial Finder
            </span>
          </div>
        </div>

        {/* Engine Status Badge - Simple & Reassuring */}
        <div className="px-space-md">
          <div className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container rounded-lg">
            <span className="material-symbols-outlined text-tertiary text-[16px]">
              verified
            </span>
            <span className="font-body-sm text-[12px] text-on-surface font-medium">
              Verified Clinical Trials
            </span>
          </div>
        </div>

        {/* Navigation Items with Patient-Friendly Language */}
        <nav className="flex flex-col gap-space-xs px-space-md">
          <div className="px-space-sm py-space-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Your Trial Search
          </div>

          {/* Step 1: Your Medical Details */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('workflow');
              onSelectStep(1);
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${
              activeTab === 'workflow' && activeStep === 1 ? activeClass : inactiveClass
            }`}
          >
            <span className="font-body-md text-body-md">Your Medical Details</span>
          </button>

          {/* Step 2: Your Health Profile */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('workflow');
              onSelectStep(2);
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${
              activeTab === 'workflow' && activeStep === 2 ? activeClass : inactiveClass
            }`}
          >
            <span className="font-body-md text-body-md">Your Health Profile</span>
          </button>

          {/* Step 3: Matching Trials */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('workflow');
              onSelectStep(3);
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${
              activeTab === 'workflow' && activeStep === 3 ? activeClass : inactiveClass
            }`}
          >
            <span className="font-body-md text-body-md">Matching Trials</span>
          </button>

          {/* Step 4: Eligibility Check */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('workflow');
              onSelectStep(4);
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${
              activeTab === 'workflow' && activeStep === 4 ? activeClass : inactiveClass
            }`}
          >
            <span className="font-body-md text-body-md">Eligibility Check</span>
          </button>

          {/* Quality & Standards Section */}
          <div className="px-space-sm pt-space-md pb-space-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Quality &amp; Standards
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectTab('evals');
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${
              activeTab === 'evals' ? activeClass : inactiveClass
            }`}
          >
            <span className="font-body-md text-body-md">Accuracy &amp; Verification</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('evals');
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${inactiveClass}`}
          >
            <span className="font-body-md text-body-md">Quality Benchmarks</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('evals');
            }}
            className={`flex items-center gap-space-sm px-space-sm py-space-xs text-left w-full ${inactiveClass}`}
          >
            <span className="font-body-md text-body-md">Medical Reference Guide</span>
          </button>
        </nav>
      </div>

      {/* Bottom Clinical Database Status */}
      <div className="px-space-md flex flex-col gap-space-sm">
        <div className="p-space-sm bg-surface-container rounded-lg flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-on-surface uppercase">
              Clinical Database
            </span>
            <span className="font-body-sm text-[11px] text-tertiary font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              CONNECTED
            </span>
          </div>
          <span className="font-body-sm text-[12px] text-on-surface-variant">
            Over 480,000 Active Trials
          </span>
        </div>

        <a
          className="flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          href="https://clinicaltrials.gov"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="font-body-sm text-[12px]">ClinicalTrials.gov</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </a>
      </div>
    </aside>
  );
};
