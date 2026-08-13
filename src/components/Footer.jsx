import React, { useState } from 'react';
import { Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer({ onOpenDemo, showToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Nexus Research Dispatches!');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="brand-logo" style={{ marginBottom: '8px' }}>
              <div className="logo-icon-wrapper">
                <Cpu size={20} />
              </div>
              <span className="brand-name">
                Nexus<span>AI</span>
              </span>
            </div>
            <p>
              The unified intelligence platform for modern software engineers, enterprise architectures, and autonomous AI agents.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} style={{ marginTop: '16px', maxWidth: '320px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Join 45,000+ AI engineers
              </span>
              {subscribed ? (
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} /> You're on the early access list!
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flexGrow: 1, fontSize: '0.82rem', padding: '8px 12px' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Col 1: Foundation Models */}
          <div className="footer-col">
            <h4>Models</h4>
            <ul>
              <li><a href="#models">Nexus-4 Omni</a></li>
              <li><a href="#models">Nexus DeepReason</a></li>
              <li><a href="#models">Nexus CodeCraft</a></li>
              <li><a href="#models">Nexus Vision Ultra</a></li>
              <li><a href="#models">Nexus Flash Lite</a></li>
            </ul>
          </div>

          {/* Col 2: Developers */}
          <div className="footer-col">
            <h4>Developers</h4>
            <ul>
              <li><a href="#api">API Reference</a></li>
              <li><a href="#api">TypeScript SDK</a></li>
              <li><a href="#api">Python Client</a></li>
              <li><a href="#studio">AI Studio Playground</a></li>
              <li><a href="#pricing">Pricing Calculator</a></li>
            </ul>
          </div>

          {/* Col 3: Enterprise & Trust */}
          <div className="footer-col">
            <h4>Enterprise</h4>
            <ul>
              <li><a href="#faq" onClick={onOpenDemo}>SOC2 Compliance</a></li>
              <li><a href="#faq" onClick={onOpenDemo}>Zero Data Retention</a></li>
              <li><a href="#faq" onClick={onOpenDemo}>BYOK Encryption</a></li>
              <li><a href="#faq" onClick={onOpenDemo}>Dedicated Clusters</a></li>
              <li><a href="#faq" onClick={onOpenDemo}>Book Technical Demo</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Nexus AI Technologies, Inc. All rights reserved.
          </div>

          {/* System Status Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot"></span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              All Systems Operational • 99.99% Edge SLA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
