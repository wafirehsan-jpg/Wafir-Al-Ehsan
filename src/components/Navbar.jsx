import React from 'react';
import { Shield, Droplets, Lock, Search, Cpu, Play, LayoutDashboard, Brain, Globe, Info, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onStartExpoDemo }) {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'people', label: 'People', icon: Shield },
    { id: 'resources', label: 'Resources', icon: Droplets },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'scams', label: 'Scams', icon: Search },
    { id: 'reasoning', label: 'AI Reasoning', icon: Brain },
    { id: 'impact', label: 'Impact', icon: Activity },
    { id: 'about', label: 'About & UAE', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-sky-900/40 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & UAE Tag */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-500 to-rose-500 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-wider text-white">
                  AI UAE <span className="text-sky-400">GUARDIAN</span>
                </span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                  🇦🇪 EXPO 2026
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                4 GUARDIANS. 1 MISSION.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 shadow-sm shadow-sky-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status Badge & Expo Demo CTA */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-medium tracking-wide">
                AI ONLINE
              </span>
            </div>

            <button
              onClick={onStartExpoDemo}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 via-emerald-500 to-rose-500 text-slate-950 font-bold text-xs shadow-md hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START EXPO DEMO</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
