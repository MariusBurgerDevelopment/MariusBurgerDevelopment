#!/usr/bin/env python3
"""
Cyberpunk ASCII Portrait Generator for GitHub Profile
Converts any image file into ASCII art tailored for the dark.svg / light.svg profile HUD.
"""

import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

RAMP = "  ..::--==++**#%%@@"

def image_to_ascii(image_path, width=91, height=53, contrast=2.1, brightness=1.1, invert=True):
    img = Image.open(image_path).convert("L")
    w, h = img.size
    
    # Auto center-crop if portrait orientation
    crop_box = (int(w * 0.28), int(h * 0.05), int(w * 0.72), int(h * 0.85))
    img = img.crop(crop_box)
    
    if invert:
        img = ImageOps.invert(img)
        
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(contrast)
    
    brightener = ImageEnhance.Brightness(img)
    img = brightener.enhance(brightness)
    
    img = img.resize((width, height), Image.Resampling.LANCZOS)
    
    lines = []
    for y in range(height):
        row = []
        for x in range(width):
            val = img.getpixel((x, y))
            idx = int(val / 256 * len(RAMP))
            idx = min(idx, len(RAMP) - 1)
            ch = RAMP[idx]
            if ch == ' ':
                if (x < 6 or x > 84) and ((x * 13 + y * 19) % 31 == 0):
                    ch = '.'
                elif (x < 3 or x > 87) and ((x * 7 + y * 11) % 17 == 0):
                    ch = ':'
            row.append(ch)
        lines.append("".join(row))
    return lines

if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else "d:/marius custom projects/marius-port/dist/marius-base-1.jpg"
    out = sys.argv[2] if len(sys.argv) > 2 else "portrait.txt"
    print(f"Converting {src} -> {out} ({91}x{53})...")
    lines = image_to_ascii(src)
    Path(out).write_text("\n".join(lines), encoding="utf-8")
    print(f"Done! {len(lines)} lines written.")
