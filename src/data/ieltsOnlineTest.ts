export interface IeltsQuestion {
  id: number;
  section: "Reading & Vocabulary" | "Grammar & Structure" | "Listening Simulation" | "Speaking Mock";
  difficulty: "Band 5.5 - 6.0" | "Band 6.5 - 7.5" | "Band 8.0 - 9.0";
  passageOrPrompt?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  koreaAdmissionImpact: string;
}

export const IELTS_ONLINE_TEST_QUESTIONS: IeltsQuestion[] = [
  // SECTION 1: Reading & Vocabulary
  {
    id: 101,
    section: "Reading & Vocabulary",
    difficulty: "Band 6.5 - 7.5",
    passageOrPrompt: "South Korea's semiconductor manufacturers are investing heavily in AI chips, prompting universities like KAIST and Hanyang to augment their curricula with advanced neural computation coursework.",
    question: "In the passage above, what is the closest meaning of the word 'augment'?",
    options: [
      "To diminish or eliminate completely",
      "To supplement, expand, or increase",
      "To scrutinize with skepticism",
      "To postpone until next semester"
    ],
    correctIndex: 1,
    explanation: "'Augment' means to make greater by adding to it; to increase or expand. Universities are adding AI subjects to broaden their courses.",
    koreaAdmissionImpact: "Essential for English-track Engineering degrees at Hanyang, Inha & KAIST.",
  },
  {
    id: 102,
    section: "Reading & Vocabulary",
    difficulty: "Band 5.5 - 6.0",
    passageOrPrompt: "Students who display high linguistic proficiency often exhibit greater cognitive flexibility when adapting to foreign pedagogical environments.",
    question: "What does the term 'pedagogical' pertain to?",
    options: [
      "Financial budgeting and bank solvency",
      "Methods and practices of teaching and education",
      "Medical healthcare and quarantine checks",
      "Subway navigation and public transportation"
    ],
    correctIndex: 1,
    explanation: "'Pedagogical' relates to the theory and practice of education and how teaching is delivered in universities.",
    koreaAdmissionImpact: "Meets baseline entry for SolBridge BBA and Sejong University programs.",
  },
  {
    id: 103,
    section: "Reading & Vocabulary",
    difficulty: "Band 6.5 - 7.5",
    passageOrPrompt: "The rapid proliferation of green technology across Incheon Songdo Smart City has generated unprecedented demand for environmental policy analysts.",
    question: "Which word is an antonym (opposite) of 'proliferation'?",
    options: [
      "Escalation",
      "Reduction or curtailment",
      "Dissemination",
      "Propagation"
    ],
    correctIndex: 1,
    explanation: "'Proliferation' means rapid increase or growth. The opposite (antonym) is reduction, decrease, or curtailment.",
    koreaAdmissionImpact: "Crucial for high band scores needed for 70%-100% tuition scholarships.",
  },
  {
    id: 104,
    section: "Reading & Vocabulary",
    difficulty: "Band 8.0 - 9.0",
    passageOrPrompt: "The professor delivered a lucid exposition on quantum algorithmic cryptography, dispelling the students' erstwhile ambivalence toward theoretical physics.",
    question: "What does 'erstwhile ambivalence' mean in this context?",
    options: [
      "Their previous state of mixed or uncertain feelings",
      "Their future financial compensation",
      "Their permanent refusal to study physics",
      "Their deep hatred of technology"
    ],
    correctIndex: 0,
    explanation: "'Erstwhile' means former or previous; 'ambivalence' means having contradictory or mixed feelings about something.",
    koreaAdmissionImpact: "Exemplifies Band 8.5+ academic precision for Master's/PhD research fellowships.",
  },

  // SECTION 2: Grammar & Structure
  {
    id: 105,
    section: "Grammar & Structure",
    difficulty: "Band 5.5 - 6.0",
    question: "Choose the correct sentence for academic writing:",
    options: [
      "Neither the professor nor the students was present in the auditorium.",
      "Neither the professor nor the students were present in the auditorium.",
      "Neither the professor or the students was present in the auditorium.",
      "Neither the professor nor the students has been present in the auditorium."
    ],
    correctIndex: 1,
    explanation: "When subjects are connected by 'neither... nor', the verb agrees with the closer subject ('students' -> plural 'were').",
    koreaAdmissionImpact: "Key IELTS Task 2 Essay grammar rule.",
  },
  {
    id: 106,
    section: "Grammar & Structure",
    difficulty: "Band 6.5 - 7.5",
    question: "Identify the correct conditional sentence for formal Statement of Purpose (SOP):",
    options: [
      "Had I known about the GKS scholarship earlier, I would have applied sooner.",
      "If I knew about the GKS scholarship earlier, I will have applied sooner.",
      "Had I knew about the GKS scholarship earlier, I would apply sooner.",
      "If I had known about the GKS scholarship earlier, I would apply sooner."
    ],
    correctIndex: 0,
    explanation: "'Had I known... I would have applied' is the advanced inverted third conditional used to express past unreal hypothetical situations formally.",
    koreaAdmissionImpact: "Demonstrates high grammatical range and accuracy in Embassy SOP essays.",
  },
  {
    id: 107,
    section: "Grammar & Structure",
    difficulty: "Band 6.5 - 7.5",
    question: "Select the sentence with proper parallel structure:",
    options: [
      "Studying in Korea offers opportunities for learning Korean, discovering rich history, and to build global networks.",
      "Studying in Korea offers opportunities for learning Korean, discovering rich history, and building global networks.",
      "Studying in Korea offers opportunities to learn Korean, discovering rich history, and build global networks.",
      "Studying in Korea offers opportunities for Korean learning, discover rich history, and building global networks."
    ],
    correctIndex: 1,
    explanation: "Parallel structure requires identical grammatical forms: 'learning...', 'discovering...', and 'building...'.",
    koreaAdmissionImpact: "Boosts IELTS Writing Band 7.0+ coherence & cohesion criteria.",
  },

  // SECTION 3: Listening Simulation
  {
    id: 108,
    section: "Listening Simulation",
    difficulty: "Band 5.5 - 6.0",
    passageOrPrompt: "🎧 Audio Transcript excerpt: 'Good morning, International Admissions Office. For the Fall September Intake, the application dossier fee is 80,000 KRW, payable before June 15th at 5:00 PM Korean Standard Time. Late submissions will incur a 20,000 KRW penalty.'",
    question: "According to the admissions officer, what is the regular application fee and deadline?",
    options: [
      "80,000 KRW before June 15th, 5:00 PM KST",
      "100,000 KRW before June 30th, 5:00 PM KST",
      "20,000 KRW before July 1st, 5:00 PM KST",
      "50,000 KRW before June 15th, 12:00 PM KST"
    ],
    correctIndex: 0,
    explanation: "The transcript explicitly states 80,000 KRW before June 15th at 5:00 PM KST.",
    koreaAdmissionImpact: "IELTS Listening Section 1 factual retrieval practice.",
  },
  {
    id: 109,
    section: "Listening Simulation",
    difficulty: "Band 6.5 - 7.5",
    passageOrPrompt: "🎧 Audio Transcript excerpt: 'While the university provides complimentary medical insurance for initial exchange scholars, degree-seeking undergraduate students must independently enroll in the National Health Insurance Service (NHIS) starting on their alien registration issuance date.'",
    question: "Who is required to independently register for South Korea's NHIS?",
    options: [
      "Only exchange students on one-semester visits",
      "Degree-seeking undergraduate students starting on their ARC issuance date",
      "University professors and laboratory assistants only",
      "Tourists visiting Seoul during vacation"
    ],
    correctIndex: 1,
    explanation: "The speaker clarifies that degree-seeking undergraduates must enroll in NHIS independently upon obtaining their Alien Registration Card (ARC).",
    koreaAdmissionImpact: "Vital listening synthesis for living in Korea and ARC processing.",
  },

  // SECTION 4: Speaking Mock
  {
    id: 110,
    section: "Speaking Mock",
    difficulty: "Band 6.5 - 7.5",
    passageOrPrompt: "🎤 IELTS Speaking Part 2 Cue Card: 'Describe a reason why you decided to pursue higher education in South Korea instead of other traditional destinations. You should say: Which field of study you chose, What unique advantages Korea offers, and How this aligns with your long-term career.'",
    question: "Which of the following response structures demonstrates the highest IELTS Speaking Band (7.5+)?",
    options: [
      "I chose Korea because I like K-pop music and delicious food, and it is very nice.",
      "First, I highlight Korea's world-leading tech infrastructure in AI, contextualize my undergraduate STEM goals, elaborate on generous tuition merit scholarships, and articulate my pathway toward E-7 tech employment.",
      "I do not know, my parents told me to go abroad so I applied to Korea randomly.",
      "Korea is very cold in winter and hot in summer, and that is my reason."
    ],
    correctIndex: 1,
    explanation: "Band 7.5+ response utilizes signposting ('First, I highlight...'), academic vocabulary ('contextualize', 'infrastructure', 'merit scholarships'), and clear logical coherence.",
    koreaAdmissionImpact: "Prepares candidates for Embassy Consular interviews at Tahachal Kathmandu.",
  }
];

export interface IeltsBandScore {
  score: number;
  total: number;
  estimatedBand: string;
  cefrLevel: string;
  koreaScholarshipMatch: string;
  recommendation: string;
}

export function calculateIeltsBand(score: number, total: number): IeltsBandScore {
  const percentage = (score / total) * 100;

  if (percentage >= 90) {
    return {
      score,
      total,
      estimatedBand: "Band 8.0 – 9.0 (Expert / Very Good User)",
      cefrLevel: "C2 (Mastery)",
      koreaScholarshipMatch: "Eligible for 70% – 100% Tuition Waiver at SKY & Top Seoul Universities (Yonsei, Korea Univ, Hanyang, CAU)",
      recommendation: "Outstanding command of English! You meet the highest criteria for GKS Government Scholarships, English-medium STEM/Business degrees, and direct research assistantships.",
    };
  } else if (percentage >= 70) {
    return {
      score,
      total,
      estimatedBand: "Band 6.5 – 7.5 (Competent / Good User)",
      cefrLevel: "B2 / C1 (Advanced)",
      koreaScholarshipMatch: "Eligible for 50% – 80% Entrance Scholarships at Inha, Sejong, SolBridge, PNU, KNU",
      recommendation: "Strong academic proficiency. You easily exceed the minimum entry threshold (IELTS 5.5 - 6.0) required by 95% of English-taught programs in South Korea.",
    };
  } else if (percentage >= 50) {
    return {
      score,
      total,
      estimatedBand: "Band 5.5 – 6.0 (Modest / Competent User)",
      cefrLevel: "B2 (Vantage)",
      koreaScholarshipMatch: "Eligible for Direct Bachelor/Master Admission + 30% - 50% Tuition Waiver",
      recommendation: "Solid foundation! This band fulfills standard admission requirements for universities like SolBridge, Inha, and Keimyung. A 2-week polish at GBS can push you to Band 7.0 for higher scholarships.",
    };
  } else {
    return {
      score,
      total,
      estimatedBand: "Band 4.5 – 5.0 (Limited User)",
      cefrLevel: "B1 (Threshold)",
      koreaScholarshipMatch: "Recommended: D-4 Korean Language Pathway (Without IELTS) or Intensive IELTS Booster Class at GBS",
      recommendation: "You can apply for D-4 Language Program without IELTS (just like Anjana Tamang!), or join our GBS smart classroom IELTS training at Sallyan House Bagbazar to elevate your band score.",
    };
  }
}
