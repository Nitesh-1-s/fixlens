import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  FileText,
  Download,
  Share2,
  CheckSquare,
  Square,
  Activity,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DiagnosticSidebar({ part, onExportReport }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [showTargetState, setShowTargetState] = useState(false);

  if (!part) {
    return (
      <div className="w-full lg:w-[460px] h-full flex flex-col items-center justify-center p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
          <Cpu className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">No Component Selected</h3>
        <p className="text-sm text-slate-400 max-w-xs mt-2 leading-relaxed">
          Click any component or point on the interactive canvas to run <strong>SAM 3.1 segmentation</strong> and <strong>Muse Spark multimodal diagnostic reasoning</strong>.
        </p>
      </div>
    );
  }

  const toggleStep = (index) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [index]: !prev[index] };

      // Trigger confetti if all steps are completed!
      const totalSteps = part.steps.length;
      const completedCount = Object.values(next).filter(Boolean).length;
      if (completedCount === totalSteps) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = Math.round((completedCount / (part.steps?.length || 1)) * 100);

  return (
    <div className="w-full lg:w-[480px] h-full flex flex-col bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-800 text-cyan-400 border border-cyan-500/30">
            {part.designator.split(' - ')[0]}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              part.status === 'critical'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : part.status === 'warning'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {part.status === 'critical' ? (
              <ShieldAlert className="w-3.5 h-3.5" />
            ) : part.status === 'warning' ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {part.status}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight">{part.name}</h2>
        <p className="text-xs font-mono text-slate-400 mt-0.5">{part.designator}</p>

        {/* Health Score Progress Bar */}
        <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Structural Health Index
            </span>
            <span
              className={`font-mono font-bold ${
                part.healthScore < 40
                  ? 'text-rose-400'
                  : part.healthScore < 70
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {part.healthScore} / 100
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                part.healthScore < 40
                  ? 'bg-gradient-to-r from-rose-600 to-rose-400'
                  : part.healthScore < 70
                  ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
              }`}
              style={{ width: `${part.healthScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {/* Safety Warning */}
        {part.safetyAlert && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-start gap-3 text-rose-200">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed font-medium">
              <strong className="text-rose-300 font-bold">Safety Hazard: </strong>
              {part.safetyAlert}
            </div>
          </div>
        )}

        {/* Muse Spark Diagnostic Synthesis */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Muse Spark Diagnostic
            </h4>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
              Confidence: {(part.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-normal">
            {part.diagnosis}
          </div>
        </div>

        {/* Root Cause */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Root Cause Analysis
          </h4>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300">
            {part.rootCause}
          </div>
        </div>

        {/* Muse Image Visual Target Comparison */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Muse Image: Target Repaired State
            </h4>
            <button
              onClick={() => setShowTargetState(!showTargetState)}
              className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              {showTargetState ? 'Hide Target' : 'View Target Spec'}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {showTargetState && (
            <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/50 rounded-xl text-xs space-y-2">
              <div className="text-emerald-300 font-semibold">Specification:</div>
              <div className="text-slate-300 font-mono text-[11px]">{part.targetSpec}</div>
              <div className="text-emerald-400 font-medium text-[11px]">
                {part.museVisualRepair}
              </div>
            </div>
          )}
        </div>

        {/* Required Tools */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            Required Tooling & Consumables
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {part.tools?.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-800/70 text-slate-300 rounded-lg text-[11px] border border-slate-700/60 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Step-by-Step Interactive Teardown Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
              Interactive Repair Workflow ({completedCount}/{part.steps?.length || 0})
            </h4>
            <span className="text-[10px] font-mono text-cyan-400">{progressPct}% Complete</span>
          </div>

          <div className="space-y-2">
            {part.steps?.map((step, idx) => {
              const isDone = !!completedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                    isDone
                      ? 'bg-emerald-950/30 border-emerald-700/60 text-slate-300'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <button className="mt-0.5 text-emerald-400 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                  <span className={`leading-relaxed ${isDone ? 'line-through text-slate-500' : ''}`}>
                    <strong className="text-cyan-400 mr-1.5">Step {idx + 1}:</strong>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Footer Action */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onExportReport(part)}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-xs flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Repair Work Order
        </button>

        <button
          onClick={() => alert(`Part: ${part.name}\nDiagnostic Status: ${part.statusLabel}\nExported to clipboard.`)}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700"
          title="Share Report"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
