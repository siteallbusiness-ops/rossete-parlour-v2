"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Common/Logo";
import { SIDEBAR_NAV } from "@/constants/navigation";
import useAppStore from "@/store/useAppStore";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./SidebarMenu.module.css";

export default function SidebarMenu({ onClose }) {
  const pathname = usePathname();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const openAuthModal = useAppStore((s) => s.openAuthModal);

  useScrollLock(true);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} role="presentation">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <nav className={styles.sidebar} aria-label="Side navigation">
        <div className={styles.header}>
          <Logo variant="compact" linked={false} className={styles.brand} />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <ul className={styles.links}>
          {SIDEBAR_NAV.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  onClick={onClose}
                >
                  <SidebarIcon name={icon} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            View and manage your details, preferences, and order history all in
            one place. Enjoy a seamless and personalized experience.
          </p>
          {!user && (
            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => {
                onClose();
                openAuthModal("login");
              }}
            >
              Log in
            </button>
          )}
          {user && (
            <>
              <p className={styles.userGreeting}>Hello, {user.name}</p>
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

function SidebarIcon({ name }) {
  const icons = {
    order: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
      </svg>
    ),
    contact: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    privacy: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
    terms: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  };

  return <span className={styles.icon}>{icons[name]}</span>;
}
