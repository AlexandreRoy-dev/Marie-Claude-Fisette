"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const BLOBS = [
  { color: "var(--color-citron)", size: 34, x: -10, y: -8, dur: 26 },
  { color: "var(--color-coral)", size: 30, x: 72, y: 22, dur: 32 },
  { color: "var(--color-pine)", size: 36, x: 18, y: 74, dur: 38 },
];

/**
 * The perpetual layer behind the page. Three large blurred blobs drift on long
 * offset loops and lean a few dozen pixels toward the pointer, heavily eased.
 * Transform and opacity only.
 */
export function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const blobs = gsap.utils.toArray<HTMLElement>(".blob", root.current);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        blobs.forEach((blob, i) => {
          const { dur } = BLOBS[i];
          gsap.to(blob, {
            xPercent: gsap.utils.random(-18, 18),
            yPercent: gsap.utils.random(-16, 16),
            scale: gsap.utils.random(0.88, 1.16),
            duration: dur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 1.6,
          });
        });

        // Pointer lean. Only the container moves, so it is one transform.
        const setX = gsap.quickTo(root.current, "x", { duration: 2.4, ease: "power3.out" });
        const setY = gsap.quickTo(root.current, "y", { duration: 2.4, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setX(nx * 46);
          setY(ny * 34);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="atmosphere" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="blob"
          style={{
            background: b.color,
            width: `${b.size}vmax`,
            height: `${b.size}vmax`,
            left: `${b.x}%`,
            top: `${b.y}%`,
          }}
        />
      ))}
    </div>
  );
}
