import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import useStore from "../../store/useStore";
import Environment from "./Environment";
import PlayerController from "./Player";
import Effects from "./Effects";

const SceneWarmup = () => {
  const { gl, scene, camera } = useThree();
  const setSceneReady = useStore((state) => state.setSceneReady);

  useEffect(() => {
    gl.compile(scene, camera);

    const timer = setTimeout(() => {
      setSceneReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [gl, scene, camera, setSceneReady]);

  return null;
};

export default function GameScene() {
  return (
    <>
      <SceneWarmup />
      <color attach="background" args={["#aaddff"]} />
      <fog attach="fog" args={["#aaddff", 10, 130]} />
      <OrthographicCamera
        makeDefault
        position={[0, 30, 30]}
        zoom={40}
        near={-50}
        far={200}
      />
      <ambientLight intensity={0.6} color="#ffeebb" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffeedd"
      >
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
      </directionalLight>
      <Environment />
      <PlayerController />
      <Effects />
    </>
  );
}
