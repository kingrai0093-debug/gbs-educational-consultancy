import React, { useState } from "react";
import { Phone, MapPin, Mail, MessageCircle, Clock, Send, CheckCircle2, AlertCircle, Sparkles, Navigation, Compass } from "lucide-react";
import { LocationMap3D } from "./LocationMap3D";
import { useAdminData } from "../context/AdminDataContext";
import { GBSLogo } from "./GBSLogo";

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const { settings, submitNewLead } = useAdminData();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      // Store in Admin Lead CRM
      submitNewLead({
        fullName: name,
        phone,
        email,
        message,
        educationLevel: "General Quick Inquiry",
        intendedMajor: "South Korea Study Abroad",
        preferredIntake: "Upcoming Spring/Fall Intake",
        consultationType: "In-Person (Bagbazar Sallyan House)",
      });

      // API call with email dispatch to admin
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          phone,
          email,
          message,
          educationLevel: "General Quick Inquiry",
          intendedMajor: "South Korea Study Abroad",
          preferredIntake: "Upcoming Intake",
          consultationType: "In-Person (Bagbazar Sallyan House)",
        }),
      });

      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gray-50 text-gray-900 relative overflow-hidden border-b border-gray-200">
      {/* Anchor for location map */}
      <div id="location" className="absolute -top-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-10">
        
        {/* Header Bento Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{settings.nepaliGreeting} • Visit Us Today</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#25479D]">
              GBS — Sallyan House, Bagbazar
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Located in Kathmandu&apos;s central educational hub. Visit us for South Korea counseling, document evaluation, and scholarship processing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="px-4 py-2.5 bg-white hover:bg-blue-50 text-[#25479D] rounded text-sm font-bold border-2 border-[#25479D] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#ED2D2A]" />
              <span>Call: {settings.phone}</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 bg-[#ED2D2A] hover:bg-red-700 text-white rounded text-sm font-bold shadow-md flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Book In-Person Counseling</span>
            </button>
          </div>
        </div>

        {/* 3D Location Map & Street View Bento Module */}
        <LocationMap3D onOpenBooking={onOpenBooking} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Office Details Bento Card */}
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ED2D2A]">Head Office Information</span>
                <h3 className="text-xl sm:text-2xl font-black text-[#25479D] mt-1">
                  GBS Educational Consultancy
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-bold">
                  {settings.address}
                </p>
              </div>
              <div className="px-3 py-1.5 bg-blue-50 text-[#25479D] rounded font-black text-sm border border-blue-100 uppercase">
                GBS
              </div>
            </div>

            <div className="space-y-4 text-sm">
              
              {/* Phone / Hotline */}
              <div className="flex items-start gap-4 p-4 rounded bg-gray-50 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#ED2D2A] flex items-center justify-center shrink-0 border border-red-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-500 block text-xs font-bold uppercase tracking-wide">Direct Hotline & Counseling:</span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-base font-black text-gray-900 hover:text-[#ED2D2A] transition-colors block mt-0.5"
                  >
                    {settings.phone} {settings.secondaryPhone ? `/ ${settings.secondaryPhone}` : ""}
                  </a>
                  <span className="text-xs text-gray-500 font-medium">Available during working hours (Sun–Fri)</span>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-4 p-4 rounded bg-gray-50 border border-gray-200 shadow-sm hover:border-green-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-500 block text-xs font-bold uppercase tracking-wide">WhatsApp Chat Support:</span>
                  <a
                    href={`https://wa.me/977${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20GBS,%20I%20am%20interested%20in%20studying%20in%20South%20Korea.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-black text-green-700 hover:underline block mt-0.5"
                  >
                    +977 {settings.whatsapp}
                  </a>
                  <span className="text-xs text-gray-500 font-medium">Instant query response & document check</span>
                </div>
              </div>

              {/* Address / Location */}
              <div className="flex items-start gap-4 p-4 rounded bg-gray-50 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#25479D] flex items-center justify-center shrink-0 border border-blue-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-500 block text-xs font-bold uppercase tracking-wide">Physical Location:</span>
                  <span className="text-base font-black text-gray-900 block mt-0.5">
                    {settings.address}
                  </span>
                  <span className="text-xs text-[#25479D] font-bold">Sallyan House, 2nd Floor, Bagbazar</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-4 rounded bg-gray-50 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-500 block text-xs font-bold uppercase tracking-wide">Counseling Hours:</span>
                  <span className="text-base font-black text-gray-900 block mt-0.5">
                    {settings.hours}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Walk-ins welcome with high school / college transcripts</span>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Message Form Bento Card */}
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md space-y-5">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ED2D2A]">Direct Inquiries</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#25479D] mt-1">
                Send Us a Quick Note
              </h3>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Our counseling team will review your profile and reach out within 2 business hours.
              </p>
            </div>

            {sent ? (
              <div className="p-8 bg-green-50 border border-green-200 rounded-xl text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto border-2 border-green-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-gray-900">Inquiry Received!</h4>
                <p className="text-sm text-gray-700 font-medium">
                  Thank you, <strong className="text-green-700">{name}</strong>. A counselor from GBS Educational Consultancy will call you at <strong className="text-green-700">{phone}</strong> shortly.
                </p>
                <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-green-200 text-green-700 rounded shadow-sm text-xs font-bold">
                  <Mail className="w-4 h-4" />
                  <span>Lead copy dispatched to GBS Admin inbox for fast follow-up</span>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => { setSent(false); setName(""); setPhone(""); setEmail(""); setMessage(""); }}
                    className="px-6 py-3 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded text-sm font-bold cursor-pointer shadow-sm transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickContact} className="space-y-5 text-sm pt-2">
                <div>
                  <label className="block text-gray-700 font-extrabold mb-1.5 uppercase text-xs tracking-wider">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Tamang"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#25479D] focus:ring-1 focus:ring-[#25479D] transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-extrabold mb-1.5 uppercase text-xs tracking-wider">
                      Mobile / WhatsApp No. *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98XXXXXXXX"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#25479D] focus:ring-1 focus:ring-[#25479D] transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-extrabold mb-1.5 uppercase text-xs tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#25479D] focus:ring-1 focus:ring-[#25479D] transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-extrabold mb-1.5 uppercase text-xs tracking-wider">
                    Your Query / Intended Major
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us your high school GPA, preferred degree, or intake date..."
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#25479D] focus:ring-1 focus:ring-[#25479D] transition-all resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#ED2D2A] hover:bg-red-700 text-white rounded font-extrabold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                >
                  <Send className="w-5 h-5" />
                  <span className="text-base">{loading ? "Sending..." : "Submit Inquiry to GBS Team"}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
