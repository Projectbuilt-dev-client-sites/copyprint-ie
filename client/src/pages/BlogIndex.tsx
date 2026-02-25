import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { blogPosts } from "@/lib/blog-posts";
import { Calendar, ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BlogIndex() {
  useEffect(() => {
    document.title = "Blog - Printing Tips & Guides | CopyPrint Dublin";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Read our latest articles on printing tips, design guides, and industry insights. Expert advice from CopyPrint Dublin on business cards, flyers, banners, and more."
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      "content",
      "printing blog dublin, print tips, business card design guide, flyer design tips, printing guides ireland, copyprint blog"
    );

    return () => {
      metaDesc?.remove();
      metaKeywords?.remove();
    };
  }, []);

  return (
    <div>
      <section className="py-16 md:py-24 bg-[#32373c]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-blog-title">
              Blog
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto" data-testid="text-blog-subtitle">
              Printing tips, design guides, and expert advice from Dublin's trusted print shop.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} data-testid={`card-blog-${post.slug}`}>
                  <div className="group cursor-pointer rounded-md overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:border-primary/50 hover:shadow-lg h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.date} data-testid={`text-blog-date-${post.slug}`}>
                          {new Date(post.date).toLocaleDateString("en-IE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h2 className="text-gray-900 font-semibold text-base mb-2 group-hover:text-primary transition-colors" data-testid={`text-blog-title-${post.slug}`}>
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4" data-testid={`text-blog-excerpt-${post.slug}`}>
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}