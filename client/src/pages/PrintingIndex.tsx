import { Link } from "wouter";
import { dublinAreas, localServices } from "@/lib/dublin-areas";
import { useEffect } from "react";

export default function PrintingIndex() {
  useEffect(() => {
    document.title = "Printing Services Across Dublin | Copyprint.ie";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Professional printing services across all Dublin areas. Business cards, flyers, posters, roller banners, stationery and restaurant printing. Same day service available. Est. 1982.");
  }, []);

  return (
    <div>
      <section className="bg-[#32373c] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors" data-testid="breadcrumb-home">Home</Link>
            <span>/</span>
            <span className="text-white/80">Locations</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-printing-index-h1">
            Printing Services Across Dublin
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Copyprint.ie serves all areas of Dublin County with professional printing services. Find your local area below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {localServices.map(service => (
            <div key={service.slug} className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200" data-testid={`text-section-${service.slug}`}>
                {service.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {dublinAreas.map(area => (
                  <Link
                    key={area.slug}
                    href={`/printing/${area.slug}/${service.slug}`}
                    data-testid={`link-${area.slug}-${service.slug}`}
                  >
                    <span className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-all cursor-pointer">
                      {area.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
