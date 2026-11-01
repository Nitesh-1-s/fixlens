import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, AlertCircle, FlipHorizontal, Zap, ZapOff } from 'lucide-react';

export default function CameraModal({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    let activeStream = null;

    async function startCamera() {
      // Stop any existing tracks
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraError(null);

      try {
        const constraints = {
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        };

        const s = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = s;
        setStream(s);

        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }

        // Check torch support
        const track = s.getVideoTracks()[0];
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        if (capabilities.torch) {
          setHasTorch(true);
        }
      } catch (err) {
        console.warn('Camera access error:', err);
        setCameraError(
          'Unable to access camera. Please ensure camera permissions are allowed, or tap Upload to select a photo from your gallery.'
        );
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const toggleTorch = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    if (track && hasTorch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !torchOn }]
        });
        setTorchOn(!torchOn);
      } catch (err) {
        console.warn('Torch failed:', err);
      }
    }
  };

  const handleSnap = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);

    // Turn off torch if it was on
    if (torchOn && stream) {
      const track = stream.getVideoTracks()[0];
      track.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      onCapture(capturedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between text-white safe-top safe-bottom">
      {/* Top Mobile Camera Bar */}
      <div className="p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 backdrop-blur-md transition-colors"
          title="Close Camera"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span>FIX-LENS OPTICAL SCANNER</span>
        </div>

        <div className="flex items-center gap-2">
          {hasTorch && (
            <button
              onClick={toggleTorch}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                torchOn ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/80 hover:text-white'
              }`}
              title="Toggle Flashlight"
            >
              {torchOn ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={toggleCamera}
            className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 backdrop-blur-md transition-colors"
            title="Switch Camera (Front/Rear)"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Viewfinder Center */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden bg-black">
        {cameraError ? (
          <div className="p-6 text-center text-slate-300 max-w-sm">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white mb-2">Camera Unavailable</h3>
            <p className="text-xs leading-relaxed mb-5 text-slate-400">{cameraError}</p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
            >
              Close & Upload Image File Instead
            </button>
          </div>
        ) : capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured Hardware"
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Precision Optical Viewfinder Reticle */}
            <div className="absolute inset-8 sm:inset-16 pointer-events-none border border-teal-400/40 rounded-3xl">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-teal-400"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-teal-400"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-teal-400"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-teal-400"></div>

              {/* Center Crosshair Target */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-teal-400/50"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-400 shadow-sm shadow-teal-300"></div>
                </div>
              </div>

              {/* Hint badge */}
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10">
                  Align defect or component inside box
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Shutter & Action Bar (Native Mobile Camera Layout) */}
      <div className="p-6 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-around z-20">
        {capturedImage ? (
          <div className="flex items-center justify-between w-full max-w-sm mx-auto gap-4">
            <button
              onClick={handleRetake}
              className="flex-1 py-3 bg-white/15 hover:bg-white/20 text-white font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 backdrop-blur-md transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" /> Retake
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-900/40 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" /> Analyze Defect
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            {/* Native Touch Shutter Button */}
            <button
              onClick={handleSnap}
              className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform shadow-xl"
              title="Snap Hardware Photo"
            >
              <div className="w-16 h-16 rounded-full bg-white hover:bg-slate-200 transition-colors"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
