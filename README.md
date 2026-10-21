# Marie-Claude Fisette

Site statique one-page. Courtage hypothécaire résidentiel, partout au Québec.

Marie-Claude Fisette est courtière hypothécaire. Le courtage est exercé par l’entremise d’Intelligence Hypothécaire, du réseau Groupe Financier Signature.

## Lancer en local

```bash
python -m http.server 4173
```

http://localhost:4173/

## Adresse du site

L’adresse canonique, Open Graph, le JSON-LD, `robots.txt` et `sitemap.xml` viennent de `siteUrl` dans `site.config.json` (sans barre finale).

Aujourd'hui le site est servi sur GitHub Pages, sans domaine propre. Quand le domaine de Marie-Claude Fisette sera choisi :

1. Remplacer `siteUrl` dans `site.config.json`.
2. Lancer `node scripts/apply-site-url.mjs`.
3. Ajouter le fichier `CNAME` et brancher le domaine dans les réglages GitHub Pages (Enforce HTTPS). Ce dépôt ne le fait pas tant que le domaine n'est pas décidé.

## Couleurs

Magenta `#8E0078` / `#5A004C` / `#C200A8` sur fond clair. Titres en phrase, français du Québec (`fr-CA`).
