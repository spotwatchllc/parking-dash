# Run build and dev with clear output. Use in PowerShell where npm/pnpm and node are on PATH.
# Example: .\scripts\run-and-debug.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "==> Working directory: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# 1. Build
Write-Host "==> Running: npm run build (or pnpm run build)" -ForegroundColor Cyan
try {
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        pnpm run build
    } else {
        npm run build
    }
} catch {
    Write-Host ""
    Write-Host "*** Build failed. Fix the errors above and run again. ***" -ForegroundColor Red
    exit 1
}
Write-Host ""
Write-Host "==> Build succeeded." -ForegroundColor Green
Write-Host ""

# 2. Dev server
Write-Host "==> Starting dev server (Ctrl+C to stop)..." -ForegroundColor Cyan
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm dev
} else {
    npm run dev
}
