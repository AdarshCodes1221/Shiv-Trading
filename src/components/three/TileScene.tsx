import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import { MathUtils, MeshPhysicalMaterial, RepeatWrapping, SRGBColorSpace } from "three";

export type LightingPreset = "studio" | "daylight" | "evening";

type PanelProps = {
  texture: string;
  roughness: number;
  repeat: number;
};

function TilePanel({ texture, roughness, repeat }: PanelProps) {
  const map = useTexture(texture);
  const mesh = useRef<Mesh>(null);
  const material = useMemo(() => new MeshPhysicalMaterial(), []);

  map.wrapS = RepeatWrapping;
  map.wrapT = RepeatWrapping;
  map.repeat.set(repeat, repeat);
  map.anisotropy = 16;
  map.colorSpace = SRGBColorSpace;
  map.needsUpdate = true;

  // Smoothly damp material properties so switching finish eases instead of popping.
  useFrame((state, delta) => {
    material.map = map;
    material.roughness = MathUtils.damp(material.roughness, roughness, 4, delta);
    material.clearcoat = MathUtils.damp(material.clearcoat, 1 - roughness, 4, delta);
    material.clearcoatRoughness = MathUtils.damp(
      material.clearcoatRoughness,
      roughness * 0.55,
      4,
      delta,
    );
    material.metalness = 0.03;
    material.envMapIntensity = MathUtils.damp(
      material.envMapIntensity,
      1.35 - roughness * 0.5,
      4,
      delta,
    );
    material.sheen = 0.2;
    material.needsUpdate = true;

    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.015;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.6, 0, 0]} castShadow material={material}>
      <boxGeometry args={[3.4, 3.4, 0.08]} />
    </mesh>
  );
}

const presets: Record<
  LightingPreset,
  { bg: string; ambient: number; key: number; fill: string; warm: string; softbox: number }
> = {
  studio: { bg: "#1b1917", ambient: 0.35, key: 1.6, fill: "#f4efe7", warm: "#d9c3a5", softbox: 3.2 },
  daylight: {
    bg: "#22201d",
    ambient: 0.6,
    key: 2.1,
    fill: "#e9f1ff",
    warm: "#cfe2f5",
    softbox: 4,
  },
  evening: {
    bg: "#12100f",
    ambient: 0.2,
    key: 1.1,
    fill: "#ffd9a8",
    warm: "#c98b45",
    softbox: 2.2,
  },
};

export default function TileScene({
  texture,
  roughness,
  repeat = 2,
  preset = "studio",
}: {
  texture: string;
  roughness: number;
  repeat?: number;
  preset?: LightingPreset;
}) {
  const p = presets[preset];

  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 1.6, 4.6], fov: 40 }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[p.bg]} />
      <fog attach="fog" args={[p.bg, 6, 14]} />
      <ambientLight intensity={p.ambient} />
      <directionalLight position={[3, 6, 4]} intensity={p.key} castShadow color={p.fill} />
      <spotLight position={[-4, 5, 2]} angle={0.5} intensity={p.key * 0.8} penumbra={0.9} />

      <Environment resolution={512}>
        <Lightformer form="rect" intensity={p.softbox} position={[0, 4, 3]} scale={[8, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={p.softbox * 0.45}
          color={p.warm}
          position={[-5, 2, 1]}
          scale={[5, 4, 1]}
          rotation-y={Math.PI / 2.4}
        />
        <Lightformer
          form="circle"
          intensity={p.softbox * 0.35}
          color={p.fill}
          position={[4, 1.5, 2]}
          scale={[3, 3, 1]}
          rotation-y={-Math.PI / 3}
        />
      </Environment>

      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.3}>
        <TilePanel texture={texture} roughness={roughness} repeat={repeat} />
      </Float>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.6}
        scale={12}
        blur={2.6}
        far={4}
        color="#000000"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.4}
        maxPolarAngle={1.35}
        autoRotate
        autoRotateSpeed={0.35}
        enableDamping
        dampingFactor={0.045}
        rotateSpeed={0.55}
      />
    </Canvas>
  );
}
