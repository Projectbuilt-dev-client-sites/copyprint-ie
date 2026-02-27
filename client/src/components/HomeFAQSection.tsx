import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const faqs = [
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

export default function FAQSection() {
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
