import React, { useState, useEffect } from "react";
import {
  OFFICIAL_EMBASSY_URL,
  EMBASSY_NOTICES_LIST,
  EmbassyNotice,
} from "../data/embassyNotices";
import {
  ExternalLink,
  ShieldCheck,
  Bell,
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Building2,
  FileText,
  CheckCircle2,
  Share2,
  Sparkles,
  Search,
  Pin,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const EmbassyNoticeBanner: React.FC = () => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNoticeDetail, setActiveNoticeDetail] = useState<EmbassyNotice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Auto rotation for the top banner notice
  useEffect(() => {
    if (!isAutoRotating || EMBASSY_NOTICES_LIST.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % EMBASSY_NOTICES_LIST.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoRotating]);

  const activeNotice = EMBASSY_NOTICES_LIST[currentNoticeIndex] || EMBASSY_NOTICES_LIST[0];

  const filteredNotices = EMBASSY_NOTICES_LIST.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.koreanTitle && notice.koreanTitle.includes(searchQuery)) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: EmbassyNotice["category"]) => {
    switch (cat) {
      case "Study Visa":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      case "Consular Legalization":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "GKS Scholarship":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "KVAC Kathmandu":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      default:
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    }
  };

  return (
    <>
      {/* TOP EMBASSY NOTICE HEADER BAR */}
      <div className="w-full bg-[#0a1020] text-slate-100 border-b border-blue-900/60 shadow-xl select-none relative z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Korea & Nepal Dual Flag Emblem */}
            <div className="flex items-center -space-x-1 p-1.5 bg-slate-900 rounded-xl border border-slate-700/80 shadow-md">
              <span className="text-xl sm:text-2xl" title="Republic of Korea">🇰🇷</span>
              <span className="text-xl sm:text-2xl" title="Nepal">🇳🇵</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
                  Official Notice Board
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-950 text-blue-200 border border-blue-800">
                  Verified Feed
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Consular & Visa Updates</span>
              </div>
            </div>
          </div>

          {/* Center: Live Rotating Embassy Notice (Big & Clear) */}
          <div
            className="flex-1 min-w-0 bg-slate-900/95 hover:bg-slate-800 transition-all border border-blue-800/60 hover:border-amber-400/60 rounded-2xl px-4 py-2 cursor-pointer flex items-center justify-between gap-3 shadow-md"
            onClick={() => {
              setActiveNoticeDetail(activeNotice);
              setIsModalOpen(true);
            }}
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
            title="Click to view full Embassy notice details"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-sm sm:text-base font-black text-white hover:text-amber-300 truncate transition-colors">
                {activeNotice.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 text-amber-300 font-bold text-xs">
              <span className="hidden lg:inline">Read Full Notice ↗</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0 justify-end">
            
            {/* View All Notices Archive */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-2 bg-blue-950 hover:bg-blue-900 text-blue-200 hover:text-white rounded-xl text-xs font-black border border-blue-700/80 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-blue-300" />
              <span>All Notices ({EMBASSY_NOTICES_LIST.length})</span>
            </button>

          </div>

        </div>
      </div>

      {/* EMBASSY NOTICES DIRECTORY & DETAIL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0b1222] border border-blue-900/60 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0d162d] via-[#101e3d] to-[#0d162d] border-b border-blue-900/60 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-950 border border-blue-800/80 text-xl">
                    🇰🇷
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-blue-400 tracking-wider">
                        Official Consular Bulletins
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800/60">
                        Live Verified Feed
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                      Latest Official Notices
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Official notices regarding study visa document verification, consular legalization, online appointments, and scholarship guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setActiveNoticeDetail(null);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                
                {/* ACTIVE DETAIL VIEW IF CLICKED */}
                {activeNoticeDetail ? (
                  <div className="bg-slate-900/90 rounded-2xl border border-blue-900/60 p-5 sm:p-6 space-y-4">
                    <button
                      onClick={() => setActiveNoticeDetail(null)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to all embassy notices</span>
                    </button>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${getCategoryColor(activeNoticeDetail.category)}`}>
                          {activeNoticeDetail.category}
                        </span>
                        {activeNoticeDetail.isPinned && (
                          <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {activeNoticeDetail.date}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-black text-white leading-snug">
                        {activeNoticeDetail.title}
                      </h4>
                      {activeNoticeDetail.koreanTitle && (
                        <p className="text-xs text-blue-300 font-medium font-mono">
                          {activeNoticeDetail.koreanTitle}
                        </p>
                      )}
                    </div>

                    {/* Summary Callout */}
                    <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-900/60 text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                      <strong>Executive Summary:</strong> {activeNoticeDetail.summary}
                    </div>

                    {/* Detailed Instructions */}
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-normal space-y-2">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                        Notice Details & Directives:
                      </div>
                      {activeNoticeDetail.fullDetails}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <div className="text-[11px] text-slate-400">
                        Source: <strong className="text-white">{activeNoticeDetail.sourceLabel}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* LIST OF ALL NOTICES */
                  <div className="space-y-4">
                    
                    {/* Search & Category Filter */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search embassy notices by keyword (e.g., Study Visa, GKS, KVAC, Notarization)..."
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full py-2.5 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="All">All Categories</option>
                          <option value="Study Visa">Study Visa (D-2 / D-4)</option>
                          <option value="Consular Legalization">Consular Legalization</option>
                          <option value="GKS Scholarship">GKS Scholarship</option>
                          <option value="KVAC Kathmandu">KVAC Kathmandu</option>
                          <option value="Embassy Announcement">General Announcements</option>
                        </select>
                      </div>
                    </div>

                    {/* Notice Cards List */}
                    <div className="space-y-3">
                      {filteredNotices.map((notice) => (
                        <div
                          key={notice.id}
                          onClick={() => setActiveNoticeDetail(notice)}
                          className="p-4 sm:p-5 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-700/60 rounded-2xl transition-all cursor-pointer group space-y-2 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryColor(notice.category)}`}>
                                {notice.category}
                              </span>
                              {notice.isPinned && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                                  <Pin className="w-2.5 h-2.5" /> Pinned
                                </span>
                              )}
                            </div>

                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {notice.date}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                            {notice.title}
                          </h4>

                          <p className="text-xs text-slate-300 line-clamp-2">
                            {notice.summary}
                          </p>

                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
                            <span className="text-blue-400 group-hover:text-blue-300 font-bold flex items-center gap-1">
                              <span>Read Complete Directive</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>

              {/* Modal Footer Banner */}
              <div className="p-4 bg-slate-950 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 text-center sm:text-left flex items-center gap-2">
                  <span className="text-base">🏛️</span>
                  <span>Official Study Visa & Consular Notice Board</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
