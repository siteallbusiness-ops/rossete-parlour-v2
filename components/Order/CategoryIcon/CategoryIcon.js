const DEFAULT = "default";

const ICONS = {
  "cold-drinks": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 3h8l-1 14H9L8 3z" strokeLinejoin="round" />
      <path d="M9 7h6M10 11h4" strokeLinecap="round" />
      <circle cx="10" cy="15" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14" cy="13" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  "hot-drinks": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 8h10v9a2 2 0 01-2 2H8a2 2 0 01-2-2V8z" strokeLinejoin="round" />
      <path d="M16 10h2a2 2 0 012 2v1a2 2 0 01-2 2h-2" strokeLinecap="round" />
      <path d="M8 5c0-1.5 1-2.5 2-2.5s2 1 2 2.5" strokeLinecap="round" />
    </svg>
  ),
  milkshakes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9 4h6l-1.5 14H10.5L9 4z" strokeLinejoin="round" />
      <path d="M12 4V2M9 4h6" strokeLinecap="round" />
      <path d="M14 2l2 2" strokeLinecap="round" />
      <path d="M8 8h8" strokeLinecap="round" opacity="0.45" />
    </svg>
  ),
  mocktails: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 20h8" strokeLinecap="round" />
      <path d="M12 20V10" strokeLinecap="round" />
      <path d="M6 4l6 6 6-6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="15" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  "american-pancakes": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <ellipse cx="12" cy="14" rx="8" ry="3" />
      <ellipse cx="12" cy="11" rx="8" ry="3" />
      <ellipse cx="12" cy="8" rx="8" ry="3" />
      <path d="M15 7l1-2M9 7l-1-2" strokeLinecap="round" />
    </svg>
  ),
  brownies: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 9h14v10a1 1 0 01-1 1H6a1 1 0 01-1-1V9z" strokeLinejoin="round" />
      <path d="M5 12h14" strokeLinecap="round" opacity="0.35" />
      <path d="M9 12v7M15 12v7" strokeLinecap="round" opacity="0.25" />
      <circle cx="9" cy="14.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="17" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13.5" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  ),
  cakes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 14h16v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" strokeLinejoin="round" />
      <path d="M6 14V10a6 6 0 0112 0v4" strokeLinejoin="round" />
      <path d="M12 4v2" strokeLinecap="round" />
      <circle cx="12" cy="3" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  "cookie-doughs": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="14" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  crepes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 14c2-4 6-6 8-6s6 2 8 6" strokeLinecap="round" />
      <path d="M6 14h12" strokeLinecap="round" />
      <path d="M8 17h8" strokeLinecap="round" opacity="0.6" />
      <path d="M16 12l2-1" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  donuts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" strokeLinecap="round" opacity="0.35" />
    </svg>
  ),
  gelato: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3c-2 3-4 5-4 8a4 4 0 008 0c0-3-2-5-4-8z" strokeLinejoin="round" />
      <path d="M8 18h8l-1 3H9l-1-3z" strokeLinejoin="round" />
    </svg>
  ),
  milkcake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 10h14v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9z" strokeLinejoin="round" />
      <path d="M7 10V8a5 5 0 0110 0v2" strokeLinejoin="round" />
      <path d="M5 13h14M5 16h14" strokeLinecap="round" opacity="0.35" />
      <path d="M12 5v1" strokeLinecap="round" />
    </svg>
  ),
  sundaes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9 4h6l-2 14H11L9 4z" strokeLinejoin="round" />
      <path d="M8 18h8l-1 3H9l-1-3z" strokeLinejoin="round" />
      <path d="M10 8h4M10 11h4" strokeLinecap="round" opacity="0.45" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  waffles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2" strokeLinejoin="round" />
      <path d="M5 10h14M5 15h14M10 5v14M15 5v14" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  kids: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
      <path d="M9 15c1 1.5 5 1.5 6 0" strokeLinecap="round" />
      <path d="M12 4v1.5" strokeLinecap="round" />
    </svg>
  ),
  [DEFAULT]: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5L12 2z" strokeLinejoin="round" />
    </svg>
  ),
};

const CATEGORY_LABELS = {
  "cold-drinks": "Cold Drinks",
  "hot-drinks": "Hot Drinks",
  milkshakes: "Milkshakes",
  mocktails: "Mocktails",
  "american-pancakes": "American Pancakes",
  brownies: "Brownies",
  cakes: "Cakes",
  "cookie-doughs": "Cookie Doughs",
  crepes: "Crepes",
  donuts: "Donuts",
  gelato: "Gelato",
  milkcake: "Milkcake",
  sundaes: "Sundaes",
  waffles: "Waffles",
  kids: "Kids",
};

export default function CategoryIcon({ categoryId, className = "" }) {
  const icon = ICONS[categoryId] ?? ICONS[DEFAULT];

  return <span className={className}>{icon}</span>;
}

export function getCategoryLabel(categoryId) {
  return CATEGORY_LABELS[categoryId] ?? "Menu Item";
}
