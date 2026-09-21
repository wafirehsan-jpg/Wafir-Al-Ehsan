import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, Sparkles, Search, Zap, Check, Copy, Layers, Code, Play, Image as ImageIcon, Video, Globe, Cpu, UserCheck } from 'lucide-react';

export default function MessageCard({ message }) {
  const [selectedOptionKey, setSelectedOptionKey] = useState('option4');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'code'

  if (message.sender === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-none px-5 py-3.5 shadow-lg shadow-sky-950/30">
          <p className="text-sm md:text-base font-medium leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  const { options, mediaUrls, videoUrl, code, artifactType, agentSpec } = message;
  if (!options) return null;

  const currentOption = options[selectedOptionKey] || options.option4;

  const handleCopy = () => {
    const contentToCopy = code || currentOption.content;
    navigator.clipboard.writeText(contentToCopy);
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
      {/* Header with AI Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-purple-500 to-rose-500 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              Wafir AI Suite Output
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono uppercase tracking-wider">
                Multi-Model Synthesis
              </span>
            </h3>
            <p className="text-xs text-slate-400">ChatGPT, Gemini, Grok, Claude & Perplexity Combined</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : code ? 'Copy Code' : 'Copy Output'}</span>
        </button>
      </div>

      {/* Option Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {Object.entries(options).map(([key, opt]) => {
          const isActive = selectedOptionKey === key;
          const isCombined = opt.isCombined;

          return (
            <button
              key={key}
              onClick={() => setSelectedOptionKey(key)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
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
                    ★ Master
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-300 truncate w-full">{opt.aiName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Output Area */}
      <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80 text-slate-200 text-sm md:text-base leading-relaxed overflow-x-auto">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/60 text-xs font-semibold text-slate-400">
          {getOptionIcon(selectedOptionKey)}
          <span>Showing Output from {currentOption.aiName}</span>
        </div>

        {/* Image Mode Render */}
        {mediaUrls && (
          <div className="mb-4">
            <div className="relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <img
                src={mediaUrls[selectedOptionKey] || mediaUrls.option4}
                alt="Wafir AI Generated Visual"
                className="w-full h-auto max-h-[450px] object-cover transition-all duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-sky-300 border border-slate-700">
                Ultra HD Render
              </div>
            </div>
          </div>
        )}

        {/* Video Mode Render */}
        {videoUrl && selectedOptionKey === 'option4' && (
          <div className="mb-4 rounded-xl border border-slate-800 overflow-hidden bg-slate-900">
            <video controls className="w-full h-auto max-h-[400px]">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support video play.
            </video>
          </div>
        )}

        {/* Website / App Interactive Canvas Preview */}
        {code && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5 inline mr-1" />
                Live Canvas Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5 inline mr-1" />
                Source Code
              </button>
            </div>

            {activeTab === 'preview' ? (
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900 h-[380px]">
                {artifactType === 'html' ? (
                  <iframe
                    srcDoc={code}
                    title="Website Live Canvas"
                    className="w-full h-full border-none"
                  />
                ) : (
                  <div className="p-6 text-center flex flex-col items-center justify-center h-full">
                    <Cpu className="w-10 h-10 text-purple-400 mb-2 animate-bounce" />
                    <h4 className="text-base font-bold text-white">Interactive Web App Sandbox</h4>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
                      React application state machine compiled and ready for execution.
                    </p>
                    <button
                      onClick={() => alert('App sandbox active!')}
                      className="px-4 py-2 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-bold rounded-lg text-xs shadow-lg cursor-pointer"
                    >
                      Run App Sandbox
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto">
                <code>{code}</code>
              </pre>
            )}
          </div>
        )}

        {/* Agent Spec Render */}
        {agentSpec && (
          <div className="mb-4 bg-purple-950/30 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-5 h-5 text-purple-400" />
              <h4 className="text-sm font-bold text-white">{agentSpec.agentName} Configured</h4>
            </div>
            <p className="text-xs text-purple-200 mb-3">{agentSpec.role}</p>
            <div className="flex flex-wrap gap-2">
              {agentSpec.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold"
                >
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Markdown Text Description */}
        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
          <ReactMarkdown>{currentOption.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
