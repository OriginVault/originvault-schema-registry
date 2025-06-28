# OriginVault Schema Registry Organization Script
# This script organizes schemas into categorized directories

Write-Host "🎯 Starting OriginVault Schema Registry Organization..." -ForegroundColor Green

# Create schema category directories
$categories = @("identity", "content", "trust", "payments", "platform", "business")
foreach ($category in $categories) {
    $path = "schemas\v1\$category"
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "✅ Created directory: $path" -ForegroundColor Green
    }
}

# Define schema categorization
$schemaCategories = @{
    # Identity & Access Schemas
    "identity" = @(
        "OriginVaultRootAuthority.schema.json",
        "PersonCredential.schema.json",
        "OrganizationCredential.schema.json",
        "VaultAccessCredential.schema.json",
        "AdminCredential.schema.json",
        "APIAccessCredential.schema.json"
    )
    
    # Content & Creation Schemas
    "content" = @(
        "CreativeWorkCredential.schema.json",
        "ContentAuthenticityCredential.schema.json",
        "ContentAIPermissionCredential.schema.json"
    )
    
    # Trust & Verification Schemas
    "trust" = @(
        "TrustedIssuerCredential.schema.json",
        "ReputationCredential.schema.json"
    )
    
    # Payments & Economics Schemas
    "payments" = @(
        "PaymentCredential.schema.json",
        "StorageCredential.schema.json"
    )
    
    # Platform & Services Schemas
    "platform" = @(
        "PluginEndorsementCredential.schema.json",
        "GemCredential.schema.json"
    )
    
    # Business Workflow Schemas
    "business" = @(
        "ContractCredential.schema.json",
        "EquityGrantCredential.schema.json",
        "WorkflowExecutionCredential.schema.json",
        "VerificationReportCredential.schema.json",
        "CustomerOnboardingCredential.schema.json",
        "SustainabilityCredential.schema.json",
        "RevocationService.schema.json"
    )
}

# Move schemas to their categories
foreach ($category in $schemaCategories.Keys) {
    Write-Host "📁 Organizing $category schemas..." -ForegroundColor Yellow
    
    foreach ($schema in $schemaCategories[$category]) {
        $sourcePath = "schemas\v1\$schema"
        $destPath = "schemas\v1\$category\$schema"
        
        if (Test-Path $sourcePath) {
            Move-Item $sourcePath $destPath -Force
            Write-Host "  ✅ Moved: $schema" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Not found: $schema" -ForegroundColor Yellow
        }
    }
}

# Create schema index files
foreach ($category in $categories) {
    $indexContent = "# $category Schemas`n`nThis directory contains $category-related schemas for the OriginVault platform.`n`n## Schemas`n"
    
    $schemaFiles = Get-ChildItem "schemas\v1\$category\*.schema.json" -ErrorAction SilentlyContinue
    foreach ($schema in $schemaFiles) {
        $schemaName = $schema.BaseName
        $indexContent += "`n- [$schemaName](./$($schema.Name))"
    }
    
    $indexContent += "`n`n## Usage`n`nSee the [main README](../../README.md) for usage instructions."
    
    Set-Content -Path "schemas\v1\$category\README.md" -Value $indexContent
    Write-Host "✅ Created index for $category schemas" -ForegroundColor Green
}

Write-Host "`n🎉 Schema organization complete!" -ForegroundColor Green
Write-Host "📊 Summary:" -ForegroundColor Cyan
foreach ($category in $categories) {
    $count = (Get-ChildItem "schemas\v1\$category\*.schema.json" -ErrorAction SilentlyContinue).Count
    Write-Host "  $category`: $count schemas" -ForegroundColor White
} 