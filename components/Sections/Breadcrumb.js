import Link from "next/link";
import Container from "./Container";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <Container>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.label} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
