import React from 'react';
import { Cpu, LayoutDashboard, Sparkles, User, LogIn, ChevronRight } from 'lucide-react';

export function Navbar({ activeView, setActiveView, onOpenAuth, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <div className="brand-logo" onClick={() => setActiveView('landing')}>
          <div className="logo-icon-wrapper">
            <Cpu size={20} />
          </div>
          <span className="brand-name">
            Nexus<span>AI</span>
          </span>
        </div>

        {/* View Switcher Pills */}
        <div className="view-pill-group">
          <button
            className={`view-pill ${activeView === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveView('landing')}
          >
            Overview
          </button>
          <button
            className={`view-pill ${activeView === 'playground' ? 'active' : ''}`}
            onClick={() => setActiveView('playground')}
          >
            <Sparkles size={13} style={{ display: 'inline', marginRight: 4 }} />
            AI Studio
          </button>
          <button
            className={`view-pill ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <LayoutDashboard size={13} style={{ display: 'inline', marginRight: 4 }} />
            Dashboard
          </button>
        </div>

        {/* Navigation Links for Landing Page */}
        {activeView === 'landing' && (
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#models" className="nav-link-btn">
                  Models
                </a>
              </li>
              <li>
                <a href="#features" className="nav-link-btn">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#api" className="nav-link-btn">
                  API & SDKs
                </a>
              </li>
              <li>
                <a href="#pricing" className="nav-link-btn">
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Actions */}
        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setActiveView('dashboard')}
              >
                <User size={14} />
                <span>{user.email.split('@')[0]}</span>
              </button>
              <button className="btn btn-ghost btn-sm" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => onOpenAuth('login')}>
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => onOpenAuth('signup')}>
                <span>Get API Key</span>
                <ChevronRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
