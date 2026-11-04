import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, ArrowRight, X, Mic, MicOff, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const COMMON_SYMPTOMS = [
  { label: "⚡ Won't Turn On / No Power", text: "Device won't power on or respond when plugged in." },
  { label: "❄️ Blue Screen / Freezing", text: "Computer freezes or crashes with a blue-screen error (BSOD)." },
  { label: "🔥 Burning Smell / Sparks", text: "Noticed a burnt electronics smell or sparks when turned on." },
  { label: "🔊 Clicking / Grinding Noise", text: "Making strange loud clicking, buzzing, or grinding sounds." },
  { label: "🌡️ Overheating / Throttling", text: "Device gets extremely hot and shuts down after a few minutes." },
  { label: "🛑 Motor Jammed / Won't Spin", text: "Motor, fan, or mechanical gear is stuck and won't turn." },
  { label: "💧 Liquid Spill / Moisture", text: "Liquid was spilled on the hardware or exposed to moisture." },
  { label: "⚠️ Error Code / Beep Codes", text: "Beeping repeatedly or flashing warning error lights." },
];

export default function SymptomPromptModal({
  photoDataUrl,
  photoLabel,
  source = 'upload',
  onConfirm,
  onCancel,
  onChangePhoto
}) {
  const [symptoms, setSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  // Focus input automatically
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setRecognitionSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms((prev) => (prev ? `${prev.trim()} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition error:', err);
      }
    }
  };

  const handleChipClick = (chipText) => {
    setSymptoms((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return chipText;
      if (trimmed.includes(chipText)) return prev; // avoid duplicate
      return `${trimmed}. ${chipText}`;
    });
    textareaRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onConfirm(symptoms.trim());
  };

  const handleSkip = () => {
    onConfirm('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn select-none">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-xs">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                What's the issue? Describe what happened
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Tell Gemini AI what's not working so it can pinpoint the exact failure.
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar text-slate-700">
          {/* Photo Preview Strip */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={photoDataUrl}
                alt="Captured Hardware"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-teal-100/70 text-teal-800 border border-teal-200">
                    {source === 'camera' ? 'Camera Capture' : 'Uploaded File'}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate mt-0.5 max-w-[200px] sm:max-w-[280px]">
                  {photoLabel || 'Hardware Component Photo'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  High-Resolution Optical Frame
                </div>
              </div>
            </div>

            {onChangePhoto && (
              <button
                type="button"
                onClick={onChangePhoto}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
                title="Change or re-take photo"
              >
                <RefreshCw className="w-3 h-3 text-slate-500" />
                <span className="hidden sm:inline">Change Photo</span>
              </button>
            )}
          </div>

          {/* Chat / Text Intake Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="symptom-input"
                className="text-xs font-bold text-slate-900 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                <span>Tell Gemini AI what is not working:</span>
              </label>

              {recognitionSupported && (
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all border shadow-2xs ${
                    isListening
                      ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                  }`}
                  title="Speak symptoms using microphone"
                >
                  {isListening ? <Mic className="w-3 h-3 text-red-600" /> : <Mic className="w-3 h-3 text-teal-600" />}
                  <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                id="symptom-input"
                ref={textareaRef}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSubmit();
                  }
                }}
                rows={3}
                placeholder="Type what happened... e.g., 'My PC shut down with a blue screen while gaming', 'Sparks came out when plugged in', or 'The printer extruder clicks and filament won\'t come out'..."
                className="w-full p-3 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder:text-slate-400 resize-none shadow-inner"
              />
            </div>
          </div>

          {/* Quick-Tap Symptom Tags (Pill Chips) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
              QUICK SELECT COMMON SYMPTOMS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SYMPTOMS.map((chip, idx) => {
                const isSelected = symptoms.includes(chip.text);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChipClick(chip.text)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all border select-none text-left ${
                      isSelected
                        ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSkip}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors text-center order-2 sm:order-1"
          >
            Skip & Analyze Photo Only
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all order-1 sm:order-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run AI Diagnosis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
