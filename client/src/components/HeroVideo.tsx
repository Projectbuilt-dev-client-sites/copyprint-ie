import { Award, Printer, Zap, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function HeroVideo() {
  const [location] = useLocation();

  return (
    <section className="relative w-full overflow-hidden" data-testid="section-hero">
      <div className="relative w-full" style={{ paddingTop: "clamp(75%, 56.25vw, 56.25%)" }}>
        <iframe
          src="https://player.vimeo.com/video/1168097892?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1"
          className="absolute inset-0 w-full h-full z-0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Copyprint.ie"
        />
        <div className="absolute inset-0 z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#32373c]">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 md:py-14">
            <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap" data-testid="hero-bar">
              <span className="flex items-center gap-1.5 text-white/80 text-xs tracking-[0.15em] uppercase font-medium px-3 py-1.5 rounded-sm bg-white/10 border-t border-t-white/20 border-b-2 border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)]" data-testid="badge-established">
                <Award className="w-3.5 h-3.5" />
                Est. 1982
              </span>
              <span className="w-px h-4 bg-white/15" />
              <span className="flex items-center gap-1.5 text-white font-semibold text-sm tracking-wide px-3 py-1.5 rounded-sm bg-white/10 border-t border-t-white/20 border-b-2 border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)]" data-testid="text-hero-title">
                <Printer className="w-4 h-4" />
                Dublin's #1 Print Shop
              </span>
              <span className="w-px h-4 bg-white/15 hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5 text-white/70 text-xs tracking-[0.15em] uppercase font-medium px-3 py-1.5 rounded-sm bg-white/10 border-t border-t-white/20 border-b-2 border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                <Zap className="w-3.5 h-3.5" />
                Same Day
              </span>
              <span className="w-px h-4 bg-white/15 hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5 text-white/70 text-xs tracking-[0.15em] uppercase font-medium px-3 py-1.5 rounded-sm bg-white/10 border-t border-t-white/20 border-b-2 border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                <Package className="w-3.5 h-3.5" />
                Click & Collect
              </span>
              <span className="w-px h-4 bg-white/15" />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-8 px-5 text-xs font-semibold tracking-wide uppercase rounded-sm"
                  onClick={() => {
                    if (location === "/") {
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = "/#services";
                    }
                  }}
                  data-testid="button-hero-order"
                >
                  Order Now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-5 text-xs font-semibold tracking-wide uppercase rounded-sm border-t border-t-white/20 border-b-2 border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)] bg-white/10 text-white/70 hover:bg-white/15 hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)]"
                  onClick={() => {
                    if (location === "/") {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = "/#contact";
                    }
                  }}
                  data-testid="button-hero-contact"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
