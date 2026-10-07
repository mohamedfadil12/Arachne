import React from 'react';
import {
  IconDatabase,
  IconWaveform,
  IconTarget,
  IconDashboard,
  IconCheck,
  IconCpu,
  IconGitCompare,
} from './MinimalIcons';

export const PipelineViewer: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 font-sans">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans font-medium text-amber-300 mb-4">
          <span>SYSTEM ARCHITECTURE</span>
          <span className="text-white/20">·</span>
          <span>REPRODUCIBLE MULTIMODAL PIPELINE</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-normal text-white tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Our 4-Stage Evaluation Pipeline
        </h2>
        <p className="text-slate-300 text-base mt-4 font-sans leading-relaxed">
          Replacing subjective speech scoring with deterministic mathematics. Every error is grounded
          in continuous acoustic deltas and matched-text time-series alignment.
        </p>
      </div>

      {/* 4 Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        
        {/* Stage 1 */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all group font-sans">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 font-sans font-medium">
                Stage 1
              </span>
              <IconDatabase className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" strokeWidth={1.5} />
            </div>

            <h3
              className="text-2xl text-white font-normal mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Custom Dataset
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              Public domain baselines (e.g. Miller Center Presidential Speech Archive) mirrored with
              mathematically injected flaws (Tier 1) and human re-recordings (Tier 2).
            </p>

            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Zero licensing ambiguity (avoids CC BY-NC-ND traps)</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Controlled spectrum from near-perfect to botched</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Millisecond ground-truth temporal labels</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 font-sans">
            Dataset weight: <span className="text-white font-semibold tabular-nums">30% of rubric</span>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all group relative overflow-hidden font-sans">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-md border border-sky-400/20 font-sans font-medium">
                Stage 2
              </span>
              <IconWaveform className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" strokeWidth={1.5} />
            </div>

            <h3
              className="text-2xl text-white font-normal mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Extraction &amp; Alignment
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              WhisperX forced alignment with edit-distance fallback. Normalized F0, MFCCs, dB energy,
              and pause durations.
            </p>

            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 mb-4 font-sans">
              <div className="text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5 font-sans">
                <IconCpu className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                <span>100% Speaker-Agnostic</span>
              </div>
              <p className="text-[11px] text-amber-200/80 leading-snug font-sans">
                Pitch normalized into relative semitones (0 st = median F0). Loudness normalized into RMS dB envelopes.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Sub-word phonetic boundary anchoring</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Rolling WPM speech rate calculus</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 font-sans">
            Signal Proc. weight: <span className="text-white font-semibold tabular-nums">20% of rubric</span>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all group font-sans">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded-md border border-rose-400/20 font-sans font-medium">
                Stage 3
              </span>
              <IconTarget className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" strokeWidth={1.5} />
            </div>

            <h3
              className="text-2xl text-white font-normal mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Temporal Grounding
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              Per-word features are compared against the baseline using robust z-scores to isolate exact
              flaw boundaries.
            </p>

            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Robust Z-Score thresholding (|z| &gt; 2.0σ)</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>IoU temporal overlap validation with ground truth</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Boundary error measurement (&lt; 50ms target)</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 font-sans">
            Grounding weight: <span className="text-white font-semibold tabular-nums">25% of rubric</span>
          </div>
        </div>

        {/* Stage 4 */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all group font-sans">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20 font-sans font-medium">
                Stage 4
              </span>
              <IconDashboard className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
            </div>

            <h3
              className="text-2xl text-white font-normal mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Interactive Dashboard
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              A Streamlit + Plotly visual translation to React that visualizes the time-series comparison
              and generates a causal explanation card for each error.
            </p>

            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Synced dual-track waveform &amp; audio scrubbing</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Causal explanation cards with evidence deltas</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" strokeWidth={2} />
                <span>Actionable rhetoric coaching feedback</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 font-sans">
            Delivery weight: <span className="text-white font-semibold tabular-nums">15% of rubric</span>
          </div>
        </div>
      </div>

      {/* Banner matching Slide 3 footer in clean Sans-Serif */}
      <div className="mt-10 rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-medium text-sm sm:text-base font-sans">
            What the rubric rewards:
          </span>
          <span className="text-slate-300 text-sm font-sans">
            Data quality. Speaker-agnostic features. Precise boundaries.
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 font-medium">
          <IconGitCompare className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
          <span>Same text. Different delivery. Measurable gap.</span>
        </div>
      </div>
    </section>
  );
};
