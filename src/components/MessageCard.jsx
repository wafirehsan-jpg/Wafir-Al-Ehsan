import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bot,
  Sparkles,
  Search,
  Zap,
  Check,
  Copy,
  Layers,
  Code,
  Globe,
  Cpu,
  UserCheck,
  Maximize2,
  Minimize2,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function MessageCard({ message }) {
  const [selectedOptionKey, setSelectedOptionKey] = useState('option4');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [deviceFrame, setDeviceFrame] = useState('desktop'); // desktop, tablet, mobile
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showAllOptions, setShowAllOptions] = useState(false);

  if (message.sender === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-none px-5 py-3.5 shadow-xl shadow-sky-950/40 border border-sky-400/20">
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
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'option2':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'option3':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
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

  const getFrameWidth = () => {
    switch (deviceFrame) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col mb-8 glass-panel rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-800/80 transition-all duration-300 hover:border-slate-700/80">
      {/* Header with AI Meta & Copy */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 via-purple-500 to-rose-500 p-[1.5px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-sky-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              Wafir AI Master Engine
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-sky-300 border border-sky-500/30 font-mono uppercase tracking-wider font-semibold">
                Stitch Multi-Model
              </span>
            </h3>
            <p className="text-xs text-slate-400">Synthesized keylessly from ChatGPT, Gemini, Grok, Claude & Perplexity</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAllOptions(!showAllOptions)}
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>{showAllOptions ? 'Hide Side-by-Side' : 'Split View All'}</span>
            {showAllOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : code ? 'Copy Code' : 'Copy Output'}</span>
          </button>
        </div>
      </div>

      {/* Option Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        {Object.entries(options).map(([key, opt]) => {
          const isActive = selectedOptionKey === key;
          const isCombined = opt.isCombined;

          return (
            <button
              key={key}
              onClick={() => setSelectedOptionKey(key)}
              className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? isCombined
                    ? 'glass-panel-glow ring-2 ring-purple-500/50'
                    : 'glass-panel-active ring-1 ring-sky-500/40'
                  : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${getOptionBadgeColor(
                    key
                  )}`}
                >
                  {getOptionIcon(key)}
                  {opt.title}
                </span>
                {isCombined && (
                  <span className="text-[10px] font-extrabold text-purple-300 bg-purple-500/20 border border-purple-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    ★ Best
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-200 truncate w-full">{opt.aiName}</span>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side View Drawer */}
      {showAllOptions && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(options).map(([key, opt]) => (
            <div key={key} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs leading-relaxed">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  {getOptionIcon(key)} {opt.title} - {opt.aiName}
                </span>
              </div>
              <p className="text-slate-300 line-clamp-4">{opt.content.replace(/#+/g, '')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Output Content Area */}
      <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800/90 text-slate-200 text-sm md:text-base leading-relaxed overflow-x-auto shadow-inner">
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800/80 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-2">
            {getOptionIcon(selectedOptionKey)}
            <span>Active Output View: {currentOption.aiName}</span>
          </div>

          {code && (
            <div className="flex items-center space-x-2">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex items-center space-x-1">
                <button
                  onClick={() => setDeviceFrame('desktop')}
                  className={`p-1 rounded ${deviceFrame === 'desktop' ? 'bg-sky-500 text-slate-950' : 'text-slate-400'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceFrame('tablet')}
                  className={`p-1 rounded ${deviceFrame === 'tablet' ? 'bg-sky-500 text-slate-950' : 'text-slate-400'}`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceFrame('mobile')}
                  className={`p-1 rounded ${deviceFrame === 'mobile' ? 'bg-sky-500 text-slate-950' : 'text-slate-400'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white"
                title="Fullscreen Toggle"
              >
                {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Image Generation Output */}
        {mediaUrls && (
          <div className="mb-5">
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
              <img
                src={mediaUrls[selectedOptionKey] || mediaUrls.option4}
                alt="Wafir AI Generated Render"
                className="w-full h-auto max-h-[500px] object-cover transition-all duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-sky-300 border border-sky-500/30 shadow-lg">
                4K Ultra HD Render
              </div>
            </div>
          </div>
        )}

        {/* Video Generation Output */}
        {videoUrl && selectedOptionKey === 'option4' && (
          <div className="mb-5 rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/90 shadow-2xl">
            <video controls className="w-full h-auto max-h-[450px]">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        )}

        {/* Interactive Website / React App Sandbox Canvas */}
        {code && (
          <div className="mb-5">
            <div className="flex items-center space-x-2 mb-3">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 inline mr-1.5" />
                Live Canvas Sandbox
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Code className="w-3.5 h-3.5 inline mr-1.5" />
                Source Code
              </button>
            </div>

            {activeTab === 'preview' ? (
              <div
                className={`mx-auto rounded-2xl border border-slate-800 overflow-hidden bg-slate-900 transition-all duration-300 shadow-2xl ${getFrameWidth()} ${
                  isFullScreen ? 'fixed inset-4 z-50 h-[calc(100vh-32px)]' : 'h-[420px]'
                }`}
              >
                {artifactType === 'html' ? (
                  <iframe
                    srcDoc={code}
                    title="Website Canvas Preview"
                    className="w-full h-full border-none bg-white"
                  />
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full bg-slate-950">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 p-[1.5px] mb-4 shadow-xl shadow-purple-500/20">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-purple-400 animate-pulse" />
                      </div>
                    </div>
                    <h4 className="text-lg font-extrabold text-white">Interactive React Sandbox</h4>
                    <p className="text-xs text-slate-400 max-w-md mt-1 mb-5 leading-relaxed">
                      Wafir AI generated state machine compiled with zero external key dependencies.
                    </p>
                    <button
                      onClick={() => alert('App Sandbox Executed Successfully!')}
                      className="px-5 py-2.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-xl text-xs shadow-xl shadow-indigo-500/20 cursor-pointer"
                    >
                      Run Application Sandbox
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <pre className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto shadow-inner">
                <code>{code}</code>
              </pre>
            )}
          </div>
        )}

        {/* Autonomous Agent Card */}
        {agentSpec && (
          <div className="mb-5 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-950 border border-purple-500/30 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2">
              <UserCheck className="w-5 h-5 text-purple-400" />
              <h4 className="text-base font-extrabold text-white">{agentSpec.agentName}</h4>
            </div>
            <p className="text-xs text-purple-200 mb-4">{agentSpec.role}</p>
            <div className="flex flex-wrap gap-2">
              {agentSpec.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-3 py-1 rounded-lg bg-purple-500/20 text-purple-200 border border-purple-500/30 font-bold"
                >
                  ✓ {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Markdown Output Text */}
        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
          <ReactMarkdown>{currentOption.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
