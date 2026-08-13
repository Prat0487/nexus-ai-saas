import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Brain, 
  Cpu, 
  Activity
} from 'lucide-react';
import { MODELS, PLAYGROUND_PRESETS } from '../data/mockData';

export function Playground({ showToast }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PLAYGROUND_PRESETS[0].id);
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);
  
  const [systemPrompt, setSystemPrompt] = useState(PLAYGROUND_PRESETS[0].systemPrompt);
  const [userPrompt, setUserPrompt] = useState(PLAYGROUND_PRESETS[0].userPrompt);
  
  // Parameter settings
  const [temperature, setTemperature] = useState(0.2);
  const [topP, setTopP] = useState(0.95);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [isStreaming, setIsStreaming] = useState(true);

  // Chat conversation state
  const [conversation, setConversation] = useState([
    {
      role: 'user',
      content: PLAYGROUND_PRESETS[0].userPrompt
    },
    {
      role: 'assistant',
      content: PLAYGROUND_PRESETS[0].response,
      model: MODELS[0].name,
      latency: '39ms',
      tokens: 412,
      cost: '$0.0028'
    }
  ]);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTelemetry, setActiveTelemetry] = useState({
    ttft: '41ms',
    totalTokens: 412,
    tokensPerSec: '124 tok/s'
  });

  const outputEndRef = useRef(null);

  // When selecting a preset from the sidebar
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    const targetModel = MODELS.find((m) => m.id === preset.model) || MODELS[0];
    setSelectedModelId(targetModel.id);
    setSystemPrompt(preset.systemPrompt);
    setUserPrompt(preset.userPrompt);

    setConversation([
      {
        role: 'user',
        content: preset.userPrompt
      },
      {
        role: 'assistant',
        content: preset.response,
        model: targetModel.name,
        latency: targetModel.latency,
        tokens: Math.floor(preset.response.length / 3.8),
        cost: '$0.0024'
      }
    ]);
  };

  // Run generation with simulated streaming tokens
  const handleRunInference = () => {
    if (!userPrompt.trim() || isGenerating) return;

    const currentModel = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];
    const newMsg = { role: 'user', content: userPrompt };

    // Find if we have a matching preset response or generate intelligent dynamic response
    const matchedPreset = PLAYGROUND_PRESETS.find((p) => p.userPrompt.trim().toLowerCase() === userPrompt.trim().toLowerCase());
    
    let targetResponseText = '';
    if (matchedPreset) {
      targetResponseText = matchedPreset.response;
    } else {
      // Dynamic contextual generated mock response
      targetResponseText = `### ${currentModel.name} Analysis & Output

**System Objective:** Processed query with temperature \`${temperature}\` and Top-P \`${topP}\`.

\`\`\`typescript
// Nexus AI Generated Execution Vector
export async function executeNexusTask(input: string) {
  const telemetry = {
    model: "${currentModel.name}",
    contextLength: "${currentModel.contextWindow}",
    timestamp: new Date().toISOString()
  };
  
  console.log("Processing payload:", input);
  return { status: 200, verified: true, payload: input };
}
\`\`\`

#### Verification & Key Takeaways:
1. Low Latency Processing: Evaluated across edge clusters with ${currentModel.latency} TTFT.
2. Context Integrity: Zero-hallucination validation with deterministic structure.
3. Enterprise Compliance: Evaluated under zero data retention encryption protocols.`;
    }

    const estimatedTokens = Math.floor(targetResponseText.length / 3.8);
    const estimatedCost = `$${((estimatedTokens / 1000000) * parseFloat(currentModel.outputPrice.replace(/[^0-9.]/g, ''))).toFixed(4)}`;

    // Add user message immediately
    setConversation((prev) => [
      ...prev,
      newMsg,
      {
        role: 'assistant',
        content: '',
        model: currentModel.name,
        latency: currentModel.latency,
        tokens: estimatedTokens,
        cost: estimatedCost,
        isStreaming: true
      }
    ]);

    setIsGenerating(true);

    // If streaming is enabled, simulate live token emission
    if (isStreaming) {
      let currentIndex = 0;
      const chunkSize = 6;
      const interval = setInterval(() => {
        currentIndex += chunkSize;
        if (currentIndex >= targetResponseText.length) {
          clearInterval(interval);
          setConversation((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            next[lastIdx] = {
              ...next[lastIdx],
              content: targetResponseText,
              isStreaming: false
            };
            return next;
          });
          setIsGenerating(false);
          setActiveTelemetry({
            ttft: currentModel.latency,
            totalTokens: estimatedTokens,
            tokensPerSec: '138 tok/s'
          });
          showToast(`Inference completed in ${currentModel.latency}!`);
        } else {
          setConversation((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            next[lastIdx] = {
              ...next[lastIdx],
              content: targetResponseText.slice(0, currentIndex)
            };
            return next;
          });
        }
      }, 25);
    } else {
      // Non-streaming instant return after 40ms
      setTimeout(() => {
        setConversation((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          next[lastIdx] = {
            ...next[lastIdx],
            content: targetResponseText,
            isStreaming: false
          };
          return next;
        });
        setIsGenerating(false);
        showToast('Inference completed!');
      }, 350);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearHistory = () => {
    setConversation([]);
    showToast('Studio session cleared');
  };

  // Scroll to bottom on updates
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const currentModelObj = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];

  return (
    <section className="playground-section" id="studio">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
              <Sparkles size={12} /> Interactive AI Studio
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Nexus Multi-Engine Playground</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleClearHistory}>
              <RotateCcw size={14} /> Clear Canvas
            </button>
          </div>
        </div>

        {/* 3-Column Studio Workspace */}
        <div className="playground-container">
          {/* Left Column: Preset Templates */}
          <div className="playground-sidebar">
            <span className="sidebar-title">Prompt Templates</span>
            <div className="presets-list">
              {PLAYGROUND_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className={`preset-card ${selectedPresetId === preset.id ? 'active' : ''}`}
                  onClick={() => handleSelectPreset(preset)}
                >
                  <span className="preset-title">{preset.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="preset-badge">{preset.category}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{preset.model}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-dim)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={13} /> Edge Mesh Online
              </span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Streaming enabled across 350+ POP nodes globally.
              </p>
            </div>
          </div>

          {/* Center Column: Interactive Stream & Input Area */}
          <div className="playground-main">
            {/* Header Toolbar */}
            <div className="playground-header">
              {/* Model Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                  className="model-selector-btn"
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                >
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.version}) — {m.category}
                    </option>
                  ))}
                </select>
                <span className="badge badge-emerald">{currentModelObj.badge}</span>
              </div>

              {/* Live Telemetry */}
              <div className="playground-telemetry">
                <div className="telemetry-item">
                  TTFT: <span>{currentModelObj.latency}</span>
                </div>
                <div className="telemetry-item">
                  Speed: <span>{activeTelemetry.tokensPerSec}</span>
                </div>
              </div>
            </div>

            {/* Conversation Stream Output */}
            <div className="playground-output-area">
              {conversation.length === 0 ? (
                <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)' }}>
                  <Brain size={40} style={{ color: 'var(--accent-cyan)', opacity: 0.5, marginBottom: '12px' }} />
                  <p style={{ fontSize: '0.95rem' }}>Select a template from the left or type your prompt below to start inference.</p>
                </div>
              ) : (
                conversation.map((msg, idx) => (
                  <div key={idx} className={`chat-bubble ${msg.role}`}>
                    {msg.role === 'assistant' ? (
                      <div>
                        <div className="ai-bubble-header">
                          <div className="ai-badge">
                            <Cpu size={14} />
                            <span>{msg.model || currentModelObj.name}</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '6px' }}>
                              • {msg.latency || '41ms'} • {msg.tokens || 340} tokens
                            </span>
                          </div>
                          <div className="bubble-actions">
                            <button
                              className="bubble-action-btn"
                              onClick={() => handleCopy(msg.content, idx)}
                            >
                              {copiedIndex === idx ? (
                                <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Check size={13} /> Copied
                                </span>
                              ) : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Copy size={13} /> Copy
                                </span>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Render Message with Code Format Support */}
                        <div style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
                          <pre
                            style={{
                              fontFamily: 'inherit',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {msg.content}
                            {msg.isStreaming && <span className="cursor-blink" />}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                          User Prompt
                        </div>
                        <div style={{ color: 'var(--text-primary)' }}>{msg.content}</div>
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={outputEndRef} />
            </div>

            {/* Input Composer */}
            <div className="playground-input-container">
              <textarea
                className="prompt-textarea"
                placeholder="Type your prompt, instruction, code question or data structure..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                    handleRunInference();
                  }
                }}
              />

              <div className="prompt-actions-bar">
                <span className="prompt-hint">
                  Press <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border-dim)' }}>Ctrl + Enter</kbd> to run
                </span>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    disabled={isGenerating || !userPrompt.trim()}
                    onClick={handleRunInference}
                    style={{ opacity: isGenerating ? 0.7 : 1 }}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles size={16} className="animate-spin" />
                        <span>Streaming...</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Run Inference</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Parameters & Settings */}
          <div className="playground-params">
            <span className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={14} /> Inference Config
            </span>

            {/* System Prompt */}
            <div className="param-group">
              <div className="param-header">
                <span className="param-label">System Instruction</span>
              </div>
              <textarea
                className="system-prompt-box"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Define model behavior, guardrails, and role..."
              />
              <span className="param-desc">Injected before each conversation turn</span>
            </div>

            {/* Temperature Slider */}
            <div className="param-group">
              <div className="param-header">
                <span className="param-label">Temperature</span>
                <span className="param-val">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="param-slider"
              />
              <span className="param-desc">Lower values are deterministic; higher are creative</span>
            </div>

            {/* Top-P Slider */}
            <div className="param-group">
              <div className="param-header">
                <span className="param-label">Top P (Nucleus)</span>
                <span className="param-val">{topP}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="param-slider"
              />
              <span className="param-desc">Cumulative probability cutoff for tokens</span>
            </div>

            {/* Max Output Tokens Slider */}
            <div className="param-group">
              <div className="param-header">
                <span className="param-label">Max Output Tokens</span>
                <span className="param-val">{maxTokens}</span>
              </div>
              <input
                type="range"
                min="256"
                max="4096"
                step="256"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="param-slider"
              />
              <span className="param-desc">Upper limit on generation response size</span>
            </div>

            {/* Stream Toggle */}
            <div className="param-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="param-label" style={{ display: 'block' }}>SSE Streaming</span>
                <span className="param-desc">Server-Sent Events</span>
              </div>
              <button
                className={`btn btn-sm ${isStreaming ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setIsStreaming(!isStreaming)}
              >
                {isStreaming ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
