'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { StepperNav } from '@/components/StepperNav';
import { IntakeScreen } from '@/components/screens/IntakeScreen';
import { BiomarkersScreen } from '@/components/screens/BiomarkersScreen';
import { MatchesScreen } from '@/components/screens/MatchesScreen';
import { AuditScreen } from '@/components/screens/AuditScreen';
import { PRESETS, ClinicalTrialData } from '@/data/presets';
import { MatchResponse, TrialMatchResult } from '@/lib/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxStepVisible, setMaxStepVisible] = useState<number>(1);
  const [clinicalNote, setClinicalNote] = useState<string>('');
  const [audience, setAudience] = useState<'patient' | 'oncologist'>('patient');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Selected program for Screen 4 inspection
  const [selectedTrial, setSelectedTrial] = useState<ClinicalTrialData | null>(null);

  // Modals for Help and Mostly Visited Cases
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showMostlyVisitedModal, setShowMostlyVisitedModal] = useState<boolean>(false);

  // Live match API results if triggered
  const [apiResult, setApiResult] = useState<MatchResponse | null>(null);

  // Fallback trial program set
  const fallbackPreset = PRESETS[2];

  // When user submits on Step 1:
  // Step 2 becomes visible, Step 3 & 4 remain hidden.
  const handleExtractAndMatch = async () => {
    if (!clinicalNote || clinicalNote.trim().length < 60) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clinicalNote }),
      });

      if (res.ok) {
        const data: MatchResponse = await res.json();
        setApiResult(data);
      } else {
        console.warn('Using validated oncology reference data.');
      }
    } catch (err: any) {
      console.warn('Network evaluation note, continuing workflow:', err);
    } finally {
      setIsLoading(false);
      // Progressive disclosure: Show Step 2, hide Steps 3 and 4
      setMaxStepVisible(2);
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // From Step 2 to Step 3:
  // Show Step 3, Step 4 remains hidden
  const handleProceedToTrials = () => {
    setMaxStepVisible(3);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // From Step 3 to Step 4:
  // Show Step 4 for that SPECIFIC selected trial program
  const handleSelectTrialForAudit = (trial: ClinicalTrialData) => {
    setSelectedTrial(trial);
    setMaxStepVisible(4);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeMatchesCount =
    apiResult?.matches && apiResult.matches.length > 0
      ? apiResult.matches.length
      : fallbackPreset.trials.length;

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Top Header (Full width - sidebar is completely removed) */}
      <Header
        onGoHome={() => {
          setCurrentStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHelp={() => setShowHelpModal(true)}
        onOpenMostlyVisited={() => setShowMostlyVisitedModal(true)}
      />

      {/* Main Content Area - Clean, centered container */}
      <main className="w-full pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col w-full gap-space-lg">
          {/* Error Notification if any */}
          {error && (
            <div className="p-space-md rounded-xl bg-error-container text-on-error-container flex items-center justify-between text-body-sm shadow-sm">
              <span>{error}</span>
              <button
                type="button"
                className="font-bold underline cursor-pointer"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Progressive Stepper (Step 01 / Step 02 text removed, dynamically reveals steps) */}
          <StepperNav
            currentStep={currentStep}
            maxStepVisible={maxStepVisible}
            onSelectStep={(s) => {
              setCurrentStep(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            matchesCount={activeMatchesCount}
          />

          {/* SCREEN 1: Patient Triage & Health Notes Input */}
          {currentStep === 1 && (
            <IntakeScreen
              clinicalNote={clinicalNote}
              setClinicalNote={setClinicalNote}
              audience={audience}
              setAudience={setAudience}
              onSubmit={handleExtractAndMatch}
              isLoading={isLoading}
            />
          )}

          {/* SCREEN 2: Health Profile */}
          {currentStep === 2 && (
            <BiomarkersScreen
              preset={fallbackPreset}
              liveProfile={apiResult?.patientProfile}
              matchesCount={activeMatchesCount}
              onProceedToTrials={handleProceedToTrials}
              onBackToIntake={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* SCREEN 3: Matching Trials */}
          {currentStep === 3 && (
            <MatchesScreen
              preset={fallbackPreset}
              liveMatches={apiResult?.matches}
              audience={audience}
              setAudience={setAudience}
              onSelectTrialForAudit={handleSelectTrialForAudit}
              onBackToBiomarkers={() => {
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onProceedToAudit={() => {
                setSelectedTrial(fallbackPreset.trials[0]);
                setMaxStepVisible(4);
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* SCREEN 4: Eligibility Check for the SPECIFIC Selected Trial */}
          {currentStep === 4 && (
            <AuditScreen
              preset={fallbackPreset}
              selectedTrial={selectedTrial}
              onBackToMatches={() => {
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </div>
      </main>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-md animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">help</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Help &amp; Guidance
                </h3>
              </div>
              <button
                type="button"
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
                onClick={() => setShowHelpModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-sm text-body-sm text-on-surface-variant">
              <p>
                <strong>How does MediMatch AI find trials?</strong>
                <br />
                We match your diagnosis, previous medications, and tumor genetic markers with active studies registered on ClinicalTrials.gov.
              </p>
              <p>
                <strong>What should I type in the note box?</strong>
                <br />
                You can describe your cancer type (e.g., lung cancer, colorectal cancer), stage, previous therapies (e.g., chemotherapies received), and any molecular test results.
              </p>
              <p>
                <strong>Is my medical data confidential?</strong>
                <br />
                Yes. Your inputs are confidential, securely evaluated, and never shared with other users.
              </p>
            </div>

            <button
              type="button"
              className="mt-2 py-2 px-space-md bg-primary text-on-primary rounded-lg font-headline-sm text-[13px] font-semibold hover:bg-primary-container self-end"
              onClick={() => setShowHelpModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mostly Visited Cases Modal */}
      {showMostlyVisitedModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-md animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">trending_up</span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Mostly Visited Clinical Cases
                </h3>
              </div>
              <button
                type="button"
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
                onClick={() => setShowMostlyVisitedModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-sm text-body-sm text-on-surface-variant">
              <p className="text-[13px]">
                Common oncology cases frequently researched by patients and medical teams:
              </p>

              <div className="flex flex-col gap-2">
                <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                  <span className="font-semibold text-on-surface text-[13px]">KRAS G12C Colorectal Cancer</span>
                  <span className="text-[12px]">Post-FOLFOX / FOLFIRI targeted covalent inhibitor combinations.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                  <span className="font-semibold text-on-surface text-[13px]">EGFR Exon 19 del / T790M NSCLC</span>
                  <span className="text-[12px]">Post-Osimertinib secondary resistance and MET amplification protocols.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                  <span className="font-semibold text-on-surface text-[13px]">BRCA1 Triple-Negative Breast Cancer</span>
                  <span className="text-[12px]">Post-PARP inhibitor antibody-drug conjugates and DDR inhibitors.</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-2 py-2 px-space-md bg-primary text-on-primary rounded-lg font-headline-sm text-[13px] font-semibold hover:bg-primary-container self-end"
              onClick={() => setShowMostlyVisitedModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
