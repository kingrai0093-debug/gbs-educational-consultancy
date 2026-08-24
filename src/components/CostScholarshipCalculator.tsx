import React, { useState } from "react";
import { Award, GraduationCap, CheckCircle2, Sparkles, BookOpen, ShieldCheck, Phone, ArrowUpRight, Trophy, Star } from "lucide-react";

export const CostScholarshipCalculator: React.FC = () => {
  // Assessment state
  const [level, setLevel] = useState<"Undergraduate" | "Postgraduate" | "Language">("Undergraduate");
  const [gpaTier, setGpaTier] = useState<"3.6+" | "3.2-3.59" | "2.8-3.19" | "2.4-2.79">("3.2-3.59");
  const [languageProficiency, setLanguageProficiency] = useState<"TOPIK 5-6 / IELTS 7.5+" | "TOPIK 3-4 / IELTS 6.0-7.0" | "TOPIK 1-2 / IELTS 5.5" | "Beginner (No IELTS / No TOPIK)">("TOPIK 3-4 / IELTS 6.0-7.0");
  const [targetRegion, setTargetRegion] = useState<"Seoul Capital Metro" | "National Flagship Hubs (Busan / Daegu / Daejeon)">("Seoul Capital Metro");

  // Calculate Eligible Scholarship Tier & Admission Probability
  const getScholarshipAssessment = () => {
    if (level === "Language") {
      return {
        scholarshipTier: "30% – 50% Pathway Tuition Waiver",
        coverageBadge: "D-4 Language Pathway",
        gksEligible: false,
        admissionChance: "98% (High Visa Success Rate)",
        scholarshipPercent: "30% - 50%",
        recommendedTrack: "D-4-1 / D-4-7 Korean Language Pathway (Direct entry to top university degree with GPA 2.4+)",
        topUniversityMatches: ["Pusan National University (PNU)", "Chungnam National University (CNU)", "Dongguk University", "Kyungpook National University (KNU)"],
        perks: [
          "No mandatory IELTS required for admission",
          "Gap up to 3–5 years accepted",
          "Fast Track TOPIK Level 3–4 certification in Korea",
          "Guaranteed University Bachelor's progression pathway"
        ]
      };
    }

    if (gpaTier === "3.6+" && (languageProficiency.includes("7.5+") || languageProficiency.includes("5-6"))) {
      return {
        scholarshipTier: "100% Full Tuition Waiver + GKS Korean Government Scholarship",
        coverageBadge: "100% Full Scholarship (Free Study)",
        gksEligible: true,
        admissionChance: "99% (Elite Tier)",
        scholarshipPercent: "100%",
        recommendedTrack: "GKS (Global Korea Scholarship) & Presidential Merit Scholarship Track",
        topUniversityMatches: ["Seoul National University (SNU)", "Korea University (KU)", "Yonsei University", "KAIST", "Hanyang University"],
        perks: [
          "100% Full Tuition Waiver for entire 4-year degree",
          "Monthly living stipend provided by Korean Government",
          "Free round-trip airfare Kathmandu ⇄ Seoul",
          "Complete National Health Insurance coverage"
        ]
      };
    }

    if (gpaTier === "3.6+" || languageProficiency.includes("3-4") || languageProficiency.includes("6.0-7.0")) {
      return {
        scholarshipTier: "70% – 80% High Merit Academic Scholarship",
        coverageBadge: "70% - 80% Merit Scholarship",
        gksEligible: true,
        admissionChance: "95% (Excellent)",
        scholarshipPercent: "70% - 80%",
        recommendedTrack: "Direct University International Merit Scholarship Track",
        topUniversityMatches: ["Sungkyunkwan University (SKKU)", "Chung-Ang University (CAU)", "Pusan National University", "Kyung Hee University"],
        perks: [
          "70% to 80% tuition fee reduction from Semester 1",
          "Scholarship renewable each semester with GPA maintenance",
          "On-campus dormitory priority allocation",
          "Free Korean language leveling and cultural workshops"
        ]
      };
    }

    if (gpaTier === "3.2-3.59" || gpaTier === "2.8-3.19") {
      return {
        scholarshipTier: "50% Standard International Student Scholarship",
        coverageBadge: "50% Partner Scholarship",
        gksEligible: false,
        admissionChance: "92% (High Confidence)",
        scholarshipPercent: "50%",
        recommendedTrack: "GBS Direct Partner University Admission Track",
        topUniversityMatches: ["Sejong University", "Inha University", "Chonnam National University", "Yeungnam University", "Gachon University"],
        perks: [
          "Automatic 50% tuition waiver for international entrants",
          "English-medium (EMI) or Korean-medium major options",
          "Part-time campus work authorization after Semester 1",
          "Dedicated Nepali Student Alumni network in Korea"
        ]
      };
    }

    return {
      scholarshipTier: "30% – 40% University Entry Scholarship",
      coverageBadge: "30% - 40% Entry Scholarship",
      gksEligible: false,
      admissionChance: "88% (Solid)",
      scholarshipPercent: "30% - 40%",
      recommendedTrack: "Regional National & Private University Track",
      topUniversityMatches: ["Daegu University", "Woosong University (SolBridge)", "Keimyung University", "Dong-A University"],
      perks: [
        "30% to 40% initial semester scholarship guarantee",
        "Higher scholarship eligibility upon achieving TOPIK 3+ in Korea",
        "Affordable regional living environment",
        "Personalized visa document processing by GBS counselors"
      ]
    };
  };

  const assessment = getScholarshipAssessment();

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider border border-blue-100">
              <Award className="w-3.5 h-3.5 text-[#ED2D2A]" />
              <span>Scholarship & University Matchmaker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight">
              Korean University Scholarship & Eligibility Simulator
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Simulate your scholarship tier, university admission chances, and GKS government scholarship eligibility based on your academic profile.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>2026 Intake Evaluation Active</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column (Bento Cards, Col span 7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Bento Card 1: Target Academic Program */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  1. Target Academic Degree / Program
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Undergraduate", "Postgraduate", "Language"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-3 px-2 rounded-lg text-xs font-bold border-2 transition-all text-center cursor-pointer ${
                        level === lvl
                          ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                      }`}
                    >
                      {lvl === "Undergraduate" ? "Bachelor's Degree (4 Yr)" : lvl === "Postgraduate" ? "Master's / PhD (2 Yr)" : "D-4 Korean Language"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Card 2: Academic GPA Grade */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  2. Academic GPA (+2 / Bachelor&apos;s Score)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["3.6+", "3.2-3.59", "2.8-3.19", "2.4-2.79"] as const).map((gpa) => (
                    <button
                      key={gpa}
                      type="button"
                      onClick={() => setGpaTier(gpa)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold border-2 transition-all text-center cursor-pointer ${
                        gpaTier === gpa
                          ? "bg-[#ED2D2A] text-white border-[#ED2D2A] shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#ED2D2A]/30 hover:bg-red-50"
                      }`}
                    >
                      <span>GPA {gpa}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Card 3: Language Proficiency */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  3. Language Test Score (TOPIK or IELTS)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {([
                    "TOPIK 5-6 / IELTS 7.5+",
                    "TOPIK 3-4 / IELTS 6.0-7.0",
                    "TOPIK 1-2 / IELTS 5.5",
                    "Beginner (No IELTS / No TOPIK)",
                  ] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguageProficiency(lang)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold border-2 transition-all text-left cursor-pointer ${
                        languageProficiency === lang
                          ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                      }`}
                    >
                      <span>{lang}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Card 4: Target Region Preference */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                  4. Preferred University Region
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTargetRegion("Seoul Capital Metro")}
                    className={`py-3 px-4 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between text-left cursor-pointer ${
                      targetRegion === "Seoul Capital Metro"
                        ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">Seoul Capital Metro</div>
                      <div className="text-[10px] opacity-80 font-medium">Top Global Research Ranking</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">Seoul</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetRegion("National Flagship Hubs (Busan / Daegu / Daejeon)")}
                    className={`py-3 px-4 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between text-left cursor-pointer ${
                      targetRegion === "National Flagship Hubs (Busan / Daegu / Daejeon)"
                        ? "bg-[#25479D] text-white border-[#25479D] shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/30 hover:bg-blue-50"
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">National Flagship Hubs</div>
                      <div className="text-[10px] opacity-80 font-medium">High Scholarship & Post-Study Work</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold">National</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Results Summary Column (Bento Card, Col span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1b3472] to-[#25479D] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800 space-y-6 relative overflow-hidden">
            
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Trophy className="w-48 h-48 text-white" />
            </div>

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
                Scholarship Assessment Result
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {assessment.scholarshipTier}
              </h3>
            </div>

            {/* Assessment Highlights */}
            <div className="space-y-3 relative z-10">
              
              {/* Coverage Badge */}
              <div className="p-4 rounded-xl bg-white text-[#25479D] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">Eligible Scholarship Level:</span>
                  <strong className="text-base font-black text-[#ED2D2A]">{assessment.coverageBadge}</strong>
                </div>
                <div className="px-3 py-1 rounded-full bg-red-100 text-[#ED2D2A] text-xs font-black">
                  {assessment.scholarshipPercent}
                </div>
              </div>

              {/* Admission Probability */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-900/80 border border-blue-700/80 text-xs">
                <span className="text-blue-200 font-medium">Visa & Admission Success Probability:</span>
                <span className="font-extrabold text-emerald-300 text-sm">{assessment.admissionChance}</span>
              </div>

              {/* Top University Matches */}
              <div className="p-4 rounded-xl bg-blue-950/70 border border-blue-800/80 space-y-2 text-xs">
                <span className="font-black text-amber-300 uppercase tracking-wider text-[10px] block">
                  Recommended University Matches:
                </span>
                <ul className="space-y-1 font-semibold text-slate-100">
                  {assessment.topUniversityMatches.map((uni, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{uni}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits and Key Perks */}
              <div className="p-4 rounded-xl bg-blue-900/50 border border-blue-800 space-y-2 text-xs">
                <span className="font-black text-blue-200 uppercase tracking-wider text-[10px] block">
                  Key Advantages for Your Profile:
                </span>
                <ul className="space-y-1.5 text-slate-200 text-[11px]">
                  {assessment.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bagbazar Counselor Callout */}
            <div className="pt-2 text-center text-xs text-blue-200 relative z-10 border-t border-blue-800/60">
              <span className="font-medium">Want GBS Senior Directors to process your scholarship application?</span>
              <a
                href="tel:9744427779"
                className="block mt-2 font-bold text-white hover:text-amber-300 transition-colors bg-red-600 hover:bg-red-700 py-2.5 px-4 rounded-xl shadow-md text-xs uppercase tracking-wider"
              >
                <Phone className="inline w-3.5 h-3.5 mr-1.5" />
                Speak with Senior Counselor (Bagbazar): 9744427779
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


