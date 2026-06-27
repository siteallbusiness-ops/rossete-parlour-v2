"use client";

import { getDealsWithItems } from "@/constants/deals";
import useAppStore from "@/store/useAppStore";
import DealProductCard from "@/components/Order/DealProductCard";
import styles from "./DealsSection.module.css";

export default function DealsSection() {
  const searchQuery = useAppStore((s) => s.searchQuery).trim().toLowerCase();

  const deals = getDealsWithItems().filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  const itemLabel = deals.length === 1 ? "Item" : "Items";

  return (
    <div className={styles.deals} id="deals-section">
      <p className={styles.count}>
        Showing {deals.length} {itemLabel} for &apos;Deals&apos;
      </p>

      {deals.length > 0 ? (
        <>
          <div className={styles.banner}>
            <span className={styles.bannerIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </span>
            <div>
              <p className={styles.bannerTitle}>Today&apos;s deals</p>
              <p className={styles.bannerText}>
                Limited-time savings on customer favourites — add to cart at the
                deal price.
              </p>
            </div>
          </div>

          <div className={styles.grid}>
            {deals.map((item) => (
              <DealProductCard key={item.dealId} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              <path d="M8.5 8.5l5 5M13.5 8.5l-5 5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>
            {searchQuery ? "No matching deals" : "No deals available"}
          </h2>
          <p className={styles.emptyText}>
            {searchQuery
              ? "Try a different search term or browse the full menu."
              : "There are no deals available at the moment."}
          </p>
        </div>
      )}
    </div>
  );
}
