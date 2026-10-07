import React from 'react';
import { Brain, Cpu, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AiReasoningCenter() {
  const factors = [
    { name: 'Continuous continuous unusual flow', points: 35, color: 'bg-rose-500' },
    { name: 'Historical mismatch anomaly', points: 27, color: 'bg-amber-500' },
    { name: 'Unexpected flow pattern profile', points: 15, color: 'bg-sky-500' },
    { name: 'Nighttime unmonitored activity', points: 10, color: 'bg-emerald-500' },
  ];

  const timeline = [
    { time: '19:04:21', label: 'Input received', desc: 'Raw telemetry stream ingested into Universal AI Risk Engine' },
    { time: '19:04:22', label: 'Analysis started', desc: 'Running vision & NLP neural feature extraction models' },
    { time: '19:04:23', label: 'Pattern detected', desc: 'Cross-referenced against UAE risk baseline matrix' },
    { time: '19:04:23', label: 'Risk calculation completed', desc: 'Assigned Prototype Risk Score: 87/100 (HIGH)' },
    { time: '19:04:24', label: 'Recommendation generated', desc: 'Human decision verification action plan created' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-sky-500/30 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wide">
              🧠 AI REASONING CENTER
            </h1>
            <p className="text-xs text-slate-300 italic">
              "Every Guardian must explain WHY it generated its result."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Factor Score Breakdown Bar Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>FACTOR WEIGHT BREAKDOWN (EXPLAINABLE AI)</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">Confidence: 89%</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            <p className="text-[10px] text-slate-400 uppercase">PROTOTYPE RISK SCORE</p>
            <p className="text-4xl font-black text-rose-400 my-1">87 <span className="text-sm text-slate-500">/ 100</span></p>
            <p className="text-xs text-amber-400">LEVEL: HIGH RISK</p>
          </div>

          <div className="space-y-4 font-mono text-xs pt-2">
            {factors.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{f.name}</span>
                  <span className="text-sky-400 font-bold">+{f.points}</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${f.color} transition-all duration-1000`}
                    style={{ width: `${(f.points / 40) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Timeline */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>EVENT PROCESSING TIMELINE</span>
          </h3>

          <div className="space-y-4 relative pl-4 border-l-2 border-slate-800 font-mono text-xs">
            {timeline.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[21px] top-0 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:scale-125 transition-transform"></div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-sky-300 font-bold">
                    <span>{step.time}</span>
                    <span className="text-emerald-400">{step.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
