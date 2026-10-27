import React, { useState } from 'react';
import {
  Wrench,
  Cpu,
  Layers,
  Settings,
  Upload,
  Key,
  Check,
  Zap,
  ExternalLink,
  Printer,
  Car
} from 'lucide-react';

export const HARDWARE_ICONS = {
  motherboard: Cpu,
  printer3d: Printer,
  automotive: Car
};

export default function Navbar({
  scenarios,
  selectedScenario,
  onSelectScenario,
  onFileUpload,
  apiKey,
  setApiKey
}) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || '');

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <>
      <header className="w-full bg-slate-950/80 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-40 px-6 py-3.5">
        <div className="max-w-[1780px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Meta Track Tag */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Wrench className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  FixLens
                  <span className="text-xs px-2 py-0.5 rounded-md font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    v1.0
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Visual Hardware Diagnostic Copilot • <span className="text-slate-300">SAM 3.1 & Muse Spark</span>
              </p>
            </div>
          </div>

          {/* Preset Scenario Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {scenarios.map((sc) => {
              const Icon = HARDWARE_ICONS[sc.id] || Cpu;
              const isActive = selectedScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => onSelectScenario(sc)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sc.title.split(' ')[0]} {sc.title.split(' ')[1]}
                </button>
              );
            })}

            {/* Custom Upload Button */}
            <label className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap border border-dashed border-slate-700">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upload Custom</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Model Status & API Key Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 text-xs font-mono px-3 py-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">Model:</span>
              <span className="text-cyan-400">muse-spark-open-1026</span>
            </div>

            <button
              onClick={() => setShowKeyModal(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{apiKey ? 'API Key Configured' : 'Configure API Key'}</span>
              {apiKey && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Meta Model API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                Meta Model API / Baseten Key
              </h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              FixLens includes a complete built-in smart simulator with SAM 3.1 & Muse Spark telemetry. You can also paste your live <strong>Meta Model API</strong> or <strong>Baseten API key</strong> below to run direct live cloud inference.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  API Key or Endpoint Token
                </label>
                <input
                  type="password"
                  placeholder="meta_api_... or baseten_key_..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-[11px] text-cyan-300 flex items-start gap-2">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Using preset simulated ground-truth by default. Entering a key will redirect real-time zero-shot prompts to the live backend service.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
