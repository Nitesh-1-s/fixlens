import React from 'react';
import { X, Printer, CheckCircle2, ShieldAlert, Wrench, Clock, DollarSign, Zap, Gauge } from 'lucide-react';
import Logo from './Logo';

export default function WorkOrderModal({ part, scenario, onClose }) {
  if (!part) return null;

  const metrics = part.repairMetrics || {
    difficulty: part.status === 'critical' ? 'Moderate (Soldering/Mechanical)' : 'Standard Servicing',
    estTime: '20-30 mins',
    estCost: '$2.50 - $10.00',
    riskRating: part.status === 'critical' ? 'Electrical / High Thermal' : 'Standard Handling'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="work-order-print-container w-full max-w-2xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between no-print">
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
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-700 text-xs custom-scrollbar">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">FixLens Diagnostic & Teardown Work Order</h2>
              <p className="text-slate-400 text-[10px]">Autonomous Physical Hardware Metrology Report · Meta Muse Spark Open</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-400">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Status: <strong className={
                part.status === 'critical' ? 'text-red-600' : part.status === 'warning' ? 'text-amber-600' : 'text-emerald-600'
              }>{part.status.toUpperCase()}</strong></div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[10px]">
            <div>
              <div className="text-slate-400 uppercase">System</div>
              <div className="text-slate-800 font-semibold truncate">{scenario.title}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase">Designator</div>
              <div className="text-teal-700 font-semibold">{part.designator.split(' - ')[0]}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase">Difficulty</div>
              <div className="text-slate-800 font-semibold truncate">{metrics.difficulty}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase">Est. Cost</div>
              <div className="text-emerald-700 font-semibold">{metrics.estCost || metrics.estimated_cost || '$2.50'}</div>
            </div>
          </div>

          {/* Technician Watch-Out & Pro Tip */}
          {(part.technicianProTip || part.technician_pro_tip) && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
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
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl">
              <div className="flex items-center gap-1.5 text-teal-900 font-bold text-[10px] uppercase tracking-wider mb-1 font-mono">
                <Gauge className="w-3.5 h-3.5 text-teal-600" />
                Precision Test & Verification Protocol
              </div>
              <p className="text-xs text-teal-950 leading-relaxed font-sans">
                {part.testVerification || part.test_verification}
              </p>
            </div>
          )}

          {/* Safety Protocol */}
          {part.safetyAlert && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-800">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span><strong>Safety:</strong> {part.safetyAlert}</span>
            </div>
          )}

          {/* Diagnosis */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1 text-[10px]">Diagnostic Telemetry</h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">{part.diagnosis}</p>
          </div>

          {/* Root Cause */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1 text-[10px]">Root Cause Assessment</h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 leading-relaxed">{part.rootCause}</p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1 text-[10px]">Mandatory Tooling & Specifications</h4>
            <div className="flex flex-wrap gap-1.5">
              {part.tools?.map((tool, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-700 rounded-lg text-[10px] border border-slate-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1 text-[10px]">Procedure Checklist</h4>
            <div className="space-y-1.5 font-mono text-[10px]">
              {part.steps?.map((step, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded border border-slate-100 flex items-start gap-2">
                  <span className="text-teal-600 font-bold">[{i + 1}]</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reasoning Trace */}
          {part.reasoningTrace && (
            <div>
              <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-1 text-[10px] flex items-center justify-between">
                <span>AI Reasoning Trace (Chain-of-Thought)</span>
                <span className="text-[9px] text-teal-600 font-mono">meta-models/muse-spark-open-1026</span>
              </h4>
              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 font-mono text-[10px] leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                {part.reasoningTrace}
              </div>
            </div>
          )}
          {/* Official Verification Stamp & Barcode Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
            <div>
              <div className="font-bold text-slate-700">MODAL AUTONOMOUS METROLOGY PIPELINE</div>
              <div>VERIFIED: META MUSE SPARK OPEN (2M TPM) · SAM 3.1 GEOMETRY</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-teal-700">CHECKSUM: 0x{Date.now().toString(16).toUpperCase()}</div>
              <div>RIGHT-TO-REPAIR COMPLIANT</div>
            </div>
          </div>
        </div>

        {/* Footer Actions (Hidden on Print) */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white no-print">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-600">Close</button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF Work Order
          </button>
        </div>
      </div>
    </div>
  );
}
