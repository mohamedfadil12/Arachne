# Track C — Process Overview, Gates and Timeline

Status: **Reconciled with `Plan.md` on 2 Oct 2026.** Numbers marked **(proposal)** are suggestions that `Plan.md` does not fix. Open issues are in `05_loose_ends.md` (IDs like `LE-03`).

Sources: `Plan.md`, `instructions.md` (role rules), `Track_C.pdf`, `Multimodal AI Hackathon 2026 - Submission Guidelines.pdf`, `Track_C_Bento_Deck.pptx` (content as pasted). Where the deck and `Plan.md` disagree, **`Plan.md` wins** and the deck needs fixing (LE-27).

## How to use these files

| File | Who reads it |
|---|---|
| `01_dataset_annotation_process.md` | Dataset and Annotation Agent / Dataset Lead |
| `02_audio_features_process.md` | Audio and Features Agent / Signal Processing Lead |
| `03_scoring_evaluation_process.md` | Scoring and Evaluation Agent / Grounding and Scoring Lead |
| `04_dashboard_submission_process.md` | Dashboard and Submission Agent / Dashboard and Delivery Lead |
| `06_shared_contracts_DRAFT.md` | Everyone — must be signed off at Gate G0 |
| `05_loose_ends.md` | Primary agent — decisions needed |

Every process file uses the same step format: **Action → Output → Done when → Hands off to**. A step is not done until its "Done when" is evidenced. All steps inherit the shared rules in `instructions.md`.

## Scope fixed by Plan.md

- **Three** source speeches first; five only if the minimum complete demo works (see LE-26 for an inconsistency in the plan's wording).
- **Three** delivery dimensions first: pacing, pause, and pitch **or** energy contour. This set uses **`pace`, `pause`, `energy`** as first wave (proposal; `pitch` and `clarity` are second wave).
- Minimum complete demo: one supported transcript and its reference, upload to explanation (six listed requirements in `Plan.md`).
- Rubric defined **before** the full dataset is generated.
- Label tolerance and supported upload formats defined in the Oct 1–2 phase; do not claim millisecond accuracy.
- Deadline: internal **14 Oct**; event page says **12:15 AM IST, 15 Oct 2026**. Do not plan work up to the last minute.
- AI coding assistants must be disclosed in the README (including which parts were AI-assisted) and in Devpost Built With.

## Rubric weights (Track C) and who carries them

| Criterion | Weight | Primary owner | Supporting |
|---|---|---|---|
| Data engineering and stress testing | 30% | Dataset | Audio (formats), Scoring (taxonomy) |
| Causal explainability and temporal grounding | 25% | Scoring | Audio (timestamps), Dashboard (presentation) |
| Feature extraction | 20% | Audio | Scoring (definitions) |
| Visualization and dashboard | 15% | Dashboard | Scoring (explanations) |
| Reproducibility and code quality | 10% | **Unassigned in the deck and plan** — LE-06 | Audio (determinism), Dashboard (README, fresh clone), primary (repo skeleton) |

## Proposed repository ownership map (one owner per path)

| Path | Owner |
|---|---|
| `data/`, `dataset/`, `docs/dataset_*` | Dataset |
| `src/audio/`, `config/audio_*`, `docs/features_*` | Audio |
| `src/scoring/`, `config/rubric_*`, `eval/`, `docs/rubric_*` | Scoring |
| `app/`, `README.md`, `docs/tech_doc/`, `submission/` | Dashboard |
| `schemas/`, `Instructions/`, repo root config, CI | Primary agent |

## Gates (aligned to the Plan.md schedule)

| Gate | Plan.md phase | Target | Exit criteria |
|---|---|---|---|
| **G0 Contracts and sample agreed** | Oct 1–2 | **Fri 2 Oct; latest Sat 3 Oct** (the plan's exit is due today) | `06_shared_contracts_DRAFT.md` signed off as v1.0; three dimensions chosen; rubric outline, label tolerance (provisional) and supported upload formats defined; one sample item exists; initial sources picked with reuse terms checked; repo skeleton exists; all four teammates have Devpost accounts |
| **G1 Thin end-to-end slice** | Oct 3–5 | **Mon 5 Oct** | One reference and one flawed mirror go audio/transcript → alignment → features → one scoring rule → dashboard, using the real schema (no separate mock contract) |
| **Go/no-go on more speeches** | Oct 6 | **Tue 6 Oct** | Only add speeches 4–5 if the minimum demo works and labels are stable; default is no (LE-26) |
| **G2 Dataset and feature pipeline** | Oct 6–8 | **Thu 8 Oct** | Every included item has provenance, transcript, labels and processing metadata; alignments and temporal labels reviewed; severity spectrum built; known failure cases logged |
| **G3 Integration and evaluation** | Oct 9–10 | **Sat 10 Oct** | Region detection and explanations done; playback, transcript, overlays, scores connected; evaluated against reviewed spans with different speakers/conditions; demo flow runs from a fresh environment with no hand-edited intermediates. Role sections of the tech doc due this evening |
| **Feature freeze** | Oct 11–12 | **Mon 12 Oct** | Hardening only; pinned dependencies/config; repeatability and evaluation rerun; results saved |
| **G4 Docs and video** | Oct 13 | **Tue 13 Oct** | Tech doc ≤6 pages; README; 3–10 min video with English audio/subtitles; reviewer can follow setup and see it running |
| **Submit** | Oct 14 | **Wed 14 Oct** (internal) | Public repo and dataset verified from a clean session; Devpost complete with Built With and all teammates; video visibility checked; submit before the team cutoff |

### Day-by-day critical path

- **Fri 2 Oct:** primary agent resolves LE-03/06/09/13 and closes contracts; Dataset picks sample speech and checks rights; Audio picks aligner; Dashboard creates the Devpost draft and adds teammates.
- **Sat 3 Oct:** G0 at the latest. Golden sample (one reference, two Tier 1 mirrors, reviewed spans) delivered. Rubric outline (three dimensions) circulated.
- **Sun 4 Oct:** Audio delivers first real feature output; Scoring implements one rule; Dashboard wires to real schema.
- **Mon 5 Oct:** G1. Rubric spec v0.1 complete (needed before bulk Tier 1).
- **Tue 6 Oct:** go/no-go on extra speeches (default no); Tier 1 bulk generation and Tier 2 recording start.
- **Wed 7 – Thu 8 Oct:** dataset to three speeches, spans reviewed, spectrum built (G2).
- **Fri 9 – Sat 10 Oct:** integration, dev-split tuning, stress tests, held-out evaluation prepared, role doc sections written (G3).
- **Sun 11 Oct:** hardening, video rehearsal.
- **Mon 12 Oct:** freeze; record the video.
- **Tue 13 Oct:** fresh-clone test, doc PDF, final video, Devpost (G4).
- **Wed 14 Oct:** submit early in the day; remaining time is emergency buffer only.

## Dependency rules (from instructions.md, made concrete)

1. Dataset and Audio work in parallel **only after** G0.
2. Scoring starts real work when Audio delivers the first valid feature output (target Sun 4 Oct); Dataset delivers the first reviewed spans by Sat 3 Oct.
3. Mock data must validate against the real schema, carry `"is_mock": true`, and show a visible banner. Remove it from the main path at G1.
4. Interface changes after G0 follow the change protocol in `06_shared_contracts_DRAFT.md`.
5. Rubric spec v0.1 (Scoring) must exist before Dataset bulk-generates Tier 1 (Tue 6 Oct).

## Primary agent checklist per dispatch

- Name the milestone and the one accountable role.
- Link the relevant step IDs from the role's process file (e.g. "do D3–D5").
- State the checkpoint date and the schema version in force.
- Require the six-part return format from `instructions.md`.
- On receipt, tick the exit criteria and record any new loose end in `05_loose_ends.md`.
