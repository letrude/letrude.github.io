import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3, Object3D, MathUtils } from "three";
import { SkeletonUtils } from "three-stdlib";
import useStore from "../../store/useStore";

const BASE_URL = import.meta.env.BASE_URL;

const PlayerController = () => {
  const playerRef = useRef();
  const { camera } = useThree();
  const keys = useRef({});
  const speed = 7.0;
  const mapRadius = 17;

  const [startAnimation, setStartAnimation] = useState(false);

  const isSceneReady = useStore((state) => state.isSceneReady);

  const spawnState = useRef({ scale: 0, y: 15 });

  const { scene: visualScene } = useGLTF(`${BASE_URL}character/skin.glb`);
  const { animations: walkAnims } = useGLTF(
    `${BASE_URL}character/animations.glb`,
  );
  const { animations: idleAnims } = useGLTF(`${BASE_URL}character/idle.glb`);

  const animations = useMemo(
    () => [...idleAnims, ...walkAnims],
    [idleAnims, walkAnims],
  );
  const clone = useMemo(() => SkeletonUtils.clone(visualScene), [visualScene]);
  const { actions } = useAnimations(animations, playerRef);

  const currentZone = useStore((state) => state.currentZone);
  const isReadingMode = useStore((state) => state.isReadingMode);
  const enableReadingMode = useStore((state) => state.enableReadingMode);

  const [currentAction, setCurrentAction] = useState("");
  const [animNames, setAnimNames] = useState({ idle: "", run: "" });

  const currentLookAt = useRef(new Vector3());

  useEffect(() => {
    if (animations.length > 0) {
      const foundIdle =
        animations.find((c) => c.name.match(/idle/i))?.name ||
        animations[0].name;
      const foundRun =
        animations.find((c) => c.name.match(/run|walk/i))?.name ||
        animations[1]?.name;
      setAnimNames({ idle: foundIdle, run: foundRun });
      if (actions[foundIdle]) {
        actions[foundIdle].reset().fadeIn(0.5).play();
        setCurrentAction(foundIdle);
      }
    }
  }, [animations, actions]);

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [clone]);

  useEffect(() => {
    if (isSceneReady) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSceneReady]);

  useEffect(() => {
    const handleDown = (e) => {
      keys.current[e.code] = true;
      if (e.code === "Space" && currentZone) enableReadingMode(true);
    };
    const handleUp = (e) => (keys.current[e.code] = false);
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, [currentZone, enableReadingMode]);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const safeDelta = Math.min(delta, 0.1);

    if (!startAnimation) {
      spawnState.current = { scale: 0, y: 15 };
    } else {
      spawnState.current.scale = MathUtils.lerp(
        spawnState.current.scale,
        1.1,
        safeDelta * 3,
      );
      spawnState.current.y = MathUtils.lerp(
        spawnState.current.y,
        0,
        safeDelta * 3,
      );

      if (spawnState.current.y < 0) spawnState.current.y = 0;
    }

    playerRef.current.scale.setScalar(spawnState.current.scale);
    playerRef.current.position.y = spawnState.current.y;

    let moveX = 0;
    let moveZ = 0;

    if (!isReadingMode && startAnimation) {
      if (keys.current["ArrowUp"] || keys.current["KeyW"]) moveZ -= 1;
      if (keys.current["ArrowDown"] || keys.current["KeyS"]) moveZ += 1;
      if (keys.current["ArrowLeft"] || keys.current["KeyA"]) moveX -= 1;
      if (keys.current["ArrowRight"] || keys.current["KeyD"]) moveX += 1;
    }

    const isMoving = moveX !== 0 || moveZ !== 0;

    if (isMoving) {
      const direction = new Vector3(moveX, 0, moveZ).normalize();
      let nextX = playerRef.current.position.x + direction.x * speed * delta;
      let nextZ = playerRef.current.position.z + direction.z * speed * delta;
      const distance = Math.sqrt(nextX * nextX + nextZ * nextZ);
      if (distance > mapRadius) {
        const ratio = mapRadius / distance;
        nextX *= ratio;
        nextZ *= ratio;
      }
      playerRef.current.position.x = nextX;
      playerRef.current.position.z = nextZ;
      const targetRotation = Math.atan2(direction.x, direction.z);
      playerRef.current.rotation.y = targetRotation;
    }

    const targetAction = isMoving ? animNames.run : animNames.idle;
    if (
      targetAction &&
      currentAction !== targetAction &&
      actions[targetAction]
    ) {
      if (actions[currentAction]) actions[currentAction].fadeOut(0.2);
      actions[targetAction].reset().fadeIn(0.2).play();
      setCurrentAction(targetAction);
    }

    const targetPos = new Vector3();
    const targetLookAt = new Vector3();
    let targetZoom = 40;

    if (isReadingMode && currentZone) {
      let zoneX = 0,
        zoneZ = 0;
      switch (currentZone) {
        case "Propos":
          zoneX = -10;
          zoneZ = -4;
          break;
        case "Parcours":
          zoneX = 10;
          zoneZ = -4;
          break;
        case "Projets":
          zoneX = -8;
          zoneZ = 8;
          break;
        case "Competences":
          zoneX = 8;
          zoneZ = 8;
          break;
        case "Loisirs":
          zoneX = 0;
          zoneZ = -10;
          break;
        default:
          break;
      }
      targetPos.set(zoneX + 10, 20, zoneZ + 10);
      targetLookAt.set(zoneX, 0, zoneZ);
      targetZoom = 60;
    } else {
      targetPos.set(
        playerRef.current.position.x,
        20,
        playerRef.current.position.z + 30,
      );

      targetLookAt.set(
        playerRef.current.position.x,
        0,
        playerRef.current.position.z,
      );

      targetZoom = 40;
    }

    camera.position.lerp(targetPos, 0.1);
    camera.zoom = MathUtils.lerp(camera.zoom, targetZoom, 0.05);
    currentLookAt.current.lerp(targetLookAt, 0.1);
    camera.lookAt(currentLookAt.current);
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <group ref={playerRef} name="Player">
        <primitive object={clone} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <circleGeometry args={[0.4, 16]} />
          <meshBasicMaterial color="black" opacity={0.2} transparent />
        </mesh>
      </group>
      <Dust playerRef={playerRef} keys={keys} />
    </>
  );
};

const Dust = ({ playerRef, keys }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new Object3D(), []);

  const maxParticles = 30;
  const particles = useMemo(() => {
    return new Array(maxParticles).fill(0).map(() => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vz: 0,
      scale: 0,
      life: 0,
    }));
  }, []);

  const spawnTimer = useRef(0);

  useFrame((state, delta) => {
    if (!playerRef.current || !meshRef.current) return;
    const time = state.clock.getElapsedTime();

    const isMoving =
      keys.current["ArrowUp"] ||
      keys.current["KeyW"] ||
      keys.current["ArrowDown"] ||
      keys.current["KeyS"] ||
      keys.current["ArrowLeft"] ||
      keys.current["KeyA"] ||
      keys.current["ArrowRight"] ||
      keys.current["KeyD"];

    spawnTimer.current += delta;
    if (isMoving && spawnTimer.current > 0.08) {
      spawnTimer.current = 0;

      const deadParticle = particles.find((p) => !p.active);

      if (deadParticle) {
        const playerPos = playerRef.current.position;

        deadParticle.active = true;
        deadParticle.life = 1.0;
        deadParticle.scale = 1.0;
        deadParticle.x = playerPos.x + (Math.random() - 0.5) * 0.5;
        deadParticle.y = 0.1;
        deadParticle.z = playerPos.z + (Math.random() - 0.5) * 0.5;
        deadParticle.vx = (Math.random() - 0.5) * 0.5;
        deadParticle.vz = (Math.random() - 0.5) * 0.5;
      }
    }

    particles.forEach((p, i) => {
      if (p.active) {
        p.life -= delta * 1.5;

        if (p.life <= 0) {
          p.active = false;
          p.scale = 0;
        } else {
          p.scale = p.life;
          p.y += delta * 0.5;
          p.x += p.vx * delta;
          p.z += p.vz * delta;
        }
      } else {
        p.scale = 0;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.rotation.set(0, time * 2 + i, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, maxParticles]}
      frustumCulled={false}
    >
      <circleGeometry args={[0.3, 8]} />
      <meshBasicMaterial color="#dddddd" transparent opacity={0.4} />
    </instancedMesh>
  );
};

export default PlayerController;
