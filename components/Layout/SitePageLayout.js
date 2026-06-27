"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import OrderHeader from "@/components/Order/OrderHeader";
import LandingFooter from "@/components/Landing/LandingFooter";
import CartDrawer from "@/components/Order/CartDrawer";
import SidebarMenu from "@/components/Order/SidebarMenu";
import AuthModal from "@/components/Order/AuthModal";
import CartToast from "@/components/Order/CartToast";
import OrderConfirmationModal from "@/components/Checkout/OrderConfirmation/OrderConfirmationModal";
import styles from "./SitePageLayout.module.css";

export default function SitePageLayout({ children }) {
  const isCartOpen = useAppStore((s) => s.isCartOpen);
  const isSidebarOpen = useAppStore((s) => s.isSidebarOpen);
  const isAuthModalOpen = useAppStore((s) => s.isAuthModalOpen);
  const closeCart = useAppStore((s) => s.closeCart);
  const closeSidebar = useAppStore((s) => s.closeSidebar);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.layout}>
      <OrderHeader />
      <div className={styles.content}>{children}</div>
      <LandingFooter />
      <CartToast />

      {isCartOpen && <CartDrawer onClose={closeCart} />}
      {isSidebarOpen && <SidebarMenu onClose={closeSidebar} />}
      {isAuthModalOpen && <AuthModal />}
      <OrderConfirmationModal />
    </div>
  );
}
