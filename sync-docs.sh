#!/bin/bash

# AI Fabrix Documentation Sync Script
# Syncs documentation from GitHub repository to Document360
# Usage: ./sync-docs.sh [options]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
D360_BINARY="$PROJECT_ROOT/../aifabrix-d360/bin/aifabrix-d360"
ENV_FILE="$PROJECT_ROOT/.env"

# Default options
DRY_RUN=false
VERBOSE=false
FORCE_SYNC=false
SYNC_IMAGES=true
SYNC_API_SPECS=true

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Help function
show_help() {
    cat << EOF
AI Fabrix Documentation Sync Script

SYNOPSIS
    ./sync-docs.sh [OPTIONS]

DESCRIPTION
    Syncs documentation from GitHub repository to Document360 using the aifabrix-d360 binary.

OPTIONS
    -h, --help          Show this help message
    -d, --dry-run       Perform a dry run without actually syncing
    -v, --verbose       Enable verbose output
    -f, --force         Force sync even if no changes detected
    --no-images         Skip image synchronization
    --no-api-specs      Skip API specifications synchronization
    --env-file PATH     Path to environment file (default: .env)

EXAMPLES
    ./sync-docs.sh                    # Normal sync
    ./sync-docs.sh --dry-run          # Test run without changes
    ./sync-docs.sh --verbose          # Detailed output
    ./sync-docs.sh --no-images        # Skip image sync

ENVIRONMENT VARIABLES
    The script reads configuration from the .env file:
    - DOCUMENT360_API_TOKEN          Document360 API token
    - DOCUMENT360_PROJECT_ID         Document360 project ID
    - DOCUMENT360_BASE_URL           Document360 API base URL (optional)
    - SYNC_SOURCE_PATH               Local documentation path (default: ./docs)
    - SYNC_BATCH_SIZE                Batch size for processing (default: 10)
    - SYNC_RETRY_ATTEMPTS            Number of retry attempts (default: 3)
    - SYNC_RETRY_DELAY               Delay between retries in ms (default: 1000)

EOF
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -d|--dry-run)
                DRY_RUN=true
                shift
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            -f|--force)
                FORCE_SYNC=true
                shift
                ;;
            --no-images)
                SYNC_IMAGES=false
                shift
                ;;
            --no-api-specs)
                SYNC_API_SPECS=false
                shift
                ;;
            --env-file)
                ENV_FILE="$2"
                shift 2
                ;;
            *)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if aifabrix-d360 binary exists
    if [[ ! -f "$D360_BINARY" ]]; then
        log_error "aifabrix-d360 binary not found at: $D360_BINARY"
        log_error "Please ensure the aifabrix-d360 package is installed in the parent directory"
        exit 1
    fi
    
    # Check if binary is executable
    if [[ ! -x "$D360_BINARY" ]]; then
        log_warning "Making aifabrix-d360 binary executable..."
        chmod +x "$D360_BINARY"
    fi
    
    # Check if .env file exists
    if [[ ! -f "$ENV_FILE" ]]; then
        log_error "Environment file not found: $ENV_FILE"
        log_error "Please create a .env file with required configuration"
        exit 1
    fi
    
    # Load environment variables
    log_info "Loading environment variables from: $ENV_FILE"
    set -a  # Automatically export all variables
    source "$ENV_FILE"
    set +a
    
    # Validate required environment variables
    if [[ -z "$DOCUMENT360_API_TOKEN" ]]; then
        log_error "DOCUMENT360_API_TOKEN is required but not set"
        exit 1
    fi
    
    if [[ -z "$DOCUMENT360_PROJECT_ID" ]]; then
        log_error "DOCUMENT360_PROJECT_ID is required but not set"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Validate documentation structure
validate_docs_structure() {
    log_info "Validating documentation structure..."
    
    local docs_path="${SYNC_SOURCE_PATH:-./docs}"
    
    if [[ ! -d "$docs_path" ]]; then
        log_error "Documentation directory not found: $docs_path"
        exit 1
    fi
    
    # Check for required files
    local required_files=("README.md" "index.md")
    for file in "${required_files[@]}"; do
        if [[ ! -f "$docs_path/$file" ]]; then
            log_warning "Recommended file not found: $docs_path/$file"
        fi
    done
    
    # Check for YAML metadata files
    local yaml_count=$(find "$docs_path" -name "*.yaml" -type f | wc -l)
    if [[ $yaml_count -eq 0 ]]; then
        log_warning "No YAML metadata files found in $docs_path"
        log_warning "Consider creating .yaml files for better metadata management"
    else
        log_info "Found $yaml_count YAML metadata files"
    fi
    
    # Check for API specifications
    if [[ "$SYNC_API_SPECS" == "true" ]]; then
        local api_specs_count=$(find "$docs_path" -name "*.yaml" -path "*/api/*" -type f | wc -l)
        if [[ $api_specs_count -eq 0 ]]; then
            log_warning "No API specification files found in $docs_path"
        else
            log_info "Found $api_specs_count API specification files"
        fi
    fi
    
    log_success "Documentation structure validation completed"
}

# Build sync command
build_sync_command() {
    local cmd="$D360_BINARY"
    
    # Add environment variables
    cmd="$cmd --api-token=\"$DOCUMENT360_API_TOKEN\""
    cmd="$cmd --project-id=\"$DOCUMENT360_PROJECT_ID\""
    
    if [[ -n "$DOCUMENT360_BASE_URL" ]]; then
        cmd="$cmd --base-url=\"$DOCUMENT360_BASE_URL\""
    fi
    
    # Add source path
    local source_path="${SYNC_SOURCE_PATH:-./docs}"
    cmd="$cmd --source-path=\"$source_path\""
    
    # Add batch size
    if [[ -n "$SYNC_BATCH_SIZE" ]]; then
        cmd="$cmd --batch-size=\"$SYNC_BATCH_SIZE\""
    fi
    
    # Add retry configuration
    if [[ -n "$SYNC_RETRY_ATTEMPTS" ]]; then
        cmd="$cmd --retry-attempts=\"$SYNC_RETRY_ATTEMPTS\""
    fi
    
    if [[ -n "$SYNC_RETRY_DELAY" ]]; then
        cmd="$cmd --retry-delay=\"$SYNC_RETRY_DELAY\""
    fi
    
    # Add flags
    if [[ "$DRY_RUN" == "true" ]]; then
        cmd="$cmd --dry-run"
    fi
    
    if [[ "$VERBOSE" == "true" ]]; then
        cmd="$cmd --verbose"
    fi
    
    if [[ "$FORCE_SYNC" == "true" ]]; then
        cmd="$cmd --force"
    fi
    
    if [[ "$SYNC_IMAGES" == "false" ]]; then
        cmd="$cmd --no-images"
    fi
    
    if [[ "$SYNC_API_SPECS" == "false" ]]; then
        cmd="$cmd --no-api-specs"
    fi
    
    echo "$cmd"
}

# Perform the sync
perform_sync() {
    log_info "Starting documentation sync..."
    
    local sync_cmd=$(build_sync_command)
    
    if [[ "$VERBOSE" == "true" ]]; then
        log_info "Executing command: $sync_cmd"
    fi
    
    # Execute the sync command
    if eval "$sync_cmd"; then
        log_success "Documentation sync completed successfully"
        return 0
    else
        log_error "Documentation sync failed"
        return 1
    fi
}

# Generate sync report
generate_report() {
    local report_file="$PROJECT_ROOT/sync-report-$(date +%Y%m%d-%H%M%S).txt"
    
    log_info "Generating sync report: $report_file"
    
    cat > "$report_file" << EOF
AI Fabrix Documentation Sync Report
Generated: $(date)
Command: $(build_sync_command)

Configuration:
- Source Path: ${SYNC_SOURCE_PATH:-./docs}
- Batch Size: ${SYNC_BATCH_SIZE:-10}
- Retry Attempts: ${SYNC_RETRY_ATTEMPTS:-3}
- Retry Delay: ${SYNC_RETRY_DELAY:-1000}ms
- Dry Run: $DRY_RUN
- Verbose: $VERBOSE
- Force Sync: $FORCE_SYNC
- Sync Images: $SYNC_IMAGES
- Sync API Specs: $SYNC_API_SPECS

Environment:
- Document360 Project ID: $DOCUMENT360_PROJECT_ID
- Document360 Base URL: ${DOCUMENT360_BASE_URL:-https://api.document360.com}

EOF
    
    log_success "Sync report generated: $report_file"
}

# Main function
main() {
    log_info "AI Fabrix Documentation Sync Script"
    log_info "===================================="
    
    # Parse command line arguments
    parse_args "$@"
    
    # Check prerequisites
    check_prerequisites
    
    # Validate documentation structure
    validate_docs_structure
    
    # Perform the sync
    if perform_sync; then
        generate_report
        log_success "Sync process completed successfully"
        exit 0
    else
        log_error "Sync process failed"
        exit 1
    fi
}

# Run main function with all arguments
main "$@"

