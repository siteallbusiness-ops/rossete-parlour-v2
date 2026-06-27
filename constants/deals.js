import { MENU_ITEMS } from "@/constants/menu";

/** @typedef {{ id: string; menuItemId: string; dealPrice: number; badge: string; description?: string }} DealConfig */

/** @type {DealConfig[]} */
export const DEALS = [
  {
    id: "deal-planet-shakes-l",
    menuItemId: "planet-shakes-l",
    dealPrice: 5.49,
    badge: "Save 21%",
    description: "Large planet shake at a sweet price",
  },
  {
    id: "deal-kinder-bueno-brownie",
    menuItemId: "kinder-bueno-brownie",
    dealPrice: 3.99,
    badge: "Save 20%",
    description: "Our best-selling brownie, on offer today",
  },
  {
    id: "deal-ferrero-pancakes",
    menuItemId: "ferrero-fantasy-american-pancakes",
    dealPrice: 6.49,
    badge: "Save 19%",
    description: "Stack of Ferrero fantasy pancakes",
  },
  {
    id: "deal-planet-special",
    menuItemId: "planet-special",
    dealPrice: 7.49,
    badge: "Save 17%",
    description: "Signature waffle loaded with toppings",
  },
  {
    id: "deal-brownie-kunafa",
    menuItemId: "brownie-kunafa",
    dealPrice: 6.49,
    badge: "Save 19%",
    description: "Brownie kunafa sundae special",
  },
  {
    id: "deal-duluxe-donuts",
    menuItemId: "duluxe-donuts",
    dealPrice: 5.49,
    badge: "Save 21%",
    description: "Box of deluxe donuts to share",
  },
  {
    id: "deal-mango-passion",
    menuItemId: "mango-passion",
    dealPrice: 3.99,
    badge: "Save 20%",
    description: "Refreshing mango passion mocktail",
  },
  {
    id: "deal-3-scoops-gelato",
    menuItemId: "3-scoops-gelato",
    dealPrice: 3.99,
    badge: "Save 20%",
    description: "Three scoops of gelato — pick your flavours",
  },
  {
    id: "deal-oreo-cheesecake",
    menuItemId: "oreo-cheesecake",
    dealPrice: 4.79,
    badge: "Save 20%",
    description: "Creamy Oreo cheesecake slice",
  },
];

export function getDealsWithItems() {
  return DEALS.map((deal) => {
    const menuItem = MENU_ITEMS.find((item) => item.id === deal.menuItemId);
    if (!menuItem) return null;

    return {
      ...menuItem,
      dealId: deal.id,
      originalPrice: menuItem.price,
      price: deal.dealPrice,
      dealBadge: deal.badge,
      dealDescription: deal.description,
      isDeal: true,
    };
  }).filter(Boolean);
}
