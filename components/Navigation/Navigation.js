"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { MAIN_NAV } from "@/constants/navigation";
import styles from "./Navigation.module.css";

export default function Navigation({ isMobile = false, onLinkClick }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(styles.nav, isMobile && styles.mobile)}
      aria-label={isMobile ? "Mobile navigation" : "Main navigation"}
    >
      <ul className={styles.list}>
        {MAIN_NAV.map(({ label, href }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(styles.link, isActive && styles.active)}
                aria-current={isActive ? "page" : undefined}
                onClick={onLinkClick}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
