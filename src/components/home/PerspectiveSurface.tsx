import { useEffect, useRef } from "react";

export type SurfacePoint = { x: number; y: number };

type PerspectiveSurfaceProps = {
  texture: string;
  points: [SurfacePoint, SurfacePoint, SurfacePoint, SurfacePoint];
  scale: number;
  rotation: number;
  brightness: number;
  opacity: number;
};

const GRID = 18;

function project(
  points: [SurfacePoint, SurfacePoint, SurfacePoint, SurfacePoint],
  u: number,
  v: number,
  width: number,
  height: number,
) {
  const [topLeft, topRight, bottomRight, bottomLeft] = points;
  const x =
    (topLeft.x * (1 - u) * (1 - v) +
      topRight.x * u * (1 - v) +
      bottomRight.x * u * v +
      bottomLeft.x * (1 - u) * v) *
    width;
  const y =
    (topLeft.y * (1 - u) * (1 - v) +
      topRight.y * u * (1 - v) +
      bottomRight.y * u * v +
      bottomLeft.y * (1 - u) * v) *
    height;
  return { x, y };
}

function drawTriangle(
  context: CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  sourcePoints: [SurfacePoint, SurfacePoint, SurfacePoint],
  targetPoints: [SurfacePoint, SurfacePoint, SurfacePoint],
) {
  const [s0, s1, s2] = sourcePoints;
  const [d0, d1, d2] = targetPoints;
  const denominator = s0.x * (s1.y - s2.y) + s1.x * (s2.y - s0.y) + s2.x * (s0.y - s1.y);
  if (Math.abs(denominator) < 0.00001) return;

  const a = (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) / denominator;
  const b = (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) / denominator;
  const c = (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) / denominator;
  const d = (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) / denominator;
  const e =
    (d0.x * (s1.x * s2.y - s2.x * s1.y) +
      d1.x * (s2.x * s0.y - s0.x * s2.y) +
      d2.x * (s0.x * s1.y - s1.x * s0.y)) /
    denominator;
  const f =
    (d0.y * (s1.x * s2.y - s2.x * s1.y) +
      d1.y * (s2.x * s0.y - s0.x * s2.y) +
      d2.y * (s0.x * s1.y - s1.x * s0.y)) /
    denominator;

  context.save();
  context.beginPath();
  context.moveTo(d0.x, d0.y);
  context.lineTo(d1.x, d1.y);
  context.lineTo(d2.x, d2.y);
  context.closePath();
  context.clip();
  context.setTransform(a, b, c, d, e, f);
  context.drawImage(source, 0, 0);
  context.restore();
}

export function PerspectiveSurface({ texture, points, scale, rotation, brightness, opacity }: PerspectiveSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const textureImage = new Image();

    const render = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      const context = canvas.getContext("2d");
      if (!context) return;

      const source = document.createElement("canvas");
      source.width = 1200;
      source.height = 1200;
      const sourceContext = source.getContext("2d");
      if (!sourceContext) return;
      const tileSize = Math.max(110, scale * 7);
      sourceContext.translate(source.width / 2, source.height / 2);
      sourceContext.rotate((rotation * Math.PI) / 180);
      sourceContext.translate(-source.width / 2, -source.height / 2);
      for (let x = -source.width; x < source.width * 2; x += tileSize) {
        for (let y = -source.height; y < source.height * 2; y += tileSize) {
          sourceContext.drawImage(textureImage, x, y, tileSize, tileSize);
        }
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = opacity / 100;
      context.filter = `brightness(${brightness}%) saturate(82%) contrast(96%)`;

      for (let row = 0; row < GRID; row += 1) {
        for (let column = 0; column < GRID; column += 1) {
          const u0 = column / GRID;
          const v0 = row / GRID;
          const u1 = (column + 1) / GRID;
          const v1 = (row + 1) / GRID;
          const s00 = { x: u0 * source.width, y: v0 * source.height };
          const s10 = { x: u1 * source.width, y: v0 * source.height };
          const s11 = { x: u1 * source.width, y: v1 * source.height };
          const s01 = { x: u0 * source.width, y: v1 * source.height };
          const d00 = project(points, u0, v0, canvas.width, canvas.height);
          const d10 = project(points, u1, v0, canvas.width, canvas.height);
          const d11 = project(points, u1, v1, canvas.width, canvas.height);
          const d01 = project(points, u0, v1, canvas.width, canvas.height);
          drawTriangle(context, source, [s00, s10, s11], [d00, d10, d11]);
          drawTriangle(context, source, [s00, s11, s01], [d00, d11, d01]);
        }
      }
    };

    textureImage.onload = render;
    textureImage.src = texture;
    const frame = window.requestAnimationFrame(render);
    window.addEventListener("resize", render);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", render);
    };
  }, [brightness, opacity, points, rotation, scale, texture]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />;
}