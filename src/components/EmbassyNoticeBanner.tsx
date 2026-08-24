import React, { useState, useEffect } from "react";
import {
  EMBASSY_NOTICES_LIST,
  EmbassyNotice,
} from "../data/embassyNotices";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  Pin,
  Calendar,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const EmbassyNoticeBanner: React.FC = () => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNoticeDetail, setActiveNoticeDetail] = useState<EmbassyNotice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!isAutoRotating || EMBASSY_NOTICES_LIST.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % EMBASSY_NOTICES_LIST.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoRotating]);

  const activeNotice = EMBASSY_NOTICES_LIST[currentNoticeIndex] || EMBASSY_NOTICES_LIST[0];

  const filteredNotices = EMBASSY_NOTICES_LIST.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.koreanTitle && notice.koreanTitle.includes(searchQuery)) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: EmbassyNotice["category"]) => {
    switch (cat) {
      case "Study Visa": return "bg-red-500 text-white";
      case "Consular Legalization": return "bg-amber-500 text-white";
      case "GKS Scholarship": return "bg-purple-500 text-white";
      case "KVAC Kathmandu": return "bg-blue-500 text-white";
      default: return "bg-emerald-500 text-white";
    }
  };

  const getCategoryBg = (cat: EmbassyNotice["category"]) => {
    switch (cat) {
      case "Study Visa": return "from-red-600/20 to-red-900/10 border-red-500/30";
      case "Consular Legalization": return "from-amber-600/20 to-amber-900/10 border-amber-500/30";
      case "GKS Scholarship": return "from-purple-600/20 to-purple-900/10 border-purple-500/30";
      case "KVAC Kathmandu": return "from-blue-600/20 to-blue-900/10 border-blue-500/30";
      default: return "from-emerald-600/20 to-emerald-900/10 border-emerald-500/30";
    }
  };

  return (
    <>
      {/* LIVE NEWS TICKER BAR */}
      <div className="w-full bg-gradient-to-r from-[#0a0f1e] via-[#101830] to-[#0a0f1e] text-white border-b border-blue-900/40 select-none relative z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Left: Breaking News Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-lg shadow-lg shadow-red-900/40">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">Breaking</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Latest Updates</span>
            </div>
          </div>

          {/* Center: Scrolling News Headline */}
          <div
            className="flex-1 min-w-0 px-4 cursor-pointer"
            onClick={() => {
              setActiveNoticeDetail(activeNotice);
              setIsModalOpen(true);
            }}
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-sm sm:text-base font-bold text-white truncate hover:text-amber-300 transition-colors">
                {activeNotice.title}
              </p>
            </div>
          </div>

          {/* Right: View All */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer backdrop-blur-sm border border-white/10"
          >
            <span>All News</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* NEWS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0c1220] border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Latest News & Notices
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Stay updated with the latest announcements
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsModalOpen(false); setActiveNoticeDetail(null); }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto">
                {activeNoticeDetail ? (
                  /* DETAIL VIEW */
                  <div className="p-5 sm:p-8 max-w-3xl mx-auto">
                    <button
                      onClick={() => setActiveNoticeDetail(null)}
                      className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 mb-6 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to all news</span>
                    </button>

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black ${getCategoryColor(activeNoticeDetail.category)}`}>
                          {activeNoticeDetail.category}
                        </span>
                        {activeNoticeDetail.isPinned && (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-white flex items-center gap-1">
                            <Pin className="w-3 h-3" /> Featured
                          </span>
                        )}
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {activeNoticeDetail.date}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                        {activeNoticeDetail.title}
                      </h2>

                      {activeNoticeDetail.koreanTitle && (
                        <p className="text-sm text-blue-300 font-mono">
                          {activeNoticeDetail.koreanTitle}
                        </p>
                      )}

                      <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                      <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                          {activeNoticeDetail.summary}
                        </p>
                      </div>

                      <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {activeNoticeDetail.fullDetails}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                        <span>Published by</span>
                        <span className="text-slate-300 font-medium">{activeNoticeDetail.sourceLabel}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* NEWS LIST */
                  <div className="p-5 sm:p-6">
                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search news..."
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="py-3 px-4 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="All">All Categories</option>
                        <option value="Study Visa">Study Visa</option>
                        <option value="Consular Legalization">Consular</option>
                        <option value="GKS Scholarship">GKS Scholarship</option>
                        <option value="KVAC Kathmandu">KVAC</option>
                        <option value="Embassy Announcement">General</option>
                      </select>
                    </div>

                    {/* Featured / Pinned Notice */}
                    {filteredNotices.filter(n => n.isPinned).length > 0 && (
                      <div className="mb-6">
                        {filteredNotices.filter(n => n.isPinned).map((notice) => (
                          <div
                            key={notice.id}
                            onClick={() => setActiveNoticeDetail(notice)}
                            className={`p-6 bg-gradient-to-br ${getCategoryBg(notice.category)} border rounded-2xl cursor-pointer group transition-all hover:scale-[1.01] shadow-lg`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${getCategoryColor(notice.category)}`}>
                                {notice.category}
                              </span>
                              <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-amber-500 text-white flex items-center gap-1">
                                <Pin className="w-2.5 h-2.5" /> Featured
                              </span>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {notice.date}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight mb-2">
                              {notice.title}
                            </h3>
                            <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                              {notice.summary}
                            </p>
                            <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1.5">
                              Read Full Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* News Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredNotices.filter(n => !n.isPinned).map((notice) => (
                        <div
                          key={notice.id}
                          onClick={() => setActiveNoticeDetail(notice)}
                          className="p-5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getCategoryColor(notice.category)}`}>
                              {notice.category}
                            </span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notice.date}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2 line-clamp-3">
                            {notice.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                            {notice.summary}
                          </p>
                          <span className="text-[11px] font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                            Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      ))}
                    </div>

                    {filteredNotices.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        <p className="text-sm">No news found matching your search.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
