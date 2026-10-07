# Feature Definitions and Normalization

## Overview
This document specifies how acoustic features are computed, normalized, and handled.

### 1. Pitch (f0_st)
- **Tracker**: `librosa.yin` (or `pyin`).
- **Unit**: Semitones (st) relative to the speaker's own median F0.
- **Formula**: `12 * log2(f0_hz / median_f0_hz)`
- **Null Handling**: Unvoiced frames are `null` (not 0.0) in the JSON array.
- **Why speaker-agnostic**: By referencing the speaker's median, a naturally deep voice and a naturally high voice both center around 0 st, allowing the rubric to score variance and pitch modulation fairly across genders and individuals.

### 2. Energy (energy_db)
- **Measure**: RMS Energy converted to decibels (dB).
- **Unit**: dB relative to the track's maximum or 90th percentile energy.
- **Formula**: `20 * log10(RMS / ref_RMS)`
- **Null Handling**: Never null; silence is represented as a very low negative dB (e.g., -60 dB).
- **Why speaker-agnostic**: By referencing the recording's own peak energy, differences in microphone gain or proximity are factored out.

### 3. Rate and Pause
- **Global Rate**: `total_words / (duration_s / 60)` in Words Per Minute (WPM).
- **Local Rate**: Computed over word sequences to detect rushed or slow passages.
- **Pause**: Duration in seconds between the end of word `i` and start of word `i+1`.
- **Handling**: Distinguishes between globally fast readers and localized rushing.
