import bc1 from "@assets/heroes/business-cards-1.png";
import bc2 from "@assets/heroes/business-cards-2.png";
import bc3 from "@assets/heroes/business-cards-3.png";
import fl1 from "@assets/heroes/flyers-and-leaflets-1.png";
import fl2 from "@assets/heroes/flyers-and-leaflets-2.png";
import fl3 from "@assets/heroes/flyers-and-leaflets-3.png";
import po1 from "@assets/heroes/posters-1.png";
import po2 from "@assets/heroes/posters-2.png";
import po3 from "@assets/heroes/posters-3.png";
import rb1 from "@assets/heroes/roller-banners-1.png";
import rb2 from "@assets/heroes/roller-banners-2.png";
import rb3 from "@assets/heroes/roller-banners-3.png";
import bs1 from "@assets/heroes/business-stationery-1.png";
import bs2 from "@assets/heroes/business-stationery-2.png";
import bs3 from "@assets/heroes/business-stationery-3.png";
import rp1 from "@assets/heroes/restaurant-printing-1.png";
import rp2 from "@assets/heroes/restaurant-printing-2.png";
import rp3 from "@assets/heroes/restaurant-printing-3.png";

export const serviceHeroes: Record<string, string[]> = {
  "business-cards": [bc1, bc2, bc3],
  "flyers-and-leaflets": [fl1, fl2, fl3],
  "posters": [po1, po2, po3],
  "roller-banners": [rb1, rb2, rb3],
  "business-stationery": [bs1, bs2, bs3],
  "restaurant-printing": [rp1, rp2, rp3],
};

export function getServiceHero(serviceSlug: string, seed: string): string {
  const heroes = serviceHeroes[serviceSlug];
  if (!heroes) return "";
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  h = (h >>> 0) % heroes.length;
  return heroes[h];
}
