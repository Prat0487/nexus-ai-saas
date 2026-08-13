import React, { useState } from 'react';
import { 
  Key, 
  Activity, 
  CreditCard, 
  Zap, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Layers,
  RefreshCw,
  Search
} from 'lucide-react';
import { MOCK_DASHBOARD_DATA } from '../data/mockData';

export function Dashboard({ onOpenCreateKey, showToast, apiKeys, setApiKeys }) {
  const [stats] = useState(MOCK_DASHBOARD_DATA.stats);
  const [logs] = useState(MOCK_DASHBOARD_DATA.recentLogs);
  const [revealedKeys, setRevealedKeys] = useState({});
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [searchLogQuery, setSearchLogQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleRevealKey = (id) => {
    setRevealedKeys((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyKey = (keyObj) => {
    navigator.clipboard.writeText(keyObj.fullKey);
    setCopiedKeyId(keyObj.id);
    showToast(`Copied ${keyObj.name} key to clipboard!`);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleRevokeKey = (id) => {
    if (confirm('Are you sure you want to revoke this API key? This action is permanent and will break any services using it.')) {
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
      showToast('API Key revoked successfully');
    }
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Dashboard telemetry synchronized');
    }, 600);
  };

  const filteredLogs = logs.filter((log) => 
    log.model.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
    log.endpoint.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
    log.id.toLowerCase().includes(searchLogQuery.toLowerCase())
  );

  return (
    <section className="dashboard-section">
      <div className="container">
        {/* Dashboard Title & Actions Bar */}
        <div className="dashboard-header-bar">
          <div className="dashboard-title-area">
            <div className="badge badge-emerald" style={{ marginBottom: '6px' }}>
              <ShieldCheck size={12} /> Production Environment
            </div>
            <h1>Developer Workspace & Telemetry</h1>
            <p>Monitor real-time token throughput, API key security, and edge request latency.</p>
          </div>

          <div className="dashboard-actions-group">
            <button className="btn btn-secondary btn-sm" onClick={handleRefreshData} disabled={isRefreshing}>
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh Metrics</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={onOpenCreateKey}>
              <Plus size={14} />
              <span>Create New Key</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="dashboard-stats-grid">
          {/* Card 1 */}
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <div className="dash-stat-icon">
                <Activity size={18} />
              </div>
              <span className="dash-stat-badge positive">{stats.requestsGrowth}</span>
            </div>
            <div className="dash-stat-value">{stats.totalRequests}</div>
            <div className="dash-stat-label">Total API Requests (30d)</div>
          </div>

          {/* Card 2 */}
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <div className="dash-stat-icon" style={{ background: 'var(--accent-emerald-dim)', color: 'var(--accent-emerald)' }}>
                <Zap size={18} />
              </div>
              <span className="dash-stat-badge positive">{stats.tokensGrowth}</span>
            </div>
            <div className="dash-stat-value">{stats.tokensConsumed}</div>
            <div className="dash-stat-label">Total Tokens Processed</div>
          </div>

          {/* Card 3 */}
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <div className="dash-stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)' }}>
                <Layers size={18} />
              </div>
              <span className="dash-stat-badge positive">{stats.latencyChange}</span>
            </div>
            <div className="dash-stat-value">{stats.avgLatency}</div>
            <div className="dash-stat-label">Average Edge TTFT Latency</div>
          </div>

          {/* Card 4 */}
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <div className="dash-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
                <CreditCard size={18} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Budget: {stats.spendBudget}
              </span>
            </div>
            <div className="dash-stat-value">{stats.currentSpend}</div>
            <div className="budget-progress-bar">
              <div className="budget-progress-fill" style={{ width: `${stats.spendPercent}%` }} />
            </div>
            <div className="dash-stat-label">Current Billing Cycle Spend ({stats.spendPercent}%)</div>
          </div>
        </div>

        {/* 2 Main Panels: Usage Chart & API Key Manager */}
        <div className="dashboard-grid-layout">
          {/* Left Panel: 7-Day Request Volume Histogram */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              <h2 className="dash-panel-title">
                <Activity size={18} style={{ color: 'var(--accent-cyan)' }} />
                Weekly Request Volume
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Updated 2 mins ago</span>
            </div>

            <div className="usage-chart-container">
              {MOCK_DASHBOARD_DATA.usageByDay.map((item, idx) => {
                const heightPercent = Math.round((item.requests / 320000) * 100);
                return (
                  <div key={idx} className="chart-bar-group">
                    <div className="chart-bar-wrapper" title={`${item.day}: ${item.requests.toLocaleString()} requests ($${item.spend})`}>
                      <div className="chart-bar-fill" style={{ height: `${heightPercent}%` }} />
                    </div>
                    <span className="chart-bar-label">{item.day}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Peak Day: <strong>Thursday (310,000 reqs)</strong></span>
              <span>Avg Cost: <strong>$16.40 / day</strong></span>
            </div>
          </div>

          {/* Right Panel: Active API Keys Manager */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              <h2 className="dash-panel-title">
                <Key size={18} style={{ color: 'var(--accent-cyan)' }} />
                Active API Keys ({apiKeys.length})
              </h2>
              <button className="btn btn-secondary btn-sm" onClick={onOpenCreateKey}>
                <Plus size={13} />
                <span>New Key</span>
              </button>
            </div>

            <div className="api-keys-list">
              {apiKeys.map((keyObj) => {
                const isRevealed = revealedKeys[keyObj.id];
                return (
                  <div key={keyObj.id} className="api-key-item">
                    <div className="key-info-area">
                      <div className="key-name-row">
                        <span className="key-name">{keyObj.name}</span>
                        <span className="key-env-tag">{keyObj.environment}</span>
                      </div>
                      <div className="key-secret-code">
                        {isRevealed ? keyObj.fullKey : keyObj.prefix}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        Last used: {keyObj.lastUsed} • {keyObj.requests || 'Active'}
                      </span>
                    </div>

                    <div className="key-actions-row">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => toggleRevealKey(keyObj.id)}
                        title={isRevealed ? 'Hide Key' : 'Reveal Key'}
                      >
                        {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>

                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleCopyKey(keyObj)}
                        title="Copy Key"
                      >
                        {copiedKeyId === keyObj.id ? (
                          <Check size={14} style={{ color: 'var(--accent-emerald)' }} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>

                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleRevokeKey(keyObj.id)}
                        style={{ color: 'var(--accent-rose)' }}
                        title="Revoke Key"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Panel: Live Request Telemetry Log Table */}
        <div className="dash-panel">
          <div className="dash-panel-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="dash-panel-title">
              <Activity size={18} style={{ color: 'var(--accent-cyan)' }} />
              Live Request Telemetry Log
            </h2>

            {/* Search filter */}
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                placeholder="Filter by model, endpoint or id..."
                value={searchLogQuery}
                onChange={(e) => setSearchLogQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '32px', fontSize: '0.82rem' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-dim)' }} />
            </div>
          </div>

          <div className="logs-table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Timestamp</th>
                  <th>Model Engine</th>
                  <th>Endpoint</th>
                  <th>Status</th>
                  <th>TTFT Latency</th>
                  <th>Tokens</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {log.id}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{log.time}</td>
                    <td>
                      <span className="badge badge-subtle">{log.model}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{log.endpoint}</td>
                    <td>
                      <span className="status-badge-200">
                        ● {log.status} OK
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {log.latency}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{log.tokens}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{log.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
