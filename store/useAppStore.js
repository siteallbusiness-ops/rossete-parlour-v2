"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isStoreOpen } from "@/utils/storeHours";

const useAppStore = create(
  persist(
    (set, get) => ({
      cart: [],
      orderType: "collection",
      hasSelectedOrderPreference: false,
      isCartOpen: false,
      isSidebarOpen: false,
      isAuthModalOpen: false,
      authTab: "login",
      isOrderPreferenceOpen: false,
      isClosedWarningOpen: false,
      searchQuery: "",
      activeCategory: "cold-drinks",
      menuView: "menu",
      user: null,
      cookiesAccepted: false,
      cartToast: null,
      lastOrder: null,
      pendingCheckoutDetails: null,
      isOrderConfirmationOpen: false,

      addToCart: (item) => {
        const { cart, orderType } = get();

        if (!isStoreOpen(orderType)) {
          set({ isClosedWarningOpen: true });
          return false;
        }
        const existing = cart.find((c) => c.id === item.id);

        if (existing) {
          set({
            cart: cart.map((c) =>
              c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
            ),
            cartToast: { id: item.id, name: item.name },
          });
        } else {
          set({
            cart: [...cart, { ...item, quantity: 1 }],
            cartToast: { id: item.id, name: item.name },
          });
        }

        return true;
      },

      clearCartToast: () => set({ cartToast: null }),

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return false;
        }

        if (!isStoreOpen(get().orderType)) {
          set({ isClosedWarningOpen: true });
          return false;
        }

        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
        return true;
      },

      clearCart: () => set({ cart: [] }),

      setOrderType: (type) => set({ orderType: type }),

      setOrderPreferenceSelected: (value) =>
        set({ hasSelectedOrderPreference: value }),

      openCart: () =>
        set({
          isCartOpen: true,
          isSidebarOpen: false,
          isOrderPreferenceOpen: false,
        }),

      closeCart: () => set({ isCartOpen: false }),

      toggleCart: () => {
        const { isCartOpen } = get();
        set({
          isCartOpen: !isCartOpen,
          isSidebarOpen: false,
          isOrderPreferenceOpen: false,
        });
      },

      openSidebar: () =>
        set({
          isSidebarOpen: true,
          isCartOpen: false,
          isOrderPreferenceOpen: false,
        }),

      closeSidebar: () => set({ isSidebarOpen: false }),

      openAuthModal: (tab = "login") =>
        set({
          isAuthModalOpen: true,
          authTab: tab,
          isOrderPreferenceOpen: false,
        }),

      closeAuthModal: () => set({ isAuthModalOpen: false }),

      setAuthTab: (tab) => set({ authTab: tab }),

      openOrderPreference: () => set({ isOrderPreferenceOpen: true }),

      closeOrderPreference: () => set({ isOrderPreferenceOpen: false }),

      openClosedWarning: () => set({ isClosedWarningOpen: true }),

      closeClosedWarning: () => set({ isClosedWarningOpen: false }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setMenuView: (view) => set({ menuView: view }),

      showDeals: () =>
        set({
          menuView: "deals",
          searchQuery: "",
        }),

      showMenu: () => set({ menuView: "menu" }),

      setActiveCategory: (category) =>
        set({ activeCategory: category, menuView: "menu" }),

      login: (userData) => set({ user: userData }),

      logout: () => set({ user: null }),

      setPendingCheckoutDetails: (details) =>
        set({ pendingCheckoutDetails: details }),

      clearPendingCheckoutDetails: () =>
        set({ pendingCheckoutDetails: null }),

      openOrderConfirmation: () => set({ isOrderConfirmationOpen: true }),

      closeOrderConfirmation: () => set({ isOrderConfirmationOpen: false }),

      acceptCookies: () => set({ cookiesAccepted: true }),

      placeOrder: (addressDetails) => {
        const { cart, orderType, user } = get();

        if (!isStoreOpen(orderType)) {
          set({ isClosedWarningOpen: true });
          return null;
        }

        const total = cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const order = {
          id: `RP-${Date.now().toString().slice(-6)}`,
          items: cart.map((item) => ({ ...item })),
          total,
          orderType,
          address: addressDetails,
          customer: user,
          placedAt: new Date().toISOString(),
        };

        set({
          lastOrder: order,
          cart: [],
          isCartOpen: false,
          isOrderConfirmationOpen: true,
        });
        return order;
      },

      clearLastOrder: () => set({ lastOrder: null }),
    }),
    {
      name: "rossete-parlour-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        orderType: state.orderType,
        hasSelectedOrderPreference: state.hasSelectedOrderPreference,
        user: state.user,
        cookiesAccepted: state.cookiesAccepted,
        lastOrder: state.lastOrder,
      }),
    }
  )
);

export default useAppStore;
