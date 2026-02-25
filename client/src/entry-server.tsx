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

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route component={NotFound} />
    </Switch>
  );
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

  return html;
}
