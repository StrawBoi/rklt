# 3D Models Directory

This directory contains glTF (.glb) 3D models with Draco compression for the premium 3D logistics experience.

## Required Models:

- `crane-overhead.glb` - Overhead crane structure
- `container-20ft.glb` - 20ft standard container
- `container-40ft.glb` - 40ft standard container
- `container-reefer.glb` - 20ft refrigerated container with cooling unit
- `container-refrigerated.glb` - 40ft refrigerated container
- `container-roro.glb` - Roll-on/Roll-off container
- `container-project.glb` - Oversized project cargo

## Specifications:

- Format: glTF Binary (.glb)
- Compression: Draco
- Target size: < 200KB per model
- PBR materials preferred
- Optimized for web (low poly count)

## Fallback Behavior:

If models are not found, the system will automatically create procedural fallback geometry. The experience will continue to work, but with less visual fidelity.
