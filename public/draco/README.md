# Draco Decoder Directory

This directory should contain the Draco decoder WASM files for decompressing 3D models.

## Required Files:

Download from Three.js repository and place here:
- `draco_decoder.wasm`
- `draco_wasm_wrapper.js`
- `draco_decoder.js` (optional)

## Source:

https://github.com/mrdoob/three.js/tree/dev/examples/jsm/libs/draco

Or install via:
```bash
npm install three
# Then copy from: node_modules/three/examples/jsm/libs/draco/
```

## Note:

The AssetLoader is configured to look for these files at `/draco/` path.
