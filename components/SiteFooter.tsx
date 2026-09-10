import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-pine bg-pine-deep text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-[-0.04em]">
              {SITE.name}
              <span className="text-coral">.</span>
            </p>
            <p className="mt-4 max-w-xs text-paper/60">
              {SITE.broker}, {SITE.brokerTitle}. {SITE.region}.
            </p>
          </div>

          <div>
            <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-citron">
              Joindre
            </p>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-citron">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-citron">
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-citron">
                  Formulaire de contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-citron">
              Le site
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="hover:text-citron">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-citron">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory footer. Text only: the firm and network marks must not be
            used as logos here. */}
        <div className="mt-16 border-t border-paper/15 pt-8 text-sm leading-relaxed text-paper/55">
          <p className="max-w-3xl">
            {SITE.broker}, {SITE.brokerTitle}, titulaire d’un certificat délivré par l’Autorité des
            marchés financiers. Courtage hypothécaire exercé par l’entremise d’{SITE.firm}, cabinet
            du réseau {SITE.network}. {SITE.name} est la marque de ce site.{" "}
            <strong className="font-medium text-paper/75">
              Je ne suis pas un prêteur et je n’accorde aucun financement&#8239;: je compare les
              offres de plusieurs prêteurs pour vous.
            </strong>{" "}
            Aucun taux, aucune approbation et aucun montant ne sont garantis. Chaque dossier est
            analysé individuellement et l’acceptation demeure la décision du prêteur.
          </p>
          <p className="mt-6">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
