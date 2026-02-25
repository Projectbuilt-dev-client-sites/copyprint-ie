import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown, X } from "lucide-react";
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

export default function Header() {
  const [location] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const allMobileItems = [
    { label: "Home", href: "/" },
    ...navItems,
    ...moreItems,
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#32373c] shadow-lg">
      <nav>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="link-logo">
            <img src="/images/logo.png" alt="Copyprint.ie" className="h-10 cursor-pointer" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split("/").pop()}`}>
                <span data-cursor-grow className={`px-3 py-2 text-sm font-medium transition-all cursor-none rounded hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] ${location === item.href ? "text-white bg-white/15" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                  {item.label}
                </span>
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-all rounded hover:bg-white/5 hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] cursor-none"
                data-cursor-grow
                data-testid="button-more-services-dropdown"
              >
                More Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-[#3d4248] rounded-lg shadow-2xl py-2 min-w-[220px] border border-white/10">
                    {moreItems.map((item) => (
                      <Link key={item.href} href={item.href} data-testid={`link-dropdown-${item.href.split("/").pop()}`}>
                        <span className={`block px-4 py-2.5 text-sm cursor-none transition-all hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] ${location === item.href ? "text-primary bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

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
              className="hidden sm:inline-flex text-sm px-6 h-9"
              data-testid="button-order-now-header"
            >
              Order Now
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="lg:hidden text-white/80 no-default-hover-elevate no-default-active-elevate" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#32373c] border-white/10 w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <img src="/images/logo.png" alt="Copyprint.ie" className="h-9" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-0.5 mt-6">
                  {allMobileItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      data-testid={`link-mobile-${item.href === "/" ? "home" : item.href.split("/").pop()}`}
                    >
                      <span className={`block px-3 py-2.5 text-sm font-medium rounded cursor-pointer transition-all ${location === item.href ? "text-primary bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
