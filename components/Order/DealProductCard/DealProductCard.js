"use client";

import { useState } from "react";
import { formatPrice } from "@/utils/format";
import CategoryIcon from "@/components/Order/CategoryIcon";
import useAppStore from "@/store/useAppStore";
import styles from "./DealProductCard.module.css";

export default function DealProductCard({ item }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const cartQty = useAppStore(
    (s) => s.cart.find((c) => c.id === item.id)?.quantity ?? 0
  );
  const closeOrderPreference = useAppStore((s) => s.closeOrderPreference);
  const setOrderPreferenceSelected = useAppStore(
    (s) => s.setOrderPreferenceSelected
  );
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    const added = addToCart(item);
    if (!added) return;

    closeOrderPreference();
    setOrderPreferenceSelected(true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 700);
  };

  return (
    <button
      type="button"
      className={`${styles.card} ${justAdded ? styles.added : ""} ${cartQty > 0 ? styles.inCart : ""}`}
      onClick={handleAdd}
      aria-label={`Add ${item.name} deal to cart, ${formatPrice(item.price)}`}
    >
      <span className={styles.dealBadge}>{item.dealBadge}</span>

      <div className={styles.iconPanel} aria-hidden="true">
        <span className={styles.icon}>
          <CategoryIcon categoryId={item.categoryId} />
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        {item.dealDescription ? (
          <p className={styles.description}>{item.dealDescription}</p>
        ) : null}

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.originalPrice}>
              {formatPrice(item.originalPrice)}
            </span>
            <span className={styles.price}>{formatPrice(item.price)}</span>
          </div>
          <span className={styles.addAction}>
            {cartQty > 0 ? (
              <>
                <span className={styles.qtyBadge}>{cartQty}</span>
                <span className={styles.addLabel}>In cart</span>
              </>
            ) : (
              <>
                <span className={styles.addCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
                <span className={styles.addLabel}>Add</span>
              </>
            )}
          </span>
        </div>
      </div>

      {justAdded && (
        <span className={styles.addedToast} aria-live="polite">
          Added
        </span>
      )}
    </button>
  );
}
