import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Playground } from './components/Playground';
import { FeatureGrid } from './components/FeatureGrid';
import { ModelMatrix } from './components/ModelMatrix';
import { ApiExplorer } from './components/ApiExplorer';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

// Modals
import { AuthModal } from './components/AuthModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DemoModal } from './components/DemoModal';

import { MOCK_DASHBOARD_DATA } from './data/mockData';

// Styles
import './styles/components.css';
import './styles/playground.css';
import './styles/dashboard.css';
import './App.css';

export default function App() {
  // Navigation View: 'landing' | 'playground' | 'dashboard'
  const [activeView, setActiveView] = useState('landing');

  // User State (Simulated Auth)
  const [user, setUser] = useState({
    email: 'engineer@hypermodern.dev',
    plan: 'Pro Engineer',
    role: 'Lead Architect'
  });

  // API Keys state for the user
  const [apiKeys, setApiKeys] = useState(MOCK_DASHBOARD_DATA.apiKeys);

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup');
  const [createKeyModalOpen, setCreateKeyModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Toast Notification System
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleOpenAuth = (mode = 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out of Nexus AI');
  };

  const handleSelectModelForStudio = (_modelId) => {
    setActiveView('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (plan) => {
    if (!user) {
      handleOpenAuth('signup');
    } else {
      showToast(`Selected ${plan.name} tier. Upgrade active!`);
      setActiveView('dashboard');
    }
  };

  const handleKeyCreated = (newKey) => {
    setApiKeys((prev) => [newKey, ...prev]);
  };

  return (
    <div className="nexus-app">
      {/* Global Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area based on Active View */}
      <main>
        {activeView === 'landing' && (
          <>
            <Hero
              onOpenStudio={() => {
                setActiveView('playground');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAuth={handleOpenAuth}
              onOpenDemo={() => setDemoModalOpen(true)}
              showToast={showToast}
            />

            <FeatureGrid />

            <ModelMatrix onSelectModelForStudio={handleSelectModelForStudio} />

            <ApiExplorer showToast={showToast} />

            <Pricing
              onSelectPlan={handleSelectPlan}
              onOpenDemo={() => setDemoModalOpen(true)}
            />

            <Testimonials />

            <Faq />
          </>
        )}

        {activeView === 'playground' && (
          <Playground showToast={showToast} />
        )}

        {activeView === 'dashboard' && (
          <Dashboard
            onOpenCreateKey={() => setCreateKeyModalOpen(true)}
            showToast={showToast}
            apiKeys={apiKeys}
            setApiKeys={setApiKeys}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDemo={() => setDemoModalOpen(true)}
        showToast={showToast}
      />

      {/* Interactive Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
        showToast={showToast}
      />

      <ApiKeyModal
        isOpen={createKeyModalOpen}
        onClose={() => setCreateKeyModalOpen(false)}
        onKeyCreated={handleKeyCreated}
        showToast={showToast}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        showToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span style={{ color: 'var(--accent-cyan)' }}>✦</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
