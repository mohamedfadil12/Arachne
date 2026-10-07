# Process — Audio and Features Agent

**Mission:** a repeatable path from a validated upload plus transcript to word-level alignment and documented acoustic features. Carries **20%** of the rubric and underpins the 25% grounding score and part of the 10% reproducibility score.
**Owns:** `src/audio/`, `config/audio_*`, `docs/features_*`. **Reads:** `instructions.md`, `00_overview_and_timeline.md`, `06_shared_contracts_DRAFT.md`.

Step format: **Action → Output → Done when → Hands off to**.

---

## Phase 1 — Contract and tooling decisions (Fri 2 – Sat 3 Oct)

**A1. Review the feature output contract** (`06_shared_contracts_DRAFT.md` §3). Raise changes by Fri 2 Oct. Check in particular: frame grid, semitone and dB reference definitions, null handling for unvoiced frames, flags.
- Done when: signed off at G0.

**A2. Choose and pin the alignment method.** The deck says "WhisperX forced alignment with edit-distance fallback". Two things need deciding and writing down (LE-13):
1. We already know the transcript, so alignment should be run **against the supplied transcript**, not against a fresh ASR transcript. State exactly how that is done.
2. "Edit-distance fallback" needs a definition: when it triggers, what it does, and that it sets `fallback_used: true` plus a visible quality flag. Never substitute silently.
- Also decide CPU vs GPU. Deployment machines (including the team's own and any hosted demo) may have no GPU, so the pipeline must run acceptably on CPU. Record the time per minute of audio.
- Output: `docs/features_alignment_decision.md` with library versions and model checkpoint names.
- Done when: primary agent approves; dependency versions pinned.

**A3. Choose pitch tracker, energy measure and parameters.** Record F0 range limits, frame/hop (proposal 10 ms), voicing criteria, and the energy measure (e.g. RMS in dB). Parameters go in a config file; its hash goes into every output.
- Output: `config/audio_v0.1.yaml`.

**A4. Define normalization and say why it is speaker-agnostic.**
- Pitch (second wave; needed once pitch is added): semitones relative to the speaker's own median F0 (voiced frames only). Report range/variation in semitones, not Hz.
- Energy: dB relative to a per-recording reference (e.g. a high percentile or long-term RMS of speech frames), so mic gain differences do not look like delivery flaws.
- Rate and pause: durations from alignment, with a global-rate vs local-rate distinction (a globally fast read versus one fast passage are different findings; coordinate with Scoring, LE-15).
- Output: `docs/features_definitions.md` (every feature: formula, unit, window, null handling).
- Done when: Scoring has confirmed the definitions are what the rubric needs.

## Phase 2 — Pipeline on the golden sample (Sat 3 – Mon 5 Oct)

**A5. Input validation.** Reject or warn on: unsupported format, wrong duration range, silence-only, heavy clipping, very low SNR estimate, mono/stereo handling, transcript empty or non-matching language. Produce a structured `errors`/`flags` list with human-readable messages (the dashboard shows them verbatim).
- Also fix the **supported upload formats** now (the plan requires them in the Oct 1–2 phase) and list them in the README and in the error messages.
- Done when: each failure case has a test input and an expected message.

**A6. Preprocess deterministically.** Resample to 16 kHz mono, fixed dither/seed policy, no randomness; keep the original untouched. Record library versions.
- Done when: processing the same file twice gives identical analysis audio.

**A7. Run alignment and compute confidence.** Output `words[]` with start/end, confidence, and flags (low confidence, fallback, missing word). Report how many words were unaligned. Do not round times beyond what the aligner supports.
- Done when: on the golden sample, a person spot-checks 20 words by ear/waveform and reports the typical offset (this feeds LE-08, the honest precision statement).

**A8. Extract features.** **First wave** (needed for pace, pause, energy): frame-level energy (dB) and voicing; word-level duration, pause after, local rate, energy mean; global wpm, articulation rate, pause ratio. **Second wave** if time allows: F0 in semitones (median/range), MFCC/spectral descriptors, a clarity measure. The plan asks for a small documented feature set and Track C lists FFT/MFCC only as examples, so either include one spectral feature with a stated use or say in the tech doc why it is not used (LE-16, low).
- Done when: output validates against the schema and a short notebook or script plots F0 and energy over time for the golden sample.

**A9. Quality flags.** Mark regions with unreliable F0 (unvoiced, octave jumps, noise), low alignment confidence, or clipping. Scoring must be able to ignore flagged regions or lower confidence.
- Done when: flags appear in the output and a test shows a noisy example gets flagged.

**A10. Repeat-run test.** Run the golden sample at least 3 times (and once in a fresh environment/container). Compare outputs.
- Output: `docs/features_repeatability.md` with the comparison method and result (exact equality or the tolerance and why).
- Done when: either identical, or differences are explained and bounded.
- Hands off to: Scoring and Dashboard (first real feature output, target Sun 4 Oct so the thin slice can close at G1 on Mon 5 Oct).

## Phase 3 — Scale and harden (Tue 6 – Fri 9 Oct)

**A11. Process the full dataset** (reference, Tier 1, Tier 2) and cache outputs in a documented location so the dashboard can show precomputed results quickly. Log failures per item rather than hiding them.
- Done when: a table shows each item's status (`ok/warning/error`), alignment confidence summary, runtime.

**A12. Cross-speaker check.** Take a reference and a Tier 2 read by a different speaker with **no intended flaw**. Verify that normalized energy (and pitch, once added) distributions are comparable and that no obvious spurious deviation comes from speaker difference alone. If it fails, fix normalization before Scoring tunes thresholds.
- Done when: a short written result with the items used.

**A13. Performance for the dashboard.** Measure end-to-end time for a typical upload (proposal: aim for under about 1–2 minutes for a 60–90 s clip on a laptop CPU; confirm target with Dashboard). Provide a progress callback or stage names so the UI can show real status.
- Done when: Dashboard can call the pipeline as a function or CLI with a documented interface.

**A14. Packaging for reproducibility.** Pinned requirements (or lock file), model download/caching instructions, a container or one-command setup if feasible, and an offline note if models need network on first run.
- Done when: a teammate who has not worked on it runs it from a fresh clone (coordinate with Dashboard's fresh-clone test, LE-06).

## Phase 4 — Documentation and handoff (Sat 10 – Mon 12 Oct)

**A15. Write your tech-doc section** (about 1 page): pipeline diagram, alignment method and fallback, feature definitions, normalization, quality flags, repeatability result. Due Sat 10 Oct evening.

**A16. Freeze.** After 12 Oct only defect fixes. Tag the pipeline version.

## Handoff report to the primary agent (required format)

Include: schema version, config hash, library versions, pipeline entry point, runtimes, alignment confidence summary, repeat-run result, failure behavior, and what the next role can call.

## Do not

- Read raw pitch or loudness differences across speakers as flaws.
- Swap alignment or feature methods silently, or return unsupported precision.
- Hide low-confidence alignment or invalid input.
- Change the output schema without the change protocol.
