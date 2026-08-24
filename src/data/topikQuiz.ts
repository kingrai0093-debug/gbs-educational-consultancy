import { TopikQuestion } from "../types";

export const TOPIK_QUIZ_QUESTIONS: TopikQuestion[] = [
  // Category: Basics & Greetings
  {
    id: 1,
    level: "Hangul Basics",
    category: "Basics & Greetings",
    question: "What does the most common Korean greeting mean and sound like?",
    koreanText: "안녕하세요 (Annyeonghaseyo)",
    options: [
      "Goodbye (to someone leaving)",
      "Hello / Good day (Formal polite)",
      "Thank you very much",
      "I am a student"
    ],
    correctIndex: 1,
    explanation: "'안녕하세요 (Annyeonghaseyo)' is the standard polite greeting in Korean used when meeting someone or entering a classroom/office.",
    nepaliHint: "नमस्ते / शुभ दिन (औपचारिक शिष्टाचार)"
  },
  {
    id: 2,
    level: "Hangul Basics",
    category: "Basics & Greetings",
    question: "Which of the following means 'Thank You' in polite Korean?",
    koreanText: "감사합니다 (Gamsahamnida)",
    options: [
      "죄송합니다 (Joesonghamnida)",
      "괜찮아요 (Gwaenchanh-ayo)",
      "감사합니다 (Gamsahamnida)",
      "반갑습니다 (Banggapseumnida)"
    ],
    correctIndex: 2,
    explanation: "'감사합니다 (Gamsahamnida)' and '고맙습니다 (Gomapseumnida)' are the formal respectful expressions for 'Thank you' in Korean.",
    nepaliHint: "धन्यवाद (औपचारिक)"
  },
  {
    id: 3,
    level: "Hangul Basics",
    category: "Basics & Greetings",
    question: "When you are leaving an office and the other person is staying, what do you say?",
    koreanText: "안녕히 계세요 (Annyeonghi gyeseyo)",
    options: [
      "안녕히 가세요 (Annyeonghi gaseyo - Go peacefully)",
      "안녕히 계세요 (Annyeonghi gyeseyo - Stay peacefully)",
      "다시 만나요 (Dasi mannayo - See you again)",
      "수고하세요 (Sugohaseyo - Keep up good work)"
    ],
    correctIndex: 1,
    explanation: "If you leave and the host/counselor stays inside, say '안녕히 계세요' (Stay in peace). If the other person leaves, say '안녕히 가세요' (Go in peace).",
    nepaliHint: "बिदा हुँदा बस्ने मान्छेलाई भनिने 'राम्रोसँग बस्नुहोला'"
  },
  {
    id: 4,
    level: "Hangul Basics",
    category: "Basics & Greetings",
    question: "What does '반갑습니다' (Ban-gap-seum-ni-da) express?",
    koreanText: "만나서 반갑습니다 (Mannaseo banggapseumnida)",
    options: [
      "Excuse me, where is the toilet?",
      "Nice to meet you / Glad to meet you",
      "I am hungry right now",
      "I do not understand Korean"
    ],
    correctIndex: 1,
    explanation: "'만나서 반갑습니다' means 'Pleased / Nice to meet you'. Essential for introducing yourself to professors and peers.",
    nepaliHint: "भेटेर धेरै खुसी लाग्यो"
  },
  {
    id: 5,
    level: "Hangul Basics",
    category: "Basics & Greetings",
    question: "What is the polite way to say 'I am sorry' in Korean?",
    koreanText: "죄송합니다 (Joesonghamnida)",
    options: [
      "괜찮습니다 (Gwaenchansseumnida)",
      "축하합니다 (Chukhahamnida)",
      "죄송합니다 (Joesonghamnida)",
      "실례합니다 (Sillyehamnida)"
    ],
    correctIndex: 2,
    explanation: "'죄송합니다 (Joesonghamnida)' is the formal apology, while '미안합니다 (Mianhamnida)' is also common among peers.",
    nepaliHint: "माफ गर्नुहोस् (Sorry / Apology)"
  },

  // Category: University & Campus
  {
    id: 6,
    level: "Campus Life & Study",
    category: "University & Campus",
    question: "What is the Korean word for 'University / College'?",
    koreanText: "대학교 (Daehakgyo)",
    options: [
      "고등학교 (Godeunghakgyo - High School)",
      "대학교 (Daehakgyo - University)",
      "도서관 (Doseogwan - Library)",
      "병원 (Byeong-won - Hospital)"
    ],
    correctIndex: 1,
    explanation: "'대학교 (Daehakgyo)' literally means 'Big school', which translates to University or Higher Education Institution in Korean.",
    nepaliHint: "विश्वविद्यालय (University)"
  },
  {
    id: 7,
    level: "Campus Life & Study",
    category: "University & Campus",
    question: "Where do international students live on campus in Korean?",
    koreanText: "기숙사 (Gi-suk-sa)",
    options: [
      "기숙사 (Gisuksa - University Dormitory)",
      "원룸 (One-room Studio)",
      "고시원 (Gosiwon Mini-room)",
      "하숙집 (Hasukjib Boarding House)"
    ],
    correctIndex: 0,
    explanation: "'기숙사 (Gisuksa)' is the on-campus dormitory provided by South Korean universities for local and international students.",
    nepaliHint: "होस्टेल / विश्वविद्यालयको छात्रवास"
  },
  {
    id: 8,
    level: "Campus Life & Study",
    category: "University & Campus",
    question: "How do you respectfully address your University Professor in Korean?",
    koreanText: "교수님 (Gyo-su-nim)",
    options: [
      "선생님 (Seonsaengnim - Teacher/Instructor)",
      "교수님 (Gyosunim - Professor [Honorific])",
      "선배님 (Seonbaenim - Senior Student)",
      "원장님 (Wonjangnim - Director)"
    ],
    correctIndex: 1,
    explanation: "'교수 (Gyosu)' means professor, and appending the respectful honorific '-님 (nim)' makes '교수님 (Gyosunim)', the standard title.",
    nepaliHint: "विश्वविद्यालयका प्रोफेसर (आदरपूर्वक)"
  },
  {
    id: 9,
    level: "TOPIK Level 2",
    category: "University & Campus",
    question: "What does the financial term '장학금' (Janghakgeum) mean for international students?",
    koreanText: "장학금 (Jang-hak-geum)",
    options: [
      "Tuition fee penalty bill",
      "Dormitory deposit key fee",
      "Scholarship / Academic financial award",
      "Health insurance premium"
    ],
    correctIndex: 2,
    explanation: "'장학금 (Janghakgeum)' is the Korean term for Scholarship! South Korean universities offer 30% to 100% tuition scholarships.",
    nepaliHint: "छात्रवृत्ति (Scholarship)"
  },
  {
    id: 10,
    level: "Campus Life & Study",
    category: "University & Campus",
    question: "What does '수강신청' (Sugang sincheong) mean at the start of a semester?",
    koreanText: "수강신청 (Su-gang sin-cheong)",
    options: [
      "Paying dormitory utility bills",
      "Course / Subject Registration",
      "Graduation cap measurement",
      "Applying for a university ID card"
    ],
    correctIndex: 1,
    explanation: "'수강신청 (Course Registration)' is the online process where university students select and enroll in subjects for the upcoming term.",
    nepaliHint: "विषय / कोर्स दर्ता प्रक्रिया"
  },
  {
    id: 11,
    level: "Campus Life & Study",
    category: "University & Campus",
    question: "What is your physical 'Student ID Card' called in South Korea?",
    koreanText: "학생증 (Hak-saeng-jeung)",
    options: [
      "주민등록증 (Resident Card)",
      "학생증 (Student Identity Card)",
      "운전면허증 (Driver's License)",
      "외국인등록증 (Alien Card)"
    ],
    correctIndex: 1,
    explanation: "'학생증 (Haksaengjeung)' is your university student card, used for library access, campus discounts, and bus passes.",
    nepaliHint: "विद्यार्थी परिचय पत्र (Student ID)"
  },
  {
    id: 12,
    level: "Campus Life & Study",
    category: "University & Campus",
    question: "What does '방학' (Bang-hak) mean for students in Korea?",
    koreanText: "여름방학 / 겨울방학 (Bang-hak)",
    options: [
      "Midterm examination week",
      "Tuition deadline date",
      "School Vacation / Semester Break",
      "New student orientation ceremony"
    ],
    correctIndex: 2,
    explanation: "'방학 (Banghak)' means school vacation. Summer break (여름방학) and Winter break (겨울방학) allow students to work full-time legally!",
    nepaliHint: "सेमेस्टर बिदा (School/College Vacation)"
  },

  // Category: Visa & Embassy
  {
    id: 13,
    level: "Visa & Embassy Prep",
    category: "Visa & Embassy",
    question: "What is the crucial 'Certificate of Admission' required for South Korea D-2 Visa called?",
    koreanText: "표준입학허가서 (Pyo-jun Iphak Heogaseo)",
    options: [
      "졸업증명서 (Graduation Certificate)",
      "표준입학허가서 (Standard Certificate of Admission - CoA)",
      "성적증명서 (Academic Transcript)",
      "가족관계증명서 (Family Relation Certificate)"
    ],
    correctIndex: 1,
    explanation: "'표준입학허가서 (Certificate of Admission - CoA)' is issued by accredited Korean universities once tuition is paid, needed for Embassy visa filing.",
    nepaliHint: "भर्ना स्वीकृति प्रमाणपत्र (CoA)"
  },
  {
    id: 14,
    level: "Visa & Embassy Prep",
    category: "Visa & Embassy",
    question: "What is the Korean ID card that all international students must obtain upon landing in Korea?",
    koreanText: "외국인등록증 (Oegugin Deungnokjeung / ARC)",
    options: [
      "국민건강보험증 (Health Insurance Card)",
      "외국인등록증 (Alien / Foreigner Registration Card - ARC)",
      "체류자격증 (Residency Certificate)",
      "통장 (Bank Passbook)"
    ],
    correctIndex: 1,
    explanation: "'외국인등록증 (ARC - Alien Registration Card)' is issued by Korea Immigration Service within 90 days of arrival for stay longer than 90 days.",
    nepaliHint: "विदेशी परिचय पत्र (ARC Card)"
  },
  {
    id: 15,
    level: "Visa & Embassy Prep",
    category: "Visa & Embassy",
    question: "What is the Korean word for 'Embassy' (e.g. Embassy of the Republic of Korea in Tahachal, Kathmandu)?",
    koreanText: "대사관 (Dae-sa-gwan)",
    options: [
      "출입국관리사무소 (Immigration Office)",
      "대사관 (Embassy)",
      "구청 (District Office)",
      "경찰서 (Police Station)"
    ],
    correctIndex: 1,
    explanation: "'주네팔 대한민국 대사관' is the Embassy of the Republic of Korea in Nepal (Tahachal, Kathmandu).",
    nepaliHint: "दूतावास (Embassy)"
  },
  {
    id: 16,
    level: "Visa & Embassy Prep",
    category: "Visa & Embassy",
    question: "What is the Korean term for 'Study Abroad'?",
    koreanText: "유학 (Yu-hak) / 유학생 (Yu-hak-saeng)",
    options: [
      "여행 (Yeohaeng - Travel / Tourism)",
      "유학 (Yuhak - Studying Abroad)",
      "취업 (Chwieop - Employment / Job)",
      "이민 (Imin - Immigration)"
    ],
    correctIndex: 1,
    explanation: "'유학 (Yuhak)' means studying abroad, and international students are called '유학생 (Yuhaksaeng)'.",
    nepaliHint: "विदेशमा अध्ययन (Study Abroad)"
  },
  {
    id: 17,
    level: "Visa & Embassy Prep",
    category: "Visa & Embassy",
    question: "What is the Korean term for 'Bank Balance Certificate' needed for financial verification?",
    koreanText: "잔액증명서 / 잔고증명서 (Janaek Jeungmyeongseo)",
    options: [
      "소득금액증명원 (Income Tax Proof)",
      "잔액증명서 (Bank Balance Certificate)",
      "부동산등기부등본 (Land Registry Document)",
      "재정보증서 (Financial Affidavit)"
    ],
    correctIndex: 1,
    explanation: "'잔액증명서 (Bank Balance Certificate)' verifies the required funds ($10,000–$20,000 USD equivalent) for Korean student visa approval.",
    nepaliHint: "बैंक ब्यालेन्स प्रमाणपत्र"
  },

  // Category: Part-time & Daily Life
  {
    id: 18,
    level: "Everyday Korean & Work",
    category: "Part-time & Daily Life",
    question: "What is the colloquial Korean term for 'Part-Time Job' that students do?",
    koreanText: "알바 / 아르바이트 (Arbeit / Alba)",
    options: [
      "정규직 (Jeonggyujik - Full-time Permanent Job)",
      "알바 / 아르바이트 (Alba - Part-time Job)",
      "인턴십 (Internship)",
      "야근 (Yageun - Night Overtime)"
    ],
    correctIndex: 1,
    explanation: "Derived from the German word 'Arbeit', '알바 (Alba)' refers to part-time work that international students can legally do with immigration permission.",
    nepaliHint: "पार्ट-टाइम काम (Part-time job)"
  },
  {
    id: 19,
    level: "Everyday Korean & Work",
    category: "Part-time & Daily Life",
    question: "What is the Korean term for 'Hourly Wage' (e.g. 10,030+ KRW/hour)?",
    koreanText: "시급 (Si-geup)",
    options: [
      "월급 (Wolgeup - Monthly Salary)",
      "시급 (Sigeup - Hourly Wage)",
      "연봉 (Yeonbong - Annual Salary)",
      "보너스 (Bonus)"
    ],
    correctIndex: 1,
    explanation: "'시급 (Sigeup)' means hourly wage. South Korea's minimum hourly wage is ~10,030 KRW (approx NPR 1,000/hr).",
    nepaliHint: "प्रति घण्टा ज्याला (Hourly Wage)"
  },
  {
    id: 20,
    level: "Everyday Korean & Work",
    category: "Part-time & Daily Life",
    question: "What is the 24/7 store found on every street in Korea (CU, GS25, 7-Eleven)?",
    koreanText: "편의점 (Pyeon-ui-jeom)",
    options: [
      "백화점 (Baekhwajeom - Department Store)",
      "편의점 (Pyeonuijeom - Convenience Store)",
      "서점 (Seojeom - Bookstore)",
      "문구점 (Mungujeom - Stationery Store)"
    ],
    correctIndex: 1,
    explanation: "'편의점 (Pyeonuijeom)' is a 24-hour convenience store offering snacks, T-Money recharges, parcel services, and hot meals.",
    nepaliHint: "चौबीसै घण्टा खुल्ने पसल (Convenience Store)"
  },
  {
    id: 21,
    level: "Everyday Korean & Work",
    category: "Part-time & Daily Life",
    question: "How do you ask 'How much is this?' when shopping in Seoul or Busan?",
    koreanText: "이거 얼마예요? (Igeo eolmayeyo?)",
    options: [
      "이거 어디에 있어요? (Where is this?)",
      "이거 얼마예요? (How much is this?)",
      "이거 맛있어요? (Is this delicious?)",
      "이거 언제 끝나요? (When does this end?)"
    ],
    correctIndex: 1,
    explanation: "'이거 (Igeo - this) + 얼마예요? (Eolmayeyo - how much is it?)' is the quintessential shopping phrase.",
    nepaliHint: "यसको कति रुपैयाँ / कति पर्छ?"
  },
  {
    id: 22,
    level: "Everyday Korean & Work",
    category: "Part-time & Daily Life",
    question: "What is the Korean public transit card used for subway and buses called?",
    koreanText: "교통카드 / 티머니 (T-Money Card)",
    options: [
      "신용카드 (Credit Card)",
      "교통카드 (Transit Card / T-Money)",
      "멤버십카드 (Membership Card)",
      "체크카드 (Debit Card)"
    ],
    correctIndex: 1,
    explanation: "'교통카드 (Gyotong Card)' like T-Money allows seamless transfers between subway trains, city buses, and taxis across Korea.",
    nepaliHint: "यातायात कार्ड (Subway & Bus Card)"
  },
  {
    id: 23,
    level: "Everyday Korean & Work",
    category: "Part-time & Daily Life",
    question: "What is the Korean word for 'Pharmacy' when you need medicine?",
    koreanText: "약국 (Yak-guk)",
    options: [
      "병원 (Byeong-won - Hospital)",
      "약국 (Yakguk - Pharmacy)",
      "치과 (Chigwa - Dental Clinic)",
      "안과 (Angwa - Eye Clinic)"
    ],
    correctIndex: 1,
    explanation: "'약 (Yak - medicine) + 국 (Guk - dispensary)' = '약국 (Yakguk)'. Pharmacists in Korea provide quick assistance with symptoms.",
    nepaliHint: "औषधि पसल (Pharmacy)"
  },

  // Category: TOPIK Grammar & Sentences
  {
    id: 24,
    level: "TOPIK Level 1",
    category: "TOPIK Grammar",
    question: "If a student says: '저는 네팔 학생입니다' (Jeoneun Nepal haksaeng-imnida), what does it mean?",
    koreanText: "저는 네팔 학생입니다.",
    options: [
      "I want to travel to Nepal.",
      "I am a Nepali student.",
      "My teacher is from Nepal.",
      "I am studying in Kathmandu."
    ],
    correctIndex: 1,
    explanation: "'저 (Jeo)' = I, '는 (neun)' = topic particle, '네팔 (Nepal)' = Nepal, '학생 (Haksaeng)' = Student, '입니다 (Imnida)' = am/is. It means 'I am a Nepali student'.",
    nepaliHint: "म नेपाली विद्यार्थी हुँ।"
  },
  {
    id: 25,
    level: "TOPIK Level 1",
    category: "TOPIK Grammar",
    question: "Which particle is used to indicate the location of an action (e.g. 'Studying at the library')?",
    koreanText: "도서관[ ? ] 한국어를 공부해요.",
    options: [
      "에서 (-eseo - at / in [action])",
      "에 (-e - to / at [static])",
      "을 (-eul - object particle)",
      "은 (-eun - topic particle)"
    ],
    correctIndex: 0,
    explanation: "'-에서 (-eseo)' marks the location where dynamic action happens: '도서관에서 공부해요' (I study at the library).",
    nepaliHint: "काम हुने ठाउँ जनाउने प्रत्यय (-मा)"
  },
  {
    id: 26,
    level: "TOPIK Level 1",
    category: "TOPIK Grammar",
    question: "How do you express 'I want to study in Korea' using '-고 싶어요'?",
    koreanText: "한국에서 공부하고 싶어요 (Hangug-eseo gongbuhago sipeoyo)",
    options: [
      "한국에서 공부했어요 (I studied in Korea)",
      "한국에서 공부하고 싶어요 (I want to study in Korea)",
      "한국에서 공부할 수 없어요 (I cannot study in Korea)",
      "한국에서 공부해야 해요 (I must study in Korea)"
    ],
    correctIndex: 1,
    explanation: "Verb stem + '-고 싶다 (-go sipda)' expresses the speaker's wish or desire ('want to do'). Essential for Embassy statements!",
    nepaliHint: "म कोरियामा अध्ययन गर्न चाहन्छु"
  },
  {
    id: 27,
    level: "TOPIK Level 2",
    category: "TOPIK Grammar",
    question: "What does '한국에 가 본 적이 있어요' mean?",
    koreanText: "한국에 가 본 적이 있어요 (Hangug-e ga bon jeog-i isseoyo)",
    options: [
      "I have never been to Korea.",
      "I have the experience of visiting Korea.",
      "I am currently living in Korea.",
      "I will go to Korea next week."
    ],
    correctIndex: 1,
    explanation: "'-아/어 본 적이 있다' expresses past experience ('have done something before').",
    nepaliHint: "म पहिला कोरिया गइसकेको अनुभव छ"
  },
  {
    id: 28,
    level: "TOPIK Level 2",
    category: "TOPIK Grammar",
    question: "What does the formal closing suffix '-ㅂ니다 / -습니다' indicate in Korean speech?",
    koreanText: "공부합니다 / 먹습니다",
    options: [
      "Informal casual slang used with friends",
      "Formal high-polite statement (used in interviews and presentations)",
      "Past tense negative expression",
      "Future conditional guessing"
    ],
    correctIndex: 1,
    explanation: "'-ㅂ니다 / -습니다' is the formal-polite ending (합쇼체) used in official interviews, embassy appointments, and academic presentations.",
    nepaliHint: "अत्यन्त शिष्ट र औपचारिक भाषा (उच्च आदर)"
  },
  {
    id: 29,
    level: "TOPIK Level 2",
    category: "TOPIK Grammar",
    question: "How do you say 'Because I received a scholarship, I am happy' in Korean?",
    koreanText: "장학금을 받아서 기뻐요 (Janghakgeum-eul badaseo gippeoyo)",
    options: [
      "장학금을 받아서 기뻐요 (Because I got a scholarship, I am glad)",
      "장학금을 받으려고 해요 (I plan to apply for scholarship)",
      "장학금을 받지 못했어요 (I could not get a scholarship)",
      "장학금을 받을 거예요 (I will receive a scholarship)"
    ],
    correctIndex: 0,
    explanation: "'-아/어서 (-a/eoseo)' expresses cause and effect / reason ('because / so').",
    nepaliHint: "छात्रवृत्ति पाएकोले म धेरै खुसी छु"
  },
  {
    id: 30,
    level: "Visa & Embassy Prep",
    category: "Visa & Embassy",
    question: "If the Embassy consular officer asks: '왜 한국을 선택했습니까?' (Wae Hanguk-eul seontaek-haetseumnikka?), what are they asking?",
    koreanText: "왜 한국을 선택했습니까?",
    options: [
      "When are you coming back to Nepal?",
      "Why did you choose South Korea for your studies?",
      "How much money do your parents earn monthly?",
      "Which district in Nepal were you born in?"
    ],
    correctIndex: 1,
    explanation: "'왜 (Why) + 한국을 (Korea) + 선택했습니까 (did you choose/select)?' - The classic #1 question in embassy and university visa interviews!",
    nepaliHint: "तपाईंले अध्ययनका लागि दक्षिण कोरिया किन छनोट गर्नुभयो?"
  }
];
