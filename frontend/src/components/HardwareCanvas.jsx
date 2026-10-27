import React, { useRef, useState, useEffect } from 'react';
import { Crosshair, Zap, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function HardwareCanvas({ scenario, selectedPart, onSelectPart, onAddPointPrompt, clickPoint }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [pingEffect, setPingEffect] = useState(null);

  // Handle click on canvas for zero-shot point prompt
  const handleClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Create radar ping animation
    setPingEffect({ x: xPct, y: yPct, id: Date.now() });

    // Check if clicked near an existing part
    const clickedPart = scenario.parts.find((part) => {
      const dist = Math.hypot(part.center.x - xPct, part.center.y - yPct);
      return dist < 12; // threshold in %
    });

    if (clickedPart) {
      onSelectPart(clickedPart);
    } else {
      // Custom point prompt sent to SAM 3.1
      onAddPointPrompt({ x: xPct, y: yPct });
    }
  };

  useEffect(() => {
    if (clickPoint) {
      setPingEffect({ x: clickPoint.x, y: clickPoint.y, id: Date.now() });
    }
  }, [clickPoint]);

  return (
    <div className="relative flex flex-col flex-1 h-full min-h-[540px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl select-none">
      {/* Canvas Top Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-xl shadow-lg pointer-events-auto">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono font-medium text-slate-300">
            SAM 3.1 Point-Prompt Ready
          </span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs text-cyan-400 font-mono">
            {scenario.parts.length} Components Segmented
          </span>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-xl shadow-lg pointer-events-auto">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onClick={handleClick}
        className="relative flex-1 w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden bg-radial from-slate-900 via-slate-950 to-black p-6"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Render Hardware Scenario SVG Graphic */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-h-[640px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* PCB Traces & Gradients */}
            <radialGradient id="pcbGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </radialGradient>
            <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* SCENARIO 1: MOTHERBOARD VRM */}
          {scenario.id === 'motherboard' && (
            <g className="scenario-motherboard">
              {/* PCB Base */}
              <rect x="15" y="15" width="70" height="70" rx="4" fill="url(#pcbGrad)" stroke="#10b981" strokeWidth="0.6" />
              {/* Copper Bus Traces */}
              <path d="M 20 25 L 50 25 L 50 35 L 75 35" fill="none" stroke="#d97706" strokeWidth="0.8" strokeDasharray="1,1" opacity="0.4" />
              <path d="M 25 75 L 25 50 L 75 50" fill="none" stroke="#d97706" strokeWidth="0.8" strokeDasharray="2,1" opacity="0.4" />
              <path d="M 38 44 L 50 65 L 62 38" fill="none" stroke="#34d399" strokeWidth="1.2" opacity="0.6" />

              {/* Ground Silkscreen Markers */}
              <circle cx="20" cy="20" r="2.5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="0.5" />
              <circle cx="80" cy="20" r="2.5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="0.5" />
              <circle cx="20" cy="80" r="2.5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="0.5" />
              <circle cx="80" cy="80" r="2.5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="0.5" />

              {/* VRM Aluminum Heatsink Base */}
              <rect x="52" y="24" width="22" height="24" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.6" />
              {/* Heatsink Fins */}
              <line x1="56" y1="26" x2="56" y2="46" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="60" y1="26" x2="60" y2="46" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="64" y1="26" x2="64" y2="46" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="68" y1="26" x2="68" y2="46" stroke="#94a3b8" strokeWidth="0.8" />

              {/* Power MOSFET (Q4) under Tab */}
              <rect x="56" y="33" width="12" height="10" rx="1" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />
              {/* Thermal Scorched Halo on MOSFET */}
              <circle cx="62" cy="38" r="7" fill="#b45309" opacity="0.35" />

              {/* Electrolytic Capacitor (C12) */}
              <g className="cursor-pointer">
                {/* Cylindrical Shadow & Body */}
                <ellipse cx="38" cy="48" rx="8" ry="6" fill="#1e293b" />
                <rect x="30" y="38" width="16" height="10" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                {/* Domed Vent with brown electrolyte leak */}
                <ellipse cx="38" cy="38" rx="8" ry="4" fill="#991b1b" stroke="#dc2626" strokeWidth="0.8" />
                {/* Bulging Vent X-Score */}
                <path d="M 34 37 L 42 39 M 34 39 L 42 37" stroke="#fca5a5" strokeWidth="0.7" />
                {/* Brown electrolyte crust */}
                <circle cx="43" cy="40" r="1.8" fill="#78350f" />
                <circle cx="33" cy="39" r="1.2" fill="#78350f" />
              </g>

              {/* Choke Inductor (L1) */}
              <rect x="43" y="59" width="14" height="12" rx="2" fill="#18181b" stroke="#52525b" strokeWidth="0.9" />
              <text x="50" y="66" fill="#a1a1aa" fontSize="2.8" fontFamily="monospace" textAnchor="middle">
                R82
              </text>
            </g>
          )}

          {/* SCENARIO 2: 3D PRINTER HOTEND */}
          {scenario.id === 'printer3d' && (
            <g className="scenario-printer">
              {/* Aluminum Heatsink Body */}
              <rect x="36" y="16" width="28" height="24" rx="2" fill="#475569" stroke="#64748b" strokeWidth="0.7" />
              {/* Heatsink Horizontal Fins */}
              <line x1="32" y1="20" x2="68" y2="20" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="32" y1="24" x2="68" y2="24" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="32" y1="28" x2="68" y2="28" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="32" y1="32" x2="68" y2="32" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="32" y1="36" x2="68" y2="36" stroke="#94a3b8" strokeWidth="1.2" />

              {/* Bi-metal Heatbreak Neck */}
              <rect x="46" y="40" width="8" height="10" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="0.5" />

              {/* Aluminum Heater Block */}
              <rect x="34" y="50" width="32" height="18" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
              <circle cx="42" cy="59" r="3" fill="#64748b" /> {/* Heater cartridge hole */}
              <text x="42" y="60" fill="#f8fafc" fontSize="2" textAnchor="middle">
                24V
              </text>

              {/* Thermistor Cartridge + Exposed Frayed Wire */}
              <circle cx="68" cy="55" r="2.5" fill="#f59e0b" stroke="#d97706" strokeWidth="0.7" />
              <path d="M 68 55 Q 78 52 82 45" fill="none" stroke="#ef4444" strokeWidth="0.9" strokeDasharray="1,1" />
              <path d="M 68 55 Q 80 58 84 52" fill="none" stroke="#3b82f6" strokeWidth="0.9" />

              {/* MK8 Brass Nozzle + Carbonized Clog */}
              <polygon points="43,68 57,68 53,83 47,83" fill="#b45309" stroke="#78350f" strokeWidth="0.6" />
              {/* Molten Filament Leak at thread */}
              <ellipse cx="50" cy="69" rx="6" ry="1.5" fill="#18181b" opacity="0.9" />
              {/* Charred Tip Clog */}
              <ellipse cx="50" cy="83" rx="3.5" ry="1.8" fill="#000" stroke="#451a03" strokeWidth="0.5" />
            </g>
          )}

          {/* SCENARIO 3: AUTOMOTIVE ENGINE BAY */}
          {scenario.id === 'automotive' && (
            <g className="scenario-automotive">
              {/* Engine Block Contour */}
              <rect x="18" y="20" width="64" height="64" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="0.9" />
              {/* Alternator Housing */}
              <circle cx="42" cy="45" r="18" fill="#334155" stroke="#64748b" strokeWidth="1.2" />
              <circle cx="42" cy="45" r="12" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              {/* Ventilation Vanes */}
              <line x1="42" y1="30" x2="42" y2="35" stroke="#94a3b8" strokeWidth="1" />
              <line x1="42" y1="55" x2="42" y2="60" stroke="#94a3b8" strokeWidth="1" />
              <line x1="27" y1="45" x2="32" y2="45" stroke="#94a3b8" strokeWidth="1" />
              <line x1="52" y1="45" x2="57" y2="45" stroke="#94a3b8" strokeWidth="1" />

              {/* Alternator B+ Terminal & Blue-Green Corrosion */}
              <circle cx="42" cy="45" r="5" fill="#b45309" stroke="#ea580c" strokeWidth="0.8" />
              <path d="M 42 45 L 26 28" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
              {/* Blue-Green Sulfate Corrosion Crust */}
              <circle cx="42" cy="45" r="6" fill="#06b6d4" opacity="0.75" />
              <circle cx="44" cy="43" r="3" fill="#10b981" opacity="0.8" />
              <circle cx="40" cy="47" r="2.5" fill="#3b82f6" opacity="0.8" />

              {/* Pulleys */}
              <circle cx="68" cy="40" r="9" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
              <circle cx="68" cy="70" r="11" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />

              {/* Serpentine Belt with Fraying Edge */}
              <path
                d="M 42 63 L 68 79 L 77 70 L 77 40 L 42 27 Z"
                fill="none"
                stroke="#09090b"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Frayed cracks */}
              <line x1="60" y1="72" x2="62" y2="76" stroke="#ef4444" strokeWidth="1" />
              <line x1="64" y1="74" x2="66" y2="78" stroke="#ef4444" strokeWidth="1" />
            </g>
          )}

          {/* Render SAM 3.1 Segmentation Masks for each Part */}
          {scenario.parts.map((part) => {
            const isSelected = selectedPart?.id === part.id;
            const isHovered = hoveredPart?.id === part.id;

            // Neon color by status
            const color =
              part.status === 'critical'
                ? '#ef4444' // Red
                : part.status === 'warning'
                ? '#f59e0b' // Amber
                : '#10b981'; // Green

            // Construct polygon points string
            const pointsStr = part.polygon.map((p) => `${p.x},${p.y}`).join(' ');

            return (
              <g
                key={part.id}
                onMouseEnter={() => setHoveredPart(part)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPart(part);
                }}
                className="transition-all duration-200 cursor-pointer"
              >
                {/* SAM 3.1 Transparent Mask Area */}
                <polygon
                  points={pointsStr}
                  fill={color}
                  fillOpacity={isSelected ? 0.45 : isHovered ? 0.3 : 0.15}
                  stroke={color}
                  strokeWidth={isSelected ? 1.5 : isHovered ? 1.2 : 0.6}
                  strokeDasharray={isSelected ? '2,1' : 'none'}
                  filter={isSelected ? 'url(#neonGlowRed)' : undefined}
                />

                {/* Center Reticle Anchor */}
                <circle
                  cx={part.center.x}
                  cy={part.center.y}
                  r={isSelected ? 2.2 : 1.4}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                />

                {/* Part Silkscreen Badge on Canvas */}
                <rect
                  x={part.center.x - 7}
                  y={part.center.y - 6}
                  width="14"
                  height="3.6"
                  rx="0.8"
                  fill="#020617"
                  fillOpacity="0.85"
                  stroke={color}
                  strokeWidth="0.4"
                />
                <text
                  x={part.center.x}
                  y={part.center.y - 3.5}
                  fill="#f8fafc"
                  fontSize="2"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {part.designator.split(' - ')[0]}
                </text>
              </g>
            );
          })}

          {/* Interactive Radar Ping on Click (SAM 3.1 Zero-Shot Coordinate Animation) */}
          {pingEffect && (
            <g className="radar-ping">
              <circle
                cx={pingEffect.x}
                cy={pingEffect.y}
                r="1"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.8"
                className="animate-ping"
              />
              <circle cx={pingEffect.x} cy={pingEffect.y} r="0.8" fill="#22d3ee" />
              <line
                x1={pingEffect.x - 3}
                y1={pingEffect.y}
                x2={pingEffect.x + 3}
                y2={pingEffect.y}
                stroke="#22d3ee"
                strokeWidth="0.3"
              />
              <line
                x1={pingEffect.x}
                y1={pingEffect.y - 3}
                x2={pingEffect.x}
                y2={pingEffect.y + 3}
                stroke="#22d3ee"
                strokeWidth="0.3"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip when hovering over a part */}
        {hoveredPart && (
          <div
            className="absolute z-30 pointer-events-none px-3 py-1.5 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-md transition-all text-xs"
            style={{
              left: `${hoveredPart.center.x}%`,
              top: `${hoveredPart.center.y + 8}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="font-semibold text-slate-200">{hoveredPart.name}</div>
            <div className="text-[10px] font-mono text-cyan-400">{hoveredPart.designator}</div>
            <div className="mt-0.5 text-[10px] text-slate-400">
              Click to run Muse Spark multimodal diagnostic
            </div>
          </div>
        )}
      </div>

      {/* Canvas Bottom Control Hints */}
      <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            Click any component or point to invoke <strong>SAM 3.1</strong>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400 font-mono">
            Inference: <strong className="text-emerald-400">&lt;140ms</strong> via Baseten 2M TPM
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Critical
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Normal
          </span>
        </div>
      </div>
    </div>
  );
}
