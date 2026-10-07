import React, { useState } from 'react';
import { Search, AlertTriangle, Link as LinkIcon, QrCode, ShieldAlert, Check, Copy, Sparkles, ExternalLink } from 'lucide-react';

export default function ScamGuardian() {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'url' | 'qr'
  const [messageInput, setMessageInput] = useState(
    'Congratulations! You have won AED 50,000! Click this link immediately to claim your prize. Your account will expire in 30 minutes.'
  );
  const [urlInput, setUrlInput] = useState('http://pay-verify-uae-portal.xyz/login');
  const [qrImage, setQrImage] = useState('Uploaded QR Code');

  const [scanResult, setScanResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [hoveredPhrase, setHoveredPhrase] = useState(null);

  // 4 Clickable Demo Scenarios
  const demoScenarios = [
    {
      id: 'prize',
      label: '🎁 FAKE PRIZE',
      msg: 'Congratulations! You won AED 50,000! Click immediately to claim!',
      score: 91,
      level: 'HIGH RISK'
    },
    {
      id: 'delivery',
      label: '📦 FAKE DELIVERY',
      msg: 'Your package is waiting. Pay AED 5 to reschedule.',
      score: 78,
      level: 'HIGH RISK'
    },
    {
      id: 'job',
      label: '💼 SUSPICIOUS JOB',
      msg: 'Earn AED 10,000 every week. Send your bank details to apply.',
      score: 94,
      level: 'HIGH RISK'
    },
    {
      id: 'normal',
      label: '✅ NORMAL MESSAGE',
      msg: 'Your football practice has been moved to 5 PM tomorrow.',
      score: 4,
      level: 'LOW RISK'
    }
  ];

  const handleAnalyzeMessage = (msgToAnalyze) => {
    const target = msgToAnalyze || messageInput;
    const lower = target.toLowerCase();

    let score = 8;
    let factors = [];

    if (lower.includes('congratulations') || lower.includes('won') || lower.includes('aed 50,000') || lower.includes('prize')) {
      score += 27;
      factors.push({ name: 'Unexpected prize incentive', points: 27, reason: 'Unsolicited financial lure' });
    }
    if (lower.includes('immediately') || lower.includes('30 minutes') || lower.includes('expire')) {
      score += 24;
      factors.push({ name: 'Urgency & pressure to act', points: 24, reason: 'Disables rational verification' });
    }
    if (lower.includes('click') || lower.includes('link') || lower.includes('http')) {
      score += 22;
      factors.push({ name: 'Suspicious call-to-action link', points: 22, reason: 'Unverified external destination' });
    }
    if (lower.includes('pay') || lower.includes('bank details') || lower.includes('aed 5')) {
      score += 25;
      factors.push({ name: 'Unsolicited payment request', points: 25, reason: 'Financial credentials harvester' });
    }

    score = Math.min(98, score);

    const safeReply = lower.includes('normal')
      ? 'Received, thank you!'
      : "I do not share verification codes or click unverified links. I will contact the organization directly via official channels.";

    setScanResult({
      score,
      riskLevel: score > 75 ? 'CRITICAL' : score > 50 ? 'HIGH' : score > 25 ? 'MODERATE' : 'LOW',
      factors,
      safeReply
    });
  };

  const handleCopyReply = () => {
    if (scanResult?.safeReply) {
      navigator.clipboard.writeText(scanResult.safeReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel-uae border border-amber-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white uppercase tracking-wide">
                  🕵️ SCAM GUARDIAN
                </h1>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono">
                  FRAUD & THREAT DETECTION
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "Detect the warning signs before you click, pay or share."
              </p>
            </div>
          </div>

          {/* Submode Switcher */}
          <div className="mt-4 md:mt-0 flex items-center space-x-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('message')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'message' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              TEXT SCANNER
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'url' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              URL SAFETY
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'qr' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              QR SCANNER
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: TEXT MESSAGE SCAM SCANNER */}
      {activeTab === 'message' && (
        <div className="space-y-6">
          {/* Preset Demo Scenarios */}
          <div className="p-4 rounded-2xl glass-panel border border-slate-800">
            <p className="text-xs font-mono text-slate-400 uppercase mb-3">SELECT DEMO SCENARIOS:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {demoScenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setMessageInput(sc.msg);
                    handleAnalyzeMessage(sc.msg);
                  }}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-amber-400">{sc.label}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{sc.level} ({sc.score}/100)</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input & Phrase Highlighter (7 Cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase mb-2 block">
                  PASTE MESSAGE TO ANALYZE (SMS, WHATSAPP, EMAIL):
                </label>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  rows={5}
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Paste suspicious message..."
                />

                {/* Explainable Interactive Phrase Highlighting */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed">
                  <p className="text-[10px] font-mono text-slate-400 uppercase mb-2">
                    EXPLAINABLE PHRASE HIGHLIGHTING (HOVER FOR WHY FLAGGED):
                  </p>
                  <p className="text-slate-200 font-sans">
                    <span
                      onMouseEnter={() => setHoveredPhrase('Unexpected prize incentive (+27)')}
                      onMouseLeave={() => setHoveredPhrase(null)}
                      className="bg-amber-500/20 text-amber-300 border-b border-amber-500 cursor-pointer px-1 rounded"
                    >
                      "Congratulations! You have won AED 50,000!"
                    </span>{" "}
                    <span
                      onMouseEnter={() => setHoveredPhrase('Suspicious link (+22)')}
                      onMouseLeave={() => setHoveredPhrase(null)}
                      className="bg-rose-500/20 text-rose-300 border-b border-rose-500 cursor-pointer px-1 rounded"
                    >
                      "Click this link immediately"
                    </span>{" "}
                    <span
                      onMouseEnter={() => setHoveredPhrase('Pressure tactic (+24)')}
                      onMouseLeave={() => setHoveredPhrase(null)}
                      className="bg-amber-500/20 text-amber-300 border-b border-amber-500 cursor-pointer px-1 rounded"
                    >
                      "expire in 30 minutes."
                    </span>
                  </p>

                  {hoveredPhrase && (
                    <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/40 text-[11px] font-mono text-amber-300">
                      💡 WHY FLAGGED? {hoveredPhrase}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAnalyzeMessage(messageInput)}
                className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>ANALYZE MESSAGE</span>
              </button>
            </div>

            {/* Results & Safe Action Engine (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
              {scanResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase">PROTOTYPE SCAM RISK</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      scanResult.score > 70 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {scanResult.riskLevel} ({scanResult.score}/100)
                    </span>
                  </div>

                  {/* Factor Breakdown */}
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase mb-2">WHY DID AI FLAG THIS?</p>
                    <div className="space-y-2 font-mono text-xs">
                      {scanResult.factors.map((f, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-300">{f.name}</span>
                          <span className="text-rose-400 font-bold">+{f.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safe Reply Generator */}
                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-bold flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SAFE RESPONSE GENERATOR</span>
                      </span>

                      <button
                        onClick={handleCopyReply}
                        className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center space-x-1"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'COPIED!' : 'COPY SAFE RESPONSE'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-slate-200 font-sans">
                      "{scanResult.safeReply}"
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
                  <ShieldAlert className="w-12 h-12 mb-2 stroke-1" />
                  <p className="text-xs font-mono">Click [ANALYZE MESSAGE] to run explainable threat assessment.</p>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 text-center">
                LABEL: "This is an AI risk assessment, not proof that the message is fraudulent."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: URL SAFETY ANALYSIS */}
      {activeTab === 'url' && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <label className="text-xs font-mono text-slate-400 uppercase block">ENTER SUSPICIOUS URL:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-amber-500"
            />
            <button className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
              ANALYZE URL SAFELY
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
            <p className="text-amber-400 font-bold">🔗 URL RISK ASSESSMENT: HIGH (82/100)</p>
            <p className="text-slate-300">• Suspicious TLD (.xyz detected)</p>
            <p className="text-slate-300">• Lookalike brand pattern (pay-verify-uae)</p>
            <p className="text-slate-300">• HTTPS status: HTTP Unencrypted</p>
            <p className="text-[10px] text-slate-500 italic mt-2">
              "Prototype analysis based on URL characteristics. Website was not automatically opened."
            </p>
          </div>
        </div>
      )}

      {/* MODE 3: QR CODE SCANNER */}
      {activeTab === 'qr' && (
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 text-center">
          <QrCode className="w-16 h-16 mx-auto text-amber-400" />
          <h3 className="text-sm font-black uppercase text-white">📱 QR CODE SAFETY SCANNER</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Extracts destination link in sandbox without opening automatically.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-xs font-mono text-slate-300 max-w-md mx-auto space-y-2">
            <p className="text-emerald-400 font-bold">QR CODE DETECTED</p>
            <p>Destination: <span className="text-amber-300">example.com/payment</span></p>
            <p>Risk: <span className="text-amber-400 font-bold">MEDIUM (58/100)</span></p>
            <p className="text-[10px] text-slate-400">Warning: "Payment destination should be independently verified."</p>
          </div>
        </div>
      )}
    </div>
  );
}
