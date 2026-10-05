'use client';

import React, { useState } from 'react';
import { TrialMatchResult } from '@/lib/types';
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  MapPin,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  User,
  Quote,
  Building,
} from 'lucide-react';

interface TrialCardProps {
  match: TrialMatchResult;
  viewMode: 'doctor' | 'patient';
}

export const TrialCard: React.FC<TrialCardProps> = ({ match, viewMode }) => {
  const [showEvidence, setShowEvidence] = useState(false);
  const { trial } = match;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <a
              href={`https://clinicaltrials.gov/study/${trial.nctId}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>{trial.nctId}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Phase {trial.phase.join(' / ')}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              {trial.overallStatus}
            </span>
          </div>

          <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
            {trial.briefTitle}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <Building className="w-3.5 h-3.5" />
            <span>{trial.leadSponsor}</span>
          </div>
        </div>

        {/* Match Relevance Score Badge */}
        <div className="flex sm:flex-col items-center justify-between sm:items-end bg-teal-50 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/60 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 dark:text-teal-400">
            Eligibility Fit
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-teal-700 dark:text-teal-300">
            {match.relevanceScore}%
          </span>
        </div>
      </div>

      {/* Biomarker Tags */}
      {match.matchingBiomarkers.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="text-xs text-slate-400 mr-1">Matched Alterations:</span>
          {match.matchingBiomarkers.map((b, i) => (
            <span
              key={i}
              className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60"
            >
              ✓ {b}
            </span>
          ))}
        </div>
      )}

      {/* Synthesis Content based on View Mode */}
      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/60 mb-4">
        <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          {viewMode === 'doctor' ? (
            <>
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Clinical Inclusion & Mechanism Rationale</span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>Plain-Language Patient Summary</span>
            </>
          )}
        </div>

        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          {viewMode === 'doctor' ? match.clinicalRationale : match.laymanSummary}
        </p>

        {/* Doctor view: matched inclusions & exclusions */}
        {viewMode === 'doctor' && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                Matched Inclusion Criteria:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                {match.matchedInclusions.map((inc, idx) => (
                  <li key={idx} className="line-clamp-2" title={inc}>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                Potential Exclusion Flags to Verify:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                {match.potentialExclusions.map((exc, idx) => (
                  <li key={idx} className="line-clamp-2" title={exc}>
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Locations */}
      {trial.locations.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-medium text-slate-700 dark:text-slate-300">Active Sites:</span>
          {trial.locations.slice(0, 3).map((loc, i) => (
            <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {loc.facility} ({loc.city}, {loc.state})
            </span>
          ))}
          {trial.locations.length > 3 && (
            <span className="text-slate-400">+{trial.locations.length - 3} more</span>
          )}
        </div>
      )}

      {/* NLI Fact-Checking Audit Section */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
        <button
          type="button"
          onClick={() => setShowEvidence(!showEvidence)}
          className="w-full flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition py-1"
        >
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              NLI Claim Grounding Audit ({match.verifiedClaims.length} Claims Verified)
            </span>
          </div>
          <div className="flex items-center space-x-1 text-teal-600 dark:text-teal-400">
            <span>{showEvidence ? 'Hide Audit Trail' : 'Inspect Grounding Evidence'}</span>
            {showEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showEvidence && (
          <div className="mt-3 space-y-2.5 bg-slate-50/70 dark:bg-slate-950/70 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs">
            {match.verifiedClaims.map((claim) => (
              <div
                key={claim.id}
                className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    {claim.status === 'ENTAILED' ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
                        <CheckCircle className="w-3 h-3" />
                        ENTAILED (Grounded)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/50">
                        <AlertTriangle className="w-3 h-3" />
                        {claim.status}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      Score: {(claim.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Ref: {claim.referencedChunkId}
                  </span>
                </div>

                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  "{claim.claimText}"
                </p>

                <div className="text-slate-500 dark:text-slate-400 flex items-start gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/50">
                  <Quote className="w-3 h-3 text-teal-500 shrink-0 mt-0.5" />
                  <span className="italic">{claim.evidenceQuote}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
