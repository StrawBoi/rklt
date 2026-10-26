"""
Builds the hero web layers from registered plate pairs in ./source:

  source/<scene>-lit.jpg    lights on (night, dusk) or full sun (day)
  source/<scene>-dark.jpg   same frame, lights off (night, dusk) or in shade (day)

Writes to public/assets/hero/lights/:
  <scene>-lit.webp, <scene>-dark.webp, <scene>-lit.jpg (no-WebGL / reduced-motion still)
  <scene>-mask.png  RGB soft group weights: R ship, G truck + customs gate, B air.
             Port is 1 - (R + G + B); the four weights sum to 1 everywhere, so
             every group at full intensity reproduces the lit plate exactly.
             No alpha channel: browsers may drop colour under zero alpha.

Regions are normalised (0..1, origin top-left); an upscaled master of the same
composition reuses them unchanged. Run with Blender's Python (numpy + OIIO):

  blender -b --factory-startup --python layers.py -- [--preview]
"""

import argparse
import os
import sys

import numpy as np
import OpenImageIO as oiio

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "..", "public", "assets", "hero", "lights"))
SCENES = ("night", "dusk", "day")
# 4K masters that register with the original plates. The other files in source/
# are a different camera (3:2) and have no lights-off twin, so they are not used.
MASTERS = {
    "day-lit": "Design 3.png",
    "day-dark": "Design.png",
    "dusk-dark": "Design 1.png",
}
GROUPS = ("port", "ship", "truck", "air")

# Later groups win where polygons overlap. Water under the ship belongs to the
# ship so its reflections arrive with it.
REGIONS = {
    "port": [[(0, 0), (1, 0), (1, 1), (0, 1)]],
    "ship": [
        [(0.555, 0.585), (0.755, 0.585), (0.755, 0.47), (0.88, 0.47), (0.895, 0.725), (0.555, 0.725)],
        [(0.56, 0.725), (0.81, 0.725), (0.80, 1.0), (0.565, 1.0)],
    ],
    "truck": [
        [(0.70, 1.0), (0.79, 0.84), (0.845, 0.70), (0.88, 0.665), (1.0, 0.655), (1.0, 1.0)],
    ],
    "air": [[(0.755, 0.13), (0.885, 0.13), (0.885, 0.225), (0.755, 0.225)]],
}

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
p = argparse.ArgumentParser()
p.add_argument("--preview", action="store_true")
p.add_argument("--quality", type=int, default=92)
args = p.parse_args(argv)


def read(path):
    inp = oiio.ImageInput.open(path)
    if not inp:
        raise SystemExit(f"cannot open {path}: {oiio.geterror()}")
    px = np.asarray(inp.read_image(format="float"), dtype=np.float32)
    inp.close()
    return px[..., :3]


def source_path(scene, kind):
    name = MASTERS.get(f"{scene}-{kind}", f"{scene}-{kind}.jpg")
    return os.path.join(HERE, "source", name)


def match_size(img, width, height):
    if img.shape[1] == width and img.shape[0] == height:
        return img
    buf = oiio.ImageBuf(oiio.ImageSpec(img.shape[1], img.shape[0], 3, oiio.FLOAT))
    buf.set_pixels(oiio.ROI(0, img.shape[1], 0, img.shape[0]), img.reshape(-1))
    out = oiio.ImageBuf(oiio.ImageSpec(width, height, 3, oiio.FLOAT))
    oiio.ImageBufAlgo.resize(out, buf)
    return np.asarray(out.get_pixels(oiio.FLOAT), np.float32).reshape(height, width, 3)


def write(path, img01, quality=None):
    h, w, c = img01.shape
    data = np.clip(np.round(img01 * 255), 0, 255).astype(np.uint8)
    spec = oiio.ImageSpec(w, h, c, "uint8")
    if quality is not None:
        kind = "webp" if path.endswith(".webp") else "jpeg"
        spec.attribute("compression", f"{kind}:{quality}")
    out = oiio.ImageOutput.create(path)
    if not out or not out.open(path, spec):
        raise SystemExit(f"cannot write {path}: {oiio.geterror()}")
    out.write_image(data)
    out.close()


def box_blur(img, r):
    out = img
    for axis in (0, 1):
        pad = [(0, 0)] * img.ndim
        pad[axis] = (r + 1, r)
        c = np.cumsum(np.pad(out, pad, mode="edge"), axis=axis, dtype=np.float64)
        n = out.shape[axis]
        hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis)
        lo = np.take(c, np.arange(0, n), axis=axis)
        out = ((hi - lo) / (2 * r + 1)).astype(np.float32)
    return out


def polygon_mask(poly, w, h):
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    xs = (xs + 0.5) / w
    ys = (ys + 0.5) / h
    inside = np.zeros((h, w), dtype=bool)
    for i in range(len(poly)):
        x0, y0 = poly[i]
        x1, y1 = poly[(i + 1) % len(poly)]
        crosses = (y0 > ys) != (y1 > ys)
        with np.errstate(divide="ignore", invalid="ignore"):
            xi = x0 + (ys - y0) * (x1 - x0) / (y1 - y0)
        inside ^= crosses & (xs < xi)
    return inside


def soft(img, r):
    return box_blur(box_blur(box_blur(img, r), r), r)


def stands_out(plate, region, w, h):
    """Pixels inside `region` that differ from the open sky in `plate`."""
    sky = slice(int(w * 0.6), w)
    # Sky is a vertical gradient: its per-row median over open sky is the background.
    diff = np.abs(plate - np.median(plate[:, sky], axis=1, keepdims=True)).max(-1)
    return (diff > 0.06) & polygon_mask(region, w, h)


def grow(mask, w):
    r = max(1, w // 1280)
    return box_blur(mask.astype(np.float32), r) > 0.01


def group_weights(w, h, lit, dark):
    """Returns the four group weights and the dark plate with a guaranteed
    aircraft silhouette (a lit-only aircraft is darkened into the dark plate)."""
    label = np.zeros((h, w), dtype=np.int8)
    dark = dark.copy()
    for gi, g in enumerate(GROUPS):
        for poly in REGIONS[g]:
            if g == "air":
                # Only the aircraft itself: a box would show as a patch of sky.
                in_lit, in_dark = stands_out(lit, poly, w, h), stands_out(dark, poly, w, h)
                missing = grow(in_lit, w) & ~grow(in_dark, w)
                dark[missing] = lit[missing] * 0.3
                label[grow(in_lit | in_dark, w)] = gi
            else:
                label[polygon_mask(poly, w, h)] = gi
    weights = []
    for gi, g in enumerate(GROUPS):
        r = max(1, int(w * (0.0015 if g == "air" else 0.005)))
        weights.append(soft((label == gi).astype(np.float32), r))
    weights = np.stack(weights, -1)
    return weights / np.maximum(weights.sum(-1, keepdims=True), 1e-6), dark


def to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * np.power(c, 1 / 2.4) - 0.055)


os.makedirs(OUT, exist_ok=True)
for scene in SCENES:
    lit = read(source_path(scene, "lit"))
    dark = read(source_path(scene, "dark"))
    width, height = max(lit.shape[1], dark.shape[1]), max(lit.shape[0], dark.shape[0])
    lit, dark = match_size(lit, width, height), match_size(dark, width, height)
    h, w, _ = lit.shape
    weights, dark = group_weights(w, h, lit, dark)
    if args.preview:
        prev = os.path.join(HERE, "preview")
        os.makedirs(prev, exist_ok=True)
        lin_l, lin_d = to_linear(lit), to_linear(dark)
        for gi, g in enumerate(GROUPS):
            k = weights[..., : gi + 1].sum(-1, keepdims=True)
            write(os.path.join(prev, f"{scene}-step{gi + 1}-{g}.png"), to_srgb(lin_d + (lin_l - lin_d) * k))
        continue
    write(os.path.join(OUT, f"{scene}-lit.webp"), lit, args.quality)
    write(os.path.join(OUT, f"{scene}-dark.webp"), dark, args.quality)
    write(os.path.join(OUT, f"{scene}-lit.jpg"), lit, 90)
    write(os.path.join(OUT, f"{scene}-mask.png"), np.ascontiguousarray(weights[..., 1:]))
    print("SCENE", scene, w, h)

print("DONE", OUT if not args.preview else "preview")
