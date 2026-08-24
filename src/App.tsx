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
import { CounselorsDirectorySection } from "./components/CounselorsDirectorySection";
import { TopikQuizSection } from "./components/TopikQuizSection";
import { MediaAndNewsSection } from "./components/MediaAndNewsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { AdminDashboardModal } from "./components/admin/AdminDashboardModal";
import { LiveSupportChatWidget } from "./components/LiveSupportChatWidget";
import { TabletModeSwitcher } from "./components/TabletModeSwitcher";
import { useDeviceViewMode } from "./hooks/useDeviceViewMode";
import { University } from "./types";
import { Phone, MessageCircle, Calendar, Sparkles, MapPin, Lock, Tablet } from "lucide-react";

function MainAppContent() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [selectedUniversityName, setSelectedUniversityName] = useState<string>("");

  // Android & Device Tablet Mode Auto-Detector Engine
  const { viewMode, isAndroid, isAutoDetected, setViewMode, toggleTabletMode } = useDeviceViewMode();

  const handleOpenBooking = (uniName = "") => {
    setSelectedUniversityName(uniName);
    setBookingModalOpen(true);
  };

  const handleOpenAiCounselor = () => {
    setLiveChatOpen(true);
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
        onOpenLiveChat={() => setLiveChatOpen(true)}
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

        {/* 7. Official Counselors & Directors Team Directory */}
        <CounselorsDirectorySection
          onOpenBooking={() => handleOpenBooking("")}
        />

        {/* 8. TOPIK Korean Language & IELTS 1,000 Questions Online Testing Hub */}
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

      {/* 24/7 Live Support Chat Widget */}
      <LiveSupportChatWidget
        isOpen={liveChatOpen}
        onToggleOpen={setLiveChatOpen}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating Bottom-Left Controls (Tablet Switcher & Admin Portal Trigger) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-1.5 bg-white/95 p-1 rounded-2xl border border-gray-200 shadow-2xl backdrop-blur-md">
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
          className="p-2 rounded-xl text-xs font-bold text-[#25479D] hover:bg-blue-50 transition-all flex items-center gap-1 cursor-pointer"
          title="Admin & CMS Master Control Portal"
        >
          <Lock className="w-3.5 h-3.5" />
          <span className="text-[10px] hidden sm:inline font-mono">Admin</span>
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
