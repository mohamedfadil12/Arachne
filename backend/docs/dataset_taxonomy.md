# Dataset Taxonomy and Severity Table

## Overview
This defines the flaw taxonomy mapped to the Track C rubric dimensions, and specifies the severity levels for Tier 1 (programmatic) and Tier 2 (human) mirrors.

## Flaw Taxonomy

### 1. Pace (`pace`)
- **Definition**: Reading significantly faster or slower than the baseline, either globally or locally.
- **Tier 1 Injection**: Librosa time-stretching (`librosa.effects.time_stretch`).
- **Severity Levels**:
  - `L1`: +/- 5% speed change (Barely perceptible).
  - `L3`: +/- 20% speed change (Noticeably rushed/dragging).
  - `L5`: +/- 40% speed change (Completely unnatural).

### 2. Pause (`pause`)
- **Definition**: Adding unnatural silences between words, or omitting intended dramatic pauses.
- **Tier 1 Injection**: Inserting blocks of silence array into the audio at specific word boundaries.
- **Severity Levels**:
  - `L1`: +/- 0.2s pause modification.
  - `L3`: +/- 1.0s pause modification.
  - `L5`: +/- 3.0s pause modification (Awkwardly long).

### 3. Energy (`energy`)
- **Definition**: Significant amplitude variation not present in the reference, such as sudden shouting or fading out.
- **Tier 1 Injection**: Multiplying the audio array by an amplitude envelope (e.g. `2.0` for L3 loud, `0.5` for L3 quiet).
- **Severity Levels**:
  - `L1`: +/- 2dB shift in a region.
  - `L3`: +/- 6dB shift (Noticeably loud/quiet).
  - `L5`: +/- 12dB shift (Shouting or whispering).
