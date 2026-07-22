# Blih Ops SEO Design

**Date:** 2026-07-22
**Status:** Approved for implementation planning
**Production origin:** `https://blihops.com`

## Purpose

Implement a controlled SEO foundation for the existing bilingual Blih Ops marketing site, then optimize each approved page family individually. The design favors a small explicit indexing allowlist so illustrative detail content cannot become indexable accidentally.

The project already has localized titles, descriptions, canonicals, language alternates, Open Graph metadata, and Twitter defaults. This work will audit and complete that foundation rather than replace it wholesale.

## Goals

- Make only approved English and German pages indexable at launch.
- Keep canonical, locale-alternate, sitemap, and indexing behavior consistent.
- Complete shared metadata, icons, social previews, `robots.txt`, and `sitemap.xml`.
- Optimize each approved page for search intent, content quality, internal linking, images, initial HTML, and mobile usability.
- Verify SEO before deployment and again on the production domain.
- Prepare a clean Google Search Console handoff.

## Non-Goals

- Indexing current case-study, insight, or career detail pages.
- Replacing the static content system with a CMS.
- Renaming existing public routes without a serious technical or semantic issue.
- Adding a web-app manifest when the marketing site is not intended to be installable.
- Treating the meta-keywords field as a ranking feature.
- Creating speculative structured data unsupported by visible, verified content.

## Indexing Policy

### Indexable Route Families

The sitemap will contain both `en` and `de` versions of these 11 route families, for 22 URLs total:

| Path             | Purpose                     |
| ---------------- | --------------------------- |
| `/`              | Home                        |
| `/what-we-offer` | Services                    |
| `/how-we-work`   | Process and security        |
| `/who-we-are`    | About                       |
| `/pilot`         | Free pilot conversion       |
| `/contact`       | Contact                     |
| `/skills`        | Skills product landing page |
| `/talent`        | Talent product landing page |
| `/case-studies`  | Case-study archive          |
| `/insights`      | Insights archive            |
| `/careers`       | Careers archive             |

Every indexable page will have:

- A self-referencing canonical under `https://blihops.com`.
- Reciprocal `en` and `de` `hreflang` links, including the current page itself.
- An `x-default` alternate pointing to the English equivalent.
- `index, follow` behavior in production.
- A sitemap entry using its fully qualified canonical URL.

English and German pages remain separate canonical pages. Neither language canonicalizes to the other.

### Non-Indexable Routes

All current routes under these patterns are excluded from the sitemap and return `noindex, follow`:

- `/[locale]/case-studies/[slug]`
- `/[locale]/insights/[slug]`
- `/[locale]/careers/[slug]`

This applies even though German detail requests currently redirect to English. The policy prevents the current 21 illustrative English detail records from entering search results while allowing crawlers to follow their links.

Catch-all pages, 404 pages, unsupported locales, and non-production deployments are non-indexable. The localized archive pages remain indexable as explicitly approved.

## Shared Architecture

Add a small shared SEO configuration containing only:

- Production origin.
- Brand and organization names.
- Supported locales and default locale.
- Approved indexable path allowlist.
- Shared default social-image path.

The existing `messages/en.json` and `messages/de.json` metadata namespaces remain the source of translated titles and descriptions. The existing metadata helper remains the page-level integration point and will be extended rather than replaced by a second content model.

The allowlist will drive sitemap generation and provide a single auditable record of launch indexing scope. Page metadata remains responsible for each route's canonical and robots directives.

## Shared Metadata

The locale layout will provide the fields shared by every page:

- `metadataBase` using `https://blihops.com`.
- Localized default title and title template.
- Localized default description.
- Application, author, creator, and publisher identity.
- Default Open Graph website data.
- Default `summary_large_image` Twitter card data.
- Production indexing defaults and non-production noindex behavior.
- Large image and snippet preview permissions for compliant crawlers.

Page metadata will provide or override:

- Localized page title and description.
- Canonical URL.
- English, German, and `x-default` alternates.
- Open Graph URL, title, description, and locale.
- Page-specific social image when one is approved.
- Explicit noindex behavior for detail pages.

The existing Twitter creator handle will remain only if it points to a verified Blih Ops account; otherwise the field will be omitted rather than publishing an unverified identity.

## Icons And Social Images

Use Next.js file-based metadata conventions for the site icon, favicon, and Apple touch icon. Assets will be derived from the active Blih Ops brand mark already used by the header; this work will not redesign the logo.

Provide one branded 1200 by 630 pixel default Open Graph image for shared use. It must remain legible when cropped in social previews and include an accurate alt description. Page-specific images can replace it during page-by-page optimization when they add meaningful context.

Do not add a web-app manifest unless installability becomes a product requirement.

## Robots And Sitemap

### `robots.ts`

Production behavior:

- Allow normal crawling.
- Advertise `https://blihops.com/sitemap.xml`.
- Do not use robots disallow rules to implement the detail-page noindex policy.

Non-production behavior:

- Preview and development deployments must emit a noindex signal.
- Vercel deployment protection is preferred when available.
- Preview responses must not advertise production URLs as if the preview were canonical content.

`robots.txt` controls crawling, not guaranteed indexing. Detail pages therefore remain crawlable and expose a page-level noindex directive.

### `sitemap.ts`

Generate one root sitemap from the explicit path allowlist and the two supported locales. It will contain exactly the 22 approved fully qualified production URLs.

Do not include:

- Detail routes.
- Redirecting URLs.
- 404 or catch-all URLs.
- Vercel preview URLs.
- Query-string variants.

Do not add synthetic `lastModified` values that change on every build. Add modification dates only when they can represent real significant content changes. Omit `priority` and `changeFrequency` because Google ignores them.

Language alternates will be emitted in page HTML through metadata. The sitemap does not need a duplicate `hreflang` implementation.

## Per-Page Optimization Workflow

Optimize route families in this order:

1. Home
2. What We Offer
3. Pilot
4. How We Work
5. Who We Are
6. Contact
7. Skills
8. Talent
9. Case Studies archive
10. Insights archive
11. Careers archive

For every English/German pair:

### Search Intent And Content

- Define the primary user intent and topic for each language.
- Research German phrasing independently instead of relying only on literal translation.
- Confirm the page provides a useful answer to that intent in visible content.
- Review one clear H1, descriptive headings, trust evidence, claims, and conversion path.
- Remove or clearly label placeholder, sample, and unverifiable material.

### URL And Metadata

- Preserve the existing route unless a serious issue is found.
- Validate the self-canonical and all language alternates.
- Write a unique title and description aligned with visible page content.
- Keep Open Graph and Twitter content consistent with the page.
- Verify the production indexing directive.

### Internal Links

- Confirm links are crawlable anchor elements with meaningful text.
- Connect service, process, proof, company, contact, and pilot pages where contextually useful.
- Avoid adding links solely for keyword repetition.
- Keep the primary pilot conversion reachable through navigation and relevant page copy.

### Images

- Use descriptive alt text for informative images and empty alt text for decorative images.
- Provide intrinsic dimensions to limit layout shift.
- Use `next/image` where appropriate.
- Serve appropriately sized, compressed assets.
- Reserve eager loading or priority for genuine above-the-fold/LCP imagery.
- Replace remote placeholder media before launch when it represents core page content.

### Rendering And Structured Data

- Keep meaningful headings, copy, links, and image descriptions in initial server-rendered HTML.
- Avoid hiding primary content behind client-only rendering or interaction.
- Add site and organization structured data only with verified identity and contact fields.
- Add page-specific structured data only when the visible content satisfies Google's eligibility requirements.

## Mobile And Performance

Responsive work runs alongside each page audit. Each route family must preserve equivalent primary content, headings, links, image alt text, and metadata on small screens.

Performance review will focus on measured issues affecting Core Web Vitals and crawling:

- LCP image and font loading.
- CLS from unsized media and late layout changes.
- INP risks from animation, smooth scrolling, video, and large client components.
- Excessive JavaScript that delays meaningful rendering.
- Remote media and placeholders that add unnecessary requests.

Optimization decisions must follow measurements rather than arbitrary score chasing.

## Verification

### Pre-Deployment Audit

- Run `pnpm lint`.
- Run `pnpm typecheck`.
- Run `pnpm build`.
- Inspect representative English and German initial HTML.
- Verify titles, descriptions, canonicals, language alternates, social tags, and robots directives.
- Verify `robots.txt` and the exact 22 sitemap URLs.
- Confirm detail pages are absent from the sitemap and expose `noindex, follow`.
- Check 404, redirect, and locale behavior.
- Crawl internal navigation for broken or non-crawlable links.
- Review image dimensions, alt behavior, and optimized output.
- Run mobile layout checks and local Lighthouse audits on representative templates.
- Validate any JSON-LD with schema tooling and Google's Rich Results Test when applicable.

### Production Setup

- Attach `blihops.com` to the production deployment.
- Enforce HTTPS.
- Redirect `www.blihops.com` to `https://blihops.com`.
- Ensure Vercel preview deployments remain non-indexable or access-protected.

### Post-Deployment Audit

- Repeat indexability and rendered-HTML checks against `https://blihops.com`.
- Verify HTTP-to-HTTPS and `www`-to-apex redirects.
- Verify production status codes, canonicals, social-image URLs, `robots.txt`, and `sitemap.xml`.
- Run PageSpeed Insights for representative mobile and desktop pages.
- Revalidate social previews and structured data using public URLs.

### Search Console

- Verify a Google Search Console Domain property for `blihops.com`.
- Submit `https://blihops.com/sitemap.xml`.
- Inspect representative English and German URLs.
- Monitor Page Indexing, Core Web Vitals, Enhancements, sitemap processing, and search queries.
- Use observed indexing and query data to decide when detail pages are ready for a later indexable release.

## Failure Safety

- The sitemap allowlist prevents new routes or mock records from becoming indexable automatically.
- Missing content records continue to return 404 rather than generating indexable empty pages.
- Invalid locales continue through the existing locale validation and 404 behavior.
- Metadata helpers must generate absolute production URLs after `metadataBase` resolution.
- Build and audit checks must fail the release if approved pages have missing canonicals, wrong locale alternates, or accidental noindex directives.

## Success Criteria

- Production sitemap contains exactly 22 approved canonical URLs and no detail pages.
- Every approved URL returns indexable initial HTML with unique localized metadata.
- Every approved locale pair has self-referencing, reciprocal alternates plus English `x-default`.
- Every current detail page is excluded from the sitemap and marked `noindex, follow`.
- Preview deployments are non-indexable.
- Production redirects resolve to one HTTPS apex-domain URL per page.
- No critical technical SEO, mobile, rendering, or broken-link issue remains at launch.
- Search Console accepts the sitemap without URL or processing errors.
