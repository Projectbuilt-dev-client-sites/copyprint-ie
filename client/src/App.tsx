import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LocalServicePage from "@/pages/LocalServicePage";
import PrintingIndex from "@/pages/PrintingIndex";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import Shop from "@/pages/Shop";
import PrintReadyChecklist from "@/pages/PrintReadyChecklist";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { useLocation } from "wouter";
import CustomCursor from "@/components/CustomCursor";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/shop" component={Shop} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/print-ready-checklist" component={PrintReadyChecklist} />
      <Route path="/printing" component={PrintingIndex} />
      <Route path="/printing/:area/:service" component={LocalServicePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
        <CustomCursor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
