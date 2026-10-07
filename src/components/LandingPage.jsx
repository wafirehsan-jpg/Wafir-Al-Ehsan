import React from 'react';
import { Shield, Droplets, Lock, Search, ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import CentralAiCoreNode from './CentralAiCoreNode';

export default function LandingPage({ onEnterDashboard, onStartExpoDemo, onSelectGuardian }) {
  const featureCards = [
    {
      id: 'people',
      title: 'PEOPLE GUARDIAN',
      tagline: 'AI-assisted safety event detection.',
      description: 'Computer vision identifies emergency scenarios like falls, smoke, and blocked exits without facial recognition.',
      icon: Shield,
      accent: 'text-rose-400',
      border: 'hover:border-rose-500/50',
      bg: 'from-rose-500/10 to-transparent'
    },
    {
      id: 'resources',
      title: 'RESOURCE GUARDIAN',
      tagline: 'AI-powered water conservation and anomaly detection.',
      description: 'Monitors real-time water usage metrics, detects pipe leaks, and calculates environmental impact.',
      icon: Droplets,
      accent: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
      bg: 'from-cyan-500/10 to-transparent'
    },
    {
      id: 'privacy',
      title: 'PRIVACY GUARDIAN',
      tagline: 'Identify sensitive information before sharing.',
      description: 'Scans text and images for PII like Emirates ID, addresses, and phone numbers before posting online.',
      icon: Lock,
      accent: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      bg: 'from-emerald-500/10 to-transparent'
    },
    {
      id: 'scams',
      title: 'SCAM GUARDIAN',
      tagline: 'Detect warning signs in suspicious messages and digital content.',
      description: 'Analyzes SMS, WhatsApp, URLs, and QR codes for fraud indicators with explainable risk breakdown.',
      icon: Search,
      accent: 'text-amber-400',
      border: 'hover:border-amber-500/50',
      bg: 'from-amber-500/10 to-transparent'
    }
  ];

  return (
    <div className="relative min-h-screen uae-bg grid-pattern text-slate-100 overflow-hidden pb-16">
      {/* Top Banner for Expo 2026 */}
      <div className="bg-slate-900/90 border-b border-sky-900/40 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs font-mono">
          <span className="text-emerald-400 font-bold">🇦🇪 BTF AKSI EXPO 2026</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Abdul Kalam Science Innovation Expo • Category: ARTIFICIAL INTELLIGENCE</span>
        </div>
      </div>

      {/* Main Cinematic Hero Section */}
      <section className="relative pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-6">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>PROTOTYPE AI INNOVATION PLATFORM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase mb-3">
          AI UAE <span className="uae-gradient-text">GUARDIAN</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 font-sans font-light mb-2">
          "Artificial Intelligence designed to protect people, resources and digital lives."
        </p>

        <div className="my-4">
          <span className="text-2xl sm:text-3xl font-black tracking-widest uae-gold-text uppercase">
            "4 GUARDIANS. 1 MISSION."
          </span>
          <p className="text-sm font-mono text-sky-400 mt-1 uppercase tracking-wider">
            Detect risks. Explain decisions. Recommend action.
          </p>
        </div>

        {/* Central Interactive AI Core Node Diagram */}
        <CentralAiCoreNode onSelectGuardian={onSelectGuardian} />

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>ENTER GUARDIAN COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartExpoDemo}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl glass-panel-active text-white font-bold text-sm border border-emerald-500/50 hover:border-emerald-400 shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span>START EXPO DEMO (90s)</span>
          </button>
        </div>
      </section>

      {/* Core Universal Pipeline Banner */}
      <section className="max-w-5xl mx-auto my-10 px-4">
        <div className="p-6 rounded-2xl glass-panel-uae border border-sky-500/30 text-center">
          <h3 className="text-xs font-mono tracking-widest text-sky-400 uppercase mb-4">
            UNIVERSAL AI GUARDIAN ARCHITECTURE
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-xs font-bold font-mono">
            <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sky-300">
              1. DETECT (AI Analysis)
            </span>
            <span className="text-slate-500 hidden md:inline">→</span>
            <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-emerald-300">
              2. EXPLAIN (Factor Weights)
            </span>
            <span className="text-slate-500 hidden md:inline">→</span>
            <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-300">
              3. RECOMMEND (Action Plan)
            </span>
            <span className="text-slate-500 hidden md:inline">→</span>
            <span className="px-3 py-2 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300">
              4. HUMAN DECIDES
            </span>
          </div>
        </div>
      </section>

      {/* 4 Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            FOUR SPECIALIZED GUARDIANS
          </h2>
          <p className="text-sm text-slate-400">
            One unified platform addressing real-world innovation challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onSelectGuardian(card.id)}
                className={`group cursor-pointer rounded-2xl glass-panel p-6 border border-slate-800 ${card.border} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.bg} flex items-center justify-center ${card.accent} mb-4 border border-slate-700/50`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-1 group-hover:text-sky-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className={`text-xs font-semibold ${card.accent} mb-3`}>
                    "{card.tagline}"
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-white">
                  <span>Explore Guardian</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Responsible AI Notice Footer */}
      <footer className="max-w-7xl mx-auto px-4 text-center mt-12 text-xs text-slate-500 font-mono">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>PROTOTYPE AI ASSESSMENT • DEMO DATA ONLY</span>
        </div>
        <p>AI UAE Guardian is an educational research prototype created for BTF AKSI EXPO 2026.</p>
      </footer>
    </div>
  );
}
