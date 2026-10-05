# Textures Directory

This directory contains texture files for the 3D containers and environment.

## Required Textures:

- `container-atlas.webp` - Combined diffuse texture atlas for all containers (~120KB)
- `container-normal.webp` - Normal map for surface details (~95KB)
- `ocean-normal.jpg` - Normal map for ocean wave simulation (~65KB)

## Specifications:

- Format: WebP (preferred) or JPG
- Texture atlas recommended for multiple containers
- Power-of-2 dimensions (e.g., 2048×2048)
- Optimized compression
- sRGB color space for diffuse
- Linear for normal maps

## Fallback Behavior:

If textures are not found, the system will use solid colors and procedural materials.
