import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;
const hasSSRContent = rootElement.children.length > 0;

function revealContent() {
  rootElement.classList.add("hydrated");
  rootElement.classList.remove("ssr-pending");
}

function preloadCurrentPage(): Promise<unknown> {
  const path = window.location.pathname;
  if (path === "/" || path === "") return import("@/pages/Home");
  if (path.startsWith("/services/")) return import("@/pages/ServicePage");
  if (path === "/shop") return import("@/pages/Shop");
  if (path === "/print-ready-checklist") return import("@/pages/PrintReadyChecklist");
  if (path === "/printing") return import("@/pages/PrintingIndex");
  if (path.startsWith("/printing/")) return import("@/pages/LocalServicePage");
  if (path === "/blog") return import("@/pages/BlogIndex");
  if (path.startsWith("/blog/")) return import("@/pages/BlogPost");
  return Promise.resolve();
}

preloadCurrentPage().then(() => {
  if (hasSSRContent) {
    hydrateRoot(rootElement, <App />, { onRecoverableError: () => {} });
    revealContent();
  } else {
    createRoot(rootElement).render(<App />);
  }
});
