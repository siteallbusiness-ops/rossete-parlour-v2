"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import styles from "./CartToast.module.css";

export default function CartToast() {
  const cartToast = useAppStore((s) => s.cartToast);
  const clearCartToast = useAppStore((s) => s.clearCartToast);

  useEffect(() => {
    if (!cartToast) return;
    const timer = setTimeout(clearCartToast, 2000);
    return () => clearTimeout(timer);
  }, [cartToast, clearCartToast]);

  if (!cartToast) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <span>{cartToast.name} added to cart</span>
    </div>
  );
}
