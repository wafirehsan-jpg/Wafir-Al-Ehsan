import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Trash2,
  Zap,
  Layers,
  RefreshCw,
  MessageSquare,
  Image as ImageIcon,
  Search,
  Video,
  Globe,
  Smartphone,
  Bot,
  Flame,
  Star
} from 'lucide-react';
import MessageCard from './components/MessageCard.jsx';

export default function App() {
  const [activeMode, setActiveMode] = useState('chat'); // chat, image, research, video, website, app, agent
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('wafir_ai_messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('wafir_ai_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      mode: activeMode,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, mode: activeMode }),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const data = await response.json();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        options: data.options,
        mediaUrls: data.mediaUrls,
        videoUrl: data.videoUrl,
        code: data.code,
        artifactType: data.artifactType,
        agentSpec: data.agentSpec,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        options: {
          option4: {
            id: 'option4',
            title: 'Error',
            aiName: 'Wafir AI Engine',
            isCombined: true,
            badgeColor: 'rose',
            content: '⚠️ An error occurred while generating the output. Please try again.',
          },
        },
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([]);
      localStorage.removeItem('wafir_ai_messages');
    }
  };

  const featureModes = [
    { id: 'chat', label: 'Multi-AI Chat', icon: MessageSquare, badge: '5-in-1' },
    { id: 'image', label: 'Image Generation', icon: ImageIcon, badge: 'DALL-E & Midjourney' },
    { id: 'research', label: 'Deep Research', icon: Search, badge: 'Academic Search' },
    { id: 'video', label: 'Video Generation', icon: Video, badge: 'Sora & Runway' },
    { id: 'website', label: 'Website Creation', icon: Globe, badge: 'v0 & Lovable' },
    { id: 'app', label: 'App Generation', icon: Smartphone, badge: 'React Canvas' },
    { id: 'agent', label: 'Agent Creation', icon: Bot, badge: 'Autonomous' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30">
      {/* Stitch Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 py-3 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-purple-500 to-rose-500 p-[1.5px] shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Wafir AI
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-sky-300 border border-sky-500/30 font-semibold tracking-wider uppercase flex items-center gap-1">
                <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                Google Stitch UI Suite
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Free Keyless Access to Paid AI Features: ChatGPT, Gemini, Grok, Claude, Perplexity & Sora
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-rose-400 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
              title="Clear History"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
        </div>
      </header>

      {/* Multimodal Feature Action Bar */}
      <nav className="bg-slate-900/80 border-b border-slate-800/80 px-4 py-2.5 overflow-x-auto scrollbar-none">
        <div className="max-w-6xl mx-auto flex items-center space-x-2 min-w-max">
          {featureModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/30'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                <span>{mode.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {mode.badge}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 via-purple-500 to-rose-500 p-[2px] mb-6 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-sky-400 animate-pulse" />
              </div>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
              Welcome to <span className="gradient-text">Wafir AI</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mb-8">
              The complete keyless AI workspace combining paid features across ChatGPT, Gemini, Grok, Claude, Perplexity, DALL-E, Sora, v0, and custom Autonomous Agents.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full text-left">
              <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>5-in-1 Multi-AI Synthesis</span>
                </div>
                <p className="text-xs text-slate-400">
                  Compare 3 top AI responses + Option 4 combined master synthesis.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20">
                <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold mb-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>Website & App Creator</span>
                </div>
                <p className="text-xs text-purple-200/80">
                  Generate full HTML/CSS websites and React apps with live canvas preview.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold mb-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Image & Video Studio</span>
                </div>
                <p className="text-xs text-slate-400">
                  Ultra-HD image renders and Sora video generation with zero paid keys.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-6">
            {messages.map((msg) => (
              <MessageCard key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex items-center space-x-3 text-slate-400 glass-panel p-4 rounded-2xl border border-slate-800 w-fit">
                <RefreshCw className="w-5 h-5 text-sky-400 animate-spin" />
                <span className="text-xs md:text-sm font-medium">
                  Processing across ChatGPT, Gemini, Grok, Claude & Perplexity ({activeMode} mode)...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Bar */}
      <footer className="sticky bottom-0 z-40 glass-panel border-t border-slate-800/80 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask Wafir AI in ${activeMode.toUpperCase()} mode... (e.g. Build a landing page, generate a cyberpunk artwork, research AI trends)`}
            className="flex-1 bg-slate-900/90 border border-slate-700/80 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3 text-sm md:text-base text-slate-100 placeholder-slate-500 outline-none transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:opacity-90 disabled:opacity-40 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}
