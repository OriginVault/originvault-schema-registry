#!/usr/bin/env pwsh

# PowerShell script to commit with automatic DID metadata inclusion

param(
    [string]$Message = "",
    [switch]$Help,
    [switch]$DryRun
)

if ($Help) {
    Write-Host @"
Commit with DID Metadata Script

Usage: .\commit-with-did.ps1 [options] "commit message"

Options:
  -Message "text"    Commit message (required)
  -DryRun           Show what would be committed without doing it
  -Help             Show this help

Examples:
  .\commit-with-did.ps1 "feat: add new schema validation"
  .\commit-with-did.ps1 -Message "fix: update API endpoints" -DryRun

This script automatically:
- Runs pre-push checks
- Adds repository DID to build metadata
- Commits with DID information in the message
- Includes build timestamp and git metadata
"@
    exit 0
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    Write-Host "ERROR: Commit message is required!" -ForegroundColor Red
    Write-Host "Usage: .\commit-with-did.ps1 'your commit message'" -ForegroundColor Yellow
    Write-Host "Use -Help for more options" -ForegroundColor Yellow
    exit 1
}

Write-Host "Preparing commit with repository DID..." -ForegroundColor Cyan

# Run pre-push checks first
Write-Host "Running pre-push checks..." -ForegroundColor Yellow
& .\pre-push-check.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Pre-push checks failed. Commit aborted." -ForegroundColor Red
    exit 1
}

# Add repository DID to metadata
Write-Host "Adding repository DID to metadata..." -ForegroundColor Yellow
npm run add-repo-did
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to add repository DID. Commit aborted." -ForegroundColor Red
    exit 1
}

# Get DID footer
Write-Host "Generating DID metadata..." -ForegroundColor Yellow
$didFooter = npm run did:footer --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Failed to generate DID footer. Continuing without it..." -ForegroundColor Yellow
    $didFooter = ""
}

# Combine commit message with DID metadata
$fullCommitMessage = $Message + $didFooter

# Add all changes
Write-Host "Staging changes..." -ForegroundColor Yellow
git add .

if ($DryRun) {
    Write-Host "DRY RUN - Would commit with message:" -ForegroundColor Magenta
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host $fullCommitMessage -ForegroundColor White
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host "Changes to be committed:" -ForegroundColor Magenta
    git status --porcelain
    exit 0
}

# Commit with full message
Write-Host "Committing with DID metadata..." -ForegroundColor Yellow
git commit -m $fullCommitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully committed with repository DID!" -ForegroundColor Green
    
    # Show commit info
    $commitHash = git rev-parse --short HEAD
    Write-Host "Commit Details:" -ForegroundColor Cyan
    Write-Host "   Hash: $commitHash" -ForegroundColor White
    Write-Host "   DID: $(node scripts/add-repo-did.js --footer 2>$null | Select-String 'Repository-DID:' | ForEach-Object { $_.ToString().Split(':')[1].Trim() })" -ForegroundColor White
    Write-Host "   Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
    
    Write-Host "" 
    Write-Host "Ready to push! Use 'git push origin main' when ready." -ForegroundColor Green
    Write-Host "Tip: The pre-push hook will run automatically to verify everything works." -ForegroundColor Yellow
} else {
    Write-Host "ERROR: Commit failed!" -ForegroundColor Red
    exit 1
} 