import React, { useState, useMemo, useEffect } from "react";
import { TOPIK_QUIZ_QUESTIONS } from "../data/topikQuiz";
import { IELTS_1000_QUESTION_BANK } from "../data/ieltsQuestionBank1000";
import { calculateIeltsBand, IeltsQuestion } from "../data/ieltsOnlineTest";
import { TOPIK_OFFICIAL_URL, TOPIK_2026_SCHEDULE, TOPIK_LEVEL_STANDARDS } from "../data/topikOfficialData";
import confetti from "canvas-confetti";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Award,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Volume2,
  HelpCircle,
  Filter,
  Check,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  FileCheck,
  Briefcase,
  Layers,
  Zap,
  ExternalLink,
  Calendar,
  Clock,
  Globe,
  Timer,
  CheckSquare,
  Bookmark,
  Languages,
  Search,
  Hash,
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  X,
} from "lucide-react";
import { TopikQuestion } from "../types";

interface TopikQuizSectionProps {
  onOpenBooking: () => void;
}

type MainTestTab = "topik" | "ielts" | "schedule";
type TopikCategoryFilter = "All" | "Basics & Greetings" | "University & Campus" | "Visa & Embassy" | "Part-time & Daily Life" | "TOPIK Grammar";
type IeltsSectionFilter = "All" | "Reading & Vocabulary" | "Grammar & Structure" | "Listening Simulation" | "Speaking Mock";
type IeltsExamMode = "bank1000" | "mock40" | "practice25" | "blitz10";

export const TopikQuizSection: React.FC<TopikQuizSectionProps> = ({ onOpenBooking }) => {
  const [activeMainTab, setActiveMainTab] = useState<MainTestTab>("topik");

  // TOPIK TEST STATE
  const [selectedTopikCat, setSelectedTopikCat] = useState<TopikCategoryFilter>("All");
  const [topikIdx, setTopikIdx] = useState(0);
  const [selectedTopikOption, setSelectedTopikOption] = useState<number | null>(null);
  const [isTopikAnswered, setIsTopikAnswered] = useState(false);
  const [topikScore, setTopikScore] = useState(0);
  const [topikFinished, setTopikFinished] = useState(false);
  const [showNepaliHint, setShowNepaliHint] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  // IELTS TEST STATE (1,000 Questions Bank)
  const [ieltsExamMode, setIeltsExamMode] = useState<IeltsExamMode>("bank1000");
  const [selectedIeltsSection, setSelectedIeltsSection] = useState<IeltsSectionFilter>("All");
  const [ieltsSearchQuery, setIeltsSearchQuery] = useState("");
  const [ieltsIdx, setIeltsIdx] = useState(0);
  const [ieltsUserAnswers, setIeltsUserAnswers] = useState<Record<number, { selectedIdx: number; isCorrect: boolean }>>({});
  const [ieltsFinished, setIeltsFinished] = useState(false);
  const [ieltsTimerSeconds, setIeltsTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [jumpInput, setJumpInput] = useState("");
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [gridBatch, setGridBatch] = useState(0); // 0 = 1-100, 1 = 101-200 ... 9 = 901-1000

  // Filtered TOPIK Questions
  const filteredTopikQuestions: TopikQuestion[] = useMemo(() => {
    if (selectedTopikCat === "All") return TOPIK_QUIZ_QUESTIONS;
    return TOPIK_QUIZ_QUESTIONS.filter((q) => q.category === selectedTopikCat);
  }, [selectedTopikCat]);

  const currentTopikQ = filteredTopikQuestions[topikIdx] || filteredTopikQuestions[0];

  // Filtered IELTS Questions from 1,000 Questions Bank
  const filteredIeltsQuestions: IeltsQuestion[] = useMemo(() => {
    let list = IELTS_1000_QUESTION_BANK;

    if (selectedIeltsSection !== "All") {
      list = list.filter((q) => q.section === selectedIeltsSection);
    }

    if (ieltsSearchQuery.trim()) {
      const q = ieltsSearchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.passageOrPrompt?.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.difficulty.toLowerCase().includes(q) ||
          item.id.toString() === q
      );
    } else {
      if (ieltsExamMode === "blitz10") {
        return list.slice(0, 10);
      } else if (ieltsExamMode === "practice25") {
        return list.slice(0, 25);
      } else if (ieltsExamMode === "mock40") {
        return list.slice(0, 40);
      }
    }

    return list;
  }, [selectedIeltsSection, ieltsSearchQuery, ieltsExamMode]);

  const currentIeltsQ = filteredIeltsQuestions[ieltsIdx] || filteredIeltsQuestions[0] || IELTS_1000_QUESTION_BANK[0];
  const currentAnswerState = currentIeltsQ ? ieltsUserAnswers[currentIeltsQ.id] : undefined;

  // Calculated IELTS Score across answered items
  const ieltsScore = useMemo(() => {
    return Object.values(ieltsUserAnswers).filter((ans: { selectedIdx: number; isCorrect: boolean }) => ans.isCorrect).length;
  }, [ieltsUserAnswers]);

  const answeredCount = Object.keys(ieltsUserAnswers).length;

  // Timer countdown for IELTS Speaking Cue cards
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && ieltsTimerSeconds > 0) {
      interval = setInterval(() => {
        setIeltsTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (ieltsTimerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, ieltsTimerSeconds]);

  // --- TOPIK HANDLERS ---
  const handleTopikCategoryChange = (cat: TopikCategoryFilter) => {
    setSelectedTopikCat(cat);
    setTopikIdx(0);
    setSelectedTopikOption(null);
    setIsTopikAnswered(false);
    setTopikScore(0);
    setTopikFinished(false);
  };

  const handleSelectTopik = (idx: number) => {
    if (isTopikAnswered) return;
    setSelectedTopikOption(idx);
    setIsTopikAnswered(true);
    if (idx === currentTopikQ.correctIndex) {
      setTopikScore((prev) => prev + 1);
    }
  };

  const handleNextTopik = () => {
    if (topikIdx + 1 < filteredTopikQuestions.length) {
      setTopikIdx((prev) => prev + 1);
      setSelectedTopikOption(null);
      setIsTopikAnswered(false);
    } else {
      setTopikFinished(true);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const restartTopikQuiz = () => {
    setTopikIdx(0);
    setSelectedTopikOption(null);
    setIsTopikAnswered(false);
    setTopikScore(0);
    setTopikFinished(false);
  };

  const speakKorean = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanKorean = text.split("(")[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanKorean);
      utterance.lang = "ko-KR";
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeaking(false);
    }
  };

  // --- IELTS HANDLERS ---
  const handleIeltsModeChange = (mode: IeltsExamMode) => {
    setIeltsExamMode(mode);
    setIeltsIdx(0);
    setIeltsFinished(false);
    setIeltsTimerSeconds(60);
    setIsTimerRunning(false);
  };

  const handleIeltsSectionChange = (sec: IeltsSectionFilter) => {
    setSelectedIeltsSection(sec);
    setIeltsIdx(0);
    setIeltsFinished(false);
    setIeltsTimerSeconds(60);
    setIsTimerRunning(false);
  };

  const handleSelectIelts = (optIdx: number) => {
    if (!currentIeltsQ) return;
    const isCorrect = optIdx === currentIeltsQ.correctIndex;
    setIeltsUserAnswers((prev) => ({
      ...prev,
      [currentIeltsQ.id]: {
        selectedIdx: optIdx,
        isCorrect,
      },
    }));
  };

  const handleNextIelts = () => {
    if (ieltsIdx + 1 < filteredIeltsQuestions.length) {
      setIeltsIdx((prev) => prev + 1);
      setIeltsTimerSeconds(60);
      setIsTimerRunning(false);
    } else {
      setIeltsFinished(true);
      try {
        confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handlePrevIelts = () => {
    if (ieltsIdx > 0) {
      setIeltsIdx((prev) => prev - 1);
      setIeltsTimerSeconds(60);
      setIsTimerRunning(false);
    }
  };

  const handleJumpToQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= filteredIeltsQuestions.length) {
      setIeltsIdx(num - 1);
      setJumpInput("");
      setShowQuestionGrid(false);
    } else {
      alert(`Please enter a valid question number between 1 and ${filteredIeltsQuestions.length}`);
    }
  };

  const jumpDirectlyToIndex = (index: number) => {
    if (index >= 0 && index < filteredIeltsQuestions.length) {
      setIeltsIdx(index);
      setShowQuestionGrid(false);
    }
  };

  const restartIeltsQuiz = () => {
    setIeltsIdx(0);
    setIeltsUserAnswers({});
    setIeltsFinished(false);
    setIeltsTimerSeconds(60);
    setIsTimerRunning(false);
  };

  const totalQuestionsEvaluated = Math.max(1, filteredIeltsQuestions.length);
  const ieltsBandResult = calculateIeltsBand(ieltsScore, totalQuestionsEvaluated);

  return (
    <section id="topik-quiz" className="py-16 sm:py-24 bg-white text-gray-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8">
        
        {/* Header Bento Title Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider border border-blue-100">
              <Languages className="w-3.5 h-3.5" />
              <span>Language Proficiency & Examination Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight">
              TOPIK Korean & IELTS 1,000 Questions Online Testing Hub
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Official National Institute for International Education (NIIED) TOPIK registration access, exam dates, plus a complete <strong>1,000 Academic Questions IELTS Simulator</strong> with instant band rating.
            </p>
          </div>

          {/* Official Government NIIED Portal Direct Access */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={TOPIK_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Globe className="w-4 h-4 text-cyan-300" />
              <span>Official TOPIK Portal (topik.go.kr)</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
            </a>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 bg-[#ED2D2A] hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Free Class at Bagbazar</span>
            </button>
          </div>
        </div>

        {/* MAIN PORTAL TABS SWITCHER */}
        <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 flex flex-wrap gap-2 text-xs font-black shadow-lg">
          <button
            type="button"
            onClick={() => setActiveMainTab("topik")}
            className={`flex-1 min-w-[200px] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              activeMainTab === "topik"
                ? "bg-gradient-to-r from-blue-700 via-[#25479D] to-indigo-800 text-white border-blue-400 shadow-lg shadow-blue-900/50 scale-[1.01]"
                : "bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800"
            }`}
          >
            <span className="text-base">🇰🇷</span>
            <span>TOPIK Korean Test Simulator</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${activeMainTab === "topik" ? "bg-white/20 text-white" : "bg-blue-950 text-blue-300 border border-blue-800"}`}>
              {TOPIK_QUIZ_QUESTIONS.length} Questions (Navy/Red Theme)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("ielts")}
            className={`flex-1 min-w-[200px] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              activeMainTab === "ielts"
                ? "bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white border-emerald-400 shadow-lg shadow-emerald-900/50 scale-[1.01]"
                : "bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800"
            }`}
          >
            <span className="text-base">🇬🇧</span>
            <span>IELTS 1,000 Questions Simulator</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${activeMainTab === "ielts" ? "bg-white/20 text-white" : "bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold"}`}>
              1,000 Qs (Emerald Theme) 🚀
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("schedule")}
            className={`flex-1 min-w-[200px] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              activeMainTab === "schedule"
                ? "bg-gradient-to-r from-purple-700 via-indigo-800 to-purple-900 text-white border-purple-400 shadow-lg shadow-purple-900/50 scale-[1.01]"
                : "bg-slate-950/70 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>Official TOPIK 2026 Schedule & Standards</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${activeMainTab === "schedule" ? "bg-white/20 text-white" : "bg-purple-950 text-purple-300 border border-purple-800"}`}>
              Purple Theme
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TOPIK KOREAN LANGUAGE SIMULATOR (SOUTH KOREA ROYAL NAVY & RED THEME) */}
        {/* ========================================================================= */}
        {activeMainTab === "topik" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#09152b] via-[#0f2247] to-[#060e1d] border-2 border-blue-500/40 text-white shadow-2xl space-y-6">
            
            {/* Theme Indicator Banner */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-blue-800/60 text-xs">
              <span className="flex items-center gap-2 font-black text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>PAGE 1: SOUTH KOREAN ROYAL NAVY & TAEGEUK CRIMSON SIMULATOR</span>
              </span>
              <span className="text-blue-200 text-[11px]">Hangul Basics • TOPIK I • TOPIK II</span>
            </div>

            {/* Category Filter Pills & Nepali Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {(["All", "Basics & Greetings", "University & Campus", "Visa & Embassy", "Part-time & Daily Life", "TOPIK Grammar"] as TopikCategoryFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleTopikCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-bold ${
                      selectedTopikCat === cat
                        ? "bg-[#25479D] text-white border-cyan-400 shadow-md shadow-blue-500/40"
                        : "bg-slate-900/80 text-blue-200 border-blue-900/80 hover:border-blue-400 hover:bg-blue-900/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowNepaliHint(!showNepaliHint)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  showNepaliHint
                    ? "bg-emerald-950 text-emerald-300 border-emerald-600"
                    : "bg-slate-900 text-slate-400 border-slate-700"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Nepali Translation Hint: {showNepaliHint ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Quiz Body */}
            {!topikFinished ? (
              <div className="bg-slate-950/80 border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-inner space-y-6">
                
                {/* Progress Bar & Badges */}
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-blue-200 border-b border-blue-900/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-[11px] shadow-sm">
                      QUESTION {topikIdx + 1} OF {filteredTopikQuestions.length}
                    </span>
                    <span className="text-blue-400">•</span>
                    <span className="text-cyan-300">{currentTopikQ.level}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-white font-extrabold">Current Score: <strong className="text-cyan-300 text-sm">{topikScore}</strong></span>
                    <div className="w-24 sm:w-32 bg-slate-900 border border-blue-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300"
                        style={{ width: `${((topikIdx + 1) / filteredTopikQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Korean Term & Audio Speaker Box */}
                <div className="p-5 bg-gradient-to-r from-blue-950/90 to-indigo-950/80 border border-blue-600/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#ED2D2A]">Korean Term / Sentence</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-cyan-300 mt-1 font-sans">
                      {currentTopikQ.koreanText}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => speakKorean(currentTopikQ.koreanText)}
                    disabled={speaking}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#ED2D2A] to-[#25479D] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50 hover:brightness-110"
                  >
                    <Volume2 className={`w-4 h-4 ${speaking ? "animate-pulse text-white" : "text-cyan-200"}`} />
                    <span>{speaking ? "Speaking Korean..." : "Listen Pronunciation 🔊"}</span>
                  </button>
                </div>

                {/* Question Text */}
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                    {currentTopikQ.question}
                  </h4>
                  {showNepaliHint && currentTopikQ.nepaliHint && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/80 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-medium">
                      <span>🇳🇵 नेपाली अर्थ:</span>
                      <strong className="font-bold text-amber-300">{currentTopikQ.nepaliHint}</strong>
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentTopikQ.options.map((opt, optIdx) => {
                    const isSelected = selectedTopikOption === optIdx;
                    const isCorrect = optIdx === currentTopikQ.correctIndex;

                    let btnStyle = "bg-slate-900/90 border-blue-900/80 text-blue-100 hover:border-cyan-400 hover:bg-blue-950/60";
                    if (isTopikAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950 border-emerald-400 text-emerald-200 font-black ring-2 ring-emerald-400/80 shadow-lg shadow-emerald-950";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-red-950 border-red-400 text-red-200 font-bold ring-2 ring-red-400/80 shadow-lg shadow-red-950";
                      } else {
                        btnStyle = "bg-slate-950/60 border-slate-800 text-slate-500 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectTopik(optIdx)}
                        disabled={isTopikAnswered}
                        className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-blue-950 border border-blue-600 flex items-center justify-center text-xs font-black text-cyan-300 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback Explanation */}
                {isTopikAnswered && (
                  <div className="p-4 bg-slate-900/90 border border-blue-500/40 rounded-2xl space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      {selectedTopikOption === currentTopikQ.correctIndex ? (
                        <span className="text-xs font-black text-emerald-300 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Correct Answer! (+1 Point)
                        </span>
                      ) : (
                        <span className="text-xs font-black text-red-300 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect Option Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-blue-100 leading-relaxed font-medium">
                      {currentTopikQ.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation Button */}
                <div className="flex items-center justify-end pt-2 border-t border-blue-900/80">
                  <button
                    type="button"
                    onClick={handleNextTopik}
                    disabled={!isTopikAnswered}
                    className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 disabled:opacity-40 disabled:pointer-events-none text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-900/60 transition-all cursor-pointer"
                  >
                    <span>{topikIdx + 1 === filteredTopikQuestions.length ? "Finish Korean Test" : "Next Question"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              /* TOPIK Test Results Banner */
              <div className="bg-slate-950/90 border-2 border-blue-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-blue-900/50 border-2 border-cyan-400 flex items-center justify-center mx-auto text-3xl shadow-lg">
                  🏆
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
                    Korean Test Simulator Completed
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black text-white">
                    Your Score: <span className="text-cyan-400">{topikScore}</span> / {filteredTopikQuestions.length} ({Math.round((topikScore / filteredTopikQuestions.length) * 100)}%)
                  </h3>
                  <p className="text-sm text-blue-100 max-w-xl mx-auto font-medium leading-relaxed">
                    {topikScore / filteredTopikQuestions.length >= 0.8
                      ? "🎉 대박 (Daebak)! Outstanding Korean aptitude! You possess the language confidence required for Embassy visa interviews and smooth Korean campus adaptation."
                      : topikScore / filteredTopikQuestions.length >= 0.5
                      ? "👍 Solid Knowledge! You have a firm grasp of essential Hangul terms. A 4-week TOPIK preparation course at GBS Bagbazar will boost your score to 100%!"
                      : "🍀 Great effort starting your Korean journey! GBS provides free Hangul books and beginner TOPIK classes at Sallyan House Bagbazar."}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={restartTopikQuiz}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-blue-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Korean Test</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-6 py-3 bg-[#ED2D2A] hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Enroll in Physical TOPIK Class</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: IELTS 1,000 QUESTIONS ONLINE SIMULATOR (BRITISH EMERALD & GOLD THEME) */}
        {/* ========================================================================= */}
        {activeMainTab === "ielts" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021f1a] via-[#05352b] to-[#011410] border-2 border-emerald-500/50 text-white shadow-2xl space-y-6">
            
            {/* Theme Indicator Banner */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-800/60 text-xs">
              <span className="flex items-center gap-2 font-black text-amber-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>PAGE 2: BRITISH ACADEMIC EMERALD & IMPERIAL GOLD SIMULATOR</span>
              </span>
              <span className="text-emerald-200 text-[11px]">1,000 Questions • Reading, Grammar, Listening, Speaking</span>
            </div>

            {/* Exam Mode & Test Bank Selectors */}
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> Full 1,000 Questions Academic Bank
                    </span>
                    <span className="text-xs text-emerald-300 font-bold">
                      {IELTS_1000_QUESTION_BANK.length} Total Verified Questions
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    Select Your IELTS Practice Format
                  </h3>
                </div>

                {/* Exam Format Mode Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("bank1000")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      ieltsExamMode === "bank1000" && !ieltsSearchQuery
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-md font-black"
                        : "bg-slate-900 border-emerald-900/60 text-emerald-200 hover:bg-emerald-950/60"
                    }`}
                  >
                    📚 All 1,000 Questions Bank
                  </button>

                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("mock40")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      ieltsExamMode === "mock40" && !ieltsSearchQuery
                        ? "bg-amber-600 text-white border-amber-400 shadow-md font-black"
                        : "bg-slate-900 border-emerald-900/60 text-emerald-200 hover:bg-emerald-950/60"
                    }`}
                  >
                    🎓 Full Mock (40 Qs)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("practice25")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      ieltsExamMode === "practice25" && !ieltsSearchQuery
                        ? "bg-emerald-700 text-white border-emerald-400 shadow-md font-black"
                        : "bg-slate-900 border-emerald-900/60 text-emerald-200 hover:bg-emerald-950/60"
                    }`}
                  >
                    🎯 Standard Set (25 Qs)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("blitz10")}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      ieltsExamMode === "blitz10" && !ieltsSearchQuery
                        ? "bg-emerald-700 text-white border-emerald-400 shadow-md font-black"
                        : "bg-slate-900 border-emerald-900/60 text-emerald-200 hover:bg-emerald-950/60"
                    }`}
                  >
                    ⚡ Quick Blitz (10 Qs)
                  </button>
                </div>
              </div>

              {/* Module Filter Pills + Realtime Search Bar + 1,000 Grid Drawer Trigger + Jump Input */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-emerald-900/80">
                
                {/* Module Pill Tabs */}
                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  {(["All", "Reading & Vocabulary", "Grammar & Structure", "Listening Simulation", "Speaking Mock"] as IeltsSectionFilter[]).map((sec) => (
                    <button
                      key={sec}
                      onClick={() => handleIeltsSectionChange(sec)}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-bold ${
                        selectedIeltsSection === sec
                          ? "bg-emerald-600 text-white border-emerald-300 shadow-md"
                          : "bg-slate-900/80 text-emerald-200 border-emerald-900/60 hover:border-emerald-400 hover:bg-emerald-950/60"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>

                {/* Instant Search & 1,000 Question Palette Trigger & Jump Box */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  
                  {/* Grid Palette Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                    className="px-3 py-1.5 bg-emerald-950/90 hover:bg-emerald-900 text-amber-300 border border-emerald-600/60 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                    title="View 1,000 Question Navigation Palette"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showQuestionGrid ? "Hide Palette" : "1,000 Qs Grid"}</span>
                  </button>

                  {/* Search Input */}
                  <div className="relative flex-1 sm:w-52">
                    <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ieltsSearchQuery}
                      onChange={(e) => {
                        setIeltsSearchQuery(e.target.value);
                        setIeltsIdx(0);
                      }}
                      placeholder="Search 1,000 Qs..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-emerald-700/80 rounded-lg text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-amber-400 font-medium"
                    />
                  </div>

                  {/* Jump To Question Form */}
                  <form onSubmit={handleJumpToQuestion} className="flex items-center gap-1 shrink-0">
                    <input
                      type="number"
                      min={1}
                      max={filteredIeltsQuestions.length}
                      value={jumpInput}
                      onChange={(e) => setJumpInput(e.target.value)}
                      placeholder="Q#"
                      className="w-16 px-2 py-1.5 bg-slate-900 border border-emerald-700/80 rounded-lg text-xs text-amber-300 focus:outline-none focus:border-amber-400 font-mono text-center"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer border border-emerald-500"
                      title="Jump to question number"
                    >
                      Go
                    </button>
                  </form>
                </div>

              </div>

              {/* 1,000 QUESTION INTERACTIVE PALETTE GRID */}
              {showQuestionGrid && (
                <div className="bg-slate-900 p-4 rounded-xl border border-emerald-600/40 shadow-inner space-y-3 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/80 pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-300 uppercase tracking-wider">
                        1,000 Questions Navigation Palette
                      </span>
                      <span className="text-emerald-500">•</span>
                      <span className="text-emerald-200 font-medium">
                        Answered: <strong className="text-amber-300">{answeredCount}</strong> / {filteredIeltsQuestions.length}
                      </span>
                    </div>

                    {/* Batch 100s Selector */}
                    <div className="flex items-center gap-1 flex-wrap text-[10px] font-bold">
                      <span className="text-emerald-400 mr-1">Batch:</span>
                      {Array.from({ length: Math.ceil(filteredIeltsQuestions.length / 100) }).map((_, bIdx) => {
                        const start = bIdx * 100 + 1;
                        const end = Math.min((bIdx + 1) * 100, filteredIeltsQuestions.length);
                        return (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={() => setGridBatch(bIdx)}
                            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                              gridBatch === bIdx ? "bg-emerald-600 text-white" : "bg-slate-800 text-emerald-200 hover:bg-slate-700"
                            }`}
                          >
                            {start}-{end}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 100 Questions Pill Matrix for Current Batch */}
                  <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 max-h-56 overflow-y-auto p-1">
                    {filteredIeltsQuestions.slice(gridBatch * 100, (gridBatch + 1) * 100).map((qItem, localIdx) => {
                      const actualIdx = gridBatch * 100 + localIdx;
                      const isCurrent = ieltsIdx === actualIdx;
                      const ans = ieltsUserAnswers[qItem.id];

                      let pillClass = "bg-slate-800 text-emerald-200 border-emerald-900 hover:bg-slate-700";
                      if (ans) {
                        pillClass = ans.isCorrect ? "bg-emerald-600 text-white font-bold" : "bg-red-500 text-white font-bold";
                      }
                      if (isCurrent) {
                        pillClass = "bg-amber-500 text-slate-950 font-black ring-2 ring-amber-300 scale-110 shadow-xs";
                      }

                      return (
                        <button
                          key={qItem.id}
                          type="button"
                          onClick={() => jumpDirectlyToIndex(actualIdx)}
                          className={`h-7 rounded text-[11px] font-mono flex items-center justify-center cursor-pointer transition-all border ${pillClass}`}
                          title={`Question #${actualIdx + 1} (${qItem.section})`}
                        >
                          {actualIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* IELTS Quiz Body */}
            {!ieltsFinished ? (
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-inner space-y-6">
                
                {/* Progress & Difficulty Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold text-emerald-200 border-b border-emerald-900/80 pb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-emerald-700 text-white font-black text-[11px]">
                      QUESTION {ieltsIdx + 1} OF {filteredIeltsQuestions.length}
                    </span>
                    <span className="text-emerald-500">•</span>
                    <span className="text-emerald-100">{currentIeltsQ.section}</span>
                    <span className="text-emerald-500">•</span>
                    <span className="text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                      {currentIeltsQ.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-white font-extrabold">
                      Score: <strong className="text-amber-300 text-sm">{ieltsScore}</strong> / {answeredCount} Answered
                    </span>
                    <div className="w-28 bg-slate-900 border border-emerald-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full transition-all duration-300"
                        style={{ width: `${((ieltsIdx + 1) / filteredIeltsQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Passage / Audio Prompt / Speaking Cue Card Box */}
                {currentIeltsQ.passageOrPrompt && (
                  <div className="p-5 bg-gradient-to-r from-emerald-950/90 to-teal-950/80 border border-emerald-500/40 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5" /> Academic Context / Audio Transcript / Cue Prompt:
                      </span>

                      {/* Speaking Timer if Speaking section */}
                      {currentIeltsQ.section === "Speaking Mock" && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Timer className="w-3.5 h-3.5" />
                            <span>{isTimerRunning ? "Pause Prep" : "Start 60s Prep Timer"}</span>
                          </button>
                          <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${ieltsTimerSeconds < 10 ? "bg-red-600 text-white animate-pulse" : "bg-black text-amber-300 border border-amber-400"}`}>
                            {ieltsTimerSeconds}s
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                      {currentIeltsQ.passageOrPrompt}
                    </p>
                  </div>
                )}

                {/* Question */}
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                    {currentIeltsQ.question}
                  </h4>
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 gap-3 pt-1">
                  {currentIeltsQ.options.map((opt, optIdx) => {
                    const isAnswered = currentAnswerState !== undefined;
                    const isSelected = isAnswered && currentAnswerState.selectedIdx === optIdx;
                    const isCorrect = optIdx === currentIeltsQ.correctIndex;

                    let btnStyle = "bg-slate-900/90 border-emerald-900/80 text-emerald-100 hover:border-amber-400 hover:bg-emerald-950/60";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950 border-emerald-400 text-emerald-200 font-black ring-2 ring-emerald-400 shadow-lg shadow-emerald-950";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-red-950 border-red-400 text-red-200 font-bold ring-2 ring-red-400 shadow-lg shadow-red-950";
                      } else {
                        btnStyle = "bg-slate-950/60 border-slate-800 text-slate-500 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectIelts(optIdx)}
                        disabled={isAnswered}
                        className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-xs font-black text-amber-300 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback & Korea University Benchmark */}
                {currentAnswerState && (
                  <div className="p-4 bg-slate-900/90 border border-emerald-500/40 rounded-2xl space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      {currentAnswerState.isCorrect ? (
                        <span className="text-xs font-black text-emerald-300 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Correct Answer! (+1 Point)
                        </span>
                      ) : (
                        <span className="text-xs font-black text-red-300 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect Answer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                      {currentIeltsQ.explanation}
                    </p>
                    <div className="pt-2 border-t border-emerald-900/80 flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                      <span>🏛️ Korea University Admission Insight:</span>
                      <span className="text-emerald-200 font-medium">{currentIeltsQ.koreaAdmissionImpact}</span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons Row */}
                <div className="flex items-center justify-between pt-2 border-t border-emerald-900/80">
                  <button
                    type="button"
                    onClick={handlePrevIelts}
                    disabled={ieltsIdx === 0}
                    className="px-5 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-emerald-300 border border-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextIelts}
                    className="px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-900/60 transition-all cursor-pointer"
                  >
                    <span>{ieltsIdx + 1 === filteredIeltsQuestions.length ? "Complete & View Band Score" : "Next Question"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              /* IELTS Band Score Evaluation Result Card */
              <div className="bg-slate-950/90 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-900/50 border-2 border-amber-400 flex items-center justify-center mx-auto text-3xl shadow-lg">
                  🎯
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                    IELTS 1,000 Questions Assessment Results
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black text-white">
                    Predicted Band: <span className="text-amber-400">{ieltsBandResult.estimatedBand}</span>
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-950 border border-emerald-600 rounded-full text-xs font-bold text-emerald-200">
                    <span>CEFR Equivalent: {ieltsBandResult.cefrLevel}</span>
                    <span>•</span>
                    <span>Correct: {ieltsScore} / {filteredIeltsQuestions.length}</span>
                  </div>
                </div>

                {/* Scholarship & University Match Bento Tile */}
                <div className="max-w-2xl mx-auto p-6 bg-slate-900 border border-emerald-500/40 rounded-2xl text-left space-y-3 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>South Korea University & Scholarship Forecast:</span>
                  </div>
                  <p className="text-base font-black text-emerald-200">
                    {ieltsBandResult.koreaScholarshipMatch}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {ieltsBandResult.recommendation}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={restartIeltsQuiz}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake 1,000 Practice Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Book Full IELTS Mock at GBS</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: OFFICIAL TOPIK 2026 SCHEDULE & SCORING STANDARDS (CYBER PURPLE THEME) */}
        {/* ========================================================================= */}
        {activeMainTab === "schedule" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#190833] via-[#290d4f] to-[#0f041e] border-2 border-purple-500/50 text-white shadow-2xl space-y-8 animate-in fade-in duration-200">
            
            {/* Theme Indicator Banner */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-purple-800/60 text-xs">
              <span className="flex items-center gap-2 font-black text-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>PAGE 3: OFFICIAL NIIED GOVERNMENT TOPIK SCHEDULE & PURPLE STANDARDS</span>
              </span>
              <span className="text-purple-200 text-[11px]">2026 Test Dates • Scoring Matrix • GKS Scholarship Levels</span>
            </div>

            {/* Direct Official NIIED Portal Banner */}
            <div className="p-6 bg-gradient-to-r from-purple-900/90 via-indigo-950/90 to-purple-950/90 text-white rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-500/40">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-purple-200 text-xs font-bold">
                  <Globe className="w-3.5 h-3.5 text-cyan-300" />
                  <span>National Institute for International Education (NIIED) Official Portal</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Official TOPIK Portal & Registration Guide
                </h3>
                <p className="text-xs sm:text-sm text-purple-200 max-w-2xl font-medium leading-relaxed">
                  Access direct government registration, exam venue locator, downloadable past test papers (기출문제), and official score certificates.
                </p>
              </div>

              <a
                href={TOPIK_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-purple-100 text-purple-950 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
              >
                <span>Visit topik.go.kr Portal</span>
                <ExternalLink className="w-4 h-4 text-purple-800" />
              </a>
            </div>

            {/* 2026 Examination Schedule Table */}
            <div className="bg-slate-950/90 rounded-2xl border border-purple-500/30 overflow-hidden shadow-inner space-y-4 p-6">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Official 2026 TOPIK Exam Dates & Nepal Alignment</span>
                </h4>
                <p className="text-xs text-purple-300 font-medium mt-0.5">
                  Plan your D-2 / D-4 application timelines around official score announcement dates.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-purple-950/80 border-b border-purple-800 text-purple-200 font-extrabold uppercase tracking-wider">
                      <th className="p-3">Exam Round</th>
                      <th className="p-3">Registration Period</th>
                      <th className="p-3">Exam Date</th>
                      <th className="p-3">Result Release</th>
                      <th className="p-3">Test Format</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/60 font-medium text-slate-200">
                    {TOPIK_2026_SCHEDULE.map((s, idx) => (
                      <tr key={idx} className="hover:bg-purple-900/40 transition-colors">
                        <td className="p-3 font-bold text-white">{s.round}</td>
                        <td className="p-3 text-purple-300">{s.registrationPeriod}</td>
                        <td className="p-3 font-black text-cyan-300">{s.testDate}</td>
                        <td className="p-3 text-purple-200">{s.resultDate}</td>
                        <td className="p-3 text-purple-400">{s.testTypes}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                            s.status === "Registration Open"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-slate-900 text-slate-400"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TOPIK Level Scoring Standards & Scholarship Criteria */}
            <div className="bg-slate-950/90 rounded-2xl border border-purple-500/30 overflow-hidden shadow-inner space-y-4 p-6">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>TOPIK Levels (1–6) Scoring Standards & Visa/Scholarship Value</span>
                </h4>
                <p className="text-xs text-purple-300 font-medium mt-0.5">
                  Understand how score points translate to university scholarships and legal work rights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOPIK_LEVEL_STANDARDS.map((lvl, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-purple-800/80 bg-slate-900/90 space-y-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-xs font-black">
                        {lvl.level}
                      </span>
                      <span className="text-[11px] font-bold text-purple-300">{lvl.tier}</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      Required Passing: <span className="text-cyan-300 font-black">{lvl.pointsRequired}</span>
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1">
                      <p>• {lvl.listening}</p>
                      <p>• {lvl.reading}</p>
                      <p>• {lvl.writing}</p>
                    </div>
                    <div className="pt-2 border-t border-purple-900/80 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 p-2.5 rounded-xl">
                      <strong>Scholarship Impact:</strong> {lvl.scholarshipImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
