import { NewsTickerItem, PostItem, VideoItem, GalleryItem, SiteSettings, InquiryLead, TeamMember } from "../types";

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-dipendra-sharma",
    name: "Er. Dipendra Sharma",
    role: "Founder & Senior Korea Education Director",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    experience: "15+ Years Korea & Global Visa Expertise",
    bio: "Guiding Nepali students with transparent admissions, high visa approval rates, and 30%–100% scholarship matching across top South Korean universities.",
    phone: "9744427779",
    email: "info@gbsnepal.com",
    whatsapp: "9744427779",
    badge: "Founder & Director",
    order: 1,
  },
  {
    id: "member-bishnu-pandey",
    name: "Bishnu Hari Pandey",
    role: "Managing Director & Senior Consultant",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    experience: "12+ Years Higher Education Counseling",
    bio: "Specializing in D-2 Bachelor's & Master's degree university admissions, GKS scholarship filings, and embassy documentation at KVAC.",
    phone: "9851123456",
    email: "admission@gbsnepal.com",
    whatsapp: "9851123456",
    badge: "Managing Director",
    order: 2,
  },
  {
    id: "member-korean-instructor",
    name: "Min-Jun Park (박민준)",
    role: "Head TOPIK & Korean Language Instructor",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    experience: "8+ Years Native Korean Language Training",
    bio: "Leading intensive Hangul, TOPIK I & II classes, and embassy visa interview mock preparation sessions at Bagbazar Sallyan House.",
    phone: "9744427779",
    email: "language@gbsnepal.com",
    whatsapp: "9744427779",
    badge: "TOPIK Master Instructor",
    order: 3,
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  agencyName: "GBS International Educational Consultancy",
  slogan: "Study in Korea | Expert Guidance | Visa Processing",
  phone: "9744427779",
  secondaryPhone: "9851123456",
  whatsapp: "9744427779",
  email: "info@gbsnepal.com",
  adminNotificationEmail: "admin@gbsconsultancy.com",
  address: "Sallyan House, 2nd Floor, Bagbazar, Kathmandu, Nepal",
  hours: "Sun–Fri: 9:00 AM – 5:30 PM (Sat by appointment)",
  nepaliGreeting: "जय श्रीमन्नारायण 🍀❣️",
  enableTicker: true,
  counselorName: "Er. Dipendra Sharma",
  counselorRole: "Founder & Senior Korea Visa Director",
  counselorBadge: "Certified Korea Director",
  counselorWelcomeImage: "/images/counselor_welcome.svg",
  showNepalMapContour: true,
  showLive3DFlags: true,
};

export const DEFAULT_NEWS_TICKER: NewsTickerItem[] = [
  {
    id: "ticker-anjana-visa",
    title: "🎉 VISA GRANT SUCCESS: Congratulations Anjana Tamang on receiving South Korea D-4-7 Student Visa (September Intake) Without IELTS!",
    badge: "🎉 VISA GRANTED",
    detail: "Huge congratulations to Anjana Tamang! Successful D-4-7 visa granted without IELTS through GBS International Educational Consultancy.",
    link: "#announcements",
    date: "Aug 2026",
    isActive: true,
    urgency: "breaking",
  },
  {
    id: "ticker-1",
    title: "🇰🇷 STUDY IN SOUTH KOREA – 2026 INTAKE: December D-4 & March D-2 Applications Open Now!",
    badge: "🔥 2026 INTAKE OPEN",
    detail: "December Intake (D-4-1 / D-4-7: GPA 2.7+, Gap up to 4 yrs, IELTS/TOPIK Optional) & March Intake (D-2: GPA 3.2+, IELTS 5.5+, Gap up to 3 yrs). Visit Sallyan House, 2nd Floor, Bagbazar!",
    link: "#intake-2026",
    date: "Aug 2026",
    isActive: true,
    urgency: "breaking",
  },
  {
    id: "ticker-2",
    title: "Up to 100% GKS & University Merit Tuition Scholarships available for Nepali Students",
    badge: "🎓 SCHOLARSHIP",
    detail: "Over 35+ partner universities in South Korea offering 30% to 100% tuition fee deduction based on high school GPA and TOPIK scores.",
    link: "#calculator",
    date: "Aug 2026",
    isActive: true,
    urgency: "hot",
  },
  {
    id: "ticker-3",
    title: "🇰🇷 Embassy of the Republic of Korea in Nepal (np.mofa.go.kr): Updated Study Visa Document Verification Guidelines",
    badge: "🏛️ EMBASSY NOTICE",
    detail: "Official Embassy Bulletin (m_25533): Mandatory consular authentication rules for Graduation Certificates & academic credentials for D-2/D-4 visa lodgement at KVAC Kathmandu.",
    link: "https://np.mofa.go.kr/np-en/brd/m_25533/list.do",
    date: "Latest Notice",
    isActive: true,
    urgency: "notice",
  },
  {
    id: "ticker-4",
    title: "Korea Raises Student Minimum Hourly Wage (시급) to 10,030+ KRW (~NPR 1,000/hr) with expanded legal D-2/D-4 work hours",
    badge: "💼 WORK RIGHTS",
    detail: "International students with valid ARC and D-2 visa can work up to 25–30 hours/week during semesters and unlimited hours during vacations.",
    link: "#visa-guide",
    date: "Aug 2026",
    isActive: true,
    urgency: "info",
  },
  {
    id: "ticker-5",
    title: "Free In-Person Counseling & TOPIK Level 1/2 Preparation Starter Pack at Sallyan House Bagbazar",
    badge: "📍 BAGBAZAR HUB",
    detail: "Visit GBS International today (opposite education lane, 3 min walk from Ratnapark) or call direct 9744427779.",
    link: "#location",
    date: "Aug 2026",
    isActive: true,
    urgency: "hot",
  },
];

export const DEFAULT_POSTS: PostItem[] = [
  {
    id: "post-anjana-tamang-grant",
    title: "🎉 Congratulations Anjana Tamang: Successful D-4-7 Korean Visa Grant (September Intake)!",
    category: "Visa Guidelines",
    summary: "Huge congratulations to Anjana Tamang on securing her South Korean D-4-7 Student Visa without IELTS for September Intake!",
    content: `🎉 CONGRATULATIONS, ANJANA TAMANG! 🇰🇷❤️

We are thrilled to announce the successful D-4-7 Code Visa Grant for Anjana Tamang! 🎓✈️🇰🇷

✅ Visa Granted Without IELTS
🎓 D-4-7 Program
📅 September Intake

A new chapter of your Korean dream begins now! 🇰🇷✨
May this journey bring you success, growth, happiness, and countless opportunities.

🌸 Congratulations once again, Anjana! 🎉
GBS International Educational Consultancy (Sallyan House, 2nd Floor, Bagbazar)`,
    imageUrl: "/visa_grant.jpg",
    author: "GBS Visa Processing Wing",
    date: "August 24, 2026",
    featured: true,
    tags: ["Visa Grant", "Anjana Tamang", "D-4-7", "Without IELTS", "September Intake"],
    views: 320,
  },
  {
    id: "post-1",
    title: "South Korea D-2 Student Visa Complete Roadmap 2026: From Bagbazar to Seoul",
    category: "Visa Guidelines",
    summary: "Step-by-step document preparation, Bank Balance certificate ($10,000–$20,000), Apostille legalization in Kathmandu, and Embassy interview tips.",
    content: `South Korea continues to be the premier study destination for Nepali students with world-class universities, safe living environments, and lucrative post-study job opportunities (E-7 visa).

Here is what you need to know for 2026:
1. **Intakes**: March (Spring) and September (Fall) are the main intakes. English-track & Korean-track programs have distinct deadlines.
2. **Tuition & Scholarships**: Most public and top private universities offer 30% to 100% scholarships automatically upon admission.
3. **Embassy in Kathmandu**: The Embassy of the Republic of Korea in Tahachal requires verified academic certificates, relationship verification, and clean financial solvency records.

At GBS International Educational Consultancy (Sallyan House, Bagbazar), our certified counselors guide you through every single step with a 98.4% visa success record.`,
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80",
    author: "GBS Senior Counselor",
    date: "August 20, 2026",
    featured: true,
    tags: ["D-2 Visa", "Korea Study", "Embassy Guide", "Bagbazar"],
    views: 1420,
  },
  {
    id: "post-2",
    title: "Top 10 South Korean Universities with 50%–100% Scholarships for Nepali Students",
    category: "Scholarship News",
    summary: "Comprehensive guide to Yonsei, Korea University, Hanyang, Kyung Hee, and regional top universities with generous international financial aid.",
    content: `Higher education in South Korea is highly affordable compared to Western nations. In fact, most universities actively fund international students to foster global talent.

Top scholarship avenues include:
- **Global Korea Scholarship (GKS)**: 100% tuition covered + monthly stipend + round-trip airfare.
- **University Merit Scholarships**: Awarded directly based on High School GPA (GPA 3.0+ gets 30–50% tuition reduction).
- **TOPIK Achievement Awards**: Attaining TOPIK Level 3 or higher unlocks up to 70%–100% tuition waivers in the first semester.

Visit GBS Bagbazar for a free profile assessment and custom university shortlist!`,
    imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
    author: "Admissions Team",
    date: "August 15, 2026",
    featured: true,
    tags: ["Scholarships", "Yonsei", "Hanyang", "GKS 2026"],
    views: 2180,
  },
  {
    id: "post-3",
    title: "Student Life & Legal Part-time Jobs in South Korea: Hourly Rates & Work Hours",
    category: "Student Life",
    summary: "Everything Nepali students need to know about convenience store jobs (Alba), restaurant work, teaching assistance, and legal regulations.",
    content: `South Korea legally permits international D-2 university students to work part-time after obtaining immigration permission (체류자격외활동허가).

Key insights:
- **Minimum Hourly Wage**: 10,030 KRW/hr (approx. NPR 1,000/hr).
- **Allowed Hours**: Up to 25–30 hours/week during semester; unlimited hours during summer and winter vacations.
- **Monthly Potential**: Students easily earn 1.2M – 2.2M KRW/month, comfortably covering rent, meals, and semester savings.

Learn basic conversational Korean with GBS's free Hangul classes in Bagbazar to land high-paying campus and barista jobs faster!`,
    imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
    author: "Alumni Coordinator",
    date: "August 10, 2026",
    featured: false,
    tags: ["Part-time Job", "Alba", "Seoul Life", "Student Budget"],
    views: 950,
  },
];

export const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "From Kathmandu to Seoul: Nepali Student Visa Success Story at Kyung Hee University",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "vBf4u5U4u18",
    category: "Student Testimonials",
    duration: "4:35",
    description: "Listen to Saurav from Kathmandu share how GBS International at Sallyan House handled his D-2 visa documentation, scholarship application, and smooth Seoul airport pickup.",
    date: "Aug 2026",
  },
  {
    id: "vid-2",
    title: "Embassy Interview Preparation: Top 10 Questions & Sample Answers in Korean",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "J8z0i9p_d7U",
    category: "Visa Process Guide",
    duration: "8:20",
    description: "Detailed breakdown of the Korean Embassy consular interview at Tahachal. How to answer why you chose Korea, your study plan, and future career intentions with confidence.",
    date: "Aug 2026",
  },
  {
    id: "vid-3",
    title: "Living in Korea as a Nepali Student: Dormitory Tour, Cost of Food & T-Money Card",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "l8fDk3Vw_8E",
    category: "Campus Tours",
    duration: "6:15",
    description: "A virtual tour of university dormitories, convenience stores (CU/GS25), subway navigation, and Nepali student associations in South Korea.",
    date: "Aug 2026",
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-anjana-tamang",
    title: "🎉 CONGRATULATIONS, ANJANA TAMANG! 🇰🇷❤️",
    imageUrl: "/visa_grant.jpg",
    category: "Visa Grants",
    studentName: "Anjana Tamang",
    university: "D-4-7 Korean Language Program",
    year: "September Intake 2026",
    caption: `🎉 CONGRATULATIONS, ANJANA TAMANG! 🇰🇷❤️
We are thrilled to announce the successful D-4-7 Code Visa Grant for Anjana Tamang! 🎓✈️🇰🇷
✅ Visa Granted Without IELTS
🎓 D-4-7 Program
📅 September Intake
A new chapter of your Korean dream begins now! 🇰🇷✨
May this journey bring you success, growth, happiness, and countless opportunities.
🌸 Congratulations once again, Anjana! 🎉
GBS International Educational Consultancy`,
  },
  {
    id: "gal-1",
    title: "Visa Grant Celebration - Hanyang University Seoul",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    category: "Visa Grants",
    studentName: "Bishal Shrestha & Priya Gurung",
    university: "Hanyang University (Computer Science)",
    year: "2026",
    caption: "Congratulating our students on receiving their D-2 Korean student visas with 70% tuition scholarships.",
  },
  {
    id: "gal-2",
    title: "Pre-Departure Orientation at Sallyan House, Bagbazar",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    category: "Orientation",
    studentName: "Fall 2026 Student Batch",
    university: "Yonsei, Kyung Hee & Pusan National",
    year: "2026",
    caption: "Briefing 35+ departing students on Korean culture, SIM cards, ARC registration, and airport transit.",
  },
  {
    id: "gal-3",
    title: "TOPIK Korean Language Class at GBS Bagbazar",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    category: "Sallyan House Office",
    studentName: "Morning Batch Students",
    university: "GBS Language Wing",
    year: "2026",
    caption: "Interactive Hangul pronunciation and TOPIK I grammar session at our Bagbazar smart classrooms.",
  },
  {
    id: "gal-4",
    title: "Yonsei University International Campus Welcome",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    category: "Student Farewell",
    studentName: "Sanjay Thapa",
    university: "Yonsei University",
    year: "2026",
    caption: "Safely arrived in Incheon Songdo campus for Undergraduate Business Administration.",
  },
];

export const DEFAULT_LEADS: InquiryLead[] = [
  {
    id: "lead-1",
    createdAt: "2026-08-22T10:15:00Z",
    fullName: "Rohan Tamang",
    phone: "9841234567",
    email: "rohan.tamang@gmail.com",
    educationLevel: "+2 Completed (Science GPA 3.4)",
    intendedMajor: "Computer Engineering",
    preferredIntake: "Spring 2026 (March)",
    consultationType: "In-Person (Bagbazar Sallyan House)",
    preferredDate: "2026-08-25",
    preferredTime: "11:00 AM",
    message: "I want to apply for Hanyang or Kyung Hee university with scholarship.",
    status: "New",
    counselorNotes: "Eligible for 50% scholarship. Invite for physical document check at Sallyan House.",
    universityInterest: "Hanyang University",
  },
  {
    id: "lead-2",
    createdAt: "2026-08-21T14:30:00Z",
    fullName: "Sunita KC",
    phone: "9818987654",
    email: "sunita.kc@yahoo.com",
    educationLevel: "Bachelor in BBA (CGPA 3.6)",
    intendedMajor: "Master in International Business",
    preferredIntake: "Fall 2026 (September)",
    consultationType: "Online Video Call",
    preferredDate: "2026-08-24",
    preferredTime: "2:30 PM",
    message: "Seeking English-track MBA programs with GKS or university stipend.",
    status: "Contacted",
    counselorNotes: "Sent university list and fee structure via WhatsApp.",
    universityInterest: "Korea University",
  },
];
