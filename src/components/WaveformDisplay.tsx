import React, { useRef } from 'react';
import { FlawGrounding } from '../types/speech';

interface WaveformDisplayProps {
  duration: number;
  currentTime: number;
  flaws: FlawGrounding[];
  activeFlawId?: string;
  onSeek: (seconds: number) => void;
  onSelectFlaw?: (flawId: string) => void;
  trackMode: 'baseline' | 'participant' | 'comparison';
}

export const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  duration,
  currentTime,
  flaws,
  activeFlawId,
  onSeek,
  onSelectFlaw,
  trackMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate deterministic pseudo-waveform bars
  const totalBars = 84;
  const bars = React.useMemo(() => {
    return Array.from({ length: totalBars }, (_, i) => {
      const progress = i / totalBars;
      const t = progress * duration;
      // baseline envelope
      const baseHeight = 0.25 + 0.5 * Math.abs(Math.sin(t * 1.8) * Math.cos(t * 0.9));
      // participant variation
      let partHeight = baseHeight;
      const inFlaw = flaws.some(f => t >= f.regionStart && t <= f.regionEnd);
      if (inFlaw) {
        partHeight = Math.min(1.0, baseHeight * 1.55);
      }
      return {
        time: t,
        baseHeight: Math.max(0.12, baseHeight),
        partHeight: Math.max(0.12, partHeight),
        inFlaw,
      };
    });
  }, [duration, flaws]);

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = ratio * duration;
    onSeek(seekTime);
  };

  const playheadPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="w-full select-none font-sans">
      {/* Top track indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
        <div className="flex items-center gap-3">
          <span className="text-white/90 font-medium">
            {trackMode === 'baseline'
              ? 'Baseline Reference Audio (Miller Center Archive)'
              : trackMode === 'participant'
              ? 'Participant Upload / Flawed Mirror'
              : 'Dual Comparative Alignment Track'}
          </span>
          <span className="text-[11px] text-slate-500">· Click anywhere to scrub</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-300 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
            Flaw Region
          </span>
          <span className="text-slate-600">·</span>
          <span className="tabular-nums text-slate-400">{duration.toFixed(1)}s total</span>
        </div>
      </div>

      {/* Main Waveform Canvas Box */}
      <div
        ref={containerRef}
        onClick={handleWaveformClick}
        className="relative h-24 sm:h-28 w-full bg-black/40 rounded-xl border border-white/10 overflow-hidden cursor-crosshair backdrop-blur-md group"
      >
        {/* Subtle grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 divide-x divide-white/[0.04] pointer-events-none" />

        {/* Flaw Interval Highlights */}
        {flaws.map((flaw) => {
          const leftPercent = (flaw.regionStart / duration) * 100;
          const widthPercent = ((flaw.regionEnd - flaw.regionStart) / duration) * 100;
          const isActive = activeFlawId === flaw.id;

          return (
            <div
              key={flaw.id}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectFlaw) onSelectFlaw(flaw.id);
                onSeek(flaw.regionStart);
              }}
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
              }}
              className={`absolute top-0 bottom-0 z-10 transition-all duration-150 cursor-pointer flex flex-col justify-between py-1.5 px-2 ${
                isActive
                  ? 'bg-amber-500/25 border-x-2 border-amber-400'
                  : 'bg-amber-500/15 border-x border-amber-500/50 hover:bg-amber-500/20'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-amber-200 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm self-start font-sans font-medium">
                <span>{flaw.flawType}</span>
                <span className="ml-1 text-amber-300/80 tabular-nums">({flaw.timeFormatted})</span>
              </div>
              <div className="text-[10px] text-amber-300 font-sans tabular-nums font-semibold self-end bg-black/60 px-1 py-0.5 rounded">
                z = +{flaw.zScore.toFixed(1)}σ
              </div>
            </div>
          );
        })}

        {/* Waveform Amplitude Bars */}
        <div className="absolute inset-0 flex items-center justify-between px-2 gap-[2px] z-0">
          {bars.map((bar, idx) => {
            const isPassed = (bar.time / duration) * 100 <= playheadPercent;
            const barHeight =
              trackMode === 'baseline'
                ? bar.baseHeight
                : trackMode === 'participant'
                ? bar.partHeight
                : Math.max(bar.baseHeight, bar.partHeight);

            const heightPct = Math.round(barHeight * 80);

            let barColor = 'bg-white/20';
            if (bar.inFlaw) {
              barColor = isPassed ? 'bg-amber-400' : 'bg-amber-500/60';
            } else if (isPassed) {
              barColor = 'bg-sky-400';
            }

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-center h-full"
              >
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full min-w-[2px] rounded-full transition-all duration-75 ${barColor}`}
                />
              </div>
            );
          })}
        </div>

        {/* Playhead Scrubber Line */}
        <div
          style={{ left: `${playheadPercent}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.8)] z-20 pointer-events-none transition-[left] duration-75"
        >
          <div className="w-2.5 h-2.5 bg-rose-400 -ml-[4px] -mt-1 rounded-full shadow" />
        </div>
      </div>

      {/* Timecode markers below in clean tabular sans-serif */}
      <div className="flex justify-between items-center text-[11px] tabular-nums text-slate-400 mt-1.5 px-1 font-sans">
        <span>00:00.0</span>
        <span>00:{(duration * 0.25).toFixed(1)}</span>
        <span>00:{(duration * 0.5).toFixed(1)}</span>
        <span>00:{(duration * 0.75).toFixed(1)}</span>
        <span>00:{duration.toFixed(1)}</span>
      </div>
    </div>
  );
};
