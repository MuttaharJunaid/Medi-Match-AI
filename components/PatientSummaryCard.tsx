'use client';

import React from 'react';
import { PatientClinicalProfile } from '@/lib/types';
import { Dna, UserCheck, ShieldAlert, History, MapPin } from 'lucide-react';

interface PatientSummaryCardProps {
  profile: PatientClinicalProfile;
}

export const PatientSummaryCard: React.FC<PatientSummaryCardProps> = ({ profile }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
            Extracted Clinical Profile
          </h3>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
          {profile.gender || 'Unknown'} • Age {profile.age || '--'} • {profile.performanceStatus || 'ECOG 1'}
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <span className="text-slate-400 block mb-0.5">Primary Diagnosis & Stage:</span>
          <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            {profile.primaryCondition} <span className="text-teal-600 dark:text-teal-400 font-normal">({profile.stageOrGrade || 'Advanced'})</span>
          </p>
        </div>

        {/* Biomarkers */}
        <div>
          <span className="text-slate-400 flex items-center gap-1 mb-1.5">
            <Dna className="w-3.5 h-3.5 text-purple-500" />
            Detected Biomarkers & Mutations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.biomarkers.map((bio, i) => (
              <span
                key={i}
                className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 px-2 py-0.5 rounded-md font-medium"
              >
                {bio}
              </span>
            ))}
          </div>
        </div>

        {/* Prior Therapies */}
        {profile.priorTherapies && profile.priorTherapies.length > 0 && (
          <div>
            <span className="text-slate-400 flex items-center gap-1 mb-1.5">
              <History className="w-3.5 h-3.5 text-amber-500" />
              Prior Lines of Therapy:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile.priorTherapies.map((rx, i) => (
                <span
                  key={i}
                  className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-md font-medium"
                >
                  {rx}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Synopsis */}
        <p className="text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-800">
          "{profile.extractedSummary}"
        </p>
      </div>
    </div>
  );
};
