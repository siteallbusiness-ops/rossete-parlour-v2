"use client";

import { useState, useRef, useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import { getUserInitials } from "@/utils/user";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const openAuthModal = useAppStore((s) => s.openAuthModal);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        type="button"
        className={styles.loginBtn}
        onClick={() => openAuthModal("login")}
      >
        Log in / Sign up
      </button>
    );
  }

  const initials = getUserInitials(user.name, user.email);

  return (
    <div className={styles.profile} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className={styles.avatar} aria-hidden="true">
          {initials}
        </span>
        <span className={styles.info}>
          <span className={styles.email}>{user.email}</span>
          {user.guest && <span className={styles.badge}>Guest</span>}
        </span>
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.dropdownHeader}>
            <span className={styles.avatarLarge}>{initials}</span>
            <div>
              <p className={styles.dropdownName}>{user.name}</p>
              <p className={styles.dropdownEmail}>{user.email}</p>
              {user.phone && (
                <p className={styles.dropdownPhone}>{user.phone}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => {
              logout();
              setOpen(false);
            }}
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
