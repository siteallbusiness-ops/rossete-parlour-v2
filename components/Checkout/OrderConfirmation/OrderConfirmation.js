"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SitePageLayout from "@/components/Layout/SitePageLayout";
import useAppStore from "@/store/useAppStore";
import OrderConfirmationView from "./OrderConfirmationView";
import styles from "./OrderConfirmation.module.css";

export default function OrderConfirmation() {
  const router = useRouter();
  const lastOrder = useAppStore((s) => s.lastOrder);
  const closeOrderConfirmation = useAppStore((s) => s.closeOrderConfirmation);

  useEffect(() => {
    closeOrderConfirmation();
  }, [closeOrderConfirmation]);

  useEffect(() => {
    if (!lastOrder) {
      router.replace("/services");
    }
  }, [lastOrder, router]);

  if (!lastOrder) return null;

  return (
    <SitePageLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <OrderConfirmationView order={lastOrder} variant="page" />
        </div>
      </div>
    </SitePageLayout>
  );
}
