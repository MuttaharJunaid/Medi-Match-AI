#!/usr/bin/env python3
"""
scripts/ingest_trials.py
Pulls active clinical trials from ClinicalTrials.gov API v2,
chunks protocols into structured retrieval units, and optionally
indexes them into Qdrant Cloud.
"""

import json
import os
import sys
import urllib.request
import urllib.parse

CLINICAL_TRIALS_API = "https://clinicaltrials.gov/api/v2/studies"

def fetch_active_trials(query="cancer", page_size=20):
    params = {
        "query.term": query,
        "filter.overallStatus": "RECRUITING",
        "pageSize": str(page_size),
        "countTotal": "true"
    }
    url = f"{CLINICAL_TRIALS_API}?{urllib.parse.urlencode(params)}"
    print(f"[*] Querying ClinicalTrials.gov API v2: {url}")
    
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "MediMatch-AI/1.0 (Academic/Research Tool)"}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
            studies = data.get("studies", [])
            print(f"[+] Successfully fetched {len(studies)} studies.")
            return studies
    except Exception as e:
        print(f"[!] Error fetching from ClinicalTrials.gov API: {e}", file=sys.stderr)
        return []

def normalize_trial(study):
    protocol = study.get("protocolSection", {})
    id_module = protocol.get("identificationModule", {})
    status_module = protocol.get("statusModule", {})
    design_module = protocol.get("designModule", {})
    eligibility_module = protocol.get("eligibilityModule", {})
    conditions_module = protocol.get("conditionsModule", {})
    arms_interventions = protocol.get("armsInterventionsModule", {})
    sponsor_module = protocol.get("sponsorCollaboratorsModule", {})
    contacts_locations = protocol.get("contactsLocationsModule", {})
    description_module = protocol.get("descriptionModule", {})

    nct_id = id_module.get("nctId", "UNKNOWN")
    brief_title = id_module.get("briefTitle", "")
    official_title = id_module.get("officialTitle", brief_title)
    overall_status = status_module.get("overallStatus", "RECRUITING")
    phases = design_module.get("phases", ["NOT_SPECIFIED"])
    conditions = conditions_module.get("conditions", [])
    
    interventions = [
        f"{inv.get('type', 'Other')}: {inv.get('name', '')}"
        for inv in arms_interventions.get("interventions", [])
    ]
    
    lead_sponsor = sponsor_module.get("leadSponsor", {}).get("name", "Unknown Sponsor")
    summary = description_module.get("briefSummary", "")
    criteria_text = eligibility_module.get("eligibilityCriteria", "")

    # Split criteria into Inclusion and Exclusion if separated by headers
    inclusion_list = []
    exclusion_list = []
    
    if "Exclusion Criteria:" in criteria_text:
        parts = criteria_text.split("Exclusion Criteria:")
        inc_raw = parts[0].replace("Inclusion Criteria:", "").strip()
        exc_raw = parts[1].strip()
        inclusion_list = [line.strip("- *• \t") for line in inc_raw.splitlines() if len(line.strip("- *• \t")) > 5]
        exclusion_list = [line.strip("- *• \t") for line in exc_raw.splitlines() if len(line.strip("- *• \t")) > 5]
    else:
        inclusion_list = [line.strip("- *• \t") for line in criteria_text.splitlines() if len(line.strip("- *• \t")) > 5]

    locations = []
    for loc in contacts_locations.get("locations", [])[:5]:
        locations.append({
            "facility": loc.get("facility", "Clinical Site"),
            "city": loc.get("city", ""),
            "state": loc.get("state", ""),
            "country": loc.get("country", "")
        })

    return {
        "nctId": nct_id,
        "briefTitle": brief_title,
        "officialTitle": official_title,
        "overallStatus": overall_status,
        "phase": phases,
        "conditions": conditions,
        "interventions": interventions,
        "leadSponsor": lead_sponsor,
        "summary": summary,
        "eligibility": {
            "inclusionCriteria": inclusion_list[:12],
            "exclusionCriteria": exclusion_list[:10],
            "minimumAge": eligibility_module.get("minimumAge", "18 Years"),
            "maximumAge": eligibility_module.get("maximumAge", "100 Years"),
            "sex": eligibility_module.get("sex", "ALL")
        },
        "locations": locations
    }

def main():
    print("==================================================")
    print("MediMatch AI: Clinical Trials ETL Ingestion Pipeline")
    print("==================================================")
    
    output_path = os.path.join(os.path.dirname(__file__), "..", "data", "sample_trials.json")
    
    # Check if network is available to pull latest or fallback to existing
    studies = fetch_active_trials(query="EGFR OR KRAS OR BRCA OR melanoma", page_size=15)
    if studies:
        normalized = [normalize_trial(s) for s in studies]
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(normalized, f, indent=2)
        print(f"[✔] Successfully saved {len(normalized)} normalized trials to {output_path}")
    else:
        print("[!] Using existing curated trial data in data/sample_trials.json")

if __name__ == "__main__":
    main()
