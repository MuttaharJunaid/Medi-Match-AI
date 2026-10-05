import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

// Load .env.local
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

console.log('Testing full matching pipeline...');
const sampleNote = '62-year-old male with metastatic EGFR exon 19 deletion lung adenocarcinoma progressing on Osimertinib. ECOG 1. Normal organ function.';

// Dynamic import of pipeline from compiled next or direct module
import { runFullMatchingPipeline } from '../lib/ai/pipeline.ts';

async function main() {
  try {
    const res = await runFullMatchingPipeline(sampleNote);
    console.log('\n--- Pipeline Result ---');
    console.log('Primary Condition:', res.patientProfile.primaryCondition);
    console.log('Biomarkers Extracted:', res.patientProfile.biomarkers);
    console.log('Matches Found:', res.matches.length);
    console.log('Top Match Trial:', res.matches[0]?.trial.nctId, res.matches[0]?.trial.briefTitle);
    console.log('Telemetry:', JSON.stringify(res.telemetry, null, 2));
  } catch (e) {
    console.error('Pipeline error:', e);
  }
}

main();
