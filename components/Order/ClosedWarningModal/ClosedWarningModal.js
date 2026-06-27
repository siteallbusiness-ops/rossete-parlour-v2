"use client";

import useAppStore from "@/store/useAppStore";
import { useStoreAvailability } from "@/hooks/useStoreAvailability";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./ClosedWarningModal.module.css";

export default function ClosedWarningModal() {
  const closeClosedWarning = useAppStore((s) => s.closeClosedWarning);
  const orderType = useAppStore((s) => s.orderType);
  const availability = useStoreAvailability(orderType);

  useScrollLock(true);

  return (
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.backdrop}
        onClick={closeClosedWarning}
        aria-hidden="true"
      />
      <div
        className={styles.modal}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="closed-title"
        aria-describedby="closed-message"
      >
        <div className={styles.iconWrap} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5" strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <p className={styles.eyebrow}>Ordering paused</p>
        <h2 id="closed-title" className={styles.title}>
          We&apos;re currently unavailable
        </h2>

        <p id="closed-message" className={styles.message}>
          Sorry, {orderType} orders are not being taken right now. You can browse
          the menu, but checkout will open again when we&apos;re back.
        </p>

        {availability.opensInLabel ? (
          <div className={styles.nextOpen}>
            <span className={styles.nextLabel}>Opens in</span>
            <span className={styles.nextValue}>{availability.opensInLabel}</span>
            {availability.nextOpenTime ? (
              <span className={styles.nextMeta}>
                {availability.nextOpenDay && availability.nextOpenDay !== availability.dayName
                  ? `${availability.nextOpenDay} at `
                  : "Today at "}
                {availability.nextOpenTime}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className={styles.meta}>
          <p>
            <span className={styles.metaLabel}>Today&apos;s hours</span>
            <span>{availability.todayHours}</span>
          </p>
        </div>

        <button
          type="button"
          className={styles.okBtn}
          onClick={closeClosedWarning}
        >
          OK, got it
        </button>
      </div>
    </div>
  );
}
