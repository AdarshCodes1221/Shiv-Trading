import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type ViewAngle = "perspective" | "front" | "side" | "reset";

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
  width,
  height,
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

  // Normalize dimensions to display comfortably in viewport
  const maxDim = Math.max(width, height);
  const targetScale = 2.0;
  const w = (width / maxDim) * targetScale;
  const h = (height / maxDim) * targetScale;
  const d = Math.max(0.04, Math.min(0.08, thickness * 2.5));
  const bevelRadius = Math.min(0.015, w * 0.02);

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
          clearcoatRoughness={roughness * 0.4}
          reflectivity={0.6}
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

export interface MaterialSceneProps {
  textureUrl: string;
  width: number;
  height: number;
  thickness: number;
  roughness: number;
  clearcoat: number;
  metalness: number;
  viewAngle?: ViewAngle;
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
  className = "",
}: MaterialSceneProps) {
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
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[3.5, 4.5, 3.5]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-3, 2, 2]} intensity={0.5} />
        <directionalLight position={[0, -2, -2]} intensity={0.3} />

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
            opacity={0.5}
            scale={4}
            blur={2.4}
            far={1.8}
            resolution={512}
            color="#000000"
          />
        </Suspense>

        <CameraController viewAngle={viewAngle} />
      </Canvas>
    </div>
  );
}
