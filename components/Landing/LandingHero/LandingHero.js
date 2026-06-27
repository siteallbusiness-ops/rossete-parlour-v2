import Link from "next/link";
import Image from "next/image";
import { SITE, OPENING_HOURS, DELIVERY_HOURS } from "@/constants/site";
import { LANDING_IMAGES } from "@/constants/landing";
import styles from "./LandingHero.module.css";

const PLACEMENT_CLASS = {
  topRight: styles.floatTopRight,
  bottomLeft: styles.floatBottomLeft,
  bottomRight: styles.floatBottomRight,
};

export default function LandingHero() {
  const { hero, heroFloats } = LANDING_IMAGES;

  return (
    <section className={styles.hero} aria-labelledby="landing-hero-title">
      <div className={styles.accentPanel} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{SITE.logoTagline}</p>
          <h1 id="landing-hero-title" className={styles.title}>
            Welcome to{" "}
            <span className={styles.titleAccent}>{SITE.name}</span>
          </h1>
          <p className={styles.subtitle}>{SITE.tagline}</p>

          <div className={styles.ctaPanel}>
            <div className={styles.deliveryStat}>
              <span className={styles.deliveryIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                </svg>
              </span>
              <div className={styles.deliveryText}>
                <span className={styles.badgeLabel}>Est. delivery</span>
                <span className={styles.badgeValue}>{SITE.estimatedTime}</span>
              </div>
            </div>

            <Link href="/services" className={styles.orderBtn}>
              <span>Order Now</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualGlow} aria-hidden="true" />

          <div className={styles.imageFrame}>
            <Image
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              className={styles.heroImage}
              priority
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 520px"
            />
          </div>

          {heroFloats.map((item) => (
            <div
              key={item.label}
              className={`${styles.floatCard} ${PLACEMENT_CLASS[item.placement]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={styles.floatImage}
                sizes="150px"
              />
              <span className={styles.floatLabel}>{item.label}</span>
            </div>
          ))}

        </div>
      </div>

      <div className={styles.hours}>
        <article className={styles.hoursCard}>
          <div className={styles.hoursIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
            </svg>
          </div>
          <div>
            <h2 className={styles.hoursTitle}>Opening Times</h2>
            <p>{OPENING_HOURS.weekday}</p>
            <p>{OPENING_HOURS.weekend}</p>
          </div>
        </article>

        <article className={styles.hoursCard}>
          <div className={styles.hoursIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5zm-7 0A1.5 1.5 0 019.5 16 1.5 1.5 0 0111 17.5 1.5 1.5 0 019.5 19 1.5 1.5 0 018 17.5zM6.5 6h11l-1.05 5.71A2 2 0 0114.48 13H9.05a2 2 0 01-1.97-1.71L6.5 6zM4 4h1.22l1.4 7.68A3.99 3.99 0 009.05 15h5.43a3.99 3.99 0 003.43-3.32L19.22 4H20a1 1 0 110 2h-.78l-1.4 7.68A3.99 3.99 0 0014.48 17H9.05a3.99 3.99 0 01-3.97-3.42L3.78 6H3a1 1 0 110-2z" />
            </svg>
          </div>
          <div>
            <h2 className={styles.hoursTitle}>Delivery Times</h2>
            <p>{DELIVERY_HOURS.weekday}</p>
            <p>{DELIVERY_HOURS.weekend}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
