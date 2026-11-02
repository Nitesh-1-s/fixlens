import React, { useState } from 'react';
import { Camera, Upload, ArrowRight } from 'lucide-react';

export default function UploadCameraEntry({
  onOpenCamera,
  onFileUpload
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileUpload({ target: { files: [file] } });
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center items-center">
      {/* Clean Professional Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Hardware Diagnostic Intelligence
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          Capture or upload a photo of any hardware component, machinery, or circuit board to identify defects, pinpoint failures, and view step-by-step repair instructions.
        </p>
      </div>

      {/* Main Action Cards: Camera & Upload */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
        {/* Card 1: Camera */}
        <button
          type="button"
          onClick={onOpenCamera}
          className="bg-white border-2 border-teal-600/90 hover:border-teal-600 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-md active:scale-[0.99] group"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 group-hover:bg-teal-100/80 flex items-center justify-center text-teal-700 transition-colors mb-4">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Take Photo
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-5">
            Use your device camera to inspect components in real time.
          </p>
          <div className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs">
            <span>Open Camera</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Card 2: Upload */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bg-white border-2 ${
            isDragging ? 'border-teal-600 bg-teal-50/20' : 'border-slate-200 hover:border-slate-300'
          } rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all hover:shadow-md group`}
        >
          <input
            type="file"
            id="main-file-upload"
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
          />
          <label htmlFor="main-file-upload" className="w-full h-full flex flex-col items-center cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              Upload Image
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              Select an existing photo or drag and drop (JPG, PNG, WEBP).
            </p>
            <div className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs">
              <span>Browse Files</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
