import { useRef, useEffect, useState, type FC } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './LightRays.css';

const DEFAULT_COLOR = '#98C500';

type LightRaysProps = {
  raysOrigin?: string;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

const convertHexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [1, 1, 1];
};

const computeOriginAndDirection = (origin: string, width: number, height: number): { anchor: [number, number]; dir: [number, number] } => {
  const offset = 0.2;
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -offset * height], dir: [0, 1] };
    case 'top-right':
      return { anchor: [width, -offset * height], dir: [0, 1] };
    case 'left':
      return { anchor: [-offset * width, 0.5 * height], dir: [1, 0] };
    case 'right':
      return { anchor: [(1 + offset) * width, 0.5 * height], dir: [-1, 0] };
    case 'bottom-left':
      return { anchor: [0, (1 + offset) * height], dir: [0, -1] };
    case 'bottom-center':
      return { anchor: [0.5 * width, (1 + offset) * height], dir: [0, -1] };
    case 'bottom-right':
      return { anchor: [width, (1 + offset) * height], dir: [0, -1] };
    default: // "top-center"
      return { anchor: [0.5 * width, -offset * height], dir: [0, 1] };
  }
};

const LightRays: FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = ''
}) => {
  const wrapperElementRef = useRef<HTMLDivElement>(null);
  const shaderUniformsRef = useRef<any>(null);
  const glRendererRef = useRef<Renderer | null>(null);
  const cursorPositionRef = useRef({ x: 0.5, y: 0.5 });
  const smoothedCursorRef = useRef({ x: 0.5, y: 0.5 });
  const frameRequestRef = useRef<number | null>(null);
  const geometryMeshRef = useRef<Mesh | null>(null);
  const teardownRef = useRef<(() => void) | null>(null);
  const [visible, setVisible] = useState(false);
  const visibilityObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!wrapperElementRef.current) return;

    visibilityObserverRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    visibilityObserverRef.current.observe(wrapperElementRef.current);

    return () => {
      if (visibilityObserverRef.current) {
        visibilityObserverRef.current.disconnect();
        visibilityObserverRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!visible || !wrapperElementRef.current) return;

    if (teardownRef.current) {
      teardownRef.current();
      teardownRef.current = null;
    }

    const setupWebGL = async () => {
      if (!wrapperElementRef.current) return;

      await new Promise(resolve => setTimeout(resolve, 10));

      if (!wrapperElementRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      });
      glRendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (wrapperElementRef.current.firstChild) {
        wrapperElementRef.current.removeChild(wrapperElementRef.current.firstChild);
      }
      wrapperElementRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },

        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },

        raysColor: { value: convertHexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion }
      };
      shaderUniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      });
      const mesh = new Mesh(gl, { geometry, program });
      geometryMeshRef.current = mesh;

      const resizeHandler = () => {
        if (!wrapperElementRef.current || !renderer) return;

        renderer.dpr = Math.min(window.devicePixelRatio, 2);

        const { clientWidth: cssWidth, clientHeight: cssHeight } = wrapperElementRef.current;
        renderer.setSize(cssWidth, cssHeight);

        const pixelRatio = renderer.dpr;
        const renderWidth = cssWidth * pixelRatio;
        const renderHeight = cssHeight * pixelRatio;

        uniforms.iResolution.value = [renderWidth, renderHeight];

        const { anchor, dir } = computeOriginAndDirection(raysOrigin, renderWidth, renderHeight);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      const renderLoop = (timestamp: number) => {
        if (!glRendererRef.current || !shaderUniformsRef.current || !geometryMeshRef.current) {
          return;
        }

        uniforms.iTime.value = timestamp * 0.001;

        if (followMouse && mouseInfluence > 0.0) {
          const smoothingFactor = 0.92;

          smoothedCursorRef.current.x = smoothedCursorRef.current.x * smoothingFactor + cursorPositionRef.current.x * (1 - smoothingFactor);
          smoothedCursorRef.current.y = smoothedCursorRef.current.y * smoothingFactor + cursorPositionRef.current.y * (1 - smoothingFactor);

          uniforms.mousePos.value = [smoothedCursorRef.current.x, smoothedCursorRef.current.y];
        }

        try {
          renderer.render({ scene: mesh });
          frameRequestRef.current = requestAnimationFrame(renderLoop);
        } catch (error) {
          console.warn('WebGL rendering error:', error);
          return;
        }
      };

      window.addEventListener('resize', resizeHandler);
      resizeHandler();
      frameRequestRef.current = requestAnimationFrame(renderLoop);

      teardownRef.current = () => {
        if (frameRequestRef.current) {
          cancelAnimationFrame(frameRequestRef.current);
          frameRequestRef.current = null;
        }

        window.removeEventListener('resize', resizeHandler);

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error);
          }
        }

        glRendererRef.current = null;
        shaderUniformsRef.current = null;
        geometryMeshRef.current = null;
      };
    };

    setupWebGL();

    return () => {
      if (teardownRef.current) {
        teardownRef.current();
        teardownRef.current = null;
      }
    };
  }, [
    visible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion
  ]);

  useEffect(() => {
    if (!shaderUniformsRef.current || !wrapperElementRef.current || !glRendererRef.current) return;

    const uniforms = shaderUniformsRef.current;
    const renderer = glRendererRef.current;

    uniforms.raysColor.value = convertHexToRgb(raysColor);
    uniforms.raysSpeed.value = raysSpeed;
    uniforms.lightSpread.value = lightSpread;
    uniforms.rayLength.value = rayLength;
    uniforms.pulsating.value = pulsating ? 1.0 : 0.0;
    uniforms.fadeDistance.value = fadeDistance;
    uniforms.saturation.value = saturation;
    uniforms.mouseInfluence.value = mouseInfluence;
    uniforms.noiseAmount.value = noiseAmount;
    uniforms.distortion.value = distortion;

    const { clientWidth: cssWidth, clientHeight: cssHeight } = wrapperElementRef.current;
    const pixelRatio = renderer.dpr;
    const { anchor, dir } = computeOriginAndDirection(raysOrigin, cssWidth * pixelRatio, cssHeight * pixelRatio);
    uniforms.rayPos.value = anchor;
    uniforms.rayDir.value = dir;
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion
  ]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!wrapperElementRef.current || !glRendererRef.current) return;
      const rect = wrapperElementRef.current.getBoundingClientRect();
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const normalizedY = (e.clientY - rect.top) / rect.height;
      cursorPositionRef.current = { x: normalizedX, y: normalizedY };
    };

    if (followMouse) {
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, [followMouse]);

  return <div ref={wrapperElementRef} className={`light-rays-container ${className}`.trim()} />;
};

export default LightRays;
