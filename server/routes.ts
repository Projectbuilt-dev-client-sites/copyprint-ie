import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertArtworkSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendArtworkNotification } from "./email";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import pg from "pg";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const serviceRoutes = [
  "/", "/services/business-cards", "/services/flyers-leaflets", "/services/stickers-labels",
  "/services/posters", "/services/pvc-banners", "/services/business-stationery",
  "/services/restaurant-printing", "/services/roller-banners", "/services/party-banners",
  "/services/booklets", "/services/student-services", "/services/personal-printing",
  "/services/laminating-binding",
];

const blogRoutes = [
  "/blog", "/blog/design-perfect-business-card-2025", "/blog/same-day-printing-dublin",
  "/blog/top-10-tips-flyer-design", "/blog/restaurant-menu-printing-guide",
  "/blog/student-printing-services-dublin", "/blog/pvc-banners-vs-roller-banners",
  "/blog/prepare-print-ready-files-guide", "/blog/business-stationery-lasting-impression",
];

const dublinAreaNames = [
  "Artane","Ashtown","Ballsbridge","Ballinteer","Ballyboden","Ballybrack","Ballyfermot",
  "Ballymount","Ballymun","Ballyroan","Bayside","Beaumont","Blackrock","Blanchardstown",
  "Booterstown","Broadstone","Cabinteely","Cabra","Carpenterstown","Castleknock",
  "Chapelizod","Cherrywood","Christchurch","Churchtown","Citywest","Clondalkin",
  "Clonsilla","Clonskeagh","Clontarf","Coolock","Crumlin","Dalkey","Darndale","Dartry",
  "Deansgrange","Dollymount","Donabate","Donaghmede","Donnybrook","Donnycarney",
  "Drimnagh","Drumcondra","Dublin 1","Dublin 2","Dublin 4","Dublin 6","Dublin 7",
  "Dublin 8","Dun Laoghaire","Dundrum","East Wall","Fairview","Finglas","Firhouse",
  "Foxrock","Glasnevin","Glasthule","Goatstown","Grangegorman","Harolds Cross","Howth",
  "Inchicore","Irishtown","Islandbridge","Jobstown","Kilbarrack","Kill O The Grange",
  "Killiney","Killester","Kilmacud","Kilmainham","Kilnamanagh","Kimmage","Kinsealy",
  "Knocklyon","Leopardstown","Liffey Valley","Lucan","Lusk","Malahide","Marino",
  "Merrion","Milltown","Monkstown","Mount Merrion","Mulhuddart","Naul","North Wall",
  "Ongar","Palmerstown","Phibsborough","Portmarnock","Portobello","Raheny","Ranelagh",
  "Rathcoole","Rathfarnham","Rathgar","Rathmines","Rialto","Ringsend","Rush","Saggart",
  "Sandyford","Sandymount","Santry","Shankill","Skerries","Smithfield","Stepaside",
  "Stillorgan","Stoneybatter","Sutton","Swords","Tallaght","Templeogue","Terenure",
  "The Liberties","Tyrrelstown",
];

const localServiceSlugs = ["business-cards","flyers-and-leaflets","posters","roller-banners","business-stationery","restaurant-printing"];

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");
}

function generateSitemapXml(): string {
  const baseUrl = "https://copyprint.ie";
  const today = new Date().toISOString().split("T")[0];
  const localRoutes = dublinAreaNames.flatMap(area =>
    localServiceSlugs.map(svc => `/printing/${toSlug(area)}/${svc}`)
  );
  const allRoutes = [...serviceRoutes, "/printing", ...localRoutes, ...blogRoutes];

  const entries = allRoutes.map((route) => {
    let priority = "0.5";
    let changefreq = "monthly";
    if (route === "/") { priority = "1.0"; changefreq = "weekly"; }
    else if (route.startsWith("/services/")) { priority = "0.9"; changefreq = "weekly"; }
    else if (route === "/blog") { priority = "0.8"; changefreq = "weekly"; }
    else if (route.startsWith("/blog/")) { priority = "0.7"; changefreq = "monthly"; }
    else if (route === "/printing") { priority = "0.7"; changefreq = "monthly"; }
    else if (route.startsWith("/printing/")) { priority = "0.6"; changefreq = "monthly"; }

    return `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(generateSitemapXml());
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.json({ success: true, id: message.id });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  app.post("/api/artwork-submit", upload.single("artwork"), async (req, res) => {
    try {
      const data = insertArtworkSchema.parse({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        fileName: req.file?.originalname || req.body.fileName || null,
      });
      const submission = await storage.createArtworkSubmission(data);
      const filePath = req.file?.path;
      sendArtworkNotification(data, filePath).catch((err) =>
        console.error("Failed to send artwork email:", err)
      );
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Artwork submit error:", error);
        res.status(500).json({ error: "Failed to submit artwork" });
      }
    }
  });

  app.get("/api/stripe/publishable-key", async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error) {
      res.status(500).json({ error: "Failed to get Stripe key" });
    }
  });

  app.get("/api/shop/products", async (_req, res) => {
    try {
      let products: any[] = [];

      if (process.env.DATABASE_URL) {
        try {
          const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
          const result = await pool.query(`
            SELECT 
              p.id as product_id,
              p.name as product_name,
              p.description as product_description,
              p.metadata as product_metadata,
              p.images as product_images,
              pr.id as price_id,
              pr.unit_amount,
              pr.currency,
              pr.active as price_active,
              pr.metadata as price_metadata
            FROM stripe.products p
            LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
            WHERE p.active = true
            ORDER BY p.name, pr.unit_amount
          `);
          await pool.end();

          const productsMap = new Map();
          for (const row of result.rows) {
            if (!productsMap.has(row.product_id)) {
              productsMap.set(row.product_id, {
                id: row.product_id,
                name: row.product_name,
                description: row.product_description,
                metadata: row.product_metadata,
                images: row.product_images,
                prices: []
              });
            }
            if (row.price_id) {
              productsMap.get(row.product_id).prices.push({
                id: row.price_id,
                unit_amount: row.unit_amount,
                currency: row.currency,
                active: row.price_active,
                metadata: row.price_metadata,
              });
            }
          }
          products = Array.from(productsMap.values());
        } catch (dbErr: any) {
          console.error("DB product fetch failed, falling back to Stripe API:", dbErr.message);
        }
      }

      if (products.length === 0) {
        try {
          console.log("Fetching products directly from Stripe API...");
          const stripe = await getUncachableStripeClient();
          const stripeProducts = await stripe.products.list({ active: true, limit: 100 });
          for (const prod of stripeProducts.data) {
            const pricesList = await stripe.prices.list({ product: prod.id, active: true, limit: 100 });
            products.push({
              id: prod.id,
              name: prod.name,
              description: prod.description,
              metadata: prod.metadata,
              images: prod.images,
              prices: pricesList.data.map((p: any) => ({
                id: p.id,
                unit_amount: p.unit_amount,
                currency: p.currency,
                active: p.active,
                metadata: p.metadata,
              }))
            });
          }
          products.sort((a, b) => a.name.localeCompare(b.name));
          console.log(`Fetched ${products.length} products from Stripe API`);
        } catch (stripeErr: any) {
          console.error("Stripe API fallback also failed:", stripeErr.message);
        }
      }

      res.json({ data: products });
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/shop/checkout", async (req, res) => {
    try {
      const { items } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "No items provided" });
      }

      const stripe = await getUncachableStripeClient();
      const origin = req.headers.origin;
      const host = req.headers.host || 'localhost:5000';
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      const baseUrl = origin || `${protocol}://${host}`;

      const line_items = items.map((item: { priceId: string; quantity: number }) => ({
        price: item.priceId,
        quantity: item.quantity || 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${baseUrl}/shop?success=true`,
        cancel_url: `${baseUrl}/shop?canceled=true`,
        shipping_address_collection: {
          allowed_countries: ['IE', 'GB'],
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Checkout error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  return httpServer;
}
