"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { NAV, SITE } from "@/lib/site";
import { MagneticLink } from "@/components/MagneticLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // The header condenses once the hero is behind you.
  useGSAP(
    () => {
      gsap.to(bar.current, {
        backgroundColor: "rgba(246, 243, 237, 0.82)",
        backdropFilter: "blur(14px)",
        borderColor: "rgba(20, 18, 15, 0.1)",
        paddingTop: 10,
        paddingBottom: 10,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          start: "top -80",
          end: "max",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: bar },
  );

  // Lock the page behind the mobile panel, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useGSAP(
    () => {
      if (!panel.current) return;
      const links = panel.current.querySelectorAll("a");
      if (open) {
        gsap.set(panel.current, { display: "flex" });
        gsap.fromTo(panel.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          links,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.05 },
        );
      } else {
        gsap.to(panel.current, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => gsap.set(panel.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent px-6 py-5"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <Link href="/" className="font-display text-2xl font-700 tracking-[-0.04em]">
            {SITE.name}
            <span className="text-coral">.</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[0.92rem] text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticLink href="/contact" variant="solid">
              Parlons-en
            </MagneticLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 md:hidden"
          >
            <span
              className={`block h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.25px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`}
            />
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={panel}
        hidden={!open}
        className="fixed inset-0 z-[55] hidden flex-col justify-center gap-2 bg-paper px-8 md:!hidden"
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="border-b border-line py-5 font-display text-3xl tracking-[-0.03em]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-8 rounded-full bg-ink px-7 py-4 text-center text-paper"
        >
          Parlons-en
        </Link>
      </div>
    </>
  );
}
