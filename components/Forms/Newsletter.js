"use client";

import { useState } from "react";
import Button from "@/components/Buttons";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.title}>Stay Updated</h3>
      <p className={styles.description}>
        Subscribe to our newsletter for the latest updates and news.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />
        <Button type="submit" variant="primary">
          Subscribe
        </Button>
      </form>

      {status === "submitted" && (
        <p className={styles.success} role="status">
          Thank you for subscribing! (Placeholder response)
        </p>
      )}
    </div>
  );
}
