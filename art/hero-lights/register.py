"""
Measures how well a lights-off plate registers against its lit master.
Prints image sizes, the global shift by phase correlation, and per-tile shifts.

  blender -b --factory-startup --python register.py -- source/night-master.jpg source/night-dark.jpg
"""

import sys

import numpy as np
import OpenImageIO as oiio

a_path, b_path = sys.argv[sys.argv.index("--") + 1:][:2]


def gray(path):
    inp = oiio.ImageInput.open(path)
    px = np.asarray(inp.read_image(format="float"), dtype=np.float32)[..., :3]
    inp.close()
    g = px @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    return g


def edges(g):
    gx = np.zeros_like(g)
    gy = np.zeros_like(g)
    gx[:, 1:-1] = g[:, 2:] - g[:, :-2]
    gy[1:-1] = g[2:] - g[:-2]
    e = np.sqrt(gx * gx + gy * gy)
    return e / (e.std() + 1e-6)


def shift(a, b):
    fa, fb = np.fft.fft2(a - a.mean()), np.fft.fft2(b - b.mean())
    r = fa * np.conj(fb)
    r /= np.abs(r) + 1e-9
    c = np.fft.ifft2(r).real
    y, x = np.unravel_index(np.argmax(c), c.shape)
    h, w = a.shape
    return (y if y < h // 2 else y - h), (x if x < w // 2 else x - w), float(c.max())


a, b = gray(a_path), gray(b_path)
print("SIZES", a.shape, b.shape)
ea, eb = edges(a), edges(b)
print("GLOBAL dy,dx,peak", shift(ea, eb))
h, w = a.shape
for ty in range(3):
    for tx in range(4):
        ys, xs = slice(ty * h // 3, (ty + 1) * h // 3), slice(tx * w // 4, (tx + 1) * w // 4)
        print("TILE", ty, tx, shift(ea[ys, xs], eb[ys, xs]))
