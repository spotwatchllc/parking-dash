#!/usr/bin/env bash
# Run build and dev with clear output. Use in a terminal where pnpm/npm and node are available.
# Example: ./scripts/run-and-debug.sh
set -e
cd "$(dirname "$0")/.."
echo "==> Working directory: $(pwd)"
echo ""

# 1. Build (catches type and compile errors)
echo "==> Running: pnpm run build (or npm run build)"
if command -v pnpm &>/dev/null; then
  pnpm run build
else
  npm run build
fi
BUILD_EXIT=$?
if [ "$BUILD_EXIT" -ne 0 ]; then
  echo ""
  echo "*** Build failed with exit code $BUILD_EXIT. Fix the errors above and run again. ***"
  exit "$BUILD_EXIT"
fi
echo ""
echo "==> Build succeeded."
echo ""

# 2. Dev server (optional; comment out if you only want to build)
echo "==> Starting dev server (Ctrl+C to stop)..."
if command -v pnpm &>/dev/null; then
  pnpm dev
else
  npm run dev
fi
