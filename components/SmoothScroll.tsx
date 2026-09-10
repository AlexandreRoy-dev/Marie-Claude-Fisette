"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis is driven by the GSAP ticker rather than its own requestAnimationFrame
 * loop, so smooth scroll and every ScrollTrigger read off the same clock. A
 * second loop is what causes scrub drift and pinned sections that lag a frame.
 *
 * Never initialised when the user prefers reduced motion, and wheel smoothing
 * is off on narrow viewports where native touch already feels better.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: window.innerWidth > 768,
      wheelMultiplier: 0.9,
      syncTouch: false,
      anchors: { offset: -80 },
      autoRaf: false,
    });

    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return null;
}
