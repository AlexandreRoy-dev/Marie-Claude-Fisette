---
name: quebec-courtier-hypothecaire
description: Write and review marketing copy for a Quebec mortgage broker (courtier hypothecaire) so it survives AMF scrutiny. Covers the broker-is-not-a-lender distinction, the ban on advertised rates and approval promises, required firm and certificate mentions, compensation-disclosure boundaries, and fr-CA typography. Use whenever writing, editing, or reviewing French copy, headings, FAQs, legal pages, form labels, or metadata for a mortgage brokerage site in Quebec.
---

# Courtier hypothécaire au Québec — copy and compliance

Mortgage brokering in Quebec is regulated by the **Autorité des marchés financiers (AMF)**, not the OACIQ. The governing texts are the *Loi sur la distribution de produits et services financiers* (LDPSF, chapitre D-9.2) and the *Règlement sur l'exercice des activités des représentants* (D-9.2, r. 10).

A marketing site is "représentation" and "sollicitation de clientèle". Everything on it is inside the regulated perimeter.

## The one rule that governs all copy

**Faire des représentations qui ne soient ni fausses ni trompeuses.** Every claim on the site must be true and must not create an impression the broker cannot deliver. Most compliance failures on broker websites are not exotic — they are ordinary marketing enthusiasm.

## Hard bans

Never write any of these, in any language, anywhere on the site:

| Banned | Why |
|---|---|
| A specific rate, or "à partir de X %" | Rates are lender-set, change daily, and depend on the file. An advertised number is a misleading representation. |
| "Approuvé", "garanti", "préapprobation garantie", "100 % d'acceptation" | The broker does not decide. Only the lender approves. |
| "Le meilleur taux", "les meilleurs taux du marché" | Unverifiable superlative. |
| "Nous prêtons", "notre financement", "nos prêts" | The broker is not the lender. This is the single most common and most serious error. |
| "Sans enquête de crédit", "peu importe votre crédit" | Implies bypassing lender underwriting. |
| Named lenders as a logo wall | Lender disclosure is a written, per-client obligation (art. 58.3), not a marketing badge. Also invites brand-permission problems. |
| Invented statistics, fake review counts, fake "X dossiers financés" | Must be true and substantiable. |
| Countdown timers, "offre limitée", pressure devices | Incompatible with the duty to advise. |

## Required or strongly expected mentions

- **She is a broker who compares lenders, not a lender.** State it plainly and early, not only in the footer.
- **The licensed firm.** For this project: *Intelligence Hypothécaire*, part of the *Groupe Financier Signature* network. The site's brand name is a marketing brand; the AMF-registered cabinet is Intelligence Hypothécaire. The legal page must make that relationship unambiguous.
- **AMF-certified broker.** "Courtière hypothécaire, titulaire d'un certificat délivré par l'Autorité des marchés financiers." Do not invent or display a certificate number unless the client supplies it.
- **Discipline wording.** The correct title is *courtier hypothécaire* / *courtière hypothécaire*. Not "courtier en hypothèque", not "spécialiste hypothécaire", not "conseiller hypothécaire".

### Reference marks

Lender and network logos are reference only. Do not place `Intelligence Hypothécaire` or `Groupe Financier Signature` marks in the header. The affiliation is stated as **text** in the footer and legal page.

## Compensation and lender disclosure — what belongs on a website

Articles 9.3 to 9.6 of D-9.2, r. 10 require **written** disclosure to the client, before services are rendered, of how the broker is paid — including whether the lender pays her, and, per art. 9.6, whether any single lender accounted for more than 50% of her brokered loans in the previous 12 months. Article 58.3 requires disclosing lender names before proposing a loan; 58.4 requires disclosing business relationships with the lender.

These are **client-file obligations, not website obligations.** Do not attempt to satisfy them with a web page, and never publish a specific percentage or lender-volume figure — it changes and would become false.

What the website *should* do is set an honest expectation:

> Dans la majorité des dossiers, c'est le prêteur qui verse la rétribution de la courtière. S'il y a des frais à votre charge, ils vous sont divulgués par écrit avant que le travail commence.

That is truthful, reassuring, and does not pre-empt the formal disclosure.

## Language of the site

Since 1 June 2025, under the *Charte de la langue française*, a commercial website of a business operating in Quebec must be available in French, and French must be markedly predominant in commercial advertising. For this project the site is **fr-CA only**. Set `lang="fr-CA"`. If English is ever added, French must remain predominant and complete.

## fr-CA typography

Get these right or the copy reads as machine-translated:

- **Narrow no-break space before `:` `;` `!` `?` and inside `« »`.** Use `&#8239;` (U+202F) or at minimum `&nbsp;`. Example: `Réserver un appel&#8239;?`
- **Typographic apostrophe `’`**, never `'`. `l’hypothèque`, not `l'hypothèque`.
- **Accents on capitals.** `À`, `É`, `Ê`. `À propos`, not `A propos`. This is mandatory in Quebec French.
- **French quotation marks** `« … »` with inner spacing, not `" "`.
- **Percent** with a no-break space: `20&nbsp;%`, not `20%`.
- **Numbers** use a space as thousands separator: `450 000 $`. Currency symbol **after** the amount with a no-break space.
- **Dates** lowercase month: `3 septembre 2026`.
- **Phone** `819 272-8422` is the Quebec convention. `(819) 272-8422` is acceptable but pick one and be consistent.
- **Titles/headings** use sentence case, not Title Case. `Comment se déroule un dossier`, not `Comment Se Déroule Un Dossier`.
- Avoid anglicisms: `versement` not `paiement mensuel` when meaning the installment, `mise de fonds` not `down payment`, `préqualification`/`préautorisation` handled carefully — prefer `analyse de capacité`.

## Residential vocabulary that is safe and accurate

- `achat d’une première propriété`
- `achat d’une propriété`
- `renouvellement` (existing mortgage coming to term)
- `refinancement`
- `analyse de capacité d’emprunt`
- `mise de fonds`
- `assurance prêt hypothécaire` (SCHL / Sagen / Canada Guaranty — do not promise eligibility)
- `taux fixe` / `taux variable` — may be explained, never quoted
- `amortissement`
- `simulation` / `scénarios`

## Voice

Direct, warm, plain. Short sentences. Speak to one person as `vous`. Explain the mechanism instead of asserting the benefit — a broker's advantage is structural (she shops multiple lenders) and can be stated factually without superlatives.

Per project rule: **no slogan headlines and no stacked punchline sequences.** Headings describe the section in one plain sentence.

## Review checklist

Before shipping any page, confirm:

1. No number that could be read as a rate.
2. No word implying approval, guarantee, or lending by her.
3. "Courtière hypothécaire" used correctly; the not-a-lender distinction appears above the fold.
4. Intelligence Hypothécaire / Groupe Financier Signature stated as text in footer and legal page.
5. Every statistic is one the client can substantiate, or it is gone.
6. `lang="fr-CA"`; narrow no-break spaces before `:` `?` `!`; `’` throughout; accented capitals.
7. Form consent language is explicit about being contacted, and the privacy/legal page exists and is linked.
