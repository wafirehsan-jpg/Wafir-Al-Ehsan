import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CommandCenterDashboard from './components/CommandCenterDashboard';
import PeopleGuardian from './components/guardians/PeopleGuardian';
import ResourceGuardian from './components/guardians/ResourceGuardian';
import PrivacyGuardian from './components/guardians/PrivacyGuardian';
import ScamGuardian from './components/guardians/ScamGuardian';
import AiReasoningCenter from './components/AiReasoningCenter';
import ImpactDashboard from './components/ImpactDashboard';
import AboutUaeArchitecture from './components/AboutUaeArchitecture';
import ExpoDemoModal from './components/ExpoDemoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [showExpoDemo, setShowExpoDemo] = useState(false);

  const handleStartExpoDemo = () => {
    setShowExpoDemo(true);
  };

  const handleSelectGuardian = (guardianId) => {
    setActiveTab(guardianId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen uae-bg grid-pattern text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-slate-950">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartExpoDemo={handleStartExpoDemo}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onEnterDashboard={() => setActiveTab('dashboard')}
            onStartExpoDemo={handleStartExpoDemo}
            onSelectGuardian={handleSelectGuardian}
          />
        )}

        {activeTab === 'dashboard' && (
          <CommandCenterDashboard
            onSelectGuardian={handleSelectGuardian}
            onStartExpoDemo={handleStartExpoDemo}
          />
        )}

        {activeTab === 'people' && <PeopleGuardian />}

        {activeTab === 'resources' && <ResourceGuardian />}

        {activeTab === 'privacy' && <PrivacyGuardian />}

        {activeTab === 'scams' && <ScamGuardian />}

        {activeTab === 'reasoning' && <AiReasoningCenter />}

        {activeTab === 'impact' && <ImpactDashboard />}

        {activeTab === 'about' && <AboutUaeArchitecture />}
      </main>

      {/* 90-Second Expo Demo Modal Overlay */}
      {showExpoDemo && (
        <ExpoDemoModal onClose={() => setShowExpoDemo(false)} />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="text-white font-bold">AI UAE GUARDIAN</span> • BTF AKSI EXPO 2026
          </div>
          <div className="text-emerald-400 font-bold">
            DETECT → EXPLAIN → RECOMMEND → HUMAN DECIDES
          </div>
          <div className="text-slate-400">
            DEMO MODE / PROTOTYPE AI ASSESSMENT
          </div>
        </div>
      </footer>
    </div>
  );
}
