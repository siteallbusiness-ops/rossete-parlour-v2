"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import { useScrollLock } from "@/hooks/useScrollLock";
import OrderConfirmationView from "./OrderConfirmationView";
import styles from "./OrderConfirmationModal.module.css";

export default function OrderConfirmationModal() {
  const lastOrder = useAppStore((s) => s.lastOrder);
  const isOrderConfirmationOpen = useAppStore((s) => s.isOrderConfirmationOpen);
  const closeOrderConfirmation = useAppStore((s) => s.closeOrderConfirmation);

  useScrollLock(isOrderConfirmationOpen);

  useEffect(() => {
    if (!isOrderConfirmationOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeOrderConfirmation();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOrderConfirmationOpen, closeOrderConfirmation]);

  if (!isOrderConfirmationOpen || !lastOrder) return null;

  return (
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.backdrop}
        onClick={closeOrderConfirmation}
        aria-hidden="true"
      />
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmation-title"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeOrderConfirmation}
          aria-label="Close confirmation"
        >
          ×
        </button>
        <OrderConfirmationView order={lastOrder} variant="modal" />
      </div>
    </div>
  );
}
