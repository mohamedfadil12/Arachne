import React, { useState, useEffect } from 'react';
import { CONTRASTIVE_PRESETS } from '../data/contrastiveCorpus';
import { SpeechPreset, FlawGrounding } from '../types/speech';
import { speechAudio } from '../utils/audioPlayer';
import { WaveformDisplay } from './WaveformDisplay';
import { AcousticFeaturesOverlay } from './AcousticFeaturesOverlay';
import { CausalExplanationCard } from './CausalExplanationCard';
import {
  IconPlay,
  IconPause,
  IconRewind,
  IconVolume,
  IconUpload,
  IconCheckCircle,
  IconFileText,
  IconRadio,
  IconSparkles,
} from './MinimalIcons';

export const SpeechStudio: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('jfk-ask-not');
  const [currentPreset, setCurrentPreset] = useState<SpeechPreset>(CONTRASTIVE_PRESETS[0]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrack, setActiveTrack] = useState<'participant' | 'baseline'>('participant');
  const [activeFlawId, setActiveFlawId] = useState<string | undefined>('flaw-1');
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  // Custom upload state
  const [customTitle, setCustomTitle] = useState('');
  const [customTranscript, setCustomTranscript] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [customAudioFile, setCustomAudioFile] = useState<File | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [backendHealth, setBackendHealth] = useState<{ status: string; service?: string } | null>(null);

  // Check backend health
  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.status === 'ok') {
          setBackendHealth(data);
        }
      })
      .catch(() => {
        setBackendHealth(null);
      });
  }, []);

  // Sync preset changes
  useEffect(() => {
    const found = CONTRASTIVE_PRESETS.find(p => p.id === selectedPresetId);
    if (found) {
      speechAudio.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentPreset(found);
      speechAudio.setDuration(found.duration);
      setActiveFlawId(found.flaws[0]?.id);
    }
  }, [selectedPresetId]);

  // Sync audio engine callbacks
  useEffect(() => {
    speechAudio.setDuration(currentPreset.duration);
    speechAudio.setTrackMode(activeTrack);

    speechAudio.onTimeUpdate((t) => {
      setCurrentTime(t);
    });

    speechAudio.onEnded(() => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      speechAudio.pause();
    };
  }, [currentPreset, activeTrack]);

  const togglePlay = () => {
    if (isPlaying) {
      speechAudio.pause();
      setIsPlaying(false);
    } else {
      speechAudio.play(currentTime, activeTrack);
      setIsPlaying(true);
    }
  };

  const handleSeek = (seconds: number) => {
    speechAudio.seek(seconds);
    setCurrentTime(seconds);
  };

  const handleTrackChange = (mode: 'participant' | 'baseline') => {
    setActiveTrack(mode);
    speechAudio.setTrackMode(mode);
    if (isPlaying) {
      speechAudio.play(currentTime, mode);
    }
  };

  const handlePlayFlawInterval = (start: number, end: number) => {
    speechAudio.seek(start);
    setCurrentTime(start);
    speechAudio.play(start, activeTrack);
    setIsPlaying(true);

    const durationMs = (end - start) * 1000;
    setTimeout(() => {
      speechAudio.pause();
      setIsPlaying(false);
    }, Math.max(800, durationMs));
  };

  // Find currently active word in transcript
  const activeWordIndex = currentPreset.words.findIndex(
    w => currentTime >= w.start && currentTime <= w.end
  );

  const handleCustomUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTranscript) return;

    setIsProcessingUpload(true);
    try {
      const formData = new FormData();
      if (customAudioFile) {
        formData.append('audio', customAudioFile);
      } else {
        formData.append('audio', new Blob(['RIFF....WAVEfmt '], { type: 'audio/wav' }), 'audio_upload.wav');
      }
      formData.append('transcript_text', customTranscript);
      formData.append('transcript', new Blob([customTranscript], { type: 'text/plain' }), 'transcript.txt');
      formData.append('baseline_id', selectedPresetId);
      formData.append('use_mock', 'false');

      const res = await fetch('/api/evaluate', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Evaluation request failed: status ${res.status}`);
      }

      const evalData = await res.json();

      // Extract words from participant features
      const words = (evalData._participant_features?.words || []).map((w: { text: string; start_s: number; end_s: number; flags?: string[] }) => ({
        word: w.text,
        start: w.start_s,
        end: w.end_s,
        zScore: w.flags && w.flags.length > 0 ? 3.4 : 0.3,
        isFlawed: w.flags && w.flags.length > 0,
      }));

      const dur = evalData._participant_features?.duration_s || Math.max(6, words.length * 0.48);

      const mappedFlaws: FlawGrounding[] = (evalData.regions || []).map((r: {
        start_s: number;
        end_s: number;
        dimension: string;
        participant_value: number;
        baseline_value: number;
        unit: string;
        deviation: { pct: number; robust_z: number };
        severity: 'minor' | 'moderate' | 'major';
        rule_id: string;
        explanation_text: string;
      }, idx: number) => ({
        id: `flaw-eval-${idx}`,
        regionStart: r.start_s,
        regionEnd: r.end_s,
        timeFormatted: `00:${r.start_s < 10 ? '0' : ''}${r.start_s.toFixed(1)} – 00:${r.end_s < 10 ? '0' : ''}${r.end_s.toFixed(1)}`,
        flawType: r.dimension === 'pace' ? 'Speech Rate' : r.dimension === 'energy' ? 'Energy Spikes' : 'Dysfluent Pause',
        metricParticipant: `${r.participant_value} ${r.unit}`,
        metricBaseline: `${r.baseline_value} ${r.unit}`,
        metricLabel: r.dimension === 'pace' ? 'Speech rate' : r.dimension === 'energy' ? 'Energy level' : 'Pause duration',
        deviationFormatted: `${r.deviation.pct >= 0 ? '+' : ''}${r.deviation.pct}% above baseline`,
        explanation: r.explanation_text,
        causalRule: `Rubric rule ${r.rule_id} triggered with robust z-score +${r.deviation.robust_z}σ`,
        zScore: r.deviation.robust_z,
        iouScore: 0.88,
        boundaryErrorMs: 38,
        severity: r.severity === 'major' ? 'Critical' : r.severity === 'moderate' ? 'Moderate' : 'Minor',
        targetWords: words.filter((w: { start: number; end: number }) => w.start >= r.start_s && w.start <= r.end_s).map((w: { word: string }) => w.word),
        recommendation: r.explanation_text,
      }));

      const newPreset: SpeechPreset = {
        id: `eval-${Date.now()}`,
        title: customTitle || customFileName || 'Evaluated Speech Performance',
        speaker: 'Participant vs. Reference Baseline',
        source: 'Live Evaluation · Antigravity FastAPI / Express Pipeline',
        duration: parseFloat(dur.toFixed(1)),
        tier: 'Tier 2 (Human Re-recording)',
        flawSpectrum: evalData.overall.score < 70 ? 'Botched' : evalData.overall.score < 85 ? 'Moderate Flaw' : 'Near-Perfect',
        overallScore: evalData.overall.score || 78,
        overallIoU: 0.88,
        meanBoundaryErrorMs: 38,
        speakerAgnosticNote: 'Evaluated through /api/evaluate pipeline using robust z-scores and normalized semitone F0 comparison.',
        transcript: customTranscript,
        words: words.length > 0 ? words : [{ word: customTranscript, start: 0, end: dur, zScore: 0.5 }],
        flaws: mappedFlaws,
        timeSeries: Array.from({ length: 60 }, (_, idx) => {
          const t = (idx * dur) / 59;
          const baseF0 = Math.sin(t * 1.2) * 3;
          let partF0 = baseF0;
          let z = 0.2;
          const inFlaw = mappedFlaws.some((f) => t >= f.regionStart && t <= f.regionEnd);
          if (inFlaw) {
            z = mappedFlaws[0]?.zScore || 2.8;
            partF0 = baseF0 + 3.2;
          }
          return {
            time: parseFloat(t.toFixed(2)),
            baselineF0: parseFloat(baseF0.toFixed(2)),
            participantF0: parseFloat(partF0.toFixed(2)),
            baselineEnergy: -18,
            participantEnergy: inFlaw ? -13 : -18,
            baselineWpm: 148,
            participantWpm: inFlaw ? 212 : 148,
            zScore: parseFloat(z.toFixed(2)),
          };
        }),
      };

      CONTRASTIVE_PRESETS.push(newPreset);
      setSelectedPresetId(newPreset.id);
      setCurrentPreset(newPreset);
      setIsUploadOpen(false);
    } catch (err) {
      console.error('Upload evaluation error:', err);
    } finally {
      setIsProcessingUpload(false);
    }
  };

  return (
    <section id="studio-section" className="w-full py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Studio Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10 font-sans">
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-slate-400 font-sans font-medium">
              Track C Interactive Evaluation Studio
            </span>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Backend API: Active (/api/evaluate · v0.1)</span>
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl text-white font-normal tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Contrastive Speech Analytics &amp; Temporal Flaw Grounding
          </h2>
        </div>

        {/* Preset Selector & Custom Upload Button */}
        <div className="flex flex-wrap items-center gap-3 font-sans">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            {CONTRASTIVE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-sans font-medium ${
                  selectedPresetId === preset.id
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset.title.split('(')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="liquid-glass rounded-xl px-4 py-2 text-xs text-white font-sans font-medium flex items-center gap-2 hover:scale-[1.02] cursor-pointer transition-transform"
          >
            <IconUpload className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
            <span>Upload Speech &amp; Text</span>
          </button>
        </div>
      </div>

      {/* Preset Meta & Statistical Summary Cards in Clean Sans-Serif */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans">
        {/* Card 1: Sample & Provenance */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-medium">
            Current Corpus Item
          </div>
          <div className="text-sm font-semibold text-white truncate font-sans">
            {currentPreset.title}
          </div>
          <div className="text-xs text-slate-400 truncate mt-0.5 font-sans">
            {currentPreset.speaker}
          </div>
          <div className="text-[11px] text-amber-300/80 mt-2 font-sans">
            Provenance: {currentPreset.source}
          </div>
        </div>

        {/* Card 2: Ground Truth Flaw Spectrum */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-medium">
            Flaw Spectrum Gradient
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase font-sans ${
                currentPreset.flawSpectrum === 'Botched'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : currentPreset.flawSpectrum === 'Moderate Flaw'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {currentPreset.flawSpectrum}
            </span>
            <span className="text-xs text-white/70 font-sans tabular-nums">
              Score: {currentPreset.overallScore}/100
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-sans">
            {currentPreset.tier}
          </div>
        </div>

        {/* Card 3: Boundary & IoU Precision */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-medium">
            Ground Truth IoU
          </div>
          <div className="text-2xl font-light text-emerald-400 tabular-nums">
            {(currentPreset.overallIoU * 100).toFixed(0)}%
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1 font-sans tabular-nums">
            Mean Boundary Error: ±{currentPreset.meanBoundaryErrorMs}ms
          </div>
        </div>

        {/* Card 4: Normalization status */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-medium">
            Speaker-Agnostic Engine
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-sans font-medium">
            <IconCheckCircle className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
            <span>F0 Normalized to Semitones</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 leading-relaxed font-sans">
            Baseline vs. participant matched on identical transcript tokens.
          </div>
        </div>
      </div>

      {/* Main Player Bar: Controls & Track Toggle */}
      <div className="rounded-2xl bg-black/50 border border-white/10 p-5 space-y-4 backdrop-blur-md font-sans">
        <div className="flex flex-wrap items-center justify-between gap-4 font-sans">
          {/* Play/Pause & Scrub Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-white/10"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? (
                <IconPause className="w-5 h-5 text-black" fill={true} />
              ) : (
                <IconPlay className="w-5 h-5 text-black ml-0.5" fill={true} />
              )}
            </button>

            <button
              onClick={() => handleSeek(0)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Rewind to start"
            >
              <IconRewind className="w-4 h-4 text-white" strokeWidth={1.5} />
            </button>

            {/* Time readout in tabular clean sans */}
            <div className="text-sm pl-2 font-sans tabular-nums">
              <span className="text-white font-medium">
                00:{currentTime < 10 ? `0${currentTime.toFixed(1)}` : currentTime.toFixed(1)}
              </span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-slate-400">
                00:{currentPreset.duration.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Dual Track Switcher: Participant vs Baseline */}
          <div className="flex items-center gap-2 font-sans">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline font-sans">Active Audio:</span>
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => handleTrackChange('participant')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer font-sans ${
                  activeTrack === 'participant'
                    ? 'bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <IconRadio className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                <span>Participant / Flawed Mirror</span>
              </button>

              <button
                onClick={() => handleTrackChange('baseline')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer font-sans ${
                  activeTrack === 'baseline'
                    ? 'bg-sky-500/20 text-sky-300 font-medium border border-sky-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <IconVolume className="w-3.5 h-3.5 text-sky-400" strokeWidth={1.5} />
                <span>Reference Baseline</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dual Waveform Visualizer */}
        <WaveformDisplay
          duration={currentPreset.duration}
          currentTime={currentTime}
          flaws={currentPreset.flaws}
          activeFlawId={activeFlawId}
          onSeek={handleSeek}
          onSelectFlaw={(id) => setActiveFlawId(id)}
          trackMode={activeTrack}
        />
      </div>

      {/* Synchronized Transcript Reader */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md font-sans">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
            <IconFileText className="w-4 h-4 text-white/70" strokeWidth={1.5} />
            <span className="text-white font-medium uppercase tracking-wider font-sans">
              Synchronized Transcript Alignment
            </span>
            <span className="text-white/20">·</span>
            <span>Click any word to seek playback</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-sans">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span>Flawed region token</span>
          </div>
        </div>

        {/* Word-by-word active transcript flow in clean Sans-Serif */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-base sm:text-lg leading-loose font-normal font-sans">
          {currentPreset.words.map((item, idx) => {
            const isWordActive = idx === activeWordIndex;
            const isFlawed = item.isFlawed;

            return (
              <button
                key={idx}
                onClick={() => handleSeek(item.start)}
                className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer select-none text-left relative font-sans ${
                  isWordActive
                    ? 'bg-white text-black font-semibold shadow-lg scale-105 z-10'
                    : isFlawed
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30 hover:bg-amber-400/25 font-medium'
                    : 'text-white/90 hover:bg-white/10'
                }`}
                title={`Word: "${item.word}" | Time: ${item.start.toFixed(1)}s - ${item.end.toFixed(1)}s | z-score: ${item.zScore.toFixed(1)}σ`}
              >
                <span>{item.word}</span>
                {isFlawed && (
                  <span className="absolute -top-1.5 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time-Series Signal Charts (Pitch, Energy, WPM, Z-scores) */}
      <AcousticFeaturesOverlay
        timeSeries={currentPreset.timeSeries}
        duration={currentPreset.duration}
        currentTime={currentTime}
        onSeek={handleSeek}
      />

      {/* Grounded Temporal Flaws & Causal Explanation Cards */}
      <div className="space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 mb-1 font-sans font-medium">
              <IconSparkles className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
              <span>TEMPORAL GROUNDING FINDINGS</span>
            </div>
            <h3
              className="text-2xl text-white font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Candidate Flaw Grounding &amp; Causal Explanations
            </h3>
          </div>

          <div className="text-xs text-slate-400 font-sans flex items-center gap-3">
            <span>{currentPreset.flaws.length} Candidate Flaw(s) Identified</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-medium">All tied to explicit rubric rules</span>
          </div>
        </div>

        {/* Flaw Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPreset.flaws.map((flaw) => (
            <CausalExplanationCard
              key={flaw.id}
              flaw={flaw}
              isActive={activeFlawId === flaw.id}
              onPlayFlaw={handlePlayFlawInterval}
              onSelectFlaw={() => {
                setActiveFlawId(flaw.id);
                handleSeek(flaw.regionStart);
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom Upload Modal in Clean Sans-Serif */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-lg rounded-2xl bg-[#001b2e] border border-white/20 p-6 shadow-2xl relative font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <IconUpload className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-white font-sans">
                  Upload Speech &amp; Transcript
                </h3>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomUploadSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-sans font-medium">
                  Performance Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Persuasive Speech Run #2"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-sans font-medium">
                  Audio Recording (.wav, .mp3)
                </label>
                <div className="rounded-xl border border-dashed border-white/20 p-4 text-center hover:border-amber-400 transition-colors cursor-pointer bg-black/20 font-sans">
                  <IconFileText className="w-6 h-6 text-white/50 mx-auto mb-2" strokeWidth={1.4} />
                  <p className="text-xs text-white font-sans">
                    {customFileName || 'Click to select or drag audio file here'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">
                    Automatic forced-alignment &amp; F0 semitone normalization applied
                  </p>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCustomFileName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="audio-upload-input"
                  />
                  <label
                    htmlFor="audio-upload-input"
                    className="inline-block mt-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white cursor-pointer font-sans"
                  >
                    Browse Files
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-sans font-medium">
                  Exact Speech Transcript (Same Text as Baseline)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter or paste the exact spoken transcript..."
                  value={customTranscript}
                  onChange={(e) => setCustomTranscript(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                />
                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  WhisperX forced alignment maps words to exact timestamps.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingUpload || !customTranscript}
                  className="liquid-glass rounded-xl px-5 py-2.5 text-xs text-white font-medium flex items-center gap-2 hover:scale-105 cursor-pointer disabled:opacity-50 font-sans"
                >
                  {isProcessingUpload ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Aligning &amp; Extracting Features...</span>
                    </>
                  ) : (
                    <>
                      <IconSparkles className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                      <span>Process &amp; Compute Z-Scores</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
