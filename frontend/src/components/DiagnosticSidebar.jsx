import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, ShieldAlert, Wrench, Sparkles,
  Layers, Activity, ArrowRight, Download, Share2, CheckSquare, Square,
  Cpu, ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DiagnosticSidebar({ part, onExportReport }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [showTarget, setShowTarget] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  if (!part) {
    return (
      <div className="w-full lg:w-[440px] h-full flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">No Component Selected</h3>
        <p className="text-xs text-slate-400 max-w-[240px] mt-2 leading-relaxed">
          Click any component on the canvas to view its diagnostic report.
        </p>
      </div>
    );
  }

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      if (Object.values(next).filter(Boolean).length === part.steps.length) {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = Math.round((completedCount / (part.steps?.length || 1)) * 100);

  const statusStyles = {
    critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    normal: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  };
  const st = statusStyles[part.status] || statusStyles.normal;

  return (
    <div className="w-full lg:w-[460px] h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-600">
            {part.designator.split(' - ')[0]}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 ${st.bg} ${st.text} border ${st.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
            {part.status}
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900">{part.name}</h2>
        <p className="text-[10px] font-mono text-slate-400 mt-0.5">{part.designator}</p>

        {/* Health Bar */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              Health Index
            </span>
            <span className={`font-mono font-bold ${
              part.healthScore < 40 ? 'text-red-600' : part.healthScore < 70 ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {part.healthScore}/100
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                part.healthScore < 40 ? 'bg-red-500' : part.healthScore < 70 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${part.healthScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {/* Safety Alert */}
        {part.safetyAlert && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed"><strong>Safety:</strong> {part.safetyAlert}</span>
          </div>
        )}

        {/* Meta Muse Spark Reasoning Trace */}
        {part.reasoningTrace && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-teal-600" />
                Meta Muse Spark Reasoning Trace
              </span>
              <span className="text-[10px] font-mono text-teal-600 flex items-center gap-1 font-semibold">
                {showReasoning ? 'Hide CoT' : 'View Chain-of-Thought'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showReasoning ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {showReasoning && (
              <div className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed border-t border-slate-800">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-2 text-[10px]">
                  <span>// MODEL: meta-models/muse-spark-open-1026</span>
                  <span className="text-teal-400">STATUS: VERIFIED CoT</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-300">
                  {part.reasoningTrace}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Diagnosis */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-teal-600" />
            Diagnostic Analysis
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {part.diagnosis}
          </p>
          <div className="mt-1.5 text-right">
            <span className="text-[10px] font-mono text-teal-600">
              Confidence: {(part.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Root Cause */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-amber-500" />
            Root Cause
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {part.rootCause}
          </p>
        </div>

        {/* Target Spec */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Target State
            </h4>
            <button
              onClick={() => setShowTarget(!showTarget)}
              className="text-[10px] font-medium text-teal-600 hover:underline flex items-center gap-0.5"
            >
              {showTarget ? 'Hide' : 'View'} <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
          {showTarget && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs space-y-1.5">
              <div className="text-emerald-800 font-mono text-[11px]">{part.targetSpec}</div>
              <div className="text-emerald-600 text-[11px]">{part.museVisualRepair}</div>
            </div>
          )}
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
            <Wrench className="w-3 h-3 text-teal-600" />
            Required Tools
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {part.tools?.map((tool, i) => (
              <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] border border-slate-100">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Repair Steps */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <CheckSquare className="w-3 h-3 text-teal-600" />
              Repair Steps ({completedCount}/{part.steps?.length || 0})
            </h4>
            <span className="text-[10px] font-mono text-teal-600">{progressPct}%</span>
          </div>

          <div className="space-y-1.5">
            {part.steps?.map((step, idx) => {
              const isDone = !!completedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-100 text-slate-500'
                      : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span className={`leading-relaxed ${isDone ? 'line-through' : ''}`}>
                    <strong className="text-teal-600 mr-1">{idx + 1}.</strong>{step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onExportReport(part)}
          className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Work Order
        </button>
        <button
          onClick={() => navigator.clipboard?.writeText(`FixLens Report: ${part.name} — ${part.statusLabel}`)}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors border border-slate-200"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
