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
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onNewScan}
            className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity"
          >
            <Logo size={24} />
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                FixLens
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide uppercase hidden sm:block">
                Hardware Diagnostic Intelligence
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right Navigation Controls */}
        {!isEntryView ? (
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* New Scan Button */}
            <button
              onClick={onNewScan}
              className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
              title="Start a new scan"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>New Scan</span>
            </button>

            <div className="h-4 w-px bg-slate-200 mx-0.5 hidden xs:block"></div>

            {/* Live Camera Button */}
            <button
              onClick={onOpenCamera}
              className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Capture with Camera"
            >
              <Camera className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Camera</span>
            </button>

            {/* Upload Button */}
            <label className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl text-xs font-medium text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 hover:border-teal-300 whitespace-nowrap shrink-0">
              <Upload className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                className="hidden"
              />
            </label>

            <div className="h-4 w-px bg-slate-200 mx-0.5 hidden md:block"></div>

            {/* AI Status Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 h-9 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Meta AI Online</span>
            </div>

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1 whitespace-nowrap shrink-0"
              title="User Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="hidden sm:inline">Guide</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Quick Demo Hardware Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold text-slate-700 hover:text-teal-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
                title="Test with Sample Hardware without uploading"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Demo Hardware</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showDemoMenu ? 'rotate-180' : ''}`} />
              </button>
              {showDemoMenu && (
                <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fadeIn">
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

            <button
              onClick={onOpenGuide}
              className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1 whitespace-nowrap shrink-0"
              title="User Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="hidden sm:inline">Guide</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
