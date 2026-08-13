import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/mockData';

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Frequently Asked Questions</div>
          <h2 className="section-title">Everything You Need to Know</h2>
          <p className="section-desc">
            Common questions about latency, enterprise security guarantees, data retention, and integration.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp size={18} style={{ color: 'var(--accent-cyan)' }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />
                  )}
                </button>
                {isOpen && <div className="faq-answer">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
