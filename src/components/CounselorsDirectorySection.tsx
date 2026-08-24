import React from "react";
import { useAdminData } from "../context/AdminDataContext";
import { UserCheck, Phone, MessageCircle, Mail, Award, CheckCircle2, Sparkles, MapPin } from "lucide-react";

interface CounselorsDirectorySectionProps {
  onOpenBooking: () => void;
}

export const CounselorsDirectorySection: React.FC<CounselorsDirectorySectionProps> = ({ onOpenBooking }) => {
  const { teamMembers, settings } = useAdminData();

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section id="counselors" className="py-16 sm:py-20 bg-white border-t border-gray-100 text-gray-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#25479D] text-xs font-extrabold tracking-wide uppercase shadow-xs">
            <UserCheck className="w-3.5 h-3.5 text-[#25479D]" />
            <span>Meet Our Official Leadership & Expert Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Certified Counselors & <span className="text-[#25479D]">Senior Directors</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
            Our experienced education consultants and directors provide direct 1-on-1 counseling, university scholarship matching, and Korean embassy visa verification at Sallyan House, Bagbazar.
          </p>
        </div>

        {/* Counselors & Directors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Photo Header Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-100 overflow-hidden flex items-end justify-center">
                  <img
                    src={member.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 text-[#25479D] backdrop-blur-md shadow-sm border border-blue-100 flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-[#ED2D2A]" />
                      <span>{member.badge || "Senior Counselor"}</span>
                    </span>
                  </div>

                  {/* Online Status */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-emerald-600 shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Available</span>
                    </span>
                  </div>

                  {/* Name Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
                    <h3 className="text-lg sm:text-xl font-black drop-shadow-md">{member.name}</h3>
                    <p className="text-xs text-blue-200 font-semibold drop-shadow-sm">{member.role}</p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Experience Badge */}
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Expertise</span>
                      <p className="text-xs font-black text-gray-900">{member.experience}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#25479D] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-medium">
                      {member.bio}
                    </p>
                  )}

                  {/* Location Info */}
                  <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ED2D2A] shrink-0" />
                    <span className="truncate">Sallyan House, Bagbazar, Kathmandu</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 bg-white border-t border-gray-200 flex items-center gap-2">
                <a
                  href={`tel:${member.phone || settings.phone || "9744427779"}`}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-gray-900 border border-gray-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Direct Phone Call"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25479D]" />
                  <span>Call Direct</span>
                </a>

                <a
                  href={`https://wa.me/977${(member.whatsapp || member.phone || settings.whatsapp || "9744427779").replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(member.name)}%20at%20GBS%20International,%20I%20would%20like%20to%20consult%20regarding%20studying%20in%20South%20Korea.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Appointment Booking Footer */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#25479D] to-blue-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">Want In-Person Counseling at Sallyan House?</h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Book a free document review and interview session with our directors and counselors today.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-[#ED2D2A] hover:bg-red-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            Book Free In-Person Appointment
          </button>
        </div>

      </div>
    </section>
  );
};
