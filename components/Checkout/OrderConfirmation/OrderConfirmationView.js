"use client";

import Link from "next/link";
import { SITE } from "@/constants/site";
import { formatPrice } from "@/utils/format";
import useAppStore from "@/store/useAppStore";
import styles from "./OrderConfirmationView.module.css";

export default function OrderConfirmationView({ order, variant = "page" }) {
  const closeOrderConfirmation = useAppStore((s) => s.closeOrderConfirmation);
  const placedDate = new Date(order.placedAt);
  const formattedDate = placedDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = placedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const { address } = order;

  return (
    <div
      className={`${styles.view} ${variant === "modal" ? styles.viewModal : ""}`}
    >
      <div className={styles.hero}>
        <div className={styles.successRing} aria-hidden="true">
          <svg viewBox="0 0 52 52">
            <circle className={styles.checkCircle} cx="26" cy="26" r="25" />
            <path
              className={styles.checkMark}
              fill="none"
              d="M14 27l7 7 16-16"
            />
          </svg>
        </div>
        <p className={styles.eyebrow}>Order placed successfully</p>
        <h1 id="order-confirmation-title" className={styles.title}>
          Thank you for your order!
        </h1>
        <p className={styles.subtitle}>
          We&apos;ve received your order and our kitchen is getting started.
          You&apos;ll receive updates at{" "}
          <strong>{address?.email || order.customer?.email}</strong>.
        </p>
      </div>

      <div className={styles.orderBadge}>
        <span className={styles.orderBadgeLabel}>Order number</span>
        <span className={styles.orderBadgeValue}>{order.id}</span>
      </div>

      <div className={styles.timeline} aria-label="Order progress">
        <div className={`${styles.step} ${styles.stepDone}`}>
          <span className={styles.stepDot} />
          <span className={styles.stepLabel}>Received</span>
        </div>
        <div className={`${styles.step} ${styles.stepActive}`}>
          <span className={styles.stepDot} />
          <span className={styles.stepLabel}>Preparing</span>
        </div>
        <div className={styles.step}>
          <span className={styles.stepDot} />
          <span className={styles.stepLabel}>Ready</span>
        </div>
      </div>

      <div className={styles.metaGrid}>
        <div className={styles.metaCard}>
          <span className={styles.metaIcon} aria-hidden="true">⏱</span>
          <div>
            <span className={styles.metaLabel}>Estimated time</span>
            <span className={styles.metaValue}>{SITE.estimatedTime}</span>
          </div>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaIcon} aria-hidden="true">📦</span>
          <div>
            <span className={styles.metaLabel}>Order type</span>
            <span className={`${styles.metaValue} ${styles.capitalize}`}>
              {order.orderType}
            </span>
          </div>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaIcon} aria-hidden="true">🛒</span>
          <div>
            <span className={styles.metaLabel}>Items</span>
            <span className={styles.metaValue}>{itemCount}</span>
          </div>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaIcon} aria-hidden="true">🕐</span>
          <div>
            <span className={styles.metaLabel}>Placed at</span>
            <span className={styles.metaValue}>
              {formattedDate} · {formattedTime}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Your order</h2>
        <ul className={styles.items}>
          {order.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQty}>Qty {item.quantity}</span>
              </div>
              <span className={styles.itemPrice}>
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.totalRow}>
          <span>Total paid</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      {address && (
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>
            {order.orderType === "delivery" ? "Delivery" : "Collection"} details
          </h2>
          <address className={styles.address}>
            <strong>{address.name}</strong>
            <span>{address.street}</span>
            <span>
              {address.city}, {address.postcode}
            </span>
            <span>{address.phone}</span>
            {address.notes && (
              <span className={styles.notes}>
                <em>Note:</em> {address.notes}
              </span>
            )}
          </address>
        </div>
      )}

      <div className={styles.actions}>
        <Link
          href="/services"
          className={styles.primaryBtn}
          onClick={closeOrderConfirmation}
        >
          Order again
        </Link>
        <Link
          href="/"
          className={styles.secondaryBtn}
          onClick={closeOrderConfirmation}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
