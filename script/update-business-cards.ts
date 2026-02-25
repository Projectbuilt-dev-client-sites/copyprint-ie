import { getUncachableStripeClient } from "../server/stripeClient";

async function updateBusinessCards() {
  const stripe = await getUncachableStripeClient();

  const products = await stripe.products.search({ query: "name:'Business Cards'" });
  if (products.data.length === 0) {
    console.log("Business Cards product not found");
    return;
  }

  const product = products.data[0];
  console.log(`Updating product: ${product.id}`);

  await stripe.products.update(product.id, {
    metadata: {
      category: "print",
      slug: "business-cards",
      options_print: "Single Sided,Double Sided",
      options_qty: "100,250,500,1000",
      options_finish: "No Lamination,Lamination",
    },
  });

  console.log("Updated metadata - removed options_size, added options_finish");

  const existingPrices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
  
  const hasFinishPrices = existingPrices.data.some(p => p.metadata?.finish);
  
  if (!hasFinishPrices) {
    console.log("Archiving old prices without finish metadata...");
    for (const price of existingPrices.data) {
      await stripe.prices.update(price.id, { active: false });
      console.log(`  Archived: ${price.nickname}`);
    }

    const newPrices = [
      { nickname: "100 Single Sided No Lamination", unit_amount: 2500, metadata: { qty: "100", print: "Single Sided", finish: "No Lamination" } },
      { nickname: "100 Double Sided No Lamination", unit_amount: 3500, metadata: { qty: "100", print: "Double Sided", finish: "No Lamination" } },
      { nickname: "250 Single Sided No Lamination", unit_amount: 3500, metadata: { qty: "250", print: "Single Sided", finish: "No Lamination" } },
      { nickname: "250 Double Sided No Lamination", unit_amount: 4500, metadata: { qty: "250", print: "Double Sided", finish: "No Lamination" } },
      { nickname: "500 Single Sided No Lamination", unit_amount: 5500, metadata: { qty: "500", print: "Single Sided", finish: "No Lamination" } },
      { nickname: "500 Double Sided No Lamination", unit_amount: 7000, metadata: { qty: "500", print: "Double Sided", finish: "No Lamination" } },
      { nickname: "1000 Single Sided No Lamination", unit_amount: 7500, metadata: { qty: "1000", print: "Single Sided", finish: "No Lamination" } },
      { nickname: "1000 Double Sided No Lamination", unit_amount: 12000, metadata: { qty: "1000", print: "Double Sided", finish: "No Lamination" } },
      { nickname: "100 Single Sided Lamination", unit_amount: 3500, metadata: { qty: "100", print: "Single Sided", finish: "Lamination" } },
      { nickname: "100 Double Sided Lamination", unit_amount: 4500, metadata: { qty: "100", print: "Double Sided", finish: "Lamination" } },
      { nickname: "250 Single Sided Lamination", unit_amount: 5000, metadata: { qty: "250", print: "Single Sided", finish: "Lamination" } },
      { nickname: "250 Double Sided Lamination", unit_amount: 6500, metadata: { qty: "250", print: "Double Sided", finish: "Lamination" } },
      { nickname: "500 Single Sided Lamination", unit_amount: 7500, metadata: { qty: "500", print: "Single Sided", finish: "Lamination" } },
      { nickname: "500 Double Sided Lamination", unit_amount: 9500, metadata: { qty: "500", print: "Double Sided", finish: "Lamination" } },
      { nickname: "1000 Single Sided Lamination", unit_amount: 10000, metadata: { qty: "1000", print: "Single Sided", finish: "Lamination" } },
      { nickname: "1000 Double Sided Lamination", unit_amount: 14500, metadata: { qty: "1000", print: "Double Sided", finish: "Lamination" } },
    ];

    console.log("Creating new prices with finish options...");
    for (const p of newPrices) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: p.unit_amount,
        currency: "eur",
        nickname: p.nickname,
        metadata: p.metadata,
      });
      console.log(`  Created: ${price.id} - ${p.nickname} (€${(p.unit_amount / 100).toFixed(2)})`);
    }
  } else {
    console.log("Finish prices already exist, skipping price creation");
  }

  console.log("\nDone!");
}

updateBusinessCards().catch(console.error);
