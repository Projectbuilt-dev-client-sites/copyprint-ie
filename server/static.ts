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

  let render: ((url: string) => string) | null = null;
  const serverEntryPath = path.resolve(__dirname, "entry-server.js");
  if (fs.existsSync(serverEntryPath)) {
    render = require(serverEntryPath).render;
  }

  app.use("/{*path}", (req, res) => {
    if (render) {
      const appHtml = render(req.originalUrl);
      const html = template.replace("<!--ssr-outlet-->", appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } else {
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
