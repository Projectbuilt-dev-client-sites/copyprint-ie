import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { services } from "@/lib/services";
import { getKeywordsForService } from "@/lib/seo-keywords";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Upload, CreditCard, ArrowLeft, Phone, MessageCircle, ArrowRight,
} from "lucide-react";
import ArtworkUploadForm from "@/components/ArtworkUploadForm";
import NotFound from "./not-found";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const serviceKeywordContent: Record<string, { paragraphs: string[]; relatedSlugs: string[]; locationSlugs: string[] }> = {
  "business-cards": {
    paragraphs: [
      "Looking for high-quality business cards in Dublin? At Copyprint.ie, we specialise in same day business cards that help you make a lasting first impression. Whether you need glossy business cards, matt business cards, or premium spot UV business cards, our Dame Street print shop has you covered. We offer fast business cards printing with professional results every time.",
      "Our business card printing services include double sided business cards, full colour business cards, and eco-friendly recycled business cards. Order business cards online in Ireland or visit us for same day click and collect. We print standard business cards in quantities from 100 to 500 and beyond, with bulk business cards available at competitive prices.",
      "As Dublin's trusted business card print shop since 1982, we understand what makes a professional business card stand out. From luxury business cards for premium brands to cheap business cards for startups, we deliver express business cards with next day delivery across Ireland. Custom business cards are our specialty - let us help you design the perfect card for your brand.",
    ],
    relatedSlugs: ["business-stationery", "flyers-leaflets", "stickers-labels", "laminating-binding"],
    locationSlugs: ["dublin-2", "ranelagh", "rathmines", "ballsbridge"],
  },
  "flyers-leaflets": {
    paragraphs: [
      "Need flyers printing in Dublin? Copyprint.ie offers high-quality flyer and leaflet printing for businesses and events across Ireland. From A5 flyers and A4 flyers to DL leaflets and tri-fold leaflets, we handle all sizes and formats. Our same day flyers printing service means you can have your promotional materials ready when you need them.",
      "We print double sided flyers, full colour flyers, and glossy or matt flyers on a range of paper stocks. Whether you need marketing flyers for your business, event flyers for an upcoming occasion, or restaurant leaflets for your takeaway menu, our Dublin print shop delivers professional results. Bulk flyers are available at cheap prices with fast turnaround.",
      "Our leaflet design and print service in Dublin covers everything from club flyers to folded leaflets for corporate marketing. With next day flyers delivery available across Ireland, Copyprint.ie is the go-to choice for fast flyer printing near Dame Street. We also print A6 flyers, A3 flyers, and custom sizes to suit your promotional needs.",
    ],
    relatedSlugs: ["posters", "business-cards", "stickers-labels", "booklets"],
    locationSlugs: ["dublin-2", "drumcondra", "glasnevin", "clontarf"],
  },
  "stickers-labels": {
    paragraphs: [
      "Custom sticker printing in Dublin has never been easier. At Copyprint.ie, we print vinyl stickers, product labels, waterproof stickers, and die-cut stickers in any shape or size. Whether you need branding stickers for your business or packaging labels for your products, our Dame Street print shop delivers quality results with fast turnaround.",
      "Our sticker printing services include circle stickers, rectangular labels, transparent stickers, and custom shaped stickers. We print on gloss, matt, and vinyl materials to suit every application. From logo stickers and promotional stickers to food labels, jar labels, and bottle labels, we handle all your labelling needs in Dublin and across Ireland.",
      "Need same day stickers in Dublin? We offer bulk stickers at cheap prices with professional quality. Our custom labels are perfect for branding, events, and product packaging. Roll labels printing is also available for high-volume requirements. Visit our Dame Street shop or order online for fast sticker printing near you.",
    ],
    relatedSlugs: ["business-cards", "flyers-leaflets", "pvc-banners", "personal-printing"],
    locationSlugs: [],
  },
  "posters": {
    paragraphs: [
      "High-quality poster printing in Dublin is what we do best. From A3 posters to A0 large format posters, Copyprint.ie delivers vivid colour posters with stunning clarity. Our same day poster printing service is perfect for events, advertising, and retail displays. Whether you need a single poster or bulk poster printing, we have competitive prices.",
      "We print event posters, advertising posters, retail posters, and photo posters on premium paper stocks. Our colour poster printing uses the latest digital technology for vivid, eye-catching results. We also offer laminated posters for extra durability and mounted posters for display-ready presentation.",
      "Located on Dame Street in Dublin 2, our poster printing services are fast, affordable, and professional. We handle custom poster sizes, exhibition posters, concert posters, and promotional posters. Need a quick turnaround? Our fast poster printing service means you can have your posters the same day. Art print posters and high quality posters are our specialty.",
    ],
    relatedSlugs: ["pvc-banners", "roller-banners", "flyers-leaflets", "laminating-binding"],
    locationSlugs: ["dublin-2", "rathmines", "dun-laoghaire", "drumcondra"],
  },
  "pvc-banners": {
    paragraphs: [
      "Durable PVC banners printed in Dublin for outdoor and indoor use. At Copyprint.ie, we print custom PVC banners on heavy-duty 440gsm material with welded hems and brass eyelets as standard. Our vinyl banners are weatherproof and UV-resistant, making them perfect for shop front banners, construction site banners, and event banners across Ireland.",
      "We offer large banners printing in any custom size. Whether you need advertising banners, sale banners, grand opening banners, or fence banners, our Dublin print shop delivers full colour banners with fast turnaround. Scaffold banners and church banners are also available with same day and next day options.",
      "Our banner printing service near Dame Street covers everything from small promotional banners to massive outdoor displays. We provide banner design services and can print durable banners that last 3-5 years outdoors. Cheap banners in Dublin don't have to mean low quality - our bulk banners offer excellent value without compromising on print quality.",
    ],
    relatedSlugs: ["roller-banners", "party-banners", "posters", "stickers-labels"],
    locationSlugs: [],
  },
  "business-stationery": {
    paragraphs: [
      "Professional business stationery printing in Dublin for companies that want to make a lasting impression. At Copyprint.ie, we print letterheads, compliment slips, printed envelopes, NCR pads, and invoice books. Our branded stationery helps your business maintain a consistent, professional image across all communications.",
      "We specialise in corporate stationery including professional letterheads, custom envelopes, receipt books, and delivery dockets. Our NCR pads are available in duplicate and triplicate formats, perfect for business forms and invoice books. All our stationery is printed on premium paper stocks with your branding and colours.",
      "Whether you need a4 letterheads, printed memo pads, or complete stationery sets, our Dame Street print shop delivers quality results. We offer bulk stationery printing at competitive prices with same day stationery available for urgent orders. Company stationery and branded letterheads are essential for any professional business in Dublin.",
    ],
    relatedSlugs: ["business-cards", "booklets", "flyers-leaflets", "laminating-binding"],
    locationSlugs: ["dublin-2", "ballsbridge", "sandyford", "drumcondra"],
  },
  "restaurant-printing": {
    paragraphs: [
      "Specialised restaurant printing in Dublin for the food and hospitality industry. Copyprint.ie prints menus, takeaway menus, table talkers, loyalty cards, and branded packaging for restaurants, cafes, and pubs. Our menu printing service covers everything from elegant dinner menus to fast food menus and drinks menus.",
      "We offer laminated menus that are wipeable and durable, perfect for busy restaurants. Our food menu printing includes A4 menus, A3 menus, DL menus, and folded menus in any format. Whether you need same day menu printing or bulk restaurant flyers, our Dublin print shop delivers professional results.",
      "Our hospitality printing services extend to tent cards, specials boards, and restaurant marketing materials. We understand the unique needs of Dublin's restaurants and cafes. From waterproof menus for outdoor dining to cheap menu printing for startups, Copyprint.ie is the trusted choice for restaurant printing near Dame Street.",
    ],
    relatedSlugs: ["flyers-leaflets", "stickers-labels", "business-cards", "posters"],
    locationSlugs: ["dublin-2", "ranelagh", "rathmines", "drumcondra"],
  },
  "roller-banners": {
    paragraphs: [
      "Professional roller banners in Dublin for exhibitions, events, and business premises. Copyprint.ie supplies high-quality pull up banners and retractable banners that set up in seconds. Our standard 850mm roller banners are perfect for trade shows, conferences, and promotional displays across Ireland.",
      "We offer premium roller banners, wide roller banners, and replacement roller banner prints. Our pop up banners and exhibition banners are portable, reusable, and make a big impact at any event. Whether you need display banners for a conference or standing banners for your shop, we have competitive prices.",
      "Located on Dame Street in Dublin 2, we provide same day roller banners for urgent requirements. Our roller banner design service helps you create eye-catching displays. From corporate roller banners to branded roller banners for events, Copyprint.ie delivers professional roller banners printing with fast turnaround across Ireland.",
    ],
    relatedSlugs: ["pvc-banners", "party-banners", "posters", "flyers-leaflets"],
    locationSlugs: ["dublin-2", "sandyford", "blanchardstown", "dun-laoghaire"],
  },
  "party-banners": {
    paragraphs: [
      "Personalised party banners in Dublin for every celebration. At Copyprint.ie, we create custom birthday banners, communion banners, confirmation banners, graduation banners, and christening banners. Add your own photos, custom text, and choose your colours for a truly unique celebration banner.",
      "We print personalised banners for hen parties, stag parties, baby showers, welcome home events, and retirement celebrations. Our anniversary banners, engagement banners, and wedding banners are printed on durable PVC material suitable for indoor and outdoor use. Milestone birthday banners and kids party banners are always popular.",
      "Need a same day party banner in Dublin? Our Dame Street print shop can turn around party banners quickly when you need them most. From cheap party banners to premium photo banners with multiple images, we offer personalised PVC banners in any size. Custom photo banners and party decorations printing available with next day delivery across Ireland.",
    ],
    relatedSlugs: ["pvc-banners", "roller-banners", "posters", "personal-printing"],
    locationSlugs: [],
  },
  "booklets": {
    paragraphs: [
      "Professional booklet printing in Dublin for businesses, events, and organisations. Copyprint.ie prints saddle stitch booklets, perfect bound booklets, company brochures, and product catalogues. From A5 booklets to A4 booklets, we handle all sizes with high-quality colour printing and professional finishing.",
      "Our booklet printing services include event programmes, training manuals, annual reports, mass booklets, and funeral booklets. Whether you need stapled booklets for a short publication or glued spine booklets for a comprehensive catalogue, our Dublin print shop delivers professional results every time.",
      "We offer cheap booklet printing with fast turnaround in Dublin. Short run booklets, custom booklets, and bulk booklets are all available at competitive prices. Our booklet design service helps you create professional layouts for corporate brochures and presentation booklets. Same day booklets available for urgent orders at our Dame Street location.",
    ],
    relatedSlugs: ["flyers-leaflets", "business-stationery", "laminating-binding", "posters"],
    locationSlugs: [],
  },
  "student-services": {
    paragraphs: [
      "Affordable student printing in Dublin, just minutes from Trinity College and Dublin's city centre colleges. Copyprint.ie offers cheap printing for students including thesis printing, thesis binding, assignment printing, and portfolio printing. Our student-friendly prices and fast service make us the go-to print shop for students across Dublin.",
      "We specialise in hard cover thesis binding and soft cover thesis binding to meet college specifications for Trinity, UCD, and DCU. Our dissertation binding service ensures your final submission looks professional. We also print CVs, presentation materials, and student posters for academic projects.",
      "Our student printing services include colour printing, black and white printing, A4 printing, and student laminating. With student discount printing available and same day service for urgent deadlines, Copyprint.ie on Dame Street is the trusted choice for college printing services in Dublin 2. Bring your files on USB or email them to us.",
    ],
    relatedSlugs: ["laminating-binding", "posters", "booklets", "personal-printing"],
    locationSlugs: [],
  },
  "personal-printing": {
    paragraphs: [
      "Beautiful personal printing in Dublin for life's special moments. Copyprint.ie prints wedding invitations, save the date cards, photo prints, greeting cards, and personalised gifts. From elegant wedding stationery to custom photo prints, we bring your personal projects to life with care and attention to detail.",
      "Our wedding printing services include matching invitation sets with RSVP cards, table plans, mass booklets, and thank you cards. We also print birthday invitations, christening invitations, baby announcement cards, and memorial cards. Custom invitations and personalised cards are printed on premium paper stocks.",
      "For photo printing in Dublin, we offer photo prints in all sizes from 6x4 to A4 and larger. Canvas prints, mounted photos, and photo enlargements are available with professional quality. Calendar printing and personalised stationery make great gifts. Visit our Dame Street shop to see paper samples and discuss your personal printing needs.",
    ],
    relatedSlugs: ["business-cards", "stickers-labels", "booklets", "laminating-binding"],
    locationSlugs: [],
  },
  "laminating-binding": {
    paragraphs: [
      "Professional laminating and binding services in Dublin at Copyprint.ie. We offer document laminating in A4, A3, and larger sizes with gloss and matt finishes. Our binding services include comb binding, wire binding, soft cover binding, and hard cover binding for reports, presentations, and theses.",
      "Whether you need fast laminating for a single page or bulk laminating for an entire project, our Dublin print shop has you covered. We also offer pouch laminating, ID card laminating, menu laminating, and poster laminating. Same day laminating is available for urgent requirements at our Dame Street location.",
      "Our professional binding services are perfect for report binding, presentation binding, spiral binding, and thesis binding. We understand the specific binding requirements for Dublin's colleges and universities. From cheap laminating to premium hard cover binding, Copyprint.ie provides reliable document finishing services in Dublin 2.",
    ],
    relatedSlugs: ["student-services", "booklets", "business-stationery", "posters"],
    locationSlugs: [],
  },
};

export default function ServicePage() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug;
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const keywords = getKeywordsForService(slug || "");
  const keywordContent = slug ? serviceKeywordContent[slug] : undefined;

  useEffect(() => {
    if (!slug || !service) return;

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords.join(", "));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.name,
      "description": service.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Copyprint.ie",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "29-30 Dame Street",
          "addressLocality": "Dublin",
          "postalCode": "D02 X285",
          "addressCountry": "IE",
        },
        "telephone": "+353-1-677-4234",
        "url": "https://copyprint.ie",
      },
      "areaServed": {
        "@type": "City",
        "name": "Dublin",
      },
      "url": `https://copyprint.ie/services/${slug}`,
      "offers": service.pricing.map((p) => ({
        "@type": "Offer",
        "name": `${p.name} (${p.quantity})`,
        "price": p.price.replace("€", "").replace("From ", ""),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
      })),
    };

    let scriptTag = document.querySelector('script[data-service-jsonld]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-service-jsonld", "true");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };

    let faqScriptTag = document.querySelector('script[data-service-faq-jsonld]');
    if (!faqScriptTag) {
      faqScriptTag = document.createElement("script");
      faqScriptTag.setAttribute("type", "application/ld+json");
      faqScriptTag.setAttribute("data-service-faq-jsonld", "true");
      document.head.appendChild(faqScriptTag);
    }
    faqScriptTag.textContent = JSON.stringify(faqJsonLd);

    return () => {
      metaKeywords?.remove();
      scriptTag?.remove();
      faqScriptTag?.remove();
    };
  }, [slug, service, keywords]);

  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 4);

  return (
    <div>
      <section className="relative py-16 md:py-24 bg-[#32373c]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={service.image}
            alt={`${service.name} printing services at Copyprint.ie Dublin`}
            className="w-full h-full object-cover opacity-30"
            width="1280"
            height="896"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#32373c] via-[#32373c]/90 to-[#32373c]/60" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <Link href="/" data-testid="link-back-home">
            <span className="inline-flex items-center gap-1.5 text-white/60 text-sm mb-8 cursor-pointer transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </span>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-md bg-primary/20 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white" data-testid="text-service-title">
                  {service.name}
                </h1>
              </div>
              <p className="text-white/70 text-lg max-w-3xl leading-relaxed" data-testid="text-service-description">
                {service.description}
              </p>
            </motion.div>

            <motion.div
              className="w-full md:w-80 lg:w-96 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={service.image}
                alt={`${service.name} - Copyprint.ie Dublin`}
                className="w-full rounded-lg shadow-2xl border border-white/10"
                width="1280"
                height="896"
                loading="lazy"
                data-testid="img-service-hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-pricing-title">Pricing</h2>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 bg-gray-50">
                    <TableHead className="text-gray-600">Product</TableHead>
                    <TableHead className="text-gray-600">Quantity</TableHead>
                    <TableHead className="text-right text-gray-600">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.pricing.map((item, i) => (
                    <TableRow key={i} className="border-gray-100" data-testid={`row-pricing-${i}`}>
                      <TableCell className="font-medium text-gray-800">{item.name}</TableCell>
                      <TableCell className="text-gray-500">{item.quantity}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              * Prices are indicative. Contact us for a custom quote tailored to your requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-order-title">Place Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArtworkUploadForm serviceName={service.name} />

              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Pay Online
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Secure online payment powered by Stripe. Pay now and collect
                  your order from our shop or have it delivered anywhere in Ireland.
                </p>
                <Button size="lg" className="w-full mb-4" disabled data-testid="button-stripe-pay">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay with Stripe - Coming Soon
                </Button>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">Or order by phone:</p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a href="tel:016774234" data-testid="link-service-phone">
                      <Button variant="secondary" size="sm" className="gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Call Us
                      </Button>
                    </a>
                    <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" data-testid="link-service-whatsapp">
                      <Button variant="secondary" size="sm" className="gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-faq-title">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-gray-200" data-testid={`accordion-faq-${i}`}>
                  <AccordionTrigger className="text-left text-gray-800">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-500 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {keywordContent && (
        <section className="py-14 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-about-service-title">
                About Our {service.name} Service in Dublin
              </h2>
              <div className="space-y-4">
                {keywordContent.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed" data-testid={`text-keyword-paragraph-${i}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3" data-testid="text-related-services-links-title">
                  Related Printing Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywordContent.relatedSlugs.map((relSlug) => {
                    const relService = services.find((s) => s.slug === relSlug);
                    if (!relService) return null;
                    return (
                      <Link key={relSlug} href={`/services/${relSlug}`} data-testid={`link-related-${relSlug}`}>
                        <span className="inline-block text-sm text-primary underline underline-offset-2 cursor-pointer">
                          {relService.name} Dublin
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {keywordContent.locationSlugs.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3" data-testid="text-local-areas-title">
                  {service.name} Available In
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywordContent.locationSlugs.map((locSlug) => {
                    const areaName = locSlug
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ");
                    const localSlugMap: Record<string, string> = {
                      "flyers-leaflets": "flyers-and-leaflets",
                    };
                    const localServiceSlug = localSlugMap[slug || ""] || slug;
                    return (
                      <Link key={locSlug} href={`/printing/${locSlug}/${localServiceSlug}`} data-testid={`link-location-${locSlug}`}>
                        <span className="inline-block text-sm text-primary underline underline-offset-2 cursor-pointer">
                          {service.name} {areaName}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-14 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-related-title">More Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} data-testid={`card-related-${s.slug}`}>
                  <div className="group cursor-pointer rounded-md overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width="571"
                        height="400"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-gray-900 font-semibold text-sm">{s.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help With Your {service.name} Order?</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Get in touch and we'll help you with your printing needs.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="tel:016774234" data-testid="link-service-cta-phone">
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" /> Call Us
              </Button>
            </a>
            <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" data-testid="link-service-cta-whatsapp">
              <Button className="gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Button>
            </a>
            <Link href="/#contact" data-testid="link-service-cta-contact">
              <Button variant="outline" className="gap-2">
                Contact Form <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
