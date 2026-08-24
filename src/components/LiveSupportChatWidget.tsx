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
  RefreshCw,
  HelpCircle,
  GraduationCap,
  Building2,
  Award,
  FileCheck2,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Search,
  MapPin,
  Flame,
  ThumbsUp,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { GBSLogo } from "./GBSLogo";

interface ChatMessage {
  id: string;
  sender: "bot" | "counselor" | "user";
  text: string;
  textNepali?: string;
  timestamp: string;
  badge?: string;
  actionButton?: {
    label: string;
    actionType: "booking" | "whatsapp" | "call" | "calculator" | "universities" | "checklist" | "quiz";
    targetUni?: string;
  };
}

interface LiveSupportChatWidgetProps {
  onOpenBooking?: (uniName?: string) => void;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

type ChatToolView = "chat" | "universities" | "calculator" | "checklist" | "quiz";

const QUICK_PROMPTS = [
  { label: "🇰🇷 Without IELTS Pathways", query: "Can I study in Korea without IELTS or TOPIK?" },
  { label: "🏛️ Top Universities & Majors", query: "What are the best universities for Computer Science, AI, and Business in Korea?" },
  { label: "💰 Scholarship Simulator", query: "How much scholarship can I get with my GPA?" },
  { label: "📜 Embassy Bank Balance & NOC", query: "What are the bank balance and NOC requirements for Korean Embassy?" },
  { label: "📝 TOPIK & IELTS Online Test", query: "How do I prepare for TOPIK and IELTS?" },
  { label: "⏱️ Study Gap & 2.8 GPA", query: "I have study gap and average GPA, can I still get Korean visa?" },
  { label: "💼 Part-time Work & Wages", query: "What are the legal part-time work rights and hourly wages in Korea?" },
  { label: "🏙️ Seoul vs Regional Hubs", query: "Should I study in Seoul or regional cities like Busan, Daegu, and Daejeon?" },
];

export const LiveSupportChatWidget: React.FC<LiveSupportChatWidgetProps> = ({
  onOpenBooking,
  isOpen: controlledIsOpen,
  onToggleOpen,
}) => {
  const { settings, universities } = useAdminData();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (val: boolean) => {
    if (onToggleOpen) {
      onToggleOpen(val);
    }
    setInternalIsOpen(val);
  };

  const [activeTool, setActiveTool] = useState<ChatToolView>("chat");
  const [counselorPersona, setCounselorPersona] = useState<"ai" | "senior">("senior");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [uniSearchQuery, setUniSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // In-Chat Scholarship Simulator State
  const [simLevel, setSimLevel] = useState<"Undergraduate" | "Postgraduate" | "Language">("Undergraduate");
  const [simGpa, setSimGpa] = useState<"3.6+" | "3.2-3.59" | "2.8-3.19" | "2.4-2.79">("3.2-3.59");
  const [simLang, setSimLang] = useState<"IELTS 6.5+ / TOPIK 4+" | "IELTS 5.5-6.0 / TOPIK 3" | "No IELTS / Beginner">("IELTS 5.5-6.0 / TOPIK 3");

  // In-Chat Quick Quiz State
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const counselorPhone = settings.directorPhone || "9744427779";
  const counselorName = settings.directorName || "Er. Dipendra Sharma";
  const officeAddress = settings.officeAddress || "Sallyan House, 2nd Floor, Bagbazar, Kathmandu";

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem("gbs_live_chat_history_v3");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: "msg-welcome-1",
        sender: "counselor",
        text: `Namaste! 🙏 Welcome to GBS Educational Consultancy Official Live Support Desk.\n\nI am ${counselorName}, Senior Korea Education Director (15+ Years Experience).\n\nWhether you want to explore top Korean universities, calculate your scholarship tier, verify Embassy document requirements, or ask about study gaps & visas without IELTS — I am here to guide you step-by-step!`,
        textNepali: "नमस्ते! दक्षिण कोरिया अध्ययन, विश्वविद्यालय छनोट, छात्रवृत्ति तथा भिसा प्रक्रिया सम्बन्धी कुनै पनि जिज्ञासा भए ढुक्क भएर सोध्नुहोस्।",
        badge: "👑 SENIOR COUNSELOR",
        timestamp: "Just now",
        actionButton: {
          label: "📅 Book Free 1-on-1 Profile Assessment",
          actionType: "booking",
        },
      },
    ];
  });

  // Save chat to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("gbs_live_chat_history_v3", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen && activeTool === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnreadCount(0);
    }
  }, [isOpen, messages, isTyping, activeTool]);

  // Text-To-Speech reader
  const speakText = (text: string) => {
    if (!speechEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~`•]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Comprehensive Natural Language Knowledge & Response Generator
  const generateResponse = (query: string): { text: string; textNepali?: string; badge?: string; actionButton?: ChatMessage["actionButton"] } => {
    const q = query.toLowerCase();

    // 1. Without IELTS / TOPIK
    if (q.includes("without ielts") || q.includes("no ielts") || q.includes("without topik") || q.includes("ielts optional") || q.includes("language pathway")) {
      return {
        badge: "🇰🇷 D-4 VISA EXPERTISE",
        text: `Yes! You can definitely study in South Korea **WITHOUT IELTS OR TOPIK**! 🎓\n\n• **D-4-1 / D-4-7 Korean Language Pathway**:\n  - Open for +2 (+12) graduates and Bachelor graduates with GPA 2.4+.\n  - You study Korean language at a prestigious Korean university campus for 6–12 months.\n  - Upon achieving TOPIK Level 3 or 4 in Korea, you automatically transition into full Degree programs with **50% to 100% tuition scholarships**.\n\n• GBS has processed over 250+ successful D-4 visa grants without IELTS.`,
        textNepali: "IELTS नभएका विद्यार्थीहरूले D-4 भाषा कार्यक्रम मार्फत कोरिया गएर सजिलै स्नातक वा स्नातकोत्तर तहमा भर्ना हुन सक्नुहुन्छ।",
        actionButton: { label: "Apply for D-4 Without IELTS", actionType: "booking" },
      };
    }

    // 2. Study Gap & Low GPA
    if (q.includes("gap") || q.includes("study gap") || q.includes("low gpa") || q.includes("2.8") || q.includes("2.7") || q.includes("2.4") || q.includes("years gap")) {
      return {
        badge: "✨ HIGH VISA SUCCESS",
        text: `Don't worry about study gaps or average GPA! Here is the honest truth from our 15+ years of experience:\n\n• **Accepted Study Gap**: 3 to 5 years after +2, and up to 7 years after Bachelor's degree are accepted.\n• **How We Bridge the Gap**: GBS counselors help you prepare genuine work experience certificates, internship documentation, and statement of purpose (SOP) explaining your career development.\n• **Visa Success Rate**: Over **95%** when documentation is professionally formatted according to Embassy Tahachal standards.`,
        textNepali: "३ देखि ५ वर्ष सम्मको ग्याप भएका विद्यार्थीहरूलाई पनि कामको अनुभव र बलियो कागजात बनाएर भिसा प्राप्त गर्न सकिन्छ।",
        actionButton: { label: "Free Gap Profile Evaluation", actionType: "booking" },
      };
    }

    // 3. Universities & Specific Programs (CS, AI, Business, etc.)
    if (q.includes("university") || q.includes("universities") || q.includes("college") || q.includes("computer science") || q.includes("engineering") || q.includes("bba") || q.includes("mba") || q.includes("major")) {
      return {
        badge: "🏛️ UNIVERSITY PARTNERSHIPS",
        text: `GBS is an authorized official partner with top South Korean Universities! 🇰🇷\n\n• **Top English-Track Options**:\n  - **Inha University (Incheon)**: Top 13 in Korea, 100% English Computer Science, AI & Engineering, 50%–100% scholarships.\n  - **SolBridge International School of Business (Daejeon)**: AACSB Accredited BBA/MBA with American professors.\n  - **Sejong University (Seoul)**: Ranked #1 in Hospitality, Big Data & Hospitality.\n  - **Pusan National University (PNU)**: National Flagship, very low living expenses.\n  - **SKY Universities (SNU, Korea Univ, Yonsei)**: GKS & Presidential full funding.`,
        textNepali: "हाम्रा साझेदार विश्वविद्यालयहरूमा १००% अङ्ग्रेजी माध्यमका प्राविधिक तथा व्यवस्थापन विषयहरू उपलब्ध छन्।",
        actionButton: { label: "Explore All 35+ Korean Universities", actionType: "universities" },
      };
    }

    // 4. Cost, Fees, Kharcha
    if (q.includes("cost") || q.includes("fee") || q.includes("budget") || q.includes("price") || q.includes("kharcha") || q.includes("paisa") || q.includes("expense")) {
      return {
        badge: "💰 TRANSPARENT PRICING",
        text: `Here is the realistic cost breakdown for studying in South Korea from Nepal:\n\n• **1. D-4 Language Pathway**:\n  - Tuition + Insurance (6-12 Months): ~NPR 5.5 to 7.5 Lakhs.\n• **2. Bachelor / Master Degree (D-2)**:\n  - Semester Tuition: ~NPR 3 to 4.5 Lakhs (with standard 50% scholarship).\n• **3. On-Campus Dormitory**:\n  - NPR 20,000 – 28,000 / month (Includes high-speed internet, security & gym).\n• **4. GBS Processing Guarantee**:\n  - 100% Transparent documentation with zero hidden charges.`,
        textNepali: "कोरियामा ५०% देखि १००% सम्म छात्रवृत्ति पाइने हुनाले अन्य देशको तुलनामा निकै सस्तो र गुणस्तरीय शिक्षा पाइन्छ।",
        actionButton: { label: "Simulate Your Scholarship Tier", actionType: "calculator" },
      };
    }

    // 5. GKS & Scholarships
    if (q.includes("gks") || q.includes("scholarship") || q.includes("free") || q.includes("waiver") || q.includes("eligibility")) {
      return {
        badge: "🏆 100% FULL SCHOLARSHIP",
        text: `🌟 **GKS (Global Korea Scholarship) & University Merit Waivers**:\n\n• **GKS (Government Sponsored)**:\n  - 100% Full Tuition Waiver for 4-year Bachelor or 2-year Master degree.\n  - Monthly living stipend of ₩1,000,000 (~NPR 1,00,000/mo).\n  - Free round-trip airfare Kathmandu ⇄ Seoul.\n  - Full National Health Insurance.\n• **Direct University Scholarships**:\n  - 30% to 100% tuition waiver awarded automatically based on your GPA and IELTS/TOPIK.`,
        textNepali: "उत्कृष्ट GPA र भाषा दक्षता भएका विद्यार्थीहरूले १००% निःशुल्क अध्ययन र मासिक भत्ता पाउने GKS छात्रवृत्तिमा आवेदन दिन सक्नुहुन्छ।",
        actionButton: { label: "Test Your Scholarship Eligibility", actionType: "calculator" },
      };
    }

    // 6. Embassy & Bank Balance Checklist
    if (q.includes("bank") || q.includes("balance") || q.includes("noc") || q.includes("embassy") || q.includes("tahachal") || q.includes("document") || q.includes("checklist") || q.includes("requirements")) {
      return {
        badge: "📜 EMBASSY DOCUMENTATION",
        text: `📄 **Korean Embassy (Tahachal) Key Document Checklist**:\n\n1. **Bank Balance Certificate**:\n   - D-4 Language: ~USD 10,000 equivalent in commercial 'A' class bank (6-month history).\n   - D-2 Degree: ~USD 18,000 – 20,000 equivalent.\n2. **Digital NOC (No Objection Certificate)** from MoEST Nepal.\n3. **Academic Transcripts & Character Certificates** (+2 / Bachelor) with MOFA & Consular Attestation.\n4. **Family Relationship & Property Valuation / Tax Clearance**.\n\nGBS documentation officers handle complete notarization and appointment booking!`,
        textNepali: "बैंक ब्यालेन्स, डिजिटल NOC, र नाता प्रमाणीकरण जस्ता सबै कागजातहरू GBS ले दूतावासको मापदण्ड अनुसार तयार गरिदिन्छ।",
        actionButton: { label: "Open Interactive Document Tracker", actionType: "checklist" },
      };
    }

    // 7. TOPIK / IELTS Test Preparation
    if (q.includes("topik") || q.includes("ielts") || q.includes("test") || q.includes("exam") || q.includes("quiz") || q.includes("prep") || q.includes("class")) {
      return {
        badge: "📝 1,000-Q ONLINE TESTING HUB",
        text: `GBS provides Nepal's most advanced **1,000 Questions TOPIK & IELTS Online Testing System**! 🎯\n\n• **TOPIK I & II Prep**: Real exam-style Reading (읽기), Listening (듣기), Grammar & Vocabulary questions with instant score & explanations.\n• **IELTS Smart Training**: Band 5.5 to 7.5 fast-track modules.\n• **Smart Classroom in Bagbazar**: Daily physical & online practice sessions with native Korean leveling materials.`,
        textNepali: "हाम्रो वेबसाइटमै १,००० भन्दा बढी TOPIK तथा IELTS का वास्तविक परीक्षा प्रश्नहरू निःशुल्क अभ्यास गर्न सक्नुहुन्छ।",
        actionButton: { label: "Take 1,000-Q Online Test Now", actionType: "quiz" },
      };
    }

    // 8. Work Rights & Wages
    if (q.includes("work") || q.includes("job") || q.includes("part time") || q.includes("part-time") || q.includes("earning") || q.includes("salary") || q.includes("visa e-7")) {
      return {
        badge: "💼 LEGAL WORK RIGHTS 2026",
        text: `💼 **Student Work Rights in South Korea (2026 Update)**:\n\n• **Minimum Legal Hourly Wage**: **₩10,030 / hr (~NPR 1,000 / hr)**.\n• **Term-Time Permitted Hours**: 25 to 30 hours per week.\n• **Vacation Hours (Summer & Winter)**: **Unlimited full-time legal work allowed**.\n• **Average Student Monthly Earnings**: **NPR 1.5 Lakhs – 2.5 Lakhs**.\n• **Post-Study Career**: Transition to **E-7 Professional Work Visa** or F-2-R Regional Residency Visa upon graduation.`,
        textNepali: "कोरियामा विद्यार्थीले कानुनी रूपमा हप्ताको २५-३० घण्टा र बिदाको समयमा पूरा समय काम गरी महिनाको १.५ देखि २.५ लाख कमाउन सक्छन्।",
        actionButton: { label: "Chat on WhatsApp for Job Info", actionType: "whatsapp" },
      };
    }

    // 9. Seoul vs Regional Cities
    if (q.includes("seoul") || q.includes("busan") || q.includes("daegu") || q.includes("daejeon") || q.includes("incheon") || q.includes("city") || q.includes("destination") || q.includes("where to go")) {
      return {
        badge: "🏙️ DESTINATION GUIDE",
        text: `🗺️ **Seoul vs Regional Education Hubs**:\n\n• **Seoul Capital Metro (Seoul, Incheon, Suwon)**:\n  - Major headquarters (Samsung, LG), bustling student nightlife, top global rankings.\n  - Living cost: ~NPR 45,000–55,000/mo.\n• **Regional Tech Hubs (Busan, Daegu, Daejeon)**:\n  - Daejeon is Korea's Silicon Valley (KAIST, SolBridge).\n  - Busan is the maritime & tech hub with stunning beaches and National Flagship PNU.\n  - Living cost: ~NPR 30,000–38,000/mo (30% cheaper!).\n  - Higher scholarship acceptance rates for Nepali students!`,
        textNepali: "सियोलमा धेरै अवसर छन् भने बुसान, देगु र देजनमा बसाइ खर्च निकै सस्तो र छात्रवृत्ति पाउन धेरै सजिलो छ।",
        actionButton: { label: "Find Best City for Your Major", actionType: "universities" },
      };
    }

    // 10. Office Location, Timings & Hotline
    if (q.includes("location") || q.includes("office") || q.includes("address") || q.includes("time") || q.includes("phone") || q.includes("number") || q.includes("where") || q.includes("bagbazar") || q.includes("visit")) {
      return {
        badge: "📍 VISIT GBS SALLYAN HOUSE",
        text: `📍 **GBS Educational Consultancy Office Details**:\n\n• **Location**: ${officeAddress}\n• **Opening Hours**: Sunday to Friday (9:30 AM – 6:00 PM)\n• **Counselor Hotline**: +977 ${counselorPhone}\n• **WhatsApp Direct**: +977 ${counselorPhone}\n\nWalk-ins are warmly welcome for free file evaluation, SOP consultation, and direct university matching!`,
        textNepali: "काठमाडौँको बागबजार स्थित सल्यान हाउस, दोस्रो तलामा आएर प्रत्यक्ष परामर्श लिन सक्नुहुन्छ।",
        actionButton: { label: "Call Counselor Dipendra Sharma", actionType: "call" },
      };
    }

    // Default Human Warm Response
    return {
      badge: "💬 DEDICATED COUNSELOR",
      text: `Thank you for reaching out! 🇰🇷\n\nI would be delighted to review your specific academic profile (+2 / Bachelor score, passed year, and English or Korean level).\n\nWould you like to book a free 1-on-1 counseling session at our Bagbazar office or connect with me directly on WhatsApp right now?`,
      textNepali: "तपाईंको शैक्षिक पृष्ठभूमि अनुसार कुन विश्वविद्यालय र छात्रवृत्ति उपयुक्त हुन्छ, हामी पूर्ण निःशुल्क परामर्श प्रदान गर्दछौं।",
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
        sender: counselorPersona === "ai" ? "bot" : "counselor",
        text: response.text,
        textNepali: response.textNepali,
        badge: response.badge,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionButton: response.actionButton,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(response.text);
    }, 800);
  };

  const handleActionButton = (btn: ChatMessage["actionButton"]) => {
    if (!btn) return;
    if (btn.actionType === "booking" && onOpenBooking) {
      onOpenBooking(btn.targetUni || "");
      setIsOpen(false);
    } else if (btn.actionType === "whatsapp") {
      window.open(
        `https://wa.me/977${counselorPhone}?text=Hello%20GBS,%20I%20am%20chatting%20on%20your%20website%20and%20need%20assistance%20with%20South%20Korea%20study%20options.`,
        "_blank"
      );
    } else if (btn.actionType === "call") {
      window.location.href = `tel:${counselorPhone}`;
    } else if (btn.actionType === "calculator") {
      setActiveTool("calculator");
    } else if (btn.actionType === "universities") {
      setActiveTool("universities");
    } else if (btn.actionType === "checklist") {
      setActiveTool("checklist");
    } else if (btn.actionType === "quiz") {
      setActiveTool("quiz");
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem("gbs_live_chat_history_v3");
    setMessages([
      {
        id: "msg-welcome-reset",
        sender: "counselor",
        text: `Namaste! Welcome back to GBS Live Support. How can we assist you with Korean Universities, GKS Scholarships, or Embassy Document processing today?`,
        timestamp: "Just now",
        actionButton: {
          label: "📅 Book Free Profile Assessment",
          actionType: "booking",
        },
      },
    ]);
  };

  // In-Chat Scholarship Calculator Result
  const getSimResult = () => {
    if (simLevel === "Language") {
      return {
        tier: "30% - 50% Pathway Tuition Waiver",
        visa: "D-4-1 / D-4-7 Language Program",
        gks: "No IELTS Required",
        matches: ["Inha University", "Pusan National University (PNU)", "Dongguk University"],
      };
    }
    if (simGpa === "3.6+" && simLang.includes("6.5+")) {
      return {
        tier: "100% Full Tuition Waiver + GKS Korean Govt Scholarship",
        visa: "D-2 Direct Degree Track",
        gks: "100% Free Study + ₩1M/mo Stipend",
        matches: ["Seoul National University (SNU)", "Korea University", "Yonsei University", "KAIST"],
      };
    }
    if (simGpa === "3.6+" || simLang.includes("6.5+")) {
      return {
        tier: "70% – 80% High Academic Merit Scholarship",
        visa: "D-2 Direct Degree Track",
        gks: "Top Tier Admission",
        matches: ["Inha University", "Sungkyunkwan University", "Sejong University", "PNU"],
      };
    }
    if (simGpa === "3.2-3.59" || simGpa === "2.8-3.19") {
      return {
        tier: "50% Partner University Tuition Waiver",
        visa: "D-2 / D-4 Flexible",
        gks: "Standard International Student Grant",
        matches: ["SolBridge International (Woosong)", "Inha University", "Sejong University", "Yeungnam"],
      };
    }
    return {
      tier: "30% – 40% Entry Scholarship",
      visa: "D-4 / Regional University Track",
      gks: "Eligible for upgrade with TOPIK 3 in Korea",
      matches: ["Daegu University", "Woosong University", "Keimyung University"],
    };
  };

  const simResult = getSimResult();

  const filteredUnis = universities.filter((u) =>
    u.name.toLowerCase().includes(uniSearchQuery.toLowerCase()) ||
    u.city.toLowerCase().includes(uniSearchQuery.toLowerCase()) ||
    u.popularMajors.some((m) => m.toLowerCase().includes(uniSearchQuery.toLowerCase()))
  );

  return (
    <>
      {/* 1. UNMISSABLE FLOATING LIVE CHAT DOCK */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Notification Preview Bubble */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden lg:flex items-center gap-2.5 bg-slate-950/95 text-white py-2.5 px-4 rounded-2xl shadow-2xl border border-blue-500/40 backdrop-blur-md cursor-pointer hover:border-blue-400 transition-all hover:scale-102 group"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute inset-0" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-amber-300 font-black uppercase tracking-wider">
                GBS Counselor Online
              </span>
              <span className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                Need Help with Korea Visa? Ask us! 💬
              </span>
            </div>
          </div>

          {/* Main Floating Pill Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            id="gbs-live-chat-launcher-btn"
            className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#25479D] via-blue-700 to-[#ED2D2A] text-white rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/60 cursor-pointer group"
            aria-label="Open GBS Live Chat Support"
          >
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div className="text-left leading-tight">
              <span className="block text-[9px] text-amber-300 font-black uppercase tracking-wider">
                🟢 Live Support Desk
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-white block">
                Chat with Counselor 💬
              </span>
            </div>

            {unreadCount > 0 && (
              <span className="bg-[#ED2D2A] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* 2. ADVANCED LIVE SUPPORT CHAT WINDOW & FEATURE HUB */}
      {isOpen && (
        <div className="fixed bottom-4 right-3 sm:right-6 z-50 w-[96vw] sm:w-[440px] max-h-[90vh] h-[670px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#080d1a] via-[#0f172a] to-[#25479D] text-white p-4 shrink-0 relative border-b border-blue-900/40">
            <div className="flex items-center justify-between gap-2">
              
              {/* Counselor Identity Info */}
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
                    <span>{counselorName} • Online Now</span>
                  </p>
                </div>
              </div>

              {/* Top Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    speechEnabled ? "bg-amber-500 text-slate-950 font-bold" : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                  title={speechEnabled ? "Voice Speech Enabled (Click to mute)" : "Enable Voice Speech"}
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

            {/* In-Chat Feature Navigation Bar */}
            <div className="flex items-center gap-1 mt-3 bg-slate-950/70 p-1 rounded-xl border border-white/10 text-xs overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTool("chat")}
                className={`py-1.5 px-2.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                  activeTool === "chat" ? "bg-[#25479D] text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool("universities")}
                className={`py-1.5 px-2.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                  activeTool === "universities" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-300" />
                <span>Universities</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool("calculator")}
                className={`py-1.5 px-2.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                  activeTool === "calculator" ? "bg-amber-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Scholarships</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool("checklist")}
                className={`py-1.5 px-2.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                  activeTool === "checklist" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Checklist</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool("quiz")}
                className={`py-1.5 px-2.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                  activeTool === "quiz" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                <span>Test Hub</span>
              </button>
            </div>
          </div>

          {/* Quick Direct Desk Bar */}
          <div className="bg-slate-50 px-3.5 py-2 border-b border-gray-200 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500 font-semibold">Counselor Hotline:</span>
              <a
                href={`tel:${counselorPhone}`}
                className="font-bold text-[#25479D] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#ED2D2A]" />
                <span>+977 {counselorPhone}</span>
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

          {/* ================= VIEW 1: LIVE CHAT ================= */}
          {activeTool === "chat" && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 shadow-xs leading-relaxed space-y-2 ${
                        msg.sender === "user"
                          ? "bg-[#25479D] text-white rounded-tr-xs"
                          : "bg-white text-gray-800 border border-gray-200 rounded-tl-xs"
                      }`}
                    >
                      {msg.badge && (
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-[#25479D] border border-blue-100 text-[9px] font-black uppercase tracking-wider mb-1">
                          {msg.badge}
                        </span>
                      )}

                      <div className="whitespace-pre-line font-medium text-xs sm:text-[13px] leading-relaxed">
                        {msg.text}
                      </div>

                      {msg.textNepali && (
                        <div className="text-[11px] pt-2 border-t border-gray-100 text-blue-900 font-nepali font-semibold">
                          🇳🇵 {msg.textNepali}
                        </div>
                      )}

                      {/* Action Button inside message */}
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
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
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

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about universities, IELTS, fees, gap, visas..."
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

          {/* ================= VIEW 2: UNIVERSITIES EXPLORER ================= */}
          {activeTool === "universities" && (
            <div className="flex-1 flex flex-col p-4 bg-slate-50 overflow-y-auto text-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-[#25479D]">Korean University Explorer</h4>
                  <p className="text-[11px] text-gray-500">Official partner campuses with high visa grant rates.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTool("chat")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Back to Chat
                </button>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={uniSearchQuery}
                  onChange={(e) => setUniSearchQuery(e.target.value)}
                  placeholder="Search by university, city (Seoul/Incheon), or major..."
                  className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#25479D]"
                />
              </div>

              {/* Universities List */}
              <div className="space-y-3">
                {filteredUnis.map((uni) => (
                  <div
                    key={uni.id}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-blue-300 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-gray-900 text-xs sm:text-sm">{uni.name}</h5>
                        <p className="text-[10px] text-blue-600 font-medium">📍 {uni.city} • {uni.region}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-extrabold">
                        {uni.scholarshipRange}
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-600 line-clamp-1">
                      🎓 <span className="font-semibold">{uni.mediumOfInstruction}</span> • {uni.ranking}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {uni.popularMajors.slice(0, 3).map((major, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                          {major}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          handleSendMessage(`Tell me more about admissions and scholarships at ${uni.name}`);
                          setActiveTool("chat");
                        }}
                        className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#25479D] font-bold rounded-lg text-[11px] text-center"
                      >
                        Ask Counselor 💬
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenBooking) onOpenBooking(uni.name);
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 bg-[#ED2D2A] hover:bg-red-700 text-white font-bold rounded-lg text-[11px]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= VIEW 3: SCHOLARSHIP SIMULATOR ================= */}
          {activeTool === "calculator" && (
            <div className="flex-1 flex flex-col p-4 bg-slate-50 overflow-y-auto text-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-[#25479D]">Scholarship & Eligibility Simulator</h4>
                  <p className="text-[11px] text-gray-500">Calculate your tuition waiver tier based on your scores.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTool("chat")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Back to Chat
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Target Degree</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["Undergraduate", "Postgraduate", "Language"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSimLevel(lvl)}
                        className={`py-2 px-1 rounded-lg text-[11px] font-bold border transition-all text-center ${
                          simLevel === lvl ? "bg-[#25479D] text-white border-[#25479D]" : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Academic GPA (+2 / Bachelor)</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["3.6+", "3.2-3.59", "2.8-3.19", "2.4-2.79"] as const).map((gpa) => (
                      <button
                        key={gpa}
                        type="button"
                        onClick={() => setSimGpa(gpa)}
                        className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition-all text-center ${
                          simGpa === gpa ? "bg-[#25479D] text-white border-[#25479D]" : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        GPA {gpa}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Language Score</label>
                  <div className="space-y-1.5">
                    {(["IELTS 6.5+ / TOPIK 4+", "IELTS 5.5-6.0 / TOPIK 3", "No IELTS / Beginner"] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSimLang(lang)}
                        className={`w-full py-2 px-3 rounded-lg text-[11px] font-bold border text-left transition-all ${
                          simLang === lang ? "bg-[#25479D] text-white border-[#25479D]" : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulation Result Card */}
              <div className="bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 p-4 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-xs uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Estimated Scholarship Result</span>
                </div>
                <div className="text-sm font-black text-gray-900">
                  {simResult.tier}
                </div>
                <div className="text-[11px] text-gray-600 font-medium">
                  • <strong>Visa Track:</strong> {simResult.visa}
                </div>
                <div className="text-[11px] text-gray-600 font-medium">
                  • <strong>GKS Status:</strong> {simResult.gks}
                </div>
                <div className="pt-2 border-t border-amber-200/60">
                  <span className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Matching Campuses:</span>
                  <div className="flex flex-wrap gap-1">
                    {simResult.matches.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white text-gray-800 rounded border border-gray-200 text-[10px] font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleSendMessage(`I simulated my profile: GPA ${simGpa}, ${simLang}, ${simLevel}. Please advise on the best university scholarship application.`);
                    setActiveTool("chat");
                  }}
                  className="w-full py-2.5 mt-2 bg-[#25479D] hover:bg-blue-800 text-white font-bold rounded-xl text-xs text-center shadow-xs"
                >
                  Send Profile to Counselor for Verification 🚀
                </button>
              </div>
            </div>
          )}

          {/* ================= VIEW 4: EMBASSY DOCUMENT TRACKER ================= */}
          {activeTool === "checklist" && (
            <div className="flex-1 flex flex-col p-4 bg-slate-50 overflow-y-auto text-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-[#25479D]">Embassy Document Checklist</h4>
                  <p className="text-[11px] text-gray-500">Official requirements for Korean Embassy in Tahachal.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTool("chat")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Back to Chat
                </button>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: "Bank Balance Certificate", detail: "USD 10,000 to 18,000 with 6-month transaction history in Commercial Bank.", tag: "Mandatory" },
                  { title: "Digital Ministry NOC", detail: "Online No Objection Certificate from Nepal Education Ministry (Keshar Mahal).", tag: "Mandatory" },
                  { title: "Academic Attestation", detail: "+2 or Bachelor certificates with MOFA and Consular legalization.", tag: "Mandatory" },
                  { title: "Relationship Verification", detail: "Ward office family relation certificate and parents' sponsorship letter.", tag: "Mandatory" },
                  { title: "Statement of Purpose (SOP)", detail: "Well-structured study plan formatted according to Korean university major.", tag: "GBS Assisted" },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-xs">{doc.title}</span>
                        <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-black">{doc.tag}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">{doc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  handleSendMessage("Can GBS assist with my bank balance verification and NOC application for Korea visa?");
                  setActiveTool("chat");
                }}
                className="w-full py-2.5 bg-[#25479D] text-white font-bold rounded-xl text-xs text-center shadow-xs"
              >
                Ask Counselor About Document Preparation 💬
              </button>
            </div>
          )}

          {/* ================= VIEW 5: TOPIK / IELTS TESTING HUB ================= */}
          {activeTool === "quiz" && (
            <div className="flex-1 flex flex-col p-4 bg-slate-50 overflow-y-auto text-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-[#25479D]">TOPIK & IELTS Online Test Hub</h4>
                  <p className="text-[11px] text-gray-500">1,000 Questions testing system with native audio explanation.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTool("chat")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Back to Chat
                </button>
              </div>

              {/* Sample In-Chat Test Question */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-purple-700">
                  <span>🇰🇷 TOPIK Level 1-2 Quick Diagnostic</span>
                  <span>Question 1 / 1,000</span>
                </div>

                <div className="text-sm font-bold text-gray-900">
                  다음 빈칸에 들어갈 가장 알맞은 것을 고르십시오:
                  <div className="p-3 bg-gray-50 rounded-xl mt-2 font-mono text-blue-900 font-bold">
                    "저는 한국 대학교에서 컴퓨터 공학을 [ _____ ]."
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { id: 0, text: "1. 공부합니다 (Study)" },
                    { id: 1, text: "2. 먹습니다 (Eat)" },
                    { id: 2, text: "3. 잡니다 (Sleep)" },
                    { id: 3, text: "4. 입습니다 (Wear)" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setQuizAnswered(opt.id);
                        if (opt.id === 0) {
                          setQuizFeedback("🎉 Correct! '공부합니다' means to study. You're on track for TOPIK Level 2+!");
                        } else {
                          setQuizFeedback("❌ Incorrect. The correct answer is 1. 공부합니다 (To study).");
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        quizAnswered === opt.id
                          ? opt.id === 0
                            ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                            : "bg-red-50 border-red-500 text-red-900"
                          : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-blue-50"
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {quizFeedback && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-[#25479D]">
                    {quizFeedback}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("topik-quiz");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  setIsOpen(false);
                }}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs text-center shadow-xs"
              >
                Open Full 1,000 Questions Online Test Hub 📝
              </button>
            </div>
          )}

        </div>
      )}
    </>
  );
};
