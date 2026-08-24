import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Sparkles,
  GraduationCap,
  Calendar,
  MessageSquare,
  Menu,
  X,
  BookOpen,
  Calculator,
  FileCheck,
  Award,
  MessageCircle,
  Radio,
  Lock,
  FileText,
} from "lucide-react";
import { GBSLogo } from "./GBSLogo";
import { useAdminData } from "../context/AdminDataContext";
import { TabletModeSwitcher } from "./TabletModeSwitcher";
import { ViewMode } from "../hooks/useDeviceViewMode";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAiCounselor: () => void;
  onOpenAdmin?: () => void;
  viewMode?: ViewMode;
  isAndroid?: boolean;
  isAutoDetected?: boolean;
  onSetViewMode?: (mode: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAiCounselor,
  onOpenAdmin,
  viewMode = "standard",
  isAndroid = false,
  isAutoDetected = false,
  onSetViewMode = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useAdminData();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white text-gray-800 shadow-md">
      {/* Top Banner - Blue */}
      <div className="bg-[#25479D] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {settings.address || "Sallyan House, Bagbazar, Kathmandu, Nepal"}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              {settings.email || "info@gbsconsultancy.com"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-200 transition-colors">Student Login</a>
            
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1 hover:text-gray-200 transition-colors cursor-pointer"
                title="Admin Dashboard"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <GBSLogo size="md" variant="transparent" showTagline={false} />
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-gray-700">
            <button onClick={() => scrollToSection("hero")} className="text-[#25479D] border-b-2 border-[#ED2D2A] pb-1 cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection("universities")} className="hover:text-[#25479D] transition cursor-pointer">
              Universities
            </button>
            <button onClick={() => scrollToSection("visa-guide")} className="hover:text-[#25479D] transition cursor-pointer">
              Visa Process
            </button>
            <button onClick={() => scrollToSection("counselors")} className="hover:text-[#25479D] transition cursor-pointer font-bold text-amber-700">
              Our Counselors 👥
            </button>
            <button onClick={() => scrollToSection("announcements")} className="hover:text-[#25479D] transition cursor-pointer text-[#ED2D2A] flex items-center gap-1 font-bold">
              <span>Visa Grants 🎓</span>
            </button>
            <button onClick={() => scrollToSection("topik-quiz")} className="hover:text-[#25479D] transition cursor-pointer font-bold">
              TOPIK & IELTS Prep 📝
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-[#25479D] transition cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded font-bold bg-[#ED2D2A] hover:bg-red-700 text-white shadow-lg shadow-red-500/30 transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded text-xs font-bold bg-[#ED2D2A] text-white shadow-xs cursor-pointer"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#25479D] text-2xl cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 pt-3 pb-6 space-y-2 shadow-xl absolute w-full">
          <div className="space-y-1 text-sm font-semibold text-gray-700">
            <button onClick={() => scrollToSection("universities")} className="w-full text-left px-3 py-3 rounded hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
              Universities
            </button>
            <button onClick={() => scrollToSection("counselors")} className="w-full text-left px-3 py-3 rounded hover:bg-gray-50 border-b border-gray-100 cursor-pointer font-bold text-amber-700">
              Meet Our Counselors & Directors 👥
            </button>
            <button onClick={() => scrollToSection("visa-guide")} className="w-full text-left px-3 py-3 rounded hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
              Visa Process
            </button>
            <button onClick={() => scrollToSection("announcements")} className="w-full text-left px-3 py-3 rounded hover:bg-gray-50 border-b border-gray-100 cursor-pointer font-bold text-[#ED2D2A]">
              Visa Grants & Announcements 🎓
            </button>
            <button onClick={() => scrollToSection("topik-quiz")} className="w-full text-left px-3 py-3 rounded hover:bg-gray-50 border-b border-gray-100 cursor-pointer font-bold text-[#25479D]">
              TOPIK & IELTS Online Testing 📝
            </button>
            <button onClick={() => scrollToSection("contact")} className="w-full text-left px-3 py-3 rounded hover:bg-gray-50 cursor-pointer">
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
