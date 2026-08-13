# Nexus AI — The Unified Intelligence Platform

![Nexus AI Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-orange)](https://oxc.rs/)
[![Edge Latency](https://img.shields.io/badge/TTFT-Sub--50ms-10B981)](#)
[![Zero Data Retention](https://img.shields.io/badge/Privacy-SOC2_Type_II-38BDF8)](#)

**Nexus AI** is a state-of-the-art enterprise intelligence platform delivering frontier multimodal foundation models, chain-of-thought reasoning engines, and autonomous multi-agent swarms with sub-50ms Time-To-First-Token (TTFT) and strict zero data retention.

---

## 🌟 Key Features

- ⚡ **Sub-50ms Global Edge Latency**: Distributed across 350+ POP nodes globally with continuous batching and speculative decoding.
- 🧠 **Multi-Engine Foundation Models**:
  - **Nexus-4 Omni (v4.5)**: Flagship multimodal model with 1,000,000 token context window.
  - **Nexus DeepReason Pro (v2.1)**: Verifiable chain-of-thought mathematical & security deduction engine.
  - **Nexus CodeCraft Turbo (v3.8)**: Low-latency polyglot software engineering model.
  - **Nexus Vision Ultra (v1.9)**: Pixel-level UI-to-Code and OCR visual perception.
  - **Nexus Flash Lite (v5.0)**: Extreme throughput semantic routing at ultra-low cost.
- 🛠️ **Interactive AI Studio & Playground**: Live streaming token typewriter simulation, custom system prompt injection, temperature & top-p sliders, and pre-built templates.
- 📊 **Developer Dashboard & Telemetry**: Monitor real-time request volumes, latency histograms, token consumption, and manage cryptographically secure API keys (`nx_live_...` / `nx_test_...`).
- 💎 **Predictable Pricing & Token Calculator**: Interactive monthly slider for dynamic volume discount estimation.
- 🔒 **Enterprise-Ready**: Drop-in OpenAI SDK compatibility, BYOK encryption, and SOC2 Type II compliance.

---

## 🏗️ Project Architecture

```
nexus-ai-saas/
├── index.html                  # HTML5 entry point & typography
├── package.json                # Dependencies (React 19, Lucide, Vite 8, Oxlint)
├── vite.config.js              # Vite React configuration
└── src/
    ├── main.jsx                # React root mount (createRoot)
    ├── App.jsx                 # Main application state & view routing
    ├── App.css                 # Core application transitions
    ├── index.css               # Design system tokens, typography & CSS reset
    ├── data/
    │   └── mockData.js         # Foundation models, presets, benchmarks & telemetry
    ├── components/
    │   ├── Navbar.jsx          # Header navigation & view switcher
    │   ├── Hero.jsx            # Hero section with interactive prompt inspector
    │   ├── Playground.jsx      # Multi-engine interactive AI Studio
    │   ├── FeatureGrid.jsx     # Enterprise architecture capabilities
    │   ├── ModelMatrix.jsx     # Model catalog & benchmark comparison
    │   ├── ApiExplorer.jsx     # Multi-language SDK code viewer (TS, Py, cURL, Go)
    │   ├── Pricing.jsx         # Tier comparison & dynamic token calculator
    │   ├── Dashboard.jsx       # Telemetry metrics, usage histogram & API key manager
    │   ├── Testimonials.jsx    # Enterprise social proof
    │   ├── Faq.jsx             # Accordion FAQ
    │   ├── Footer.jsx          # Footer & live operational status
    │   ├── AuthModal.jsx       # Login/Sign-up with 1-click Demo Login
    │   ├── ApiKeyModal.jsx     # Scoped API key generator modal
    │   └── DemoModal.jsx       # Technical architecture consultation scheduler
    └── styles/
        ├── components.css      # Component design system stylesheets
        ├── playground.css      # Studio streaming & parameters styles
        └── dashboard.css       # Telemetry, chart & key manager styles
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Prat0487/nexus-ai-saas.git
cd nexus-ai-saas
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the local development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Run Linter
```bash
npm run lint
```

---

## 📄 License

MIT © [Nexus AI Technologies](https://github.com/Prat0487/nexus-ai-saas)
