import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, Calendar, Clock, MapPin, Phone, MessageCircle, CheckCircle2, AlertCircle, Send, Sparkles, User, Mail, GraduationCap } from "lucide-react";
import { LeadFormData } from "../types";
import { useAdminData } from "../context/AdminDataContext";
import { GBSLogo } from "./GBSLogo";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUniversity?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialUniversity = "",
}) => {
  const { submitNewLead, settings } = useAdminData();
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    phone: "",
    email: "",
    educationLevel: "+2 Completed (Science/Management)",
    intendedMajor: initialUniversity ? `Inquiry for ${initialUniversity}` : "Computer Science / IT",
    preferredIntake: "September (Fall) Intake",
    consultationType: "In-Person (Bagbazar Sallyan House)",
    preferredDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    preferredTime: "11:30 AM",
    message: initialUniversity ? `I would like to apply for ${initialUniversity} with scholarship guidance.` : "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide your Full Name and Contact Phone number.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Store into Admin Data Context (CRM)
      submitNewLead(formData, initialUniversity);

      // Attempt API sync & Email Dispatch to GBS Admin
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          universityInterest: initialUniversity,
        }),
      });

      setSubmitted(true);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } catch {
      // If network fails, local state was still updated
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste GBS Educational Consultancy!\nI have booked a counseling session for Study in South Korea 🇰🇷.\nName: ${formData.fullName}\nPhone: ${formData.phone}\nLevel: ${formData.educationLevel}\nPreferred Date: ${formData.preferredDate} at ${formData.preferredTime}\nLocation: Bagbazar Sallyan House`
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <GBSLogo size="xs" variant="badge" showTagline={false} />
                <span className="text-xs text-amber-700 font-bold bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl">
                  {settings.nepaliGreeting || "जय श्रीमन्नारायण 🍀"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Book Your Study in South Korea Consultation
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Visit GBS International Educational Consultancy at <strong className="text-stone-900">Sallyan House, 2nd Floor, Bagbazar, Kathmandu</strong> or connect online with our Senior Visa Counselor.
              </p>
            </div>

            {/* Direct Quick Call Banner */}
            <div className="bg-stone-100 border border-stone-200 p-3.5 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <span>Urgent inquiry? Hotline:</span>
              </div>
              <a
                href="tel:9744427779"
                className="font-black text-stone-900 bg-white px-3 py-1 rounded-xl border border-stone-300 shadow-2xs hover:bg-stone-50 transition-colors"
              >
                9744427779
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Consultation Type Selector */}
              <div>
                <label className="block font-black text-stone-800 uppercase tracking-widest text-[10px] mb-1.5">
                  Choose Consultation Mode:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, consultationType: "In-Person (Bagbazar Sallyan House)" })
                    }
                    className={`py-2.5 px-3 rounded-2xl font-bold border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.consultationType.includes("In-Person")
                        ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>In-Person (Bagbazar)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, consultationType: "Online Video Call" })
                    }
                    className={`py-2.5 px-3 rounded-2xl font-bold border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.consultationType.includes("Online")
                        ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Online Zoom / Call</span>
                  </button>
                </div>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Karki"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Mobile / WhatsApp No. <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98XXXXXXXX"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Education Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Current Academic Level</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 font-medium"
                  >
                    <option value="+2 Completed (Science/Management)">+2 Completed (Science/Management)</option>
                    <option value="+2 Completed (Humanities/Arts)">+2 Completed (Humanities/Arts)</option>
                    <option value="Bachelor's Degree Holder (TU/PU/KU)">Bachelor&apos;s Degree Holder (TU/PU/KU)</option>
                    <option value="Master's Degree Holder">Master&apos;s Degree Holder</option>
                    <option value="Language Course Only (D-4)">Language Course Only (D-4)</option>
                  </select>
                </div>
              </div>

              {/* Major and Intake */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Target Major / Field</label>
                  <input
                    type="text"
                    value={formData.intendedMajor}
                    onChange={(e) => setFormData({ ...formData, intendedMajor: e.target.value })}
                    placeholder="e.g. Computer Science, AI, Business, Hospitality"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Preferred Intake</label>
                  <select
                    value={formData.preferredIntake}
                    onChange={(e) => setFormData({ ...formData, preferredIntake: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 font-medium"
                  >
                    <option value="December Intake – D-4 Visa (Language Pathway)">December Intake – D-4 Visa (Language Pathway)</option>
                    <option value="March Intake – D-2 Visa (Degree Program)">March Intake – D-2 Visa (Degree Program)</option>
                    <option value="September (Fall) Intake">September (Fall) Intake</option>
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 font-medium"
                  >
                    <option value="10:00 AM">10:00 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM - Morning</option>
                    <option value="01:30 PM">01:30 PM - Afternoon</option>
                    <option value="03:00 PM">03:00 PM - Afternoon</option>
                    <option value="04:30 PM">04:30 PM - Evening</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">Additional Notes / Inquiry</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your IELTS/TOPIK score, scholarship expectations, or preferred Korean universities..."
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Reserving Your Seat at Bagbazar Office...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm Free Counseling Appointment</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-stone-400 text-center font-medium">
                🔒 Your contact info is strictly confidential. Zero counseling or registration charge.
              </p>
            </form>
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-xl text-xs font-bold mb-2">
                जय श्रीमन्नारायण 🍀❣️
              </div>
              <h3 className="text-2xl font-black text-stone-900">
                Appointment Requested Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-stone-900">{formData.fullName}</strong>! Our senior counselor at <strong className="text-red-700">Sallyan House, Bagbazar</strong> will reach out to you at <strong className="text-stone-900">{formData.phone}</strong> to confirm your slot for <strong className="text-stone-900">{formData.preferredDate} ({formData.preferredTime})</strong>.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[11px] font-semibold">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Immediate notification copy sent to GBS Admissions ({settings.adminNotificationEmail || "admin@gbsconsultancy.com"})</span>
              </div>
            </div>

            {/* Direct Instant Action Links */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/9779744427779?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Instant Confirmation via WhatsApp</span>
              </a>

              <a
                href="tel:9744427779"
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-red-600" />
                <span>Call Hotline Directly: 9744427779</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-stone-400 hover:text-stone-600 pt-2 block mx-auto underline cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

