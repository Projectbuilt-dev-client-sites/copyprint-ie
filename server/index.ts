import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { runMigrations } from 'stripe-replit-sync';
import { getStripeSync } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.warn('DATABASE_URL not set, skipping Stripe initialization');
    return;
  }

  try {
    log('Initializing Stripe schema...', 'stripe');
    await runMigrations({ databaseUrl, schema: 'stripe' });
    log('Stripe schema ready', 'stripe');

    const stripeSync = await getStripeSync();

    try {
      log('Setting up managed webhook...', 'stripe');
      const domains = process.env.REPLIT_DOMAINS;
      if (domains) {
        const webhookBaseUrl = `https://${domains.split(',')[0]}`;
        const result = await stripeSync.findOrCreateManagedWebhook(
          `${webhookBaseUrl}/api/stripe/webhook`
        );
        if (result?.webhook?.url) {
          log(`Webhook configured: ${result.webhook.url}`, 'stripe');
        } else {
          log('Webhook setup returned no URL, continuing without managed webhook', 'stripe');
        }
      } else {
        log('No REPLIT_DOMAINS set, skipping webhook setup', 'stripe');
      }
    } catch (webhookErr: any) {
      log(`Webhook setup failed (non-fatal): ${webhookErr.message}`, 'stripe');
    }

    log('Syncing Stripe data...', 'stripe');
    stripeSync.syncBackfill()
      .then(() => log('Stripe data synced', 'stripe'))
      .catch((err: any) => console.error('Error syncing Stripe data:', err));
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
}

// ─── VACATION MODE ─────────────────────────────────────────────────────────
// Set to true to show vacation page, false to show normal site
const VACATION_MODE = true;

const VACATION_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Copyprint.ie – Back on Wednesday 11th March</title>
  <meta name="robots" content="noindex" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f5f5f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 52px 44px;
      max-width: 520px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      border: 1px solid #e8e8e0;
    }
    .logo { width: 200px; margin: 0 auto 32px; }
    .logo img { width: 100%; }
    h1 {
      font-size: 1.6rem;
      color: #1a1a1a;
      margin-bottom: 16px;
      font-weight: 700;
      line-height: 1.3;
    }
    p {
      color: #555;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 12px;
    }
    .date {
      display: inline-block;
      background: #f0f7f0;
      color: #2a6e2a;
      font-weight: 700;
      font-size: 1.1rem;
      padding: 10px 24px;
      border-radius: 8px;
      margin: 16px 0 28px;
      border: 1px solid #c5e0c5;
    }
    .contact { margin-top: 28px; padding-top: 24px; border-top: 1px solid #eee; }
    .contact p { font-size: 0.92rem; color: #777; margin-bottom: 8px; }
    .contact a {
      color: #1a5c2e;
      text-decoration: none;
      font-weight: 600;
    }
    .contact a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <img src="/images/logo.webp" alt="Copyprint.ie" />
    </div>
    <h1>We're on Vacation!</h1>
    <p>Our shop is currently closed for a short break. We'll be back and ready to help with all your printing needs on:</p>
    <div class="date">Wednesday 11th March</div>
    <p>Thank you for your patience — we look forward to serving you when we return.</p>
    <div class="contact">
      <p>For urgent enquiries in the meantime:</p>
      <a href="mailto:info@copyprint.ie">info@copyprint.ie</a>
    </div>
  </div>
</body>
</html>`;

// ───────────────────────────────────────────────────────────────────────────

const allowedOrigins = [
  'https://copyprint-ie.pages.dev',
  'https://copyprint.ie',
  'https://www.copyprint.ie',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.some(o => origin.startsWith(o) || origin.endsWith('.pages.dev'))) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, stripe-signature');
  }

  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Stripe webhook route MUST be registered BEFORE express.json()
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe-signature' });
    }

    try {
      const sig = Array.isArray(signature) ? signature[0] : signature;

      if (!Buffer.isBuffer(req.body)) {
        console.error('STRIPE WEBHOOK ERROR: req.body is not a Buffer');
        return res.status(500).json({ error: 'Webhook processing error' });
      }

      await WebhookHandlers.processWebhook(req.body as Buffer, sig);
      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error.message);
      res.status(400).json({ error: 'Webhook processing error' });
    }
  }
);

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  if (VACATION_MODE) {
    app.use((req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/assets') || req.path.startsWith('/images')) {
        return next();
      }
      res.status(200).type('html').send(VACATION_HTML);
    });
  }

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
      initStripe().catch((err) => console.error("Stripe init error:", err));
    },
  );
})();
