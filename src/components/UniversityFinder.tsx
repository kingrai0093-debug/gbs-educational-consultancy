import React, { useState, useMemo } from "react";
import { University } from "../types";
import { useAdminData } from "../context/AdminDataContext";
import { Search, Filter, GraduationCap, MapPin, Award, Check, ExternalLink, Globe, ChevronRight, X } from "lucide-react";

interface UniversityFinderProps {
  onSelectUniversity: (uni: University) => void;
  onOpenBookingWithUni: (uniName: string) => void;
}

export const UniversityFinder: React.FC<UniversityFinderProps> = ({
  onSelectUniversity,
  onOpenBookingWithUni,
}) => {
  const { universities } = useAdminData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedMedium, setSelectedMedium] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [activeUniModal, setActiveUniModal] = useState<University | null>(null);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.koreanName.includes(searchTerm) ||
        uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.popularMajors.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLevel =
        selectedLevel === "All" || uni.levels.some((l) => l.includes(selectedLevel));

      const matchesMedium =
        selectedMedium === "All" ||
        (selectedMedium === "100% English" && uni.mediumOfInstruction === "100% English") ||
        (selectedMedium === "Bilingual" && uni.mediumOfInstruction.includes("Bilingual")) ||
        (selectedMedium === "Korean" && uni.mediumOfInstruction.includes("Korean"));

      const matchesRegion =
        selectedRegion === "All" || uni.region.toLowerCase().includes(selectedRegion.toLowerCase());

      return matchesSearch && matchesLevel && matchesMedium && matchesRegion;
    });
  }, [universities, searchTerm, selectedLevel, selectedMedium, selectedRegion]);

  return (
    <section id="universities" className="py-16 sm:py-24 bg-white border-b border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-[#25479D] border border-blue-100 text-xs font-bold mb-3 uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Korean University Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight">
              Explore Universities & Degree Programs
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Compare 30% to 100% scholarships, English-taught undergraduate & postgraduate programs, and admission criteria at partner universities in Seoul, Busan, and Daejeon.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-100 shadow-sm text-xs font-bold text-[#ED2D2A]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>March & September 2026 Intakes</span>
          </div>
        </div>

        {/* Filter and Search Bento Bar */}
        <div className="bg-gray-50 rounded-xl p-5 sm:p-6 shadow-sm border border-gray-200 space-y-4">
          
          {/* Top Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by university name, major (e.g., Computer Science, AI, Business), or city..."
              className="w-full pl-11 pr-16 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25479D] focus:border-[#25479D] transition-all font-medium shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-gray-800 bg-gray-100 px-2 py-1 rounded border border-gray-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills / Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            
            {/* Degree Level Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#25479D]" /> Degree Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25479D] shadow-sm cursor-pointer"
              >
                <option value="All">All Degrees & Pathways</option>
                <option value="Undergraduate">Undergraduate (Bachelor&apos;s)</option>
                <option value="Postgraduate">Postgraduate (Master&apos;s / PhD)</option>
                <option value="Language">D-4 Korean Language Training</option>
              </select>
            </div>

            {/* Medium of Instruction Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#25479D]" /> Teaching Medium
              </label>
              <select
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25479D] shadow-sm cursor-pointer"
              >
                <option value="All">All Instruction Mediums</option>
                <option value="100% English">100% English Taught</option>
                <option value="Bilingual">Bilingual (English + Korean)</option>
                <option value="Korean">Korean Medium</option>
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#25479D]" /> Location / Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25479D] shadow-sm cursor-pointer"
              >
                <option value="All">All Regions in Korea</option>
                <option value="Seoul">Seoul Capital Area</option>
                <option value="Incheon">Incheon & Gyeonggi</option>
                <option value="Busan">Busan & South Coast</option>
                <option value="Daejeon">Daejeon (Central Tech Hub)</option>
                <option value="Daegu">Daegu & Other Cities</option>
              </select>
            </div>

          </div>

          {/* Results Summary Count */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
            <span>Showing <strong className="text-[#25479D] text-sm">{filteredUniversities.length}</strong> universities matching criteria</span>
            {(searchTerm || selectedLevel !== "All" || selectedMedium !== "All" || selectedRegion !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel("All");
                  setSelectedMedium("All");
                  setSelectedRegion("All");
                }}
                className="text-[#ED2D2A] hover:text-red-700 font-bold cursor-pointer underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* University Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={uni.imageUrl}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                
                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-white text-[#25479D] shadow-sm flex items-center gap-1 border border-gray-200">
                    <MapPin className="w-3 h-3 text-[#ED2D2A]" />
                    {uni.city}
                  </span>
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#ED2D2A] text-white shadow-sm flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {uni.scholarshipRange}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-bold text-gray-300 tracking-wider uppercase drop-shadow-md">{uni.koreanName}</div>
                  <h3 className="text-lg font-extrabold leading-tight drop-shadow-md">{uni.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Key Metrics Cells */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-semibold">Instruction:</span>
                    <span className="font-bold text-[#25479D] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {uni.mediumOfInstruction}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-semibold">Annual Tuition:</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">~NPR {uni.annualTuitionNPR.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-500 block font-medium">(KRW {(uni.annualTuitionKRW / 10000).toFixed(0)}만)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 font-semibold">Language Req:</span>
                    <span className="font-bold text-gray-800">
                      {uni.minIeltsScore > 0 ? `IELTS ${uni.minIeltsScore}+` : "No IELTS"} • {uni.minTopikLevel > 0 ? `TOPIK ${uni.minTopikLevel}` : "No TOPIK"}
                    </span>
                  </div>
                </div>

                {/* Popular Majors Tags */}
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Popular Programs:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uni.popularMajors.slice(0, 3).map((major, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[11px] font-semibold border border-gray-200"
                      >
                        {major}
                      </span>
                    ))}
                    {uni.popularMajors.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-[10px] font-semibold border border-gray-200">
                        +{uni.popularMajors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setActiveUniModal(uni)}
                    className="w-full py-2.5 rounded text-xs font-bold bg-white hover:bg-gray-50 text-[#25479D] transition-colors flex items-center justify-center gap-1 border-2 border-[#25479D] cursor-pointer"
                  >
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => onOpenBookingWithUni(uni.name)}
                    className="w-full py-2.5 rounded text-xs font-bold bg-[#ED2D2A] hover:bg-red-700 text-white transition-colors flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Apply Free</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200 p-8 shadow-inner">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#25479D]">No matching universities found</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Try modifying your search keywords or resetting filters. GBS Consultancy partners with over 30+ universities across South Korea.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLevel("All");
                setSelectedMedium("All");
                setSelectedRegion("All");
              }}
              className="mt-6 px-6 py-2.5 bg-[#ED2D2A] hover:bg-red-700 text-white rounded font-bold cursor-pointer transition-colors shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* University Full Details Modal */}
      {activeUniModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-6 text-gray-800">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold text-[#ED2D2A] uppercase tracking-wide flex items-center gap-1"><MapPin className="w-3 h-3"/> {activeUniModal.city}, South Korea</span>
                  <span className="text-[10px] bg-red-50 text-[#ED2D2A] border border-red-200 font-bold px-2 py-0.5 rounded">
                    {activeUniModal.scholarshipRange}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#25479D]">{activeUniModal.name}</h3>
                <p className="text-sm text-gray-500 font-bold mt-1">{activeUniModal.koreanName} • {activeUniModal.ranking}</p>
              </div>
              <button
                onClick={() => setActiveUniModal(null)}
                className="text-gray-400 hover:text-gray-700 p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image & Fast Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1 h-40 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={activeUniModal.imageUrl}
                  alt={activeUniModal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-2 grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                <div>
                  <span className="text-gray-500 block text-xs font-semibold">Instruction:</span>
                  <strong className="text-[#25479D] font-bold">{activeUniModal.mediumOfInstruction}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs font-semibold">Min Language:</span>
                  <strong className="text-gray-900 font-bold">
                    {activeUniModal.minIeltsScore > 0 ? `IELTS ${activeUniModal.minIeltsScore}` : "None"} | {activeUniModal.minTopikLevel > 0 ? `TOPIK ${activeUniModal.minTopikLevel}` : "None"}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs font-semibold">Tuition / Year:</span>
                  <strong className="text-gray-900 font-extrabold">~NPR {activeUniModal.annualTuitionNPR.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs font-semibold">Dormitory / Mo:</span>
                  <strong className="text-gray-900 font-extrabold">~NPR {activeUniModal.dormitoryCostMonthlyNPR.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Features & Advantages */}
            <div>
              <h4 className="text-sm font-extrabold text-[#25479D] uppercase tracking-wider mb-3">Key Highlights for Nepali Applicants</h4>
              <ul className="space-y-3 text-sm text-gray-700">
                {activeUniModal.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded border border-gray-100">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Majors */}
            <div>
              <h4 className="text-sm font-extrabold text-[#25479D] uppercase tracking-wider mb-3">Popular Faculties & Programs</h4>
              <div className="flex flex-wrap gap-2">
                {activeUniModal.popularMajors.map((maj, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-blue-50 text-[#25479D] rounded text-xs font-bold border border-blue-100 shadow-sm">
                    {maj}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 text-center sm:text-left font-bold bg-gray-100 p-2 rounded">
                <span>📍 GBS Bagbazar provides direct admission & scholarship lodgement for this university.</span>
              </div>
              <button
                onClick={() => {
                  const uniName = activeUniModal.name;
                  setActiveUniModal(null);
                  onOpenBookingWithUni(uniName);
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#ED2D2A] hover:bg-red-700 text-white rounded font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-colors"
              >
                <span>Start Application for {activeUniModal.name}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
