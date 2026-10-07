import React from 'react';
import { Shield, Droplets, Lock, Search, Cpu } from 'lucide-react';

export default function CentralAiCoreNode({ onSelectGuardian }) {
  const nodes = [
    {
      id: 'people',
      title: 'PEOPLE',
      subtitle: 'Safety & Events',
      icon: Shield,
      color: 'from-rose-500 to-pink-600',
      borderColor: 'border-rose-500/50',
      glowColor: 'shadow-rose-500/30',
      position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-4',
      badge: 'LOW RISK'
    },
    {
      id: 'resources',
      title: 'RESOURCES',
      subtitle: 'Water Conservation',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/50',
      glowColor: 'shadow-cyan-500/30',
      position: 'top-1/2 right-0 translate-x-4 -translate-y-1/2',
      badge: 'MODERATE RISK'
    },
    {
      id: 'privacy',
      title: 'PRIVACY',
      subtitle: 'Digital Protection',
      icon: Lock,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/50',
      glowColor: 'shadow-emerald-500/30',
      position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-4',
      badge: 'LOW RISK'
    },
    {
      id: 'scams',
      title: 'SCAMS',
      subtitle: 'Threat Detection',
      icon: Search,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/50',
      glowColor: 'shadow-amber-500/30',
      position: 'top-1/2 left-0 -translate-x-4 -translate-y-1/2',
      badge: 'HIGH RISK'
    }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-96 sm:h-[420px] flex items-center justify-center my-6">
      {/* Background Animated Radar Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-sky-500/20 animate-radar"></div>
        <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-sky-500/20"></div>
        <div className="w-40 h-40 rounded-full border border-sky-500/30 border-dashed animate-spin" style={{ animationDuration: '40s' }}></div>
      </div>

      {/* SVG Connected Animated Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Lines from Center (50%, 50%) to 4 Directions */}
        <line x1="50%" y1="50%" x2="50%" y2="12%" stroke="url(#grad-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="50%" x2="88%" y2="50%" stroke="url(#grad-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="50%" x2="50%" y2="88%" stroke="url(#grad-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
        <line x1="50%" y1="50%" x2="12%" y2="50%" stroke="url(#grad-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
      </svg>

      {/* Central AI Core */}
      <div className="relative z-20 flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-950 border-2 border-sky-400/80 shadow-2xl shadow-sky-500/40 p-4 text-center group cursor-pointer">
        <div className="absolute inset-0 rounded-full bg-sky-500/10 animate-ping opacity-30"></div>
        <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-sky-400 group-hover:rotate-180 transition-transform duration-700" />
        <span className="text-xs font-black tracking-widest text-white mt-1 uppercase">AI CORE</span>
        <span className="text-[9px] font-mono text-sky-300">UNIVERSAL RISK</span>
      </div>

      {/* 4 Outer Guardian Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            onClick={() => onSelectGuardian && onSelectGuardian(node.id)}
            className={`absolute z-30 ${node.position} cursor-pointer group transform transition-all duration-300 hover:scale-110`}
          >
            <div className={`flex flex-col items-center p-3 rounded-2xl glass-panel-uae border ${node.borderColor} shadow-lg ${node.glowColor} hover:bg-slate-900/90 w-36 sm:w-40 text-center`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center text-white shadow-md mb-1.5`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-black tracking-wide text-white">{node.title}</span>
              <span className="text-[10px] text-slate-400 font-sans">{node.subtitle}</span>
              <span className="mt-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-sky-300">
                {node.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
