import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, GraduationCap, Award, Send, RefreshCw, CheckCircle2, FileText, ArrowRight, MessageSquare, AlertCircle } from "lucide-react";

interface AiCounselorWidgetProps {
  onOpenBooking: () => void;
}

export const AiCounselorWidget: React.FC<AiCounselorWidgetProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<"evaluate" | "sop">("evaluate");

  // Profile Evaluator State
  const [studentName, setStudentName] = useState("");
  const [currentEducation, setCurrentEducation] = useState("+2 Science / Management");
  const [gpa, setGpa] = useState("3.2 GPA (Above 75%)");
  const [englishProficiency, setEnglishProficiency] = useState("IELTS 6.0 / PTE 58");
  const [koreanProficiency, setKoreanProficiency] = useState("Beginner (Learning Hangul)");
  const [targetLevel, setTargetLevel] = useState("Undergraduate (Bachelor's 4-Yr)");
  const [targetMajor, setTargetMajor] = useState("Computer Science & AI");
  const [gapYears, setGapYears] = useState("No Gap");
  const [userQuestion, setUserQuestion] = useState("");

  const [loading, setLoading] = useState(false);
  const [resultMarkdown, setResultMarkdown] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // SOP Review State
  const [sopName, setSopName] = useState("");
  const [sopUniversity, setSopUniversity] = useState("Inha University / Chung-Ang");
  const [sopMajor, setSopMajor] = useState("Global Business / Computer Science");
  const [draftSop, setDraftSop] = useState("");
  const [sopLoading, setSopLoading] = useState(false);
  const [sopFeedback, setSopFeedback] = useState<string | null>(null);
  const [sopError, setSopError] = useState<string | null>(null);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setResultMarkdown(null);

    try {
      const response = await fetch("/api/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          currentEducation,
          gpa,
          englishProficiency,
          koreanProficiency,
          targetLevel,
          targetMajor,
          gapYears,
          userQuestion,
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setResultMarkdown(data.reply);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      } else {
        setErrorMsg(data.error || "Could not generate evaluation. Please try again.");
      }
    } catch {
      setErrorMsg("Network error contacting AI counselor service. Please contact GBS at 9744427779.");
    } finally {
      setLoading(false);
    }
  };

  const handleSopReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftSop.trim() || draftSop.length < 20) {
      setSopError("Please write at least a couple of sentences of your draft Statement of Purpose.");
      return;
    }

    setSopLoading(true);
    setSopError(null);
    setSopFeedback(null);

    try {
      const response = await fetch("/api/review-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: sopName || "Student",
          targetUniversity: sopUniversity,
          targetMajor: sopMajor,
          draftSop,
        }),
      });

      const data = await response.json();
      if (data.success && data.feedback) {
        setSopFeedback(data.feedback);
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
        } catch {
          // ignore
        }
      } else {
        setSopError(data.error || "Failed to analyze SOP.");
      }
    } catch {
      setSopError("Network error. Please call GBS directly at 9744427779.");
    } finally {
      setSopLoading(false);
    }
  };

  return (
    <section id="ai-counselor" className="py-16 sm:py-24 bg-gray-50 text-gray-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8">
        
        {/* Header Bento Title Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Advisor Engine • Powered by Gemini</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#25479D]">
              Instant South Korea Eligibility & Scholarship Evaluation
            </h2>
            <p className="mt-2 text-sm text-gray-600 font-medium">
              Get personalized university recommendations, scholarship percentage estimates, and document advice based on your academic profile.
            </p>
          </div>

          {/* Mode Tabs Bento Pill */}
          <div className="inline-flex p-1 bg-white rounded-lg border border-gray-200 text-xs font-bold self-start md:self-auto shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("evaluate")}
              className={`px-4 py-2 rounded transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "evaluate" ? "bg-[#25479D] text-white shadow-sm" : "text-gray-600 hover:text-[#25479D]"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Profile Evaluator</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sop")}
              className={`px-4 py-2 rounded transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "sop" ? "bg-[#25479D] text-white shadow-sm" : "text-gray-600 hover:text-[#25479D]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>SOP Reviewer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profile Evaluator */}
        {activeTab === "evaluate" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Form Column Bento Card */}
            <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#ED2D2A]" />
                  Your Academic Profile Details
                </h3>
              </div>

              <form onSubmit={handleEvaluate} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Sujan Shrestha"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Current Academic Level</label>
                    <select
                      value={currentEducation}
                      onChange={(e) => setCurrentEducation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="+2 Science (NEB)">+2 Science (NEB)</option>
                      <option value="+2 Management (NEB)">+2 Management (NEB)</option>
                      <option value="+2 Humanities / Arts">+2 Humanities / Arts</option>
                      <option value="A-Levels / CBSE">A-Levels / CBSE</option>
                      <option value="Bachelor's Completed (TU/PU/KU)">Bachelor&apos;s Completed (TU/PU/KU)</option>
                      <option value="Master's Completed">Master&apos;s Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">GPA / Academic Score</label>
                    <select
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="3.6 - 4.0 GPA (Distinction / 80%+)">3.6 - 4.0 GPA (Distinction / 80%+)</option>
                      <option value="3.2 - 3.59 GPA (First Div / 70-79%)">3.2 - 3.59 GPA (First Div / 70-79%)</option>
                      <option value="2.8 - 3.19 GPA (Second Div / 60-69%)">2.8 - 3.19 GPA (Second Div / 60-69%)</option>
                      <option value="2.4 - 2.79 GPA (Pass Div / 50-59%)">2.4 - 2.79 GPA (Pass Div / 50-59%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">English Test (IELTS / PTE / Duolingo)</label>
                    <select
                      value={englishProficiency}
                      onChange={(e) => setEnglishProficiency(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="IELTS 6.5+ or PTE 65+ (High Scholarship)">IELTS 6.5+ or PTE 65+ (High Scholarship)</option>
                      <option value="IELTS 6.0 or PTE 58">IELTS 6.0 or PTE 58</option>
                      <option value="IELTS 5.5 or PTE 50">IELTS 5.5 or PTE 50</option>
                      <option value="Planning to appear for test soon">Planning to appear for test soon</option>
                      <option value="Medium of Instruction (MOI) Certificate">Medium of Instruction (MOI) Certificate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Target Degree in South Korea</label>
                    <select
                      value={targetLevel}
                      onChange={(e) => setTargetLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="Undergraduate (Bachelor's 4-Yr)">Undergraduate (Bachelor&apos;s 4-Yr)</option>
                      <option value="Postgraduate (Master's 2-Yr)">Postgraduate (Master&apos;s 2-Yr)</option>
                      <option value="PhD / Doctorate">PhD / Doctorate</option>
                      <option value="D-4 Korean Language Course">D-4 Korean Language Course</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Preferred Field of Study</label>
                    <select
                      value={targetMajor}
                      onChange={(e) => setTargetMajor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="Computer Science, Software & AI">Computer Science, Software & AI</option>
                      <option value="International Business & BBA/MBA">International Business & BBA/MBA</option>
                      <option value="Hospitality & Tourism Management">Hospitality & Tourism Management</option>
                      <option value="Mechanical / Automotive Engineering">Mechanical / Automotive Engineering</option>
                      <option value="Data Science & Fintech">Data Science & Fintech</option>
                      <option value="Nursing & Health Science">Nursing & Health Science</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Korean Language (TOPIK)</label>
                    <select
                      value={koreanProficiency}
                      onChange={(e) => setKoreanProficiency(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="Beginner / Learning Hangul">Beginner / Learning Hangul</option>
                      <option value="TOPIK Level 1 or 2">TOPIK Level 1 or 2</option>
                      <option value="TOPIK Level 3 or 4 (Eligible for 70%+ waiver)">TOPIK Level 3 or 4 (Eligible for 70%+ waiver)</option>
                      <option value="None (Targeting 100% English Program)">None (Targeting 100% English Program)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Academic Gap Years</label>
                    <select
                      value={gapYears}
                      onChange={(e) => setGapYears(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    >
                      <option value="No Gap (Recent Graduate)">No Gap (Recent Graduate)</option>
                      <option value="1 - 2 Years (Work / Job Experience)">1 - 2 Years (Work / Job Experience)</option>
                      <option value="3 - 4 Years (With experience letter)">3 - 4 Years (With experience letter)</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Any Specific Questions for Counselor?</label>
                  <textarea
                    rows={2}
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="e.g. Can I get a 50% scholarship in Seoul with my IELTS score? What are the bank balance rules?"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-[#ED2D2A] flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  id="ai-evaluate-submit-btn"
                  className="w-full py-3.5 px-4 rounded text-xs font-bold bg-[#ED2D2A] hover:bg-red-700 text-white shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer active:scale-98 uppercase tracking-wider"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analyzing Korean Universities with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Get Instant AI Admission & Scholarship Evaluation</span>
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* AI Results Display Bento Card */}
            <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-md min-h-[480px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">Advisor Evaluation Report</span>
                  </div>
                  {resultMarkdown && (
                    <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      Report Ready
                    </span>
                  )}
                </div>

                {loading && (
                  <div className="py-20 text-center space-y-4">
                    <RefreshCw className="w-8 h-8 text-[#25479D] animate-spin mx-auto" />
                    <div className="text-sm font-bold text-gray-800">
                      GBS AI Counselor is matching your academic profile against South Korean universities...
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Checking GKS, university tuition waivers, and Embassy Tahachal criteria.</p>
                  </div>
                )}

                {!loading && !resultMarkdown && (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-2xl shadow-sm">
                      🇰🇷
                    </div>
                    <h4 className="text-base font-extrabold text-gray-900">Your Evaluation Summary Will Appear Here</h4>
                    <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed font-medium">
                      Fill out your GPA, English score, and intended major on the left, then click &quot;Get Instant AI Evaluation&quot; to receive an admission & scholarship forecast.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs font-bold text-gray-600">
                      <span className="bg-gray-100 px-2.5 py-1 rounded border border-gray-200">✓ Visa Odds</span>
                      <span className="bg-gray-100 px-2.5 py-1 rounded border border-gray-200">✓ 30-100% Scholarships</span>
                      <span className="bg-gray-100 px-2.5 py-1 rounded border border-gray-200">✓ English Medium Programs</span>
                    </div>
                  </div>
                )}

                {!loading && resultMarkdown && (
                  <div className="prose prose-sm max-w-none text-xs sm:text-sm text-gray-800 space-y-3 leading-relaxed max-h-[460px] overflow-y-auto pr-2 font-medium">
                    <div className="whitespace-pre-wrap">{resultMarkdown}</div>
                  </div>
                )}
              </div>

              {resultMarkdown && (
                <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-gray-600 font-medium">
                    📍 Visit GBS Bagbazar or Call <strong className="text-[#25479D]">9744427779</strong>
                  </span>
                  <button
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#ED2D2A] hover:bg-red-700 text-white rounded text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book In-Person Counseling</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

        {/* Tab 2: SOP Reviewer */}
        {activeTab === "sop" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#25479D]" />
                  Draft Statement of Purpose (SOP) Checker
                </h3>
                <span className="text-[10px] uppercase font-bold text-gray-500">Korean University Standard</span>
              </div>

              <form onSubmit={handleSopReview} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Your Name</label>
                    <input
                      type="text"
                      value={sopName}
                      onChange={(e) => setSopName(e.target.value)}
                      placeholder="Student Name"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Target University</label>
                    <input
                      type="text"
                      value={sopUniversity}
                      onChange={(e) => setSopUniversity(e.target.value)}
                      placeholder="e.g. Inha University / SolBridge"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">Target Major / Program</label>
                  <input
                    type="text"
                    value={sopMajor}
                    onChange={(e) => setSopMajor(e.target.value)}
                    placeholder="e.g. Bachelor of Computer Science & AI"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-gray-700 mb-1.5 uppercase text-[10px] tracking-wider">
                    Paste Your Draft SOP / Motivation Letter (Paragraphs):
                  </label>
                  <textarea
                    rows={6}
                    value={draftSop}
                    onChange={(e) => setDraftSop(e.target.value)}
                    placeholder="Write or paste your Statement of Purpose draft here. Explain why you chose South Korea, your academic achievements, and future career plans..."
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#25479D] focus:border-[#25479D] font-medium"
                  />
                </div>

                {sopError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-[#ED2D2A] font-semibold">
                    {sopError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sopLoading}
                  className="w-full py-3.5 px-4 rounded text-xs font-bold bg-[#25479D] hover:bg-blue-900 text-white shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer uppercase tracking-wider"
                >
                  {sopLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Reviewing Academic Essay...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Review SOP with Korean Admission Standards</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-md min-h-[440px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">SOP Feedback & Suggestions</span>
                </div>

                {sopLoading && (
                  <div className="py-20 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-[#25479D] animate-spin mx-auto" />
                    <p className="text-xs text-gray-600 font-bold">Analyzing essay clarity, university-specific fit, and scholarship impact...</p>
                  </div>
                )}

                {!sopLoading && !sopFeedback && (
                  <div className="py-16 text-center space-y-3">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto" />
                    <h4 className="text-sm font-bold text-gray-900">SOP Review Results</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto font-medium">
                      Paste your draft SOP on the left to receive feedback on tone, scholarship argumentation, and structural enhancements.
                    </p>
                  </div>
                )}

                {!sopLoading && sopFeedback && (
                  <div className="prose prose-sm max-w-none text-xs sm:text-sm text-gray-800 space-y-3 max-h-[400px] overflow-y-auto pr-2 font-medium">
                    <div className="whitespace-pre-wrap">{sopFeedback}</div>
                  </div>
                )}
              </div>

              {sopFeedback && (
                <div className="pt-3 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-600 font-medium">
                    💡 GBS counselors provide 1-on-1 personalized SOP polish for all registered applicants.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
