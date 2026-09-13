import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  OrthographicCamera,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";
import type { SurfacePoint } from "@/data/catalog";

export type RenderSurfaceItem = {
  id: string;
  label: string;
  points: [SurfacePoint, SurfacePoint, SurfacePoint, SurfacePoint];
  texture: string;
  scale: number;
  rotation: number;
  brightness: number;
  opacity: number;
  roughness: number;
  showMaterial: boolean;
  zIndex?: number;
};

type RoomSceneProps = {
  surfaces: RenderSurfaceItem[];
};

function toFramePoint(
  point: SurfacePoint,
  frameWidth: number,
  frameHeight: number
): [number, number, number] {
  return [
    point.x * frameWidth - frameWidth / 2,
    frameHeight / 2 - point.y * frameHeight,
    0,
  ];
}

const SUBDIVISIONS = 16;

function SingleSurfaceMesh({
  points,
  texture,
  scale,
  rotation,
  brightness,
  opacity,
  roughness,
  showMaterial,
  zIndex = 0.02,
}: RenderSurfaceItem) {
  const map = useTexture(texture);
  const { size } = useThree();
  const frameHeight = 2;
  const frameWidth = frameHeight * (size.width / Math.max(1, size.height));
  const meshRef = useRef<Mesh>(null);

  // Subdivided grid mesh with bilinear perspective interpolation to eliminate affine diagonal distortion
  const geometry = useMemo(() => {
    const next = new BufferGeometry();
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const [p0, p1, p2, p3] = points;

    for (let row = 0; row <= SUBDIVISIONS; row++) {
      const v = row / SUBDIVISIONS;
      for (let col = 0; col <= SUBDIVISIONS; col++) {
        const u = col / SUBDIVISIONS;

        // Bilinear interpolation across the 4 perspective corners
        const px =
          (1 - u) * (1 - v) * p0.x +
          u * (1 - v) * p1.x +
          u * v * p2.x +
          (1 - u) * v * p3.x;
        const py =
          (1 - u) * (1 - v) * p0.y +
          u * (1 - v) * p1.y +
          u * v * p2.y +
          (1 - u) * v * p3.y;

        const [x, y, z] = toFramePoint({ x: px, y: py }, frameWidth, frameHeight);
        vertices.push(x, y, z);
        uvs.push(u, 1 - v);
      }
    }

    // Grid triangles
    const stride = SUBDIVISIONS + 1;
    for (let row = 0; row < SUBDIVISIONS; row++) {
      for (let col = 0; col < SUBDIVISIONS; col++) {
        const i0 = row * stride + col;
        const i1 = i0 + 1;
        const i2 = (row + 1) * stride + col;
        const i3 = i2 + 1;

        // Front-facing orientation
        indices.push(i0, i2, i1);
        indices.push(i1, i2, i3);
      }
    }

    next.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
    next.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
    next.setIndex(indices);
    next.computeVertexNormals();
    return next;
  }, [frameHeight, frameWidth, points]);

  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        transparent: true,
        opacity: 0,
        roughness,
        metalness: 0.02,
        clearcoat: Math.max(0.1, 0.85 * (1 - roughness)),
        clearcoatRoughness: 0.15,
        envMapIntensity: 1.1,
      }),
    [roughness]
  );

  useEffect(() => {
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.colorSpace = SRGBColorSpace;
    map.anisotropy = 16;
    material.map = map;
    material.needsUpdate = true;
  }, [map, material]);

  useFrame((_, delta) => {
    // Realistic repeat calculation so tiles don't look gigantic and marble doesn't look like micro-wallpaper
    const repeat = Math.max(0.75, 3.2 - scale / 110);
    map.repeat.set(repeat, repeat);
    map.rotation = (rotation * Math.PI) / 180;
    map.center.set(0.5, 0.5);

    material.roughness = MathUtils.damp(material.roughness, roughness, 6, delta);
    material.clearcoat = MathUtils.damp(
      material.clearcoat,
      Math.max(0.08, 0.85 * (1 - roughness)),
      6,
      delta
    );
    material.color.setScalar(Math.max(0.7, brightness / 100));
    material.opacity = MathUtils.damp(
      material.opacity,
      showMaterial ? opacity / 100 : 0,
      8,
      delta
    );
    material.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, zIndex]} />;
}

function FrameCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof OrthographicCamera)) return;
    const aspect = size.width / Math.max(1, size.height);
    camera.left = -aspect;
    camera.right = aspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.near = 0.1;
    camera.far = 20;
    camera.updateProjectionMatrix();
  }, [camera, size.height, size.width]);

  return null;
}

export default function RoomScene({ surfaces }: RoomSceneProps) {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], zoom: 1 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <FrameCamera />
      <ambientLight intensity={0.75} />
      <directionalLight position={[-2, 4, 3]} intensity={0.8} color="#fff6ec" />
      <directionalLight position={[3, 1, 2]} intensity={0.3} color="#dbe8f5" />
      {surfaces.map((surf, index) => (
        <SingleSurfaceMesh
          key={surf.id}
          {...surf}
          zIndex={0.02 + index * 0.005}
        />
      ))}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minAzimuthAngle={-0.035}
        maxAzimuthAngle={0.035}
        minPolarAngle={Math.PI / 2 - 0.025}
        maxPolarAngle={Math.PI / 2 + 0.025}
        rotateSpeed={0.28}
      />
    </Canvas>
  );
}
