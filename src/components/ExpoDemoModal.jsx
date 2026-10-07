import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, X, Shield, Droplets, Lock, Search, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export default function ExpoDemoModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // 5 Phase Script over 90 Seconds
  const steps = [
    {
      phase: 1,
      timeframe: '0s - 20s',
      guardian: 'PEOPLE GUARDIAN',
      icon: Shield,
      color: 'from-rose-500 to-pink-600',
      badgeColor: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
      heading: 'Simulated Camera Safety Event',
      aiOutput: 'Possible fall detected.',
      riskScore: 94,
      riskLevel: 'HIGH',
      confidence: 94,
      details: 'Computer vision analyzed sudden posture drop & 5-second stasis without facial recognition.',
      recommendation: 'Human verification recommended. Verify situation and contact assistance if needed.'
    },
    {
      phase: 2,
      timeframe: '20s - 40s',
      guardian: 'RESOURCE GUARDIAN',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40',
      heading: 'Water Leak Anomaly Simulation',
      aiOutput: 'Unusual continuous flow detected.',
      riskScore: 87,
      riskLevel: 'HIGH',
      confidence: 89,
      details: 'Water flow rate spiked from 12 L/min baseline → 31 L/min continuous leak.',
      recommendation: 'Inspect main valve Zone 4. Potential water saved: 480 L/day (14,400 L/month).'
    },
    {
      phase: 3,
      timeframe: '40s - 60s',
      guardian: 'PRIVACY GUARDIAN',
      icon: Lock,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
      heading: 'Text Privacy PII Scanner & Safe Rewrite',
      aiOutput: 'Identified location, phone number & personal identity.',
      riskScore: 82,
      riskLevel: 'HIGH',
      confidence: 93,
      details: 'Scanned: "My name is Ahmed and I live in Villa 24..." → PII flagged and redacted.',
      recommendation: 'Transformed into anonymized safe version before social posting.'
    },
    {
      phase: 4,
      timeframe: '60s - 80s',
      guardian: 'SCAM GUARDIAN',
      icon: Search,
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
      heading: 'SMS Threat Analysis & Factor Explanation',
      aiOutput: 'Multiple scam warning signs detected.',
      riskScore: 91,
      riskLevel: 'CRITICAL',
      confidence: 91,
      details: 'Flagged prize lure (+27), urgency pressure (+24), and unverified URL (+22).',
      recommendation: 'Do not click links. Generated safe refusal reply.'
    },
    {
      phase: 5,
      timeframe: '80s - 90s',
      guardian: 'CENTRAL AI CORE SYNTHESIS',
      icon: Cpu,
      color: 'from-sky-500 via-emerald-500 to-rose-500',
      badgeColor: 'text-sky-300 bg-sky-500/20 border-sky-500/40',
      heading: '4 GUARDIANS. 1 MISSION.',
      statement: 'PROTECT PEOPLE. PROTECT RESOURCES. PROTECT DIGITAL LIVES.',
      flowFormula: 'DETECT → EXPLAIN → RECOMMEND → HUMAN DECIDES',
      finalQuote: 'Technology becomes meaningful when it improves lives.'
    }
  ];

  // Auto-timer for 90 seconds demo
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          if (next >= 90) {
            setIsPlaying(false);
            return 90;
          }
          // Step transition timing
          if (next === 20) setCurrentStep(1);
          if (next === 40) setCurrentStep(2);
          if (next === 60) setCurrentStep(3);
          if (next === 80) setCurrentStep(4);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl p-6 sm:p-8 rounded-3xl glass-panel-uae border border-sky-500/40 shadow-2xl flex flex-col justify-between min-h-[540px]">

        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-rose-400 tracking-wider">
              🎪 EXPO SHOWCASE MODE (90s)
            </span>
            <span className="text-xs font-mono text-slate-400">
              {seconds}s / 90s
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setSeconds(0);
                setCurrentStep(0);
                setIsPlaying(true);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const nextStep = (currentStep + 1) % steps.length;
                setCurrentStep(nextStep);
                setSeconds(nextStep * 20);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Timeline Indicator */}
        <div className="my-4">
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-emerald-500 to-rose-500 transition-all duration-300"
              style={{ width: `${(seconds / 90) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-mono text-slate-500">
            <span className={currentStep === 0 ? 'text-sky-400 font-bold' : ''}>PEOPLE (0-20s)</span>
            <span className={currentStep === 1 ? 'text-sky-400 font-bold' : ''}>RESOURCE (20-40s)</span>
            <span className={currentStep === 2 ? 'text-sky-400 font-bold' : ''}>PRIVACY (40-60s)</span>
            <span className={currentStep === 3 ? 'text-sky-400 font-bold' : ''}>SCAMS (60-80s)</span>
            <span className={currentStep === 4 ? 'text-sky-400 font-bold' : ''}>CORE SYNTHESIS (80-90s)</span>
          </div>
        </div>

        {/* Dynamic Phase Display View */}
        <div className="my-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between flex-1">
          {currentStep < 4 ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400">{step.timeframe}</span>
                    <h2 className="text-xl font-black text-white uppercase">{step.guardian}</h2>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${step.badgeColor}`}>
                  Risk: {step.riskLevel} ({step.riskScore}/100)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-sky-300">{step.heading}</h3>
                <p className="text-lg font-black text-rose-400 font-mono">"{step.aiOutput}"</p>
                <p className="text-xs text-slate-300">{step.details}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                💡 RECOMMENDATION: {step.recommendation}
              </div>
            </div>
          ) : (
            /* Phase 5 Final Presentation Screen */
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BTF AKSI EXPO 2026 FINAL SYNTHESIS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider uae-gradient-text">
                AI UAE GUARDIAN
              </h1>

              <div className="text-xl sm:text-2xl font-black text-white uppercase font-mono tracking-widest my-2">
                "4 GUARDIANS. 1 MISSION."
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300">
                  🛡 Protect People
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300">
                  💧 Protect Resources
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300">
                  🔐 Protect Privacy
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-300">
                  🕵️ Protect Digital Lives
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/30 font-mono text-xs text-sky-300">
                DETECT → EXPLAIN → RECOMMEND → HUMAN DECIDES
              </div>

              <p className="text-xs text-slate-400 italic">
                "{step.finalQuote}"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-800">
          <span>BTF AKSI EXPO 2026 • ARTIFICIAL INTELLIGENCE PROTOTYPE</span>
          <button
            onClick={onClose}
            className="text-sky-400 hover:text-sky-300 font-bold"
          >
            EXIT EXPO MODE
          </button>
        </div>

      </div>
    </div>
  );
}
