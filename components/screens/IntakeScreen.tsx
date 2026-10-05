'use client';

import React from 'react';

interface IntakeScreenProps {
  clinicalNote: string;
  setClinicalNote: (note: string) => void;
  audience: 'patient' | 'oncologist';
  setAudience: (aud: 'patient' | 'oncologist') => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const MIN_CHARACTERS = 60;

export const IntakeScreen: React.FC<IntakeScreenProps> = ({
  clinicalNote,
  setClinicalNote,
  audience,
  setAudience,
  onSubmit,
  isLoading,
}) => {
  const handleClearNote = () => {
    setClinicalNote('');
  };

  const charCount = clinicalNote.trim().length;
  const isEligibleToSubmit = charCount >= MIN_CHARACTERS;

  return (
    <div className="workflow-screen flex flex-col gap-space-lg" id="screen-1">
      {/* Header & Welcoming Patient Introduction */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
        <div className="flex flex-col gap-1 max-w-2xl">
          <span className="font-body-sm text-[12px] text-primary tracking-wider uppercase font-semibold">
            Personalized Trial Finder
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Tell Us About Your Diagnosis &amp; Treatments
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Paste your doctor's progress notes, pathology report, or simply describe your diagnosis and previous medications. We will match your information directly against active, recruiting clinical trials.
          </p>
        </div>

        {/* View Mode Switcher: Default to Patient View */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-lg shrink-0">
          <button
            type="button"
            className={`px-space-sm py-1.5 rounded font-body-sm text-body-sm transition-colors cursor-pointer ${
              audience === 'patient'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setAudience('patient')}
          >
            👤 Patient View
          </button>
          <button
            type="button"
            className={`px-space-sm py-1.5 rounded font-body-sm text-body-sm transition-colors cursor-pointer ${
              audience === 'oncologist'
                ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setAudience('oncologist')}
          >
            🩺 Doctor View
          </button>
        </div>
      </div>

      {/* Main Medical Summary Input Card */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-surface-container pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">description</span>
            <span className="font-headline-sm text-[14px] text-on-surface font-semibold">
              Medical Progress Notes or Health Summary
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            {/* Live Character Count with Minimum Threshold */}
            <span
              className={`font-body-sm text-[12px] ${
                charCount > 0 && !isEligibleToSubmit
                  ? 'text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-on-surface-variant'
              }`}
            >
              {charCount < MIN_CHARACTERS
                ? `${charCount} / ${MIN_CHARACTERS} characters minimum`
                : `${charCount.toLocaleString()} characters`}
            </span>
            {charCount > 0 && (
              <>
                <span className="text-outline-variant">|</span>
                <button
                  type="button"
                  className="text-error hover:underline font-body-sm text-[12px] font-medium transition-colors cursor-pointer"
                  onClick={handleClearNote}
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Guidance tip for patients */}
        <div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm text-on-surface-variant text-body-sm">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
            info
          </span>
          <span>
            Tip: You can include your cancer type, stage, genetic or tumor markers (if known), and any chemotherapies or therapies you have had.
          </span>
        </div>

        {/* Note textarea */}
        <div className="relative">
          <textarea
            className="w-full bg-surface-container-low text-on-surface font-body-md text-[14px] leading-relaxed p-space-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-y min-h-[220px]"
            id="clinical-note-input"
            placeholder="Type or paste your medical notes here... (e.g., diagnosed with metastatic colorectal cancer, completed FOLFOX, looking for targeted trials)"
            rows={9}
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
          />
        </div>

        {/* Character Count Validation Notice */}
        {charCount > 0 && !isEligibleToSubmit && (
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 font-body-sm text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>
              Please write at least {MIN_CHARACTERS} characters ({MIN_CHARACTERS - charCount} more needed) to provide enough clinical context for accurate trial matching.
            </span>
          </div>
        )}

        {/* Privacy & Submission Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-tertiary text-[18px]">lock</span>
            <span>Your medical notes are confidential and evaluated only for trial eligibility.</span>
          </div>

          <button
            type="button"
            disabled={isLoading || !isEligibleToSubmit}
            className={`w-full sm:w-auto px-space-xl py-space-sm rounded-lg font-headline-sm text-headline-sm font-semibold transition-all flex items-center justify-center gap-space-xs shadow-md ${
              isEligibleToSubmit && !isLoading
                ? 'bg-primary text-on-primary hover:bg-primary-container cursor-pointer'
                : 'bg-surface-container text-on-surface-variant opacity-60 cursor-not-allowed'
            }`}
            onClick={onSubmit}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Searching Matching Trials...</span>
              </>
            ) : (
              <>
                <span>Find Matching Trials</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
