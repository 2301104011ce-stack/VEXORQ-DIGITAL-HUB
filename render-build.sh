#!/usr/bin/env bash
set -e

echo "==> Starting VEXORQ Production Build..."

# Install dependencies using pre-installed pnpm
pnpm install --frozen-lockfile

# Build frontend and backend
pnpm --filter @workspace/vexorq run build
pnpm --filter @workspace/api-server run build

echo "==> VEXORQ Build Finished Successfully!"
