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
import { motion } from "framer-motion";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactSection() {
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
