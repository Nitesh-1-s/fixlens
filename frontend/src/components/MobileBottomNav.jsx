import React from 'react';
import { Crosshair, Wrench, MessageSquare, Camera, Sparkles } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  onTabChange,
  onOpenCamera,
  progressPct = 0,
  isLiveInferencing = false
}) {
  const tabs = [
    {
      id: 'scan',
      label: 'Visual Feed',
      icon: Crosshair,
      badge: isLiveInferencing ? 'AI' : null
    },
    {
      id: 'guide',
      label: 'Repair Guide',
      icon: Wrench,
      badge: progressPct > 0 ? `${progressPct}%` : null
    },
    {
      id: 'chat',
      label: 'AI Copilot',
      icon: MessageSquare,
      badge: 'Spark'
    }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 safe-bottom shadow-lg">
      <div className="grid grid-cols-4 items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-teal-50' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                </div>
                {t.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full text-[8px] font-mono font-bold bg-teal-600 text-white">
                    {t.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${isActive ? 'font-bold' : ''}`}>
                {t.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-teal-600 mt-0.5"></div>
              )}
            </button>
          );
        })}

        {/* Snap Button in Nav */}
        <button
          onClick={onOpenCamera}
          className="flex flex-col items-center justify-center py-1 text-slate-700 hover:text-teal-700 transition-colors"
          title="Open Camera"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-700/20 active:scale-95 transition-transform">
            <Camera className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium text-slate-600">
            Snap
          </span>
        </button>
      </div>
    </nav>
  );
}
