import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";

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

  return httpServer;
}
