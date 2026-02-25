// Seed Stripe products for Copyprint.ie shop
// Run with: npx tsx script/seed-products.ts

import { getUncachableStripeClient } from "../server/stripeClient";

interface ProductDef {
  name: string;
  description: string;
  metadata: Record<string, string>;
  prices: { nickname: string; unit_amount: number; metadata: Record<string, string> }[];
}

const products: ProductDef[] = [
  {
    name: "Business Cards",
    description: "Professional business cards printed on premium 400gsm card stock. Same Day Click & Collect available. Single or double sided.",
    metadata: {
      category: "print",
      slug: "business-cards",
      options_print: "Single Sided,Double Sided",
      options_qty: "100,250,500,1000",
      options_size: "Standard (85x55mm),Square (65x65mm),Mini (70x28mm)",
    },
    prices: [
      { nickname: "100 Single Sided", unit_amount: 2500, metadata: { qty: "100", print: "Single Sided" } },
      { nickname: "100 Double Sided", unit_amount: 3500, metadata: { qty: "100", print: "Double Sided" } },
      { nickname: "250 Single Sided", unit_amount: 3500, metadata: { qty: "250", print: "Single Sided" } },
      { nickname: "250 Double Sided", unit_amount: 4500, metadata: { qty: "250", print: "Double Sided" } },
      { nickname: "500 Single Sided", unit_amount: 5500, metadata: { qty: "500", print: "Single Sided" } },
      { nickname: "500 Double Sided", unit_amount: 7000, metadata: { qty: "500", print: "Double Sided" } },
      { nickname: "1000 Single Sided", unit_amount: 7500, metadata: { qty: "1000", print: "Single Sided" } },
      { nickname: "1000 Double Sided", unit_amount: 12000, metadata: { qty: "1000", print: "Double Sided" } },
    ],
  },
  {
    name: "Flyers & Leaflets",
    description: "High-quality flyers and leaflets on 170gsm gloss or silk paper. Same Day Click & Collect available. Multiple sizes from A6 to A4.",
    metadata: {
      category: "print",
      slug: "flyers-leaflets",
      options_print: "Single Sided,Double Sided",
      options_qty: "100,250,500,1000",
      options_size: "A6,DL,A5,A4",
    },
    prices: [
      { nickname: "100 A6 Single", unit_amount: 3500, metadata: { qty: "100", size: "A6", print: "Single Sided" } },
      { nickname: "100 A6 Double", unit_amount: 4500, metadata: { qty: "100", size: "A6", print: "Double Sided" } },
      { nickname: "250 A5 Single", unit_amount: 5500, metadata: { qty: "250", size: "A5", print: "Single Sided" } },
      { nickname: "250 A5 Double", unit_amount: 7000, metadata: { qty: "250", size: "A5", print: "Double Sided" } },
      { nickname: "500 A5 Single", unit_amount: 8500, metadata: { qty: "500", size: "A5", print: "Single Sided" } },
      { nickname: "500 A5 Double", unit_amount: 11000, metadata: { qty: "500", size: "A5", print: "Double Sided" } },
      { nickname: "500 A4 Single", unit_amount: 12000, metadata: { qty: "500", size: "A4", print: "Single Sided" } },
      { nickname: "500 A4 Double", unit_amount: 15000, metadata: { qty: "500", size: "A4", print: "Double Sided" } },
      { nickname: "1000 A5 Single", unit_amount: 12000, metadata: { qty: "1000", size: "A5", print: "Single Sided" } },
      { nickname: "1000 A5 Double", unit_amount: 16000, metadata: { qty: "1000", size: "A5", print: "Double Sided" } },
      { nickname: "1000 A4 Single", unit_amount: 22000, metadata: { qty: "1000", size: "A4", print: "Single Sided" } },
      { nickname: "1000 A4 Double", unit_amount: 39500, metadata: { qty: "1000", size: "A4", print: "Double Sided" } },
    ],
  },
  {
    name: "Posters",
    description: "Vibrant poster printing on 200gsm satin or gloss paper. Same Day Click & Collect available. Sizes from A4 to A0.",
    metadata: {
      category: "print",
      slug: "posters",
      options_qty: "1,2,5,10,25,50",
      options_size: "A4,A3,A2,A1,A0",
    },
    prices: [
      { nickname: "1x A4 Poster", unit_amount: 1200, metadata: { qty: "1", size: "A4" } },
      { nickname: "1x A3 Poster", unit_amount: 1500, metadata: { qty: "1", size: "A3" } },
      { nickname: "1x A2 Poster", unit_amount: 2500, metadata: { qty: "1", size: "A2" } },
      { nickname: "1x A1 Poster", unit_amount: 4000, metadata: { qty: "1", size: "A1" } },
      { nickname: "1x A0 Poster", unit_amount: 6500, metadata: { qty: "1", size: "A0" } },
      { nickname: "5x A3 Poster", unit_amount: 5000, metadata: { qty: "5", size: "A3" } },
      { nickname: "5x A2 Poster", unit_amount: 9500, metadata: { qty: "5", size: "A2" } },
      { nickname: "10x A3 Poster", unit_amount: 8000, metadata: { qty: "10", size: "A3" } },
      { nickname: "10x A2 Poster", unit_amount: 15000, metadata: { qty: "10", size: "A2" } },
      { nickname: "25x A3 Poster", unit_amount: 17500, metadata: { qty: "25", size: "A3" } },
    ],
  },
];

async function seedProducts() {
  const stripe = await getUncachableStripeClient();

  for (const productDef of products) {
    const existing = await stripe.products.search({ query: `name:'${productDef.name}'` });
    if (existing.data.length > 0) {
      console.log(`Product "${productDef.name}" already exists (${existing.data[0].id}), skipping`);
      continue;
    }

    console.log(`Creating product: ${productDef.name}`);
    const product = await stripe.products.create({
      name: productDef.name,
      description: productDef.description,
      metadata: productDef.metadata,
    });
    console.log(`  Created product: ${product.id}`);

    for (const priceDef of productDef.prices) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: priceDef.unit_amount,
        currency: "eur",
        nickname: priceDef.nickname,
        metadata: priceDef.metadata,
      });
      console.log(`  Created price: ${price.id} - ${priceDef.nickname} (€${(priceDef.unit_amount / 100).toFixed(2)})`);
    }
  }

  console.log("\nDone! Products and prices created in Stripe.");
}

seedProducts().catch(console.error);
