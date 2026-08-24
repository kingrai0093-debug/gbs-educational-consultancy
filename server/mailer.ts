import nodemailer from "nodemailer";

export interface EmailLeadPayload {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  educationLevel?: string;
  intendedMajor?: string;
  preferredIntake?: string;
  consultationType?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  universityInterest?: string;
  source?: string;
}

export interface EmailLogEntry {
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

// In-memory record of dispatched emails
export const emailLogs: EmailLogEntry[] = [];

let transporterInstance: nodemailer.Transporter | null = null;

export async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporterInstance) {
    return transporterInstance;
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporterInstance = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    console.log(`[Email] Configured custom SMTP transporter for ${host}:${port}`);
  } else {
    // Development / test fallback using nodemailer Ethereal or test stream
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporterInstance = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`[Email] Generated test Ethereal email account: ${testAccount.user}`);
    } catch {
      // JSON stream fallback if network is offline
      transporterInstance = nodemailer.createTransport({
        jsonTransport: true,
      });
      console.log(`[Email] Using fallback JSON email transport`);
    }
  }

  return transporterInstance;
}

export function buildAdminNotificationHtml(lead: EmailLeadPayload): string {
  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const waNumber = cleanPhone.startsWith("977") ? cleanPhone : `977${cleanPhone}`;
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request - GBS Educational Consultancy</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0c0a09; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f5f5f4; }
    .wrapper { max-width: 600px; margin: 20px auto; background-color: #1c1917; border-radius: 16px; border: 1px solid #292524; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1c1917 0%, #450a0a 100%); padding: 30px 24px; border-bottom: 1px solid #441616; text-align: center; }
    .brand-title { color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 6px 0; }
    .brand-subtitle { color: #f87171; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
    .greeting-pill { display: inline-block; background-color: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); color: #fde68a; font-size: 12px; font-weight: bold; padding: 4px 12px; rounded-full; border-radius: 20px; margin-top: 12px; }
    .content { padding: 24px; }
    .lead-box { background-color: #0c0a09; border: 1px solid #292524; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .lead-title { color: #ffffff; font-size: 16px; font-weight: 700; margin: 0 0 16px 0; border-bottom: 1px solid #292524; padding-bottom: 10px; }
    .info-row { display: flex; margin-bottom: 10px; font-size: 13px; }
    .info-label { width: 140px; color: #a8a29e; font-weight: 600; flex-shrink: 0; }
    .info-value { color: #ffffff; font-weight: 500; word-break: break-word; }
    .highlight-value { color: #34d399; font-weight: bold; }
    .action-container { margin: 24px 0 10px 0; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 13px; margin: 6px 4px; }
    .btn-call { background-color: #dc2626; color: #ffffff !important; }
    .btn-whatsapp { background-color: #059669; color: #ffffff !important; }
    .checklist-box { background-color: #1e1b18; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 14px 18px; margin-top: 20px; font-size: 12px; color: #d6d3d1; }
    .checklist-title { color: #fde68a; font-weight: 700; margin: 0 0 6px 0; font-size: 13px; }
    .footer { padding: 20px; background-color: #0c0a09; text-align: center; font-size: 11px; color: #78716c; border-top: 1px solid #292524; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand-title">GBS International Educational Consultancy</div>
      <div class="brand-subtitle">South Korea Education Specialists • Kathmandu Hub</div>
      <div class="greeting-pill">जय श्रीमन्नारायण 🍀❣️ • New Lead Notification</div>
    </div>
    <div class="content">
      <p style="font-size: 14px; color: #e7e5e4; margin: 0 0 16px 0;">
        A new student consultation request was just submitted online. Please review details below for immediate follow-up:
      </p>

      <div class="lead-box">
        <div class="lead-title">👤 Student Profile & Contact Details</div>
        
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; width: 140px; font-weight: 600;">Student Name:</td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 700; font-size: 15px;">${lead.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Phone / Mobile:</td>
            <td style="padding: 6px 0; color: #fca5a5; font-weight: 700; font-size: 14px;">${lead.phone}</td>
          </tr>
          ${lead.email ? `
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Email Address:</td>
            <td style="padding: 6px 0; color: #93c5fd;"><a href="mailto:${lead.email}" style="color: #93c5fd; text-decoration: none;">${lead.email}</a></td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Current Education:</td>
            <td style="padding: 6px 0; color: #e7e5e4;">${lead.educationLevel || "+2 / High School"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Intended Major:</td>
            <td style="padding: 6px 0; color: #fde68a; font-weight: 600;">${lead.intendedMajor || "General Study in Korea"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Preferred Intake:</td>
            <td style="padding: 6px 0; color: #34d399; font-weight: 600;">${lead.preferredIntake || "Upcoming Intake 2026"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Counseling Mode:</td>
            <td style="padding: 6px 0; color: #ffffff;">${lead.consultationType || "In-Person (Bagbazar Sallyan House)"}</td>
          </tr>
          ${lead.preferredDate ? `
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Preferred Slot:</td>
            <td style="padding: 6px 0; color: #ffffff;">${lead.preferredDate} at ${lead.preferredTime || "11:00 AM"}</td>
          </tr>
          ` : ""}
          ${lead.universityInterest ? `
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600;">Selected University:</td>
            <td style="padding: 6px 0; color: #c084fc; font-weight: 600;">🏛️ ${lead.universityInterest}</td>
          </tr>
          ` : ""}
          ${lead.message ? `
          <tr>
            <td style="padding: 6px 0; color: #a8a29e; font-weight: 600; vertical-align: top;">Student Notes:</td>
            <td style="padding: 6px 0; color: #d6d3d1; font-style: italic; background-color: #171412; padding: 8px; border-radius: 6px;">"${lead.message}"</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 6px 0; color: #78716c; font-size: 11px;">Received At:</td>
            <td style="padding: 6px 0; color: #78716c; font-size: 11px;">${now} (Nepal Standard Time)</td>
          </tr>
        </table>
      </div>

      <div class="action-container">
        <a href="tel:${lead.phone}" class="btn btn-call">📞 Call Student (${lead.phone})</a>
        <a href="https://wa.me/${waNumber}?text=Namaste%20${encodeURIComponent(lead.fullName)},%20greetings%20from%20GBS%20Educational%20Consultancy%20Bagbazar!%20We%20received%20your%20South%20Korea%20study%20inquiry." target="_blank" class="btn btn-whatsapp">💬 Chat on WhatsApp</a>
      </div>

      <div class="checklist-box">
        <div class="checklist-title">📋 Immediate Counselor Action Checklist:</div>
        <ul style="margin: 0; padding-left: 16px; line-height: 1.6;">
          <li>Contact student within <strong>2 business hours</strong> to build trust.</li>
          <li>Verify academic GPA & English (IELTS/PTE) / Korean (TOPIK) scores.</li>
          <li>Match with 30%–100% scholarship universities (Inha, Keimyung, Woosong, Chung-Ang).</li>
          <li>Invite to <strong>Sallyan House, Bagbazar</strong> for document attestation & embassy interview preparation.</li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <strong>GBS International Educational Consultancy</strong><br>
      Sallyan House, Bagbazar, Kathmandu, Nepal • Phone: 9744427779 / 9841234567<br>
      <em>जय श्रीमन्नारायण 🍀❣️ — Your destination, our guidance</em>
    </div>
  </div>
</body>
</html>
`;
}

export function buildStudentConfirmationHtml(lead: EmailLeadPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Consultation Confirmation - GBS Educational Consultancy</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0c0a09; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f5f5f4; }
    .wrapper { max-width: 600px; margin: 20px auto; background-color: #1c1917; border-radius: 16px; border: 1px solid #292524; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1c1917 0%, #831843 100%); padding: 30px 24px; text-align: center; }
    .brand-title { color: #ffffff; font-size: 20px; font-weight: 800; }
    .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #e7e5e4; }
    .card { background-color: #0c0a09; border: 1px solid #292524; border-radius: 12px; padding: 18px; margin: 18px 0; }
    .footer { padding: 20px; background-color: #0c0a09; text-align: center; font-size: 11px; color: #78716c; border-top: 1px solid #292524; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand-title">GBS International Educational Consultancy</div>
      <div style="color: #fb7185; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 4px;">Study in South Korea Specialist</div>
      <div style="display: inline-block; background-color: rgba(251, 191, 36, 0.2); color: #fde68a; font-size: 12px; padding: 4px 12px; border-radius: 20px; margin-top: 10px; font-weight: bold;">
        जय श्रीमन्नारायण 🍀❣️
      </div>
    </div>
    <div class="content">
      <p>Namaste <strong>${lead.fullName}</strong>,</p>
      <p>
        Thank you for submitting your consultation request for studying in <strong>South Korea</strong>! We have received your inquiry.
      </p>

      <div class="card">
        <div style="font-weight: 700; color: #ffffff; margin-bottom: 8px;">📌 Your Consultation Summary:</div>
        <div style="font-size: 13px; color: #a8a29e;">
          • <strong>Intended Major:</strong> ${lead.intendedMajor || "Degree Program"}<br>
          • <strong>Intake:</strong> ${lead.preferredIntake || "Upcoming 2026"}<br>
          • <strong>Counseling Format:</strong> ${lead.consultationType || "In-Person (Bagbazar Sallyan House)"}<br>
          ${lead.preferredDate ? `• <strong>Requested Date:</strong> ${lead.preferredDate} (${lead.preferredTime || "11:00 AM"})<br>` : ""}
        </div>
      </div>

      <p>
        Our senior study abroad counselor from our <strong>Sallyan House, Bagbazar</strong> office will contact you at <strong style="color: #fca5a5;">${lead.phone}</strong> shortly to discuss scholarships (30%–100%), university requirements, and the D-2/D-4 visa roadmap.
      </p>

      <p style="background-color: #261616; border-left: 3px solid #dc2626; padding: 10px 14px; border-radius: 6px; font-size: 13px;">
        📍 <strong>Walk-in Welcome:</strong> Sallyan House, Bagbazar, Kathmandu (Opposite education corridor).<br>
        📞 <strong>Direct Phone:</strong> 9744427779 | <strong>WhatsApp:</strong> +977 9744427779
      </p>
    </div>
    <div class="footer">
      GBS International Educational Consultancy • Kathmandu, Nepal
    </div>
  </div>
</body>
</html>
`;
}

export async function sendConsultationEmailNotification(lead: EmailLeadPayload): Promise<{
  success: boolean;
  adminStatus: "sent" | "preview" | "failed";
  adminEmail: string;
  previewUrl?: string;
  error?: string;
}> {
  const adminEmail = process.env.GBS_ADMIN_EMAIL || "admin@gbsconsultancy.com";
  const subject = `🔔 [GBS Lead Alert] New Consultation: ${lead.fullName} (${lead.intendedMajor || "Korea Study"}) - ${lead.phone}`;

  const logId = `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const adminHtml = buildAdminNotificationHtml(lead);

  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"GBS Admissions Portal" <notifications@gbsconsultancy.com>`,
      to: adminEmail,
      subject,
      html: adminHtml,
      text: `New consultation request from ${lead.fullName}. Phone: ${lead.phone}, Education: ${lead.educationLevel || "+2"}, Major: ${lead.intendedMajor || "General"}, Intake: ${lead.preferredIntake || "2026"}. Notes: ${lead.message || "None"}. Contact immediately via phone: ${lead.phone}.`,
    });

    let previewUrl: string | undefined = undefined;
    if (nodemailer.getTestMessageUrl) {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) {
        previewUrl = url;
      }
    }

    const logEntry: EmailLogEntry = {
      id: logId,
      timestamp: new Date().toISOString(),
      recipient: adminEmail,
      subject,
      leadName: lead.fullName,
      leadPhone: lead.phone,
      status: previewUrl ? "preview" : "sent",
      previewUrl,
      htmlPreview: adminHtml,
    };

    emailLogs.unshift(logEntry);
    if (emailLogs.length > 50) {
      emailLogs.pop();
    }

    console.log(`[Email] Consultation notification dispatched to ${adminEmail} for lead ${lead.fullName} (${lead.phone}). Preview: ${previewUrl || "Live SMTP"}`);

    // If student provided their email, send confirmation copy to student as well (non-blocking)
    if (lead.email && lead.email.includes("@")) {
      transporter
        .sendMail({
          from: `"GBS Educational Consultancy" <admissions@gbsconsultancy.com>`,
          to: lead.email,
          subject: `जय श्रीमन्नारायण 🍀❣️ - Your Study in Korea Consultation Request Received | GBS Consultancy`,
          html: buildStudentConfirmationHtml(lead),
        })
        .then(() => {
          console.log(`[Email] Confirmation email copy sent to student: ${lead.email}`);
        })
        .catch((err) => {
          console.warn(`[Email] Could not send student confirmation email:`, err?.message || err);
        });
    }

    return {
      success: true,
      adminStatus: previewUrl ? "preview" : "sent",
      adminEmail,
      previewUrl,
    };
  } catch (err: any) {
    console.error(`[Email] Failed to send consultation email:`, err);

    const logEntry: EmailLogEntry = {
      id: logId,
      timestamp: new Date().toISOString(),
      recipient: adminEmail,
      subject,
      leadName: lead.fullName,
      leadPhone: lead.phone,
      status: "failed",
      error: err?.message || "Email transport error",
      htmlPreview: adminHtml,
    };
    emailLogs.unshift(logEntry);

    return {
      success: false,
      adminStatus: "failed",
      adminEmail,
      error: err?.message || "Email delivery failed",
    };
  }
}
