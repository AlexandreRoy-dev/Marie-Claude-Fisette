/**
 * Single source of truth for brand and contact facts.
 *
 * "Palier" is the marketing brand of the website. The AMF-registered
 * brokerage firm is Intelligence Hypothécaire, part of the Groupe Financier
 * Signature network. That distinction has to stay visible in the footer and on
 * the legal page.
 */
export const SITE = {
  name: "Palier",
  url: "https://mcf.codesurmesure.ca",
  broker: "Marie-Claude Fisette",
  brokerTitle: "courtière hypothécaire",
  firm: "Intelligence Hypothécaire",
  network: "Groupe Financier Signature",
  phone: "819 272-8422",
  phoneHref: "+18192728422",
  email: "mc.fisette@groupeih.ca",
  region: "Sherbrooke et l’Estrie",
} as const;

export const NAV = [
  { href: "/#situations", label: "Votre situation" },
  { href: "/#deroulement", label: "Déroulement" },
  { href: "/a-propos", label: "À propos" },
  { href: "/#questions", label: "Questions" },
] as const;
