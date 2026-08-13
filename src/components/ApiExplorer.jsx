import React, { useState } from 'react';
import { Copy, Check, Play, CheckCircle2 } from 'lucide-react';
import { CODE_SNIPPETS } from '../data/mockData';

const LANGUAGES = [
  { key: 'javascript', label: 'TypeScript / Node.js' },
  { key: 'python', label: 'Python SDK' },
  { key: 'curl', label: 'cURL / REST' },
  { key: 'go', label: 'Go SDK' }
];

export function ApiExplorer({ showToast }) {
  const [activeLang, setActiveLang] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState(null);

  const currentSnippet = CODE_SNIPPETS[activeLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    showToast('Code snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestRequest = () => {
    setSimulating(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setSimulating(false);
      setSimulatedResponse({
        status: 200,
        latency: '38ms',
        tokens: 342,
        model: 'nexus-4-omni-v4.5',
        output: 'Distributed cache designed with O(1) sync.RWMutex hash ring and graceful node draining.'
      });
      showToast('Live test completed with HTTP 200 OK!');
    }, 600);
  };

  return (
    <section className="api-explorer-section" id="api">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Developer First</div>
          <h2 className="section-title">One Unified API. Drop-in Everywhere.</h2>
          <p className="section-desc">
            Integrate with native typed SDKs or use your existing OpenAI client library by simply switching the base URL.
          </p>
        </div>

        {/* Code Box Container */}
        <div className="api-box-wrapper">
          {/* Header with Language Tabs & Copy */}
          <div className="api-box-header">
            <div className="language-tabs">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.key}
                  className={`lang-tab ${activeLang === lang.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveLang(lang.key);
                    setSimulatedResponse(null);
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="btn btn-secondary btn-sm" onClick={handleTestRequest} disabled={simulating}>
                {simulating ? (
                  <span>Testing endpoint...</span>
                ) : (
                  <>
                    <Play size={13} style={{ color: 'var(--accent-emerald)' }} />
                    <span>Test Request</span>
                  </>
                )}
              </button>

              <button className="btn btn-ghost btn-sm" onClick={handleCopy}>
                {copied ? (
                  <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> Copied
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Copy size={14} /> Copy
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Code Block */}
          <pre className="code-container">{currentSnippet}</pre>

          {/* Test Live Request Output Simulation Box */}
          {simulatedResponse && (
            <div
              style={{
                padding: '16px 24px',
                background: '#040d1a',
                borderTop: '1px solid rgba(56, 189, 248, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge badge-emerald">
                  <CheckCircle2 size={13} /> HTTP 200 OK
                </span>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Latency: <strong style={{ color: 'var(--accent-cyan)' }}>{simulatedResponse.latency}</strong> • Tokens:{' '}
                  <strong style={{ color: '#fff' }}>{simulatedResponse.tokens}</strong>
                </span>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                "{simulatedResponse.output}"
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
