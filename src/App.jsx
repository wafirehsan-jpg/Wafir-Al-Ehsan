import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Code,
  Globe,
  Users,
  Video,
  Clock,
  Shield,
  Layers,
  CheckCircle,
  Play,
  Zap,
  ChevronRight,
  Send,
  Plus,
  BarChart2,
  FileText,
  Search,
  Palette,
  Sun,
  Moon,
  Check
} from 'lucide-react';

const THEME_PRESETS = [
  { id: 'indigo', label: 'Midnight Indigo', primary: '#6366f1', gradient: 'from-indigo-500 via-violet-500 to-sky-400', badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  { id: 'cyber', label: 'Cyber Teal', primary: '#14b8a6', gradient: 'from-teal-400 via-cyan-500 to-emerald-400', badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  { id: 'purple', label: 'Electric Purple', primary: '#a855f7', gradient: 'from-purple-500 via-fuchsia-500 to-pink-500', badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { id: 'amber', label: 'Royal Amber', primary: '#f59e0b', gradient: 'from-amber-500 via-orange-500 to-yellow-400', badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { id: 'crimson', label: 'Crimson Velvet', primary: '#f43f5e', gradient: 'from-rose-500 via-red-500 to-pink-600', badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
];

export default function App() {
  const [activeRole, setActiveRole] = useState('student');
  const [currentAccount, setCurrentAccount] = useState({
    id: 'usr_student',
    role: 'student',
    name: 'Aaryan Sharma',
    email: 'student@eduverse.ai',
    schoolId: 'sch_1',
    schoolName: 'Global International Academy - Dubai Campus',
    grade: 'Grade 8',
    curriculum: 'NCERT / CBSE & Cambridge IGCSE',
    avatar: '👨‍🎓',
    preferredLanguage: 'English'
  });
  const [activeTab, setActiveTab] = useState('nova_guardian');

  // Theme customization state
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('eduverse_theme') || 'indigo';
  });
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#6366f1');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Nova Chat State
  const [novaInput, setNovaInput] = useState('');
  const [novaMessages, setNovaMessages] = useState([
    {
      sender: 'nova',
      text: `Hello Aaryan! I am **Nova**, your EduVerse AI Guardian. I analyzed your recent Grade 8 Math diagnostic test.

**Diagnostic Insight**:
- **Topic**: Fractions & Rational Operations
- **Baseline Score**: 40% (4/10)
- **Identified Gap**: Converting unlike fractions to a Lowest Common Denominator (LCD).

Would you like to start a 5-minute guided step-by-step practice session and review NCERT Chapter 7 OER notes?`,
      citations: [{ title: 'NCERT Grade 8 Math Textbook - Ch 7 Fractions', url: 'https://ncert.nic.in/textbook.php?hemh1=0-16' }],
      suggestedAction: { type: 'TAKE_FOLLOWUP_QUIZ', label: 'Start Guided Practice & Follow-up Quiz' }
    }
  ]);

  // Data States
  const [improvementRecords, setImprovementRecords] = useState([]);
  const [agentsList, setAgentsList] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [competitionsList, setCompetitionsList] = useState([]);
  const [meetingsList, setMeetingsList] = useState([]);
  const [openAcademy, setOpenAcademy] = useState(null);
  const [procurementInfo, setProcurementInfo] = useState(null);
  const [loadingDemoScenario, setLoadingDemoScenario] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Agent Creation Form State
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentSubject, setNewAgentSubject] = useState('Mathematics');

  // Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('eduverse_theme', selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    fetchAccountData(activeRole);
    fetchDashboardData();
  }, [activeRole]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const fetchAccountData = async (role) => {
    try {
      const res = await fetch(`/api/eduverse/auth/current?role=${role}`);
      const data = await res.json();
      setCurrentAccount(data.account);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [impRes, agtRes, bkRes, clsRes, compRes, mtRes, oaRes, prRes] = await Promise.all([
        fetch('/api/eduverse/improvement-dashboard').then(r => r.json()),
        fetch('/api/eduverse/agents').then(r => r.json()),
        fetch('/api/eduverse/library/search').then(r => r.json()),
        fetch('/api/eduverse/classes').then(r => r.json()),
        fetch('/api/eduverse/competitions').then(r => r.json()),
        fetch('/api/eduverse/meetings').then(r => r.json()),
        fetch('/api/eduverse/open-academy').then(r => r.json()),
        fetch('/api/eduverse/institutional/procurement').then(r => r.json())
      ]);

      setImprovementRecords(impRes.records || []);
      setAgentsList(agtRes || []);
      setBooksList(bkRes.results || []);
      setClassesList(clsRes || []);
      setCompetitionsList(compRes || []);
      setMeetingsList(mtRes || []);
      setOpenAcademy(oaRes || null);
      setProcurementInfo(prRes || null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNovaSend = async (e) => {
    e?.preventDefault();
    if (!novaInput.trim()) return;

    const userText = novaInput.trim();
    setNovaInput('');

    setNovaMessages(prev => [...prev, { sender: 'user', text: userText }]);

    try {
      const res = await fetch('/api/eduverse/nova/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, studentId: currentAccount?.id })
      });
      const data = await res.json();

      setNovaMessages(prev => [
        ...prev,
        {
          sender: 'nova',
          text: data.reply,
          citations: data.citations,
          suggestedAction: data.suggestedAction
        }
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const runDemoScenario = async () => {
    setLoadingDemoScenario(true);
    try {
      const res = await fetch('/api/eduverse/nova/demo-scenario', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`🎉 1-Click Competition Demo Executed!\n\n` +
          `• Baseline Quiz: 40%\n` +
          `• Nova Intervention: NCERT Ch 7 OER Explanation & LCD Practice\n` +
          `• Follow-up Quiz: 80%\n` +
          `• Score Improvement Calculated: +40 Percentage Points!`
        );
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDemoScenario(false);
    }
  };

  const createNewAgent = async (e) => {
    e.preventDefault();
    if (!newAgentName) return;

    try {
      const res = await fetch('/api/eduverse/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAgentName,
          supportedSubject: newAgentSubject,
          creatorRole: activeRole,
          creatorName: currentAccount?.name
        })
      });
      const data = await res.json();
      if (data.success) {
        // Automatically evaluate
        await fetch(`/api/eduverse/agents/${data.agent.id}/evaluate`, { method: 'POST' });
        setNewAgentName('');
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeThemePreset = THEME_PRESETS.find(t => t.id === selectedTheme) || THEME_PRESETS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Top Demo Bar / Role Switcher Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded font-bold border ${activeThemePreset.badgeClass}`}>
            EDUVERSE AI DEMO
          </span>
          <span className="text-slate-300 hidden md:inline">
            Logged in as: <strong className="text-white">{currentAccount?.name}</strong> ({currentAccount?.role?.toUpperCase()})
          </span>
        </div>

        {/* Role Switcher & Theme Customizer */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer font-semibold"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme: {activeThemePreset.label}</span>
            </button>

            {/* Theme Selector Dropdown */}
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl p-2.5 shadow-2xl z-50 space-y-1">
                <p className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">Choose Theme Preset:</p>
                {THEME_PRESETS.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs cursor-pointer ${
                      selectedTheme === theme.id ? 'bg-slate-800 font-bold text-white' : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: theme.primary }} />
                      <span>{theme.label}</span>
                    </div>
                    {selectedTheme === theme.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-slate-500">|</span>

          {/* Role Switcher Buttons */}
          <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Role:</span>
          {['student', 'teacher', 'admin', 'tutor', 'parent'].map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer font-bold ${
                activeRole === role
                  ? 'bg-gradient-to-r ' + activeThemePreset.gradient + ' text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main EduVerse Brand Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${activeThemePreset.gradient} p-[1.5px] shadow-lg`}>
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              EduVerse AI
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${activeThemePreset.badgeClass}`}>
                v2.5 Global Companion
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              One Student. One AI Guardian. Unlimited Possibilities.
            </p>
          </div>
        </div>

        {/* 1-Click Competition Demonstration Trigger */}
        <button
          onClick={runDemoScenario}
          disabled={loadingDemoScenario}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r ${activeThemePreset.gradient} hover:opacity-90 text-white text-xs font-bold shadow-lg transition-all cursor-pointer`}
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{loadingDemoScenario ? 'Running Workflow...' : 'Run 1-Click Judge Demo'}</span>
        </button>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 overflow-x-auto scrollbar-none sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 min-w-max">
          {[
            { id: 'nova_guardian', label: 'Nova AI Guardian', icon: Bot },
            { id: 'improvement_analytics', label: 'Learning Improvement', icon: TrendingUp },
            { id: 'agent_studio', label: 'Agent Studio (No-Code)', icon: Brain },
            { id: 'library', label: 'Global Curricula Library', icon: BookOpen },
            { id: 'open_academy', label: 'Open Academy (Free)', icon: Globe },
            { id: 'classrooms', label: 'Classrooms & Gradebook', icon: Users },
            { id: 'league', label: 'Global League Competitions', icon: Award },
            { id: 'meetings', label: 'Live Learning Meetings', icon: Video },
            { id: 'focus_timer', label: 'Focus Study Timer', icon: Clock },
            { id: 'procurement', label: 'School Admin Portal', icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r ' + activeThemePreset.gradient + ' text-white shadow-md ring-1 ring-white/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Active Tab Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col">

        {/* TAB 1: NOVA AI GUARDIAN */}
        {activeTab === 'nova_guardian' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            {/* Left Context Card */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${activeThemePreset.gradient} flex items-center justify-center font-bold text-xl`}>
                    {currentAccount?.avatar || '👨‍🎓'}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">{currentAccount?.name}</h3>
                    <p className="text-xs text-slate-400">{currentAccount?.grade} • {currentAccount?.curriculum}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Current AI Guardian:</span>
                    <span className="font-bold flex items-center gap-1 text-white">
                      <Sparkles className="w-3.5 h-3.5" /> Nova Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Target Weakness:</span>
                    <span className="text-amber-400 font-bold">Fractions & Rational Operations</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">School Membership:</span>
                    <span className="text-slate-200">{currentAccount?.schoolName || 'Global Academy'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Nova Guardian Cycle Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={runDemoScenario}
                    className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-white font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span>1. Assess & Diagnose Weakness</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setNovaInput('Explain converting unlike fractions with a worked example')}
                    className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span>2. Retrieve OER Textbook & Teach</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('improvement_analytics')}
                    className="w-full text-left p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 text-xs text-emerald-200 font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span>3. View Score Improvement Evidence</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Chat Interface */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[580px] shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${activeThemePreset.gradient} flex items-center justify-center`}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Nova AI Guardian Interface</h3>
                    <p className="text-[11px] text-slate-400">RAG Enabled • Verified OER Library & Agent Tools Connected</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Keyless & Active
                </span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {novaMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r ' + activeThemePreset.gradient + ' text-white rounded-br-none font-medium'
                          : 'bg-slate-800 border border-slate-700/80 text-slate-100 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-700 text-xs">
                          <p className="text-slate-400 font-bold mb-1">📚 Referenced OER Source:</p>
                          {msg.citations.map((c, i) => (
                            <a
                              key={i}
                              href={c.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sky-400 hover:underline block"
                            >
                              • {c.title}
                            </a>
                          ))}
                        </div>
                      )}

                      {msg.suggestedAction && (
                        <button
                          onClick={runDemoScenario}
                          className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Zap className="w-3.5 h-3.5 fill-white" />
                          <span>{msg.suggestedAction.label}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleNovaSend} className="p-3 border-t border-slate-800 flex gap-2 bg-slate-900/90">
                <input
                  type="text"
                  value={novaInput}
                  onChange={(e) => setNovaInput(e.target.value)}
                  placeholder="Ask Nova about math concepts, physics, coding exercises, or homework support..."
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-slate-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
                />
                <button
                  type="submit"
                  className={`bg-gradient-to-r ${activeThemePreset.gradient} text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow-md`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: LEARNING IMPROVEMENT ANALYTICS */}
        {activeTab === 'improvement_analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Evidence-Based Learning Improvement Dashboard
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real measured percentage-point score gains across baseline and follow-up assessments.
                  </p>
                </div>
                <button
                  onClick={runDemoScenario}
                  className={`px-4 py-2 bg-gradient-to-r ${activeThemePreset.gradient} text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Execute New Assessment Reassessment</span>
                </button>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 font-medium">Measured Interventions</span>
                  <p className="text-2xl font-black text-white mt-1">{improvementRecords.length}</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 font-medium">Avg Score Improvement</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">+37.5 Percentage Points</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 font-medium">Top Subject Growth</span>
                  <p className="text-2xl font-black text-white mt-1">Mathematics & STEM</p>
                </div>
              </div>

              {/* Improvement Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Subject & Topic</th>
                      <th className="py-3 px-4">Baseline Score</th>
                      <th className="py-3 px-4">Follow-up Score</th>
                      <th className="py-3 px-4">Measured Improvement</th>
                      <th className="py-3 px-4">Interventions Completed</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {improvementRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-bold text-white">{rec.studentName}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-200 block">{rec.subject}</span>
                          <span className="text-slate-400 text-[11px]">{rec.topic}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-rose-400 font-bold">{rec.baselineScore}%</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{rec.followupScore}%</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                            +{rec.percentagePointImprovement} Points
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {rec.interventionsCompleted?.join(', ')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${activeThemePreset.badgeClass}`}>
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AGENT STUDIO (NO-CODE BUILDER) */}
        {activeTab === 'agent_studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create New Agent Form */}
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-white">
                <Brain className="w-5 h-5" />
                <h3 className="font-extrabold text-white text-base">No-Code Agent Builder</h3>
              </div>
              <p className="text-xs text-slate-400">
                Customize AI Learning Assistants for your school with safety checks and custom prompt logic.
              </p>

              <form onSubmit={createNewAgent} className="space-y-3.5 pt-2">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Agent Name</label>
                  <input
                    type="text"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="e.g. Physics Formula Assistant"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">Supported Subject</label>
                  <select
                    value={newAgentSubject}
                    onChange={(e) => setNewAgentSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-slate-500"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science & Physics</option>
                    <option value="Foreign Languages">Foreign Languages</option>
                    <option value="Coding & Robotics">Coding & Robotics</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 bg-gradient-to-r ${activeThemePreset.gradient} text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md`}
                >
                  Build & Evaluate Agent
                </button>
              </form>
            </div>

            {/* Configured Agents List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Active School Agents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agentsList.map((agt) => (
                  <div key={agt.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{agt.avatar}</span>
                        <div>
                          <h4 className="font-extrabold text-white text-sm">{agt.name}</h4>
                          <p className="text-[11px] text-slate-400">Created by {agt.creatorName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {agt.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      <strong>Subject:</strong> {agt.supportedSubject} • <strong>Target:</strong> {agt.gradeBand}
                    </p>

                    {agt.evalReport && (
                      <div className="bg-slate-950 p-3 rounded-xl text-[11px] space-y-1 text-slate-300 border border-slate-800">
                        <p className="text-emerald-400 font-bold">✓ {agt.evalStatus}</p>
                        <p>• {agt.evalReport.subjectAccuracy}</p>
                        <p>• {agt.evalReport.privacyProtection}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GLOBAL CURRICULA LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Global OER Digital Textbook Library
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Search verified, open educational resources mapped to NCERT, Cambridge, IB, and Common Core standards.
              </p>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search textbook titles, chapter topics, rational numbers, circuits..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
                <button
                  onClick={() => fetchDashboardData()}
                  className={`bg-gradient-to-r ${activeThemePreset.gradient} text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow-md`}
                >
                  Search Library
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booksList.map((bk) => (
                  <div key={bk.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-extrabold text-white text-sm">{bk.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${activeThemePreset.badgeClass}`}>
                        {bk.curriculum}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">Author: {bk.author}</p>
                    <p className="text-xs text-emerald-400 font-semibold">License: {bk.license}</p>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs">
                      <p className="font-bold text-slate-300">Chapters Included:</p>
                      {bk.chapters?.map((ch) => (
                        <div key={ch.chapterNum} className="text-slate-400 text-[11px] pl-2">
                          • <strong>Ch {ch.chapterNum}: {ch.title}</strong> — {ch.summary}
                        </div>
                      ))}
                    </div>

                    <a
                      href={bk.verifiedSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block pt-2 text-xs text-sky-400 hover:underline font-bold"
                    >
                      Open Verified OER Source →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: OPEN ACADEMY */}
        {activeTab === 'open_academy' && openAcademy && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                EduVerse Open Academy (100% Free Learning)
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Learn Foreign Languages, Coding, and Virtual Robotics beyond your normal school syllabus.
              </p>

              {/* Foreign Languages */}
              <div className="mb-6">
                <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider mb-3">
                  🌍 Foreign Languages Coach
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {openAcademy.languages?.map((lang) => (
                    <div key={lang.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <h4 className="font-bold text-white text-xs">{lang.title}</h4>
                        <p className="text-[11px] text-slate-400">{lang.learners.toLocaleString()} active learners • {lang.level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coding Academy */}
              <div className="mb-6">
                <h3 className="text-sm font-extrabold text-purple-300 uppercase tracking-wider mb-3">
                  💻 Coding & Software Engineering Playground
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {openAcademy.coding?.map((c) => (
                    <div key={c.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <h4 className="font-bold text-white text-xs">{c.title}</h4>
                      <p className="text-[11px] text-slate-400">{c.lessons} Interactive Lessons • {c.exercises} Practical Exercises</p>
                      <button
                        onClick={() => alert(`Launching ${c.title} Interactive Code Playground!`)}
                        className={`px-3 py-1.5 bg-gradient-to-r ${activeThemePreset.gradient} text-white text-xs font-bold rounded-lg cursor-pointer`}
                      >
                        Open In-Browser Sandbox
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtual Robotics */}
              <div>
                <h3 className="text-sm font-extrabold text-emerald-300 uppercase tracking-wider mb-3">
                  🤖 Virtual Robotics & Electronics Simulation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {openAcademy.robotics?.map((r) => (
                    <div key={r.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
                      <h4 className="font-bold text-white text-xs">{r.title}</h4>
                      <p className="text-[11px] text-emerald-400">Simulation Supported: Yes</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: CLASSROOMS & GRADEBOOK */}
        {activeTab === 'classrooms' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-indigo-400" />
                Integrated Classrooms & Academic Gradebook
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classesList.map((cls) => (
                  <div key={cls.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-extrabold text-white text-sm">{cls.name}</h3>
                        <p className="text-xs text-slate-400">Teacher: {cls.teacherName}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded border ${activeThemePreset.badgeClass}`}>
                        {cls.enrolledStudentCount} Students
                      </span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl text-xs space-y-1">
                      <p className="text-slate-300"><strong>Recent Teaching Notes:</strong> {cls.recentNotes}</p>
                      <p className="text-amber-400 font-semibold">Next Homework Due: {cls.nextAssignmentDue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: GLOBAL LEAGUE COMPETITIONS */}
        {activeTab === 'league' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-400" />
                EduVerse Global League Academic Competitions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitionsList.map((comp) => (
                  <div key={comp.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-white text-sm">{comp.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {comp.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">Category: {comp.category} • {comp.participatingSchools} Participating Schools</p>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <p className="text-xs font-bold text-slate-300">🏆 Current Season Leaderboard:</p>
                      {comp.topLeaders?.map((ldr) => (
                        <div key={ldr.rank} className="flex justify-between text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg">
                          <span>#{ldr.rank} {ldr.name}</span>
                          <span className="font-mono font-bold text-amber-400">{ldr.score} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: LIVE MEETINGS */}
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-indigo-400" />
                Unified Learning Meetings Calendar (Teams, Meet & Zoom)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meetingsList.map((m) => (
                  <div key={m.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-white text-sm">{m.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${activeThemePreset.badgeClass}`}>
                        {m.provider}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">Host: {m.hostName}</p>
                    <p className="text-xs text-slate-200"><strong>Agenda:</strong> {m.agenda}</p>

                    <div className="bg-slate-900 p-3 rounded-xl text-xs text-slate-300 space-y-1">
                      <p><strong>Pre-meeting Prep:</strong> {m.preMeetingNotes}</p>
                      <p className="text-emerald-400"><strong>Post-meeting AI Summary:</strong> {m.postMeetingAiSummary}</p>
                    </div>

                    <a
                      href={m.joinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`block text-center py-2 bg-gradient-to-r ${activeThemePreset.gradient} text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md`}
                    >
                      Join {m.provider} Session
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: FOCUS TIMER */}
        {activeTab === 'focus_timer' && (
          <div className="max-w-xl mx-auto w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center space-y-6">
            <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-tr ${activeThemePreset.gradient} text-white`}>
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white">Focus Study Room</h2>
              <p className="text-xs text-slate-400">Nova Pomodoro & Deep Study Session</p>
            </div>

            <div className="text-6xl font-black font-mono tracking-wider text-white py-4">
              {formatTimer(timerSeconds)}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setTimerActive(!timerActive)}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${activeThemePreset.gradient} text-white font-bold text-sm cursor-pointer shadow-lg`}
              >
                {timerActive ? 'Pause Session' : 'Start Focus'}
              </button>
              <button
                onClick={() => { setTimerActive(false); setTimerSeconds(1500); }}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* TAB 10: PROCUREMENT & ADMIN PORTAL */}
        {activeTab === 'procurement' && procurementInfo && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-400" />
                  Institutional Procurement & School Administration Console
                </h2>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  {procurementInfo.studentPolicy}
                </p>
              </div>

              {/* Pricing Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {procurementInfo.pricingTiers?.map((tier, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <h3 className="font-extrabold text-white text-xs">{tier.tier}</h3>
                    <p className="text-lg font-black text-white">{tier.annualPrice}</p>
                    <p className="text-[11px] text-slate-400">AI Quota: {tier.aiAllocation}</p>
                  </div>
                ))}
              </div>

              {/* Active Subscribed Schools */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Subscribed Institutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {procurementInfo.schools?.map((sch) => (
                    <div key={sch.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1 text-xs">
                      <h4 className="font-bold text-white flex items-center gap-1.5">
                        <span>{sch.logo}</span> {sch.name}
                      </h4>
                      <p className="text-slate-400">Country: {sch.country} • Curriculum: {sch.curriculum}</p>
                      <p className="text-slate-200 font-medium">Licensed Students: {sch.licensedStudents.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
