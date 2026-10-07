import { SpeechPreset } from '../types/speech';

export const CONTRASTIVE_PRESETS: SpeechPreset[] = [
  {
    id: 'jfk-ask-not',
    title: 'Inaugural Address ("Ask Not")',
    speaker: 'John F. Kennedy (1961) vs. Flawed Mirror',
    source: 'Miller Center Presidential Speech Archive / Public Domain',
    duration: 18.0,
    tier: 'Tier 1 (Programmatic)',
    flawSpectrum: 'Botched',
    overallScore: 61,
    overallIoU: 0.89,
    meanBoundaryErrorMs: 38,
    speakerAgnosticNote: 'Both streams normalized to median F0 semitones (0 st = speaker median). Absolute pitch difference neutralized.',
    transcript: 'And so my fellow Americans: ask not what your country can do for you — ask what you can do for your country.',
    words: [
      { word: 'And', start: 0.2, end: 0.6, zScore: 0.2 },
      { word: 'so', start: 0.6, end: 1.1, zScore: 0.4 },
      { word: 'my', start: 1.4, end: 1.8, zScore: 0.1 },
      { word: 'fellow', start: 1.8, end: 2.5, zScore: 0.5 },
      { word: 'Americans:', start: 2.6, end: 4.1, zScore: 0.8 },
      { word: '[pause]', start: 4.1, end: 5.4, zScore: 0.3 },
      { word: 'ask', start: 5.5, end: 6.2, zScore: 0.2 },
      { word: 'not', start: 6.2, end: 7.1, zScore: 0.6 },
      { word: 'what', start: 7.1, end: 7.7, zScore: 0.3 },
      { word: 'your', start: 7.7, end: 8.3, zScore: 0.5 },
      { word: 'country', start: 8.3, end: 9.4, zScore: 0.4 },
      { word: 'can', start: 9.4, end: 9.9, zScore: 0.2 },
      { word: 'do', start: 9.9, end: 10.5, zScore: 0.4 },
      { word: 'for', start: 10.5, end: 11.0, zScore: 0.1 },
      { word: 'you', start: 11.0, end: 12.1, zScore: 0.5 },
      { word: '—', start: 12.1, end: 12.4, zScore: -2.8, isFlawed: true },
      { word: 'ask', start: 12.4, end: 12.8, zScore: 3.2, isFlawed: true },
      { word: 'what', start: 12.8, end: 13.1, zScore: 3.6, isFlawed: true },
      { word: 'you', start: 13.1, end: 13.4, zScore: 3.5, isFlawed: true },
      { word: 'can', start: 13.4, end: 13.7, zScore: 3.1, isFlawed: true },
      { word: 'do', start: 13.7, end: 14.1, zScore: 3.4, isFlawed: true },
      { word: 'for', start: 14.1, end: 14.5, zScore: 1.8 },
      { word: 'your', start: 14.5, end: 15.2, zScore: 1.2 },
      { word: 'country.', start: 15.2, end: 17.2, zScore: 0.6 },
    ],
    flaws: [
      {
        id: 'flaw-1',
        regionStart: 12.4,
        regionEnd: 14.1,
        timeFormatted: '00:12.4 – 00:14.1',
        flawType: 'Speech Rate',
        metricParticipant: '212 wpm',
        metricBaseline: '148 wpm',
        metricLabel: 'Speech rate',
        deviationFormatted: '+43% above baseline',
        explanation: 'Delivery too fast for this passage',
        causalRule: 'Pacing rate z-score exceeds +3.0σ during rhetorical antithesis climax',
        zScore: 3.42,
        iouScore: 0.89,
        boundaryErrorMs: 38,
        severity: 'Critical',
        targetWords: ['ask', 'what', 'you', 'can', 'do'],
        recommendation: 'Decelerate tempo at the pivotal clause turn. Kennedy held 148 wpm to grant gravitational weight to the call-to-action.'
      },
      {
        id: 'flaw-2',
        regionStart: 11.8,
        regionEnd: 12.4,
        timeFormatted: '00:11.8 – 00:12.4',
        flawType: 'Dysfluent Pause',
        metricParticipant: '280 ms',
        metricBaseline: '850 ms',
        metricLabel: 'Caesura duration',
        deviationFormatted: '-67% pause truncation',
        explanation: 'Rushed rhetorical caesura between antithetical clauses',
        causalRule: 'Pause duration truncated below 0.35s threshold before antithesis',
        zScore: -2.85,
        iouScore: 0.84,
        boundaryErrorMs: 44,
        severity: 'Moderate',
        targetWords: ['you', '—', 'ask'],
        recommendation: 'Preserve at least 700ms of contemplative silence at the em-dash to let the first proposition register.'
      }
    ],
    timeSeries: Array.from({ length: 90 }, (_, i) => {
      const t = (i * 18.0) / 89;
      // baseline F0 in semitones (-6 to +6)
      const baseF0 = Math.sin(t * 1.4) * 3.2 + Math.cos(t * 0.7) * 1.5;
      let partF0 = baseF0 + (Math.sin(t * 2.8) * 0.8);
      
      // baseline Energy dB (-24 to -3)
      let baseEnergy = -18 + Math.cos(t * 1.2) * 8;
      let partEnergy = baseEnergy;

      // speech rate WPM
      let baseWpm = 145 + Math.sin(t * 0.8) * 15;
      let partWpm = baseWpm;
      let z = 0.2;

      // In flaw zone 12.4 - 14.1
      if (t >= 12.4 && t <= 14.1) {
        partWpm = 212;
        baseWpm = 148;
        z = 3.42;
        partF0 = baseF0 + 4.5; // pitch squeak
        partEnergy = baseEnergy + 5.2;
      } else if (t >= 11.8 && t < 12.4) {
        partWpm = 195;
        z = -2.85;
      }

      return {
        time: parseFloat(t.toFixed(2)),
        baselineF0: parseFloat(baseF0.toFixed(2)),
        participantF0: parseFloat(partF0.toFixed(2)),
        baselineEnergy: parseFloat(baseEnergy.toFixed(1)),
        participantEnergy: parseFloat(partEnergy.toFixed(1)),
        baselineWpm: Math.round(baseWpm),
        participantWpm: Math.round(partWpm),
        zScore: parseFloat(z.toFixed(2))
      };
    })
  },
  {
    id: 'mlk-dream',
    title: 'I Have a Dream ("True Meaning of its Creed")',
    speaker: 'Martin Luther King Jr. (1963) vs. Monotone Mirror',
    source: 'National Archives / Public Domain / Tier 2 Human Re-recording',
    duration: 16.0,
    tier: 'Tier 2 (Human Re-recording)',
    flawSpectrum: 'Moderate Flaw',
    overallScore: 74,
    overallIoU: 0.86,
    meanBoundaryErrorMs: 42,
    speakerAgnosticNote: 'Semitone normalization neutralizes deep baritone differences while preserving contour variance.',
    transcript: 'I have a dream that one day this nation will rise up and live out the true meaning of its creed.',
    words: [
      { word: 'I', start: 0.3, end: 0.8, zScore: 0.2 },
      { word: 'have', start: 0.8, end: 1.4, zScore: 0.3 },
      { word: 'a', start: 1.4, end: 1.7, zScore: 0.1 },
      { word: 'dream', start: 1.7, end: 3.2, zScore: 0.4 },
      { word: 'that', start: 3.5, end: 4.1, zScore: 0.2 },
      { word: 'one', start: 4.1, end: 4.7, zScore: 0.3 },
      { word: 'day', start: 4.7, end: 5.6, zScore: 0.5 },
      { word: 'this', start: 6.2, end: 6.7, zScore: -2.3, isFlawed: true },
      { word: 'nation', start: 6.7, end: 7.8, zScore: -3.1, isFlawed: true },
      { word: 'will', start: 7.8, end: 8.3, zScore: -2.9, isFlawed: true },
      { word: 'rise', start: 8.3, end: 9.6, zScore: -3.4, isFlawed: true },
      { word: 'up', start: 9.6, end: 10.4, zScore: -2.7, isFlawed: true },
      { word: 'and', start: 10.8, end: 11.3, zScore: 0.2 },
      { word: 'live', start: 11.3, end: 12.0, zScore: 0.4 },
      { word: 'out', start: 12.0, end: 12.6, zScore: 0.5 },
      { word: 'the', start: 12.6, end: 13.0, zScore: 0.2 },
      { word: 'true', start: 13.0, end: 13.8, zScore: 0.6 },
      { word: 'meaning', start: 13.8, end: 14.8, zScore: 0.4 },
      { word: 'of', start: 14.8, end: 15.1, zScore: 0.1 },
      { word: 'its', start: 15.1, end: 15.4, zScore: 0.2 },
      { word: 'creed.', start: 15.4, end: 16.0, zScore: 0.3 },
    ],
    flaws: [
      {
        id: 'flaw-mlk-1',
        regionStart: 6.7,
        regionEnd: 10.4,
        timeFormatted: '00:06.7 – 00:10.4',
        flawType: 'Pitch Monotone',
        metricParticipant: '0.8 st range',
        metricBaseline: '5.2 st range',
        metricLabel: 'Pitch dynamic range',
        deviationFormatted: '-84% pitch flattening',
        explanation: 'Robotic, flat pitch contour across emotive ascending phrase',
        causalRule: 'F0 standard deviation in semitones < 1.0 st across 3 consecutive content words',
        zScore: -3.15,
        iouScore: 0.86,
        boundaryErrorMs: 42,
        severity: 'Critical',
        targetWords: ['this', 'nation', 'will', 'rise', 'up'],
        recommendation: 'Incorporate vocal arc upward on "rise up" (+4 semitones) matching MLK prophetic crescendo.'
      }
    ],
    timeSeries: Array.from({ length: 80 }, (_, i) => {
      const t = (i * 16.0) / 79;
      const baseF0 = Math.sin(t * 0.9) * 4.8 + Math.cos(t * 0.4) * 2.0;
      let partF0 = baseF0;
      const baseEnergy = -20 + Math.sin(t * 0.8) * 7;
      let partEnergy = baseEnergy;
      let z = 0.3;

      if (t >= 6.7 && t <= 10.4) {
        // Flat monotone line
        partF0 = 0.2;
        z = -3.15;
        partEnergy = baseEnergy - 4.5;
      }

      return {
        time: parseFloat(t.toFixed(2)),
        baselineF0: parseFloat(baseF0.toFixed(2)),
        participantF0: parseFloat(partF0.toFixed(2)),
        baselineEnergy: parseFloat(baseEnergy.toFixed(1)),
        participantEnergy: parseFloat(partEnergy.toFixed(1)),
        baselineWpm: 128,
        participantWpm: 122,
        zScore: parseFloat(z.toFixed(2))
      };
    })
  },
  {
    id: 'churchill-fight',
    title: 'We Shall Fight on the Beaches',
    speaker: 'Winston Churchill (1940) vs. High-Precision Delivery',
    source: 'BBC Archives / Public Domain Reference',
    duration: 15.0,
    tier: 'Tier 2 (Human Re-recording)',
    flawSpectrum: 'Near-Perfect',
    overallScore: 92,
    overallIoU: 0.94,
    meanBoundaryErrorMs: 24,
    speakerAgnosticNote: 'High concordance across dynamic inflection; only minor rhythmic drift.',
    transcript: 'We shall fight on the beaches, we shall fight on the landing grounds, we shall never surrender.',
    words: [
      { word: 'We', start: 0.2, end: 0.7, zScore: 0.1 },
      { word: 'shall', start: 0.7, end: 1.3, zScore: 0.2 },
      { word: 'fight', start: 1.3, end: 2.2, zScore: 0.3 },
      { word: 'on', start: 2.2, end: 2.6, zScore: 0.1 },
      { word: 'the', start: 2.6, end: 2.9, zScore: 0.1 },
      { word: 'beaches,', start: 2.9, end: 4.2, zScore: 0.4 },
      { word: 'we', start: 4.6, end: 5.1, zScore: 0.2 },
      { word: 'shall', start: 5.1, end: 5.7, zScore: 0.3 },
      { word: 'fight', start: 5.7, end: 6.6, zScore: 0.3 },
      { word: 'on', start: 6.6, end: 7.0, zScore: 0.1 },
      { word: 'the', start: 7.0, end: 7.3, zScore: 0.1 },
      { word: 'landing', start: 7.3, end: 8.2, zScore: 0.4 },
      { word: 'grounds,', start: 8.2, end: 9.6, zScore: 0.5 },
      { word: 'we', start: 10.2, end: 10.7, zScore: 0.2 },
      { word: 'shall', start: 10.7, end: 11.4, zScore: 0.3 },
      { word: 'never', start: 11.4, end: 12.8, zScore: 1.4, isFlawed: true },
      { word: 'surrender.', start: 12.8, end: 14.8, zScore: 0.5 },
    ],
    flaws: [
      {
        id: 'flaw-ch-1',
        regionStart: 11.4,
        regionEnd: 12.8,
        timeFormatted: '00:11.4 – 00:12.8',
        flawType: 'Stress Drift',
        metricParticipant: '+1.8 dB stress',
        metricBaseline: '+4.9 dB stress',
        metricLabel: 'Syllabic emphasis',
        deviationFormatted: '-63% stress contrast',
        explanation: 'Mild under-emphasis on operative syllable "nev-" in "never"',
        causalRule: 'Relative syllable loudness ratio delta |ΔdB| > 2.5 dB',
        zScore: 1.42,
        iouScore: 0.94,
        boundaryErrorMs: 24,
        severity: 'Minor',
        targetWords: ['never'],
        recommendation: 'Deliver sharp staccato punch to "NEV-er" to replicate Churchillian defiance.'
      }
    ],
    timeSeries: Array.from({ length: 75 }, (_, i) => {
      const t = (i * 15.0) / 74;
      const baseF0 = Math.sin(t * 1.1) * 3.5;
      const partF0 = baseF0 + (Math.sin(t * 3) * 0.4);
      const baseEnergy = -16 + Math.cos(t * 1.0) * 6;
      let partEnergy = baseEnergy;
      let z = 0.2;

      if (t >= 11.4 && t <= 12.8) {
        partEnergy = baseEnergy - 3.1;
        z = 1.42;
      }

      return {
        time: parseFloat(t.toFixed(2)),
        baselineF0: parseFloat(baseF0.toFixed(2)),
        participantF0: parseFloat(partF0.toFixed(2)),
        baselineEnergy: parseFloat(baseEnergy.toFixed(1)),
        participantEnergy: parseFloat(partEnergy.toFixed(1)),
        baselineWpm: 135,
        participantWpm: 138,
        zScore: parseFloat(z.toFixed(2))
      };
    })
  }
];
