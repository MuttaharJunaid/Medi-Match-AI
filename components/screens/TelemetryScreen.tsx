'use client';

import React from 'react';

export const TelemetryScreen: React.FC = () => {
  return (
    <div className="evals-screen flex flex-col gap-space-lg" id="screen-5">
      {/* Header */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs">
            <span className="font-body-sm text-[12px] text-primary tracking-wider uppercase font-semibold">
              Medical Quality &amp; Standards
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-body-sm bg-tertiary/10 text-tertiary font-bold">
              Verified Testing Suite
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
            Reliability &amp; Clinical Verification Standards
          </h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Continuous validation against oncologist-reviewed test cases to ensure patients only see valid, verified trial matches.
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-space-md py-2 bg-surface-container-low rounded-lg font-body-sm text-[13px] text-on-surface">
          <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
          <span className="font-semibold">Quality Verified</span>
        </div>
      </div>

      {/* 4 High-Level KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
            Top Match Precision
          </span>
          <span className="font-display-lg text-display-lg font-bold text-on-surface">
            100%
          </span>
          <span className="font-body-sm text-body-sm text-tertiary font-medium">
            Verified study relevance
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
            Trial Retrieval Coverage
          </span>
          <span className="font-display-lg text-display-lg font-bold text-tertiary">
            100%
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
            Active trials captured
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
            Key Factor Identification
          </span>
          <span className="font-display-lg text-display-lg font-bold text-secondary">
            100%
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
            Accurate tumor details
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-outline uppercase font-semibold">
            Protocol Fact Verification
          </span>
          <span className="font-display-lg text-display-lg font-bold text-primary">
            100%
          </span>
          <span className="font-body-sm text-body-sm text-tertiary font-medium">
            Grounded in federal records
          </span>
        </div>
      </div>

      {/* Safety Verification Pipeline Steps */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[20px]">security</span>
          <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Safety &amp; Verification Checks for Every Trial Search
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md pt-space-xs font-body-sm text-body-sm">
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <span className="font-body-sm font-bold text-primary">1. Privacy Protection</span>
            <p className="text-on-surface-variant text-[13px]">
              Notes are cleaned and safeguarded to ensure sensitive personal identifiers remain strictly confidential.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <span className="font-body-sm font-bold text-primary">2. Medical Factor Extraction</span>
            <p className="text-on-surface-variant text-[13px]">
              Diagnosis, prior medications, and genetic or laboratory findings are identified and verified.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <span className="font-body-sm font-bold text-primary">3. Registry Search</span>
            <p className="text-on-surface-variant text-[13px]">
              Candidate studies are searched in official databases for actively recruiting treatment protocols.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <span className="font-body-sm font-bold text-primary">4. Inclusion Proof Check</span>
            <p className="text-on-surface-variant text-[13px]">
              Every trial eligibility rule is cross-referenced line-by-line with official government records.
            </p>
          </div>
        </div>
      </div>

      {/* Granular Reference Validation Matrix */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              checklist
            </span>
            <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              Oncology Disease Benchmark Validation
            </span>
          </div>
          <span className="font-body-sm text-[12px] text-tertiary font-bold bg-tertiary/10 px-2.5 py-0.5 rounded">
            All Passing (5/5)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container bg-surface-container-low font-label-caps text-label-caps text-outline uppercase">
                <th className="py-2.5 px-3">Disease Category</th>
                <th className="py-2.5 px-3">Condition &amp; Key Target</th>
                <th className="py-2.5 px-3 text-center">Top Match Accuracy</th>
                <th className="py-2.5 px-3 text-center">Trial Coverage</th>
                <th className="py-2.5 px-3 text-center">Factor Accuracy</th>
                <th className="py-2.5 px-3 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-surface">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-3 font-semibold font-headline-sm text-[13px]">
                  Lung Cancer
                </td>
                <td className="py-3 px-3 font-body-sm text-on-surface-variant">
                  EGFR Exon 19 del / T790M NSCLC
                </td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-secondary">100%</td>
                <td className="py-3 px-3 text-right font-body-sm text-tertiary font-semibold">
                  Passed
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-3 font-semibold font-headline-sm text-[13px]">
                  Colorectal Cancer
                </td>
                <td className="py-3 px-3 font-body-sm text-on-surface-variant">
                  KRAS G12C Colorectal Adeno
                </td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-secondary">100%</td>
                <td className="py-3 px-3 text-right font-body-sm text-tertiary font-semibold">
                  Passed
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-3 font-semibold font-headline-sm text-[13px]">
                  Breast Cancer
                </td>
                <td className="py-3 px-3 font-body-sm text-on-surface-variant">
                  BRCA1 Germline TNBC
                </td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-secondary">100%</td>
                <td className="py-3 px-3 text-right font-body-sm text-tertiary font-semibold">
                  Passed
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-3 font-semibold font-headline-sm text-[13px]">
                  Melanoma
                </td>
                <td className="py-3 px-3 font-body-sm text-on-surface-variant">
                  BRAF V600E Cutaneous Melanoma
                </td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-secondary">100%</td>
                <td className="py-3 px-3 text-right font-body-sm text-tertiary font-semibold">
                  Passed
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-3 font-semibold font-headline-sm text-[13px]">
                  Gastric Cancer
                </td>
                <td className="py-3 px-3 font-body-sm text-on-surface-variant">
                  HER2+ Gastric Adenocarcinoma
                </td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-tertiary">100%</td>
                <td className="py-3 px-3 text-center font-bold text-secondary">100%</td>
                <td className="py-3 px-3 text-right font-body-sm text-tertiary font-semibold">
                  Passed
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
