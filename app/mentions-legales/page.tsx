import type { Metadata } from "next";
import { Lines } from "@/components/Lines";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales, encadrement par l’Autorité des marchés financiers, divulgations et protection des renseignements personnels.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="px-6 pb-28 pt-40">
      <div className="mx-auto max-w-3xl">
        <p
          data-reveal
          className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-ink-soft"
        >
          Mentions légales
        </p>
        <Lines as="h1" lines={["Encadrement", "et divulgations"]} className="text-h2" />

        <div className="mt-16 space-y-14">
          <Block title="Qui exploite ce site">
            <p>
              {SITE.name} est la marque du site web de {SITE.broker}, {SITE.brokerTitle}. Le courtage
              hypothécaire est exercé par l’entremise d’{SITE.firm}, cabinet inscrit auprès de
              l’Autorité des marchés financiers et membre du réseau {SITE.network}.
            </p>
            <p>
              {SITE.name} n’est pas un cabinet distinct et ne détient pas d’inscription propre&#8239;:
              il s’agit du nom sous lequel {SITE.broker} présente sa pratique en ligne. Le cabinet
              responsable demeure {SITE.firm}.
            </p>
          </Block>

          <Block title="Encadrement professionnel">
            <p>
              Au Québec, le courtage hypothécaire est encadré par l’Autorité des marchés financiers
              (AMF) en vertu de la <em>Loi sur la distribution de produits et services financiers</em>.
              {" "}
              {SITE.broker} est titulaire d’un certificat délivré par l’AMF dans la discipline du
              courtage hypothécaire.
            </p>
            <p>
              Vous pouvez vérifier le droit d’exercice d’un courtier ou d’un cabinet en consultant le
              registre des entreprises et des individus autorisés à exercer, publié par l’AMF sur{" "}
              <a
                href="https://lautorite.qc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-ink/30 hover:border-ink"
              >
                lautorite.qc.ca
              </a>
              .
            </p>
          </Block>

          <Block title="Courtière, et non prêteuse">
            <p>
              {SITE.broker} n’est pas un prêteur et n’accorde aucun financement. Son rôle est
              d’analyser votre situation, de monter votre dossier et de le présenter à des prêteurs.
              La décision d’accorder ou de refuser un prêt, ainsi que les conditions rattachées à
              celui-ci, appartient exclusivement au prêteur.
            </p>
            <p>
              Aucun taux, aucun montant, aucune approbation et aucun délai ne sont garantis par ce
              site ou par le formulaire qu’il contient. Aucun taux n’y est affiché, parce qu’un taux
              dépend du dossier, du type de propriété, de la mise de fonds et du moment où la demande
              est présentée.
            </p>
          </Block>

          <Block title="Rétribution">
            <p>
              Dans la grande majorité des dossiers de financement résidentiel, la rétribution de la
              courtière est versée par le prêteur avec qui le prêt est conclu, et non par le client.
            </p>
            <p>
              Conformément au <em>Règlement sur l’exercice des activités des représentants</em>, la
              courtière vous divulgue par écrit, avant de commencer la prestation de services, son
              mode de rétribution, y compris tous frais qui seraient à votre charge. Elle vous
              divulgue également par écrit, avant de vous proposer un prêt, la nature de la
              rétribution reçue du prêteur, le nom des prêteurs concernés et tout lien d’affaires
              avec le prêteur. Ces divulgations sont faites dans votre dossier et ne sont pas
              remplacées par la présente page.
            </p>
          </Block>

          <Block title="Renseignements personnels">
            <p>
              Les renseignements transmis par le formulaire de ce site servent uniquement à
              communiquer avec vous au sujet de votre demande et, si vous allez de l’avant, à monter
              votre dossier de financement. Ils ne sont ni vendus, ni loués, ni échangés.
            </p>
            <p>
              Ces renseignements sont conservés dans les systèmes du cabinet et transmis à un prêteur
              uniquement avec votre autorisation, dans le cadre d’une demande de financement. Vous
              pouvez en tout temps demander l’accès à vos renseignements, leur rectification, ou leur
              retrait de nos communications en écrivant à{" "}
              <a href={`mailto:${SITE.email}`} className="break-all border-b border-ink/30 hover:border-ink">
                {SITE.email}
              </a>
              .
            </p>
          </Block>

          <Block title="Langue">
            <p>
              Ce site est publié en français, langue officielle et commune du Québec, conformément à
              la <em>Charte de la langue française</em>.
            </p>
          </Block>

          <Block title="Nous joindre">
            <p>
              {SITE.broker}, {SITE.brokerTitle}
              <br />
              <a href={`tel:${SITE.phoneHref}`} className="border-b border-ink/30 hover:border-ink">
                {SITE.phone}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="break-all border-b border-ink/30 hover:border-ink">
                {SITE.email}
              </a>
            </p>
          </Block>
        </div>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-reveal>
      <h2 className="text-h3">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-soft">{children}</div>
    </div>
  );
}
