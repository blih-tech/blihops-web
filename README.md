# blihops-web

Public marketing website for **Blihop** ([blihops.com](https://blihops.com)).

Standalone Next.js frontend. No admin CMS, no database, and no backend live in this repo. Content is static-first; forms and CMS data will talk to a separate API later.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| UI | React · TypeScript · Tailwind CSS |
| Package manager | **pnpm only** |

## Requirements

| Tool | Version |
|------|---------|
| Node.js | **22.x** |
| pnpm | **11.x** (pinned via `packageManager` in `package.json`) |

- **npm and yarn are blocked** — installs must use pnpm.
- Volta / nvm are **not required**. Install Node 22 from [nodejs.org](https://nodejs.org/), then use Corepack for pnpm.

## Quick start

```bash
# 1. Clone
git clone https://github.com/blih-tech/blihops-web.git
cd blihops-web

# 2. Enable Corepack (ships with Node) so the repo pin is used
corepack enable

# 3. Install & run
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm format` | Format codebase with Prettier |
| `pnpm format:check` | Check formatting (CI / before push) |

## Project structure

```text
blihops-web/
├── public/              # Static assets
├── src/
│   ├── app/             # App Router pages & layouts
│   ├── components/      # UI, layout, sections (as they grow)
│   ├── content/         # Static marketing / mock CMS data
│   └── lib/             # api + forms boundaries (mock → real API later)
├── .editorconfig
├── .nvmrc               # Node 22 (CI / optional local managers)
├── .prettierrc
└── package.json
```

## Tooling

| Concern | How we enforce it |
|---------|-------------------|
| Same Node major | `engines.node` + `.npmrc` `engine-strict` + `.nvmrc` |
| Same pnpm | `packageManager` field + Corepack |
| pnpm only | `preinstall` → `only-allow pnpm` |
| Consistent style | EditorConfig + Prettier |
| Quality | `lint` · `typecheck` · `format:check` · `build` |

Wrong Node/pnpm version or `npm install` / `yarn` should fail at install time.

## Contributing

Branch naming, commit messages, and PR process are in **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

## Related

| Repo | Role |
|------|------|
| **blihops-web** (this) | Marketing frontend |
| `blihop-api` | Integrations + CMS API *(planned)* |
| `blihop-admin` | Admin CMS frontend *(planned)* |
