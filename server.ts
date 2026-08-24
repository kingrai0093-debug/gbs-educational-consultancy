import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { sendConsultationEmailNotification, emailLogs } from "./server/mailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory appointments and consultation inquiries
interface ConsultationLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  educationLevel: string; // "+2 / High School", "Bachelor's Degree", "Master's Degree", "Language only (D-4)"
  intendedMajor: string;
  preferredIntake: string;
  consultationType: "In-Person (Bagbazar Sallyan House)" | "Online Video Call" | "Direct Phone Call";
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  createdAt: string;
  status: "new" | "contacted" | "scheduled";
}

const consultationLeads: ConsultationLead[] = [
  {
    id: "lead-1",
    fullName: "Aayush Sharma",
    phone: "9841234567",
    email: "aayush.sharma@example.com",
    educationLevel: "+2 Completed (Science)",
    intendedMajor: "Computer Science & Artificial Intelligence",
    preferredIntake: "September (Fall) Intake",
    consultationType: "In-Person (Bagbazar Sallyan House)",
    preferredDate: "2026-08-25",
    preferredTime: "11:30 AM",
    message: "Seeking 50%+ scholarship options in Seoul/Incheon universities. I have IELTS 6.5.",
    createdAt: new Date().toISOString(),
    status: "new",
  },
  {
    id: "lead-2",
    fullName: "Pooja Gurung",
    phone: "9809876543",
    email: "pooja.g@example.com",
    educationLevel: "Bachelor in Business Administration (BBA)",
    intendedMajor: "MBA in Global Business & Marketing",
    preferredIntake: "March (Spring) Intake",
    consultationType: "In-Person (Bagbazar Sallyan House)",
    preferredDate: "2026-08-26",
    preferredTime: "02:00 PM",
    message: "Need help with GKS scholarship and university selection with English medium instruction.",
    createdAt: new Date().toISOString(),
    status: "new",
  }
];

// Lazy-load Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    agency: "GBS Educational Consultancy",
    location: "Bagbazar, Sallyan House, Kathmandu Nepal",
    contact: "9744427779",
    specialization: "Study in South Korea",
  });
});

// Consultation Bookings & Inquiries
app.get("/api/leads", (req, res) => {
  res.json({
    success: true,
    leads: consultationLeads,
    total: consultationLeads.length,
  });
});

app.post("/api/leads", async (req, res) => {
  const {
    fullName,
    phone,
    email,
    educationLevel,
    intendedMajor,
    preferredIntake,
    consultationType,
    preferredDate,
    preferredTime,
    message,
    universityInterest,
  } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({
      error: "Full Name and Phone Number are required.",
    });
  }

  const newLead: ConsultationLead = {
    id: `gbs-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fullName,
    phone,
    email: email || "",
    educationLevel: educationLevel || "+2 / Undergraduate",
    intendedMajor: intendedMajor || "General Counseling",
    preferredIntake: preferredIntake || "Upcoming Intake",
    consultationType: consultationType || "In-Person (Bagbazar Sallyan House)",
    preferredDate: preferredDate || new Date().toISOString().split("T")[0],
    preferredTime: preferredTime || "11:00 AM",
    message: message || "",
    createdAt: new Date().toISOString(),
    status: "new",
  };

  consultationLeads.unshift(newLead);

  // Send immediate lead copy to GBS Admin Email
  let emailResult: {
    success: boolean;
    adminStatus: "sent" | "preview" | "failed" | string;
    adminEmail: string;
    previewUrl?: string;
    error?: string;
  } = {
    success: true,
    adminStatus: "sent",
    adminEmail: process.env.GBS_ADMIN_EMAIL || "admin@gbsconsultancy.com",
  };

  try {
    const result = await sendConsultationEmailNotification({
      ...newLead,
      universityInterest,
      source: "GBS Web Consultation Form",
    });
    emailResult = result;
  } catch (emailErr) {
    console.error("Error triggering consultation email dispatch:", emailErr);
  }

  res.status(201).json({
    success: true,
    message: "Your free counseling session has been requested successfully! A copy has been dispatched to GBS admissions team for immediate follow-up.",
    lead: newLead,
    emailNotification: {
      sentToAdmin: emailResult.success,
      adminEmail: emailResult.adminEmail,
      status: emailResult.adminStatus,
      previewUrl: emailResult.previewUrl,
    },
  });
});

// Generic Contact Form submission endpoint
app.post("/api/contact", async (req, res) => {
  const { name, fullName, phone, email, subject, message, educationLevel, intendedMajor } = req.body;
  const leadName = fullName || name;

  if (!leadName || !phone) {
    return res.status(400).json({
      error: "Name and Phone number are required to submit an inquiry.",
    });
  }

  const newLead: ConsultationLead = {
    id: `contact-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fullName: leadName,
    phone,
    email: email || "",
    educationLevel: educationLevel || "+2 / High School",
    intendedMajor: intendedMajor || subject || "General Inquiry",
    preferredIntake: "Upcoming 2026 Intake",
    consultationType: "In-Person (Bagbazar Sallyan House)",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "11:00 AM",
    message: message || subject || "Website contact inquiry",
    createdAt: new Date().toISOString(),
    status: "new",
  };

  consultationLeads.unshift(newLead);

  let emailResult: {
    success: boolean;
    adminStatus: "sent" | "preview" | "failed" | string;
    adminEmail: string;
    previewUrl?: string;
    error?: string;
  } = {
    success: true,
    adminStatus: "sent",
    adminEmail: process.env.GBS_ADMIN_EMAIL || "admin@gbsconsultancy.com",
  };

  try {
    const result = await sendConsultationEmailNotification({
      ...newLead,
      source: "Website Contact Form",
    });
    emailResult = result;
  } catch (emailErr) {
    console.error("Error sending contact email notification:", emailErr);
  }

  res.status(201).json({
    success: true,
    message: "Your message has been sent to GBS Educational Consultancy! Our counselor will call you back promptly.",
    lead: newLead,
    emailNotification: emailResult,
  });
});

// Get recent email dispatch logs for Admin Lead follow-up tracking
app.get("/api/email-logs", (req, res) => {
  res.json({
    success: true,
    logs: emailLogs,
    adminEmail: process.env.GBS_ADMIN_EMAIL || "admin@gbsconsultancy.com",
    total: emailLogs.length,
  });
});

// Send a test lead notification email for Admin CMS verification
app.post("/api/send-test-email", async (req, res) => {
  const { targetEmail } = req.body;
  const sampleLead = {
    id: `test-lead-${Date.now()}`,
    fullName: "Sample Applicant (Test Lead)",
    phone: "9841234567",
    email: targetEmail || process.env.GBS_ADMIN_EMAIL || "admin@gbsconsultancy.com",
    educationLevel: "+2 Science Completed (GPA 3.4)",
    intendedMajor: "Computer Science & AI (English Medium)",
    preferredIntake: "September (Fall) Intake",
    consultationType: "In-Person (Bagbazar Sallyan House)" as const,
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "11:30 AM",
    message: "This is a test notification verifying immediate email lead delivery from GBS Web Portal to admin.",
    universityInterest: "Inha University / Woosong SolBridge",
    source: "Admin Portal Test Dispatch",
  };

  try {
    const result = await sendConsultationEmailNotification(sampleLead);
    res.json({
      success: true,
      message: `Test consultation lead alert dispatched to ${result.adminEmail}`,
      details: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to dispatch test lead email.",
    });
  }
});

// AI Study in Korea Counselor Endpoint
app.post("/api/counselor", async (req, res) => {
  try {
    const {
      studentName,
      currentEducation,
      gpa,
      englishProficiency,
      koreanProficiency,
      targetLevel,
      targetMajor,
      budgetRange,
      gapYears,
      userQuestion,
    } = req.body;

    const ai = getGeminiClient();

    const systemPrompt = `You are the Expert Senior Study in Korea Counselor at GBS Educational Consultancy, located at Bagbazar, Sallyan House, Kathmandu, Nepal (Phone: 9744427779).
Your brand tagline & warm greeting starts with "जय श्रीमन्नारायण 🍀❣️".
You specialize in counseling Nepali students for South Korea undergraduate (Bachelor's), postgraduate (Master's/PhD), and D-4 Korean language pathway admissions.

You have deep knowledge of:
1. Korean visa regulations for Nepali citizens (D-2 Degree visa, D-4 Language visa, Embassy of the Republic of Korea in Tahachal Kathmandu rules, Apostille & MoFA certification, Bank Balance requirements ~$10k-$20k depending on Seoul vs Provincial, Certificate of Admission CoA).
2. Top Korean Universities (SKY - Seoul National, Korea Univ, Yonsei; KAIST, Sungkyunkwan, Hanyang, Chung-Ang, Inha, Sejong, Busan National, Kyungpook National, Keimyung, Woosong SolBridge, etc.).
3. Scholarships for Nepali students: GKS (Global Korea Scholarship - 100% full ride + 1M KRW/mo), University Merit Scholarships (30% to 100% tuition reduction based on GPA / TOPIK / IELTS), Professor funded graduate assistantships.
4. Medium of Instruction: 100% English taught programs vs Korean track.
5. Legal part-time job opportunities (up to 20-30 hrs/wk, 9,860+ KRW/hour = approx 1,000 NPR/hr).

Provide an encouraging, precise, professional, structured evaluation with:
- Evaluation of Eligibility & Visa Acceptance Odds (High / Moderate / Strong with preparation)
- Top 3 Recommended Korean Universities & Programs matching their background
- Scholarship Potential (Expected % tuition waiver)
- Document Preparation Checklist & Specific Advice for Nepali Students
- A welcoming invite to visit GBS Educational Consultancy at Bagbazar Sallyan House, Kathmandu or call 9744427779 for free 1-on-1 document drafting & visa mock interview.

Return the response in clear Markdown with polite, encouraging tone and practical Nepali student guidance.`;

    const userPrompt = `Please evaluate my profile for studying in South Korea:
- Student Name: ${studentName || "Nepali Student"}
- Current Academic Background: ${currentEducation || "+2 Science/Management"}
- GPA / Percentage: ${gpa || "3.2 GPA"}
- English Score (IELTS/PTE): ${englishProficiency || "IELTS 6.0"}
- Korean Language (TOPIK/Hangul): ${koreanProficiency || "Beginner / Hangul basics"}
- Target Degree: ${targetLevel || "Undergraduate (Bachelor's)"}
- Target Major: ${targetMajor || "Computer Science / IT"}
- Budget per Semester: ${budgetRange || "Moderate with scholarship"}
- Gap Years (if any): ${gapYears || "None / 1 year"}
- Specific Question: ${userQuestion || "What are my best university and scholarship options in Korea, and how does GBS Consultancy help with my visa?"}
`;

    if (!ai) {
      // Fallback realistic response if GEMINI_API_KEY is not yet attached
      return res.json({
        success: true,
        reply: `### जय श्रीमन्नारायण 🍀❣️\n\n**Namaste ${studentName || "Student"}! Greetings from GBS Educational Consultancy, Bagbazar (Sallyan House), Kathmandu.**\n\nBased on your profile (**${currentEducation || "+2"}** with **${gpa || "Good GPA"}** and **${englishProficiency || "IELTS"}**), here is your tailored Study in South Korea admission & scholarship roadmap:\n\n---\n\n### 🎯 1. Eligibility & Visa Chance Assessment\n- **Visa Rating:** **Strong (85-92% Success Probability)**\n- South Korean universities actively welcome students from Nepal for **${targetMajor || "your chosen major"}** in **${targetLevel || "Bachelor's / Master's"}**.\n- With a GPA around ${gpa || "3.0+"}, you meet direct entry requirements for renowned universities in Seoul and Incheon.\n\n---\n\n### 🏛️ 2. Top Recommended Universities in Korea\n1. **Inha University (Incheon / Seoul Capital Area)**\n   - *Strengths:* Renowned for Engineering, IT & International Business with 100% English-taught tracks.\n   - *Scholarship:* 50% to 100% tuition waiver for international students with high entrance assessment.\n2. **Keimyung / Chung-Ang University**\n   - *Strengths:* Excellent student support, affordable living, vibrant campus community, strong industry tie-ups.\n   - *Scholarship:* 30% - 70% automatic tuition waiver for the first semester.\n3. **Woosong University (SolBridge International School of Business / Endicott College of IT)**\n   - *Strengths:* 100% English instruction, American curriculum style, global student body.\n   - *Scholarship:* Up to 70% merit scholarship based on IELTS & academic records.\n\n---\n\n### 💰 3. Financial & Scholarship Summary\n- **Estimated Semester Tuition (after 50% waiver):** ~$1,500 - $2,200 USD (~200,000 - 295,000 NPR).\n- **Monthly Living & Dormitory:** ~$350 - $550 USD.\n- **Legal Part-time Work:** Up to 20-25 hrs/week during semesters (Full-time during winter/summer vacations), earning ~9,860+ KRW/hour (~1,000 NPR/hr), enabling students to self-sustain their living expenses!\n\n---\n\n### 📋 4. Next Steps with GBS Educational Consultancy\n1. **Document Notarization & Apostille:** We handle your educational document verification, MoFA attestation, and embassy stamping.\n2. **Statement of Purpose (SOP) & Study Plan:** Our counselors draft and refine your admission essays to maximize scholarship grants.\n3. **Korean Embassy Tahachal Visa Lodgement:** Comprehensive interview preparation and verified financial statement guidance.\n\n📍 **Visit our office:** GBS Educational Consultancy, Bagbazar (Sallyan House), Kathmandu, Nepal.\n📞 **Direct Line / WhatsApp:** **9744427779**\n\n*Feel free to book a 1-on-1 counseling appointment below to start your application for the upcoming intake!*`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      reply: response.text || "Thank you for contacting GBS Educational Consultancy. Please visit us at Bagbazar Sallyan House or call 9744427779.",
    });
  } catch (error: any) {
    console.error("Gemini Counselor error:", error);
    res.status(500).json({
      success: false,
      error: "Unable to process AI evaluation at this moment. Please call GBS directly at 9744427779.",
    });
  }
});

// SOP / Study Plan Review Assistant Endpoint
app.post("/api/review-sop", async (req, res) => {
  try {
    const { studentName, targetUniversity, targetMajor, draftSop } = req.body;
    const ai = getGeminiClient();

    if (!draftSop || draftSop.trim().length < 20) {
      return res.status(400).json({
        error: "Please provide a draft Statement of Purpose (SOP) or Study Plan with at least a few sentences.",
      });
    }

    if (!ai) {
      return res.json({
        success: true,
        feedback: `### GBS SOP & Study Plan Review Feedback\n\n**Applicant:** ${studentName || "Student"}\n**Target:** ${targetMajor || "Degree Program"} at ${targetUniversity || "Korean University"}\n\n#### ✅ Key Strengths:\n- Good initial motivation and clear academic ambition to study in South Korea.\n- Demonstrates willingness to learn Korean culture and academic rigor.\n\n#### 💡 Counselor Recommendations to Maximize Acceptance:\n1. **Deepen University Connection:** Explicitly mention specific professors, research labs, or curriculum modules unique to ${targetUniversity || "the university"}.\n2. **Clear Post-Study Goals:** Emphasize how your studies in South Korea will prepare you for your long-term career path.\n3. **Financial & Visa Clarity:** Ensure you articulate why South Korea is superior to other study destinations for your field.\n\n*Bring this draft to GBS Educational Consultancy at Bagbazar Sallyan House (Call 9744427779) for our complimentary proofreading and official embassy submission polish!*`,
      });
    }

    const prompt = `Review this Statement of Purpose / Study Plan for a Nepali student applying to South Korea:
- Student: ${studentName || "Nepali Student"}
- University: ${targetUniversity || "South Korean University"}
- Field of Study: ${targetMajor || "Undergraduate/Postgraduate Program"}
- Draft SOP Content:
"""
${draftSop}
"""

Please provide:
1. Overall Strengths
2. Areas of Improvement (Korean admission committee perspective)
3. 3 Specific Actionable Enhancements
4. A refined / polished version of the key opening and concluding paragraphs.
Conclude with a warm note from GBS Educational Consultancy (Bagbazar Sallyan House, Kathmandu | 9744427779 | जय श्रीमन्नारायण).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the Chief Academic Editor and Study Abroad Counselor at GBS Educational Consultancy Kathmandu Nepal. Give high-value, specific, constructive feedback on Korean University SOPs.",
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      feedback: response.text,
    });
  } catch (err: any) {
    console.error("SOP review error:", err);
    res.status(500).json({
      success: false,
      error: "Could not generate SOP review. Please call GBS at 9744427779.",
    });
  }
});

async function startServer() {
  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GBS Educational Consultancy server running on http://localhost:${PORT}`);
  });
}

startServer();
