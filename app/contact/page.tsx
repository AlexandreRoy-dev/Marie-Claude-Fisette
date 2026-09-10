import type { Metadata } from "next";
import { Lines } from "@/components/Lines";
import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réserver un appel",
  description:
    "Prenez rendez-vous avec Marie-Claude Fisette, courtière hypothécaire résidentielle à Sherbrooke. Un appel d’une vingtaine de minutes, sans document à préparer.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="px-6 pb-28 pt-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p
            data-reveal
            className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-ink-soft"
          >
            Contact
          </p>
          <Lines as="h1" lines={["Réserver", "un appel"]} className="text-h2" />

          <p data-reveal className="mt-8 max-w-md text-lede text-ink-soft">
            Remplissez ce formulaire et je vous reviens en un jour ouvrable. Rien à préparer&#8239;:
            le premier appel sert à comprendre votre projet.
          </p>

          <dl data-reveal className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft">
                Téléphone
              </dt>
              <dd className="mt-1 font-display text-2xl tracking-[-0.03em]">
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-coral">
                  {SITE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft">
                Courriel
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-coral">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-ink-soft">
                Territoire
              </dt>
              <dd className="mt-1 text-ink-soft">
                {SITE.region}, et ailleurs au Québec selon le dossier. En personne, par téléphone ou
                en visioconférence.
              </dd>
            </div>
          </dl>
        </div>

        <div data-reveal>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
