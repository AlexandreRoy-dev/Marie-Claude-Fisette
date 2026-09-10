"use client";

import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Already on screen when the page loads, so it should animate now, not on scroll. */
function inViewAtLoad(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.9 && r.bottom > 0;
}

/**
 * Site-wide reveal. Mounted after {children} in the root layout so page content
 * already exists in the DOM. Keyed on pathname for client-side navigations.
 *
 * Above-the-fold content plays on load as one intro timeline; everything below
 * waits for a ScrollTrigger. A trigger whose start is already behind the scroll
 * position at init cannot be relied on to fire, which is why the two cases are
 * separated rather than handled by one code path.
 *
 * Triggers use an explicit onEnter that builds the tween on the spot, instead of
 * attaching a pre-built tween. Heading reveals animate yPercent, which resolves
 * against measured height, and heights change when the web font swaps in. Making
 * the tween at enter time means it always measures post-swap.
 *
 * gsap.matchMedia() owns the reduced-motion branch: it clears the hidden state
 * and creates no triggers and no tweens.
 */
export function Reveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        gsap.set("[data-reveal-line] > span > span", { yPercent: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ delay: 0.15 });

        // --- Masked line-by-line rise, used on headings -------------------
        document.querySelectorAll<HTMLElement>("[data-reveal-line]").forEach((el) => {
          const inner = gsap.utils.toArray<HTMLElement>(":scope > span > span", el);
          if (!inner.length) return;

          gsap.set(inner, { yPercent: 115 });

          const rise = () =>
            gsap.to(inner, {
              yPercent: 0,
              duration: 1.1,
              stagger: 0.09,
              ease: "expo.out",
              overwrite: "auto",
            });

          if (inViewAtLoad(el)) {
            intro.add(rise, 0);
          } else {
            ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: rise });
          }
        });

        // --- Everything else drifts up, grouped by shared parent ----------
        const groups = new Map<Element, HTMLElement[]>();
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const parent = el.parentElement;
          if (!parent) return;
          const list = groups.get(parent) ?? [];
          list.push(el);
          groups.set(parent, list);
        });

        groups.forEach((els, parent) => {
          gsap.set(els, { opacity: 0, y: 34 });

          const drift = () =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: "auto",
            });

          if (inViewAtLoad(parent)) {
            intro.add(drift, 0.25);
          } else {
            ScrollTrigger.create({ trigger: parent, start: "top 88%", once: true, onEnter: drift });
          }
        });
      });

      // Web fonts land after first paint and change element heights, which
      // invalidates every trigger position measured before they arrived.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
