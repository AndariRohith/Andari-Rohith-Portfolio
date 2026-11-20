import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometries() {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const octaRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const icoRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.25;
      cubeRef.current.rotation.y += delta * 0.3;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.2;
      octaRef.current.rotation.z += delta * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= delta * 0.15;
      torusRef.current.rotation.z += delta * 0.2;
    }
    if (icoRef.current) {
      icoRef.current.rotation.y -= delta * 0.25;
      icoRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group position={[-2.4, 0, -1]}>
      {/* Electric Indigo Cube */}
      <mesh ref={cubeRef} position={[-0.6, 1.3, 0]}>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        <meshBasicMaterial color="#6366F1" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Electric Cyan Octahedron */}
      <mesh ref={octaRef} position={[-1.6, -0.9, 0.6]}>
        <octahedronGeometry args={[1.1]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.45} />
      </mesh>

      {/* Neon Purple Torus */}
      <mesh ref={torusRef} position={[0.7, -0.5, -0.4]}>
        <torusGeometry args={[1.0, 0.3, 10, 24]} />
        <meshBasicMaterial color="#A855F7" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Radiant Pink Icosahedron */}
      <mesh ref={icoRef} position={[-2.2, 0.8, -0.8]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#EC4899" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ParticleNetwork({ count = 160 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);

    // Vibrant 3D palette: Indigo, Cyan, Purple, Magenta, Amber
    const palette = [
      new THREE.Color('#6366F1'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#A855F7'),
      new THREE.Color('#EC4899'),
      new THREE.Color('#38BDF8'),
    ];

    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.75) * 8.5; // Left biased to leave Rohith's body clear
      coords[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 4.5;

      const c = palette[i % palette.length];
      colorArr[i * 3] = c.r;
      colorArr[i * 3 + 1] = c.g;
      colorArr[i * 3 + 2] = c.b;
    }
    return { positions: coords, colors: colorArr };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.12;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

export const DataNetworkScene: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <FloatingGeometries />
        <ParticleNetwork count={140} />
      </Canvas>
    </div>
  );
};

export default DataNetworkScene;
