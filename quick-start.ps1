# Quick Start Script for Zoa Public Web

Write-Host "🚀 Zoa Public Web - Quick Start" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the public-web directory" -ForegroundColor Red
    Write-Host "   cd public-web" -ForegroundColor Yellow
    exit 1
}

Write-Host "Step 1: Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Gray
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Checking configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Gray
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Please edit .env and add your Supabase credentials" -ForegroundColor Yellow
    Write-Host "   Find them at: https://app.supabase.io > Your Project > Settings > API" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Press any key after updating .env to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host ""
Write-Host "Step 3: Validating configuration..." -ForegroundColor Yellow
npm run check

Write-Host ""
Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  npm run dev      - Start development server" -ForegroundColor Gray
Write-Host "  npm run build    - Build for production" -ForegroundColor Gray
Write-Host "  npm run preview  - Preview production build" -ForegroundColor Gray
Write-Host "  npm run check    - Validate configuration" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 For deployment instructions, see SETUP.md" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Would you like to start the dev server now? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run dev
}
