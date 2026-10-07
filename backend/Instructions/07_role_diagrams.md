# Track C — Role Architecture and Workflow Diagrams

Built from `Plan.md`, `instructions.md` and process files `00`–`06`. Solid boxes are named in the deck or plan. Dashed boxes are proposals or undecided (tool or number still to be agreed). Step IDs (D, A, S, B) and loose-end IDs (LE) match the process files. GitHub renders these Mermaid blocks directly.

## 1. System overview and handoffs

```mermaid
flowchart LR
 subgraph DS["Dataset and Annotation · 30%"]
  d1["Sources + rights check"] --> d2["Reference + Tier 1 mirrors<br/>+ Tier 2 re-recordings"] --> d3["Manifest + reviewed spans"]
 end
 subgraph AF["Audio and Features · 20%"]
  a1["Validate + resample<br/>16 kHz mono"] --> a2["Align to supplied transcript"] --> a3["Features: rate, pause, energy"] --> a4["Feature JSON"]
 end
 subgraph SE["Scoring and Evaluation · 25%"]
  s1["Robust z-scores vs reference"] --> s2["Regions + rule IDs"] --> s3["Scores + explanations"] --> s4["IoU and boundary eval"]
 end
 subgraph DB["Dashboard and Submission · 15%"]
  b1["Upload + match reference"] --> b2["Playback, overlay, cards"] --> b3["README, tech doc, video, Devpost"]
 end
 d3 -->|"manifest schema"| a1
 d3 -->|"reviewed spans"| s4
 a4 -->|"feature schema"| s1
 a4 --> b2
 s3 -->|"scoring schema"| b2
 REP["Reproducibility 10%<br/>pins, repo, fresh clone"]:::tbd -.->|"owner TBD, LE-06"| DB
 classDef tbd stroke-dasharray: 5 4,fill:#fff;
```

## 2. Schedule by role (proposal aligned to the plan)

```mermaid
gantt
 dateFormat YYYY-MM-DD
 axisFormat %d %b
 section Gates
 G0 contracts + sample :milestone, 2026-10-03, 0d
 G1 thin slice :milestone, 2026-10-05, 0d
 3 or 5 speeches go/no-go :milestone, 2026-10-06, 0d
 G2 dataset + pipeline :milestone, 2026-10-08, 0d
 G3 integrated + evaluated :milestone, 2026-10-10, 0d
 Feature freeze :crit, milestone, 2026-10-12, 0d
 Submit (internal deadline) :crit, milestone, 2026-10-14, 0d
 section Dataset
 Rights, schema, golden sample :2026-10-02, 2d
 Tier 1 for 3 speeches :2026-10-06, 3d
 Tier 2 record + review :2026-10-06, 4d
 Tolerance, split, package :2026-10-10, 3d
 section Audio
 Aligner + features on sample :2026-10-02, 3d
 Full dataset + cross-speaker check :2026-10-06, 4d
 Repeat-run + packaging :2026-10-10, 3d
 section Scoring
 Rubric v0.1 :2026-10-02, 4d
 Scoring + tune on dev split :2026-10-05, 5d
 Held-out evaluation :2026-10-10, 3d
 section Dashboard
 Devpost draft + skeleton :2026-10-02, 2d
 Real integration + states :2026-10-04, 6d
 README, doc, video :2026-10-10, 4d
```

## 3. Tech stack map

```mermaid
flowchart TB
 subgraph L1["Data"]
  t1["WAV 16 kHz mono (analysis)"]
  t2["TXT transcript + JSON manifest"]
  t3["GitHub or public Drive"]
 end
 subgraph L2["Processing"]
  t4["Python"]
  t5["WhisperX alignment<br/>edit-distance fallback, flagged"]
  t6["F0 in semitones, MFCCs, dB energy,<br/>pause durations"]
  t7["ffmpeg decode"]:::tbd
  t8["Pitch tracker + DSP edit tools"]:::tbd
 end
 subgraph L3["Scoring"]
  t9["Median and MAD robust z-scores"]
  t10["Rubric rules as config"]
  t11["IoU, boundary error, precision and recall"]
 end
 subgraph L4["App"]
  t12["Streamlit"]
  t13["Plotly time-series overlays"]
  t14["Audio player + transcript highlight"]
 end
 subgraph L5["Delivery"]
  t15["GitHub repo + README"]
  t16["6-page tech doc PDF"]
  t17["YouTube demo, public or unlisted"]
  t18["Devpost + Built With + AI disclosure"]
 end
 subgraph L6["Reproducibility"]
  t19["Pinned requirements, config hash"]
  t20["Container or one-command setup"]:::tbd
  t21["Fresh-clone test"]
 end
 L1 --> L2 --> L3 --> L4 --> L5
 L6 -.-> L2
 L6 -.-> L4
 classDef tbd stroke-dasharray: 5 4,fill:#fff;
```

## 4. Dataset and Annotation (30%)

```mermaid
flowchart TD
 in0["Inputs: Plan.md, taxonomy rules from Scoring,<br/>formats from Audio"]
 d1["D1 scope: 3 speeches, 45-90 s excerpts"] --> d2["D2 rights per item: audio and text separately"]
 d2 -->|"uncertain"| ex["Exclude from dataset"]
 d2 -->|"cleared"| d3["D3 pick golden speech, cleanest audio"]
 in0 --> d1
 d3 --> d4["D4-D6 schema, taxonomy, annotation guide,<br/>provisional tolerance"]
 d4 --> d7["D7 golden sample: reference + 2 Tier 1 mirrors<br/>transcript corrected from audio"]
 d7 -->|"Sat 3 Oct"| g0(("G0"))
 d7 --> d8["D8 seeded Tier 1 generator:<br/>pace, pause, energy edits"]
 rub["Scoring rubric v0.1 by Mon 5 Oct"] --> d9
 d8 --> d9["D9 Tier 1 for 3 speeches, L1 L3 L5"]
 d9 --> ck{"Tue 6 Oct: add speeches 4-5?"}
 ck -->|"default no"| d10
 ck -->|"only if stable"| d10["D10-D11 Tier 2 recordings<br/>+ speaker consent for public release"]
 d10 --> d12["D12 aligner proposes spans,<br/>human reviews and labels"]
 d12 --> d13["D13 measure label tolerance, with counts"]
 d13 --> d14["D14 split by speech: 2 dev, 1 held-out"]
 d14 --> d15["D15 package: GitHub or public Drive,<br/>incognito link test"]
 d15 --> d16["D16 tech doc section, 1.5 pages"]
 d15 -->|"dataset link"| dash["to Dashboard and README"]
 d12 -->|"reviewed spans"| sc["to Scoring evaluation"]
 subgraph TS["Tech stack"]
  k1["Python scripts"]
  k2["JSON manifest + CSV provenance"]
  k3["Aligner from Audio role"]
  k4["Time-stretch, gain, silence edits"]:::tbd
  k5["GitHub / Drive"]
 end
 d8 -.-> k4
 d15 -.-> k5
 classDef tbd stroke-dasharray: 5 4,fill:#fff;
```

## 5. Audio and Features (20%)

```mermaid
flowchart TD
 up["Input: upload or dataset item + transcript"] --> a5["A5 validate: format, duration, silence,<br/>clipping, language, transcript match"]
 a5 -->|"invalid"| er["Error code + readable message<br/>to Dashboard"]
 a5 -->|"valid"| a6["A6 deterministic preprocess:<br/>16 kHz mono, original untouched"]
 a6 --> a7["A7 WhisperX aligned to supplied transcript<br/>word times + confidence"]
 a7 -->|"alignment fails"| fb["Edit-distance fallback<br/>fallback_used = true, UI flag"]:::tbd
 a7 --> a8["A8 features, first wave:<br/>local rate, pauses, energy dB, voicing"]
 fb --> a8
 a8 --> nm["A4 normalization:<br/>dB vs recording reference,<br/>semitones vs speaker median if pitch added"]
 nm --> a9["A9 quality flags: low confidence,<br/>unvoiced, clipping"]
 a9 --> js["Feature JSON<br/>schema_version + config_hash"]
 js --> a10["A10 repeat-run test, fresh environment"]
 js --> a11["A11 cache all dataset items"]
 js -->|"feature schema"| sc["to Scoring and Dashboard"]
 a11 --> a13["A13 callable entry point with stage names,<br/>timing target"]
 a13 --> dash["Dashboard live processing"]
 a10 --> a12["A12 cross-speaker check before tuning"]
 a12 --> a15["A15 tech doc section, 1 page"]
 subgraph TS["Tech stack"]
  k1["Python, numpy, scipy"]
  k2["WhisperX, pinned versions + checkpoints"]
  k3["Pitch tracker + spectral features"]:::tbd
  k4["ffmpeg"]:::tbd
  k5["YAML config -> config hash"]
 end
 a7 -.-> k2
 a8 -.-> k3
 classDef tbd stroke-dasharray: 5 4,fill:#fff;
```

## 6. Scoring and Evaluation (25%)

```mermaid
flowchart TD
 fi["Feature JSON: reference + participant"] --> s3["Word and window deltas"]
 s3 --> s4["S4 split global vs local deviation"]
 cal["S3 spread from calibration pairs:<br/>reference vs near-perfect L1 and clean re-reads, dev split"] --> z
 s4 --> z["Robust z = (delta - median) / (1.4826 x MAD)"]
 z --> s5["S5 region detection: min length,<br/>merge gaps, skip flagged frames"]
 s5 --> ie{"Enough evidence?<br/>alignment, quality, baseline"}
 ie -->|"no"| ins["Insufficient evidence result"]
 ie -->|"yes"| rb["S2 rubric rules PACE-01, PAUSE-01, ENERGY-01"]
 rb --> sc["Dimension scores 0-100 + overall"]
 rb --> ex["S6 explanation: feature, both values,<br/>time range, rule ID"]
 sc --> out["Scoring JSON + rubric_version"]
 ex --> out
 ins --> out
 out -->|"scoring schema"| dash["to Dashboard"]
 gt["Reviewed ground-truth spans from Dataset"] --> m["S8 match predicted to true regions"]
 out --> m
 m --> mt["IoU, start and end error, precision and recall,<br/>severity rank order, with counts + tolerance"]
 mt --> tune["S9 tune on dev split only, log changes"]
 tune --> ho["S11 held-out run once"]
 ho --> fl["S10 and S12 stress tests, one failure case kept,<br/>limits"]
 fl --> d13["S13 tech doc section, 1.5 pages"]
 subgraph TS["Tech stack"]
  k1["Python, numpy"]
  k2["Rubric config versioned"]
  k3["Median and MAD scoring, no LLM in path"]
  k4["eval/ command, reproducible table"]
 end
 z -.-> k3
 mt -.-> k4
```

## 7. Dashboard and Submission (15%)

```mermaid
flowchart TD
 up["Upload audio + transcript"] --> v["Validate, show Audio error messages verbatim"]
 v --> mt{"Transcript matches a dataset speech?"}
 mt -->|"no"| un["Unsupported input: no reference available"]
 mt -->|"yes"| pr["Call Audio then Scoring entry points<br/>real stage names as status"]
 pr --> st{"Result state"}
 st -->|"ok"| res
 st -->|"warning or insufficient evidence"| res
 st -->|"error"| er["Error panel with fix guidance"]
 subgraph res["Results view"]
  r1["Audio playback + transcript highlight"]
  r2["Plotly overlays: energy, rate, pauses,<br/>regions shaded, units labelled"]
  r3["Score cards + explanation cards"]
  r4["Limits panel + config hash + rubric version"]
 end
 mock["Mock data: must match real schema,<br/>is_mock true, visible banner, off main path at G1"]:::tbd -.-> pr
 res --> b12["B12 README: setup, run, dataset link,<br/>AI tools + AI-assisted parts"]
 res --> b13["B13 tech doc, max 6 pages"]
 res --> b14["B14 video script: dataset, pipeline, stress test,<br/>dashboard, one failure case"]
 b12 --> b15["B15 fresh-clone test on clean machine"]
 b13 --> b15
 b14 --> b16["B16 record after freeze, 3-10 min,<br/>English audio or subtitles, public or unlisted"]
 b15 --> b17["B17 dataset link in incognito"]
 b16 --> b17
 b17 --> b18["B18 Devpost: description, repo, video,<br/>all teammates by full name, Built With"]
 b18 --> sub(("Submit by Wed 14 Oct<br/>event closes 12:15 AM IST 15 Oct"))
 subgraph TS["Tech stack"]
  k1["Streamlit"]
  k2["Plotly"]
  k3["GitHub, YouTube, Devpost"]
  k4["Hosting: local or hosted, LE-17"]:::tbd
 end
 pr -.-> k1
 r2 -.-> k2
 classDef tbd stroke-dasharray: 5 4,fill:#fff;
```
