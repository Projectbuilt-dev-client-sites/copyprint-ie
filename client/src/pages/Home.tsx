import { useState, useEffect } from "react";
import { SiGoogle } from "react-icons/si";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/lib/services";
import { getKeywordsForHome } from "@/lib/seo-keywords";
import {
  Clock, Zap, BadgeDollarSign, Award, Star,
  ArrowRight, CheckCircle, Phone, MessageCircle,
  ChevronLeft, ChevronRight, Printer, Package, ShoppingCart,
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden" data-testid="section-hero">
      <div className="relative w-full hero-video-wrap" style={{ paddingTop: "56.25%" }}>
        <iframe
          src="https://player.vimeo.com/video/1168097892?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1"
          className="absolute inset-0 w-full h-full z-0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Copyprint.ie"
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#32373c]">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-14 relative">
            <h1 className="sr-only">Copyprint.ie - Dublin's #1 Print Shop Since 1982 | Same Day Printing, Business Cards, Flyers, Posters & Banners</h1>
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap" data-testid="hero-bar">
              <span className="flex items-center gap-1.5 text-white font-semibold text-[13px] px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none" data-testid="badge-established">
                <Award className="w-4 h-4 text-white/70" />
                Est. 1982
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold text-[13px] sm:text-sm px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none" data-testid="text-hero-title">
                <Printer className="w-4 h-4 text-white/70" />
                Dublin's #1 <span className="text-white/70 ml-1">Print Shop</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-white/80 font-medium text-[13px] px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none">
                <Zap className="w-3.5 h-3.5 text-white/70" />
                Same Day
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-white/80 font-medium text-[13px] px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none">
                <Package className="w-3.5 h-3.5 text-white/70" />
                Click & Collect
              </span>
              <Button
                size="sm"
                className="px-5 font-semibold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-order"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Order Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="px-5 font-semibold border-white/30 text-white hover:bg-white/10 gap-1.5 hover:shadow-[0_4px_12px_rgba(250,204,21,0.5)]"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-contact"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section id="services" className="py-14 md:py-20 bg-white" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="inline-block bg-primary px-8 py-3 rounded-sm mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white" data-testid="text-services-title">Print Services</h2>
          </div>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            From business cards to banners, we've got all your printing needs covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <Link href={`/services/${service.slug}`} data-testid={`card-service-${service.slug}`}>
                <div className="group cursor-pointer rounded-md overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 md:p-4 text-center">
                    <h3 className="text-gray-900 font-semibold text-sm md:text-base" data-testid={`text-service-name-${service.slug}`}>
                      {service.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-12 md:py-16 bg-gray-50" data-testid="section-cta">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" data-testid="text-cta-line1">
                Business Cards | Flyers & Leaflets
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-gray-600 mb-6">
                PVC Banners | Poster Printing
              </p>
              <Button
                size="lg"
                className="gap-2 text-base"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-cta-order"
              >
                Order Now <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 max-w-md">
              <img
                src="/images/order-now-cta.webp"
                alt="Order printing online at Copyprint.ie Dublin - same day click and collect"
                className="w-full rounded-md shadow-xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactBar() {
  return (
    <section className="py-10 md:py-14 bg-white border-y border-gray-200" data-testid="section-contact-bar">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <img src="/images/logo.webp" alt="Copyprint.ie" className="h-10 mx-auto mb-2" />
          <p className="text-gray-500 text-sm mb-6">
            Click to Call or Send WhatsApp Message
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="tel:016774234" data-testid="link-contactbar-phone">
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="w-5 h-5" />
                01 677 4234
              </Button>
            </a>
            <a href="https://wa.me/353870687728" target="_blank" rel="noopener noreferrer" data-testid="link-contactbar-whatsapp">
              <Button size="lg" className="gap-2 bg-green-600 border-green-700 text-white">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Екатерина Пластун",
    text: "I reached out to five different companies, and Susan at Copy Print was by far the fastest to respond. Throughout the entire order process, she was consistently helpful and professional.",
    rating: 5,
  },
  {
    name: "Jennifer Murphy",
    text: "Excellent service. Fast, affordable & very friendly. Thanks Alan!",
    rating: 5,
  },
  {
    name: "Jordan Evans",
    text: "Great service! I was able to email them a document last minute and they had it ready to go. Very fair prices and top class service. Highly recommend.",
    rating: 5,
  },
  {
    name: "Nat S",
    text: "I had recently made an order for flyers where I had accidentally gotten the order sizes wrong. They were so understanding and helped me fix it straight away.",
    rating: 5,
  },
  {
    name: "Laura",
    text: "Alan was super helpful and did a great job on my order. The price was super reasonable and he had everything done within 24 hours. Would definitively return.",
    rating: 5,
  },
  {
    name: "Amanda Pender",
    text: "Really good service, dropped by on the off chance without emailing ahead, had me in and out in 10 minutes to bind two presentations! And really good price too.",
    rating: 5,
  },
  {
    name: "Aisling O'Connor",
    text: "Copy Print were able to sort me out last minute and print posters and booklets for my students attending the BT Young Scientist. They also delivered them quickly.",
    rating: 5,
  },
  {
    name: "Vand Vaz",
    text: "We had a pleasant experience making our brand stickers with them. Quick to answer by email, the job was done quick and the quality was amazing! Highly recommended.",
    rating: 5,
  },
  {
    name: "Kimberly Katz",
    text: "Traveling from the US on business and needed some quick printing turnaround for table tents. Alan was easy to work with, appreciate his speediness and flexibility.",
    rating: 5,
  },
  {
    name: "Konrad Porebski",
    text: "Great, professional service. The lady behind the desk is super quick and smart. Thanks guys for today!",
    rating: 5,
  },
  {
    name: "Siobhan Duffy",
    text: "Brilliant service! Super fast and I cannot fault Alan at all. Fast and cheap for the fantastic quality you are getting with your prints.",
    rating: 5,
  },
  {
    name: "Alberto Cruz",
    text: "I travel to Dublin to attend a conference and the posters I brought from Barcelona were lost during the trip. They printed them again for me in just one hour the same day!",
    rating: 5,
  },
  {
    name: "Andrew O'Connor",
    text: "Fantastic customer service and high quality prints. I did not know how to prepare my artwork for printing and was guided with patience and respect. Highly recommend.",
    rating: 5,
  },
  {
    name: "Катерина Обужована",
    text: "We went to print 6 small books. The quality is super, the service is very good, the books were printed in 1 hour. I liked it very much, I recommend it.",
    rating: 5,
  },
  {
    name: "Maryanne",
    text: "Fantastic printing service. Got an A0 poster printed here for a conference and had it ready for me in less than 24 hours. Very pleasant to deal with and very high quality.",
    rating: 5,
  },
  {
    name: "Silvia Antón",
    text: "Lovely, fast and reliable, will definitely come back if needed! Great quality and great prices. 10/10",
    rating: 5,
  },
  {
    name: "Lingfei Fan",
    text: "Best print experience in Dublin! Amazing service with a lot of patience, for a really fair price. Thanks so much for the help today!",
    rating: 5,
  },
  {
    name: "Denver Thomas",
    text: "These guys are brilliant, fantastic prices, very professional, always on time, prompt delivery. They look after loyal customers for sure.",
    rating: 5,
  },
  {
    name: "Gordon Kelley",
    text: "Great family business, real attention to customers, very reasonably priced and very flexible. Excellent experience.",
    rating: 5,
  },
  {
    name: "Barbara Carter",
    text: "Amazing quality posters done on the same day, Alan is a gent and super responsive to emails. I would highly recommend!",
    rating: 5,
  },
  {
    name: "Hannah Simpson",
    text: "I got some printing and laminating done here and it was perfect. Would highly recommend!",
    rating: 5,
  },
  {
    name: "Déborah Gubiotti",
    text: "Highly recommended. The quality of the prints is excellent, and Alan is very kind and helpful. My best printing experience.",
    rating: 5,
  },
  {
    name: "Gerard Fitzpatrick",
    text: "I found Alan Maher friendly, very helpful, professional and great value. Highly recommended.",
    rating: 5,
  },
  {
    name: "Serena Mehta",
    text: "Excellent print shop! I had an A3 art print printed here and it came out beautifully, it was even wrapped for easy transport. Would definitely recommend.",
    rating: 5,
  },
  {
    name: "Georgij Alekseev",
    text: "They print and bind your papers fast and have kind staff! I can highly recommend this shop for students because they have a special student offer.",
    rating: 5,
  },
];

const REVIEWS_PER_PAGE = 5;
const totalPages = Math.ceil(testimonials.length / REVIEWS_PER_PAGE);

function Testimonials() {
  const [page, setPage] = useState(0);

  const currentReviews = testimonials.slice(
    page * REVIEWS_PER_PAGE,
    (page + 1) * REVIEWS_PER_PAGE
  );

  return (
    <section className="py-14 md:py-20 bg-gray-50" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" data-testid="text-testimonials-title">
            What Customers Say!
          </h2>
          <p className="text-gray-500">Real reviews from our valued customers</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentReviews.map((t, i) => (
            <motion.div
              key={page * REVIEWS_PER_PAGE + i}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-testid={`card-testimonial-${page * REVIEWS_PER_PAGE + i}`}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                "{t.text}"
              </p>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                <SiGoogle className="w-4 h-4 text-[#4285F4] flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold text-sm" data-testid={`text-testimonial-name-${page * REVIEWS_PER_PAGE + i}`}>
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs">Google Review</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === page ? "bg-primary" : "bg-gray-300"}`}
                data-testid={`button-testimonial-dot-${i}`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            data-testid="button-testimonial-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-6">
          <a
            href="https://www.google.com/search?si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x4Phr9a942m0NIuT4LKKqgon7w6EFwPA183kMjG7hN1FNCsirFu89uh8HE36CXW54WPYZi79thdNRKKCEsCdyxecJHLm&q=Copy+Print+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors"
            data-testid="link-see-all-reviews"
          >
            <SiGoogle className="w-4 h-4" />
            See All Reviews on Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Clock,
    title: "Same Day Click & Collect",
    description: "Order online and collect from our Dame St shop the same day.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Quick production times without compromising on quality.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Prices",
    description: "The best prices in Dublin for premium quality printing.",
  },
  {
    icon: Award,
    title: "Established 1982",
    description: "Over 40 years of trusted printing expertise in Dublin.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20 bg-white" data-testid="section-why">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" data-testid="text-why-title">Why Choose Copyprint.ie</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Trusted by Dublin businesses and individuals for over four decades.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center h-full">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2" data-testid={`text-feature-${index}`}>{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-[#32373c]" data-testid="section-about">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-white/50" />
              <span className="text-white/70 text-xs tracking-[0.3em] uppercase font-medium">Since 1982</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="text-about-title">About Copyprint.ie</h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Based in Dame St, Dublin 2, we have been proudly serving Dublin since 1982.
              We take great pride in every commercial or personal print job, no matter how big or small.
              From a single poster to thousands of business cards, every order gets the same care and attention.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Same Day Click & Collect</span>
                <p className="text-white/50 text-xs mt-0.5">Order online, pick up in store</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Bespoke Jobs Turned Around Fast</span>
                <p className="text-white/50 text-xs mt-0.5">Custom work delivered on time</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Local or Nationwide or International Delivery</span>
                <p className="text-white/50 text-xs mt-0.5">We deliver anywhere in Ireland</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({ title: "Message sent!", description: "We'll get back to you as soon as possible." });
      form.reset();
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again or call us directly.", variant: "destructive" });
    },
  });

  return (
    <section id="contact" className="py-14 md:py-20 bg-white" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="rounded-md overflow-hidden border border-gray-200 flex-1 min-h-[350px] lg:min-h-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1022.8297221693056!2d-6.264143140064815!3d53.34396268430213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9cce166aef%3A0xc16114d04347b935!2sCopy%20Print!5e1!3m2!1sen!2sie!4v1772067540806!5m2!1sen!2sie"
                className="w-full h-full min-h-[350px] lg:min-h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Copy Print Location - 29-30 Dame St, Dublin 2"
                data-testid="map-contact"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" data-testid="text-contact-title">Get In Touch</h2>
            <p className="text-gray-500 text-base md:text-lg mb-8">
              Send us a message Or call{" "}
              <a href="tel:016774234" className="text-primary font-medium">01 677 4234</a>.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400" data-testid="input-contact-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400" data-testid="input-contact-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this about?" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400" data-testid="input-contact-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your printing needs..."
                            className="min-h-[130px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                            {...field}
                            data-testid="input-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What services do you offer?",
    answer: "Copyprint.ie offers a comprehensive range of printing services including business cards, flyers, leaflets, posters, PVC banners, roller banners, booklets, stickers, labels, laminating, binding, and business stationery. As Dublin's leading print shop, we handle everything from personal printing to large-scale commercial jobs at our Dame Street location.",
  },
  {
    question: "Where are you located?",
    answer: "Our print shop is located at 29-30 Dame Street, Dublin 2, right in the heart of Dublin city centre. We're just minutes from Trinity College and easily accessible by public transport, making us one of the most convenient printing services in Dublin.",
  },
  {
    question: "What are your opening hours?",
    answer: "Copyprint.ie is open Monday to Friday, 9:00am to 5:30pm. Visit us at 29-30 Dame St, Dublin 2 during business hours or call us on 01 677 4234 for any enquiries about our printing services.",
  },
  {
    question: "Do you offer same day printing?",
    answer: "Yes, we offer same day printing Dublin with our click and collect service. Place your order online and collect it from our Dame Street shop the same day. We've been providing fast printing Dublin services since 1982, so you can trust us to deliver quality work quickly.",
  },
  {
    question: "Can I order online?",
    answer: "Absolutely! You can browse our full range of printing services online and place your order directly through our website. We offer same day click and collect from our print shop at 29-30 Dame St, Dublin 2, or delivery options across Ireland.",
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept all major file formats including PDF, JPEG, PNG, TIFF, AI, PSD, and EPS. For the best quality printing results, we recommend supplying high-resolution PDF files. If you're unsure about file preparation, call us on 01 677 4234 and our team will be happy to help.",
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes, we offer local delivery throughout Dublin as well as nationwide delivery across Ireland and international shipping. You can also use our convenient click and collect service to pick up your order from our print shop at 29-30 Dame St, Dublin 2.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, cash payments in-store, and bank transfers for larger orders. Visit our print shop Dublin at 29-30 Dame St, Dublin 2 or call 01 677 4234 to discuss payment options for your printing project.",
  },
  {
    question: "Do you offer design services?",
    answer: "Yes, our experienced team can help with graphic design and artwork preparation for your print jobs. Whether you need business cards, flyers, or banners designed from scratch, our Dublin print shop has been delivering professional design services since 1982.",
  },
  {
    question: "How long have you been in business?",
    answer: "Copyprint.ie has been proudly serving Dublin since 1982 - that's over 40 years of trusted printing expertise. Based at 29-30 Dame St, Dublin 2, we're one of the longest-established print shops in Dublin city centre. Call us on 01 677 4234 to experience our decades of quality service.",
  },
  {
    question: "Can I get a quote before ordering?",
    answer: "Of course! We're happy to provide free, no-obligation quotes for all printing services. Contact us by phone on 01 677 4234, send us a WhatsApp message, or visit our print shop at 29-30 Dame St, Dublin 2 to discuss your requirements and get a competitive quote.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer competitive bulk discounts across all our printing services. The more you order, the better the price per unit. Contact our Dublin print shop on 01 677 4234 or visit us at 29-30 Dame St, Dublin 2 for a custom quote on large orders.",
  },
];

function FAQSection() {
  return (
    <section className="py-16 bg-white" data-testid="section-faq">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} data-testid={`accordion-home-faq-${i}`}>
                <AccordionTrigger className="text-left text-gray-900 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function SEOKeywordSection() {
  return (
    <section className="py-12 md:py-16 bg-primary/5 border-t border-primary/10" data-testid="section-seo-content">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-primary text-xs tracking-[0.3em] uppercase font-bold mb-2 block">Since 1982</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900" data-testid="text-seo-heading">
            Dublin's Leading Print Shop Since 1982
          </h2>
        </div>

        <div className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-5">
          <p>
            Copyprint.ie has been Dublin's trusted print shop for over 40 years. Based on Dame Street in Dublin 2, we specialise in everything from business cards and flyers to posters, banners, and stickers — all with same day click and collect available for those urgent jobs.
          </p>
          <p>
            Whether you're a business needing professional letterheads, compliment slips, or business stationery, or a restaurant looking for menus and promotional leaflets, our team delivers quality printing at competitive Dublin prices. We also handle large format work including roller banners and PVC banners for exhibitions, events, and retail displays.
          </p>
          <p>
            Just minutes from Trinity College, we're the go-to choice for student printing — from thesis binding and CVs to portfolios and course materials. And for personal projects like wedding invitations or custom stickers, we bring the same care and attention to every job no matter the size.
          </p>
          <p>
            Need it fast? We offer next day printing and same day turnaround on most products, with nationwide delivery across Ireland or click and collect from our Dame Street store. Get in touch with Dublin's favourite local print shop today.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const keywords = getKeywordsForHome();
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords.join(", "));

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Copyprint.ie - Dublin's #1 print shop since 1982. Same day printing, business cards, flyers, posters, banners, stickers & more. Click & collect from Dame Street, Dublin 2. Call 01 677 4234.");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Copyprint.ie",
      "description": "Dublin's leading print shop since 1982. Same day printing, business cards, flyers, posters, banners, and more.",
      "url": "https://copyprint.ie",
      "telephone": "+353-1-677-4234",
      "email": "info@copyprint.ie",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dame Street",
        "addressLocality": "Dublin",
        "postalCode": "Dublin 2",
        "addressCountry": "IE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 53.3441,
        "longitude": -6.2675
      },
      "image": "https://copyprint.ie/images/logo.webp",
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:30"
        }
      ],
      "sameAs": [
        "https://wa.me/353870687728"
      ],
      "foundingDate": "1982",
      "areaServed": {
        "@type": "City",
        "name": "Dublin"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Print Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Cards Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flyers & Leaflets Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Poster Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PVC Banner Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sticker & Label Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Stationery" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Restaurant Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roller Banners" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Booklet Printing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Laminating & Binding" } }
        ]
      }
    };

    let scriptTag = document.querySelector('script[data-schema="local-business"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-schema", "local-business");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };

    let faqScriptTag = document.querySelector('script[data-schema="faq-page"]');
    if (!faqScriptTag) {
      faqScriptTag = document.createElement("script");
      faqScriptTag.setAttribute("type", "application/ld+json");
      faqScriptTag.setAttribute("data-schema", "faq-page");
      document.head.appendChild(faqScriptTag);
    }
    faqScriptTag.textContent = JSON.stringify(faqJsonLd);

    return () => {
      metaKeywords?.remove();
      scriptTag?.remove();
      faqScriptTag?.remove();
    };
  }, []);

  return (
    <div>
      <HeroBanner />
      <ServicesGrid />
      <CTABanner />
      <ContactBar />
      <Testimonials />
      <WhyChooseUs />
      <AboutSection />
      <FAQSection />
      <SEOKeywordSection />
      <ContactSection />
    </div>
  );
}
