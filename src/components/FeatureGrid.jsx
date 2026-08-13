import React from 'react';
import { Brain, Zap, Shield, Cpu, Layers, Code2 } from 'lucide-react';
import { FEATURES } from '../data/mockData';

const ICON_MAP = {
  Brain: Brain,
  Zap: Zap,
  Shield: Shield,
  Cpu: Cpu,
  Layers: Layers,
  Code2: Code2
};

export function FeatureGrid() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Enterprise Architecture</div>
          <h2 className="section-title">Built for Mission-Critical Production AI</h2>
          <p className="section-desc">
            Engineered from the silicon up to deliver deterministic reasoning, instant time-to-first-token,
            and complete cryptographic privacy.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="feature-cards-grid">
          {FEATURES.map((feat, idx) => {
            const IconComp = ICON_MAP[feat.icon] || Brain;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-card-header">
                  <div className="feature-icon-box">
                    <IconComp size={22} />
                  </div>
                  <span className="feature-stat-badge">{feat.stat}</span>
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  {feat.tag}
                </span>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
