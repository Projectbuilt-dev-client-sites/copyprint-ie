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

  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  let render: ((url: string) => { html: string; metaTags: string }) | null = null;
  const serverEntryPath = path.resolve(__dirname, "entry-server.js");
  if (fs.existsSync(serverEntryPath)) {
    render = require(serverEntryPath).render;
  }

  const existingMetaRegex = /<title>[\s\S]*?<\/title>\s*|<meta\s+name="description"[\s\S]*?\/>\s*|<meta\s+property="og:[\s\S]*?\/>\s*/g;

  app.use("/{*path}", (req, res) => {
    if (render) {
      const result = render(req.originalUrl);
      let page = template.replace("<!--ssr-outlet-->", result.html);
      page = page.replace(existingMetaRegex, "");
      page = page.replace("</head>", `    ${result.metaTags}\n  </head>`);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } else {
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
