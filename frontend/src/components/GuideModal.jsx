import React from 'react';
import {
  X,
  Layers,
  MousePointerClick,
  Sparkles,
  CheckSquare,
  Volume2,
  Download,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import Logo from './Logo';

export default function GuideModal({ onClose }) {
  const steps = [
    {
      num: '01',
      icon: Layers,
      title: 'Choose Scenario or Upload Hardware',
      desc: 'Select from pre-calibrated real hardware scenarios (Motherboard VRM, 3D Printer Hotend, Automotive Engine Bay) or click "Upload" to analyze your own photo.'
    },
    {
      num: '02',
      icon: MousePointerClick,
      title: 'Inspect Any Highlighted Component',
      desc: 'Click on any polygon overlay (e.g. B+ Post, 7PK1855 Belt, C12 Capacitor, MK8 Nozzle) to instantly view defect diagnosis, health index score, and safety alerts.'
    },
    {
      num: '03',
      icon: Sparkles,
      title: 'Zero-Shot Point Inspection (Live Modal AI)',
      desc: 'Click ANY spot on the image to prompt Meta SAM 3.1 and Meta Muse Spark Open. The cloud serverless backend analyzes the exact coordinates in real-time (<500ms).'
    },
    {
      num: '04',
      icon: CheckSquare,
      title: 'Follow Step-by-Step Teardown Checklist',
      desc: 'Click each repair step as you service the hardware. When all steps are finished, celebratory completion feedback confirms your repair!'
    },
    {
      num: '05',
      icon: Volume2,
      title: 'Hands-Free Audio Voice Readout',
      desc: 'Click the "Voice" button in the top bar to have FixLens speak out the diagnostic report and safety warnings hands-free while your hands are holding tools.'
    },
    {
      num: '06',
      icon: Download,
      title: 'Export Official ISO Work Order',
      desc: 'Click "Export Work Order" at the bottom of the sidebar to generate a printable PDF engineering ticket with OEM part numbers and full AI reasoning traces.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                FixLens User Guide & Quickstart
              </h2>
              <p className="text-[11px] text-slate-500">
                How to diagnose and repair physical hardware in 6 simple steps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step-by-Step Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5 custom-scrollbar bg-white">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-teal-50/40 hover:border-teal-100 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-teal-200 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center text-teal-600 font-mono font-bold text-xs shrink-0 shadow-sm transition-colors">
                  {st.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xs font-bold text-slate-900">{st.title}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3 text-amber-500" />
            <span>Always de-energize circuits before physical contact</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            Got it, Let's Inspect! <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
