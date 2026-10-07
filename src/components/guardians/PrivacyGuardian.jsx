import React, { useState } from 'react';
import { Lock, ShieldCheck, Eye, EyeOff, AlertTriangle, ArrowRight, Sparkles, Image, FileText, Check } from 'lucide-react';

export default function PrivacyGuardian() {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image'
  const [inputText, setInputText] = useState(
    'My name is Ahmed and I live in Villa 24. My school is ABC School. You can contact me at 0501234567.'
  );
  const [scannedResult, setScannedResult] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleScanText = () => {
    let score = 15;
    let detected = [];
    let factors = [];

    if (inputText.includes('0501234567') || /\d{10}/.test(inputText)) {
      score += 35;
      detected.push('Phone Number');
      factors.push({ name: 'Personal Phone Number', points: 35 });
    }
    if (inputText.toLowerCase().includes('villa 24') || inputText.toLowerCase().includes('address')) {
      score += 30;
      detected.push('Home Address');
      factors.push({ name: 'Physical Address', points: 30 });
    }
    if (inputText.toLowerCase().includes('school')) {
      score += 20;
      detected.push('School Name');
      factors.push({ name: 'Educational Institution', points: 20 });
    }
    if (inputText.toLowerCase().includes('ahmed') || inputText.toLowerCase().includes('name')) {
      score += 15;
      detected.push('Full Name');
      factors.push({ name: 'Direct Name Identity', points: 15 });
    }

    score = Math.min(95, score);

    const safeRewrite = "I'm a student living in the UAE. You can reach out to me via standard official school channels.";

    setScannedResult({
      score,
      riskLevel: score > 70 ? 'HIGH' : score > 40 ? 'MODERATE' : 'LOW',
      detected,
      factors,
      safeRewrite
    });
  };

  const handleCopyRewrite = () => {
    if (scannedResult?.safeRewrite) {
      navigator.clipboard.writeText(scannedResult.safeRewrite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white uppercase tracking-wide">
                  🔐 PRIVACY GUARDIAN
                </h1>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono">
                  PII PROTECTION
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "Think before you share."
              </p>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="mt-4 md:mt-0 flex items-center space-x-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'text' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>TEXT SCANNER</span>
            </button>

            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'image' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>IMAGE SCANNER</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: TEXT SCANNER */}
      {activeTab === 'text' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Area */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase mb-2 block">
                PASTE TEXT BEFORE POSTING ONLINE:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                placeholder="Paste something before you post..."
              />
            </div>

            <button
              onClick={handleScanText}
              className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>SCAN FOR PRIVACY RISKS</span>
            </button>
          </div>

          {/* Results Area */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
            {scannedResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">PRIVACY RISK LEVEL</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    scannedResult.score > 70 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {scannedResult.riskLevel} ({scannedResult.score}/100)
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase mb-2">DETECTED SENSITIVE PII:</p>
                  <div className="flex flex-wrap gap-2">
                    {scannedResult.detected.map((d, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                        ⚠️ {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Side-by-Side Safe Rewrite */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>RECOMMENDED SAFE REWRITE</span>
                    </span>

                    <button
                      onClick={handleCopyRewrite}
                      className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center space-x-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                      <span>{copied ? 'COPIED!' : 'COPY SAFE REWRITE'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-200 font-sans leading-relaxed">
                    "{scannedResult.safeRewrite}"
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <Lock className="w-12 h-12 mb-2 stroke-1" />
                <p className="text-xs font-mono">Click [SCAN FOR PRIVACY RISKS] to analyze personal data markers.</p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 text-center">
              LABEL: "PROTOTYPE PRIVACY ASSESSMENT - DEMO MODE"
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: IMAGE SCANNER */}
      {activeTab === 'image' && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                DOCUMENT & IMAGE PRIVACY BLUR SCANNER
              </h3>
              <p className="text-xs text-slate-400">
                Identifies ID badges, contact numbers, and location clues in photos.
              </p>
            </div>

            <button
              onClick={() => setIsBlurred(!isBlurred)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
                isBlurred ? 'bg-sky-500 text-slate-950' : 'bg-rose-500 text-slate-950'
              }`}
            >
              {isBlurred ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{isBlurred ? 'SHOW ORIGINAL IMAGE' : 'BLUR SENSITIVE AREAS'}</span>
            </button>
          </div>

          {/* Simulated Upload Preview Box */}
          <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            <div className={`p-8 text-center max-w-md ${isBlurred ? 'blur-md transition-all duration-500' : ''}`}>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                <p className="text-sky-400 font-bold">🇦🇪 UAE EMIRATES ID DOCUMENT [DEMO]</p>
                <p>ID NUMBER: 784-1990-1234567-1</p>
                <p>ADDRESS: Villa 24, Zone A, Abu Dhabi</p>
                <p>PHONE: 0501234567</p>
              </div>
            </div>

            {/* Overlay Markers */}
            <div className="absolute top-4 left-4 bg-slate-900/90 border border-emerald-500/40 px-3 py-1 rounded-lg text-[11px] font-mono text-emerald-400">
              PRIVACY SCORE: 82/100 (HIGH RISK)
            </div>

            {isBlurred && (
              <div className="absolute bottom-4 bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                ✓ SENSITIVE IDENTIFIERS BLURRED
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
