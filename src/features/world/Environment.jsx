import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useGLTF, Float, Text } from "@react-three/drei";
import {
  RepeatWrapping,
  AdditiveBlending,
  Object3D,
  Vector3,
  DoubleSide,
} from "three";
import { SkeletonUtils } from "three-stdlib";
import useStore from "../../store/useStore";

const BASE_URL = import.meta.env.BASE_URL;

const cleanPath = (path) => (path.startsWith("/") ? path.substring(1) : path);

const GrassFloor = () => {
  const texture = useTexture(`${BASE_URL}textures/grass.jpg`);

  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(30, 30);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} color="#90a880" roughness={0.8} />
    </mesh>
  );
};

const Zone = ({
  position,
  rotationY = 0,
  modelPath,
  name,
  scale = 1,
  signSide,
  extraHitbox = null,
}) => {
  const setZone = useStore((state) => state.setZone);
  const currentZone = useStore((state) => state.currentZone);
  const enableReadingMode = useStore((state) => state.enableReadingMode);
  const isReadingMode = useStore((state) => state.isReadingMode);
  const content = useStore((state) => state.content);
  const label = content[name]?.title || name;

  const { scene: modelScene } = useGLTF(BASE_URL + cleanPath(modelPath));
  const building = useMemo(() => SkeletonUtils.clone(modelScene), [modelScene]);

  const { scene: signScene } = useGLTF(`${BASE_URL}models/props/sign.glb`);
  const sign = useMemo(() => SkeletonUtils.clone(signScene), [signScene]);

  const [hovered, setHover] = useState(false);

  useEffect(() => {
    building.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [building]);

  useEffect(() => {
    if (hovered) {
      document.body.classList.add("hovering-3d");
    } else {
      document.body.classList.remove("hovering-3d");
    }

    return () => {
      document.body.classList.remove("hovering-3d");
    };
  }, [hovered]);

  useFrame((state) => {
    if (isReadingMode) return;
    const player = state.scene.getObjectByName("Player");
    if (player) {
      const dist = player.position.distanceTo(new Vector3(...position));
      if (dist < 4 && currentZone !== name) setZone(name);
      else if (currentZone === name && dist > 4.1) setZone(null);
    }
  });

  const isActive = currentZone === name || hovered;

  let signX = 0;
  let signRot = 0;
  let textOffset = 0;
  let signZ = 2;
  if (signSide === "right") {
    signX = 2.5;
    signRot = 0.5;
    textOffset = -0.1;
  } else if (signSide === "left") {
    signX = -2.5;
    signRot = -0.5;
    textOffset = 0.1;
  } else if (signSide === "center") {
    signZ = 3.2;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    setZone(name);
    enableReadingMode(true);
  };
  const handleOver = (e) => {
    e.stopPropagation();
    setHover(true);
  };
  const handleOut = () => setHover(false);

  return (
    <group position={position}>
      <mesh
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <cylinderGeometry args={[3.5, 3.5, 0, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {extraHitbox && (
        <mesh
          position={extraHitbox.position || [0, 0, 0]}
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          <cylinderGeometry args={extraHitbox.args} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}

      <group rotation={[0, rotationY, 0]} scale={scale}>
        <primitive object={building} />
      </group>

      <group position={[signX, 0, signZ]} rotation={[0, signRot, 0]}>
        <primitive object={sign} scale={1} />
        <Float speed={4} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            font={`${BASE_URL}${cleanPath("/fonts/PersonalFont.ttf")}`}
            position={[textOffset, 1.6, 0.3]}
            fontSize={0.3}
            color={isActive ? "#ffd700" : "white"}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {label}
          </Text>
        </Float>
        <group visible={isActive}>
          <Float speed={10} rotationIntensity={0} floatIntensity={0.5}>
            <Text
              position={[textOffset, 2.2, 0.3]}
              fontSize={0.5}
              color="#ffd700"
              outlineWidth={0.02}
              outlineColor="black"
            >
              ▼
            </Text>
          </Float>
        </group>
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
        receiveShadow
      >
        <circleGeometry args={[3.5, 32]} />
        <meshStandardMaterial color="white" opacity={0.1} transparent />
      </mesh>
    </group>
  );
};

const Decoration = ({
  modelPath,
  position,
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF(BASE_URL + cleanPath(modelPath));
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clone]);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={clone} />
    </group>
  );
};

const Fireflies = () => {
  const meshRef = useRef();
  const count = 100;
  const dummy = useMemo(() => new Object3D(), []);

  const particles = useRef([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(Math.random()) * 25;
      const theta = Math.random() * 2 * Math.PI;

      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      temp.push({
        t: Math.random() * 100,
        speed: 0.005 + Math.random() * 0.015,
        x: x,
        y: Math.random() * 5 + 0.5,
        z: z,
        radiusOffset: Math.random() * 2,
      });
    }
    particles.current = temp;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.current.forEach((particle, i) => {
      particle.t += particle.speed;

      const xPos = particle.x + Math.cos(particle.t) * particle.radiusOffset;
      const zPos = particle.z + Math.sin(particle.t) * particle.radiusOffset;
      const yPos = particle.y + Math.sin(particle.t * 2) * 0.5;

      dummy.position.set(xPos, yPos, zPos);

      const scale = 0.5 + Math.sin(particle.t * 5) * 0.3;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.08, 6, 6]} />
      <meshBasicMaterial
        color={[3, 3, 0]}
        toneMapped={false}
        transparent
        opacity={0.8}
        blending={AdditiveBlending}
      />
    </instancedMesh>
  );
};

const MapBoundary = () => {
  const ringRef = useRef();

  const radius = 17;
  const outerRadius = 80;

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime();

      ringRef.current.rotation.z -= 0.005;

      if (ringRef.current.material) {
        ringRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.15;
      }
    }
  });

  return (
    <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[radius - 0.4, radius, 64]} />
        <meshBasicMaterial
          color="#aaddff"
          transparent
          opacity={0.3}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[radius - 0.1, radius, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[radius, outerRadius, 64]} />
        <meshBasicMaterial color="#051020" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};

function Environment() {
  return (
    <group>
      <GrassFloor />

      <Zone
        position={[-10, 0, -4]}
        modelPath="/models/buildings/house.glb"
        name="Propos"
        rotationY={Math.PI / 6}
        scale={8}
        signSide="right"
        extraHitbox={{ args: [0.3, 2.5, 3, 16], position: [-0.7, 1.7, 0] }}
      />
      <Zone
        position={[10, 0, -4]}
        modelPath="/models/buildings/runeStone.glb"
        name="Parcours"
        rotationY={-Math.PI - 3.3}
        scale={2.5}
        signSide="left"
        extraHitbox={{ args: [0.3, 2, 3, 16], position: [-0.3, 1.3, 0] }}
      />
      <Zone
        position={[-8, 0, 8]}
        modelPath="/models/buildings/tower.glb"
        name="Projets"
        rotationY={Math.PI / 7}
        scale={0.3}
        signSide="right"
        extraHitbox={{ args: [1.3, 1.3, 3, 16], position: [0, 2, 0] }}
      />
      <Zone
        position={[8, 0, 8]}
        modelPath="/models/buildings/treeStump.glb"
        name="Competences"
        rotationY={-Math.PI}
        scale={12}
        signSide="left"
      />
      <Zone
        position={[0, 0, -10]}
        modelPath="/models/buildings/fountain.glb"
        name="Loisirs"
        rotationY={0}
        scale={3}
        signSide="center"
      />

      <Decoration
        modelPath="/models/nature/rock.glb"
        position={[0, 0, 9]}
        scale={4}
      />
      <Decoration
        modelPath="/models/nature/bush.glb"
        position={[1.5, 0, 8.5]}
        scale={4}
      />
      <Decoration
        modelPath="/models/nature/bush.glb"
        position={[-1.5, 0, 8.5]}
        scale={4}
      />

      <Decoration
        modelPath="/models/nature/tree.glb"
        position={[-10, 2, 2]}
        scale={1.4}
      />
      <Decoration
        modelPath="/models/nature/rock.glb"
        position={[-9, 0, 3]}
        scale={3}
      />

      <Decoration
        modelPath="/models/nature/tree.glb"
        position={[10, 2, 2]}
        scale={1.4}
        rotation={[0, 3, 0]}
      />
      <Decoration
        modelPath="/models/nature/rock.glb"
        position={[9, 0, 3]}
        scale={3}
        rotation={[0, 1, 0]}
      />

      <Decoration
        modelPath="/models/nature/bush.glb"
        position={[-5, 0, -8]}
        scale={6}
      />
      <Decoration
        modelPath="/models/nature/tree.glb"
        position={[-6, 2, -9]}
        scale={1.3}
      />

      <Decoration
        modelPath="/models/nature/bush.glb"
        position={[5, 0, -8]}
        scale={6}
        rotation={[0, 0.5, 0]}
      />
      <Decoration
        modelPath="/models/nature/tree.glb"
        position={[6, 2, -9]}
        scale={1.3}
        rotation={[0, 2, 0]}
      />

      <Fireflies />
      <MapBoundary />
    </group>
  );
}

export default Environment;
