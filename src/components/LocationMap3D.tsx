import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Compass,
  Layers,
  Phone,
  Copy,
  Check,
  Building,
  Eye,
  Maximize2,
  Sparkles,
} from "lucide-react";

interface LocationMap3DProps {
  onOpenBooking?: () => void;
}

export const LocationMap3D: React.FC<LocationMap3DProps> = ({ onOpenBooking }) => {
  const [mapMode, setMapMode] = useState<"streetview3d" | "interactiveMap" | "satellite">("streetview3d");
  const [copied, setCopied] = useState(false);

  const googleMapsUrl =
    "https://www.google.com/maps/place/GBS+International+Educational+Consultancy/@27.7057191,85.3209855,3a,75y,171.93h,106.21t/data=!3m7!1e1!3m5!1srUML-B_tt67mC2ndgPYZQA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-16.205249645863802%26panoid%3DrUML-B_tt67mC2ndgPYZQA%26yaw%3D171.93295941196345!7i13312!8i6656!4m22!1m15!4m14!1m6!1m2!1s0x39eb1949eed21fcf:0xd4474e83fe080914!2sGBS+International+Educational+Consultancy,+Sallyan+House,+Kathmandu+44605!2m2!1d85.3211621!2d27.7054281!1m6!1m2!1s0x39eb1949eed21fcf:0xd4474e83fe080914!2sGBS+International+Educational+Consultancy,+Sallyan+House,+Kathmandu+44605!2m2!1d85.3211621!2d27.7054281!3m5!1s0x39eb1949eed21fcf:0xd4474e83fe080914!8m2!3d27.7054281!4d85.3211621!16s%2Fg%2F11njq7p9n3?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D";

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=27.7054281,85.3211621&destination_place_id=ChIJzx_S7kkZ6zkRFAkI_oNOR9Q";

  const streetViewThumbnail =
    "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?cb_client=maps_sv.tactile&w=1200&h=800&pitch=-16.205249645863802&panoid=rUML-B_tt67mC2ndgPYZQA&yaw=171.93295941196345";

  const embedMapUrl =
    "https://maps.google.com/maps?q=27.7054281,85.3211621+(GBS+International+Educational+Consultancy+Sallyan+House+Bagbazar)&t=m&z=17&ie=UTF8&iwloc=B&output=embed";

  const embedSatelliteUrl =
    "https://maps.google.com/maps?q=27.7054281,85.3211621+(GBS+International+Educational+Consultancy+Sallyan+House+Bagbazar)&t=k&z=18&ie=UTF8&iwloc=B&output=embed";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("GBS International Educational Consultancy, Sallyan House, 2nd Floor, Bagbazar, Kathmandu, Nepal");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Header Bento Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-800/60 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
              <Compass className="w-3 h-3 text-red-400" />
              <span>Interactive 3D Location & Street View</span>
            </span>
            <span className="text-xs text-amber-400 font-bold hidden sm:inline">
              Sallyan House, Bagbazar
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Explore GBS Office in 3D (360° Street View)
          </h3>
          <p className="text-xs text-stone-400 mt-0.5 font-medium">
            Kathmandu 44605 • Opposite major education lane, Bagbazar Road
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-2xl border border-stone-800 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMapMode("streetview3d")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapMode === "streetview3d"
                ? "bg-red-600 text-white shadow-xs"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Street View</span>
          </button>

          <button
            type="button"
            onClick={() => setMapMode("interactiveMap")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapMode === "interactiveMap"
                ? "bg-stone-100 text-stone-900 shadow-xs"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Road Map</span>
          </button>

          <button
            type="button"
            onClick={() => setMapMode("satellite")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapMode === "satellite"
                ? "bg-stone-100 text-stone-900 shadow-xs"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Satellite 3D</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display Screen */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 aspect-video md:aspect-[21/9] min-h-[320px] shadow-inner group">
        
        {mapMode === "streetview3d" && (
          <div className="relative w-full h-full">
            {/* Street View Image Preview */}
            <img
              src={streetViewThumbnail}
              alt="GBS International Educational Consultancy 3D Street View Sallyan House Bagbazar Kathmandu"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 pointer-events-none" />

            {/* 3D Pin & Building Indicator on Street View */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 space-y-2">
              <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/80 px-3.5 py-2 rounded-2xl text-white shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>Sallyan House (2nd Floor)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-stone-300 font-medium">
                    GBS International Educational Consultancy
                  </div>
                </div>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-stone-950/80 backdrop-blur-md rounded-xl border border-stone-800 text-[10px] font-mono text-stone-300">
                <span>📍 Yaw: 171.93° • Pitch: -16.2° • 360° Pano</span>
              </div>
            </div>

            {/* Bottom Callout in Street View */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-950/90 backdrop-blur-md p-4 rounded-2xl border border-stone-800">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive 360° Street View Available</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Walk through Bagbazar Road virtually and view Sallyan House facade in full 3D.
                </p>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Launch Full 3D Street View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {mapMode === "interactiveMap" && (
          <div className="w-full h-full relative">
            <iframe
              title="Google Map Location of GBS Educational Consultancy Sallyan House Bagbazar"
              src={embedMapUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {mapMode === "satellite" && (
          <div className="w-full h-full relative">
            <iframe
              title="Satellite 3D View of GBS Educational Consultancy Bagbazar"
              src={embedSatelliteUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

      </div>

      {/* Quick Action Bento Grid & Route Distances */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Bento: Landmark & Navigation Guide */}
        <div className="md:col-span-7 bg-stone-900/80 p-5 rounded-2xl border border-stone-800/90 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-stone-200 uppercase tracking-wider text-[11px]">
              How to Reach Sallyan House, Bagbazar:
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/40">
              Center of Kathmandu
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px]">
            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-stone-400 block text-[10px]">From Ratnapark Bus Stop</span>
              <strong className="text-white font-bold">250 meters (3 min walk)</strong>
            </div>

            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-stone-400 block text-[10px]">From Putalisadak Chowk</span>
              <strong className="text-white font-bold">450 meters (5 min walk)</strong>
            </div>

            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-stone-400 block text-[10px]">From New Road Gate</span>
              <strong className="text-white font-bold">700 meters (8 min walk)</strong>
            </div>

            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-stone-400 block text-[10px]">From Gongabu Bus Park</span>
              <strong className="text-white font-bold">4.5 km (15 min micro/bus)</strong>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 leading-relaxed pt-1">
            <strong className="text-stone-200">Landmark Tip:</strong> Walk past the Bagbazar main entrance lane, Sallyan House is on the main road directly opposite the major education bookstore row. Look for the GBS signage on the building facade.
          </p>
        </div>

        {/* Right Bento: Actions & Live Navigation */}
        <div className="md:col-span-5 bg-stone-900/80 p-5 rounded-2xl border border-stone-800/90 space-y-3 flex flex-col justify-between text-xs">
          <div>
            <span className="font-extrabold text-stone-200 uppercase tracking-wider text-[11px] block mb-2">
              Instant Navigation Actions
            </span>

            <div className="space-y-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center justify-between transition-colors shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  <span>Get GPS Directions (Google Maps)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold border border-stone-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Open 3D Street View in New Tab</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full py-2.5 px-3.5 bg-stone-950 hover:bg-stone-900 text-stone-300 rounded-xl font-semibold border border-stone-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-400" />}
                  <span>{copied ? "Address Copied to Clipboard!" : "Copy Sallyan House Address"}</span>
                </div>
                <span className="text-[10px] text-stone-500 font-mono">44605</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <a
              href="tel:9744427779"
              className="text-stone-300 hover:text-white flex items-center gap-1.5 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Desk: 9744427779</span>
            </a>

            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
              >
                Book In-Person Visit →
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
