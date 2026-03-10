import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import CustomCursor from "@/components/CustomCursor";

const Home = lazy(() => import("@/pages/Home"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const LocalServicePage = lazy(() => import("@/pages/LocalServicePage"));
const PrintingIndex = lazy(() => import("@/pages/PrintingIndex"));
const BlogIndex = lazy(() => import("@/pages/BlogIndex"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Shop = lazy(() => import("@/pages/Shop"));
const PrintReadyChecklist = lazy(() => import("@/pages/PrintReadyChecklist"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function LazyFallback() {
  return <div className="min-h-screen" />;
}

function Router() {
  return (
    <Suspense fallback={<LazyFallback />}>
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
    </Suspense>
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
