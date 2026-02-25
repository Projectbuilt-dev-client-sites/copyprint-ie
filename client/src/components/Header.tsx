import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, MessageCircle, Mail, Menu, ChevronDown, MapPin } from "lucide-react";
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
      <div className="bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:016774234"
              className="flex items-center gap-1.5 text-white/70 text-sm transition-colors"
              data-testid="link-phone"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">01 677 4234</span>
            </a>
            <a
              href="https://wa.me/353870687728"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-400/90 text-sm transition-colors"
              data-testid="link-whatsapp-top"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:info@copyprint.ie"
              className="hidden md:flex items-center gap-1.5 text-white/70 text-sm transition-colors"
              data-testid="link-email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@copyprint.ie</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-white/50 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>29-30 Dame St, Dublin 2</span>
          </div>
        </div>
      </div>

      <nav className="bg-navy border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" data-testid="link-logo">
            <span className="text-white font-bold text-xl tracking-tight cursor-pointer">
              Copy<span className="text-primary">print</span>
              <span className="text-white/60">.ie</span>
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            <Link href="/" data-testid="link-nav-shop">
              <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${location === "/" ? "text-white bg-white/10" : "text-white/75"}`}>
                Shop Now
              </span>
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split("/").pop()}`}>
                <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${location === item.href ? "text-white bg-white/10" : "text-white/75"}`}>
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
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/75 transition-colors rounded-md"
                data-testid="button-business-printing-dropdown"
              >
                Business Printing
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="bg-white rounded-md shadow-xl py-2 min-w-[220px] border border-gray-100">
                    {businessPrintingItems.map((item) => (
                      <Link key={item.href} href={item.href} data-testid={`link-dropdown-${item.href.split("/").pop()}`}>
                        <span className="block px-4 py-2.5 text-sm text-gray-700 cursor-pointer transition-colors" style={{ backgroundColor: location === item.href ? "#f3f4f6" : undefined }}>
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {extraItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split("/").pop()}`}>
                <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${location === item.href ? "text-white bg-white/10" : "text-white/75"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
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
              className="hidden sm:inline-flex"
              data-testid="button-order-now-header"
            >
              Order Now
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="xl:hidden text-white no-default-hover-elevate no-default-active-elevate" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy border-white/10 w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-white text-left">
                    Copy<span className="text-primary">print</span>
                    <span className="text-white/60">.ie</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 mt-6">
                  {allMobileItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      data-testid={`link-mobile-${item.href === "/" ? "home" : item.href.split("/").pop()}`}
                    >
                      <span className={`block px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-colors ${location === item.href ? "text-white bg-white/10" : "text-white/70"}`}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <a href="tel:016774234" className="flex items-center gap-2 text-white/70 text-sm" data-testid="link-mobile-phone">
                    <Phone className="w-4 h-4" /> 01 677 4234
                  </a>
                  <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400/90 text-sm" data-testid="link-mobile-whatsapp">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <a href="mailto:info@copyprint.ie" className="flex items-center gap-2 text-white/70 text-sm" data-testid="link-mobile-email">
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
