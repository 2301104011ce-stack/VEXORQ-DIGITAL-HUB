import nodemailer from "nodemailer";

// Email service using Ethereal (free test email) or Gmail
const createTransport = () => {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
};

export const sendQueryEmail = async (
  fullName: string,
  email: string,
  phone: string,
  websiteType: string,
  description: string,
  recipientEmail: string = "d2684066@gmail.com"
) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return;
  }

  try {
    const transporter = createTransport();

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@vexorq.com",
      to: recipientEmail,
      subject: `New Query Received: ${websiteType} from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Query Submission</h2>
          <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
            <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${escapeHtml(email)}</a></p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Website Type:</strong> ${escapeHtml(websiteType)}</p>
          </div>

          <h3 style="color: #333; margin-top: 20px;">Project Description:</h3>
          <p style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; line-height: 1.6;">
            ${escapeHtml(description).replace(/\n/g, "<br>")}
          </p>

          <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was automatically sent from the Vexorq Digital Hub query submission form.
          </p>
        </div>
      `,
      text: `
New Query Submission

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Website Type: ${websiteType}

Project Description:
${description}

---
This email was automatically sent from the Vexorq Digital Hub query submission form.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

// Helper to escape HTML special characters
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
