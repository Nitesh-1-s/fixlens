import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare, Check } from 'lucide-react';

export default function PwaInstallBanner() {
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      setInstalled(true);
      return;
    }

    // Check if iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(isIosDevice);

    if (window.deferredPrompt) {
      setCanInstall(true);
    }

    const handleInstallable = () => {
      setCanInstall(true);
    };

    window.addEventListener('fixlens-pwa-installable', handleInstallable);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setCanInstall(false);
    });

    return () => {
      window.removeEventListener('fixlens-pwa-installable', handleInstallable);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosPrompt(true);
      return;
    }

    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const choice = await window.deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstalled(true);
      }
      window.deferredPrompt = null;
      setCanInstall(false);
    }
  };

  if (dismissed || installed) return null;
  if (!canInstall && !isIos) return null;

  return (
    <>
      {/* Floating Bottom / Top PWA Quick Banner */}
      <div className="bg-teal-700 text-white px-4 py-2.5 flex items-center justify-between text-xs shadow-md animate-fadeIn z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-teal-800 border border-teal-600 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-teal-200" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[11px] truncate flex items-center gap-1.5">
              <span>Install FixLens Mobile App</span>
              <span className="px-1.5 py-0.2 bg-teal-600 rounded text-[9px] font-mono">PWA</span>
            </div>
            <div className="text-[10px] text-teal-100 truncate">
              {isIos ? 'Add to Home Screen for full-screen camera & guides' : 'Instant camera scanning & offline diagnosis'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 bg-white text-teal-800 hover:bg-teal-50 font-bold rounded-lg text-[11px] transition-colors shadow-xs flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-teal-200 hover:text-white rounded-md transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIosPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-slate-200 text-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-teal-600" /> Install on iPhone / iPad
              </h3>
              <button
                onClick={() => setShowIosPrompt(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Install FixLens as a native PWA on your home screen for full-screen camera scanning:
            </p>

            <div className="space-y-2.5 font-mono text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline text-teal-600 ml-1" /></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-teal-600 ml-1" /></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Launch FixLens from your home screen</span>
              </div>
            </div>

            <button
              onClick={() => setShowIosPrompt(false)}
              className="mt-4 w-full py-2 bg-teal-600 text-white font-semibold rounded-xl text-xs hover:bg-teal-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
