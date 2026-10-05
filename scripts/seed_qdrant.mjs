import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { QdrantClient } from '@qdrant/js-client-rest';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

const sampleTrials = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'sample_trials.json'), 'utf8')
);

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

const qdrantUrl = process.env.QDRANT_URL;
const qdrantKey = process.env.QDRANT_API_KEY;

if (!qdrantUrl || !qdrantKey) {
  console.error('Missing QDRANT credentials in .env.local');
  process.exit(1);
}

let cleanUrl = qdrantUrl.replace('node-0-', '');
if (!cleanUrl.includes(':6333') && !cleanUrl.endsWith(':443')) {
  cleanUrl = `${cleanUrl}:6333`;
}

const client = new QdrantClient({
  url: cleanUrl,
  apiKey: qdrantKey,
  checkCompatibility: false,
});

async function seed() {
  console.log('[*] Seeding Qdrant Cloud cluster with clinical trials...');
  
  // Ensure collection exists
  const collections = await client.getCollections();
  const exists = collections.collections.some(c => c.name === 'clinical_trials');
  if (!exists) {
    await client.createCollection('clinical_trials', {
      vectors: { size: 768, distance: 'Cosine' },
    });
  }

  // Create points with mock 768-dim normalized embedding vectors and structured payloads
  const points = sampleTrials.map((trial, index) => {
    // Generate deterministic normalized 768-dim vector for indexing
    const vec = new Array(768).fill(0).map((_, i) => Math.sin(index + 1 + i * 0.1) / Math.sqrt(768));
    return {
      id: index + 1,
      vector: vec,
      payload: {
        nctId: trial.nctId,
        briefTitle: trial.briefTitle,
        officialTitle: trial.officialTitle,
        overallStatus: trial.overallStatus,
        phase: trial.phase,
        conditions: trial.conditions,
        leadSponsor: trial.leadSponsor,
        summary: trial.summary,
        inclusionCriteria: trial.eligibility.inclusionCriteria,
        exclusionCriteria: trial.eligibility.exclusionCriteria,
        minimumAge: trial.eligibility.minimumAge,
        maximumAge: trial.eligibility.maximumAge,
        sex: trial.eligibility.sex,
        locations: trial.locations,
      },
    };
  });

  await client.upsert('clinical_trials', {
    wait: true,
    points,
  });

  const count = await client.count('clinical_trials');
  console.log(`[✔] Successfully seeded ${count.count} trial protocols into Qdrant Cloud collection 'clinical_trials'!`);
}

seed().catch(console.error);
