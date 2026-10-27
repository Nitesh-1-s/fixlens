import React from 'react';
import { Printer, Download, CheckCircle2, ShieldAlert, Cpu, Wrench, X } from 'lucide-react';

export default function WorkOrderModal({ part, scenario, onClose }) {
  if (!part) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Engineering Work Order #FXL-{Date.now().toString().slice(-6)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-xs custom-scrollbar">
          {/* Header Banner */}
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">FixLens AI Diagnostic Lab</h2>
              <p className="text-slate-400 text-[11px]">
                Autonomous Visual Inspection Report • SAM 3.1 & Muse Spark Engine
              </p>
            </div>
            <div className="text-right font-mono text-[11px] text-slate-400">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Inspection Status: <strong className="text-rose-400 uppercase">{part.status}</strong></div>
            </div>
          </div>

          {/* Component & Target Info Table */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800 font-mono text-[11px]">
            <div>
              <div className="text-slate-500 uppercase">Target System</div>
              <div className="text-white font-semibold">{scenario.title}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Component Designator</div>
              <div className="text-cyan-400 font-semibold">{part.designator}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Identified Part</div>
              <div className="text-slate-200">{part.name}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Confidence Rating</div>
              <div className="text-emerald-400 font-semibold">{(part.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Diagnostic Summary */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Automated Visual Telemetry
            </h4>
            <p className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 leading-relaxed text-slate-300">
              {part.diagnosis}
            </p>
          </div>

          {/* Root Cause */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Root Cause Assessment
            </h4>
            <p className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 leading-relaxed text-slate-300">
              {part.rootCause}
            </p>
          </div>

          {/* Mandatory Tooling */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              Mandatory Technician Tooling
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
              {part.tools?.map((tool, i) => (
                <li key={i}>{tool}</li>
              ))}
            </ul>
          </div>

          {/* Execution Steps */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Procedure Checklist
            </h4>
            <div className="space-y-1.5 font-mono text-[11px]">
              {part.steps?.map((step, i) => (
                <div key={i} className="p-2 bg-slate-950/40 rounded border border-slate-800/80 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">[{i + 1}]</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
