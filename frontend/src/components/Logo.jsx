import React from 'react';

export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Precision Reticle Bracket */}
      <path
        d="M 12 18 L 12 12 L 18 12"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 30 12 L 36 12 L 36 18"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 36 30 L 36 36 L 30 36"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 18 36 L 12 36 L 12 30"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Primary Optical Lens Ring */}
      <circle
        cx="24"
        cy="24"
        r="11"
        stroke="#0D9488"
        strokeWidth="2.5"
      />

      {/* Inner Precision Focal Ring */}
      <circle
        cx="24"
        cy="24"
        r="6"
        stroke="#0D9488"
        strokeWidth="1.25"
        strokeDasharray="2.5 1.5"
      />

      {/* Calibration Crosshair Ticks */}
      <line x1="24" y1="9" x2="24" y2="12" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="36" x2="24" y2="39" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="24" x2="12" y2="24" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="24" x2="39" y2="24" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />

      {/* Optical Center Core */}
      <circle cx="24" cy="24" r="2" fill="#0F172A" />
    </svg>
  );
}
