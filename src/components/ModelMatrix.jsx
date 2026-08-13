import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MODELS } from '../data/mockData';

const CATEGORIES = ['All Models', 'Reasoning & Multimodal', 'Reasoning', 'Coding', 'Vision', 'Low Latency'];

export function ModelMatrix({ onSelectModelForStudio }) {
  const [selectedCategory, setSelectedCategory] = useState('All Models');

  const filteredModels = selectedCategory === 'All Models'
    ? MODELS
    : MODELS.filter((m) => m.category === selectedCategory);

  return (
    <section className="models-section" id="models">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Model Catalog</div>
          <h2 className="section-title">Frontier Intelligence for Every Workload</h2>
          <p className="section-desc">
            Compare our fine-tuned foundation models across benchmark scores, latency, context length, and token pricing.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="category-filter-tabs">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Models Grid */}
        <div className="models-grid">
          {filteredModels.map((model) => (
            <div key={model.id} className="model-card">
              <div className="model-card-top">
                <div>
                  <h3 className="model-name">{model.name}</h3>
                  <span className="model-version">{model.version}</span>
                </div>
                <span className="badge badge-cyan">{model.badge}</span>
              </div>

              <p className="model-tagline">{model.tagline}</p>

              {/* Specs Box */}
              <div className="model-metrics-row">
                <div className="model-metric-cell">
                  <span className="model-metric-label">Context Window</span>
                  <span className="model-metric-value">{model.contextWindow}</span>
                </div>
                <div className="model-metric-cell">
                  <span className="model-metric-label">TTFT Latency</span>
                  <span className="model-metric-value">{model.latency}</span>
                </div>
                <div className="model-metric-cell">
                  <span className="model-metric-label">Input Price</span>
                  <span className="model-metric-value">{model.inputPrice}</span>
                </div>
                <div className="model-metric-cell">
                  <span className="model-metric-label">Output Price</span>
                  <span className="model-metric-value">{model.outputPrice}</span>
                </div>
              </div>

              {/* Benchmark Bars */}
              <div className="benchmark-bars">
                <div className="benchmark-row">
                  <span className="benchmark-name">MMLU-Pro</span>
                  <div className="benchmark-track">
                    <div className="benchmark-fill" style={{ width: `${model.benchmarks.mmluPro}%` }} />
                  </div>
                  <span className="benchmark-score">{model.benchmarks.mmluPro}%</span>
                </div>
                <div className="benchmark-row">
                  <span className="benchmark-name">HumanEval</span>
                  <div className="benchmark-track">
                    <div className="benchmark-fill" style={{ width: `${model.benchmarks.humanEval}%` }} />
                  </div>
                  <span className="benchmark-score">{model.benchmarks.humanEval}%</span>
                </div>
                <div className="benchmark-row">
                  <span className="benchmark-name">MATH-500</span>
                  <div className="benchmark-track">
                    <div className="benchmark-fill" style={{ width: `${model.benchmarks.math500}%` }} />
                  </div>
                  <span className="benchmark-score">{model.benchmarks.math500}%</span>
                </div>
              </div>

              {/* Capabilities Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {model.capabilities.map((cap, cIdx) => (
                  <span
                    key={cIdx}
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-dim)'
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {/* Try in Studio Action Button */}
              <button
                className="btn btn-secondary btn-sm"
                style={{ marginTop: 'auto', width: '100%' }}
                onClick={() => onSelectModelForStudio(model.id)}
              >
                <Sparkles size={14} />
                <span>Test in AI Studio</span>
                <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
