# AI Fabrix Documentation Sync Script (PowerShell)
# Syncs documentation from GitHub repository to Document360
# Usage: .\sync-docs.ps1 [options]

param(
    [switch]$Help,
    [switch]$DryRun,
    [switch]$Verbose,
    [switch]$Force,
    [switch]$NoImages,
    [switch]$NoApiSpecs,
    [string]$EnvFile = ".env"
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$D360Binary = Join-Path (Split-Path -Parent $ProjectRoot) "aifabrix-d360\bin\aifabrix-d360"
$EnvFilePath = Join-Path $ProjectRoot $EnvFile

# Default options
$SyncImages = -not $NoImages
$SyncApiSpecs = -not $NoApiSpecs

# Logging functions
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

# Help function
function Show-Help {
    Write-Host @"
AI Fabrix Documentation Sync Script (PowerShell)

SYNOPSIS
    .\sync-docs.ps1 [OPTIONS]

DESCRIPTION
    Syncs documentation from GitHub repository to Document360 using the aifabrix-d360 binary.

OPTIONS
    -Help          Show this help message
    -DryRun        Perform a dry run without actually syncing
    -Verbose       Enable verbose output
    -Force         Force sync even if no changes detected
    -NoImages      Skip image synchronization
    -NoApiSpecs    Skip API specifications synchronization
    -EnvFile PATH  Path to environment file (default: .env)

EXAMPLES
    .\sync-docs.ps1                    # Normal sync
    .\sync-docs.ps1 -DryRun            # Test run without changes
    .\sync-docs.ps1 -Verbose           # Detailed output
    .\sync-docs.ps1 -NoImages          # Skip image sync

ENVIRONMENT VARIABLES
    The script reads configuration from the .env file:
    - DOCUMENT360_API_TOKEN          Document360 API token
    - DOCUMENT360_PROJECT_ID         Document360 project ID
    - DOCUMENT360_BASE_URL           Document360 API base URL (optional)
    - SYNC_SOURCE_PATH               Local documentation path (default: ./docs)
    - SYNC_BATCH_SIZE                Batch size for processing (default: 10)
    - SYNC_RETRY_ATTEMPTS            Number of retry attempts (default: 3)
    - SYNC_RETRY_DELAY               Delay between retries in ms (default: 1000)

"@
}

# Check prerequisites
function Test-Prerequisites {
    Write-Info "Checking prerequisites..."
    
    # Check if aifabrix-d360 binary exists
    if (-not (Test-Path $D360Binary)) {
        Write-Error "aifabrix-d360 binary not found at: $D360Binary"
        Write-Error "Please ensure the aifabrix-d360 package is installed in the parent directory"
        exit 1
    }
    
    # Check if .env file exists
    if (-not (Test-Path $EnvFilePath)) {
        Write-Error "Environment file not found: $EnvFilePath"
        Write-Error "Please create a .env file with required configuration"
        exit 1
    }
    
    # Load environment variables
    Write-Info "Loading environment variables from: $EnvFilePath"
    Get-Content $EnvFilePath | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
    
    # Validate required environment variables
    if (-not $env:DOCUMENT360_API_TOKEN) {
        Write-Error "DOCUMENT360_API_TOKEN is required but not set"
        exit 1
    }
    
    if (-not $env:DOCUMENT360_PROJECT_ID) {
        Write-Error "DOCUMENT360_PROJECT_ID is required but not set"
        exit 1
    }
    
    Write-Success "Prerequisites check passed"
}

# Validate documentation structure
function Test-DocsStructure {
    Write-Info "Validating documentation structure..."
    
    $docsPath = if ($env:SYNC_SOURCE_PATH) { $env:SYNC_SOURCE_PATH } else { ".\docs" }
    
    if (-not (Test-Path $docsPath)) {
        Write-Error "Documentation directory not found: $docsPath"
        exit 1
    }
    
    # Check for required files
    $requiredFiles = @("README.md", "index.md")
    foreach ($file in $requiredFiles) {
        $filePath = Join-Path $docsPath $file
        if (-not (Test-Path $filePath)) {
            Write-Warning "Recommended file not found: $filePath"
        }
    }
    
    # Check for YAML metadata files
    $yamlFiles = Get-ChildItem -Path $docsPath -Filter "*.yaml" -Recurse
    if ($yamlFiles.Count -eq 0) {
        Write-Warning "No YAML metadata files found in $docsPath"
        Write-Warning "Consider creating .yaml files for better metadata management"
    } else {
        Write-Info "Found $($yamlFiles.Count) YAML metadata files"
    }
    
    # Check for API specifications
    if ($SyncApiSpecs) {
        $apiSpecs = Get-ChildItem -Path $docsPath -Filter "*.yaml" -Recurse | Where-Object { $_.FullName -like "*\api\*" }
        if ($apiSpecs.Count -eq 0) {
            Write-Warning "No API specification files found in $docsPath"
        } else {
            Write-Info "Found $($apiSpecs.Count) API specification files"
        }
    }
    
    Write-Success "Documentation structure validation completed"
}

# Build sync command
function Build-SyncCommand {
    $cmd = "& `"$D360Binary`""
    
    # Add environment variables
    $cmd += " --api-token=`"$env:DOCUMENT360_API_TOKEN`""
    $cmd += " --project-id=`"$env:DOCUMENT360_PROJECT_ID`""
    
    if ($env:DOCUMENT360_BASE_URL) {
        $cmd += " --base-url=`"$env:DOCUMENT360_BASE_URL`""
    }
    
    # Add source path
    $sourcePath = if ($env:SYNC_SOURCE_PATH) { $env:SYNC_SOURCE_PATH } else { ".\docs" }
    $cmd += " --source-path=`"$sourcePath`""
    
    # Add batch size
    if ($env:SYNC_BATCH_SIZE) {
        $cmd += " --batch-size=`"$env:SYNC_BATCH_SIZE`""
    }
    
    # Add retry configuration
    if ($env:SYNC_RETRY_ATTEMPTS) {
        $cmd += " --retry-attempts=`"$env:SYNC_RETRY_ATTEMPTS`""
    }
    
    if ($env:SYNC_RETRY_DELAY) {
        $cmd += " --retry-delay=`"$env:SYNC_RETRY_DELAY`""
    }
    
    # Add flags
    if ($DryRun) {
        $cmd += " --dry-run"
    }
    
    if ($Verbose) {
        $cmd += " --verbose"
    }
    
    if ($Force) {
        $cmd += " --force"
    }
    
    if (-not $SyncImages) {
        $cmd += " --no-images"
    }
    
    if (-not $SyncApiSpecs) {
        $cmd += " --no-api-specs"
    }
    
    return $cmd
}

# Perform the sync
function Invoke-Sync {
    Write-Info "Starting documentation sync..."
    
    $syncCmd = Build-SyncCommand
    
    if ($Verbose) {
        Write-Info "Executing command: $syncCmd"
    }
    
    # Execute the sync command
    try {
        Invoke-Expression $syncCmd
        Write-Success "Documentation sync completed successfully"
        return $true
    } catch {
        Write-Error "Documentation sync failed: $($_.Exception.Message)"
        return $false
    }
}

# Generate sync report
function New-SyncReport {
    $reportFile = Join-Path $ProjectRoot "sync-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
    
    Write-Info "Generating sync report: $reportFile"
    
    $reportContent = @"
AI Fabrix Documentation Sync Report
Generated: $(Get-Date)
Command: $(Build-SyncCommand)

Configuration:
- Source Path: $(if ($env:SYNC_SOURCE_PATH) { $env:SYNC_SOURCE_PATH } else { ".\docs" })
- Batch Size: $(if ($env:SYNC_BATCH_SIZE) { $env:SYNC_BATCH_SIZE } else { "10" })
- Retry Attempts: $(if ($env:SYNC_RETRY_ATTEMPTS) { $env:SYNC_RETRY_ATTEMPTS } else { "3" })
- Retry Delay: $(if ($env:SYNC_RETRY_DELAY) { $env:SYNC_RETRY_DELAY } else { "1000" })ms
- Dry Run: $DryRun
- Verbose: $Verbose
- Force Sync: $Force
- Sync Images: $SyncImages
- Sync API Specs: $SyncApiSpecs

Environment:
- Document360 Project ID: $env:DOCUMENT360_PROJECT_ID
- Document360 Base URL: $(if ($env:DOCUMENT360_BASE_URL) { $env:DOCUMENT360_BASE_URL } else { "https://api.document360.com" })

"@
    
    $reportContent | Out-File -FilePath $reportFile -Encoding UTF8
    Write-Success "Sync report generated: $reportFile"
}

# Main function
function Main {
    Write-Info "AI Fabrix Documentation Sync Script (PowerShell)"
    Write-Info "==============================================="
    
    if ($Help) {
        Show-Help
        return
    }
    
    # Check prerequisites
    Test-Prerequisites
    
    # Validate documentation structure
    Test-DocsStructure
    
    # Perform the sync
    if (Invoke-Sync) {
        New-SyncReport
        Write-Success "Sync process completed successfully"
    } else {
        Write-Error "Sync process failed"
        exit 1
    }
}

# Run main function
Main

