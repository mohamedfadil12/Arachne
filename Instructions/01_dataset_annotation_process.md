# Process — Dataset and Annotation Agent

**Mission:** a small, clean, documented contrastive dataset: effective references plus a severity gradient of flawed mirrors of the exact same transcript. Carries **30%** of the rubric, the largest weight.
**Owns:** `data/`, `dataset/`, `docs/dataset_*`. **Reads:** `instructions.md`, `00_overview_and_timeline.md`, `06_shared_contracts_DRAFT.md`.
**Guiding rule:** reduce the number of speeches before reducing label quality (Track C: "quality over quantity"; Plan.md: start with **three** speeches, expand to five only if stable by Tue 6 Oct).

Step format: **Action → Output → Done when → Hands off to**.

---

## Phase 1 — Scope and rights (Fri 2 – Sat 3 Oct)

**D1. Confirm scope numbers with the primary agent.** `Plan.md`: start with **three** source speeches; add more only if the minimum complete demo works (go/no-go Tue 6 Oct, LE-26). The deck's "5-6 speeches" is superseded. Proposal: excerpts of 45–90 s each (full speeches are too long to re-record and align reliably); per speech, 1 reference plus Tier 1 mirrors for each first-wave dimension (`pace`, `pause`, `energy`) at levels L1, L3 and L5 (9 mirrors), and Tier 2 re-recordings for a subset.
- Output: a one-paragraph scope note (speeches, excerpt length, mirrors per speech, who records Tier 2).
- Done when: primary agent has approved it (LE-14).
- Hands off to: Audio (duration and size expectations).

**D2. Shortlist speeches and check rights per item.** For each candidate record: source URL, the license or legal basis for the audio **and separately for the transcript text**, retrieval date, and who checked. The deck names Miller Center as an example source and also warns about CC BY-NC-ND. Do not assume either way; verify per item (LE-09). Remember mirrors are derivative works, so a no-derivatives term would block them.
- Output: `dataset/provenance_inventory.csv` (one row per source, a `rights_status` column of `cleared | uncertain | rejected`).
- Done when: at least 4 candidates are `cleared` (three needed plus one spare; a fifth only if the plan's expansion condition is met), each with evidence noted. Anything `uncertain` is excluded from the shipped dataset.
- Hands off to: Dashboard (public dataset link needs rights confidence).

**D3. Pick the golden-sample speech.** Choose the cleanest audio: single speaker, minimal audience noise or music, modern enough sample rate, a passage with clear pace/pause/pitch variation. Old or noisy recordings degrade alignment and F0 (LE-10), so use them last or not at all.
- Output: speech ID `S01` with excerpt boundaries.
- Done when: Audio confirms it can ingest the file.

## Phase 2 — Schema and annotation guide (Fri 2 – Sat 3 Oct)

**D4. Review and sign the dataset manifest schema** in `06_shared_contracts_DRAFT.md` §2. Raise changes by Sat 3 Oct.
- Done when: signed off at G0.

**D5. Write the flaw taxonomy and severity table.** For each first-wave dimension (`pace`, `pause`, `energy`; `pitch` and `clarity` are second wave, add only if time allows) define: what the flaw is, how Tier 1 injects it, how a human re-recorder produces it, and what L1–L5 mean quantitatively for Tier 1 (e.g. L1 barely perceptible, L5 clearly botched). Parameter values are chosen by listening tests, not guessed, and recorded.
- Output: `docs/dataset_taxonomy.md`.
- Done when: Scoring has confirmed the taxonomy maps 1:1 to rubric dimensions, and at least two team members listened to L1 and L5 of each flaw and agree the gradient is ordered.
- Hands off to: Scoring.

**D6. Write the annotation guide.** Define: span boundary convention (does a pause span include the silence only, or the words around it?), how forced-alignment proposals are reviewed, tolerance (set a provisional value by G0 as the plan requires; do **not** claim millisecond accuracy; measure it, see D13), who reviews, and a rule that algorithm-proposed labels stay `unreviewed` until a human checks them.
- Output: `docs/dataset_annotation_guide.md`.
- Done when: Scoring agrees the span convention is usable for IoU.

## Phase 3 — Golden sample (by Sat 3 Oct, feeds G1)

**D7. Produce the golden-sample package.** Reference audio, corrected transcript, and 2 Tier 1 mirrors of different flaw types (suggest `pace` and `energy`, which are easiest to verify), each with reviewed spans and full manifest entries.
- Corrected transcript: transcribe from the **audio**, not the published text, since published transcripts often differ from what was said (ad-libs, applause). Human re-recorders read this corrected text.
- Output: `data/S01/*` plus manifest rows.
- Done when: Audio can run the sample, spans pass a schema check, and a second person has verified the injected span times by listening.
- Hands off to: Audio, Scoring, Dashboard (all three use it at G1).

## Phase 4 — Scale Tier 1 (Tue 6 – Thu 8 Oct, after Scoring's rubric spec v0.1 exists)

**D8. Build a reproducible Tier 1 generator.** A script that takes the reference and a flaw spec and produces the mirror plus its span JSON, recording tool, version and parameters. Same input must give the same output.
- Known risk: signal manipulation introduces artifacts that a detector might pick up instead of the flaw. Note this limitation and spot check by ear (LE-11).
- Output: `dataset/make_tier1.py` (or equivalent) and a config file.
- Done when: re-running produces byte-identical or documented-equivalent outputs.

**D9. Generate Tier 1 for the three selected speeches** (speeches 4–5 only after a go decision on Tue 6 Oct). Start only once Scoring's rubric spec v0.1 exists (the plan requires the rubric before the full dataset). Include a near-perfect L1 set (it is also needed by Scoring as a calibration reference, see LE-07) and a clean no-flaw repeat if feasible.
- Done when: every mirror has span labels, severity level, and provenance; spot check of at least 20% by ear logged.

## Phase 5 — Tier 2 human re-recordings (Tue 6 – Fri 9 Oct)

**D10. Plan recording sessions.** Decide who records which speech, with a written consent line for each speaker (including permission to publish the recordings in the public dataset). Provide a recording checklist: same room and mic where possible, quiet, no clipping, 44.1/48 kHz originals kept. Speakers vary (accent, gender) on purpose to test speaker-agnostic logic.
- Output: `dataset/recording_protocol.md`, consent log (kept out of public repo if it contains personal data).
- Done when: sessions scheduled by Mon 5 Oct (recording starts Tue 6 Oct).

**D11. Record Tier 2.** Each speaker reads the corrected transcript with a requested flaw and level (some natural-good reads, some deliberately flawed). Do not tell them to hit exact seconds; spans are marked afterwards.
- Done when: every file passes a basic quality check (duration plausible, no clipping, transcript read completely).

**D12. Annotate Tier 2 spans.** Run the aligner (from Audio) to propose word times, then a human reviews and fixes flaw span boundaries. Label `label_source: human_reviewed` only after review. A second reviewer checks a sample.
- Output: spans in the manifest, review log.
- Done when: all evaluation-eligible spans are reviewed; unreviewed items are flagged and excluded from evaluation.
- Hands off to: Scoring (reviewed ground truth).

## Phase 6 — Quality, packaging, handoff (Sat 10 – Mon 12 Oct)

**D13. Measure label tolerance.** Estimate boundary agreement between the two reviewers (or between aligner proposal and human fix) on a sample and report it. This sets the tolerance Scoring uses and the precision you may claim.
- Output: `docs/dataset_label_quality.md` with counts.
- Done when: a number with sample size exists, not an adjective.

**D14. Assign dev/heldout splits per speech** (not per variant, LE-12). Proposal with three speeches: 2 dev and 1 held-out, or leave-one-speech-out; say in the docs that the held-out set is tiny. With five speeches: 3 dev, 2 held-out. Freeze before Scoring tunes anything.
- Done when: split recorded in the manifest and signed by Scoring.

**D15. Package and publish.** Either commit to GitHub (watch the per-file size limit and repo size) or a public Drive folder linked in the README. Include a dataset README: structure, schema, license per item, known omissions, review status, how to download.
- Done when: link opens in an incognito window without sign-in; file count and checksums match the manifest. Dashboard has verified it.
- Hands off to: Dashboard.

**D16. Write your tech-doc section** (about 1.5 pages): dataset construction, tiers, gradient, annotation, label quality, limits. Due Sat 10 Oct evening.

## Handoff report to the primary agent (required format)

Include: schema version, manifest path, counts (speeches, items per tier, reviewed vs unreviewed spans), known omissions, rights status per source, label tolerance measured, and anything blocked.

## Do not

- Claim millisecond accuracy, human-reviewed labels, or cleared rights without the evidence above.
- Change audio or transcript formats after G0 without the change protocol.
- Treat algorithm-generated spans as ground truth.
- Publish any recording whose rights or speaker consent is unconfirmed.
