import React from 'react';
import { Cpu, UserCheck, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutUaeArchitecture() {
  const principles = [
    'Privacy by design & data minimization',
    'Human oversight & decision authorization',
    'Full explainability & risk breakdown',
    'Complete transparency on demo status',
    'No facial recognition or identity tracking',
    'No unnecessary personal data collection',
    'No automatic accusations of wrongdoing',
    'Clear confidence & uncertainty bounds',
    'Safe, responsible recommendations',
    'Human verification before taking action'
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-sky-500/30 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wide">
              🇦🇪 DESIGNED WITH THE UAE IN MIND
            </h1>
            <p className="text-xs text-slate-300 italic">
              "Educational prototype inspired by UAE innovation and sustainability priorities."
            </p>
          </div>
        </div>
      </div>

      {/* AI Architecture Section */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h2 className="text-base font-black uppercase text-white tracking-wider flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <span>TECHNICAL AI ARCHITECTURE</span>
        </h2>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 w-full md:w-auto">
            USER INPUT (Data/Media)
          </div>
          <span>→</span>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 w-full md:w-auto">
            DATA PROCESSING
          </div>
          <span>→</span>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 w-full md:w-auto">
            AI MODELS (Vision / NLP)
          </div>
          <span>→</span>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 w-full md:w-auto">
            UNIVERSAL RISK ENGINE
          </div>
          <span>→</span>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 w-full md:w-auto text-emerald-400 font-bold">
            HUMAN DECISION
          </div>
        </div>
      </div>

      {/* Dedicated Human-in-the-Loop Section */}
      <div className="p-6 rounded-2xl glass-panel border border-rose-500/30 space-y-4">
        <div className="flex items-center space-x-3">
          <UserCheck className="w-6 h-6 text-rose-400" />
          <h2 className="text-lg font-black uppercase text-white tracking-wider">
            AI DOES NOT REPLACE HUMANS
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          AI UAE Guardian identifies patterns, calculates risk scores, and provides explainable factor breakdowns.
          However, final operational decisions always remain with human operators and users.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <p className="text-rose-400 font-bold mb-1">SAFETY EVENTS (PEOPLE GUARDIAN):</p>
            <p className="text-slate-400">AI detection → Human verification → Dispatch assistance</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <p className="text-amber-400 font-bold mb-1">SCAM THREATS (SCAM GUARDIAN):</p>
            <p className="text-slate-400">AI risk warning → User verifies independently → User decides</p>
          </div>
        </div>
      </div>

      {/* Responsible AI Principles Checklist */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h2 className="text-base font-black uppercase text-white tracking-wider flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>RESPONSIBLE AI PRINCIPLES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
          {principles.map((p, idx) => (
            <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exhibition Credentials Footer */}
      <div className="p-6 rounded-2xl glass-panel-uae text-center space-y-2 font-mono text-xs text-slate-400">
        <p className="text-sky-400 font-bold">BTF AKSI EXPO 2026 • ARTIFICIAL INTELLIGENCE CATEGORY</p>
        <p>Abdul Kalam Science Innovation Expo 2026 Prototype Showcase</p>
      </div>
    </div>
  );
}
