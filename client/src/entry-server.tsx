import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import NotFound from "@/pages/not-found";
import { Switch, Route } from "wouter";
import { getServiceBySlug } from "@/lib/services";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

interface RouteMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogUrl: string;
}

function getRouteMeta(url: string): RouteMeta {
  const path = url.split("?")[0];

  if (path === "/") {
    return {
      title: "Copyprint.ie - Dublin's #1 Print Shop Since 1982",
      description: "Dublin's #1 print shop for personal and business printing. Same day click & collect. Business cards, flyers, posters, banners and more. Est. 1982.",
      ogTitle: "Copyprint.ie - Dublin's #1 Print Shop Since 1982",
      ogDescription: "Professional printing services in Dublin since 1982. Business cards, flyers, posters, banners, stickers and more. Same day click & collect.",
      ogType: "website",
      ogUrl: "https://copyprint.ie/",
    };
  }

  const serviceMatch = path.match(/^\/services\/(.+)$/);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    const service = getServiceBySlug(slug);
    if (service) {
      return {
        title: `${service.name} - Copyprint.ie | Dublin Print Shop`,
        description: service.shortDescription + " Same day click & collect available. Order online or visit us at 29-30 Dame St, Dublin 2.",
        ogTitle: `${service.name} - Copyprint.ie`,
        ogDescription: service.shortDescription,
        ogType: "website",
        ogUrl: `https://copyprint.ie/services/${slug}`,
      };
    }
  }

  return {
    title: "Page Not Found - Copyprint.ie",
    description: "The page you're looking for could not be found. Visit Copyprint.ie for Dublin's best printing services.",
    ogTitle: "Copyprint.ie - Dublin's #1 Print Shop",
    ogDescription: "Professional printing services in Dublin since 1982.",
    ogType: "website",
    ogUrl: "https://copyprint.ie/",
  };
}

function buildMetaTags(meta: RouteMeta): string {
  return [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    `<meta property="og:title" content="${meta.ogTitle}" />`,
    `<meta property="og:description" content="${meta.ogDescription}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:url" content="${meta.ogUrl}" />`,
  ].join("\n    ");
}

export function render(url: string) {
  const queryClient = new QueryClient();

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router ssrPath={url}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );

  const meta = getRouteMeta(url);
  const metaTags = buildMetaTags(meta);

  return { html, metaTags };
}
