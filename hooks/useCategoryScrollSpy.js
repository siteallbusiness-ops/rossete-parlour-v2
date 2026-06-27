"use client";

import { useEffect, useRef, useCallback } from "react";
import useAppStore from "@/store/useAppStore";

const SCROLL_OFFSET_PX = 180;
const OBSERVER_ROOT_MARGIN = `-${SCROLL_OFFSET_PX}px 0px -55% 0px`;

export function useCategoryScrollSpy(categoryIds) {
  const setActiveCategory = useAppStore((s) => s.setActiveCategory);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef(null);

  const scrollToCategory = useCallback(
    (categoryId) => {
      isClickScrolling.current = true;
      if (clickTimeout.current) clearTimeout(clickTimeout.current);

      setActiveCategory(categoryId);

      const el = document.getElementById(`category-${categoryId}`);
      if (el) {
        const top =
          el.getBoundingClientRect().top +
          window.scrollY -
          SCROLL_OFFSET_PX;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }

      clickTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 900);
    },
    [setActiveCategory]
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    let observer = null;
    let retryTimer = null;
    let retryCount = 0;
    const maxRetries = 20;

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      const sections = categoryIds
        .map((id) => document.getElementById(`category-${id}`))
        .filter(Boolean);

      if (!sections.length) {
        if (retryCount < maxRetries) {
          retryCount += 1;
          retryTimer = setTimeout(setupObserver, 150);
        }
        return;
      }

      try {
        observer = new IntersectionObserver(
          (entries) => {
            if (isClickScrolling.current) return;

            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible.length > 0) {
              const id = visible[0].target.id.replace("category-", "");
              setActiveCategory(id);
            }
          },
          {
            rootMargin: OBSERVER_ROOT_MARGIN,
            threshold: [0, 0.15, 0.35],
          }
        );

        sections.forEach((section) => observer.observe(section));
      } catch (error) {
        console.error("Category scroll spy failed to initialize:", error);
      }
    };

    setupObserver();

    return () => {
      if (observer) observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, [categoryIds, setActiveCategory]);

  return { scrollToCategory };
}
