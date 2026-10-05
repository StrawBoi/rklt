/**
 * AssetLoader - Manages progressive loading of 3D models and textures
 * Supports glTF with Draco compression, texture loading, and progress tracking
 */

export interface AssetManifest {
  models: ModelAsset[];
  textures: TextureAsset[];
  priority: 'critical' | 'high' | 'low';
}

export interface ModelAsset {
  id: string;
  url: string;
  compression: 'draco' | 'none';
  size: number;
}

export interface TextureAsset {
  id: string;
  url: string;
  format: 'jpg' | 'png' | 'webp';
  size: number;
}

export interface LoadedAssets {
  models: Map<string, any>; // THREE.Group
  textures: Map<string, any>; // THREE.Texture
  totalSize: number;
}

export type ProgressCallback = (progress: number) => void;

/**
 * Asset manifest for premium 3D logistics experience
 */
export const ASSET_MANIFEST: AssetManifest = {
  models: [
    {
      id: 'crane-structure',
      url: '/models/crane-overhead.glb',
      compression: 'draco',
      size: 180000 // ~180KB compressed
    },
    {
      id: 'container-20ft',
      url: '/models/container-20ft.glb',
      compression: 'draco',
      size: 85000
    },
    {
      id: 'container-40ft',
      url: '/models/container-40ft.glb',
      compression: 'draco',
      size: 95000
    },
    {
      id: 'container-reefer',
      url: '/models/container-reefer.glb',
      compression: 'draco',
      size: 110000
    },
    {
      id: 'container-refrigerated',
      url: '/models/container-refrigerated.glb',
      compression: 'draco',
      size: 110000
    },
    {
      id: 'container-roro',
      url: '/models/container-roro.glb',
      compression: 'draco',
      size: 100000
    },
    {
      id: 'container-project',
      url: '/models/container-project.glb',
      compression: 'draco',
      size: 120000
    }
  ],
  textures: [
    {
      id: 'container-diffuse',
      url: '/textures/container-atlas.webp',
      format: 'webp',
      size: 120000
    },
    {
      id: 'container-normal',
      url: '/textures/container-normal.webp',
      format: 'webp',
      size: 95000
    },
    {
      id: 'ocean-normal',
      url: '/textures/ocean-normal.jpg',
      format: 'jpg',
      size: 65000
    }
  ],
  priority: 'critical'
};

export class AssetLoader {
  private gltfLoader: any = null; // GLTFLoader
  private textureLoader: any = null; // THREE.TextureLoader
  private loadTimeout = 10000; // 10 seconds
  private retryAttempts = 3;
  private retryDelay = 1000; // 1 second

  /**
   * Initialize loaders (requires Three.js to be loaded first)
   */
  async initialize(): Promise<void> {
    try {
      // Dynamic import Three.js
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

      // Setup GLTF loader
      this.gltfLoader = new GLTFLoader();

      // Setup Draco decoder
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      this.gltfLoader.setDRACOLoader(dracoLoader);

      // Setup texture loader
      this.textureLoader = new THREE.TextureLoader();
    } catch (error) {
      console.error('Failed to initialize AssetLoader:', error);
      throw error;
    }
  }

  /**
   * Load assets from manifest with progress tracking
   */
  async load(
    manifest: AssetManifest,
    onProgress: ProgressCallback
  ): Promise<LoadedAssets> {
    if (!this.gltfLoader || !this.textureLoader) {
      throw new Error('AssetLoader not initialized. Call initialize() first.');
    }

    const totalAssets = manifest.models.length + manifest.textures.length;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalAssets) * 100);
      onProgress(progress);
    };

    // Load models with priority order
    const modelPromises = manifest.models.map((asset) =>
      this.loadModelWithRetry(asset, updateProgress)
    );

    // Load textures
    const texturePromises = manifest.textures.map((asset) =>
      this.loadTextureWithRetry(asset, updateProgress)
    );

    try {
      const [models, textures] = await Promise.all([
        Promise.all(modelPromises),
        Promise.all(texturePromises)
      ]);

      const totalSize = 
        manifest.models.reduce((sum, m) => sum + m.size, 0) +
        manifest.textures.reduce((sum, t) => sum + t.size, 0);

      return {
        models: new Map(models),
        textures: new Map(textures),
        totalSize
      };
    } catch (error) {
      console.error('Asset loading failed:', error);
      throw error;
    }
  }

  /**
   * Load a single model with timeout and retry logic
   */
  private async loadModelWithRetry(
    asset: ModelAsset,
    onComplete: () => void,
    attempt: number = 1
  ): Promise<[string, any]> {
    try {
      const model = await this.loadModelWithTimeout(asset.url);
      onComplete();
      return [asset.id, model.scene];
    } catch (error) {
      if (attempt < this.retryAttempts) {
        console.warn(
          `Retrying model load: ${asset.id} (attempt ${attempt + 1}/${this.retryAttempts})`
        );
        await this.delay(this.retryDelay * attempt); // Exponential backoff
        return this.loadModelWithRetry(asset, onComplete, attempt + 1);
      }
      
      console.error(`Failed to load model ${asset.id} after ${attempt} attempts:`, error);
      
      // Return placeholder geometry
      const THREE = await import('three');
      const placeholderGeometry = new THREE.BoxGeometry(1, 1, 1);
      const placeholderMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
      const group = new THREE.Group();
      group.add(placeholder);
      
      onComplete();
      return [asset.id, group];
    }
  }

  /**
   * Load model with timeout
   */
  private loadModelWithTimeout(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Model load timeout: ${url}`));
      }, this.loadTimeout);

      this.gltfLoader.load(
        url,
        (gltf: any) => {
          clearTimeout(timeout);
          resolve(gltf);
        },
        undefined,
        (error: Error) => {
          clearTimeout(timeout);
          reject(error);
        }
      );
    });
  }

  /**
   * Load a single texture with timeout and retry logic
   */
  private async loadTextureWithRetry(
    asset: TextureAsset,
    onComplete: () => void,
    attempt: number = 1
  ): Promise<[string, any]> {
    try {
      const texture = await this.loadTextureWithTimeout(asset.url);
      onComplete();
      return [asset.id, texture];
    } catch (error) {
      if (attempt < this.retryAttempts) {
        console.warn(
          `Retrying texture load: ${asset.id} (attempt ${attempt + 1}/${this.retryAttempts})`
        );
        await this.delay(this.retryDelay * attempt);
        return this.loadTextureWithRetry(asset, onComplete, attempt + 1);
      }
      
      console.error(`Failed to load texture ${asset.id} after ${attempt} attempts:`, error);
      
      // Return placeholder texture
      const THREE = await import('three');
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(0, 0, 64, 64);
      }
      const placeholderTexture = new THREE.CanvasTexture(canvas);
      
      onComplete();
      return [asset.id, placeholderTexture];
    }
  }

  /**
   * Load texture with timeout
   */
  private loadTextureWithTimeout(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Texture load timeout: ${url}`));
      }, this.loadTimeout);

      this.textureLoader.load(
        url,
        (texture: any) => {
          clearTimeout(timeout);
          resolve(texture);
        },
        undefined,
        (error: Error) => {
          clearTimeout(timeout);
          reject(error);
        }
      );
    });
  }

  /**
   * Dispose loaded assets to free memory
   */
  dispose(assets: LoadedAssets): void {
    // Dispose models
    assets.models.forEach((model) => {
      model.traverse((object: any) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat: any) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    });

    // Dispose textures
    assets.textures.forEach((texture) => {
      texture.dispose();
    });

    assets.models.clear();
    assets.textures.clear();
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
