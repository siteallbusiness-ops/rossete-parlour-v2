"use client";

import { useState } from "react";
import SitePageLayout from "@/components/Layout/SitePageLayout";
import { SITE, WORKING_HOURS } from "@/constants/site";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [hoursType, setHoursType] = useState("delivery");
  const hours = WORKING_HOURS[hoursType];

  return (
    <SitePageLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Contact us</h1>
          <p className={styles.subtitle}>Find us here</p>

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

          <h2 className={styles.hoursTitle}>Working hours:</h2>

          <div className={styles.toggle}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${hoursType === "delivery" ? styles.toggleActive : ""}`}
              onClick={() => setHoursType("delivery")}
            >
              Delivery
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${hoursType === "collection" ? styles.toggleActive : ""}`}
              onClick={() => setHoursType("collection")}
            >
              Collection
            </button>
          </div>

          <ul className={styles.hoursList}>
            {hours.map(({ day, hours: time }) => (
              <li key={day}>
                <span>{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>

          <p className={styles.tagline}>{SITE.contactTagline}</p>
        </div>
      </div>
    </SitePageLayout>
  );
}
