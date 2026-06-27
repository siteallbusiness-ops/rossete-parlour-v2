"use client";

import { useSyncExternalStore } from "react";

function subscribe(query, callback) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot(query) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * @param {string} query - CSS media query string
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getSnapshot(query),
    getServerSnapshot
  );
}
