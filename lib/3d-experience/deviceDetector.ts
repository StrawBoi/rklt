/**
 * DeviceDetector - Analyzes device capabilities and determines rendering complexity level
 * Performs GPU benchmarking to assess WebGL performance
 */

export type DeviceCapabilityLevel = 'high' | 'medium' | 'low' | 'reduced-motion';

export interface DeviceCapability {
  level: DeviceCapabilityLevel;
  reason: string;
  gpuScore?: number;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  prefersReducedMotion: boolean;
}

/**
 * Detect device capability by checking motion preference, screen size, and GPU performance
 */
export function detectDeviceCapability(): DeviceCapability {
  // Check reduced motion preference first (accessibility)
  const prefersReducedMotion = checkReducedMotionPreference();
  if (prefersReducedMotion) {
    return {
      level: 'reduced-motion',
      reason: 'User prefers reduced motion',
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      prefersReducedMotion: true
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio;

  // Mobile detection: < 768px width
  if (width < 768) {
    return {
      level: 'low',
      reason: `Mobile screen width ${width}px < 768px`,
      screenWidth: width,
      screenHeight: height,
      pixelRatio,
      prefersReducedMotion: false
    };
  }

  // GPU benchmark
  const gpuScore = benchmarkGPU();

  // Low capability: GPU score < 30
  if (gpuScore < 30) {
    return {
      level: 'low',
      reason: `GPU score ${gpuScore} below threshold 30`,
      gpuScore,
      screenWidth: width,
      screenHeight: height,
      pixelRatio,
      prefersReducedMotion: false
    };
  }

  // Medium capability: GPU score 30-59 or tablet width
  if (gpuScore < 60 || width < 1024) {
    return {
      level: 'medium',
      reason: `GPU score ${gpuScore} or tablet width ${width}px`,
      gpuScore,
      screenWidth: width,
      screenHeight: height,
      pixelRatio,
      prefersReducedMotion: false
    };
  }

  // High capability: GPU score >= 60 and desktop width
  return {
    level: 'high',
    reason: `GPU score ${gpuScore}, desktop width ${width}px`,
    gpuScore,
    screenWidth: width,
    screenHeight: height,
    pixelRatio,
    prefersReducedMotion: false
  };
}

/**
 * Check if user prefers reduced motion
 */
function checkReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Benchmark GPU performance by rendering simple geometry
 * Returns an FPS-equivalent score (higher is better)
 */
function benchmarkGPU(): number {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    // Try WebGL2 first, fall back to WebGL
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!gl) {
      return 0; // No WebGL support
    }

    // Create simple shader program
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return 0;

    gl.shaderSource(
      vertexShader,
      `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `
    );
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return 0;

    gl.shaderSource(
      fragmentShader,
      `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.5, 0.3, 1.0);
      }
    `
    );
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) return 0;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create geometry: 1000 triangles (3000 vertices)
    const vertices = new Float32Array(3000 * 3);
    for (let i = 0; i < vertices.length; i++) {
      vertices[i] = Math.random() * 2 - 1;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    // Measure render time
    const startTime = performance.now();
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3000);
    gl.finish();
    const endTime = performance.now();

    const renderTime = endTime - startTime;

    // Calculate score: FPS equivalent for this workload
    // Target: 16.67ms for 60fps = score 60
    const score = Math.round(1000 / renderTime);

    // Cleanup
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.canvas.width = 1; // Reduce memory
    gl.canvas.height = 1;

    return Math.min(score, 120); // Cap at 120 fps equivalent
  } catch (error) {
    console.warn('GPU benchmark failed:', error);
    return 0;
  }
}
