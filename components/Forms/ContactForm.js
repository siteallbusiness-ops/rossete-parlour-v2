"use client";

import { useState } from "react";
import Button from "@/components/Buttons";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={styles.input}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={styles.input}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-subject" className={styles.label}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className={styles.input}
          placeholder="How can we help?"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={styles.textarea}
          placeholder="Your message..."
          rows={5}
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg">
        Send Message
      </Button>

      {status === "submitted" && (
        <p className={styles.success} role="status">
          Thank you! Your message has been received. (Placeholder response)
        </p>
      )}
    </form>
  );
}
