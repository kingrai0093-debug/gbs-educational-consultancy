export interface TopikScheduleItem {
  round: string;
  registrationPeriod: string;
  testDate: string;
  resultDate: string;
  testTypes: string;
  locations: string;
  status: "Upcoming" | "Registration Open" | "Completed";
}

export const TOPIK_OFFICIAL_URL = "https://www.topik.go.kr/HMENU0/HMENU00016.do";

export const TOPIK_2026_SCHEDULE: TopikScheduleItem[] = [
  {
    round: "98th TOPIK (Spring Intake Alignment)",
    registrationPeriod: "Jan 12 – Jan 20, 2026",
    testDate: "April 12, 2026",
    resultDate: "May 21, 2026",
    testTypes: "TOPIK I (Levels 1-2) & TOPIK II (Levels 3-6)",
    locations: "Nepal (Kathmandu Test Centers) & Global (Korea)",
    status: "Upcoming",
  },
  {
    round: "99th TOPIK (Mid-Year Summer Exam)",
    registrationPeriod: "March 20 – March 28, 2026",
    testDate: "July 12, 2026",
    resultDate: "August 20, 2026",
    testTypes: "TOPIK I & TOPIK II (PBT)",
    locations: "South Korea (Nationwide Centers)",
    status: "Upcoming",
  },
  {
    round: "100th TOPIK (Centennial Milestone - Fall Intake)",
    registrationPeriod: "July 06 – July 15, 2026",
    testDate: "October 18, 2026",
    resultDate: "November 26, 2026",
    testTypes: "TOPIK I & TOPIK II (Global & Nepal)",
    locations: "Nepal (Kathmandu / Lalitpur) & 86 Countries",
    status: "Registration Open",
  },
  {
    round: "101st TOPIK (Winter December Session)",
    registrationPeriod: "Sept 15 – Sept 24, 2026",
    testDate: "November 15, 2026",
    resultDate: "December 24, 2026",
    testTypes: "TOPIK I & TOPIK II (PBT + IBT Trials)",
    locations: "South Korea & Select Overseas Venues",
    status: "Upcoming",
  },
];

export interface TopikLevelInfo {
  tier: string;
  level: string;
  pointsRequired: string;
  listening: string;
  reading: string;
  writing: string;
  scholarshipImpact: string;
  visaImpact: string;
}

export const TOPIK_LEVEL_STANDARDS: TopikLevelInfo[] = [
  {
    tier: "TOPIK I (Beginner)",
    level: "Level 1",
    pointsRequired: "80+ / 200 pts",
    listening: "30 Questions (100 pts)",
    reading: "40 Questions (100 pts)",
    writing: "No Writing Section",
    scholarshipImpact: "Basic admission eligibility for D-4 language training",
    visaImpact: "Embassy Tahachal interview waiver advantage",
  },
  {
    tier: "TOPIK I (Beginner)",
    level: "Level 2",
    pointsRequired: "140+ / 200 pts",
    listening: "30 Questions (100 pts)",
    reading: "40 Questions (100 pts)",
    writing: "No Writing Section",
    scholarshipImpact: "20% - 30% initial tuition reduction at regional universities",
    visaImpact: "99% visa approval rate for D-4 language & D-2 vocational track",
  },
  {
    tier: "TOPIK II (Intermediate)",
    level: "Level 3",
    pointsRequired: "120+ / 300 pts",
    listening: "50 Questions (100 pts)",
    reading: "50 Questions (100 pts)",
    writing: "4 Questions (100 pts - Essay)",
    scholarshipImpact: "30% - 50% automatic tuition waiver for Bachelor's degrees",
    visaImpact: "Direct D-2 Bachelor admission with part-time work rights (25 hrs/wk)",
  },
  {
    tier: "TOPIK II (Intermediate)",
    level: "Level 4",
    pointsRequired: "150+ / 300 pts",
    listening: "50 Questions (100 pts)",
    reading: "50 Questions (100 pts)",
    writing: "4 Questions (100 pts - Essay)",
    scholarshipImpact: "50% - 80% tuition scholarship at Top Seoul Universities",
    visaImpact: "Fast-track graduation & E-7 work visa conversion points",
  },
  {
    tier: "TOPIK II (Advanced)",
    level: "Level 5",
    pointsRequired: "190+ / 300 pts",
    listening: "50 Questions (100 pts)",
    reading: "50 Questions (100 pts)",
    writing: "4 Questions (100 pts - Essay)",
    scholarshipImpact: "70% - 100% full tuition scholarship + monthly living stipend",
    visaImpact: "Preferred hiring by Samsung, LG, Hyundai conglomerates in Korea",
  },
  {
    tier: "TOPIK II (Advanced)",
    level: "Level 6",
    pointsRequired: "230+ / 300 pts",
    listening: "50 Questions (100 pts)",
    reading: "50 Questions (100 pts)",
    writing: "4 Questions (100 pts - Essay)",
    scholarshipImpact: "100% Full Ride + GKS Presidential Honor Fellowship",
    visaImpact: "Instant F-2-7 Resident Visa points eligibility",
  },
];
