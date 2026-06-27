"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreAvailabilityModalGate from "@/components/Order/StoreAvailabilityModalGate";
import styles from "./MainLayout.module.css";

const NO_DEFAULT_LAYOUT_ROUTES = [
  "/",
  "/services",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/checkout",
  "/order-confirmation",
];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const hideDefaultLayout = NO_DEFAULT_LAYOUT_ROUTES.includes(pathname);

  if (hideDefaultLayout) {
    return (
      <div className={styles.layout}>
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <StoreAvailabilityModalGate />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <Footer />
      <StoreAvailabilityModalGate />
    </div>
  );
}
