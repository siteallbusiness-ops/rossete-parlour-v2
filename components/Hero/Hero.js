import Container from "@/components/Sections/Container";
import Button from "@/components/Buttons";
import styles from "./Hero.module.css";

export default function Hero({
  title = "Welcome to Rossete Parlour",
  subtitle = "Placeholder hero section — content to be added",
  ctaText = "Get Started",
  ctaHref = "/contact",
}) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Placeholder</p>
          <h1 id="hero-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <Button href={ctaHref} variant="primary" size="lg">
              {ctaText}
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
