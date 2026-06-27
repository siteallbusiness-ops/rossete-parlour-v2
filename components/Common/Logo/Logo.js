import Link from "next/link";
import { SITE } from "@/constants/site";
import styles from "./Logo.module.css";

export default function Logo({
  variant = "default",
  className = "",
  href = "/",
  linked = true,
}) {
  const isFooter = variant === "footer";
  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  const content = (
    <span
      className={`${styles.wordmark} ${isFooter ? styles.wordmarkFooter : ""} ${isCompact ? styles.wordmarkCompact : ""} ${isMinimal ? styles.wordmarkMinimal : ""}`}
    >
      <span className={styles.name}>{SITE.name}</span>
      {!isMinimal && (
        <>
          <span className={styles.rule} aria-hidden="true" />
          {!isCompact && (
            <span className={styles.tagline}>{SITE.logoTagline}</span>
          )}
        </>
      )}
    </span>
  );

  if (linked && href) {
    return (
      <Link
        href={href}
        className={`${styles.logo} ${isFooter ? styles.footer : ""} ${className}`}
        aria-label={`${SITE.name} — Home`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={`${styles.logo} ${isFooter ? styles.footer : ""} ${className}`}
      aria-label={SITE.name}
    >
      {content}
    </span>
  );
}
