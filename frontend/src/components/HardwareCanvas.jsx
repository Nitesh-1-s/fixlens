import React, { useRef, useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  Crosshair,
  Maximize2,
} from 'lucide-react';

export default function HardwareCanvas({
  scenario,
  selectedPart,
  onSelectPart,
  onAddPointPrompt,
  clickPoint,
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, visible: false });
  const [hoveredPart, setHoveredPart] = useState(null);
  const [pingEffect, setPingEffect] = useState(null);

  // Determine the real image source
  const imageSrc =
    scenario.customImageUrl ||
    (scenario.id === 'motherboard'
      ? '/images/motherboard.png'
      : scenario.id === 'printer3d'
      ? '/images/printer3d.png'
      : '/images/automotive.png');

  // Mouse coordinate tracker for precision HUD
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x: xPct.toFixed(1), y: yPct.toFixed(1), visible: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, visible: false }));
    setHoveredPart(null);
  };

  const handleClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setPingEffect({ x: xPct, y: yPct, id: Date.now() });

    // Check if clicked an existing part or near a part
    let closestPart = null;
    let minDist = Infinity;
    scenario.parts.forEach((part) => {
      const dist = Math.hypot(part.center.x - xPct, part.center.y - yPct);
      if (dist < minDist) {
        minDist = dist;
        closestPart = part;
      }
    });

    if (closestPart && minDist < 28) {
      onSelectPart(closestPart);
    }
  };

  useEffect(() => {
    if (clickPoint) {
      setPingEffect({ x: clickPoint.x, y: clickPoint.y, id: Date.now() });
    }
  }, [clickPoint]);

  const statusColor = (status) => {
    if (status === 'critical') return '#DC2626'; // Red
    if (status === 'warning') return '#D97706';  // Amber
    return '#0D9488';                           // Teal
  };

  return (
    <div className="relative flex flex-col flex-1 h-full min-h-[580px] bg-white border border-slate-200 rounded-2xl overflow-hidden select-none shadow-sm">
      {/* Top Vision Inspection HUD (Clean White) */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-100 text-slate-700 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-[11px] font-mono text-teal-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
            SAM-3.1 REAL OPTICAL FEED
          </div>
          <span className="hidden sm:inline text-slate-300 text-xs">|</span>
          <span className="hidden sm:inline text-[11px] font-mono text-slate-400">
            High-Resolution Physical Capture
          </span>
        </div>

        {/* HUD Controls */}
        <div className="flex items-center gap-2">
          {mousePos.visible && (
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-500">
              <span>X: <strong className="text-slate-800">{mousePos.x}%</strong></span>
              <span>Y: <strong className="text-slate-800">{mousePos.y}%</strong></span>
            </div>
          )}

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-lg text-xs transition-colors border ${
              showGrid
                ? 'bg-teal-50 text-teal-700 border-teal-200'
                : 'text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle Calibration Grid"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-600 px-1 font-semibold">
              {(zoom * 100).toFixed(0)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Inspection Canvas (Clean White Background with Real Photo) */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden p-6 bg-white"
      >
        {/* Subtle Engineering CAD Grid */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40 z-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        )}

        {/* Viewfinder Corner Overlays */}
        <div className="absolute inset-4 pointer-events-none border border-slate-200/60 rounded-xl z-20">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal-600"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal-600"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-600"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-600"></div>
        </div>

        {/* Zoomable Image + SVG Overlay Container */}
        <div
          ref={containerRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-full max-h-[620px] rounded-xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-950 z-10"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.12s ease-out',
          }}
        >
          {/* REAL PHOTOGRAPH OF HARDWARE */}
          <img
            src={imageSrc}
            alt={scenario.title}
            className="w-full h-auto max-h-[580px] object-cover block select-none pointer-events-none"
          />

          {/* Precision SAM 3.1 Segmentation SVG Overlay directly on top of real photo */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            preserveAspectRatio="none"
          >
            {/* SAM 3.1 Segmentation Masks */}
            {scenario.parts.map((part) => {
              const isSelected = selectedPart?.id === part.id;
              const isHovered = hoveredPart?.id === part.id;
              const color = statusColor(part.status);
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
                  className="cursor-pointer"
                >
                  {/* Clean Translucent Mask on Real Photo */}
                  <polygon
                    points={pointsStr}
                    fill={color}
                    fillOpacity={isSelected ? 0.38 : isHovered ? 0.25 : 0.12}
                    stroke={color}
                    strokeWidth={isSelected ? 1.5 : isHovered ? 1.1 : 0.7}
                  />

                  {/* Corner Precision Ticks */}
                  {isSelected &&
                    part.polygon.map((p, pIdx) => (
                      <circle
                        key={pIdx}
                        cx={p.x}
                        cy={p.y}
                        r="0.8"
                        fill="#FFFFFF"
                        stroke={color}
                        strokeWidth="0.4"
                      />
                    ))}

                  {/* Center Dot */}
                  <circle
                    cx={part.center.x}
                    cy={part.center.y}
                    r={isSelected ? 1.8 : 1.2}
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth="0.4"
                  />

                  {/* Clean Component Silkscreen Tag */}
                  <g transform={`translate(${part.center.x - 8}, ${part.center.y - 6})`}>
                    <rect
                      width="16"
                      height="3.6"
                      rx="0.8"
                      fill="#FFFFFF"
                      stroke={color}
                      strokeWidth="0.5"
                      className="drop-shadow-sm"
                    />
                    <text
                      x="8"
                      y="2.5"
                      fill="#0F172A"
                      fontSize="1.8"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {part.designator.split(' - ')[0]}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Radar Scan Ping Animation on Click */}
            {pingEffect && (
              <g className="pointer-events-none">
                <circle
                  cx={pingEffect.x}
                  cy={pingEffect.y}
                  r="1"
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="0.6"
                  className="animate-ping"
                />
                <circle cx={pingEffect.x} cy={pingEffect.y} r="0.8" fill="#0D9488" />
                <line
                  x1={pingEffect.x - 3}
                  y1={pingEffect.y}
                  x2={pingEffect.x + 3}
                  y2={pingEffect.y}
                  stroke="#0D9488"
                  strokeWidth="0.3"
                />
                <line
                  x1={pingEffect.x}
                  y1={pingEffect.y - 3}
                  x2={pingEffect.x}
                  y2={pingEffect.y + 3}
                  stroke="#0D9488"
                  strokeWidth="0.3"
                />
              </g>
            )}
          </svg>

          {/* Hover Tooltip (Clean White Card) */}
          {hoveredPart && (
            <div
              className="absolute z-30 pointer-events-none px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-2xl text-xs"
              style={{
                left: `${hoveredPart.center.x}%`,
                top: `${hoveredPart.center.y + 8}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    hoveredPart.status === 'critical'
                      ? 'bg-red-500'
                      : hoveredPart.status === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-teal-500'
                  }`}
                />
                {hoveredPart.name}
              </div>
              <div className="text-[10px] font-mono text-teal-600 mt-0.5 font-medium">
                {hoveredPart.designator}
              </div>
              <div className="text-[9px] text-slate-400 mt-1 font-mono">
                CLICK TO EXECUTE MUSE SPARK DIAGNOSTIC
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Industrial Inspection Footer (Clean White) */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
            <Crosshair className="w-3.5 h-3.5 text-teal-600" />
            Click component or point to invoke <strong>SAM 3.1</strong>
          </span>
          <span className="hidden md:inline text-slate-200">|</span>
          <span className="hidden md:inline font-mono text-[11px] text-slate-400">
            Inference: <strong className="text-teal-600">&lt;140ms</strong> via Baseten 2M TPM
          </span>
        </div>

        {/* Status Legend */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-red-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical
          </span>
          <span className="flex items-center gap-1.5 text-amber-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning
          </span>
          <span className="flex items-center gap-1.5 text-teal-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span> Normal
          </span>
        </div>
      </div>
    </div>
  );
}
