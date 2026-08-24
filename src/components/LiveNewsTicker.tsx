import React, { useState, useEffect, useRef } from "react";
import {
  Radio,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Play,
  Pause,
  SlidersHorizontal,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { NEWS24_LATEST_FEED, News24Item } from "../data/news24Nepal";
import { motion, AnimatePresence } from "motion/react";

interface LiveNewsTickerProps {
  onOpenBooking?: () => void;
}

export const LiveNewsTicker: React.FC<LiveNewsTickerProps> = ({ onOpenBooking }) => {
  const [tickerMode, setTickerMode] = useState<"marquee" | "slide">("marquee");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<"slow" | "normal">("slow");
  const [selectedNews, setSelectedNews] = useState<News24Item | null>(null);
  const [progress, setProgress] = useState(0);

  // Relaxed, slow reading interval: 10s or 14s
  const ROTATION_INTERVAL_MS = speed === "slow" ? 12000 : 8500;
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic for "slide" mode with progress bar countdown
  useEffect(() => {
    if (tickerMode !== "slide" || !isPlaying || NEWS24_LATEST_FEED.length <= 1) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const intervalTime = ROTATION_INTERVAL_MS;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / intervalTime) * 100, 100);
      setProgress(pct);

      if (elapsed >= intervalTime) {
        setCurrentIndex((prev) => (prev + 1) % NEWS24_LATEST_FEED.length);
        setProgress(0);
      }
    }, 50);

    progressTimerRef.current = timer;

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, isPlaying, tickerMode, speed, ROTATION_INTERVAL_MS]);

  const currentItem = NEWS24_LATEST_FEED[currentIndex] || NEWS24_LATEST_FEED[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? NEWS24_LATEST_FEED.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NEWS24_LATEST_FEED.length);
    setProgress(0);
  };

  // Duplicate items for continuous seamless infinite marquee loop
  const marqueeItems = [...NEWS24_LATEST_FEED, ...NEWS24_LATEST_FEED, ...NEWS24_LATEST_FEED];

  return (
    <>
      <aside
        aria-label="Education News & Official Advisory Bulletins"
        className="w-full bg-[#080d1a] text-slate-100 border-b border-indigo-950/80 relative z-30 text-xs shadow-md select-none"
      >
        {/* Top Progress countdown line for Slide Mode */}
        {tickerMode === "slide" && isPlaying && (
          <div className="w-full h-0.5 bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 transition-all ease-linear"
              style={{ width: `${progress}%`, transitionDuration: "50ms" }}
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-1.5 flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Live Education Notice Badge (No external URLs/sources shown) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-10 bg-[#060a14] py-0.5 pr-2 rounded-r-xl border-r border-indigo-900/40">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-700 border border-red-500/40 text-white font-black text-[10px] tracking-wider uppercase shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-white broadcast-dot-pulse"></span>
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>शिक्षा बुलेटिन</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950/80 text-amber-200 hidden sm:inline font-bold">
                LATEST
              </span>
            </div>
          </div>

          {/* CENTER DISPLAY AREA */}
          <div className="flex-1 overflow-hidden relative min-w-0 h-7 flex items-center">
            
            {/* MODE 1: CONTINUOUS GENTLE SLOW MARQUEE */}
            {tickerMode === "marquee" && (
              <div
                className={`flex items-center gap-10 ${
                  speed === "slow" ? "animate-marquee-smooth" : "animate-marquee-fast"
                } ${!isPlaying ? "pause-animation" : ""}`}
              >
                {marqueeItems.map((item, idx) => (
                  <button
                    key={`${item.id}-${idx}`}
                    onClick={() => setSelectedNews(item)}
                    type="button"
                    className="flex items-center gap-2.5 hover:text-amber-300 transition-colors whitespace-nowrap group shrink-0 cursor-pointer text-left"
                  >
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-indigo-950 text-indigo-200 border border-indigo-800/60">
                      {item.timeAgo}
                    </span>

                    <span className="font-bold text-slate-100 group-hover:text-amber-300 transition-colors text-xs font-nepali">
                      {item.titleNepali}
                    </span>

                    <span className="text-slate-400 group-hover:text-slate-200 text-[11px] font-medium hidden lg:inline">
                      • {item.title}
                    </span>

                    <span className="text-red-500 text-xs font-bold px-1">•</span>
                  </button>
                ))}
              </div>
            )}

            {/* MODE 2: SLOW SLIDE / STEPPING DISPLAY */}
            {tickerMode === "slide" && (
              <div className="w-full flex items-center justify-between min-w-0 px-1">
                <button
                  type="button"
                  onClick={() => setSelectedNews(currentItem)}
                  className="flex items-center gap-2 min-w-0 flex-1 hover:text-amber-300 transition-colors group cursor-pointer text-left"
                >
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase shrink-0 bg-red-600 text-white border border-red-400/30 shadow-xs">
                    {currentItem.category}
                  </span>

                  <span className="font-bold text-white group-hover:text-amber-300 truncate text-xs font-nepali">
                    {currentItem.titleNepali}
                  </span>

                  <span className="text-[11px] text-slate-400 truncate hidden lg:inline font-medium">
                    ({currentItem.title})
                  </span>
                </button>

                <div className="text-[10px] text-slate-400 shrink-0 hidden sm:flex items-center gap-1 pl-2">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{currentItem.timeAgo}</span>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT TICKER CONTROLS */}
          <div className="flex items-center gap-1.5 shrink-0 z-10 bg-[#060a14] py-0.5 pl-2 rounded-l-xl border-l border-indigo-950">
            
            {/* Speed Toggle (Slow / Normal) */}
            <button
              type="button"
              onClick={() => setSpeed(speed === "slow" ? "normal" : "slow")}
              title={`Toggle Reading Pace (Current: ${speed === "slow" ? "Relaxed / Slow" : "Normal"})`}
              className="px-2 py-1 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 rounded-lg text-[10px] font-bold border border-slate-800 transition-colors cursor-pointer"
            >
              <span>{speed === "slow" ? "🐢 Slow" : "⚡ Fast"}</span>
            </button>

            {/* Toggle Marquee Tape / Slide Mode */}
            <button
              type="button"
              onClick={() => setTickerMode(tickerMode === "marquee" ? "slide" : "marquee")}
              title={`Switch ticker mode (Current: ${tickerMode === "marquee" ? "Tape Flow" : "Single Slide"})`}
              className="px-2 py-1 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 rounded-lg text-[10px] font-bold border border-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span className="hidden xl:inline">{tickerMode === "marquee" ? "Marquee" : "Step"}</span>
            </button>

            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Feed" : "Resume Feed"}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            {/* Step Navigation Controls */}
            <div className="flex items-center gap-0.5 bg-slate-900/90 border border-slate-800 rounded-lg p-0.5 text-slate-400">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous Bulletin"
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] px-1 font-mono font-bold text-amber-400 min-w-[28px] text-center">
                {currentIndex + 1}/{NEWS24_LATEST_FEED.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                title="Next Bulletin"
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </aside>

      {/* MODAL: Clean Education Article Reader (No External Source Links) */}
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
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 text-white font-black text-xs uppercase shadow-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>शैक्षिक सूचना तथा समाचार</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedNews.timeAgo} • {selectedNews.category}
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug font-nepali">
                  {selectedNews.titleNepali}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedNews.title}
                </p>
              </div>

              {/* Summary Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#060a14] border border-indigo-950 text-xs sm:text-sm text-slate-200 leading-relaxed font-nepali space-y-2">
                <p>{selectedNews.summary}</p>
              </div>

              {/* Modal Footer (Clean Action - No external source URLs) */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-medium">
                  ✓ आधिकारिक शैक्षिक जानकारी (Verified Advisory)
                </span>

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
