# Shared Contracts — DRAFT v0.1 (needs sign-off at Gate G0, Fri 2 – Sat 3 Oct)

Nothing here is agreed yet. The primary agent proposes; each role replies with changes by **Fri 2 Oct**; freeze as v1.0 by **Sat 3 Oct** (the plan's Oct 1–2 exit is a working data contract plus one sample item). Machine-readable JSON Schema versions should live in `schemas/` once frozen.

## 1. Conventions

| Item | Proposal | Reason |
|---|---|---|
| Time unit | Seconds, float, in JSON; stored to 3 decimals; **displayed to 2 decimals (10 ms)** | Avoids claiming ms accuracy the aligner cannot support (LE-08) |
| Analysis audio | 16 kHz, mono, 16-bit PCM WAV, derived from untouched originals | Standard for aligners and pitch trackers |
| Frame grid | 10 ms hop, shared by all frame-level features | One axis for the dashboard overlay |
| IDs | Speech `S01`…; reference `S01_REF`; mirror `S01_T1_<flaw>_L<n>` or `S01_T2_<speaker>_L<n>` | Stable, sortable, human-readable |
| Severity levels | Reference = `0`; mirrors `L1` (near-perfect) … `L5` (botched). Plan says "a few levels": generate L1, L3, L5 first | One gradient for dataset, scoring and evaluation |
| Flaw / rubric dimensions | **First wave: `pace`, `pause`, `energy`** (plan: three dimensions first; pitch or energy). Second wave, enum values reserved: `pitch`, `clarity` | One taxonomy; flaw type must map 1:1 to a rubric dimension |
| Versions | Every file carries `schema_version`; features carry `config_hash`; scores carry `rubric_version` | Traceability (dashboard must show them) |
| Status values | `ok`, `warning`, `error`; errors carry a code and a human-readable message | No silent failure |
| Supported upload formats | TBD at G0 (proposal: WAV and MP3 audio; transcript as UTF-8 plain text) | Plan requires this in the Oct 1–2 phase |
| Provisional label tolerance | TBD at G0; measured later (Dataset D13) | Plan requires a recorded tolerance; no millisecond claims |
| Mock data | Must validate against these schemas and carry `"is_mock": true` | Plan: no separate mock contract |

## 2. Dataset manifest item (Dataset → everyone)

```json
{
  "schema_version": "0.1",
  "item_id": "S01_T1_pace_L3",
  "speech_id": "S01",
  "role": "reference | mirror",
  "tier": "reference | T1_programmatic | T2_human",
  "audio_path": "data/S01/S01_T1_pace_L3.wav",
  "transcript_path": "data/S01/S01.txt",
  "duration_s": 62.4,
  "severity_level": 3,
  "speaker": {"label": "spk01", "notes": "free text, no personal data beyond consent"},
  "provenance": {"source_url": "...", "license": "...", "retrieved_on": "2026-10-03", "rights_checked_by": "..."},
  "transform": {"tool": "...", "version": "...", "params": {}},
  "ground_truth_spans": [
    {"start_s": 12.40, "end_s": 14.10, "flaw_type": "pace", "severity_level": 3,
     "label_source": "programmatic | human_reviewed | algorithm_proposed",
     "reviewed_by": "name|null", "review_status": "reviewed | unreviewed"}
  ],
  "split": "dev | heldout",
  "known_issues": []
}
```

Rules: only `human_reviewed` or `programmatic` spans may be used as evaluation ground truth. `split` is assigned **per speech**, not per variant (LE-12). The transcript file is the corrected transcript that human recorders read.

## 3. Feature output (Audio → Scoring, Dashboard)

```json
{
  "schema_version": "0.1",
  "status": "ok",
  "errors": [],
  "is_mock": false,
  "item_id": "S01_T1_pace_L3",
  "config": {
    "config_hash": "...",
    "sample_rate": 16000, "hop_ms": 10,
    "aligner": {"name": "...", "version": "...", "fallback_used": false},
    "pitch_tracker": {"name": "...", "version": "...", "fmin_hz": 0, "fmax_hz": 0}
  },
  "audio_quality": {"duration_s": 62.4, "clipping": false, "snr_db_est": 0.0, "flags": []},
  "words": [
    {"i": 0, "text": "Four", "start_s": 0.52, "end_s": 0.81, "align_conf": 0.93, "flags": []}
  ],
  "word_features": [
    {"i": 0, "dur_s": 0.29, "pause_after_s": 0.12, "local_wpm": null,
     "f0_median_st": null, "f0_range_st": null, "energy_db_mean": null, "voiced_frac": 0.8}
  ],
  "frames": {"hop_s": 0.01, "t0_s": 0.0, "f0_st": [], "energy_db": [], "voiced": []},
  "global": {"wpm": 0.0, "pause_ratio": 0.0, "articulation_rate_wps": 0.0,
             "f0_median_hz": 0.0, "f0_range_st": 0.0},
  "normalization": {"f0_ref": "speaker median Hz", "energy_ref": "recording percentile or RMS reference"}
}
```

Notes: `f0_st` is semitones relative to the speaker's own median (so cross-speaker comparable). `energy_db` is relative to a per-recording reference. Unvoiced frames are `null`, never zero. Low-confidence words keep their values but carry flags.

## 4. Scoring output (Scoring → Dashboard)

```json
{
  "schema_version": "0.1",
  "rubric_version": "0.1",
  "status": "ok",
  "is_mock": false,
  "pair": {"reference_item_id": "S01_REF", "participant_id": "S01_T1_pace_L3"},
  "inputs": {"features_config_hash": "..."},
  "dimension_scores": [
    {"dimension": "pace", "score": 0, "max": 100, "rule_id": "PACE-01", "summary": "..."}
  ],
  "overall": {"score": 0, "max": 100, "formula": "documented weights"},
  "regions": [
    {"region_id": "r1", "start_s": 12.40, "end_s": 14.10, "dimension": "pace",
     "feature": "local_wpm", "participant_value": 212, "baseline_value": 148, "unit": "wpm",
     "deviation": {"pct": 43.2, "robust_z": 0.0}, "direction": "above",
     "severity": "minor | moderate | major", "rule_id": "PACE-01",
     "confidence": "high | medium | low", "insufficient_evidence": false,
     "explanation_text": "Measured X vs baseline Y over t1–t2; rubric rule R marks this as ..."}
  ],
  "limitations": ["..."]
}
```

Notes: every explanation names the **feature, both values, the time range, and the rule ID**. The example numbers above are placeholders from the deck, not results.

## 5. Change protocol

1. Anyone proposing a change posts it to the primary agent with: what changes, who is affected, and a version bump.
2. Primary agent confirms with affected roles and updates this file.
3. Minor additive fields: bump `0.x`. Breaking changes after G1: only if a role is blocked, and both producer and consumer agree on a migration.
4. After G3 (freeze) no schema changes.
