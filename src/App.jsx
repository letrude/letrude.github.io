import { Suspense, lazy, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import useStore from "./store/useStore";
import LoadingScreen from "./components/layout/LoadingScreen";
const LazyUI = lazy(() => import("./components/layout/UI"));
const LazyMainMenu = lazy(() => import("./features/menu/MainMenu"));
const LazyClassicPortfolio = lazy(
  () => import("./features/classic/ClassicPortfolio"),
);
const LazyGameScene = lazy(() => import("./features/world/GameScene"));

const InitialLoadingFallback = () => {
  const menuText = useStore((state) => state.menuText);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        color: "white",
        fontSize: "20px",
        backgroundColor: "#000",
        position: "absolute",
        zIndex: 999,
      }}
    >
      {menuText.loading || "Loading application..."}
    </div>
  );
};

export default function App() {
  const viewMode = useStore((state) => state.viewMode);
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);
  return (
    <div
      className="custom-cursor"
      style={{
        width: "100vw",
        height: "100vh",
        background: viewMode === "3d" ? "#aaddff" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {viewMode === "menu" && (
        <Suspense fallback={<InitialLoadingFallback />}>
          <LazyMainMenu />
        </Suspense>
      )}
      {viewMode === "2d" && (
        <Suspense fallback={<InitialLoadingFallback />}>
          <LazyClassicPortfolio />
        </Suspense>
      )}
      {viewMode === "3d" && (
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
      )}
    </div>
  );
}
