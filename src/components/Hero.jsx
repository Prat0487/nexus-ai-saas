import React, { useState } from 'react';
import { Sparkles, ArrowRight, Terminal, Copy } from 'lucide-react';

const HERO_PROMPT_PILLS = [
  {
    label: 'Distributed Cache in Go',
    query: 'Design an LRU Cache in Go with sync.RWMutex and O(1) eviction.',
    preview: `type Cache struct {
    capacity int
    mutex    sync.RWMutex
    items    map[string]*Node
    head, tail *Node
}`
  },
  {
    label: 'Quantum Algorithm Deduction',
    query: 'Explain Shor’s period-finding subroutine with modular exponentiation.',
    preview: `Shor's speedup relies on Quantum Phase Estimation:
1. Superposition of states |x⟩
2. Modular exponentiation f(x) = a^x mod N
3. Quantum Fourier Transform extracts period r in O((log N)^3) time.`
  },
  {
    label: 'Next.js 15 Streaming SSR',
    query: 'Write a React Server Component with Suspense fallback and streaming.',
    preview: `export default async function FeedPage() {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <AsyncMetricsFeed />
    </Suspense>
  );
}`
  }
];

export function Hero({ onOpenStudio, onOpenAuth, onOpenDemo, showToast }) {
  const [selectedPill, setSelectedPill] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(HERO_PROMPT_PILLS[selectedPill].preview);
    setCopied(true);
    showToast('Code snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section">
      <div className="container">
        {/* Announcement Pill */}
        <div className="hero-announcement" onClick={onOpenStudio}>
          <span className="status-dot"></span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Nexus-4 Omni Engine v4.5 is now generally available
          </span>
          <ArrowRight size={14} style={{ color: 'var(--accent-cyan)' }} />
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          The Unified Intelligence Platform for{' '}
          <span className="hero-title-highlight">Modern Engineering</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Nexus AI delivers frontier multimodal models, autonomous agent orchestration, and deep reasoning
          with sub-50ms latency. Drop-in OpenAI SDK compatibility with zero data retention.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <button className="btn btn-primary btn-lg" onClick={onOpenStudio}>
            <Sparkles size={18} />
            <span>Launch Live Studio</span>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => onOpenAuth('signup')}>
            <Terminal size={18} />
            <span>Get Free API Key</span>
          </button>
          <button className="btn btn-outline btn-lg" onClick={onOpenDemo}>
            <span>Book Enterprise Demo</span>
          </button>
        </div>

        {/* Interactive Mini Prompt Inspector inside Hero */}
        <div style={{ maxWidth: '820px', margin: '0 auto 48px', textAlign: 'left' }}>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Header / Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: 'var(--bg-elevated)',
                borderBottom: '1px solid var(--border-dim)',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#f43f5e',
                    display: 'inline-block'
                  }}
                />
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    display: 'inline-block'
                  }}
                />
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block'
                  }}
                />
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-dim)',
                    marginLeft: '8px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  nexus-4-omni • stream=true
                </span>
              </div>

              {/* Prompt selection pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {HERO_PROMPT_PILLS.map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPill(idx)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: selectedPill === idx ? 'var(--accent-cyan-dim)' : 'transparent',
                      color: selectedPill === idx ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      border: selectedPill === idx ? '1px solid rgba(56,189,248,0.4)' : '1px solid transparent',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Preview Body */}
            <div style={{ padding: '20px 24px', background: '#05070c' }}>
              <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    marginTop: '2px'
                  }}
                >
                  Prompt:
                </span>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  "{HERO_PROMPT_PILLS[selectedPill].query}"
                </span>
              </div>

              <div
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-dim)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    ● 42ms TTFT • Streaming Output
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                  >
                    <Copy size={12} />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem',
                    color: '#e2e8f0',
                    lineHeight: '1.5',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {HERO_PROMPT_PILLS[selectedPill].preview}
                </pre>
              </div>
            </div>

            {/* Footer with jump-to-studio action */}
            <div
              style={{
                padding: '10px 20px',
                background: 'var(--bg-surface)',
                borderTop: '1px solid var(--border-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}
            >
              <span>Want to customize temperature, system prompts & streaming?</span>
              <button
                onClick={onOpenStudio}
                style={{
                  color: 'var(--accent-cyan)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Open in Full Studio <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Global Key Metrics Bar */}
        <div className="hero-metrics-bar">
          <div className="metric-item">
            <span className="metric-val">42ms</span>
            <span className="metric-lbl">Avg Time-To-First-Token</span>
          </div>
          <div className="metric-item">
            <span className="metric-val">1,000,000</span>
            <span className="metric-lbl">Token Context Window</span>
          </div>
          <div className="metric-item">
            <span className="metric-val">99.99%</span>
            <span className="metric-lbl">Global Edge Uptime SLA</span>
          </div>
          <div className="metric-item">
            <span className="metric-val">0-Day</span>
            <span className="metric-lbl">Data Retention (SOC2)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
