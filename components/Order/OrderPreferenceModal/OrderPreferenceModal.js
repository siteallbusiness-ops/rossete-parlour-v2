"use client";

import Link from "next/link";
import { SITE } from "@/constants/site";
import useAppStore from "@/store/useAppStore";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./OrderPreferenceModal.module.css";

export default function OrderPreferenceModal() {
  const closeOrderPreference = useAppStore((s) => s.closeOrderPreference);
  const setOrderPreferenceSelected = useAppStore(
    (s) => s.setOrderPreferenceSelected
  );
  const setOrderType = useAppStore((s) => s.setOrderType);

  useScrollLock(true);

  const handleProceed = () => {
    setOrderType("collection");
    setOrderPreferenceSelected(true);
    closeOrderPreference();
  };

  const handleBrowse = () => {
    setOrderPreferenceSelected(true);
    closeOrderPreference();
  };

  return (
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.backdrop}
        onClick={handleBrowse}
        aria-hidden="true"
      />
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="order-pref-title"
      >
        <h2 id="order-pref-title" className={styles.title}>
          Pick your order preference
        </h2>

        <div className={styles.option}>
          <span className={styles.optionTitle}>Collection</span>
          <span className={styles.optionTime}>{SITE.collectionTime}</span>
        </div>

        <div className={styles.actions}>
          <Link
            href="/services"
            className={styles.browseBtn}
            onClick={handleBrowse}
          >
            Browse menu
          </Link>
          <button
            type="button"
            className={styles.proceedBtn}
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
