import Card from "./Card";
import Button from "@/components/Buttons";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ title, description, href = "#" }) {
  return (
    <Card hover className={styles.service}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Button href={href} variant="ghost" size="sm" className={styles.link}>
        Learn More →
      </Button>
    </Card>
  );
}
