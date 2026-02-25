import { useParams, Link } from "wouter";
import { dublinAreas, localServices } from "@/lib/dublin-areas";
import { generateLocalContent } from "@/lib/spintax";
import { areaData } from "@/lib/dublin-locations";
import { getServiceHero } from "@/lib/service-heroes";
import { CheckCircle, ArrowRight, Phone, MessageCircle, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function LocalServicePage() {
  const params = useParams<{ area: string; service: string }>();
  const area = dublinAreas.find(a => a.slug === params.area);
  const service = localServices.find(s => s.slug === params.service);

  useEffect(() => {
    if (area && service) {
      const content = generateLocalContent(area.name, service.name, `${area.slug}-${service.slug}`);
      document.title = content.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", content.metaDescription);
    }
  }, [area, service]);

  if (!area || !service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" data-testid="text-not-found">Page Not Found</h1>
          <Link href="/">
            <Button data-testid="button-go-home">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const seed = `${area.slug}-${service.slug}`;
  const content = generateLocalContent(area.name, service.name, seed);
  const locationData = areaData[area.slug] || null;
  const heroImage = getServiceHero(service.slug, seed);

  const nearbyAreas = dublinAreas
    .filter(item => item.slug !== area.slug)
    .sort((itemA, itemB) => {
      let hA = 0;
      const sA = area.slug + itemA.slug;
      for (let i = 0; i < sA.length; i++) hA = Math.imul(31, hA) + sA.charCodeAt(i) | 0;
      let hB = 0;
      const sB = area.slug + itemB.slug;
      for (let i = 0; i < sB.length; i++) hB = Math.imul(31, hB) + sB.charCodeAt(i) | 0;
      return ((hA >>> 0) / 4294967296) - ((hB >>> 0) / 4294967296);
    })
    .slice(0, 8);

  return (
    <div>
      <section className="relative bg-[#32373c] py-16 md:py-24 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={`${service.name} in ${area.name}`}
              className="w-full h-full object-cover"
              data-testid="img-hero"
            />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors" data-testid="breadcrumb-home">Home</Link>
            <span>/</span>
            <Link href={`/services/${service.parentSlug}`} className="hover:text-white transition-colors" data-testid="breadcrumb-service">{service.name}</Link>
            <span>/</span>
            <span className="text-white/80">{area.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="text-local-h1">
            {content.h1}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8" data-testid="text-local-intro">
            {content.intro}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => document.getElementById("local-contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-local-order"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Button>
            <a href="tel:016774234">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" data-testid="button-local-call">
                <Phone className="w-4 h-4" /> 01 677 4234
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {content.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm" data-testid={`text-feature-${i}`}>{feature}</span>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-why-heading">
              Why Choose Copyprint.ie for {service.name} in {area.name}?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8" data-testid="text-why-body">
              {content.whyUs}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-delivery-heading">
              Delivery & Collection for {area.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8" data-testid="text-delivery-body">
              {content.delivery}
            </p>
          </div>
        </div>
      </section>

      <section id="local-contact" className="py-16 bg-[#32373c]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Order {service.name} in {area.name}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto" data-testid="text-cta-body">
            {content.cta}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="tel:016774234">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" data-testid="button-cta-phone">
                <Phone className="w-4 h-4" /> 01 677 4234
              </Button>
            </a>
            <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" data-testid="button-cta-whatsapp">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </Button>
            </a>
            <a href="mailto:info@copyprint.ie">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" data-testid="button-cta-email">
                Email Us
              </Button>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <MapPin className="w-4 h-4" />
            <span>29-30 Dame St, Dublin 2 | Est. 1982</span>
          </div>
        </div>
      </section>

      {locationData && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="text-map-heading">
              Find Us Near {area.name}
            </h2>

            <div className="rounded-xl overflow-hidden border border-gray-200 mb-10">
              <iframe
                title={`Map of ${area.name}, Dublin`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationData.lng - 0.015},${locationData.lat - 0.01},${locationData.lng + 0.015},${locationData.lat + 0.01}&layer=mapnik&marker=${locationData.lat},${locationData.lng}`}
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                data-testid="map-embed"
              />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4" data-testid="text-attractions-heading">
              What's On in {area.name}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Explore local landmarks and attractions near our printing service area in {area.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {locationData.attractions.map((attraction, idx) => (
                <a
                  key={idx}
                  href={attraction.url}
                  target="_blank"
                  rel={attraction.doFollow ? "noopener" : "noopener noreferrer nofollow"}
                  className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all group"
                  data-testid={`link-attraction-${idx}`}
                >
                  <ExternalLink className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span>{attraction.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6" data-testid="text-nearby-heading">
            {service.name} in Other Dublin Areas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {nearbyAreas.map(a => (
              <Link
                key={a.slug}
                href={`/printing/${a.slug}/${service.slug}`}
                data-testid={`link-nearby-${a.slug}`}
              >
                <span className="block p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all text-center cursor-pointer">
                  {a.name}
                </span>
              </Link>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-10 mb-4" data-testid="text-other-services-heading">
            Other Printing Services in {area.name}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {localServices.filter(s => s.slug !== service.slug).map(s => (
              <Link
                key={s.slug}
                href={`/printing/${area.slug}/${s.slug}`}
                data-testid={`link-service-${s.slug}`}
              >
                <span className="block p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all text-center cursor-pointer">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-10 mb-4" data-testid="text-quick-links-heading">
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/" data-testid="link-quick-home">
              <span className="block p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all text-center cursor-pointer">
                Home
              </span>
            </Link>
            <Link href={`/services/${service.parentSlug}`} data-testid="link-quick-parent-service">
              <span className="block p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all text-center cursor-pointer">
                {service.name}
              </span>
            </Link>
            {localServices.filter(s => s.slug !== service.slug).map(s => (
              <Link key={s.parentSlug} href={`/services/${s.parentSlug}`} data-testid={`link-quick-svc-${s.parentSlug}`}>
                <span className="block p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all text-center cursor-pointer">
                  {s.name}
                </span>
              </Link>
            ))}
            <Link href="/printing" data-testid="link-quick-all-areas">
              <span className="block p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all text-center cursor-pointer">
                All Dublin Areas
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
