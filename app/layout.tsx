import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import { Atmosphere } from "@/components/Atmosphere";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Courtière hypothécaire résidentielle en Estrie`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Marie-Claude Fisette, courtière hypothécaire résidentielle à Sherbrooke. Achat d’une première propriété, achat, renouvellement et refinancement. Je compare les prêteurs pour vous : je ne suis pas un prêteur.",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} · Courtière hypothécaire résidentielle en Estrie`,
    description:
      "Achat d’une première propriété, achat, renouvellement, refinancement. Analyse de votre capacité, puis comparaison de plusieurs prêteurs.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        {/* Reveal targets start at opacity 0 and are animated in by GSAP. With
            JS disabled that would leave a blank page, so undo it here. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal-line] > span > span{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Aller au contenu
        </a>

        <Atmosphere />
        <SmoothScroll />
        <SiteHeader />

        <main id="contenu">{children}</main>

        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
