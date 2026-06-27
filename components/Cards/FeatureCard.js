import Card from "./Card";
import styles from "./FeatureCard.module.css";

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card hover className={styles.feature}>
      {icon && (
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}
