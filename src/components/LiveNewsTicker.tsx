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

        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          
          {/* Big Live Education Notice Badge */}
          <div className="flex items-center gap-2 shrink-0 z-10 bg-[#060a14] py-1 pr-3 rounded-xl border-r border-indigo-900/50">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 border border-red-500/40 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-md"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              <GraduationCap className="w-4 h-4 text-white" />
              <span>शिक्षा बुलेटिन</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-950/90 text-amber-300 font-extrabold hidden sm:inline">
                BREAKING
              </span>
            </div>
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
                    {item.timeAgo}
                  </span>

                  <span className="font-black text-white group-hover:text-amber-300 transition-colors text-sm sm:text-base font-nepali">
                    {item.titleNepali}
                  </span>

                  <span className="text-slate-300 group-hover:text-amber-200 text-xs sm:text-sm font-semibold hidden md:inline">
                    • {item.title}
                  </span>

                  <span className="text-red-500 text-sm font-bold px-1">•</span>
                </button>
              ))}
            </div>

          </div>

          {/* CLEAN RIGHT CONTROLS (Only Play/Pause) */}
          <div className="flex items-center gap-2 shrink-0 z-10 bg-[#060a14] py-1 pl-2.5 rounded-xl border-l border-indigo-950">
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
