import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useEffect } from "react";
import LoadingScreen from "../../components/layout/LoadingScreen";
const LazyUI = lazy(() => import("../../components/layout/UI"));
const LazyGameScene = lazy(() => import("./GameScene"));

export default function World() {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);
  return (
    <>
      <LoadingScreen />
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <LazyGameScene />
        </Suspense>
      </Canvas>
      <Suspense fallback={null}>
        <LazyUI />
      </Suspense>
    </>
  );
}
