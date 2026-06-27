import Link from "next/link";
import { SITE } from "@/constants/site";
import styles from "./LandingFooter.module.css";

export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.colHeader}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
              <h3>Address</h3>
            </div>
            <p>{SITE.address.street}</p>
            <p>
              {SITE.address.city} {SITE.address.zip}
            </p>
          </div>

          <div className={styles.col}>
            <div className={styles.colHeader}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              <h3>Call us</h3>
            </div>
            <p>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </p>
          </div>

          <div className={styles.col}>
            <div className={styles.colHeader}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <h3>Mail us</h3>
            </div>
            <p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>

          <div className={styles.col}>
            <ul className={styles.links}>
              <li>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy;{year} All rights reserved | Powered by{" "}
          <a
            href={`https://${SITE.poweredBy}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE.poweredBy}
          </a>
        </p>
      </div>
    </footer>
  );
}
