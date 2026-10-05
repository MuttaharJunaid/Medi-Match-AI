'use client';

import React from 'react';
import { PresetPatient } from '@/data/presets';
import { PatientClinicalProfile } from '@/lib/types';

interface BiomarkersScreenProps {
  preset: PresetPatient;
  liveProfile?: PatientClinicalProfile | null;
  matchesCount: number;
  onProceedToTrials: () => void;
  onBackToIntake: () => void;
}

export const BiomarkersScreen: React.FC<BiomarkersScreenProps> = ({
  preset,
  liveProfile,
  matchesCount,
  onProceedToTrials,
  onBackToIntake,
}) => {
  const displayDemographics = liveProfile
    ? `${liveProfile.gender || 'Patient'} • Age ${liveProfile.age || 54} • Status: ${
        liveProfile.performanceStatus || 'Good (ECOG 0)'
      }`
    : 'Patient • Age 54 • Performance Status: Good';

  const displayCondition = liveProfile
    ? `${liveProfile.primaryCondition}${
        liveProfile.stageOrGrade ? `, ${liveProfile.stageOrGrade}` : ''
      }`
    : preset.condition;

  const displayChips =
    liveProfile && liveProfile.biomarkers && liveProfile.biomarkers.length > 0
      ? liveProfile.biomarkers
      : preset.chips;

  const displaySynopsis =
    liveProfile?.extractedSummary ||
    'Medical summary: Confirmed metastatic cancer diagnosis following first-line and second-line systemic treatment. Key genetic markers identified. Good functional reserve.';

  return (
    <div className="workflow-screen flex flex-col gap-space-lg" id="screen-2">
      {/* Top Banner: Gentle Patient Profile Summary */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[28px]">medical_information</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-headline-lg text-headline-lg font-semibold text-on-surface">
                Your Health Profile
              </span>
              <span className="px-2 py-0.5 rounded text-body-sm font-medium bg-surface-container text-on-surface-variant">
                {displayDemographics}
              </span>
            </div>
            <span className="font-body-md text-body-md text-on-surface-variant">
              {displayCondition}
            </span>
          </div>
        </div>

        {/* Gentle verification badge (No model names, no latency) */}
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-tertiary/10 text-tertiary font-body-sm text-[12px] font-semibold">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Key Medical Factors Identified
          </span>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left 8-col: Key Markers & Treatments */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* Identified Markers Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">hub</span>
                Identified Clinical &amp; Lab Markers
              </span>
              <span className="font-body-sm text-[12px] text-outline uppercase font-semibold">
                Lab &amp; Clinical Findings
              </span>
            </div>

            {/* Chips Container */}
            <div className="flex flex-wrap gap-space-sm">
              {displayChips.map((chip, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-lg ${
                    idx === 0
                      ? 'bg-secondary-fixed/30 text-secondary font-semibold'
                      : 'bg-surface-container text-on-surface'
                  } font-body-md text-[13px]`}
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    check_circle
                  </span>
                  <span>{chip}</span>
                </div>
              ))}
            </div>

            {/* Clinical Synopsis Quote */}
            <div className="p-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md italic mt-space-xs relative">
              <span className="text-outline-variant font-display-lg absolute top-1 left-2 select-none">
                “
              </span>
              <p className="pl-space-md">{displaySynopsis}</p>
            </div>
          </div>

          {/* Treatment History Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-outline text-[20px]">history_edu</span>
              Treatment History &amp; Prior Therapies
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              {(liveProfile?.priorTherapies && liveProfile.priorTherapies.length > 0
                ? liveProfile.priorTherapies.map((t, i) => ({
                    line: `Regimen ${i + 1}`,
                    status: 'Documented',
                    treatment: t,
                    details: 'Documented prior therapy evaluated for trial eligibility.',
                  }))
                : preset.therapies
              ).map((therapy, idx) => (
                <div key={idx} className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
                      {therapy.line}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-body-sm bg-surface-container-high text-on-surface font-semibold">
                      {therapy.status}
                    </span>
                  </div>
                  <span className="font-headline-sm text-[14px] text-on-surface font-semibold">
                    {therapy.treatment}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {therapy.details}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4-col: Search Summary Sidecard (No DB jargon like BM25 or embedding models) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md h-full justify-between">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
                  Trial Search Summary
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              </div>

              <div className="flex flex-col">
                <span className="font-display-lg text-display-lg text-primary font-bold">
                  {matchesCount} Trials Found
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Matching your specific condition and treatments
                </span>
              </div>

              {/* Patient-friendly checklist */}
              <div className="flex flex-col gap-space-xs pt-space-xs font-body-sm text-[13px]">
                <div className="flex justify-between py-1.5 bg-surface-container-low px-2.5 rounded">
                  <span className="text-on-surface-variant">Database:</span>
                  <span className="text-on-surface font-medium">National Clinical Registry</span>
                </div>
                <div className="flex justify-between py-1.5 bg-surface-container-low px-2.5 rounded">
                  <span className="text-on-surface-variant">Enrollment Status:</span>
                  <span className="text-tertiary font-semibold">Actively Recruiting</span>
                </div>
                <div className="flex justify-between py-1.5 bg-surface-container-low px-2.5 rounded">
                  <span className="text-on-surface-variant">Criteria Matched:</span>
                  <span className="text-on-surface font-medium">Condition &amp; Prior Care</span>
                </div>
                <div className="flex justify-between py-1.5 bg-surface-container-low px-2.5 rounded">
                  <span className="text-on-surface-variant">Safety Verification:</span>
                  <span className="text-tertiary font-semibold">Checked Against Rules</span>
                </div>
              </div>

              <div className="p-space-sm bg-surface-container rounded-lg text-on-surface-variant font-body-sm text-body-sm">
                These clinical trials match your cancer characteristics and treatment history, offering targeted investigative treatment options.
              </div>
            </div>

            <div className="flex flex-col gap-space-xs pt-space-md">
              <button
                type="button"
                className="w-full py-space-sm bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-space-xs shadow-md cursor-pointer"
                onClick={onProceedToTrials}
              >
                <span>View Matching Trials ({matchesCount})</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                type="button"
                className="w-full py-2 bg-transparent text-on-surface-variant hover:text-on-surface font-body-sm text-[13px] transition-colors text-center cursor-pointer"
                onClick={onBackToIntake}
              >
                ← Edit Your Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
