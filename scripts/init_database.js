const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const dbPath = path.join(__dirname, '..', 'data', 'db', 'patients.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DatabaseSync(dbPath);

// Create schema for confidential patient clinical presets
db.exec(`
  CREATE TABLE IF NOT EXISTS confidential_patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    age_gender TEXT,
    full_name TEXT NOT NULL,
    demographics TEXT,
    primary_condition TEXT NOT NULL,
    clinical_tag TEXT,
    chips_json TEXT,
    synopsis TEXT,
    full_note TEXT,
    therapies_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS patient_matched_trials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    nct_id TEXT NOT NULL,
    match_score INTEGER,
    trial_data_json TEXT,
    FOREIGN KEY(patient_id) REFERENCES confidential_patients(id)
  );
`);

// The confidential records moved away from public UI
const PRESETS_DATA = [
  {
    code: 'PT-8941',
    age_gender: '62M',
    full_name: 'Robert Chen',
    demographics: 'Male • Age 62 • ECOG 1',
    primary_condition: 'Metastatic Non-Small Cell Lung Cancer (Adenocarcinoma)',
    clinical_tag: 'Osimertinib progression',
    chips: [
      'EGFR Exon 19 Deletion (p.Glu746_Ala750del)',
      'T790M Negative',
      'High MET Amplification (CN: 8.2)',
      'PD-L1 TPS <1%',
      'KRAS Wild-Type',
    ],
    synopsis:
      'Patient with metastatic lung adenocarcinoma progressed following 14 months on Osimertinib. Secondary biopsy showed MET amplification. Good performance status ECOG 1 with preserved organ functions.',
    full_note: `PATIENT: Robert Chen | DOB: 11/14/1962 | GENDER: Male
CLINICAL SUMMARY: 62yo gentleman with Stage IV lung adenocarcinoma (cT3N2M1b - bone). Originally diagnosed 18 months ago with EGFR Exon 19 deletion. Initiated on Osimertinib 80mg daily with PR. Restaging PET/CT demonstrated enlarging right lower lobe primary (3.4cm) and new L3 vertebral lesion.
BIOMARKERS: Guardant360 cfDNA shows persistent EGFR ex19del, T790M negative, with newly detected high MET amplification (copy number 8.2). ECOG PS: 1.`,
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
  },
  {
    code: 'PT-4420',
    age_gender: '54F',
    full_name: 'Elena Rodriguez',
    demographics: 'Female • Age 54 • ECOG 0',
    primary_condition: 'Colorectal Adenocarcinoma, Stage IV hepatic metastases',
    clinical_tag: 'FOLFOX / FOLFIRI progression',
    chips: [
      'KRAS G12C mutation (p.Gly12Cys, VAF 14.8%)',
      'MSS (Microsatellite Stable)',
      'BRAF Wild-Type (V600 negative)',
      'TMB-Low (4.2 mut/Mb)',
    ],
    synopsis:
      'Patient is a 54yo female with mCRC who has completed first-line FOLFOX followed by FOLFIRI + Bevacizumab with RECIST 1.1 confirmed liver metastasis progression. Re-biopsy confirms KRAS G12C activating mutation. Functional status remains ECOG 0 with preserved hepatic/renal reserve.',
    full_note: `PATIENT: Elena Rodriguez | DOB: 04/22/1970 | GENDER: Female
HISTORY OF PRESENT ILLNESS: 54yo female with metastatic sigmoid adenocarcinoma s/p primary resection 2022. First-line mFOLFOX6 completed (8 cycles, neuropathy stop). Second-line FOLFIRI + bevacizumab completed (6 cycles). Recent contrast CT abdomen/pelvis reveals progression in hepatic segments IV and VII with two new 1.8cm lesions.
MOLECULAR PROFILING: Guardant360 liquid biopsy detects KRAS p.G12C mutation at VAF 14.8%. MSS, BRAF WT, TMB 4.2 mut/Mb. ECOG PS: 0. Laboratory liver panel: ALT 38 U/L, AST 42 U/L, Bilirubin 0.8 mg/dL.`,
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
  },
  {
    code: 'PT-7109',
    age_gender: '43F',
    full_name: 'Sarah Jenkins',
    demographics: 'Female • Age 43 • ECOG 0',
    primary_condition: 'Metastatic Triple-Negative Breast Cancer (TNBC)',
    clinical_tag: 'Olaparib progression',
    chips: [
      'Germline BRCA1 185delAG (Pathogenic)',
      'ER/PR Negative (0%)',
      'HER2 IHC 0 (Non-amplified)',
      'PD-L1 CPS 0',
    ],
    synopsis:
      '43yo female with germline BRCA1-mutated metastatic TNBC who experienced hepatic relapse following Olaparib maintenance and paclitaxel/carboplatin therapy. Organ reserve fully intact, ECOG 0.',
    full_note: `PATIENT: Sarah Jenkins | DOB: 09/03/1981 | GENDER: Female
DIAGNOSIS: Stage IV Triple-Negative Breast Cancer with lung and liver metastasis.
PRIOR THERAPIES: Neoadjuvant AC followed by paclitaxel. Adjuvant Olaparib 300mg BID completed for 12 months. Interval progression documented in hepatic segment II and retroperitoneal nodes.
GENOMICS: Germline BRCA1 pathogenic mutation (c.68_69delAG). ER 0%, PR 0%, HER2 0 by IHC. ECOG Performance Status: 0. Creatinine clearance: 88 mL/min.`,
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
  },
  {
    code: 'PT-3382',
    age_gender: '38M',
    full_name: 'Marcus Vance',
    demographics: 'Male • Age 38 • ECOG 0',
    primary_condition: 'Unresectable Stage IV Cutaneous Melanoma',
    clinical_tag: 'Checkpoint failure',
    chips: [
      'BRAF V600E (c.1799T>A, Confirmed)',
      'NRAS Wild-Type',
      'KIT Wild-Type',
      'LDH Normal',
    ],
    synopsis:
      '38yo male with BRAF V600E mutant cutaneous melanoma who experienced progressive retroperitoneal adenopathy following frontline Nivolumab + Ipilimumab dual checkpoint blockade.',
    full_note: `PATIENT: Marcus Vance | DOB: 12/08/1986 | GENDER: Male
HPI: 38yo male with recurrent metastatic melanoma of the left trunk. Initially managed with wide local excision and SLNB in 2023. Received 4 doses of Nivolumab + Ipilimumab for recurrent subcutaneous and mesenteric metastases with progressive disease on week 12 imaging.
PATHOLOGY: Tumor biopsy confirms BRAF V600E mutation by PCR assay. NRAS WT, KIT WT. ECOG PS: 0. Normal serum LDH.`,
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
  },
];

// Insert or update securely in SQLite database
const insertPatient = db.prepare(`
  INSERT OR REPLACE INTO confidential_patients 
  (code, age_gender, full_name, demographics, primary_condition, clinical_tag, chips_json, synopsis, full_note, therapies_json)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const p of PRESETS_DATA) {
  insertPatient.run(
    p.code,
    p.age_gender,
    p.full_name,
    p.demographics,
    p.primary_condition,
    p.clinical_tag,
    JSON.stringify(p.chips),
    p.synopsis,
    p.full_note,
    JSON.stringify(p.therapies)
  );
}

console.log(`Successfully migrated ${PRESETS_DATA.length} confidential clinical records into SQL database at ${dbPath}`);
db.close();
