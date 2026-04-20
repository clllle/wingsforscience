#!/bin/bash
set -euo pipefail

POSTS_DIR="/Users/clementinebacri/wingsforscience/posts"
IMG_DIR="/Users/clementinebacri/wingsforscience/images/external/blogspot"
LOG_FILE="/Users/clementinebacri/wingsforscience/fix_blogger_images.log"

mkdir -p "$IMG_DIR"
> "$LOG_FILE"

log() { echo "$(date '+%H:%M:%S') $1" | tee -a "$LOG_FILE"; }

# Step 1: Extract all unique URLs
log "Extracting URLs..."
URLS_FILE=$(mktemp)
grep -roh 'https\?://blogger\.googleusercontent\.com/img/[^"'"'"' >]*' "$POSTS_DIR"/*.html | sort -u > "$URLS_FILE"
TOTAL=$(wc -l < "$URLS_FILE")
log "Found $TOTAL unique URLs"

# Step 2: Normalize URLs - group by base (without size), prefer s1600
# For each unique base path, pick the best URL (prefer s1600)
declare -A BASE_TO_URL
declare -A ALL_URLS_TO_BASE

while IFS= read -r url; do
    # Extract base (everything before /sNNN/) and filename
    base=$(echo "$url" | sed -E 's|/s[0-9]+/|/SIZE/|')

    if [[ -z "${BASE_TO_URL[$base]:-}" ]]; then
        BASE_TO_URL[$base]="$url"
    else
        # Prefer s1600
        if echo "$url" | grep -q '/s1600/'; then
            BASE_TO_URL[$base]="$url"
        fi
    fi
    ALL_URLS_TO_BASE[$url]="$base"
done < "$URLS_FILE"

log "Found ${#BASE_TO_URL[@]} unique images (after dedup by size)"

# Step 3: Build MD5 index of existing files
log "Building MD5 index of existing files..."
declare -A EXISTING_MD5
for f in "$IMG_DIR"/*; do
    [[ -f "$f" ]] || continue
    md5=$(md5 -q "$f" 2>/dev/null || md5sum "$f" | cut -d' ' -f1)
    EXISTING_MD5[$md5]="$f"
done
log "Indexed ${#EXISTING_MD5[@]} existing files"

# Step 4: Download and replace
declare -A BASE_TO_LOCAL  # base -> local filename
declare -A NAME_COUNT     # track filename collisions

download_count=0
skip_count=0
error_count=0

for base in "${!BASE_TO_URL[@]}"; do
    url="${BASE_TO_URL[$base]}"

    # Extract filename from URL (last segment)
    raw_filename=$(echo "$url" | sed 's|.*/||')

    # Decode URL-encoded characters
    # First decode %XX sequences
    filename=$(python3 -c "import urllib.parse, sys; print(urllib.parse.unquote(sys.argv[1]))" "$raw_filename")

    # Replace + and spaces with _
    filename=$(echo "$filename" | sed 's/[+ ]/_/g')

    # Remove any remaining problematic chars
    filename=$(echo "$filename" | sed "s/[^a-zA-Z0-9._-]/_/g")

    # Handle name collisions
    base_name="${filename%.*}"
    ext="${filename##*.}"
    if [[ "$base_name" == "$ext" ]]; then
        ext=""
    fi

    final_name="$filename"
    if [[ -n "${NAME_COUNT[$filename]:-}" ]]; then
        count="${NAME_COUNT[$filename]}"
        count=$((count + 1))
        NAME_COUNT[$filename]=$count
        if [[ -n "$ext" ]]; then
            final_name="${base_name}_${count}.${ext}"
        else
            final_name="${base_name}_${count}"
        fi
    else
        NAME_COUNT[$filename]=0
    fi

    local_path="$IMG_DIR/$final_name"
    rel_path="../images/external/blogspot/$final_name"

    # Download to temp file first
    tmp_file=$(mktemp)
    if curl -sL -o "$tmp_file" --max-time 30 "$url" 2>/dev/null; then
        # Check if file is valid (non-empty)
        if [[ ! -s "$tmp_file" ]]; then
            log "ERROR: Empty download for $url"
            error_count=$((error_count + 1))
            rm -f "$tmp_file"
            # Still need to map this base for replacement
            BASE_TO_LOCAL[$base]="$rel_path"
            continue
        fi

        # Check MD5 against existing files
        new_md5=$(md5 -q "$tmp_file" 2>/dev/null || md5sum "$tmp_file" | cut -d' ' -f1)

        if [[ -n "${EXISTING_MD5[$new_md5]:-}" ]]; then
            # File already exists with same content
            existing_file="${EXISTING_MD5[$new_md5]}"
            existing_name=$(basename "$existing_file")
            rel_path="../images/external/blogspot/$existing_name"
            log "SKIP (duplicate): $final_name -> already exists as $existing_name"
            skip_count=$((skip_count + 1))
            rm -f "$tmp_file"
        else
            mv "$tmp_file" "$local_path"
            EXISTING_MD5[$new_md5]="$local_path"
            download_count=$((download_count + 1))
            log "DOWNLOADED: $final_name"
        fi
    else
        log "ERROR: Failed to download $url"
        error_count=$((error_count + 1))
        rm -f "$tmp_file"
        BASE_TO_LOCAL[$base]="$rel_path"
        continue
    fi

    BASE_TO_LOCAL[$base]="$rel_path"
done

log "Downloads: $download_count, Skipped: $skip_count, Errors: $error_count"

# Step 5: Replace all URLs in HTML files
log "Replacing URLs in HTML files..."
replace_count=0

for html_file in "$POSTS_DIR"/*.html; do
    content=$(cat "$html_file")
    modified=false

    while IFS= read -r url; do
        base="${ALL_URLS_TO_BASE[$url]}"
        local_ref="${BASE_TO_LOCAL[$base]:-}"

        if [[ -z "$local_ref" ]]; then
            log "WARNING: No local path for $url"
            continue
        fi

        if echo "$content" | grep -qF "$url"; then
            # Escape special chars for sed
            escaped_url=$(printf '%s\n' "$url" | sed 's/[&/\]/\\&/g')
            escaped_ref=$(printf '%s\n' "$local_ref" | sed 's/[&/\]/\\&/g')
            content=$(echo "$content" | sed "s|${escaped_url}|${escaped_ref}|g")
            modified=true
            replace_count=$((replace_count + 1))
        fi
    done < "$URLS_FILE"

    if $modified; then
        echo "$content" > "$html_file"
    fi
done

log "Replaced $replace_count URL occurrences"

# Step 6: Verify
remaining=$(grep -roh 'https\?://blogger\.googleusercontent\.com/img/[^"'"'"' >]*' "$POSTS_DIR"/*.html 2>/dev/null | wc -l || echo 0)
log "Remaining blogger.googleusercontent.com/img/ URLs: $remaining"

if [[ "$remaining" -eq 0 ]]; then
    log "SUCCESS: All URLs replaced!"
else
    log "WARNING: $remaining URLs still remain!"
    grep -roh 'https\?://blogger\.googleusercontent\.com/img/[^"'"'"' >]*' "$POSTS_DIR"/*.html 2>/dev/null | sort -u | head -10 >> "$LOG_FILE"
fi

rm -f "$URLS_FILE"
log "Done!"
