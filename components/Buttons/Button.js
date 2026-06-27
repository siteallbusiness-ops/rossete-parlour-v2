import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  disabled = false,
  ariaLabel,
  onClick,
  ...props
}) {
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
