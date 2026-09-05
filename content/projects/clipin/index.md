---
title: "clipin"
description: "india's performance clipping marketplace. built with nuxt 3 + go."
link: "https://github.com/vaproh/clipin"
image: "/img/clipin.png"
tags: ['web', 'go', 'vue']
date: 2026-09-04
weight: 1
draft: false
---

India's performance clipping marketplace.

## Stack

### Frontend

- Bun
- Nuxt 3
- Vue 3
- TypeScript
- Tailwind CSS
- shadcn-vue
- Motion for Vue
- Lucide
- TanStack Query
- Zod
- VueUse
- Clerk (authentication)

### Backend

- Go 1.24
- chi
- Huma (OpenAPI)
- pgx
- sqlc
- PostgreSQL 16
- Redis 7

### Testing

- Go `testing` + `httptest`
- Vitest + @vue/test-utils + happy-dom
- Playwright (E2E + visual QA)

### External

- Clerk Auth
- Razorpay (test mode)
- Cloudflare

## Local development

Prerequisites:

- Bun
- Go 1.24+
- Docker & Docker Compose
- just

Start databases:

```bash
just db-up
```

Run frontend dev server:

```bash
just dev-frontend
```

Run backend dev services:

```bash
just dev-backend
```

Run everything:

```bash
just dev
```

Individual services:

```bash
just web        # Nuxt frontend (http://localhost:3000)
just api        # Go API (http://localhost:8080)
just verifier   # Go verifier (http://localhost:8081)
```

Database migrations:

```bash
just migrate            # run all pending
just migrate status     # check current version
just migrate down       # rollback one
```

## Testing

Run all unit/integration tests:

```bash
just test
```

Individual test suites:

```bash
just test-api          # Go backend (337 tests)
just test-integration  # Postgres integration (82 tests)
just test-web          # Vitest frontend (49 tests)
just test-e2e          # Playwright E2E (57 tests)
```

Update visual QA baselines:

```bash
just test-e2e-update
```

## Current scope

Open marketplace for performance clipping campaigns. Content owners fund escrow pools, clippers publish short-form clips, verified views drive earnings and UPI payouts.

All milestones M0-M9 are complete. Additional features: analytics dashboard, notification system (7 triggers), clipper reputation/leveling (4 tiers), RazorpayX SDK integration (test mode), Playwright E2E + visual QA, Redis caching (6 caches). Deployment excluded until production infra exists. See TODO.md for next phase.

| Milestone | Deliverable | Status |
|---|---|---|
| M0 | Foundation: migrations, sqlc, Clerk JWT, CORS, CI | Done |
| M1 | Users, roles, onboarding, shared UI primitives | Done |
| M2 | Campaign marketplace (list, filters, detail, cache) | Done |
| M3 | Campaign creation wizard + owner dashboard | Done |
| M4 | Submissions (lifecycle, review, dedupe, auto-approve) | Done |
| M5 | Verification contract (metric snapshots, deltas) | Done |
| M6 | Append-only financial ledger (idempotent entries) | Done |
| M7 | Payouts (UPI, RazorpayX SDK, webhook) | Done |
| M8 | Admin controls, fraud flags, audit logs, rate limiting | Done |
| M9 | Launch polish (SEO, meta tags, build verification) | Done |
| Mobile | Hamburger drawer, touch targets, overflow fixes | Done |
| Testing | Vitest unit tests, Playwright E2E + visual QA | Done |

## Repository structure

```text
apps/
  web/                  # Nuxt 3 frontend
    components/         # Vue components (app/, campaign/, landing/, ledger/, settings/, shared/, submission/, ui/)
    composables/        # TanStack Query composables
    e2e/                # Playwright E2E + visual QA tests
    layouts/            # Nuxt layouts (default, app)
    pages/              # Nuxt pages (landing, auth, app/*) - 19 pages
    lib/                # Utilities (formatPaise, cn)
    assets/css/         # Tailwind + design tokens
    vitest.config.ts    # Vitest configuration
    playwright.config.ts # Playwright configuration

  api/                  # Go API server
    cmd/api/            # API entrypoint
    cmd/migrate/        # Migration CLI (up/down/status/goto)
    db/migrations/      # SQL migrations (000001-000009)
    db/query.sql        # sqlc query definitions (100+ queries)
    internal/
      auth/             # JWT + session middleware
      config/           # Environment configuration
      db/sqlc/          # Generated models + queries
      http/handlers/    # Huma handlers (16 handler files)
      integration/      # Postgres integration tests (82 tests)
      middleware/        # Rate limiter
      payout/           # PayoutProvider interface + Razorpay SDK
      redis/            # Redis client
      service/          # Business logic (16 service files)
      worker/           # Background workers (auto-approve, payout processor)

services/
  verifier/             # View verification service (stub only, see TODO.md)

infra/
  docker/               # Docker configurations (planned)

docs/
  architecture.md
  verification-contract.md

PRD.md                  # Product requirements
AGENTS.md               # Engineering principles + execution plan
TODO.md                 # Next phase: verifier + mobile
justfile                # Developer commands
docker-compose.yml      # PostgreSQL + Redis
.env.example            # Environment template
```
