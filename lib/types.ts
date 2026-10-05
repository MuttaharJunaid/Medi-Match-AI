export interface PatientClinicalProfile {
  primaryCondition: string;
  stageOrGrade?: string;
  biomarkers: string[];
  priorTherapies: string[];
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'ALL';
  performanceStatus?: string;
  location?: string;
  extractedSummary: string;
}

export interface ClinicalTrialLocation {
  facility: string;
  city: string;
  state: string;
  country: string;
}

export interface ClinicalTrialEligibility {
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  minimumAge: string;
  maximumAge: string;
  sex: 'MALE' | 'FEMALE' | 'ALL';
}

export interface ClinicalTrial {
  nctId: string;
  briefTitle: string;
  officialTitle: string;
  overallStatus: string;
  phase: string[];
  conditions: string[];
  interventions: string[];
  leadSponsor: string;
  summary: string;
  eligibility: ClinicalTrialEligibility;
  locations: ClinicalTrialLocation[];
}

export type ClaimVerificationStatus = 'ENTAILED' | 'CONTRADICTED' | 'UNGROUNDED';

export interface VerifiedClaim {
  id: string;
  claimText: string;
  status: ClaimVerificationStatus;
  confidenceScore: number;
  referencedChunkId: string;
  evidenceQuote: string;
  reasoning: string;
}

export interface TrialMatchResult {
  trial: ClinicalTrial;
  relevanceScore: number; // 0 - 100
  matchingBiomarkers: string[];
  matchedInclusions: string[];
  potentialExclusions: string[];
  laymanSummary: string;
  clinicalRationale: string;
  verifiedClaims: VerifiedClaim[];
}

export interface MatchResponse {
  patientProfile: PatientClinicalProfile;
  matches: TrialMatchResult[];
  telemetry: {
    retrievalLatencyMs: number;
    extractionLatencyMs: number;
    verificationLatencyMs: number;
    totalLatencyMs: number;
    overallFactualityScore: number;
    claimsAudited: number;
    modelUsed: string;
    hybridRetrievalMode: 'qdrant_cloud' | 'in_memory_hybrid';
  };
}
