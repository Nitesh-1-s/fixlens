import React, { useEffect, useState } from 'react';
import Logo from './Logo';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    { code: 'SYS.01', label: 'Initializing Vision Diagnostic Pipeline' },
    { code: 'SAM.31', label: 'Allocating Zero-Shot Segmentation Engine' },
    { code: 'META.LLM', label: 'Connecting Baseten 2M TPM: muse-spark-open-1026' },
    { code: 'OPT.CAD', label: 'Calibrating Sub-Pixel Hardware Coordinate Frame' },
    { code: 'READY', label: 'Inspection Workbench Online' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.6;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish?.(), 350);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    const step = Math.min(Math.floor((progress / 100) * logs.length), logs.length - 1);
    setLogIndex(step);
  }, [progress, logs.length]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 select-none">
      {/* Background CAD Calibration Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(#0F172A 1px, transparent 1px), radial-gradient(#0F172A 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      {/* Corner Registration Marks (Industrial Vision Look) */}
      <div className="absolute top-8 left-8 text-slate-300 font-mono text-[10px] tracking-widest hidden sm:block">
        + CORNER_TL [0, 0]
      </div>
      <div className="absolute top-8 right-8 text-slate-300 font-mono text-[10px] tracking-widest hidden sm:block">
        + CORNER_TR [1920, 0]
      </div>
      <div className="absolute bottom-8 left-8 text-slate-300 font-mono text-[10px] tracking-widest hidden sm:block">
        + CORNER_BL [0, 1080]
      </div>
      <div className="absolute bottom-8 right-8 text-slate-300 font-mono text-[10px] tracking-widest hidden sm:block">
        + CORNER_BR [1920, 1080]
      </div>

      {/* Central Module */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Optical Alignment Animation */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Outer Rotating Calibration Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-teal-600/30 animate-spin-slow" />
          
          {/* Inner Reticle Pulse */}
          <div className="absolute inset-2 rounded-full border border-slate-200" />
          
          {/* Primary Logo */}
          <div className="relative z-10 transition-transform duration-300 transform scale-110">
            <Logo size={44} />
          </div>
        </div>

        {/* Brand Lockup */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-600 uppercase">
              System Diagnostics Core
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            FixLens Industrial
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Autonomous Multimodal Hardware Inspection
          </p>
        </div>

        {/* Progress & Monospace Telemetry */}
        <div className="w-full space-y-3">
          {/* Clean Minimal Progress Bar */}
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className="h-full bg-teal-600 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Telemetry Output Line */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
            <div className="flex items-center gap-1.5 truncate max-w-[260px] text-left">
              <span className="text-teal-700 font-bold">[{logs[logIndex].code}]</span>
              <span className="truncate text-slate-600">{logs[logIndex].label}</span>
            </div>
            <span className="font-bold text-slate-800 tabular-nums">
              {Math.min(100, Math.floor(progress))}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
