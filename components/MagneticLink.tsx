"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "citron";
  className?: string;
};

const VARIANTS = {
  solid: "bg-ink text-paper",
  citron: "bg-citron text-ink",
  outline: "border border-ink/25 text-ink hover:border-ink/60",
} as const;

/**
 * Call-to-action that leans toward the pointer. The label counter-moves at a
 * third of the distance, which reads as weight rather than a slide.
 *
 * Pointer events are only bound on devices that actually hover, so touch users
 * get a plain link with no listeners.
 */
export function MagneticLink({ href, children, variant = "solid", className = "" }: Props) {
  const wrap = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const labelX = gsap.quickTo(label.current, "x", { duration: 0.6, ease: "power3.out" });
        const labelY = gsap.quickTo(label.current, "y", { duration: 0.6, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          toX(dx * 0.28);
          toY(dy * 0.4);
          labelX(dx * 0.1);
          labelY(dy * 0.14);
        };

        const onLeave = () => {
          toX(0);
          toY(0);
          labelX(0);
          labelY(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);

        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <Link
      ref={wrap}
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[0.95rem] font-medium tracking-tight transition-colors ${VARIANTS[variant]} ${className}`}
    >
      <span ref={label} className="inline-flex items-center gap-2">
        {children}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
