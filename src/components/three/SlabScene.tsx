import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useTexture } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";

type SlabProps = {
  texture: string;
  position: [number, number, number];
  rotationY: number;
  scale: [number, number];
  active: boolean;
};

function Slab({ texture, position, rotationY, scale, active }: SlabProps) {
  const map = useTexture(texture);
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.position.z = MathUtils.damp(
      mesh.current.position.z,
      active ? position[2] + 0.5 : position[2],
      3,
      delta,
    );
  });

  return (
    <mesh ref={mesh} position={position} rotation={[0, rotationY, 0]} castShadow>
      <boxGeometry args={[scale[0], scale[1], 0.06]} />
      <meshPhysicalMaterial
        map={map}
        roughness={active ? 0.1 : 0.2}
        metalness={0.03}
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        envMapIntensity={active ? 1.4 : 1}
      />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.x * 0.18, 2, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -pointer.y * 0.08, 2, delta);
  });

  return <group ref={group}>{children}</group>;
}

export type SceneSlab = { id: string; texture: string };

export default function SlabScene({
  slabs,
  activeId,
}: {
  slabs: SceneSlab[];
  activeId: string;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#141312"]} />
      <fog attach="fog" args={["#141312", 7, 16]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow />
      <directionalLight position={[-5, 2, 3]} intensity={0.5} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3.2} position={[0, 5, 4]} scale={[10, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#e2cdb0"
          position={[-6, 1, 2]}
          scale={[5, 5, 1]}
          rotation-y={Math.PI / 2.4}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[6, 1, 2]}
          scale={[5, 5, 1]}
          rotation-y={-Math.PI / 2.4}
        />
      </Environment>
      <ContactShadows
        position={[0, -1.42, 0]}
        opacity={0.55}
        scale={14}
        blur={3}
        far={4.5}
        color="#000000"
      />
      <Rig>
        {slabs.map((slab, i) => {
          const offset = (i - (slabs.length - 1) / 2) * 1.34;
          return (
            <Slab
              key={slab.id}
              texture={slab.texture}
              position={[offset, 0, -Math.abs(offset) * 0.28]}
              rotationY={offset * 0.14}
              scale={[1.2, 2.6]}
              active={slab.id === activeId}
            />
          );
        })}
      </Rig>
    </Canvas>
  );
}
