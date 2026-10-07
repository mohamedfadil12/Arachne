import React, { useState } from 'react';
import { AcousticTimeSeriesPoint } from '../types/speech';
import { IconActivity, IconVolume, IconGauge, IconZap } from './MinimalIcons';

interface AcousticFeaturesOverlayProps {
  timeSeries: AcousticTimeSeriesPoint[];
  duration: number;
  currentTime: number;
  onSeek: (seconds: number) => void;
}

type MetricView = 'all' | 'f0' | 'energy' | 'wpm' | 'zscore';

export const AcousticFeaturesOverlay: React.FC<AcousticFeaturesOverlayProps> = ({
  timeSeries,
  duration,
  currentTime,
  onSeek,
}) => {
  const [metricView, setMetricView] = useState<MetricView>('all');

  const playheadPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // SVG coordinate calculations
  const width = 800;
  const height = 180;
  const paddingY = 20;

  // Build SVG path strings
  const getF0Y = (semitones: number) => {
    const clamped = Math.max(-8, Math.min(8, semitones));
    const normalized = (clamped + 8) / 16;
    return height - paddingY - normalized * (height - paddingY * 2);
  };

  const getEnergyY = (db: number) => {
    const clamped = Math.max(-30, Math.min(-5, db));
    const normalized = (clamped + 30) / 25;
    return height - paddingY - normalized * (height - paddingY * 2);
  };

  const getWpmY = (wpm: number) => {
    const clamped = Math.max(80, Math.min(240, wpm));
    const normalized = (clamped - 80) / 160;
    return height - paddingY - normalized * (height - paddingY * 2);
  };

  const getZscoreY = (z: number) => {
    const clamped = Math.max(-4, Math.min(4, z));
    const normalized = (clamped + 4) / 8;
    return height - paddingY - normalized * (height - paddingY * 2);
  };

  const buildPath = (getY: (p: AcousticTimeSeriesPoint) => number) => {
    if (timeSeries.length === 0) return '';
    return timeSeries
      .map((pt, i) => {
        const x = (pt.time / duration) * width;
        const y = getY(pt);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const baselineF0Path = buildPath(p => getF0Y(p.baselineF0));
  const participantF0Path = buildPath(p => getF0Y(p.participantF0));

  const baselineEnergyPath = buildPath(p => getEnergyY(p.baselineEnergy));
  const participantEnergyPath = buildPath(p => getEnergyY(p.participantEnergy));

  const baselineWpmPath = buildPath(p => getWpmY(p.baselineWpm));
  const participantWpmPath = buildPath(p => getWpmY(p.participantWpm));

  const zScorePath = buildPath(p => getZscoreY(p.zScore));

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div className="w-full bg-black/40 rounded-xl border border-white/10 p-4 backdrop-blur-md font-sans">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10 font-sans">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white uppercase tracking-wider font-sans">
            Time-Series Signal Analytics
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-sans font-medium">
            100% Speaker-Agnostic
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-sans">
          <button
            onClick={() => setMetricView('all')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              metricView === 'all' ? 'bg-white/20 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => setMetricView('f0')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              metricView === 'f0' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <IconActivity className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
            <span>Pitch (F0)</span>
          </button>
          <button
            onClick={() => setMetricView('energy')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              metricView === 'energy' ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <IconVolume className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
            <span>Energy (dB)</span>
          </button>
          <button
            onClick={() => setMetricView('wpm')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              metricView === 'wpm' ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <IconGauge className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
            <span>Pacing (WPM)</span>
          </button>
          <button
            onClick={() => setMetricView('zscore')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              metricView === 'zscore' ? 'bg-rose-500/20 text-rose-300 font-medium' : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            <IconZap className="w-3.5 h-3.5 text-rose-400" strokeWidth={1.5} />
            <span>Robust Z-Scores</span>
          </button>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden cursor-crosshair font-sans">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          onClick={handleSvgClick}
          className="w-full h-36 sm:h-44"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <line x1="0" y1={paddingY} x2={width} y2={paddingY} stroke="rgba(255,255,255,0.05)" />
          <line x1="0" y1={height - paddingY} x2={width} y2={height - paddingY} stroke="rgba(255,255,255,0.05)" />

          {/* Anomaly threshold zone (|z| > 2.0) */}
          {(metricView === 'all' || metricView === 'zscore') && (
            <>
              <line
                x1="0"
                y1={getZscoreY(2.0)}
                x2={width}
                y2={getZscoreY(2.0)}
                stroke="#f43f5e"
                strokeDasharray="3 3"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <text x="8" y={getZscoreY(2.0) - 4} fill="#f43f5e" fontSize="10" fontFamily="sans-serif" fontWeight="500">
                +2.0σ Anomaly Threshold
              </text>
            </>
          )}

          {/* Curves: Pitch F0 */}
          {(metricView === 'all' || metricView === 'f0') && (
            <>
              {/* Baseline F0: dashed sky */}
              <path
                d={baselineF0Path}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeDasharray="4 2"
                opacity="0.75"
              />
              {/* Participant F0: solid cyan */}
              <path
                d={participantF0Path}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.2"
              />
            </>
          )}

          {/* Curves: dB Energy */}
          {(metricView === 'all' || metricView === 'energy') && (
            <>
              <path
                d={baselineEnergyPath}
                fill="none"
                stroke="#34d399"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <path
                d={participantEnergyPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.0"
              />
            </>
          )}

          {/* Curves: Speech Rate WPM */}
          {(metricView === 'all' || metricView === 'wpm') && (
            <>
              <path
                d={baselineWpmPath}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.7"
              />
              <path
                d={participantWpmPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.2"
              />
            </>
          )}

          {/* Curves: Z-Score */}
          {(metricView === 'all' || metricView === 'zscore') && (
            <path
              d={zScorePath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.2"
            />
          )}

          {/* Playhead Vertical Line */}
          <line
            x1={(playheadPercent / 100) * width}
            y1="0"
            x2={(playheadPercent / 100) * width}
            y2={height}
            stroke="#f43f5e"
            strokeWidth="1.5"
          />
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 px-1 text-[11px] text-slate-400 font-sans">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block rounded-full"></span>
              <span className="text-white/80">Participant F0 (st)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b border-sky-400 border-dashed inline-block"></span>
              <span>Baseline F0 (st)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-400 inline-block rounded-full"></span>
              <span className="text-white/80">Speech Rate (WPM)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-rose-500 inline-block rounded-full"></span>
              <span className="text-white/80">Robust Z-Score</span>
            </div>
          </div>

          <div className="tabular-nums text-[11px] text-slate-400 font-sans">
            Current scrub: {currentTime.toFixed(2)}s / {duration.toFixed(1)}s
          </div>
        </div>
      </div>
    </div>
  );
};
