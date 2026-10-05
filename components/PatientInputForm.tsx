'use client';

import React from 'react';
import samplePatients from '@/data/sample_patients.json';
import { Sparkles, FileText, Stethoscope, User, RefreshCw, Zap } from 'lucide-react';

interface PatientInputFormProps {
  clinicalNote: string;
  setClinicalNote: (note: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  viewMode: 'doctor' | 'patient';
  setViewMode: (mode: 'doctor' | 'patient') => void;
}

export const PatientInputForm: React.FC<PatientInputFormProps> = ({
  clinicalNote,
  setClinicalNote,
  onSubmit,
  isLoading,
  viewMode,
  setViewMode,
}) => {
  const handleSelectSample = (sample: typeof samplePatients[0]) => {
    setClinicalNote(sample.clinicalNote);
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Patient Clinical Presentation & Pathology
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Paste oncology progress notes, genomic NGS assays, or select a pre-loaded clinical scenario.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('patient')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'patient'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('doctor')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'doctor'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Oncologist View</span>
          </button>
        </div>
      </div>

      {/* Quick Select Presets */}
      <div className="mb-4">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
          1-Click Presets for Fast Verification:
        </label>
        <div className="flex flex-wrap gap-2">
          {samplePatients.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectSample(p)}
              className="text-xs bg-slate-50 hover:bg-teal-50 hover:border-teal-300 dark:bg-slate-800/80 dark:hover:bg-teal-950/40 dark:hover:border-teal-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1.5"
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span>{p.name.split(' - ')[1] || p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Note Textarea */}
      <div className="relative mb-4">
        <textarea
          rows={5}
          value={clinicalNote}
          onChange={(e) => setClinicalNote(e.target.value)}
          placeholder="Paste medical note, e.g.: 62-year-old male with metastatic EGFR-mutant lung adenocarcinoma progressing on Osimertinib. Repeat liquid biopsy negative for T790M. ECOG PS 1..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 p-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition font-mono leading-relaxed"
        />
        {clinicalNote && (
          <button
            type="button"
            onClick={() => setClinicalNote('')}
            className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Primary Trigger Button */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {clinicalNote.length} characters
        </span>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || clinicalNote.trim().length < 15}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-md shadow-teal-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing & Verifying...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Match Trials & Run NLI Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
