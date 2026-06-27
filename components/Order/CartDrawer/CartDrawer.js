"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Common/Logo";
import { formatPrice } from "@/utils/format";
import useAppStore from "@/store/useAppStore";
import { isStoreOpen } from "@/utils/storeHours";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./CartDrawer.module.css";

export default function CartDrawer({ onClose }) {
  const router = useRouter();
  const cart = useAppStore((s) => s.cart);
  const cartCount = useAppStore((s) =>
    s.cart.reduce((count, item) => count + item.quantity, 0)
  );
  const cartTotal = useAppStore((s) =>
    s.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const updateQuantity = useAppStore((s) => s.updateQuantity);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const clearCart = useAppStore((s) => s.clearCart);
  const openClosedWarning = useAppStore((s) => s.openClosedWarning);
  const orderType = useAppStore((s) => s.orderType);

  useScrollLock(true);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCheckout = () => {
    if (!isStoreOpen(orderType)) {
      openClosedWarning();
      return;
    }

    onClose();
    router.push("/checkout");
  };

  return (
    <div className={styles.overlay} role="presentation">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside
        className={styles.drawer}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <Logo variant="compact" linked={false} className={styles.brand} />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className={styles.cartHeader}>
          <span className={styles.cartTitle}>Cart</span>
          <span className={styles.cartCount}>{cartCount} Items</span>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45a2 2 0 000 1.82C5.74 16.98 6.86 18 8 18h12v-2H8.42a.25.25 0 01-.22-.12l.03-.04L9.1 14h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020.01 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span>+</span>
            </div>
            <p className={styles.emptyTitle}>Add items to your cart</p>
            <p className={styles.emptyText}>
              Once you have added items, your basket will appear here.
            </p>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className={styles.qtyControls}>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalValue}>
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                type="button"
                className={styles.clearBtn}
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
