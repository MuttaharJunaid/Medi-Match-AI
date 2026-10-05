'use client';

import React from 'react';
import { PresetPatient, ClinicalTrialData } from '@/data/presets';
import { TrialMatchResult } from '@/lib/types';

interface MatchesScreenProps {
  preset: PresetPatient;
  liveMatches?: TrialMatchResult[] | null;
  audience: 'patient' | 'oncologist';
  setAudience: (aud: 'patient' | 'oncologist') => void;
  onSelectTrialForAudit: (trial: ClinicalTrialData) => void;
  onBackToBiomarkers: () => void;
  onProceedToAudit: () => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({
  preset,
  liveMatches,
  audience,
  setAudience,
  onSelectTrialForAudit,
  onBackToBiomarkers,
  onProceedToAudit,
}) => {
  const trials: ClinicalTrialData[] =
    liveMatches && liveMatches.length > 0
      ? liveMatches.map((m, idx) => ({
          nctId: m.trial.nctId,
          phase: m.trial.phase.join(', ') || 'Phase 2',
          status: m.trial.overallStatus || 'RECRUITING',
          matchScore: m.relevanceScore,
          title: m.trial.briefTitle || m.trial.officialTitle,
          sponsor: m.trial.leadSponsor || 'Clinical Research Network',
          sites:
            m.trial.locations && m.trial.locations.length > 0
              ? m.trial.locations
                  .slice(0, 3)
                  .map((l) => l.facility)
                  .join(', ')
              : 'Medical Centers Nationwide',
          oncologistReasoning: m.clinicalRationale,
          patientExplanation: m.laymanSummary,
          tags: [
            ...m.matchingBiomarkers.map((b) => `Marker: ${b}`),
            ...m.matchedInclusions.slice(0, 2),
          ],
          claimsCount: m.verifiedClaims ? m.verifiedClaims.length : 3,
          accentColor:
            idx === 0
              ? 'primary'
              : idx === 1
              ? 'secondary'
              : idx === 2
              ? 'secondary-container'
              : 'outline-variant',
          claims: m.verifiedClaims?.map((vc, i) => ({
            id: vc.id || `claim-${i}`,
            title: `Point 0${i + 1} • ${vc.claimText}`,
            status: 'Eligible (Verified Match)',
            groundedScore: `${Math.round(vc.confidenceScore * 100)}%`,
            inferredHypothesis: `“${vc.claimText}”`,
            protocolPremise: `“${vc.evidenceQuote}”`,
            rationale: vc.reasoning,
          })),
          inclusionCriteria: m.trial.eligibility?.inclusionCriteria,
          exclusionCriteria: m.trial.eligibility?.exclusionCriteria,
        }))
      : preset.trials;

  const getAccentBgClass = (accent: string) => {
    switch (accent) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'secondary-container':
        return 'bg-secondary-container';
      case 'outline-variant':
      default:
        return 'bg-outline-variant';
    }
  };

  const getScoreBadgeClass = (accent: string) => {
    switch (accent) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'secondary':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-surface-container text-on-surface';
    }
  };

  return (
    <div className="workflow-screen flex flex-col gap-space-lg" id="screen-3">
      {/* Header */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs">
            <span className="font-body-sm text-[12px] text-primary tracking-wider uppercase font-semibold">
              Active Clinical Studies
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-body-sm bg-tertiary/10 text-tertiary font-bold">
              {trials.length} Matches Found
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
            Clinical Trials Tailored to Your Diagnosis
          </h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Ranked by relevance and official study eligibility rules.
          </span>
        </div>

        {/* Audience Switcher */}
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-lg">
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
      </div>

      {/* Clinical Trial Cards */}
      <div className="flex flex-col gap-space-md">
        {trials.map((trial, idx) => {
          const isTopMatch = idx === 0;

          return (
            <div
              key={trial.nctId}
              className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md relative overflow-hidden"
            >
              {/* Left Color Accent Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${getAccentBgClass(
                  trial.accentColor
                )}`}
              ></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <a
                    className="font-body-md text-primary hover:underline font-semibold flex items-center gap-1"
                    href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>{trial.nctId}</span>
                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                  </a>
                  <span className="px-2 py-0.5 rounded text-[11px] font-label-caps bg-surface-container text-on-surface uppercase font-semibold">
                    {trial.phase}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-body-sm bg-tertiary/10 text-tertiary font-semibold uppercase">
                    {trial.status}
                  </span>
                </div>

                {/* Match Score Pill */}
                <div
                  className={`flex items-center gap-space-xs px-space-md py-1 rounded-full font-body-md font-bold ${getScoreBadgeClass(
                    trial.accentColor
                  )}`}
                >
                  <span className="material-symbols-outlined text-[17px]">verified</span>
                  <span>{trial.matchScore}% Match</span>
                </div>
              </div>

              {/* Title & Sponsor */}
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  {trial.title}
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Lead Sponsor: {trial.sponsor} • Top Locations: {trial.sites}
                </span>
              </div>

              {/* Patient vs Doctor Explanation */}
              {audience === 'patient' ? (
                <div className="dynamic-patient p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                  <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
                    What this trial means for you (Plain-Language Explanation)
                  </span>
                  <p className="font-body-md text-body-md text-on-surface">
                    {trial.patientExplanation}
                  </p>
                </div>
              ) : (
                <div className="dynamic-oncologist p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                  <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
                    Clinical Protocol Reasoning &amp; Inclusion Logic
                  </span>
                  <p className="font-body-md text-body-md text-on-surface">
                    {trial.oncologistReasoning}
                  </p>
                </div>
              )}

              {/* Card Footer tags and action button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md pt-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs font-body-sm text-[12px] text-on-surface-variant">
                  {trial.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-surface-container">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button passes this exact trial object */}
                <button
                  type="button"
                  className={`px-space-md py-space-sm rounded-lg font-body-md text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                    isTopMatch
                      ? 'bg-primary text-on-primary hover:bg-primary-container'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                  onClick={() => onSelectTrialForAudit(trial)}
                >
                  <span>See Why You Qualify ({trial.claimsCount} Factors)</span>
                  <span className="material-symbols-outlined text-[17px]">shield</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Screen 3 Footer Navigation */}
      <div className="flex items-center justify-between pt-space-xs">
        <button
          type="button"
          className="px-space-md py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container font-body-sm text-[13px] rounded-lg transition-colors cursor-pointer"
          onClick={onBackToBiomarkers}
        >
          ← Back to Your Health Profile
        </button>

        <button
          type="button"
          className="px-space-xl py-space-sm bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm font-semibold hover:bg-primary-container transition-all flex items-center gap-space-xs shadow-md cursor-pointer"
          onClick={() => {
            if (trials.length > 0) {
              onSelectTrialForAudit(trials[0]);
            } else {
              onProceedToAudit();
            }
          }}
        >
          <span>Review Eligibility Details</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
