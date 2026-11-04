import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, ShieldAlert, Wrench, Sparkles,
  Layers, Activity, ArrowRight, Download, Share2, CheckSquare, Square,
  Cpu, ChevronDown, MessageSquare, Clock, DollarSign, Zap, Gauge, Check,
  HelpCircle, BookOpen, Info, ShieldCheck, CheckCheck, Crosshair
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ChatCopilot from './ChatCopilot';
import { toPlainEnglish } from '../utils/plainEnglish';

export default function DiagnosticSidebar({ part, scenario, onExportReport, isLiveInferencing, onHighlightPart }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false);
  const [activeTab, setActiveTab] = useState('teardown');
  const [copied, setCopied] = useState(false);
  const [usePlainEnglish, setUsePlainEnglish] = useState(true);

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
    <div className="w-full lg:w-[420px] xl:w-[450px] h-full min-h-0 shrink-0 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Sleek, Compact Header */}
      <div className="p-2.5 sm:p-3 border-b border-slate-100 shrink-0 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {part.designator ? part.designator.split(' - ')[0] : 'PART'}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${st.bg} ${st.text} border ${st.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
              {part.statusLabel ? part.statusLabel.split(':')[0] : part.status.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
            <Crosshair className="w-3 h-3 text-teal-600 animate-pulse" />
            <span>X:{part.center?.x}%, Y:{part.center?.y}%</span>
          </div>
        </div>

        <h2 className="text-sm font-bold text-slate-900 leading-snug truncate" title={part.name}>
          {part.name}
        </h2>

        {/* Compact Health Bar */}
        <div className="mt-1.5 p-1 px-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1 shrink-0">
            <Activity className="w-3 h-3 text-teal-600" /> Health
          </span>
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                part.healthScore < 40 ? 'bg-red-500' : part.healthScore < 70 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${part.healthScore}%` }}
            />
          </div>
          <span className={`font-mono text-[10px] font-bold shrink-0 ${
            part.healthScore < 40 ? 'text-red-600' : part.healthScore < 70 ? 'text-amber-600' : 'text-emerald-600'
          }`}>
            {part.healthScore}/100
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl mt-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('teardown')}
            className={`flex-1 py-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'teardown'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Teardown Steps</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Ask Gemini AI</span>
          </button>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <div className="flex-1 overflow-hidden">
          <ChatCopilot part={part} scenario={scenario} />
        </div>
      ) : (
        <>
          {/* Main Scrollable Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-2.5 space-y-2 custom-scrollbar text-slate-700">
            {/* Live Cloud Inference Status Banner */}
            {isLiveInferencing && (
              <div className="p-2 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-2 animate-pulse">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-teal-600 border-t-transparent animate-spin shrink-0"></div>
                <div className="text-[10px] text-teal-800 font-medium">
                  Meta Muse Spark Open is localizing defect via Baseten 2M TPM...
                </div>
              </div>
            )}

            {/* User Reported Symptom Banner */}
            {scenario?.userSymptom && (
              <div className="p-2 bg-teal-50/70 border border-teal-200 rounded-xl text-xs flex items-start gap-2 shadow-2xs">
                <MessageSquare className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                <div className="min-w-0 text-[11px] leading-snug">
                  <span className="font-bold text-teal-900 mr-1 font-mono uppercase text-[9.5px]">Your Reported Issue:</span>
                  <span className="text-slate-800 italic font-medium">"{scenario.userSymptom}"</span>
                </div>
              </div>
            )}

            {/* 1. COMPACT PROBLEM & TOOLS STRIP */}
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 font-mono flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-teal-600" /> Issue
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {part.safetyAlert && (
                    <span className="px-1.5 py-0.5 bg-red-50 text-red-700 rounded text-[9px] font-semibold border border-red-200 flex items-center gap-1">
                      <ShieldAlert className="w-2.5 h-2.5 text-red-600 shrink-0" />
                      {part.safetyAlert}
                    </span>
                  )}
                  {(part.diySavings || scenario?.diySavings) && (
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[9px] font-semibold border border-emerald-200">
                      💰 {part.diySavings || scenario?.diySavings}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-700 leading-snug font-medium">
                {part.laymanSummary || part.diagnosis || 'Defect identified on this hardware component.'}
              </p>
              {part.tools && part.tools.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-slate-200/70">
                  <span className="text-[9px] font-mono text-slate-500 font-bold mr-0.5">Tools:</span>
                  {part.tools.map((tool, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-white text-slate-700 rounded text-[9px] font-medium border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 2. STEP-BY-STEP REPAIR CHECKLIST (FRONT & CENTER) */}
            <div className="p-2 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 font-mono">
                  <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
                  Repair Steps ({completedCount}/{stepsCount})
                </h4>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setUsePlainEnglish(!usePlainEnglish)}
                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold transition-all border flex items-center gap-1 ${
                      usePlainEnglish
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                    title="Toggle Simple English for ages 10 to 80 vs Technical OEM specs"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${usePlainEnglish ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    <span>{usePlainEnglish ? 'Simple English (Ages 10–80)' : 'Technical Specs'}</span>
                  </button>
                  <span className={`text-[10px] font-mono font-bold shrink-0 ${isAllComplete ? 'text-emerald-600' : 'text-teal-700'}`}>
                    {progressPct}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isAllComplete ? 'bg-emerald-500' : 'bg-teal-600'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Celebration Banner when finished */}
              {isAllComplete && (
                <div className="p-1.5 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-2 text-emerald-800 animate-fadeIn">
                  <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-[10px] font-bold leading-tight">
                    🎉 All steps complete! Hardware serviced and ready to test.
                  </div>
                </div>
              )}

              {/* Checklist Items */}
              <div className="space-y-1">
                {part.steps?.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  const displayText = usePlainEnglish ? toPlainEnglish(step) : step;

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
                      className={`p-1.5 px-2 rounded-lg border transition-all cursor-pointer flex items-start gap-2 text-xs select-none ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-300 text-slate-500 shadow-2xs'
                          : 'bg-slate-50/60 border-slate-200 hover:border-teal-400 hover:bg-teal-50/20 text-slate-800'
                      }`}
                      title="Click to check off this step"
                    >
                      <div className="shrink-0 mt-0.5">
                        {isDone ? (
                          <div className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 rounded border border-slate-300 bg-white hover:border-teal-500 transition-colors flex items-center justify-center">
                            <span className="text-[8.5px] font-mono text-slate-500 font-bold">{idx + 1}</span>
                          </div>
                        )}
                      </div>
                      <span className={`text-[11px] leading-snug flex-1 ${isDone ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        {displayText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Collapsible Technical Specs & CoT (Optional) */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 font-mono">
                  <Gauge className="w-3 h-3 text-slate-500" />
                  Technical Specs & Metrology (Optional)
                </span>
                <span className="text-[10px] font-mono text-teal-700 flex items-center gap-1 font-semibold">
                  {showTechnicalSpecs ? 'Hide' : 'View'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showTechnicalSpecs ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {showTechnicalSpecs && (
                <div className="p-2.5 space-y-2 bg-white border-t border-slate-200 text-xs">
                  {part.targetSpec && (
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
                      <div className="text-[9px] font-mono uppercase text-slate-400 font-bold">Target State / OEM Tolerance</div>
                      <div className="text-slate-800 font-mono text-[10px] mt-0.5">{part.targetSpec}</div>
                    </div>
                  )}

                  {(part.technicianProTip || part.technician_pro_tip) && (
                    <div className="p-1.5 bg-amber-50/70 border border-amber-200 rounded">
                      <div className="text-[9px] font-mono uppercase text-amber-800 font-bold flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-amber-600" /> Pro Tip
                      </div>
                      <div className="text-amber-950 text-[10px] mt-0.5 leading-relaxed">
                        {part.technicianProTip || part.technician_pro_tip}
                      </div>
                    </div>
                  )}

                  {(part.testVerification || part.test_verification) && (
                    <div className="p-1.5 bg-teal-50/70 border border-teal-200 rounded">
                      <div className="text-[9px] font-mono uppercase text-teal-800 font-bold flex items-center gap-1">
                        <Gauge className="w-2.5 h-2.5 text-teal-600" /> Multimeter / Measurement Verification
                      </div>
                      <div className="text-teal-950 text-[10px] mt-0.5 leading-relaxed font-sans">
                        {part.testVerification || part.test_verification}
                      </div>
                    </div>
                  )}

                  {part.reasoningTrace && (
                    <div className="bg-slate-900 text-slate-200 rounded p-2 font-mono text-[9px] leading-relaxed">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 mb-1">
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
          <div className="p-2.5 sm:p-3 border-t border-slate-100 flex items-center gap-2 bg-white shrink-0">
            <button
              onClick={() => onExportReport(part)}
              className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Work Order (PDF)</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors border border-slate-200"
              title="Copy Diagnostic Summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
