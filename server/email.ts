import type { InsertArtwork } from "@shared/schema";

const NOTIFY_EMAIL = "copyprintdublin@gmail.com";

export async function sendArtworkNotification(data: InsertArtwork): Promise<void> {
  const sgMail = await getSendGridClient();
  if (!sgMail) {
    console.log("[email] SendGrid not configured, logging artwork submission instead:");
    console.log(`[email] Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}, File: ${data.fileName || "none"}`);
    return;
  }

  const msg = {
    to: NOTIFY_EMAIL,
    from: NOTIFY_EMAIL,
    subject: `New Artwork Upload - ${data.name}`,
    text: `New artwork submission from the Copyprint.ie shop:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nFile: ${data.fileName || "Not uploaded yet"}\n\nPlease follow up with the customer.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #32373c; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">New Artwork Submission</h2>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">File:</td><td style="padding: 8px 0;">${data.fileName || "Not uploaded yet"}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 14px;">Please follow up with the customer about their artwork.</p>
        </div>
      </div>
    `,
  };

  await sgMail.send(msg);
  console.log(`[email] Artwork notification sent to ${NOTIFY_EMAIL} for ${data.name}`);
}

async function getSendGridClient() {
  try {
    const sgMail = await import("@sendgrid/mail");
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) return null;
    sgMail.default.setApiKey(apiKey);
    return sgMail.default;
  } catch {
    return null;
  }
}
