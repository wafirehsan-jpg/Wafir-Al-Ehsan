import React, { useState } from 'react';
import { Shield, Camera, AlertCircle, CheckCircle, RefreshCw, EyeOff, Info, UserX, Activity } from 'lucide-react';

export default function PeopleGuardian() {
  const [activeScenario, setActiveScenario] = useState('fall');
  const [isScanning, setIsScanning] = useState(false);

  const scenarios = [
    { id: 'normal', label: 'Normal Scene', icon: '🟢', score: 12, risk: 'LOW', confidence: 98 },
    { id: 'fall', label: 'Person Fall', icon: '⚠️', score: 94, risk: 'HIGH', confidence: 94 },
    { id: 'smoke', label: 'Smoke Detected', icon: '💨', score: 88, risk: 'HIGH', confidence: 91 },
    { id: 'blocked', label: 'Blocked Path', icon: '🚧', score: 65, risk: 'MODERATE', confidence: 88 },
    { id: 'unattended', label: 'Object Left Behind', icon: '🧳', score: 72, risk: 'MODERATE', confidence: 89 },
  ];

  const current = scenarios.find(s => s.id === activeScenario) || scenarios[1];

  const handleSelectScenario = (id) => {
    setIsScanning(true);
    setActiveScenario(id);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-rose-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white uppercase tracking-wide">
                  🛡 PEOPLE GUARDIAN
                </h1>
                <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-mono">
                  COMPUTER VISION
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "AI-assisted awareness for safer environments."
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            <span>NO Facial Recognition • Privacy-Preserving Event Detection</span>
          </div>
        </div>
      </div>

      {/* Scenario Selection Toolbar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800">
        <p className="text-xs font-mono text-slate-400 uppercase mb-3">
          SELECT SIMULATED CAMERA SCENARIO:
        </p>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeScenario === sc.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{sc.icon}</span>
              <span>[{sc.label}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Interface: Left Camera Feed | Center AI Analysis | Right Detection Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT: Camera / Image Area (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-slate-400 flex items-center space-x-1">
                <Camera className="w-4 h-4 text-rose-400" />
                <span>CAM-04 (UAE PUBLIC PLAZA)</span>
              </span>
              <span className="text-emerald-400 font-bold">LIVE STREAM</span>
            </div>

            {/* Simulated Feed Viewport */}
            <div className="relative w-full h-64 sm:h-72 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
              {/* Grid Scan Lines */}
              <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"></div>

              {isScanning ? (
                <div className="flex flex-col items-center text-sky-400 font-mono text-xs">
                  <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                  <span>SCANNING CAMERA FEED...</span>
                  <span>ANALYZING MOTION PATTERNS...</span>
                </div>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  {/* Bounding Box Visual Simulation */}
                  {activeScenario === 'fall' && (
                    <div className="absolute inset-8 border-2 border-rose-500 border-dashed rounded-lg bg-rose-500/10 flex flex-col items-center justify-center animate-pulse">
                      <span className="text-xs font-mono text-rose-400 bg-slate-950 px-2 py-0.5 rounded border border-rose-500">
                        DETECTED: PRONE POSTURE (FALL)
                      </span>
                    </div>
                  )}

                  {activeScenario === 'smoke' && (
                    <div className="absolute inset-4 border-2 border-amber-500 border-dashed rounded-lg bg-amber-500/10 flex flex-col items-center justify-center animate-pulse">
                      <span className="text-xs font-mono text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-500">
                        DETECTED: VISUAL SMOKE PLUME
                      </span>
                    </div>
                  )}

                  {activeScenario === 'blocked' && (
                    <div className="absolute inset-10 border-2 border-amber-500 border-dashed rounded-lg bg-amber-500/10 flex flex-col items-center justify-center animate-pulse">
                      <span className="text-xs font-mono text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-500">
                        DETECTED: OBSTRUCTION IN CORRIDOR
                      </span>
                    </div>
                  )}

                  {activeScenario === 'unattended' && (
                    <div className="absolute inset-12 border-2 border-sky-500 border-dashed rounded-lg bg-sky-500/10 flex flex-col items-center justify-center animate-pulse">
                      <span className="text-xs font-mono text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-sky-500">
                        DETECTED: UNATTENDED PARCEL
                      </span>
                    </div>
                  )}

                  {activeScenario === 'normal' && (
                    <div className="text-emerald-400 font-mono text-xs flex flex-col items-center">
                      <CheckCircle className="w-10 h-10 mb-2 opacity-80" />
                      <span>CLEAR WALKWAY PARAMETERS</span>
                      <span className="text-[10px] text-slate-500 mt-1">NO PHYSICAL HAZARDS DETECTED</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center space-x-2">
            <UserX className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Identity Protection: Visual frames are parsed locally for bounding box geometry only. No biometric signatures stored.</span>
          </div>
        </div>

        {/* CENTER: AI Analysis & Factor Breakdown (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-mono uppercase text-sky-400 font-bold">
                AI REASONING & FACTORS
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {activeScenario === 'fall' && (
                <>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>Vertical Posture Drop</span>
                      <span>+42</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Sudden bounding box center-of-mass drop</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>Horizontal Motion Stasis</span>
                      <span>+30</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Subject in prone position for &gt; 5 sec</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="flex justify-between text-amber-400 font-bold">
                      <span>Ground Angle Posture</span>
                      <span>+15</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Torso orientation relative to floor plane</p>
                  </div>
                </>
              )}

              {activeScenario !== 'fall' && (
                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  <p className="font-bold text-sky-300 mb-1">Environmental Pattern Analysis</p>
                  <p className="text-[11px] text-slate-400">
                    Evaluates temporal luminance, spatial obstruction ratios, and trajectory velocity.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-amber-400 font-bold">Pipeline: </span>
            SCANNING... → ANALYZING... → EVENT DETECTED
          </div>
        </div>

        {/* RIGHT: Detection Result (3 Cols) */}
        <div className="lg:col-span-3 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              PROTOTYPE AI ASSESSMENT
            </p>

            <h3 className="text-xl font-black text-white mt-1 uppercase">
              {activeScenario === 'fall' && '⚠️ POSSIBLE FALL'}
              {activeScenario === 'smoke' && '💨 SMOKE DETECTED'}
              {activeScenario === 'blocked' && '🚧 PATHWAY BLOCKED'}
              {activeScenario === 'unattended' && '🧳 UNATTENDED ITEM'}
              {activeScenario === 'normal' && '🟢 SCENE CLEAR'}
            </h3>

            {/* Risk Meter */}
            <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                PROTOTYPE RISK SCORE
              </span>
              <div className="text-3xl font-black text-rose-400 my-1">
                {current.score} <span className="text-xs text-slate-500 font-normal">/ 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-2">
                <div
                  className={`h-full ${current.score > 70 ? 'bg-rose-500' : current.score > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${current.score}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono text-slate-300">
                Confidence: <strong className="text-sky-400">{current.confidence}%</strong>
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase text-slate-400">RECOMMENDED ACTION:</p>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 font-medium leading-relaxed">
                "{activeScenario === 'normal' ? 'No action required.' : 'Human verification recommended. Verify the situation and contact appropriate assistance if necessary.'}"
              </div>
            </div>
          </div>

          <div className="mt-4 text-[9px] font-mono text-slate-500 text-center border-t border-slate-800 pt-3">
            LABEL: "DEMO DATA / PROTOTYPE AI ASSESSMENT"
          </div>
        </div>

      </div>
    </div>
  );
}
