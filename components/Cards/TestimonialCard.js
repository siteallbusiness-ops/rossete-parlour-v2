import Card from "./Card";
import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ quote, author, role }) {
  return (
    <Card className={styles.testimonial}>
      <blockquote className={styles.quote}>
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <footer className={styles.footer}>
        <cite className={styles.author}>{author}</cite>
        {role && <span className={styles.role}>{role}</span>}
      </footer>
    </Card>
  );
}
