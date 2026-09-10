import { z } from "zod";

export const PROJECT_TYPES = {
  premiere: "Achat d’une première propriété",
  achat: "Achat d’une propriété",
  renouvellement: "Renouvellement",
  refinancement: "Refinancement",
  autre: "Autre / je ne sais pas encore",
} as const;

export const TIMELINES = {
  maintenant: "Le plus tôt possible",
  "3mois": "Dans les 3 prochains mois",
  "6mois": "Dans 3 à 6 mois",
  explore: "J’explore, sans échéance",
} as const;

export const CONTACT_METHODS = {
  telephone: "Téléphone",
  courriel: "Courriel",
  texte: "Message texte",
} as const;

/** Shared by the client form and the route handler, so validation cannot drift. */
export const leadSchema = z.object({
  firstName: z.string().trim().min(1, "Indiquez votre prénom.").max(80),
  lastName: z.string().trim().min(1, "Indiquez votre nom.").max(80),
  email: z.string().trim().toLowerCase().email("Indiquez un courriel valide."),
  phone: z
    .string()
    .trim()
    .min(10, "Indiquez un numéro de téléphone à 10 chiffres.")
    .max(25)
    .refine((v) => (v.match(/\d/g) ?? []).length >= 10, "Indiquez un numéro de téléphone à 10 chiffres."),
  projectType: z.enum(Object.keys(PROJECT_TYPES) as [keyof typeof PROJECT_TYPES]),
  timeline: z.enum(Object.keys(TIMELINES) as [keyof typeof TIMELINES]),
  contactMethod: z.enum(Object.keys(CONTACT_METHODS) as [keyof typeof CONTACT_METHODS]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Votre consentement est requis pour vous répondre." }),
  // Honeypot. Real users never see this field, so any value means a bot.
  // Deliberately permissive: rejecting it here would answer the bot with a
  // field error naming `website`, telling it exactly which input to clear.
  // The route accepts it and drops it silently instead.
  website: z.string().max(200).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
