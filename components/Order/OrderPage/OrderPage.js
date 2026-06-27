"use client";

import { useEffect, useMemo } from "react";
import useAppStore from "@/store/useAppStore";
import { useStoreHydrated } from "@/hooks/useStoreHydrated";
import { useCategoryScrollSpy } from "@/hooks/useCategoryScrollSpy";
import { getCategoriesWithItems } from "@/constants/menu";
import OrderHeader from "@/components/Order/OrderHeader";
import StoreInfo from "@/components/Order/StoreInfo";
import CategoryNav from "@/components/Order/CategoryNav";
import MenuSection from "@/components/Order/MenuSection";
import DealsSection from "@/components/Order/DealsSection";
import FloatingCartBar from "@/components/Order/FloatingCartBar";
import CartDrawer from "@/components/Order/CartDrawer";
import SidebarMenu from "@/components/Order/SidebarMenu";
import AuthModal from "@/components/Order/AuthModal";
import OrderPreferenceModal from "@/components/Order/OrderPreferenceModal";
import CartToast from "@/components/Order/CartToast";
import styles from "./OrderPage.module.css";

export default function OrderPage() {
  const hydrated = useStoreHydrated();
  const searchQuery = useAppStore((s) => s.searchQuery).trim().toLowerCase();
  const hasSelectedOrderPreference = useAppStore(
    (s) => s.hasSelectedOrderPreference
  );
  const openOrderPreference = useAppStore((s) => s.openOrderPreference);
  const isCartOpen = useAppStore((s) => s.isCartOpen);
  const isSidebarOpen = useAppStore((s) => s.isSidebarOpen);
  const isAuthModalOpen = useAppStore((s) => s.isAuthModalOpen);
  const isOrderPreferenceOpen = useAppStore((s) => s.isOrderPreferenceOpen);
  const menuView = useAppStore((s) => s.menuView);
  const closeCart = useAppStore((s) => s.closeCart);
  const closeSidebar = useAppStore((s) => s.closeSidebar);

  const visibleCategoryIds = useMemo(() => {
    return getCategoriesWithItems()
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery)
        ),
      }))
      .filter((category) => category.items.length > 0)
      .map((category) => category.id);
  }, [searchQuery]);

  const { scrollToCategory } = useCategoryScrollSpy(
    menuView === "menu" ? visibleCategoryIds : []
  );

  useEffect(() => {
    if (hydrated && !hasSelectedOrderPreference) {
      openOrderPreference();
    }
  }, [hydrated, hasSelectedOrderPreference, openOrderPreference]);

  return (
    <div className={styles.page}>
      <OrderHeader />
      <StoreInfo />
      <CategoryNav scrollToCategory={scrollToCategory} />
      {menuView === "deals" ? <DealsSection /> : <MenuSection />}

      <FloatingCartBar />
      <CartToast />

      {isCartOpen && <CartDrawer onClose={closeCart} />}
      {isSidebarOpen && <SidebarMenu onClose={closeSidebar} />}
      {isAuthModalOpen && <AuthModal />}
      {hydrated && isOrderPreferenceOpen && !hasSelectedOrderPreference && (
        <OrderPreferenceModal />
      )}
    </div>
  );
}
