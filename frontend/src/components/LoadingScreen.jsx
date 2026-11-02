import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const steps = [
    'Initializing optical metrology core...',
    'Calibrating SAM-3.1 spatial segmentation...',
    'Connecting Meta Muse Spark Open (2M TPM)...',
    'Hardware Copilot Ready'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.8;
        if (next >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => onFinish?.(), 450);
          return 100;
        }
        return next;
      });
    }, 24);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    const idx = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setLogIndex(idx);
  }, [progress, steps.length]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 select-none transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Background CAD Dot Matrix */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#0F172A 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Optical Aperture Reticle Animation */}
        <div className="relative w-28 h-28 mb-7 flex items-center justify-center">
          {/* Outer Rotating Calibration Ring with Crosshair Ticks */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-600/30 animate-spin-slow" />
          
          {/* Reverse Rotating Counter Ring */}
          <div className="absolute inset-2.5 rounded-full border border-dotted border-slate-300 animate-spin-reverse" />
          
          {/* Camera Aperture Hexagon Reticle */}
          <div className="absolute inset-5 rounded-2xl border border-teal-500/40 rotate-45 animate-pulse-lens" />

          {/* Central Optical Sensor Glow */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-600/25 flex items-center justify-center">
            {/* Precision Lens Shutter SVG */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v3" />
              <path d="M12 18v3" />
              <path d="M3 12h3" />
              <path d="M18 12h3" />
              <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Unique FIXLENS Brand Typography with Laser Scan Beam */}
        <div className="relative mb-6">
          <div className="relative inline-flex items-center justify-center overflow-hidden px-4 py-1">
            <h1 className="text-4xl sm:text-5xl font-black tracking-[0.22em] select-none uppercase">
              <span className="text-slate-900 drop-shadow-xs">FIX</span>
              <span className="text-teal-600 drop-shadow-xs">LENS</span>
            </h1>

            {/* Glowing Laser Optical Scan Beam that Sweeps Over FIXLENS */}
            <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent skew-x-[-25deg] pointer-events-none animate-scan-laser" />
          </div>

          {/* Minimal Tagline */}
          <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold mt-1.5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span>Hardware Diagnostic Copilot</span>
          </p>
        </div>

        {/* High-Precision Progress Bar */}
        <div className="w-full max-w-[280px] space-y-2.5">
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all duration-75 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Monospace Optical Status & Percentage */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="text-slate-600 truncate max-w-[210px] text-left font-medium">
              {steps[logIndex]}
            </span>
            <span className="font-bold text-teal-700 tabular-nums">
              {Math.min(100, Math.floor(progress))}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
