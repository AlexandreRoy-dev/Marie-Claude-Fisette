import Image from "next/image";
import { SITE } from "@/lib/site";

const ACCENTS = {
  citron: "-bottom-6 -left-6 h-40 w-40 bg-citron opacity-60",
  coral: "-bottom-8 -right-6 h-44 w-44 bg-coral opacity-50",
} as const;

/** The one photograph on the site, held in the fluid blob motif. */
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
          src="/img/marie-claude-fisette-office.webp"
          alt={`${SITE.broker}, ${SITE.brokerTitle}`}
          width={625}
          height={1024}
          sizes="(max-width: 768px) 80vw, 380px"
          className="h-auto w-full object-cover"
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
