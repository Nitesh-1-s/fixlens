import React, { useState } from 'react';
import { Camera, Upload, Cpu, ShieldCheck, Wrench, CheckCircle2, Crosshair, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import Logo from './Logo';
import { PRESET_SCENARIOS } from '../data/presets';

export default function UploadCameraEntry({
  onOpenCamera,
  onFileUpload,
  onSelectPreset
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileUpload({ target: { files: [file] } });
    }
  };

  return (
    <div className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
      {/* Precision Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-mono uppercase tracking-wider mb-3">
          <Crosshair className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
          <span>Meta Muse Spark Open · SAM 3.1 Defect Scanner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Hardware & Appliance Diagnostic Copilot
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Snap or upload a photo of any broken machine, car part, or electronic board. AI pinpoints the defect, explains what it is in plain English, and guides you through teardown steps.
        </p>
      </div>

      {/* Main Two Action Cards: Mobile Optimized & Thumb-Friendly */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto w-full mb-6 sm:mb-8">
        {/* Card 1: Camera (Primary Mobile Action) */}
        <div
          onClick={onOpenCamera}
          className="bg-white border-2 border-teal-600/80 hover:border-teal-600 rounded-3xl p-5 sm:p-7 flex flex-col items-center text-center cursor-pointer transition-all active:scale-[0.98] shadow-sm hover:shadow-md group relative overflow-hidden"
        >
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[9px] font-mono font-bold uppercase border border-teal-200">
            Recommended
          </div>

          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 group-hover:bg-teal-100 flex items-center justify-center text-teal-700 transition-colors mb-3">
            <Camera className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono text-teal-700 uppercase tracking-widest font-bold mb-1">
            Real-Time Optical Feed
          </span>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Snap Hardware Photo
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-5 max-w-xs">
            Open full-screen viewfinder to photograph damaged vehicle parts, 3D printers, or PCB electronics.
          </p>

          <button
            type="button"
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>Launch Live Camera</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Card 2: Upload File */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bg-white border-2 ${
            isDragging ? 'border-teal-600 bg-teal-50/20' : 'border-slate-200 hover:border-slate-300'
          } rounded-3xl p-5 sm:p-7 flex flex-col items-center text-center transition-all shadow-xs group`}
        >
          <input
            type="file"
            id="main-file-upload"
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
          />
          <label htmlFor="main-file-upload" className="w-full h-full flex flex-col items-center cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors mb-3">
              <Upload className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold mb-1">
              File Selection
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Upload Image File
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-5 max-w-xs">
              Select existing photos from your phone gallery or desktop files (JPG, PNG, WEBP).
            </p>

            <div className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Browse Photo Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </label>
        </div>
      </div>

      {/* Quick Test with Sample Hardware (Convenient for mobile testers & judges) */}
      {onSelectPreset && (
        <div className="max-w-3xl mx-auto w-full mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Or Test With Sample Hardware Scenarios:
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">1-Tap Preset Demos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="p-2.5 bg-white border border-slate-200 hover:border-teal-400 rounded-xl text-left transition-all hover:bg-teal-50/30 flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={
                      preset.id === 'motherboard'
                        ? '/images/motherboard.png'
                        : preset.id === 'printer3d'
                        ? '/images/printer3d.png'
                        : '/images/automotive.png'
                    }
                    alt={preset.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate group-hover:text-teal-700">
                    {preset.id === 'automotive'
                      ? 'Car Alternator'
                      : preset.id === 'printer3d'
                      ? '3D Printer Hotend'
                      : 'Motherboard VRM'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate font-mono">
                    {preset.parts.length} failure zones
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feature Specs: Engineering Flat Telemetry */}
      <div className="max-w-3xl mx-auto w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center shadow-2xs">
          <Cpu className="w-4 h-4 text-teal-600 mb-1" />
          <span className="text-xs font-bold text-slate-800">Muse Spark Open</span>
          <span className="text-[10px] font-mono text-slate-400">Meta Reasoning Core</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
          <span className="text-xs font-bold text-slate-800">Safety Protocols</span>
          <span className="text-[10px] font-mono text-slate-400">De-energization Checks</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center shadow-2xs">
          <Wrench className="w-4 h-4 text-amber-600 mb-1" />
          <span className="text-xs font-bold text-slate-800">Torque & Tooling</span>
          <span className="text-[10px] font-mono text-slate-400">IPC / OEM Specs</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-teal-600 mb-1" />
          <span className="text-xs font-bold text-slate-800">Live AI Copilot</span>
          <span className="text-[10px] font-mono text-slate-400">Modal Microservice</span>
        </div>
      </div>
    </div>
  );
}
