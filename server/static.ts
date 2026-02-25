import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  const indexPath = path.resolve(distPath, "index.html");
  const template = fs.readFileSync(indexPath, "utf-8");

  let render: ((url: string) => { html: string; metaTags: string }) | null = null;
  try {
    const ssrPath = path.resolve(__dirname, "ssr", "entry-server.js");
    if (fs.existsSync(ssrPath)) {
      render = require(ssrPath).render;
    }
  } catch (e) {
    console.warn("SSR bundle not found, falling back to client-side rendering");
  }

  const existingMetaRegex = /<title>[\s\S]*?<\/title>\s*|<meta\s+name="description"[\s\S]*?\/>\s*|<meta\s+property="og:[\s\S]*?\/>\s*/g;

  app.use("/{*path}", (req, res) => {
    try {
      if (render) {
        const result = render(req.originalUrl);
        let page = template.replace("<!--ssr-outlet-->", result.html);
        page = page.replace(existingMetaRegex, "");
        page = page.replace("</head>", `    ${result.metaTags}\n  </head>`);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } else {
        res.sendFile(indexPath);
      }
    } catch (e) {
      console.error("SSR render error:", e);
      res.sendFile(indexPath);
    }
  });
}
