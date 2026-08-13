import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

export function Pricing({ onSelectPlan, onOpenDemo }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [estimatedTokensM, setEstimatedTokensM] = useState(25); // in millions

  // Dynamic token calculator logic
  const calculateDynamicCost = (tokensM) => {
    if (tokensM <= 1) return 0;
    if (tokensM <= 25) return billingCycle === 'annual' ? 39 : 49;
    const extraTokensM = tokensM - 25;
    const base = billingCycle === 'annual' ? 39 : 49;
    const overage = extraTokensM * 1.8; // $1.80 per 1M tokens
    return Math.round(base + overage);
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Predictable & Transparent</div>
          <h2 className="section-title">Scale from Prototype to Trillions of Tokens</h2>
          <p className="section-desc">
            No surprise overage charges. Pay only for what you consume with enterprise volume discounts.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="billing-toggle-container">
          <div className="billing-toggle-btn">
            <button
              className={`billing-opt ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button
              className={`billing-opt ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="pricing-cards-grid">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'featured' : ''}`}>
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '20px'
                    }}
                  >
                    <span className="badge badge-cyan">
                      <Sparkles size={11} /> {plan.badge}
                    </span>
                  </div>
                )}

                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.description}</p>

                  <div className="plan-price-row">
                    <span className="price-currency">$</span>
                    <span className="price-val">{price}</span>
                    <span className="price-period">/ month</span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(56, 189, 248, 0.08)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-block'
                    }}
                  >
                    {plan.tokenLimit}
                  </div>
                </div>

                <ul className="features-list">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <Check size={16} className="feature-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                  style={{ width: '100%' }}
                  onClick={() => (plan.id === 'enterprise' ? onOpenDemo() : onSelectPlan(plan))}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Token Usage Estimator Slider Box */}
        <div className="pricing-calculator-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>
                <Zap size={11} /> Dynamic Token Calculator
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Estimate your monthly infrastructure cost</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Plan Cost</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                ${calculateDynamicCost(estimatedTokensM)}
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 400 }}> / mo</span>
              </div>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="200"
            step="1"
            value={estimatedTokensM}
            onChange={(e) => setEstimatedTokensM(parseInt(e.target.value))}
            className="calculator-slider"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>
              Target Volume: <strong style={{ color: '#fff' }}>{estimatedTokensM} Million Tokens</strong> / month
            </span>
            <span>Includes 99.99% Edge SLA & Zero Data Retention</span>
          </div>
        </div>
      </div>
    </section>
  );
}
