import type { LucideIcon } from "lucide-react";
import {
  CreditCard, FileText, Tag, Image, Flag, Briefcase,
  UtensilsCrossed, Monitor, Sparkles, BookOpen,
  GraduationCap, Heart, Layers,
} from "lucide-react";

export interface ServicePricing {
  name: string;
  quantity: string;
  price: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  image: string;
  pricing: ServicePricing[];
  faqs: ServiceFAQ[];
}

export const services: Service[] = [
  {
    slug: "business-cards",
    name: "Business Cards",
    shortDescription: "Premium quality business cards with same day collection available.",
    description: "Make a lasting first impression with our premium business cards. Printed on high-quality 400gsm card stock with a range of finishes including matt lamination, gloss lamination, and spot UV. Available in standard and custom sizes.",
    icon: CreditCard,
    image: "/images/business-cards.png",
    pricing: [
      { name: "Standard Matt", quantity: "100", price: "\u20AC25" },
      { name: "Standard Matt", quantity: "250", price: "\u20AC35" },
      { name: "Standard Matt", quantity: "500", price: "\u20AC55" },
      { name: "Premium Gloss", quantity: "100", price: "\u20AC35" },
      { name: "Premium Gloss", quantity: "250", price: "\u20AC50" },
      { name: "Premium Gloss", quantity: "500", price: "\u20AC75" },
    ],
    faqs: [
      { question: "What size are your business cards?", answer: "Our standard business cards are 85mm x 55mm, the most commonly used size in Ireland and Europe. We also offer custom sizes on request." },
      { question: "Can I get same day business cards?", answer: "Yes! We offer same day click & collect for standard business card orders placed before 12pm. Premium finishes may take 2-3 business days." },
      { question: "What file format should I send?", answer: "We accept PDF, AI, PSD, and high-resolution JPG/PNG files. For best results, send print-ready PDFs with 3mm bleed." },
      { question: "Do you offer design services?", answer: "Yes, we can help design your business cards. Contact us for a quote on our design services." },
    ],
  },
  {
    slug: "flyers-leaflets",
    name: "Flyers & Leaflets",
    shortDescription: "Eye-catching flyers and leaflets for promotions and events.",
    description: "Get your message out there with professionally printed flyers and leaflets. Available in A3, A4, A5, A6, and DL sizes on a variety of paper stocks. Perfect for promotions, events, menus, and marketing campaigns.",
    icon: FileText,
    image: "/images/flyers-leaflets.png",
    pricing: [
      { name: "A5 Flyers (150gsm)", quantity: "100", price: "\u20AC30" },
      { name: "A5 Flyers (150gsm)", quantity: "250", price: "\u20AC45" },
      { name: "A5 Flyers (150gsm)", quantity: "500", price: "\u20AC65" },
      { name: "A4 Flyers (150gsm)", quantity: "100", price: "\u20AC45" },
      { name: "A4 Flyers (150gsm)", quantity: "250", price: "\u20AC65" },
      { name: "A4 Flyers (150gsm)", quantity: "500", price: "\u20AC95" },
    ],
    faqs: [
      { question: "What paper weights do you offer?", answer: "We offer 130gsm, 150gsm, 170gsm, and 250gsm paper stocks. Heavier weights feel more premium and are great for handouts." },
      { question: "Can I get double-sided printing?", answer: "Absolutely! Double-sided printing is available on all flyer sizes at a small additional cost." },
      { question: "How quickly can I get my flyers?", answer: "Standard turnaround is 2-3 business days. Same day service is available for smaller quantities." },
      { question: "Do you offer folding?", answer: "Yes, we offer half-fold, tri-fold, and Z-fold options for leaflets. Perfect for menus and brochures." },
    ],
  },
  {
    slug: "stickers-labels",
    name: "Stickers & Labels",
    shortDescription: "Custom stickers and labels in any shape, size, or finish.",
    description: "Custom printed stickers and labels for products, packaging, promotions, and branding. Available in circles, squares, rectangles, and custom die-cut shapes. Choose from gloss, matt, or transparent vinyl materials.",
    icon: Tag,
    image: "/images/stickers-labels.png",
    pricing: [
      { name: "Circle Stickers (50mm)", quantity: "100", price: "\u20AC35" },
      { name: "Circle Stickers (50mm)", quantity: "250", price: "\u20AC55" },
      { name: "Rectangle Labels", quantity: "100", price: "\u20AC30" },
      { name: "Rectangle Labels", quantity: "250", price: "\u20AC50" },
      { name: "Custom Die-Cut", quantity: "100", price: "\u20AC45" },
      { name: "Custom Die-Cut", quantity: "250", price: "\u20AC70" },
    ],
    faqs: [
      { question: "Are your stickers waterproof?", answer: "Our vinyl stickers are waterproof and durable, perfect for outdoor use. Paper stickers are best suited for indoor applications." },
      { question: "Can I get custom shaped stickers?", answer: "Yes! We offer custom die-cut stickers in any shape you need. Just send us your design and we'll cut to shape." },
      { question: "What's the minimum order?", answer: "Our minimum order for stickers is 50 units. Contact us for exact pricing on smaller quantities." },
    ],
  },
  {
    slug: "posters",
    name: "Posters",
    shortDescription: "Vibrant poster printing from A3 to A0 in stunning quality.",
    description: "High-impact poster printing in sizes from A3 to A0 and custom dimensions. Printed on premium poster paper with vivid colours that demand attention. Perfect for advertising, events, retail displays, and art prints.",
    icon: Image,
    image: "/images/posters.png",
    pricing: [
      { name: "A3 Poster", quantity: "1", price: "\u20AC8" },
      { name: "A3 Poster", quantity: "5", price: "\u20AC30" },
      { name: "A2 Poster", quantity: "1", price: "\u20AC15" },
      { name: "A2 Poster", quantity: "5", price: "\u20AC55" },
      { name: "A1 Poster", quantity: "1", price: "\u20AC25" },
      { name: "A0 Poster", quantity: "1", price: "\u20AC40" },
    ],
    faqs: [
      { question: "What paper do you print posters on?", answer: "We use 200gsm silk or gloss poster paper as standard. We also offer matt, satin, and heavy card options." },
      { question: "Can I get posters laminated?", answer: "Yes! We offer matt and gloss lamination to protect your posters and make them last longer." },
      { question: "Do you print canvas prints?", answer: "We focus on paper poster printing. For canvas prints, please contact us to discuss your requirements." },
    ],
  },
  {
    slug: "pvc-banners",
    name: "PVC Banners",
    shortDescription: "Durable outdoor PVC banners with eyelets and hemming.",
    description: "Heavy-duty PVC banners built to last outdoors. Printed on 440gsm PVC material with welded hems and brass eyelets as standard. Perfect for shopfronts, events, construction sites, and promotions. Available in any custom size.",
    icon: Flag,
    image: "/images/pvc-banners.png",
    pricing: [
      { name: "3ft x 2ft Banner", quantity: "1", price: "\u20AC35" },
      { name: "6ft x 3ft Banner", quantity: "1", price: "\u20AC55" },
      { name: "8ft x 3ft Banner", quantity: "1", price: "\u20AC70" },
      { name: "10ft x 3ft Banner", quantity: "1", price: "\u20AC85" },
      { name: "12ft x 4ft Banner", quantity: "1", price: "\u20AC110" },
      { name: "Custom Size", quantity: "Per sqm", price: "\u20AC25" },
    ],
    faqs: [
      { question: "Are PVC banners suitable for outdoor use?", answer: "Absolutely! Our PVC banners are printed on durable 440gsm material that's weatherproof and UV-resistant." },
      { question: "Do banners come with eyelets?", answer: "Yes, all our PVC banners come with welded hems and brass eyelets at no extra charge, typically every 50cm." },
      { question: "How long do PVC banners last?", answer: "With proper care, our PVC banners can last 3-5 years outdoors. They're built to withstand Irish weather!" },
    ],
  },
  {
    slug: "business-stationery",
    name: "Business Stationery",
    shortDescription: "Letterheads, compliment slips, envelopes, and NCR pads.",
    description: "Complete business stationery solutions including letterheads, compliment slips, envelopes, NCR pads, and invoice books. Maintain a professional, consistent brand across all your printed communications.",
    icon: Briefcase,
    image: "/images/business-stationery.png",
    pricing: [
      { name: "Letterheads (A4)", quantity: "250", price: "\u20AC65" },
      { name: "Letterheads (A4)", quantity: "500", price: "\u20AC95" },
      { name: "Compliment Slips", quantity: "250", price: "\u20AC45" },
      { name: "Compliment Slips", quantity: "500", price: "\u20AC65" },
      { name: "NCR Pads (A5, 2-part)", quantity: "5 pads", price: "\u20AC85" },
      { name: "Printed Envelopes", quantity: "250", price: "\u20AC75" },
    ],
    faqs: [
      { question: "Can you match my existing branding?", answer: "Yes! Send us your brand guidelines or existing stationery and we'll match colours and design precisely." },
      { question: "What are NCR pads?", answer: "NCR (No Carbon Required) pads create duplicate or triplicate copies when you write. Perfect for invoices, receipts, and delivery dockets." },
      { question: "Do you print on my own envelopes?", answer: "We can print on most standard envelope sizes. Contact us with your requirements for a quote." },
    ],
  },
  {
    slug: "restaurant-printing",
    name: "Restaurant Printing",
    shortDescription: "Menus, table talkers, loyalty cards, and takeaway materials.",
    description: "Specialised printing for the food and hospitality industry. From elegant dinner menus to takeaway menus, table talkers, loyalty cards, and branded packaging. We understand the unique printing needs of Dublin's restaurants and cafes.",
    icon: UtensilsCrossed,
    image: "/images/restaurant-printing.png",
    pricing: [
      { name: "A4 Menus (Folded)", quantity: "50", price: "\u20AC45" },
      { name: "A4 Menus (Folded)", quantity: "100", price: "\u20AC65" },
      { name: "A3 Menus (Folded)", quantity: "50", price: "\u20AC65" },
      { name: "Table Talkers", quantity: "25", price: "\u20AC35" },
      { name: "Loyalty Cards", quantity: "250", price: "\u20AC40" },
      { name: "Takeaway Menus (DL)", quantity: "250", price: "\u20AC55" },
    ],
    faqs: [
      { question: "Can menus be laminated?", answer: "Yes! We offer matt and gloss lamination for menus, making them wipeable and durable - perfect for busy restaurants." },
      { question: "How quickly can you print menus?", answer: "Standard menu printing takes 2-3 business days. Rush service is available - just ask!" },
      { question: "Do you design menus?", answer: "Yes, we offer menu design services. We can work from your content and branding to create professional menu layouts." },
    ],
  },
  {
    slug: "roller-banners",
    name: "Roller Banners",
    shortDescription: "Professional pull-up roller banners for events and exhibitions.",
    description: "Professional retractable roller banners that make a big impact at events, exhibitions, and in your premises. Easy to set up in seconds, portable, and reusable. Available in standard 850mm x 2000mm and custom sizes.",
    icon: Monitor,
    image: "/images/roller-banners.png",
    pricing: [
      { name: "Standard (850x2000mm)", quantity: "1", price: "\u20AC85" },
      { name: "Standard (850x2000mm)", quantity: "2", price: "\u20AC150" },
      { name: "Premium (850x2000mm)", quantity: "1", price: "\u20AC120" },
      { name: "Wide (1200x2000mm)", quantity: "1", price: "\u20AC140" },
      { name: "Replacement Print Only", quantity: "1", price: "\u20AC45" },
    ],
    faqs: [
      { question: "How long does it take to set up a roller banner?", answer: "Roller banners take about 30 seconds to set up. Simply pull up the banner from the base and attach the support pole." },
      { question: "Can I replace just the print?", answer: "Yes! If your stand is still in good condition, we can print a replacement graphic at a reduced cost." },
      { question: "Are roller banners suitable for outdoor use?", answer: "Roller banners are designed primarily for indoor use. For outdoor events, we recommend our PVC banners instead." },
    ],
  },
  {
    slug: "party-banners",
    name: "Party Banners",
    shortDescription: "Personalised party banners for birthdays, communions, and events.",
    description: "Make any celebration extra special with personalised party banners. Perfect for birthdays, christenings, communions, confirmations, graduations, and special occasions. Add photos, custom text, and choose your colours.",
    icon: Sparkles,
    image: "/images/party-banners.png",
    pricing: [
      { name: "Small (3ft x 1ft)", quantity: "1", price: "\u20AC20" },
      { name: "Medium (5ft x 2ft)", quantity: "1", price: "\u20AC35" },
      { name: "Large (6ft x 3ft)", quantity: "1", price: "\u20AC50" },
      { name: "Extra Large (8ft x 3ft)", quantity: "1", price: "\u20AC65" },
      { name: "Custom Size", quantity: "1", price: "From \u20AC25" },
    ],
    faqs: [
      { question: "Can I add photos to my party banner?", answer: "Absolutely! Send us your favourite photos and we'll incorporate them into your banner design." },
      { question: "How quickly can I get a party banner?", answer: "Party banners are often needed at short notice - we can usually turn them around in 24 hours or same day if needed." },
      { question: "What material are party banners printed on?", answer: "Party banners are printed on durable PVC material, suitable for both indoor and outdoor use." },
    ],
  },
  {
    slug: "booklets",
    name: "Booklets",
    shortDescription: "Saddle-stitched and perfect bound booklets and brochures.",
    description: "Professional booklet and brochure printing with saddle-stitching or perfect binding. Ideal for company profiles, product catalogues, event programmes, training manuals, and reports. Available in A4, A5, and custom sizes.",
    icon: BookOpen,
    image: "/images/booklets.png",
    pricing: [
      { name: "A5 Booklet (8 pages)", quantity: "50", price: "\u20AC95" },
      { name: "A5 Booklet (8 pages)", quantity: "100", price: "\u20AC150" },
      { name: "A5 Booklet (16 pages)", quantity: "50", price: "\u20AC140" },
      { name: "A4 Booklet (8 pages)", quantity: "50", price: "\u20AC130" },
      { name: "A4 Booklet (16 pages)", quantity: "50", price: "\u20AC195" },
    ],
    faqs: [
      { question: "What's the difference between saddle-stitch and perfect binding?", answer: "Saddle-stitching uses staples through the spine - ideal for booklets up to about 48 pages. Perfect binding uses a glued spine like a paperback book, suitable for thicker publications." },
      { question: "What's the minimum page count?", answer: "Saddle-stitched booklets need a minimum of 8 pages (including covers). Page count must be in multiples of 4." },
      { question: "Can you help with layout and design?", answer: "Yes! We offer booklet design and layout services. We can work from your content to create a professional publication." },
    ],
  },
  {
    slug: "student-services",
    name: "Student Services",
    shortDescription: "Affordable printing for students - theses, assignments, and more.",
    description: "Student-friendly printing services at affordable prices. We're just minutes from Trinity College, DIT, and Dublin's city centre colleges. Print and bind your thesis, assignments, portfolios, and presentations with our fast, reliable service.",
    icon: GraduationCap,
    image: "/images/student-services.png",
    pricing: [
      { name: "B&W Printing (A4)", quantity: "Per page", price: "\u20AC0.10" },
      { name: "Colour Printing (A4)", quantity: "Per page", price: "\u20AC0.30" },
      { name: "Thesis Binding (Soft)", quantity: "1", price: "\u20AC12" },
      { name: "Thesis Binding (Hard)", quantity: "1", price: "\u20AC25" },
      { name: "Poster Printing (A1)", quantity: "1", price: "\u20AC20" },
      { name: "Laminating (A4)", quantity: "1", price: "\u20AC3" },
    ],
    faqs: [
      { question: "Do you offer student discounts?", answer: "Our student prices are already very competitive! We pride ourselves on offering student-friendly rates. Show your student ID for the best deals." },
      { question: "Can I print from a USB drive?", answer: "Yes! Bring your files on a USB drive, email them to us, or use our online upload. We accept all common file formats." },
      { question: "Do you bind theses to college specifications?", answer: "Yes, we're very familiar with the binding requirements for Trinity, UCD, DCU, and other Dublin colleges. We'll make sure your thesis meets the specifications." },
      { question: "How quickly can I get my thesis bound?", answer: "Soft binding can be done while you wait. Hard case binding typically takes 3-5 business days." },
    ],
  },
  {
    slug: "personal-printing",
    name: "Personal Printing",
    shortDescription: "Wedding invitations, photo prints, greeting cards, and more.",
    description: "Beautiful printing for life's special moments. From wedding invitations and save-the-dates to photo prints, greeting cards, calendars, and personalised gifts. We bring your personal projects to life with care and quality.",
    icon: Heart,
    image: "/images/personal-printing.png",
    pricing: [
      { name: "Wedding Invitations", quantity: "50", price: "\u20AC75" },
      { name: "Wedding Invitations", quantity: "100", price: "\u20AC120" },
      { name: "Save the Date Cards", quantity: "50", price: "\u20AC45" },
      { name: "Photo Prints (6x4)", quantity: "25", price: "\u20AC15" },
      { name: "Photo Prints (A4)", quantity: "10", price: "\u20AC25" },
      { name: "Greeting Cards", quantity: "25", price: "\u20AC35" },
    ],
    faqs: [
      { question: "Can you help design wedding invitations?", answer: "Yes! We offer a wedding stationery design service. We'll work with you to create the perfect invitations for your big day." },
      { question: "What paper do you use for invitations?", answer: "We offer a range of premium papers including textured, linen, and pearlescent finishes. Pop into our shop to see and feel the samples." },
      { question: "Do you print matching wedding stationery sets?", answer: "Absolutely! We can print matching invitations, RSVP cards, save-the-dates, mass booklets, table plans, and thank you cards." },
    ],
  },
  {
    slug: "laminating-binding",
    name: "Laminating & Binding",
    shortDescription: "Document laminating and professional binding services.",
    description: "Protect and present your documents professionally with our laminating and binding services. From laminating single pages to binding full reports and presentations, we have the right finish for your documents.",
    icon: Layers,
    image: "/images/laminating-binding.png",
    pricing: [
      { name: "Laminating (A4)", quantity: "1", price: "\u20AC3" },
      { name: "Laminating (A3)", quantity: "1", price: "\u20AC5" },
      { name: "Comb Binding", quantity: "1", price: "\u20AC5" },
      { name: "Wire Binding", quantity: "1", price: "\u20AC7" },
      { name: "Soft Cover Binding", quantity: "1", price: "\u20AC12" },
      { name: "Hard Case Binding", quantity: "1", price: "\u20AC25" },
    ],
    faqs: [
      { question: "What types of laminating do you offer?", answer: "We offer gloss and matt laminating in sizes from business card up to A1. Gloss gives a shiny finish while matt gives a more subtle, professional look." },
      { question: "Can I get documents bound while I wait?", answer: "Comb binding and wire binding can usually be done while you wait. Soft and hard cover binding may take 1-3 business days." },
      { question: "What's the best binding for a thesis?", answer: "For final thesis submission, most colleges require hard case binding. For draft submissions, soft cover binding is a great option." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
