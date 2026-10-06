Project Plan for Track C
Multimodal AI Hackathon 2026  
Track C: Contrastive Speech Analytics and Temporal Flaw Grounding  
Working period: October 1–14, 2026
Goal
Build a reproducible speech-delivery evaluation prototype that compares an uploaded performance with a carefully aligned reference for the same transcript. The system will extract acoustic features, identify and time-bound delivery deviations, map them to an explicit rubric, and show the evidence and actionable feedback in an interactive dashboard.
The product will describe measurable differences from its chosen reference. A statistical deviation is evidence for a rubric finding; it is not, by itself, proof of a flaw or its cause. Explanations must name the measured feature, comparison, time span, and rubric rule that produced the feedback.
Requirements and scoring priorities
The following requirements come from the supplied Track C.pdf and Submission Guidelines.pdf. Judging weights below total 100% and should guide prioritization.
Judging criterion	Weight	Evidence the project should show
Data engineering and stress testing	30%	Documented prominent-speech references; paired recordings of the exact same text; a labeled spectrum from highly flawed to near-perfect; stress-test results.
Causal explainability and temporal grounding	25%	Correctly bounded flaw regions; understandable explanations tied to acoustic measurements and rubric rules.
Feature extraction	20%	Forced alignment and technically sound extraction of relevant acoustic features, including stress and energy contours.
Visualization and dashboard	15%	Audio and transcript upload; processing; baseline comparison; clear time-series and text feedback.
Reproducibility and code quality	10%	Clean repository, documented environment and run steps, repeatable outputs, and understandable architecture.
Required submission components are: a Devpost project description; a public GitHub repository with source, documentation, and README setup/run instructions; a 3–10 minute YouTube demo with the project running and English audio or subtitles; and all team members added to Devpost with real full names and accounts. The custom dataset must be in GitHub or available through a public Google Drive link in the README. The technical document is limited to six pages; the demo may be unlisted but not private.
The event’s public Devpost rules additionally require disclosure of AI coding assistants in Built With and in the README, including which parts were AI-assisted. Treat this as a submission requirement too.
Product scope
Minimum complete demo
The minimum complete demo must work from upload to explanation using one supported transcript and its reference recording. It must:
Accept an audio file and transcript, validate them, and report processing errors clearly.
Align transcript text to audio timestamps and extract a small, documented feature set.
Compare the upload with a same-text reference using speaker-normalized features.
Produce a rubric-based score and one or more candidate flaw regions with timestamps, measured deltas, and template-based explanations.
Display the audio, transcript, feature comparison, and explanations together in the dashboard.
Reproduce the same scored output for the same input and pinned configuration.
Dataset target
Favor a small, reviewed dataset over a large corpus. Start with three source speeches and expand to five only if the end-to-end demo and labels are stable by October 6. For each selected text, retain one documented effective reference and create matched flawed performances across a few levels, including near-perfect and clearly flawed examples. Focus first on three delivery dimensions that can be measured and demonstrated reliably, such as pacing, pause placement/duration, and relative pitch or energy contour.
Every item must include a stable ID, source and recording provenance, transcript, audio format details, speaker/recording notes, flaw type and severity, intended flaw spans, word or segment alignment, and any transformation parameters. Store audio in the repository only if size and rights permit; otherwise use a public Drive folder and document its structure and access in the README. Check the rights and reuse conditions for each source recording, not only the speech text.
Use controlled edits and/or human re-recordings to create flawed mirrors. Keep the original and transformed audio, transformation settings, and labels together. Forced alignment proposes timestamps; a person reviews the transcript and labels against the audio. Record the review tolerance and do not claim millisecond accuracy unless the annotation process supports it.
Rubric and scoring
Define a short delivery rubric before generating the full dataset. For each category, specify the feature, normalization, comparison window, threshold or scoring rule, direction of concern, and feedback template. Keep raw measurements available beside normalized values. Prefer matched-text comparisons and robust speaker-relative normalization (for example, semitone pitch offsets and robust energy scaling) over raw cross-speaker pitch or loudness comparisons.
The first version should use deterministic signal processing and explicit rules, with model versions and configuration pinned. It should return “insufficient evidence” when alignment, audio quality, or baseline coverage is inadequate. Do not present z-scores as universally calibrated judgments; document the reference set and threshold choices.
Team ownership
Assign one accountable owner per workstream. With fewer than four people, combine adjacent workstreams and reduce dataset size before reducing integration time.
Workstream	Primary responsibility	Concrete output
Dataset and annotation	Select and document source speeches; create the paired quality spectrum; maintain labels and provenance.	Versioned dataset and annotation guide.
Audio and features	Implement alignment, preprocessing, normalization, feature extraction, and repeatable processing.	Stable feature/region output schema and runnable pipeline.
Scoring and evaluation	Define rubric rules, temporal detection, explanation templates, and evaluation.	Scoring method and metrics with reviewed examples.
Dashboard and submission	Build the upload/comparison flow; integrate outputs; prepare README, technical document, video, and Devpost page.	End-to-end application and complete submission package.
All owners participate in integration and review. Agree on a shared input/output schema and one small sample recording before parallel implementation begins.
Schedule and exit criteria
Dates	Focus	Work and exit criteria
Oct 1–2	Requirements and design	Confirm the Track C criteria; choose three measurable flaw dimensions; define rubric, dataset schema, label tolerance, supported upload formats, and shared output schema. Select initial source speeches and check recording reuse terms. Exit: one sample item and a working architecture/data contract agreed by the team.
Oct 3–5	Thin end-to-end slice	Implement one path from audio/transcript input through alignment, features, one scoring rule, and a basic dashboard result. Build UI with the real schema, not a separate mock contract. Exit: one reference and one flawed mirror produce a visible, reviewable result.
Oct 6–8	Dataset and feature pipeline	Expand to three source speeches if labels and processing are reliable; create the planned severity spectrum; review alignments and temporal labels; add normalization and additional rubric dimensions. Exit: every included item has provenance, transcript, labels, and processing metadata; known failure cases are logged.
Oct 9–10	Integration and evaluation	Finish region detection and explanations; connect audio playback, transcript, overlays, scores, and feedback. Evaluate against reviewed spans and test different speakers/recording conditions. Exit: complete demo flow runs from a fresh environment with no hand-edited intermediate output.
Oct 11–12	Hardening and freeze	Fix highest-impact integration defects; pin dependencies/configuration; rerun repeatability and evaluation checks; freeze features by Oct 12. Exit: fixed inputs give repeatable outputs; dataset links and app startup work; evaluation results are saved.
Oct 13	Documentation and video	Complete the six-page maximum technical document, README, and 3–10 minute demo video. Explain dataset construction, rubric, architecture, results, limitations, and the dashboard. Add English audio or subtitles. Exit: a reviewer can follow setup and see the submitted project running.
Oct 14	Submission and buffer	Verify the public repository and dataset access from a clean session; complete Devpost description and Built With; add every teammate; check video visibility and link; submit before the team cutoff. Exit: all required links and fields are checked.
Deadline: Use October 14 as the team’s internal submission deadline. The event page lists the deadline as 12:15 AM IST on October 15, 2026, so do not plan work up to the final minute.
Evaluation and quality gates
Use a compact, interpretable evaluation set. Keep related variants of the same speech together when splitting data; do not let near-duplicate audio appear in both calibration and evaluation sets. With a small corpus, report results as a prototype evaluation rather than a broad generalization claim.
For temporal grounding, compare predicted intervals with reviewed ground-truth intervals using intersection-over-union and start/end boundary error. Also report missed and false-positive regions. For the bad-mirror spectrum, check whether rubric scores or detected deviation generally follow the intended severity order. Show several examples, including at least one failure or “insufficient evidence” result. State the sample count and label tolerance beside every metric.
Before feature freeze, verify:
Forced alignment and labels are reviewed on the demo examples.
Pitch and energy comparisons use documented normalization and do not rely on raw cross-speaker values.
The explanation is traceable to the displayed measurements and rubric rule.
Audio/transcript mismatch, poor quality, and unsupported inputs produce understandable messages.
Re-running the same input with the same configuration returns the same results.
A clean clone can install dependencies, access the dataset, and run the demo using README instructions.
Submission checklist
[ ] Public GitHub repository contains the source code and documentation.
[ ] README lists prerequisites, dependencies, exact setup/run steps, dataset access, and known limitations.
[ ] README discloses AI coding tools used and identifies AI-assisted project parts; Devpost Built With also lists the tools.
[ ] Custom paired dataset includes audio, exact transcripts, provenance, and reviewed alignment/flaw labels in GitHub or a public Drive folder linked in the README.
[ ] Interactive dashboard demonstrates audio and transcript uploads, processing, time-series comparison, and textual feedback.
[ ] Technical documentation is no more than six pages and covers dataset construction, evaluation rubric, architecture, scoring, and evaluation results.
[ ] YouTube demo is 3–10 minutes, shows the project running, explains the approach and stress tests, and has English audio or subtitles. Visibility is Public or Unlisted.
[ ] Devpost project page explains the problem, solution, and build; all teammates have accounts and are added with their real full names.
[ ] Repository, dataset, app instructions, and video links have been checked from a clean session.
Decisions to keep explicit
Expand beyond three source speeches only after the minimum complete demo works.
If human re-recordings or forced alignment consume more time than planned, reduce the number of items; keep the label review and end-to-end integration gates.
Treat every explanation as a rubric-grounded interpretation of measurements, not a claim that acoustic deviation proves a speaker’s intent or universally incorrect delivery.
Preserve an honest limitations section, especially for small sample size, speaker coverage, alignment errors, and recording conditions.
