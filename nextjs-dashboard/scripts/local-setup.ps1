# Run this from nextjs-dashboard in PowerShell where node/npm are on PATH.
# If node is not in PATH, run the same steps in WSL or Git Bash.
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)

Write-Host "=== Parking Dash – local setup ===" -ForegroundColor Cyan
Set-Location $Root

# 1. Start Postgres (if Docker is available)
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Starting Postgres with Docker..."
    Set-Location (Split-Path -Parent $Root)
    docker compose up -d
    Set-Location $Root
    Write-Host "Waiting for Postgres..."
    Start-Sleep -Seconds 3
} else {
    Write-Host "Docker not found. Ensure Postgres is running and .env has DATABASE_URL and POSTGRES_URL" -ForegroundColor Yellow
}

# 2. Install dependencies
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host "Installing dependencies with pnpm..."
    pnpm install
    $Runner = "pnpm"
} else {
    Write-Host "Installing dependencies with npm..."
    npm install
    $Runner = "npx"
}

# 3. Prisma generate (use project version 6)
Write-Host "Generating Prisma client..."
if ($Runner -eq "pnpm") {
    pnpm exec prisma generate
} else {
    npx prisma@6 generate
}

# 4. Migrations
Write-Host "Running database migrations..."
if ($Runner -eq "pnpm") {
    pnpm exec prisma migrate deploy
} else {
    npx prisma@6 migrate deploy
}

Write-Host ""
Write-Host "Setup done. Next steps:" -ForegroundColor Green
Write-Host "  1. Ensure .env has: DATABASE_URL, POSTGRES_URL, AUTH_SECRET (e.g. openssl rand -base64 32)" -ForegroundColor White
Write-Host "  2. Start dev server: $Runner run dev  (or: npm run dev)" -ForegroundColor White
Write-Host "  3. Seed users (once): open http://localhost:3000/seed in browser or: curl http://localhost:3000/seed" -ForegroundColor White
Write-Host "  4. Login: http://localhost:3000/login  (user@nextmail.com / 123456  or  manager@nextmail.com / 123456)" -ForegroundColor White
