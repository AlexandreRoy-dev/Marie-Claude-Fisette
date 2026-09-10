"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Lines } from "@/components/Lines";

const STEPS = [
  {
    n: "01",
    title: "Un appel pour comprendre votre projet",
    body: "Ce que vous voulez acheter, votre échéance, ce qui vous inquiète. Une vingtaine de minutes, sans document à préparer.",
  },
  {
    n: "02",
    title: "L’analyse de votre capacité",
    body: "Revenus, mise de fonds, dettes, historique de crédit. On établit ce qui est réellement finançable avant de parler à un prêteur.",
  },
  {
    n: "03",
    title: "La mise en marché de votre dossier",
    body: "Votre dossier est présenté aux prêteurs qui conviennent à votre situation. Vous voyez les scénarios et vous choisissez.",
  },
  {
    n: "04",
    title: "L’accompagnement jusqu’au notaire",
    body: "Conditions, documents, dates. On suit le dossier jusqu’à la signature, puis au renouvellement le moment venu.",
  },
];

/** Matches the reveal threshold below, so a step already on screen at mount
 *  plays immediately instead of waiting for a scroll that never comes. */
function inViewAtMount(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.85 && r.bottom > 0;
}

/**
 * Vertical timeline. A citron rule fills top-to-bottom against scroll position
 * while each step fades up and lights its marker as it comes into view. No
 * pinning: the section scrolls at page speed, so the four steps stay legible
 * together instead of replacing one another.
 */
export function ProcessScene() {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean };
          const items = gsap.utils.toArray<HTMLElement>("[data-item]", root.current);
          const fill = root.current?.querySelector<HTMLElement>("[data-fill]");
          const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", root.current);
          if (!items.length || !fill || !list.current) return;

          if (!motion) {
            gsap.set(items, { opacity: 1, y: 0 });
            gsap.set(dots, { scale: 1 });
            gsap.set(fill, { scaleY: 1 });
            return;
          }

          // opacity, not autoAlpha: visibility:hidden would pull the unrevealed
          // steps out of the accessibility tree and out of find-in-page.
          gsap.set(items, { opacity: 0, y: 40 });
          gsap.set(dots, { scale: 0 });
          gsap.set(fill, { scaleY: 0 });

          // The rule tracks raw scroll position rather than the step reveals,
          // so it keeps moving between steps instead of jumping four times.
          const rule = gsap.to(fill, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list.current,
              start: "top 72%",
              end: "bottom 78%",
              scrub: 0.6,
            },
          });

          const play = (item: HTMLElement, dot: Element | null) => {
            gsap.to(item, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" });
            if (dot) {
              gsap.to(dot, { scale: 1, duration: 0.5, ease: "back.out(2)", delay: 0.1 });
            }
          };

          const triggers: ScrollTrigger[] = [];

          items.forEach((item) => {
            const dot = item.querySelector("[data-dot]");
            if (inViewAtMount(item)) {
              play(item, dot);
              return;
            }
            triggers.push(
              ScrollTrigger.create({
                trigger: item,
                start: "top 85%",
                once: true,
                onEnter: () => play(item, dot),
              }),
            );
          });

          return () => {
            rule.scrollTrigger?.kill();
            triggers.forEach((t) => t.kill());
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="deroulement" className="on-pine bg-pine text-paper">
      <div ref={root} className="mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
        <p data-reveal className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-citron">
          Déroulement
        </p>

        <Lines as="h2" lines={["Comment se déroule", "un dossier avec moi"]} className="max-w-3xl" />

        <ol ref={list} className="relative mt-16 lg:mt-24">
          {/* Rail. Both the track and the fill fade out at the bottom so the
              line can run the full list without needing to be measured. */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-5 lg:w-6">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-paper/25 via-paper/25 to-transparent" />
            <span
              data-fill
              className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-citron via-citron to-transparent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {STEPS.map((s) => (
            <li
              key={s.n}
              data-item
              className="grid grid-cols-[1.25rem_1fr] gap-x-6 pb-16 last:pb-0 lg:grid-cols-[1.5rem_1fr] lg:gap-x-12 lg:pb-24"
            >
              <span
                aria-hidden="true"
                className="mx-auto mt-2.5 block size-3.5 rounded-full bg-paper/25 ring-4 ring-pine lg:mt-5"
              >
                <span data-dot className="block size-full rounded-full bg-citron" />
              </span>

              <div className="lg:grid lg:grid-cols-[7rem_1fr] lg:gap-x-12">
                <p className="mb-3 font-display text-4xl leading-none text-citron lg:mb-0 lg:text-6xl">
                  {s.n}
                </p>
                <div className="max-w-2xl">
                  <h3 className="mb-4">{s.title}</h3>
                  <p className="text-lede leading-relaxed text-paper/75">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
