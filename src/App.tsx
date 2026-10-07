/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpeechStudio } from './components/SpeechStudio';
import { PipelineViewer } from './components/PipelineViewer';
import { RubricSpecs } from './components/RubricSpecs';
import {
  IconShield,
  IconActivity,
  IconCpu,
  IconArrowUp,
} from './components/MinimalIcons';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'studio' | 'pipeline' | 'grounding' | 'rubric'>('home');

  const scrollToStudio = () => {
    setActiveSection('studio');
    const elem = document.getElementById('studio-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section as 'home' | 'studio' | 'pipeline' | 'grounding' | 'rubric');

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'studio') {
      const elem = document.getElementById('studio-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (section === 'pipeline') {
      const elem = document.getElementById('pipeline-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (section === 'grounding') {
      const elem = document.getElementById('grounding-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (section === 'rubric') {
      const elem = document.getElementById('rubric-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#001726] text-white flex flex-col selection:bg-white/20 selection:text-white font-sans">
      {/* Glassmorphic Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Section with Dynamic Acoustic Signal Background */}
      <HeroSection
        onBeginJourney={scrollToStudio}
        onExplorePipeline={() => handleNavigate('pipeline')}
      />

      {/* Interactive Speech Studio & Evaluation Section */}
      <main className="relative z-10 w-full flex-1 font-sans">
        {/* Studio Section */}
        <div id="studio-section">
          <SpeechStudio />
        </div>

        {/* 4-Stage Pipeline Section */}
        <div id="pipeline-section" className="border-t border-white/10 bg-black/30">
          <PipelineViewer />
        </div>

        {/* Temporal Grounding Deep Dive Section in clean Sans-Serif */}
        <div id="grounding-section" className="border-t border-white/10 bg-black/50 py-16 px-6 font-sans">
          <div className="max-w-7xl mx-auto font-sans">
            <div className="text-center max-w-3xl mx-auto mb-10 font-sans">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans font-medium text-emerald-400 mb-3">
                <IconShield className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                <span>GROUNDING METHODOLOGY</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl text-white font-normal tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Replacing Subjectivity with Mathematics
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-sans font-normal">
                Traditional speech evaluation relies on subjective human judge impressions or black-box LLM hallucinations.
                Arachne grounds all feedback in deterministic acoustic features, matched text forced-alignment,
                and robust z-scores relative to high-quality baselines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 font-sans">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                  <IconActivity className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-medium text-white mb-2 font-sans">Matched-Text Baseline</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                  Both baseline and participant speak the exact same transcript tokens. Acoustic differences
                  reflect pure delivery mechanics rather than lexical variance.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 font-sans">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <IconCpu className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-medium text-white mb-2 font-sans">Speaker-Agnostic Normalization</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                  Pitch is converted into relative semitones centered on speaker median F0. Absolute register
                  (bass vs soprano) is eliminated so only pitch variation and contours matter.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 font-sans">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                  <IconShield className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-medium text-white mb-2 font-sans">Robust Z-Scores &amp; IoU</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                  Deviations are flagged only when local features exceed statistical thresholds (|z| &gt; 2.0σ),
                  evaluated against reviewed ground truth boundaries with strict IoU scoring.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rubric & Team Specifications */}
        <div id="rubric-section" className="border-t border-white/10 bg-black/40">
          <RubricSpecs />
        </div>
      </main>

      {/* Footer in Clean Sans-Serif */}
      <footer className="border-t border-white/10 bg-black/70 py-12 px-6 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
          <div className="flex flex-col items-center md:items-start font-sans">
            <span
              className="text-2xl font-normal text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Arachne<sup className="text-xs text-white/70">®</sup>
            </span>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Contrastive Speech Analytics &amp; Temporal Flaw Grounding · Multimodal AI Hackathon 2026 Track C
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-sans">
            <button
              onClick={() => handleNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer font-sans"
            >
              Top
            </button>
            <button
              onClick={() => handleNavigate('studio')}
              className="hover:text-white transition-colors cursor-pointer font-sans"
            >
              Interactive Studio
            </button>
            <button
              onClick={() => handleNavigate('pipeline')}
              className="hover:text-white transition-colors cursor-pointer font-sans"
            >
              Pipeline
            </button>
            <button
              onClick={() => handleNavigate('rubric')}
              className="hover:text-white transition-colors cursor-pointer font-sans"
            >
              Rubric &amp; Team
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <IconArrowUp className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
