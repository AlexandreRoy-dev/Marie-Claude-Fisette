import type { Metadata } from "next";
import Image from "next/image";
import { Lines } from "@/components/Lines";
import { MagneticLink } from "@/components/MagneticLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Marie-Claude Fisette, courtière hypothécaire résidentielle. Parcours en institution financière, puis courtage multi-prêteurs à Sherbrooke et en Estrie.",
  alternates: { canonical: "/a-propos" },
};

const PRINCIPLES = [
  {
    title: "Le portrait avant les chiffres",
    body: "Je ne parle pas de taux au premier appel. Je regarde d’abord vos revenus, votre mise de fonds, vos dettes et votre échéance. Un chiffre sans contexte ne vous sert à rien.",
  },
  {
    title: "Un non clair plutôt qu’un peut-être",
    body: "Si votre dossier ne tient pas maintenant, je vous le dis, et je vous explique ce qui devrait changer pour qu’il tienne. Vous perdez une conversation au lieu de plusieurs mois.",
  },
  {
    title: "Vous parlez toujours à la même personne",
    body: "Du premier appel jusqu’à la signature chez le notaire, puis au renouvellement. Votre dossier ne change pas de mains entre les étapes.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="px-6 pb-20 pt-40">
        <div className="mx-auto max-w-6xl">
          <p
            data-reveal
            className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-ink-soft"
          >
            À propos
          </p>
          <Lines as="h1" lines={["Marie-Claude", "Fisette"]} />
          <p data-reveal className="mt-8 max-w-2xl text-lede text-ink-soft">
            Courtière hypothécaire résidentielle, titulaire d’un certificat délivré par l’Autorité
            des marchés financiers. Pratique ancrée à {SITE.region}.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl items-start gap-14 md:grid-cols-[0.8fr_1fr] md:gap-20">
          <div data-reveal className="relative mx-auto w-full max-w-sm">
            <div
              className="relative overflow-hidden bg-paper-warm"
              style={{ borderRadius: "var(--radius-blob)" }}
            >
              <Image
                src="/img/marie-claude-fisette.webp"
                alt={`${SITE.broker}, ${SITE.brokerTitle}`}
                width={1250}
                height={2048}
                sizes="(max-width: 768px) 80vw, 380px"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-8 -right-6 -z-10 h-44 w-44 rounded-full bg-coral opacity-50 blur-2xl"
            />
          </div>

          <div className="space-y-6 text-lede text-ink-soft">
            <p data-reveal>
              J’ai commencé ma carrière en institution financière. J’y ai appris comment un dossier
              est réellement lu de l’autre côté du bureau&#8239;: ce qui fait hésiter un analyste,
              ce qui fait passer une demande, ce qui la fait bloquer. C’est une formation que je
              n’aurais pas eue autrement.
            </p>
            <p data-reveal>
              J’y ai aussi rencontré sa limite. Quand vous ne travaillez que pour un prêteur, vous
              n’avez qu’un catalogue. Des gens parfaitement solvables se faisaient refuser parce que
              leur situation ne rentrait pas dans une case précise, et je n’avais rien d’autre à leur
              offrir.
            </p>
            <p data-reveal>
              Je suis passée au courtage pour cette raison. Aujourd’hui, quand un prêteur ne convient
              pas à votre dossier, j’en ai d’autres à consulter. C’est toute la différence entre
              «&#8239;désolée, ça ne fonctionne pas&#8239;» et «&#8239;voyons ailleurs&#8239;».
            </p>
            <p data-reveal>
              Ma pratique est volontairement résidentielle&#8239;: première propriété, achat,
              renouvellement, refinancement. C’est là que je suis utile, et je préfère bien faire une
              chose que faire semblant d’en faire cinq.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Lines as="h2" lines={["Comment je travaille"]} />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article key={p.title} data-reveal>
                <span aria-hidden="true" className="mb-6 block h-px w-16 bg-coral" />
                <h3 className="mb-4">{p.title}</h3>
                <p className="text-ink-soft">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on-pine bg-pine px-6 py-28 text-paper">
        <div className="mx-auto max-w-6xl">
          <Lines
            as="h2"
            lines={["Parlons de votre projet"]}
            className="max-w-3xl"
          />
          <p data-reveal className="mt-8 max-w-xl text-lede text-paper/70">
            Un appel d’une vingtaine de minutes, sans document à préparer et sans engagement.
          </p>
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticLink href="/contact" variant="citron">
              Réserver un appel
            </MagneticLink>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="font-display text-3xl tracking-[-0.03em] transition-colors hover:text-citron"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
