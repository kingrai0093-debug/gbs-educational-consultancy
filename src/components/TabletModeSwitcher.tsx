import React, { useState } from "react";
import { Tablet, Smartphone, Monitor, Check, Sparkles, ChevronDown } from "lucide-react";
import { ViewMode } from "../hooks/useDeviceViewMode";
import { motion, AnimatePresence } from "motion/react";

interface TabletModeSwitcherProps {
  viewMode: ViewMode;
  isAndroid: boolean;
  isAutoDetected: boolean;
  onSetViewMode: (mode: ViewMode) => void;
}

export const TabletModeSwitcher: React.FC<TabletModeSwitcherProps> = ({
  viewMode,
  isAndroid,
  isAutoDetected,
  onSetViewMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const modeOptions: { id: ViewMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "tablet",
      label: "Tablet Mode",
      icon: <Tablet className="w-3.5 h-3.5" />,
      desc: isAndroid ? "Auto-enabled for Android (Spacious Layout)" : "Spacious multi-column layout",
    },
    {
      id: "standard",
      label: "Phone / Standard",
      icon: <Smartphone className="w-3.5 h-3.5" />,
      desc: "Standard adaptive mobile layout",
    },
    {
      id: "desktop",
      label: "Desktop View",
      icon: <Monitor className="w-3.5 h-3.5" />,
      desc: "Full widescreen layout",
    },
  ];

  return (
    <div className="relative inline-block text-xs select-none">
      {/* Pill Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer shadow-sm ${
          viewMode === "tablet"
            ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-200 hover:bg-emerald-900/90"
            : "bg-stone-900/90 border-stone-700 text-stone-300 hover:bg-stone-800"
        }`}
        title="Switch Layout Mode (Tablet / Phone / Desktop)"
      >
        {viewMode === "tablet" ? (
          <Tablet className="w-3 h-3 text-emerald-400" />
        ) : viewMode === "desktop" ? (
          <Monitor className="w-3 h-3 text-blue-400" />
        ) : (
          <Smartphone className="w-3 h-3 text-stone-400" />
        )}

        <span className="font-semibold text-[11px] whitespace-nowrap">
          {viewMode === "tablet" ? (
            <>
              {isAndroid ? "Android Tablet Mode" : "Tablet Mode"}
              {isAutoDetected && (
                <span className="ml-1 text-[9px] bg-emerald-500/30 text-emerald-300 px-1 py-0.2 rounded font-black">
                  AUTO
                </span>
              )}
            </>
          ) : viewMode === "desktop" ? (
            "Desktop View"
          ) : (
            "Phone View"
          )}
        </span>

        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-1.5 w-64 p-2 bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl z-50 text-stone-200 space-y-1"
            >
              <div className="px-2.5 py-1.5 border-b border-stone-800/80 flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Layout Display Mode
                </span>
                {isAndroid && (
                  <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Android Detected
                  </span>
                )}
              </div>

              {modeOptions.map((opt) => {
                const isActive = viewMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onSetViewMode(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                      isActive
                        ? "bg-stone-800 text-white font-bold"
                        : "hover:bg-stone-900 text-stone-300"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-800 text-stone-400"
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{opt.label}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-[10px] text-stone-400 font-normal leading-tight mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
