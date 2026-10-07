# Rubric Specification v0.1

## Overview
This document defines how acoustic features are scored to generate deterministic, rubric-based feedback for public speaking. It focuses entirely on temporal grounding (pace, pause, energy) and does not judge content quality, emotion, intent, or tone.

## First-Wave Dimensions

### 1. Pace
- **Feature Used**: `local_wpm` (Words per minute computed locally)
- **Comparison**: Word-level or phrase-level WPM vs the baseline's WPM for the aligned segment.
- **Score Mapping**: 0-100 based on average deviation from baseline. 
- **Severity**: "Above" (Too fast, rushed) or "Below" (Too slow, dragging).
- **Rule ID**: `PACE-01`
- **Feedback Template**: "Measured {participant_value} {unit} vs baseline {baseline_value} {unit} over {start}s-{end}s; rubric rule {rule_id} marks this as a {severity} deviation."

### 2. Pause
- **Feature Used**: `pause_after_s`
- **Comparison**: Participant's pause length after a word vs baseline's pause length at the same word.
- **Score Mapping**: 0-100.
- **Severity**: "Above" (Awkwardly long pause) or "Below" (Missed pause/rushed).
- **Rule ID**: `PAUSE-01`
- **Feedback Template**: "Measured {participant_value} {unit} vs baseline {baseline_value} {unit} over {start}s-{end}s; rubric rule {rule_id} marks this as a {severity} deviation."

### 3. Energy
- **Feature Used**: `energy_db_mean`
- **Comparison**: Normalized mean dB vs baseline normalized mean dB.
- **Score Mapping**: 0-100.
- **Severity**: "Above" (Too loud/shouting) or "Below" (Mumbling/fading out).
- **Rule ID**: `ENERGY-01`
- **Feedback Template**: "Measured {participant_value} {unit} vs baseline {baseline_value} {unit} over {start}s-{end}s; rubric rule {rule_id} marks this as a {severity} deviation."

## Robust Z-Score Method
To score deviations without requiring a massive dataset, we estimate spread using fixed expert thresholds initially, which will be tuned against the `dev` split of the dataset (comparing L1 "clean" mirrors to the reference).
- `Z = (Delta - Median_Delta) / (1.4826 * MAD)`
- If a Z-score exceeds `2.0`, it is a minor flaw.
- If a Z-score exceeds `3.0`, it is a moderate flaw.
- If a Z-score exceeds `4.0`, it is a major flaw.

## Global vs Local Handling
- **Global**: The overall `wpm` and `energy` are compared. If the speaker is universally 30% slower, the score reflects a global deviation and the baseline for local changes is shifted.
- **Local**: Local deviations are calculated after shifting the baseline by the global offset, to avoid flagging every single word of a uniformly slow speech as a separate local region flaw.

## Insufficient Evidence
If the audio pipeline flags a region as `low_confidence`, `fallback_used`, or unvoiced, the region is skipped from local scoring, and an `insufficient_evidence: true` flag is emitted.
