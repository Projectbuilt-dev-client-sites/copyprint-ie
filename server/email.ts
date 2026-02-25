import nodemailer from "nodemailer";
import type { InsertArtwork } from "@shared/schema";
import path from "path";

const NOTIFY_EMAIL = "copyprintdublin@gmail.com";

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER || NOTIFY_EMAIL;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailPass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
}

export async function sendArtworkNotification(
  data: InsertArtwork,
  filePath?: string
): Promise<void> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log("[email] Gmail not configured (set GMAIL_APP_PASSWORD). Logging submission:");
    console.log(`[email] Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}, File: ${data.fileName || "none"}`);
    return;
  }

  const attachments: { filename: string; path: string }[] = [];
  if (filePath && data.fileName) {
    attachments.push({
      filename: data.fileName,
      path: filePath,
    });
  }

  const msg = {
    from: `"Copyprint.ie Website" <${process.env.GMAIL_USER || NOTIFY_EMAIL}>`,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `New Artwork Upload - ${data.name}`,
    text: [
      "New artwork submission from the Copyprint.ie shop:",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `File: ${data.fileName || "Not uploaded"}`,
      "",
      "Please follow up with the customer.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #32373c; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">New Artwork Submission</h2>
          <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">Copyprint.ie Shop</p>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 90px; vertical-align: top; color: #374151;">Name:</td>
              <td style="padding: 10px 0; color: #111827;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #374151;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #374151;">Phone:</td>
              <td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #f97316;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #374151;">File:</td>
              <td style="padding: 10px 0; color: #111827;">${data.fileName ? `${data.fileName} (attached)` : "Not uploaded — customer may email separately"}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 13px; margin: 0;">Please follow up with this customer about their print order.</p>
        </div>
        <div style="background: #f9fafb; padding: 12px 24px; border: 1px solid #e5e7eb; border-top: none; text-align: center;">
          <p style="color: #9ca3af; font-size: 11px; margin: 0;">Sent automatically from copyprint.ie</p>
        </div>
      </div>
    `,
    attachments,
  };

  await transporter.sendMail(msg);
  console.log(`[email] Artwork notification sent to ${NOTIFY_EMAIL} for ${data.name}${attachments.length ? " (with attachment)" : ""}`);
}
