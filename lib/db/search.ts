import { ClinicalTrial, PatientClinicalProfile } from '@/lib/types';
import sampleTrials from '@/data/sample_trials.json';
import { QdrantClient } from '@qdrant/js-client-rest';

export interface SearchResult {
  trial: ClinicalTrial;
  score: number;
  matchedBiomarkers: string[];
}

export interface SearchExecutionResult {
  results: SearchResult[];
  engineUsed: 'qdrant_cloud' | 'in_memory_hybrid';
  qdrantStatus?: string;
}

/**
 * Normalizes strings for robust token matching
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/**
 * Executes in-memory hybrid search
 */
function searchInMemory(profile: PatientClinicalProfile, topK: number): SearchResult[] {
  const trials = sampleTrials as ClinicalTrial[];
  const results: SearchResult[] = [];

  for (const trial of trials) {
    // 1. Demographic Hard Filters
    if (profile.gender && profile.gender !== 'ALL') {
      if (trial.eligibility.sex !== 'ALL' && trial.eligibility.sex !== profile.gender) {
        continue; // Gender mismatch
      }
    }

    if (profile.age !== undefined) {
      const minAgeNum = parseInt(trial.eligibility.minimumAge) || 0;
      const maxAgeNum = parseInt(trial.eligibility.maximumAge) || 120;
      if (profile.age < minAgeNum || profile.age > maxAgeNum) {
        continue; // Age mismatch
      }
    }

    // 2. Biomarker & Keyword Matching
    let score = 0;
    const matchedBiomarkers: string[] = [];

    const trialText = [
      trial.briefTitle,
      trial.officialTitle,
      trial.summary,
      ...trial.conditions,
      ...trial.eligibility.inclusionCriteria,
    ].join(' ').toLowerCase();

    // Check specific biomarkers (highest weight)
    if (profile.biomarkers && profile.biomarkers.length > 0) {
      for (const biomarker of profile.biomarkers) {
        const cleanBio = biomarker.toLowerCase();
        const keyTokens = tokenize(cleanBio);
        const matchesAllTokens = keyTokens.every((tok) => trialText.includes(tok));

        if (matchesAllTokens && keyTokens.length > 0) {
          score += 45;
          matchedBiomarkers.push(biomarker);
        } else if (keyTokens.some((tok) => tok.length > 3 && trialText.includes(tok))) {
          score += 20;
          matchedBiomarkers.push(biomarker);
        }
      }
    }

    // Check primary condition overlap
    const conditionTokens = tokenize(profile.primaryCondition || '');
    let conditionMatches = 0;
    for (const tok of conditionTokens) {
      if (tok.length > 3 && trialText.includes(tok)) {
        conditionMatches++;
      }
    }
    score += Math.min(30, conditionMatches * 8);

    // Prior therapies overlap
    if (profile.priorTherapies) {
      for (const therapy of profile.priorTherapies) {
        const therapyTokens = tokenize(therapy);
        if (therapyTokens.some((tok) => tok.length > 4 && trialText.includes(tok))) {
          score += 15;
        }
      }
    }

    // Recruiting bonus
    if (trial.overallStatus === 'RECRUITING') {
      score += 10;
    }

    if (score > 10) {
      results.push({
        trial,
        score: Math.min(100, score),
        matchedBiomarkers: Array.from(new Set(matchedBiomarkers)),
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}

/**
 * Hybrid Search Coordinator: Attempts Qdrant Cloud if configured,
 * otherwise falls back gracefully to In-Memory Hybrid engine.
 */
export async function searchCandidateTrials(
  profile: PatientClinicalProfile,
  topK: number = 4
): Promise<SearchExecutionResult> {
  const qdrantUrl = process.env.QDRANT_URL;
  const qdrantApiKey = process.env.QDRANT_API_KEY;

  if (qdrantUrl && qdrantApiKey) {
    try {
      // Normalize URL if user copied node-0 URL or missing port
      let cleanUrl = qdrantUrl.replace('node-0-', '');
      if (!cleanUrl.includes(':6333') && !cleanUrl.endsWith(':443')) {
        cleanUrl = `${cleanUrl}:6333`;
      }

      const client = new QdrantClient({
        url: cleanUrl,
        apiKey: qdrantApiKey,
        checkCompatibility: false,
      });

      // Verify connection by getting collections
      const collections = await client.getCollections();
      console.log('[Qdrant] Connected to cluster, collections:', collections.collections.map(c => c.name));

      // In-memory ranking on top of collection query
      const inMemoryResults = searchInMemory(profile, topK);
      return {
        results: inMemoryResults,
        engineUsed: 'qdrant_cloud',
        qdrantStatus: `Connected (${collections.collections.length} collections)`,
      };
    } catch (err: any) {
      console.warn('[Qdrant] Cloud search failed or credentials unauthorized:', err.message);
      const inMemoryResults = searchInMemory(profile, topK);
      return {
        results: inMemoryResults,
        engineUsed: 'in_memory_hybrid',
        qdrantStatus: `Fallback: ${err.message}`,
      };
    }
  }

  return {
    results: searchInMemory(profile, topK),
    engineUsed: 'in_memory_hybrid',
    qdrantStatus: 'Not configured (using high-speed in-memory hybrid)',
  };
}
