---
name: Clinical Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#005e40'
  on-tertiary: '#ffffff'
  tertiary-container: '#007954'
  on-tertiary-container: '#99ffce'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-code-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system addresses oncologist researchers, principal investigators, and clinical trial coordinators operating in high-stakes oncology decisions. The visual narrative balances rigorous clinical authority with high-throughput enterprise SaaS usability.

### Design Principles
- **Verifiable Truth First**: Visual elements prioritize provenance, certainty levels, and machine-verifiable evidence chains. Ambiguity is engineered out.
- **Cognitive Calm**: Interfaces reduce visual fatigue during marathon clinical reviews through generous structural whitespace, muted slate foundations, and surgical color allocation.
- **Zero Gimmicks**: Elimination of decorative illustrations, frivolous micro-animations, or skeuomorphic novelties. Every stroke and pixel serves clinical comprehension.
- **Systematic Ergonomics**: Dense clinical telemetry (NCT IDs, variant allele frequencies, RECIST criteria) is presented with strict alignment, tabular figures, and uncompromising WCAG AAA legibility.

## Colors

The palette employs medical-grade chromatic discipline. Colors are never ornamental; they encode clinical classification, genomic anomalies, and natural language inference (NLI) verification.

### Foundations & Surfaces
- **Light Foundation**: Canvas `#f8fafc` (Slate 50), elevated container `#ffffff`, muted divider `#e2e8f0` (Slate 200).
- **Dark Mode Alternative**: Canvas `#0b0f19`, container surface `#111827`, border containment `#1f2937`.
- **Primary Clinical Core**: Teal 700 (`#0f766e`) as primary functional lead, backed by Teal 600 (`#0d9488`) for active states and Teal 800 (`#115e59`) for deep tabular headers.

### Domain-Specific Categorical Semantic Tones
- **Genomic Biomarker Core**: Royal Indigo (`#6366f1`) with soft structural tint (`#ede9fe`) exclusively dedicated to gene alterations, variant classifications (e.g., EGFR T790M, KRAS G12C, BRCA1/2), and transcript IDs.
- **NLI Fact-Checking Protocol**:
  - **Entailed / Grounded Evidence**: Emerald (`#059669`) with background tint (`#ecfdf5`).
  - **Ungrounded / Under Review**: Warm Amber (`#d97706`) with background tint (`#fffbeb`).
  - **Exclusion Violation / Contradiction**: Crimson Rose (`#e11d48`) with background tint (`#fff1f2`).
- **Text & Contrast**: High-density ink `#0f172a` (Slate 900) for headers and critical telemetry; `#334155` (Slate 700) for body evidence text, maintaining strict AAA contrast against white and slate surfaces.

## Typography

The typographic hierarchy establishes clear boundaries between narrative clinical notes, structural UI labels, and machine-verifiable telemetry.

- **Primary Clinical Display & Sectioning (Geist)**: Delivers geometric clarity and structural discipline for high-density dashboards without feeling sterile.
- **Narrative & Diagnostic Body (Inter)**: Tuned specifically for sustained reading of unstructured medical records, inclusion/exclusion criteria, and pathology reports.
- **Monospace Telemetry (JetBrains Mono)**: Applied strictly to machine artifacts—National Clinical Trial identifiers (e.g., `NCT04284774`), genomic amino acid substitutions (e.g., `p.Val600Glu`), chromosome coordinates, and machine-confidence scoring floats (`p = 0.0012`, `F1: 0.984`).
- **Numerical Regularity**: All numbers in tables, biomarker panels, and trial lists must use tabular lining figures (`font-variant-numeric: tabular-nums;`) to guarantee column scanability.

## Layout & Spacing

A compact, highly structured grid supports concurrent data comparison—such as inspecting patient genomic profiles alongside protocol criteria side-by-side.

### Grid & Density Architecture
- **Desktop (>= 1280px)**: 12-column layout with 24px (`gutter-desktop`) gutters and 32px (`margin-desktop`) outer padding. High-density master-detail splits allocate 4 columns to patient parameters and 8 columns to matched trial protocol reasoning.
- **Tablet / Split View (768px - 1279px)**: 8-column layout with 16px gutters and 24px margins. Master-detail views convert to a collapsible drawer or tabbed arrangement.
- **Mobile (< 768px)**: 4-column layout with 16px gutters and 16px margins. Telemetry ribbons stack vertically; comparison matrices condense to sequential cards.

### Spacing Rhythm
Component interiors adhere to an 8px grid (sub-incremented by 4px). Tight spacing tokens (`space-xs`, `space-sm`) are used for metadata chips and NLI validation lists, maximizing data fidelity above the fold without sacrificing breathing room.

## Elevation & Depth

Visual separation relies on structural tonal banding and crisp architectural borders rather than deep, diffused shadows.

### Border-Dominant Hierarchy
- **Level 0 (Base Canvas)**: Background tone `#f8fafc`. No borders or elevation.
- **Level 1 (Card/Container)**: Background `#ffffff`, framed with a crisp, low-contrast 1px border (`#e2e8f0`). No drop shadow in standard states.
- **Level 2 (Active/Hover/Focused Cell)**: Surface remains `#ffffff`, border darkens to `#cbd5e1` with a micro-offset shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05)`.
- **Level 3 (Modal / Match Inspector Drawer)**: Background `#ffffff`, bounded by 1px border (`#cbd5e1`), with a targeted clinical shadow: `0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Semantic Callout Borders**: Key validation cards introduce an anchored 3px left border corresponding to their clinical evaluation state (Emerald, Amber, or Crimson).

## Shapes

The design system employs a soft, restrained corner geometry (`roundedness: 1`) to preserve an analytical, institutional instrument feel.

- **Base Components**: Input fields, standard cards, and action buttons utilize `0.25rem` (4px) corner radii. This conveys precision and prevents visual slack in dense layouts.
- **Large Panels & Modals**: Outer clinical panels utilize `0.5rem` (8px).
- **Semantic Badges & Genomic Tags**: Fixed at `0.25rem` (4px). True pill shapes (full border-radius) are avoided to maintain tabular structure and horizontal alignment.

## Components

### Buttons
- **Primary Clinical Action**: Background `#0f766e`, text `#ffffff`, border 1px solid transparent, radius `0.25rem`. Hover state transitions to `#0d9488`. Active state `#115e59`.
- **Secondary Verification**: Background `#ffffff`, text `#0f172a`, border 1px solid `#cbd5e1`. Hover brings `#f8fafc`.
- **Critical Contraindication / Reject**: Background `#fff1f2`, text `#e11d48`, border 1px solid `#fecdd3`.

### Biomarker Chips & Genomic Labels
- Component used for genetic mutations (e.g., `EGFR exon 19 del`, `BRAF V600E`).
- Background `#ede9fe`, text `#4338ca`, border 1px solid `#c7d2fe`. Font set to `label-code-sm` (`JetBrains Mono`). Padding: 2px 6px. Radius: 4px.

### Semantic NLI Fact-Checking Badges
Badges pair a 6px status dot with monospace text:
- **Entailed / Grounded**: Background `#ecfdf5`, text `#065f46`, border 1px solid `#a7f3d0`. Dot is solid `#059669`.
- **Ungrounded / Warning**: Background `#fffbeb`, text `#92400e`, border 1px solid `#fde68a`. Dot is solid `#d97706`.
- **Violation / Ineligible**: Background `#fff1f2`, text `#9f1239`, border 1px solid `#fecdd3`. Dot is solid `#e11d48`.

### Input Fields & Filter Triggers
- Background `#ffffff`, 1px solid `#cbd5e1`, 4px radius. Height 36px for dense criteria filtering. Placeholder text in `#94a3b8`.
- Focus ring: 2px solid `#0f766e` with 1px white offset gap. No blurred glow.

### Tables & Cohort Lists
- Header cells: `#f1f5f9` surface, 1px bottom border `#cbd5e1`, typography `label-caps` in `#475569`.
- Data rows: Single-line height 44px, alternating hover row highlight `#f8fafc`. Column dividers kept minimal via 1px horizontal borders in `#e2e8f0`.

### Verifiable Clinical Evidence Cards
- White surface bounded by 1px solid `#e2e8f0` and an anchored 3px left edge matching the match verdict.
- Header holds trial NCT ID in `label-code-lg` (`JetBrains Mono`) with external link icon, adjacent to the patient eligibility status.
- Criteria sections divide inclusion/exclusion into split columns using 12px horizontal gutters with verified snippet provenance linked directly to protocol PDF source page citations.