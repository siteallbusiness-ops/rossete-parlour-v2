import { cn } from "@/utils/cn";
import styles from "./Container.module.css";

export default function Container({
  children,
  narrow = false,
  className = "",
  as: Tag = "div",
}) {
  return (
    <Tag className={cn(styles.container, narrow && styles.narrow, className)}>
      {children}
    </Tag>
  );
}
