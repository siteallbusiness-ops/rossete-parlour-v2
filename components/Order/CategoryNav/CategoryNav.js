"use client";

import { useRef, useEffect } from "react";
import { getCategoriesWithItems } from "@/constants/menu";
import useAppStore from "@/store/useAppStore";
import styles from "./CategoryNav.module.css";

export default function CategoryNav({ scrollToCategory }) {
  const scrollRef = useRef(null);
  const activeCategory = useAppStore((s) => s.activeCategory);
  const menuView = useAppStore((s) => s.menuView);
  const setActiveCategory = useAppStore((s) => s.setActiveCategory);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const closeOrderPreference = useAppStore((s) => s.closeOrderPreference);
  const setOrderPreferenceSelected = useAppStore(
    (s) => s.setOrderPreferenceSelected
  );

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (categoryId) => {
    setSearchQuery("");
    setActiveCategory(categoryId);
    closeOrderPreference();
    setOrderPreferenceSelected(true);
    scrollToCategory?.(categoryId);
  };

  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(
      `[data-category="${activeCategory}"]`
    );
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  return (
    <nav className={styles.nav} aria-label="Menu categories">
      <div className={styles.scroll} ref={scrollRef}>
        {getCategoriesWithItems().map((cat) => (
          <button
            key={cat.id}
            type="button"
            data-category={cat.id}
            className={`${styles.pill} ${menuView === "menu" && activeCategory === cat.id ? styles.active : ""}`}
            onClick={() => handleCategoryClick(cat.id)}
            aria-pressed={menuView === "menu" && activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className={styles.arrows}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Scroll categories left"
          onClick={() => scroll("left")}
        >
          ‹
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Scroll categories right"
          onClick={() => scroll("right")}
        >
          ›
        </button>
      </div>
    </nav>
  );
}
