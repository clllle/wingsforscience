#!/usr/bin/env python3
"""Download blogger.googleusercontent.com images and replace URLs in HTML files."""

import os
import re
import hashlib
import subprocess
import urllib.parse
from pathlib import Path
from collections import defaultdict

POSTS_DIR = Path("/Users/clementinebacri/wingsforscience/posts")
IMG_DIR = Path("/Users/clementinebacri/wingsforscience/images/external/blogspot")
IMG_DIR.mkdir(parents=True, exist_ok=True)

URL_PATTERN = re.compile(r'https?://blogger\.googleusercontent\.com/img/[^"\' >]+')
SIZE_PATTERN = re.compile(r'/s\d+/')

def md5_file(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()

def clean_filename(raw):
    """Decode URL-encoded chars, replace + and spaces with _, remove problematic chars."""
    name = urllib.parse.unquote(raw)
    name = name.replace('+', '_').replace(' ', '_')
    name = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
    # Collapse multiple underscores
    name = re.sub(r'_+', '_', name)
    return name

# Step 1: Extract all unique URLs from HTML files
print("Extracting URLs...")
all_urls = set()
html_files = list(POSTS_DIR.glob("*.html"))
for html_file in html_files:
    content = html_file.read_text(encoding='utf-8', errors='replace')
    urls = URL_PATTERN.findall(content)
    all_urls.update(urls)

print(f"Found {len(all_urls)} unique URLs")

# Step 2: Group by base path (ignoring size), prefer s1600
base_to_urls = defaultdict(list)
for url in all_urls:
    base = SIZE_PATTERN.sub('/SIZE/', url)
    base_to_urls[base].append(url)

# Pick best URL per base (prefer s1600)
base_to_best = {}
for base, urls in base_to_urls.items():
    best = urls[0]
    for u in urls:
        if '/s1600/' in u:
            best = u
            break
    base_to_best[base] = best

print(f"Found {len(base_to_best)} unique images (after size dedup)")

# Step 3: Index existing files by MD5
print("Indexing existing files...")
existing_md5 = {}
for f in IMG_DIR.iterdir():
    if f.is_file():
        existing_md5[md5_file(f)] = f.name

print(f"Indexed {len(existing_md5)} existing files")

# Step 4: Download images and build URL -> local path mapping
url_to_local = {}  # maps every original URL to the local relative path
name_counts = defaultdict(int)
stats = {'downloaded': 0, 'skipped': 0, 'errors': 0}

for base, best_url in base_to_best.items():
    # Extract filename from URL
    raw_filename = best_url.rsplit('/', 1)[-1]
    filename = clean_filename(raw_filename)

    if not filename or filename == '.':
        filename = 'image.jpg'

    # Handle name collisions
    stem = filename.rsplit('.', 1)[0] if '.' in filename else filename
    ext = '.' + filename.rsplit('.', 1)[1] if '.' in filename else ''

    if name_counts[filename] > 0:
        final_name = f"{stem}_{name_counts[filename]}{ext}"
    else:
        final_name = filename
    name_counts[filename] += 1

    local_path = IMG_DIR / final_name
    rel_path = f"../images/external/blogspot/{final_name}"

    # Download
    import tempfile
    tmp = tempfile.NamedTemporaryFile(delete=False, dir=str(IMG_DIR))
    tmp.close()

    try:
        result = subprocess.run(
            ['curl', '-sL', '-o', tmp.name, '--max-time', '30', best_url],
            capture_output=True, timeout=35
        )

        if result.returncode != 0 or os.path.getsize(tmp.name) == 0:
            print(f"  ERROR: {best_url[:80]}...")
            stats['errors'] += 1
            os.unlink(tmp.name)
            # Map all variant URLs to rel_path anyway
            for u in base_to_urls[base]:
                url_to_local[u] = rel_path
            continue

        new_md5 = md5_file(tmp.name)

        if new_md5 in existing_md5:
            existing_name = existing_md5[new_md5]
            rel_path = f"../images/external/blogspot/{existing_name}"
            print(f"  SKIP (dup): {final_name} -> {existing_name}")
            stats['skipped'] += 1
            os.unlink(tmp.name)
        else:
            os.rename(tmp.name, str(local_path))
            existing_md5[new_md5] = final_name
            stats['downloaded'] += 1
            print(f"  OK: {final_name}")
    except Exception as e:
        print(f"  ERROR: {e}")
        stats['errors'] += 1
        if os.path.exists(tmp.name):
            os.unlink(tmp.name)

    # Map ALL variant URLs (all sizes) to the same local path
    for u in base_to_urls[base]:
        url_to_local[u] = rel_path

print(f"\nDownloaded: {stats['downloaded']}, Skipped: {stats['skipped']}, Errors: {stats['errors']}")

# Step 5: Replace URLs in HTML files
# Sort URLs by length (longest first) to avoid partial replacements
print("\nReplacing URLs in HTML files...")
sorted_urls = sorted(url_to_local.keys(), key=len, reverse=True)
total_replacements = 0

for html_file in html_files:
    content = html_file.read_text(encoding='utf-8', errors='replace')
    original = content

    for url in sorted_urls:
        if url in content:
            local = url_to_local[url]
            count = content.count(url)
            content = content.replace(url, local)
            total_replacements += count

    if content != original:
        html_file.write_text(content, encoding='utf-8')

print(f"Replaced {total_replacements} URL occurrences")

# Step 6: Verify
remaining = 0
for html_file in html_files:
    content = html_file.read_text(encoding='utf-8', errors='replace')
    found = URL_PATTERN.findall(content)
    remaining += len(found)
    if found:
        print(f"  REMAINING in {html_file.name}: {found[:3]}")

print(f"\nRemaining URLs: {remaining}")
if remaining == 0:
    print("SUCCESS: All blogger.googleusercontent.com/img/ URLs replaced!")
else:
    print(f"WARNING: {remaining} URLs still remain!")
