import React from 'react';
import {
  IconSparkles,
  IconLayers,
  IconSliders,
  IconAward,
  IconMic,
} from './MinimalIcons';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="relative z-20 w-full px-6 md:px-8 py-5 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo: Arachne® */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-baseline text-left group transition-transform duration-200 cursor-pointer"
          >
            <span
              className="text-3xl tracking-tight text-white font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Arachne
              <sup className="text-xs ml-0.5 text-white/80">®</sup>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/10 text-xs text-slate-300 font-sans">
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-medium">
              Track C
            </span>
            <span className="text-slate-400">Multimodal AI 2026</span>
          </div>
        </div>

        {/* Navigation links (hidden on mobile, md:flex) */}
        <nav className="hidden md:flex items-center space-x-8 font-sans">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm tracking-wide transition-colors duration-150 cursor-pointer ${
              activeSection === 'home'
                ? 'text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('studio')}
            className={`text-sm tracking-wide flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
              activeSection === 'studio'
                ? 'text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IconMic className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" strokeWidth={1.5} />
            Studio
          </button>
          <button
            onClick={() => onNavigate('pipeline')}
            className={`text-sm tracking-wide flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
              activeSection === 'pipeline'
                ? 'text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IconLayers className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
            Pipeline
          </button>
          <button
            onClick={() => onNavigate('grounding')}
            className={`text-sm tracking-wide flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
              activeSection === 'grounding'
                ? 'text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IconSliders className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
            Grounding
          </button>
          <button
            onClick={() => onNavigate('rubric')}
            className={`text-sm tracking-wide flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
              activeSection === 'rubric'
                ? 'text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IconAward className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
            Rubric &amp; Team
          </button>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('studio')}
            className="liquid-glass rounded-full px-5 py-2 text-sm text-white font-sans font-medium tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <IconSparkles className="w-3.5 h-3.5 text-amber-300" strokeWidth={1.5} />
            <span>Launch Studio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
