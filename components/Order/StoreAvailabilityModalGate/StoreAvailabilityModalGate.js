"use client";

import useAppStore from "@/store/useAppStore";
import ClosedWarningModal from "@/components/Order/ClosedWarningModal";

export default function StoreAvailabilityModalGate() {
  const isClosedWarningOpen = useAppStore((s) => s.isClosedWarningOpen);

  if (!isClosedWarningOpen) return null;

  return <ClosedWarningModal />;
}
