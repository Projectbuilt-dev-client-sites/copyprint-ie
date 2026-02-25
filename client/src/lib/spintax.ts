function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

export function spin(template: string, seed: string): string {
  const rng = seededRandom(seed);
  return template.replace(/\{([^{}]+)\}/g, (_, options) => {
    const parts = options.split("|");
    return parts[Math.floor(rng() * parts.length)].trim();
  });
}

export interface LocalPageContent {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whyUs: string;
  delivery: string;
  cta: string;
  features: string[];
}

export function generateLocalContent(area: string, service: string, seed: string): LocalPageContent {
  const title = spin(
    `${service} in ${area} | {Copyprint.ie|Copyprint Dublin|Copyprint.ie Dublin}`,
    seed + "title"
  );

  const metaDescription = spin(
    `{Professional|High quality|Premium|Top quality} ${service.toLowerCase()} printing {for businesses and individuals|for local businesses|for companies and organisations} in ${area}, Dublin. {Same day service available|Fast turnaround guaranteed|Quick production times}. {Est. 1982|Over 40 years experience|Trusted since 1982}.`,
    seed + "meta"
  );

  const h1 = spin(
    `{Professional|Premium|Quality|Expert|Top Quality} ${service} {Printing|Printing Services|Print Solutions} in ${area}`,
    seed + "h1"
  );

  const intro = spin(
    `{Looking for|Need|Searching for|Want} {high quality|professional|premium|top-notch|first-class} ${service.toLowerCase()} in ${area}? {Copyprint.ie is your local Dublin printing partner|Copyprint.ie has been serving Dublin since 1982|We are Dublin's most trusted print shop|Copyprint.ie delivers outstanding results every time}. {Based on Dame Street in Dublin 2, we serve|From our central Dame Street location, we supply|Operating from the heart of Dublin, we provide|Our Dame St shop proudly serves} {customers throughout|clients across|businesses and individuals in|the community of} ${area} {with fast, reliable printing services|with exceptional print quality|with unbeatable value and service|delivering prints that make an impression}.`,
    seed + "intro"
  );

  const whyUs = spin(
    `{When it comes to|For} ${service.toLowerCase()} in ${area}, {Copyprint.ie stands apart|nobody does it better than Copyprint.ie|Copyprint.ie is the smart choice|we set the standard}. {Our state-of-the-art equipment produces|We use the latest technology to deliver|Our modern printing equipment ensures|Every job benefits from our advanced} {stunning|crisp|vibrant|sharp|eye-catching} results on {premium|high-quality|top-grade|superior} {stock|materials|paper|card stock}. {Whether you are a small business owner|Whether you run a local company|From startups to established firms|No matter the size of your business}, {a sole trader|a professional|an entrepreneur|a freelancer}, or {an individual|a private customer|looking for personal prints|ordering for a special occasion}, {we tailor every order to your exact specifications|we handle every job with care and precision|your order gets our full attention|we treat every print job as if it were our own}.`,
    seed + "why"
  );

  const delivery = spin(
    `{We offer convenient delivery options|Getting your prints is easy|Collection and delivery made simple|Multiple ways to receive your order} for ${area} customers. {Choose same-day click and collect from our Dame Street shop|Pop into our Dame St location for same-day collection|Visit us on Dame Street for instant pickup|Same-day collection available at our Dublin 2 shop}, or {opt for delivery straight to your door|we can deliver directly to ${area}|have your order shipped to your ${area} address|get your prints delivered to you in ${area}}. {We also offer nationwide and international shipping|Nationwide delivery is also available|We ship across Ireland and beyond|Ireland-wide and international delivery on request}.`,
    seed + "delivery"
  );

  const cta = spin(
    `{Ready to order|Get started today|Place your order now|Order your} ${service.toLowerCase()} {in ${area}|for your ${area} business|from Dublin's best print shop|with Copyprint.ie}? {Contact us today|Get in touch now|Reach out to our team|Call or email us} {for a free quote|to discuss your requirements|and we will get you sorted|for fast, friendly service}. {Call 01 677 4234 or WhatsApp us|Ring 01 677 4234 or message us on WhatsApp|Phone 01 677 4234 or drop us a WhatsApp|Get in touch on 01 677 4234 or via WhatsApp}.`,
    seed + "cta"
  );

  const allFeatures = [
    `{Premium|High quality|Professional grade|Top quality} ${service.toLowerCase()} printing`,
    `{Same day|Express|Rapid|Quick turnaround} {service|production|printing} available`,
    `{Free delivery to|Fast shipping to|Delivery available for|We deliver to} ${area}`,
    `{Competitive|Affordable|Great value|Low} prices {guaranteed|every time|always|on all orders}`,
    `{Established 1982|Over 40 years experience|Trusted since 1982|40+ years in business}`,
    `{Friendly expert|Professional|Dedicated|Experienced} {advice|support|guidance|help} {included|on hand|available|always}`,
    `{Eco-friendly|Sustainable|Green|Environmentally conscious} {options|printing|materials} available`,
    `{Multiple|Various|Wide range of|Extensive} {finishes|sizes|options|formats} {to choose from|available|in stock}`,
  ];

  const rng = seededRandom(seed + "features");
  const features = allFeatures
    .sort(() => rng() - 0.5)
    .slice(0, 6)
    .map(f => spin(f, seed + f));

  return { title, metaDescription, h1, intro, whyUs, delivery, cta, features };
}
