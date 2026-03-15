#!/usr/bin/env bash
# Run this from nextjs-dashboard in a terminal where node/npm/pnpm and (optionally) docker are available.
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$ROOT/.." && pwd)"

echo "=== Parking Dash – local setup ==="
cd "$ROOT"

# 1. Start Postgres (if Docker is available)
if command -v docker &>/dev/null; then
  echo "Starting Postgres with Docker..."
  cd "$REPO_ROOT"
  docker compose up -d
  cd "$ROOT"
  echo "Waiting for Postgres to be ready..."
  sleep 3
else
  echo "Docker not found. Ensure Postgres is running and DATABASE_URL / POSTGRES_URL are set in .env"
fi

# 2. Install dependencies (use pnpm if available, else npm)
if command -v pnpm &>/dev/null; then
  echo "Installing dependencies with pnpm..."
  pnpm install
  RUNNER="pnpm"
else
  echo "Installing dependencies with npm..."
  npm install
  RUNNER="npx"
fi

# 3. Generate Prisma client (use project Prisma 6, not global 7)
echo "Generating Prisma client..."
if [ -n "$RUNNER" ] && [ "$RUNNER" = "pnpm" ]; then
  pnpm exec prisma generate
else
  npx prisma@6 generate
fi

# 4. Run migrations
echo "Running database migrations..."
if [ -n "$RUNNER" ] && [ "$RUNNER" = "pnpm" ]; then
  pnpm exec prisma migrate deploy
else
  npx prisma@6 migrate deploy
fi

echo ""
echo "Setup complete. Next steps:"
echo "  1. Ensure .env has: DATABASE_URL, POSTGRES_URL, AUTH_SECRET (e.g. openssl rand -base64 32)"
echo "  2. Start dev server: pnpm dev  (or npm run dev)"
echo "  3. Seed users (once): open http://localhost:3000/seed in browser or: curl http://localhost:3000/seed"
echo "  4. Login: http://localhost:3000/login  (user@nextmail.com / 123456  or  manager@nextmail.com / 123456)"
