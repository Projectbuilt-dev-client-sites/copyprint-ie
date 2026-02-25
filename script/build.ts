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

const routes = [...serviceRoutes, "/printing", ...localRoutes];

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
