import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;
const hasSSRContent = rootElement.children.length > 0;

function revealContent() {
  rootElement.classList.add("hydrated");
  rootElement.classList.remove("ssr-pending");
}

if (hasSSRContent) {
  hydrateRoot(rootElement, <App />, { onRecoverableError: () => {} });
  revealContent();
} else {
  createRoot(rootElement).render(<App />);
}
