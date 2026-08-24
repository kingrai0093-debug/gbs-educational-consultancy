import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  MessageCircle,
  Sparkles,
  Bot,
  UserCheck,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Clock,
  Calendar,
  Minimize2,
  RefreshCw,
  HelpCircle,
  GraduationCap,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { GBSLogo } from "./GBSLogo";

interface ChatMessage {
  id: string;
  sender: "bot" | "counselor" | "user";
  text: string;
  textNepali?: string;
  timestamp: string;
  actionButton?: {
    label: string;
    actionType: "booking" | "whatsapp" | "call" | "calculator" | "universities";
  };
}

interface LiveSupportChatWidgetProps {
  onOpenBooking?: (uniName?: string) => void;
}

const QUICK_PROMPTS = [
  { label: "🇰🇷 Without IELTS Options", query: "Can I apply for Korea without IELTS?" },
  { label: "💰 Cost & Visa Fees", query: "What is the total cost for Korea student visa?" },
  { label: "🎓 100% GKS Scholarship", query: "How can I get GKS full scholarship in Korea?" },
  { label: "📅 2026 Intake Deadlines", query: "What are the deadlines for 2026 intake?" },
  { label: "📍 Office Location & Time", query: "Where is GBS office located and opening time?" },
];

export const LiveSupportChatWidget: React.FC<LiveSupportChatWidgetProps> = ({ onOpenBooking }) => {
  const { settings, submitNewLead } = useAdminData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ai" | "counselor">("ai");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const counselorPhone = settings.directorPhone || "9744427779";
  const officeAddress = settings.officeAddress || "Sallyan House, 2nd Floor, Bagbazar, Kathmandu";

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem("gbs_live_chat_history_v2");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: "msg-welcome-1",
        sender: "counselor",
        text: "Namaste! 🙏 Welcome to GBS Educational Consultancy Live Support Desk. How can we assist with your South Korea study and visa process today?",
        textNepali: "नमस्ते! GBS शैक्षिक परामर्श लाइभ सपोर्टमा स्वागत छ। दक्षिण कोरिया अध्ययन सम्बन्धी के जानकारी लिन चाहनुहुन्छ?",
        timestamp: "Just now",
        actionButton: {
          label: "📅 Book Free 1-on-1 Counseling",
          actionType: "booking",
        },
      },
    ];
  });

  // Save chat to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("gbs_live_chat_history_v2", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnreadCount(0);
    }
  }, [isOpen, messages, isTyping]);

  // Text-To-Speech reader
  const speakText = (text: string) => {
    if (!speechEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Smart Query Responder
  const generateResponse = (query: string): { text: string; actionButton?: ChatMessage["actionButton"] } => {
    const q = query.toLowerCase();

    if (q.includes("without ielts") || q.includes("no ielts") || q.includes("ielts option") || q.includes("without topik")) {
      return {
        text: "Yes, you can study in South Korea **WITHOUT IELTS / TOPIK**! 🎓\n\n• **D-4-1 / D-4-7 Korean Language Pathway**: Open for +2 and Bachelor graduates with GPA 2.4+.\n• Study Korean language in Korea for 6–12 months, achieve TOPIK Level 3+, and progress directly into top universities with up to 100% scholarships.",
        actionButton: { label: "Apply for D-4 Without IELTS", actionType: "booking" },
      };
    }

    if (q.includes("cost") || q.includes("fee") || q.includes("budget") || q.includes("price") || q.includes("kharcha")) {
      return {
        text: "💰 **Estimated Budget for South Korea Study**:\n\n• **Language Course (D-4)**: ~NPR 5.5 to 7.5 Lakhs (6-12 months tuition + insurance).\n• **Bachelor's / Master's (D-2)**: ~NPR 6 to 9 Lakhs / year before scholarship.\n• **Scholarship Waiver**: GBS students receive 30% to 100% tuition waivers, significantly reducing costs.",
        actionButton: { label: "Calculate Scholarship Tier", actionType: "calculator" },
      };
    }

    if (q.includes("gks") || q.includes("scholarship") || q.includes("free study")) {
      return {
        text: "🌟 **GKS (Global Korea Scholarship) & University Waivers**:\n\n• **GKS**: 100% Full Tuition Waiver + Monthly Living Allowance (~1,000,000 KRW/month) + Round-trip Airfare.\n• **University Merit Scholarships**: 30%–100% tuition fee reduction based on your +2/Bachelor GPA and TOPIK/IELTS scores.",
        actionButton: { label: "Check GKS Eligibility", actionType: "calculator" },
      };
    }

    if (q.includes("deadline") || q.includes("intake") || q.includes("september") || q.includes("december") || q.includes("march")) {
      return {
        text: "📅 **Upcoming 2026 Intake Deadlines**:\n\n• **December 2026 D-4 Intake**: Applications Open (Embassy Submission: Oct–Nov 2026)\n• **March 2027 D-2 Degree Intake**: Applications Open (Visa processing starts Dec 2026)\n\nSeats are limited at top Seoul and National universities!",
        actionButton: { label: "Reserve Intake Seat", actionType: "booking" },
      };
    }

    if (q.includes("location") || q.includes("office") || q.includes("address") || q.includes("time") || q.includes("where")) {
      return {
        text: `📍 **GBS Educational Consultancy Office**:\n\n• **Address**: ${officeAddress}\n• **Opening Hours**: Sun – Fri (9:30 AM – 6:00 PM)\n• **Counselor Hotline**: +977 ${counselorPhone}\n• Walk-ins welcome for free profile assessment!`,
        actionButton: { label: "Call Counselor Now", actionType: "call" },
      };
    }

    if (q.includes("work") || q.includes("job") || q.includes("part time") || q.includes("part-time") || q.includes("earning")) {
      return {
        text: "💼 **Part-Time Work Rights in Korea (2026 Rules)**:\n\n• Minimum legal wage: **₩10,030 / hr (~NPR 1,000 / hr)**.\n• Students holding D-2 visas can legally work 25–30 hours/week during term and full-time during holidays.\n• Average monthly student earnings: **NPR 1.5 Lakhs – 2.2 Lakhs**.",
        actionButton: { label: "Chat on WhatsApp", actionType: "whatsapp" },
      };
    }

    if (q.includes("noc") || q.includes("bank") || q.includes("document") || q.includes("checklist")) {
      return {
        text: "📄 **Key Embassy & Visa Documents**:\n\n1. Academic Transcripts & Certificates (+2 / Bachelor)\n2. Bank Balance Certificate (~USD 10,000 – 18,000 for D-4/D-2)\n3. Digital NOC from Ministry of Education Nepal\n4. Relationship & Income Source Verification\n\nGBS documentation experts assist with complete notarization and consular validation.",
        actionButton: { label: "View Complete Checklist", actionType: "booking" },
      };
    }

    return {
      text: `Thank you for your inquiry about studying in South Korea! 🇰🇷\n\nOur senior education counselor is available to review your academic score (GPA), target program, and visa documentation. Would you like to connect directly or book a free in-person counseling session at Bagbazar?`,
      actionButton: { label: "💬 Connect on WhatsApp (Fastest)", actionType: "whatsapp" },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: activeTab === "ai" ? "bot" : "counselor",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionButton: response.actionButton,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(response.text);
    }, 900);
  };

  const handleActionButton = (btn: ChatMessage["actionButton"]) => {
    if (!btn) return;
    if (btn.actionType === "booking" && onOpenBooking) {
      onOpenBooking("");
      setIsOpen(false);
    } else if (btn.actionType === "whatsapp") {
      window.open(
        `https://wa.me/977${counselorPhone}?text=Hello%20GBS,%20I%20am%20chatting%20on%20your%20website%20and%20need%20assistance%20with%20South%20Korea%20study%20options.`,
        "_blank"
      );
    } else if (btn.actionType === "call") {
      window.location.href = `tel:${counselorPhone}`;
    } else if (btn.actionType === "calculator") {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else if (btn.actionType === "universities") {
      const el = document.getElementById("universities");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem("gbs_live_chat_history_v2");
    setMessages([
      {
        id: "msg-welcome-reset",
        sender: "counselor",
        text: "Namaste! Welcome back to GBS Educational Consultancy Live Support. Ask us anything regarding Korean universities, IELTS requirements, scholarships, or visa procedures.",
        timestamp: "Just now",
        actionButton: {
          label: "📅 Book Free Counseling",
          actionType: "booking",
        },
      },
    ]);
  };

  return (
    <>
      {/* 1. FLOATING CHAT LAUNCHER BUTTON */}
      {!isOpen && (
        <div className="fixed bottom-20 right-5 z-40 flex items-center gap-2">
          {/* Notification Preview Bubble */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2.5 bg-slate-900/95 text-white py-2 px-3.5 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-md cursor-pointer hover:border-blue-400 transition-all hover:scale-102 group"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute inset-0" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-amber-300 font-extrabold uppercase tracking-wider">
                GBS Live Counselor Online
              </span>
              <span className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                Need Help with Korea Visa? Ask us! 💬
              </span>
            </div>
          </div>

          {/* Main Floating Circle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            id="gbs-live-chat-launcher-btn"
            className="relative p-4 bg-gradient-to-tr from-[#25479D] via-blue-600 to-[#ED2D2A] text-white rounded-2xl shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 border-2 border-white/30 cursor-pointer group"
            aria-label="Open GBS Live Chat Support"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            
            {/* Live Green Online Dot */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>

            {unreadCount > 0 && (
              <span className="absolute -bottom-1 -left-1 bg-[#ED2D2A] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full border border-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* 2. LIVE SUPPORT CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-50 w-[95vw] sm:w-[410px] max-h-[88vh] h-[620px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#080d1a] via-[#0f172a] to-[#25479D] text-white p-4 shrink-0 relative border-b border-blue-900/40">
            <div className="flex items-center justify-between gap-2">
              
              {/* Agent Identity Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-white p-0.5 shadow-md shrink-0 flex items-center justify-center">
                  <GBSLogo size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-white leading-none">GBS Live Support</h3>
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-black border border-blue-400/30">
                      OFFICIAL
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Counselors Online • Instant Replies</span>
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    speechEnabled ? "bg-amber-500 text-slate-950 font-bold" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                  title={speechEnabled ? "Text-to-speech enabled (Click to mute)" : "Enable voice speech"}
                >
                  {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 transition-colors cursor-pointer"
                  title="Clear Chat History"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                  title="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 mt-3 bg-slate-950/60 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "ai"
                    ? "bg-[#25479D] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Visa Bot</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("counselor")}
                className={`py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "counselor"
                    ? "bg-[#ED2D2A] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                <span>Senior Counselor</span>
              </button>
            </div>
          </div>

          {/* Quick Counselor Direct Action Bar */}
          <div className="bg-slate-50 px-3.5 py-2 border-b border-gray-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500 font-semibold">Direct Desk:</span>
              <a
                href={`tel:${counselorPhone}`}
                className="font-bold text-[#25479D] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#ED2D2A]" />
                <span>{counselorPhone}</span>
              </a>
            </div>

            <a
              href={`https://wa.me/977${counselorPhone}?text=Hello%20GBS,%20I%20am%20chatting%20on%20your%20website%20and%20need%20help%20with%20Korea%20study.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black flex items-center gap-1 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs leading-relaxed space-y-2 ${
                    msg.sender === "user"
                      ? "bg-[#25479D] text-white rounded-tr-xs"
                      : "bg-white text-gray-800 border border-gray-200/90 rounded-tl-xs"
                  }`}
                >
                  <div className="whitespace-pre-line font-medium text-xs sm:text-[13px]">
                    {msg.text}
                  </div>

                  {msg.textNepali && (
                    <div className="text-[11px] pt-1.5 border-t border-gray-100 text-blue-900 font-nepali font-semibold">
                      🇳🇵 {msg.textNepali}
                    </div>
                  )}

                  {/* Action Buttons inside message */}
                  {msg.actionButton && (
                    <div className="pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => handleActionButton(msg.actionButton)}
                        className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#25479D] font-bold rounded-xl border border-blue-200 text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <span>{msg.actionButton.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ED2D2A]" />
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 mt-1 px-1 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500 bg-white p-3 rounded-2xl rounded-tl-xs border border-gray-200 w-28 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] font-bold text-gray-400 ml-1">typing</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip.query)}
                className="shrink-0 px-2.5 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-[#25479D] hover:border-blue-200 border border-gray-200 rounded-full text-[11px] font-semibold text-gray-700 transition-all cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                activeTab === "ai"
                  ? "Ask about universities, IELTS, fees, visas..."
                  : "Message Senior Counselor Dipendra Sharma..."
              }
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#25479D] focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-[#25479D] hover:bg-blue-800 disabled:opacity-40 text-white rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
