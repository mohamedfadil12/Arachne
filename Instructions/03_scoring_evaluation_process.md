# Process — Scoring and Evaluation Agent

**Mission:** turn feature outputs into transparent rubric scores, candidate flaw intervals and evidence-linked explanations, and evaluate them honestly against reviewed spans. Carries **25%** of the rubric (temporal grounding and explainability).
**Owns:** `src/scoring/`, `config/rubric_*`, `eval/`, `docs/rubric_*`. **Reads:** `instructions.md`, `00_overview_and_timeline.md`, `06_shared_contracts_DRAFT.md`.

Step format: **Action → Output → Done when → Hands off to**.

---

## Phase 1 — Define the method before coding (Fri 2 – Mon 5 Oct)

**S1. Review the scoring output contract** (`06_shared_contracts_DRAFT.md` §4) and the dataset taxonomy. Raise changes by Fri 2 Oct.
- Done when: signed off at G0.

**S2. Draft the rubric.** Track C asks for "rubric-based scores", so scores must exist, not only flaw boxes. For each first-wave dimension (`pace`, `pause`, `energy`; `pitch` and `clarity` are second wave) specify: the feature(s) used, the comparison against the reference, the window, the score mapping (0–100), severity direction (too high vs too low), and the feedback template. Give each rule an ID (e.g. `PACE-01`) that appears in every explanation.
- State plainly what is **not** measured: content quality, emotion, intent, and tone beyond the acoustic proxies.
- Output: `docs/rubric_spec_v0.1.md`.
- Done when: a person other than the author can compute a score by hand from a feature file using only the spec. **v0.1 must exist by Mon 5 Oct**, before Dataset bulk-generates Tier 1 (the plan requires the rubric before the full dataset).

**S3. Decide the reference distribution for robust z-scores.** This is the biggest technical gap in the deck (LE-07). A robust z-score needs a median and spread. With **one** baseline recording per speech there is no natural spread. Options, with a recommendation:
1. Spread from the participant–baseline deltas themselves. Rejected: it flags the "worst 5%" even in a near-perfect read and cannot see a uniformly bad read.
2. **Recommended:** estimate the spread of deltas from calibration pairs, i.e. reference versus near-perfect (L1) mirrors and clean re-reads across the dev split, per feature and per dimension. Then z = (delta − median delta) / (1.4826 × MAD of calibration deltas).
3. Fixed expert thresholds per feature, documented as such (fallback if calibration data is too thin).
- Decide this with the primary agent and Dataset (needs L1 and clean-reread items).
- Output: a half-page decision note in the rubric spec.
- Done when: the method is written and the data it needs is on Dataset's list.

**S4. Handle global vs local deviation.** A speaker who is 30% slower throughout deviates at every word. Decide: report a **global** finding (overall rate, overall dynamics) and detect **local** regions after removing the global component. State how both appear in the score and on the dashboard (LE-15).
- Done when: both are in the spec with examples.

**S5. Define region detection.** Rules for turning word- or window-level deviations into intervals: thresholds, minimum duration (a region of a handful of words gives a very noisy local rate; set a minimum word count or duration and state it), merging gaps, handling low-confidence or flagged features, and the **insufficient-evidence** rule (when the system should say it cannot tell).
- Output: spec section plus a pseudo-code or executable function signature.

**S6. Define the explanation templates.** Each explanation must name: the feature, both values (participant and baseline), the time range, and the rule ID. Wording describes a measured deviation under a rubric rule. It does not claim intent or universal error. The deck's card says "causal explanation"; keep the label if you like, but the text must be evidence-linked rather than causal proof (LE-05).
- Done when: sample explanations for each dimension pass the checklist above.

## Phase 2 — Implementation (Sun 4 – Fri 9 Oct)

**S7. Implement deterministic scoring** that reads feature output and the reference and writes the scoring output. No randomness, no LLM in the scoring path (the deck promises deterministic scoring). Include `rubric_version` and the `features_config_hash` in the output.
- Starts when Audio delivers the first valid feature output (target Sun 4 Oct).
- Done when: the golden sample produces regions and scores, and two runs give identical output.
- Hands off to: Dashboard (G1, Mon 5 Oct).

**S8. Build the evaluation harness (`eval/`).** Inputs: scoring outputs and reviewed ground-truth spans. Metrics (report each **with sample counts**):
- Region matching rule (state it, e.g. greedy by overlap), then IoU per matched region and mean IoU.
- Start and end boundary errors in seconds; compare against the label tolerance from Dataset (D13).
- Precision and recall at a stated IoU threshold (e.g. 0.5), missed regions, false positives.
- Dimension correctness (did the flagged dimension match the injected flaw type).
- Severity ordering: does the score fall as severity level rises (e.g. rank correlation across L1–L5), where labels support it.
- Output: reproducible command that prints the table.
- Done when: it runs end to end on the golden sample.

**S9. Tune only on the dev split.** Thresholds, minimum durations and score mapping may be adjusted using dev-split speeches only. Held-out speeches are untouched until S11. With three speeches that means 2 dev and 1 held-out (or leave-one-speech-out); say so in the report. Log each tuning change with a reason.
- With three speeches, calibration pairs for S3 come from the dev speeches only. Done when: a tuning log exists and the held-out set has not been scored for tuning purposes.

**S10. Stress test.** Run: the near-perfect mirrors (should produce few or no findings), a clean read by a different speaker (should not flag speaker difference), a heavily flawed L5 read (should flag many), noisy or flagged audio (should say insufficient evidence), a mismatched transcript (error, not a score).
- Done when: results are recorded, including failures. At least one failure or insufficient-evidence example must be written up (the plan requires it).

## Phase 3 — Final evaluation and write-up (Sat 10 – Mon 12 Oct)

**S11. Run the held-out evaluation once** after freezing thresholds. Report the table, sample counts, label tolerance, and the fact that thresholds were tuned on the dev split. If anything was tuned on held-out data, disclose it.
- Output: `eval/results_v1.md` plus raw outputs, with several example regions including at least one failure or insufficient-evidence case.

**S12. Failure analysis and limits.** List known failure cases with examples, what the system cannot judge, the small-sample caveat (with a handful of speeches these are descriptive statistics, not proof of generalization), and dependence on Tier 1 synthetic flaws versus Tier 2 human flaws. Report them separately.

**S13. Write your tech-doc section** (about 1.5 pages): rubric, normalization, z-score method, region detection, explanation templates, evaluation results and limits. Due Sat 10 Oct evening.

**S14. Provide the Dashboard with** the final explanation examples (real outputs) for the demo script, plus the limitation text to show in the UI.

## Handoff report to the primary agent (required format)

Include: rubric version, schema version, scoring entry point, evaluation command and results with counts, tuning log, known failures, and limits statement.

## Do not

- Call deviations universally calibrated or objectively wrong.
- Treat association as proof of cause.
- Tune and report on the same examples without saying so.
- Report any metric without sample counts and label tolerance.
- Put an LLM into the scoring path while describing it as deterministic.
