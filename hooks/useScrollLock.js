"use client";

import { useEffect } from "react";

/**
 * Locks body scroll when active (e.g. mobile menu open).
 * @param {boolean} isLocked
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}
