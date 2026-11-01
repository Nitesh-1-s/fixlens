import React, { useState } from 'react';
import { Upload, Key, Check, X, ChevronDown, HelpCircle, Camera, ArrowLeft, Smartphone, Monitor } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({
  scenarios,
  selectedScenario,
  onSelectScenario,
  onFileUpload,
  apiKey,
  setApiKey,
  onOpenGuide,
  onOpenCamera,
  isEntryView,
  onNewScan,
  isPhonePreview,
  onTogglePhonePreview
}) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || '');

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <>
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNewScan}
              className="flex items-center gap-2.5 text-left hover:opacity-85 transition-opacity"
            >
              <Logo size={26} />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                  FixLens
                </h1>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  Hardware Diagnostic Copilot
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Controls when in Inspection Mode */}
          {!isEntryView ? (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onNewScan}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>New Scan</span>
              </button>

              <div className="h-4 w-px bg-slate-200 mx-1"></div>

              {/* Live Camera Button */}
              <button
                onClick={onOpenCamera}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center gap-1.5"
                title="Capture with Webcam / Phone Camera"
              >
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                <span>Camera</span>
              </button>

              {/* Upload */}
              <label className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 hover:border-teal-300">
                <Upload className="w-3.5 h-3.5 text-teal-600" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">
                Multimodal Hardware PWA
              </span>
            </div>
          )}

          {/* Right Action Icons: Phone Mode Switcher, Guide, API Key */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Phone Simulator Mode Toggle (Great for testing & demos on desktop!) */}
            <button
              onClick={onTogglePhonePreview}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isPhonePreview
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Toggle PWA Mobile Phone View"
            >
              {isPhonePreview ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline font-mono text-[11px]">
                {isPhonePreview ? 'Desktop View' : '📱 Mobile PWA'}
              </span>
            </button>

            <button
              onClick={onOpenGuide}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden xs:inline">Guide</span>
            </button>

            <button
              onClick={() => setShowKeyModal(true)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                apiKey
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{apiKey ? 'Connected' : 'API Key'}</span>
              {apiKey && <Check className="w-3 h-3 text-teal-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-teal-600" />
                Configure API Connection
              </h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Paste your <strong className="text-slate-700">Baseten</strong> or <strong className="text-slate-700">Meta Model API</strong> key to enable live cloud inference. The built-in simulator works without a key.
            </p>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Paste your API key here..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 font-mono"
              />

              <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-[11px] text-teal-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 shrink-0"></span>
                Inference endpoint: inference.baseten.co/v1
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
