import React, { useState } from 'react';
import { X, Key, Copy, Check, CheckCircle2 } from 'lucide-react';

export function ApiKeyModal({ isOpen, onClose, onKeyCreated, showToast }) {
  const [keyName, setKeyName] = useState('');
  const [environment, setEnvironment] = useState('Production');
  const [generatedKey, setGeneratedKey] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!keyName) {
      showToast('Please enter a name for the API key');
      return;
    }

    const randomHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const prefix = environment === 'Production' ? 'nx_live_' : 'nx_test_';
    const fullKey = `${prefix}${randomHash}`;

    const newKeyObj = {
      id: `key_${Date.now()}`,
      name: keyName,
      prefix: `${fullKey.slice(0, 12)}••••••••••••••••${fullKey.slice(-4)}`,
      fullKey: fullKey,
      created: 'Just now',
      lastUsed: 'Never',
      status: 'Active',
      environment: environment,
      requests: '0 reqs'
    };

    setGeneratedKey(newKeyObj);
    onKeyCreated(newKeyObj);
    showToast('New API key generated successfully!');
  };

  const handleCopy = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey.fullKey);
    setCopied(true);
    showToast('API key copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    setKeyName('');
    setGeneratedKey(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleFinish}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">
            <Key size={18} style={{ color: 'var(--accent-cyan)', display: 'inline', marginRight: '6px' }} />
            {generatedKey ? 'API Key Generated' : 'Create New API Key'}
          </h3>
          <button className="modal-close-btn" onClick={handleFinish}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {generatedKey ? (
            <div>
              <div
                style={{
                  background: 'var(--accent-emerald-dim)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                <CheckCircle2 size={16} />
                <span>Save this key! It will not be shown in full again.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Your Secret Key</label>
                <div
                  style={{
                    background: '#05070c',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem',
                    color: 'var(--accent-cyan)',
                    wordBreak: 'break-all',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <span>{generatedKey.fullKey}</span>
                  <button className="btn btn-ghost btn-sm" onClick={handleCopy}>
                    {copied ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
                onClick={handleFinish}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleGenerate}>
              <div className="form-group">
                <label className="form-label">Key Name / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js Edge Production Worker"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Environment</label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="Production">Production (nx_live_...)</option>
                  <option value="Staging">Staging & CI/CD (nx_test_...)</option>
                  <option value="Development">Local Development</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Permissions & Scopes</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Full Chat & Multimodal Completions
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Embeddings & Vector Search
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> Autonomous Agent Swarm Execution
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '12px' }}
              >
                Generate Secret API Key
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
