#!/usr/bin/env python3
"""Embellir les photos : couleurs plus éclatantes + luminosité plus spectaculaire."""
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

SATURATION = 1.30
CONTRAST = 1.18
BRIGHTNESS = 1.05
SHARPNESS = 1.10

EXTS = {'.jpg', '.jpeg', '.png', '.webp'}


def embellir(path_in: Path, path_out: Path):
    img = Image.open(path_in)
    img = ImageOps.exif_transpose(img)
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGB')

    img = ImageEnhance.Color(img).enhance(SATURATION)
    img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    img = ImageEnhance.Brightness(img).enhance(BRIGHTNESS)
    img = ImageEnhance.Sharpness(img).enhance(SHARPNESS)

    path_out.parent.mkdir(parents=True, exist_ok=True)
    suffix = path_in.suffix.lower()
    if suffix in ('.jpg', '.jpeg'):
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        img.save(path_out, format='JPEG', quality=92, optimize=True)
    elif suffix == '.png':
        img.save(path_out, format='PNG', optimize=True)
    elif suffix == '.webp':
        img.save(path_out, format='WEBP', quality=92, method=6)


def main():
    if len(sys.argv) < 2:
        print("Usage: embellir-photos.py <fichier_ou_dossier> [fichier_ou_dossier ...]")
        sys.exit(1)

    for arg in sys.argv[1:]:
        src = Path(arg)
        if src.is_file():
            out = src.parent / 'embelli' / src.name
            print(f"→ {src.name}")
            embellir(src, out)
            print(f"  ✓ {out}")
        elif src.is_dir():
            out_dir = src / 'embelli'
            files = [f for f in src.iterdir() if f.is_file() and f.suffix.lower() in EXTS]
            print(f"Traitement de {len(files)} image(s) dans {src}")
            for f in files:
                out = out_dir / f.name
                print(f"→ {f.name}")
                embellir(f, out)
            print(f"✓ Résultats dans {out_dir}")
        else:
            print(f"⚠ Introuvable : {src}")


if __name__ == '__main__':
    main()
