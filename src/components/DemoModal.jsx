import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

export function DemoModal({ isOpen, onClose, showToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [workload, setWorkload] = useState('Production LLM Scale');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Please enter your contact details');
      return;
    }
    setSubmitted(true);
    showToast('Demo request received! Our Solutions Architect will reach out in <15 mins.');
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">
            <Calendar size={18} style={{ color: 'var(--accent-cyan)', display: 'inline', marginRight: '6px' }} />
            {submitted ? 'Demo Scheduled' : 'Book Enterprise Technical Architecture Demo'}
          </h3>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald-dim)',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle2 size={28} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>We'll see you soon, {name}!</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                We sent a calendar invite to <strong>{email}</strong>. Our Principal Systems Architect will walk through latency benchmarks, BYOK KMS security, and custom SLA pricing.
              </p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleClose}>
                Back to Platform
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input
                  type="email"
                  placeholder="elena@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Organization</label>
                <input
                  type="text"
                  placeholder="HyperScale Systems"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary AI Workload</label>
                <select
                  value={workload}
                  onChange={(e) => setWorkload(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="Production LLM Scale">High-Throughput Production LLM (10M+ tokens/day)</option>
                  <option value="Multi-Agent Swarm">Autonomous Multi-Agent Swarm & Tool Calling</option>
                  <option value="Zero Data Retention">SOC2 / HIPAA / Air-Gapped Dedicated Pods</option>
                  <option value="Custom Fine-Tuning">Custom LoRA Fine-Tuning on Proprietary Code</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '12px' }}
              >
                Schedule Technical Architecture Call
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
