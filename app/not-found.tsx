import { MagneticLink } from "@/components/MagneticLink";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center px-6 py-40">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-mega leading-none tracking-[-0.05em] text-coral">404</p>
        <h1 className="mt-6 text-h2">Cette page n’existe pas</h1>
        <p className="mt-5 text-lede text-ink-soft">
          Le lien est peut-être périmé. Revenez à l’accueil ou écrivez-moi directement.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticLink href="/" variant="solid">
            Retour à l’accueil
          </MagneticLink>
          <MagneticLink href="/contact" variant="outline">
            Me joindre
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
