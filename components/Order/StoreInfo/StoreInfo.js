"use client";

import { SITE } from "@/constants/site";
import useAppStore from "@/store/useAppStore";
import { useStoreAvailability } from "@/hooks/useStoreAvailability";
import styles from "./StoreInfo.module.css";

export default function StoreInfo() {
  const orderType = useAppStore((s) => s.orderType);
  const menuView = useAppStore((s) => s.menuView);
  const setOrderType = useAppStore((s) => s.setOrderType);
  const showDeals = useAppStore((s) => s.showDeals);
  const showMenu = useAppStore((s) => s.showMenu);
  const availability = useStoreAvailability(orderType);

  const handleDealsClick = () => {
    showDeals();
    window.setTimeout(() => {
      document.getElementById("deals-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const handleCollectionClick = () => {
    setOrderType("collection");
    if (menuView === "deals") {
      showMenu();
    }
  };

  return (
    <section className={styles.storeInfo}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{SITE.name}</h1>
            <span
              className={`${styles.status} ${availability.isOpen ? styles.statusOpen : styles.statusClosed}`}
            >
              {availability.isOpen
                ? "Open now"
                : availability.opensInLabel
                  ? `Closed · Opens in ${availability.opensInLabel}`
                  : "Closed"}
            </span>
          </div>
          <p className={styles.address}>
            Address: {SITE.orderAddress}
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.dealsBtn} ${menuView === "deals" ? styles.active : ""}`}
              onClick={handleDealsClick}
              aria-pressed={menuView === "deals"}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
              Deals
            </button>
            <button
              type="button"
              className={`${styles.collectionBtn} ${orderType === "collection" && menuView !== "deals" ? styles.active : ""}`}
              onClick={handleCollectionClick}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
              </svg>
              Collection
            </button>
          </div>

          <div className={styles.timeCard}>
            <span className={styles.timeValue}>{SITE.estimatedTime}</span>
            <span className={styles.timeLabel}>Estimated time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
