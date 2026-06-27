"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedSectionTitle.module.css";

function isInViewport(node) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export default function AnimatedSectionTitle({
  id,
  ariaLabel,
  letters,
  variant = "gallery",
  eyebrow,
  lead,
  showRule = false,
  className = "",
}) {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const reveal = () => setIsVisible(true);

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(node);

    requestAnimationFrame(() => {
      if (isInViewport(node)) {
        reveal();
        observer.disconnect();
      }
    });

    const fallback = window.setTimeout(() => {
      reveal();
      observer.disconnect();
    }, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const letterCount = letters.filter((item) => !item.space).length;
  let letterIndex = 0;

  return (
    <div
      ref={headerRef}
      className={`${styles.header} ${styles[variant]} ${isVisible ? styles.visible : ""} ${className}`}
      style={{ "--letter-count": letterCount }}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

      <h2 id={id} className={styles.title} aria-label={ariaLabel}>
        {letters.map((item, i) => {
          if (item.space) {
            return <span key={i} className={styles.space} aria-hidden="true" />;
          }

          const index = letterIndex;
          letterIndex += 1;

          return (
            <span
              key={i}
              className={`${styles.letter} ${item.large ? styles.letterLarge : ""}`}
              style={{
                "--i": index,
                "--offset-y": item.offsetY ?? "0px",
              }}
            >
              <span className={styles.letterInner}>{item.char}</span>
            </span>
          );
        })}
      </h2>

      {showRule ? <span className={styles.titleRule} aria-hidden="true" /> : null}

      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}
