import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  CheckCircle, FileText, Image, Layers, Ruler, Palette,
  Type, AlertTriangle, ArrowRight, Download, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const checklistItems = [
  {
    icon: FileText,
    title: "File Format",
    items: [
      "Save your file as a high-resolution PDF (PDF/X-1a or PDF/X-4 recommended)",
      "We also accept AI, EPS, PSD, TIFF, and high-resolution JPG/PNG",
      "Avoid sending Word documents, PowerPoint, or low-resolution files",
      "Embed all fonts or convert text to outlines/curves",
    ],
  },
  {
    icon: Ruler,
    title: "Bleed & Safe Zone",
    items: [
      "Add 3mm bleed on all sides of your artwork",
      "Keep all important text and logos at least 5mm from the trim edge",
      "Bleed ensures no white edges appear after trimming",
      "If unsure, ask us and we'll check your file for free",
    ],
  },
  {
    icon: Image,
    title: "Image Resolution",
    items: [
      "All images should be at least 300 DPI (dots per inch) at actual print size",
      "Images from websites are typically only 72 DPI and will appear blurry",
      "Check resolution in Photoshop: Image > Image Size",
      "Vector graphics (AI, EPS, SVG) can be scaled without quality loss",
    ],
  },
  {
    icon: Palette,
    title: "Colour Mode",
    items: [
      "Set your document colour mode to CMYK (not RGB)",
      "RGB colours are for screens and will shift when printed",
      "Convert all images and swatches to CMYK before saving",
      "Note: Pantone/spot colours should be specified separately",
    ],
  },
  {
    icon: Type,
    title: "Text & Fonts",
    items: [
      "Minimum font size: 6pt for body text, 8pt recommended",
      "Embed all fonts in your PDF or convert to outlines",
      "Avoid using very thin fonts — they may not reproduce well",
      "Check for spelling and grammar before sending",
    ],
  },
  {
    icon: Layers,
    title: "Layers & Transparency",
    items: [
      "Flatten all layers before exporting to PDF",
      "Ensure transparency effects are rasterized correctly",
      "Remove any hidden layers that shouldn't be printed",
      "Check that no elements are set to 'overprint' unintentionally",
    ],
  },
];

const commonMistakes = [
  "Using RGB instead of CMYK — colours will look different when printed",
  "No bleed added — white edges may appear after trimming",
  "Low-resolution images (under 300 DPI) — prints will be blurry or pixelated",
  "Text too close to the edge — may be cut off during trimming",
  "Fonts not embedded — text may reflow or display incorrectly",
  "Wrong file size — always check your document dimensions match the product ordered",
];

const fileSpecs = [
  { product: "Business Cards", size: "91mm x 61mm (with 3mm bleed)", format: "PDF, AI" },
  { product: "A5 Flyers", size: "154mm x 216mm (with 3mm bleed)", format: "PDF, AI" },
  { product: "A4 Flyers", size: "216mm x 303mm (with 3mm bleed)", format: "PDF, AI" },
  { product: "A3 Posters", size: "303mm x 426mm (with 3mm bleed)", format: "PDF, AI, TIFF" },
  { product: "A2 Posters", size: "426mm x 600mm (with 3mm bleed)", format: "PDF, AI, TIFF" },
  { product: "A1 Posters", size: "600mm x 846mm (with 3mm bleed)", format: "PDF, AI, TIFF" },
  { product: "DL Leaflets", size: "105mm x 216mm (with 3mm bleed)", format: "PDF, AI" },
  { product: "Roller Banners", size: "856mm x 2056mm (with 3mm bleed)", format: "PDF, AI, TIFF" },
  { product: "PVC Banners", size: "Custom — contact us", format: "PDF, AI, TIFF" },
];

export default function PrintReadyChecklist() {
  useEffect(() => {
    document.title = "Print Ready File Checklist | Copyprint.ie Dublin";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "How to prepare print-ready files for Copyprint.ie. Checklist covering file format, bleed, resolution, colour mode, fonts, and common mistakes to avoid.");

    return () => { meta?.remove(); };
  }, []);

  return (
    <div>
      <section className="relative py-16 md:py-24 bg-[#32373c]">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-md bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white" data-testid="text-checklist-title">
                Print Ready Checklist
              </h1>
            </div>
            <p className="text-white/70 text-lg max-w-3xl leading-relaxed" data-testid="text-checklist-subtitle">
              Follow this checklist to make sure your artwork is print-ready. Properly prepared files mean faster turnaround, better quality, and no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checklistItems.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                  data-testid={`card-checklist-${idx}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3" data-testid="text-mistakes-title">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Common Mistakes to Avoid
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <ul className="space-y-3">
                {commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed" data-testid={`text-mistake-${i}`}>
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3" data-testid="text-specs-title">
              <Ruler className="w-6 h-6 text-primary" />
              File Size Specifications
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Document Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Accepted Formats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileSpecs.map((spec, i) => (
                      <tr key={i} className="border-b border-gray-100" data-testid={`row-spec-${i}`}>
                        <td className="py-3 px-4 font-medium text-gray-800">{spec.product}</td>
                        <td className="py-3 px-4 text-gray-600">{spec.size}</td>
                        <td className="py-3 px-4 text-gray-600">{spec.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-help-title">
              Not Sure If Your File Is Ready?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              No worries — send us your file and we'll check it for free. We'll let you know if anything needs adjusting before we print.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="mailto:info@copyprint.ie" data-testid="link-email-artwork">
                <Button size="lg" className="gap-2">
                  <Mail className="w-4 h-4" /> Email Your File
                </Button>
              </a>
              <Link href="/shop" data-testid="link-shop-from-checklist">
                <Button size="lg" variant="secondary" className="gap-2">
                  <ArrowRight className="w-4 h-4" /> Shop Now
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Email artwork to <a href="mailto:info@copyprint.ie" className="text-primary">info@copyprint.ie</a> or call us on <a href="tel:016774234" className="text-primary">01 677 4234</a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
