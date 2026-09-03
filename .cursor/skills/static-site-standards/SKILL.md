---
name: static-site-standards
description: Default workflow for GitHub-hosted static websites with CRM form integration and Figma-informed UI. Use when building landing pages, marketing sites, brochure sites, or static pages that submit leads to Salesforce, GoHighLevel (GHL), or other CRMs.
---

# Static Site Standards

Apply these defaults unless the user or project overrides them.

## Stack defaults

- **Hosting target:** GitHub Pages or static export (no server runtime required)
- **Markup:** Semantic HTML5 (`header`, `main`, `nav`, `section`, `footer`)
- **CSS:** Mobile-first custom CSS with CSS variables for design tokens; Tailwind only if the project already uses it
- **JavaScript:** Vanilla ESM modules only — no React/Vue unless explicitly requested
- **Assets:** Optimized images (WebP/AVIF where supported), lazy loading below the fold

## Project structure

```
project/
├── index.html
├── css/
│   ├── tokens.css      # colors, spacing, typography variables
│   └── styles.css
├── js/
│   ├── main.js         # ESM entry
│   └── modules/        # form, nav, analytics
├── assets/
│   └── images/
└── README.md           # deploy instructions for GitHub Pages
```

## UI/UX requirements (always apply)

- Mobile-first responsive layout (320px → 1440px+)
- 8px spacing grid; consistent type scale
- Visible focus states on all interactive elements
- Color contrast ≥ 4.5:1 for body text (WCAG AA)
- Clear visual hierarchy: one primary CTA per section
- Loading and error states for all forms
- Empty states with helpful copy, not blank screens

## Figma → code workflow

When a Figma design exists:

1. Load `figma-use` skill before any Figma MCP calls
2. Pull design tokens (colors, spacing, typography) from Figma variables/styles
3. Map Figma components to semantic HTML sections — do not copy auto-layout as inline styles
4. Use CSS variables that match Figma token names where possible
5. Verify layout in browser after implementation

## CRM integration patterns

**Primary CRMs:** Salesforce and GoHighLevel (GHL). Load `salesforce-api`, `gohighlevel`, or `ghl-setup` skills when working with either.

For lead capture on static sites, prefer in order:

1. **Native CRM form embed** (GHL form iframe, Salesforce Web-to-Lead) — simplest, no backend
2. **CRM API via serverless function** (Netlify/Vercel/Cloudflare Worker) — when custom UX is needed
3. **Never call CRM APIs directly from browser JS** — tokens must stay server-side

### Form requirements

- Client-side validation before submit
- Honeypot field for spam protection
- Clear success and error messages (use `ux-writing` skill for copy)
- GDPR/consent checkbox when collecting personal data
- UTM parameters preserved and passed to CRM hidden fields or custom fields

### Salesforce static site pattern

```html
<!-- Web-to-Lead (no backend required) -->
<form action="https://webto.salesforce.com/servlet/WebToLead?encoding=UTF-8" method="POST">
  <input type="hidden" name="oid" value="ORG_ID">
  <input type="hidden" name="retURL" value="https://yoursite.com/thank-you">
  <input type="hidden" name="lead_source" value="Website">
  <!-- standard fields: first_name, last_name, email, company, etc. -->
</form>
```

For custom forms, use REST API via serverless proxy — see `salesforce-api`, `sf-integration`, and `crm-integration` skills.

### GoHighLevel static site pattern

```html
<!-- GHL native form embed (preferred) -->
<iframe src="https://api.leadconnectorhq.com/widget/form/FORM_ID"
  style="width:100%;height:600px;border:none;border-radius:4px"></iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```

For custom UI, proxy to GHL API v2 via serverless function — see `gohighlevel` and `ghl-setup` skills.

## SEO defaults

- Unique `<title>` and meta description per page
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Semantic heading order (one `h1` per page)
- `alt` text on all meaningful images
- `sitemap.xml` and `robots.txt` for multi-page sites

## GitHub Pages deployment

- Use `main` branch `/docs` folder or `gh-pages` branch
- Set `base` path correctly for project sites vs user sites
- Include `.nojekyll` if using paths starting with `_`
- Test all asset paths work with the GitHub Pages URL prefix

## Quality checklist before marking done

- [ ] Renders correctly at 375px, 768px, and 1280px
- [ ] All forms submit successfully (or show clear error)
- [ ] Keyboard navigation works end-to-end
- [ ] No console errors
- [ ] Lighthouse: Accessibility ≥ 90, Performance ≥ 85
- [ ] README includes deploy steps and CRM setup notes
