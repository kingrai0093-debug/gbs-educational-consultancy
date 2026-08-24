import React, { useState } from "react";
import { Calculator, DollarSign, Award, Briefcase, TrendingUp, Info, HelpCircle, ArrowUpRight } from "lucide-react";

export const CostScholarshipCalculator: React.FC = () => {
  // Calculator state
  const [level, setLevel] = useState<"Undergraduate" | "Postgraduate" | "Language">("Undergraduate");
  const [region, setRegion] = useState<"Seoul" | "Provincial">("Seoul");
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(50);
  const [partTimeHoursPerWeek, setPartTimeHoursPerWeek] = useState<number>(20);
  const [currency, setCurrency] = useState<"NPR" | "KRW" | "USD">("NPR");

  // Approximate FX conversion rates: 1 KRW = ~0.101 NPR, 1 USD = ~133 NPR, 1 USD = ~1320 KRW
  const KRW_TO_NPR = 0.101;
  const KRW_TO_USD = 0.00076;

  // Base costs per semester (6 months) in KRW
  const baseTuitionKRW = level === "Undergraduate" ? 4200000 : level === "Postgraduate" ? 4800000 : 2600000;
  const tuitionAfterScholarshipKRW = baseTuitionKRW * (1 - scholarshipPercent / 100);

  // Living costs per semester (6 months) in KRW
  const monthlyLivingKRW = region === "Seoul" ? 650000 : 450000;
  const monthlyDormKRW = region === "Seoul" ? 350000 : 220000;
  const semesterLivingTotalKRW = (monthlyLivingKRW + monthlyDormKRW) * 6;

  // Legal part-time earnings per semester (24 weeks) in KRW
  // Korea minimum legal hourly wage is ~9,860 KRW
  const hourlyWageKRW = 9860;
  const semesterPartTimeEarningsKRW = partTimeHoursPerWeek * hourlyWageKRW * 24;

  // Net student investment required for 1 semester
  const totalSemesterExpensesKRW = tuitionAfterScholarshipKRW + semesterLivingTotalKRW;
  const netFamilyContributionKRW = Math.max(0, totalSemesterExpensesKRW - semesterPartTimeEarningsKRW);

  // Helper formatting function
  const formatAmount = (krw: number) => {
    if (currency === "NPR") {
      const npr = Math.round(krw * KRW_TO_NPR);
      return `NPR ${npr.toLocaleString()}`;
    } else if (currency === "USD") {
      const usd = Math.round(krw * KRW_TO_USD);
      return `$${usd.toLocaleString()} USD`;
    } else {
      return `₩${Math.round(krw).toLocaleString()} KRW`;
    }
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider border border-blue-100">
              <Calculator className="w-3.5 h-3.5" />
              <span>Financial Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight">
              Cost & Scholarship Simulator
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Calculate realistic semester tuition, dormitory fees, personal living expenses, and legal part-time student earnings in South Korea.
            </p>
          </div>

          {/* Currency Switcher Bento Pill */}
          <div className="inline-flex p-1 bg-gray-100 rounded-lg border border-gray-200 text-xs font-bold self-start sm:self-auto shadow-inner">
            <button
              onClick={() => setCurrency("NPR")}
              className={`px-3.5 py-1.5 rounded transition-all ${currency === "NPR" ? "bg-white text-[#25479D] shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
            >
              NPR (Rs)
            </button>
            <button
              onClick={() => setCurrency("KRW")}
              className={`px-3.5 py-1.5 rounded transition-all ${currency === "KRW" ? "bg-white text-[#25479D] shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
            >
              KRW (₩)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3.5 py-1.5 rounded transition-all ${currency === "USD" ? "bg-white text-[#25479D] shadow-sm border border-gray-200" : "text-gray-600 hover:text-gray-900"}`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column (Bento Cards, Col span 7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Bento Card: Target Program & Campus Region */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm space-y-5">
              
              {/* Level of Study */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  1. Target Academic Program
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Undergraduate", "Postgraduate", "Language"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-3 px-2 rounded-lg text-xs font-bold border-2 transition-all text-center ${
                        level === lvl
                          ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                      }`}
                    >
                      {lvl === "Undergraduate" ? "Bachelor's (4 Yr)" : lvl === "Postgraduate" ? "Master's / PhD" : "D-4 Language"}
                    </button>
                  ))}
                </div>
              </div>

              {/* University Location */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  2. Campus Location & Living Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRegion("Seoul")}
                    className={`py-3 px-4 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between text-left ${
                      region === "Seoul"
                        ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">Seoul Metro</div>
                      <div className="text-[10px] opacity-80 font-medium">Capital area living tier</div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${region === "Seoul" ? "bg-white/20" : "bg-gray-100 text-gray-600"}`}>Seoul</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegion("Provincial")}
                    className={`py-3 px-4 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between text-left ${
                      region === "Provincial"
                        ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">Regional Hubs</div>
                      <div className="text-[10px] opacity-80 font-medium">Busan / Daegu / Daejeon</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold border border-green-200">~35% Cheaper</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bento Card: Scholarship & Part-time Sliders */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
              
              {/* Scholarship Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#ED2D2A]" />
                    3. Anticipated Scholarship Waiver
                  </label>
                  <span className="text-xs font-black text-white bg-[#ED2D2A] px-3 py-1 rounded shadow-sm">
                    {scholarshipPercent}% Waiver
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={scholarshipPercent}
                  onChange={(e) => setScholarshipPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#ED2D2A]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-2">
                  <span>0%</span>
                  <span>30%</span>
                  <span>50% (Standard)</span>
                  <span>70%</span>
                  <span>100% (GKS)</span>
                </div>
              </div>

              {/* Part-Time Student Work Hours */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#25479D]" />
                    4. Part-Time Student Hours (per Week)
                  </label>
                  <span className="text-xs font-black text-[#25479D] bg-blue-100 px-3 py-1 rounded border border-blue-200">
                    {partTimeHoursPerWeek} Hrs / Wk
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="28"
                  step="2"
                  value={partTimeHoursPerWeek}
                  onChange={(e) => setPartTimeHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#25479D]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-2">
                  <span>0 hrs</span>
                  <span>10 hrs</span>
                  <span>20 hrs (Legal Limit)</span>
                  <span>28 hrs (Vacation avg)</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 font-medium bg-white p-2 rounded border border-gray-200">
                  <Info className="inline w-3 h-3 mr-1 text-blue-500" />
                  Korean law permits D-2 students to work 20-25 hrs/week during semesters and full-time during vacations at ₩9,860+ KRW/hr (~NPR 1,000/hr).
                </p>
              </div>

            </div>

          </div>

          {/* Results Summary Column (Bento Card, Col span 5) */}
          <div className="lg:col-span-5 bg-[#25479D] text-white rounded-xl p-6 sm:p-8 shadow-xl border border-blue-900 space-y-6 relative overflow-hidden">
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <Calculator className="w-48 h-48" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200 block mb-1">
                Semester Financial Ledger (6 Months)
              </span>
              <h3 className="text-xl font-black text-white">Estimated Cost vs Earning</h3>
            </div>

            {/* Expense Breakdown Bento Rows */}
            <div className="space-y-3 text-xs relative z-10">
              
              <div className="flex items-center justify-between py-2 border-b border-blue-800 text-blue-100">
                <span>Base Official Tuition:</span>
                <span className="line-through">{formatAmount(baseTuitionKRW)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-white text-[#25479D] shadow-md">
                <span className="font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#ED2D2A]" /> Tuition ({scholarshipPercent}% Waiver):
                </span>
                <strong className="text-sm font-black">{formatAmount(tuitionAfterScholarshipKRW)}</strong>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-blue-800 text-blue-100">
                <span>Dormitory & Accomm. (6 Mos):</span>
                <span className="font-semibold text-white">{formatAmount(monthlyDormKRW * 6)}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-blue-800 text-blue-100">
                <span>Food & Personal (6 Mos):</span>
                <span className="font-semibold text-white">{formatAmount(monthlyLivingKRW * 6)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-green-500 text-white shadow-md border border-green-400">
                <span className="font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Legal Part-Time Earning:
                </span>
                <strong className="text-sm font-black">+{formatAmount(semesterPartTimeEarningsKRW)}</strong>
              </div>

            </div>

            {/* Net Balance Highlight Box */}
            <div className="p-5 rounded bg-blue-900 border border-blue-800 text-center space-y-2 relative z-10 shadow-inner">
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                Estimated Net Student Out-of-Pocket Cost:
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#ED2D2A] bg-white rounded py-2 shadow-sm tracking-tight border-2 border-red-100">
                {netFamilyContributionKRW === 0 ? "Fully Self-Funded (NPR 0)" : formatAmount(netFamilyContributionKRW)}
              </div>
              <p className="text-[11px] text-blue-100 leading-snug pt-1">
                {netFamilyContributionKRW === 0
                  ? "🎉 Amazing! With this scholarship and part-time earnings, your living and study costs in South Korea are fully self-funded."
                  : "Students cover accommodation and food via part-time work, needing minimal initial assistance from Nepal."}
              </p>
            </div>

            {/* Bagbazar Counselor Callout */}
            <div className="pt-2 text-center text-xs text-blue-200 relative z-10 border-t border-blue-800/50">
              <span>Need bank solvency guidance for Embassy Tahachal?</span>
              <a
                href="tel:9744427779"
                className="block mt-1.5 font-bold text-white hover:text-red-300 transition-colors bg-blue-800/50 py-1.5 rounded"
              >
                Call GBS Bagbazar Hotline: 9744427779
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

