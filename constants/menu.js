import menuData from "@/data/menu.json";

/** @typedef {{ id: string; name: string; price: number }} MenuItem */
/** @typedef {{ id: string; label: string; items: MenuItem[] }} MenuCategory */

/** @type {MenuCategory[]} */
const categories = menuData.categories;

export const MENU_CATEGORIES = categories.map(({ id, label }) => ({ id, label }));

export const MENU_ITEMS = categories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryId: category.id,
  }))
);

export function getItemsByCategory(categoryId) {
  return MENU_ITEMS.filter((item) => item.categoryId === categoryId);
}

export function getCategoriesWithItems() {
  return MENU_CATEGORIES.map((category) => ({
    ...category,
    items: getItemsByCategory(category.id),
  })).filter((category) => category.items.length > 0);
}

export function getCategoryById(categoryId) {
  return MENU_CATEGORIES.find((category) => category.id === categoryId);
}
