import React, { useState } from 'react';
import { Droplets, AlertTriangle, TrendingUp, CheckCircle, RefreshCw, BarChart2, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function ResourceGuardian() {
  const [isLeaking, setIsLeaking] = useState(false);

  // Normal Baseline Data (8 - 15 L/min)
  const normalData = [
    { time: '00:00', flow: 9, baseline: 12 },
    { time: '03:00', flow: 8, baseline: 12 },
    { time: '06:00', flow: 14, baseline: 12 },
    { time: '09:00', flow: 15, baseline: 12 },
    { time: '12:00', flow: 13, baseline: 12 },
    { time: '15:00', flow: 12, baseline: 12 },
    { time: '18:00', flow: 14, baseline: 12 },
    { time: '21:00', flow: 10, baseline: 12 },
  ];

  // Abnormal Simulated Leak Data (31 L/min)
  const leakData = [
    { time: '00:00', flow: 9, baseline: 12 },
    { time: '03:00', flow: 8, baseline: 12 },
    { time: '06:00', flow: 14, baseline: 12 },
    { time: '09:00', flow: 15, baseline: 12 },
    { time: '12:00', flow: 31, baseline: 12 },
    { time: '15:00', flow: 32, baseline: 12 },
    { time: '18:00', flow: 31, baseline: 12 },
    { time: '21:00', flow: 30, baseline: 12 },
  ];

  const chartData = isLeaking ? leakData : normalData;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-cyan-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white uppercase tracking-wide">
                  💧 RESOURCE GUARDIAN
                </h1>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-mono">
                  WATER CONSERVATION
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "AI that helps protect valuable resources."
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
            <span>🇦🇪 UAE Desert Sustainability Priority • Smart Water Management</span>
          </div>
        </div>
      </div>

      {/* Top 5 Key Water Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono">
        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">WATER USAGE TODAY</p>
          <p className="text-xl font-black text-white mt-1">8,420 L</p>
          <span className="text-[9px] text-slate-500">DEMO DATA</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">AVERAGE FLOW</p>
          <p className="text-xl font-black text-sky-400 mt-1">12 L/min</p>
          <span className="text-[9px] text-slate-500">BASELINE</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">CURRENT FLOW</p>
          <p className={`text-xl font-black mt-1 ${isLeaking ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isLeaking ? '31 L/min' : '12 L/min'}
          </p>
          <span className="text-[9px] text-slate-500">{isLeaking ? 'ABNORMAL' : 'NORMAL'}</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">LEAK RISK SCORE</p>
          <p className={`text-xl font-black mt-1 ${isLeaking ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isLeaking ? '87 / 100' : '15 / 100'}
          </p>
          <span className="text-[9px] text-slate-500">{isLeaking ? 'HIGH' : 'LOW'}</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-slate-800 col-span-2 sm:col-span-1">
          <p className="text-[10px] text-slate-400 uppercase">POTENTIAL DAILY WASTE</p>
          <p className={`text-xl font-black mt-1 ${isLeaking ? 'text-amber-400' : 'text-slate-400'}`}>
            {isLeaking ? '480 L' : '0 L'}
          </p>
          <span className="text-[9px] text-slate-500">PROJECTED</span>
        </div>
      </div>

      {/* Main Interactive Water Flow Chart & Leak Simulator */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
              <span>TIME VS WATER FLOW (L/MIN) REAL-TIME MONITOR</span>
            </h3>
            <p className="text-xs text-slate-400">
              Normal range baseline: 8 – 15 L/min. Simulated anomaly rate: 31 L/min.
            </p>
          </div>

          <button
            onClick={() => setIsLeaking(!isLeaking)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg transition-all ${
              isLeaking
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
                : 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/30'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isLeaking ? 'RESET TO NORMAL FLOW' : 'SIMULATE LEAK (31 L/min)'}</span>
          </button>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-64 sm:h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isLeaking ? '#f43f5e' : '#38bdf8'} stopOpacity={0.5}/>
                  <stop offset="95%" stopColor={isLeaking ? '#f43f5e' : '#38bdf8'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 40]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <ReferenceLine y={15} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Normal Max Baseline', fill: '#f59e0b', fontSize: 10 }} />
              <Area
                type="monotone"
                dataKey="flow"
                stroke={isLeaking ? '#f43f5e' : '#38bdf8'}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#flowGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Leak Detection Explanation & Resource Impact */}
      {isLeaking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Explainability Breakdown */}
          <div className="p-5 rounded-2xl glass-panel border border-rose-500/30">
            <h4 className="text-xs font-mono text-rose-400 uppercase font-bold mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>AI DETECTED: "UNUSUAL CONTINUOUS FLOW"</span>
            </h4>

            <p className="text-xs text-slate-300 mb-4">
              PROTOTYPE RISK SCORE: <strong className="text-rose-400 font-mono text-base">87 / 100</strong>
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>Continuous nighttime flow</span>
                <span className="text-rose-400 font-bold">+35</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>Usage above baseline (31 L/min)</span>
                <span className="text-rose-400 font-bold">+27</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>Unexpected flow pattern profile</span>
                <span className="text-amber-400 font-bold">+15</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>Historical mismatch anomaly</span>
                <span className="text-amber-400 font-bold">+10</span>
              </div>
            </div>
          </div>

          {/* Environmental Impact Metrics */}
          <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono text-cyan-400 uppercase font-bold mb-3 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>RESOURCE SAVINGS & IMPACT</span>
              </h4>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">POTENTIAL WATER SAVED</p>
                  <p className="text-3xl font-black text-cyan-400 font-mono mt-1">480 L / day</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">30-DAY SAVINGS PROJECTION</p>
                  <p className="text-3xl font-black text-emerald-400 font-mono mt-1">14,400 L</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 italic">
              "Small AI decisions can create large environmental impact."
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
