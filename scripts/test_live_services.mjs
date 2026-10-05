import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

// Load .env.local manually
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

console.log('====================================================');
console.log(' MediMatch AI: Live Integration Diagnostic Test');
console.log('====================================================');

// 1. Test Gemini Key
console.log('\n[1] Checking Google Gemini API...');
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey) {
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    const res = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Respond with exactly: "GEMINI_ACTIVE"',
    });
    console.log('  -> Status: CONNECTED & VERIFIED');
    console.log('  -> Model Output:', res.text?.trim());
  } catch (err) {
    console.log('  -> Status: ERROR:', err.message);
  }
} else {
  console.log('  -> Status: NOT CONFIGURED');
}

// 2. Test Langfuse
console.log('\n[2] Checking Langfuse Tracing...');
const lfSecret = process.env.LANGFUSE_SECRET_KEY;
const lfPublic = process.env.LANGFUSE_PUBLIC_KEY;
const lfUrl = process.env.LANGFUSE_BASE_URL || 'https://us.cloud.langfuse.com';

if (lfSecret && lfPublic) {
  try {
    const { Langfuse } = await import('langfuse');
    const langfuse = new Langfuse({
      secretKey: lfSecret,
      publicKey: lfPublic,
      baseUrl: lfUrl,
    });

    const trace = langfuse.trace({
      name: 'diagnostic-sample-test-run',
      metadata: { tester: 'MediMatch Diagnostic', date: new Date().toISOString() },
    });
    trace.span({
      name: 'health-check',
      input: { test: true },
      output: { status: 'healthy' },
    });
    trace.score({
      name: 'system_liveness',
      value: 1.0,
      comment: 'Live pipeline ping confirmed',
    });
    await langfuse.flushAsync();
    console.log('  -> Status: CONNECTED & RECORDING');
    console.log(`  -> Sent trace to project at: ${lfUrl}`);
  } catch (err) {
    console.log('  -> Status: ERROR:', err.message);
  }
} else {
  console.log('  -> Status: NOT CONFIGURED');
}

// 3. Test Qdrant
console.log('\n[3] Checking Qdrant Vector Cloud...');
const qdrantUrl = process.env.QDRANT_URL;
const qdrantKey = process.env.QDRANT_API_KEY;

if (qdrantUrl && qdrantKey) {
  try {
    let cleanUrl = qdrantUrl.replace('node-0-', '');
    if (!cleanUrl.includes(':6333') && !cleanUrl.endsWith(':443')) {
      cleanUrl = `${cleanUrl}:6333`;
    }

    const { QdrantClient } = await import('@qdrant/js-client-rest');
    const client = new QdrantClient({
      url: cleanUrl,
      apiKey: qdrantKey,
      checkCompatibility: false,
    });

    const collections = await client.getCollections();
    console.log('  -> Status: CONNECTED');
    console.log('  -> Collections:', collections.collections);
  } catch (err) {
    console.log('  -> Status: ATTENTION REQUIRED');
    console.log('  -> Details:', err.message);
  }
} else {
  console.log('  -> Status: NOT CONFIGURED (Using in-memory hybrid search)');
}

console.log('\n====================================================\n');
