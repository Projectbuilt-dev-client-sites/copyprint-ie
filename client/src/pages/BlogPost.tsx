import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { blogPosts } from "@/lib/blog-posts";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import NotFound from "./not-found";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = blogPosts.find((p) => p.slug === slug);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  useEffect(() => {
    if (!post) return;

    document.title = post.metaTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", post.metaDescription);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", post.keywords.join(", "));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.metaDescription,
      "image": `https://copyprint.ie${post.featuredImage}`,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Organization",
        "name": "CopyPrint Dublin",
        "url": "https://copyprint.ie",
      },
      "publisher": {
        "@type": "Organization",
        "name": "CopyPrint Dublin",
        "url": "https://copyprint.ie",
        "logo": {
          "@type": "ImageObject",
          "url": "https://copyprint.ie/images/logo.webp",
        },
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://copyprint.ie/blog/${post.slug}`,
      },
      "keywords": post.keywords.join(", "),
    };

    let scriptTag = document.querySelector("script[data-blog-jsonld]");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-blog-jsonld", "true");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    return () => {
      metaDesc?.remove();
      metaKeywords?.remove();
      scriptTag?.remove();
    };
  }, [post]);

  if (!post) return <NotFound />;

  return (
    <div>
      <section className="relative py-20 md:py-28 overflow-hidden" data-testid="section-post-hero">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative max-w-4xl mx-auto px-4">
          <Link href="/blog" data-testid="link-back-blog">
            <span className="inline-flex items-center gap-1.5 text-white/60 text-sm mb-8 cursor-pointer transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-1.5 text-white/50 text-sm mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.date} data-testid="text-post-date">
                {new Date(post.date).toLocaleDateString("en-IE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight" data-testid="text-post-title">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-10">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full rounded-md shadow-md"
                data-testid="img-post-featured"
              />
            </div>

            <article
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600 prose-strong:text-gray-800 prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
              data-testid="content-post-body"
            />
          </motion.div>

          <div className="mt-14 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} data-testid="link-prev-post">
                  <span className="inline-flex items-center gap-1.5 text-gray-500 text-sm cursor-pointer transition-colors hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4" />
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} data-testid="link-next-post">
                  <span className="inline-flex items-center gap-1.5 text-gray-500 text-sm cursor-pointer transition-colors hover:text-gray-900">
                    {nextPost.title}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}