# TPD Design System

Dark-first design system for the TPD group-scheduling product. Built with Next.js
(App Router) + TypeScript, deployable to Vercel. All tokens are plain CSS custom
properties — no runtime styling dependency.

## Architecture — 3-tier tokens

```
TIER 1  Primitive   →   TIER 2  Role / Semantic   →   TIER 3  Component
(raw values)            (purpose, theme-aware)         (per-component roles)
```

| Tier | File | What it holds |
|------|------|----------------|
| 1 Primitive | `styles/primitives.css` | Teal / Orange / Grey palette (from the TPD color sheet) + white/black + a minimal functional Red·Green set. Spacing, radius, shadow, and type primitives. |
| 2 Role/Semantic | `styles/semantic.css` | `--color-brand-*`, `--color-bg-*`, `--color-text-*`, `--color-border-*`, `--color-icon-*`, `--color-semantic-*`, layout spacing, radius roles, shadow roles. **Dark is the default (`:root`); light is opt-in (`:root[data-theme="light"]`).** |
| 2 Typography | `styles/typography.css` | SUITE (H1–H5) + Pretendard (S1–S6, B1–B5, D1–D4), exact spec. `.type-*` utility classes. |
| 2 Layout | `styles/layout.css` | Stack / Inline / Column / PageContainer classes. Ported as-is from the Kairo reference; colors are TPD. |
| 3 Component | `styles/components/button.css` | `--*-comp-button-*` tokens mapping to Tier-2 roles. Reference pattern for all future components. |

### Rules
- Components consume **only** Tier-2 / Tier-3 tokens, never Tier-1 primitives directly.
- New components follow the Button pattern: name component roles as `--*-comp-<name>-*`, bind to Tier-2 roles.
- Brand fills (teal/orange) use a **dark** label (`--color-text-on-brand` = grey-900) because both hues fail contrast against white.

## Color role mapping (dark default / light)

| Role | Dark | Light |
|------|------|-------|
| brand-primary | teal-500 | teal-500 |
| brand-secondary | orange-500 | orange-500 |
| bg-canvas | grey-900 | white |
| bg-surface | grey-800 | white |
| text-primary | white | grey-900 |
| text-accent | teal-400 | teal-800 |
| semantic-error / success | red-500 / green-500 | red-600 / green-600 |

Full tables live on the running site under **Foundations → Colors**.

## Layout system (from Kairo reference)

- `Stack` — vertical flow, gap `xs·4 / sm·8 / md·16 / lg·24 / xl·40`
- `Inline` — horizontal flow, gap `xs·4 / sm·8 / md·12 / lg·16 / xl·24`, wrap + justify
- `Column` / `Col` — 12-track grid, 24px gutter, `span` 1–12 (collapses below md/768px)
- `PageContainer` — centered shell, max-width 1280px, responsive inline padding 16→24→40→80

Breakpoints: sm 40rem / md 48rem / lg 64rem / xl 80rem / 2xl 96rem.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of all pages
```

## Deploy to Vercel

This app lives in the `design-system/` subdirectory of the TPD repo.

1. Import the `aspynmun-lab/TPD` repo in Vercel.
2. Set **Root Directory** = `design-system`.
3. Framework preset: **Next.js** (auto-detected). Build `next build`, no env vars needed.
4. Deploy.

Or from the CLI, run inside `design-system/`:

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Scope / status

Foundations (all token tiers), the layout system, typography, and **Button** (the
component-tier exemplar) are complete. Remaining components will be listed and built
per screen once the feature policy doc (기능정책서) arrives.
