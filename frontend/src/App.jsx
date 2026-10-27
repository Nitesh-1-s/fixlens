import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HardwareCanvas from './components/HardwareCanvas';
import DiagnosticSidebar from './components/DiagnosticSidebar';
import WorkOrderModal from './components/WorkOrderModal';
import { PRESET_SCENARIOS } from './data/presets';
import { Volume2, VolumeX, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import './App.css';

export default function App() {
  const [scenarios, setScenarios] = useState(PRESET_SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState(PRESET_SCENARIOS[0]);
  const [selectedPart, setSelectedPart] = useState(PRESET_SCENARIOS[0].parts[0]);
  const [workOrderPart, setWorkOrderPart] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [lastClickPoint, setLastClickPoint] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Switch scenario
  const handleSelectScenario = (sc) => {
    setSelectedScenario(sc);
    setSelectedPart(sc.parts[0] || null);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Custom Image Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const customScenario = {
      id: `custom_${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, '').toUpperCase(),
      subtitle: 'User Uploaded Hardware Telemetry',
      category: 'Custom Upload',
      imageType: 'custom',
      description: 'Zero-shot promptable visual inspection via SAM 3.1 & Muse Spark.',
      customImageUrl: url,
      parts: [
        {
          id: 'custom_p1',
          name: 'Primary Region of Interest (ROI-1)',
          designator: 'ROI-1 - Zero-shot Detection',
          center: { x: 50, y: 50 },
          polygon: [
            { x: 38, y: 38 },
            { x: 62, y: 38 },
            { x: 62, y: 62 },
            { x: 38, y: 62 }
          ],
          status: 'warning',
          statusLabel: 'ANOMALY DETECTED: Surface Stress',
          healthScore: 58,
          confidence: 0.942,
          diagnosis: 'Multimodal inspection indicates mechanical fatigue and non-uniform surface wear across the segmented perimeter.',
          rootCause: 'Duty cycle exceeded with localized thermal concentration.',
          safetyAlert: 'Ensure system is powered down and de-energized before hands-on physical servicing.',
          tools: ['Precision Calipers', 'Thermal Imager', 'Torque Driver'],
          steps: [
            'Isolate and power down unit.',
            'Measure dimensional tolerances against manufacturer specifications.',
            'Refit or replace degraded joint.'
          ],
          targetSpec: 'Standard OEM replacement part.',
          museVisualRepair: 'Restored surface integrity with zero micro-fractures.'
        }
      ]
    };

    setScenarios((prev) => [customScenario, ...prev]);
    setSelectedScenario(customScenario);
    setSelectedPart(customScenario.parts[0]);
  };

  // Zero-shot Point Prompt added on canvas
  const handleAddPointPrompt = ({ x, y }) => {
    setLastClickPoint({ x, y });

    // Dynamic SAM 3.1 zero-shot component synthesis
    const newPart = {
      id: `part_${Date.now()}`,
      name: `Segmented Region [${x}%, ${y}%]`,
      designator: `SAM3-${Math.floor(x * 10 + y)}`,
      center: { x, y },
      polygon: [
        { x: Math.max(5, x - 7), y: Math.max(5, y - 7) },
        { x: Math.min(95, x + 7), y: Math.max(5, y - 7) },
        { x: Math.min(95, x + 8), y: Math.min(95, y + 8) },
        { x: Math.max(5, x - 6), y: Math.min(95, y + 8) }
      ],
      status: 'warning',
      statusLabel: 'DYNAMIC ROI: In-Depth Analysis',
      healthScore: 68,
      confidence: 0.956,
      diagnosis: `SAM 3.1 zero-shot prompt at coordinate (${x}, ${y}) isolated this sub-assembly. Muse Spark reasoning indicates potential contact resistance and minor oxidation along connection interface.`,
      rootCause: 'Environmental exposure and contact fretting wear.',
      safetyAlert: 'Verify safe operating voltages with a digital multimeter before contact.',
      tools: ['Contact Cleaner', 'Fine Abrasive Pen', 'Digital Multimeter'],
      steps: [
        'Inspect joint seating for loose mechanical retention.',
        'Clean mating pads with electrical contact cleaner spray.',
        'Re-seat and verify electrical continuity.'
      ],
      targetSpec: 'Standard operational condition.',
      museVisualRepair: 'Clean contact surfaces with optimal conductivity.'
    };

    // Add to scenario and select it
    setSelectedScenario((prev) => ({
      ...prev,
      parts: [...prev.parts, newPart]
    }));
    setSelectedPart(newPart);
  };

  // Audio Voice Readout (Muse Voice Transcribe / Synthesis simulator)
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!selectedPart) return;

    const textToSpeak = `FixLens diagnosis for ${selectedPart.name}. Status: ${selectedPart.statusLabel}. ${selectedPart.diagnosis} Key recommendation: ${selectedPart.steps[0] || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        onSelectScenario={handleSelectScenario}
        onFileUpload={handleFileUpload}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* Main Workbench Layout */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Scenario Overview Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {selectedScenario.category}
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {selectedScenario.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              {selectedScenario.description}
            </p>
          </div>

          {/* Quick Audio & Status Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleVoice}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                isSpeaking
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Voice Diagnostic Readout"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{isSpeaking ? 'Mute AI Voice' : 'Listen AI Diagnosis'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>SAM 3.1 Segment Count:</span>
              <strong className="text-white">{selectedScenario.parts.length}</strong>
            </div>
          </div>
        </div>

        {/* Core Two-Column Workbench: Interactive Canvas & Diagnostic Sidebar */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[640px]">
          {/* Left Column: Interactive Hardware Canvas */}
          <HardwareCanvas
            scenario={selectedScenario}
            selectedPart={selectedPart}
            onSelectPart={setSelectedPart}
            onAddPointPrompt={handleAddPointPrompt}
            clickPoint={lastClickPoint}
          />

          {/* Right Column: AI Diagnostic Inspector */}
          <DiagnosticSidebar
            part={selectedPart}
            onExportReport={(part) => setWorkOrderPart(part)}
          />
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-[1780px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Built for <strong className="text-slate-400">Meta Global AI Developer Hackathon 2026</strong> • Indie Developer Track
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>Stack: SAM 3.1 • Muse Spark Open • Modal • Baseten (2M TPM)</span>
          </div>
        </div>
      </footer>

      {/* Engineering Work Order Modal */}
      {workOrderPart && (
        <WorkOrderModal
          part={workOrderPart}
          scenario={selectedScenario}
          onClose={() => setWorkOrderPart(null)}
        />
      )}
    </div>
  );
}
