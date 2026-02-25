import { useState, useEffect, useCallback } from "react";
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
import { services } from "@/lib/services";
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
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src="https://player.vimeo.com/video/1168097892?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1"
          className="absolute inset-0 w-full h-full z-0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Copyprint.ie"
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#32373c]">
          <div className="max-w-7xl mx-auto px-4 py-14 relative">
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap" data-testid="hero-bar">
              <span className="flex items-center gap-1.5 text-primary font-semibold text-[13px] px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none" data-testid="badge-established">
                <Award className="w-4 h-4" />
                Est. 1982
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold text-[13px] sm:text-sm px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none" data-testid="text-hero-title">
                <Printer className="w-4 h-4 text-primary" />
                Dublin's #1 <span className="text-primary ml-1">Print Shop</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-white/80 font-medium text-[13px] px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Same Day
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-white/80 font-medium text-[13px] px-3 py-1.5 rounded-lg bg-transparent border border-white/15 shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_3px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(250,204,21,0.5)] active:shadow-[0_1px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] transition-all select-none">
                <Package className="w-3.5 h-3.5 text-primary" />
                Click & Collect
              </span>
              <span className="text-white/20">|</span>
              <Button
                size="sm"
                className="px-5 font-semibold gap-1.5"
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                PVC Banners | Poster Printing
              </h2>
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
                src="/images/order-now-cta.png"
                alt="Order printing online"
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
          <img src="/images/logo.png" alt="Copyprint.ie" className="h-10 mx-auto mb-2" />
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
    name: "Siobhan Duffy",
    text: "Absolutely fantastic service! Brilliant for students who need to get things printed within a quick time and student friendly prices. Quality of the printing is brilliant!",
    source: "recommends Copyprint.ie",
  },
  {
    name: "Jonathan Wilde",
    text: "Cannot fault their service. The guys at Copyprint are great, I use them regularly. Great prices and always very quick!",
    source: "online review",
  },
  {
    name: "Fiona Mullan",
    text: "Very fast turnaround and great prices. Business cards look great. I would highly recommend.",
    source: "online review",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-14 md:py-20 bg-gray-50" data-testid="section-testimonials">
      <div className="max-w-4xl mx-auto px-4">
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
        </motion.div>

        <div className="relative">
          <div className="bg-white border border-gray-200 rounded-md p-8 md:p-12 text-center min-h-[220px] flex flex-col items-center justify-center shadow-sm">
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 max-w-2xl italic" data-testid={`text-testimonial-${current}`}>
              "{testimonials[current].text}"
            </p>
            <p className="text-gray-900 font-semibold" data-testid={`text-testimonial-name-${current}`}>
              {testimonials[current].name}
            </p>
            <p className="text-gray-400 text-sm">
              {testimonials[current].source}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-gray-300"}`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
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
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
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
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Since 1982</span>
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
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Same Day Click & Collect</span>
                <p className="text-white/50 text-xs mt-0.5">Order online, pick up in store</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm">Bespoke Jobs Turned Around Fast</span>
                <p className="text-white/50 text-xs mt-0.5">Custom work delivered on time</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
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
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" data-testid="text-contact-title">Get In Touch</h2>
          <p className="text-gray-500 text-base md:text-lg">
            Send us a message Or call{" "}
            <a href="tel:016774234" className="text-primary font-medium">01 677 4234</a>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <ServicesGrid />
      <CTABanner />
      <ContactBar />
      <Testimonials />
      <WhyChooseUs />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
