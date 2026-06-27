import { cn } from "@/utils/cn";
import styles from "./SectionTitle.module.css";

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  return (
    <div className={cn(styles.wrapper, styles[align], className)}>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
