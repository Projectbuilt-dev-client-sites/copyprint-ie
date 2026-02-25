import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/not-found";
import { Switch, Route } from "wouter";
import { getServiceBySlug } from "@/lib/services";
import { getBlogPostBySlug } from "@/lib/blog-posts";
import { getKeywordsForHome, getKeywordsForService } from "@/lib/seo-keywords";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

interface RouteMeta {
  title: string;
  description: string;
  keywords: string;
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
      keywords: getKeywordsForHome().join(", "),
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
        keywords: getKeywordsForService(slug).join(", "),
        ogTitle: `${service.name} - Copyprint.ie`,
        ogDescription: service.shortDescription,
        ogType: "website",
        ogUrl: `https://copyprint.ie/services/${slug}`,
      };
    }
  }

  if (path === "/blog") {
    return {
      title: "Blog - Copyprint.ie | Printing Tips & Guides",
      description: "Expert printing tips, design guides, and industry insights from Dublin's #1 print shop. Learn about business cards, flyers, banners, and more.",
      keywords: "printing blog, printing tips dublin, design guides, print shop blog, business card tips, flyer design guide",
      ogTitle: "Blog - Copyprint.ie | Printing Tips & Guides",
      ogDescription: "Expert printing tips, design guides, and industry insights from Dublin's #1 print shop.",
      ogType: "website",
      ogUrl: "https://copyprint.ie/blog",
    };
  }

  const blogMatch = path.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const post = getBlogPostBySlug(slug);
    if (post) {
      return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords.join(", "),
        ogTitle: post.metaTitle,
        ogDescription: post.metaDescription,
        ogType: "article",
        ogUrl: `https://copyprint.ie/blog/${slug}`,
      };
    }
  }

  return {
    title: "Page Not Found - Copyprint.ie",
    description: "The page you're looking for could not be found. Visit Copyprint.ie for Dublin's best printing services.",
    keywords: "",
    ogTitle: "Copyprint.ie - Dublin's #1 Print Shop",
    ogDescription: "Professional printing services in Dublin since 1982.",
    ogType: "website",
    ogUrl: "https://copyprint.ie/",
  };
}

function buildMetaTags(meta: RouteMeta): string {
  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    `<meta property="og:title" content="${meta.ogTitle}" />`,
    `<meta property="og:description" content="${meta.ogDescription}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:url" content="${meta.ogUrl}" />`,
    `<meta property="og:image" content="https://copyprint.ie/images/og-logo.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="400" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="https://copyprint.ie/images/og-logo.jpg" />`,
  ];
  if (meta.keywords) {
    tags.push(`<meta name="keywords" content="${meta.keywords}" />`);
  }
  return tags.join("\n    ");
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
