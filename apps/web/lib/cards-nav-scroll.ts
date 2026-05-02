"use client";

/**
 * Scrolls so `el` sits just below the cards sticky nav cluster, or the provided nav fallback.
 */
export function scrollToCardsSection(
  el: HTMLElement,
  fallbackNav: HTMLElement | null,
) {
  const cluster =
    document.getElementById("cards-sticky-nav-cluster") ?? fallbackNav;
  if (!cluster) return;
  const bottom = cluster.getBoundingClientRect().bottom;
  window.scrollTo({
    top: window.scrollY + el.getBoundingClientRect().top - bottom,
    behavior: "smooth",
  });
}
