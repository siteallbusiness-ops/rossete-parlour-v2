"use client";

import { useEffect, useState } from "react";
import { getStoreAvailability } from "@/utils/storeHours";

export function useStoreAvailability(orderType = "collection") {
  const [availability, setAvailability] = useState(() =>
    getStoreAvailability(orderType)
  );

  useEffect(() => {
    const update = () => setAvailability(getStoreAvailability(orderType));

    update();
    const interval = window.setInterval(update, 60 * 1000);
    return () => window.clearInterval(interval);
  }, [orderType]);

  return availability;
}
