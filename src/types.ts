export interface University {
  id: string;
  name: string;
  koreanName: string;
  city: string;
  region: "Seoul Capital Area" | "Busan & South" | "Incheon & Gyeonggi" | "Daejeon & Central" | "Daegu & Others";
  ranking: string;
  levels: ("Undergraduate" | "Postgraduate (Master's/PhD)" | "Language Training (D-4)")[];
  popularMajors: string[];
  mediumOfInstruction: "100% English" | "Bilingual (English & Korean)" | "Korean Track";
  minIeltsScore: number;
  minTopikLevel: number;
  annualTuitionKRW: number; // in KRW
  annualTuitionNPR: number; // in NPR
  scholarshipRange: string; // "30% - 100%"
  dormitoryCostMonthlyKRW: number;
  dormitoryCostMonthlyNPR: number;
  acceptanceRate: string;
  imageUrl: string;
  features: string[];
  gksEligible: boolean;
}

export interface VisaStep {
  stepNumber: number;
  title: string;
  duration: string;
  location: string;
  description: string;
  keyPoints: string[];
  nepaliContext: string;
}

export interface DocumentItem {
  id: string;
  category: "Academic & Language" | "Identity & Civil" | "Financial & Sponsorship" | "Embassy & University";
  title: string;
  description: string;
  nepaliRequirement: string;
  mandatory: boolean;
}

export interface TopikQuestion {
  id: number;
  question: string;
  koreanText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: "Hangul Basics" | "TOPIK Level 1" | "TOPIK Level 2" | "Visa & Embassy Prep" | "Campus Life & Study" | "Everyday Korean & Work";
  category?: "Basics & Greetings" | "University & Campus" | "Visa & Embassy" | "Part-time & Daily Life" | "TOPIK Grammar";
  nepaliHint?: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  educationLevel: string;
  intendedMajor: string;
  preferredIntake: string;
  consultationType: "In-Person (Bagbazar Sallyan House)" | "Online Video Call" | "Direct Phone Call";
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export interface NewsTickerItem {
  id: string;
  title: string;
  badge: string; // e.g. "HOT", "BREAKING", "INTAKE 2026", "VISA", "SCHOLARSHIP"
  detail?: string;
  link?: string;
  date: string;
  isActive: boolean;
  urgency: "breaking" | "hot" | "notice" | "info";
}

export interface PostItem {
  id: string;
  title: string;
  slug?: string;
  category: "Intake Updates" | "Visa Guidelines" | "Scholarship News" | "Student Life" | "Embassy Notices";
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  featured: boolean;
  tags: string[];
  views?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  category: "Student Testimonials" | "Visa Process Guide" | "Campus Tours" | "TOPIK Class Reels";
  duration: string;
  description: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: "Visa Grants" | "Student Farewell" | "Orientation" | "Sallyan House Office";
  studentName?: string;
  university?: string;
  year?: string;
  caption?: string;
}

export interface InquiryLead {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  educationLevel: string;
  intendedMajor: string;
  preferredIntake: string;
  consultationType: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: "New" | "Contacted" | "In-Progress" | "Visa Granted" | "Archived";
  counselorNotes?: string;
  universityInterest?: string;
}

export interface EmailDispatchLog {
  id: string;
  timestamp: string;
  recipient: string;
  subject: string;
  leadName: string;
  leadPhone: string;
  status: "sent" | "preview" | "failed";
  previewUrl?: string;
  htmlPreview?: string;
  error?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  experience: string;
  bio: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  badge?: string;
  order?: number;
}

export interface SiteSettings {
  agencyName: string;
  slogan: string;
  phone: string;
  secondaryPhone: string;
  whatsapp: string;
  email: string;
  adminNotificationEmail?: string;
  address: string;
  hours: string;
  nepaliGreeting: string;
  enableTicker: boolean;
  counselorName?: string;
  counselorRole?: string;
  counselorBadge?: string;
  counselorWelcomeImage?: string;
  showNepalMapContour?: boolean;
  showLive3DFlags?: boolean;
}
