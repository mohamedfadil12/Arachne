# Arachne launch video plan

## Planning rubric

1. **What is the app?** Arachne is a contrastive speech analytics interface that compares a delivery with a reference and grounds delivery flaws at precise moments in the transcript.
2. **Most impressive claim:** “Replacing Subjectivity with Mathematics.” The JFK preset makes the comparison concrete: the same passage is marked at 212 wpm versus a 148 wpm baseline, with a +3.42σ pacing deviation.
3. **Visual hook:** A dark navy acoustic-analysis UI with paired speech tracks, an amber flaw interval, and exact transcript timing.
4. **UI to show:** The JFK “Ask Not” preset in the Speech Studio, including its participant/baseline comparison, waveform/time-series, selected flaw card, and causal explanation.
5. **Shortest satisfying video:** 22.5 seconds; enough time to establish the idea, show the paired comparison, reveal the measured flaw, and land the product name.
6. **Tone:** Polished, quiet premium product film. Elegant, restrained motion; amber and cyan signals against Arachne’s deep navy interface.
7. **Audio:** Restrained clean music bed using `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` at low volume, with a few subtle UI accents. Audio-reactive treatment should be limited to a slight background glow.
8. **Share caption:** Arachne compares speech against a matched reference, then grounds delivery flaws in the exact words and moments where they happen.
9. **User flow:** Select a contrastive speech preset → compare participant and baseline delivery → inspect a timestamped flaw with its measured deviation and explanation.

All numeric claims below are from `src/data/contrastiveCorpus.ts` (JFK “Ask Not” preset). UI details and product wording come from `src/components/SpeechStudio.tsx`, `src/components/AcousticFeaturesOverlay.tsx`, and the hero section. No user data is shown.

## Storyboard (22.5 seconds, landscape)

| Time | Beat | On-screen copy and image | Motion / audio |
|---|---|---|---|
| 0.0–2.6s | Hook | Deep navy field resolves into paired traces. “Same words.” then “Different delivery.” | Slow signal reveal; restrained music begins. |
| 2.6–6.5s | Product reveal | A faithful Arachne Speech Studio panel. Preset: “Inaugural Address (‘Ask Not’)”; paired `PARTICIPANT` and `BASELINE` tracks. | Panel eases into view; soft interface click. |
| 6.5–10.3s | Locate the moment | Transcript excerpt: “ask what you can do for you — ask what you can do for your country.” A narrow amber region brackets 00:12.4–00:14.1. | Playhead sweeps, then settles on the marked words. |
| 10.3–15.7s | Measure the deviation | “212 wpm” participant against “148 wpm” baseline; “+43% above baseline”; “z = +3.42σ”. Small label: “Speech rate”. | Values resolve beside the highlighted analysis trace; no rapid text flashing. |
| 15.7–19.4s | Explain the cause | “Rushed rhetorical caesura” with the actual contrast: “280 ms” vs “850 ms”. | A short pause in the music gives the explanation room. |
| 19.4–22.5s | Payoff | “Replacing Subjectivity with Mathematics.” Arachne wordmark and “Contrastive Speech Analytics & Temporal Flaw Grounding”. | UI recedes into the background; subtle final accent and music fade. |

## Visual direction

- Format: 16:9 landscape, 1920×1080.
- Tone: polished, restrained, data-led.
- Palette: deep navy (`#001726`, `#002238`), white, muted slate, amber for detected flaws, cyan for the reference signal, emerald for grounded analysis.
- Typography: Instrument Serif for display lines; Inter for interface copy and labels.
- Make the UI legible at presentation size. Keep each numeric comparison on screen long enough to read.
- Keep the same transcript visible as the flaw marker lands, so the viewer sees what the timing refers to.

## Music cue guidance

Use the bundled vol-12 track. Cue preset: `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`. Useful strong cues include 8.74s and 13.11s; use them only if they preserve the 22.5-second story and readable holds. Fade under the final wordmark. No voiceover was requested.
