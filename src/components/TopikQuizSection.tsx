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
        <div className="bg-gray-100 p-1.5 rounded-xl border border-gray-200 flex flex-wrap gap-2 text-xs font-black">
          <button
            type="button"
            onClick={() => setActiveMainTab("topik")}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMainTab === "topik"
                ? "bg-[#25479D] text-white shadow-md scale-[1.01]"
                : "text-gray-700 hover:text-[#25479D] hover:bg-white/80"
            }`}
          >
            <span className="text-base">🇰🇷</span>
            <span>TOPIK Korean Test Simulator</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${activeMainTab === "topik" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"}`}>
              {TOPIK_QUIZ_QUESTIONS.length} Questions
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("ielts")}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMainTab === "ielts"
                ? "bg-[#ED2D2A] text-white shadow-md scale-[1.01]"
                : "text-gray-700 hover:text-[#ED2D2A] hover:bg-white/80"
            }`}
          >
            <span className="text-base">🇬🇧</span>
            <span>IELTS 1,000 Questions Simulator</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${activeMainTab === "ielts" ? "bg-white/20 text-white" : "bg-red-100 text-red-700 font-bold"}`}>
              1,000 / 1,000 Questions 🚀
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("schedule")}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMainTab === "schedule"
                ? "bg-slate-900 text-white shadow-md scale-[1.01]"
                : "text-gray-700 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Official TOPIK 2026 Schedule & Standards</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TOPIK KOREAN LANGUAGE SIMULATOR */}
        {/* ========================================================================= */}
        {activeMainTab === "topik" && (
          <div className="space-y-6">
            {/* Category Filter Pills & Nepali Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {(["All", "Basics & Greetings", "University & Campus", "Visa & Embassy", "Part-time & Daily Life", "TOPIK Grammar"] as TopikCategoryFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleTopikCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-bold ${
                      selectedTopikCat === cat
                        ? "bg-[#25479D] text-white border-[#25479D] shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
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
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Nepali Translation Hint: {showNepaliHint ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Quiz Body */}
            {!topikFinished ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Progress Bar & Badges */}
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-gray-500 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#25479D] border border-blue-100 font-extrabold">
                      QUESTION {topikIdx + 1} OF {filteredTopikQuestions.length}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{currentTopikQ.level}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-extrabold">Current Score: {topikScore}</span>
                    <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#25479D] h-full transition-all duration-300"
                        style={{ width: `${((topikIdx + 1) / filteredTopikQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Korean Term & Audio Speaker Box */}
                <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#ED2D2A]">Korean Term / Sentence</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#25479D] mt-1 font-sans">
                      {currentTopikQ.koreanText}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => speakKorean(currentTopikQ.koreanText)}
                    disabled={speaking}
                    className="px-4 py-2 bg-white hover:bg-blue-100 text-[#25479D] border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    <Volume2 className={`w-4 h-4 ${speaking ? "animate-pulse text-[#ED2D2A]" : "text-[#25479D]"}`} />
                    <span>{speaking ? "Speaking Korean..." : "Listen Pronunciation 🔊"}</span>
                  </button>
                </div>

                {/* Question Text */}
                <div>
                  <h4 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                    {currentTopikQ.question}
                  </h4>
                  {showNepaliHint && currentTopikQ.nepaliHint && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs font-medium">
                      <span>🇳🇵 नेपाली अर्थ:</span>
                      <strong className="font-bold">{currentTopikQ.nepaliHint}</strong>
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentTopikQ.options.map((opt, optIdx) => {
                    const isSelected = selectedTopikOption === optIdx;
                    const isCorrect = optIdx === currentTopikQ.correctIndex;

                    let btnStyle = "bg-gray-50 border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50/50";
                    if (isTopikAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-green-50 border-green-400 text-green-900 font-bold ring-2 ring-green-200";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-red-50 border-red-300 text-red-900 font-medium";
                      } else {
                        btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectTopik(optIdx)}
                        disabled={isTopikAnswered}
                        className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback Explanation */}
                {isTopikAnswered && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      {selectedTopikOption === currentTopikQ.correctIndex ? (
                        <span className="text-xs font-black text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Correct Answer! (+1 Point)
                        </span>
                      ) : (
                        <span className="text-xs font-black text-red-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect Option Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {currentTopikQ.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation Button */}
                <div className="flex items-center justify-end pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleNextTopik}
                    disabled={!isTopikAnswered}
                    className="px-6 py-3 bg-[#25479D] hover:bg-blue-900 disabled:opacity-40 disabled:pointer-events-none text-white rounded-lg text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>{topikIdx + 1 === filteredTopikQuestions.length ? "Finish Korean Test" : "Next Question"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              /* TOPIK Test Results Banner */
              <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-md">
                <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto text-3xl shadow-sm">
                  🏆
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[#ED2D2A]">
                    Korean Test Simulator Completed
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-[#25479D]">
                    Your Score: {topikScore} / {filteredTopikQuestions.length} ({Math.round((topikScore / filteredTopikQuestions.length) * 100)}%)
                  </h3>
                  <p className="text-sm text-gray-600 max-w-xl mx-auto font-medium leading-relaxed">
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
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Korean Test</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-6 py-3 bg-[#ED2D2A] hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
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
        {/* TAB 2: IELTS 1,000 QUESTIONS ONLINE SIMULATOR */}
        {/* ========================================================================= */}
        {activeMainTab === "ielts" && (
          <div className="space-y-6">
            
            {/* Exam Mode & Test Bank Selectors */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-red-100 text-[#ED2D2A] text-xs font-black uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Full 1,000 Questions Academic Bank
                    </span>
                    <span className="text-xs text-gray-500 font-bold">
                      {IELTS_1000_QUESTION_BANK.length} Total Verified Questions
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 mt-1">
                    Select Your IELTS Practice Format
                  </h3>
                </div>

                {/* Exam Format Mode Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("bank1000")}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      ieltsExamMode === "bank1000" && !ieltsSearchQuery
                        ? "bg-slate-900 text-white shadow-sm font-black"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    📚 All 1,000 Questions Bank
                  </button>

                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("mock40")}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      ieltsExamMode === "mock40" && !ieltsSearchQuery
                        ? "bg-[#ED2D2A] text-white shadow-sm font-black"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    🎓 Full Mock (40 Qs)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("practice25")}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      ieltsExamMode === "practice25" && !ieltsSearchQuery
                        ? "bg-[#ED2D2A] text-white shadow-sm font-black"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    🎯 Standard Set (25 Qs)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleIeltsModeChange("blitz10")}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      ieltsExamMode === "blitz10" && !ieltsSearchQuery
                        ? "bg-[#ED2D2A] text-white shadow-sm font-black"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    ⚡ Quick Blitz (10 Qs)
                  </button>
                </div>
              </div>

              {/* Module Filter Pills + Realtime Search Bar + 1,000 Grid Drawer Trigger + Jump Input */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-gray-200">
                
                {/* Module Pill Tabs */}
                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  {(["All", "Reading & Vocabulary", "Grammar & Structure", "Listening Simulation", "Speaking Mock"] as IeltsSectionFilter[]).map((sec) => (
                    <button
                      key={sec}
                      onClick={() => handleIeltsSectionChange(sec)}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-bold ${
                        selectedIeltsSection === sec
                          ? "bg-[#25479D] text-white border-[#25479D] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
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
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#25479D] border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                    title="View 1,000 Question Navigation Palette"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 text-[#25479D]" />
                    <span>{showQuestionGrid ? "Hide Palette" : "1,000 Qs Grid"}</span>
                  </button>

                  {/* Search Input */}
                  <div className="relative flex-1 sm:w-52">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ieltsSearchQuery}
                      onChange={(e) => {
                        setIeltsSearchQuery(e.target.value);
                        setIeltsIdx(0);
                      }}
                      placeholder="Search 1,000 Qs..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 font-medium"
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
                      className="w-16 px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-red-500 font-mono text-center"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 bg-gray-800 hover:bg-black text-white rounded-lg text-xs font-bold cursor-pointer"
                      title="Jump to question number"
                    >
                      Go
                    </button>
                  </form>
                </div>

              </div>

              {/* 1,000 QUESTION INTERACTIVE PALETTE GRID */}
              {showQuestionGrid && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-inner space-y-3 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#25479D] uppercase tracking-wider">
                        1,000 Questions Navigation Palette
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 font-medium">
                        Answered: <strong className="text-green-700">{answeredCount}</strong> / {filteredIeltsQuestions.length}
                      </span>
                    </div>

                    {/* Batch 100s Selector */}
                    <div className="flex items-center gap-1 flex-wrap text-[10px] font-bold">
                      <span className="text-gray-400 mr-1">Batch:</span>
                      {Array.from({ length: Math.ceil(filteredIeltsQuestions.length / 100) }).map((_, bIdx) => {
                        const start = bIdx * 100 + 1;
                        const end = Math.min((bIdx + 1) * 100, filteredIeltsQuestions.length);
                        return (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={() => setGridBatch(bIdx)}
                            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                              gridBatch === bIdx ? "bg-[#25479D] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

                      let pillClass = "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
                      if (ans) {
                        pillClass = ans.isCorrect ? "bg-green-600 text-white font-bold" : "bg-red-500 text-white font-bold";
                      }
                      if (isCurrent) {
                        pillClass = "bg-[#25479D] text-white font-extrabold ring-2 ring-blue-300 scale-110 shadow-xs";
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
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Progress & Difficulty Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold text-gray-500 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded bg-red-50 text-[#ED2D2A] border border-red-100 font-extrabold">
                      QUESTION {ieltsIdx + 1} OF {filteredIeltsQuestions.length}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700">{currentIeltsQ.section}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {currentIeltsQ.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-extrabold">
                      Score: <strong className="text-[#25479D]">{ieltsScore}</strong> / {answeredCount} Answered
                    </span>
                    <div className="w-28 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#ED2D2A] h-full transition-all duration-300"
                        style={{ width: `${((ieltsIdx + 1) / filteredIeltsQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Passage / Audio Prompt / Speaking Cue Card Box */}
                {currentIeltsQ.passageOrPrompt && (
                  <div className="p-4 sm:p-5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#25479D] flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5" /> Academic Context / Audio Transcript / Cue Prompt:
                      </span>

                      {/* Speaking Timer if Speaking section */}
                      {currentIeltsQ.section === "Speaking Mock" && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className="px-2.5 py-1 bg-white hover:bg-amber-100 text-gray-800 rounded border border-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Timer className="w-3.5 h-3.5 text-[#ED2D2A]" />
                            <span>{isTimerRunning ? "Pause Prep" : "Start 60s Prep Timer"}</span>
                          </button>
                          <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${ieltsTimerSeconds < 10 ? "bg-red-600 text-white animate-pulse" : "bg-black text-white"}`}>
                            {ieltsTimerSeconds}s
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                      {currentIeltsQ.passageOrPrompt}
                    </p>
                  </div>
                )}

                {/* Question */}
                <div>
                  <h4 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                    {currentIeltsQ.question}
                  </h4>
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 gap-3 pt-1">
                  {currentIeltsQ.options.map((opt, optIdx) => {
                    const isAnswered = currentAnswerState !== undefined;
                    const isSelected = isAnswered && currentAnswerState.selectedIdx === optIdx;
                    const isCorrect = optIdx === currentIeltsQ.correctIndex;

                    let btnStyle = "bg-gray-50 border-gray-200 text-gray-800 hover:border-red-300 hover:bg-red-50/50";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-green-50 border-green-400 text-green-900 font-bold ring-2 ring-green-200";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-red-50 border-red-300 text-red-900 font-medium";
                      } else {
                        btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectIelts(optIdx)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback & Korea University Benchmark */}
                {currentAnswerState && (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      {currentAnswerState.isCorrect ? (
                        <span className="text-xs font-black text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Correct Answer! (+1 Point)
                        </span>
                      ) : (
                        <span className="text-xs font-black text-red-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect Answer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {currentIeltsQ.explanation}
                    </p>
                    <div className="pt-2 border-t border-blue-100 flex items-center gap-1.5 text-xs text-[#25479D] font-bold">
                      <span>🏛️ Korea University Admission Insight:</span>
                      <span className="text-gray-700 font-medium">{currentIeltsQ.koreaAdmissionImpact}</span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons Row */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handlePrevIelts}
                    disabled={ieltsIdx === 0}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:pointer-events-none text-gray-700 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextIelts}
                    className="px-6 py-3 bg-[#ED2D2A] hover:bg-red-700 text-white rounded-lg text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>{ieltsIdx + 1 === filteredIeltsQuestions.length ? "Complete & View Band Score" : "Next Question"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              /* IELTS Band Score Evaluation Result Card */
              <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-md space-y-6 text-center">
                <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto text-3xl shadow-sm">
                  🎯
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[#25479D]">
                    IELTS 1,000 Questions Assessment Results
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-gray-900">
                    Predicted Band: <span className="text-[#ED2D2A]">{ieltsBandResult.estimatedBand}</span>
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-[#25479D]">
                    <span>CEFR Equivalent: {ieltsBandResult.cefrLevel}</span>
                    <span>•</span>
                    <span>Correct: {ieltsScore} / {filteredIeltsQuestions.length}</span>
                  </div>
                </div>

                {/* Scholarship & University Match Bento Tile */}
                <div className="max-w-2xl mx-auto p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-left space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-[#25479D] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>South Korea University & Scholarship Forecast:</span>
                  </div>
                  <p className="text-sm font-extrabold text-gray-900">
                    {ieltsBandResult.koreaScholarshipMatch}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {ieltsBandResult.recommendation}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={restartIeltsQuiz}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake 1,000 Practice Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-6 py-3 bg-[#ED2D2A] hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
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
        {/* TAB 3: OFFICIAL TOPIK 2026 SCHEDULE & SCORING STANDARDS */}
        {/* ========================================================================= */}
        {activeMainTab === "schedule" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Direct Official NIIED Portal Banner */}
            <div className="p-6 bg-gradient-to-r from-[#25479D] to-blue-900 text-white rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-cyan-200 text-xs font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>National Institute for International Education (NIIED) Official Portal</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Official TOPIK Portal & Registration Guide
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium leading-relaxed">
                  Access direct government registration, exam venue locator, downloadable past test papers (기출문제), and official score certificates.
                </p>
              </div>

              <a
                href={TOPIK_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-cyan-50 text-[#25479D] rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
              >
                <span>Visit topik.go.kr Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* 2026 Examination Schedule Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm space-y-4 p-6">
              <div>
                <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#ED2D2A]" />
                  <span>Official 2026 TOPIK Exam Dates & Nepal Alignment</span>
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Plan your D-2 / D-4 application timelines around official score announcement dates.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-extrabold uppercase tracking-wider">
                      <th className="p-3">Exam Round</th>
                      <th className="p-3">Registration Period</th>
                      <th className="p-3">Exam Date</th>
                      <th className="p-3">Result Release</th>
                      <th className="p-3">Test Format</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {TOPIK_2026_SCHEDULE.map((s, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-3 font-bold text-gray-900">{s.round}</td>
                        <td className="p-3 text-gray-600">{s.registrationPeriod}</td>
                        <td className="p-3 font-bold text-[#25479D]">{s.testDate}</td>
                        <td className="p-3 text-gray-600">{s.resultDate}</td>
                        <td className="p-3 text-gray-500">{s.testTypes}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                            s.status === "Registration Open"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-700"
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
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm space-y-4 p-6">
              <div>
                <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#25479D]" />
                  <span>TOPIK Levels (1–6) Scoring Standards & Visa/Scholarship Value</span>
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Understand how score points translate to university scholarships and legal work rights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOPIK_LEVEL_STANDARDS.map((lvl, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#25479D] text-xs font-black">
                        {lvl.level}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500">{lvl.tier}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      Required Passing: <span className="text-[#ED2D2A]">{lvl.pointsRequired}</span>
                    </div>
                    <div className="text-[11px] text-gray-600 space-y-1">
                      <p>• {lvl.listening}</p>
                      <p>• {lvl.reading}</p>
                      <p>• {lvl.writing}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200 text-[11px] font-medium text-emerald-800 bg-emerald-50/70 p-2 rounded">
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
