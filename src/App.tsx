import { useState, FormEvent } from "react";
import MagnifyingCursor, { Fit } from "./components/MagnifyingCursor";
import {
  ZoomIn,
  Sliders,
  RotateCcw,
  Image as ImageIcon,
  Circle,
  Eye,
  Sparkles
} from "lucide-react";

const REQUESTED_IMAGE =
  "https://images.unsplash.com/photo-1662501553813-37cfaff7935f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const PRESET_IMAGES = [
  {
    name: "Architectural Symmetry (Default)",
    src: REQUESTED_IMAGE,
    focusY: 14,
    zoom: 2,
  },
  {
    name: "Mechanical Watch Detail",
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1470&auto=format&fit=crop",
    focusY: 50,
    zoom: 3,
  },
  {
    name: "Cosmic Nebula",
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1470&auto=format&fit=crop",
    focusY: 30,
    zoom: 2.5,
  },
  {
    name: "Macro Water Droplet",
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1470&auto=format&fit=crop",
    focusY: 20,
    zoom: 3.5,
  }
];

export default function App() {
  const [currentImage, setCurrentImage] = useState<string>(REQUESTED_IMAGE);
  const [zoom, setZoom] = useState<number>(2);
  const [focusY, setFocusY] = useState<number>(14);
  const [lensSize, setLensSize] = useState<number>(80);
  const [fit, setFit] = useState<Fit>("cover");
  const [rim, setRim] = useState<boolean>(true);
  const [rimColor, setRimColor] = useState<string>("#1c1917");
  const [rimWidth, setRimWidth] = useState<number>(5);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [customUrlInput, setCustomUrlInput] = useState<string>("");
  const [showUrlModal, setShowUrlModal] = useState<boolean>(false);

  const resetToDefaults = () => {
    setCurrentImage(REQUESTED_IMAGE);
    setZoom(2);
    setFocusY(14);
    setLensSize(80);
    setFit("cover");
    setRim(true);
    setRimColor("#1c1917");
    setRimWidth(5);
  };

  const applyCustomUrl = (e: FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setCurrentImage(customUrlInput.trim());
      setShowUrlModal(false);
      setCustomUrlInput("");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fbf9f5] text-[#2c2a29] flex flex-col items-center justify-between selection:bg-amber-100 font-sans antialiased">
      {/* Header Bar with Adjust Props toggle button */}
      <header className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between border-b border-[#eee8dd]/80 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#1c1917] text-[#fbf9f5] flex items-center justify-center font-bold text-sm shadow-xs">
            O
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-[#1c1917]">
              Image Magnifier
            </h1>
            <p className="text-xs text-[#8c827a]">
              Hover or touch to inspect micro-details
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowControls(!showControls)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              showControls
                ? "bg-[#1c1917] text-white shadow-xs"
                : "bg-white text-[#44403c] border border-[#e7e1d5] hover:bg-[#f5f0e6]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showControls ? "Hide Controls" : "Adjust Props"}</span>
          </button>

          <button
            onClick={resetToDefaults}
            title="Reset to initial props"
            className="p-1.5 rounded-lg text-[#78716c] hover:text-[#1c1917] bg-white border border-[#e7e1d5] hover:bg-[#f5f0e6] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container - Centered Image Viewport */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-center relative">
        {/* Subtle Hint Banner */}
        <div className="mb-4 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e8e2d7] shadow-xs text-xs text-[#57534e] backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Move cursor over the canvas to activate magnifying lens</span>
        </div>

        {/* Magnifier Canvas Wrapper - Centered, Clean canvas without text badge overlays */}
        <div className="relative w-full max-w-4xl h-[65vh] min-h-[380px] max-h-[620px] rounded-2xl overflow-hidden bg-white shadow-[0_12px_40px_-12px_rgba(28,25,23,0.12)] border border-[#ebd2ba]/40 transition-all">
          <MagnifyingCursor
            image={{ src: currentImage, alt: "Magnified detail photo" }}
            fit={fit}
            focusY={focusY}
            zoom={zoom}
            lensSize={lensSize}
            rim={rim}
            rimOptions={{ color: rimColor, width: rimWidth }}
            className="w-full h-full"
          />
        </div>

        {/* Preset Selector Bar below canvas */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {PRESET_IMAGES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentImage(item.src);
                setFocusY(item.focusY);
                setZoom(item.zoom);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                currentImage === item.src
                  ? "bg-[#1c1917] text-white shadow-xs"
                  : "bg-white text-[#57534e] border border-[#e8e2d7] hover:bg-[#f5f0e6]"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 opacity-70" />
              <span>{item.name}</span>
            </button>
          ))}
          <button
            onClick={() => setShowUrlModal(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-100/70 text-amber-900 border border-amber-200/80 hover:bg-amber-200/60 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>+ Custom URL</span>
          </button>
        </div>
      </main>

      {/* Adjustable Controls Panel */}
      {showControls && (
        <div className="w-full bg-white border-t border-[#e8e2d7] shadow-lg px-6 py-5 transition-all z-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Control 1: Zoom Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[#1c1917]">
                <span className="flex items-center space-x-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-700" />
                  <span>Zoom Level</span>
                </span>
                <span className="font-mono bg-[#f5f0e6] px-2 py-0.5 rounded text-[11px] text-[#44403c]">
                  {zoom}x
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[#1c1917] bg-[#e8e2d7] h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#a89f91]">
                <span>1x (100%)</span>
                <span>8x (800%)</span>
              </div>
            </div>

            {/* Control 2: Lens Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[#1c1917]">
                <span className="flex items-center space-x-1.5">
                  <Circle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lens Size</span>
                </span>
                <span className="font-mono bg-[#f5f0e6] px-2 py-0.5 rounded text-[11px] text-[#44403c]">
                  {lensSize}px
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="200"
                step="5"
                value={lensSize}
                onChange={(e) => setLensSize(parseInt(e.target.value, 10))}
                className="w-full accent-[#1c1917] bg-[#e8e2d7] h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#a89f91]">
                <span>40px</span>
                <span>200px</span>
              </div>
            </div>

            {/* Control 3: Focus Y */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[#1c1917]">
                <span className="flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  <span>Focus Y</span>
                </span>
                <span className="font-mono bg-[#f5f0e6] px-2 py-0.5 rounded text-[11px] text-[#44403c]">
                  {focusY}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={focusY}
                onChange={(e) => setFocusY(parseInt(e.target.value, 10))}
                className="w-full accent-[#1c1917] bg-[#e8e2d7] h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#a89f91]">
                <span>0% (Top)</span>
                <span>100% (Bottom)</span>
              </div>
            </div>

            {/* Control 4: Rim Options & Fit */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[#1c1917]">
                <span>Rim & Fit Styling</span>
                <button
                  onClick={() => setFit(fit === "cover" ? "contain" : "cover")}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#f5f0e6] text-[#44403c] border border-[#e0d8c8] hover:bg-[#eae3d5] transition-colors uppercase cursor-pointer"
                >
                  Fit: {fit}
                </button>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <label className="flex items-center space-x-1.5 text-xs text-[#44403c] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rim}
                    onChange={(e) => setRim(e.target.checked)}
                    className="rounded text-[#1c1917] focus:ring-0 accent-[#1c1917] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>Show Rim</span>
                </label>

                {rim && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={rimColor}
                      onChange={(e) => setRimColor(e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 p-0"
                      title="Rim Color"
                    />
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={rimWidth}
                      onChange={(e) => setRimWidth(parseInt(e.target.value, 10))}
                      className="w-16 accent-[#1c1917] bg-[#e8e2d7] h-1.5 rounded-lg cursor-pointer"
                      title="Rim Width"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-3 text-center text-xs text-[#a3998e] border-t border-[#eee8dd]/60">
        <span>Image Magnifier • Originkit Component Specification</span>
      </footer>

      {/* Modal for Custom URL */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e8e2d7] space-y-4">
            <h3 className="text-base font-semibold text-[#1c1917]">
              Enter Custom Image URL
            </h3>
            <p className="text-xs text-[#78716c]">
              Paste a direct image URL (JPEG, PNG, WebP) to inspect with the magnifier.
            </p>
            <form onSubmit={applyCustomUrl} className="space-y-4">
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#d6cebf] focus:outline-none focus:ring-2 focus:ring-[#1c1917]"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#78716c] hover:text-[#1c1917] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-[#1c1917] text-white rounded-xl shadow-xs hover:bg-[#322e2b] cursor-pointer"
                >
                  Load Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

