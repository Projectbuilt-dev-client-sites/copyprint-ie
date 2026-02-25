import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, MessageCircle, Mail, Menu, ChevronDown, MapPin, X } from "lucide-react";
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

const businessPrintingItems = [
  { label: "Business Stationery", href: "/services/business-stationery" },
  { label: "Restaurant Printing", href: "/services/restaurant-printing" },
  { label: "Roller Banners", href: "/services/roller-banners" },
  { label: "Party Banners", href: "/services/party-banners" },
  { label: "Booklets", href: "/services/booklets" },
  { label: "Laminating & Binding", href: "/services/laminating-binding" },
];

const extraItems = [
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
    ...businessPrintingItems,
    ...extraItems,
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#32373c] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:016774234"
              className="flex items-center gap-1.5 text-white/60 text-xs tracking-wide transition-colors hover:text-white"
              data-testid="link-phone"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">01 677 4234</span>
            </a>
            <a
              href="https://wa.me/353870687728"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-400/80 text-xs tracking-wide transition-colors hover:text-green-300"
              data-testid="link-whatsapp-top"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:info@copyprint.ie"
              className="hidden md:flex items-center gap-1.5 text-white/60 text-xs tracking-wide transition-colors hover:text-white"
              data-testid="link-email"
            >
              <Mail className="w-3 h-3" />
              <span>info@copyprint.ie</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-white/40 text-xs tracking-wide">
            <MapPin className="w-3 h-3" />
            <span>29-30 Dame St, Dublin 2</span>
          </div>
        </div>
      </div>

      <nav className="bg-[#32373c]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
          <Link href="/" data-testid="link-logo">
            <img src="/images/logo.png" alt="Copyprint.ie" className="h-9 md:h-11 cursor-pointer" />
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split("/").pop()}`}>
                <span data-cursor-grow className={`px-3 py-1.5 text-[13px] font-medium transition-all cursor-none rounded-lg border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] ${location === item.href ? "text-white bg-white/10" : "text-white/70 hover:text-white bg-transparent"}`}>
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
                className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-white/70 hover:text-white transition-all rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] cursor-none"
                data-cursor-grow
                data-testid="button-business-printing-dropdown"
              >
                More Services
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-[#3d4248] rounded-lg shadow-2xl py-2 min-w-[220px] border border-white/10">
                    {[...businessPrintingItems, ...extraItems].map((item) => (
                      <Link key={item.href} href={item.href} data-testid={`link-dropdown-${item.href.split("/").pop()}`}>
                        <span data-cursor-grow className={`block px-4 py-2.5 text-[13px] cursor-none transition-all hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] ${location === item.href ? "text-primary bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
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
              className="hidden sm:inline-flex text-xs px-5"
              data-testid="button-order-now-header"
            >
              Order Now
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="xl:hidden text-white/80 no-default-hover-elevate no-default-active-elevate" data-testid="button-mobile-menu">
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
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <a href="tel:016774234" className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors" data-testid="link-mobile-phone">
                    <Phone className="w-4 h-4" /> 01 677 4234
                  </a>
                  <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400/80 text-sm hover:text-green-300 transition-colors" data-testid="link-mobile-whatsapp">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <a href="mailto:info@copyprint.ie" className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors" data-testid="link-mobile-email">
                    <Mail className="w-4 h-4" /> info@copyprint.ie
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
