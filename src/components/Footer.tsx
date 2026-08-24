import React from "react";
import { Phone, MapPin, Sparkles, Heart, GraduationCap, ShieldCheck, MessageCircle, Calendar, Lock, FileText } from "lucide-react";
import { GBSLogo } from "./GBSLogo";
import { useAdminData } from "../context/AdminDataContext";

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAiCounselor: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAiCounselor, onOpenAdmin }) => {
  const { settings } = useAdminData();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 text-xs">
      {/* Top Banner Ribbon */}
      <div className="bg-[#25479D] py-4 px-4 border-b border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold text-sm uppercase tracking-wide">{settings.nepaliGreeting}</span>
            <span className="text-blue-300 hidden sm:inline">•</span>
            <span className="text-blue-100 font-medium">Your Premier Gateway to Global Education & South Korea</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="font-bold text-white hover:text-blue-100 flex items-center gap-1.5 transition-colors bg-blue-900/80 px-3.5 py-1.5 rounded border border-blue-400/40 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Call: {settings.phone}</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="font-bold text-white bg-[#ED2D2A] hover:bg-red-700 px-4 py-1.5 rounded shadow-sm transition-colors cursor-pointer"
            >
              Free Counseling
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: About GBS & Brand */}
          <div className="space-y-4 bg-slate-900/70 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <GBSLogo size="sm" variant="transparent" />
              <div>
                <span className="font-extrabold text-white text-sm block">GBS</span>
                <span className="text-[10px] text-slate-400 font-medium">Educational Consultancy</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs font-medium">
              Specializing in undergraduate, postgraduate, and Korean language pathway counseling for students across Nepal. Located at Sallyan House, Bagbazar, Kathmandu.
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-300 text-xs font-bold">
              <span>🇳🇵 Kathmandu</span>
              <span>✈️</span>
              <span>🇰🇷 Seoul & Busan</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3 bg-slate-900/70 p-6 rounded-xl border border-slate-800">
            <h4 className="font-extrabold text-white uppercase tracking-widest text-xs border-b border-slate-800 pb-2">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400 font-medium text-xs">
              <li>
                <button onClick={() => scrollTo("universities")} className="hover:text-white transition-colors cursor-pointer">
                  Top Korean Universities
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("calculator")} className="hover:text-white transition-colors cursor-pointer">
                  Cost & Scholarship Calculator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("visa-guide")} className="hover:text-white transition-colors cursor-pointer">
                  6-Step Visa Process (D-2/D-4)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("checklist")} className="hover:text-white transition-colors cursor-pointer">
                  Embassy Document Checklist
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("topik-quiz")} className="hover:text-white transition-colors cursor-pointer">
                  TOPIK Korean Language Quiz
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("announcements")} className="text-red-400 hover:text-red-300 transition-colors cursor-pointer font-bold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Media Hub & Videos</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("location")} className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-bold flex items-center gap-1">
                  <span>📍 Location Map (Putalisadak)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Degrees */}
          <div className="space-y-3 bg-slate-900/70 p-6 rounded-xl border border-slate-800">
            <h4 className="font-extrabold text-white uppercase tracking-widest text-xs border-b border-slate-800 pb-2">Academic Programs</h4>
            <ul className="space-y-2 text-slate-400 font-medium text-xs">
              <li>• Undergraduate Bachelor&apos;s Degrees (4 Yrs)</li>
              <li>• Postgraduate Master&apos;s & PhD (2 Yrs)</li>
              <li>• D-4 Korean Language Training</li>
              <li>• GKS Government Scholarship Support</li>
              <li>• 100% English Taught IT & Business</li>
              <li>• Embassy Tahachal Mock Interview Prep</li>
            </ul>
          </div>

          {/* Col 4: Kathmandu Office */}
          <div className="space-y-3 bg-slate-900/70 p-6 rounded-xl border border-slate-800">
            <h4 className="font-extrabold text-white uppercase tracking-widest text-xs border-b border-slate-800 pb-2">Head Office</h4>
            <div className="space-y-2.5 text-slate-400 text-xs font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ED2D2A] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ED2D2A] shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-white hover:text-red-400 font-bold">
                  {settings.phone} {settings.secondaryPhone ? `/ ${settings.secondaryPhone}` : ""}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <a
                  href={`https://wa.me/977${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline font-semibold"
                >
                  WhatsApp: +977 {settings.whatsapp}
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 font-medium">
                {settings.hours}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin & CMS Control Panel</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs text-center sm:text-left font-medium">
          <div>
            © {new Date().getFullYear()} GBS Educational Consultancy (GBS International). All rights reserved. Sallyan House, Bagbazar, Kathmandu.
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span>{settings.nepaliGreeting}</span>
            <span>•</span>
            <span className="text-slate-300">Study in South Korea 🇰🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
