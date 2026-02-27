import { Link } from "wouter";
import { Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { SiFacebook, SiInstagram, SiGoogle } from "react-icons/si";

const serviceLinks = [
  { label: "Business Cards", href: "/services/business-cards" },
  { label: "Flyers & Leaflets", href: "/services/flyers-leaflets" },
  { label: "Stickers & Labels", href: "/services/stickers-labels" },
  { label: "Posters", href: "/services/posters" },
  { label: "PVC Banners", href: "/services/pvc-banners" },
  { label: "Booklets", href: "/services/booklets" },
];

const moreLinks = [
  { label: "Business Stationery", href: "/services/business-stationery" },
  { label: "Restaurant Printing", href: "/services/restaurant-printing" },
  { label: "Roller Banners", href: "/services/roller-banners" },
  { label: "Student Services", href: "/services/student-services" },
  { label: "Personal Printing", href: "/services/personal-printing" },
  { label: "Laminating & Binding", href: "/services/laminating-binding" },
  { label: "Print Ready Checklist", href: "/print-ready-checklist" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-[#32373c] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <Link href="/" data-testid="link-footer-logo">
              <img src="/images/logo.webp" alt="Copyprint.ie" className="h-12 cursor-pointer" width="360" height="98" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Dublin's #1 print shop for personal and business printing. Proudly serving Dublin since 1982.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/copyprintdublin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="https://www.instagram.com/copyprintdublin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="https://www.google.com/search?si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x4Phr9a942m0NIuT4LKKqgon7w6EFwPA183kMjG7hN1FNCsirFu89uh8HE36CXW54WPYZi79thdNRKKCEsCdyxecJHLm&q=Copy+Print+Reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Google Reviews"
                data-testid="link-google-reviews"
              >
                <SiGoogle className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`link-footer-${link.href.split("/").pop()}`}>
                    <span className="text-sm cursor-pointer transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">More Services</h3>
            <ul className="space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`link-footer-${link.href.split("/").pop()}`}>
                    <span className="text-sm cursor-pointer transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Locations We Serve</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Rathmines", slug: "rathmines" },
                { label: "Ranelagh", slug: "ranelagh" },
                { label: "Drumcondra", slug: "drumcondra" },
                { label: "Dundrum", slug: "dundrum" },
                { label: "Blackrock", slug: "blackrock" },
              ].map((loc) => (
                <li key={loc.slug}>
                  <Link href={`/printing/${loc.slug}/business-cards`} data-testid={`link-footer-loc-${loc.slug}`}>
                    <span className="text-sm cursor-pointer transition-colors">{loc.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/printing" data-testid="link-footer-all-locations">
                  <span className="text-sm cursor-pointer transition-colors text-white/80 font-medium">View All Areas →</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://maps.google.com/?q=29-30+Dame+St+Dublin+2" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm" data-testid="link-footer-address">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>29-30 Dame St,<br />Dublin 2, D02 A025</span>
                </a>
              </li>
              <li>
                <a href="tel:016774234" className="flex items-center gap-2.5 text-sm" data-testid="link-footer-phone">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>01 677 4234</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-green-400/80" data-testid="link-footer-whatsapp">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>087 068 7728</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@copyprint.ie" className="flex items-center gap-2.5 text-sm" data-testid="link-footer-email">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>info@copyprint.ie</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Mon-Fri: 9am - 6pm<br />Sat: 10am - 4pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p className="text-gray-400" data-testid="text-copyright">&copy; {new Date().getFullYear()} Copyprint.ie. All rights reserved.</p>
          <a
            href="https://www.google.com/search?si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x4Phr9a942m0NIuT4LKKqgon7w6EFwPA183kMjG7hN1FNCsirFu89uh8HE36CXW54WPYZi79thdNRKKCEsCdyxecJHLm&q=Copy+Print+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors"
            data-testid="link-footer-google-reviews"
          >
            <SiGoogle className="w-3 h-3" />
            <span>Read our Google Reviews</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
