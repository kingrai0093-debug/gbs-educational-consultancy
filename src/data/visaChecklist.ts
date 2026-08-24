import { VisaStep, DocumentItem } from "../types";

export const VISA_STEPS: VisaStep[] = [
  {
    stepNumber: 1,
    title: "Profile Assessment & University Shortlisting",
    duration: "1 - 3 Days",
    location: "GBS Educational Consultancy (Bagbazar Sallyan House)",
    description: "Our certified counselor analyzes your academic transcripts, English/Korean test scores, gap years, and financial preferences to select 3-5 top matched universities with maximum scholarship eligibility.",
    keyPoints: [
      "Evaluation of +2 / Bachelor transcripts & GPA eligibility",
      "Analysis of 100% English taught vs Korean track options",
      "Tailored scholarship strategy (30% to 100% tuition waiver)",
      "Zero registration charge for initial comprehensive counseling"
    ],
    nepaliContext: "Conveniently located at Sallyan House in Bagbazar, heart of Kathmandu's educational zone."
  },
  {
    stepNumber: 2,
    title: "Document Notarization, MoFA & Apostille Attestation",
    duration: "1 - 2 Weeks",
    location: "Kathmandu Notary, Ministry of Foreign Affairs (MoFA) & Department of Consular Services",
    description: "South Korea requires all Nepalese academic documents (Mark sheets, Transcripts, Character Certificates) and Relationship Certificates to be authenticated via official Nepal Government departments and Apostille verification.",
    keyPoints: [
      "NEB / TU / PU / KU transcript verification",
      "MoFA (Ministry of Foreign Affairs, Tripureshwor) verification stamp",
      "Relationship Certificate (Nata Praman Patra) from Ward Office with English translation",
      "GBS documentation experts manage hassle-free appointments and verification checks"
    ],
    nepaliContext: "Full assistance provided with local ward documents and government attestation in Kathmandu."
  },
  {
    stepNumber: 3,
    title: "SOP Drafting, Application & University Interview",
    duration: "2 - 4 Weeks",
    location: "Online University Portals & GBS Mock Interview Room",
    description: "We craft a compelling Statement of Purpose (SOP) and Study Plan highlighting your academic drive, followed by 1-on-1 mock interviews to ace your Korean university admission panel.",
    keyPoints: [
      "Personalized Statement of Purpose (SOP) & Study Plan development",
      "Letter of Recommendation (LOR) guidance from previous teachers/professors",
      "Live mock interview training with Korean interview questions",
      "Direct submission to university admissions office in South Korea"
    ],
    nepaliContext: "Benefit from our AI-enhanced SOP review tool and senior counselor revisions."
  },
  {
    stepNumber: 4,
    title: "Offer Letter, Tuition Payment & Certificate of Admission (CoA)",
    duration: "1 - 2 Weeks",
    location: "Bank in Nepal (NOC processed at Sanothimi / Online MOEST)",
    description: "Upon receiving your conditional offer letter and scholarship award, tuition is securely transferred via SWIFT through a commercial bank in Nepal with your No Objection Certificate (NOC). The university then issues the official Certificate of Admission (표준입학허가서 - CoA).",
    keyPoints: [
      "Issuance of official Korean University Acceptance & Scholarship Award Letter",
      "Guidance with MOEST No Objection Certificate (NOC)",
      "Safe wire transfer (SWIFT) of subsidized semester fee",
      "Receipt of official Certificate of Admission (CoA) and Business Registration Certificate"
    ],
    nepaliContext: "Assistance with NOC from Ministry of Education, Science and Technology (MOEST) Nepal."
  },
  {
    stepNumber: 5,
    title: "Korean Embassy Visa Lodgement & Biometrics",
    duration: "1 - 3 Weeks",
    location: "Embassy of the Republic of Korea (Tahachal, Kathmandu)",
    description: "Submission of the complete D-2 or D-4 visa dossier to the Korean Embassy at Tahachal. GBS prepares all embassy application forms, TB medical clearance from accredited hospitals, and financial solvency files.",
    keyPoints: [
      "Bank balance certificate (usually equivalent to USD $10,000 - $20,000 in A-Class commercial bank in Nepal)",
      "Property valuation & tax clearance (if applicable for family sponsorship)",
      "Tuberculosis (TB) test from designated hospital (e.g., Patan Hospital / CIWEC / Sukraraj)",
      "Full Embassy mock interview preparation"
    ],
    nepaliContext: "Accurate file preparation compliant with the latest Embassy of Korea in Tahachal directives."
  },
  {
    stepNumber: 6,
    title: "Visa Grant, Pre-Departure Briefing & Korea Arrival",
    duration: "1 Week Before Flight",
    location: "Tribhuvan International Airport (KTM) ✈️ Incheon International Airport (ICN)",
    description: "Celebration! Receive your Korean Student Visa (D-2 / D-4). Attend GBS pre-departure orientation covering Korean culture, SIM card setup, T-money metro cards, dormitory check-in, Alien Registration Card (ARC), and student part-time work rights.",
    keyPoints: [
      "Flight ticket booking & baggage guidance",
      "Korean SIM card & banking setup orientation in Seoul/Busan/Daegu",
      "Introduction to active Nepali Student Association in South Korea (SONSIK)",
      "Part-time job search tips (Albamon, AlbacheonGuk, campus jobs)"
    ],
    nepaliContext: "Ongoing support from our alumni network studying and working across South Korea."
  }
];

export const VISA_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    category: "Academic & Language",
    title: "Academic Transcripts & Character Certificates (+2 / Bachelor / Master)",
    description: "Original certificates and Mark Sheets authenticated with MoFA / Apostille.",
    nepaliRequirement: "Original NEB / TU transcript + MoFA stamp + English translated if required.",
    mandatory: true
  },
  {
    id: "doc-2",
    category: "Academic & Language",
    title: "English / Korean Language Score (IELTS / PTE / TOPIK)",
    description: "Official score card. IELTS 5.5+ or TOPIK Level 3+ unlocks 50-100% scholarships.",
    nepaliRequirement: "Official TRF / scorecard from British Council, IDP, Pearson or TOPIK board.",
    mandatory: true
  },
  {
    id: "doc-3",
    category: "Identity & Civil",
    title: "Valid Nepali Passport",
    description: "MRP / e-Passport with minimum 12 months remaining validity.",
    nepaliRequirement: "Clear color scan of biodata pages and previous visa stamps (if any).",
    mandatory: true
  },
  {
    id: "doc-4",
    category: "Identity & Civil",
    title: "Relationship Certificate (Nata Praman Patra)",
    description: "Official certificate proving relationship with parents / financial sponsors.",
    nepaliRequirement: "Issued by Local Ward Office in Nepal, officially translated into English with Ward stamp.",
    mandatory: true
  },
  {
    id: "doc-5",
    category: "Identity & Civil",
    title: "Citizenship Certificates (Nagarikta)",
    description: "Citizenship certificates of the applicant and both parents.",
    nepaliRequirement: "Official English translation by a certified Notary Public in Kathmandu.",
    mandatory: true
  },
  {
    id: "doc-6",
    category: "Financial & Sponsorship",
    title: "Bank Balance Certificate & Statement",
    description: "Bank balance from an 'A' class commercial bank in Nepal maintained for the required duration.",
    nepaliRequirement: "Equivalent to USD $10,000 for Provincial universities or USD $20,000 for Seoul universities.",
    mandatory: true
  },
  {
    id: "doc-7",
    category: "Financial & Sponsorship",
    title: "Annual Income Verification & Tax Clearance",
    description: "Sponsor's annual income certificate from employment, business, agriculture, house rent, or foreign employment.",
    nepaliRequirement: "Issued by Local Municipality / Ward / Employer with PAN and verified tax receipts.",
    mandatory: true
  },
  {
    id: "doc-8",
    category: "Embassy & University",
    title: "Certificate of Admission (표준입학허가서 - CoA)",
    description: "Issued by the Korean University after tuition payment confirmation.",
    nepaliRequirement: "Official document provided directly by your selected Korean university through GBS.",
    mandatory: true
  },
  {
    id: "doc-9",
    category: "Embassy & University",
    title: "Tuberculosis (TB) Screening Certificate",
    description: "Chest X-ray and medical certificate from designated hospital in Kathmandu.",
    nepaliRequirement: "Must be done only at Embassy approved hospitals (e.g. Patan Hospital / CIWEC / Sukraraj).",
    mandatory: true
  },
  {
    id: "doc-10",
    category: "Academic & Language",
    title: "Statement of Purpose (SOP) & Study Plan",
    description: "Detailed essay demonstrating academic intent, motivation, and career roadmap.",
    nepaliRequirement: "GBS team provides drafting assistance, AI review, and expert counselor polish.",
    mandatory: true
  }
];
