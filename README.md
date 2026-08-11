# blihops-web

Public marketing website for **BlihOps** ([blihops.com](https://blihops.com/en)) — the outsourcing platform connecting global companies with pre-vetted Ethiopian software engineers.

Standalone Next.js frontend. No database lives in this repo: content, auth, and forms all talk to the **`blihops-api`** backend over HTTP. Marketing copy is authored locally in `src/content/`, while dynamic content (case studies, insights, careers, FAQs, logos, testimonials, services hero) is fetched from the API with ISR caching.

## Stack

| Layer           | Choice                                                             |
| --------------- | ------------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router)                                            |
| UI              | React 19 · TypeScript · Tailwind CSS v4                            |
| Components      | shadcn/ui (base-luma) + `@base-ui/react`                           |
| i18n            | next-intl (en / de, locale-prefixed routing)                       |
| Auth            | better-auth client (session mirrored by the API)                   |
| Animation       | `motion` · Lenis smooth scroll · cobe/three globe                  |
| Icons           | `lucide-react`                                                     |
| Data fetching   | `apiFetch` client with retries/timeouts + Next ISR (1h revalidate) |
| Package manager | **pnpm only** (npm/yarn blocked)                                   |

## Requirements

| Tool    | Version                                                  |
| ------- | -------------------------------------------------------- |
| Node.js | **24.18.0 or newer (below 25)**                          |
| pnpm    | **11.x** (pinned via `packageManager` in `package.json`) |

- **npm and yarn are blocked** — installs must use pnpm.
- Volta / nvm are **not required**. Install Node 24.18.0 or newer from [nodejs.org](https://nodejs.org/), then use Corepack for pnpm.

## Quick start

```bash
# 1. Clone
git clone https://github.com/blih-tech/blihops-web.git
cd blihops-web

# 2. Enable Corepack (ships with Node) so the repo pin is used
corepack enable

# 3. Environment — point at a running blihops-api (defaults to localhost:4000)
cp .env.example .env.local

# 4. Install & run
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to a locale (`/en` or `/de`) based on `Accept-Language`.

> Pages that fetch live content (case studies, insights, careers, …) need the **API reachable**; without it they render their error states. Static marketing copy in `src/content/` works offline.

## Environment variables

| Variable              | Default                 | Used for                                              |
| --------------------- | ----------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Browser-side API calls (auth client, forms)           |
| `API_URL`             | `http://localhost:4000` | Server-side API calls + middleware session validation |

## Scripts

| Command             | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Start development server (clears stale `.next/dev` first)  |
| `pnpm build`        | Production build                                           |
| `pnpm start`        | Serve production build                                     |
| `pnpm lint`         | Run ESLint                                                 |
| `pnpm typecheck`    | TypeScript check (`tsc --noEmit`)                          |
| `pnpm check`        | Full gate: lint + typecheck + format:check + audit + build |
| `pnpm format`       | Format codebase with Prettier                              |
| `pnpm format:check` | Check formatting (CI / before push)                        |

## Pages

| Route                                      | Description                                        |
| ------------------------------------------ | -------------------------------------------------- |
| `/` → `/[locale]`                          | Landing page (hero, logos, services, testimonials) |
| `/[locale]/who-we-are`                     | Company story, values, leadership, why Ethiopia    |
| `/[locale]/what-we-offer`                  | Services list & approach                           |
| `/[locale]/how-we-work`                    | Process timeline, commitments, security            |
| `/[locale]/case-studies[/[slug]]`          | Case study archive + detail (API content)          |
| `/[locale]/insights[/[slug]]`              | Insights archive + detail (API content)            |
| `/[locale]/careers[/[slug]]`               | Careers archive + detail (API content)             |
| `/[locale]/contact`                        | Contact form                                       |
| `/[locale]/pilot`                          | "Get free pilot" conversion form                   |
| `/[locale]/talent/*`                       | Talent landing, apply + complete-profile           |
| `/[locale]/talent-portal/[portalId]`       | Talent workspace (role-protected)                  |
| `/[locale]/client-workspace/[workspaceId]` | Client workspace (role-protected)                  |
| `/[locale]/auth/*`                         | Sign-in, password reset, accept invitation         |

## Project structure

```text
blihops-web/
├── messages/            # next-intl translations (en.json, de.json)
├── public/              # Static assets
├── src/
│   ├── app/             # App Router: [locale] pages, root redirect, layout
│   ├── components/
│   │   ├── layout/      # Site chrome: Header, Footer, MegaMenu, SmoothScroll…
│   │   ├── sections/    # Page sections (landing, auth, careers, workspace…)
│   │   └── ui/          # shadcn primitives
│   ├── content/         # Static marketing / mock CMS data
│   ├── hooks/
│   ├── i18n/            # next-intl routing, navigation, request config
│   └── lib/
│       ├── api.ts       # apiFetch: typed fetch w/ retries + ISR options
│       ├── api/content.ts  # typed content API (case studies, insights, …)
│       ├── auth-client.ts  # better-auth client (via API)
│       └── forms/       # zod schemas for all forms
├── src/proxy.ts         # Middleware: role-gates talent/client workspaces
├── .editorconfig
├── .env.example
├── .nvmrc               # Node 24.18.0 (CI / optional local managers)
├── .prettierrc
└── package.json
```

## Tooling

| Concern          | How we enforce it                                    |
| ---------------- | ---------------------------------------------------- |
| Same Node major  | `engines.node` + `.npmrc` `engine-strict` + `.nvmrc` |
| Same pnpm        | `packageManager` field + Corepack                    |
| pnpm only        | `preinstall` → `only-allow pnpm`                     |
| Consistent style | EditorConfig + Prettier                              |
| Quality          | `pnpm check` + GitHub Actions CI (PRs to `main`)     |
| Git hygiene      | Husky + lint-staged + commitlint                     |

Wrong Node/pnpm version or `npm install` / `yarn` should fail at install time.

## Contributing

Branch naming, commit messages, and PR process are in **[CONTRIBUTING.md](./CONTRIBUTING.md)**. Agent/LLM context lives in **[AGENTS.md](./AGENTS.md)**.

## Related

| Repo                   | Role                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| **blihops-web** (this) | Marketing frontend                                                       |
| `blihops-api`          | Express backend: auth, email, content API                                |
| `blihops-admin`        | Internal admin CMS frontend (production)                                 |
| `blihops-design`       | Product/UX/engineering docs (content feature design, deployment runbook) |
