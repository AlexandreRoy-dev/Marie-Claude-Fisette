import Link from "next/link";
import { Lines } from "@/components/Lines";
import { MagneticLink } from "@/components/MagneticLink";
import { PortraitBlob } from "@/components/PortraitBlob";
import { ProcessScene } from "@/components/ProcessScene";
import { SITE } from "@/lib/site";

const SITUATIONS = [
  {
    id: "premiere",
    label: "Achat d’une première propriété",
    body: "Vous ne savez pas encore ce que vous pouvez vous permettre, ni combien il vous faut de mise de fonds. On commence par établir votre capacité, en langage clair, avant de visiter quoi que ce soit.",
  },
  {
    id: "achat",
    label: "Achat d’une propriété",
    body: "Vous avez déjà été propriétaire, ou vous changez de maison. Le financement doit tenir compte de la vente, du calendrier et des deux dates de notaire.",
  },
  {
    id: "renouvellement",
    label: "Renouvellement",
    body: "Votre terme arrive à échéance. Votre institution vous a envoyé une offre. On la compare avec le marché avant que vous signiez par habitude.",
  },
  {
    id: "refinancement",
    label: "Refinancement",
    body: "Utiliser la valeur accumulée dans votre propriété pour des travaux, pour regrouper des dettes ou pour libérer un budget mensuel.",
  },
];

const QUESTIONS = [
  {
    q: "Est-ce que vos services me coûtent quelque chose\u202F?",
    a: "Dans la très grande majorité des dossiers résidentiels, c’est le prêteur qui verse ma rétribution, pas vous. S’il devait y avoir des frais à votre charge dans une situation particulière, je vous les divulgue par écrit avant que le travail commence. Vous ne recevez jamais de facture surprise.",
  },
  {
    q: "Est-ce que vous prêtez l’argent\u202F?",
    a: "Non. Je suis courtière hypothécaire, pas prêteuse. Mon travail est de monter votre dossier et de le présenter aux prêteurs qui conviennent à votre situation, puis de vous expliquer les scénarios. La décision d’accorder le prêt appartient toujours au prêteur.",
  },
  {
    q: "Pouvez-vous me donner un taux tout de suite\u202F?",
    a: "Non, et personne ne devrait le faire de façon sérieuse. Un taux dépend de votre dossier, du type de propriété, de la mise de fonds et du moment. Je vous donne des chiffres une fois que j’ai regardé votre situation, et ils viennent avec les conditions qui les accompagnent.",
  },
  {
    q: "Mon crédit n’est pas parfait. Est-ce que ça vaut la peine d’appeler\u202F?",
    a: "Oui, et c’est souvent le meilleur moment pour appeler. Certains prêteurs lisent un historique imparfait autrement que votre institution. Je vous dirai franchement si un dossier ne tient pas, plutôt que de vous faire perdre des mois.",
  },
  {
    q: "Est-ce que vous travaillez ailleurs qu’à Sherbrooke\u202F?",
    a: "Ma pratique est ancrée à Sherbrooke et en Estrie, et je travaille ailleurs au Québec quand le dossier s’y prête. La rencontre peut se faire en personne, par téléphone ou en visioconférence.",
  },
  {
    q: "Combien de temps ça prend\u202F?",
    a: "L’appel initial dure une vingtaine de minutes. L’analyse de votre capacité prend généralement quelques jours ouvrables une fois vos documents reçus. La suite dépend du prêteur et de votre échéance, et je vous donne un calendrier réaliste dès le départ.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      telephone: `+1-819-272-8422`,
      email: SITE.email,
      areaServed: [{ "@type": "AdministrativeArea", name: "Estrie, Québec" }],
      serviceType: [
        "Courtage hypothécaire résidentiel",
        "Achat d’une première propriété",
        "Renouvellement hypothécaire",
        "Refinancement hypothécaire",
      ],
      description:
        "Courtage hypothécaire résidentiel. Analyse de la capacité d’emprunt et comparaison de plusieurs prêteurs. Courtière, non prêteuse.",
      parentOrganization: { "@type": "Organization", name: SITE.firm },
      employee: {
        "@type": "Person",
        name: SITE.broker,
        jobTitle: "Courtière hypothécaire",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: QUESTIONS.map((item) => ({
        "@type": "Question",
        name: item.q.replace(/\u202F/g, " "),
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative flex min-h-[92svh] items-end px-6 pb-16 pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <p
            data-reveal
            className="mb-8 text-eyebrow font-medium uppercase tracking-[0.22em] text-ink-soft"
          >
            {SITE.broker} · {SITE.region}
          </p>

          <Lines
            as="h1"
            lines={["Courtière", "hypothécaire", "résidentielle"]}
            className="max-w-5xl"
          />

          <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
            <p data-reveal className="max-w-xl text-lede text-ink-soft">
              J’analyse votre capacité d’emprunt, je monte votre dossier, puis je le présente à
              plusieurs prêteurs pour trouver le financement qui convient à votre projet. Je compare
              les offres&#8239;: je ne suis pas un prêteur.
            </p>

            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <MagneticLink href="/contact" variant="citron">
                Réserver un appel
              </MagneticLink>
              <MagneticLink href="#situations" variant="outline">
                Voir votre situation
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- What a broker actually is */}
      <section className="border-y border-line px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Lines
            as="h2"
            lines={["Ce que fait", "une courtière"]}
            className="text-h2"
          />
          <div className="space-y-6 text-lede text-ink-soft">
            <p data-reveal>
              Votre institution financière vous propose ses propres produits. C’est normal&#8239;:
              c’est son rôle. Le mien est différent. Je regarde votre dossier, puis je vais voir
              plusieurs prêteurs pour comparer ce que chacun accepte de faire avec votre situation.
            </p>
            <p data-reveal>
              Vous obtenez les scénarios côte à côte, avec les conditions attachées à chacun, et vous
              décidez. Aucune approbation ne vient de moi&#8239;: elle vient du prêteur. Mon travail
              est de vous amener devant les bons prêteurs avec un dossier solide.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Situations */}
      <section id="situations" className="scroll-mt-24 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p
            data-reveal
            className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-ink-soft"
          >
            Votre situation
          </p>
          <Lines as="h2" lines={["Quatre points de départ", "possibles"]} className="max-w-3xl" />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-line md:grid-cols-2">
            {SITUATIONS.map((s, i) => (
              <article
                key={s.id}
                data-reveal
                className="group relative bg-paper p-8 transition-colors duration-500 hover:bg-paper-warm md:p-12"
              >
                <span className="font-display text-sm text-coral">0{i + 1}</span>
                <h3 className="mt-4 max-w-sm">{s.label}</h3>
                <p className="mt-4 max-w-md text-ink-soft">{s.body}</p>

                {/* Fluid wash that swells on hover. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 scale-50 rounded-full bg-citron opacity-0 blur-3xl transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-40"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Pinned scroll set piece */}
      <ProcessScene />

      {/* ----------------------------------------------------------------- Her */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.85fr_1fr] md:gap-20">
          <PortraitBlob accent="citron" />

          <div>
            <p
              data-reveal
              className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-ink-soft"
            >
              Qui vous accompagne
            </p>
            <Lines as="h2" lines={["Marie-Claude Fisette"]} />
            <div className="mt-8 space-y-5 text-lede text-ink-soft">
              <p data-reveal>
                J’ai commencé en institution financière, du côté où l’on ne peut offrir qu’un seul
                catalogue de produits. J’ai choisi le courtage pour pouvoir dire à quelqu’un
                «&#8239;ce n’est pas le bon prêteur pour vous&#8239;» et avoir une autre option à
                proposer.
              </p>
              <p data-reveal>
                Ma pratique est résidentielle et locale&#8239;: {SITE.region}. Vous me parlez
                directement, du premier appel jusqu’au notaire, puis au renouvellement.
              </p>
            </div>
            <div data-reveal className="mt-10">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 transition-colors hover:border-ink"
              >
                En savoir plus sur mon parcours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Questions */}
      <section id="questions" className="scroll-mt-24 border-t border-line px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p
              data-reveal
              className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-ink-soft"
            >
              Questions
            </p>
            <Lines as="h2" lines={["Ce qu’on me", "demande le plus"]} />
          </div>

          <div className="divide-y divide-line border-y border-line">
            {QUESTIONS.map((item) => (
              <details key={item.q} data-reveal className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-h3 font-display tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="mt-2 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Closing CTA */}
      <section className="on-pine relative overflow-hidden bg-pine px-6 py-28 text-paper md:py-36">
        <div className="mx-auto max-w-6xl">
          <Lines
            as="h2"
            lines={["Un appel de vingt minutes", "pour savoir où vous en êtes"]}
            className="max-w-4xl"
          />
          <p data-reveal className="mt-8 max-w-xl text-lede text-paper/70">
            Sans document à préparer et sans engagement. On regarde votre projet, je vous dis ce qui
            est réaliste, et vous décidez de la suite.
          </p>
          <div data-reveal className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticLink href="/contact" variant="citron">
              Réserver un appel
            </MagneticLink>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="font-display text-3xl tracking-[-0.03em] transition-colors hover:text-citron md:text-4xl"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-citron/25 blur-[100px]"
        />
      </section>
    </>
  );
}
