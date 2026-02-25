import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, MessageCircle, Mail, Menu, ChevronDown, MapPin, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader
} from "@/components/ui/sheet";

const navItems = [
  { label: "Business Cards", href: "/services/business-cards" },
  { label: "Flyers & Leaflets", href: "/services/flyers-leaflets" },
  { label: "Posters", href: "/services/posters" },
  { label: "PVC Banners", href: "/services/pvc-banners" },
];

const businessPrintingItems = [
  { label: "Stickers & Labels", href: "/services/stickers-labels" },
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
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [location] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "zh-CN", label: "中文", flag: "🇨🇳" },
    { code: "pl", label: "Polski", flag: "🇵🇱" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const allMobileItems = [
    { label: "Home", href: "/" },
    { label: "Shop Now", href: "/shop" },
    ...navItems,
    ...businessPrintingItems,
    ...extraItems,
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:016774234"
              className="flex items-center gap-1.5 text-gray-500 text-xs tracking-wide transition-colors hover:text-gray-900"
              data-testid="link-phone"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">01 677 4234</span>
            </a>
            <a
              href="https://wa.me/353870687728"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-600 text-xs tracking-wide transition-colors hover:text-green-700"
              data-testid="link-whatsapp-top"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:info@copyprint.ie"
              className="hidden md:flex items-center gap-1.5 text-gray-500 text-xs tracking-wide transition-colors hover:text-gray-900"
              data-testid="link-email"
            >
              <Mail className="w-3 h-3" />
              <span>info@copyprint.ie</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-400 text-xs tracking-wide">
              <MapPin className="w-3 h-3" />
              29-30 Dame St, Dublin 2
            </span>
            <div className="relative">
              <button
                className="flex items-center gap-1.5 text-gray-400 text-xs tracking-wide transition-colors hover:text-gray-900"
                onClick={() => setLangOpen(!langOpen)}
                data-testid="button-language"
              >
                <Globe className="w-3 h-3" />
                <span>Language</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 pt-2 z-50">
                  <div className="bg-white rounded-lg shadow-2xl py-1.5 min-w-[160px] border border-gray-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all text-left"
                        onClick={() => {
                          (window as any).setLanguage?.(lang.code);
                          setLangOpen(false);
                        }}
                        data-testid={`button-lang-${lang.code}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
          <Link href="/" data-testid="link-logo">
            <img src="/images/logo.webp" alt="Copyprint.ie" className="h-9 md:h-11 cursor-pointer" />
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            <Link href="/shop" data-testid="link-nav-shop">
              <span data-cursor-grow className={`px-3 py-1.5 text-[13px] font-medium transition-all cursor-none rounded-lg border border-transparent shadow-none hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] active:translate-y-[2px] ${location === "/shop" ? "text-primary font-bold bg-primary/5" : "text-primary hover:text-primary/80 bg-transparent"}`}>
                Shop Now
              </span>
            </Link>

            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split("/").pop()}`}>
                <span data-cursor-grow className={`px-3 py-1.5 text-[13px] font-medium transition-all cursor-none rounded-lg border border-transparent shadow-none hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] active:translate-y-[2px] ${location === item.href ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:text-gray-900 bg-transparent"}`}>
                  {item.label}
                </span>
              </Link>
            ))}

            <Link href="/blog" data-testid="link-nav-blog">
              <span data-cursor-grow className={`px-3 py-1.5 text-[13px] font-medium transition-all cursor-none rounded-lg border border-transparent shadow-none hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] active:translate-y-[2px] ${location === "/blog" || location.startsWith("/blog/") ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:text-gray-900 bg-transparent"}`}>
                Blog
              </span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-all rounded-lg bg-transparent border border-transparent shadow-none hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] active:translate-y-[2px] cursor-none"
                data-cursor-grow
                data-testid="button-business-printing-dropdown"
              >
                More Services
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-white rounded-lg shadow-2xl py-2 min-w-[220px] border border-gray-200">
                    {[...businessPrintingItems, ...extraItems].map((item) => (
                      <Link key={item.href} href={item.href} data-testid={`link-dropdown-${item.href.split("/").pop()}`}>
                        <span data-cursor-grow className={`block px-4 py-2.5 text-[13px] cursor-none transition-all hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)] ${location === item.href ? "text-blue-600 bg-gray-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>
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
              Shop Now
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="xl:hidden text-gray-700 no-default-hover-elevate no-default-active-elevate" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-gray-200 w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <img src="/images/logo.webp" alt="Copyprint.ie" className="h-9" />
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
                      <span className={`block px-3 py-2.5 text-sm font-medium rounded cursor-pointer transition-all ${location === item.href ? "text-blue-600 bg-gray-100" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <a href="tel:016774234" className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-900 transition-colors" data-testid="link-mobile-phone">
                    <Phone className="w-4 h-4" /> 01 677 4234
                  </a>
                  <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 text-sm hover:text-green-700 transition-colors" data-testid="link-mobile-whatsapp">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <a href="mailto:info@copyprint.ie" className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-900 transition-colors" data-testid="link-mobile-email">
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
