import { GALLERY_ITEMS } from "./gallery";

export const LANDING_IMAGES = {
  hero: {
    src: "/images/hero/milkshakes.jpg",
    alt: "Chocolate milkshake topped with whipped cream, chocolate drizzle and an Oreo cookie",
    width: 682,
    height: 1024,
  },
  heroFloats: [
    {
      src: "/images/hero/brownies.jpg",
      label: "Brownies",
      alt: "Warm chocolate brownie with vanilla ice cream and chocolate sauce",
      width: 1024,
      height: 682,
      placement: "topRight",
    },
    {
      src: "/images/hero/waffles.jpg",
      label: "Waffles",
      alt: "Belgian waffles topped with cream, fresh blueberries and powdered sugar",
      width: 1024,
      height: 682,
      placement: "bottomLeft",
    },
    {
      src: "/images/hero/cakes.jpg",
      label: "Cakes",
      alt: "Rich chocolate celebration cake with cherries and chocolate sprinkles",
      width: 1024,
      height: 821,
      placement: "bottomRight",
    },
  ],
  about: {
    src: "/images/about.jpg",
    alt: "Warm and welcoming restaurant interior at Rossete Parlour",
    width: 1200,
    height: 800,
  },
  gallery: GALLERY_ITEMS,
};
