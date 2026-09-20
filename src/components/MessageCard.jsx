import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, Sparkles, Search, Zap, Check, Copy, Layers } from 'lucide-react';

export default function MessageCard({ message }) {
  const [selectedOptionKey, setSelectedOptionKey] = useState('option4'); // Default to Option 4 (Combined)
  const [copied, setCopied] = useState(false);

  if (message.sender === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl rounded-tr-none px-5 py-3.5 shadow-lg shadow-sky-950/20">
          <p className="text-sm md:text-base font-medium leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  const { options } = message;
  if (!options) return null;

  const currentOption = options[selectedOptionKey] || options.option4;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentOption.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getOptionBadgeColor = (key) => {
    switch (key) {
      case 'option1':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'option2':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'option3':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'option4':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20 ring-1 ring-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getOptionIcon = (key) => {
    switch (key) {
      case 'option1':
        return <Bot className="w-4 h-4 text-emerald-400" />;
      case 'option2':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'option3':
        return <Search className="w-4 h-4 text-sky-400" />;
      case 'option4':
        return <Zap className="w-4 h-4 text-purple-400 animate-pulse" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col mb-8 glass-panel rounded-2xl p-4 md:p-6 shadow-xl border border-slate-800/80">
      {/* Top Header with AI Provider Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-purple-500 to-rose-500 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              Wafir AI Response
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono uppercase tracking-wider">
                5 AI Multi-Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Synthesized across ChatGPT, Gemini, Grok, Claude & Perplexity</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Response'}</span>
        </button>
      </div>

      {/* Option Selector Tabs (Options 1, 2, 3, and Option 4 Combined) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {Object.entries(options).map(([key, opt]) => {
          const isActive = selectedOptionKey === key;
          const isCombined = opt.isCombined;

          return (
            <button
              key={key}
              onClick={() => setSelectedOptionKey(key)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? isCombined
                    ? 'bg-purple-950/40 border-purple-500/60 ring-2 ring-purple-500/30 shadow-lg shadow-purple-950/50'
                    : 'bg-slate-800/90 border-sky-500/50 ring-1 ring-sky-500/20 shadow-md'
                  : 'bg-slate-900/40 hover:bg-slate-800/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getOptionBadgeColor(
                    key
                  )}`}
                >
                  {getOptionIcon(key)}
                  {opt.title}
                </span>
                {isCombined && (
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/20 border border-purple-500/30 px-1.5 py-0.5 rounded">
                    ★ Best
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-300 truncate w-full">{opt.aiName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Response View Area */}
      <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80 text-slate-200 text-sm md:text-base leading-relaxed overflow-x-auto">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/60 text-xs font-semibold text-slate-400">
          {getOptionIcon(selectedOptionKey)}
          <span>Showing Output from {currentOption.aiName}</span>
        </div>

        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
          <ReactMarkdown>{currentOption.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
