export interface EmbassyNotice {
  id: string;
  title: string;
  koreanTitle?: string;
  category: "Study Visa" | "Consular Legalization" | "GKS Scholarship" | "KVAC Kathmandu" | "Embassy Announcement";
  date: string;
  isPinned?: boolean;
  isNew?: boolean;
  summary: string;
  fullDetails: string;
  officialUrl: string;
  sourceLabel: string;
}

export const OFFICIAL_EMBASSY_URL = "https://np.mofa.go.kr/np-en/brd/m_25533/list.do";

export const EMBASSY_NOTICES_LIST: EmbassyNotice[] = [
  {
    id: "emb-1",
    title: "Notice on Document Verification for Study Visa Applications (Graduation Certificate & Academic Records)",
    koreanTitle: "유학비자 신청을 위한 학력서류(졸업증명서) 영사확인 안내",
    category: "Study Visa",
    date: "May 14, 2026",
    isPinned: true,
    isNew: true,
    summary: "Mandatory guidelines for consular authentication of academic credentials (Graduation Certificate & Transcripts) for Fall 2026 / Spring 2027 semesters at the Embassy & KVAC Kathmandu.",
    fullDetails: `The Embassy of the Republic of Korea in Nepal has issued updated guidelines regarding the submission of verified academic credentials:
1. A consular authenticated copy of the official Graduation Certificate is strictly required for all study visa (D-2 / D-4) applicants.
2. Documents verified before May 11, 2026 can be submitted for 2026 intake applications at the Korea Visa Application Center (KVAC).
3. Documents verified after May 11, 2026 are accepted if issued within one year from the official graduation date.
4. Pre-verification at the Ministry of Foreign Affairs (MOFA) Nepal and Nepal Notary Public Council is required prior to submitting documents for consular authentication.`,
    officialUrl: "https://np.mofa.go.kr/np-en/brd/m_25533/list.do",
    sourceLabel: "Embassy of the Republic of Korea in Nepal (Notice No. 25533)",
  },
  {
    id: "emb-2",
    title: "Notice on Online Reservation System for Consular Legalization & Document Attestation",
    koreanTitle: "공증 및 영사확인 온라인 예약제도 안내",
    category: "Consular Legalization",
    date: "Dec 31, 2025 / 2026 Update",
    isPinned: true,
    isNew: false,
    summary: "All consular legalization (notarization & certificate attestation) appointments must be booked exclusively through the official online portal. Slots open Mondays & Wednesdays at 09:30 AM Nepal Time.",
    fullDetails: `Please note that in-person walk-in token distribution for document attestation is discontinued:
- Online reservation slots are released every Monday and Wednesday at exactly 09:30 AM (Nepal Standard Time) for subsequent consular service days.
- Applicants must carry their confirmed reservation confirmation slip, original academic certificates, citizenship certificate, and pre-attested copies from the Department of Consular Services (MOFA Nepal, Tripureshwor).
- Only applicants with confirmed appointment receipts will be permitted entry to the consular section.`,
    officialUrl: "https://np.mofa.go.kr/np-en/brd/m_25533/list.do",
    sourceLabel: "Embassy of the Republic of Korea in Nepal (Consular Section)",
  },
  {
    id: "emb-3",
    title: "2026/2027 Global Korea Scholarship (GKS-U & GKS-G) Embassy Track Selection Guidelines",
    koreanTitle: "정부초청 외국인 장학생(GKS) 선발 모집 요강",
    category: "GKS Scholarship",
    date: "2026 Announcement",
    isPinned: false,
    isNew: true,
    summary: "NIIED & Korean Embassy in Nepal announce full 100% government scholarships covering airfare, tuition, monthly allowance (1,000,000+ KRW), and 1-year Korean language training.",
    fullDetails: `The Embassy of the Republic of Korea in Nepal conducts 1st round document screening and interviews for eligible Nepali citizens:
- Quota: Designated annual undergraduate and graduate seats for Nepal.
- Benefits: Full tuition exemption, monthly living stipend, medical insurance, settlement allowance, and round-trip economy air tickets.
- Eligibility: High academic standing (cumulative GPA 80%+ or top 20% of class) and under 25 years old (Undergraduate) or under 40 years old (Graduate).`,
    officialUrl: "https://np.mofa.go.kr/np-en/brd/m_25533/list.do",
    sourceLabel: "National Institute for International Education (NIIED) & Embassy of the ROK",
  },
  {
    id: "emb-4",
    title: "Korea Visa Application Center (KVAC) Kathmandu: Revised Visa Fee & Submission Timings",
    koreanTitle: "대한민국 비자신청센터(KVAC) 수수료 및 접수 안내",
    category: "KVAC Kathmandu",
    date: "July 2026",
    isPinned: false,
    isNew: false,
    summary: "Standardized exchange rates (US$ 1 = NPR 155) and mandatory KVAC submission rules for student visas, dependent visas (F-3), and visiting categories.",
    fullDetails: `Korea Visa Application Center (KVAC) located in Kathmandu manages all student visa application lodgements:
- Visa processing fee is payable in cash in Nepalese Rupees at the official rate.
- Applicants must present their Certificate of Admission (CoA), Tuberculosis (TB) test certificate from designated hospitals (Patan Hospital, CIWEC, or IOM), and authenticated financial documents.
- Processing timeline for D-2/D-4 study visas typically ranges from 10 to 15 working days.`,
    officialUrl: "https://np.mofa.go.kr/np-en/brd/m_25533/list.do",
    sourceLabel: "Korea Visa Application Center (KVAC Nepal) & Embassy of ROK",
  },
  {
    id: "emb-5",
    title: "Embassy Public Notice: Recruitment of 2026 Korea Supporters & Cultural Diplomacy",
    koreanTitle: "주네팔대사관 2026 코리아 서포터즈 모집 공고",
    category: "Embassy Announcement",
    date: "2026 Bulletin",
    isPinned: false,
    isNew: false,
    summary: "Embassy of the Republic of Korea in Nepal program promoting bilateral education, cultural exchanges, and student community partnerships in Kathmandu.",
    fullDetails: `Nepali youths and university students are selected to promote cultural understanding between Nepal and South Korea through events, seminars, and education fairs.`,
    officialUrl: "https://np.mofa.go.kr/np-en/brd/m_25533/list.do",
    sourceLabel: "Embassy of the Republic of Korea in Nepal",
  }
];
