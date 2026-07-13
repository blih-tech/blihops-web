# AGENTS.md — blihops-web

Context for AI coding agents and humans working in this repo.

## What this project is

**blihops-web** is the public marketing site for **BlihOps** (Blih Intelligent Operations PLC) — [blihops.com](https://blihops.com).

- Standalone **Next.js** frontend (App Router)
- **No** admin CMS, database, or backend in this repo
- Content is **static-first**; forms/CMS will call a separate API later (`blihop-api` planned)
- Related: `blihop-platform` monorepo holds the previous marketing app (`apps/web`) — use it as **copy/structure reference**, not as a package dependency

### Business (short)

AI-powered managed outsourcing from Addis Ababa, serving Europe / Middle East / Africa. Services: customer support, back-office, IT/software, AI automation, data processing — via dedicated pods and SLAs. Primary conversion CTA: **Get free pilot** → `/pilot`. Trust: ISO 9001 / 27001 aligned, GDPR-aware.

## Stack

| Layer           | Choice                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router)                                                      |
| UI              | React 19 · TypeScript · Tailwind CSS v4                                      |
| Components      | shadcn (base-luma) + `@base-ui/react`                                        |
| Animation       | `motion` (`motion/react`, not `framer-motion`)                               |
| Icons           | `lucide-react` (no brand icons in newer Lucide — use inline SVG for socials) |
| Package manager | **pnpm only** (npm/yarn blocked)                                             |

**Engines:** Node `22.x`, pnpm `11.x` (see `package.json` + Corepack).

## Commands

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
pnpm build
```

After non-trivial changes: run **`pnpm lint`** and **`pnpm typecheck`**.

## Repo layout

```text
src/
  app/                 # App Router (layout, page, globals.css)
  components/
    layout/            # Site chrome: Header, Footer, Logo, MegaMenu, SectionWrapper, TimelineAnimation
    sections/          # Landing / page sections: Hero, LogosSection, wrappers
    ui/                # shadcn primitives (button, …)
    infinite-slider.tsx  # Used by LogoCloud only
  content/             # Static marketing / mock CMS data (grow here)
  lib/
    utils.ts           # cn()
    api/               # Future API client boundary
    forms/             # Future form helpers
public/                # Static assets (logo, footer image, …)
```

**Import alias:** `@/*` → `./src/*`

### Where new code goes

| Kind                    | Location                                                     |
| ----------------------- | ------------------------------------------------------------ |
| Site-wide chrome        | `src/components/layout/`                                     |
| Landing / page sections | `src/components/sections/`                                   |
| Reusable shadcn UI      | `src/components/ui/` (prefer `pnpm dlx shadcn@latest add …`) |
| Static copy/data        | `src/content/`                                               |
| Shared helpers          | `src/lib/`                                                   |

Do **not** add duplicate headers/logos under `src/components/` root. Layout Header is the only site nav.

## Design system

### Theme tokens

Use Tailwind semantic tokens only — **no hardcoded brand hex/grays** unless unavoidable for SVG fills:

- Surfaces: `bg-background`, `bg-muted`, `bg-card`, `bg-primary`
- Text: `text-foreground`, `text-muted-foreground`, `text-primary-foreground`
- Borders: `border-border`, focus: `ring` / `border-ring`
- Buttons: `buttonVariants` from `@/components/ui/button` (default radius `rounded-md`)

Primary hover on marketing CTAs: prefer **solid** `hover:bg-primary` (avoid translucent primary over images).

### Typography

| Role                     | Font           | Tailwind                           |
| ------------------------ | -------------- | ---------------------------------- |
| Body / UI / descriptions | Inter          | `font-sans` (default on `body`)    |
| Titles / large headings  | Source Serif 4 | `font-heading` (also base `h1–h3`) |
| Code / technical labels  | JetBrains Mono | `font-mono`                        |

Fonts load in `layout.tsx` as CSS variables (`--font-inter`, `--font-source-serif`, `--font-jetbrains`) mapped in `globals.css` `@theme`.

### Layout width

Use **`SectionWrapper`** (`src/components/layout/SectionWrapper.tsx`) for consistent `max-w-6xl mx-auto px-4 sm:px-6`. Full-bleed backgrounds stay outside the wrapper; constrain content inside.

### Motion

- Package: `motion` — import from `motion/react` (client components) or `motion/react-client` when appropriate
- Shared in-view helper: `TimelineAnimation` with optional `customVariants` and `once={false}` for replay-on-view
- Prefer theme-aligned easing, e.g. `[0.22, 1, 0.36, 1]`

## Git & team conventions

- Branches: `feature/`, `fix/`, `chore/`, `docs/`, `ci/`, `hotfix/`
- Commits: **Conventional Commits** (`feat:`, `fix:`, `chore:`, …) — enforced by commitlint
- Pre-commit: lint-staged (ESLint + Prettier)
- Pre-push: branch name check
- Do **not** commit secrets or `.env*`
- Do **not** commit unless the user explicitly asks

See `CONTRIBUTING.md` for full process.

## Agent rules (do / don’t)

**Do**

- Match existing patterns, tokens, and folder structure
- Prefer small, focused components
- Keep marketing copy close to product messaging (pilot, SLAs, managed pods)
- Use `Link` + `buttonVariants` for navigational CTAs
- Run lint + typecheck after substantive edits

**Don’t**

- Install with npm/yarn
- Reintroduce `framer-motion` (use `motion`)
- Hardcode zinc/gray/violet colors when tokens exist
- Put DB/auth/CMS secrets in this repo
- Build admin or API features here
- Leave create-next-app / template placeholder copy in shipping UI

## Key routes (marketing)

| Path                             | Purpose            |
| -------------------------------- | ------------------ |
| `/`                              | Landing            |
| `/what-we-offer`                 | Services           |
| `/how-we-work`                   | Process / security |
| `/who-we-are`                    | About              |
| `/pilot`                         | Free pilot lead    |
| `/case-studies`, `/insights`     | Content            |
| `/careers`, `/skills`, `/talent` | Company / products |
| `/privacy`, `/terms-of-service`  | Legal              |

Many pages are not built yet; links may 404 until created — still use correct hrefs for nav/footer consistency.

## Deploy

Staging/prod via **Vercel** (Git integration). Merge to `main` → deploy. Details in team README / Vercel project.
