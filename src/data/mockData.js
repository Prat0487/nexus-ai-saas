export const MODELS = [
  {
    id: 'nexus-4-omni',
    name: 'Nexus-4 Omni',
    version: 'v4.5.2',
    tagline: 'Flagship multimodal reasoning engine with sub-50ms TTFT',
    badge: 'Recommended',
    category: 'Reasoning & Multimodal',
    contextWindow: '1,000,000 tokens',
    latency: '42ms',
    inputPrice: '$1.75 / 1M tokens',
    outputPrice: '$7.00 / 1M tokens',
    benchmarks: {
      mmluPro: 92.4,
      humanEval: 94.8,
      math500: 95.1,
      speedScore: 98
    },
    capabilities: ['Deep Logic', 'Computer Vision', 'Audio Analysis', 'Function Calling', 'JSON Schema Mode'],
    description: 'Our most intelligent model. Solves complex algorithmic challenges, analyzes video and schematics, and coordinates autonomous multi-agent pipelines with unmatched reliability.'
  },
  {
    id: 'nexus-deepreason',
    name: 'Nexus DeepReason Pro',
    version: 'v2.1',
    tagline: 'Chain-of-thought mathematical & logical verification engine',
    badge: 'Best for Logic',
    category: 'Reasoning',
    contextWindow: '256,000 tokens',
    latency: '85ms',
    inputPrice: '$2.50 / 1M tokens',
    outputPrice: '$10.00 / 1M tokens',
    benchmarks: {
      mmluPro: 94.1,
      humanEval: 91.2,
      math500: 98.6,
      speedScore: 84
    },
    capabilities: ['Self-Correction', 'Step-by-Step Reasoning', 'Theorem Proving', 'Complex Architecture', 'Audit Logs'],
    description: 'Designed for mission-critical deductions, smart contract audits, legal document synthesis, and scientific proofs with explicit chain-of-thought verification.'
  },
  {
    id: 'nexus-codecraft',
    name: 'Nexus CodeCraft Turbo',
    version: 'v3.8',
    tagline: 'Specialized low-latency polyglot software engineering model',
    badge: 'Fastest for Code',
    category: 'Coding',
    contextWindow: '512,000 tokens',
    latency: '24ms',
    inputPrice: '$0.80 / 1M tokens',
    outputPrice: '$3.20 / 1M tokens',
    benchmarks: {
      mmluPro: 86.5,
      humanEval: 97.4,
      math500: 89.2,
      speedScore: 99
    },
    capabilities: ['Multi-file Refactoring', 'Test Suite Generation', 'AST Analysis', 'Git Diff Generation', 'Debug Tracing'],
    description: 'Fine-tuned over 2.4 trillion tokens of top-tier repositories. Excels at generating complete production modules, finding subtle concurrency bugs, and auto-writing unit tests.'
  },
  {
    id: 'nexus-vision-ultra',
    name: 'Nexus Vision Ultra',
    version: 'v1.9',
    tagline: 'High-definition visual perception, OCR, and spatial intelligence',
    badge: 'Visual AI',
    category: 'Vision',
    contextWindow: '512,000 tokens',
    latency: '58ms',
    inputPrice: '$1.20 / 1M tokens',
    outputPrice: '$4.80 / 1M tokens',
    benchmarks: {
      mmluPro: 89.7,
      humanEval: 88.0,
      math500: 87.4,
      speedScore: 92
    },
    capabilities: ['Document OCR', 'UI to Code Conversion', 'Diagram Parsing', 'Medical Imaging Preview', 'Spatial Bounding'],
    description: 'Pixel-level visual comprehension. Converts Figma screenshots directly into clean React Tailwind components and extracts structured data from multi-page PDFs.'
  },
  {
    id: 'nexus-flash-lite',
    name: 'Nexus Flash Lite',
    version: 'v5.0',
    tagline: 'Ultra-lightweight edge model for high-throughput semantic search & routing',
    badge: 'Lowest Cost',
    category: 'Low Latency',
    contextWindow: '128,000 tokens',
    latency: '14ms',
    inputPrice: '$0.15 / 1M tokens',
    outputPrice: '$0.60 / 1M tokens',
    benchmarks: {
      mmluPro: 79.2,
      humanEval: 82.5,
      math500: 78.0,
      speedScore: 100
    },
    capabilities: ['Semantic Routing', 'Real-time Chatbots', 'Entity Extraction', 'Content Moderation', 'Summary Streaming'],
    description: 'Engineered for extreme throughput at pennies per million tokens. Delivers instantaneous responses for edge workers, support bots, and live search engines.'
  }
];

export const PLAYGROUND_PRESETS = [
  {
    id: 'code-gen',
    title: 'Distributed Rate Limiter',
    category: 'Coding',
    model: 'nexus-codecraft',
    systemPrompt: 'You are an expert distributed systems architect. Provide production-ready, clean, well-annotated code with concurrency safety.',
    userPrompt: 'Write a thread-safe Redis token bucket rate limiter in TypeScript for high-traffic Node.js microservices with burst capacity handling.',
    response: `Here is a high-performance, atomic Redis token-bucket rate limiter implementing a Lua script to eliminate race conditions under distributed concurrency:

\`\`\`typescript
import Redis from 'ioredis';

export interface RateLimitConfig {
  redis: Redis;
  keyPrefix?: string;
  bucketCapacity: number; // Max burst allowance
  refillRatePerSec: number; // Tokens added per second
}

export class DistributedTokenBucket {
  private redis: Redis;
  private prefix: string;
  private capacity: number;
  private refillRate: number;

  // Atomic Lua script: evaluates tokens based on time elapsed
  private static readonly LUA_SCRIPT = \`
    local key = KEYS[1]
    local capacity = tonumber(ARGV[1])
    local refill_rate = tonumber(ARGV[2])
    local requested = tonumber(ARGV[3])
    local now = tonumber(ARGV[4])

    local data = redis.call("HMGET", key, "tokens", "last_update")
    local tokens = tonumber(data[1])
    local last_update = tonumber(data[2])

    if not tokens then
      tokens = capacity
      last_update = now
    else
      local delta = math.max(0, (now - last_update) / 1000)
      tokens = math.min(capacity, tokens + (delta * refill_rate))
      last_update = now
    end

    if tokens >= requested then
      tokens = tokens - requested
      redis.call("HMSET", key, "tokens", tokens, "last_update", last_update)
      redis.call("EXPIRE", key, math.ceil(capacity / refill_rate) * 2)
      return {1, tokens}
    else
      return {0, tokens}
    end
  \`;

  constructor(config: RateLimitConfig) {
    this.redis = config.redis;
    this.prefix = config.keyPrefix || 'nexus_rl:';
    this.capacity = config.bucketCapacity;
    this.refillRate = config.refillRatePerSec;
  }

  async consume(userId: string, tokens = 1): Promise<{ allowed: boolean; remaining: number }> {
    const key = this.prefix + userId;
    const result = await this.redis.eval(
      DistributedTokenBucket.LUA_SCRIPT,
      1,
      key,
      this.capacity,
      this.refillRate,
      tokens,
      Date.now()
    ) as [number, number];

    return {
      allowed: result[0] === 1,
      remaining: Math.floor(result[1]),
    };
  }
}
\`\`\`

### Key Architectural Benefits:
1. Zero Race Conditions: Atomic Redis evaluation guarantees accuracy across 500+ cluster nodes.
2. Sub-millisecond Execution: Single round-trip evaluated in C inside the Redis engine.
3. Auto-Expiring Keys: Prevents memory leaks by automatically TTL-evicting inactive clients.`
  },
  {
    id: 'deep-reasoning',
    title: 'Financial Risk Deduction',
    category: 'Reasoning',
    model: 'nexus-deepreason',
    systemPrompt: 'You are Nexus DeepReason. Use rigorous step-by-step mathematical logic and structural verification.',
    userPrompt: 'Analyze the liquidity risk profile of a lending pool with $120M collateral, $85M borrowed, dynamic interest curve, and sudden 35% collateral market crash.',
    response: `### Comprehensive Liquidity Risk Assessment

#### 1. Baseline State
- Total Collateral Value (Vc): $120,000,000
- Total Debt (Vd): $85,000,000
- Initial Collateralization Ratio (CR0):
  CR0 = 120M / 85M = 141.17%
- Baseline Health Factor: Margin buffer of 41.17% above par.

---

#### 2. Shock Event Simulation (-35% Collateral Value Drop)
- New Collateral Value (Vc'):
  Vc' = 120M * (1 - 0.35) = $78,000,000
- New Collateralization Ratio (CR'):
  CR' = 78M / 85M = 91.76%

Result: The pool enters an underwater deficit of -$7,000,000 (Bad Debt) immediately if liquidations are not executed atomically during the drop.

---

#### 3. Recommended Automated Mitigation Strategy
1. Dynamic Liquidation Surcharge: Trigger Dutch auction liquidation when individual accounts breach 115% threshold before global insolvency.
2. Dynamic Interest Spike: Increase borrow APR via kink model to 38.5% to incentivize immediate debt repayments.
3. Insurance Fund Backstop: Allocate protocol revenue reserve to absorb the remaining delta with zero LP loss.`
  },
  {
    id: 'vision-parsing',
    title: 'Figma Design to React',
    category: 'Vision',
    model: 'nexus-vision-ultra',
    systemPrompt: 'You are a senior UI engineer who converts UI designs into modular, responsive React code with accessible markup.',
    userPrompt: 'Transform this SaaS analytics card component into clean React + CSS Modules code with responsive grid, sparkline trend indicator, and micro-hover states.',
    response: `Here is the pixel-perfect React component structure extracted from your UI layout:

\`\`\`jsx
import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import styles from './MetricCard.module.css';

export function MetricCard({ title, value, change, timeframe }) {
  const isPositive = change >= 0;

  return (
    <div className={styles.card} tabIndex={0} role="region" aria-label={title}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <button className={styles.iconBtn} aria-label="View details">
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.valueRow}>
          <span className={styles.primaryMetric}>{value}</span>
          <span className={isPositive ? styles.positive : styles.negative}>
            <TrendingUp size={13} />
            {isPositive ? '+' + change + '%' : change + '%'}
          </span>
        </div>
        <span className={styles.subtitle}>{timeframe}</span>
      </div>

      {/* Sparkline Indicator */}
      <div className={styles.sparklineContainer}>
        <svg viewBox="0 0 100 24" className={styles.sparkline}>
          <path
            d="M0 18 Q 20 8, 40 14 T 80 4 T 100 2"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
\`\`\`

Ready to drop straight into your component design system with full keyboard accessibility and dark-mode CSS variables.`
  },
  {
    id: 'agent-workflow',
    title: 'Autonomous Tool Pipeline',
    category: 'Agents',
    model: 'nexus-4-omni',
    systemPrompt: 'You are Nexus Agent Orchestrator. Execute multi-step reasoning, plan tool calls, and summarize results.',
    userPrompt: 'Inspect customer churn risk for account #8821, query Postgres billing history, inspect Zendesk sentiment, and draft an automated VIP retention package.',
    response: `### 🤖 Autonomous Agent Execution Log (3 Tools Called)

\`\`\`json
[Step 1] Executing SQL Query: SELECT mrr, plan, signup_date, payment_failures FROM subscriptions WHERE user_id = 8821;
--> Output: MRR: $1,450/mo | Plan: Enterprise | Failures: 0 | Age: 18 months

[Step 2] Executing Zendesk API: GET /api/v2/tickets?user_id=8821&limit=5
--> Output: 2 tickets in last 14 days regarding "Export timeout on large datasets". Sentiment: Negative / Frustrated.

[Step 3] Executing Model Risk Engine:
--> Churn Probability: 78.4% (Urgency: HIGH)
\`\`\`

---

### Recommended Retention Strategy Generated:
1. Automated VIP Infrastructure Upgrade: Temporarily scale worker concurrency quota from 50 to 200 instances (Cost to serve: +$12/mo).
2. Dedicated Engineer Outreach Email:
   "Hi Alex, our monitoring flagged that your large export jobs hit unexpected latency this week. We have dedicated a priority cluster to your workspace and refunded your last billing cycle as a courtesy."
3. Escalation Notification: Slack ping sent to priority channel.`
  }
];

export const FEATURES = [
  {
    icon: 'Brain',
    title: 'Frontier Reasoning Engine',
    desc: 'Solve multi-step mathematical, algorithmic, and systemic challenges with explicit, verifiable chain-of-thought synthesis and zero hallucinations.',
    stat: '95.1% MATH-500',
    tag: 'Next-Gen Intelligence'
  },
  {
    icon: 'Zap',
    title: 'Sub-50ms Global Edge Latency',
    desc: 'Distributed across 350+ edge points of presence worldwide. Stream tokens to end-users before traditional cloud models even complete their handshake.',
    stat: '42ms TTFT Avg',
    tag: 'Ultra Fast'
  },
  {
    icon: 'Shield',
    title: 'Zero Data Retention & SOC2 Type II',
    desc: 'Your proprietary datasets, code, and customer prompts are never used to train base models. Encrypted end-to-end with customer-managed keys (BYOK).',
    stat: '100% Private',
    tag: 'Enterprise Grade'
  },
  {
    icon: 'Cpu',
    title: 'Autonomous Agent Workflows',
    desc: 'Empower autonomous multi-agent swarms with native dynamic tool calling, deterministic JSON mode, memory compaction, and sandboxed code execution.',
    stat: '50+ Tools / Call',
    tag: 'Agent Swarm'
  },
  {
    icon: 'Layers',
    title: '1,000,000 Token Context Window',
    desc: 'Feed entire enterprise repositories, legal depositions, and hours of video in a single prompt with 99.8% needle-in-a-haystack retrieval accuracy.',
    stat: '1M Context',
    tag: 'Massive Memory'
  },
  {
    icon: 'Code2',
    title: 'Polyglot Native SDKs & API',
    desc: 'Drop-in OpenAI SDK compatibility or use our native typed SDKs for TypeScript, Python, Go, and Rust with full streaming support and automated retries.',
    stat: '1-line Drop-in',
    tag: 'Developer First'
  }
];

export const CODE_SNIPPETS = {
  javascript: `import { NexusAI } from '@nexus-ai/sdk';

const client = new NexusAI({
  apiKey: process.env.NEXUS_API_KEY,
});

// Stream reasoning tokens with sub-50ms latency
const stream = await client.chat.completions.create({
  model: 'nexus-4-omni',
  messages: [
    { role: 'system', content: 'You are an autonomous staff architect.' },
    { role: 'user', content: 'Design a resilient fault-tolerant distributed cache in Go.' }
  ],
  stream: true,
  temperature: 0.2,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`,
  python: `from nexus_ai import NexusClient
import os

client = NexusClient(
    api_key=os.environ.get("NEXUS_API_KEY")
)

# Execute structured JSON extraction with schema guarantee
response = client.chat.complete(
    model="nexus-4-omni",
    messages=[
        {"role": "user", "content": "Extract invoice items from uploaded PDF document."}
    ],
    response_format={"type": "json_object"},
    tools=["pdf_parser", "currency_converter"]
)

print(f"Tokens consumed: {response.usage.total_tokens}")
print(response.choices[0].message.content)`,
  curl: `curl https://api.nexus-ai.com/v1/chat/completions \\
  -H "Authorization: Bearer $NEXUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nexus-4-omni",
    "stream": true,
    "messages": [
      {
        "role": "user",
        "content": "Explain consensus algorithms in 3 bullet points."
      }
    ]
  }'`,
  go: `package main

import (
	"context"
	"fmt"
	"os"

	"github.com/nexus-ai/nexus-go-sdk"
)

func main() {
	client := nexus.NewClient(os.Getenv("NEXUS_API_KEY"))

	resp, err := client.CreateCompletion(context.Background(), &nexus.ChatRequest{
		Model: "nexus-codecraft",
		Messages: []nexus.ChatMessage{
			{Role: "user", Content: "Optimize this SQL query for indexed joins"},
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(resp.Choices[0].Message.Content)
}`
};

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter Developer',
    description: 'Perfect for prototyping, indie hackers, and small experimental builds.',
    monthlyPrice: 0,
    annualPrice: 0,
    badge: 'Free Forever',
    tokenLimit: '500,000 free tokens / mo',
    features: [
      'Access to Nexus Flash Lite & CodeCraft',
      'Up to 60 requests per minute',
      '128k context window limit',
      'Community Discord support',
      'Standard API latency (120ms)',
      '1 active API Key'
    ],
    cta: 'Start Free Sandbox',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Engineer',
    description: 'For production web applications, SaaS startups, and high-frequency workloads.',
    monthlyPrice: 49,
    annualPrice: 39,
    badge: 'Most Popular',
    tokenLimit: '25,000,000 tokens included / mo',
    features: [
      'Full access to Nexus-4 Omni & DeepReason Pro',
      'Sub-50ms ultra-low edge latency',
      '1,000,000 token context window',
      'Unlimited parallel agent tool calling',
      '10 team API keys with granular scopes',
      'Zero data retention & SOC2 privacy',
      'Priority email & Slack support',
      'Overage at $0.0012 / 1k tokens'
    ],
    cta: 'Start 14-Day Free Trial',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Scale',
    description: 'Dedicated infrastructure, custom model fine-tuning, and 99.99% uptime SLA.',
    monthlyPrice: 299,
    annualPrice: 249,
    badge: 'Enterprise',
    tokenLimit: 'Custom volume with volume tiers',
    features: [
      'Dedicated GPU clusters & custom routing',
      'Custom fine-tuned weights & continuous LoRA',
      'BYOK (Bring Your Own Key) KMS encryption',
      '99.99% Uptime SLA with financial backing',
      'Dedicated Solutions Architect & 24/7 Phone SLA',
      'SSO (SAML / Okta), SCIM & RBAC management',
      'Custom invoice billing & PO terms'
    ],
    cta: 'Contact Sales & Architects',
    popular: false
  }
];

export const MOCK_DASHBOARD_DATA = {
  stats: {
    totalRequests: '1,489,240',
    requestsGrowth: '+23.4%',
    tokensConsumed: '42.8M',
    tokensGrowth: '+18.2%',
    avgLatency: '38.4ms',
    latencyChange: '-4.1ms (faster)',
    currentSpend: '$84.20',
    spendBudget: '$250.00',
    spendPercent: 33.6
  },
  apiKeys: [
    {
      id: 'key_prod_9921',
      name: 'Production Next.js Edge Cluster',
      prefix: 'nx_live_9921••••••••••••••••3fa8',
      fullKey: 'nx_live_99218d7f2a1b94e029c54e123fa8',
      created: '3 days ago',
      lastUsed: 'Just now',
      status: 'Active',
      environment: 'Production',
      requests: '1.18M reqs'
    },
    {
      id: 'key_dev_4412',
      name: 'Staging & CI/CD Pipeline',
      prefix: 'nx_test_4412••••••••••••••••99c1',
      fullKey: 'nx_test_4412610d48a1c9ef001188bb99c1',
      created: '2 weeks ago',
      lastUsed: '12 mins ago',
      status: 'Active',
      environment: 'Staging',
      requests: '240.5K reqs'
    },
    {
      id: 'key_agent_7719',
      name: 'Autonomous Support Bot Agent',
      prefix: 'nx_live_7719••••••••••••••••01ea',
      fullKey: 'nx_live_771911aa44ee99bb0022334401ea',
      created: '1 month ago',
      lastUsed: '2 hours ago',
      status: 'Active',
      environment: 'Production',
      requests: '68.7K reqs'
    }
  ],
  recentLogs: [
    {
      id: 'req_881a',
      time: '14:28:02',
      model: 'nexus-4-omni',
      endpoint: '/v1/chat/completions',
      status: 200,
      latency: '41ms',
      tokens: '1,420',
      cost: '$0.0042',
      ip: '104.28.19.44'
    },
    {
      id: 'req_881b',
      time: '14:27:58',
      model: 'nexus-codecraft',
      endpoint: '/v1/chat/completions',
      status: 200,
      latency: '22ms',
      tokens: '840',
      cost: '$0.0018',
      ip: '172.67.14.92'
    },
    {
      id: 'req_881c',
      time: '14:27:30',
      model: 'nexus-deepreason',
      endpoint: '/v1/reasoning/verify',
      status: 200,
      latency: '94ms',
      tokens: '3,890',
      cost: '$0.0152',
      ip: '104.28.19.44'
    },
    {
      id: 'req_881d',
      time: '14:26:15',
      model: 'nexus-flash-lite',
      endpoint: '/v1/embeddings',
      status: 200,
      latency: '12ms',
      tokens: '310',
      cost: '$0.0001',
      ip: '198.51.100.2'
    },
    {
      id: 'req_881e',
      time: '14:25:44',
      model: 'nexus-vision-ultra',
      endpoint: '/v1/vision/analyze',
      status: 200,
      latency: '62ms',
      tokens: '2,150',
      cost: '$0.0084',
      ip: '104.28.19.44'
    }
  ],
  usageByDay: [
    { day: 'Mon', requests: 142000, spend: 11.2 },
    { day: 'Tue', requests: 189000, spend: 14.8 },
    { day: 'Wed', requests: 245000, spend: 19.4 },
    { day: 'Thu', requests: 310000, spend: 24.1 },
    { day: 'Fri', requests: 285000, spend: 22.0 },
    { day: 'Sat', requests: 160000, spend: 12.5 },
    { day: 'Sun', requests: 158240, spend: 12.1 }
  ]
};

export const FAQS = [
  {
    q: 'How does Nexus AI achieve sub-50ms Time To First Token (TTFT)?',
    a: 'Nexus AI operates an optimized custom tensor engine distributed over our proprietary edge hardware mesh across 350+ global datacenters. Speculative decoding, speculative caching, and continuous batching allow instant token emission without cold starts.'
  },
  {
    q: 'Are my enterprise code and prompts used for model training?',
    a: 'No. We enforce a strict Zero Data Retention (ZDR) policy. API data in transit and at rest is never logged for training or evaluation. We also offer Bring-Your-Own-Key (BYOK) encryption for Enterprise customers.'
  },
  {
    q: 'Can I drop Nexus AI into existing OpenAI SDK codebases?',
    a: 'Yes! Nexus AI provides 100% drop-in endpoint compatibility with the OpenAI SDK. Simply set baseURL to https://api.nexus-ai.com/v1 and provide your Nexus API Key.'
  },
  {
    q: 'What happens if our product exceeds the monthly included tokens?',
    a: 'Your applications will never crash or face unexpected hard cutoffs. You can enable automatic scale-protection with configurable spend ceilings, or pay standard low overage rates ($0.0012 per 1k tokens).'
  },
  {
    q: 'Do you offer custom fine-tuning and private model hosting?',
    a: 'Yes. Enterprise tiers include direct access to our AI research engineers to train domain-adapted LoRA adapters or deploy air-gapped dedicated inference pods in your AWS, GCP, or Azure VPC.'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Switching from standard cloud LLMs to Nexus-4 Omni reduced our user-facing code review latency from 3.2s to 380ms. The reasoning quality on complex PRs is genuinely superior.',
    author: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'HyperScale Cloud',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    quote: 'Nexus DeepReason prevented three catastrophic smart contract logic flaws before our mainnet deployment. It is mandatory in our CI/CD security gating.',
    author: 'Marcus Chen',
    role: 'Lead Protocol Architect',
    company: 'Aetherial Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    quote: 'The 1M context window coupled with instant tool calling allowed us to build an autonomous support agent that handles 78% of tier-1 developer inquiries automatically.',
    author: 'Sarah Jenkins',
    role: 'Chief Product Officer',
    company: 'OmniFlow AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];
