import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles } from 'lucide-react';

export function AuthModal({ isOpen, onClose, initialMode = 'signup', onLoginSuccess, showToast }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: email,
        plan: 'Pro Engineer',
        role: 'Admin Developer'
      });
      showToast(mode === 'login' ? 'Successfully signed in!' : 'Account created & $50 test credits unlocked!');
      onClose();
    }, 600);
  };

  const handleGuestDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: 'alex.architect@nexus-ai.dev',
        plan: 'Pro Engineer',
        role: 'Lead Architect'
      });
      showToast('Signed in as Demo Engineer with 10M test credits!');
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">
            {mode === 'login' ? 'Sign In to Nexus AI' : 'Create Free Developer Account'}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Mode Switcher */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-elevated)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              border: '1px solid var(--border-dim)'
            }}
          >
            <button
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: mode === 'signup' ? 'var(--bg-card)' : 'transparent',
                color: mode === 'signup' ? 'var(--accent-cyan)' : 'var(--text-muted)'
              }}
              onClick={() => setMode('signup')}
            >
              Create Account
            </button>
            <button
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: mode === 'login' ? 'var(--bg-card)' : 'transparent',
                color: mode === 'login' ? 'var(--accent-cyan)' : 'var(--text-muted)'
              }}
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
          </div>

          {/* Quick Demo One-Click Access Button */}
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              width: '100%',
              marginBottom: '16px',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(56, 189, 248, 0.06)'
            }}
            onClick={handleGuestDemo}
          >
            <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span>One-Click Instant Demo Login</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '16px 0',
              color: 'var(--text-dim)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border-dim)' }} />
            <span style={{ padding: '0 10px', textTransform: 'uppercase' }}>or with email</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-dim)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '12px' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : mode === 'login' ? (
                <>
                  <LogIn size={16} />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Create Account & Get API Key</span>
                </>
              )}
            </button>
          </form>

          {/* Footnote */}
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '16px' }}>
            By continuing, you agree to Nexus AI’s Terms of Service and SOC2 Zero Data Retention policy.
          </p>
        </div>
      </div>
    </div>
  );
}
