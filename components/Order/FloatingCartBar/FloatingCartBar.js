"use client";

import { formatPrice } from "@/utils/format";
import useAppStore from "@/store/useAppStore";
import styles from "./FloatingCartBar.module.css";

export default function FloatingCartBar() {
  const cartCount = useAppStore((s) =>
    s.cart.reduce((count, item) => count + item.quantity, 0)
  );
  const cartTotal = useAppStore((s) =>
    s.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const openCart = useAppStore((s) => s.openCart);

  const itemLabel = cartCount === 1 ? "item" : "items";

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.inner}
        onClick={openCart}
        aria-label={`View cart, ${cartCount} ${itemLabel}, ${formatPrice(cartTotal)}`}
      >
        <div className={styles.summary}>
          <span className={styles.count}>
            {cartCount} {itemLabel}
          </span>
          <span className={styles.total}>{formatPrice(cartTotal)}</span>
        </div>
        <span className={styles.viewBtn}>View cart &gt;</span>
      </button>
    </div>
  );
}
