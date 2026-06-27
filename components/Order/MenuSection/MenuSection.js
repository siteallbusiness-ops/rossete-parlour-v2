"use client";

import { getCategoriesWithItems } from "@/constants/menu";
import useAppStore from "@/store/useAppStore";
import ProductCard from "@/components/Order/ProductCard";
import styles from "./MenuSection.module.css";

export default function MenuSection() {
  const searchQuery = useAppStore((s) => s.searchQuery).trim().toLowerCase();
  const categories = getCategoriesWithItems();

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className={styles.menu} id="menu-section">
      {filteredCategories.map((category) => (
        <section
          key={category.id}
          id={`category-${category.id}`}
          className={styles.section}
          aria-labelledby={`heading-${category.id}`}
        >
          <h2 id={`heading-${category.id}`} className={styles.heading}>
            {category.label}
          </h2>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.grid}>
            {category.items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      {filteredCategories.length === 0 && (
        <p className={styles.empty}>No items found matching your search.</p>
      )}
    </div>
  );
}
