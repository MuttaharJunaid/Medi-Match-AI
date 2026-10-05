-- ==============================================================================
-- MediMatch AI: PostgreSQL Relational Database Schema & Seeding Script
-- Suitable for: Vercel Postgres, Supabase, Neon, AWS RDS PostgreSQL
-- ==============================================================================

-- 1. Create Confidential Patient Records Table
CREATE TABLE IF NOT EXISTS confidential_patients (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    age_gender VARCHAR(20),
    full_name VARCHAR(150) NOT NULL,
    demographics VARCHAR(100),
    primary_condition VARCHAR(255) NOT NULL,
    clinical_tag VARCHAR(100),
    chips_json JSONB DEFAULT '[]',
    synopsis TEXT,
    full_note TEXT,
    therapies_json JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Patient Matched Trials & Audit History Table
CREATE TABLE IF NOT EXISTS patient_matched_trials (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES confidential_patients(id) ON DELETE CASCADE,
    nct_id VARCHAR(50) NOT NULL,
    match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
    trial_data_json JSONB,
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create General Clinical Intake & Triage Audit Log Table
CREATE TABLE IF NOT EXISTS triage_submissions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    input_notes TEXT NOT NULL,
    extracted_profile JSONB,
    matches_count INTEGER DEFAULT 0,
    top_nct_id VARCHAR(50),
    top_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Seed Confidential Patient Records (Migrated from public UI)
INSERT INTO confidential_patients (
    code, age_gender, full_name, demographics, primary_condition, clinical_tag, chips_json, synopsis, full_note, therapies_json
) VALUES
(
    'PT-8941',
    '62M',
    'Robert Chen',
    'Male • Age 62 • ECOG 1',
    'Metastatic Non-Small Cell Lung Cancer (Adenocarcinoma)',
    'Osimertinib progression',
    '["EGFR Exon 19 Deletion (p.Glu746_Ala750del)", "T790M Negative", "High MET Amplification (CN: 8.2)", "PD-L1 TPS <1%", "KRAS Wild-Type"]'::jsonb,
    'Patient with metastatic lung adenocarcinoma progressed following 14 months on Osimertinib. Secondary biopsy showed MET amplification. Good performance status ECOG 1 with preserved organ functions.',
    'PATIENT: Robert Chen | DOB: 11/14/1962 | GENDER: Male\nCLINICAL SUMMARY: 62yo gentleman with Stage IV lung adenocarcinoma (cT3N2M1b - bone). Originally diagnosed 18 months ago with EGFR Exon 19 deletion. Initiated on Osimertinib 80mg daily with PR. Restaging PET/CT demonstrated enlarging right lower lobe primary (3.4cm) and new L3 vertebral lesion.',
    '[{"line": "First-Line (Targeted)", "treatment": "Osimertinib (Tagrisso) 80mg daily", "details": "14-month progression-free interval before disease progression.", "status": "Progression"}, {"line": "Chemotherapy History", "treatment": "Platinum-Doublet Chemotherapy", "details": "Deferred during frontline targeted TKI management.", "status": "Candidate"}]'::jsonb
),
(
    'PT-3104',
    '54F',
    'Elena Rodriguez',
    'Female • Age 54 • ECOG 0',
    'Metastatic Colorectal Adenocarcinoma',
    'KRAS G12C • MSS',
    '["KRAS G12C Mutation", "Microsatellite Stable (MSS)", "BRAF V600E Wild-Type", "NRAS Wild-Type", "CEA: 48.2 ng/mL"]'::jsonb,
    '54yo female with refractory metastatic colorectal cancer presenting with KRAS G12C mutation following progression on FOLFOX and FOLFIRI regimens. Excellent functional capacity ECOG 0.',
    'PATIENT: Elena Rodriguez | DOB: 03/22/1970 | GENDER: Female\nCLINICAL SUMMARY: 54yo woman with Stage IV rectal adenocarcinoma with multiple bilobar liver metastases. Prior lines: mFOLFOX6 x 8 cycles (PR, progressed at 10 mos), followed by FOLFIRI + Bevacizumab x 6 cycles (PD with enlarging hepatic lesions).',
    '[{"line": "First-Line Systemic", "treatment": "mFOLFOX6 (Oxaliplatin + 5-FU/LV)", "details": "Partial response achieved. Disease progression noted after 10 months.", "status": "Progression"}, {"line": "Second-Line Systemic", "treatment": "FOLFIRI + Bevacizumab", "details": "Progressive disease with new hepatic metastases.", "status": "Progression"}]'::jsonb
),
(
    'PT-5529',
    '47F',
    'Marcus Thorne',
    'Female • Age 47 • ECOG 1',
    'Triple-Negative Breast Cancer (Metastatic)',
    'BRCA1 Germline Mutation',
    '["BRCA1 Pathogenic Germline Variant", "ER Negative (<1%)", "PR Negative (<1%)", "HER2 IHC 1+ (Non-Amplified)", "PD-L1 CPS: 8"]'::jsonb,
    'Young woman with visceral metastatic triple-negative breast cancer with germline BRCA1 mutation, previously treated with carboplatin, paclitaxel, and pembrolizumab. Liver metastases stable.',
    'PATIENT: Marcus Thorne | DOB: 07/09/1977 | GENDER: Female\nCLINICAL SUMMARY: 47yo female with history of left breast invasive ductal carcinoma, diagnosed Stage IIB 3 years prior. Completed neoadjuvant AC-T followed by lumpectomy and radiotherapy. 6 months ago presented with cough and fatigue; CT chest/abdomen revealed lung and multiple hepatic metastases.',
    '[{"line": "Neoadjuvant / Adjuvant", "treatment": "Doxorubicin + Cyclophosphamide (AC-T)", "details": "Completed planned neoadjuvant systemic therapy followed by surgery.", "status": "Completed"}, {"line": "Metastatic First-Line", "treatment": "Carboplatin + Paclitaxel + Pembrolizumab", "details": "Disease progression documented after 7 months.", "status": "Progression"}]'::jsonb
)
ON CONFLICT (code) DO NOTHING;

-- Indexing for fast lookups
CREATE INDEX IF NOT EXISTS idx_patients_code ON confidential_patients(code);
CREATE INDEX IF NOT EXISTS idx_matched_trials_patient ON patient_matched_trials(patient_id);
CREATE INDEX IF NOT EXISTS idx_triage_created_at ON triage_submissions(created_at);
