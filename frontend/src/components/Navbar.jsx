import React, { useState } from 'react';
import { Upload, ChevronDown, HelpCircle, Camera, ArrowLeft, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({
  scenarios,
  onSelectScenario,
  onFileUpload,
  onOpenGuide,
  onOpenCamera,
  isEntryView,
  onNewScan
}) {
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewScan}
            className="flex items-center gap-2.5 text-left hover:opacity-85 transition-opacity"
          >
            <Logo size={24} />
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

        {/* Center Navigation Controls */}
        {!isEntryView ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onNewScan}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>New Scan</span>
            </button>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            {/* Live Camera Button */}
            <button
              onClick={onOpenCamera}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center gap-1.5"
              title="Capture with Camera"
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
          <div className="flex items-center gap-2">
            {/* Quick Demo Hardware Dropdown for Hackathon Testers */}
            <div className="relative">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-teal-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs"
                title="Test with Sample Hardware without uploading"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Demo Hardware</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showDemoMenu ? 'rotate-180' : ''}`} />
              </button>
              {showDemoMenu && (
                <div className="absolute right-0 sm:left-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1 text-[9px] font-mono uppercase font-bold text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Sample Hardware</span>
                    <span className="text-teal-600">Meta AI</span>
                  </div>
                  {scenarios?.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectScenario(s);
                        setShowDemoMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center justify-between transition-colors"
                    >
                      <span className="truncate font-medium">{s.title}</span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase shrink-0 ml-2">{s.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Meta AI Online</span>
          </div>

          <button
            onClick={onOpenGuide}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1"
            title="User Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
}
