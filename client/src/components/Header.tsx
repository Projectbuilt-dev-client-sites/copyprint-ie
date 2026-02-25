import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader
} from "@/components/ui/sheet";

const navItems = [
  { label: "Business Cards", href: "/services/business-cards" },
  { label: "Stickers & Labels", href: "/services/stickers-labels" },
  { label: "Flyers & Leaflets", href: "/services/flyers-leaflets" },
  { label: "Posters", href: "/services/posters" },
  { label: "PVC Banners", href: "/services/pvc-banners" },
];

const moreItems = [
  { label: "Business Stationery", href: "/services/business-stationery" },
  { label: "Restaurant Printing", href: "/services/restaurant-printing" },
  { label: "Roller Banners", href: "/services/roller-banners" },
  { label: "Party Banners", href: "/services/party-banners" },
  { label: "Booklets", href: "/services/booklets" },
  { label: "Laminating & Binding", href: "/services/laminating-binding" },
  { label: "Student Services", href: "/services/student-services" },
  { label: "Personal Printing", href: "/services/personal-printing" },
];

// STYLE OPTIONS:
// 1. "Modern Minimal" (Current) - Solid dark, clean lines.
// 2. "Glassmorphism" - Transparent blurred background, floating look.
// 3. "Corporate Split" - Two-tone bar with utility links at top.
// 4. "Centered Logo" - Logo in center, links on both sides.

export default function Header() {
  const [location] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Change this variable to switch styles
  const style: "minimal" | "glass" | "corporate" = "glass";

  const headerClasses = {
    minimal: "bg-[#32373c]",
    glass: "bg-[#32373c]/80 backdrop-blur-md border-b border-white/10",
    corporate: "bg-[#32373c] border-b-2 border-primary/30"
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses[style]}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" data-testid="link-logo">
          <img src="/images/logo.png" alt="Copyprint.ie" className="h-10 cursor-pointer hover:scale-105 transition-transform" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split("/").pop()}`}>
              <span 
                data-cursor-grow 
                className={`px-3 py-2 text-sm font-medium transition-all cursor-none rounded relative group ${
                  location === item.href 
                    ? "text-white bg-white/10" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-1 left-3 right-3 h-0.5 bg-primary transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${location === item.href ? "scale-x-100" : ""}`} />
              </span>
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-all rounded cursor-none"
              data-cursor-grow
              data-testid="button-more-services-dropdown"
            >
              More
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-1 z-50">
                <div className="bg-[#3d4248]/95 backdrop-blur-md rounded shadow-2xl py-2 min-w-[200px] border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                  {moreItems.map((item) => (
                    <Link key={item.href} href={item.href} data-testid={`link-dropdown-${item.href.split("/").pop()}`}>
                      <span className={`block px-4 py-2 text-sm cursor-none transition-all ${
                        location === item.href ? "text-primary bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => {
              if (location === "/") {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/#contact";
              }
            }}
            className="hidden sm:inline-flex text-sm px-6 h-9 font-bold uppercase tracking-wider hover-elevate"
            data-testid="button-order-now-header"
          >
            Order Now
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="lg:hidden text-white/80" data-testid="button-mobile-menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#32373c] border-white/10 w-[280px] p-0">
              <SheetHeader className="p-6 border-b border-white/10">
                <SheetTitle className="text-left">
                  <img src="/images/logo.png" alt="Copyprint.ie" className="h-9" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-4">
                {[...navItems, ...moreItems].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`link-mobile-${item.href.split("/").pop()}`}
                  >
                    <span className={`block px-6 py-3 text-base font-medium transition-all ${
                      location === item.href ? "text-primary bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
