import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Cpu, ShieldCheck, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

export default function UploadCameraEntry({
  onOpenCamera,
  onFileUpload,
  onSelectPreset,
  presets
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
    <div className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8 flex flex-col justify-center animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Meta Global AI Hackathon · Multimodal Hardware Diagnostic Copilot</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          Hardware Defect & Failure Inspection
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Snap a photo with your camera or upload an image. Meta Muse Spark Open will automatically detect physical failures, provide step-by-step repair instructions, and chat with you live.
        </p>
      </div>

      {/* Main Two Action Cards: Camera & Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full mb-12">
        {/* Card 1: Camera */}
        <div
          onClick={onOpenCamera}
          className="group relative bg-white border-2 border-slate-200 hover:border-teal-500 rounded-3xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="w-20 h-20 rounded-2xl bg-teal-50 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center text-teal-600 transition-colors mb-5 shadow-xs">
            <Camera className="w-10 h-10" />
          </div>
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-2">
            Instant Capture
          </span>
          <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
            Take Photo with Camera
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-xs">
            Use your phone or computer webcam to capture a live photo of any circuit, machine, engine, or appliance.
          </p>
          <button
            type="button"
            className="w-full py-3 px-5 bg-teal-600 group-hover:bg-teal-700 text-white font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Open Live Camera</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: Upload File */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group relative bg-white border-2 ${
            isDragging ? 'border-teal-500 bg-teal-50/20' : 'border-slate-200 hover:border-teal-500'
          } rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}
        >
          <input
            type="file"
            id="main-file-upload"
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
          />
          <label htmlFor="main-file-upload" className="w-full h-full flex flex-col items-center cursor-pointer">
            <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center text-slate-700 group-hover:border-teal-600 transition-colors mb-5 shadow-xs">
              <Upload className="w-10 h-10" />
            </div>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-2">
              File Drop / Browse
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
              Upload Hardware Image
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-xs">
              Drag and drop any high-resolution JPG, PNG, or WEBP photo from your computer or phone library.
            </p>
            <div className="w-full py-3 px-5 bg-slate-900 group-hover:bg-slate-800 text-white font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all">
              <Upload className="w-4 h-4" />
              <span>Browse Image File</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </label>
        </div>
      </div>

      {/* Demo Samples Section */}
      <div className="max-w-4xl mx-auto w-full pt-6 border-t border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Or test with sample hardware:
          </h3>
          <span className="text-[11px] text-teal-600 font-semibold font-mono">
            3 Pre-analyzed Scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {presets.slice(0, 3).map((preset) => {
            const imgSrc =
              preset.id === 'motherboard'
                ? '/images/motherboard.png'
                : preset.id === 'printer3d'
                ? '/images/printer3d.png'
                : '/images/automotive.png';

            return (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="group p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-400 rounded-2xl cursor-pointer transition-all flex items-center gap-3 shadow-xs hover:shadow-md"
              >
                <img
                  src={imgSrc}
                  alt={preset.title}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-semibold text-teal-600 uppercase block truncate">
                    {preset.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-teal-700">
                    {preset.title.split(' ').slice(0, 3).join(' ')}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {preset.parts?.length || 1} components detected
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Pills */}
      <div className="max-w-3xl mx-auto w-full mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-white rounded-xl border border-slate-100 flex flex-col items-center">
          <Cpu className="w-4 h-4 text-teal-600 mb-1.5" />
          <span className="text-[11px] font-bold text-slate-800">Meta Muse Spark</span>
          <span className="text-[9px] text-slate-400">2M TPM Open Model</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-100 flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1.5" />
          <span className="text-[11px] font-bold text-slate-800">Safety Protocols</span>
          <span className="text-[9px] text-slate-400">Hazard Warnings</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-100 flex flex-col items-center">
          <Wrench className="w-4 h-4 text-amber-600 mb-1.5" />
          <span className="text-[11px] font-bold text-slate-800">Step-by-Step</span>
          <span className="text-[9px] text-slate-400">Teardown Checklist</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-100 flex flex-col items-center">
          <CheckCircle2 className="w-4 h-4 text-teal-600 mb-1.5" />
          <span className="text-[11px] font-bold text-slate-800">Interactive Chat</span>
          <span className="text-[9px] text-slate-400">Live AI Copilot</span>
        </div>
      </div>
    </div>
  );
}
