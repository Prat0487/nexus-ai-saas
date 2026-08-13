import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Trusted by Engineering Leaders</div>
          <h2 className="section-title">Powering the Next Wave of Intelligent Software</h2>
          <p className="section-desc">
            See how high-growth startups and Fortune 500 engineering teams rely on Nexus AI for production workloads.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '3px', color: '#f59e0b', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} size={14} fill="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
              </div>

              <div className="author-info">
                <img src={t.avatar} alt={t.author} className="author-avatar" />
                <div>
                  <div className="author-name">{t.author}</div>
                  <div className="author-role">
                    {t.role} • <span style={{ color: 'var(--accent-cyan)' }}>{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
