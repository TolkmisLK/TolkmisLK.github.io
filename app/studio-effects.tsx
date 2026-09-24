"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isVisible = () => document.visibilityState === "visible";
const serverReduced = () => true;
const serverVisible = () => false;

export function useMotionEnvironment() {
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotion, serverReduced);
  const visible = useSyncExternalStore(subscribeVisibility, isVisible, serverVisible);
  return { reduced, visible };
}

export function StudioEffects({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    if (!enabled) return;

    // Content is always visible, including with JavaScript disabled.
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const animation = entry.target.animate(
          [{ opacity: 0.65, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }],
          { duration: 440, easing: "ease-out" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".work-card, .focus-card, .contact-panel").forEach((element) => observer.observe(element));

    const sparks = new Set<HTMLElement>();
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof HTMLElement) || event.detail === 0 || event.button !== 0) return;
      if (target.closest("a, button, input, label, select, textarea, .studio-scene, .delivery-demo")) return;
      if (!target.matches("main, section, .hero, .work-list, .site-shell, [data-portfolio-root]")) return;
      if (sparks.size >= 12) return;
      const spark = document.createElement("span");
      spark.className = "studio-click-spark";
      spark.setAttribute("aria-hidden", "true");
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;
      document.body.append(spark);
      sparks.add(spark);
      spark.addEventListener("animationend", () => { spark.remove(); sparks.delete(spark); }, { once: true });
    }
    document.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      sparks.forEach((spark) => spark.remove());
      document.removeEventListener("click", onClick);
    };
  }, [enabled]);
  return null;
}
