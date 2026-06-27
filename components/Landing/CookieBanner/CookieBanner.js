"use client";

import Link from "next/link";
import useAppStore from "@/store/useAppStore";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const cookiesAccepted = useAppStore((s) => s.cookiesAccepted);
  const acceptCookies = useAppStore((s) => s.acceptCookies);

  if (cookiesAccepted) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p>
        We use cookies to ensure you get the best experience on our website.
      </p>
      <div className={styles.actions}>
        <Link href="/privacy-policy" className={styles.link}>
          Cookie Policy
        </Link>
        <button
          type="button"
          className={styles.btn}
          onClick={acceptCookies}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
