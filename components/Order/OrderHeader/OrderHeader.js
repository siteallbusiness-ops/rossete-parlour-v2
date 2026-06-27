"use client";

import Logo from "@/components/Common/Logo";
import UserProfile from "@/components/Order/UserProfile";
import useAppStore from "@/store/useAppStore";
import styles from "./OrderHeader.module.css";

export default function OrderHeader() {
  const openSidebar = useAppStore((s) => s.openSidebar);
  const openCart = useAppStore((s) => s.openCart);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const cartCount = useAppStore((s) =>
    s.cart.reduce((count, item) => count + item.quantity, 0)
  );

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open menu"
            onClick={openSidebar}
          >
            <span />
            <span />
            <span />
          </button>
          <Logo variant="compact" className={styles.brand} />
        </div>

        <div className={styles.searchWrap}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search menu"
          />
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.cartBtn}
            aria-label={`Cart, ${cartCount} items`}
            onClick={openCart}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45a2 2 0 000 1.82C5.74 16.98 6.86 18 8 18h12v-2H8.42a.25.25 0 01-.22-.12l.03-.04L9.1 14h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020.01 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span className={styles.cartBadge}>{cartCount}</span>
          </button>

          <UserProfile />
        </div>
      </div>
    </header>
  );
}
