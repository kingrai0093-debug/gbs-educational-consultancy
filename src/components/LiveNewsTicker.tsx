import React, { useState } from "react";
import {
  GraduationCap,
  X,
  Play,
  Pause,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { NewsTickerItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LiveNewsTickerProps {
  onOpenBooking?: () => void;
}

export const LiveNewsTicker: React.FC<LiveNewsTickerProps> = ({ onOpenBooking }) => {
  const { tickerItems, settings } = useAdminData();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsTickerItem | null>(null);

  // Active items from admin context with fallback
  const activeItems = tickerItems.filter((item) => item.isActive);
  const displayItems = activeItems.length > 0 ? activeItems : tickerItems;

  // Duplicate items for continuous seamless infinite marquee loop
  const marqueeItems = [...displayItems, ...displayItems, ...displayItems];

  const currentNewsSourceUrl = settings.newsSourceUrl || "https://nepallive.com/";
  const currentNewsSourceName = settings.newsSourceName || "NepalLive.com & News24 Nepal";

  return (
    <>
      <aside
        aria-label="Education News & Official Advisory Bulletins"
        className="w-full bg-[#080d1a] text-slate-100 border-b border-indigo-950/80 relative z-30 text-xs shadow-md select-none"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          
          {/* Big Live Education Notice Badge with Real Source Link */}
          <div className="flex items-center gap-2 shrink-0 z-10 bg-[#060a14] py-1 pr-3 rounded-xl border-r border-indigo-900/50">
            <a
              href={currentNewsSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 border border-red-500/40 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all group"
              title={`Live Verified Portal Source: ${currentNewsSourceName}`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              <GraduationCap className="w-4 h-4 text-white" />
              <span>शिक्षा बुलेटिन</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-950/90 text-amber-300 font-extrabold hidden sm:inline">
                LIVE
              </span>
            </a>
          </div>

          {/* CENTER DISPLAY AREA (Large & Bold) */}
          <div className="flex-1 overflow-hidden relative min-w-0 h-8 sm:h-9 flex items-center">
            
            {/* CONTINUOUS GENTLE SLOW MARQUEE */}
            <div
              className={`flex items-center gap-12 animate-marquee-smooth ${
                !isPlaying ? "pause-animation" : ""
              }`}
            >
              {marqueeItems.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => setSelectedNews(item)}
                  type="button"
                  className="flex items-center gap-3 hover:text-amber-300 transition-colors whitespace-nowrap group shrink-0 cursor-pointer text-left"
                >
                  <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-indigo-950 text-indigo-200 border border-indigo-800/80 shadow-xs">
                    {item.badge}
                  </span>

                  <span className="font-black text-white group-hover:text-amber-300 transition-colors text-sm sm:text-base font-nepali">
                    {item.titleNepali || item.title}
                  </span>

                  {item.titleNepali && (
                    <span className="text-slate-300 group-hover:text-amber-200 text-xs sm:text-sm font-semibold hidden md:inline">
                      • {item.title}
                    </span>
                  )}

                  <span className="text-red-500 text-sm font-bold px-1">•</span>
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT CONTROLS: Portal Link & Play/Pause */}
          <div className="flex items-center gap-2 shrink-0 z-10 bg-[#060a14] py-1 pl-2.5 rounded-xl border-l border-indigo-950">
            <a
              href={currentNewsSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:text-cyan-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              title={`Live News Source: ${currentNewsSourceName}`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate max-w-[130px]">{currentNewsSourceName.split("&")[0]}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause News Ticker" : "Resume News Ticker"}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-slate-800"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-slate-300" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>

        </div>
      </aside>

      {/* MODAL: Verified Education Notice Reader */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0a1124] border border-indigo-900/60 text-slate-100 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5"
            >
              
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Notice Category Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 text-white font-black text-xs uppercase shadow-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{selectedNews.badge}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Education Advisory • {selectedNews.date}</span>
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug font-nepali">
                  {selectedNews.titleNepali || selectedNews.title}
                </h3>
                {selectedNews.titleNepali && (
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedNews.title}
                  </p>
                )}
              </div>

              {/* Detail Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#060a14] border border-indigo-950 text-xs sm:text-sm text-slate-200 leading-relaxed font-nepali space-y-2">
                <p>{selectedNews.detail || selectedNews.title}</p>
              </div>

              {/* Verified Source Portal Reference */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Source Portal: <strong>{currentNewsSourceName}</strong></span>
                </div>

                <a
                  href={selectedNews.sourcePortalUrl || selectedNews.link || currentNewsSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
                >
                  <span>Open Live Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedNews(null);
                      onOpenBooking();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-[#25479D] hover:brightness-110 text-white rounded-xl font-bold transition-all cursor-pointer shadow-md"
                  >
                    🎓 Book In-Person Counseling
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  बन्द गर्नुहोस् (Close)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
