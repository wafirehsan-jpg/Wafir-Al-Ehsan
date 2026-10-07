import React from 'react';
import { Shield, Droplets, Lock, Search, Activity, Cpu, ArrowRight, AlertTriangle, CheckCircle, BarChart3, Radio } from 'lucide-react';

export default function CommandCenterDashboard({ onSelectGuardian, onStartExpoDemo }) {
  const stats = [
    { label: 'EVENTS ANALYZED', value: '24', icon: Activity, color: 'text-sky-400', badge: '+4 today' },
    { label: 'ACTIVE GUARDIANS', value: '4 / 4', icon: Shield, color: 'text-emerald-400', badge: '100% ONLINE' },
    { label: 'RISKS DETECTED', value: '8', icon: AlertTriangle, color: 'text-amber-400', badge: 'Action Recommended' },
    { label: 'SYSTEM MODE', value: 'DEMO / LIVE', icon: Radio, color: 'text-rose-400', badge: 'KEYLESS SANDBOX' },
  ];

  const guardians = [
    {
      id: 'people',
      title: 'PEOPLE GUARDIAN',
      tagline: 'AI-assisted awareness for safer environments.',
      icon: Shield,
      riskLevel: 'LOW',
      riskScore: 12,
      riskColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Computer vision monitoring event occurrences like falls, smoke, and pathway blocks.',
      lastEvent: 'Zone 2 clearance checked • 5 mins ago',
      accentColor: 'from-rose-500 to-pink-600'
    },
    {
      id: 'resources',
      title: 'RESOURCE GUARDIAN',
      tagline: 'AI that helps protect valuable resources.',
      icon: Droplets,
      riskLevel: 'MODERATE',
      riskScore: 48,
      riskColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description: 'Water conservation metrics and real-time flow leak anomaly simulator.',
      lastEvent: 'Flow rate fluctuation (22 L/min) • 12 mins ago',
      accentColor: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'privacy',
      title: 'PRIVACY GUARDIAN',
      tagline: 'Think before you share.',
      icon: Lock,
      riskLevel: 'LOW',
      riskScore: 18,
      riskColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Identifies PII markers (phone, address, IDs) in text & images with Safe Rewrite.',
      lastEvent: 'Text post scan cleared • 1 min ago',
      accentColor: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'scams',
      title: 'SCAM GUARDIAN',
      tagline: 'Detect warning signs before you click, pay or share.',
      icon: Search,
      riskLevel: 'HIGH',
      riskScore: 91,
      riskColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      description: 'SMS, WhatsApp, URL, and QR code scam detection with explainable factor breakdown.',
      lastEvent: 'Prize message scam flagged • Just now',
      accentColor: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Status Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl glass-panel-uae border border-sky-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h1 className="text-2xl font-black uppercase text-white tracking-wide">
              GUARDIAN COMMAND CENTER
            </h1>
            <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded font-mono">
              ● AI SYSTEM ONLINE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            BTF AKSI EXPO 2026 • Real-Time AI UAE Risk Assessment Matrix
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={onStartExpoDemo}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:shadow-sky-500/30 transition-all"
          >
            <Cpu className="w-4 h-4" />
            <span>EXPO DEMO SHOWCASE (90s)</span>
          </button>
        </div>
      </div>

      {/* Top Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-black text-white mt-1">{s.value}</p>
                <span className="inline-block mt-2 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {s.badge}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Large Guardian Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black uppercase text-white tracking-wide">
            GUARDIAN SUBSYSTEMS STATUS
          </h2>
          <span className="text-xs font-mono text-slate-400">
            DETECT → EXPLAIN → RECOMMEND → HUMAN DECIDES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guardians.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.id}
                onClick={() => onSelectGuardian(g.id)}
                className="group cursor-pointer p-6 rounded-2xl glass-panel border border-slate-800 hover:border-sky-500/40 transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.accentColor} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white group-hover:text-sky-300 transition-colors">
                          {g.title}
                        </h3>
                        <p className="text-xs text-slate-400 italic">
                          "{g.tagline}"
                        </p>
                      </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold ${g.riskColor}`}>
                      Risk: {g.riskLevel}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {g.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 truncate max-w-[220px]">
                    {g.lastEvent}
                  </span>
                  <button className="flex items-center space-x-1 text-sky-400 group-hover:text-sky-300 font-bold">
                    <span>LAUNCH</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Processing Activity Stream */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              REAL-TIME GUARDIAN EVENT STREAM
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400">● LIVE UPDATES</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <span className="text-sky-400 font-bold">[19:04:24] SCAM_GUARDIAN:</span>
            <span>SMS Message Scanned • Risk 91/100 (CRITICAL)</span>
            <span className="text-amber-400 font-bold">Explanation Generated</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <span className="text-cyan-400 font-bold">[19:02:10] RESOURCE_GUARDIAN:</span>
            <span>Water Flow Anomaly • Flow 31 L/min (MODERATE)</span>
            <span className="text-emerald-400 font-bold">Leak Risk 87/100</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <span className="text-emerald-400 font-bold">[18:58:15] PRIVACY_GUARDIAN:</span>
            <span>Text Scan • Phone & Address Redacted</span>
            <span className="text-sky-400 font-bold">Safe Rewrite Created</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-slate-300">
            <span className="text-rose-400 font-bold">[18:50:02] PEOPLE_GUARDIAN:</span>
            <span>Camera Scenario Fall Scan • Confidence 94%</span>
            <span className="text-rose-400 font-bold">Human Verification Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
