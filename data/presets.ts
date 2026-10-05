export interface ClinicalTrialData {
  nctId: string;
  phase: string;
  status: string;
  matchScore: number;
  title: string;
  sponsor: string;
  sites: string;
  oncologistReasoning: string;
  patientExplanation: string;
  tags: string[];
  claimsCount: number;
  accentColor: string; // 'primary' | 'secondary' | 'secondary-container' | 'outline-variant'
  claims?: AuditedClaimData[];
  inclusionCriteria?: string[];
  exclusionCriteria?: string[];
}

export interface AuditedClaimData {
  id: string;
  title: string;
  status: string;
  groundedScore?: string;
  inferredHypothesis: string;
  protocolPremise: string;
  rationale: string;
}

export interface PresetPatient {
  id: number;
  code: string;
  ageGender: string;
  name: string;
  demographics: string;
  condition: string;
  badge: string;
  tag: string;
  chips: string[];
  synopsis: string;
  note: string;
  extractionLatency: string;
  therapies: {
    line: string;
    treatment: string;
    details: string;
    status: string;
  }[];
  vectorGrounding: {
    trialsCount: number;
    collection: string;
    denseEmbeddings: string;
    sparseLexical: string;
    activeRecruiting: string;
    explanation: string;
  };
  trials: ClinicalTrialData[];
  primaryAudit: {
    nctId: string;
    factualityScore: string;
    claims: AuditedClaimData[];
    inclusionCriteria: string[];
    exclusionCriteria: string[];
  };
}

export const PRESETS: Record<number, PresetPatient> = {
  1: {
    id: 1,
    code: 'PT-8941',
    ageGender: '62M',
    name: 'Robert Chen',
    demographics: 'Male • Age 62 • ECOG 1',
    condition: 'Metastatic Non-Small Cell Lung Cancer (Adenocarcinoma)',
    badge: '62M',
    tag: 'Osimertinib progression',
    chips: [
      'EGFR Exon 19 Deletion (p.Glu746_Ala750del)',
      'T790M Negative',
      'High MET Amplification (CN: 8.2)',
      'PD-L1 TPS <1%',
      'KRAS Wild-Type',
    ],
    synopsis:
      'Patient with metastatic lung adenocarcinoma progressed following 14 months on Osimertinib. Secondary biopsy showed MET amplification. Good performance status ECOG 1 with preserved organ functions.',
    note: `PATIENT: Robert Chen | DOB: 11/14/1962 | GENDER: Male
CLINICAL SUMMARY: 62yo gentleman with Stage IV lung adenocarcinoma (cT3N2M1b - bone). Originally diagnosed 18 months ago with EGFR Exon 19 deletion. Initiated on Osimertinib 80mg daily with PR. Restaging PET/CT demonstrated enlarging right lower lobe primary (3.4cm) and new L3 vertebral lesion.
BIOMARKERS: Guardant360 cfDNA shows persistent EGFR ex19del, T790M negative, with newly detected high MET amplification (copy number 8.2). ECOG PS: 1.`,
    extractionLatency: '340ms',
    therapies: [
      {
        line: 'Line 1 • 14 Months',
        treatment: 'Osimertinib (Tagrisso) 80mg Daily',
        details: 'Initial partial response. Progressive disease documented in right lung and bone.',
        status: 'Progressed',
      },
      {
        line: 'Line 2 • Evaluation',
        treatment: 'Targeted MET + EGFR Dual Re-challenge',
        details: 'Awaiting clinical trial enrollment for EGFR TKI + MET inhibitor protocol.',
        status: 'Pending Trial',
      },
    ],
    vectorGrounding: {
      trialsCount: 3,
      collection: 'oncology_v2_hybrid',
      denseEmbeddings: 'text-embedding-004',
      sparseLexical: 'BM25 / SPLADE',
      activeRecruiting: 'Verified Filter (Y)',
      explanation:
        'Extracted features match protocols testing dual EGFR/MET inhibition (e.g., Osimertinib + Savolitinib / Amivantamab combos) for secondary MET-driven resistance.',
    },
    trials: [
      {
        nctId: 'NCT03778229',
        phase: 'Phase 2',
        status: 'RECRUITING',
        matchScore: 96,
        title:
          'SAVANNAH: Osimertinib Plus Savolitinib in Patients With EGFR-Mutated, MET-Amplified Advanced NSCLC Following Osimertinib',
        sponsor: 'AstraZeneca',
        sites: 'Dana-Farber Cancer Institute, Memorial Sloan Kettering, MD Anderson',
        oncologistReasoning:
          'Strict requirement for confirmed EGFR mutation with acquired MET amplification after disease progression on front-line Osimertinib. ECOG 1 satisfies eligibility criteria.',
        patientExplanation:
          'This trial is designed specifically for lung cancer patients who had good initial results with Osimertinib but whose tumor has now found a bypass route called MET. It combines your existing pill with a second targeted medicine.',
        tags: ['Prior Osimertinib: Required', 'Biomarker: MET Amp+', 'ECOG 0-1'],
        claimsCount: 3,
        accentColor: 'primary',
      },
      {
        nctId: 'NCT04077463',
        phase: 'Phase 3',
        status: 'RECRUITING',
        matchScore: 92,
        title:
          'MARIPOSA-2: A Study of Amivantamab and Lazertinib in Combination With Chemotherapy in EGFR-Mutated Advanced NSCLC After Osimertinib Failure',
        sponsor: 'Janssen Research & Development',
        sites: 'Mayo Clinic, Johns Hopkins, UCLA Health',
        oncologistReasoning:
          'Eligible following progression on third-generation EGFR TKI. Bispecific antibody targeting both EGFR and MET addresses primary oncogenic drivers.',
        patientExplanation:
          'This study tests an advanced bispecific antibody therapy designed to lock onto two tumor targets simultaneously on the surface of your lung cancer cells.',
        tags: ['Post-Osimertinib: Eligible', 'Bispecific mAb', 'ECOG 0-1'],
        claimsCount: 3,
        accentColor: 'secondary',
      },
      {
        nctId: 'NCT05015608',
        phase: 'Phase 2',
        status: 'RECRUITING',
        matchScore: 86,
        title:
          'Patritumab Deruxtecan (HER3-DXd) in Subjects With Locally Advanced or Metastatic EGFR-Mutated Non-Small Cell Lung Cancer',
        sponsor: 'Daiichi Sankyo',
        sites: 'Fred Hutchinson Cancer Center, Stanford Medicine',
        oncologistReasoning:
          'Antibody-drug conjugate active regardless of specific secondary resistance mechanism in post-TKI EGFR lung adenocarcinoma.',
        patientExplanation:
          'An antibody-drug conjugate (ADC) that acts like a smart missile delivering concentrated chemotherapy directly into cancer cells displaying the HER3 marker.',
        tags: ['Post-TKI refractory', 'ADC Modality'],
        claimsCount: 2,
        accentColor: 'secondary-container',
      },
    ],
    primaryAudit: {
      nctId: 'NCT03778229',
      factualityScore: '100% Grounded',
      claims: [
        {
          id: 'claim-1',
          title: 'Claim 01 • Molecular Biomarker & Resistance Inclusion',
          status: 'ENTAILED (99.7% Grounded)',
          inferredHypothesis:
            '“Patient qualifies based on documented EGFR mutation with secondary MET amplification detected via liquid biopsy.”',
          protocolPremise:
            '“Inclusion Criterion 3: Documented EGFR activating mutation with central or local confirmation of high MET amplification following progression on first-line Osimertinib.”',
          rationale: 'Guardant360 cfDNA confirms MET copy number 8.2 with persistent EGFR ex19del.',
        },
        {
          id: 'claim-2',
          title: 'Claim 02 • Prior Line of Therapy Requirement',
          status: 'ENTAILED (98.9% Grounded)',
          inferredHypothesis:
            '“Prior therapy strictly matches protocol requirement of progressive disease on single-agent Osimertinib.”',
          protocolPremise:
            '“Inclusion Criterion 4: Patients must have demonstrated radiological disease progression on single-agent Osimertinib monotherapy.”',
          rationale: 'Patient completed 14 months of frontline Osimertinib with confirmed restaging progression.',
        },
        {
          id: 'claim-3',
          title: 'Claim 03 • Functional Performance Status',
          status: 'ENTAILED (99.2% Grounded)',
          inferredHypothesis: '“Patient ECOG 1 complies with protocol functional parameters.”',
          protocolPremise: '“Inclusion Criterion 2: ECOG performance status of 0 or 1 with life expectancy ≥ 12 weeks.”',
          rationale: 'Patient ECOG 1 directly falls within the acceptable protocol range.',
        },
      ],
      inclusionCriteria: [
        'Age ≥ 18 years at time of consent.',
        'Histologically or cytologically confirmed locally advanced or metastatic non-small cell lung cancer.',
        'Documented activating EGFR mutation (Exon 19 del or L858R).',
        'Demonstrated radiological disease progression on Osimertinib monotherapy.',
        'High MET gene amplification or overexpression.',
        'ECOG performance status 0 or 1.',
      ],
      exclusionCriteria: [
        'Prior treatment with any specific MET inhibitor (e.g. savolitinib, capmatinib, tepotinib).',
        'Symptomatic or untreated central nervous system metastases.',
        'Inadequate bone marrow reserve or renal impairment (CrCl < 50 mL/min).',
        'History of interstitial lung disease (ILD) or drug-induced pneumonitis.',
      ],
    },
  },
  2: {
    id: 2,
    code: 'PT-4420',
    ageGender: '54F',
    name: 'Elena Rodriguez',
    demographics: 'Female • Age 54 • ECOG 0',
    condition: 'Colorectal Adenocarcinoma, Stage IV hepatic metastases',
    badge: 'Selected',
    tag: 'FOLFOX / FOLFIRI progression',
    chips: [
      'KRAS G12C mutation (p.Gly12Cys, VAF 14.8%)',
      'MSS (Microsatellite Stable)',
      'BRAF Wild-Type (V600 negative)',
      'TMB-Low (4.2 mut/Mb)',
    ],
    synopsis:
      'Patient is a 54yo female with mCRC who has completed first-line FOLFOX followed by FOLFIRI + Bevacizumab with RECIST 1.1 confirmed liver metastasis progression. Re-biopsy confirms KRAS G12C activating mutation. Functional status remains ECOG 0 with preserved hepatic/renal reserve.',
    note: `PATIENT: Elena Rodriguez | DOB: 04/22/1970 | GENDER: Female
HISTORY OF PRESENT ILLNESS: 54yo female with metastatic sigmoid adenocarcinoma s/p primary resection 2022. First-line mFOLFOX6 completed (8 cycles, neuropathy stop). Second-line FOLFIRI + bevacizumab completed (6 cycles). Recent contrast CT abdomen/pelvis reveals progression in hepatic segments IV and VII with two new 1.8cm lesions.
MOLECULAR PROFILING: Guardant360 liquid biopsy detects KRAS p.G12C mutation at VAF 14.8%. MSS, BRAF WT, TMB 4.2 mut/Mb. ECOG PS: 0. Laboratory liver panel: ALT 38 U/L, AST 42 U/L, Bilirubin 0.8 mg/dL.`,
    extractionLatency: '380ms',
    therapies: [
      {
        line: 'Line 1 • 8 Cycles',
        treatment: 'mFOLFOX6 (Fluorouracil + Oxaliplatin)',
        details: 'Neuropathy Grade 1; new subcapsular hepatic lesions at cycle 8 restaging CT.',
        status: 'Progressed',
      },
      {
        line: 'Line 2 • 6 Cycles',
        treatment: 'FOLFIRI + Bevacizumab',
        details: 'Completed 6 cycles. Subsequent scan showed 22% increase in target hepatic lesions.',
        status: 'Progressed',
      },
    ],
    vectorGrounding: {
      trialsCount: 4,
      collection: 'oncology_v2_hybrid',
      denseEmbeddings: 'text-embedding-004',
      sparseLexical: 'BM25 / SPLADE',
      activeRecruiting: 'Verified Filter (Y)',
      explanation:
        'The extracted features match inclusion vectors for second-generation KRAS G12C covalent inhibitors with EGFR mAb dual-blockade.',
    },
    trials: [
      {
        nctId: 'NCT05220306',
        phase: 'Phase 2',
        status: 'RECRUITING',
        matchScore: 95,
        title:
          'Study of MRTX849 (Adagrasib) in Combination With Cetuximab in Patients With Advanced Colorectal Cancer With KRAS G12C Mutation (KRYSTAL-10)',
        sponsor: 'Mirati Therapeutics / Bristol Myers Squibb',
        sites: 'Memorial Sloan Kettering Cancer Center, MD Anderson, Dana-Farber',
        oncologistReasoning:
          'Patient fulfills strict line requirement (must have progressed on a fluoropyrimidine + oxaliplatin or irinotecan regimen). Documented KRAS G12C mutation satisfies molecular biomarker inclusion. ECOG performance status 0 complies with protocol [0-1] interval. Dual inhibition with anti-EGFR mAb prevents feedback reactivation.',
        patientExplanation:
          'This study is testing two targeted medicines together. The first pill (adagrasib) blocks the specific “KRAS G12C” mutation discovered in your cancer cells, while the IV medicine (cetuximab) stops cancer cells from bypassing that blockage. Because your previous chemotherapies (FOLFOX and FOLFIRI) stopped working, you are directly eligible to participate.',
        tags: ['Lines of Prior Therapy: ≥1', 'Biomarker: KRAS G12C+', 'ECOG 0-1'],
        claimsCount: 3,
        accentColor: 'primary',
        claims: [
          {
            id: 'claim-1',
            title: 'Point 01 • Molecular Biomarker Match (KRAS G12C)',
            status: 'Eligible (Verified Match)',
            groundedScore: '99.8%',
            inferredHypothesis:
              '“Patient has documented KRAS G12C mutation identified through CLIA-certified liquid biopsy.”',
            protocolPremise:
              '“Inclusion Criterion 3: Histologically confirmed locally advanced or metastatic solid tumor with KRAS G12C mutation identified through CLIA-certified NGS assay.”',
            rationale: 'Confirmed KRAS G12C (p.Gly12Cys, VAF 14.8%) aligns with protocol molecular inclusion.',
          },
          {
            id: 'claim-2',
            title: 'Point 02 • Prior Line of Therapy Requirement',
            status: 'Eligible (Verified Match)',
            groundedScore: '98.4%',
            inferredHypothesis:
              '“Prior progression on fluoropyrimidine-based doublet (FOLFOX/FOLFIRI) satisfies line-of-therapy requirement.”',
            protocolPremise:
              '“Inclusion Criterion 5: Patient must have received at least 1 prior systemic therapy for metastatic disease, including a fluoropyrimidine regimen.”',
            rationale:
              'Documented FOLFOX & FOLFIRI failure satisfies prior fluoropyrimidine protocol condition.',
          },
          {
            id: 'claim-3',
            title: 'Point 03 • Functional Performance Status',
            status: 'Eligible (Verified Match)',
            groundedScore: '99.1%',
            inferredHypothesis: '“ECOG performance status 0 satisfies protocol functional requirements.”',
            protocolPremise:
              '“Inclusion Criterion 2: Eastern Cooperative Oncology Group (ECOG) performance status of 0 or 1.”',
            rationale: 'Patient ECOG 0 falls strictly within the required [0-1] functional interval.',
          },
        ],
        inclusionCriteria: [
          'Age ≥ 18 years at the time of signing informed consent.',
          'Histologically confirmed locally advanced unresectable or metastatic colorectal adenocarcinoma.',
          'Documentation of KRAS G12C mutation in tumor tissue or ctDNA via validated CLIA assay.',
          'Received at least one prior fluoropyrimidine-based systemic regimen for metastatic disease.',
          'Measurable disease according to RECIST v1.1 guidelines.',
          'Adequate organ function: ANC ≥ 1500/mcL, Platelets ≥ 100,000/mcL, Creatinine clearance ≥ 50 mL/min.',
        ],
        exclusionCriteria: [
          'Prior treatment with any KRAS G12C directed covalent or non-covalent inhibitor.',
          'Known active or untreated central nervous system (CNS) metastases or leptomeningeal disease.',
          'Prior severe hypersensitivity reaction to cetuximab or other recombinant chimeric antibodies.',
          'Active, clinically serious infections requiring IV antibiotic therapy within 14 days of Day 1.',
        ],
      },
      {
        nctId: 'NCT04793958',
        phase: 'Phase 1b/2',
        status: 'RECRUITING',
        matchScore: 91,
        title:
          'Evaluation of Sotorasib in Combination With Panitumumab in Refractory Colorectal Cancer (CodeBreak 300)',
        sponsor: 'Amgen',
        sites: 'City of Hope, UCLA Health, Cleveland Clinic',
        oncologistReasoning:
          'Refractory colorectal cancer cohort after failing fluoropyrimidine, oxaliplatin, and irinotecan. Direct match for KRAS G12C. Prior anti-EGFR exposure is prohibited (patient has only received VEGF-targeted bevacizumab, hence eligible).',
        patientExplanation:
          'This clinical trial pairs an FDA-tested KRAS G12C blocker (sotorasib) with panitumumab to attack colorectal cancer from two sides. Since your earlier cancer drugs did not include an EGFR-targeting therapy, you qualify for this arm.',
        tags: ['Prior anti-EGFR: Naive', 'Refractory to Fluoropyrimidines'],
        claimsCount: 3,
        accentColor: 'secondary',
        claims: [
          {
            id: 'claim-1',
            title: 'Point 01 • Refractory mCRC with KRAS G12C',
            status: 'Eligible (Verified Match)',
            groundedScore: '99.5%',
            inferredHypothesis:
              '“Patient with metastatic colorectal cancer has confirmed KRAS G12C activating alteration.”',
            protocolPremise:
              '“Inclusion Criterion 2: Histologically confirmed metastatic colorectal cancer harboring KRAS p.G12C mutation.”',
            rationale: 'Liquid biopsy confirmed KRAS G12C matches CodeBreak 300 protocol criteria.',
          },
          {
            id: 'claim-2',
            title: 'Point 02 • Anti-EGFR Naive Requirement',
            status: 'Eligible (Verified Match)',
            groundedScore: '99.0%',
            inferredHypothesis:
              '“Patient has not previously received anti-EGFR antibody treatment (only received anti-VEGF bevacizumab).”',
            protocolPremise:
              '“Inclusion Criterion 4: Patients must be naive to prior anti-EGFR directed therapy (prior VEGF inhibitors allowed).”',
            rationale: 'Prior treatment record shows bevacizumab exposure only; patient is fully anti-EGFR naive.',
          },
          {
            id: 'claim-3',
            title: 'Point 03 • Prior Treatment Failure',
            status: 'Eligible (Verified Match)',
            groundedScore: '97.8%',
            inferredHypothesis:
              '“Prior disease progression on fluoropyrimidine and oxaliplatin/irinotecan satisfies study entry.”',
            protocolPremise:
              '“Inclusion Criterion 3: Documented radiographic disease progression following fluoropyrimidine, oxaliplatin, and irinotecan.”',
            rationale: 'Restaging CT confirms progression following completed mFOLFOX6 and FOLFIRI cycles.',
          },
        ],
        inclusionCriteria: [
          'Age ≥ 18 years with histologically or cytologically confirmed metastatic colorectal cancer.',
          'Documented KRAS p.G12C mutation by validated testing.',
          'Radiographic disease progression following at least 1 prior systemic chemotherapy regimen.',
          'No prior exposure to anti-EGFR targeted monoclonal antibodies (panitumumab or cetuximab).',
          'ECOG performance status 0 or 1 with life expectancy ≥ 3 months.',
        ],
        exclusionCriteria: [
          'Prior treatment with sotorasib (AMG 510) or any investigative KRAS G12C inhibitor.',
          'History of interstitial lung disease or non-infectious pneumonitis.',
          'Active, untreated central nervous system metastases.',
        ],
      },
      {
        nctId: 'NCT05358249',
        phase: 'Phase 1/2',
        status: 'RECRUITING',
        matchScore: 87,
        title:
          'Safety, Tolerability, and Efficacy of Novel KRAS G12C Inhibitor D-1553 in Advanced Solid Tumors',
        sponsor: 'InventisBio',
        sites: 'Massachusetts General Hospital, Stanford University',
        oncologistReasoning:
          'Monotherapy expansion for CRC with confirmed G12C. Prior oxaliplatin and irinotecan required. Stable brain metastasis permitted if asymptomatic (patient has liver-only metastasis, fully qualifying).',
        patientExplanation:
          'A single targeted oral tablet designed specifically to turn off the mutated KRAS G12C protein inside tumor cells. It is open for patients whose colon cancer spread to the liver after standard chemo.',
        tags: ['Monotherapy arm', 'Hepatic metastasis permitted'],
        claimsCount: 2,
        accentColor: 'secondary-container',
        claims: [
          {
            id: 'claim-1',
            title: 'Point 01 • Solid Tumor KRAS G12C Qualification',
            status: 'Eligible (Verified Match)',
            groundedScore: '98.9%',
            inferredHypothesis:
              '“Confirmed KRAS G12C mutation qualifies patient for D-1553 monotherapy expansion.”',
            protocolPremise:
              '“Inclusion Criterion 1: Advanced solid tumors harboring documented KRAS G12C mutation following standard chemotherapy.”',
            rationale: 'Patient molecular tumor profile fulfills primary genomic entry requirements.',
          },
          {
            id: 'claim-2',
            title: 'Point 02 • Preservation of Liver Function',
            status: 'Eligible (Verified Match)',
            groundedScore: '98.2%',
            inferredHypothesis:
              '“Patient hepatic enzyme values (ALT 38, AST 42, Bilirubin 0.8) fulfill organ safety limits.”',
            protocolPremise:
              '“Inclusion Criterion 6: Adequate hepatic reserve: Total bilirubin ≤ 1.5x ULN, ALT/AST ≤ 3.0x ULN.”',
            rationale: 'Liver biochemistry panel is within normal institutional protocol parameters.',
          },
        ],
        inclusionCriteria: [
          'Histologically or cytologically confirmed locally advanced or metastatic solid tumor with KRAS G12C mutation.',
          'Progression on or intolerance to standard therapies.',
          'Measurable disease per RECIST 1.1 guidelines.',
          'Adequate bone marrow and liver organ reserve.',
        ],
        exclusionCriteria: [
          'Previous therapy with any KRAS G12C specific targeted drug.',
          'Symptomatic central nervous system metastases.',
          'Major surgery within 4 weeks of study initiation.',
        ],
      },
      {
        nctId: 'NCT05074810',
        phase: 'Phase 1/2',
        status: 'RECRUITING',
        matchScore: 84,
        title:
          'A Study Evaluating the Safety and Pharmacokinetics of Divarasib (GDC-6036) as Single Agent and in Combinations',
        sponsor: 'Genentech / Roche',
        sites: 'Fred Hutchinson Cancer Center, Mayo Clinic',
        oncologistReasoning:
          'Investigates higher-potency second generation covalent KRAS inhibitor. Requires measurable disease per RECIST 1.1 and documented G12C substitution. Hepatic function parameters within 2.5x ULN.',
        patientExplanation:
          'This study examines a next-generation KRAS inhibitor designed to bind even tighter to the cancer mutation, aiming for lasting disease control when other treatments have plateaued.',
        tags: ['Second-Gen KRAS', 'Liver limits normal'],
        claimsCount: 2,
        accentColor: 'outline-variant',
        claims: [
          {
            id: 'claim-1',
            title: 'Point 01 • Advanced Tumor with KRAS G12C Alteration',
            status: 'Eligible (Verified Match)',
            groundedScore: '98.5%',
            inferredHypothesis:
              '“Documentation of KRAS G12C somatic mutation fulfills molecular eligibility.”',
            protocolPremise:
              '“Inclusion Criterion 2: Measurable disease with confirmed KRAS G12C mutation determined by genomic testing.”',
            rationale: 'Liquid biopsy NGS verifies target KRAS G12C variant.',
          },
          {
            id: 'claim-2',
            title: 'Point 02 • Performance Status Compliance',
            status: 'Eligible (Verified Match)',
            groundedScore: '99.0%',
            inferredHypothesis:
              '“ECOG performance status 0 complies with study functional requirements.”',
            protocolPremise:
              '“Inclusion Criterion 3: Eastern Cooperative Oncology Group (ECOG) performance status of 0 or 1.”',
            rationale: 'Patient is fully ambulatory with normal functional capacity.',
          },
        ],
        inclusionCriteria: [
          'Age ≥ 18 years with documented KRAS G12C mutation.',
          'Locally advanced or metastatic disease progressed on standard therapy.',
          'ECOG performance status of 0 or 1.',
          'Adequate cardiovascular and organ function reserve.',
        ],
        exclusionCriteria: [
          'Prior treatment with divarasib (GDC-6036).',
          'History of clinically significant cardiac arrhythmias.',
          'Active infection requiring systemic therapy.',
        ],
      },
    ],
    primaryAudit: {
      nctId: 'NCT05220306',
      factualityScore: '100% Grounded',
      claims: [
        {
          id: 'claim-1',
          title: 'Claim 01 • Molecular Biomarker Inclusion',
          status: 'ENTAILED (99.8% Grounded)',
          inferredHypothesis:
            '“Patient is eligible based on confirmed KRAS G12C mutation documented by NGS liquid biopsy.”',
          protocolPremise:
            '“Inclusion Criterion 3: Histologically confirmed locally advanced or metastatic solid tumor with KRAS G12C mutation identified through CLIA-certified NGS assay.”',
          rationale: 'Exact molecular alignment with Guardant360 CLIA liquid biopsy result.',
        },
        {
          id: 'claim-2',
          title: 'Claim 02 • Prior Line of Therapy Requirement',
          status: 'ENTAILED (98.4% Grounded)',
          inferredHypothesis:
            '“Prior progression on fluoropyrimidine-based doublet (FOLFOX/FOLFIRI) satisfies line-of-therapy requirement.”',
          protocolPremise:
            '“Inclusion Criterion 5: Patient must have received at least 1 prior systemic therapy for metastatic disease, including a fluoropyrimidine regimen.”',
          rationale:
            'Documented FOLFOX & FOLFIRI failure satisfies prior fluoropyrimidine protocol condition.',
        },
        {
          id: 'claim-3',
          title: 'Claim 03 • Functional Performance Status',
          status: 'ENTAILED (99.1% Grounded)',
          inferredHypothesis: '“ECOG performance status 0 satisfies protocol functional requirements.”',
          protocolPremise:
            '“Inclusion Criterion 2: Eastern Cooperative Oncology Group (ECOG) performance status of 0 or 1.”',
          rationale: 'Patient ECOG 0 falls strictly within the required [0-1] interval.',
        },
      ],
      inclusionCriteria: [
        'Age ≥ 18 years at the time of signing informed consent.',
        'Histologically confirmed locally advanced unresectable or metastatic colorectal adenocarcinoma.',
        'Documentation of KRAS G12C mutation in tumor tissue or ctDNA via validated CLIA assay.',
        'Received at least one prior fluoropyrimidine-based systemic regimen for metastatic disease.',
        'Measurable disease according to RECIST v1.1 guidelines.',
        'Adequate organ function: ANC ≥ 1500/mcL, Platelets ≥ 100,000/mcL, Creatinine clearance ≥ 50 mL/min.',
      ],
      exclusionCriteria: [
        'Prior treatment with any KRAS G12C directed covalent or non-covalent inhibitor.',
        'Known active or untreated central nervous system (CNS) metastases or leptomeningeal disease.',
        'Prior severe hypersensitivity reaction to cetuximab or other recombinant chimeric antibodies.',
        'Active, clinically serious infections requiring IV antibiotic therapy within 14 days of Day 1.',
        'Prolonged QTcF interval > 470 ms on screening electrocardiograms.',
      ],
    },
  },
  3: {
    id: 3,
    code: 'PT-7109',
    ageGender: '43F',
    name: 'Sarah Jenkins',
    demographics: 'Female • Age 43 • ECOG 0',
    condition: 'Metastatic Triple-Negative Breast Cancer (TNBC)',
    badge: '43F',
    tag: 'Olaparib progression',
    chips: [
      'Germline BRCA1 185delAG (Pathogenic)',
      'ER/PR Negative (0%)',
      'HER2 IHC 0 (Non-amplified)',
      'PD-L1 CPS 0',
    ],
    synopsis:
      '43yo female with germline BRCA1-mutated metastatic TNBC who experienced hepatic relapse following Olaparib maintenance and paclitaxel/carboplatin therapy. Organ reserve fully intact, ECOG 0.',
    note: `PATIENT: Sarah Jenkins | DOB: 09/03/1981 | GENDER: Female
DIAGNOSIS: Stage IV Triple-Negative Breast Cancer with lung and liver metastasis.
PRIOR THERAPIES: Neoadjuvant AC followed by paclitaxel. Adjuvant Olaparib 300mg BID completed for 12 months. Interval progression documented in hepatic segment II and retroperitoneal nodes.
GENOMICS: Germline BRCA1 pathogenic mutation (c.68_69delAG). ER 0%, PR 0%, HER2 0 by IHC. ECOG Performance Status: 0. Creatinine clearance: 88 mL/min.`,
    extractionLatency: '310ms',
    therapies: [
      {
        line: 'Neoadjuvant • Completed',
        treatment: 'Dose-dense AC + Paclitaxel',
        details: 'Definitive mastectomy performed with residual disease in breast and 2 nodes.',
        status: 'Residual Disease',
      },
      {
        line: 'Line 1 • 12 Months',
        treatment: 'Olaparib (Lynparza) 300mg BID',
        details: 'Adjuvant PARP inhibitor. New visceral progression in liver segment II.',
        status: 'Progressed',
      },
    ],
    vectorGrounding: {
      trialsCount: 3,
      collection: 'oncology_v2_hybrid',
      denseEmbeddings: 'text-embedding-004',
      sparseLexical: 'BM25 / SPLADE',
      activeRecruiting: 'Verified Filter (Y)',
      explanation:
        'Targeted matches prioritize next-generation DNA damage response (DDR) inhibitors (ATR, WEE1) and Trop-2 directed antibody-drug conjugates for PARP-resistant BRCA1 TNBC.',
    },
    trials: [
      {
        nctId: 'NCT04527991',
        phase: 'Phase 2',
        status: 'RECRUITING',
        matchScore: 94,
        title:
          'A Study of Ceralasertib (AZD6738) in Combination With Olaparib in Patients With Advanced Malignancies Harboring DNA Repair Deficiencies',
        sponsor: 'AstraZeneca',
        sites: 'MD Anderson, Memorial Sloan Kettering, Mayo Clinic',
        oncologistReasoning:
          'Reverses PARP inhibitor resistance in BRCA1 deficient breast tumors by blocking ATR kinase signaling. Fully meets line and genomic requirements.',
        patientExplanation:
          'This trial is studying a new pill called an ATR inhibitor combined with a PARP blocker to restore sensitivity in cancer cells that learned to bypass previous treatment.',
        tags: ['BRCA1 Germline+', 'PARP Refractory', 'ECOG 0-1'],
        claimsCount: 3,
        accentColor: 'primary',
      },
      {
        nctId: 'NCT03926195',
        phase: 'Phase 3',
        status: 'RECRUITING',
        matchScore: 90,
        title:
          'ASCENT-04: Sacituzumab Govitecan in Combination With Pembrolizumab vs Treatment of Physician Choice in Metastatic TNBC',
        sponsor: 'Gilead Sciences',
        sites: 'Stanford Medicine, Dana-Farber, UCLA Health',
        oncologistReasoning:
          'Trop-2 targeted topoisomerase I inhibitor ADC delivers potent cytotoxic payloads independent of germline BRCA status.',
        patientExplanation:
          'A targeted antibody-drug conjugate that finds Trop-2 proteins on breast cancer cells and releases tumor-destroying medicine directly inside them.',
        tags: ['ADC Therapy', 'Metastatic TNBC', 'ECOG 0-1'],
        claimsCount: 3,
        accentColor: 'secondary',
      },
    ],
    primaryAudit: {
      nctId: 'NCT04527991',
      factualityScore: '100% Grounded',
      claims: [
        {
          id: 'claim-1',
          title: 'Claim 01 • Germline BRCA1 Mutation Eligibility',
          status: 'ENTAILED (99.9% Grounded)',
          inferredHypothesis:
            '“Confirmed deleterious germline BRCA1 mutation satisfies molecular biomarker entry criteria.”',
          protocolPremise:
            '“Inclusion Criterion 3: Documented pathogenic or likely pathogenic germline or somatic BRCA1/2 mutation.”',
          rationale: 'Clinical genetics report documents pathogenic c.68_69delAG BRCA1 frameshift.',
        },
        {
          id: 'claim-2',
          title: 'Claim 02 • Prior PARP Inhibitor Exposure',
          status: 'ENTAILED (98.6% Grounded)',
          inferredHypothesis:
            '“Prior progression on adjuvant Olaparib qualifies patient for the PARP-resistant expansion cohort.”',
          protocolPremise:
            '“Inclusion Criterion 4: Patients must have documented progression during or after prior PARP inhibitor therapy.”',
          rationale: 'Patient completed 12 months Olaparib with radiographic relapse in liver.',
        },
      ],
      inclusionCriteria: [
        'Age ≥ 18 years.',
        'Histologically documented metastatic triple-negative breast cancer.',
        'Pathogenic germline or somatic BRCA1/2 alteration.',
        'Progressed on prior PARP inhibitor.',
        'ECOG performance status 0-1.',
      ],
      exclusionCriteria: [
        'Active symptomatic central nervous system metastases.',
        'History of myelodysplastic syndrome (MDS) or acute myeloid leukemia (AML).',
        'Major surgery within 28 days of study start.',
      ],
    },
  },
  4: {
    id: 4,
    code: 'PT-3382',
    ageGender: '38M',
    name: 'Marcus Vance',
    demographics: 'Male • Age 38 • ECOG 0',
    condition: 'Unresectable Stage IV Cutaneous Melanoma',
    badge: '38M',
    tag: 'Checkpoint failure',
    chips: [
      'BRAF V600E (c.1799T>A, Confirmed)',
      'NRAS Wild-Type',
      'KIT Wild-Type',
      'LDH Normal',
    ],
    synopsis:
      '38yo male with BRAF V600E mutant cutaneous melanoma who experienced progressive retroperitoneal adenopathy following frontline Nivolumab + Ipilimumab dual checkpoint blockade.',
    note: `PATIENT: Marcus Vance | DOB: 12/08/1986 | GENDER: Male
HPI: 38yo male with recurrent metastatic melanoma of the left trunk. Initially managed with wide local excision and SLNB in 2023. Received 4 doses of Nivolumab + Ipilimumab for recurrent subcutaneous and mesenteric metastases with progressive disease on week 12 imaging.
PATHOLOGY: Tumor biopsy confirms BRAF V600E mutation by PCR assay. NRAS WT, KIT WT. ECOG PS: 0. Normal serum LDH.`,
    extractionLatency: '320ms',
    therapies: [
      {
        line: 'Line 1 • 4 Doses',
        treatment: 'Nivolumab + Ipilimumab (Opdualag / Dual Checkpoint)',
        details: 'Progressive disease in mesenteric and subcutaneous nodes on week 12 restaging.',
        status: 'Progressed',
      },
      {
        line: 'Targeted Option',
        treatment: 'BRAF + MEK Inhibitor Combinations',
        details: 'Candidate for frontline targeted protocol or TIL adoptive cell transfer.',
        status: 'Eligible',
      },
    ],
    vectorGrounding: {
      trialsCount: 3,
      collection: 'oncology_v2_hybrid',
      denseEmbeddings: 'text-embedding-004',
      sparseLexical: 'BM25 / SPLADE',
      activeRecruiting: 'Verified Filter (Y)',
      explanation:
        'Features qualify patient for next-generation paradoxical-free BRAF/MEK inhibitors and autologous tumor-infiltrating lymphocyte (TIL) protocols following immunotherapy progression.',
    },
    trials: [
      {
        nctId: 'NCT03994796',
        phase: 'Phase 2',
        status: 'RECRUITING',
        matchScore: 97,
        title:
          'Encorafenib and Binimetinib Followed by Immunotherapy in Patients With Advanced BRAF V600-Mutant Melanoma (EBIN)',
        sponsor: 'European Organisation for Research and Treatment of Cancer - EORTC',
        sites: 'Memorial Sloan Kettering, Moffitt Cancer Center, MD Anderson',
        oncologistReasoning:
          'Patient has confirmed BRAF V600E mutation and has failed dual checkpoint blockade. Direct match for second-generation BRAF/MEK targeted combo.',
        patientExplanation:
          'This study combines two targeted pills (encorafenib and binimetinib) designed to turn off the BRAF mutation engine that drives melanoma cell multiplication.',
        tags: ['BRAF V600E+', 'Prior Checkpoint: Eligible', 'ECOG 0'],
        claimsCount: 3,
        accentColor: 'primary',
      },
      {
        nctId: 'NCT04611126',
        phase: 'Phase 2',
        status: 'RECRUITING',
        matchScore: 91,
        title:
          'A Study of Lifileucel (LN-144), an Autologous Tumor-Infiltrating Lymphocyte (TIL) Therapy in Metastatic Melanoma',
        sponsor: 'Iovance Biotherapeutics',
        sites: 'MD Anderson Cancer Center, Dana-Farber, City of Hope',
        oncologistReasoning:
          'Cellular immunotherapy indicated for patients with unresectable melanoma who have progressed on anti-PD-1 therapy.',
        patientExplanation:
          'A cutting-edge cell therapy where your own immune cells are harvested from your tumor, multiplied by billions in a specialized lab, and infused back into your body.',
        tags: ['Cellular Therapy (TIL)', 'Anti-PD-1 Refractory'],
        claimsCount: 3,
        accentColor: 'secondary',
      },
    ],
    primaryAudit: {
      nctId: 'NCT03994796',
      factualityScore: '100% Grounded',
      claims: [
        {
          id: 'claim-1',
          title: 'Claim 01 • BRAF V600E Molecular Alteration',
          status: 'ENTAILED (99.8% Grounded)',
          inferredHypothesis:
            '“Confirmed BRAF V600E mutation satisfies targeted trial eligibility.”',
          protocolPremise:
            '“Inclusion Criterion 2: Histologically confirmed metastatic melanoma harboring a documented BRAF V600E mutation.”',
          rationale: 'Biopsy PCR confirms activating V600E substitution.',
        },
        {
          id: 'claim-2',
          title: 'Claim 02 • Prior Immunotherapy Failure',
          status: 'ENTAILED (99.0% Grounded)',
          inferredHypothesis:
            '“Prior progression on Nivolumab + Ipilimumab qualifies patient for post-immunotherapy cohort.”',
          protocolPremise:
            '“Inclusion Criterion 4: Patients must have documented radiographic progression on or after anti-PD-1/CTLA-4 therapy.”',
          rationale: 'Restaging CT confirms progressive mesenteric nodes after 4 cycles.',
        },
      ],
      inclusionCriteria: [
        'Age ≥ 18 years.',
        'Stage IV unresectable melanoma with confirmed BRAF V600E mutation.',
        'Prior progression on anti-PD-1 or anti-CTLA-4 immunotherapy.',
        'ECOG performance status 0 or 1.',
        'Normal cardiac function (LVEF ≥ 50%).',
      ],
      exclusionCriteria: [
        'Prior treatment with BRAF or MEK inhibitors.',
        'Active symptomatic CNS disease.',
        'Known history of uveal or mucosal melanoma.',
      ],
    },
  },
};
