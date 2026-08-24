import React, { useState } from "react";
import {
  Calendar,
  MessageCircle,
  Sparkles,
  Award,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  UserCheck,
  Building,
  Check,
  Wind,
  MapPin,
  Phone,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { WavingDualFlags3D } from "./WavingDualFlags3D";
import { NepalMapOutlineVector } from "./NepalMapShape";
import { CutoutPortraitImage } from "./CutoutPortraitImage";

interface CounselorWelcomeHeroProps {
  onOpenBooking: () => void;
  onOpenAiCounselor: () => void;
}

export const CounselorWelcomeHero: React.FC<CounselorWelcomeHeroProps> = ({
  onOpenBooking,
  onOpenAiCounselor,
}) => {
  const { settings, pageContent, teamMembers } = useAdminData();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(0);

  const activeMember = (teamMembers && teamMembers.length > 0 && teamMembers[selectedMemberIndex]) ? teamMembers[selectedMemberIndex] : null;

  const counselorImageSrc = activeMember?.photoUrl || pageContent?.directorImage || settings.counselorWelcomeImage || "/images/counselor_welcome.svg";
  const show3DFlags = settings.showLive3DFlags !== false;
  const showNepalMap = settings.showNepalMapContour !== false;
  const counselorBadgeText = activeMember?.badge || settings.counselorBadge || "Senior Education Director";
  const counselorName = activeMember?.name || pageContent?.directorName || settings.counselorName || "Er. Dipendra Sharma";
  const counselorRole = activeMember?.role || pageContent?.directorRole || settings.counselorRole || "Founder & Senior Korea Education Director";
  const counselorExp = activeMember?.experience || pageContent?.directorExperience || "15+ Years Korea Visa Expertise";
  const counselorBio = activeMember?.bio || pageContent?.directorBio || "हाम्रो कार्यालयमा यहाँहरूलाई हार्दिक स्वागत गर्दछौं। दक्षिण कोरियामा उच्च शिक्षा, आकर्षक छात्रवृत्ति (30% to 100% Scholarship), IELTS/TOPIK बिना वा सहितका विश्वविद्यालयहरू, तथा D-2 & D-4 भिसा फाइल प्रमाणीकरणको लागि हामी तपाईंलाई प्रत्यक्ष परामर्श प्रदान गर्दछौं।";
  const counselorPhone = activeMember?.phone || settings.phone || "9744427779";
  const counselorWhatsapp = activeMember?.whatsapp || settings.whatsapp || "9744427779";

  return (
    <section className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10 text-gray-800 mt-8">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left: Counselor Official Standing Portrait Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative group w-full max-w-sm">
            
            <div className="relative rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden shadow-md flex flex-col items-center text-center p-5 sm:p-6">
              
              {/* Top Verified Counselor Badge & Bilateral Relationship Indicator */}
              <div className="w-full flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#25479D] text-[11px] font-extrabold shadow-sm">
                  <UserCheck className="w-3.5 h-3.5 text-[#25479D]" />
                  <span>{counselorBadgeText}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-white px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                  <span className="flex items-center gap-1">
                    <span className="text-xs">🇳🇵</span> NPL
                  </span>
                  <span className="text-gray-400">⇄</span>
                  <span className="flex items-center gap-1">
                    <span className="text-xs">🇰🇷</span> KOR
                  </span>
                </div>
              </div>

              {/* Photo Display Frame with Nepal Map Silhouette & 3D Waving Flags */}
              <div className="relative w-full aspect-[9/13] max-h-[400px] rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center shadow-inner">
                
                {/* 3D Waving Cloth Physics Simulation (Nepal + South Korea Flags seamless loop) */}
                {show3DFlags ? (
                  <div className="absolute inset-0 z-0 opacity-50 mix-blend-multiply">
                    <WavingDualFlags3D
                      intensity={1.2}
                      speed={1.0}
                      showOverlayLighting={false}
                      showControls={false}
                    />
                  </div>
                ) : null}

                {/* Nepal Map Outline Contour Layer */}
                {showNepalMap && (
                  <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center p-3">
                    <div className="w-full h-full relative">
                      <NepalMapOutlineVector
                        className="w-full h-full text-blue-200 opacity-60"
                        stroke="#93c5fd"
                        strokeWidth={2.2}
                        glow={false}
                      />
                    </div>
                  </div>
                )}

                {/* Transparent Cutout Figure */}
                <div className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none">
                  <CutoutPortraitImage
                    src={counselorImageSrc}
                    alt={counselorName}
                    fallbackSrc="/images/counselor_welcome.svg"
                    allowUpload={false}
                    className="w-full h-full object-contain object-bottom drop-shadow-xl"
                  />
                </div>

                {/* Slim Frosted Glass Counselor Name Badge at Bottom */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-gray-200 text-left flex items-center justify-between shadow-sm z-20">
                  <div>
                    <p className="text-xs font-extrabold text-[#25479D] leading-none flex items-center gap-1.5">
                      <span>{counselorName}</span>
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                      {counselorRole}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded border border-green-600 shadow-sm">
                    Online
                  </span>
                </div>
              </div>

              {/* Counselor Credentials Bento Footer */}
              <div className="mt-4 pt-3 border-t border-gray-200 w-full grid grid-cols-2 gap-2 text-left">
                <div className="bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Experience</div>
                  <div className="text-xs font-extrabold text-gray-900">{counselorExp}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Consultancy</div>
                  <div className="text-xs font-extrabold text-[#25479D]">Sallyan House, Bagbazar</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right: Official Welcome Narrative & Direct Invitation */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Welcome Tag */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#25479D] text-xs font-extrabold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#25479D]" />
              <span>GBS Educational Consultancy (GBS International)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight leading-tight">
              &ldquo;Your Dream of Studying in South Korea Begins Here with Authentic Guidance.&rdquo;
            </h2>
          </div>

          {/* Counselor & Director Switcher (If multiple members exist) */}
          {teamMembers && teamMembers.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
              <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#25479D]" />
                <span>Our Leadership & Experts:</span>
              </span>
              {teamMembers.map((member, idx) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setSelectedMemberIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                    selectedMemberIndex === idx
                      ? "bg-[#25479D] text-white ring-2 ring-[#25479D]/30"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-4 h-4 rounded-full object-cover border border-white"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80";
                    }}
                  />
                  <span>{member.name}</span>
                  {selectedMemberIndex === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Nepali Greeting & Message Card */}
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200 relative shadow-inner">
            <div className="text-[#25479D] font-bold text-sm sm:text-base flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <span>{settings.nepaliGreeting || "जय श्रीमन्नारायण 🍀❣️"}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                  {counselorName}&apos;s Welcome
                </span>
              </div>
              <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                {counselorRole}
              </span>
            </div>

            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
              {counselorBio}
            </p>

            <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-500 flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-gray-700 flex items-center gap-1"><MapPin className="w-3 h-3 text-[#ED2D2A]" /> {settings.address}</span>
              <span className="text-[#ED2D2A] font-bold flex items-center gap-1"><Phone className="w-3 h-3" /> Direct Call: {counselorPhone}</span>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#25479D] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Direct Embassy Mock Interviews</div>
                <div className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  Extensive preparation for Korean Embassy in Tahachal visa questions and SOP verification.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#ED2D2A] shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Guaranteed Scholarship Guidance</div>
                <div className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  Connecting deserving students with 30%–100% tuition scholarships across Seoul and national universities.
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs sm:text-sm font-bold bg-[#ED2D2A] hover:bg-red-700 text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {counselorName.split(" ")[0] || "Expert"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/977${counselorWhatsapp.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(counselorName)}%20at%20GBS%20International,%20I%20would%20like%20to%20consult%20regarding%20studying%20in%20South%20Korea.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs sm:text-sm font-bold bg-white hover:bg-gray-50 text-green-600 border border-green-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp {counselorName.split(" ")[0] || "Counselor"}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
