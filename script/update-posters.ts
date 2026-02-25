import { getUncachableStripeClient } from "../server/stripeClient";

async function updatePosters() {
  const stripe = await getUncachableStripeClient();

  const products = await stripe.products.search({ query: "name:'Posters'" });
  if (products.data.length === 0) {
    console.log("Posters product not found");
    return;
  }

  const product = products.data[0];
  console.log(`Updating product: ${product.id}`);

  await stripe.products.update(product.id, {
    description: "Vibrant poster printing on 180g Gloss or Matt finish. 2-3 day turnaround. Order before 3pm for Same Day Collection. Local or Nationwide Delivery. A0 enquiries contact us: 01 677 4234. Minimum order €20.",
    metadata: {
      category: "print",
      slug: "posters",
      options_size: "A2,A1,A0",
      options_qty: "1,2,3,4,5,6,7,8,9,10",
      options_finish: "Gloss,Matt",
    },
  });

  console.log("Updated metadata and description");

  const existingPrices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });

  console.log("Archiving old prices...");
  for (const price of existingPrices.data) {
    await stripe.prices.update(price.id, { active: false });
    console.log(`  Archived: ${price.nickname}`);
  }

  const sizes: { name: string; base: number }[] = [
    { name: "A2", base: 1200 },
    { name: "A1", base: 2500 },
    { name: "A0", base: 6500 },
  ];

  const finishes = ["Gloss", "Matt"];
  const qtys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  console.log("Creating new prices...");
  for (const size of sizes) {
    for (const finish of finishes) {
      for (const qty of qtys) {
        let unitAmount = size.base * qty;
        if (qty >= 5) unitAmount = Math.round(unitAmount * 0.9);
        if (qty >= 10) unitAmount = Math.round(size.base * qty * 0.85);

        const nickname = `${qty}x ${size.name} ${finish}`;
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: unitAmount,
          currency: "eur",
          nickname,
          metadata: { qty: String(qty), size: size.name, finish },
        });
        console.log(`  Created: ${price.id} - ${nickname} (€${(unitAmount / 100).toFixed(2)})`);
      }
    }
  }

  console.log("\nDone!");
}

updatePosters().catch(console.error);
