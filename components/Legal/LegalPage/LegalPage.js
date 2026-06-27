"use client";

import SitePageLayout from "@/components/Layout/SitePageLayout";
import { SITE } from "@/constants/site";
import styles from "./LegalPage.module.css";

export default function LegalPage({ title, children }) {
  return (
    <SitePageLayout>
      <div className={styles.page}>
        <article className={styles.card}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.content}>{children}</div>
          <p className={styles.tagline}>{SITE.contactTagline}</p>
        </article>
      </div>
    </SitePageLayout>
  );
}
