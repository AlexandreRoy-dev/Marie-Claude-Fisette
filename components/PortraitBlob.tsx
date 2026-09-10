import Image from "next/image";
import { SITE } from "@/lib/site";

const SRC = "/img/marie-claude-fisette.webp";
const SIZES = "(max-width: 768px) 80vw, 380px";

const ACCENTS = {
  citron: "-bottom-6 -left-6 h-40 w-40 bg-citron opacity-60",
  coral: "-bottom-8 -right-6 h-44 w-44 bg-coral opacity-50",
} as const;

/**
 * The one photograph on the site, held in the fluid blob motif.
 *
 * The source is a cutout on transparency, so the shape would otherwise fill
 * with flat paper. A scaled, heavily blurred copy of the same file sits behind
 * the crisp one, which fills it with her own colour instead. Same src, so the
 * browser fetches one image.
 */
export function PortraitBlob({
  accent,
  priority = false,
}: {
  accent: keyof typeof ACCENTS;
  priority?: boolean;
}) {
  return (
    <div data-reveal className="relative mx-auto w-full max-w-sm">
      <div
        className="relative overflow-hidden bg-paper-warm"
        style={{ borderRadius: "var(--radius-blob)" }}
      >
        <Image
          src={SRC}
          alt=""
          aria-hidden="true"
          width={1250}
          height={2048}
          sizes={SIZES}
          className="pointer-events-none absolute inset-0 size-full scale-[1.6] object-cover opacity-45 blur-3xl saturate-200"
        />
        <Image
          src={SRC}
          alt={`${SITE.broker}, ${SITE.brokerTitle}`}
          width={1250}
          height={2048}
          sizes={SIZES}
          className="relative h-auto w-full object-cover"
          priority={priority}
        />
      </div>
      <span
        aria-hidden="true"
        className={`absolute -z-10 rounded-full blur-2xl ${ACCENTS[accent]}`}
      />
    </div>
  );
}
