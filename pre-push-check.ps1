#!/usr/bin/env pwsh

Write-Host "🔍 Running pre-push checks..." -ForegroundColor Cyan

# Run type checking
Write-Host "📝 Checking TypeScript types..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript type check failed. Push aborted." -ForegroundColor Red
    exit 1
}

# Run build to ensure everything compiles
Write-Host "🏗️ Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Push aborted." -ForegroundColor Red
    exit 1
}

# Verify build outputs exist
if (!(Test-Path "dist")) {
    Write-Host "❌ Build output directory 'dist' not found." -ForegroundColor Red
    exit 1
}

if (!(Test-Path "types")) {
    Write-Host "❌ Types output directory 'types' not found." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Pre-push checks passed! Safe to push." -ForegroundColor Green
Write-Host "🚀 Your Vercel deployment should work correctly." -ForegroundColor Green 