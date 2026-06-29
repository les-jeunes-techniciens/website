# Script to start the development server of Les Jeunes Techniciens

# Set working directory to the script's directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "" -ForegroundColor Red
    Write-Host "ERROR: Node.js is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Node.js (v16+) from https://nodejs.org/ and rerun this script." -ForegroundColor Red
    Write-Host "" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

# Detect available package manager
$pkg = "npm"
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $pkg = "pnpm"
} elseif (Get-Command yarn -ErrorAction SilentlyContinue) {
    $pkg = "yarn"
}

# Parse command line argument or default to "dev"
$action = "dev"
if ($args.Count -gt 0) {
    $action = $args[0]
}

if ($action -eq "clean") {
    Write-Host "Removing node_modules and lock files..." -ForegroundColor Yellow
    if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
    if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }
    if (Test-Path pnpm-lock.yaml) { Remove-Item -Force pnpm-lock.yaml }
    if (Test-Path yarn.lock) { Remove-Item -Force yarn.lock }
    Write-Host "Clean complete." -ForegroundColor Green
    exit 0
}

if ($action -eq "install") {
    Write-Host "Installing dependencies with $pkg..." -ForegroundColor Cyan
    Start-Process -FilePath $pkg -ArgumentList "install" -NoNewWindow -Wait
    exit $LASTEXITCODE
}

if ($action -eq "build") {
    Write-Host "Building project via $pkg..." -ForegroundColor Cyan
    Start-Process -FilePath $pkg -ArgumentList "run build" -NoNewWindow -Wait
    exit $LASTEXITCODE
}

if ($action -eq "preview") {
    Write-Host "Starting preview server via $pkg..." -ForegroundColor Cyan
    Start-Process -FilePath $pkg -ArgumentList "run preview" -NoNewWindow -Wait
    exit $LASTEXITCODE
}

if ($action -eq "dev") {
    # Install dependencies if missing
    if (-not (Test-Path node_modules)) {
        Write-Host "node_modules not found - installing dependencies with $pkg..." -ForegroundColor Yellow
        if ($pkg -eq "npm") {
            $cmd = "npm.cmd"
        } else {
            $cmd = $pkg
        }
        & $cmd install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Dependency install failed. Aborting." -ForegroundColor Red
            Read-Host "Press Enter to exit..."
            exit $LASTEXITCODE
        }
    }

    Write-Host "Starting development server via $pkg..." -ForegroundColor Green
    if ($pkg -eq "npm") {
        $cmd = "npm.cmd"
    } else {
        $cmd = $pkg
    }
    & $cmd run dev
}
