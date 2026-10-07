import React from 'react';
import { Activity, Shield, Droplets, Lock, Search, CheckCircle2 } from 'lucide-react';

export default function ImpactDashboard() {
  const impactCategories = [
    {
      title: 'PEOPLE',
      metric: '128',
      label: 'Events analyzed',
      sub: '7 potential risks • 2 high-risk situations',
      icon: Shield,
      color: 'from-rose-500 to-pink-600',
      border: 'border-rose-500/30'
    },
    {
      title: 'RESOURCE',
      metric: '14,400 L',
      label: 'Potential water savings',
      sub: '480 L/day average leak waste saved',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30'
    },
    {
      title: 'PRIVACY',
      metric: '237',
      label: 'Privacy risks detected',
      sub: '83 posts scanned • 19 high-risk PII rewrites',
      icon: Lock,
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/30'
    },
    {
      title: 'SCAMS',
      metric: '247',
      label: 'Suspicious messages analyzed',
      sub: '31 high-risk • 46 medium-risk • 170 low-risk',
      icon: Search,
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-500/30'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-sky-500/30 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wide">
              🌍 GUARDIAN IMPACT DASHBOARD
            </h1>
            <p className="text-xs text-slate-300 italic">
              "Technology becomes meaningful when it improves lives."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactCategories.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div key={idx} className={`p-6 rounded-2xl glass-panel border ${c.border} flex flex-col justify-between`}>
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">{c.title} GUARDIAN</h3>
                <p className="text-3xl font-black text-white font-mono mt-1">{c.metric}</p>
                <p className="text-xs font-bold text-sky-400 mt-1">{c.label}</p>
                <p className="text-[11px] text-slate-400 mt-2 font-mono">{c.sub}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                LABEL: "PROTOTYPE DEMONSTRATION METRICS"
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-center font-mono text-xs text-slate-400">
        <div className="flex items-center justify-center space-x-2 text-emerald-400 mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-bold uppercase">PROTOTYPE DEMONSTRATION METRICS</span>
        </div>
        <p>All figures presented are generated for the BTF AKSI EXPO 2026 AI Innovation Prototype.</p>
      </div>
    </div>
  );
}
