import React from "react";
import { ArrowRight, Sparkles, Phone, MapPin, Award, CheckCircle2, ShieldCheck, DollarSign, BookOpen, Clock, Calendar, GraduationCap, Radio } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { CounselorWelcomeHero } from "./CounselorWelcomeHero";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenAiCounselor: () => void;
  onExploreUniversities: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenAiCounselor,
  onExploreUniversities,
}) => {
  const { settings, pageContent } = useAdminData();

  return (
    <section id="hero" className="relative bg-white overflow-hidden text-gray-800">
      
      {/* Hero Banner Area */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center py-12 md:py-20">
        
        {/* Left Text */}
        <div className="md:w-1/2 z-10 space-y-6">
          <div className="inline-block bg-blue-50 text-[#25479D] font-bold px-3 py-1 rounded border border-blue-100 text-sm mb-2 uppercase tracking-wide">
            {pageContent?.heroSubtitle || "Your Gateway to Global Education"}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15]">
            {pageContent?.heroTitle?.split(' ').slice(0, -1).join(' ') || "Study Abroad With"} <br />
            <span className="text-[#25479D]">
              {pageContent?.heroTitle?.split(' ').slice(-1) || "Confidence."}
            </span>
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed">
            {pageContent?.heroText || "Expert guidance for Australia, USA, UK, Canada and New Zealand. Join thousands of successful students who trusted us with their future."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={onOpenBooking}
              className="bg-[#25479D] hover:bg-blue-900 text-white px-8 py-3.5 rounded font-bold transition-all shadow-lg shadow-blue-900/20 text-center cursor-pointer"
            >
              Book Counseling
            </button>
            <button 
              onClick={onExploreUniversities}
              className="bg-white border-2 border-[#25479D] text-[#25479D] hover:bg-blue-50 px-8 py-3.5 rounded font-bold transition-all text-center cursor-pointer"
            >
              Find Courses
            </button>
          </div>
          
          <div className="flex items-center gap-6 pt-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#ED2D2A]">15+</span>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Years Exp.</span>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#ED2D2A]">50K+</span>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Success Visas</span>
            </div>
          </div>
        </div>
        
        {/* Right Image/Graphics */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative w-full">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 -z-10"></div>
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="bg-gray-100 w-full aspect-square md:aspect-[4/3] rounded-2xl shadow-2xl border-8 border-white overflow-hidden relative group">
            {/* Using dynamic hero banner image configurable via admin panel */}
            <img 
              src={pageContent?.heroBannerImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"} 
              alt="Happy Students" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25479D]/40 to-transparent"></div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <CounselorWelcomeHero
          onOpenBooking={onOpenBooking}
          onOpenAiCounselor={onOpenAiCounselor}
        />
      </div>

      {/* Study Destinations Grid - Replaces Bento Grid */}
      <div className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#25479D] mb-4">Top Study Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore top-ranked universities in the world's most popular study destinations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500&q=80" alt="Australia" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#25479D]/20 group-hover:bg-transparent transition"></div>
              </div>
              <div className="p-6 text-center border-t-4 border-transparent group-hover:border-[#ED2D2A] transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Study in Australia</h3>
                <p className="text-sm text-gray-500 mb-4">Post Study Work Visa, PR Pathway</p>
                <span className="text-[#25479D] font-semibold text-sm group-hover:text-[#ED2D2A] transition flex justify-center items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e2815cb?w=500&q=80" alt="USA" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#25479D]/20 group-hover:bg-transparent transition"></div>
              </div>
              <div className="p-6 text-center border-t-4 border-transparent group-hover:border-[#ED2D2A] transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Study in USA</h3>
                <p className="text-sm text-gray-500 mb-4">STEM Programs, Scholarships</p>
                <span className="text-[#25479D] font-semibold text-sm group-hover:text-[#ED2D2A] transition flex justify-center items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80" alt="UK" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#25479D]/20 group-hover:bg-transparent transition"></div>
              </div>
              <div className="p-6 text-center border-t-4 border-transparent group-hover:border-[#ED2D2A] transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Study in UK</h3>
                <p className="text-sm text-gray-500 mb-4">1-Year Masters, 2-Year PSW</p>
                <span className="text-[#25479D] font-semibold text-sm group-hover:text-[#ED2D2A] transition flex justify-center items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&q=80" alt="Canada" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#25479D]/20 group-hover:bg-transparent transition"></div>
              </div>
              <div className="p-6 text-center border-t-4 border-transparent group-hover:border-[#ED2D2A] transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Study in Canada</h3>
                <p className="text-sm text-gray-500 mb-4">Affordable, High Livability</p>
                <span className="text-[#25479D] font-semibold text-sm group-hover:text-[#ED2D2A] transition flex justify-center items-center gap-1">Explore <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
