import { google } from "googleapis";
import fs from "fs";
import path from "path";
import type { InsertArtwork } from "@shared/schema";

const NOTIFY_EMAIL = "copyprintdublin@gmail.com";

// Gmail OAuth integration (Replit google-mail connector)
let connectionSettings: any;

async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error("X-Replit-Token not found for repl/depl");
  }

  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-mail",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("Gmail not connected");
  }
  return accessToken;
}

// WARNING: Never cache this client — tokens expire
async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.gmail({ version: "v1", auth: oauth2Client });
}

function makeRawEmail(opts: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  attachment?: { filename: string; filePath: string };
}): string {
  const mixedBoundary = "mixed_copyprint_" + Date.now();
  const altBoundary = "alt_copyprint_" + (Date.now() + 1);

  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    `Reply-To: ${opts.replyTo}`,
    `Subject: ${opts.subject}`,
    `MIME-Version: 1.0`,
  ];

  if (opts.attachment) {
    // multipart/mixed wraps both body and attachment
    headers.push(`Content-Type: multipart/mixed; boundary="${mixedBoundary}"`);
    const lines = [
      ...headers,
      "",
      `--${mixedBoundary}`,
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      "",
      `--${altBoundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      "",
      opts.text,
      "",
      `--${altBoundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      "",
      opts.html,
      "",
      `--${altBoundary}--`,
      "",
    ];

    // Read file and encode as base64
    const fileData = fs.readFileSync(opts.attachment.filePath);
    const fileBase64 = fileData.toString("base64");
    const ext = path.extname(opts.attachment.filename).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".ai": "application/postscript",
      ".eps": "application/postscript",
      ".tiff": "image/tiff",
      ".tif": "image/tiff",
    };
    const mimeType = mimeTypes[ext] || "application/octet-stream";

    lines.push(
      `--${mixedBoundary}`,
      `Content-Type: ${mimeType}; name="${opts.attachment.filename}"`,
      `Content-Transfer-Encoding: base64`,
      `Content-Disposition: attachment; filename="${opts.attachment.filename}"`,
      "",
      fileBase64,
      "",
      `--${mixedBoundary}--`,
    );
    return Buffer.from(lines.join("\r\n")).toString("base64url");
  } else {
    // No attachment — simple multipart/alternative
    headers.push(`Content-Type: multipart/alternative; boundary="${altBoundary}"`);
    const lines = [
      ...headers,
      "",
      `--${altBoundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      "",
      opts.text,
      "",
      `--${altBoundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      "",
      opts.html,
      "",
      `--${altBoundary}--`,
    ];
    return Buffer.from(lines.join("\r\n")).toString("base64url");
  }
}

export async function sendArtworkNotification(
  data: InsertArtwork,
  filePath?: string
): Promise<void> {
  try {
    const gmail = await getUncachableGmailClient();

    const attachment =
      filePath && data.fileName && fs.existsSync(filePath)
        ? { filename: data.fileName, filePath }
        : undefined;

    const raw = makeRawEmail({
      from: `"Copyprint.ie Website" <${NOTIFY_EMAIL}>`,
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
      attachment,
    });

    await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
    console.log(`[email] Artwork notification sent for ${data.name}`);
  } catch (err) {
    console.error("[email] Failed to send artwork notification:", err);
    throw err;
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    const gmail = await getUncachableGmailClient();

    const raw = makeRawEmail({
      from: `"Copyprint.ie Website" <${NOTIFY_EMAIL}>`,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      text: [
        "New contact form submission from copyprint.ie:",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #32373c; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">New Contact Form Message</h2>
            <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">Copyprint.ie</p>
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
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #374151;">Subject:</td>
                <td style="padding: 10px 0; color: #111827;">${data.subject}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="font-weight: bold; color: #374151; margin: 0 0 8px;">Message:</p>
            <p style="color: #111827; white-space: pre-wrap; margin: 0;">${data.message}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin: 0;">Reply directly to this email to respond to ${data.name}.</p>
          </div>
          <div style="background: #f9fafb; padding: 12px 24px; border: 1px solid #e5e7eb; border-top: none; text-align: center;">
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">Sent automatically from copyprint.ie</p>
          </div>
        </div>
      `,
    });

    await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
    console.log(`[email] Contact notification sent from ${data.name}`);
  } catch (err) {
    console.error("[email] Failed to send contact notification:", err);
    throw err;
  }
}
