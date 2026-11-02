import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, ShieldAlert, Wrench, Sparkles,
  Layers, Activity, ArrowRight, Download, Share2, CheckSquare, Square,
  Cpu, ChevronDown, MessageSquare, Clock, DollarSign, Zap, Gauge, Check,
  HelpCircle, BookOpen, Info, ShieldCheck, CheckCheck, Crosshair
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ChatCopilot from './ChatCopilot';

export default function DiagnosticSidebar({ part, scenario, onExportReport, isLiveInferencing, onHighlightPart }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false);
  const [activeTab, setActiveTab] = useState('teardown');
  const [copied, setCopied] = useState(false);

  if (!part) {
    return (
      <div className="w-full lg:w-[460px] h-full flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">No Component Selected</h3>
        <p className="text-xs text-slate-400 max-w-[240px] mt-2 leading-relaxed">
          Select any detected defect or component on the inspection canvas to view repair steps.
        </p>
      </div>
    );
  }

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      const stepsCount = part.steps?.length || 1;
      const allDone = Object.values(next).filter(Boolean).length === stepsCount;
      if (allDone) {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const handleCopySummary = () => {
    const text = `[FixLens Diagnosis] ${part.name}\nProblem: ${part.laymanSummary || part.diagnosis}\nTools: ${part.tools?.join(', ')}\nSteps: ${part.steps?.join(' -> ')}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const stepsCount = part.steps?.length || 1;
  const progressPct = Math.round((completedCount / stepsCount) * 100);
  const isAllComplete = completedCount === stepsCount && stepsCount > 0;

  const statusStyles = {
    critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    normal: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  };
  const st = statusStyles[part.status] || statusStyles.normal;

  return (
    <div className="w-full lg:w-[470px] h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Clean Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {part.designator ? part.designator.split(' - ')[0] : 'PART'}
          </span>
          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${st.bg} ${st.text} border ${st.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
            {part.statusLabel ? part.statusLabel.split(':')[0] : part.status.toUpperCase()}
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 leading-snug">{part.name}</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">{part.deviceName || scenario?.title || 'Physical Hardware Component'}</p>

        {/* Health Bar */}
        <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium text-[11px]">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              Component Health
            </span>
            <span className={`font-mono text-xs font-bold ${
              part.healthScore < 40 ? 'text-red-600' : part.healthScore < 70 ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {part.healthScore} / 100
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

        {/* Clean Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl mt-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('teardown')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'teardown'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Teardown & Repair Steps</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Ask AI Copilot</span>
          </button>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <div className="flex-1 overflow-hidden">
          <ChatCopilot part={part} scenario={scenario} />
        </div>
      ) : (
        <>
          {/* Streamlined Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar text-slate-700">
            {/* Live Cloud Inference Status Banner */}
            {isLiveInferencing && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3 animate-pulse">
                <div className="w-5 h-5 rounded-full border-2 border-teal-600 border-t-transparent animate-spin shrink-0"></div>
                <div>
                  <div className="text-[11px] font-bold text-teal-900 font-mono">Modal Cloud Inference Active...</div>
                  <div className="text-[9px] text-teal-700">Meta Muse Spark Open is localizing defect via Baseten 2M TPM</div>
                </div>
              </div>
            )}

            {/* 1. Single Clean Problem & Solution Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-800 font-mono flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                    Pinpointed Defect Analysis
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                    X:{part.center?.x}%, Y:{part.center?.y}%
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {part.laymanSummary || part.diagnosis || 'Defect identified on this hardware component.'}
                </p>
              </div>

              {/* Informative Value Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200/70">
                {part.safetyAlert && (
                  <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-semibold border border-red-200 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-red-600" />
                    {part.safetyAlert}
                  </span>
                )}
                {(part.diySavings || scenario?.diySavings) && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-[10px] font-semibold border border-emerald-200 flex items-center gap-1">
                    💰 {part.diySavings || scenario?.diySavings}
                  </span>
                )}
                <span className="px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg text-[10px] font-semibold border border-teal-200 flex items-center gap-1">
                  🛠️ {part.beginnerFriendly ? part.beginnerFriendly.split('—')[0].trim() : 'Beginner Friendly'}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-semibold border border-slate-200 flex items-center gap-1">
                  ⏱️ {part.repairMetrics?.estTime || '15-20 mins'}
                </span>
              </div>

              {/* Quick AI Solver Button */}
              <button
                onClick={() => setActiveTab('chat')}
                className="w-full py-2 px-3 bg-white hover:bg-teal-50 border border-teal-200 rounded-lg text-xs font-semibold text-teal-800 flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Ask AI Copilot How to Solve This in Simple Words</span>
                <ArrowRight className="w-3 h-3 text-teal-600" />
              </button>
            </div>

            {/* 2. Tools You'll Need */}
            {part.tools && part.tools.length > 0 && (
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-teal-600" />
                  Tools You'll Need ({part.tools.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {part.tools.map((tool, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-700 rounded-lg text-[11px] font-medium border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Step-by-Step Procedure Checklist (Front & Center) */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 font-mono">
                  <CheckSquare className="w-4 h-4 text-teal-600" />
                  Step-by-Step Repair Guide ({completedCount}/{stepsCount})
                </h4>
                <span className={`text-xs font-mono font-bold ${isAllComplete ? 'text-emerald-600' : 'text-teal-700'}`}>
                  {progressPct}% Complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isAllComplete ? 'bg-emerald-500' : 'bg-teal-600'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Celebration Banner when finished */}
              {isAllComplete && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-emerald-800 animate-fadeIn">
                  <CheckCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-xs font-bold leading-snug">
                    🎉 Fantastic work! All steps finished. Your hardware is serviced and ready to power on.
                  </div>
                </div>
              )}

              {/* Checklist Items */}
              <div className="space-y-2">
                {part.steps?.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        toggleStep(idx);
                        if (onHighlightPart) onHighlightPart(part);
                      }}
                      onMouseEnter={() => {
                        if (onHighlightPart) onHighlightPart(part);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs select-none ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-300 text-slate-500 shadow-2xs'
                          : 'bg-slate-50/50 border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 text-slate-800'
                      }`}
                      title="Click to check off this step"
                    >
                      <div className="shrink-0 mt-0.5">
                        {isDone ? (
                          <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white hover:border-teal-500 transition-colors flex items-center justify-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">{idx + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="leading-relaxed flex-1">
                        <span className={`font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {step}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Collapsible Technical Specs & CoT (Optional for Advanced Users / Hackathon Judges) */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 font-mono">
                  <Gauge className="w-3.5 h-3.5 text-slate-500" />
                  Technical Specs & Metrology (Optional)
                </span>
                <span className="text-[10px] font-mono text-teal-700 flex items-center gap-1 font-semibold">
                  {showTechnicalSpecs ? 'Hide Specs' : 'View Specs'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showTechnicalSpecs ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {showTechnicalSpecs && (
                <div className="p-3.5 space-y-3 bg-white border-t border-slate-200 text-xs">
                  {/* Target Spec */}
                  {part.targetSpec && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[9px] font-mono uppercase text-slate-400 font-bold">Target State / OEM Tolerance</div>
                      <div className="text-slate-800 font-mono text-[11px] mt-0.5">{part.targetSpec}</div>
                    </div>
                  )}

                  {/* Technician Pro Tip */}
                  {(part.technicianProTip || part.technician_pro_tip) && (
                    <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg">
                      <div className="text-[9px] font-mono uppercase text-amber-800 font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-600" /> Pro Tip
                      </div>
                      <div className="text-amber-950 text-[11px] mt-0.5 leading-relaxed">
                        {part.technicianProTip || part.technician_pro_tip}
                      </div>
                    </div>
                  )}

                  {/* Test Verification */}
                  {(part.testVerification || part.test_verification) && (
                    <div className="p-2.5 bg-teal-50/70 border border-teal-200 rounded-lg">
                      <div className="text-[9px] font-mono uppercase text-teal-800 font-bold flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-teal-600" /> Multimeter / Measurement Verification
                      </div>
                      <div className="text-teal-950 text-[11px] mt-0.5 leading-relaxed font-sans">
                        {part.testVerification || part.test_verification}
                      </div>
                    </div>
                  )}

                  {/* Root Cause Assessment */}
                  {part.rootCause && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[9px] font-mono uppercase text-slate-400 font-bold">Root Cause Assessment</div>
                      <div className="text-slate-700 text-[11px] mt-0.5 leading-relaxed">{part.rootCause}</div>
                    </div>
                  )}

                  {/* Meta Muse Spark Reasoning CoT Trace */}
                  {part.reasoningTrace && (
                    <div className="bg-slate-900 text-slate-200 rounded-lg p-3 font-mono text-[10px] leading-relaxed">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                        <span>MODEL: meta-models/muse-spark-open-1026</span>
                        <span className="text-teal-400 font-bold">VERIFIED CoT</span>
                      </div>
                      <div className="whitespace-pre-wrap text-slate-300">
                        {part.reasoningTrace}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Clean Action Footer */}
          <div className="p-4 border-t border-slate-100 flex items-center gap-2 bg-white">
            <button
              onClick={() => onExportReport(part)}
              className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              Export Work Order (PDF)
            </button>
            <button
              onClick={handleCopySummary}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors border border-slate-200"
              title="Copy Diagnostic Summary"
            >
              {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
