# Contributing to blihops-web

Thanks for helping build the Blihop marketing site. This guide covers setup, branches, commits, and pull requests.

## Setup

1. Install **Node.js 22.x** from [nodejs.org](https://nodejs.org/) (nvm/Volta optional, not required).
2. Enable Corepack (ships with Node):

   ```bash
   corepack enable
   ```

3. Install dependencies and start the app:

   ```bash
   pnpm install
   pnpm dev
   ```

**pnpm only.** `npm` and `yarn` are blocked by the `preinstall` script. Use Node **22.x** and pnpm **11.x** (see `package.json` `engines` and `packageManager`).

## Branch naming

Create branches from up-to-date `main`. Use short kebab-case after the prefix.

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<name>` | `feature/pilot-form` |
| Bug fix | `fix/<name>` | `fix/header-overflow` |
| Chore / tooling | `chore/<name>` | `chore/prettier-setup` |
| Docs | `docs/<name>` | `docs/contributing` |
| CI | `ci/<name>` | `ci/pr-checks` |
| Hotfix (production) | `hotfix/<name>` | `hotfix/broken-cta` |

```bash
git checkout main
git pull origin main
git checkout -b feature/pilot-form
```

## Commit messages

We use **[Conventional Commits](https://www.conventionalcommits.org/)**:

```text
type: short description
```

Optional scope:

```text
type(scope): short description
```

### Types

| Type | Use when |
|------|----------|
| `feat` | New user-facing feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Tooling, deps, config (no product behavior) |
| `refactor` | Code change that is not a fix or feature |
| `style` | Formatting / Prettier (no logic change) |
| `test` | Tests |
| `ci` | CI workflow changes |

### Rules

- Use imperative mood: “add”, not “added” or “adds”
- Keep the subject under ~72 characters
- No period at the end of the subject
- Optional body after a blank line for *why* (not *what*)

### Examples

```text
feat: add pilot form mock submit
feat(pilot): add lead form validation
fix: correct careers empty state
docs: add contribution guide
chore: pin node and pnpm engines
ci: add pr lint typecheck and build
```

Do **not** use slash style for commits (`feat/message`). That pattern is for **branches** only.

## Pull requests

1. Push your branch and open a PR into **`main`**.
2. Fill in a short summary of *what* changed and *why*.
3. Keep PRs focused — one concern per PR when possible.
4. Ensure checks pass before requesting review:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm format:check
   pnpm build
   ```

5. Address review feedback with new commits (or amend only if the branch is yours and not shared).

### PR checklist

- [ ] Branch name follows the table above
- [ ] Commits follow Conventional Commits
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm format:check` passes (run `pnpm format` if needed)
- [ ] `pnpm build` succeeds
- [ ] No secrets or `.env` files committed

## Scripts reference

| Command | When to use |
|---------|-------------|
| `pnpm dev` | Local development |
| `pnpm lint` | Before push / in CI |
| `pnpm typecheck` | Before push / in CI |
| `pnpm format` | Fix formatting locally |
| `pnpm format:check` | Verify formatting (CI) |
| `pnpm build` | Confirm production build |

Day to day: rely on editor Format on Save (Prettier). Run `pnpm format` if CI fails on formatting.

## Code style

- **EditorConfig** (`.editorconfig`) — indent, line endings, charset
- **Prettier** (`.prettierrc`) — formatting source of truth
- **ESLint** — Next.js + TypeScript rules

Match existing patterns in the repo. Prefer small, readable components over large one-off files.

## What belongs in this repo

| In scope | Out of scope |
|----------|--------------|
| Marketing pages & UI | Admin CMS app |
| Static / mock content | Database access |
| Client form mocks → future API client | Auth, SMTP, media secrets |
| SEO (metadata, sitemap, robots) | Skills / Talent product apps (teasers only) |

## Questions

Unsure about a change? Open a draft PR early or ask in the team channel before large refactors.
