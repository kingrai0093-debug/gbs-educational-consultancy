import React, { useState } from "react";
import { AdminDataProvider } from "./context/AdminDataContext";
import { LiveNewsTicker } from "./components/LiveNewsTicker";
import { EmbassyNoticeBanner } from "./components/EmbassyNoticeBanner";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { UniversityFinder } from "./components/UniversityFinder";
import { CostScholarshipCalculator } from "./components/CostScholarshipCalculator";
import { AiCounselorWidget } from "./components/AiCounselorWidget";
import { VisaProcessGuide } from "./components/VisaProcessGuide";
import { InteractiveVisaChecklist } from "./components/InteractiveVisaChecklist";
import { TopikQuizSection } from "./components/TopikQuizSection";
import { MediaAndNewsSection } from "./components/MediaAndNewsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { AdminDashboardModal } from "./components/admin/AdminDashboardModal";
import { TabletModeSwitcher } from "./components/TabletModeSwitcher";
import { useDeviceViewMode } from "./hooks/useDeviceViewMode";
import { University } from "./types";
import { Phone, MessageCircle, Calendar, Sparkles, MapPin, Lock, Tablet } from "lucide-react";

function MainAppContent() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedUniversityName, setSelectedUniversityName] = useState<string>("");

  // Android & Device Tablet Mode Auto-Detector Engine
  const { viewMode, isAndroid, isAutoDetected, setViewMode, toggleTabletMode } = useDeviceViewMode();

  const handleOpenBooking = (uniName = "") => {
    setSelectedUniversityName(uniName);
    setBookingModalOpen(true);
  };

  const handleOpenAiCounselor = () => {
    const el = document.getElementById("ai-counselor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleExploreUniversities = () => {
    const el = document.getElementById("universities");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      
      {/* 0. Official Embassy of the Republic of Korea in Nepal - Latest Notices Bar */}
      <EmbassyNoticeBanner />

      {/* 0.1 Broadcast Live Breaking News Ticker (News 24 Nepal) */}
      <LiveNewsTicker
        onOpenBooking={() => handleOpenBooking("")}
      />

      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking("")}
        onOpenAiCounselor={handleOpenAiCounselor}
        onOpenAdmin={() => setAdminModalOpen(true)}
        viewMode={viewMode}
        isAndroid={isAndroid}
        isAutoDetected={isAutoDetected}
        onSetViewMode={setViewMode}
      />

      {/* Main Content Sections */}
      <main className="flex-1 tablet-container-wrap">
        
        {/* 1. Hero Section with Bento Grid */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking("")}
          onOpenAiCounselor={handleOpenAiCounselor}
          onExploreUniversities={handleExploreUniversities}
        />

        {/* 2. University Finder & Program Explorer */}
        <UniversityFinder
          onSelectUniversity={(uni: University) => handleOpenBooking(uni.name)}
          onOpenBookingWithUni={(uniName: string) => handleOpenBooking(uniName)}
        />

        {/* 3. Cost & Scholarship Calculator */}
        <CostScholarshipCalculator />

        {/* 4. AI Study in Korea Counselor (Gemini Powered) */}
        <AiCounselorWidget
          onOpenBooking={() => handleOpenBooking("")}
        />

        {/* 5. 6-Step Korea Visa Pathway */}
        <VisaProcessGuide
          onOpenBooking={() => handleOpenBooking("")}
        />

        {/* 6. Interactive Embassy Document Checklist */}
        <InteractiveVisaChecklist />

        {/* 7. TOPIK Korean Language Quiz Hub */}
        <TopikQuizSection
          onOpenBooking={() => handleOpenBooking("")}
        />

        {/* 8. Announcements, Video Guides & Visa Gallery */}
        <MediaAndNewsSection
          onOpenBooking={() => handleOpenBooking("")}
        />

        {/* 9. Contact & Bagbazar Sallyan House Location */}
        <ContactSection
          onOpenBooking={() => handleOpenBooking("")}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking("")}
        onOpenAiCounselor={handleOpenAiCounselor}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Booking / Appointment Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedUniversityName("");
        }}
        initialUniversity={selectedUniversityName}
      />

      {/* Admin Management Modal Portal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Floating Action Button (Sticky Quick Hotline, Tablet Toggle, Admin CMS & WhatsApp Bar) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Floating Quick Controls (Tablet Mode & Admin Portal Trigger) */}
        <div className="bg-white/95 p-1 rounded-xl border border-gray-200 shadow-xl backdrop-blur-md flex items-center gap-1">
          <TabletModeSwitcher
            viewMode={viewMode}
            isAndroid={isAndroid}
            isAutoDetected={isAutoDetected}
            onSetViewMode={setViewMode}
          />
          <button
            type="button"
            onClick={() => setAdminModalOpen(true)}
            id="floating-admin-cms-btn"
            className="p-1.5 rounded text-xs font-bold text-[#25479D] hover:bg-blue-50 transition-all flex items-center gap-1 cursor-pointer"
            title="Admin & CMS Master Control Portal"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline font-mono">Admin</span>
          </button>
        </div>

        {/* WhatsApp Quick Trigger */}
        <a
          href="https://wa.me/9779744427779?text=Hello%20GBS,%20I%20am%20interested%20in%20studying%20in%20South%20Korea."
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          className="p-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center group active:scale-95 border border-green-500 cursor-pointer"
          aria-label="Chat with GBS on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold">
            WhatsApp: 9744427779
          </span>
        </a>

        {/* Quick Consultation Pill Trigger */}
        <button
          onClick={() => handleOpenBooking("")}
          id="floating-book-counseling-btn"
          className="px-4 py-3 bg-[#ED2D2A] hover:bg-red-700 text-white rounded-xl shadow-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold border border-red-600 active:scale-98 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Free Counseling (Putalisadak)</span>
          <span className="sm:hidden">Book Free</span>
        </button>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <AdminDataProvider>
      <MainAppContent />
    </AdminDataProvider>
  );
}
