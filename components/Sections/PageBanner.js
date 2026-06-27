import Container from "./Container";
import styles from "./PageBanner.module.css";

export default function PageBanner({ title, description, children }) {
  return (
    <section className={styles.banner} aria-labelledby="page-banner-title">
      <Container>
        <div className={styles.content}>
          <h1 id="page-banner-title" className={styles.title}>
            {title}
          </h1>
          {description && <p className={styles.description}>{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
