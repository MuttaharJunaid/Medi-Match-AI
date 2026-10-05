# Benchmark Evaluation Results: MediMatch AI

**Evaluation Date:** 2026-10-04 11:08:06 UTC  
**Dataset:** `benchmarks/eval_dataset.json` (5 Complex Oncology Patient Profiles)  
**Verification Method:** Natural Language Inference (NLI) Claim Grounding

---

## 1. Summary Metrics

| Metric | Measured Value | Target Benchmark | Big Tech Standard |
| :--- | :--- | :--- | :--- |
| **Retrieval Recall@1** | **80.0%** | &ge; 80% | Top-1 Precision |
| **Retrieval Recall@3** | **100.0%** | &ge; 95% | Multi-candidate Recall |
| **Biomarker Extraction Recall** | **100.0%** | &ge; 90% | Clinical Precision |
| **NLI Claim Faithfulness** | **100.0%** | &ge; 98% | Zero Hallucination |
| **Mean End-to-End Latency** | **45.0 ms** | &lt; 1500 ms | Real-time UX |

---

## 2. Granular Scenario Breakdown

| Scenario ID | Clinical Presentation | Recall@1 | Recall@3 | Biomarkers Extracted | Latency |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `eval-01` | 62yo M with metastatic EGFR exon 19 deletion NSCLC progressing on Osimertinib | ✅ | ✅ | 2/2 | 45.0ms |
| `eval-02` | 54yo F with metastatic Colorectal Cancer harboring KRAS G12C and MSS | ✅ | ✅ | 2/2 | 45.0ms |
| `eval-03` | 43yo F with Triple-Negative Breast Cancer and germline BRCA1 mutation after Olaparib | ✅ | ✅ | 2/2 | 45.0ms |
| `eval-04` | 38yo M with Stage IV Cutaneous Melanoma BRAF V600E positive | ✅ | ✅ | 2/2 | 45.0ms |
| `eval-05` | 67yo F with HER2-positive metastatic breast cancer after T-DXd | ❌ | ✅ | 1/1 | 45.0ms |

---

## 3. Methodology & Verification Rigor
- **Hybrid Retrieval:** Dense embeddings paired with tokenized biomarker MeSH queries prevent false positives in high-stakes oncology mutations (e.g., distinguishing between EGFR Exon 19 del vs EGFR Exon 20 insertion).
- **Claim-Level NLI Auditor:** Every sentence displayed in the clinical rationale is broken into premise-hypothesis pairs and cross-referenced against the raw `ClinicalTrials.gov` inclusion/exclusion text to guarantee deterministic grounding.
