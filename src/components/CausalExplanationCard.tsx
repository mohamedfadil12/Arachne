import React from 'react';
import { FlawGrounding } from '../types/speech';
import {
  IconPlay,
  IconCheckCircle,
  IconAlert,
  IconArrowRight,
} from './MinimalIcons';

interface CausalExplanationCardProps {
  flaw: FlawGrounding;
  isActive?: boolean;
  onPlayFlaw: (start: number, end: number) => void;
  onSelectFlaw?: () => void;
}

export const CausalExplanationCard: React.FC<CausalExplanationCardProps> = ({
  flaw,
  isActive = false,
  onPlayFlaw,
  onSelectFlaw,
}) => {
  return (
    <div
      onClick={onSelectFlaw}
      className={`rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden border font-sans ${
        isActive
          ? 'bg-white/[0.07] border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50'
          : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
      }`}
    >
      {/* Top Header with mini waveform visual matching Slide 5 */}
      <div className="px-5 pt-4 pb-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-medium">Causal explanation card</span>
            <span className="text-white/20">·</span>
            <span className="text-amber-300 font-semibold">{flaw.flawType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans font-semibold ${
              flaw.severity === 'Critical'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : flaw.severity === 'Moderate'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {flaw.severity}
          </span>
        </div>
      </div>

      {/* Mini Visual Waveform Bar matching Slide 5 screenshot */}
      <div className="px-5 py-3 bg-black/20 flex items-center justify-between text-xs text-slate-400 font-sans">
        <span className="tabular-nums">0:00</span>
        {/* Visualized soundwave representation */}
        <div className="flex items-center gap-[3px] px-3 py-1 rounded bg-black/30">
          <span className="w-[3px] h-2 bg-white/20 rounded-full" />
          <span className="w-[3px] h-3 bg-white/30 rounded-full" />
          <span className="w-[3px] h-5 bg-amber-400 rounded-full animate-pulse" />
          <span className="w-[3px] h-7 bg-amber-400 rounded-full animate-pulse" />
          <span className="w-[3px] h-6 bg-amber-400 rounded-full animate-pulse" />
          <span className="w-[3px] h-4 bg-amber-400 rounded-full animate-pulse" />
          <span className="w-[3px] h-2 bg-white/20 rounded-full" />
        </div>
        <span className="text-amber-300 font-semibold tabular-nums">{flaw.timeFormatted}</span>
      </div>

      {/* Structured Card Grid matching Slide 5 table in clean Sans-Serif */}
      <div className="p-5 space-y-3.5 text-sm font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 border-b border-white/5">
          <span className="text-slate-400">Flaw region</span>
          <span className="sm:col-span-2 font-medium text-white tabular-nums">
            {flaw.timeFormatted}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 border-b border-white/5">
          <span className="text-slate-400">{flaw.metricLabel}</span>
          <span className="sm:col-span-2 font-semibold text-white tabular-nums">
            {flaw.metricParticipant}{' '}
            <span className="text-slate-400 font-normal">vs</span>{' '}
            {flaw.metricBaseline}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 border-b border-white/5">
          <span className="text-slate-400">Deviation</span>
          <span className="sm:col-span-2 font-bold text-amber-400 tabular-nums">
            {flaw.deviationFormatted}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 border-b border-white/5">
          <span className="text-slate-400">Explanation</span>
          <span className="sm:col-span-2 font-medium text-white/95 leading-relaxed">
            {flaw.explanation}
          </span>
        </div>

        {/* Causal Rule & Target Words */}
        <div className="pt-1 text-xs space-y-2">
          <div className="text-slate-400 flex items-start gap-1.5">
            <IconAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <span className="text-white/80 font-medium mr-1.5">Grounding Rule:</span>
              <span className="text-slate-300">{flaw.causalRule}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-slate-400 text-[11px] font-sans mr-1">Target tokens:</span>
            {flaw.targetWords.map((word, wIdx) => (
              <span
                key={wIdx}
                className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-200 text-[11px] font-medium"
              >
                &ldquo;{word}&rdquo;
              </span>
            ))}
          </div>

          {/* Validation Metrics (IoU & Boundary Error) */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-emerald-300/90 bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-500/20 font-sans tabular-nums">
            <span className="flex items-center gap-1.5 font-medium">
              <IconCheckCircle className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
              <span>Ground Truth IoU: {(flaw.iouScore * 100).toFixed(0)}%</span>
            </span>
            <span className="text-emerald-500/40">|</span>
            <span>Boundary Error: ±{flaw.boundaryErrorMs}ms</span>
            <span className="text-emerald-500/40">|</span>
            <span>z-score: {flaw.zScore > 0 ? `+${flaw.zScore}` : flaw.zScore}σ</span>
          </div>
        </div>

        {/* Action Button: Play Region */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayFlaw(flaw.regionStart, flaw.regionEnd);
            }}
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white font-medium flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer transition-transform font-sans"
          >
            <IconPlay className="w-3 h-3 text-amber-400" fill={true} />
            <span className="tabular-nums">Play Flaw Interval ({flaw.timeFormatted})</span>
          </button>

          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-sans">
            <span>Inspect details</span>
            <IconArrowRight className="w-3 h-3 text-slate-400" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </div>
  );
};
