"use client";

import SitePageLayout from "@/components/Layout/SitePageLayout";
import {
  SITE,
  OPENING_HOURS,
  DELIVERY_HOURS,
  WORKING_HOURS,
} from "@/constants/site";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const weeklyHours = WORKING_HOURS.delivery;

  return (
    <SitePageLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Contact us</h1>
          <p className={styles.subtitle}>
            Delivery and collection only — no dine-in
          </p>

          <div className={styles.infoBox}>
            <div className={styles.infoCol}>
              <h2>Address</h2>
              <p>{SITE.address.street}</p>
              <p>
                {SITE.address.city} {SITE.address.zip}
              </p>
            </div>
            <div className={styles.infoCol}>
              <h2>Call us at:</h2>
              <p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </p>
              <h2>Email:</h2>
              <p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
          </div>

          <div className={styles.hoursGrid}>
            <section className={styles.hoursCard} aria-labelledby="opening-hours">
              <h2 id="opening-hours" className={styles.hoursCardTitle}>
                Opening times
              </h2>
              <p className={styles.hoursSummary}>{OPENING_HOURS.weekday}</p>
              <p className={styles.hoursSummary}>{OPENING_HOURS.weekend}</p>
            </section>

            <section className={styles.hoursCard} aria-labelledby="delivery-hours">
              <h2 id="delivery-hours" className={styles.hoursCardTitle}>
                Delivery times
              </h2>
              <p className={styles.hoursSummary}>{DELIVERY_HOURS.weekday}</p>
              <p className={styles.hoursSummary}>{DELIVERY_HOURS.weekend}</p>
            </section>
          </div>

          <h2 className={styles.hoursTitle}>Hours by day</h2>
          <p className={styles.hoursNote}>
            Collection pickup follows the same hours as delivery.
          </p>

          <ul className={styles.hoursList}>
            {weeklyHours.map(({ day, hours }) => (
              <li key={day}>
                <span>{day}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>

          <p className={styles.tagline}>{SITE.contactTagline}</p>
        </div>
      </div>
    </SitePageLayout>
  );
}
