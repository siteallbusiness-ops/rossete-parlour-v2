"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Common/Logo";
import Navigation from "@/components/Navigation";
import Button from "@/components/Buttons";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/utils/cn";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useScrollLock(isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <header
      className={cn(styles.header, isScrolled && styles.scrolled)}
      role="banner"
    >
      <div className={styles.inner}>
        <Logo />

        <Navigation />

        <div className={styles.actions}>
          <Button href="/contact" variant="primary" size="sm" className={styles.cta}>
            Book Now
          </Button>

          <button
            type="button"
            className={cn(styles.hamburger, isMenuOpen && styles.open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(styles.mobileMenu, isMenuOpen && styles.mobileMenuOpen)}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
        <div className={styles.mobilePanel}>
          <Navigation isMobile onLinkClick={closeMenu} />
          <div className={styles.mobileCta}>
            <Button href="/contact" variant="primary" size="lg" onClick={closeMenu}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
