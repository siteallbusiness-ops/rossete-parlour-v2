import Link from "next/link";
import Button from "@/components/Buttons";
import { Container } from "@/components/Sections";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.notFound} aria-labelledby="not-found-title">
      <Container>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className={styles.title}>
          Page Not Found
        </h1>
        <p className={styles.description}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Link href="/contact" className={styles.link}>
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}
