import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

const serviceRoutes = [
  "/",
  "/services/business-cards",
  "/services/flyers-leaflets",
  "/services/stickers-labels",
  "/services/posters",
  "/services/pvc-banners",
  "/services/business-stationery",
  "/services/restaurant-printing",
  "/services/roller-banners",
  "/services/party-banners",
  "/services/booklets",
  "/services/student-services",
  "/services/personal-printing",
  "/services/laminating-binding",
];

const dublinAreaNames = [
  "Artane", "Ashtown", "Ballsbridge", "Ballinteer", "Ballyboden", "Ballybrack",
  "Ballyfermot", "Ballymount", "Ballymun", "Ballyroan", "Bayside", "Beaumont",
  "Blackrock", "Blanchardstown", "Booterstown", "Broadstone", "Cabinteely", "Cabra",
  "Carpenterstown", "Castleknock", "Chapelizod", "Cherrywood", "Christchurch",
  "Churchtown", "Citywest", "Clondalkin", "Clonsilla", "Clonskeagh", "Clontarf",
  "Coolock", "Crumlin", "Dalkey", "Darndale", "Dartry", "Deansgrange",
  "Dollymount", "Donabate", "Donaghmede", "Donnybrook", "Donnycarney",
  "Drimnagh", "Drumcondra", "Dublin 1", "Dublin 2", "Dublin 4", "Dublin 6",
  "Dublin 7", "Dublin 8", "Dun Laoghaire", "Dundrum", "East Wall", "Fairview",
  "Finglas", "Firhouse", "Foxrock", "Glasnevin", "Glasthule", "Goatstown",
  "Grangegorman", "Harolds Cross", "Howth", "Inchicore", "Irishtown", "Islandbridge",
  "Jobstown", "Kilbarrack", "Kill O The Grange", "Killiney", "Killester",
  "Kilmacud", "Kilmainham", "Kilnamanagh", "Kimmage", "Kinsealy", "Knocklyon",
  "Leopardstown", "Liffey Valley", "Lucan", "Lusk", "Malahide", "Marino",
  "Merrion", "Milltown", "Monkstown", "Mount Merrion", "Mulhuddart", "Naul",
  "North Wall", "Ongar", "Palmerstown", "Phibsborough", "Portmarnock",
  "Portobello", "Raheny", "Ranelagh", "Rathcoole", "Rathfarnham", "Rathgar",
  "Rathmines", "Rialto", "Ringsend", "Rush", "Saggart", "Sandyford",
  "Sandymount", "Santry", "Shankill", "Skerries", "Smithfield", "Stepaside",
  "Stillorgan", "Stoneybatter", "Sutton", "Swords", "Tallaght", "Templeogue",
  "Terenure", "The Liberties", "Tyrrelstown"
];

const localServiceSlugs = [
  "business-cards", "flyers-and-leaflets", "posters",
  "roller-banners", "business-stationery", "restaurant-printing"
];

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");
}

const localRoutes = dublinAreaNames.flatMap(area =>
  localServiceSlugs.map(svc => `/printing/${toSlug(area)}/${svc}`)
);

const blogRoutes = [
  "/blog",
  "/blog/design-perfect-business-card-2025",
  "/blog/same-day-printing-dublin",
  "/blog/top-10-tips-flyer-design",
  "/blog/restaurant-menu-printing-guide",
  "/blog/student-printing-services-dublin",
  "/blog/pvc-banners-vs-roller-banners",
  "/blog/prepare-print-ready-files-guide",
  "/blog/business-stationery-lasting-impression",
];

const routes = [...serviceRoutes, "/print-ready-checklist", "/printing", ...localRoutes, ...blogRoutes];

const existingMetaRegex = /<title>[\s\S]*?<\/title>\s*|<meta\s+name="description"[\s\S]*?\/>\s*|<meta\s+property="og:[\s\S]*?\/>\s*/g;

async function preRenderPages() {
  console.log("pre-rendering pages...");

  const ssrPath = path.resolve("dist/ssr/entry-server.js");
  if (!fs.existsSync(ssrPath)) {
    throw new Error("SSR bundle not found at " + ssrPath);
  }

  const ssrModule = await import(ssrPath);
  const render = ssrModule.render;
  const template = await readFile(path.resolve("dist/public/index.html"), "utf-8");

  for (const route of routes) {
    const result = render(route);

    let page = template.replace("<!--ssr-outlet-->", result.html);
    page = page.replace(existingMetaRegex, "");
    page = page.replace("</head>", `    ${result.metaTags}\n  </head>`);

    const outDir = route === "/"
      ? path.resolve("dist/public")
      : path.resolve("dist/public", route.slice(1));

    await mkdir(outDir, { recursive: true });
    await writeFile(path.resolve(outDir, "index.html"), page);
    console.log(`  ✓ ${route} → ${path.relative(".", outDir)}/index.html`);
  }

  console.log(`pre-rendered ${routes.length} pages`);
}

async function generateSitemap() {
  console.log("generating sitemap.xml...");
  const baseUrl = "https://copyprint.ie";
  const today = new Date().toISOString().split("T")[0];

  const entries = routes.map((route) => {
    let priority = "0.5";
    let changefreq = "monthly";

    if (route === "/") {
      priority = "1.0";
      changefreq = "weekly";
    } else if (route.startsWith("/services/")) {
      priority = "0.9";
      changefreq = "weekly";
    } else if (route === "/blog") {
      priority = "0.8";
      changefreq = "weekly";
    } else if (route.startsWith("/blog/")) {
      priority = "0.7";
      changefreq = "monthly";
    } else if (route === "/print-ready-checklist") {
      priority = "0.7";
      changefreq = "monthly";
    } else if (route === "/printing") {
      priority = "0.7";
      changefreq = "monthly";
    } else if (route.startsWith("/printing/")) {
      priority = "0.6";
      changefreq = "monthly";
    }

    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  await writeFile(path.resolve("dist/public/sitemap.xml"), sitemap);
  console.log(`  generated sitemap with ${routes.length} URLs`);
}

// ─── VACATION MODE ──────────────────────────────────────────────────────────
const VACATION_MODE = true;

const VACATION_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Copyprint.ie - Back on Wednesday 11th March</title>
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
    h1 { font-size: 1.6rem; color: #1a1a1a; margin-bottom: 16px; font-weight: 700; line-height: 1.3; }
    p { color: #555; font-size: 1rem; line-height: 1.7; margin-bottom: 12px; }
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
    .contact a { color: #1a5c2e; text-decoration: none; font-weight: 600; }
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
// ────────────────────────────────────────────────────────────────────────────

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building SSR bundle...");
  await viteBuild({
    build: {
      ssr: true,
      outDir: path.resolve("dist/ssr"),
      rollupOptions: {
        input: "client/src/entry-server.tsx",
      },
    },
    ssr: {
      noExternal: ["wouter"],
    },
  });

  await preRenderPages();
  await generateSitemap();

  if (VACATION_MODE) {
    console.log("vacation mode: writing vacation files...");
    await writeFile(path.resolve("dist/public/vacation.html"), VACATION_HTML);
    await writeFile(path.resolve("dist/public/_redirects"), "/* /vacation.html 200!");
    console.log("vacation mode: done");
  }

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
