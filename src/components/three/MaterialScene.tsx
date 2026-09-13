import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type ViewAngle = "perspective" | "front" | "side" | "reset";
export type LightingMode = "daylight" | "warm" | "cool" | "golden";

interface MaterialMeshProps {
  textureUrl: string;
  width: number;
  height: number;
  thickness: number;
  roughness: number;
  clearcoat: number;
  metalness: number;
}

function PhysicalMaterialMesh({
  textureUrl,
  thickness,
  roughness,
  clearcoat,
  metalness,
}: MaterialMeshProps) {
  const texture = useTexture(textureUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = 16;
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Strict 4x4 square tile format (1:1 proportion, zero elongated rectangles)
  const size = 2.1;
  const w = size;
  const h = size;
  const d = Math.max(0.04, Math.min(0.065, (thickness || 0.012) * 3));
  const bevelRadius = 0.022;

  // Subtle floating idle oscillation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <RoundedBox args={[w, h, d]} radius={bevelRadius} smoothness={4}>
        <meshPhysicalMaterial
          map={texture}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          clearcoatRoughness={roughness * 0.35}
          reflectivity={0.65}
          envMapIntensity={1.2}
        />
      </RoundedBox>
    </mesh>
  );
}

interface CameraControllerProps {
  viewAngle: ViewAngle;
}

function CameraController({ viewAngle }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;

    if (viewAngle === "front") {
      camera.position.set(0, 0, 2.5);
      controlsRef.current.target.set(0, 0, 0);
    } else if (viewAngle === "side") {
      camera.position.set(2.4, 0.2, 0.8);
      controlsRef.current.target.set(0, 0, 0);
    } else if (viewAngle === "perspective" || viewAngle === "reset") {
      camera.position.set(1.2, 0.7, 2.1);
      controlsRef.current.target.set(0, 0, 0);
    }
    controlsRef.current.update();
  }, [viewAngle, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.2}
      maxDistance={4.5}
      maxPolarAngle={Math.PI * 0.82}
      minPolarAngle={Math.PI * 0.18}
      makeDefault
    />
  );
}

interface LightingPreset {
  ambientColor: string;
  ambientIntensity: number;
  mainColor: string;
  mainIntensity: number;
  mainPosition: [number, number, number];
  fillColor: string;
  fillIntensity: number;
  fillPosition: [number, number, number];
  rimColor: string;
  rimIntensity: number;
  rimPosition: [number, number, number];
  shadowColor: string;
  shadowOpacity: number;
}

const lightingPresets: Record<LightingMode, LightingPreset> = {
  daylight: {
    ambientColor: "#F8FAFC",
    ambientIntensity: 0.85,
    mainColor: "#FFFFFF",
    mainIntensity: 1.45,
    mainPosition: [3.5, 4.8, 3.5],
    fillColor: "#E2E8F0",
    fillIntensity: 0.5,
    fillPosition: [-3, 2, 2],
    rimColor: "#CBD5E1",
    rimIntensity: 0.25,
    rimPosition: [0, -2, -2],
    shadowColor: "#0F172A",
    shadowOpacity: 0.45,
  },
  warm: {
    ambientColor: "#FFF7ED",
    ambientIntensity: 0.75,
    mainColor: "#FFEDD5", // Warm showroom spotlight (3000K)
    mainIntensity: 1.65,
    mainPosition: [2.8, 5.0, 3.2],
    fillColor: "#FED7AA",
    fillIntensity: 0.55,
    fillPosition: [-3, 2.5, 1.5],
    rimColor: "#FDBA74",
    rimIntensity: 0.35,
    rimPosition: [0, -2, -2],
    shadowColor: "#431407",
    shadowOpacity: 0.5,
  },
  cool: {
    ambientColor: "#F0F9FF",
    ambientIntensity: 0.8,
    mainColor: "#E0F2FE", // Modern crisp architectural LED (5500K)
    mainIntensity: 1.45,
    mainPosition: [3.2, 4.8, 3.8],
    fillColor: "#BAE6FD",
    fillIntensity: 0.45,
    fillPosition: [-3, 2, 2],
    rimColor: "#7DD3FC",
    rimIntensity: 0.25,
    rimPosition: [0, -2, -2],
    shadowColor: "#082F49",
    shadowOpacity: 0.45,
  },
  golden: {
    ambientColor: "#3B2820",
    ambientIntensity: 0.6,
    mainColor: "#FB923C", // Low angle golden hour sunset light
    mainIntensity: 1.9,
    mainPosition: [4.5, 2.2, 2.8],
    fillColor: "#EA580C",
    fillIntensity: 0.35,
    fillPosition: [-3, 1, 2],
    rimColor: "#F97316",
    rimIntensity: 0.45,
    rimPosition: [0, -2, -2],
    shadowColor: "#29140C",
    shadowOpacity: 0.6,
  },
};

export interface MaterialSceneProps {
  textureUrl: string;
  width: number;
  height: number;
  thickness: number;
  roughness: number;
  clearcoat: number;
  metalness: number;
  viewAngle?: ViewAngle;
  lightingMode?: LightingMode;
  className?: string;
}

export default function MaterialScene({
  textureUrl,
  width,
  height,
  thickness,
  roughness,
  clearcoat,
  metalness,
  viewAngle = "perspective",
  lightingMode = "daylight",
  className = "",
}: MaterialSceneProps) {
  const preset = lightingPresets[lightingMode] ?? lightingPresets.daylight;

  return (
    <div className={`relative size-full select-none ${className}`}>
      <Canvas
        shadows
        camera={{ position: [1.2, 0.7, 2.1], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ambientLight color={preset.ambientColor} intensity={preset.ambientIntensity} />
        <directionalLight
          position={preset.mainPosition}
          color={preset.mainColor}
          intensity={preset.mainIntensity}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight
          position={preset.fillPosition}
          color={preset.fillColor}
          intensity={preset.fillIntensity}
        />
        <directionalLight
          position={preset.rimPosition}
          color={preset.rimColor}
          intensity={preset.rimIntensity}
        />

        <Suspense fallback={null}>
          <PhysicalMaterialMesh
            textureUrl={textureUrl}
            width={width}
            height={height}
            thickness={thickness}
            roughness={roughness}
            clearcoat={clearcoat}
            metalness={metalness}
          />
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={preset.shadowOpacity}
            scale={4}
            blur={2.4}
            far={1.8}
            resolution={512}
            color={preset.shadowColor}
          />
        </Suspense>

        <CameraController viewAngle={viewAngle} />
      </Canvas>
    </div>
  );
}
