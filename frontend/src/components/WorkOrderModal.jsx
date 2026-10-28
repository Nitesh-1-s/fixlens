import React from 'react';
import { X, Printer, CheckCircle2, ShieldAlert, Wrench } from 'lucide-react';
import Logo from './Logo';

export default function WorkOrderModal({ part, scenario, onClose }) {
  if (!part) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={20} />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Work Order #FXL-{Date.now().toString().slice(-6)}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-slate-700 text-xs custom-scrollbar">
          {/* Header */}
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">FixLens Diagnostic Report</h2>
              <p className="text-slate-400 text-[10px]">Automated Visual Inspection Report</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-400">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Status: <strong className={
                part.status === 'critical' ? 'text-red-600' : part.status === 'warning' ? 'text-amber-600' : 'text-emerald-600'
              }>{part.status.toUpperCase()}</strong></div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[10px]">
            <div>
              <div className="text-slate-400 uppercase">System</div>
              <div className="text-slate-800 font-semibold">{scenario.title}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase">Component</div>
              <div className="text-teal-700 font-semibold">{part.designator}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase">Part Name</div>
              <div className="text-slate-700">{part.name}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase">Confidence</div>
              <div className="text-emerald-600 font-semibold">{(part.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1.5 text-[10px]">Diagnostic Summary</h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">{part.diagnosis}</p>
          </div>

          {/* Reasoning Trace */}
          {part.reasoningTrace && (
            <div>
              <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1.5 text-[10px] flex items-center justify-between">
                <span>AI Reasoning Trace (Chain-of-Thought)</span>
                <span className="text-[9px] text-teal-600 font-mono">meta-models/muse-spark-open-1026</span>
              </h4>
              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 font-mono text-[10px] leading-relaxed whitespace-pre-wrap">
                {part.reasoningTrace}
              </div>
            </div>
          )}

          {/* Root Cause */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1.5 text-[10px]">Root Cause</h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">{part.rootCause}</p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1.5 text-[10px]">Required Tooling</h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              {part.tools?.map((tool, i) => <li key={i}>{tool}</li>)}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1.5 text-[10px]">Procedure</h4>
            <div className="space-y-1.5 font-mono text-[10px]">
              {part.steps?.map((step, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded border border-slate-100 flex items-start gap-2">
                  <span className="text-teal-600 font-bold">[{i + 1}]</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-600">Close</button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
}
