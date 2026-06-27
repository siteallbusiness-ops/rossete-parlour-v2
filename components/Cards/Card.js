import { cn } from "@/utils/cn";
import styles from "./Card.module.css";

export default function Card({ children, className = "", hover = false }) {
  return (
    <article className={cn(styles.card, hover && styles.hover, className)}>
      {children}
    </article>
  );
}
