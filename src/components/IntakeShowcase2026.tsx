import React from "react";
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  Award,
  Zap,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";

interface IntakeShowcase2026Props {
  onOpenBooking: () => void;
  onOpenAiCounselor: () => void;
}

export const IntakeShowcase2026: React.FC<IntakeShowcase2026Props> = ({
  onOpenBooking,
  onOpenAiCounselor,
}) => {
  const { settings } = useAdminData();

  return (
    <div id="intake-2026" className="w-full space-y-6">
      {/* Campaign Banner Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900/95 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-black tracking-wider uppercase">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>Applications Open Now • 2026 Season</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
                <span>🇰🇷 STUDY IN SOUTH KOREA</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  – 2026 INTAKE
                </span>
              </h2>

              <p className="text-sm text-stone-300 font-medium max-w-2xl">
                Build Your Future in South Korea! Expert guidance and direct university visa processing from Kathmandu to top Korean universities.
              </p>
            </div>

            {/* Official GBS Office Stamp */}
            <div className="bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800 shrink-0 self-start md:self-auto space-y-1">
              <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Sallyan House, 2nd Floor, Bagbazar, Kathmandu</span>
              </div>
              <div className="text-[10px] text-stone-400 font-medium">
                🇰🇷 Study in Korea | Expert Guidance | Visa Processing
              </div>
            </div>
          </div>

          {/* Dual Intake Cards (December D-4 vs March D-2) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* INTAKE 1: DECEMBER INTAKE – D-4 VISA */}
            <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/90 border-2 border-red-500/40 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 hover:border-red-500/70 transition-all">
              
              {/* Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-950">
                  DECEMBER INTAKE
                </span>
                <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded-lg border border-red-800/60">
                  D-4 VISA (D-4-1 / D-4-7)
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Language Training Pathway
                  </h3>
                  <p className="text-xs text-amber-300/90 font-semibold mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>D-4-1 & D-4-7 Applications Open!</span>
                  </p>
                </div>

                {/* Eligibility Criteria Checklist */}
                <div className="bg-stone-950/70 rounded-2xl p-4 border border-stone-800/80 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 pb-1 border-b border-stone-800">
                    Direct Eligibility Requirements:
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>GPA: <strong className="text-white text-base">2.7+</strong> (Grade 12 or Equivalent)</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Study Gap: <strong className="text-white text-base">Up to 4 Years</strong> Accepted</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>IELTS: <strong className="text-amber-300">Optional</strong> (Not Mandatory)</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>TOPIK: <strong className="text-amber-300">Optional</strong> (Direct Enrollment)</span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Ideal for students wishing to enter Korea rapidly, master the Korean language at university centers, and transfer directly into Bachelor&apos;s or Master&apos;s programs.
                </p>
              </div>

              {/* Action Trigger */}
              <div className="pt-2 border-t border-stone-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Apply for December D-4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/977${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20GBS,%20I%20am%20interested%20in%20December%20Intake%20D-4%20Visa%20(GPA%202.7+,%20Gap%20up%20to%204%20Years).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-3.5 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* INTAKE 2: MARCH INTAKE – D-2 VISA */}
            <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/90 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 hover:border-indigo-500/70 transition-all">
              
              {/* Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-950">
                  MARCH INTAKE
                </span>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800/60">
                  D-2 VISA (Degree Program)
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Undergraduate & Master&apos;s Degrees
                  </h3>
                  <p className="text-xs text-indigo-300 font-semibold mt-0.5 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Direct University Degree Enrollment + Scholarships</span>
                  </p>
                </div>

                {/* Eligibility Criteria Checklist */}
                <div className="bg-stone-950/70 rounded-2xl p-4 border border-stone-800/80 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 pb-1 border-b border-stone-800">
                    Direct Eligibility Requirements:
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>GPA: <strong className="text-white text-base">3.2+</strong> (High Academic Standing)</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>IELTS: <strong className="text-white text-base">5.5+</strong> (English Track)</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Study Gap: <strong className="text-white text-base">Up to 3 Years</strong> Accepted</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-100 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Scholarship: <strong className="text-amber-300">30% – 100%</strong> Tuition Waivers</span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Direct enrollment in South Korea&apos;s leading universities with options for 100% English-medium degrees in Business, Computer Science, Engineering, and Global Studies.
                </p>
              </div>

              {/* Action Trigger */}
              <div className="pt-2 border-t border-stone-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Apply for March D-2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/977${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20GBS,%20I%20am%20interested%20in%20March%20Intake%20D-2%20Visa%20(GPA%203.2+,%20IELTS%205.5+,%20Gap%20up%20to%203%20Years).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-3.5 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Contact & Consultation Bottom Ribbon */}
          <div className="bg-stone-950/90 rounded-2xl p-4 sm:p-5 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Contact us for eligibility & university options
                </p>
                <p className="text-[11px] text-stone-400">
                  Direct Counselor Helpline: <strong className="text-white">{settings.phone}</strong> • Sallyan House, 2nd Floor, Bagbazar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={onOpenAiCounselor}
                className="py-2 px-3.5 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Check Eligibility AI</span>
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free Visit</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
