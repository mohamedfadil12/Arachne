# Hyperframes composition brief: Arachne

Create a polished 22.5-second 16:9 landscape launch video for Arachne, using `brag-plan.md` as the story contract. Arachne is the hackathon project named in the source UI: “Contrastive Speech Analytics & Temporal Flaw Grounding.”

## Creative direction

Quiet premium product film, specific to speech analysis. Use the product’s deep navy interface, serif display type, paired signal traces, transcript timing, and amber flaw marker. Keep motion confident and restrained. No voiceover, generic SaaS claims, fabricated testimonials, or invented performance claims.

## Source material

- `../../src/components/HeroSection.tsx`: exact hero line “Replacing Subjectivity with Mathematics.”
- `../../src/components/SpeechStudio.tsx`: studio labels, preset/participant/baseline interaction, flaw explanation UI.
- `../../src/components/AcousticFeaturesOverlay.tsx` and `../../src/components/WaveformDisplay.tsx`: analysis trace and flaw interval visual language.
- `../../src/data/contrastiveCorpus.ts`: JFK preset transcript, 212 wpm participant, 148 wpm baseline, +43% deviation, +3.42 z-score, 280 ms pause, 850 ms reference pause, interval 12.4–14.1s.
- `../../src/index.css` and `../../index.html`: `#001726` / `#002238` navy palette; Instrument Serif headings and Inter body type.

## Composition contract

Follow the scene timing, exact visible copy, and readability notes in `brag-plan.md`. Show a recognizable and accurate Speech Studio panel as the product UI. The UI may be art-directed for legibility, but labels and data must remain faithful to the cited source files. Highlight the words “ask what you can do” at 00:12.4–00:14.1 and tie them visually to the measured rate comparison.

## Audio

- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, restrained volume, fade out under the wordmark.
- Cue guidance: bundled preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; optional 8.74s and 13.11s strong-cue candidates.
- Audio-reactive treatment: subtle modulation of the existing navy glow only; no visualizer or heavy pulsing.
- SFX: choose a few low-key UI accents to support panel reveal and final identity; keep them below the music.
- No narration or voice track.

## Delivery

Build and validate the composition with the current Hyperframes workflow. Run `hyperframes check` before rendering. Render `../brag.mp4`, choose a settled, shareable product/UI frame for `../brag.jpg`, and make it frame 0 of the final MP4. Keep the complete composition project in this directory.
