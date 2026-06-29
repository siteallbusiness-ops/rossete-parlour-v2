export const STORE_TIMEZONE = "Europe/London";

export const SITE = {
  name: "Rossete Parlour",
  shortName: "ROSSETE\nPARLOUR",
  logoTagline: "DESSERTS & GIFTING",
  tagline: "The Home Of Great Food...",
  description:
    "Rossete Parlour — handcrafted desserts for delivery and collection in Plymouth. Order online — no dine-in, just great food brought to you or ready to pick up.",
  url: "https://rosseteparlour.com",
  locale: "en_GB",
  email: "hello@rosseteparlour.com",
  phone: "07389 169788",
  address: {
    street: "143 King St, Stonehouse",
    city: "Plymouth",
    state: "",
    zip: "PL1 5JE",
    country: "United Kingdom",
  },
  fullAddress: "143 King St, Stonehouse, Plymouth PL1 5JE",
  orderAddress: "143 King St, Stonehouse, Plymouth PL1 5JE",
  estimatedTime: "35 min",
  collectionTime: "35 min approx",
  poweredBy: "www.grafterr.com",
  aboutText:
    "At Rossete Parlour, we prepare premium desserts and treats fresh to order for delivery and collection across Plymouth. We are delivery and collection only — there is no dine-in — so every order is made with care and sent to your door or ready for pickup from our King Street kitchen. Browse the menu, order online in a few taps, and we will keep it sweet.",
  contactTagline: "Keeping it sweet.",
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "WhatsApp", href: "https://whatsapp.com", icon: "whatsapp" },
  { label: "TripAdvisor", href: "#", icon: "tripadvisor" },
];

export const OPENING_HOURS = {
  weekday: "Mon - Thur & Sun: 16:00 - 22:00",
  weekend: "Fri - Sat: 16:00 - 23:30",
};

export const DELIVERY_HOURS = {
  weekday: "Mon - Thur & Sun: 16:00 - 22:00",
  weekend: "Fri - Sat: 16:00 - 23:30",
};

const STANDARD_HOURS = "16:00 - 22:00";
const LATE_HOURS = "16:00 - 23:30";

export const WORKING_HOURS = {
  delivery: [
    { day: "Sunday", hours: STANDARD_HOURS },
    { day: "Monday", hours: STANDARD_HOURS },
    { day: "Tuesday", hours: STANDARD_HOURS },
    { day: "Wednesday", hours: STANDARD_HOURS },
    { day: "Thursday", hours: STANDARD_HOURS },
    { day: "Friday", hours: LATE_HOURS },
    { day: "Saturday", hours: LATE_HOURS },
  ],
  collection: [
    { day: "Sunday", hours: STANDARD_HOURS },
    { day: "Monday", hours: STANDARD_HOURS },
    { day: "Tuesday", hours: STANDARD_HOURS },
    { day: "Wednesday", hours: STANDARD_HOURS },
    { day: "Thursday", hours: STANDARD_HOURS },
    { day: "Friday", hours: LATE_HOURS },
    { day: "Saturday", hours: LATE_HOURS },
  ],
};
