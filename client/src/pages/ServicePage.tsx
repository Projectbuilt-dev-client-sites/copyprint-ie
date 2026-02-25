import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { services } from "@/lib/services";
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
import NotFound from "./not-found";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicePage() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug;
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 4);

  return (
    <div>
      <section className="relative py-16 md:py-24 bg-navy-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/95 to-navy-dark/80" />
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <Link href="/" data-testid="link-back-home">
            <span className="inline-flex items-center gap-1.5 text-white/50 text-sm mb-8 cursor-pointer transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </span>
          </Link>

          <motion.div
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
            <p className="text-white/60 text-lg max-w-3xl leading-relaxed" data-testid="text-service-description">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-pricing-title">Pricing</h2>
            <div className="bg-navy-light border border-white/10 rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white/70">Product</TableHead>
                    <TableHead className="text-white/70">Quantity</TableHead>
                    <TableHead className="text-right text-white/70">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.pricing.map((item, i) => (
                    <TableRow key={i} className="border-white/10" data-testid={`row-pricing-${i}`}>
                      <TableCell className="font-medium text-white/80">{item.name}</TableCell>
                      <TableCell className="text-white/60">{item.quantity}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-white/40 mt-3">
              * Prices are indicative. Contact us for a custom quote tailored to your requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-navy-dark">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-order-title">Place Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-navy-light border border-white/10 rounded-md p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Your Files
                </h3>
                <div className="border-2 border-dashed border-white/15 rounded-md p-8 text-center">
                  <Upload className="w-10 h-10 text-white/30 mx-auto mb-3" />
                  <p className="text-white/50 mb-1">Drag & drop your files here</p>
                  <p className="text-xs text-white/30 mb-4">PDF, AI, PSD, JPG, PNG accepted</p>
                  <Button variant="secondary" data-testid="button-browse-files">Browse Files</Button>
                </div>
                <p className="text-xs text-white/40 mt-3 text-center">
                  File upload coming soon. Email files to{" "}
                  <a href="mailto:info@copyprint.ie" className="text-primary font-medium">info@copyprint.ie</a>
                </p>
              </div>

              <div className="bg-navy-light border border-white/10 rounded-md p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Pay Online
                </h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Secure online payment powered by Stripe. Pay now and collect
                  your order from our shop or have it delivered anywhere in Ireland.
                </p>
                <Button size="lg" className="w-full mb-4" disabled data-testid="button-stripe-pay">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay with Stripe - Coming Soon
                </Button>
                <div className="text-center space-y-2">
                  <p className="text-sm text-white/40">Or order by phone:</p>
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

      <section className="py-14 md:py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-faq-title">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-white/10" data-testid={`accordion-faq-${i}`}>
                  <AccordionTrigger className="text-left text-white/90">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-white/50 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-6" data-testid="text-related-title">More Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} data-testid={`card-related-${s.slug}`}>
                  <div className="group cursor-pointer rounded-md overflow-hidden bg-navy-light border border-white/10 transition-all duration-300 hover:border-primary/40">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-white font-semibold text-sm">{s.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-navy border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Need Help With Your {service.name} Order?</h2>
          <p className="text-white/50 mb-6 text-sm">
            Get in touch and we'll help you with your printing needs.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="tel:016774234" data-testid="link-service-cta-phone">
              <Button variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/5 gap-2">
                <Phone className="w-4 h-4" /> Call Us
              </Button>
            </a>
            <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" data-testid="link-service-cta-whatsapp">
              <Button className="gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Button>
            </a>
            <Link href="/#contact" data-testid="link-service-cta-contact">
              <Button variant="outline" className="border-white/20 text-white backdrop-blur-sm bg-white/5 gap-2">
                Contact Form <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
