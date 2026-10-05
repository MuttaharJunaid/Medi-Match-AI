'use client';

import React from 'react';
import { MatchResponse } from '@/lib/types';
import { Clock, ShieldCheck, Cpu, Database, CheckCircle2 } from 'lucide-react';

interface TelemetryBannerProps {
  telemetry: MatchResponse['telemetry'];
}

export const TelemetryBanner: React.FC<TelemetryBannerProps> = ({ telemetry }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Headline & Factuality */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-white">NLI Grounding Score:</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {telemetry.overallFactualityScore}% Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {telemetry.claimsAudited} factual claims audited against source protocol text. Zero hallucinations tolerated.
            </p>
          </div>
        </div>

        {/* Right: Technical Stats Grid for Hiring Managers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-1 text-slate-400 mb-0.5">
              <Clock className="w-3 h-3 text-teal-400" />
              <span>Total Latency</span>
            </div>
            <span className="font-semibold text-slate-200">{telemetry.totalLatencyMs} ms</span>
          </div>

          <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-1 text-slate-400 mb-0.5">
              <Database className="w-3 h-3 text-sky-400" />
              <span>Retrieval Mode</span>
            </div>
            <span className="font-semibold text-slate-200 capitalize">
              {telemetry.hybridRetrievalMode.replace('_', ' ')}
            </span>
          </div>

          <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-1 text-slate-400 mb-0.5">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span>Inference</span>
            </div>
            <span className="font-semibold text-slate-200 truncate max-w-[110px]" title={telemetry.modelUsed}>
              {telemetry.modelUsed.split(' ')[0]}
            </span>
          </div>

          <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-1 text-slate-400 mb-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Audited Claims</span>
            </div>
            <span className="font-semibold text-slate-200">{telemetry.claimsAudited} Premise/Hyp</span>
          </div>
        </div>
      </div>
    </div>
  );
};
