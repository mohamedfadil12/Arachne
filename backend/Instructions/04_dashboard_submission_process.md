# Process — Dashboard and Submission Agent

**Mission:** deliver the integrated user flow and every submission component so the project is easy to run, inspect and judge. Carries **15%** (dashboard) directly and the repo/README side of the **10%** reproducibility score. Also owns the final submission, so this role has the most deadline-critical tail.
**Owns:** `app/`, `README.md`, `docs/tech_doc/`, `submission/`. **Reads:** `instructions.md`, `00_overview_and_timeline.md`, `06_shared_contracts_DRAFT.md`.

Step format: **Action → Output → Done when → Hands off to**.

---

## Phase 1 — Skeleton and submission hygiene (Fri 2 – Sat 3 Oct)

**B1. Review both output contracts** (§3 features, §4 scoring in `06_shared_contracts_DRAFT.md`). Raise changes by Fri 2 Oct. Done when: signed off at G0.

**B2. Submission admin, today.** The Devpost rules say every teammate needs a Devpost account, real full name, and must be added to the submission, or they will not appear on the project page and may not get a certificate.
- Create the Devpost project draft; each teammate creates an account and is added.
- Done when: all four names are visible on the draft.

**B3. Record the deadline in the submission checklist.** Per `Plan.md`: 14 Oct is the team's internal deadline; the event page lists **12:15 AM IST on 15 Oct 2026**, so do not plan work up to the last minute. Re-check the Devpost page once for changes, and correct the deck, which says "Devpost deadline 14 October" (LE-27).

**B4. Decide the hosting and run mode** with the primary agent (LE-17): local-only (documented, one command) or also hosted. If hosted, check memory limits of the free tier against the pipeline's models before committing. The demo video must show it running either way.

**B5. Build the dashboard skeleton on mock data.** Streamlit + Plotly per the deck. Screens: upload (audio + transcript), baseline selection/matching, processing status, results (playback, transcript, time-series overlay, flaw intervals, scores, explanation cards).
- Mock data rule: mock outputs validate against the real schemas (the plan forbids a separate mock contract), every mock output has `is_mock: true`, and any screen using it shows a persistent banner "Demo data, not your upload".
- Done when: the skeleton renders end to end on mock data and the banner appears.

## Phase 2 — Real integration (Sun 4 – Fri 9 Oct)

**B6. Define the baseline matching flow.** `Plan.md` only requires one supported transcript with its reference. Build: the user picks a dataset speech (or the transcript is matched to one); any other transcript gets a clear "unsupported transcript, no reference available" message and no score. Uploading a custom reference is a stretch goal.
- Done when: the supported path and the unsupported path both have defined UI behavior.

**B7. Connect to the real pipeline at G1 (Mon 5 Oct).** Call Audio's entry point and Scoring's entry point; display the golden sample. Remove mock data from this path.
- Done when: the golden sample shows real regions with real explanations, traceable to `config_hash` and `rubric_version` shown in the UI footer or details panel.

**B8. Implement all states honestly.** Idle, validating, processing (real stage names, not a fake spinner), success, warning/low confidence, insufficient evidence, error. Show errors and flags from Audio verbatim. Never show an old or cached result as if it were the new upload (show which item and time).
- Done when: each state has a screenshot or test and is reachable.

**B9. Time-series overlay.** Reference vs participant features on a shared time axis: F0 (semitones), energy (dB), local rate and pauses; flaw regions shaded; clicking a region jumps playback and highlights the transcript words; explanation card lists feature, both values, range, rule ID. Label units on axes. Show low-confidence regions distinctly.
- Done when: usability check with a teammate who has not seen it: can they find the flaw and read the reason within a minute?

**B10. Limits panel.** Show Scoring's limitation text: what is measured, what is not (content, emotion, intent), comparison to one reference, small evaluation set.

**B11. Performance.** Use Audio's cached outputs for dataset items; allow live processing for uploads with real progress. Document typical times.

## Phase 3 — Documentation (Thu 8 – Sat 10 Oct, drafts; final Tue 13 Oct)

**B12. README** with: what it is, requirements and prerequisites, setup, run command, how to run the evaluation, dataset access, folder map, AI coding tools used **and which parts of the project were AI-assisted** (the plan treats this as a submission requirement; the same tools go in Devpost "Built With"), license(s), known limitations.
- Done when: someone not on the team follows it from a **fresh clone** with no help (see B15).

**B13. Technical document, max 6 pages.** Required content (Track C): dataset construction, evaluation rubrics, model/pipeline architecture, scoring methodology. Proposed page budget: dataset 1.5, features 1, rubric and scoring 1.5, architecture and dashboard 1, evaluation and limits 1. Collect role sections by Sat 10 Oct evening. You own consistency, figures and the page count.
- Done when: exported PDF is ≤6 pages including figures, with no placeholder text.

**B14. Demo video script (3–10 min, target about 6–7).** Track C wants it to show: dataset collection, stress testing across speech qualities, and the dashboard catching specific deviations. Guidelines also require it to show the project running and explain the approach, with English audio or subtitles. Suggested flow: problem (30 s), dataset construction (1.5 min), pipeline (1 min), stress test across L1→L5 and a different speaker (2 min), dashboard catching a specific flaw with explanation (1.5 min), limits and evaluation (45 s).
- Use only real outputs in the video, and show at least one failure or insufficient-evidence case (plan requirement). If the deck's "212 vs 148 wpm" card is shown, it must be labelled illustrative (it is not a measured result).
- Done when: script reviewed by all four, with the exact items and timestamps to demo chosen.

## Phase 4 — Freeze and submit (Mon 12 – Wed 14 Oct)

**B15. Fresh-clone test (Mon 12 – Tue 13 Oct; plan: clean-session verification on Oct 14 too).** On a clean machine or container with no cached models or local files: clone, follow the README, run the dashboard, run one sample, run the evaluation command. Record result and fix gaps. Repeat after the last code change.
- Done when: pass logged with date, commit hash and who ran it.

**B16. Record the video** after the Mon 12 Oct freeze (rehearse earlier). Upload to YouTube as **Public or Unlisted** (private is not accepted). Check audio levels, subtitles if narration is not English, and that it runs 3–10 minutes. Open the link while logged out.

**B17. Verify the dataset link** in an incognito window (Drive: anyone with the link can view; or the files are in the repo). Check the README points to it.

**B18. Complete the Devpost page:** project description (what, problem, how it works), public GitHub link, video link, all teammates added with real full names, Built With listing the AI coding tools used (the README says which parts were AI-assisted). Submit, then re-open the public page and check every link.
- Done when: the submission checklist in `submission/checklist.md` is fully ticked with evidence and a screenshot of the confirmation.

## Handoff report to the primary agent (required format)

Include: run instructions status, fresh-clone result, page count, video URL and visibility, dataset link check, Devpost checklist, and open risks.

## Do not

- Imply a mock or stale result is the user's upload.
- Hide errors or low-confidence states.
- Claim capabilities that are not implemented.
- Leave the dataset link or Devpost fields unverified.
