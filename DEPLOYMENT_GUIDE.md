# Render Deployment Guide

This repository includes a Render Blueprint (`render.yaml`) that deploys:

- `vexorq-api` (Node web service)
- `vexorq-web` (static frontend)
- `vexorq-db` (Postgres)

## 1. Prerequisites

- Push this repo to GitHub/GitLab.
- Ensure `render.yaml` is in the repo root.
- Create a Render account: https://render.com

## 2. Deploy with Blueprint

1. In Render Dashboard, click `New` -> `Blueprint`.
2. Connect your repository.
3. Render auto-detects `render.yaml` and shows 3 resources to create.
4. Continue and provide values for prompted `sync: false` env vars.

## 3. Required Environment Variables

Render will prompt for these on initial Blueprint creation:

- API service (`vexorq-api`):
	- `SMTP_USER`
	- `SMTP_PASS`
	- `SMTP_FROM` (optional sender address)

- Frontend service (`vexorq-web`):
	- `VITE_API_URL`

Use your API public URL for `VITE_API_URL`, for example:

`https://vexorq-api.onrender.com`

Notes:

- `DATABASE_URL` is wired automatically from `vexorq-db` in `render.yaml`.
- `SMTP_HOST` defaults to `smtp.gmail.com` and `SMTP_PORT` defaults to `587`.

## 4. Build and Runtime Details

- API build command:
	- `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server run build`
- API pre-deploy command (creates/updates schema):
	- `pnpm --filter @workspace/db run push`
- API start command:
	- `node artifacts/api-server/dist/index.cjs`

- Frontend build command:
	- `corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/vexorq run build`
- Frontend publish directory:
	- `artifacts/vexorq/dist`

## 5. Verify Deployment

- API health check:
	- `https://<your-api-domain>/api/healthz`
- Frontend:
	- Open the `vexorq-web` URL in Render.
- Submit the query form and verify:
	- DB row is created in `queries` table.
	- Email notification is delivered (if SMTP credentials are valid).

## 6. Updating Env Vars Later

If `VITE_API_URL` or SMTP values change, update them in Render Dashboard:

`Service` -> `Environment` -> `Save Changes` -> redeploy.
