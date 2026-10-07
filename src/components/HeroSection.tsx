import React from 'react';
import { AcousticHeroBackground } from './AcousticHeroBackground';
import {
  IconArrowDown,
  IconArrowRight,
  IconActivity,
  IconBinary,
  IconShield,
  IconSliders,
} from './MinimalIcons';

interface HeroSectionProps {
  onBeginJourney: () => void;
  onExplorePipeline?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBeginJourney,
  onExplorePipeline,
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 pb-24 md:py-[84px] overflow-hidden font-sans">
      {/* Dynamic Acoustic Signal & Spectrogram Canvas Background */}
      <AcousticHeroBackground />

      {/* Hero Content: Centered, Focused on Track C Hackathon Project */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto px-4 font-sans pointer-events-none">
        
        {/* Hackathon Track C Badge */}
        <div className="animate-fade-rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-xs sm:text-sm text-slate-300 font-sans pointer-events-auto shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white font-medium">Multimodal AI Hackathon 2026</span>
          <span className="text-white/25">|</span>
          <span className="text-slate-300">Track C: Contrastive Speech Analytics</span>
        </div>

        {/* Project Authoritative H1 */}
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.96] tracking-[-2.46px] max-w-7xl font-normal text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Replacing Subjectivity with{' '}
          <em
            className="not-italic text-[#9ca3af]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Mathematics.
          </em>
        </h1>

        {/* Technical Subtext directly grounded in Track C challenge */}
        <p className="animate-fade-rise-delay text-slate-300 text-base sm:text-lg max-w-3xl mt-7 leading-relaxed font-sans font-normal">
          Judging interpretive, persuasive, and extemporaneous speech is subjective and inconsistent.
          Arachne treats speech as a continuous time-series signal, pinning down exact delivery flaws
          using forced alignment, speaker-agnostic normalization, and robust z-scores against reference baselines.
        </p>

        {/* Core Principles matching Slide 2 */}
        <div className="animate-fade-rise-delay mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white/90 font-sans pointer-events-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-200">
            <IconBinary className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
            <span>Robust z-scores, not LLMs</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-200">
            <IconActivity className="w-3.5 h-3.5 text-sky-400" strokeWidth={1.5} />
            <span>Same text · Different delivery · Measurable gap</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-200">
            <IconShield className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
            <span>Deterministic Temporal Flaw Grounding</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="animate-fade-rise-delay-2 mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <button
            onClick={onBeginJourney}
            className="liquid-glass rounded-full px-10 py-4 text-base text-white hover:scale-[1.03] transition-all duration-200 cursor-pointer shadow-2xl flex items-center gap-2.5 group font-sans font-medium"
          >
            <span>Launch Evaluation Studio</span>
            <IconArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </button>

          {onExplorePipeline && (
            <button
              onClick={onExplorePipeline}
              className="rounded-full px-7 py-4 text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center gap-2 font-sans font-medium"
            >
              <IconSliders className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
              <span>Inspect 4-Stage Pipeline</span>
            </button>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-rise-delay-2 mt-12 flex flex-col items-center text-xs text-slate-400 font-sans pointer-events-auto">
          <span className="mb-2 tracking-widest uppercase text-[10px] text-slate-400 font-medium">
            Explore Audio Comparison &amp; Temporal Grounding
          </span>
          <IconArrowDown className="w-4 h-4 animate-bounce text-slate-500" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
};
