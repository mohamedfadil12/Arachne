import React from 'react';
import {
  IconUsers,
  IconAward,
} from './MinimalIcons';

export const RubricSpecs: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-14 font-sans">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans font-medium text-amber-300 mb-4">
          <IconAward className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
          <span>MULTIMODAL AI HACKATHON 2026 · TRACK C</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-normal text-white tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Roles &amp; Evaluation Rubric
        </h2>
        <p className="text-slate-300 text-base mt-4 font-sans leading-relaxed">
          Quality over quantity: A clean spectrum beats a noisy corpus. Here is how each role connects
          to build an end-to-end, scientifically defensible evaluation system.
        </p>
      </div>

      {/* Rubric Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 font-sans">
        {/* Dataset Lead */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-sans font-medium">
                Dataset Lead
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-sans font-semibold">
                Largest weight
              </span>
            </div>
            <div className="text-5xl font-light text-white my-3 tabular-nums font-sans">
              30<span className="text-2xl text-white/50">%</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-sans">of the evaluation rubric</p>

            <div className="space-y-2 text-xs text-white/80 border-t border-white/5 pt-4 font-sans">
              <p>• Source 5-6 public domain speeches, strictly avoiding CC BY-NC-ND traps.</p>
              <p>• Engineer the &ldquo;good&rdquo; baseline and &ldquo;bad&rdquo; spectrum gradient.</p>
              <p>• Create exact programmatic flaws (Tier 1) and label human re-recordings (Tier 2) with millisecond accuracy.</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 italic font-sans">
            &ldquo;Sets ground truth for the mathematical models.&rdquo;
          </div>
        </div>

        {/* Grounding & Scoring Lead */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-rose-400 font-sans font-medium">
                Grounding &amp; Scoring
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-400/20 text-rose-300 border border-rose-400/30 font-sans font-semibold">
                Core Math
              </span>
            </div>
            <div className="text-5xl font-light text-white my-3 tabular-nums font-sans">
              25<span className="text-2xl text-white/50">%</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-sans">of the evaluation rubric</p>

            <div className="space-y-2 text-xs text-white/80 border-t border-white/5 pt-4 font-sans">
              <p>• Z-score deviation model: participant vs. baseline features.</p>
              <p>• Template-based causal explanations (e.g. &ldquo;212 vs 148 wpm&rdquo;).</p>
              <p>• Validate with temporal IoU and boundary error against ground truth.</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 italic font-sans">
            &ldquo;The math becomes human-readable insight.&rdquo;
          </div>
        </div>

        {/* Signal Processing Lead */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-sky-400 font-sans font-medium">
                Signal Processing
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 border border-sky-400/30 font-sans font-semibold">
                Acoustic DSP
              </span>
            </div>
            <div className="text-5xl font-light text-white my-3 tabular-nums font-sans">
              20<span className="text-2xl text-white/50">%</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-sans">of the evaluation rubric</p>

            <div className="space-y-2 text-xs text-white/80 border-t border-white/5 pt-4 font-sans">
              <p>• Forced alignment maps text to exact audio timestamps.</p>
              <p>• Extract F0 / pitch contours, MFCCs, and speech rate.</p>
              <p>• Normalize pitch into semitones and dB energy so logic stays 100% speaker-agnostic.</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 italic font-sans">
            &ldquo;Turns raw audio into comparable time-series signals.&rdquo;
          </div>
        </div>

        {/* Dashboard & Delivery Lead */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-sans font-medium">
                Dashboard &amp; Delivery
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-sans font-semibold">
                UI &amp; Submission
              </span>
            </div>
            <div className="text-5xl font-light text-white my-3 tabular-nums font-sans">
              15<span className="text-2xl text-white/50">%</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-sans">of the evaluation rubric</p>

            <div className="space-y-2 text-xs text-white/80 border-t border-white/5 pt-4 font-sans">
              <p>• Interactive UI for audio uploads and time-series overlays.</p>
              <p>• Author mandatory 6-page technical documentation and GitHub README.</p>
              <p>• Produce the 3-10 minute YouTube demo (with subtitles) and manage Devpost submission.</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 italic font-sans">
            &ldquo;Delivers the integrated user flow and verified judge artifact.&rdquo;
          </div>
        </div>
      </div>

      {/* Presenters & Team: Kelambakkam Atti */}
      <div className="max-w-2xl mx-auto font-sans">
        <div className="rounded-2xl bg-black/50 border border-white/10 p-6 font-sans">
          <div className="flex items-center justify-between mb-3 font-sans">
            <div className="flex items-center gap-2 text-white font-medium">
              <IconUsers className="w-4 h-4 text-sky-400" strokeWidth={1.5} />
              <span>Team &amp; Presenters</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 font-sans font-medium">
              Kelambakkam Atti
            </span>
          </div>

          <div className="text-xs text-slate-400 mb-3 font-sans">
            Team: <strong className="text-white font-medium">Kelambakkam Atti</strong> · Track C Presenters
          </div>

          <div className="space-y-2 text-sm text-white/90 font-sans">
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="font-medium text-white">Fadil</span>
              </div>
              <span className="text-xs text-amber-400 font-sans font-medium">Team Lead &amp; Signal DSP</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>Ammar</span>
              </div>
              <span className="text-xs text-rose-400 font-sans font-medium">Grounding &amp; Scoring</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Abdul</span>
              </div>
              <span className="text-xs text-sky-400 font-sans font-medium">Dataset &amp; Annotation</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Rihan</span>
              </div>
              <span className="text-xs text-emerald-400 font-sans font-medium">Dashboard &amp; Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
