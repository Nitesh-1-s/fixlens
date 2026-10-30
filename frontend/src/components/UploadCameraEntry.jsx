import React, { useState } from 'react';
import { Camera, Upload, Cpu, ShieldCheck, Wrench, CheckCircle2, Crosshair, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function UploadCameraEntry({
  onOpenCamera,
  onFileUpload
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
    <div className="flex-1 max-w-[1100px] w-full mx-auto px-6 py-10 flex flex-col justify-center">
      {/* Precision Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono uppercase tracking-wider mb-4">
          <Crosshair className="w-3.5 h-3.5 text-teal-600" />
          <span>Industrial Metrology & Physical Failure Diagnostics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Multimodal Hardware Diagnostic Workbench
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          Capture or upload high-resolution hardware imagery. Meta Muse Spark Open analyzes component topology, identifies physical defect mechanisms, and provides sequential teardown procedures.
        </p>
      </div>

      {/* Main Two Action Cards: Flat, Precision Engineering Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full mb-10">
        {/* Card 1: Camera */}
        <div
          onClick={onOpenCamera}
          className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-7 flex flex-col items-center text-center cursor-pointer transition-colors shadow-xs group"
        >
          <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-teal-500 group-hover:bg-teal-50 flex items-center justify-center text-slate-700 group-hover:text-teal-600 transition-colors mb-4">
            <Camera className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
            [SYS.CAM-01]
          </span>
          <h2 className="text-base font-bold text-slate-900 mb-1.5">
            Real-Time Optical Capture
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-xs">
            Initiate live optical feed via camera to isolate PCB circuitry, mechanical actuators, or vehicle assemblies.
          </p>
          <button
            type="button"
            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Open Camera Interface</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Card 2: Upload File */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bg-white border ${
            isDragging ? 'border-teal-600 bg-teal-50/20' : 'border-slate-200 hover:border-teal-600'
          } rounded-2xl p-7 flex flex-col items-center text-center transition-colors shadow-xs group`}
        >
          <input
            type="file"
            id="main-file-upload"
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
          />
          <label htmlFor="main-file-upload" className="w-full h-full flex flex-col items-center cursor-pointer">
            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-teal-500 group-hover:bg-teal-50 flex items-center justify-center text-slate-700 group-hover:text-teal-600 transition-colors mb-4">
              <Upload className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
              [SYS.FILE-02]
            </span>
            <h2 className="text-base font-bold text-slate-900 mb-1.5">
              High-Resolution Image Input
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-xs">
              Load macro photographic files (PNG, JPG, WEBP). Supports direct drag-and-drop or manual file browser selection.
            </p>
            <div className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Browse Image File</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </label>
        </div>
      </div>

      {/* Feature Specs: Engineering Flat Telemetry */}
      <div className="max-w-3xl mx-auto w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
          <Cpu className="w-4 h-4 text-teal-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800">Muse Spark Open</span>
          <span className="text-[10px] font-mono text-slate-400">Meta Reasoning Core</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800">Safety Protocols</span>
          <span className="text-[10px] font-mono text-slate-400">De-energization Checks</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
          <Wrench className="w-4 h-4 text-amber-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800">Torque & Tooling</span>
          <span className="text-[10px] font-mono text-slate-400">IPC / OEM Specs</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
          <CheckCircle2 className="w-4 h-4 text-teal-600 mb-1.5" />
          <span className="text-xs font-bold text-slate-800">Live Copilot Chat</span>
          <span className="text-[10px] font-mono text-slate-400">Modal Microservice</span>
        </div>
      </div>
    </div>
  );
}
