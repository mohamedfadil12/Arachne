export interface WordAlignment {
  word: string;
  start: number; // in seconds
  end: number;
  zScore: number;
  isFlawed?: boolean;
}

export interface FlawGrounding {
  id: string;
  regionStart: number; // e.g. 12.4
  regionEnd: number;   // e.g. 14.1
  timeFormatted: string; // e.g. "00:12.4 – 00:14.1"
  flawType: 'Speech Rate' | 'Pitch Monotone' | 'Energy Spikes' | 'Dysfluent Pause' | 'Stress Drift';
  metricParticipant: string; // e.g. "212 wpm"
  metricBaseline: string;    // e.g. "148 wpm"
  metricLabel: string;       // e.g. "Speech rate"
  deviationFormatted: string; // e.g. "+43% above baseline"
  explanation: string;       // e.g. "Delivery too fast for this passage"
  causalRule: string;        // e.g. "Cadence Velocity > 1.35x baseline threshold"
  zScore: number;            // e.g. 3.42
  iouScore: number;          // e.g. 0.89
  boundaryErrorMs: number;   // e.g. 38
  severity: 'Critical' | 'Moderate' | 'Minor';
  targetWords: string[];
  recommendation: string;
}

export interface AcousticTimeSeriesPoint {
  time: number;
  baselineF0: number; // semitones relative to median
  participantF0: number;
  baselineEnergy: number; // dB RMS
  participantEnergy: number;
  baselineWpm: number;
  participantWpm: number;
  zScore: number;
}

export interface SpeechPreset {
  id: string;
  title: string;
  speaker: string;
  source: string;
  duration: number; // seconds
  tier: 'Tier 1 (Programmatic)' | 'Tier 2 (Human Re-recording)';
  flawSpectrum: 'Botched' | 'Moderate Flaw' | 'Near-Perfect';
  overallScore: number; // 0-100
  overallIoU: number;
  meanBoundaryErrorMs: number;
  transcript: string;
  words: WordAlignment[];
  flaws: FlawGrounding[];
  timeSeries: AcousticTimeSeriesPoint[];
  speakerAgnosticNote: string;
}
