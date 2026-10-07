# Loose Ends Register — Track C plan and workflow

Found while deriving the role process files (2 Oct 2026). Sorted by severity. **Blocker** = work will stall or the submission is at risk without a decision. Recommendations are suggestions for the primary agent / team to accept or change.

## What I could and could not check

- **`Plan.md` was added on 2 Oct** and the process files were reconciled against it (see the update section below). Items not covered by the plan were checked only against `instructions.md`, `Track_C.pdf`, the Submission Guidelines and the deck text as pasted.
- Checked against: `Plan.md`, `instructions.md`, `Track_C.pdf`, `Submission Guidelines.pdf`, and the deck text as pasted.
- The rights question (LE-09) is **not resolved**. A quick search found that presidential recordings republished by the Miller Center are widely described as US-government public domain, but I did not find or verify the license of the Miller Center's transcripts or site text. Treat as unverified.

## Update after Plan.md (2 Oct 2026)

**Resolved**
- **LE-01:** plan is now available; gates in `00_overview_and_timeline.md` follow its schedule.
- **LE-02:** 14 Oct is the internal deadline; the event page deadline is 12:15 AM IST on 15 Oct. Plan to submit on 14 Oct at the latest, earlier if possible.
- **LE-18:** the minimum demo needs only one supported transcript with its reference; anything else shows an "unsupported transcript" message (B6).
- **LE-21:** AI-assistant disclosure is required by the plan, including *which parts* were AI-assisted (B12, B18).

**Partly resolved**
- **LE-12:** the plan keeps related variants together and forbids near-duplicates across calibration and evaluation. With three speeches the split is tiny: 2 dev / 1 held-out, or leave-one-speech-out (D14, S9).
- **LE-14:** speeches fixed at three; excerpt length and mirrors per speech remain proposals (D1).
- **LE-16:** downgraded to Low; the plan only asks for a small documented feature set.

**Changed in the process files because of the plan:** three speeches (not 5–6); three first-wave dimensions (`pace`, `pause`, `energy`); G0 and G1 moved to 2–3 Oct and 5 Oct; mock data must use the real schema; rubric v0.1 before bulk dataset generation; provisional label tolerance and upload formats at G0; failure/insufficient-evidence example required in evaluation and video.

**New**

| ID | Sev | Issue | Recommended resolution |
|---|---|---|---|
| LE-26 | Medium | The plan is internally inconsistent about speech count: it says to expand to five "only if the end-to-end demo and labels are stable by Oct 6", but the Oct 6–8 row says to "expand to three", and by Oct 6 only the thin slice exists. | Treat three as the target. Only add speeches 4–5 if all three are complete and reviewed and the minimum demo works; default is no. Decide on Tue 6 Oct. |
| LE-27 | Medium | Deck conflicts with the plan: "Source 5-6 public domain speeches"; "Devpost deadline 14 October" / "Submit before 14 Oct" (plan: internal 14 Oct, event page 12:15 AM IST 15 Oct); "millisecond accuracy" (LE-08); team name placeholder. | Correct the deck before it is shown to anyone. |
| LE-28 | Medium | The plan's Oct 1–2 exit (agreed data contract plus one sample item) is due today and neither exists yet. | Close contracts by Fri 2 Oct or Sat 3 Oct at the latest; if G0 slips past Sat 3 Oct, the 5 Oct thin slice is at risk. |

## Blockers and high

| ID | Sev | Issue | Why it matters | Recommended resolution | Decide by |
|---|---|---|---|---|---|
| LE-01 | **Resolved 2 Oct** | `Plan.md` is referenced throughout (phases, exit criteria, "authoritative requirements") but is not in the project files. | Dispatch rules say to check the plan's current phase and exit criteria first; there is nothing to check against. My milestones (G0–G4) are placeholders. | Add `Plan.md` to the project, then reconcile the gates in `00_overview_and_timeline.md`. If it does not exist yet, adopt the gates as the plan. | Fri 2 Oct |
| LE-02 | **Resolved 2 Oct** | Deadline wording conflicts. Deck: "Devpost deadline 14 October" and "Submit before 14 Oct". `instructions.md`: "October 14 internal deadline". Guidelines give no date. | If 14 Oct is internal, there may be slack; if it is the real cut-off, "before" vs "on" and time zone (you are in IST) matter. | Resolved by Plan.md: 14 Oct is internal; the event page lists 12:15 AM IST on 15 Oct. Still target submission on 13 Oct. | Sat 3 Oct |
| LE-03 | High | The role "agents" and the deck's human Leads are not mapped. Who is the primary agent, who signs off at gates, who approves dispatches? | Four humans, four roles, plus an AI orchestrator; unclear who has decision authority and who reviews AI output (e.g. "human-reviewed" labels must be a real person). | Name one human owner per role and one human integrator; AI subagents execute, humans review and sign gates. | Sat 3 Oct |
| LE-07 | High | The deck's "robust z-scores vs baseline" has no defined spread. One baseline per speech gives a median but no distribution. | Without it, thresholds are arbitrary or the method flags the worst part of every read (even near-perfect ones). Core of the 25% criterion. | Estimate spread from calibration pairs (reference vs near-perfect L1 mirrors and clean re-reads on the dev split); fall back to documented fixed thresholds. Dataset must therefore supply L1 and clean-reread items. See S3. | Mon 5 Oct |
| LE-08 | High | The deck promises labels "with millisecond accuracy"; `instructions.md` forbids claiming it without a supporting process. | Forced alignment and human boundary judgments are typically coarser than 1 ms; an unsupported claim costs credibility with judges. | Remove the claim from the deck. Measure tolerance (D13, A7), report it with sample size, display times at 10 ms resolution. | Before deck is used |
| LE-09 | High | Rights: the deck both names Miller Center as an example source and warns about CC BY-NC-ND. Mirrors are derivative works. Transcript text may carry different terms from audio. Teammate recordings need speaker consent to publish. | A no-derivatives or non-commercial term on a source could invalidate shipping the mirrors; the dataset is a graded deliverable and must be public. | Per-item rights check for audio and text separately (D2); exclude anything uncertain; written consent line for each human speaker including public release. | Sat 3 Oct (first sample) |
| LE-06 | High | "Reproducibility and Code Quality" (10%) has no owner in the deck. | It touches every role, so it falls between them. | Primary agent owns the repo skeleton and pinned environment; Audio owns determinism; Dashboard owns README and the fresh-clone test. Record in the ownership map. | Sun 4 Oct |
| LE-20 | High | Feature freeze is Mon 12 Oct but the deadline is 14 Oct. Video, tech-doc PDF, fresh-clone test and Devpost fall in the last two days. | One failed fresh-clone test or upload problem has no slack. | Rehearse the video and draft docs before the freeze; record the final video on 12 Oct; target submission 13 Oct; treat 14 Oct as emergency buffer only. | Sun 4 Oct |
| LE-17 | High | Hosting and deployment are undecided. Guidelines need a runnable prototype; Track C asks for reproducibility "across deployment environments". Alignment and pitch models may be heavy for free hosting tiers and CPU-only machines. | Late discovery means a broken demo or an unreproducible repo. | Decide local-run-with-container vs hosted now; test the pipeline on a CPU-only machine; verify hosting limits before committing to hosted. | Sun 4 Oct |
| LE-12 | High (partly resolved) | Dev/test split: variants of one speech share a reference and text. | Splitting by variant leaks information between tuning and testing and inflates results. | Split **by speech**. With the plan's 3 speeches: 2 dev + 1 held-out, or leave-one-speech-out; freeze before tuning (D14, S9). Report results as a prototype evaluation, not generalization. | Mon 5 Oct |
| LE-13 | High | The deck says "WhisperX forced alignment with edit-distance fallback." WhisperX normally transcribes and then aligns; aligning to our known transcript, and what the fallback does and when it triggers, are not defined. | `instructions.md` bans silent method substitution, and alignment quality drives grounding accuracy. | Define the exact alignment-to-supplied-transcript method and a fallback that sets `fallback_used` and a UI flag (A2). | Sun 4 Oct |

## Medium

| ID | Sev | Issue | Recommended resolution |
|---|---|---|---|
| LE-05 | Medium | Tension in wording: Track C and the deck say "causal explanation"; `instructions.md` forbids claiming causality. | Define "causal explanation" in the docs as a rule-linked attribution: measured feature, both values, time range, rubric rule. Phrase UI text accordingly; keep the Track C term only where quoting the brief. |
| LE-10 | Medium | Public speech recordings may be noisy, reverberant, band-limited, or with applause/music; published transcripts often differ from the audio. | Pick the cleanest source audio for the golden sample; transcribe from audio, not from the published text; use quality flags; document excluded sources. |
| LE-11 | Medium | Tier 1 flaws are produced by DSP on the reference audio. Detectors may find processing artifacts, and detecting a flaw we just injected is partly circular. They also use the same speaker, so speaker normalization is not tested. | Report Tier 1 and Tier 2 results separately; spot-check artifacts by ear; use Tier 2 (different speakers) for the speaker-agnostic claim. |
| LE-14 | Medium (partly resolved) | Scope numbers are not fixed: 5–6 speeches is in the deck, but excerpt length, mirrors per speech, and Tier 2 recording workload are not. | Plan fixes 3 speeches (5 only after the 6 Oct checkpoint). Still to confirm in D1: 45–90 s excerpts, levels L1/L3/L5 first, Tier 2 for a subset. |
| LE-15 | Medium | Global vs local deviation: a uniformly slow or loud read is not a "region". The deck example (a 1.7 s region at 212 vs 148 wpm) covers only a few words, so the local rate is noisy. | Report global and local findings separately; set a minimum region length/word count; state it (S4, S5). |
| LE-16 | Low (downgraded) | Track C names FFT/MFCC as examples; the deck lists MFCCs but the scoring story uses rate, pitch, energy and pauses only. | Include at least one spectral feature and say how it feeds a rubric rule (e.g. clarity), or explain in the tech doc why it is not used. |
| LE-18 | **Resolved 2 Oct** | "Accepts audio and transcript uploads" assumes a matching reference exists. What happens for a speech not in the dataset? | Support dataset-matched references (and optionally an uploaded reference); otherwise show a clear "no reference available" state (B6). |
| LE-21 | **Resolved 2 Oct** | `instructions.md` calls for AI-tool disclosure in the README and Devpost "Built With". The Guidelines I read do not state such a requirement; the Problem Statements PDF links to separate Submission Guidelines and Prize Pool pages that were not extracted. | Check the Devpost rules page for eligibility, AI-use and prize terms; disclose AI use either way. |
| LE-04 | Medium | Path and file inconsistencies: `instructions.md` links `Plan.md` at root but the dispatch template says `Instructions/Plan.md` and `Instructions/instructions.md`; it also refers to repository-level `AGENTS.md` files that may not exist. | Fix the paths (this derived set assumes `Instructions/`); create a short `AGENTS.md` or drop the reference. |
| LE-23 | Medium | Dataset hosting limits: GitHub has per-file and repo size limits, and the dataset must be in the repo or a public Drive link in the README. | Estimate total size early (16 kHz WAV is large; keep originals compressed or on Drive); public link tested logged-out (D15, B17). |


## Low

| ID | Sev | Issue | Recommended resolution |
|---|---|---|---|
| LE-22 | Low | Deck placeholders and file: team name is "[Your Team Name / Names]"; the project's `Track_C_Bento_Deck.pptx` is only about 3.8 KB and did not open in python-pptx (the text I used came from your paste). | Fill the team name; re-upload a fresh copy of the deck if you want it edited. |
| LE-24 | Low | The deck's "causal explanation card" shows real-looking numbers (212 vs 148 wpm, +43%). The arithmetic is consistent (212/148 ≈ 1.43) but it is labelled illustrative. | Keep the "Illustrative example output" label on the slide and in the video; use real outputs in the demo. |
| LE-25 | Low | Deck puts the 6-page technical document on the Dashboard lead, but its content comes from all roles. | Each role writes its own section by Sat 10 Oct evening (D16, A15, S13); Dashboard integrates and enforces the page limit. |

## Decisions to take first (suggested order)

1. LE-03 and LE-06: who owns what, including reproducibility.
2. LE-09: rights check on the first golden-sample source.
3. LE-13, LE-07, LE-17: alignment method, z-score reference, hosting.
4. Freeze contracts and agree the sample (G0) by Sat 3 Oct.
5. LE-27: fix the deck.
