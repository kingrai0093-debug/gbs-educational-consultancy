import React, { useState, useEffect } from "react";
import { useAdminData } from "../../context/AdminDataContext";
import {
  Lock,
  Radio,
  FileText,
  Youtube,
  Image as ImageIcon,
  Users,
  Settings,
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  Phone,
  MessageCircle,
  ExternalLink,
  Save,
  ShieldCheck,
  Flame,
  Clock,
  Sparkles,
  Search,
  Eye,
  Mail,
  Send,
  GraduationCap,
  Globe,
} from "lucide-react";
import { NewsTickerItem, PostItem, VideoItem, GalleryItem, InquiryLead, University } from "../../types";
import { GBSLogo } from "../GBSLogo";
import { ImageUploadField } from "./ImageUploadField";
import { getStoredSyncToken, setStoredSyncToken } from "../../utils/cloudSync";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    pageContent,
    tickerItems,
    posts,
    videos,
    gallery,
    universities,
    leads,
    isCloudSyncing,
    cloudSyncMessage,
    lastCloudSyncTime,
    syncAllToGlobalCloud,
    updatePageContent,
    addUniversity,
    updateUniversity,
    deleteUniversity,
    addTickerItem,
    updateTickerItem,
    deleteTickerItem,
    toggleTickerItem,
    addPost,
    updatePost,
    deletePost,
    addVideo,
    updateVideo,
    deleteVideo,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateSettings,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
  } = useAdminData();

  // Authentication State - Protected with SHA-256 Cryptographic Hash & Anti-Brute Force Shield
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [customSyncToken, setCustomSyncToken] = useState<string>(() => getStoredSyncToken());
  const [tokenSavedToast, setTokenSavedToast] = useState(false);

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    "ticker" | "posts" | "videos" | "gallery" | "universities" | "leads" | "cms" | "settings" | "cloud" | "backup"
  >("cms");

  // Forms states
  const [contentForm, setContentForm] = useState({ ...pageContent });
  
  // Keep contentForm in sync with pageContent
  useEffect(() => {
    setContentForm({ ...pageContent });
  }, [pageContent]);

  // Reset authentication and input ONLY when the modal transitions from closed to open
  const wasOpenRef = React.useRef(isOpen);
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setIsAuthenticated(false);
      setPinInput("");
      setPinError("");
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageContent(contentForm);
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 3000);
  };

  const [editingUniId, setEditingUniId] = useState<string | null>(null);
  const [uniForm, setUniForm] = useState({
    name: "",
    koreanName: "",
    city: "Seoul",
    region: "Seoul Capital Area" as University["region"],
    ranking: "Top 20 in South Korea",
    popularMajors: "Computer Science, AI, Business Administration, Data Science",
    mediumOfInstruction: "100% English" as University["mediumOfInstruction"],
    minIeltsScore: 5.5,
    minTopikLevel: 0,
    annualTuitionKRW: 6500000,
    annualTuitionNPR: 660000,
    scholarshipRange: "30% - 100% Tuition Waiver",
    dormitoryCostMonthlyKRW: 250000,
    dormitoryCostMonthlyNPR: 25500,
    acceptanceRate: "High for qualified Nepali applicants",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    features: "Subway direct connection, Automatic 50% scholarship for IELTS 6.5+, Global student center",
    gksEligible: true,
  });

  const handleUniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uniForm.name.trim()) return;

    const majorsArray = uniForm.popularMajors.split(",").map((m) => m.trim()).filter(Boolean);
    const featuresArray = uniForm.features.split(",").map((f) => f.trim()).filter(Boolean);

    if (editingUniId) {
      updateUniversity(editingUniId, {
        name: uniForm.name,
        koreanName: uniForm.koreanName,
        city: uniForm.city,
        region: uniForm.region,
        ranking: uniForm.ranking,
        levels: ["Undergraduate", "Postgraduate (Master's/PhD)"],
        popularMajors: majorsArray,
        mediumOfInstruction: uniForm.mediumOfInstruction,
        minIeltsScore: Number(uniForm.minIeltsScore) || 5.5,
        minTopikLevel: Number(uniForm.minTopikLevel) || 0,
        annualTuitionKRW: Number(uniForm.annualTuitionKRW) || 6500000,
        annualTuitionNPR: Number(uniForm.annualTuitionNPR) || 660000,
        scholarshipRange: uniForm.scholarshipRange,
        dormitoryCostMonthlyKRW: Number(uniForm.dormitoryCostMonthlyKRW) || 250000,
        dormitoryCostMonthlyNPR: Number(uniForm.dormitoryCostMonthlyNPR) || 25500,
        acceptanceRate: uniForm.acceptanceRate,
        imageUrl: uniForm.imageUrl,
        features: featuresArray,
        gksEligible: uniForm.gksEligible,
      });
      setEditingUniId(null);
    } else {
      addUniversity({
        name: uniForm.name,
        koreanName: uniForm.koreanName,
        city: uniForm.city,
        region: uniForm.region,
        ranking: uniForm.ranking,
        levels: ["Undergraduate", "Postgraduate (Master's/PhD)"],
        popularMajors: majorsArray,
        mediumOfInstruction: uniForm.mediumOfInstruction,
        minIeltsScore: Number(uniForm.minIeltsScore) || 5.5,
        minTopikLevel: Number(uniForm.minTopikLevel) || 0,
        annualTuitionKRW: Number(uniForm.annualTuitionKRW) || 6500000,
        annualTuitionNPR: Number(uniForm.annualTuitionNPR) || 660000,
        scholarshipRange: uniForm.scholarshipRange,
        dormitoryCostMonthlyKRW: Number(uniForm.dormitoryCostMonthlyKRW) || 250000,
        dormitoryCostMonthlyNPR: Number(uniForm.dormitoryCostMonthlyNPR) || 25500,
        acceptanceRate: uniForm.acceptanceRate,
        imageUrl: uniForm.imageUrl,
        features: featuresArray,
        gksEligible: uniForm.gksEligible,
      });
    }

    setUniForm({
      name: "",
      koreanName: "",
      city: "Seoul",
      region: "Seoul Capital Area",
      ranking: "Top 20 in South Korea",
      popularMajors: "Computer Science, AI, Business Administration, Data Science",
      mediumOfInstruction: "100% English",
      minIeltsScore: 5.5,
      minTopikLevel: 0,
      annualTuitionKRW: 6500000,
      annualTuitionNPR: 660000,
      scholarshipRange: "30% - 100% Tuition Waiver",
      dormitoryCostMonthlyKRW: 250000,
      dormitoryCostMonthlyNPR: 25500,
      acceptanceRate: "High for qualified Nepali applicants",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      features: "Subway direct connection, Automatic 50% scholarship for IELTS 6.5+, Global student center",
      gksEligible: true,
    });
  };

  const handleEditUni = (uni: University) => {
    setEditingUniId(uni.id);
    setUniForm({
      name: uni.name,
      koreanName: uni.koreanName,
      city: uni.city,
      region: uni.region,
      ranking: uni.ranking,
      popularMajors: uni.popularMajors.join(", "),
      mediumOfInstruction: uni.mediumOfInstruction,
      minIeltsScore: uni.minIeltsScore,
      minTopikLevel: uni.minTopikLevel,
      annualTuitionKRW: uni.annualTuitionKRW,
      annualTuitionNPR: uni.annualTuitionNPR,
      scholarshipRange: uni.scholarshipRange,
      dormitoryCostMonthlyKRW: uni.dormitoryCostMonthlyKRW,
      dormitoryCostMonthlyNPR: uni.dormitoryCostMonthlyNPR,
      acceptanceRate: uni.acceptanceRate,
      imageUrl: uni.imageUrl,
      features: uni.features.join(", "),
      gksEligible: uni.gksEligible,
    });
  };

  const [editingTickerId, setEditingTickerId] = useState<string | null>(null);
  const [tickerForm, setTickerForm] = useState({
    title: "",
    badge: "🔥 INTAKE 2026",
    detail: "",
    link: "#contact",
    urgency: "hot" as NewsTickerItem["urgency"],
    isActive: true,
  });

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postForm, setPostForm] = useState({
    title: "",
    category: "Intake Updates" as PostItem["category"],
    summary: "",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80",
    author: "GBS Senior Counselor",
    tags: "Korea, Visa, D-2, Bagbazar",
    featured: false,
  });

  const [videoForm, setVideoForm] = useState({
    title: "",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "vBf4u5U4u18",
    category: "Student Testimonials" as VideoItem["category"],
    duration: "5:00",
    description: "",
  });

  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    imageUrl: "/visa_grant.jpg",
    category: "Visa Grants" as GalleryItem["category"],
    studentName: "",
    university: "",
    year: "September Intake 2026",
    caption: "",
  });

  const handleEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      imageUrl: item.imageUrl,
      category: item.category,
      studentName: item.studentName || "",
      university: item.university || "",
      year: item.year || "2026",
      caption: item.caption || "",
    });
  };

  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  useEffect(() => {
    setSettingsForm({ ...settings });
  }, [settings, isOpen]);
  const [leadsSearch, setLeadsSearch] = useState("");
  const [selectedLeadStatus, setSelectedLeadStatus] = useState<string>("All");
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  // Cryptographic SHA-256 Hash of Master Secret (One-way hash: plaintext is completely removed from source)
  const MASTER_ADMIN_SHA256 = "41460111fad887f5cf0b9dc960835c84e9395b03a05aa98f53fc02df92864ca1";

  // SHA-256 Helper using Web Crypto API
  const computeSha256 = async (message: string): Promise<string> => {
    try {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      return "";
    }
  };

  // Handle Cryptographic PIN Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check brute-force lockout
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setPinError(`Security Lockout Active: Too many failed attempts. Try again in ${remainingSec}s.`);
      return;
    }

    const inputHash = await computeSha256(pinInput.trim());

    if (inputHash === MASTER_ADMIN_SHA256) {
      setIsAuthenticated(true);
      setPinError("");
      setPinInput("");
      setFailedAttempts(0);
      setLockoutUntil(null);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 30000; // 30 second cooldown
        setLockoutUntil(lockoutTime);
        setPinError("🚨 Security Alert: 5 Failed Attempts. System locked for 30 seconds against brute-force intrusion.");
      } else {
        setPinError(`Access Denied: Invalid Administrative Master Password (${5 - newAttempts} attempts remaining).`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput("");
    setPinError("");
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPinInput("");
    setPinError("");
    onClose();
  };

  // Ticker Submit
  const handleTickerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tickerForm.title.trim()) return;

    if (editingTickerId) {
      updateTickerItem(editingTickerId, {
        title: tickerForm.title,
        badge: tickerForm.badge,
        detail: tickerForm.detail,
        link: tickerForm.link,
        urgency: tickerForm.urgency,
        isActive: tickerForm.isActive,
      });
      setEditingTickerId(null);
    } else {
      addTickerItem({
        title: tickerForm.title,
        badge: tickerForm.badge,
        detail: tickerForm.detail,
        link: tickerForm.link,
        date: "Aug 2026",
        isActive: tickerForm.isActive,
        urgency: tickerForm.urgency,
      });
    }

    setTickerForm({
      title: "",
      badge: "🔥 INTAKE 2026",
      detail: "",
      link: "#contact",
      urgency: "hot",
      isActive: true,
    });
  };

  // Post Submit
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title.trim()) return;

    const tagsArray = postForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPostId) {
      updatePost(editingPostId, {
        title: postForm.title,
        category: postForm.category,
        summary: postForm.summary,
        content: postForm.content,
        imageUrl: postForm.imageUrl,
        author: postForm.author,
        featured: postForm.featured,
        tags: tagsArray,
      });
      setEditingPostId(null);
    } else {
      addPost({
        title: postForm.title,
        category: postForm.category,
        summary: postForm.summary,
        content: postForm.content,
        imageUrl: postForm.imageUrl,
        author: postForm.author,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        featured: postForm.featured,
        tags: tagsArray,
      });
    }

    setPostForm({
      title: "",
      category: "Intake Updates",
      summary: "",
      content: "",
      imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80",
      author: "GBS Senior Counselor",
      tags: "Korea, Visa, D-2, Bagbazar",
      featured: false,
    });
  };

  // Video Submit
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title.trim()) return;

    // Extract YouTube ID if full URL given
    let ytId = videoForm.youtubeId;
    if (videoForm.youtubeUrl.includes("v=")) {
      ytId = videoForm.youtubeUrl.split("v=")[1].split("&")[0];
    } else if (videoForm.youtubeUrl.includes("youtu.be/")) {
      ytId = videoForm.youtubeUrl.split("youtu.be/")[1].split("?")[0];
    }

    addVideo({
      title: videoForm.title,
      youtubeUrl: videoForm.youtubeUrl,
      youtubeId: ytId || "vBf4u5U4u18",
      category: videoForm.category,
      duration: videoForm.duration || "5:00",
      description: videoForm.description,
      date: "Aug 2026",
    });

    setVideoForm({
      title: "",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "vBf4u5U4u18",
      category: "Student Testimonials",
      duration: "5:00",
      description: "",
    });
  };

  // Gallery Submit
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title.trim()) return;

    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, {
        title: galleryForm.title,
        imageUrl: galleryForm.imageUrl,
        category: galleryForm.category,
        studentName: galleryForm.studentName,
        university: galleryForm.university,
        year: galleryForm.year || "2026",
        caption: galleryForm.caption,
      });
      setEditingGalleryId(null);
    } else {
      addGalleryItem({
        title: galleryForm.title,
        imageUrl: galleryForm.imageUrl,
        category: galleryForm.category,
        studentName: galleryForm.studentName,
        university: galleryForm.university,
        year: galleryForm.year || "2026",
        caption: galleryForm.caption,
      });
    }

    setGalleryForm({
      title: "",
      imageUrl: "/visa_grant.jpg",
      category: "Visa Grants",
      studentName: "",
      university: "",
      year: "September Intake 2026",
      caption: "",
    });
  };

  // Save Settings
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 3000);
  };

  // Test Email Notification
  const handleSendTestEmail = async () => {
    setTestEmailLoading(true);
    setTestEmailResult(null);
    try {
      const target = settingsForm.adminNotificationEmail || settingsForm.email || "admin@gbsconsultancy.com";
      const res = await fetch("/api/send-test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetEmail: target }),
      });
      const data = await res.json();
      if (data.success) {
        setTestEmailResult({
          success: true,
          message: `Test consultation lead notification copy successfully dispatched to ${target}!`,
        });
      } else {
        setTestEmailResult({
          success: false,
          message: data.error || "Failed to trigger email notification.",
        });
      }
    } catch {
      setTestEmailResult({
        success: false,
        message: "Network error when attempting to dispatch test email.",
      });
    } finally {
      setTestEmailLoading(false);
    }
  };

  // CSV Export for Leads
  const handleExportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = "ID,Date,FullName,Phone,Email,Education,IntendedMajor,Intake,ConsultationType,Status,CounselorNotes\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.createdAt}","${l.fullName}","${l.phone}","${l.email}","${l.educationLevel}","${l.intendedMajor}","${l.preferredIntake}","${l.consultationType}","${l.status}","${l.counselorNotes || ""}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `GBS_Student_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Download
  const handleDownloadBackup = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `GBS_Full_Website_Backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.fullName.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.phone.includes(leadsSearch) ||
      lead.email.toLowerCase().includes(leadsSearch.toLowerCase());
    const matchStatus = selectedLeadStatus === "All" || lead.status === selectedLeadStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-[#25479D] text-white rounded font-black text-sm tracking-wider uppercase border border-blue-400/30">
              GBS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">GBS Master Control & Admin Portal</h2>
                <span className="text-[10px] bg-red-950 border border-red-700/60 text-red-300 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Bagbazar Staff
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Manage live breaking news, page content, YouTube guides, visa grants, and student leads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={async () => {
                    const res = await syncAllToGlobalCloud(customSyncToken);
                    alert(res.message);
                  }}
                  disabled={isCloudSyncing}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all active:scale-95"
                  title="Push and broadcast all changes live to all visitors worldwide"
                >
                  <Globe className={`w-3.5 h-3.5 ${isCloudSyncing ? "animate-spin" : "text-emerald-200"}`} />
                  <span>{isCloudSyncing ? "Publishing Worldwide..." : "Publish Live to World 🚀"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded text-xs font-bold text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Lock / Logout
                </button>
              </>
            )}
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors cursor-pointer"
              title="Close and lock admin portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATE */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center mx-auto text-blue-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">GBS Administrative Master Access</h3>
              <p className="text-xs text-slate-400 font-medium">
                Enter your master administrative password to access posting, leads, and CMS management.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Master Security Password
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono tracking-widest focus:outline-none focus:border-[#25479D] focus:ring-1 focus:ring-[#25479D] transition-colors"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-[#ED2D2A] mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#25479D] hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-98"
              >
                Authenticate & Unlock Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-800 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto shrink-0 space-y-0 md:space-y-2">
              <nav className="flex md:flex-col gap-1.5 w-full">
                
                <button
                  type="button"
                  onClick={() => setActiveTab("cms")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "cms"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Edit2 className="w-4 h-4 text-blue-400" />
                    <span>CMS Page Content</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ticker")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "ticker"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-[#ED2D2A]" />
                    <span>Live News Ticker</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-mono">
                    {tickerItems.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("posts")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "posts"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Notices & Posts</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-mono">
                    {posts.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("videos")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "videos"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Youtube className="w-4 h-4 text-[#ED2D2A]" />
                    <span>Videos & Reels</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-mono">
                    {videos.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("gallery")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "gallery"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Visa Gallery</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-mono">
                    {gallery.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("universities")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "universities"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>Universities & Photos</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-mono">
                    {universities.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("leads")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "leads"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Student Leads</span>
                  </span>
                  <span className="text-[10px] bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded font-mono">
                    {leads.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "settings"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Site Contacts</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("cloud")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "cloud"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Global Cloud Sync</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-black px-1.5 py-0.5 rounded">
                    LIVE
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("backup")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "backup"
                      ? "bg-[#25479D] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Backup & Reset</span>
                  </span>
                </button>

              </nav>

              <div className="hidden md:block pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-medium">
                GBS Data Engine v2.0 • Real-time Sync
              </div>
            </aside>

            {/* Main Tab Content Area */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-stone-900 space-y-6">
              
              {/* TAB 0: CMS PAGE CONTENT */}
              {activeTab === "cms" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Edit2 className="w-5 h-5 text-blue-400" />
                      <span>CMS & Master Asset Image Manager</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Change every single title, paragraph, banner image, and director portrait across the website.
                    </p>
                  </div>

                  <form onSubmit={handleContentSubmit} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-6">
                    
                    {/* Hero Section Master Controls */}
                    <div className="space-y-4 border-b border-slate-800 pb-5">
                      <h4 className="text-xs font-black uppercase text-[#25479D] tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Hero Area & Top Banner Images
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Hero Subtitle</label>
                          <input
                            type="text"
                            value={contentForm.heroSubtitle}
                            onChange={(e) => setContentForm({ ...contentForm, heroSubtitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Hero Main Title</label>
                          <input
                            type="text"
                            value={contentForm.heroTitle}
                            onChange={(e) => setContentForm({ ...contentForm, heroTitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                          />
                        </div>
                      </div>

                      <ImageUploadField
                        label="Hero Banner Image"
                        value={contentForm.heroBannerImage || ""}
                        onChange={(val) => setContentForm({ ...contentForm, heroBannerImage: val })}
                        helperText="Upload any landscape photo or campus header image directly from your device."
                      />

                      <div className="text-xs">
                        <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Hero Paragraph / Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.heroText}
                          onChange={(e) => setContentForm({ ...contentForm, heroText: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        ></textarea>
                      </div>
                    </div>

                    {/* Counselor / Director Profile Section */}
                    <div className="space-y-4 border-b border-slate-800 pb-5">
                      <h4 className="text-xs font-black uppercase text-[#ED2D2A] tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> Counselor / Director Profile & Photo
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Director Full Name</label>
                          <input
                            type="text"
                            value={contentForm.directorName || ""}
                            onChange={(e) => setContentForm({ ...contentForm, directorName: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Director Title / Role</label>
                          <input
                            type="text"
                            value={contentForm.directorRole || ""}
                            onChange={(e) => setContentForm({ ...contentForm, directorRole: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Experience Tagline</label>
                          <input
                            type="text"
                            value={contentForm.directorExperience || ""}
                            onChange={(e) => setContentForm({ ...contentForm, directorExperience: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                          />
                        </div>

                        <ImageUploadField
                          label="Director / Counselor Portrait Photo"
                          value={contentForm.directorImage || ""}
                          onChange={(val) => setContentForm({ ...contentForm, directorImage: val })}
                          helperText="Upload official director or counselor photo directly."
                        />
                      </div>

                      <div className="text-xs">
                        <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Director Statement / Nepali Welcome Message</label>
                        <textarea
                          rows={3}
                          value={contentForm.directorBio || ""}
                          onChange={(e) => setContentForm({ ...contentForm, directorBio: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        ></textarea>
                      </div>
                    </div>

                    {/* About & General Content */}
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">About Us Text</label>
                        <textarea
                          rows={3}
                          value={contentForm.aboutText}
                          onChange={(e) => setContentForm({ ...contentForm, aboutText: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-slate-300 font-bold mb-1 uppercase tracking-wider">Services Section Title</label>
                        <input
                          type="text"
                          value={contentForm.servicesTitle}
                          onChange={(e) => setContentForm({ ...contentForm, servicesTitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#25479D] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save All Page Content & Images</span>
                      </button>
                      {settingsSavedMessage && (
                        <span className="text-green-400 text-xs font-bold animate-in fade-in flex items-center gap-1">
                          <Check className="w-4 h-4" /> Saved Successfully!
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 1: LIVE NEWS TICKER MANAGER */}
              {activeTab === "ticker" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Radio className="w-5 h-5 text-[#ED2D2A]" />
                      <span>Live Top News Ticker & Notes Manager</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      These notes scroll automatically at the top of the website with animated urgency badges.
                    </p>
                  </div>

                  {/* Add / Edit Ticker Form */}
                  <form onSubmit={handleTickerSubmit} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        {editingTickerId ? "✏️ Edit Ticker Item" : "➕ Add New Breaking Note"}
                      </span>
                      {editingTickerId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTickerId(null);
                            setTickerForm({
                              title: "",
                              badge: "🔥 INTAKE 2026",
                              detail: "",
                              link: "#contact",
                              urgency: "hot",
                              isActive: true,
                            });
                          }}
                          className="text-xs text-stone-400 hover:text-white"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Headline Notice *</label>
                        <input
                          type="text"
                          required
                          value={tickerForm.title}
                          onChange={(e) => setTickerForm({ ...tickerForm, title: e.target.value })}
                          placeholder="e.g. Spring 2026 Korean Universities Direct Intake Open at Bagbazar!"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={tickerForm.badge}
                          onChange={(e) => setTickerForm({ ...tickerForm, badge: e.target.value })}
                          placeholder="e.g. 🔥 INTAKE, 🎓 SCHOLARSHIP"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Full Detail (Shown on Click)</label>
                        <input
                          type="text"
                          value={tickerForm.detail}
                          onChange={(e) => setTickerForm({ ...tickerForm, detail: e.target.value })}
                          placeholder="Detailed explanation, eligibility criteria or walk-in timings..."
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Urgency Style</label>
                        <select
                          value={tickerForm.urgency}
                          onChange={(e) => setTickerForm({ ...tickerForm, urgency: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="breaking">Breaking (Red Pulse)</option>
                          <option value="hot">Hot (Amber)</option>
                          <option value="notice">Notice (Blue)</option>
                          <option value="info">Info (Emerald)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{editingTickerId ? "Update Live Ticker Note" : "Publish to Top News Bar"}</span>
                    </button>
                  </form>

                  {/* List of Tickers */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-400">Current Ticker Queue ({tickerItems.length})</span>
                    {tickerItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                          item.isActive
                            ? "bg-stone-950 border-stone-800 text-stone-200"
                            : "bg-stone-950/40 border-stone-900 text-stone-500 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-mono font-bold text-amber-300 shrink-0">
                            {item.badge}
                          </span>
                          <span className="font-semibold truncate">{item.title}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleTickerItem(item.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                              item.isActive
                                ? "bg-emerald-950 text-emerald-300 border-emerald-600/40"
                                : "bg-stone-900 text-stone-500 border-stone-800"
                            }`}
                          >
                            {item.isActive ? "Active" : "Disabled"}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingTickerId(item.id);
                              setTickerForm({
                                title: item.title,
                                badge: item.badge,
                                detail: item.detail || "",
                                link: item.link || "#contact",
                                urgency: item.urgency,
                                isActive: item.isActive,
                              });
                            }}
                            className="p-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteTickerItem(item.id)}
                            className="p-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: POSTS & NOTICES MANAGER */}
              {activeTab === "posts" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-400" />
                      <span>Notices, Articles & Visa Updates Manager</span>
                    </h3>
                    <p className="text-xs text-stone-400">
                      Create and manage articles displayed in the GBS Official Media Hub.
                    </p>
                  </div>

                  {/* Add / Edit Post Form */}
                  <form onSubmit={handlePostSubmit} className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                    <span className="text-xs font-bold text-amber-300 block">
                      {editingPostId ? "✏️ Edit Post / Notice" : "➕ Create New Announcement Post"}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Post Title *</label>
                        <input
                          type="text"
                          required
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          placeholder="e.g. South Korea D-2 Student Visa Complete Roadmap 2026"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Category</label>
                        <select
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="Intake Updates">Intake Updates</option>
                          <option value="Visa Guidelines">Visa Guidelines</option>
                          <option value="Scholarship News">Scholarship News</option>
                          <option value="Student Life">Student Life</option>
                          <option value="Embassy Notices">Embassy Notices</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Author Name</label>
                        <input
                          type="text"
                          value={postForm.author}
                          onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <ImageUploadField
                          label="Featured Post Image"
                          value={postForm.imageUrl}
                          onChange={(val) => setPostForm({ ...postForm, imageUrl: val })}
                          helperText="Upload any news thumbnail or visa roadmap graphic directly from your device."
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Short Summary</label>
                        <textarea
                          rows={2}
                          value={postForm.summary}
                          onChange={(e) => setPostForm({ ...postForm, summary: e.target.value })}
                          placeholder="Brief 2-sentence summary for card view..."
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Full Article Body Content</label>
                        <textarea
                          rows={5}
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          placeholder="Write article paragraphs, bullet points, requirement lists..."
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={postForm.featured}
                            onChange={(e) => setPostForm({ ...postForm, featured: e.target.checked })}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-stone-300">Feature on homepage spotlight</span>
                        </label>

                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{editingPostId ? "Save Changes" : "Publish Article"}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* List of Posts */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-stone-400">Published Articles ({posts.length})</span>
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={post.imageUrl}
                            alt=""
                            className="w-14 h-14 rounded-xl object-cover border border-stone-800 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold">{post.category}</span>
                            <h4 className="font-bold text-white text-sm">{post.title}</h4>
                            <span className="text-stone-500 text-[11px]">By {post.author} • {post.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPostId(post.id);
                              setPostForm({
                                title: post.title,
                                category: post.category,
                                summary: post.summary,
                                content: post.content,
                                imageUrl: post.imageUrl,
                                author: post.author,
                                tags: post.tags?.join(", ") || "",
                                featured: post.featured,
                              });
                            }}
                            className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePost(post.id)}
                            className="p-2 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: VIDEOS & REELS */}
              {activeTab === "videos" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <span>YouTube Video Guides & Reels Manager</span>
                    </h3>
                    <p className="text-xs text-stone-400">
                      Add student testimonials, interview preparation guides, and campus walk-through videos.
                    </p>
                  </div>

                  <form onSubmit={handleVideoSubmit} className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                    <span className="text-xs font-bold text-amber-300 block">➕ Add New Video Guide</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Video Title *</label>
                        <input
                          type="text"
                          required
                          value={videoForm.title}
                          onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                          placeholder="e.g. Nepali Student Visa Success Story at Kyung Hee University"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">YouTube URL or Video ID</label>
                        <input
                          type="text"
                          value={videoForm.youtubeUrl}
                          onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Category</label>
                        <select
                          value={videoForm.category}
                          onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="Student Testimonials">Student Testimonials</option>
                          <option value="Visa Process Guide">Visa Process Guide</option>
                          <option value="Campus Tours">Campus Tours</option>
                          <option value="TOPIK Class Reels">TOPIK Class Reels</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Video Description</label>
                        <textarea
                          rows={2}
                          value={videoForm.description}
                          onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                          placeholder="Key topics covered in this video..."
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Video to Hub</span>
                    </button>
                  </form>

                  {/* List of Videos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {videos.map((v) => (
                      <div key={v.id} className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex justify-between gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-red-400 font-bold">{v.category}</span>
                          <h4 className="font-bold text-white line-clamp-1">{v.title}</h4>
                          <p className="text-stone-400 text-[11px] line-clamp-2 mt-1">{v.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteVideo(v.id)}
                          className="p-2 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-lg self-start transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY & VISA GRANTS */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-emerald-400" />
                      <span>Visa Grants & Events Gallery</span>
                    </h3>
                    <p className="text-xs text-stone-400">
                      Upload student visa celebrations, classroom moments, and farewell photos.
                    </p>
                  </div>

                  <form onSubmit={handleGallerySubmit} className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 block">
                        {editingGalleryId ? "✏️ Edit Visa Grant / Celebration Entry" : "➕ Add Visa Grant / Celebration Photo"}
                      </span>
                      {editingGalleryId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGalleryId(null);
                            setGalleryForm({
                              title: "",
                              imageUrl: "/visa_grant.jpg",
                              category: "Visa Grants",
                              studentName: "",
                              university: "",
                              year: "September Intake 2026",
                              caption: "",
                            });
                          }}
                          className="text-[11px] text-stone-400 hover:text-white underline cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Event / Photo Title *</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          placeholder="e.g. 🎉 CONGRATULATIONS, ANJANA TAMANG! 🇰🇷❤️"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Category</label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as GalleryItem["category"] })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="Visa Grants">Visa Grants</option>
                          <option value="Student Farewell">Student Farewell</option>
                          <option value="Orientation">Orientation</option>
                          <option value="Sallyan House Office">Sallyan House Office</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <ImageUploadField
                          label="Visa Grant / Student Celebration Photo"
                          value={galleryForm.imageUrl}
                          onChange={(val) => setGalleryForm({ ...galleryForm, imageUrl: val })}
                          helperText="Click to select student celebration photo directly from your phone/computer (JPG, PNG, WebP)."
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Student Name(s)</label>
                        <input
                          type="text"
                          value={galleryForm.studentName}
                          onChange={(e) => setGalleryForm({ ...galleryForm, studentName: e.target.value })}
                          placeholder="e.g. Anjana Tamang"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">University / Visa Sub-category</label>
                        <input
                          type="text"
                          value={galleryForm.university}
                          onChange={(e) => setGalleryForm({ ...galleryForm, university: e.target.value })}
                          placeholder="e.g. D-4-7 Program (September Intake)"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Celebration Story / Caption *</label>
                        <textarea
                          rows={4}
                          value={galleryForm.caption}
                          onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                          placeholder="Write full celebration message, visa grant details, without IELTS notice, etc."
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500 text-xs font-sans resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{editingGalleryId ? "Update Visa Grant Entry" : "Add to Visa Grants & Gallery"}</span>
                    </button>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {gallery.map((g) => (
                      <div key={g.id} className="bg-stone-950 rounded-2xl border border-stone-800 p-3 relative group text-xs flex flex-col justify-between space-y-2">
                        <div className="space-y-2">
                          <div className="relative h-32 w-full overflow-hidden rounded-xl bg-stone-900">
                            <img src={g.imageUrl} alt="" className="w-full h-full object-cover" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-bold text-[9px] uppercase tracking-wider backdrop-blur-sm">
                              {g.category}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-bold text-white line-clamp-1">{g.title}</h5>
                            <p className="text-[11px] text-amber-300 font-semibold">{g.studentName || g.category}</p>
                            {g.university && <p className="text-[10px] text-stone-400 truncate">{g.university}</p>}
                            {g.caption && <p className="text-[10px] text-stone-500 line-clamp-2 mt-1 italic">{g.caption}</p>}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-stone-800 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditGallery(g)}
                            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteGalleryItem(g.id)}
                            className="p-1 bg-red-950 hover:bg-red-900 text-red-300 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: KOREAN UNIVERSITIES & COURSES CMS */}
              {activeTab === "universities" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                        <span>Korea Universities & Programs CMS ({universities.length})</span>
                      </h3>
                      <p className="text-xs text-stone-400">
                        Add, edit, or remove partner universities, campus photos, tuition fees, scholarships, and majors.
                      </p>
                    </div>

                    {editingUniId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUniId(null);
                          setUniForm({
                            name: "",
                            koreanName: "",
                            city: "Seoul",
                            region: "Seoul Capital Area",
                            ranking: "Top 20 in South Korea",
                            popularMajors: "Computer Science, AI, Business Administration",
                            mediumOfInstruction: "100% English",
                            minIeltsScore: 5.5,
                            minTopikLevel: 0,
                            annualTuitionKRW: 6500000,
                            annualTuitionNPR: 660000,
                            scholarshipRange: "30% - 100% Tuition Waiver",
                            dormitoryCostMonthlyKRW: 250000,
                            dormitoryCostMonthlyNPR: 25500,
                            acceptanceRate: "High for qualified applicants",
                            imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
                            features: "Subway direct connection, Automatic scholarship",
                            gksEligible: true,
                          });
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Add / Edit University Form */}
                  <form onSubmit={handleUniSubmit} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-black uppercase text-[#25479D] tracking-wider">
                      {editingUniId ? "✏️ Edit Partner University" : "➕ Add New University to Explorer"}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">University Name (English) *</label>
                        <input
                          type="text"
                          required
                          value={uniForm.name}
                          onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })}
                          placeholder="e.g. Inha University"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Korean Hangul Name</label>
                        <input
                          type="text"
                          value={uniForm.koreanName}
                          onChange={(e) => setUniForm({ ...uniForm, koreanName: e.target.value })}
                          placeholder="e.g. 인하대학교"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">City / Location</label>
                        <input
                          type="text"
                          value={uniForm.city}
                          onChange={(e) => setUniForm({ ...uniForm, city: e.target.value })}
                          placeholder="e.g. Incheon / Seoul"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Region</label>
                        <select
                          value={uniForm.region}
                          onChange={(e) => setUniForm({ ...uniForm, region: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        >
                          <option value="Seoul Capital Area">Seoul Capital Area</option>
                          <option value="Incheon & Gyeonggi">Incheon & Gyeonggi</option>
                          <option value="Busan & South">Busan & South</option>
                          <option value="Daejeon & Central">Daejeon & Central</option>
                          <option value="Daegu & Others">Daegu & Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Ranking & Accreditation</label>
                        <input
                          type="text"
                          value={uniForm.ranking}
                          onChange={(e) => setUniForm({ ...uniForm, ranking: e.target.value })}
                          placeholder="e.g. #13 in South Korea, Top 300 QS"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Medium of Instruction</label>
                        <select
                          value={uniForm.mediumOfInstruction}
                          onChange={(e) => setUniForm({ ...uniForm, mediumOfInstruction: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        >
                          <option value="100% English">100% English</option>
                          <option value="Bilingual (English & Korean)">Bilingual (English & Korean)</option>
                          <option value="Korean Track">Korean Track</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 lg:col-span-3">
                        <ImageUploadField
                          label="Campus Photo"
                          value={uniForm.imageUrl}
                          onChange={(val) => setUniForm({ ...uniForm, imageUrl: val })}
                          helperText="Upload official university campus photography directly."
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Annual Tuition (KRW)</label>
                        <input
                          type="number"
                          value={uniForm.annualTuitionKRW}
                          onChange={(e) => setUniForm({ ...uniForm, annualTuitionKRW: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Approx. Tuition (NPR)</label>
                        <input
                          type="number"
                          value={uniForm.annualTuitionNPR}
                          onChange={(e) => setUniForm({ ...uniForm, annualTuitionNPR: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Scholarship Range</label>
                        <input
                          type="text"
                          value={uniForm.scholarshipRange}
                          onChange={(e) => setUniForm({ ...uniForm, scholarshipRange: e.target.value })}
                          placeholder="e.g. 50% - 100% Tuition Waiver"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="block text-slate-300 font-semibold mb-1">Popular Majors (comma-separated)</label>
                        <input
                          type="text"
                          value={uniForm.popularMajors}
                          onChange={(e) => setUniForm({ ...uniForm, popularMajors: e.target.value })}
                          placeholder="Computer Science, Artificial Intelligence, Business Administration, Data Science"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>

                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="block text-slate-300 font-semibold mb-1">Key Features / Highlights (comma-separated)</label>
                        <input
                          type="text"
                          value={uniForm.features}
                          onChange={(e) => setUniForm({ ...uniForm, features: e.target.value })}
                          placeholder="Direct subway to Seoul, Automatic 50% scholarship for IELTS 6.0+, High job placement"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#25479D]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#25479D] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingUniId ? "Update University Details" : "Add University"}</span>
                    </button>
                  </form>

                  {/* Universities Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {universities.map((uni) => (
                      <div key={uni.id} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs flex flex-col justify-between group">
                        <div className="relative h-36 bg-slate-900">
                          <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditUni(uni)}
                              className="p-1.5 bg-[#25479D] hover:bg-blue-600 text-white rounded shadow cursor-pointer transition-colors"
                              title="Edit University"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteUniversity(uni.id)}
                              className="p-1.5 bg-red-600 hover:bg-red-500 text-white rounded shadow cursor-pointer transition-colors"
                              title="Delete University"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white">
                            📍 {uni.city} • {uni.region}
                          </div>
                        </div>

                        <div className="p-4 space-y-2 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-extrabold text-white text-sm">{uni.name}</h4>
                              <p className="text-[11px] text-blue-400 font-medium">{uni.koreanName}</p>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            🏆 {uni.ranking}
                          </div>

                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                            <span className="text-amber-300 font-bold">💰 {uni.scholarshipRange}</span>
                            <span className="text-slate-400">KRW {uni.annualTuitionKRW.toLocaleString()}/yr</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: STUDENT LEADS & INQUIRIES CRM */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  {/* Immediate Lead Follow-up Banner */}
                  <div className="p-4 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-stone-900 border border-indigo-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Instant Lead Email Dispatch Active</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px]">LIVE</span>
                        </div>
                        <p className="text-stone-300 text-[11px] mt-0.5">
                          Every consultation booking or contact note triggers an immediate email copy to: <strong className="text-amber-300">{settings.adminNotificationEmail || "admin@gbsconsultancy.com"}</strong>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendTestEmail}
                      disabled={testEmailLoading}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{testEmailLoading ? "Dispatching..." : "Send Test Lead Alert"}</span>
                    </button>
                  </div>

                  {testEmailResult && (
                    <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
                      testEmailResult.success
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                        : "bg-red-950/80 border-red-500 text-red-200"
                    }`}>
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{testEmailResult.message}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-400" />
                        <span>Student Consultation Leads CRM ({filteredLeads.length})</span>
                      </h3>
                      <p className="text-xs text-stone-400">
                        Inquiries submitted from website booking forms, hotline requests, and AI Counselor chats.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportLeadsCSV}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Leads to CSV</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
                    <div className="relative flex-1 w-full">
                      <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        placeholder="Search student name, phone or email..."
                        className="w-full pl-9 pr-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <select
                      value={selectedLeadStatus}
                      onChange={(e) => setSelectedLeadStatus(e.target.value)}
                      className="w-full sm:w-48 px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white focus:outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Visa Granted">Visa Granted</option>
                    </select>
                  </div>

                  {/* Leads List */}
                  <div className="space-y-3">
                    {filteredLeads.length === 0 ? (
                      <div className="text-center py-12 text-stone-500 text-xs bg-stone-950 rounded-2xl border border-stone-800">
                        No student leads match your criteria.
                      </div>
                    ) : (
                      filteredLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 space-y-3 text-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">{lead.fullName}</span>
                                <span className="text-stone-500 text-[11px]">
                                  {new Date(lead.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="text-amber-300 text-[11px] font-medium">
                                Level: {lead.educationLevel} • Target: {lead.intendedMajor}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Status Dropdown */}
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                  lead.status === "New"
                                    ? "bg-red-950 text-red-300 border-red-500/40"
                                    : lead.status === "Contacted"
                                    ? "bg-amber-950 text-amber-300 border-amber-500/40"
                                    : lead.status === "Visa Granted"
                                    ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                                    : "bg-indigo-950 text-indigo-300 border-indigo-500/40"
                                }`}
                              >
                                <option value="New">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Visa Granted">Visa Granted 🎉</option>
                                <option value="Archived">Archived</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => deleteLead(lead.id)}
                                className="p-1.5 bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-300 text-[11px]">
                            <div>
                              <strong className="text-stone-400">Intake:</strong> {lead.preferredIntake}
                            </div>
                            <div>
                              <strong className="text-stone-400">Type:</strong> {lead.consultationType}
                            </div>
                            {lead.universityInterest && (
                              <div>
                                <strong className="text-stone-400">University:</strong> {lead.universityInterest}
                              </div>
                            )}
                          </div>

                          {lead.message && (
                            <p className="bg-stone-900 p-2.5 rounded-xl text-stone-300 text-[11px] italic">
                              &ldquo;{lead.message}&rdquo;
                            </p>
                          )}

                          {/* Quick Actions & Notes */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${lead.phone}`}
                                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-red-400" />
                                <span>{lead.phone}</span>
                              </a>

                              <a
                                href={`https://wa.me/977${lead.phone.replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(
                                  lead.fullName
                                )},%20this%20is%20GBS%20International%20Educational%20Consultancy%20from%20Sallyan%20House,%20Bagbazar.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/40 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp Chat</span>
                              </a>
                            </div>

                            <input
                              type="text"
                              defaultValue={lead.counselorNotes || ""}
                              onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                              placeholder="Add counselor note (auto-saves on click away)..."
                              className="px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-[11px] text-stone-300 focus:outline-none focus:border-amber-400 flex-1 max-w-sm"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: SITE SETTINGS & HOTLINES */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-stone-400" />
                      <span>Site Contact Information & Banner Ticker</span>
                    </h3>
                    <p className="text-xs text-stone-400">
                      Update official contact hotlines, email, address text, and toggle the live news ticker.
                    </p>
                  </div>

                  <form onSubmit={handleSettingsSubmit} className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                    {settingsSavedMessage && (
                      <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-center gap-2 font-bold animate-in fade-in">
                        <Check className="w-4 h-4" />
                        <span>Settings saved and updated across the live website!</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Primary Hotline (Call)</label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Secondary Hotline</label>
                        <input
                          type="text"
                          value={settingsForm.secondaryPhone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, secondaryPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">WhatsApp Direct Number</label>
                        <input
                          type="text"
                          value={settingsForm.whatsapp}
                          onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Official Email Address</label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Admin Notification Email (Instant Lead Copies)
                        </label>
                        <input
                          type="email"
                          value={settingsForm.adminNotificationEmail || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, adminNotificationEmail: e.target.value })}
                          placeholder="admin@gbsconsultancy.com"
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                        />
                        <span className="text-[10px] text-stone-500 mt-1 block">
                          Receives an automated HTML summary for every student consultation or contact inquiry.
                        </span>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">Physical Office Address Text</label>
                        <input
                          type="text"
                          value={settingsForm.address}
                          onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Office Timings</label>
                        <input
                          type="text"
                          value={settingsForm.hours}
                          onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">Top Nepali Greeting Tag</label>
                        <input
                          type="text"
                          value={settingsForm.nepaliGreeting}
                          onChange={(e) => setSettingsForm({ ...settingsForm, nepaliGreeting: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-4 border-t border-stone-800">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <span>Welcome Hero Counselor / Director Profile & Display Controls</span>
                          </h4>
                          <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                            Admin-Only Controls
                          </span>
                        </div>

                        <div className="bg-stone-900/70 p-4 rounded-2xl border border-stone-800 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-stone-300 font-semibold mb-1 text-xs">Counselor / Director Full Name</label>
                              <input
                                type="text"
                                value={settingsForm.counselorName || ""}
                                onChange={(e) => setSettingsForm({ ...settingsForm, counselorName: e.target.value })}
                                placeholder="Er. Dipendra Sharma"
                                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-stone-300 font-semibold mb-1 text-xs">Counselor Role / Designation</label>
                              <input
                                type="text"
                                value={settingsForm.counselorRole || ""}
                                onChange={(e) => setSettingsForm({ ...settingsForm, counselorRole: e.target.value })}
                                placeholder="Founder & Senior Korea Director"
                                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-stone-300 font-semibold mb-1 text-xs">Top Badge Text</label>
                              <input
                                type="text"
                                value={settingsForm.counselorBadge || ""}
                                onChange={(e) => setSettingsForm({ ...settingsForm, counselorBadge: e.target.value })}
                                placeholder="Certified Korea Director"
                                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-stone-300 font-semibold mb-1 text-xs">Counselor Portrait Photo / Cutout (.png, .jpeg, .webp, .svg)</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={settingsForm.counselorWelcomeImage || ""}
                                onChange={(e) => setSettingsForm({ ...settingsForm, counselorWelcomeImage: e.target.value })}
                                placeholder="/images/counselor_welcome.svg or https://..."
                                className="flex-1 px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-white font-mono text-xs"
                              />
                              <label className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40 cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Photo</span>
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        if (reader.result) {
                                          setSettingsForm({
                                            ...settingsForm,
                                            counselorWelcomeImage: reader.result as string,
                                          });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => setSettingsForm({ ...settingsForm, counselorWelcomeImage: "/images/counselor_welcome.svg" })}
                                className="px-3 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold border border-stone-700 cursor-pointer"
                                title="Reset to high-definition default vector portrait"
                              >
                                Reset Photo
                              </button>
                            </div>
                            <p className="text-[10px] text-stone-400 mt-1">
                              Solid black background pixels in uploaded JPEG photos are automatically converted to transparent cutout in real time.
                            </p>
                          </div>

                          {/* Hero Visual Animations & Contour Display Toggles */}
                          <div className="pt-2 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-950/60 border border-stone-800 cursor-pointer hover:border-stone-700 transition-colors">
                              <input
                                type="checkbox"
                                checked={settingsForm.showLive3DFlags !== false}
                                onChange={(e) => setSettingsForm({ ...settingsForm, showLive3DFlags: e.target.checked })}
                                className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                              />
                              <div className="text-left">
                                <span className="text-stone-200 font-bold text-xs block">3D Waving Flags Simulation (3D Waves)</span>
                                <span className="text-stone-400 text-[10px] block">Displays South Korea 🇰🇷 & Nepal 🇳🇵 satin cloth wave physics in hero</span>
                              </div>
                            </label>

                            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-950/60 border border-stone-800 cursor-pointer hover:border-stone-700 transition-colors">
                              <input
                                type="checkbox"
                                checked={settingsForm.showNepalMapContour !== false}
                                onChange={(e) => setSettingsForm({ ...settingsForm, showNepalMapContour: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4"
                              />
                              <div className="text-left">
                                <span className="text-stone-200 font-bold text-xs block">Nepal Map Outline (Chuchche Naksha)</span>
                                <span className="text-stone-400 text-[10px] block">Displays glowing golden Nepal map geometry contour in hero</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2 pt-2">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settingsForm.enableTicker}
                            onChange={(e) => setSettingsForm({ ...settingsForm, enableTicker: e.target.checked })}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-stone-200 font-bold">Enable Live Breaking News Ticker Bar at Top of Website</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Site Configuration</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 8: GLOBAL CLOUD SYNCHRONIZATION */}
              {activeTab === "cloud" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/20 uppercase tracking-wider">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Real-Time Global Cloud Synchronization Engine</span>
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Publish Changes Live to Visitors Worldwide
                    </h3>
                    <p className="text-xs text-slate-400 font-medium max-w-2xl mt-1">
                      Whenever you add or update breaking notices, visa grant celebrations, and university fees in Bagbazar, click below to push them directly to the global cloud. All students and visitors across Nepal, South Korea, and worldwide will see your live updates in real time!
                    </p>
                  </div>

                  {/* Live Status Bento Card */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                        <div>
                          <h4 className="text-sm font-black text-white">
                            Global Live Synchronization Status: Active 🌐
                          </h4>
                          <p className="text-xs text-slate-400">
                            Connected to GitHub Cloud (kingrai0093-debug/gbs-educational-consultancy)
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 font-medium block">Last Global Sync Time:</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {lastCloudSyncTime ? new Date(lastCloudSyncTime).toLocaleString() : "Never synced yet"}
                        </span>
                      </div>
                    </div>

                    {cloudSyncMessage && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-300 font-medium">
                        {cloudSyncMessage}
                      </div>
                    )}

                    {/* GitHub Sync Token Config */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Admin GitHub Cloud Sync Token (Personal Access Token)
                      </label>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                          type="password"
                          value={customSyncToken}
                          onChange={(e) => setCustomSyncToken(e.target.value)}
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setStoredSyncToken(customSyncToken);
                            setTokenSavedToast(true);
                            setTimeout(() => setTokenSavedToast(false), 3000);
                          }}
                          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-600 shrink-0"
                        >
                          {tokenSavedToast ? "✅ Token Saved!" : "Save Cloud Token"}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Token is securely stored in your local admin environment to authorize cloud live commits.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={async () => {
                          const res = await syncAllToGlobalCloud(customSyncToken);
                          alert(res.message);
                        }}
                        disabled={isCloudSyncing}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all active:scale-98"
                      >
                        <Globe className={`w-4 h-4 ${isCloudSyncing ? "animate-spin" : ""}`} />
                        <span>{isCloudSyncing ? "Publishing Worldwide..." : "Publish All Changes Live to World Now 🚀"}</span>
                      </button>
                    </div>
                  </div>

                  {/* How it works info box */}
                  <div className="p-5 bg-blue-950/40 border border-blue-800/60 rounded-2xl space-y-2 text-xs text-slate-300">
                    <h5 className="font-bold text-blue-300 flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>How Worldwide Live Synchronization Works:</span>
                    </h5>
                    <p className="leading-relaxed">
                      1. You edit or publish news, university courses, student visa grants (e.g. Anjana Tamang), or contact details in this Admin Panel.
                    </p>
                    <p className="leading-relaxed">
                      2. Clicking <strong>"Publish Live to World 🚀"</strong> sends your updates directly to the central cloud repository (<code className="text-amber-300">public/cms_data.json</code>).
                    </p>
                    <p className="leading-relaxed">
                      3. All students, parents, and visitors worldwide visiting <a href="https://kingrai0093-debug.github.io/gbs-educational-consultancy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold">https://kingrai0093-debug.github.io/gbs-educational-consultancy/</a> immediately receive your live changes automatically without needing to refresh or clear cache!
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 7: BACKUP & FACTORY RESET */}
              {activeTab === "backup" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Download className="w-5 h-5 text-cyan-400" />
                      <span>Backup, Export & Factory Reset</span>
                    </h3>
                    <p className="text-xs text-stone-400">
                      Export your custom articles, video lists, and settings as a JSON file or restore default data.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export */}
                    <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Download className="w-4 h-4 text-cyan-400" />
                        <span>Download Full JSON Backup</span>
                      </h4>
                      <p className="text-xs text-stone-400">
                        Export all published posts, videos, gallery items, leads, and site configurations to your computer.
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadBackup}
                        className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Backup File</span>
                      </button>
                    </div>

                    {/* Reset */}
                    <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset to Factory Defaults</span>
                      </h4>
                      <p className="text-xs text-stone-400">
                        Reverts all posts, videos, ticker notes, and settings back to original Sallyan House, Bagbazar default content.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to restore default GBS website data?")) {
                            resetToDefaults();
                            alert("Website data restored to default successfully!");
                          }
                        }}
                        className="px-4 py-2.5 bg-red-950 hover:bg-red-900 border border-red-700/60 text-red-300 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset All Website Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  );
};
