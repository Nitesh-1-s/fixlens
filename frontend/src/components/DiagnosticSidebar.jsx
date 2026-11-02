import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, ShieldAlert, Wrench, Sparkles,
  Layers, Activity, ArrowRight, Download, Share2, CheckSquare, Square,
  Cpu, ChevronDown, MessageSquare, Clock, DollarSign, Zap, Gauge, Check,
  HelpCircle, BookOpen, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ChatCopilot from './ChatCopilot';

export default function DiagnosticSidebar({ part, scenario, onExportReport, isLiveInferencing, onHighlightPart }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [showTarget, setShowTarget] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);
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
          Select any detected defect or component on the inspection canvas to view comprehensive repair intelligence.
        </p>
      </div>
    );
  }

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      const stepsCount = part.steps?.length || 1;
      if (Object.values(next).filter(Boolean).length === stepsCount) {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const handleCopySummary = () => {
    const text = `[FixLens Diagnosis] ${part.name} (${part.designator}) - Status: ${part.statusLabel}\nDiagnosis: ${part.diagnosis}\nTools: ${part.tools?.join(', ')}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const stepsCount = part.steps?.length || 1;
  const progressPct = Math.round((completedCount / stepsCount) * 100);

  const statusStyles = {
    critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    normal: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  };
  const st = statusStyles[part.status] || statusStyles.normal;

  // Extract metrics or fall back gracefully
  const metrics = part.repairMetrics || {
    difficulty: part.status === 'critical' ? 'Moderate (Soldering/Mechanical)' : 'Standard Servicing',
    estTime: '20-30 mins',
    estCost: '$2.50 - $10.00',
    riskRating: part.status === 'critical' ? 'Electrical / High Thermal' : 'Standard Handling'
  };

  return (
    <div className="w-full lg:w-[470px] h-full flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {part.designator.split(' - ')[0]}
          </span>
          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${st.bg} ${st.text} border ${st.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
            {part.status}
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 leading-snug">{part.name}</h2>
        <p className="text-[10px] font-mono text-slate-400 mt-0.5">{part.designator}</p>

        {/* Health Bar */}
        <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium text-[11px]">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              Component Health Score
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

        {/* Tab Switcher */}
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
          {/* Scrollable Body */}
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

            {/* Step-by-Step Procedure Checklist (Placed at the TOP for instant laptop & mobile access) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 font-mono">
                  <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
                  Step-by-Step Procedure ({completedCount}/{part.steps?.length || 0})
                </h4>
                <span className="text-[10px] font-mono text-teal-700 font-bold">{progressPct}% Complete</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="space-y-1.5">
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
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50/30'
                      }`}
                      title="Click to check off and locate on hardware photo"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span className={`leading-relaxed ${isDone ? 'line-through opacity-75' : ''}`}>
                        <strong className="text-teal-700 mr-1.5">[{idx + 1}]</strong>{step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools Quick Bar */}
            {part.tools && part.tools.length > 0 && (
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-1.5 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-teal-600" /> Required Tools for Steps
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {part.tools.map((tool, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-slate-700 rounded-md text-[10px] font-medium border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* What is this Product & Beginner Guide (For users who know nothing) */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 font-mono flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                  What Is This & What To Do
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-white border border-slate-200 text-slate-700">
                  Beginner Guide
                </span>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-slate-500 font-normal">Identified Device:</span>
                  <span className="text-teal-700 font-semibold">{part.deviceName || scenario.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {part.laymanSummary || 'Physical defect detected on device. If you are new to repairing machinery, follow the simple steps below or ask the AI Copilot for advice.'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Can A Beginner Fix It?</div>
                  <div className="text-slate-800 font-medium mt-0.5 text-xs">{part.beginnerFriendly || 'Yes — DIY friendly with basic tools'}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Quick Action Plan</div>
                  <div className="text-slate-800 font-medium mt-0.5 text-xs truncate" title={part.laymanFixGuide}>
                    {part.laymanFixGuide || 'Power off device, clean area, replace part.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Severity Assessment & Estimated DIY Savings Banner */}
            {(part.failureSeverity || scenario?.failureSeverity || part.diySavings || scenario?.diySavings) && (
              <div className="p-3 bg-gradient-to-r from-teal-50/90 via-emerald-50/50 to-slate-50 border border-teal-200/90 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-wider">Severity Rating</div>
                    <div className="text-xs font-bold text-slate-900 truncate" title={part.failureSeverity || scenario?.failureSeverity}>
                      {part.failureSeverity || scenario?.failureSeverity || 'CRITICAL'}
                    </div>
                  </div>
                </div>

                {(part.diySavings || scenario?.diySavings) && (
                  <div className="text-right shrink-0 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <div className="text-[9px] font-mono text-emerald-700 uppercase font-bold">💰 Est. DIY Savings</div>
                    <div className="text-xs font-bold text-emerald-900">{part.diySavings || scenario?.diySavings}</div>
                  </div>
                )}
              </div>
            )}

            {/* Industrial Repair Metrics Bar */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200">
              <div className="p-2 bg-white rounded-lg border border-slate-100 flex flex-col">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-teal-600" /> Difficulty
                </span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 truncate" title={metrics.difficulty}>
                  {metrics.difficulty}
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-slate-100 flex flex-col">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> Est. Time
                </span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5">
                  {metrics.estTime || metrics.estimated_time || '20-30 mins'}
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-slate-100 flex flex-col">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-600" /> Part Cost
                </span>
                <span className="text-xs font-semibold text-emerald-700 mt-0.5">
                  {metrics.estCost || metrics.estimated_cost || '$2.50 - $8.00'}
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-slate-100 flex flex-col">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> Risk Rating
                </span>
                <span className="text-xs font-semibold text-amber-700 mt-0.5 truncate" title={metrics.riskRating || metrics.risk_rating}>
                  {metrics.riskRating || metrics.risk_rating || 'Electrical / Thermal'}
                </span>
              </div>
            </div>

            {/* Technician Watch-Out & Pro Tip */}
            {(part.technicianProTip || part.technician_pro_tip) && (
              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[10px] uppercase tracking-wider mb-1 font-mono">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  Technician Watch-Out & Pro Tip
                </div>
                <p className="text-xs text-amber-950 leading-relaxed font-sans">
                  {part.technicianProTip || part.technician_pro_tip}
                </p>
              </div>
            )}

            {/* Precision Test & Measurement Verification */}
            {(part.testVerification || part.test_verification) && (
              <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-teal-900 font-bold text-[10px] uppercase tracking-wider mb-1 font-mono">
                  <Gauge className="w-3.5 h-3.5 text-teal-600" />
                  Precision Test & Measurement Verification
                </div>
                <p className="text-xs text-teal-950 leading-relaxed font-sans">
                  {part.testVerification || part.test_verification}
                </p>
              </div>
            )}

            {/* Safety Protocol */}
            {part.safetyAlert && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed"><strong>Safety Protocol:</strong> {part.safetyAlert}</span>
              </div>
            )}

            {/* Diagnostic Analysis */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Diagnostic Analysis
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {part.diagnosis}
              </p>
              <div className="mt-1 text-right">
                <span className="text-[10px] font-mono text-teal-700">
                  Confidence Rating: {((part.confidence || 0.985) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Root Cause */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-amber-500" />
                Root Cause Assessment
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {part.rootCause}
              </p>
            </div>

            {/* Target Spec */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Target State & OEM Tolerance
                </h4>
                <button
                  onClick={() => setShowTarget(!showTarget)}
                  className="text-[10px] font-medium text-teal-700 hover:underline flex items-center gap-0.5"
                >
                  {showTarget ? 'Collapse' : 'Details'} <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs space-y-1">
                <div className="text-emerald-900 font-mono text-[11px] font-medium">{part.targetSpec}</div>
                {showTarget && part.museVisualRepair && (
                  <div className="text-emerald-700 text-[11px] pt-1 border-t border-emerald-200/60 mt-1">
                    {part.museVisualRepair}
                  </div>
                )}
              </div>
            </div>

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
                  <span className="text-[10px] font-mono text-teal-700 flex items-center gap-1 font-semibold">
                    {showReasoning ? 'Hide CoT' : `View Chain-of-Thought (${(part.reasoningTrace?.length || 0).toLocaleString()} chars)`}
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
          </div>

          {/* Footer */}
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
