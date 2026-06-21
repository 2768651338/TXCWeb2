import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useDeviceTier } from "@/hooks/useDeviceTier";

/**
 * 粒子网络 — Hero 区 3D 背景
 * 设计原则:克制深度,不抢内容焦点
 * - 鼠标移动产生轻微视差(±5°)
 * - 粒子轻微聚集/分散,无点击交互
 */
function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  // 生成粒子位置
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const acid = new THREE.Color("#d4ff3a");
    const bone = new THREE.Color("#f5f5f0");

    for (let i = 0; i < count; i++) {
      // 球形分布,半径范围
      const r = Math.random() * 6 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);

      // 20% 强调色,80% 米白
      const c = Math.random() < 0.2 ? acid : bone;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  // 生成连接线(仅近距离粒子)
  const linePositions = useMemo(() => {
    const linesArr: number[] = [];
    const maxDist = 1.5;
    const maxLines = count * 2; // 限制线条数量
    let lineCount = 0;

    for (let i = 0; i < count && lineCount < maxLines; i++) {
      for (let j = i + 1; j < count && lineCount < maxLines; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          linesArr.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
          lineCount++;
        }
      }
    }
    return new Float32Array(linesArr);
  }, [positions, count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    // 整体缓慢旋转
    points.current.rotation.y += delta * 0.04;
    points.current.rotation.x += delta * 0.01;
    if (lines.current) {
      lines.current.rotation.y = points.current.rotation.y;
      lines.current.rotation.x = points.current.rotation.x;
    }

    // 鼠标视差
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x * 0.3, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y * 0.3, 0.05);
    points.current.position.x = mouse.current.x;
    points.current.position.y = mouse.current.y;
    if (lines.current) {
      lines.current.position.x = mouse.current.x;
      lines.current.position.y = mouse.current.y;
    }
  });

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#d4ff3a"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  const tier = useDeviceTier();
  const count = tier === "high" ? 800 : tier === "mid" ? 400 : 150;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, tier === "high" ? 2 : 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#d4ff3a" />
      <fog attach="fog" args={["#0a0a0f", 6, 14]} />
      <ParticleField count={count} />
      {tier !== "low" && (
        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
