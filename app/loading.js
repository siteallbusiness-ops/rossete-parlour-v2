import { Container } from "@/components/Sections";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading} role="status" aria-label="Loading">
      <Container>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.text}>Loading...</p>
      </Container>
    </div>
  );
}
